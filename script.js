// Mobile Sidebar Menu Functionality
class SidebarMenu {
  constructor() {
    this.mobileMenuToggle = document.getElementById("mobileMenuToggle");
    this.sidebarMenu = document.getElementById("sidebarMenu");
    this.sidebarOverlay = document.getElementById("sidebarOverlay");
    this.sidebarClose = document.getElementById("sidebarClose");
    this.sidebarLinks = document.querySelectorAll(".sidebar-link");

    this.init();
  }

  init() {
    // Set viewport height for mobile browsers
    this.setViewportHeight();
    window.addEventListener('resize', () => this.setViewportHeight());
    
    // Event listeners
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener("click", () =>
        this.toggleSidebar()
      );
    }

    if (this.sidebarClose) {
      this.sidebarClose.addEventListener("click", () => this.closeSidebar());
    }

    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener("click", () => this.closeSidebar());
    }

    // Close sidebar when clicking navigation links
    this.sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeSidebar();
      });
    });

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    console.log("Toggling sidebar, currently open:", this.isOpen());
    if (this.isOpen()) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    console.log("Opening sidebar");
    this.sidebarMenu.classList.add("active");
    this.sidebarOverlay.classList.add("active");
    this.mobileMenuToggle.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Add a small delay for better animation
    setTimeout(() => {
      this.sidebarMenu.setAttribute("aria-hidden", "false");
    }, 100);
  }

  closeSidebar() {
    console.log("Closing sidebar");
    this.sidebarMenu.classList.remove("active");
    this.sidebarOverlay.classList.remove("active");
    this.mobileMenuToggle.classList.remove("active");
    document.body.style.overflow = ""; // Restore background scroll

    this.sidebarMenu.setAttribute("aria-hidden", "true");
  }

  isOpen() {
    return this.sidebarMenu.classList.contains("active");
  }

  setViewportHeight() {
    // Fix for mobile viewport height issues
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

// Smooth scrolling for navigation links (updated to include sidebar links)
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
  // Initialize sidebar menu
  const sidebarMenu = new SidebarMenu();
  console.log("✅ Sidebar menu initialized successfully");

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

  // Mobile-specific enhancements
  const isMobile = window.innerWidth <= 768;

  // Add pricing calculator interaction
  const pricingCards = document.querySelectorAll(".pricing-card");
  pricingCards.forEach((card) => {
    if (isMobile) {
      // Use touch events for mobile
      card.addEventListener("touchstart", function () {
        this.style.borderColor = "#f39c12";
      });

      card.addEventListener("touchend", function () {
        if (!this.classList.contains("featured")) {
          setTimeout(() => {
            this.style.borderColor = "transparent";
          }, 300);
        }
      });
    } else {
      // Use mouse events for desktop
      card.addEventListener("mouseenter", function () {
        this.style.borderColor = "#f39c12";
      });

      card.addEventListener("mouseleave", function () {
        if (!this.classList.contains("featured")) {
          this.style.borderColor = "transparent";
        }
      });
    }
  });

  // Mobile navigation improvements
  if (isMobile) {
    // Reduce scroll offset for mobile navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          const offsetTop = target.offsetTop - 100; // Larger offset for mobile
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Mobile gallery improvements
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (isMobile) {
    galleryItems.forEach((item) => {
      // Show overlay on first touch for mobile
      item.addEventListener("touchstart", function () {
        const overlay = this.querySelector(".gallery-overlay");
        overlay.style.transform = "translateY(0)";
      });

      // Hide overlay after delay on mobile
      item.addEventListener("touchend", function () {
        const overlay = this.querySelector(".gallery-overlay");
        setTimeout(() => {
          overlay.style.transform = "translateY(100%)";
        }, 2000);
      });
    });
  }
});

// Mobile-specific scroll optimizations
let ticking = false;

function updateNavbarOnScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background =
      "linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(52, 152, 219, 0.95))";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "linear-gradient(135deg, #2c3e50, #3498db)";
    navbar.style.backdropFilter = "none";
  }
  ticking = false;
}

