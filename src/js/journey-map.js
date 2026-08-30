// Journey map emotion curve (see .journey-map in site.css and the
// journeyMap shortcode in .eleventy.js). Hovering or focusing a point
// on the curve, or its stage label, sets the active stage; everything
// else (dot size/fill, pulse ring, sparkle burst, panel visibility) is
// derived from that one value. No GSAP dependency, kept in its own
// file like site-lightbox.js and problem-goals.js.
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".journey-map").forEach(function (map) {
    var dots = map.querySelectorAll(".journey-map_dot");
    var hits = map.querySelectorAll(".journey-map_hit");
    var labels = map.querySelectorAll(".journey-map_label");
    var panels = map.querySelectorAll(".journey-map_panel");
    var pulse = map.querySelector(".journey-map_pulse");
    var sparksGroup = map.querySelector(".journey-map_sparks");
    if (!dots.length) return;

    var active = 0;
    var paused = false;
    var svgNS = "http://www.w3.org/2000/svg";

    function moodColor(dot) {
      return getComputedStyle(dot).getPropertyValue("--mood-color").trim();
    }

    function spawnSparks(dot) {
      if (reduceMotion) return;
      sparksGroup.textContent = "";
      var cx = parseFloat(dot.getAttribute("cx"));
      var cy = parseFloat(dot.getAttribute("cy"));
      var color = moodColor(dot);
      for (var i = 0; i < 6; i++) {
        var angle = (i * 60 * Math.PI) / 180;
        var d = 26;
        var spark = document.createElementNS(svgNS, "circle");
        spark.setAttribute("class", "journey-map_spark");
        spark.setAttribute("cx", cx + Math.cos(angle) * d);
        spark.setAttribute("cy", cy + Math.sin(angle) * d);
        spark.setAttribute("r", 3);
        spark.setAttribute("fill", color);
        spark.style.animationDelay = i * 0.03 + "s";
        spark.style.transformOrigin = cx + "px " + cy + "px";
        sparksGroup.appendChild(spark);
      }
    }

    function setActive(index) {
      if (index === active) return;
      active = index;

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
      labels.forEach(function (label, i) {
        var isActive = i === index;
        label.classList.toggle("is-active", isActive);
        label.setAttribute("aria-pressed", String(isActive));
      });
      panels.forEach(function (panel, i) {
        panel.hidden = i !== index;
      });

      var activeDot = dots[index];
      pulse.setAttribute("cx", activeDot.getAttribute("cx"));
      pulse.setAttribute("cy", activeDot.getAttribute("cy"));
      pulse.setAttribute("stroke", moodColor(activeDot));

      spawnSparks(activeDot);
    }

    function onInteract(index) {
      paused = true;
      setActive(index);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("mouseenter", function () { onInteract(i); });
      dot.addEventListener("focus", function () { onInteract(i); });
    });
    hits.forEach(function (hit, i) {
      hit.addEventListener("mouseenter", function () { onInteract(i); });
    });
    labels.forEach(function (label, i) {
      label.addEventListener("mouseenter", function () { onInteract(i); });
      label.addEventListener("focus", function () { onInteract(i); });
    });

    // Initialize the pulse ring at stage 0 (dots/labels/panels already
    // render correctly for stage 0 server-side).
    active = -1;
    setActive(0);

    if (!reduceMotion) {
      var timer = setInterval(function () {
        if (paused) return;
        setActive((active + 1) % dots.length);
      }, 3200);
      window.addEventListener("beforeunload", function () {
        clearInterval(timer);
      });
    }
  });
})();
