const hhEl = document.getElementById("hh");
const mmEl = document.getElementById("mm");
const ssEl = document.getElementById("ss");
const dateEl = document.getElementById("date");
const countEl = document.getElementById("count");

const KEY = "abdul-counter-count";

function pad(n) {
  return String(n).padStart(2, "0");
}

function renderClock() {
  const now = new Date();
  hhEl.textContent = pad(now.getHours());
  mmEl.textContent = pad(now.getMinutes());
  ssEl.textContent = pad(now.getSeconds());
  dateEl.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function loadCount() {
  try {
    const raw = localStorage.getItem(KEY);
    const n = raw === null ? 0 : parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch (e) {
    return 0;
  }
}

let count = loadCount();

function renderCount() {
  countEl.textContent = String(count);
}

function saveCount() {
  try {
    localStorage.setItem(KEY, String(count));
  } catch (e) {}
}

document.getElementById("inc").addEventListener("click", () => {
  count += 1;
  saveCount();
  renderCount();
});

document.getElementById("rnd").addEventListener("click", () => {
  count += 1 + Math.floor(Math.random() * 25);
  saveCount();
  renderCount();
});

document.getElementById("rst").addEventListener("click", () => {
  count = 0;
  saveCount();
  renderCount();
});

renderClock();
renderCount();
setInterval(renderClock, 1000);
