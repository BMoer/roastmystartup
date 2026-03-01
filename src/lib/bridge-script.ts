/**
 * Returns a JavaScript string to be injected into the proxied iframe.
 * This runs inside the iframe — NOT as React. It communicates with the
 * parent via postMessage.
 */
export function getBridgeScript(): string {
  return `
(function() {
  if (window.__roastBridgeLoaded) return;
  window.__roastBridgeLoaded = true;

  var sectionData = null;
  var currentMode = '';
  var headingMap = {}; // sectionId -> DOM element
  var annotationEls = {}; // sectionId -> annotation DOM element
  var observer = null;
  var bottomReported = false;

  // Inject styles for annotations
  var style = document.createElement('style');
  style.textContent = [
    '@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;700&display=swap");',
    '.roast-annotation {',
    '  position: relative;',
    '  display: block;',
    '  font-family: "Caveat", cursive;',
    '  pointer-events: none;',
    '  white-space: nowrap;',
    '  text-shadow: 0 1px 8px rgba(0,0,0,0.6);',
    '  line-height: 1.3;',
    '  animation: roastFadeIn 0.5s ease forwards;',
    '  opacity: 0;',
    '  margin: 4px 0 8px 0;',
    '  z-index: 99999;',
    '}',
    '.roast-annotation--vc {',
    '  color: #00E5FF;',
    '  font-weight: 700;',
    '  font-size: 18px;',
    '}',
    '.roast-annotation--beamter {',
    '  color: #C0392B;',
    '  font-weight: 400;',
    '  font-size: 15px;',
    '  font-style: italic;',
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
    var existing = document.querySelectorAll('.roast-annotation');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }
    annotationEls = {};
  }

  function createAnnotations(mode, roastData) {
    removeAnnotations();
    if (!mode || !roastData) return;

    var persona = roastData[mode];
    if (!persona || !persona.sectionRoasts) return;

    var ids = Object.keys(headingMap);
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var roast = persona.sectionRoasts[id];
      if (!roast || !roast.annotation) continue;

      var headingEl = headingMap[id];
      if (!headingEl) continue;

      var ann = document.createElement('div');
      ann.className = 'roast-annotation roast-annotation--' + mode;
      ann.textContent = roast.annotation;
      annotationEls[id] = ann;

      // Insert after the heading
      if (headingEl.nextSibling) {
        headingEl.parentNode.insertBefore(ann, headingEl.nextSibling);
      } else {
        headingEl.parentNode.appendChild(ann);
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
          // Find section id for this element
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
      sectionData = msg.roastData;
      var sectionIds = msg.sectionIds || [];
      discoverHeadings(sectionIds);
      setupObserver();
      setupScrollListener();

      // If there is already an active mode, apply annotations
      if (msg.mode) {
        currentMode = msg.mode;
        createAnnotations(currentMode, sectionData);
      }

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

    if (msg.type === 'roast-set-mode') {
      currentMode = msg.mode || '';
      createAnnotations(currentMode, sectionData);
    }
  });

  // Tell parent bridge is ready
  window.parent.postMessage({ type: 'roast-bridge-loaded' }, '*');
})();
`;
}
