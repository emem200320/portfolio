/* ============================================================
   experience.js
   - Play button opens video modal
   - Read more / Read less toggles description
   ============================================================ */

(function () {
  "use strict";

  const videoModal  = document.getElementById("video-modal");
  const videoPlayer = document.getElementById("video-player");
  const closeVideo  = document.getElementById("close-video-modal");


  /* ── Play button ──────────────────────────────────────── */
  document.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".play-btn");
    if (!playBtn) return;
    const videoSrc = playBtn.dataset.video;
    if (!videoSrc) return;
    openVideoModal(videoSrc);
  });


  /* ── Video modal ──────────────────────────────────────── */
  function openVideoModal(src) {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.src = src;
    videoModal.setAttribute("aria-hidden", "false");
    videoModal.classList.add("is-visible");
    videoPlayer.play().catch(() => {});
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.pause();
    videoPlayer.src = "";
    videoModal.setAttribute("aria-hidden", "true");
    videoModal.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  if (closeVideo) closeVideo.addEventListener("click", closeVideoModal);

  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal?.classList.contains("is-visible")) {
      closeVideoModal();
    }
  });


  /* ── Read more toggle ─────────────────────────────────── */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".read-more-btn");
    if (!btn) return;

    const card = btn.closest(".app-card");
    const desc = card?.querySelector(".app-description");
    if (!desc) return;

    const isExpanded = btn.dataset.expanded === "true";

    if (isExpanded) {
      desc.textContent = desc.dataset.short;
      btn.textContent = "Read more";
      btn.dataset.expanded = "false";
    } else {
      desc.dataset.short = desc.textContent;
      desc.textContent = desc.dataset.full;
      btn.textContent = "Read less";
      btn.dataset.expanded = "true";
    }
  });

})();