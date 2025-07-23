# Code Fixes & Improvements

This document contains detailed analysis and fixes for bugs, bad implementations, and errors found in the connection between index.html, script.js, and styles.css files.

## HTML Issues

### 1. Missing Alt Text for Profile Picture
```html
<div class="profile-picture">
    <a href="https://www.linkedin.com/in/jonathan-verdun/">
        <img src="assets/images/pics/1.jpeg"> <!-- Missing alt text -->
    </a>
</div>
```
**Fix:** Add a descriptive alt text for accessibility.
```html
<img src="assets/images/pics/1.jpeg" alt="Jonathan Verdun profile photo">
```

### 2. Typo in Hero Description
```html
<p>Welcome to my porfolio! Whether you're launching a product...</p>
```
**Fix:** Correct the spelling of "portfolio".
```html
<p>Welcome to my portfolio! Whether you're launching a product...</p>
```

### 3. Typo in Project Description
```html
<p>A classic small to medium bussiness solution, made with MERN stack...</p>
```
**Fix:** Correct the spelling of "business".
```html
<p>A classic small to medium business solution, made with MERN stack...</p>
```

### 4. Redundant iframe Attributes
```html
<iframe 
    src="https://docs.google.com/forms/d/e/1FAIpQLSfTUweUSV6mcs8V90fb1t0k7eqBxqJM_YbFNrNGWCPe8A7fog/viewform?embedded=true"
    width="640"
    height="605"
    style="width: 100%; height: 100%; border: none;"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    title="Google Form"
    class="google-form"
>
```
**Fix:** Remove deprecated attributes and use CSS for styling instead.
```html
<iframe 
    src="https://docs.google.com/forms/d/e/1FAIpQLSfTUweUSV6mcs8V90fb1t0k7eqBxqJM_YbFNrNGWCPe8A7fog/viewform?embedded=true"
    title="Google Form"
    class="google-form"
>
```

### 5. Accessibility Issue in Navigation
The navigation lacks proper aria attributes and a toggle button for mobile.

**Fix:** Add proper accessibility attributes and mobile navigation button.
```html
<nav class="navbar" role="navigation" aria-label="Main navigation">
    <a href="/" class="nav-logo" aria-label="Gestalt Studio Home">
        <img src="assets/images/logo.svg" alt="Gestalt Studio Logo">
    </a>

    <button class="mobile-menu-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle menu">
        <span class="sr-only">Menu</span>
        <span class="hamburger"></span>
    </button>

    <ul id="nav-links" class="nav-links">
        <li><a href="#about" aria-current="page">About</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
```

### 6. Semantic Structure Issue
The main content sections could use more semantic HTML elements.

**Fix:** Use more semantic HTML structure.
```html
<section id="projects" class="projects-section">
    <h2 class="section-title">Projects</h2>
    <div class="projects">
        <!-- Content here -->
    </div>
</section>
```

## JavaScript Issues

### 1. Missing Elements in Form Logic
The script tries to access form elements that don't exist in the HTML:
```javascript
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('char-count');
const status = document.getElementById('form-status');
```

**Fix:** Since you're using Google Forms in an iframe, either remove these references or add these elements if you plan to replace Google Forms with a custom form.

### 2. Unnecessary Code in Live Demo Button Logic
```javascript
liveDemoBtn?.addEventListener('click', () => {
    const targetSrc = "https://gestock-orpin.vercel.app";
    if (projectIframe.src !== targetSrc) {
      projectIframe.src = targetSrc;
    }
});
```

**Fix:** This code is unnecessary since the button is an anchor tag with href="#projects" which already handles the navigation. Remove this JavaScript or use it only for enhanced functionality.

### 3. Typo in Comment
```javascript
// ⏱️ Debounced safe update (solo si elementos están visibles)
```

**Fix:** Standardize the comments to be in one language.

### 4. Animation Performance Issue
```javascript
const updateArrow = () => {
    // Current implementation recreates SVG content on every update
    arrowSvg.innerHTML = `...`;
};
```

