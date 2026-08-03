const markdownIt = require("markdown-it")({ html: true });

function esc(str) {
  return String(str == null ? "" : str);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({
    "node_modules/jquery/dist/jquery.min.js": "js/vendor/jquery.min.js",
    "node_modules/gsap/dist/gsap.min.js": "js/vendor/gsap.min.js",
    "node_modules/gsap/dist/ScrollTrigger.min.js": "js/vendor/ScrollTrigger.min.js",
    "node_modules/gsap/dist/SplitText.min.js": "js/vendor/SplitText.min.js",
  });

  eleventyConfig.addCollection("project", function (collectionApi) {
    return collectionApi.getFilteredByTag("project").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Metadata box: Skills / Person / Role / Project Overview
  eleventyConfig.addShortcode("metaBox", function (skills, person, role, overview) {
    return `
      <section class="section-work-content">
        <div class="padding-section-large is-tablet-smaller"></div>
        <div class="padding-global">
          <div class="container-medium">
            <div class="work-content_grid">
              <div class="text-style-label">Skills: </div>
              <p class="paragraph">${esc(skills)}</p>
              <div class="text-style-label">Person: </div>
              <p class="paragraph">${esc(person)}</p>
              <div class="text-style-label">Role: </div>
              <p class="paragraph">${esc(role)}</p>
              <div class="text-style-label">Project Overview: </div>
              <p class="paragraph">${esc(overview)}</p>
            </div>
          </div>
        </div>
      </section>`;
  });

  // Generic labeled prose section: Background, Target Audience, Current
  // Market, User Needs, Ideation, Wireframe intro text, etc.
  eleventyConfig.addPairedShortcode("section", function (content, label, heading) {
    return `
      <section class="section-work-content">
        <div class="padding-section-large is-tablet-smaller"></div>
        <div class="padding-global">
          <div class="container-medium">
            <div class="work-content_grid">
              <div class="work-content_content">
                <div class="work-content_head">
                  <div class="text-style-label">${esc(label)}</div>
                  <h2 class="heading-style-h3">${esc(heading)}</h2>
                </div>
                <div class="w-layout-vflex site-section-body">
                  ${markdownIt.render(content.trim())}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;
  });

  // Repeatable feature block: variable number per project, each with 1-2
  // labeled parts (e.g. "Patient Side" / "Caregiver Side").
  eleventyConfig.addShortcode("featureBlock", function (f) {
    const partsHtml = (f.parts || [])
      .map((p) => p.label
        ? `<strong>${esc(p.label)}<br>‍</strong>${markdownIt.renderInline(p.body)}`
        : markdownIt.renderInline(p.body))
      .join("<br>‍<br>‍");
    let img = "";
    if (f.images && f.images.length) {
      img = `<div class="w-layout-hflex site-image-row">${f.images
        .map((i) => `<img loading="lazy" src="${esc(i.src)}" alt="${esc(i.alt || "")}" class="site-feature-img">`)
        .join("")}</div>`;
    } else if (f.image) {
      img = `<img loading="lazy" src="${esc(f.image)}" alt="${esc(f.imageAlt || "")}" class="site-feature-img">`;
    }
    return `
      <section class="section-work-content">
        <div class="padding-section-large is-tablet-smaller"></div>
        <div class="padding-global">
          <div class="container-medium">
            <div class="work-content_grid">
              <div class="work-content_content">
                <div class="work-content_head">
                  <div class="text-style-label">${esc(f.tag)}</div>
                  <h2 class="heading-style-h3">${esc(f.title)}</h2>
                </div>
                <div class="w-layout-vflex site-section-body">
                  <p>${partsHtml}</p>${img}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;
  });

  // Final Prototype callout — external link with an icon (default arrow SVG,
  // or a custom icon image e.g. Taski's Figma icon).
  eleventyConfig.addShortcode("prototypeCallout", function (prototype) {
    const icon = prototype.icon && prototype.icon !== "link"
      ? `<img src="${esc(prototype.icon)}" alt="" class="site-prototype-icon">`
      : `<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" class="svg">
            <path d="M9.42857 16.6359V7.36406C9.42857 6.8625 10.125 6.60938 10.5268 6.96563L15.7929 11.6016C16.0446 11.8219 16.0446 12.1734 15.7929 12.3937L10.5268 17.0297C10.125 17.3906 9.42857 17.1375 9.42857 16.6359ZM24 3.75V20.25C24 21.4922 22.8482 22.5 21.4286 22.5H2.57143C1.15179 22.5 0 21.4922 0 20.25V3.75C0 2.50781 1.15179 1.5 2.57143 1.5H21.4286C22.8482 1.5 24 2.50781 24 3.75ZM21.4286 19.9688V4.03125C21.4286 3.87656 21.2839 3.75 21.1071 3.75H2.89286C2.71607 3.75 2.57143 3.87656 2.57143 4.03125V19.9688C2.57143 20.1234 2.71607 20.25 2.89286 20.25H21.1071C21.2839 20.25 21.4286 20.1234 21.4286 19.9688Z" fill="currentColor" class="path"></path>
          </svg>`;
    return `
      <section class="section-work-content">
        <div class="padding-section-small"></div>
        <div class="padding-global">
          <div class="container-medium">
            <div class="case-content_component">
              <div class="case-content_final">
                <div class="case-content_final-head">
                  <div class="case-content_head">
                    <div class="text-style-label">Results</div>
                    <h2 class="heading-style-h3">Final Prototype</h2>
                  </div>
                </div>
                <a href="${esc(prototype.url)}" target="_blank" class="link-block w-inline-block">
                  <div class="w-layout-hflex site-image-row">
                    ${icon}
                    <div class="text-block-3">Click to see the final prototype</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="padding-section-medium"></div>
        <div class="padding-global is-tiny">
          <div class="line"></div>
        </div>
      </section>`;
  });

  // Side-by-side image row — used for Wireframe galleries, Feedback images,
  // or any section with multiple supporting images.
  eleventyConfig.addShortcode("imageRow", function (images) {
    const items = (images || [])
      .map((img) => {
        if (img.caption) {
          return `<figure><figcaption>${esc(img.caption)}</figcaption><img loading="lazy" sizes="100vw" src="${esc(img.src)}" alt="${esc(img.alt || "")}"></figure>`;
        }
        return `<img loading="lazy" sizes="100vw" src="${esc(img.src)}" alt="${esc(img.alt || "")}">`;
      })
      .join("\n");
    return `<div class="w-layout-hflex site-image-row">${items}</div>`;
  });

  // Conclusion box — "What I've Learned" + "Future Works"
  eleventyConfig.addShortcode("conclusionBox", function (learned, future) {
    return `
      <section class="section-work-content">
        <div class="padding-section-large is-tablet-smaller"></div>
        <div class="padding-global">
          <div class="container-medium">
            <div class="work-content_grid">
              <div class="work-content_content">
                <div class="work-content_head">
                  <div class="text-style-label">Conclusion</div>
                  <h2 class="heading-style-h3">Conclusion</h2>
                </div>
                <p><strong>What I've Learned:<br></strong>${markdownIt.renderInline(esc(learned))}</p>
                <p><strong>Future Works:<br></strong>${markdownIt.renderInline(esc(future))}</p>
              </div>
            </div>
          </div>
        </div>
      </section>`;
  });

  eleventyConfig.setLibrary("md", markdownIt);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
