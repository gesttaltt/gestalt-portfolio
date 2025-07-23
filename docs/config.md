# Configuration File for Gestalt Portfolio

This file contains configuration settings for the Gestalt Portfolio project. It serves as a central reference for maintaining consistent settings across the project.

## Project Information

```javascript
// config/project-info.js

export const projectInfo = {
  name: "Jonathan Verdun's Portfolio",
  author: "Jonathan Verdun",
  description: "Full-stack web developer specializing in modern web applications, responsive design, and API integrations.",
  version: "2.0.0",
  repository: "https://github.com/gesttaltt/gestalt-portfolio",
  homepage: "https://yourwebsite.com"
};
```

## Theme Configuration

```javascript
// config/theme.js

export const themeConfig = {
  // Color palette
  colors: {
    // Brand colors
    primary: {
      default: "#9261e7",
      light: "#c3a6f7",
      dark: "#6e42b8"
    },
    secondary: {
      default: "#26a69a",
      light: "#64d8cb",
      dark: "#00766c"
    },
    
    // Text colors
    text: {
      primary: "#333333",
      secondary: "#666666",
      light: "#f5f5f5",
      muted: "#888888"
    },
    
    // UI colors
    background: {
      light: "#ffffff",
      offWhite: "#f9f9f9",
      dark: "#121212",
      medium: "#1e1e1e"
    },
    
    // Status colors
    status: {
      success: "#4caf50",
      warning: "#ff9800",
      error: "#f44336",
      info: "#2196f3"
    }
  },
  
  // Typography
  fonts: {
    primary: "'Roboto', sans-serif",
    secondary: "'Dosis', sans-serif",
    accent: "'Bungee', sans-serif"
  },
  
  // Font sizes using a modular scale
  fontSizes: {
    xs: "0.75rem",     // 12px
    sm: "0.875rem",    // 14px
    base: "1rem",      // 16px
    lg: "1.25rem",     // 20px
    xl: "1.5rem",      // 24px
    "2xl": "2rem",     // 32px
    "3xl": "3rem"      // 48px
  },
  
  // Spacing scale
  spacing: {
    xs: "0.25rem",     // 4px
    sm: "0.5rem",      // 8px
    md: "1rem",        // 16px
    lg: "1.5rem",      // 24px
    xl: "2rem",        // 32px
    "2xl": "3rem",     // 48px
    "3xl": "4rem"      // 64px
  },
  
  // Border radius
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    full: "50%"
  },
  
  // Shadows
  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)"
  },
  
  // Transitions
  transitions: {
    fast: "0.2s ease",
    normal: "0.3s ease",
    slow: "0.5s ease"
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
};

// Helper functions for working with the theme
export const theme = {
  // Get a color value from the theme
  color: (path) => {
    const parts = path.split('.');
    let value = themeConfig.colors;
    
    for (const part of parts) {
      value = value[part];
      if (value === undefined) return null;
    }
    
    return value;
  },
  
  // Get a media query string for a breakpoint
  media: (breakpoint) => {
    return `@media (min-width: ${themeConfig.breakpoints[breakpoint]})`;
  }
};
```

## Project Structure

```javascript
// config/paths.js

export const paths = {
  root: "/",
  src: "/src",
  public: "/public",
  assets: "/src/assets",
  images: "/src/assets/images",
  icons: "/src/assets/icons",
  styles: "/src/styles",
  scripts: "/src/scripts",
  components: "/src/components",
  data: "/src/data",
  dist: "/dist"
};
```

## Project Features Configuration

```javascript
// config/features.js

export const features = {
  darkMode: true,
  analytics: {
    enabled: true,
    provider: "google", // "google" | "plausible" | "fathom"
    trackingId: "G-XXXXXXXXXX" // Replace with actual tracking ID
  },
  blog: {
    enabled: true,
    postsPerPage: 5
  },
  i18n: {
    enabled: false,
    defaultLanguage: "en",
    supportedLanguages: ["en", "es"]
  },
  animations: {
    enabled: true,
    reducedMotion: true // Respect user's reduced motion preference
  },
  contact: {
    formType: "custom", // "custom" | "google-forms" | "formspree"
    endpoint: "/api/contact", // For custom form endpoint
    googleFormsUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfTUweUSV6mcs8V90fb1t0k7eqBxqJM_YbFNrNGWCPe8A7fog/viewform" // Current Google Forms URL
  }
};
```

## Project Data Configuration

