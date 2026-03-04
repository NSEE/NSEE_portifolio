/* =============================================
   NSEE Admin Panel — admin.js
   Requires: i18n.js (for the translations object)
   ============================================= */

(function () {
  /* --------- Constants --------- */
  const ADMIN_PASSWORD = 'nseensee';
  const REPO_OWNER  = 'ffcfelps1';
  const REPO_NAME   = 'NSEE_portifolio';
  const BRANCH      = 'main';
  const CONTENT_PATH = 'data/content.json';
  const GH_API_BASE  = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`;

  const SESSION_AUTH = 'nsee-admin-auth';
  const SESSION_PAT  = 'nsee-admin-pat';
  const SESSION_DATA = 'nsee-admin-data';  /* cached JSON data */

  /* --------- Translation group labels --------- */
  const GROUP_LABELS = {
    nav: 'Navbar', hero: 'Hero (Index)', stats: 'Stats Bar', partners: 'Partners Strip',
    about: 'About Page', pillar: 'Pillars', timeline: 'Timeline', 'tl.filter': 'Timeline Filters',
    team: 'Team Page', role: 'Role Labels', member: 'Member Buttons',
    projects: 'Projects Page', filter: 'Project Filters', cat: 'Project Categories',
    sp: 'Projects — Space', ai: 'Projects — AI', 'as': 'Projects — Astrophysics',
    gm: 'Projects — GMT', portfolio: 'Portfolio CTA',
    contact: 'Contact Page', footer: 'Footer',
    news: 'News Page', 'n1': 'News Item 1', 'n2': 'News Item 2', 'n3': 'News Item 3',
    opp: 'Opportunities Page',
    'op1': 'Opportunity 1', 'op2': 'Opportunity 2', 'op3': 'Opportunity 3', 'op4': 'Opportunity 4',
    tl2003:'Timeline 2003', tl2006:'Timeline 2006', tl2007:'Timeline 2007', tl2008:'Timeline 2008',
    tl2009:'Timeline 2009', tl2010:'Timeline 2010', tl2011:'Timeline 2011', tl2013:'Timeline 2013',
    tl2015:'Timeline 2015', tl2016:'Timeline 2016', tl2017:'Timeline 2017', tl2018:'Timeline 2018',
    tl2019:'Timeline 2019', tl2020:'Timeline 2020', tl2021:'Timeline 2021', tl2022:'Timeline 2022',
    tl2023:'Timeline 2023', tl2024:'Timeline 2024', tl2025:'Timeline 2025',
  };

  /* --------- Global state --------- */
  let cmsData = { translations: { en: {}, pt: {} }, team: [], news: [], opportunities: [] };
  let currentFileSHA = '';
  let currentTab = 'texts';

  /* ======================================================
     DOM bootstrap
  ====================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem(SESSION_AUTH) !== '1') {
      showLoginScreen();
    } else {
      tryInitAdmin();
    }
  });

  function showLoginScreen() {
    const root = document.getElementById('adminRoot');
    root.innerHTML = `
      <div class="adm-login-wrap">
        <div class="adm-login-box">
          <div class="adm-login-logo">
            <img src="assets/nsee_branco.svg" alt="NSEE" />
          </div>
          <h1>Admin Panel</h1>
          <p class="adm-login-sub">NSEE Portfolio Management</p>
          <form id="loginForm" autocomplete="off">
            <div class="adm-form-row">
              <label for="loginPass">Password</label>
              <input type="password" id="loginPass" placeholder="Enter admin password" autocomplete="current-password" required />
            </div>
            <div id="loginError" class="adm-msg adm-msg--error" hidden></div>
            <button type="submit" class="adm-btn adm-btn--primary" style="width:100%">Sign In</button>
          </form>
        </div>
      </div>`;

    document.getElementById('loginForm').addEventListener('submit', e => {
      e.preventDefault();
      const pass = document.getElementById('loginPass').value;
      const errEl = document.getElementById('loginError');
      if (pass === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_AUTH, '1');
        tryInitAdmin();
      } else {
        errEl.textContent = 'Incorrect password. Try again.';
        errEl.hidden = false;
        document.getElementById('loginPass').value = '';
        document.getElementById('loginPass').focus();
      }
    });
  }

  async function tryInitAdmin() {
    const root = document.getElementById('adminRoot');
    root.innerHTML = `<div class="adm-loading">Loading content…</div>`;

    // Load content.json via GitHub API (or direct fetch fallback)
    const { data, sha, error } = await fetchContentFromGitHub();
    if (error && !data) {
      root.innerHTML = `<div class="adm-msg adm-msg--error" style="margin:2rem">${error}</div>
        <div style="text-align:center;margin-top:1rem">
          <button class="adm-btn" onclick="sessionStorage.clear();location.reload()">Back to Login</button>
        </div>`;
      return;
    }
    if (data) cmsData = data;
    currentFileSHA = sha || '';
    renderAdminShell();
  }

  /* ======================================================
     GitHub API helpers
  ====================================================== */
  function getPAT() {
    return sessionStorage.getItem(SESSION_PAT) || '';
  }

  async function fetchContentFromGitHub() {
    const pat = getPAT();
    const headers = { 'Accept': 'application/vnd.github.v3+json' };
    if (pat) headers['Authorization'] = `token ${pat}`;

    try {
      const res = await fetch(GH_API_BASE, { headers });
      if (res.status === 401) {
        return { data: null, sha: '', error: 'GitHub API: Unauthorized. Check your PAT.' };
      }
      if (!res.ok) {
        // 404 or other error — fall through to direct fetch fallback below
        throw new Error(`GitHub API ${res.status}`);
      }
      const json = await res.json();
      const sha = json.sha || '';
      const decoded = decodeBase64UTF8(json.content.replace(/\s/g, ''));
      const parsedData = JSON.parse(decoded);
      return { data: parsedData, sha, error: null };
    } catch (e) {
      // Fallback: try direct relative fetch (works when served locally or on GitHub Pages after deploy)
      try {
        const res2 = await fetch('data/content.json?_=' + Date.now());
        if (res2.ok) {
          const parsedData = await res2.json();
          return { data: parsedData, sha: '', error: null };
        }
      } catch {}
      return { data: cmsData, sha: '', error: null };
    }
  }

  async function saveToGitHub(payload) {
    const pat = getPAT();
    if (!pat) {
      return { ok: false, error: 'No PAT configured. Enter your GitHub Personal Access Token in Settings.' };
    }
    const jsonStr = JSON.stringify(payload, null, 2);
    const encoded = encodeBase64UTF8(jsonStr);
    const body = {
      message: `Admin: update ${CONTENT_PATH} [${new Date().toISOString()}]`,
      content: encoded,
      branch: BRANCH,
    };
    if (currentFileSHA) body.sha = currentFileSHA;

    try {
      const res = await fetch(GH_API_BASE, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${pat}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        return { ok: false, error: `GitHub API ${res.status}: ${errJson.message || 'Unknown error'}` };
      }
      const json = await res.json();
      currentFileSHA = json.content.sha;
      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: `Network error: ${e.message}` };
    }
  }

  /* ======================================================
     Base64 <-> Unicode helpers
  ====================================================== */
  function encodeBase64UTF8(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p) => String.fromCharCode(parseInt(p, 16))));
  }
  function decodeBase64UTF8(b64) {
    return decodeURIComponent(Array.from(atob(b64)).map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
  }

  /* ======================================================
     Admin Shell
  ====================================================== */
  function renderAdminShell() {
    const root = document.getElementById('adminRoot');
    root.innerHTML = `
      <header class="adm-header">
        <a href="index.html" class="adm-header-logo">
          <img src="assets/nsee_branco.svg" alt="NSEE" />
        </a>
        <span class="adm-header-title">Admin Panel</span>
        <div class="adm-header-actions">
          <button class="adm-btn adm-btn--primary" id="saveAllBtn">💾 Save All</button>
          <button class="adm-btn adm-btn--ghost" id="previewBtn" title="Open site in new tab">👁 Preview</button>
          <button class="adm-btn adm-btn--ghost" id="logoutBtn">Sign Out</button>
        </div>
      </header>

      <div id="admToast" class="adm-toast" hidden></div>

      <!-- PAT Settings bar -->
      <div class="adm-settings-bar">
        <label for="patInput">GitHub PAT:</label>
        <input type="password" id="patInput" placeholder="ghp_xxxxxxxxxxxx (stored in this browser session only)"
               value="${escHtml(getPAT())}" />
        <button class="adm-btn adm-btn--sm" id="savePATBtn">Save token</button>
        <span class="adm-settings-note">Required to publish changes. <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">Generate token ↗</a> (scopes: <code>repo</code>)</span>
      </div>

      <nav class="adm-tabs" role="tablist">
        <button class="adm-tab active" data-tab="texts"  role="tab">Texts</button>
        <button class="adm-tab"        data-tab="team"   role="tab">Team</button>
        <button class="adm-tab"        data-tab="news"   role="tab">News</button>
        <button class="adm-tab"        data-tab="opps"   role="tab">Opportunities</button>
      </nav>

      <main class="adm-main" id="admMain"></main>`;

    document.getElementById('logoutBtn').addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_AUTH);
      location.reload();
    });
    document.getElementById('previewBtn').addEventListener('click', () => window.open('index.html', '_blank'));
    document.getElementById('saveAllBtn').addEventListener('click', handleSaveAll);
    document.getElementById('savePATBtn').addEventListener('click', () => {
      sessionStorage.setItem(SESSION_PAT, document.getElementById('patInput').value.trim());
      showToast('Token saved to session.', 'success');
    });
    document.querySelectorAll('.adm-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.adm-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.dataset.tab;
        renderTab(currentTab);
      });
    });

    renderTab('texts');
  }

  function renderTab(tab) {
    const main = document.getElementById('admMain');
    if (tab === 'texts')  renderTextsTab(main);
    if (tab === 'team')   renderTeamTab(main);
    if (tab === 'news')   renderNewsTab(main);
    if (tab === 'opps')   renderOppsTab(main);
  }

  /* ======================================================
     TEXTS TAB
  ====================================================== */
  function renderTextsTab(container) {
    const overridesEn = (cmsData.translations && cmsData.translations.en) || {};
    const overridesPt = (cmsData.translations && cmsData.translations.pt) || {};

    /* Group all keys by prefix */
    const staticEn = (window.translations && window.translations.en) || {};
    const allKeys = Object.keys(staticEn);
    const groups = {};
    allKeys.forEach(key => {
      const prefix = getGroupPrefix(key);
      if (!groups[prefix]) groups[prefix] = [];
      groups[prefix].push(key);
    });

    let html = `<div class="adm-texts-info">
      <p>Edit any text below. Changes override the site defaults. Leave a field blank to use the default. Click <strong>Save All</strong> to publish.</p>
    </div>`;

    Object.keys(groups).sort().forEach(prefix => {
      const label = GROUP_LABELS[prefix] || prefix;
      html += `<details class="adm-group">
        <summary class="adm-group-title">${escHtml(label)}</summary>
        <div class="adm-group-body">
          <div class="adm-text-row adm-text-header">
            <span class="adm-key-label">Key</span>
            <span class="adm-lang-label">EN</span>
            <span class="adm-lang-label">PT</span>
          </div>`;

      groups[prefix].forEach(key => {
        const defaultEn = staticEn[key] || '';
        const defaultPt = (window.translations && window.translations.pt && window.translations.pt[key]) || '';
        const valEn = overridesEn[key] !== undefined ? overridesEn[key] : defaultEn;
        const valPt = overridesPt[key] !== undefined ? overridesPt[key] : defaultPt;
        const shortKey = key.replace(prefix + '.', '').replace(prefix, '');
        const isMultiline = defaultEn.length > 120 || defaultEn.includes('<');
        const inputType = isMultiline ? 'textarea' : 'input';
        const enInput  = isMultiline
          ? `<textarea class="adm-txt-input" data-lang="en" data-key="${escHtml(key)}" rows="3">${escHtml(valEn)}</textarea>`
          : `<input  class="adm-txt-input" type="text" data-lang="en" data-key="${escHtml(key)}" value="${escHtml(valEn)}" />`;
        const ptInput  = isMultiline
          ? `<textarea class="adm-txt-input" data-lang="pt" data-key="${escHtml(key)}" rows="3">${escHtml(valPt)}</textarea>`
          : `<input  class="adm-txt-input" type="text" data-lang="pt" data-key="${escHtml(key)}" value="${escHtml(valPt)}" />`;

        html += `<div class="adm-text-row">
          <span class="adm-key-label" title="${escHtml(key)}">${escHtml(shortKey || key)}</span>
          ${enInput}
          ${ptInput}
        </div>`;
      });

      html += `</div></details>`;
    });

    container.innerHTML = html;
  }

  function getGroupPrefix(key) {
    /* Match longest known prefix first */
    const prefixes = Object.keys(GROUP_LABELS).sort((a, b) => b.length - a.length);
    for (const p of prefixes) {
      if (key === p || key.startsWith(p + '.')) return p;
    }
    /* Fallback: top-level word before first dot */
    const dot = key.indexOf('.');
    return dot > 0 ? key.substring(0, dot) : key;
  }

  function collectTextsFromDOM() {
    const en = {}, pt = {};
    document.querySelectorAll('.adm-txt-input[data-lang="en"][data-key]').forEach(el => {
      en[el.dataset.key] = el.value || (el.tagName === 'TEXTAREA' ? el.value : el.value);
    });
    document.querySelectorAll('.adm-txt-input[data-lang="pt"][data-key]').forEach(el => {
      pt[el.dataset.key] = el.value || '';
    });
    return { en, pt };
  }

  /* ======================================================
     TEAM TAB
  ====================================================== */
  const ROLE_OPTIONS = [
    'role.coordinator','role.researcher','role.dev','role.data','role.embedded',
    'role.member','role.intern','role.fellow','role.fapesp-student','role.project-manager',
    'role.fapesp-researcher','role.project-leader','role.structural-engineer',
  ];

  function renderTeamTab(container) {
    let html = `<div class="adm-section-actions">
      <button class="adm-btn adm-btn--primary" id="addMemberBtn">+ Add Member</button>
    </div>
    <div id="memberList">`;

    (cmsData.team || []).forEach((m, i) => {
      html += memberCardHTML(m, i);
    });
    html += `</div>`;
    container.innerHTML = html;

    document.getElementById('addMemberBtn').addEventListener('click', () => addMember());
    bindMemberEvents();
  }

  function memberCardHTML(m, i) {
    const roleOpts = ROLE_OPTIONS.map(r =>
      `<option value="${r}" ${m.role === r ? 'selected' : ''}>${r}</option>`
    ).join('');
    return `<div class="adm-card" data-member-index="${i}">
      <div class="adm-card-header">
        <strong>${escHtml(m.name || 'New Member')}</strong>
        <div class="adm-card-actions">
          <button class="adm-btn adm-btn--sm adm-btn--ghost toggle-card-btn">▶ Expand</button>
          <button class="adm-btn adm-btn--sm adm-btn--danger remove-member-btn">✕ Remove</button>
        </div>
      </div>
      <div class="adm-card-body" style="display:none">
        <div class="adm-field-grid">
          <div class="adm-field">
            <label>Name</label>
            <input type="text" class="member-name" value="${escHtml(m.name || '')}" placeholder="Full Name" />
          </div>
          <div class="adm-field">
            <label>Role</label>
            <select class="member-role">${roleOpts}</select>
          </div>
          <div class="adm-field adm-field--wide">
            <label>Bio (PT)</label>
            <textarea class="member-bio" rows="2">${escHtml(m.bio || '')}</textarea>
          </div>
          <div class="adm-field adm-field--wide">
            <label>Photo path (e.g. assets/team/name.jpg)</label>
            <input type="text" class="member-photo" value="${escHtml(m.photo || '')}" placeholder="assets/team/..." />
          </div>
          <div class="adm-field">
            <label>Lattes URL</label>
            <input type="url" class="member-lattes" value="${escHtml(m.lattes || '')}" placeholder="https://lattes.cnpq.br/..." />
          </div>
          <div class="adm-field">
            <label>LinkedIn URL</label>
            <input type="url" class="member-linkedin" value="${escHtml(m.linkedin || '')}" placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
      </div>
    </div>`;
  }

  function bindMemberEvents() {
    document.querySelectorAll('#memberList .remove-member-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (confirm('Remove this member?')) {
          cmsData.team.splice(i, 1);
          renderTeamTab(document.getElementById('admMain'));
        }
      });
    });
    document.querySelectorAll('#memberList .toggle-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const body = btn.closest('.adm-card').querySelector('.adm-card-body');
        const collapsed = body.style.display === 'none';
        body.style.display = collapsed ? '' : 'none';
        btn.textContent = collapsed ? '▼ Collapse' : '▶ Expand';
      });
    });
  }

  function addMember() {
    cmsData.team.push({ name: '', role: 'role.member', bio: '', photo: '', lattes: '', linkedin: '' });
    renderTeamTab(document.getElementById('admMain'));
    /* Scroll to last member and expand it */
    const cards = document.querySelectorAll('#memberList .adm-card');
    if (cards.length) {
      const last = cards[cards.length - 1];
      last.scrollIntoView({ behavior: 'smooth' });
      last.querySelector('.adm-card-body').style.display = '';
      last.querySelector('.toggle-card-btn').textContent = '▼ Collapse';
    }
  }

  function collectTeamFromDOM() {
    const members = [];
    document.querySelectorAll('#memberList .adm-card').forEach(card => {
      members.push({
        name:     card.querySelector('.member-name').value.trim(),
        role:     card.querySelector('.member-role').value,
        bio:      card.querySelector('.member-bio').value.trim(),
        photo:    card.querySelector('.member-photo').value.trim(),
        lattes:   card.querySelector('.member-lattes').value.trim(),
        linkedin: card.querySelector('.member-linkedin').value.trim(),
      });
    });
    return members;
  }

  /* ======================================================
     NEWS TAB
  ====================================================== */
  const NEWS_ICONS_LIST = ['globe','document','star','rocket'];

  function renderNewsTab(container) {
    let html = `<div class="adm-section-actions">
      <button class="adm-btn adm-btn--primary" id="addNewsBtn">+ Add News Item</button>
    </div><div id="newsList">`;
    (cmsData.news || []).forEach((item, i) => { html += newsCardHTML(item, i); });
    html += `</div>`;
    container.innerHTML = html;
    document.getElementById('addNewsBtn').addEventListener('click', () => addNews());
    bindNewsEvents();
  }

  function newsCardHTML(item, i) {
    const iconOpts = NEWS_ICONS_LIST.map(ic =>
      `<option value="${ic}" ${(item.icon||'globe') === ic ? 'selected':''}>${ic}</option>`
    ).join('');
    return `<div class="adm-card" data-news-index="${i}">
      <div class="adm-card-header">
        <strong>${escHtml((item.title && (item.title.pt || item.title.en)) || 'New News Item')}</strong>
        <div class="adm-card-actions">
          <button class="adm-btn adm-btn--sm adm-btn--ghost toggle-card-btn">▶ Expand</button>
          <button class="adm-btn adm-btn--sm adm-btn--danger remove-news-btn">✕ Remove</button>
        </div>
      </div>
      <div class="adm-card-body" style="display:none">
        <div class="adm-field-grid">
          <div class="adm-field">
            <label>Icon</label>
            <select class="news-icon">${iconOpts}</select>
          </div>
          <div class="adm-field">
            <label>Link (URL or page)</label>
            <input type="text" class="news-link" value="${escHtml(item.link||'projects.html')}" />
          </div>
          <div class="adm-field">
            <label>Date — EN</label>
            <input type="text" class="news-date-en" value="${escHtml((item.date&&item.date.en)||'')}" placeholder="March 2026" />
          </div>
          <div class="adm-field">
            <label>Date — PT</label>
            <input type="text" class="news-date-pt" value="${escHtml((item.date&&item.date.pt)||'')}" placeholder="Março de 2026" />
          </div>
          <div class="adm-field adm-field--wide">
            <label>Title — EN</label>
            <input type="text" class="news-title-en" value="${escHtml((item.title&&item.title.en)||'')}" />
          </div>
          <div class="adm-field adm-field--wide">
            <label>Title — PT</label>
            <input type="text" class="news-title-pt" value="${escHtml((item.title&&item.title.pt)||'')}" />
          </div>
          <div class="adm-field adm-field--wide">
            <label>Description — EN</label>
            <textarea class="news-desc-en" rows="3">${escHtml((item.desc&&item.desc.en)||'')}</textarea>
          </div>
          <div class="adm-field adm-field--wide">
            <label>Description — PT</label>
            <textarea class="news-desc-pt" rows="3">${escHtml((item.desc&&item.desc.pt)||'')}</textarea>
          </div>
        </div>
      </div>
    </div>`;
  }

  function bindNewsEvents() {
    document.querySelectorAll('#newsList .remove-news-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (confirm('Remove this news item?')) {
          cmsData.news.splice(i, 1);
          renderNewsTab(document.getElementById('admMain'));
        }
      });
    });
    document.querySelectorAll('#newsList .toggle-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const body = btn.closest('.adm-card').querySelector('.adm-card-body');
        const collapsed = body.style.display === 'none';
        body.style.display = collapsed ? '' : 'none';
        btn.textContent = collapsed ? '▼ Collapse' : '▶ Expand';
      });
    });
  }

  function addNews() {
    cmsData.news.push({ id: 'n' + Date.now(), date: { en: '', pt: '' }, title: { en: '', pt: '' }, desc: { en: '', pt: '' }, link: 'projects.html', icon: 'globe' });
    renderNewsTab(document.getElementById('admMain'));
    const cards = document.querySelectorAll('#newsList .adm-card');
    if (cards.length) {
      const last = cards[cards.length - 1];
      last.scrollIntoView({ behavior: 'smooth' });
      last.querySelector('.adm-card-body').style.display = '';
      last.querySelector('.toggle-card-btn').textContent = '▼ Collapse';
    }
  }

  function collectNewsFromDOM() {
    const items = [];
    document.querySelectorAll('#newsList .adm-card').forEach((card, i) => {
      items.push({
        id:   cmsData.news[i] ? cmsData.news[i].id : 'n' + i,
        icon: card.querySelector('.news-icon').value,
        link: card.querySelector('.news-link').value.trim(),
        date:  { en: card.querySelector('.news-date-en').value.trim(),  pt: card.querySelector('.news-date-pt').value.trim() },
        title: { en: card.querySelector('.news-title-en').value.trim(), pt: card.querySelector('.news-title-pt').value.trim() },
        desc:  { en: card.querySelector('.news-desc-en').value.trim(),  pt: card.querySelector('.news-desc-pt').value.trim() },
      });
    });
    return items;
  }

  /* ======================================================
     OPPORTUNITIES TAB
  ====================================================== */
  const OPP_CATEGORIES = ['research','scholarship','internship','event'];

  function renderOppsTab(container) {
    let html = `<div class="adm-section-actions">
      <button class="adm-btn adm-btn--primary" id="addOppBtn">+ Add Opportunity</button>
    </div><div id="oppList">`;
    (cmsData.opportunities || []).forEach((item, i) => { html += oppCardHTML(item, i); });
    html += `</div>`;
    container.innerHTML = html;
    document.getElementById('addOppBtn').addEventListener('click', () => addOpp());
    bindOppEvents();
  }

  function oppCardHTML(item, i) {
    const catOpts = OPP_CATEGORIES.map(c =>
      `<option value="${c}" ${item.category === c ? 'selected':''}>${c}</option>`
    ).join('');
    return `<div class="adm-card" data-opp-index="${i}">
      <div class="adm-card-header">
        <strong>${escHtml((item.title && (item.title.pt || item.title.en)) || 'New Opportunity')}</strong>
        <div class="adm-card-actions">
          <button class="adm-btn adm-btn--sm adm-btn--ghost toggle-card-btn">▶ Expand</button>
          <button class="adm-btn adm-btn--sm adm-btn--danger remove-opp-btn">✕ Remove</button>
        </div>
      </div>
      <div class="adm-card-body" style="display:none">
        <div class="adm-field-grid">
          <div class="adm-field">
            <label>Category</label>
            <select class="opp-category">${catOpts}</select>
          </div>
          <div class="adm-field">
            <label>Link (URL or page)</label>
            <input type="text" class="opp-link" value="${escHtml(item.link||'contact.html')}" />
          </div>
          <div class="adm-field">
            <label>Deadline — EN</label>
            <input type="text" class="opp-deadline-en" value="${escHtml((item.deadline&&item.deadline.en)||'')}" placeholder="Open" />
          </div>
          <div class="adm-field">
            <label>Deadline — PT</label>
            <input type="text" class="opp-deadline-pt" value="${escHtml((item.deadline&&item.deadline.pt)||'')}" placeholder="Aberto" />
          </div>
          <div class="adm-field adm-field--wide">
            <label>Title — EN</label>
            <input type="text" class="opp-title-en" value="${escHtml((item.title&&item.title.en)||'')}" />
          </div>
          <div class="adm-field adm-field--wide">
            <label>Title — PT</label>
            <input type="text" class="opp-title-pt" value="${escHtml((item.title&&item.title.pt)||'')}" />
          </div>
          <div class="adm-field adm-field--wide">
            <label>Description — EN</label>
            <textarea class="opp-desc-en" rows="3">${escHtml((item.desc&&item.desc.en)||'')}</textarea>
          </div>
          <div class="adm-field adm-field--wide">
            <label>Description — PT</label>
            <textarea class="opp-desc-pt" rows="3">${escHtml((item.desc&&item.desc.pt)||'')}</textarea>
          </div>
          <div class="adm-field adm-field--wide">
            <label>Agency / Institution — EN</label>
            <input type="text" class="opp-agency-en" value="${escHtml((item.agency&&item.agency.en)||'')}" />
          </div>
          <div class="adm-field adm-field--wide">
            <label>Agency / Institution — PT</label>
            <input type="text" class="opp-agency-pt" value="${escHtml((item.agency&&item.agency.pt)||'')}" />
          </div>
        </div>
      </div>
    </div>`;
  }

  function bindOppEvents() {
    document.querySelectorAll('#oppList .remove-opp-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (confirm('Remove this opportunity?')) {
          cmsData.opportunities.splice(i, 1);
          renderOppsTab(document.getElementById('admMain'));
        }
      });
    });
    document.querySelectorAll('#oppList .toggle-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const body = btn.closest('.adm-card').querySelector('.adm-card-body');
        const collapsed = body.style.display === 'none';
        body.style.display = collapsed ? '' : 'none';
        btn.textContent = collapsed ? '▼ Collapse' : '▶ Expand';
      });
    });
  }

  function addOpp() {
    cmsData.opportunities.push({ id: 'op' + Date.now(), category: 'research', deadline: { en: 'Open', pt: 'Aberto' }, title: { en: '', pt: '' }, desc: { en: '', pt: '' }, agency: { en: '', pt: '' }, link: 'contact.html' });
    renderOppsTab(document.getElementById('admMain'));
    const cards = document.querySelectorAll('#oppList .adm-card');
    if (cards.length) {
      const last = cards[cards.length - 1];
      last.scrollIntoView({ behavior: 'smooth' });
      last.querySelector('.adm-card-body').style.display = '';
      last.querySelector('.toggle-card-btn').textContent = '▼ Collapse';
    }
  }

  function collectOppsFromDOM() {
    const items = [];
    document.querySelectorAll('#oppList .adm-card').forEach((card, i) => {
      items.push({
        id:       cmsData.opportunities[i] ? cmsData.opportunities[i].id : 'op' + i,
        category: card.querySelector('.opp-category').value,
        link:     card.querySelector('.opp-link').value.trim(),
        deadline: { en: card.querySelector('.opp-deadline-en').value.trim(), pt: card.querySelector('.opp-deadline-pt').value.trim() },
        title:    { en: card.querySelector('.opp-title-en').value.trim(),    pt: card.querySelector('.opp-title-pt').value.trim() },
        desc:     { en: card.querySelector('.opp-desc-en').value.trim(),     pt: card.querySelector('.opp-desc-pt').value.trim() },
        agency:   { en: card.querySelector('.opp-agency-en').value.trim(),   pt: card.querySelector('.opp-agency-pt').value.trim() },
      });
    });
    return items;
  }

  /* ======================================================
     Save All
  ====================================================== */
  async function handleSaveAll() {
    const saveBtn = document.getElementById('saveAllBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving…';

    /* Collect current tab data before it goes stale */
    if (currentTab === 'team')  cmsData.team          = collectTeamFromDOM();
    if (currentTab === 'news')  cmsData.news          = collectNewsFromDOM();
    if (currentTab === 'opps')  cmsData.opportunities = collectOppsFromDOM();
    if (currentTab === 'texts') {
      const tx = collectTextsFromDOM();
      cmsData.translations = tx;
    }

    const { ok, error } = await saveToGitHub(cmsData);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Save All';

    if (ok) {
      showToast('✅ Saved! Changes will be live on GitHub Pages shortly.', 'success');
    } else {
      showToast(`❌ ${error}`, 'error');
    }
  }

  /* ======================================================
     Toast notification
  ====================================================== */
  function showToast(msg, type = 'success') {
    const el = document.getElementById('admToast');
    if (!el) return;
    el.textContent = msg;
    el.className = `adm-toast adm-toast--${type}`;
    el.hidden = false;
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.hidden = true; }, type === 'error' ? 6000 : 3500);
  }

  /* ======================================================
     Helpers
  ====================================================== */
  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
