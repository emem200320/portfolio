/* ============================================================
   theme.js
   - Reads saved theme from localStorage on page load
   - Falls back to prefers-color-scheme on first visit
   - Default: dark
   - Toggles data-theme on <html> and saves to localStorage
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";
  const root        = document.documentElement;
  const DARK        = "dark";
  const LIGHT       = "light";

  /* ── Determine initial theme ──────────────────────────── */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === DARK || saved === LIGHT) return saved;

    // First visit — respect OS preference, default to dark
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? DARK : LIGHT;
  }

  /* ── Apply theme to <html> ────────────────────────────── */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  /* ── Init on load ─────────────────────────────────────── */
  applyTheme(getInitialTheme());

  /* ── Wire up toggle checkbox ──────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    const toggleInput = document.getElementById("theme-toggle");
    if (!toggleInput) return;

    // Sync checkbox state to current theme on load
    // checked = light mode, unchecked = dark mode
    const currentTheme = root.getAttribute("data-theme");
    toggleInput.checked = currentTheme === DARK;

    toggleInput.addEventListener("change", () => {
      applyTheme(toggleInput.checked ? DARK : LIGHT);
    });
  });

})();