/**
 * @fileoverview PostCSS Configuration
 * 
 * PostCSS is a tool for transforming CSS with JavaScript plugins.
 * This configuration enables Tailwind CSS processing and autoprefixer
 * for cross-browser CSS compatibility.
 */

export default {
  plugins: {
    // Tailwind CSS processes utility classes and generates the final CSS
    tailwindcss: {},
    
    // Autoprefixer adds vendor prefixes for cross-browser support
    // Example: transforms 'display: flex' to include '-webkit-flex' for Safari
    autoprefixer: {},
  },
};
