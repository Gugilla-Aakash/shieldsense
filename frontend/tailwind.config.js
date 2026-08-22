/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#05050A", // Deep space black
        "purple-primary": "#8B5CF6",
        "purple-bright": "#C084FC",
        "purple-glow": "rgba(139, 92, 246, 0.15)",
        "text-secondary": "#A1A1AA",
        "text-muted": "#71717A",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-delayed": "fadeIn 1.2s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [],
};
