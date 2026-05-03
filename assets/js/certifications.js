/* ============================================================
   certifications.js
   - Tapping a cert item opens the lightbox modal
   - Shows full-size cert image
   - Closes on backdrop click, close button, or Escape
   ============================================================ */

(function () {
  "use strict";

  const certItems    = document.querySelectorAll(".cert-item");
  const lightbox     = document.getElementById("lightbox-modal");
  const lightboxImg  = document.getElementById("lightbox-image");
  const closeBtn     = document.getElementById("close-lightbox-modal");

  /* ── Open ─────────────────────────────────────────────── */
  certItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src   = item.dataset.src;
      const label = item.dataset.label || "Certificate";

      if (!src || !lightbox || !lightboxImg) return;

      lightboxImg.src = src;
      lightboxImg.alt = label;
      lightbox.setAttribute("aria-hidden", "false");
      lightbox.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    });
  });

  /* ── Close ─────────────────────────────────────────────── */
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.classList.remove("is-visible");
    document.body.style.overflow = "";
    // Small delay before clearing src to avoid flash
    setTimeout(() => {
      if (lightboxImg) lightboxImg.src = "";
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // Backdrop click
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox?.classList.contains("is-visible")) {
      closeLightbox();
    }
  });

})();