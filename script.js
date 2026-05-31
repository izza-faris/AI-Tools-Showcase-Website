/* ─────────────────────────────────────────
   AI Hub — Professional JavaScript
   Features:
   • Navbar scroll effect
   • Cursor glow tracking
   • Scroll-reveal animations (IntersectionObserver)
   • Animated stat counters
   • Contact form success state
───────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. Navbar scroll effect ── */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });


  /* ── 2. Cursor glow ── */
  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top  = e.clientY + "px";
    });
  } else if (glow) {
    glow.style.display = "none";
  }


  /* ── 3. Scroll-reveal (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || "0");
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));


  /* ── 4. Animated stat counters ── */
  const statNumbers = document.querySelectorAll(".stat-number");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((el) => counterObserver.observe(el));


  /* ── 5. Smooth active nav-link highlight ── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => sectionObserver.observe(s));


  /* ── 6. Contact form ── */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button[type='submit']");

      // Button loading state
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending…';

      // Simulate async send
      setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
        formSuccess.classList.add("show");

        setTimeout(() => formSuccess.classList.remove("show"), 4000);
      }, 1500);
    });
  }


  /* ── 7. Navbar collapse — close on link click (mobile) ── */
  document.querySelectorAll("#navbarNav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const collapseEl = document.getElementById("navbarNav");
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
      if (bsCollapse) bsCollapse.hide();
    });
  });

});
