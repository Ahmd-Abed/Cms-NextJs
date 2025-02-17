import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rose: {
          900: "#79133e", // Override Tailwind's default rose-900
        },
        teal: {
          800: "#235D37", // Override Tailwind's default rose-900
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
