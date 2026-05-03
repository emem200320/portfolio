/* ============================================================
   contact.js
   - Opens / closes the contact modal
   - Inline validation
   - Submits via EmailJS (free, no backend)
   - Shows success state on send
   ============================================================ */

(function () {
  "use strict";

  /* ── DOM refs ─────────────────────────────────────────── */
  const openBtn    = document.getElementById("open-contact-modal");
  const modal      = document.getElementById("contact-modal");
  const closeBtn   = document.getElementById("close-contact-modal");
  const cancelBtn  = document.getElementById("cancel-contact-modal");
  const submitBtn  = document.getElementById("submit-contact-form");

  const nameInput  = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const msgInput   = document.getElementById("contact-message");

  const errName    = document.getElementById("error-name");
  const errEmail   = document.getElementById("error-email");
  const errMsg     = document.getElementById("error-message");

  const modalBody  = modal?.querySelector(".modal-body");
  const modalFooter= modal?.querySelector(".modal-footer");


  /* ── EmailJS config — fill in your own IDs ───────────── */
  // Sign up free at https://www.emailjs.com/
  // Replace these with your actual IDs from the EmailJS dashboard
  const EMAILJS_SERVICE_ID  = "service_s9g2xha";
  const EMAILJS_TEMPLATE_ID = "template_5gyxuiv";
  const EMAILJS_PUBLIC_KEY  = "nrmAzMvOEnd-6YxL4";


  /* ── Open / Close ─────────────────────────────────────── */
  function openModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-visible");
    document.body.style.overflow = "hidden";
    setTimeout(() => nameInput?.focus(), 300);
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-visible");
    document.body.style.overflow = "";
    resetForm();
  }

  if (openBtn)   openBtn.addEventListener("click", openModal);
  if (closeBtn)  closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  // Backdrop click
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-visible")) {
      closeModal();
    }
  });


  /* ── Validation ───────────────────────────────────────── */
  function validate() {
    let valid = true;

    // Name
    const name = nameInput?.value.trim() ?? "";
    if (!name) {
      setError(nameInput, errName, "Name is required.");
      valid = false;
    } else {
      clearError(nameInput, errName);
    }

    // Email
    const email = emailInput?.value.trim() ?? "";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError(emailInput, errEmail, "Email is required.");
      valid = false;
    } else if (!emailRe.test(email)) {
      setError(emailInput, errEmail, "Enter a valid email address.");
      valid = false;
    } else {
      clearError(emailInput, errEmail);
    }

    // Message
    const msg = msgInput?.value.trim() ?? "";
    if (!msg) {
      setError(msgInput, errMsg, "Message is required.");
      valid = false;
    } else if (msg.length < 10) {
      setError(msgInput, errMsg, "Message must be at least 10 characters.");
      valid = false;
    } else {
      clearError(msgInput, errMsg);
    }

    return valid;
  }

  function setError(input, errEl, message) {
    if (input)  input.classList.add("is-error");
    if (errEl)  errEl.textContent = message;
  }

  function clearError(input, errEl) {
    if (input)  input.classList.remove("is-error");
    if (errEl)  errEl.textContent = "";
  }

  // Clear error on input
  [nameInput, emailInput, msgInput].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", () => {
      el.classList.remove("is-error");
    });
  });


  /* ── Submit ───────────────────────────────────────────── */
  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      if (!validate()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      const templateParams = {
        from_name:    nameInput.value.trim(),
        from_email:   emailInput.value.trim(),
        message:      msgInput.value.trim(),
      };

      try {
        // EmailJS must be loaded — add their SDK in index.html if not already:
        // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
        // and call emailjs.init(EMAILJS_PUBLIC_KEY) in main.js
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );
        showSuccess();
      } catch (err) {
        console.error("EmailJS error:", err);
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
        setError(null, errMsg, "Something went wrong. Please try again.");
      }
    });
  }


  /* ── Success state ────────────────────────────────────── */
  function showSuccess() {
    if (!modalBody || !modalFooter) return;

    // Replace body + footer with success message
    modalBody.innerHTML = `
      <div class="form-success">
        <span class="form-success-icon">✉️</span>
        <p class="form-success-text">Message sent!</p>
        <p class="form-success-sub">I'll get back to you soon.</p>
      </div>
    `;

    modalFooter.innerHTML = `
      <button class="btn btn-primary" id="success-close-btn">Done</button>
    `;

    document.getElementById("success-close-btn")
      ?.addEventListener("click", closeModal);
  }


  /* ── Reset ────────────────────────────────────────────── */
  function resetForm() {
    // Only reset if we haven't replaced the DOM with success state
    if (nameInput) nameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (msgInput) msgInput.value = "";

    [nameInput, emailInput, msgInput].forEach((el) => {
      el?.classList.remove("is-error");
    });

    [errName, errEmail, errMsg].forEach((el) => {
      if (el) el.textContent = "";
    });

    // Restore original body/footer if success was shown
    if (!modal?.querySelector(".form-success")) return;

    if (modalBody) {
      modalBody.innerHTML = `
        <div class="form-group">
          <label for="contact-name" class="form-label">Name</label>
          <input type="text" id="contact-name" class="form-input" placeholder="Your name" />
          <span class="form-error" id="error-name"></span>
        </div>
        <div class="form-group">
          <label for="contact-email" class="form-label">Email</label>
          <input type="email" id="contact-email" class="form-input" placeholder="you@example.com" />
          <span class="form-error" id="error-email"></span>
        </div>
        <div class="form-group">
          <label for="contact-message" class="form-label">Message</label>
          <textarea id="contact-message" class="form-input form-textarea" placeholder="Write your message..."></textarea>
          <span class="form-error" id="error-message"></span>
        </div>
      `;
    }

    if (modalFooter) {
      modalFooter.innerHTML = `
        <button id="cancel-contact-modal" class="btn btn-secondary">Cancel</button>
        <button id="submit-contact-form" class="btn btn-primary">Submit</button>
      `;
      // Re-bind buttons after DOM rebuild
      document.getElementById("cancel-contact-modal")
        ?.addEventListener("click", closeModal);
      document.getElementById("submit-contact-form")
        ?.addEventListener("click", () => submitBtn?.click());
    }
  }

})();