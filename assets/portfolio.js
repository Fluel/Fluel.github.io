const T = {
  it: {
    navSkills: "competenze", navWork: "progetti", navContact: "contatti",
    heroSub: "Intelligenza artificiale dal 2016",
    heroTitle: "AI, dal modello al software.",
    focus: "Innovation for business",
    skip: "Vai al contenuto",
    loading: "Caricamento dei progetti…", loadError: "Non è stato possibile caricare i progetti.", retry: "Riprova",
    themeLight: "Chiaro", themeDark: "Scuro", themeLabel: "Cambia tema",
    lede: "Mi occupo di AI, Gen AI e AI Engineering: progetto e sviluppo modelli, agenti e applicazioni. Qui raccolgo il lavoro per aziende e professionisti, i prodotti Fluel e la mia ricerca personale.",
    cta: "Esplora i progetti",
    chip: "progetto personale",
    personalNote: "Dal 2024 questo è un portfolio personale: i progetti segnati così non sono attività aziendali.",
    personalBand: "progetti personali",
    personalFilter: "personali",
    chipShort: "personale",
    skillsTitle: "competenze",
    skillsText: "Dalla ricerca al servizio in produzione, con le applicazioni web e mobile che rendono l'AI utilizzabile.",
    featTitle: "in evidenza", featText: "I prodotti e i progetti più rappresentativi.",
    workTitle: "timeline dei progetti", workText: "Ogni simbolo è un progetto: passaci sopra per il titolo, cliccalo per leggere la scheda.",
    stackTitle: "tecnologie",
    all: "Tutti",
    kinds: { client: "per clienti", product: "prodotti Fluel", rnd: "ricerca", training: "formazione" },
    kindOne: { client: "progetto per un cliente", product: "prodotto Fluel", rnd: "ricerca e sviluppo", training: "formazione" },
    kindPersonal: { product: "prodotto" },
    count: n => `${n} ${n === 1 ? "progetto" : "progetti"}`,
    open: "Apri il materiale",
    contactTitle: "parliamone",
    contactText: "Per approfondire un progetto o valutare una collaborazione, scrivimi su LinkedIn.",
    linkedin: "Profilo LinkedIn",
    nda: "Nomi dei clienti, dati e dettagli riservati sono omessi o generalizzati per rispetto degli accordi di riservatezza."
  },
  en: {
    navSkills: "expertise", navWork: "projects", navContact: "contact",
    heroSub: "Artificial intelligence since 2016",
    heroTitle: "AI, from model to software.",
    focus: "Innovation for business",
    skip: "Skip to content",
    loading: "Loading projects…", loadError: "Projects could not be loaded.", retry: "Try again",
    themeLight: "Light", themeDark: "Dark", themeLabel: "Change theme",
    lede: "I work in AI, Gen AI and AI Engineering, designing and building models, agents and applications. This portfolio brings together work for companies and professionals, Fluel products and my personal research.",
    cta: "Explore the work",
    chip: "personal project",
    personalNote: "Since 2024 this is a personal portfolio: projects marked this way are not business work.",
    personalBand: "personal projects",
    personalFilter: "personal",
    chipShort: "personal",
    skillsTitle: "expertise",
    skillsText: "From research to production services, with the web and mobile apps that put AI to work.",
    featTitle: "featured", featText: "Selected products and projects.",
    workTitle: "project timeline", workText: "Each symbol is a project: hover for the title, click to read the entry.",
    stackTitle: "tech stack",
    all: "All",
    kinds: { client: "client work", product: "Fluel products", rnd: "research", training: "training" },
    kindOne: { client: "client project", product: "Fluel product", rnd: "research and development", training: "training" },
    kindPersonal: { product: "product" },
    count: n => `${n} ${n === 1 ? "project" : "projects"}`,
    open: "Open the material",
    contactTitle: "let's talk",
    contactText: "To discuss a project in more depth or explore a collaboration, reach me on LinkedIn.",
    linkedin: "LinkedIn profile",
    nda: "Client names, data and confidential details are omitted or generalised to honour non-disclosure agreements."
  }
};
const CAPS = [
  { sym: "innovazione", ids: ["regula", "knai", "heritage-rag"],
    it: ["Gen AI, RAG e agenti", "Assistenti che rispondono citando le fonti, agenti che eseguono procedure, sistemi multi-agente."],
    en: ["Gen AI, RAG and agents", "Assistants that answer with cited sources, agents that run procedures, multi-agent systems."] },
  { sym: "codice", ids: ["ai-legal", "las", "bank-rag"],
    it: ["linguaggio naturale", "Lettura di documenti, riconoscimento di entità e classificazione di testi in italiano."],
    en: ["natural language", "Document reading, entity recognition and Italian text classification."] },
  { sym: "consistenza", ids: ["easy-queue", "shelf-vision", "manuscripts"],
    it: ["visione artificiale", "Riconoscimento di prodotti, documenti e caratteri, anche su dispositivi edge."],
    en: ["computer vision", "Recognising products, documents and characters, on edge devices too."] },
  { sym: "aiuto", ids: ["obsolescence", "air-quality", "materials"],
    it: ["analisi predittiva", "Previsioni su serie storiche, sensori IoT, magazzino e processi produttivi."],
    en: ["predictive analytics", "Forecasting for time series, IoT sensors, inventory and production."] },
  { sym: "persone", ids: ["voicebot", "voice-dating", "short-video"],
    it: ["voce e audio", "Voicebot, sintesi e riconoscimento vocale, contenuti audio e video generati."],
    en: ["voice and audio", "Voicebots, speech synthesis and recognition, generated audio and video."] },
  { sym: "pittogramma", ids: ["boostme", "fitness-recomp", "creative-cards"],
    it: ["AI Engineering", "Le applicazioni che portano l'AI agli utenti: dal backend su cloud all'app sullo store."],
    en: ["AI Engineering", "The apps that bring AI to users: from cloud backend to the app in the store."] },
];
const SYM = { client: "persone", product: "innovazione", rnd: "consistenza", training: "aiuto" };
const icon = (name, soft) => `<svg viewBox="0 0 100 100" aria-hidden="true"${soft ? ' style="--g:currentColor"' : ""}><use href="#s-${name}"/></svg>`;
const chip = (short) => { const c = document.createElement("span"); c.className = "chip"; c.textContent = short ? T[lang].chipShort : T[lang].chip; return c; };
const kindLabel = p => (p.personal && T[lang].kindPersonal[p.kind]) || T[lang].kindOne[p.kind];
const matches = p => filter === "all" || (filter === "personal" ? p.personal : p.kind === filter);
const firstSentence = s => s.split(/(?<=\.)\s/)[0];
const $ = s => document.querySelector(s);
let projects = [], lang = "it", filter = "all", dataState = "loading";
try { lang = localStorage.getItem("lang") || ""; } catch {}
lang = new URLSearchParams(location.search).get("lang") || lang || (navigator.language.startsWith("it") ? "it" : "en");
if (!T[lang]) lang = "en";

