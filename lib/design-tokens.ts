export const DESIGN_TOKENS = {
  colors: {
    purple: "#6C63FF",
    purpleLight: "#8B7CF8",
    gradPurple: "linear-gradient(164deg, #6C63FF 0%, #8B7CF8 100%)",
    teal: "#00C9A7",
    tealDark: "#00B894",
    tealBg: "#0F2D32",
    bgBase: "#0A0B14",
    bgCard: "#0D0D18",
    bgNav: "rgba(18,19,31,0.85)",
    border: "#23243A",
    textPrimary: "#FFFFFF",
    textMuted: "#6B6B90",
    textPurple: "#A78BFA",
    strokePurple: "#9747FF",
    strokePurpleDim: "#8A38F5",
  },
  radius: {
    pill: "9999px",
    button: "16px",
    input: "12px",
    tag: "8px",
    card: "16px",
  },
  shadow: {
    purpleGlow: "0 0 26px rgba(108, 99, 255, 0.5)",
    card: "0 10px 24px rgba(0, 0, 0, 0.5)",
    logo: "0 6px 14px rgba(0, 0, 0, 0.6)",
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
