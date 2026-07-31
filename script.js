/* ============================================================
   For Ananya 🌸  — interactions
   ============================================================ */

// ---------- Login gate ----------
// Note: this is a friendly welcome gate, not real security.
// Anyone can view the page source, so don't store secrets here.
(function loginGate() {
  const GATE_KEY = "ananya-entered";
  const USER = "ananya";
  const PASS = "ananya";
  const gate = document.getElementById("gate");
  if (!gate) return;

  function unlock() {
    gate.classList.add("hidden");
    document.body.style.overflow = "";
    setTimeout(() => { gate.style.display = "none"; }, 700);
  }

  // Skip the gate if already entered this session
  if (sessionStorage.getItem(GATE_KEY) === "yes") {
    gate.style.display = "none";
  } else {
    document.body.style.overflow = "hidden";
  }

  const form = document.getElementById("gateForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("gateUser").value.trim().toLowerCase();
    const p = document.getElementById("gatePass").value;
    const err = document.getElementById("gateError");
    if (u === USER && p === PASS) {
      err.hidden = true;
      try { sessionStorage.setItem(GATE_KEY, "yes"); } catch { /* ignore */ }
      unlock();
    } else {
      err.hidden = false;
      const card = gate.querySelector(".gate-card");
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
    }
  });
})();

// ---------- Countdown since we met ----------
const START = new Date("2026-07-26T00:00:00");
const el = (id) => document.getElementById(id);

function tick() {
  const now = new Date();
  let diff = Math.max(0, now - START);
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  el("days").textContent = days;
  el("hours").textContent = String(hours).padStart(2, "0");
  el("minutes").textContent = String(minutes).padStart(2, "0");
  el("seconds").textContent = String(seconds).padStart(2, "0");
}
tick();
setInterval(tick, 1000);

// ---------- Falling petals & hearts ----------
const glyphs = ["🌸", "💛", "🌷", "💗", "🌹", "✨"];
const fallingBox = el("falling");
function spawn() {
  const s = document.createElement("span");
  s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
  s.style.left = Math.random() * 100 + "vw";
  s.style.fontSize = 0.9 + Math.random() * 1.4 + "rem";
  const dur = 6 + Math.random() * 8;
  s.style.animationDuration = dur + "s";
  s.style.opacity = 0.5 + Math.random() * 0.5;
  fallingBox.appendChild(s);
  setTimeout(() => s.remove(), dur * 1000);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(spawn, 700);
  for (let i = 0; i < 8; i++) setTimeout(spawn, i * 200);
}

// ---------- Music toggle ----------
// Our song: "Until I Found You" by Stephen Sanchez.
// We don't host the copyrighted track. If a legally-owned file exists at
// assets/our-song.mp3 it plays inline; otherwise we open the official song on YouTube.
const SONG_LINK = "https://www.youtube.com/results?search_query=Stephen+Sanchez+Until+I+Found+You+official";
const song = el("song");
const musicBtn = el("musicBtn");
musicBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play().then(() => musicBtn.classList.add("playing"))
      .catch(() => window.open(SONG_LINK, "_blank", "noopener"));
  } else {
    song.pause();
    musicBtn.classList.remove("playing");
  }
});

// ---------- Bouquet builder ----------
const vase = el("vase");
const vaseEmpty = el("vaseEmpty");
el("tray").addEventListener("click", (e) => {
  const btn = e.target.closest(".flower-pick");
  if (!btn) return;
  if (vaseEmpty) vaseEmpty.style.display = "none";
  const stem = document.createElement("span");
  stem.className = "stem pop";
  stem.textContent = btn.dataset.flower;
  vase.appendChild(stem);
});
el("clearBouquet").addEventListener("click", () => {
  vase.querySelectorAll(".stem").forEach((s) => s.remove());
  if (vaseEmpty) vaseEmpty.style.display = "";
});