// Throttle scroll events for better mobile performance
window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateNavbarOnScroll);
    ticking = true;
  }
});

// Mobile viewport fix
function setMobileViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", setMobileViewportHeight);
setMobileViewportHeight();

// WhatsApp Integration Functionality
document.addEventListener("DOMContentLoaded", function () {
  // WhatsApp floating button functionality
  const whatsappFloat = document.getElementById("whatsapp-float");

  if (whatsappFloat) {
    // Add click tracking for analytics (optional)
    whatsappFloat.addEventListener("click", function () {
      console.log("WhatsApp chat initiated");
      // You can add Google Analytics tracking here if needed
      // gtag('event', 'click', { event_category: 'WhatsApp', event_label: 'Floating Button' });
    });

    // Show/hide floating button based on scroll position
    let isVisible = true;
    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide button when near footer to avoid overlap
      if (scrollTop + windowHeight > documentHeight - 200) {
        if (isVisible) {
          whatsappFloat.style.opacity = "0.5";
          whatsappFloat.style.transform = "scale(0.8)";
          isVisible = false;
        }
      } else {
        if (!isVisible) {
          whatsappFloat.style.opacity = "1";
          whatsappFloat.style.transform = "scale(1)";
          isVisible = true;
        }
      }
    });
  }

  // Generate dynamic WhatsApp messages based on context
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const currentPage = window.location.hash || "#home";
      let message = "Hi! I'm interested in your tent rental services.";

      // Customize message based on current section
      switch (currentPage) {
        case "#services":
          message =
            "Hi! I saw your services page and I'm interested in tent rental. Can you help me with pricing?";
          break;
        case "#pricing":
          message =
            "Hi! I'm looking at your pricing and would like to get a custom quote for my event.";
          break;
        case "#gallery":
          message =
            "Hi! I love the tent setups in your gallery. Can you provide similar services for my event?";
          break;
        case "#about":
          message =
            "Hi! I read about your company and I'm impressed. I need tent rental services for an upcoming event.";
          break;
        default:
          message =
            "Hi! I'm interested in your tent rental services. Can you help me with pricing and availability?";
      }

      // Update the href with the dynamic message if it's a basic WhatsApp link
      const originalHref = this.href;
      if (!originalHref.includes("text=")) {
        const baseUrl = originalHref.split("?")[0];
        this.href = `${baseUrl}?text=${encodeURIComponent(message)}`;
      }
    });
  });
});

// WhatsApp Business Hours Check
function checkBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();

  let isOpen = false;
  let message = "";

  // Business hours: Mon-Fri 8AM-6PM, Sat 8AM-4PM, Sun emergency only
  if (day >= 1 && day <= 5) {
    // Monday to Friday
    isOpen = hour >= 8 && hour < 18;
    message = isOpen
      ? "We're currently online! We'll respond immediately."
      : "We're currently offline. We'll respond during business hours (8AM-6PM).";
  } else if (day === 6) {
    // Saturday
    isOpen = hour >= 8 && hour < 16;
    message = isOpen
      ? "We're currently online! We'll respond immediately."
      : "We're currently offline. We'll respond during business hours (8AM-4PM on Saturday).";
  } else {
    // Sunday
    message =
      "Today is Sunday. We're available for emergency calls only. We'll respond on Monday.";
  }

  return { isOpen, message };
}

// Add business hours indicator to WhatsApp buttons (optional)
function addBusinessHoursIndicator() {
  const { isOpen, message } = checkBusinessHours();
  const whatsappElements = document.querySelectorAll(
    ".whatsapp-float, .whatsapp-contact"
  );

  whatsappElements.forEach((element) => {
    element.title = message;

    // Add online/offline indicator
    if (!element.querySelector(".status-indicator")) {
      const indicator = document.createElement("div");
      indicator.className = `status-indicator ${isOpen ? "online" : "offline"}`;
      indicator.style.cssText = `
        position: absolute;
        top: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: ${isOpen ? "#4CAF50" : "#FFA726"};
        border: 2px solid white;
        z-index: 10;
      `;
      element.style.position = "relative";
      element.appendChild(indicator);
    }
  });
}

