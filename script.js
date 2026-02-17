const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

function smoothScrollTo(targetY, duration = 600) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const time = currentTime - startTime;
    const progress = Math.min(time / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) requestAnimationFrame(animation);
  }
  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    smoothScrollTo(target.offsetTop - navbarHeight, 600);
    navLinks?.classList.remove("active");
  });
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 160) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = Math.ceil(target / 120);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  history.scrollRestoration = "manual";
  history.replaceState(null, null, window.location.pathname);

  setTimeout(() => {
    loader?.classList.add("hidden");
    smoothScrollTo(0, 800);
  }, 300);
});

const slidesContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const bannerDots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(i) {
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
  bannerDots.forEach(d => d.classList.remove("active"));
  bannerDots[i]?.classList.add("active");
  currentSlide = i;
}

setInterval(() => {
  showSlide((currentSlide + 1) % slides.length);
}, 4500);

bannerDots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDots = document.querySelector(".testimonial-dots");

let testimonialIndex = 0;
let cardsPerView = getCardsPerView();
let totalSlides = Math.ceil(testimonialCards.length / cardsPerView);

function getCardsPerView() {
  return window.innerWidth <= 900 ? 1 : 3;
}

function buildDots() {
  testimonialDots.innerHTML = "";
  totalSlides = Math.ceil(testimonialCards.length / cardsPerView);

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    if (i === testimonialIndex) dot.classList.add("active");
    dot.addEventListener("click", () => moveTestimonial(i));
    testimonialDots.appendChild(dot);
  }
}

function moveTestimonial(index) {
  testimonialIndex = index;
  testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
  testimonialTrack.style.transition = "transform 0.6s ease";

  testimonialDots.querySelectorAll("span").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % totalSlides;
  moveTestimonial(testimonialIndex);
}, 4000);

let startX = 0;
let endX = 0;
const swipeThreshold = 60;

testimonialTrack.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

testimonialTrack.addEventListener("touchmove", e => {
  endX = e.touches[0].clientX;
});

testimonialTrack.addEventListener("touchend", () => {
  const diff = startX - endX;

  if (Math.abs(diff) > swipeThreshold) {
    testimonialIndex =
      diff > 0
        ? (testimonialIndex + 1) % totalSlides
        : (testimonialIndex - 1 + totalSlides) % totalSlides;

    moveTestimonial(testimonialIndex);
  }
});

window.addEventListener("resize", () => {
  cardsPerView = getCardsPerView();
  testimonialIndex = 0;
  buildDots();
  moveTestimonial(0);
});

buildDots();
moveTestimonial(0);


function openCtaModal() {
  document.getElementById("ctaModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCtaModal() {
  document.getElementById("ctaModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

document.getElementById("ctaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Our team will contact you shortly.");
  closeCtaModal();
});

document.getElementById("ctaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const course = document.getElementById("course").value;

  const whatsappNumber = "919850070368";

  const message =
    `Hello, I am interested in your courses.%0A%0A` +
    `👤 Name: ${name}%0A` +
    `📧 Email: ${email}%0A` +
    `📱 Phone: ${phone}%0A` +
    `📚 Course: ${course}`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");

  closeCtaModal();
});

function openCtaModal(courseName) {
  const modal = document.getElementById("ctaModal");
  const courseSelect = document.getElementById("course");

  modal.style.display = "flex";

  if (courseName) {
    courseSelect.value = courseName;
  }
}

function closeCtaModal() {
  document.getElementById("ctaModal").style.display = "none";
}

window.onclick = function (e) {
  const modal = document.getElementById("ctaModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

document.getElementById("ctaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Our team will contact you shortly.");
  closeCtaModal();
});

const awardsTrack = document.querySelector(".awards-track");
const awardsDots = document.querySelector(".awards-dots");

let awardSlidesList = Array.from(document.querySelectorAll(".awards-grid"));
let awardIndex = 1;
let awardsAutoTimer;
const awardSlideWidth = 100;

const awardFirstClone = awardSlidesList[0].cloneNode(true);
const awardLastClone = awardSlidesList[awardSlidesList.length - 1].cloneNode(true);

awardFirstClone.classList.add("clone");
awardLastClone.classList.add("clone");

awardsTrack.appendChild(awardFirstClone);
awardsTrack.insertBefore(awardLastClone, awardSlidesList[0]);

awardSlidesList = Array.from(document.querySelectorAll(".awards-grid"));

awardsTrack.style.transform = `translateX(-${awardIndex * awardSlideWidth}%)`;

function buildAwardsDots() {
  awardsDots.innerHTML = "";

  for (let i = 0; i < awardSlidesList.length - 2; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      awardIndex = i + 1;
      moveAwardsSlide();
    });
    awardsDots.appendChild(dot);
  }
  updateAwardsDots();
}

function updateAwardsDots() {
  awardsDots.querySelectorAll("span").forEach((dot, i) => {
    dot.classList.toggle("active", i === awardIndex - 1);
  });
}

function moveAwardsSlide() {
  awardsTrack.style.transition = "transform 0.6s ease";
  awardsTrack.style.transform = `translateX(-${awardIndex * awardSlideWidth}%)`;
  updateAwardsDots();
}

awardsTrack.addEventListener("transitionend", () => {
  if (awardSlidesList[awardIndex].classList.contains("clone")) {
    awardsTrack.style.transition = "none";

    awardIndex =
      awardIndex === awardSlidesList.length - 1
        ? 1
        : awardSlidesList.length - 2;

    awardsTrack.style.transform = `translateX(-${awardIndex * awardSlideWidth}%)`;
    updateAwardsDots();
  }
});

function startAwardsAuto() {
  clearInterval(awardsAutoTimer);

  awardsAutoTimer = setInterval(() => {
    if (awardIndex >= awardSlidesList.length - 1) return;
    awardIndex++;
    moveAwardsSlide();
  }, 4000);
}

buildAwardsDots();
startAwardsAuto();


