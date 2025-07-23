// Refactored script.js with bug fixes and improved organization

/**
 * Gestalt Portfolio Scripts
 * This file contains all interactive functionality for the portfolio website
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== UTILITY FUNCTIONS =====
  /**
   * Helper utilities for DOM manipulation and common operations
   */
  const utils = {
    // Get element with error handling
    getElement: (selector) => {
      const element = document.querySelector(selector);
      if (!element && process.env.NODE_ENV !== 'production') {
        console.warn(`Element not found: ${selector}`);
      }
      return element;
    },
    
    // Get all elements matching selector
    getAllElements: (selector) => document.querySelectorAll(selector),
    
    // Add event with null check
    addEvent: (element, eventType, handler) => {
      if (element) {
        element.addEventListener(eventType, handler);
      }
    },
    
    // Throttle function for performance-sensitive events
    throttle: (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };
  
  // ===== CONTACT FORM MODULE =====
  /**
   * Handles contact form visibility and interaction
   */
  const contactForm = (() => {
    // Get DOM elements
    const form = utils.getElement('#contact-form');
    const toggleBtn = utils.getElement('#toggle-btn');
    
    // Initialize form
    const init = () => {
      if (!form || !toggleBtn) return;
      
      // Ensure form is hidden initially
      form.style.display = 'none';
      
      // Set up toggle functionality
      utils.addEvent(toggleBtn, 'click', toggleFormVisibility);
    };
    
    // Toggle form visibility
    const toggleFormVisibility = () => {
      if (!form) return;
      
      const isHidden = form.style.display === 'none' || form.style.display === '';
      
      // Toggle form visibility
      form.style.display = isHidden ? 'grid' : 'none';
      
      // Toggle button visibility
      if (toggleBtn) {
        toggleBtn.style.display = isHidden ? 'none' : 'block';
        toggleBtn.setAttribute('aria-expanded', isHidden);
      }
      
      // Update arrow when form is closed
      if (!isHidden && window.arrowAnimation) {
        window.arrowAnimation.safeUpdateArrow();
      }
    };
    
    return { init };
  })();
  
  // ===== ARROW ANIMATION MODULE =====
  /**
   * Handles the SVG arrow animation between elements
   */
  const arrowAnimation = (() => {
    // Get DOM elements
    const arrowSvg = utils.getElement('#arrow-line');
    const startEl = utils.getElement('#arrow-start');
    const endEl = utils.getElement('#arrow-end');
    
    // SVG elements (created once)
    let arrowLine, arrowCircle;
    
    // Initialize arrow SVG
    const initArrow = () => {
      if (!arrowSvg || !startEl || !endEl) return;
      
      // Set SVG viewport
      arrowSvg.setAttribute('width', window.innerWidth);
      arrowSvg.setAttribute('height', window.innerHeight);
      
      // Create SVG elements once for better performance
      arrowLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      arrowLine.setAttribute("stroke", "#c99cff");
      arrowLine.setAttribute("stroke-width", "2.5");
      arrowLine.setAttribute("stroke-dasharray", "400");
      arrowLine.setAttribute("stroke-dashoffset", "400");
      arrowLine.style.animation = "drawLine 1.3s ease-out forwards";
      
      arrowCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      arrowCircle.setAttribute("r", "5");
      arrowCircle.setAttribute("fill", "#c99cff");
      arrowCircle.style.transform = "scale(0)";
      arrowCircle.style.animation = "popCircle 0.6s ease-out forwards 1s";
      
      arrowSvg.appendChild(arrowLine);
      arrowSvg.appendChild(arrowCircle);
      
      // Set initial visibility
      arrowSvg.style.visibility = 'visible';
      
      // Initial arrow update
      updateArrow();
      
      // Set up resize observer
      const observer = new ResizeObserver(utils.throttle(safeUpdateArrow, 100));
      observer.observe(endEl);
      
      // Add window event listeners
      window.addEventListener('resize', utils.throttle(safeUpdateArrow, 100));
      window.addEventListener('load', safeUpdateArrow);
      
      // Make safeUpdateArrow available globally for other modules
      window.arrowAnimation = { safeUpdateArrow };
    };
    
    // Update arrow position and attributes
    const updateArrow = () => {
      if (!arrowLine || !arrowCircle || !startEl || !endEl) return;
      
      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();
      
      const startX = startRect.right;
      const startY = startRect.top + startRect.height / 2 + window.scrollY;
      const endX = endRect.left;
      const endY = endRect.top + endRect.height / 2 + window.scrollY;
      
      const controlX1 = startX + (endX - startX) * 0.3;
      const controlY1 = startY;
      const controlX2 = endX - (endX - startX) * 0.3;
      const controlY2 = endY;
      
      // Update line position
      arrowLine.setAttribute('x1', startX);
      arrowLine.setAttribute('y1', startY);
      arrowLine.setAttribute('x2', endX);
      arrowLine.setAttribute('y2', endY);
      
      // Update circle position
      arrowCircle.setAttribute('cx', endX);
      arrowCircle.setAttribute('cy', endY);
    };
    
    // Safe update only if elements are visible
    const safeUpdateArrow = () => {
      requestAnimationFrame(() => {
        if (!startEl || !endEl) return;
        
        const toggleBtn = utils.getElement('#toggle-btn');
        const toggleStyle = toggleBtn ? getComputedStyle(toggleBtn) : null;
        
        // Check if toggle button is visible (form is closed)
        if (toggleStyle && toggleStyle.display === 'none') {
          arrowSvg.style.visibility = 'hidden';
          return;
        }
        
        // Check if elements are visible
        const startVisible = startEl.offsetParent !== null;
        const endVisible = endEl.offsetParent !== null;
        
        if (startVisible && endVisible) {
          arrowSvg.style.visibility = 'visible';
          updateArrow();
        } else {
          arrowSvg.style.visibility = 'hidden';
        }
      });
    };
    
    return { init: initArrow };
  })();
  
  // ===== MOBILE NAVIGATION MODULE =====
  /**
   * Handles mobile navigation menu toggle
   */
  const mobileNavigation = (() => {
    const init = () => {
      // Check if we need to add mobile navigation
      const navbar = utils.getElement('.navbar');
      if (!navbar) return;
      
      // Create mobile menu toggle button if it doesn't exist
      let mobileMenuToggle = utils.getElement('.mobile-menu-toggle');
      const navLinks = utils.getElement('.nav-links');
      
      if (!mobileMenuToggle && navLinks) {
        // Create mobile toggle button
        mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'nav-links');
        mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');
        mobileMenuToggle.innerHTML = `
          <span class="sr-only">Menu</span>
          <span class="hamburger"></span>
        `;
        
        // Insert it into the navbar
        const logo = utils.getElement('.nav-logo');
        navbar.insertBefore(mobileMenuToggle, logo.nextSibling);
        
        // Add event listener
        utils.addEvent(mobileMenuToggle, 'click', () => {
          const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
          mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
          navLinks.classList.toggle('show');
        });
      }
    };
    
    return { init };
  })();
  
  // ===== PROJECTS MODULE =====
  /**
   * Handles project-related functionality
   */
  const projectsModule = (() => {
    const init = () => {
      // Get relevant elements
      const projectIframe = utils.getElement('.project-iframe');
      if (!projectIframe) return;
      
      // Add loading attribute for better performance
      projectIframe.setAttribute('loading', 'lazy');
      
      // Fix missing attributes
      if (!projectIframe.getAttribute('title')) {
        projectIframe.setAttribute('title', 'Project Preview');
      }
    };
    
    return { init };
  })();
  
  // ===== ACCESSIBILITY MODULE =====
  /**
   * Improves website accessibility
   */
  const accessibilityModule = (() => {
    const init = () => {
      // Add skip link if it doesn't exist
      if (!utils.getElement('.skip-to-content')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
      
      // Add role and id to main if needed
      const main = utils.getElement('main');
      if (main) {
        if (!main.id) main.id = 'main';
        if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
      }
      
      // Add proper alt text to images that are missing it
      const images = utils.getAllElements('img:not([alt])');
      images.forEach(img => {
        // Try to determine alt text from parent or context
        let altText = '';
        const parent = img.parentElement;
        
        if (parent.tagName === 'A') {
          altText = parent.textContent.trim() || parent.getAttribute('aria-label') || 'Link image';
        } else if (img.src.includes('logo')) {
          altText = 'Gestalt Studio Logo';
        } else {
          // Default to empty alt for decorative images
          altText = '';
        }
        
        img.setAttribute('alt', altText);
      });
    };
    
    return { init };
  })();
  
  // ===== INITIALIZE ALL MODULES =====
  contactForm.init();
  arrowAnimation.init();
  mobileNavigation.init();
  projectsModule.init();
  accessibilityModule.init();
  
  // Log initialization for debugging
  console.log('Gestalt Portfolio initialized successfully');
});
