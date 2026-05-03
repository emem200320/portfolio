/* ============================================================
   experience.js
   - Play button opens YouTube video in modal
   - Read more / Read less toggles description
   ============================================================ */

(function () {
  "use strict";

  const videoModal  = document.getElementById("video-modal");
  const closeVideo  = document.getElementById("close-video-modal");

  /* ── YouTube video ID map ─────────────────────────────── */
  const youtubeIds = {
    "assets/videos/app1.mp4": "Co3AMBrfvD4",
    "assets/videos/app2.mp4": "tOzv7wbxCcM",
  };


  /* ── Play button ──────────────────────────────────────── */
  document.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".play-btn");
    if (!playBtn) return;
    const videoSrc = playBtn.dataset.video;
    if (!videoSrc) return;
    const youtubeId = youtubeIds[videoSrc];
    if (!youtubeId) return;
    openVideoModal(youtubeId);
  });


  /* ── Video modal ──────────────────────────────────────── */
  function openVideoModal(youtubeId) {
    if (!videoModal) return;

    // Replace the <video> tag with a YouTube iframe
    const modalBox = videoModal.querySelector(".modal-box-video");
    let iframe = videoModal.querySelector("iframe");

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.cssText = "width:100%;height:100%;min-height:320px;border-radius:8px;";
      // Remove the old video element if present
      const oldVideo = modalBox.querySelector("video");
      if (oldVideo) oldVideo.remove();
      modalBox.appendChild(iframe);
    }

    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    videoModal.setAttribute("aria-hidden", "false");
    videoModal.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    if (!videoModal) return;
    // Stop video by clearing iframe src
    const iframe = videoModal.querySelector("iframe");
    if (iframe) iframe.src = "";
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