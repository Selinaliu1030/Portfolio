// Hand-written site interactivity — not part of the Webflow export, so it
// stays out of webflow.js. Drives the TWS-to-meditation-prompt diagram
// (see src/css/site.css .tws-flow and the twsFlowDiagram shortcode).
(function () {
  if (typeof gsap === "undefined") return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setup() {
    document.querySelectorAll(".tws-flow").forEach(function (flow) {
      var rows = flow.querySelectorAll(".tws-flow_row");

      if (reduceMotion) {
        rows.forEach(function (row) {
          row.classList.add("is-visible");
        });
        return;
      }

      if (typeof ScrollTrigger === "undefined") {
        rows.forEach(function (row) {
          row.classList.add("is-visible");
        });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // A paused timeline the trigger plays/resets — gives clean control
      // over replaying the stagger every time the section re-enters view,
      // instead of a one-shot "once" reveal.
      var tl = gsap.timeline({ paused: true });
      rows.forEach(function (row, i) {
        tl.fromTo(
          row.querySelector(".tws-flow_aspect"),
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4 },
          i * 0.12
        )
          .fromTo(
            row.querySelector(".tws-flow_arrow"),
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.25, transformOrigin: "left center" },
            i * 0.12 + 0.1
          )
          .fromTo(
            row.querySelector(".tws-flow_prompt"),
            { x: 18, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4 },
            i * 0.12 + 0.15
          );
      });

      ScrollTrigger.create({
        trigger: flow,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: function () {
          tl.restart();
        },
        onEnterBack: function () {
          tl.restart();
        },
        onLeave: function () {
          tl.pause(0);
        },
        onLeaveBack: function () {
          tl.pause(0);
        },
      });
    });
  }

  // Images above the diagram (hero image, feature GIFs) load asynchronously
  // and change the page's height after this script runs. If ScrollTrigger
  // calculates its trigger position before that settles, "top 80%" can end
  // up already past the current scroll position, firing the reveal
  // immediately instead of waiting for a real scroll. Wait for full page
  // load (images included) before creating the trigger.
  if (document.readyState === "complete") {
    setup();
  } else {
    window.addEventListener("load", setup);
  }
})();
