// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background =
      "linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(52, 152, 219, 0.95))";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "linear-gradient(135deg, #2c3e50, #3498db)";
    navbar.style.backdropFilter = "none";
  }
});

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".service-card, .feature, .contact-item, .gallery-item, .pricing-card, .service-price"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
}

// Contact form validation (if a form is added later)
function validateContactForm(form) {
  const email = form.querySelector('input[type="email"]');
  const phone = form.querySelector('input[type="tel"]');
  const message = form.querySelector("textarea");

  let isValid = true;

  // Email validation
  if (email && !validateEmail(email.value)) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  // Phone validation
  if (phone && !validatePhone(phone.value)) {
    showError(phone, "Please enter a valid phone number");
    isValid = false;
  }

  // Message validation
  if (message && message.value.trim().length < 10) {
    showError(message, "Please enter a message with at least 10 characters");
    isValid = false;
  }

  return isValid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return re.test(phone);
}

function showError(field, message) {
  // Remove existing error message
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Create and add new error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "#e74c3c";
  errorDiv.style.fontSize = "0.9rem";
  errorDiv.style.marginTop = "5px";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);

  // Add error styling to field
  field.style.borderColor = "#e74c3c";

  // Remove error styling after user starts typing
  field.addEventListener(
    "input",
    function () {
      field.style.borderColor = "";
      const errorMsg = field.parentNode.querySelector(".error-message");
      if (errorMsg) {
        errorMsg.remove();
      }
    },
    { once: true }
  );
}

// Utility functions for future enhancements
function formatPhoneNumber(phone) {
  // Format South African phone numbers
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("27")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(
      4,
      7
    )} ${cleaned.slice(7)}`;
  } else if (cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
}

function generateQuote() {
  // Future enhancement: Generate automatic quotes based on event details
  alert("Quote request submitted! We will contact you within 24 hours.");
}

// Add click-to-call functionality for mobile devices
document.addEventListener("DOMContentLoaded", function () {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Analytics tracking could be added here
      console.log("Phone number clicked:", this.href);
    });
  });
});

// Add loading animation for images
function addImageLoadingEffect() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease-in-out";
  });
}

// Initialize all functions when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  addImageLoadingEffect();

  // Add hover effects to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Performance optimization: Lazy loading for future images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Gallery functionality
document.addEventListener("DOMContentLoaded", function () {
  // Handle image loading
  const galleryImages = document.querySelectorAll(".gallery-image img");
  galleryImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });

    // If image is already cached and loaded
    if (img.complete) {
      img.classList.add("loaded");
    }
  });

  // Add click event to gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const overlay = this.querySelector(".gallery-overlay");
      const isExpanded = this.classList.contains("expanded");

      // Remove expanded class from all items
      galleryItems.forEach((otherItem) => {
        otherItem.classList.remove("expanded");
      });

      // Toggle expanded state
      if (!isExpanded) {
        this.classList.add("expanded");
      }
    });
  });

  // Add keyboard navigation for gallery
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      galleryItems.forEach((item) => {
        item.classList.remove("expanded");
      });
    }
  });
});

// Pricing calculator functionality
function calculateTentPrice(tentType, days = 1, additionalServices = []) {
  const basePrices = {
    small: 800,
    medium: 1500,
    large: 2800,
    marquee: 5500,
  };

  const servicePrices = {
    tables_chairs: 50,
    lighting: 550, // average
    sound: 850, // average
    catering: 600, // average
    decoration: 400, // base price
  };

  let basePrice = basePrices[tentType] || 0;
  let totalPrice = basePrice * days;

  // Apply multi-day discount (20% per day after first)
  if (days > 1) {
    const discountDays = days - 1;
    const discountAmount = basePrice * discountDays * 0.2;
    totalPrice -= discountAmount;
  }

  // Add additional services
  additionalServices.forEach((service) => {
    totalPrice += servicePrices[service] || 0;
  });

  return {
    basePrice,
    totalPrice,
    days,
    discount: days > 1 ? basePrice * (days - 1) * 0.2 : 0,
  };
}

// Gallery image loading simulation
function simulateImageLoad() {
  const placeholderImages = document.querySelectorAll(".placeholder-image");
  placeholderImages.forEach((img, index) => {
    setTimeout(() => {
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, index * 200);
  });
}

// Initialize gallery loading effect
document.addEventListener("DOMContentLoaded", function () {
  simulateImageLoad();

  // Add pricing calculator interaction
  const pricingCards = document.querySelectorAll(".pricing-card");
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.borderColor = "#f39c12";
    });

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("featured")) {
        this.style.borderColor = "transparent";
      }
    });
  });
});
