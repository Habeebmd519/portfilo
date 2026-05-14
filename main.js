const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

if (cursor && ring) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      ring.style.left = e.clientX + "px";
      ring.style.top = e.clientY + "px";
    }, 70);
  });

  document.querySelectorAll("a, button, .project-card, .service-card, .contact-card").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("big"));
    el.addEventListener("mouseleave", () => ring.classList.remove("big"));
  });
}

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 20);
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu?.classList.toggle("open");
});

function closeMobile() {
  hamburger?.classList.remove("open");
  mobileMenu?.classList.remove("open");
}

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
  observer.observe(el);
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
