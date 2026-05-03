/* ============================================================
   main.js — App entry point
   Runs after all other scripts are loaded.
   Handles: EmailJS init, scroll-reveal, misc global setup.
   ============================================================ */

(function () {
  "use strict";

  /* ── EmailJS init ─────────────────────────────────────── */
  const EMAILJS_PUBLIC_KEY = "nrmAzMvOEnd-6YxL4";

  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }


  /* ── Scroll-reveal for sections ───────────────────────── */
  const sections = document.querySelectorAll(".section");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    sections.forEach((section) => {
      section.classList.add("reveal-ready");
      observer.observe(section);
    });
  } else {
    sections.forEach((s) => s.classList.add("is-revealed"));
  }


  /* ── Prevent body scroll bleed on iOS ────────────────── */
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener(
      "touchmove",
      (e) => {
        if (!e.target.closest(".modal-box")) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  });


  /* ── Smooth focus management ──────────────────────────── */
  document.addEventListener("mousedown", () => {
    document.body.classList.add("using-mouse");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.remove("using-mouse");
    }
  });


  /* ── Console signature ────────────────────────────────── */
  console.log(
    "%c John Michael Papa — Portfolio ",
    "background:#4f8ef7;color:#fff;font-weight:700;border-radius:4px;padding:4px 8px;"
  );


  /* ── CV Modal ─────────────────────────────────────────── */
  const openCvBtn  = document.getElementById("open-cv-modal");
  const cvModal    = document.getElementById("cv-modal");
  const closeCvBtn = document.getElementById("close-cv-modal");

  function openCvModal() {
    cvModal.setAttribute("aria-hidden", "false");
    cvModal.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }
  function closeCvModal() {
    cvModal.setAttribute("aria-hidden", "true");
    cvModal.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  if (openCvBtn)  openCvBtn.addEventListener("click", openCvModal);
  if (closeCvBtn) closeCvBtn.addEventListener("click", closeCvModal);
  if (cvModal) {
    cvModal.addEventListener("click", (e) => {
      if (e.target === cvModal) closeCvModal();
    });
  }


  /* ── Avatar hover image — tap toggle for mobile/tablet ── */
  const avatarWrap = document.querySelector(".hero-avatar-wrap");

  if (avatarWrap) {
    // On touch devices, tap toggles the hover state
    avatarWrap.addEventListener("touchstart", (e) => {
      e.preventDefault(); // prevents ghost mouse event firing after
      avatarWrap.classList.toggle("is-hovered");
    }, { passive: false });

    // Tap anywhere else on the page removes the hover state
    document.addEventListener("touchstart", (e) => {
      if (!avatarWrap.contains(e.target)) {
        avatarWrap.classList.remove("is-hovered");
      }
    });
  }

})();