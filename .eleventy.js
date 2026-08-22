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

  // Metadata box: Skills / Person / Role / Project Overview — a row of
  // small labeled facts plus the overview as a plain paragraph, sitting
  // straight on the page (see .meta-box in site.css) rather than a
  // boxed dt/dd grid.
  eleventyConfig.addShortcode("metaBox", function (skills, person, role, overview) {
    return `
      <section class="section-work-content">
        <div class="padding-section-large is-tablet-smaller"></div>
        <div class="padding-global">
          <div class="container-medium">
            <div class="meta-box">
              <ul class="meta-facts">
                <li><span class="meta-facts_label">Skills</span>${esc(skills)}</li>
                <li><span class="meta-facts_label">Person</span>${esc(person)}</li>
                <li><span class="meta-facts_label">Role</span>${esc(role)}</li>
              </ul>
              <p class="meta-overview">${esc(overview)}</p>
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
  // labeled parts (e.g. "Patient Side" / "Caregiver Side"). Images render
  // inside a clickable frame (see .site-feature-frame in site.css and
  // src/js/site-lightbox.js) that opens a larger view on click — the
  // frame + lightbox are new, but apply to every project page since the
  // "raw native pixel size" bug they fix isn't StreamSync-specific.
  eleventyConfig.addShortcode("featureBlock", function (f) {
    const partsHtml = (f.parts || [])
      .map((p) => p.label
        ? `<strong>${esc(p.label)}<br>‍</strong>${markdownIt.renderInline(p.body)}`
        : markdownIt.renderInline(p.body))
      .join("<br>‍<br>‍");
    function frame(src, alt, caption, portrait) {
      const cap = caption
        ? `<p class="site-feature-caption">${markdownIt.renderInline(esc(caption))}</p>`
        : "";
      const mod = portrait ? " is-portrait" : "";
      return `
        <figure class="site-feature-figure${mod}">
          <div class="site-feature-frame${mod}">
            <img loading="lazy" src="${esc(src)}" alt="${esc(alt || "")}" class="site-feature-img">
            <span class="site-feature-frame_expand" aria-hidden="true">⤢</span>
          </div>${cap}
        </figure>`;
    }
    let img = "";
    if (f.images && f.images.length) {
      img = `<div class="w-layout-hflex site-image-row">${f.images
        .map((i) => frame(i.src, i.alt, i.caption, i.portrait || f.portrait))
        .join("")}</div>`;
    } else if (f.image) {
      img = frame(f.image, f.imageAlt, f.caption, f.portrait);
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

  // TWS-to-mapping flow diagram — header row (left label / right label) +
  // N rows, each an {aspect, prompt} pair revealed left→right on scroll.
  eleventyConfig.addShortcode("twsFlowDiagram", function (rows, headLeft, headRight) {
    const arrow = `<svg viewBox="0 0 24 16" fill="none"><path d="M0 8h20M14 2l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const rowsHtml = (rows || [])
      .map((r) => `
        <div class="tws-flow_row">
          <div class="tws-flow_aspect">${esc(r.aspect)}</div>
          <div class="tws-flow_arrow" aria-hidden="true">${arrow}</div>
          <div class="tws-flow_prompt">${esc(r.prompt)}</div>
        </div>`)
      .join("");
    return `
      <div class="tws-flow">
        <div class="tws-flow_head">
          <div class="tws-flow_head-aspect">${esc(headLeft || "TWS")}</div>
          <div class="tws-flow_head-spacer" aria-hidden="true"></div>
          <div class="tws-flow_head-prompt">${esc(headRight || "Meditation Prompt")}</div>
        </div>
        <div class="tws-flow_rows">${rowsHtml}</div>
      </div>`;
  });

  // Storyboard — sequence of illustrated panels + real captions, revealed
  // left-to-right on scroll (see src/js/interactive.js .storyboard handling).
  eleventyConfig.addShortcode("storyboard", function (panels) {
    const arrow = `<svg viewBox="0 0 24 16" fill="none"><path d="M0 8h20M14 2l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const items = (panels || [])
      .map((p, i, arr) => {
        const panel = `
        <figure class="storyboard_panel">
          <img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy">
          <figcaption>${esc(p.caption)}</figcaption>
        </figure>`;
        const connector = i < arr.length - 1
          ? `<div class="storyboard_arrow" aria-hidden="true">${arrow}</div>`
          : "";
        return panel + connector;
      })
      .join("");
    return `
      <div class="storyboard">
        <div class="storyboard_panels">${items}</div>
      </div>`;
  });

  // Interview personas + causal chain — replaces the flattened
  // 5.-訪談驗證.png. Two groups: persona cards (avatar/name/quote) and a
  // 3-step causal chain connected by dotted arrows (see
  // src/js/interactive.js .persona-chain handling for the reveal order).
  eleventyConfig.addShortcode("personaChain", function (data) {
    const dots = `<svg viewBox="0 0 32 14" fill="none"><line x1="0" y1="7" x2="24" y2="7" stroke="currentColor" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round"/><path d="M20 2l6 5-6 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
    const cardsHtml = (data.personas || [])
      .map(
        (p) => `
        <figure class="persona-card">
          <img src="${esc(p.avatar)}" alt="${esc(p.name)}, interviewee">
          <figcaption><strong>${esc(p.name)}</strong><span>${esc(p.quote)}</span></figcaption>
        </figure>`
      )
      .join("");
    const chainHtml = (data.chain || [])
      .map((step, i, arr) => {
        const item = `<div class="persona-chain_step">${esc(step)}</div>`;
        const connector = i < arr.length - 1
          ? `<div class="persona-chain_dots" aria-hidden="true">${dots}</div>`
          : "";
        return item + connector;
      })
      .join("");
    return `
      <div class="persona-chain">
        <div class="persona-chain_cards">${cardsHtml}</div>
        <div class="persona-chain_flow">${chainHtml}</div>
      </div>`;
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
