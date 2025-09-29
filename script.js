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
