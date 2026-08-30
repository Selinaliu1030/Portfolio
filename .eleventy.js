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
                <li class="meta-facts_full"><span class="meta-facts_label">Skills</span>${esc(skills)}</li>
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
    const head = `
      <div class="work-content_head">
        <div class="text-style-label">${esc(f.tag)}</div>
        <h2 class="heading-style-h3">${esc(f.title)}</h2>
      </div>`;
    // Portrait screenshots are narrow enough (260px, see .is-portrait in
    // site.css) to sit beside the text instead of stacked under a full
    // paragraph's worth of it — landscape features keep the original
    // stack, where a wide image next to text would just squeeze the text.
    const content = f.portrait
      ? `
        <div class="site-feature-row is-portrait">
          <div class="site-feature-text">
            ${head}
            <p>${partsHtml}</p>
          </div>
          <div class="site-feature-media">${img}</div>
        </div>`
      : `
        ${head}
        <div class="w-layout-vflex site-section-body">
          <p>${partsHtml}</p>${img}
        </div>`;
    return `
      <section class="section-work-content">
        <div class="padding-section-large is-tablet-smaller"></div>
        <div class="padding-global">
          <div class="container-medium">
            <div class="work-content_grid">
              <div class="work-content_content">${content}
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
                <a href="${esc(prototype.url)}" target="_blank" class="link-block w-inline-block site-prototype-link">
                  <div class="w-layout-hflex site-image-row">
                    ${icon}
                    <div class="text-block-3">Click to see the final prototype</div>
                    <span class="site-prototype-link_arrow" aria-hidden="true">→</span>
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

  // Insight bar charts — replaces a flattened chart image with live,
  // scroll-revealed bars (see .insight-bars in site.css and the
  // .insight-bars_group handling in src/js/interactive.js). Takes an
  // array of {title, items: [{label, value}]} groups, rendered side by
  // side (e.g. Pull Factors / Push Factors).
  eleventyConfig.addShortcode("insightBars", function (groups) {
    function group(g, i) {
      const rows = (g.items || [])
        .map(
          (item) => `
          <div class="insight-bar_row">
            <div class="insight-bar_label">${esc(item.label)}</div>
            <div class="insight-bar_value">${esc(item.value)}%</div>
            <div class="insight-bar_track"><div class="insight-bar_fill" style="width: ${esc(item.value)}%"></div></div>
          </div>`
        )
        .join("");
      return `
        <div class="insight-bars_group is-${i === 0 ? "a" : "b"}">
          <h3 class="insight-bars_title">${esc(g.title)}</h3>
          <div class="insight-bars_rows">${rows}</div>
        </div>`;
    }
    return `<div class="insight-bars">${(groups || []).map(group).join("")}</div>`;
  });

  // Problem & Goals — a "the shift" diagram (old model struck through →
  // new model) plus expandable finding cards, replacing a flat
  // Problem/Goals bullet list. See .problem-goals in site.css and the
  // accordion wiring in src/js/problem-goals.js. Card 0 renders open by
  // default so the pattern is self-teaching without JS running first.
  eleventyConfig.addShortcode("problemGoals", function (data) {
    const findings = (data.findings || [])
      .map((f, i) => {
        const idx = String(i + 1).padStart(2, "0");
        const isOpen = i === 0;
        return `
        <div class="problem-goals_card${isOpen ? " is-open" : ""}">
          <button type="button" class="problem-goals_card-head" aria-expanded="${isOpen}" aria-controls="pg-body-${i}">
            <span class="problem-goals_index">${idx}</span>
            <span class="problem-goals_card-title">${markdownIt.renderInline(f.title)}</span>
            <span class="problem-goals_pill">
              <span class="problem-goals_pill-label">${isOpen ? "Hide" : "Why it matters"}</span>
              <span class="problem-goals_caret" aria-hidden="true">&#9662;</span>
            </span>
          </button>
          <div class="problem-goals_card-body" id="pg-body-${i}" role="region">
            <p>${markdownIt.renderInline(f.body)}</p>
          </div>
        </div>`;
      })
      .join("");
    return `
      <div class="problem-goals">
        <div class="problem-goals_eyebrow">${esc(data.eyebrow || "The shift")}</div>
        <div class="problem-goals_shift">
          <div class="problem-goals_shift-panel is-from">
            <div class="problem-goals_shift-kicker">${esc(data.from.kicker)}</div>
            <div class="problem-goals_shift-headline">${esc(data.from.headline)}</div>
          </div>
          <div class="problem-goals_shift-arrow" aria-hidden="true">&rarr;</div>
          <div class="problem-goals_shift-panel is-to">
            <div class="problem-goals_shift-kicker">${esc(data.to.kicker)}</div>
            <div class="problem-goals_shift-headline">${esc(data.to.headline)}</div>
          </div>
        </div>
        <div class="problem-goals_outcome">
          <span class="problem-goals_dot" aria-hidden="true"></span>
          <span>${markdownIt.renderInline(data.outcome)}</span>
        </div>
        <div class="problem-goals_findings-head">
          <div class="problem-goals_eyebrow">${esc(data.findingsLabel || "Why: 4 findings")}</div>
          <div class="problem-goals_hint">${esc(data.hint || "Click any card to open")}</div>
        </div>
        <div class="problem-goals_cards">${findings}</div>
      </div>`;
  });

  // Journey map — an emotion curve where hovering (or focusing) a point
  // shows only that stage's Experience/Opportunity, replacing a dense
  // flattened table image. See .journey-map in site.css and
  // src/js/journey-map.js for the interaction. Each stage's `mood` is
  // "low" | "neutral" | "high" — a 3-tier classification, not a literal
  // color, so the actual hex/token stays in CSS (mapped onto the site's
  // own palette per page rather than the handoff's standalone colors).
  eleventyConfig.addShortcode("journeyMap", function (data) {
    const stages = data.stages || [];
    const curvePoints = stages.map((s) => s.point.join(",")).join(" ");

    const dots = stages
      .map(
        (s, i) => `
          <circle class="journey-map_dot" data-index="${i}" data-mood="${esc(s.mood)}" cx="${s.point[0]}" cy="${s.point[1]}" r="9" stroke-width="4" tabindex="-1"></circle>`
      )
      .join("");

    const hits = stages
      .map(
        (s, i) => `
          <circle class="journey-map_hit" data-index="${i}" cx="${s.point[0]}" cy="${s.point[1]}" r="34"></circle>`
      )
      .join("");

    const labels = stages
      .map(
        (s, i) => `
          <button type="button" class="journey-map_label" data-index="${i}" data-mood="${esc(s.mood)}" aria-pressed="${i === 0}">${esc(s.name)}</button>`
      )
      .join("");

    const panels = stages
      .map((s, i) => {
        const exp = (s.experience || []).map((e) => `<li>${markdownIt.renderInline(e)}</li>`).join("");
        const opp = (s.opportunity || []).map((o) => `<li>${markdownIt.renderInline(o)}</li>`).join("");
        return `
          <div class="journey-map_panel" data-index="${i}"${i === 0 ? "" : ' hidden'}>
            <div class="journey-map_col">
              <div class="journey-map_col-label is-experience">Experience: ${esc(s.name)}</div>
              <ul>${exp}</ul>
            </div>
            <div class="journey-map_col">
              <div class="journey-map_col-label is-opportunity">Opportunity</div>
              <ul>${opp}</ul>
            </div>
          </div>`;
      })
      .join("");

    return `
      <div class="journey-map">
        <div class="journey-map_header">
          <div class="journey-map_scenario">
            <div class="journey-map_eyebrow">Scenario</div>
            <p>${markdownIt.renderInline(data.scenario)}</p>
          </div>
          <div class="journey-map_stats">
            <div class="journey-map_stat">
              <div class="journey-map_stat-label">Low point</div>
              <div class="journey-map_stat-value">${esc(data.lowPoint)}</div>
            </div>
            <div class="journey-map_stat">
              <div class="journey-map_stat-label">High point</div>
              <div class="journey-map_stat-value">${esc(data.highPoint)}</div>
            </div>
          </div>
        </div>
        <div class="journey-map_chart-card">
          <div class="journey-map_chart-scroll">
            <svg class="journey-map_svg" viewBox="0 0 1060 300" role="img" aria-label="${esc(data.chartSummary || "Emotional curve across the journey, from a low point to a high point")}">
              <line x1="90" y1="70" x2="1040" y2="70" class="journey-map_grid"></line>
              <line x1="90" y1="160" x2="1040" y2="160" class="journey-map_grid"></line>
              <line x1="90" y1="250" x2="1040" y2="250" class="journey-map_grid"></line>
              <text x="76" y="75" text-anchor="end" class="journey-map_axis">Happy</text>
              <text x="76" y="165" text-anchor="end" class="journey-map_axis">Neutral</text>
              <text x="76" y="255" text-anchor="end" class="journey-map_axis">Unhappy</text>
              <polyline points="${curvePoints}" class="journey-map_line"></polyline>
              <circle class="journey-map_pulse" r="14"></circle>
              <g class="journey-map_dots">${dots}</g>
              <g class="journey-map_sparks"></g>
              <g class="journey-map_hits" fill="transparent">${hits}</g>
            </svg>
          </div>
          <div class="journey-map_labels">${labels}</div>
          <div class="journey-map_panels">${panels}</div>
        </div>
      </div>`;
  });

  // Side-by-side image row — used for Wireframe galleries, Feedback images,
  // or any section with multiple supporting images.
  eleventyConfig.addShortcode("imageRow", function (images) {
    const items = (images || [])
      .map((img) => {
        // Opt-in per image: reuses the same .site-feature-frame markup
        // as featureBlock, so it picks up the click-to-enlarge lightbox
        // (src/js/site-lightbox.js queries that class directly) without
        // any new JS — existing imageRow calls that don't set this stay
        // exactly as before.
        if (img.zoomable) {
          const cap = img.caption
            ? `<p class="site-feature-caption">${esc(img.caption)}</p>`
            : "";
          return `
            <figure class="site-feature-figure">
              <div class="site-feature-frame">
                <img loading="lazy" sizes="100vw" src="${esc(img.src)}" alt="${esc(img.alt || "")}" class="site-feature-img">
                <span class="site-feature-frame_expand" aria-hidden="true">⤢</span>
              </div>${cap}
            </figure>`;
        }
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
