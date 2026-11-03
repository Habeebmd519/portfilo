(() => {
  // Always release the intro screen, even if an animation library fails to load.
  const releaseLoader = () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("done");
      window.setTimeout(() => loader.remove(), 900);
    }
  };
  if (document.readyState === "complete") {
    window.setTimeout(releaseLoader, 350);
  } else {
    window.addEventListener("load", () => window.setTimeout(releaseLoader, 350), { once: true });
  }
  window.setTimeout(releaseLoader, 2500);

  document.querySelectorAll(".year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const clock = document.getElementById("localClock");
  const updateClock = () => {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false
    }).format(new Date()) + " IST";
  };
  updateClock();
  window.setInterval(updateClock, 30000);

  const nav = document.getElementById("navbar");
  const progress = document.getElementById("scrollProgress");
  const updateScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  const menuButton = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal-up, .reveal-scale");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  const dot = document.getElementById("cursorDot");
  const aura = document.getElementById("cursorAura");
  if (dot && aura && window.matchMedia("(pointer:fine)").matches) {
    let x = 0, y = 0, ax = 0, ay = 0;
    window.addEventListener("mousemove", (event) => {
      x = event.clientX; y = event.clientY;
      dot.style.left = x + "px"; dot.style.top = y + "px";
    }, { passive: true });
    const follow = () => {
      ax += (x - ax) * 0.16; ay += (y - ay) * 0.16;
      aura.style.left = ax + "px"; aura.style.top = ay + "px";
      window.requestAnimationFrame(follow);
    };
    follow();
    document.querySelectorAll("a, button, .project-card, .expertise-row").forEach((el) => {
      el.addEventListener("mouseenter", () => aura.classList.add("hover"));
      el.addEventListener("mouseleave", () => aura.classList.remove("hover"));
    });
  }

  // Optional motion libraries enhance the page, but never gate its content.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".expertise-row").forEach((el) => {
      gsap.from(el, { x: -22, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" } });
    });
    const portrait = document.querySelector(".portrait-stage");
    if (portrait) gsap.to(portrait, { y: 45, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
  }
})();