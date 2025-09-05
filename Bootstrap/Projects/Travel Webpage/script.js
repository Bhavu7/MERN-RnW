// Scroll animations
const scrollElements = document.querySelectorAll(".scroll-animate");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("show");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// Initialize scroll animation on page load
handleScrollAnimation();

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Add hover effects to destination cards
const destinationCards = document.querySelectorAll(".destination-card");
destinationCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(-10px) scale(1)";
  });
});

// Add pulse animation to CTA buttons
const ctaButtons = document.querySelectorAll(".btn-gradient");
ctaButtons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.animation = "pulse 0.6s ease-in-out";
  });

  button.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

// Search form functionality
const searchForm = document.querySelector(".search-box");
const searchButton = searchForm.querySelector(".btn");

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const destination = searchForm.querySelector('input[type="text"]').value;
  const date = searchForm.querySelector('input[type="date"]').value;
  const guests = searchForm.querySelector("select").value;

  if (destination.trim() === "") {
    alert("Please enter a destination!");
    return;
  }

  // Simulate search functionality
  this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
  this.disabled = true;

  setTimeout(() => {
    alert(
      `Searching for trips to ${destination} for ${guests} on ${
        date || "flexible dates"
      }...`
    );
    this.innerHTML = '<i class="fas fa-search"></i> Search';
    this.disabled = false;
  }, 2000);
});

// Add parallax effect to hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;
  hero.style.transform = `translateY(${rate}px)`;
});

// Add typing effect to hero title
const heroTitle = document.querySelector(".hero h1");
const titleText = heroTitle.textContent;
heroTitle.textContent = "";

let i = 0;
const typeWriter = () => {
  if (i < titleText.length) {
    heroTitle.textContent += titleText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
};

// Start typing effect after page load
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000);
});

// Add click animations to feature cards
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card) => {
  card.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "translateY(-5px)";
    }, 150);
  });
});

// Add loading animation for destination images
const destinationImages = document.querySelectorAll(".destination-card img");
destinationImages.forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "0";
    this.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      this.style.opacity = "1";
    }, 100);
  });
});

// Add counter animation for testimonial stars
const starContainers = document.querySelectorAll(".stars");
const animateStars = (container) => {
  const stars = container.querySelectorAll(".fas");
  stars.forEach((star, index) => {
    setTimeout(() => {
      star.style.transform = "scale(1.2)";
      star.style.color = "#ffd700";
      setTimeout(() => {
        star.style.transform = "scale(1)";
      }, 200);
    }, index * 100);
  });
};

// Intersection Observer for star animations
const starObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateStars(entry.target);
      starObserver.unobserve(entry.target);
    }
  });
});

starContainers.forEach((container) => {
  starObserver.observe(container);
});

// Add mobile menu animation
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggler.addEventListener("click", function () {
  if (navbarCollapse.classList.contains("show")) {
    navbarCollapse.style.animation = "fadeOut 0.3s ease";
  } else {
    navbarCollapse.style.animation = "fadeIn 0.3s ease";
  }
});

// Add CSS animations for mobile menu
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-10px); }
            }
        `;
document.head.appendChild(style);