**Fix:** Use a more efficient approach by creating SVG elements once and updating their attributes:
```javascript
let arrowLine, arrowCircle;

const initArrowSvg = () => {
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
};

const updateArrow = () => {
    // Update attributes instead of recreating elements
    const start = startEl.getBoundingClientRect();
    const end = endEl.getBoundingClientRect();
    
    arrowLine.setAttribute("x1", start.left + start.width / 2);
    arrowLine.setAttribute("y1", start.top + start.height / 2 + window.scrollY);
    arrowLine.setAttribute("x2", end.left + end.width / 2);
    arrowLine.setAttribute("y2", end.top + end.height / 2 + window.scrollY);
    
    arrowCircle.setAttribute("cx", end.left + end.width / 2);
    arrowCircle.setAttribute("cy", end.top + end.height / 2 + window.scrollY);
};
```

### 5. Error in Form Submission Code
```javascript
await fetch(form.action, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
});7  // Typo: Extra "7" character
```

**Fix:** Remove the extra "7" character.

### 6. Missing Form Initialization
The form is expected to be initially hidden, but this isn't explicitly set in the HTML or JavaScript.

**Fix:** Add explicit initialization for the form display state:
```javascript
if (form) {
    form.style.display = 'none';
}
```

## CSS Issues

### 1. Media Query Structure Issues
The media queries are not well-structured, with some rules being defined twice:

```css
@media (max-width: 480px) {
    /* Styles for small screens */
}

/* These project styles should be inside the media query */
.projects {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* ... */
}
```

**Fix:** Properly structure the media queries and avoid repeating selector definitions.

### 2. Inconsistent Units
There's a mix of rem, px, vh, vw, and % units without a clear system:

```css
.hero-title {
    font-size: 3.4rem;
    padding: 1.6rem;
}

.project-iframe-container {
    width: 35vw;
    height: 84vh;
}
```

**Fix:** Standardize the units using CSS variables:
```css
:root {
    --spacing-xs: 0.4rem;
    --spacing-sm: 0.8rem;
    --spacing-md: 1.6rem;
    --spacing-lg: 2.4rem;
    --spacing-xl: 3.2rem;
    
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 2rem;
    --font-size-3xl: 3rem;
}

.hero-title {
    font-size: var(--font-size-3xl);
    padding: var(--spacing-md);
}
```

### 3. Duplicated Animation Code
The Pulse animation is duplicated in multiple places:

```css
.hero-btn:hover {
    animation: Pulse 1.7s infinite ease-in-out;
}

.project-iframe-container {
    animation: Pulse 1.2s infinite ease-in-out;
}

#contact-form {
    animation: Pulse 1.4s infinite ease-in-out;
}
```

**Fix:** Create utility classes for animations:
```css
.pulse-animation {
    animation: Pulse var(--animation-duration, 1.5s) infinite ease-in-out;
}

.hero-btn:hover {
    --animation-duration: 1.7s;
    @extend .pulse-animation;
}
```

### 4. Z-index Management
Z-index values are hardcoded without a systematic approach:

```css
.navbar {
    z-index: 1000;
}

#arrow-line {
    z-index: 1000;
}
```

**Fix:** Create a z-index management system:
```css
:root {
    --z-base: 1;
    --z-arrow: 100;
    --z-dropdown: 500;
    --z-fixed: 900;
    --z-modal: 1000;
}

.navbar {
    z-index: var(--z-fixed);
}

#arrow-line {
    z-index: var(--z-arrow);
}
```

### 5. Mobile Navigation Issues
The mobile navigation has styling issues:

```css
@media (max-width: 768px) {
    .navbar {
        height: 2.3rem;
    }

    .nav-links {
        flex-direction: row;
        gap: 0;
        margin: 0rem 1rem 0rem;
    }

    .nav-links ul, li, a {
        padding: 0;
        gap: 0;
        margin: 0;
        font-size: 0.2rem;  /* Too small to be readable */
    }
}
```

**Fix:** Improve mobile navigation styling:
```css
@media (max-width: 768px) {
    .navbar {
        height: auto;
        padding: 0.5rem;
    }
    
    .nav-links {
        flex-direction: row;
        gap: 1rem;
        margin: 0.5rem;
    }
    
    .nav-links a {
        font-size: 0.9rem;  /* More readable */
        padding: 0.5rem;
    }
}
```

### 6. CSS Reset Limitations
The current CSS reset is minimal:

```css
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
```

**Fix:** Use a more comprehensive reset:
```css
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
}

body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
}

input, button, textarea, select {
    font: inherit;
}
```

## Integration Issues

### 1. Form Visibility Toggle
The script relies on toggling form visibility, but the CSS has a fixed display style:

