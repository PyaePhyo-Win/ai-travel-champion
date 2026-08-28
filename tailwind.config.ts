const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#6C63FF",
        "purple-light": "#8B7CF8",
        "grad-purple": "linear-gradient(164deg, #6C63FF 0%, #8B7CF8 100%)",
        "grad-purple-soft":
          "linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(139,124,248,0.05) 100%)",
        teal: "#00C9A7",
        "teal-dark": "#00B894",
        "teal-bg": "#0F2D32",
        "bg-base": "#0A0B14",
        "bg-card": "#0D0D18",
        "bg-nav": "rgba(18,19,31,0.85)",
        border: "#23243A",
        "text-primary": "#FFFFFF",
        "text-muted": "#6B6B90",
        "text-purple": "#A78BFA",
        "stroke-purple": "#9747FF",
        "stroke-purple-dim": "#8A38F5",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        pill: "9999px",
        button: "16px",
        input: "12px",
        tag: "8px",
        card: "16px",
      },
      boxShadow: {
        "purple-glow": "0 0 26px rgba(108, 99, 255, 0.5)",
        card: "0 10px 24px rgba(0, 0, 0, 0.5)",
        logo: "0 6px 14px rgba(0, 0, 0, 0.6)",
      },
      backdropBlur: {
        nav: "40px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 26px rgba(108, 99, 255, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(108, 99, 255, 0.8)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
