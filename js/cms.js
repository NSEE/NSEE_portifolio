/* =============================================
   NSEE Portfolio — CMS Renderer (cms.js)
   Fetches data/content.json and renders dynamic
   sections: team, news, opportunities.
   Also applies translation overrides.
   ============================================= */

(function () {
  /* ---- SVG icons used for news cards ---- */
  const NEWS_ICONS = {
    globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="56" height="56"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg>`,
    document: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="56" height="56"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="56" height="56"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    rocket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="56" height="56"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`
  };

  /* ---- Helper: get a translated string from window.translations ---- */
  function t(lang, key) {
    return (window.translations && window.translations[lang] && window.translations[lang][key]) || '';
  }

  /* ---- Load content.json ---- */
  async function loadContent() {
    try {
      const resp = await fetch('data/content.json');
      if (!resp.ok) return null;
      return await resp.json();
    } catch (e) {
      console.warn('CMS: could not load data/content.json', e);
      return null;
    }
  }

  /* ---- Render team grid ---- */
  function renderTeam(members, lang) {
    const grid = document.getElementById('teamGrid');
    if (!grid || !members) return;
    grid.innerHTML = '';
    members.forEach(m => {
      const hasLattes  = m.lattes  && m.lattes  !== '#' && m.lattes  !== '';
      const hasLinked  = m.linkedin && m.linkedin !== '#' && m.linkedin !== '';
      const card = document.createElement('div');
      card.className = 'member-card';
      card.innerHTML = `
        <img class="member-photo" src="${escHtml(m.photo || '')}"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'member-photo-placeholder',textContent:'👤'}))"
             alt="${escHtml(m.name)}" />
        <div class="member-info">
          <h3>${escHtml(m.name)}</h3>
          <span class="role" data-i18n="${escHtml(m.role)}"></span>
          <p class="bio">${escHtml(m.bio || '')}</p>
          <div class="member-links">
            <a href="${hasLattes  ? escHtml(m.lattes)   : '#'}"
               class="member-link-btn${hasLattes  ? '' : ' disabled'}"
               ${hasLattes  ? '' : 'aria-disabled="true"'}
               target="_blank" rel="noopener">${t(lang, 'member.lattes') || 'Lattes'}</a>
            <a href="${hasLinked  ? escHtml(m.linkedin) : '#'}"
               class="member-link-btn${hasLinked  ? '' : ' disabled'}"
               ${hasLinked  ? '' : 'aria-disabled="true"'}
               target="_blank" rel="noopener">${t(lang, 'member.linkedin') || 'LinkedIn'}</a>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  /* ---- Render news grid ---- */
  function renderNews(items, lang) {
    const grid = document.getElementById('newsGrid');
    if (!grid || !items) return;
    const readMore = t(lang, 'news.readmore') || 'Read more';
    grid.innerHTML = '';
    items.forEach(item => {
      const icon    = NEWS_ICONS[item.icon] || NEWS_ICONS.globe;
      const date    = (item.date    && (item.date[lang]    || item.date.pt))    || '';
      const title   = (item.title   && (item.title[lang]   || item.title.pt))   || '';
      const desc    = (item.desc    && (item.desc[lang]    || item.desc.pt))    || '';
      const link    = item.link || 'projects.html';
      const article = document.createElement('article');
      article.className = 'news-card';
      article.innerHTML = `
        <div class="news-thumb" aria-hidden="true">${icon}</div>
        <div class="news-body">
          <span class="news-date">${escHtml(date)}</span>
          <h3>${escHtml(title)}</h3>
          <p>${escHtml(desc)}</p>
          <a href="${escHtml(link)}" class="btn btn-outline">${escHtml(readMore)}</a>
        </div>`;
      grid.appendChild(article);
    });
  }

  /* ---- Render opportunities grid ---- */
  function renderOpportunities(items, lang) {
    const grid = document.getElementById('oppGrid');
    if (!grid || !items) return;
    const applyLabel = t(lang, 'opp.apply') || 'Apply / Learn more';
    grid.innerHTML = '';
    items.forEach(item => {
      const typeKey   = `opp.type.${item.category}`;
      const typeLabel = t(lang, typeKey) || item.category;
      const deadline  = (item.deadline && (item.deadline[lang] || item.deadline.pt)) || '';
      const title     = (item.title    && (item.title[lang]    || item.title.pt))    || '';
      const desc      = (item.desc     && (item.desc[lang]     || item.desc.pt))     || '';
      const agency    = (item.agency   && (item.agency[lang]   || item.agency.pt))   || '';
      const link      = item.link || 'contact.html';
      const article   = document.createElement('article');
      article.className = 'opp-card';
      article.setAttribute('data-opp-category', item.category);
      article.innerHTML = `
        <div class="opp-header">
          <span class="tag" data-type="${escHtml(item.category)}">${escHtml(typeLabel)}</span>
          <span class="opp-deadline">${escHtml(deadline)}</span>
        </div>
        <h3>${escHtml(title)}</h3>
        <p>${escHtml(desc)}</p>
        <div class="opp-meta">${escHtml(agency)}</div>
        <a href="${escHtml(link)}" class="btn btn-outline">${escHtml(applyLabel)}</a>`;
      grid.appendChild(article);
    });

    /* Re-apply active filter if one is already selected */
    const activeChip = document.querySelector('.filter-chip.active[data-opp-filter]');
    if (activeChip && activeChip.dataset.oppFilter !== 'all') {
      const fv = activeChip.dataset.oppFilter;
      grid.querySelectorAll('.opp-card').forEach(c => {
        c.hidden = c.dataset.oppCategory !== fv;
      });
    }
  }

  /* ---- Render all sections with current language ---- */
  function renderAll(data, lang) {
    if (data.team)          renderTeam(data.team, lang);
    if (data.news)          renderNews(data.news, lang);
    if (data.opportunities) renderOpportunities(data.opportunities, lang);
  }

  /* ---- HTML-escape helper ---- */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---- Main init on DOMContentLoaded ---- */
  document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadContent();
    window.cmsData = data || { team: [], news: [], opportunities: [], translations: { en: {}, pt: {} } };

    /* Apply translation overrides (must happen before setLang re-runs) */
    if (data && data.translations && typeof applyOverrides === 'function') {
      applyOverrides(data.translations);
    }

    const currentLang = (typeof getLang === 'function') ? getLang() : 'en';

    /* Render dynamic sections */
    renderAll(window.cmsData, currentLang);

    /* Re-apply i18n to new [data-i18n] elements (role spans, etc.) */
    if (typeof setLang === 'function') setLang(currentLang);

    /* ---- Monkey-patch setLang so re-rendering happens on language toggle ---- */
    const _origSetLang = window.setLang || setLang;
    window.setLang = function (lang) {
      _origSetLang(lang);
      renderAll(window.cmsData, lang);
      _origSetLang(lang); /* pick up data-i18n on newly rendered elements */
    };
  });
})();
