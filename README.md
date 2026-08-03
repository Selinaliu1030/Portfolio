# Selina Liu's Portfolio

A static portfolio site built with [Eleventy (11ty)](https://www.11ty.dev/). Visual design/CSS originated in Webflow; the site itself is now hand-maintained code — there is no live Webflow project behind it anymore.

## Running it

Requires [Node.js](https://nodejs.org/) (any recent LTS version).

```bash
npm install      # once, or after pulling changes that touch package.json
npm start        # dev server with live reload — http://localhost:8080
npm run build    # one-off production build → _site/
```

`_site/` is fully self-contained static HTML/CSS/JS. Deploy it anywhere that serves static files (GitHub Pages, Netlify, etc.) — no server, database, or build step required at runtime. `_site/` and `node_modules/` are git-ignored; both are always regenerated, never hand-edited.

## How the site is put together

```
src/
├── _includes/
│   ├── layouts/
│   │   ├── base.njk      # <head>, nav, footer, script tags — the shell every page sits in
│   │   ├── page.njk       # generic content page (about, 404, index)
│   │   ├── project.njk    # case-study page: adds the hero header, then base.njk
│   │   └── bare.njk       # no nav/footer — used only by 401.html (Webflow's password-page stub)
│   └── partials/
│       ├── head.njk, nav.njk, footer.njk, scripts.njk
├── projects/
│   ├── projects.json      # tells Eleventy: everything here is a "project", use project.njk, output as <slug>.html
│   ├── theGiver.md, taski.md, streamsync.md
├── index.njk               # homepage — loops over all projects automatically
├── about.html
├── 404.html, 401.html
├── css/                     # normalize.css, webflow.css, selinaliu-portfolio.webflow.css — Webflow-generated, do not hand-edit
├── css/site.css             # the one hand-written stylesheet — canonical classes for shortcode-authored content
├── js/webflow.js            # Webflow's interaction runtime — do not hand-edit
├── images/, fonts/
.eleventy.js                 # Eleventy config: passthrough copies, the projects collection, and all shortcodes
```

`css/normalize.css`, `css/webflow.css`, `css/selinaliu-portfolio.webflow.css`, and `js/webflow.js` came out of Webflow's export and drive all the visual styling and scroll animations. Leave them alone — if the design ever needs to change, that's a CSS edit in `site.css` or in the Webflow files directly, not something to regenerate.

jQuery and GSAP (core + ScrollTrigger + SplitText) are installed as npm packages (`package.json`) and copied into the build by `.eleventy.js` — not loaded from a CDN. To update their versions: `npm install gsap@latest jquery@latest` and rebuild.

## Adding a new case study

This is the main thing you'll do. A project is one Markdown file in `src/projects/`, rendered through five reusable shortcodes defined in `.eleventy.js`. It automatically appears on the homepage — correctly linked, correctly ordered — with zero other files to touch.

1. **Create `src/projects/your-slug.md`.** The filename becomes the URL (`your-slug.html`), so pick it deliberately — it's permanent once linked.

2. **Fill in frontmatter.** Copy an existing project (`theGiver.md` is the most complete example) as a starting point. Key fields:

   ```yaml
   ---
   order: 4                          # lower = appears higher on the homepage
   tag: "PROJECT NAME"                # small label above the hero title
   subtitle: "One-line description"
   heroHeading: "The big hero headline"
   heroImage: images/your-hero.jpg
   heroImageAlt: "Describe the image"
   title: "Project Name — Selina Liu's Portfolio"   # browser tab title
   description: "One-sentence summary for search/social previews"
   cardTitle: "Project Name"          # homepage card
   cardTagline: "Short tagline"
   thumbnail: images/your-hero.jpg
   thumbnailSrcset: "images/your-hero-p-500.jpg 500w, images/your-hero.jpg 1200w"
   skills: "Figma, React, ..."
   person: "Group Project" 
   role: "Front-end, Research"
   overview: "2-4 sentence project summary."
   prototype:
     url: "https://link-to-your-prototype"
     icon: link                      # or a path like images/figma-icon.png for a custom icon
   features:
     - tag: "core Feature 1"
       title: "Feature Name"
       image: images/feature.gif      # or `images:` (a list) for more than one image
       parts:
         - label: "User Side"         # omit `label` entirely for a single-part feature
           body: "..."
         - label: "Other Side"
           body: "..."
     # add as many features as the project needs — this list can be any length
   conclusion:
     learned: "What I've learned..."
     future: "Future work..."
   ---
   ```

3. **Write the body** as an ordered list of shortcode calls — this is literally the outline of the page:

   ```njk
   {% metaBox skills, person, role, overview %}

   {% section "background", "Background" %}
   Whatever Markdown you want — **bold**, *italic*, [links](...), ![images](images/foo.png).
   {% endsection %}

   {% section "background", "Target Audience" %}
   ...
   {% endsection %}

   {% prototypeCallout prototype %}

   {% for f in features %}{% featureBlock f %}{% endfor %}

   {% section "competitors", "Current Market" %}
   ...
   {% endsection %}

   {% section "User needs", "Interview" %}
   ...
   {% endsection %}

   {% conclusionBox conclusion.learned, conclusion.future %}
   ```

   Only include the sections a project actually has — "Ideation," "Wireframe," and similar are optional; just omit the `{% section %}` call if there's nothing to say. For a row of side-by-side images (a wireframe gallery, before/after shots), use the `imageRow` shortcode:

   ```njk
   {% imageRow [
     { src: "images/one.jpg", alt: "Description", caption: "Optional caption" },
     { src: "images/two.jpg", alt: "Description" }
   ] %}
   ```

4. **Add the images** to `src/images/` (any format Webflow already exports works — `.png`, `.jpg`, `.gif`; `srcset` variants are optional but keep the responsive-image behavior consistent with older content).

5. **Run `npm start`** and check `http://localhost:8080/your-slug.html`, and confirm the new card shows up correctly on the homepage.

That's the entire process — no nav/footer edits, no homepage edits, no risk of a mismatched link (the homepage always links to whatever file actually exists).

## Editing everything else

- **Nav or footer** (adding a link, changing "Contact," etc.): edit `src/_includes/partials/nav.njk` / `footer.njk` once — it applies to every page.
- **About page**: `src/about.html` — plain HTML, edited directly (its timeline/interest blocks weren't turned into a shortcode since they change rarely).
- **Site-wide default title/description**: `src/_includes/partials/head.njk`.
- **Global page count, default meta description, etc.**: same file.

## Known follow-ups (not done, deliberately deferred)

- Favicon is still the original Webflow template's icon, not a custom one.
- `videos/` at the repo root is unreferenced by any page and sits outside `src/`, so it isn't part of the Eleventy build at all. Left in place per an earlier decision to defer cleanup; delete it or wire it into a page (and move it into `src/videos/` with a passthrough copy in `.eleventy.js`) whenever that gets revisited.
- Images are unoptimized (no WebP conversion, a few multi-MB GIFs) — a real but separate project.
- No deploy/CI pipeline is set up; `npm run build` + manually uploading `_site/` (or wiring up GitHub Pages/Netlify) is the current story.
- Alt text is filled in for all structural images (hero, thumbnails, feature images); inline prose images embedded inside `{% section %}` bodies were given reasonable alt text during the initial migration but new ones should get real alt text too, not `alt=""`.
