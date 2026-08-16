// Homepage hero laptop (see src/css/laptop-hero.css). Plays once on page
// load — it's the first thing on the page, so unlike the case-study
// diagrams in interactive.js there's no scroll trigger, and it's kept in
// its own file rather than folded into that one's setup().
(function () {
  var laptop = document.getElementById("laptopHero");
  var homeHero = document.getElementById("homeHero");
  var workList = document.getElementById("workList");
  if (!laptop || !homeHero || !workList) return;

  var rig = laptop.querySelector(".laptop-hero_rig");
  var miniWord = laptop.querySelector(".mini-hero");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showRealHero() {
    laptop.classList.add("is-skipped");
    homeHero.classList.add("is-visible");
    workList.classList.add("is-visible");
  }

  function play() {
    if (reduceMotion) {
      showRealHero();
      return;
    }

    laptop.classList.remove("is-open");
    void laptop.offsetWidth;
    laptop.classList.add("is-open");
    var openStartTime = performance.now();

    // The word's on-screen pixel position, measured once the screen
    // content has faded in — .laptop-hero_rig has no real layout box of
    // its own (everything inside it is 3D-positioned/absolute), so a CSS
    // percentage transform-origin can't target the word; only a
    // JS-measured pixel offset can.
    function measureOrigin() {
      var wordBox = miniWord.getBoundingClientRect();
      var rigBox = rig.getBoundingClientRect();
      var originX = wordBox.x + wordBox.width / 2 - rigBox.x;
      var originY = wordBox.y + wordBox.height / 2 - rigBox.y;
      rig.style.transformOrigin = originX + "px " + originY + "px";
    }

    setTimeout(measureOrigin, 1050);
    // The headline font (see --home-font-headline in laptop-hero.css) loads
    // from Adobe's CDN, not self-hosted, so it can still be mid-fetch at
    // the 1050ms mark above — measuring the fallback font's metrics would
    // throw off the word-centering once the real face swaps in. Re-measure
    // once it's confirmed loaded, as long as that happens before the zoom
    // itself starts (1740ms) — after that, moving the origin would jump.
    if (window.document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (!laptop.classList.contains("is-open")) return;
        var elapsed = performance.now() - openStartTime;
        if (elapsed < 1700) measureOrigin();
      });
    }

    rig.addEventListener("animationend", function handler(e) {
      if (e.animationName !== "laptopHeroConsume") return;
      rig.removeEventListener("animationend", handler);
      showRealHero();
    });
  }

  if (document.readyState === "complete") {
    play();
  } else {
    window.addEventListener("load", play);
  }
})();

// Project list: each card settles in on its own as it scrolls into view,
// rather than the whole list just being static content that scrolls past
// — makes each project read as its own "page" instead of one continuous
// strip. Separate IIFE from the hero above since it's driven by scroll
// position, not page load.
(function () {
  var items = document.querySelectorAll(".work-list_item");
  if (!items.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll() {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  function setup() {
    if (reduceMotion || typeof gsap === "undefined" || typeof IntersectionObserver === "undefined") {
      showAll();
      return;
    }

    // IntersectionObserver rather than ScrollTrigger here: it fires purely
    // off actual on-screen visibility, so unlike a scrollY-position-based
    // trigger it has no "this card's trigger point is past the page's max
    // scroll" edge case to worry about for whichever card ends up last.
    // One-shot (unobserve after firing) rather than a replay-on-every-visit
    // like the case-study diagrams in interactive.js — these cards are
    // read top-to-bottom, so re-hiding one because the user scrolled past
    // it quickly would just be annoying.
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          gsap.fromTo(
            entry.target,
            { y: 44, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
          );
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  if (document.readyState === "complete") {
    setup();
  } else {
    window.addEventListener("load", setup);
  }
})();