function drawCaps() {
  const byId = Object.fromEntries(projects.map(p => [p.id, p]));
  $("#caps").replaceChildren(...CAPS.map(c => {
    const li = document.createElement("li"); li.className = "cap";
    li.innerHTML = `${icon(c.sym)}<h3></h3><p></p><ul></ul>`;
    li.querySelector("h3").textContent = c[lang][0];
    li.querySelector("p").textContent = c[lang][1];
    li.querySelector("ul").append(...c.ids.filter(id => byId[id]).map(id => {
      const item = document.createElement("li"), a = document.createElement("a");
      a.href = `#p-${id}`; a.textContent = byId[id].title[lang].split(":")[0];
      if (byId[id].personal) a.append(chip(true));
      item.append(a); return item;
    }));
    return li;
  }));
}

function drawFeatured() {
  const t = T[lang];
  $("#featuredList").replaceChildren(...projects.filter(p => p.featured).sort((a, b) => a.featured - b.featured).map(p => {
    const a = document.createElement("a"); a.className = "feat"; a.href = `#p-${p.id}`;
    a.innerHTML = `${icon(SYM[p.kind], true)}<div class="meta"><span></span><span></span></div><h3></h3><p></p>`;
    const [y, k] = a.querySelectorAll(".meta span");
    y.textContent = p.year; k.textContent = kindLabel(p);
    a.querySelector("h3").textContent = p.title[lang].split(":")[0];
    if (p.personal) a.querySelector(".meta").append(chip());
    a.querySelector("p").textContent = firstSentence(p.summary[lang]);
    return a;
  }));
}

function drawOverview() {
  const t = T[lang], tip = $("#tip");
  if (!projects.length) { $("#overview").replaceChildren(); return; }
  const years = projects.map(p => p.year);
  const cols = [];
  for (let y = Math.min(...years); y <= Math.max(...years); y++) {
    const col = document.createElement("div"), stack = document.createElement("div"), label = document.createElement("div");
    const here = projects.filter(p => p.year === y);
    const personal = here.some(p => p.personal);
    col.className = "col" + (here.length ? " has" : "") + (personal ? " personal" : ""); stack.className = "stack"; label.className = "year"; label.textContent = y;
    stack.append(...here.map(p => {
      const a = document.createElement("a"); a.href = `#p-${p.id}`; a.tabIndex = -1;
      a.innerHTML = icon(SYM[p.kind]);
      if (!matches(p)) a.classList.add("dim");
      a.onmouseenter = e => { tip.innerHTML = `<b></b>`; tip.firstChild.textContent = `${p.year} / ${kindLabel(p)}${p.personal ? ` / ${t.chip}` : ""}`; tip.append(p.title[lang]); tip.classList.add("on"); };
      a.onmousemove = e => { tip.style.left = Math.max(8, Math.min(e.clientX + 14, innerWidth - 280)) + "px"; tip.style.top = Math.min(e.clientY + 16, innerHeight - tip.offsetHeight - 12) + "px"; };
      a.onmouseleave = () => tip.classList.remove("on");
      return a;
    }));
    col.append(stack, label); cols.push(col);
  }
  const band = cols.filter(c => c.classList.contains("personal"));
  if (band.length) {
    band[0].classList.add("first"); band.at(-1).classList.add("last");
    const label = document.createElement("div"); label.className = "band"; label.textContent = t.personalBand;
    label.style.width = `${band.length * 100}%`;
    band[0].append(label);
  }
  $("#overview").replaceChildren(...cols);
}