```javascript
const toggleFormVisibility = () => {
    const isHidden = form.style.display === 'none' || form.style.display === '';
    form.style.display = isHidden ? 'grid' : 'none';
    toggle.style.display = isHidden ? 'none' : 'block';
};
```

```css
#contact-form {
    display: none;
}
```

**Fix:** Use CSS classes instead of inline styles:
```css
#contact-form {
    display: none;
}

#contact-form.visible {
    display: grid;
}
```

```javascript
const toggleFormVisibility = () => {
    form.classList.toggle('visible');
    toggle.style.display = form.classList.contains('visible') ? 'none' : 'block';
};
```

### 2. Arrow Animation Initialization
The arrow animation code doesn't check if elements exist before trying to use them:

```javascript
const updateArrow = () => {
    if (!arrowSvg || !startEl || !endEl) return;
    // ...
};
```

**Fix:** Ensure proper element existence check at initialization:
```javascript
if (arrowSvg && startEl && endEl) {
    // Initialize observers and event listeners
    const observer = new ResizeObserver(safeUpdateArrow);
    observer.observe(endEl);
    
    window.addEventListener('resize', safeUpdateArrow);
    window.addEventListener('load', safeUpdateArrow);
}
```

### 3. Missing Mobile Navigation Logic
There's CSS for mobile navigation but no JavaScript to toggle it:

**Fix:** Add mobile navigation toggle functionality:
```javascript
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');
    });
}
```

### 4. Broken Links
The LinkedIn link doesn't match between HTML instances:
- In profile picture: `https://www.linkedin.com/in/jonathan-verdun/`
- In footer: `https://www.linkedin.com/in/jonathan-verdun-557044315/`

**Fix:** Use consistent LinkedIn URLs.

## Performance Improvements

### 1. Optimize Font Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Dosis:wght@200..800&family=Lobster&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
```

**Fix:** Optimize by loading only the fonts and weights you actually use:
```html
<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400&family=Roboto:wght@100;200;300;400;500&display=swap" rel="stylesheet">
```

### 2. Add Resource Hints
**Fix:** Add preconnect and dns-prefetch for external resources:
```html
<link rel="preconnect" href="https://gestock-orpin.vercel.app" crossorigin>
<link rel="dns-prefetch" href="https://gestock-orpin.vercel.app">
<link rel="preconnect" href="https://docs.google.com" crossorigin>
<link rel="dns-prefetch" href="https://docs.google.com">
```

### 3. Add Loading Attribute to Iframes
**Fix:** Use loading="lazy" for iframes that are below the fold:
```html
<iframe 
    src="https://docs.google.com/forms/d/e/1FAIpQLSfTUweUSV6mcs8V90fb1t0k7eqBxqJM_YbFNrNGWCPe8A7fog/viewform?embedded=true"
    title="Google Form"
    class="google-form"
    loading="lazy"
>
```

### 4. Optimize Event Listeners
**Fix:** Use event delegation where appropriate:
```javascript
// Instead of multiple listeners on similar elements
document.querySelector('.about-grid').addEventListener('click', (e) => {
    if (e.target.closest('.about-item')) {
        // Handle click on any about item
    }
});
```

## Accessibility Improvements

### 1. Add Skip-to-content Link
**Fix:** Add a skip link for keyboard users:
```html
<a href="#main" class="skip-to-content">Skip to main content</a>

<main id="main">
    <!-- Main content -->
</main>
```

```css
.skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    padding: 8px;
    background-color: #ba83fc;
    color: white;
    z-index: 1001;
    transition: top 0.3s;
}

.skip-to-content:focus {
    top: 0;
}
```

### 2. Improve Keyboard Navigation
**Fix:** Ensure all interactive elements can be accessed and operated with a keyboard:
```css
:focus-visible {
    outline: 3px solid #ba83fc;
    outline-offset: 3px;
}
```

### 3. Add ARIA Attributes for Dynamic Content
**Fix:** Add appropriate ARIA attributes to indicate state changes:
```javascript
toggle?.addEventListener('click', () => {
    toggleFormVisibility();
    toggle.setAttribute('aria-expanded', form.style.display !== 'none');
});
```

## Next Steps for Implementation

1. Fix the identified HTML issues
2. Implement the CSS system improvements 
3. Refactor the JavaScript code for better organization and error handling
4. Test all interactive components on multiple devices
5. Verify accessibility with automated tools and keyboard navigation
6. Run performance audits with Lighthouse to measure improvements
