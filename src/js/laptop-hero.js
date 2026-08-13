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

    // The word's on-screen pixel position, measured once the screen
    // content has faded in — .laptop-hero_rig has no real layout box of
    // its own (everything inside it is 3D-positioned/absolute), so a CSS
    // percentage transform-origin can't target the word; only a
    // JS-measured pixel offset can.
    setTimeout(function () {
      var wordBox = miniWord.getBoundingClientRect();
      var rigBox = rig.getBoundingClientRect();
      var originX = wordBox.x + wordBox.width / 2 - rigBox.x;
      var originY = wordBox.y + wordBox.height / 2 - rigBox.y;
      rig.style.transformOrigin = originX + "px " + originY + "px";
    }, 1050);

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