function drawTimeline() {
  const t = T[lang];
  const f = $("#filters"); f.setAttribute("aria-label", t.workTitle);
  f.replaceChildren(...["all", ...Object.keys(t.kinds), "personal"].map(k => {
    const b = document.createElement("button");
    b.type = "button"; b.innerHTML = SYM[k] ? icon(SYM[k]).replace("<svg", '<svg class="sym"') : "";
    b.append(k === "all" ? t.all : k === "personal" ? t.personalFilter : t.kinds[k]);
    b.setAttribute("aria-pressed", filter === k);
    b.onclick = () => { filter = k; drawOverview(); drawTimeline(); document.querySelector(`#filters button[data-filter="${k}"]`)?.focus({preventScroll:true}); };
    b.dataset.filter = k;
    return b;
  }));
  const shown = projects.filter(matches);
  $("#count").textContent = t.count(shown.length);
  const out = []; let year;
  for (const p of shown) {
    if (p.year !== year) {
      year = p.year;
      const stop = document.createElement("li"); stop.className = "stop"; stop.innerHTML = "<span></span>";
      stop.firstChild.textContent = year; out.push(stop);
    }
    const li = document.createElement("li"); li.className = "item"; li.id = `p-${p.id}`;
    li.innerHTML = `<div class="node">${icon(SYM[p.kind])}</div><article class="card"><p class="kind"></p><h3></h3><p class="sum"></p><p class="tech"></p></article>`;
    li.querySelector(".kind").textContent = `${p.year} / ${kindLabel(p)}`;
    li.querySelector("h3").textContent = p.title[lang];
    if (p.personal) li.querySelector(".kind").append(chip());
    li.querySelector(".sum").textContent = p.summary[lang];
    li.querySelector(".tech").textContent = p.stack.join(" · ");
    if (p.link) { const a = document.createElement("a"); a.href = p.link; a.textContent = t.open; li.querySelector(".card").append(a); }
    out.push(li);
  }
  $("#timeline").replaceChildren(...out);

}

function render() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(n => n.textContent = T[lang][n.dataset.t]);
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  drawCaps(); drawFeatured(); drawOverview(); drawTimeline();
  updateThemeLabel();
  $("#dataMessage").textContent = T[lang][dataState === "error" ? "loadError" : "loading"];
  $("#dataStatus").hidden = dataState === "ready";
  $("#retry").hidden = dataState !== "error";
  $("#count").hidden = dataState !== "ready";
  document.title = "Fluel | Innovation for business";
}

document.querySelectorAll(".lang button").forEach(b => b.onclick = () => {
  lang = b.dataset.lang; try { localStorage.setItem("lang", lang); } catch {}
  render();
});


const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let manualTheme = false;
try { manualTheme = ['light','dark'].includes(localStorage.getItem('fluel-theme')); } catch {}
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  $('#theme').textContent = T[lang][dark ? 'themeDark' : 'themeLight'];
  $('#theme').setAttribute('aria-label', T[lang].themeLabel);
  $('#theme').setAttribute('aria-pressed', String(dark));
}
$('#theme').onclick = () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  manualTheme = true;
  try { localStorage.setItem('fluel-theme', theme); } catch {}
  updateThemeLabel();
};
systemTheme.addEventListener('change', event => {
  if (!manualTheme) { document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'; updateThemeLabel(); }
});
function revealProject(hash, focus = false) {
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  if (!id.startsWith('p-') || !projects.some(p => `p-${p.id}` === id)) return;
  const project = projects.find(p => `p-${p.id}` === id);
  if (!matches(project)) { filter = 'all'; drawOverview(); drawTimeline(); }
  const target = document.getElementById(id);
  target?.scrollIntoView({block:'start'});
  if (focus && target) { target.tabIndex = -1; target.focus({preventScroll:true}); }
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#p-"]');
  if (link) { revealProject(link.hash, true); $('#tip').classList.remove('on'); }
});
addEventListener('hashchange', () => revealProject(location.hash));
async function loadProjects() {
  dataState = 'loading'; render();
  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Project data unavailable');
    const data = await response.json();
    if (!Array.isArray(data) || !data.length) throw new Error('Invalid project data');
    projects = data.sort((a,b) => b.year - a.year);
    dataState = 'ready'; render(); revealProject(location.hash);
  } catch {
    dataState = 'error'; render();
  }
}
$('#retry').onclick = loadProjects;
loadProjects();
