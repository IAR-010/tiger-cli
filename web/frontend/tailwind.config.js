/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#f4f4f5",
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'Orbitron', 'sans-serif'],
        shareTech: ['var(--font-share-tech)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

