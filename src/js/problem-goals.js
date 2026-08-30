// Problem & Goals accordion (see .problem-goals in site.css and the
// problemGoals shortcode in .eleventy.js). No GSAP dependency, kept in
// its own file like site-lightbox.js — this is click-driven, not a
// scroll-triggered animation, so it doesn't belong in interactive.js's
// GSAP-gated setup().
(function () {
  document.querySelectorAll(".problem-goals").forEach(function (pg) {
    var cards = pg.querySelectorAll(".problem-goals_card");

    function close(card) {
      card.classList.remove("is-open");
      card.querySelector(".problem-goals_card-head").setAttribute("aria-expanded", "false");
      card.querySelector(".problem-goals_pill-label").textContent = "Why it matters";
    }

    function open(card) {
      card.classList.add("is-open");
      card.querySelector(".problem-goals_card-head").setAttribute("aria-expanded", "true");
      card.querySelector(".problem-goals_pill-label").textContent = "Hide";
    }

    cards.forEach(function (card) {
      var head = card.querySelector(".problem-goals_card-head");
      head.addEventListener("click", function () {
        var wasOpen = card.classList.contains("is-open");
        cards.forEach(close);
        if (!wasOpen) open(card);
      });
    });
  });
})();