// Initialize business hours indicator
document.addEventListener("DOMContentLoaded", function () {
  addBusinessHoursIndicator();
  // Update every 5 minutes
  setInterval(addBusinessHoursIndicator, 300000);
});

// WhatsApp Quick Replies and Auto Response System
const WhatsAppAutoResponse = {
  // Auto-response messages based on business hours
  autoResponses: {
    online:
      "Hi! This is Siphila Ngomusa Tents Hire CC. 👋\n\nThank you for reaching out! We're currently online and ready to help you with your tent rental needs. Someone from our team will respond to you shortly.\n\n🎪 What can we help you with today?",

    offline:
      "Hi! This is Siphila Ngomusa Tents Hire CC. 👋\n\nThank you for contacting us! We're currently offline, but don't worry - we've received your message and will get back to you as soon as someone is online.\n\n⏰ Our business hours:\n• Monday - Friday: 8AM - 6PM\n• Saturday: 8AM - 4PM\n• Sunday: Emergency calls only\n\n🎪 We look forward to helping you create a memorable event!",

    weekend:
      "Hi! This is Siphila Ngomusa Tents Hire CC. 👋\n\nThank you for reaching out! It's currently the weekend, but we've received your message. Our team will respond first thing Monday morning.\n\n⏰ We'll be back online:\n• Monday: 8AM - 6PM\n\n🎪 We appreciate your patience and look forward to helping you!",
  },

  // Quick reply templates for common responses
  quickReplies: {
    greeting:
      "Hello! Welcome to Siphila Ngomusa Tents Hire CC! 👋 How can we help you create an amazing event today?",

    pricing: {
      general:
        "📋 **TENT RENTAL PRICING**\n\n🏠 **Small Tent (3m x 3m)**: R800/day\n• Seats 20-25 people\n• Basic setup included\n\n🎪 **Medium Tent (6m x 9m)**: R1,500/day\n• Seats 50-75 people\n• Professional setup & flooring\n\n🏛️ **Large Tent (12m x 18m)**: R2,800/day\n• Seats 150-200 people\n• Premium setup & lighting\n\n🎭 **Marquee (15m x 30m)**: R5,500/day\n• Seats 300+ people\n• Complete setup service\n\n💡 **Additional Services**:\n• Chairs: R7 each\n• Tables: R70 each\n• Gas stove set: R750\n• Pots: R100 each\n\n📞 Would you like a custom quote for your specific event?",

      wedding:
        "💒 **WEDDING TENT PACKAGES**\n\n✨ Our wedding tents create the perfect romantic atmosphere for your special day!\n\n🌟 **Popular Wedding Sizes**:\n• Medium (50-75 guests): R1,500/day\n• Large (150-200 guests): R2,800/day\n• Marquee (300+ guests): R5,500/day\n\n💐 **Included**:\n• Professional setup\n• Quality flooring\n• Basic lighting\n• Weather protection\n\n🎊 **Add-ons Available**:\n• Premium lighting\n• Dance floor setup\n• Catering area preparation\n\nTell us about your wedding and we'll create a custom package! 💕",

      corporate:
        "🏢 **CORPORATE EVENT TENTS**\n\n🎯 Professional tent solutions for your business events!\n\n📊 **Perfect for**:\n• Conferences & seminars\n• Product launches\n• Team building events\n• Corporate parties\n• Trade shows\n\n💼 **Features**:\n• Professional appearance\n• AV equipment ready\n• Climate control compatible\n• Branded setup options\n\n💰 **Starting from R1,500/day**\n\nWhat type of corporate event are you planning? 🤝",
    },

    availability:
      "📅 **CHECKING AVAILABILITY**\n\nTo check availability and provide accurate pricing, please share:\n\n📍 **Event Location**: Where will your event be?\n📅 **Event Date**: When is your event?\n👥 **Guest Count**: How many people will attend?\n🎪 **Tent Size Preference**: Any specific size in mind?\n⏰ **Event Duration**: How many days do you need the tent?\n\nOnce I have these details, I can check our availability and give you a detailed quote! 🎯",

    services:
      "🎪 **OUR SERVICES**\n\n✅ **Tent Rental Services**:\n• Wedding tents & marquees\n• Corporate event tents\n• Birthday party setups\n• Festival & large event tents\n• Weather protection tents\n\n🛠️ **Additional Services**:\n• Professional tent setup\n• Tables & chairs rental\n• Lighting arrangements\n• Flooring installation\n• Gas stoves & cooking equipment\n• Complete event coordination\n\n📦 **All-Inclusive Packages Available**\n\nWhat type of event are you planning? Let's make it memorable! ✨",

    location:
      "📍 **SERVICE AREAS**\n\nWe proudly serve the greater Johannesburg area and surrounding regions!\n\n🏠 **Our Location**:\n1736 Legodi Street\nNguni Section\nVosloorus, 1475\n\n🚚 **Delivery & Setup**:\n• FREE delivery & setup within 5km radius\n• Extended delivery available\n• Professional installation team\n• Complete setup & takedown service\n\n📞 Where is your event located? We'll confirm if it's in our service area!",

    booking:
      "📋 **BOOKING PROCESS**\n\n✅ **How to Book**:\n1️⃣ Share your event details\n2️⃣ Receive detailed quote\n3️⃣ Confirm booking with deposit\n4️⃣ We handle setup & takedown\n\n💳 **Payment Options**:\n• Bank transfer\n• Cash payment\n• Installment plans available\n\n📞 **What's Next?**\nShare your event details and we'll send you a personalized quote within 2 hours!\n\n🎪 Ready to book your perfect tent? Let's get started!",

    contact:
      "📞 **CONTACT INFORMATION**\n\n📱 **Phone Numbers**:\n• Primary: +27 69 490 5342\n• Secondary: +27 71 160 0863\n\n📧 **Email**: lethusithole7@gmail.com\n\n📍 **Address**:\n1736 Legodi Street\nNguni Section, Vosloorus 1475\n\n⏰ **Business Hours**:\n• Monday - Friday: 8AM - 6PM\n• Saturday: 8AM - 4PM\n• Sunday: Emergency calls only\n\n💬 **You're already chatting with us on WhatsApp - the fastest way to get help!**",

    thankyou:
      "🙏 **Thank you for choosing Siphila Ngomusa Tents Hire CC!**\n\nWe're excited to be part of your special event! 🎉\n\n✅ **What happens next**:\n• We'll finalize all details\n• Confirm your booking\n• Handle professional setup\n• Ensure everything is perfect\n\n📞 **Questions?** Just message us anytime!\n\n🌟 We can't wait to help make your event unforgettable!",
  },

  // Function to get appropriate auto-response based on business hours
  getAutoResponse: function () {
    const { isOpen } = checkBusinessHours();
    const now = new Date();
    const day = now.getDay();

    if (day === 0) {
      // Sunday
      return this.autoResponses.weekend;
    } else if (isOpen) {
      return this.autoResponses.online;
    } else {
      return this.autoResponses.offline;
    }
  },

  // Function to display quick replies (for reference/training)
  displayQuickReplies: function () {
    console.log("=== SIPHILA NGOMUSA TENTS - QUICK REPLIES ===");
    console.log("Auto Response:", this.getAutoResponse());
    console.log("\n=== QUICK REPLY TEMPLATES ===");
    Object.keys(this.quickReplies).forEach((key) => {
      if (typeof this.quickReplies[key] === "object") {
        console.log(`\n${key.toUpperCase()}:`);
        Object.keys(this.quickReplies[key]).forEach((subKey) => {
          console.log(
            `  ${subKey}: ${this.quickReplies[key][subKey].substring(
              0,
              100
            )}...`
          );
        });
      } else {
        console.log(`\n${key}: ${this.quickReplies[key].substring(0, 100)}...`);
      }
    });
  },
};

