/**
 * Returns a JavaScript string to be injected into the proxied iframe.
 * This runs inside the iframe — NOT as React. It communicates with the
 * parent via postMessage.
 *
 * Shows speech bubbles from AT personas scattered across the page,
 * each appearing on scroll via IntersectionObserver. Bubbles sit in
 * document flow with varied horizontal offsets so they never overlap.
 */
export function getBridgeScript(): string {
  return `
(function() {
  if (window.__roastBridgeLoaded) return;
  window.__roastBridgeLoaded = true;

  var atRoastData = null;
  var personaColors = {};
  var personaNames = {};
  var personaAvatarSvgs = {};
  var headingMap = {};
  var sectionObserver = null;
  var bubbleObserver = null;
  var bottomReported = false;

  var style = document.createElement('style');
  style.textContent = [
    '@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;700&display=swap");',
    '.roast-bubble-wrap {',
    '  position: relative;',
    '  z-index: 99999;',
    '  pointer-events: none;',
    '}',
    '.roast-speech-bubble {',
    '  display: flex;',
    '  align-items: flex-start;',
    '  gap: 8px;',
    '  max-width: 300px;',
    '  width: fit-content;',
    '  padding: 10px 14px;',
    '  border-radius: 14px 14px 14px 4px;',
    '  background: rgba(14, 13, 11, 0.88);',
    '  backdrop-filter: blur(8px);',
    '  -webkit-backdrop-filter: blur(8px);',
    '  border: 1.5px solid;',
    '  font-family: "Caveat", cursive;',
    '  line-height: 1.3;',
    '  pointer-events: none;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.4);',
    '  margin-bottom: 6px;',
    '  opacity: 0;',
    '  transform: scale(0.85) translateY(12px);',
    '  transition: opacity 0.5s ease, transform 0.5s ease;',
    '}',
    '.roast-speech-bubble.is-visible {',
    '  opacity: 0.92;',
    '  transform: scale(1) rotate(var(--bubble-rot, -1deg)) translateY(0);',
    '}',
    '.roast-bubble-avatar {',
    '  flex-shrink: 0;',
    '  width: 28px;',
    '  height: 28px;',
    '  border-radius: 50%;',
    '  overflow: hidden;',
    '  background: rgba(255,255,255,0.05);',
    '}',
    '.roast-bubble-avatar svg {',
    '  width: 28px;',
    '  height: 28px;',
    '}',
    '.roast-bubble-body {',
    '  flex: 1;',
    '  min-width: 0;',
    '}',
    '.roast-bubble-name {',
    '  font-family: sans-serif;',
    '  font-size: 10px;',
    '  font-weight: 700;',
    '  letter-spacing: 0.5px;',
    '  text-transform: uppercase;',
    '  display: block;',
    '  margin-bottom: 3px;',
    '}',
    '.roast-bubble-text {',
    '  font-size: 16px;',
    '  font-weight: 500;',
    '  text-shadow: 0 1px 6px rgba(0,0,0,0.5);',
    '}',
  ].join('\\n');
  document.head.appendChild(style);

  // Horizontal margin-left offsets (%) to scatter bubbles across the page
  var marginOffsets = [2, 45, 20, 55, 8, 38, 60, 12, 50, 28, 5, 42];
  var rotations = [-2, 1, -1, 1.5, -0.5, 2, -1.5, 0.5];

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

  function removeBubbles() {
    if (bubbleObserver) bubbleObserver.disconnect();
    var existing = document.querySelectorAll('.roast-bubble-wrap');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }
  }

  function setupBubbleObserver() {
    if (bubbleObserver) bubbleObserver.disconnect();

    bubbleObserver = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          bubbleObserver.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.15 });

    var allBubbles = document.querySelectorAll('.roast-speech-bubble');
    for (var i = 0; i < allBubbles.length; i++) {
      bubbleObserver.observe(allBubbles[i]);
    }
  }

  var globalBubbleIndex = 0;

  function createSpeechBubbles() {
    removeBubbles();
    if (!atRoastData) return;
    globalBubbleIndex = 0;

    var personaIds = Object.keys(atRoastData);
    var sectionIds = Object.keys(headingMap);

    for (var si = 0; si < sectionIds.length; si++) {
      var sectionId = sectionIds[si];
      var headingEl = headingMap[sectionId];
      if (!headingEl) continue;

      var bubbles = [];
      for (var pi = 0; pi < personaIds.length; pi++) {
        var pid = personaIds[pi];
        var persona = atRoastData[pid];
        if (!persona || !persona.sectionRoasts) continue;
        var roast = persona.sectionRoasts[sectionId];
        if (!roast || !roast.comment) continue;
        bubbles.push({ personaId: pid, comment: roast.comment });
      }

      var maxPerSection = bubbles.length <= 3 ? bubbles.length : 2 + (si % 2);
      var offset = si % bubbles.length;
      var selected = [];
      for (var k = 0; k < maxPerSection && k < bubbles.length; k++) {
        selected.push(bubbles[(offset + k) % bubbles.length]);
      }

      if (selected.length === 0) continue;

      var wrap = document.createElement('div');
      wrap.className = 'roast-bubble-wrap';

      for (var a = 0; a < selected.length; a++) {
        var item = selected[a];
        var color = personaColors[item.personaId] || '#e8dcc0';
        var rot = rotations[globalBubbleIndex % rotations.length];
        var ml = marginOffsets[globalBubbleIndex % marginOffsets.length];
        globalBubbleIndex++;

        var bubble = document.createElement('div');
        bubble.className = 'roast-speech-bubble';
        bubble.style.borderColor = color;
        bubble.style.setProperty('--bubble-rot', rot + 'deg');
        bubble.style.marginLeft = ml + '%';

        // Avatar
        var avatarWrap = document.createElement('div');
        avatarWrap.className = 'roast-bubble-avatar';
        var svgMarkup = personaAvatarSvgs[item.personaId];
        if (svgMarkup) {
          avatarWrap.innerHTML = svgMarkup;
        }

        // Body (name + text)
        var body = document.createElement('div');
        body.className = 'roast-bubble-body';

        var nameEl = document.createElement('span');
        nameEl.className = 'roast-bubble-name';
        nameEl.style.color = color;
        nameEl.textContent = personaNames[item.personaId] || item.personaId;

        var textEl = document.createElement('div');
        textEl.className = 'roast-bubble-text';
        textEl.style.color = color;
        textEl.textContent = item.comment;

        body.appendChild(nameEl);
        body.appendChild(textEl);

        bubble.appendChild(avatarWrap);
        bubble.appendChild(body);
        wrap.appendChild(bubble);
      }

      if (headingEl.nextSibling) {
        headingEl.parentNode.insertBefore(wrap, headingEl.nextSibling);
      } else {
        headingEl.parentNode.appendChild(wrap);
      }
    }

    // Observe all bubbles for scroll-triggered reveal
    setupBubbleObserver();
  }

  function setupObserver() {
    if (sectionObserver) sectionObserver.disconnect();

    var ids = Object.keys(headingMap);
    if (ids.length === 0) return;

    sectionObserver = new IntersectionObserver(function(entries) {
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
      sectionObserver.observe(headingMap[ids[i]]);
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

  window.addEventListener('message', function(e) {
    var msg = e.data;
    if (!msg || !msg.type) return;

    if (msg.type === 'roast-init') {
      atRoastData = msg.atRoastData;
      personaColors = msg.personaColors || {};
      personaNames = msg.personaNames || {};
      personaAvatarSvgs = msg.personaAvatarSvgs || {};
      var sectionIds = msg.sectionIds || [];
      discoverHeadings(sectionIds);
      setupObserver();
      setupScrollListener();
      createSpeechBubbles();

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

  window.parent.postMessage({ type: 'roast-bridge-loaded' }, '*');
})();
`;
}