// ---------- Love letter ----------
const envelope = el("envelope");
el("openLetter").addEventListener("click", () => {
  envelope.classList.add("opened");
  const paper = el("letterPaper");
  paper.hidden = false;
  setTimeout(() => paper.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
});

// ---------- Fun quiz ----------
const QUIZ = [
  {
    q: "Where did Rohit & Ananya first meet? 💫",
    options: ["A coffee shop", "On the app Azar", "At a wedding", "College"],
    answer: 1,
  },
  {
    q: "What's the date we'll never forget? 🗓️",
    options: ["14 Feb 2026", "1 Jan 2026", "26 July 2026", "26 June 2026"],
    answer: 2,
  },
  {
    q: "What undid Rohit completely the very first moment? 😍",
    options: ["Ananya's smile", "Her voice", "The weather", "A joke"],
    answer: 0,
  },
  {
    q: "Which of these is 100% Ananya? 🌸",
    options: ["Grumpy & cold", "Childish, supportive & kind", "Always late", "Loves silence"],
    answer: 1,
  },
];

let qIndex = 0;
let qScore = 0;
const quizCard = el("quizCard");
const quizResult = el("quizResult");

function renderQuestion() {
  const item = QUIZ[qIndex];
  el("quizCount").textContent = `Question ${qIndex + 1} of ${QUIZ.length}`;
  el("quizBar").style.width = ((qIndex) / QUIZ.length) * 100 + "%";
  el("quizQ").textContent = item.q;
  const box = el("quizOptions");
  box.innerHTML = "";
  item.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.textContent = opt;
    b.addEventListener("click", () => choose(b, i, item.answer), { once: true });
    box.appendChild(b);
  });
}

function choose(btn, picked, answer) {
  const buttons = el("quizOptions").querySelectorAll("button");
  buttons.forEach((b) => (b.disabled = true));
  if (picked === answer) {
    btn.classList.add("correct");
    qScore++;
  } else {
    btn.classList.add("wrong");
    buttons[answer].classList.add("correct");
  }
  el("quizBar").style.width = ((qIndex + 1) / QUIZ.length) * 100 + "%";
  setTimeout(() => {
    qIndex++;
    if (qIndex < QUIZ.length) renderQuestion();
    else showResult();
  }, 900);
}

function showResult() {
  quizCard.hidden = true;
  quizResult.hidden = false;
  const verdicts = [
    { emoji: "🌱", title: "A sweet beginning!", msg: "The best part? We're just getting started. 💕" },
    { emoji: "💗", title: "You're paying attention!", msg: "Our little story is already in your heart." },
    { emoji: "🌸", title: "Almost perfect!", msg: "You know us so well — it shows." },
    { emoji: "👑", title: "Certified soulmate!", msg: "Full marks. You know every beat of our story. 💛" },
  ];
  const v = verdicts[Math.min(qScore, verdicts.length - 1)];
  el("quizScore").textContent = v.emoji;
  el("quizVerdict").textContent = `${v.title}  (${qScore}/${QUIZ.length})`;
  el("quizMsg").textContent = v.msg;
}

el("quizRetry").addEventListener("click", () => {
  qIndex = 0;
  qScore = 0;
  quizResult.hidden = true;
  quizCard.hidden = false;
  renderQuestion();
});

renderQuestion();

// ---------- Compliment generator ----------
const COMPLIMENTS = [
  "Your smile is my favorite notification. 😊",
  "You make ordinary days feel like celebrations. 🎉",
  "The world got softer the moment I met you. 🌸",
  "Your kindness could light up an entire city. ✨",
  "I'd choose you in every version of forever. 💫",
  "You're the plot twist I never saw coming — the best one. 💖",
  "Being cared for by you feels like coming home. 🏡",
  "Your laugh is the song I never want to stop hearing. 🎶",
  "You're proof that good things happen unexpectedly. 🍀",
  "Even my quiet days feel loud with joy because of you. 💛",
  "You're impossibly easy to adore. 🥰",
  "My heart picked you before my brain could argue. 💘",
];
const complimentText = el("complimentText");
let lastCompliment = -1;
el("complimentBtn").addEventListener("click", () => {
  let i;
  do { i = Math.floor(Math.random() * COMPLIMENTS.length); } while (i === lastCompliment);
  lastCompliment = i;
  complimentText.textContent = COMPLIMENTS[i];
  complimentText.classList.remove("pop");
  void complimentText.offsetWidth; // restart animation
  complimentText.classList.add("pop");
  for (let k = 0; k < 4; k++) setTimeout(spawn, k * 120);
});