// Function to copy quick replies to clipboard (for easy use)
function copyQuickReply(replyType, subType = null) {
  let text;
  if (subType && WhatsAppAutoResponse.quickReplies[replyType][subType]) {
    text = WhatsAppAutoResponse.quickReplies[replyType][subType];
  } else if (WhatsAppAutoResponse.quickReplies[replyType]) {
    text = WhatsAppAutoResponse.quickReplies[replyType];
  } else {
    text = WhatsAppAutoResponse.getAutoResponse();
  }

  navigator.clipboard
    .writeText(text)
    .then(function () {
      console.log("Quick reply copied to clipboard!");
      // You could show a toast notification here
    })
    .catch(function (err) {
      console.log("Could not copy text: ", err);
    });
}

// Enhanced WhatsApp link functionality with auto-response info
document.addEventListener("DOMContentLoaded", function () {
  // Add information about auto-responses to WhatsApp links
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappLinks.forEach((link) => {
    // Add data attribute with auto-response info
    const autoResponse = WhatsAppAutoResponse.getAutoResponse();
    link.setAttribute("data-auto-response", autoResponse);

    // Update title to inform users about auto-response
    const originalTitle = link.title || "";
    link.title =
      originalTitle +
      "\n\nYou will receive an automatic welcome message when you start the chat.";

    // Enhanced click tracking
    link.addEventListener("click", function () {
      console.log("WhatsApp chat initiated");
      console.log(
        "Auto-response will be:",
        autoResponse.substring(0, 100) + "..."
      );

      // Store the interaction for potential follow-up
      localStorage.setItem(
        "whatsapp_last_interaction",
        new Date().toISOString()
      );
      localStorage.setItem("whatsapp_auto_response_sent", autoResponse);
    });
  });

  // Initialize quick replies system (for development/testing)
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    console.log("WhatsApp Quick Replies System Loaded");
    WhatsAppAutoResponse.displayQuickReplies();

    // Make functions available globally for testing
    window.WhatsAppAutoResponse = WhatsAppAutoResponse;
    window.copyQuickReply = copyQuickReply;
  }
});