```javascript
// config/data.js

export const projectsData = [
  {
    id: 1,
    title: "Inventory and Customer Management Website",
    slug: "inventory-management",
    description: "A classic small to medium business solution, made with MERN stack aiming for a complete CRM future solution.",
    fullDescription: "This comprehensive inventory and customer management system was built using the MERN stack (MongoDB, Express.js, React, and Node.js). It provides businesses with tools to track inventory levels, manage customer relationships, process orders, and generate reports. The system features a responsive design, real-time updates, and user role management.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "JWT", "Mongoose"],
    image: "/assets/images/projects/inventory.webp",
    liveUrl: "https://gestock-orpin.vercel.app",
    githubUrl: "https://github.com/gesttaltt/gestock",
    featured: true,
    completionDate: "2023-06-15"
  },
  // Add more projects here
];

export const skillsData = {
  technical: [
    {
      category: "Front-End",
      skills: [
        { name: "HTML5", level: 95 },
        { name: "CSS3/SCSS", level: 90 },
        { name: "JavaScript", level: 90 },
        { name: "Vue.js", level: 85 },
        { name: "Responsive Design", level: 95 }
      ]
    },
    {
      category: "Back-End",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express", level: 75 },
        { name: "Python", level: 70 },
        { name: "RESTful APIs", level: 85 }
      ]
    },
    {
      category: "Database",
      skills: [
        { name: "MongoDB", level: 80 },
        { name: "SQL", level: 75 }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 90 },
        { name: "Webpack/Vite", level: 75 },
        { name: "Docker", level: 60 },
        { name: "CI/CD", level: 65 }
      ]
    }
  ]
};

export const timelineData = [
  {
    period: "2023 - Present",
    title: "Web Developer",
    organization: "Gestalt Studio",
    description: "Designing and developing modern web applications using Vue.js, Node.js, and MongoDB.",
    highlights: ["Created responsive web applications", "Implemented RESTful APIs", "Optimized performance"]
  },
  {
    period: "2021 - 2023",
    title: "ICT Professional",
    organization: "Telecommunications Company",
    description: "Worked as an ICT professional with a focus on networking and technical solutions.",
    highlights: ["Managed network infrastructure", "Implemented technical solutions", "Provided client support"]
  },
  // Add more timeline items as needed
];
```

## SEO Configuration

```javascript
// config/seo.js

export const seoConfig = {
  // Default SEO settings
  default: {
    title: "Jonathan Verdun | Web Developer Portfolio",
    description: "Portfolio of Jonathan Verdun, a full-stack web developer specializing in modern web applications, responsive design, and API integrations.",
    keywords: ["web developer", "jonathan verdun", "portfolio", "full-stack", "vue.js", "node.js", "responsive design"],
    image: "/assets/images/og-image.jpg",
    twitterCard: "summary_large_image",
    twitterUsername: "@yourtwitterhandle", // Replace with actual Twitter handle if available
    siteUrl: "https://yourwebsite.com"
  },
  
  // Page-specific SEO settings
  pages: {
    about: {
      title: "About Jonathan Verdun | Web Developer",
      description: "Learn about Jonathan Verdun's background, skills, and experience as a full-stack web developer.",
      keywords: ["about jonathan verdun", "web developer background", "developer skills", "tech stack"]
    },
    projects: {
      title: "Projects | Jonathan Verdun's Portfolio",
      description: "Explore Jonathan Verdun's web development projects including responsive websites, web applications, and API integrations.",
      keywords: ["web development projects", "responsive websites", "web applications", "portfolio projects"]
    },
    contact: {
      title: "Contact Jonathan Verdun | Web Developer",
      description: "Get in touch with Jonathan Verdun for web development projects, collaborations, or inquiries.",
      keywords: ["contact web developer", "hire jonathan verdun", "web development services", "project inquiry"]
    }
  }
};
```

## Build Configuration

```javascript
// vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  server: {
    open: true,
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@data': resolve(__dirname, 'src/data'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  plugins: []
});
```

## Future Implementation Ideas

Here are some future enhancements that can be implemented in the portfolio:

1. **Interactive 3D Elements**
   - Add WebGL/Three.js components for interactive background
   - Create 3D models of project previews

2. **Advanced Animation System**
   - Implement scroll-triggered animations
   - Add particle system for hero section
   - Create micro-interactions for UI elements

3. **Enhanced Blog Functionality**
   - Comment system integration
   - Newsletter subscription
   - Content categorization and tagging
   - Reading time estimation

4. **Project Showcase Improvements**
   - Interactive case studies
   - Before/after sliders for design projects
   - Video demonstrations
   - Testimonials from clients

5. **Progressive Web App Features**
   - Offline support
   - Push notifications
   - Home screen installation

6. **AI-Powered Features**
   - Chatbot assistant for visitors
   - Content recommendation system
   - Automated skill assessment visualization

7. **Advanced Analytics**
   - Custom event tracking
   - User journey visualization
   - Heatmap integration
   - A/B testing framework

8. **Expanded Internationalization**
   - Multi-language support
   - Region-specific content
   - Cultural adaptations

9. **Portfolio Management System**
   - Admin dashboard for content updates
   - Project management interface
   - Analytics dashboard

10. **Integration with Professional Networks**
    - GitHub contribution graph
    - LinkedIn profile synchronization
    - StackOverflow activity feed
