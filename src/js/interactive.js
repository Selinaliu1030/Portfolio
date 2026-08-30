// Hand-written site interactivity — not part of the Webflow export, so it
// stays out of webflow.js. Drives the case-study scroll-reveal diagrams
// (see src/css/site.css .tws-flow / .storyboard / .persona-chain and the
// corresponding twsFlowDiagram / storyboard / personaChain shortcodes).
(function () {
  if (typeof gsap === "undefined") return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Wires up a container so its buildTimeline()-returned (paused) GSAP
  // timeline replays every time the container scrolls into view, in
  // either direction, and resets when it scrolls out — instead of a
  // one-shot "once" reveal.
  function wireReveal(container, revealItems, buildTimeline) {
    if (reduceMotion || typeof ScrollTrigger === "undefined") {
      revealItems.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    var tl = buildTimeline();

    ScrollTrigger.create({
      trigger: container,
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
  }

  function setup() {
    // TWS → meditation-prompt mapping rows: aspect slides in from the
    // left, arrow draws in, prompt slides in from the right.
    document.querySelectorAll(".tws-flow").forEach(function (flow) {
      var rows = flow.querySelectorAll(".tws-flow_row");
      var revealEls = [];
      rows.forEach(function (row) {
        revealEls.push(
          row.querySelector(".tws-flow_aspect"),
          row.querySelector(".tws-flow_arrow"),
          row.querySelector(".tws-flow_prompt")
        );
      });

      wireReveal(flow, revealEls, function () {
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
        return tl;
      });
    });

    // Storyboard panels: reveal left-to-right in reading order, panel and
    // connecting arrow alike, fade + slight rise.
    document.querySelectorAll(".storyboard").forEach(function (board) {
      var items = board.querySelectorAll(".storyboard_panel, .storyboard_arrow");

      wireReveal(board, items, function () {
        var tl = gsap.timeline({ paused: true });
        items.forEach(function (el, i) {
          tl.fromTo(
            el,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            i * 0.09
          );
        });
        return tl;
      });
    });

    // Insight bar charts (replaces flattened pull/push-factor chart
    // images): each group's bars fill in with a stagger, scaleX(0→1)
    // rather than animating width directly so the reduced-motion
    // fallback (wireReveal just adds .is-visible) needs no extra logic.
    document.querySelectorAll(".insight-bars_group").forEach(function (group) {
      var fills = group.querySelectorAll(".insight-bar_fill");
      wireReveal(group, fills, function () {
        var tl = gsap.timeline({ paused: true });
        fills.forEach(function (el, i) {
          tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.out" }, i * 0.12);
        });
        return tl;
      });
    });

    // Interview personas + causal chain: cards reveal as a group first,
    // then the 3-step chain reveals left-to-right right after.
    document.querySelectorAll(".persona-chain").forEach(function (chain) {
      var cards = chain.querySelectorAll(".persona-card");
      var chainItems = chain.querySelectorAll(".persona-chain_step, .persona-chain_dots");
      var revealEls = Array.prototype.concat.call([], Array.prototype.slice.call(cards), Array.prototype.slice.call(chainItems));

      wireReveal(chain, revealEls, function () {
        var tl = gsap.timeline({ paused: true });
        cards.forEach(function (el, i) {
          tl.fromTo(el, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, i * 0.1);
        });
        var chainStart = cards.length * 0.1 + 0.15;
        chainItems.forEach(function (el, i) {
          tl.fromTo(el, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, chainStart + i * 0.09);
        });
        return tl;
      });
    });
  }

  // Images above these diagrams (hero image, feature GIFs) load
  // asynchronously and change the page's height after this script runs.
  // If ScrollTrigger calculates its trigger position before that settles,
  // "top 80%" can end up already past the current scroll position, firing
  // the reveal immediately instead of waiting for a real scroll. Wait for
  // full page load (images included) before creating the triggers.
  if (document.readyState === "complete") {
    setup();
  } else {
    window.addEventListener("load", setup);
  }
})();