// Email Support System Integration
class EmailSupportAPI {
  constructor() {
    // Using EmailJS (free service) as primary
    this.emailjsServiceId = "service_siphila"; // Will be set up
    this.emailjsTemplateId = "template_inquiry";
    this.emailjsUserId = "siphila_tents";

    // Backup using FormSubmit (no signup required)
    this.backupEndpoint = "https://formsubmit.co/lethusithole7@gmail.com";

    // Alternative backup using Netlify Forms
    this.netlifyEndpoint = "https://formspree.io/f/xeqyqork"; // Fresh endpoint

    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupEmailForm();
      this.loadEmailJS();
    });
  }

  loadEmailJS() {
    // Load EmailJS SDK if not already loaded
    if (typeof emailjs === "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
      script.onload = () => {
        // Initialize EmailJS when script loads
        if (typeof emailjs !== "undefined") {
          emailjs.init(this.emailjsUserId);
        }
      };
      document.head.appendChild(script);
    }
  }

  setupEmailForm() {
    const form = document.getElementById("emailSupportForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });

    // Add real-time form validation
    this.addFormValidation(form);
  }

  addFormValidation(form) {
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      field.addEventListener("blur", () => {
        this.validateField(field);
      });

      field.addEventListener("input", () => {
        if (field.classList.contains("error")) {
          this.validateField(field);
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;

    // Remove previous error styling
    field.classList.remove("error");
    this.removeFieldError(field);

    if (field.hasAttribute("required") && !value) {
      isValid = false;
      this.showFieldError(field, "This field is required");
    } else if (fieldType === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        this.showFieldError(field, "Please enter a valid email address");
      }
    } else if (fieldType === "tel" && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        this.showFieldError(field, "Please enter a valid phone number");
      }
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add("error");

    const errorEl = document.createElement("span");
    errorEl.className = "field-error";
    errorEl.textContent = message;
    errorEl.style.color = "#e74c3c";
    errorEl.style.fontSize = "0.8rem";
    errorEl.style.marginTop = "0.25rem";

    field.parentElement.appendChild(errorEl);
  }

  removeFieldError(field) {
    const errorEl = field.parentElement.querySelector(".field-error");
    if (errorEl) {
      errorEl.remove();
    }
  }

  async handleFormSubmission(form) {
    const submitBtn = form.querySelector(".email-submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const successMessage = document.getElementById("emailFormSuccess");
    const errorMessage = document.getElementById("emailFormError");

    // Validate all fields first
    const isFormValid = this.validateForm(form);
    if (!isFormValid) {
      this.showMessage(errorMessage, "Please correct the errors above");
      return;
    }

    // Show loading state
    this.setLoadingState(submitBtn, btnText, btnLoading, true);
    this.hideMessages();

    try {
      const formData = new FormData(form);
      const emailData = this.prepareEmailData(formData);

      console.log("Attempting to send email with data:", emailData);

      // Try multiple services in order of preference
      let success = false;
      let errorDetails = [];

      // Method 1: FormSubmit (most reliable, no setup needed)
      try {
        success = await this.sendEmailFormSubmit(emailData);
        if (success) {
          console.log("Email sent successfully via FormSubmit");
        }
      } catch (error) {
        console.log("FormSubmit failed:", error);
        errorDetails.push("FormSubmit: " + error.message);
      }

      // Method 2: Backup service if first fails
      if (!success) {
        try {
          success = await this.sendEmailBackup(emailData);
          if (success) {
            console.log("Email sent successfully via backup service");
          }
        } catch (error) {
          console.log("Backup service failed:", error);
          errorDetails.push("Backup: " + error.message);
        }
      }

      // Method 3: Simple mailto fallback
      if (!success) {
        try {
          success = this.sendEmailMailto(emailData);
          if (success) {
            console.log("Email sent via mailto fallback");
          }
        } catch (error) {
          console.log("Mailto fallback failed:", error);
          errorDetails.push("Mailto: " + error.message);
        }
      }

      if (success) {
        this.showMessage(successMessage);
        form.reset();
        this.trackEmailSubmission(emailData);
      } else {
        throw new Error(`All email methods failed: ${errorDetails.join(", ")}`);
      }
    } catch (error) {
      console.error("Email submission error:", error);
      this.showMessage(
        errorMessage,
        "Failed to send email. Please try again or contact us directly at +27 69 490 5342 or lethusithole7@gmail.com"
      );
    } finally {
      this.setLoadingState(submitBtn, btnText, btnLoading, false);
    }
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  prepareEmailData(formData) {
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Add metadata
    data.timestamp = new Date().toISOString();
    data.source = "Siphila Ngomusa Tents Website";
    data.userAgent = navigator.userAgent;

    // Format the email subject
    data._subject = `New Inquiry: ${data.inquiryType || "General"} - ${
      data.customerName
    }`;

    return data;
  }

  async sendEmailFormSubmit(data) {
    try {
      // FormSubmit.co - No signup required, just works
      const form = document.createElement("form");
      form.style.display = "none";
      form.method = "POST";
      form.action = "https://formsubmit.co/lethusithole7@gmail.com";

      // Add form data
      Object.keys(data).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      });

      // Add FormSubmit specific fields
      const subjectInput = document.createElement("input");
      subjectInput.type = "hidden";
      subjectInput.name = "_subject";
      subjectInput.value = `New Tent Inquiry from ${data.customerName}`;
      form.appendChild(subjectInput);

      const nextInput = document.createElement("input");
      nextInput.type = "hidden";
      nextInput.name = "_next";
      nextInput.value = window.location.href;
      form.appendChild(nextInput);

      const captchaInput = document.createElement("input");
      captchaInput.type = "hidden";
      captchaInput.name = "_captcha";
      captchaInput.value = "false";
      form.appendChild(captchaInput);

      document.body.appendChild(form);

      // Create a promise to handle form submission
      return new Promise((resolve) => {
        // Set a timeout to consider it successful if no errors occur
        setTimeout(() => {
          document.body.removeChild(form);
          resolve(true);
        }, 1000);

        form.submit();
      });
    } catch (error) {
      console.error("FormSubmit error:", error);
      throw error;
    }
  }

  async sendEmailBackup(data) {
    try {
      // Simple fetch POST request
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await fetch(this.netlifyEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Backup email service error:", error);
      throw error;
    }
  }

  sendEmailMailto(data) {
    try {
      // Fallback: Generate mailto link
      const subject = encodeURIComponent(
        `New Tent Inquiry from ${data.customerName}`
      );
      const body = encodeURIComponent(`
Customer Details:
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone || "Not provided"}
Event Date: ${data.eventDate || "Not specified"}
Event Location: ${data.eventLocation || "Not specified"}
Guest Count: ${data.guestCount || "Not specified"}
Inquiry Type: ${data.inquiryType || "General"}

Message:
${data.customerMessage}

Submitted: ${new Date(data.timestamp).toLocaleString()}
Source: ${data.source}
      `);

      const mailtoUrl = `mailto:lethusithole7@gmail.com?subject=${subject}&body=${body}`;

      // Open mailto link
      window.open(mailtoUrl);

      return true;
    } catch (error) {
      console.error("Mailto fallback error:", error);
      return false;
    }
  }

  setLoadingState(submitBtn, btnText, btnLoading, loading) {
    if (loading) {
      submitBtn.disabled = true;
      btnText.style.display = "none";
      btnLoading.style.display = "flex";
    } else {
      submitBtn.disabled = false;
      btnText.style.display = "block";
      btnLoading.style.display = "none";
    }
  }

  hideMessages() {
    document.getElementById("emailFormSuccess").style.display = "none";
    document.getElementById("emailFormError").style.display = "none";
  }

  showMessage(element, customMessage = null) {
    this.hideMessages();

    if (customMessage) {
      const messageP = element.querySelector("p");
      if (messageP) messageP.textContent = customMessage;
    }

    element.style.display = "block";
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    // Auto-hide success messages after 5 seconds
    if (element.classList.contains("success-message")) {
      setTimeout(() => {
        element.style.display = "none";
      }, 5000);
    }
  }

  trackEmailSubmission(data) {
    // Store submission in localStorage for analytics
    const submissions = JSON.parse(
      localStorage.getItem("email_submissions") || "[]"
    );
    submissions.push({
      timestamp: new Date().toISOString(),
      inquiryType: data.inquiryType,
      source: "website_form",
    });

    // Keep only last 10 submissions
    if (submissions.length > 10) {
      submissions.splice(0, submissions.length - 10);
    }

    localStorage.setItem("email_submissions", JSON.stringify(submissions));

    console.log("Email submission tracked:", data.inquiryType);
  }

  // Debug mode for troubleshooting
  enableDebugMode() {
    window.emailDebug = true;
    console.log(
      "%cEmail Debug Mode Enabled",
      "color: #f39c12; font-weight: bold; font-size: 16px;"
    );
    console.log("Available debug functions:");
    console.log("- emailSupport.testEmailSending() - Test all email methods");
    console.log("- emailSupport.checkFormData() - Check current form data");
    console.log(
      "- emailSupport.clearSubmissionHistory() - Clear stored submissions"
    );
  }

  testEmailSending() {
    const testData = {
      customerName: "Test Customer",
      customerEmail: "test@example.com",
      customerPhone: "+27123456789",
      inquiryType: "pricing",
      eventDate: "2025-12-01",
      eventLocation: "Johannesburg",
      guestCount: "50-75",
      customerMessage: "This is a test message to verify email functionality.",
      timestamp: new Date().toISOString(),
      source: "Debug Test",
    };

    console.log("Testing email with data:", testData);

    // Test FormSubmit
    this.sendEmailFormSubmit(testData)
      .then((success) => {
        console.log("FormSubmit test result:", success);
      })
      .catch((err) => {
        console.error("FormSubmit test error:", err);
      });
  }

  checkFormData() {
    const form = document.getElementById("emailSupportForm");
    if (!form) {
      console.log("Form not found");
      return;
    }

    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    console.log("Current form data:", data);
    return data;
  }

  clearSubmissionHistory() {
    localStorage.removeItem("email_submissions");
    console.log("Submission history cleared");
  }
}

// Enhanced Email Template Generation
class EmailTemplateGenerator {
  static generateBusinessEmail(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2c3e50, #3498db); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #3498db; }
        .label { font-weight: bold; color: #2c3e50; }
        .priority { background: #f39c12; color: white; padding: 5px 10px; border-radius: 3px; display: inline-block; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🎪 New Customer Inquiry</h2>
            <p>Siphila Ngomusa Tents Hire CC</p>
        </div>
        <div class="content">
            <div class="priority">Priority: ${
              data.inquiryType === "urgent" ? "HIGH" : "NORMAL"
            }</div>
            
            <div class="field">
                <div class="label">Customer Information:</div>
                <strong>${data.customerName}</strong><br>
                📧 ${data.customerEmail}<br>
                ${data.customerPhone ? `📞 ${data.customerPhone}<br>` : ""}
            </div>
            
            <div class="field">
                <div class="label">Inquiry Type:</div>
                ${this.formatInquiryType(data.inquiryType)}
            </div>
            
            ${
              data.eventDate
                ? `
            <div class="field">
                <div class="label">Event Date:</div>
                📅 ${new Date(data.eventDate).toLocaleDateString("en-ZA", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </div>`
                : ""
            }
            
            ${
              data.eventLocation
                ? `
            <div class="field">
                <div class="label">Event Location:</div>
                📍 ${data.eventLocation}
            </div>`
                : ""
            }
            
            ${
              data.guestCount
                ? `
            <div class="field">
                <div class="label">Expected Guests:</div>
                👥 ${data.guestCount}
            </div>`
                : ""
            }
            
            <div class="field">
                <div class="label">Customer Message:</div>
                ${data.customerMessage.replace(/\n/g, "<br>")}
            </div>
            
            <div class="field">
                <div class="label">Submission Details:</div>
                🕐 ${new Date(data.timestamp).toLocaleString("en-ZA")}<br>
                🌐 Source: ${data.source}<br>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  static formatInquiryType(type) {
    const types = {
      pricing: "💰 Pricing & Quotes",
      availability: "📅 Availability Check",
      wedding: "💒 Wedding Services",
      corporate: "🏢 Corporate Events",
      birthday: "🎂 Birthday Parties",
      general: "❓ General Information",
      support: "🛠️ Customer Support",
    };

    return types[type] || "📝 General Inquiry";
  }
}

// Add CSS for field validation errors
const validationStyles = `
  <style>
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
      border-color: #e74c3c !important;
      background: rgba(231, 76, 60, 0.1) !important;
    }
    
    .field-error {
      color: #e74c3c;
      font-size: 0.8rem;
      margin-top: 0.25rem;
      display: block;
    }
  </style>
`;

document.head.insertAdjacentHTML("beforeend", validationStyles);

// Initialize the email support system with better error handling
try {
  const emailSupport = new EmailSupportAPI();

  // Enable debug mode in development
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    emailSupport.enableDebugMode();
    window.emailSupport = emailSupport; // Make available for debugging
  }

  console.log("✅ Email Support System initialized successfully");
} catch (error) {
  console.error("❌ Failed to initialize Email Support System:", error);

  // Fallback: Show error message on form
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("emailSupportForm");
    if (form) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "form-message error-message";
      errorDiv.innerHTML = `
        <i class="error-icon">⚠️</i>
        <h4>Email System Temporarily Unavailable</h4>
        <p>Please contact us directly:</p>
        <div class="alternative-contacts">
          <p><strong>📞 Phone:</strong> <a href="tel:+27694905342">+27 69 490 5342</a></p>
          <p><strong>💬 WhatsApp:</strong> <a href="https://wa.me/27694905342" target="_blank">Start Chat</a></p>
          <p><strong>📧 Email:</strong> <a href="mailto:lethusithole7@gmail.com">lethusithole7@gmail.com</a></p>
        </div>
      `;
      form.parentElement.insertBefore(errorDiv, form);
      form.style.display = "none";
    }
  });
}
