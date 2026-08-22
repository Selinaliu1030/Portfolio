// Click-to-expand modal for feature screenshots (see .site-feature-frame in
// site.css and the featureBlock shortcode in .eleventy.js). Shared across
// every project page, not case-study-specific like interactive.js.
(function () {
  var frames = document.querySelectorAll(".site-feature-frame");
  if (!frames.length) return;

  var lightbox = document.createElement("div");
  lightbox.className = "site-lightbox";
  lightbox.id = "siteLightbox";
  lightbox.innerHTML =
    '<button class="site-lightbox_close" aria-label="Close">✕</button>' +
    '<img alt="">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector("img");
  var closeBtn = lightbox.querySelector(".site-lightbox_close");

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
  }

  frames.forEach(function (frame) {
    var img = frame.querySelector("img");
    if (!img) return;
    frame.addEventListener("click", function () {
      open(img.src, img.alt);
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