// ---------- Guestbook ----------
// Ananya's notes are stored in Firebase Firestore (Rohit's Google Cloud project),
// so they're saved online, visible in the Firebase console, and shown live on a
// shared wall for both of them. If Firebase isn't configured yet, notes fall back
// to this-device-only storage so the site still works.
const GB_KEY = "ananya-guestbook";
const gbWall = el("gbWall");
const gbStatus = el("gbStatus");

function setStatus(msg, kind) {
  if (!gbStatus) return;
  gbStatus.textContent = msg;
  gbStatus.className = "gb-status" + (kind ? " " + kind : "");
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

// --- Firebase (Google Cloud) ---
let notesCol = null;
(function initFirebase() {
  const cfg = window.FIREBASE_CONFIG;
  if (!cfg || !window.firebase || String(cfg.apiKey || "").startsWith("PASTE")) return;
  try {
    firebase.initializeApp(cfg);
    notesCol = firebase.firestore().collection("notes");
  } catch (err) {
    notesCol = null;
  }
})();
const cloudReady = () => !!notesCol;

// --- Rendering (shared by cloud + local) ---
function renderList(items, animateFirst) {
  gbWall.innerHTML = "";
  if (!items.length) {
    gbWall.innerHTML = '<p class="gb-empty">No notes yet — be the first to pin one! 💌</p>';
    return;
  }
  items.forEach((n) => {
    const div = document.createElement("div");
    div.className = "gb-note";
    div.innerHTML = `<p>${escapeHtml(n.msg)}</p><span class="gb-who">— ${escapeHtml(n.name || "Someone")}</span>`;
    gbWall.appendChild(div);
  });
  if (animateFirst) {
    const first = gbWall.querySelector(".gb-note");
    if (first) first.classList.add("just-pinned");
  }
}

// --- Local fallback storage ---
function loadNotes() {
  try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; }
  catch { return []; }
}
function saveNotes(notes) {
  try { localStorage.setItem(GB_KEY, JSON.stringify(notes)); } catch { /* ignore */ }
}
function renderLocalNotes() {
  renderList(loadNotes().slice().reverse(), false);
}

// --- Wire up the wall ---
if (cloudReady()) {
  notesCol.orderBy("createdAt", "desc").onSnapshot(
    (snap) => {
      const items = [];
      snap.forEach((doc) => items.push(doc.data()));
      renderList(items, true);
    },
    () => {
      setStatus("Couldn't reach the shared wall — showing this device only.", "err");
      renderLocalNotes();
    }
  );
} else {
  renderLocalNotes();
}

el("gbForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = el("gbName").value.trim();
  const msg = el("gbMsg").value.trim();
  if (!msg) return;
  el("gbName").value = "";
  el("gbMsg").value = "";

  if (cloudReady()) {
    setStatus("Saving your note for Rohit… 💌", "");
    notesCol
      .add({
        name: name || "Ananya",
        msg,
        createdAt: Date.now(),
        at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => setStatus("Saved 💛 Rohit will see this.", "ok"))
      .catch(() => {
        setStatus("Couldn't save online — kept a copy on this device.", "err");
        const notes = loadNotes();
        notes.push({ name, msg, at: Date.now() });
        saveNotes(notes);
        renderLocalNotes();
      });
  } else {
    const notes = loadNotes();
    notes.push({ name, msg, at: Date.now() });
    saveNotes(notes);
    renderLocalNotes();
    const pinned = gbWall.querySelector(".gb-note");
    if (pinned) {
      pinned.classList.add("just-pinned");
      pinned.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  for (let k = 0; k < 5; k++) setTimeout(spawn, k * 100);
});

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("visible"); }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((s) => io.observe(s));
