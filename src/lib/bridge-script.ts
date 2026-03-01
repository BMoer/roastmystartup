/**
 * Returns a JavaScript string to be injected into the proxied iframe.
 * This runs inside the iframe — NOT as React. It communicates with the
 * parent via postMessage.
 *
 * Shows annotations from ALL 5 AT personas simultaneously, limited to
 * 2-3 per section in a round-robin pattern for the "Minenfeld" feel.
 */
export function getBridgeScript(): string {
  return `
(function() {
  if (window.__roastBridgeLoaded) return;
  window.__roastBridgeLoaded = true;

  var atRoastData = null; // { franky: {sectionRoasts}, pflichtner: ..., etc }
  var personaColors = {}; // personaId -> color hex
  var headingMap = {}; // sectionId -> DOM element
  var observer = null;
  var bottomReported = false;

  // Inject styles for annotations
  var style = document.createElement('style');
  style.textContent = [
    '@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;700&display=swap");',
    '.roast-annotation {',
    '  position: relative;',
    '  display: inline-block;',
    '  font-family: "Caveat", cursive;',
    '  pointer-events: none;',
    '  text-shadow: 0 1px 8px rgba(0,0,0,0.6);',
    '  line-height: 1.3;',
    '  animation: roastFadeIn 0.5s ease forwards;',
    '  opacity: 0;',
    '  margin: 4px 8px 8px 0;',
    '  z-index: 99999;',
    '  font-size: 15px;',
    '  font-weight: 500;',
    '}',
    '.roast-annotation-wrap {',
    '  display: flex;',
    '  flex-wrap: wrap;',
    '  gap: 4px 12px;',
    '  margin: 4px 0 8px 0;',
    '}',
    '.roast-annotation-label {',
    '  font-family: sans-serif;',
    '  font-size: 9px;',
    '  font-weight: 700;',
    '  letter-spacing: 0.5px;',
    '  text-transform: uppercase;',
    '  opacity: 0.7;',
    '  display: block;',
    '  margin-bottom: 1px;',
    '}',
    '@keyframes roastFadeIn {',
    '  from { opacity: 0; transform: scale(0.8) rotate(-2deg); }',
    '  to { opacity: 0.85; transform: scale(1) rotate(-1deg); }',
    '}',
  ].join('\\n');
  document.head.appendChild(style);

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);
  }

  function discoverHeadings(sectionIds) {
    headingMap = {};
    var allHeadings = document.querySelectorAll('h1, h2, h3');
    var usedSlugs = {};

    for (var i = 0; i < allHeadings.length; i++) {
      var el = allHeadings[i];
      var text = (el.textContent || '').trim();
      if (!text || text.length < 3) continue;

      var slug = slugify(text);
      if (!slug) slug = 'section-' + i;
      if (usedSlugs[slug]) slug = slug + '-' + i;
      usedSlugs[slug] = true;

      if (sectionIds.indexOf(slug) !== -1) {
        headingMap[slug] = el;
      }
    }
  }

  function removeAnnotations() {
    var existing = document.querySelectorAll('.roast-annotation-wrap');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }
  }

  function createAnnotations() {
    removeAnnotations();
    if (!atRoastData) return;

    var personaIds = Object.keys(atRoastData);
    var sectionIds = Object.keys(headingMap);

    for (var si = 0; si < sectionIds.length; si++) {
      var sectionId = sectionIds[si];
      var headingEl = headingMap[sectionId];
      if (!headingEl) continue;

      // Collect annotations from all personas for this section
      var annotations = [];
      for (var pi = 0; pi < personaIds.length; pi++) {
        var pid = personaIds[pi];
        var persona = atRoastData[pid];
        if (!persona || !persona.sectionRoasts) continue;
        var roast = persona.sectionRoasts[sectionId];
        if (!roast || !roast.annotation) continue;
        annotations.push({ personaId: pid, text: roast.annotation });
      }

      // Round-robin: pick 2-3 annotations per section to avoid clutter
      // Offset by section index so different personas show on different sections
      var maxPerSection = annotations.length <= 3 ? annotations.length : 2 + (si % 2);
      var offset = si % annotations.length;
      var selected = [];
      for (var k = 0; k < maxPerSection && k < annotations.length; k++) {
        selected.push(annotations[(offset + k) % annotations.length]);
      }

      if (selected.length === 0) continue;

      // Create wrapper div
      var wrap = document.createElement('div');
      wrap.className = 'roast-annotation-wrap';

      for (var a = 0; a < selected.length; a++) {
        var ann = document.createElement('div');
        ann.className = 'roast-annotation';
        var color = personaColors[selected[a].personaId] || '#e8dcc0';
        ann.style.color = color;
        ann.style.animationDelay = (a * 0.15) + 's';

        var label = document.createElement('span');
        label.className = 'roast-annotation-label';
        label.style.color = color;
        label.textContent = selected[a].personaId;

        ann.appendChild(label);
        ann.appendChild(document.createTextNode(selected[a].text));
        wrap.appendChild(ann);
      }

      // Insert after the heading
      if (headingEl.nextSibling) {
        headingEl.parentNode.insertBefore(wrap, headingEl.nextSibling);
      } else {
        headingEl.parentNode.appendChild(wrap);
      }
    }
  }

  function setupObserver() {
    if (observer) observer.disconnect();

    var ids = Object.keys(headingMap);
    if (ids.length === 0) return;

    observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          for (var id in headingMap) {
            if (headingMap[id] === entries[i].target) {
              window.parent.postMessage({
                type: 'roast-section-visible',
                sectionId: id
              }, '*');
              break;
            }
          }
        }
      }
    }, { threshold: 0.3 });

    for (var i = 0; i < ids.length; i++) {
      observer.observe(headingMap[ids[i]]);
    }
  }

  function setupScrollListener() {
    window.addEventListener('scroll', function() {
      if (bottomReported) return;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var scrollHeight = document.documentElement.scrollHeight;
      var clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        bottomReported = true;
        window.parent.postMessage({ type: 'roast-reached-bottom' }, '*');
      }
    }, { passive: true });
  }

  // Listen for messages from parent
  window.addEventListener('message', function(e) {
    var msg = e.data;
    if (!msg || !msg.type) return;

    if (msg.type === 'roast-init') {
      atRoastData = msg.atRoastData;
      personaColors = msg.personaColors || {};
      var sectionIds = msg.sectionIds || [];
      discoverHeadings(sectionIds);
      setupObserver();
      setupScrollListener();
      createAnnotations();

      // Report the first visible section
      if (sectionIds.length > 0) {
        var firstId = sectionIds[0];
        if (headingMap[firstId]) {
          window.parent.postMessage({
            type: 'roast-section-visible',
            sectionId: firstId
          }, '*');
        }
      }
    }
  });

  // Tell parent bridge is ready
  window.parent.postMessage({ type: 'roast-bridge-loaded' }, '*');
})();
`;
}
