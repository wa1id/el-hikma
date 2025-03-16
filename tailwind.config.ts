import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F5B1CC",
          DEFAULT: "#EF86B0",
          dark: "#D45A8A",
        },
        secondary: {
          light: "#5A4FB3",
          DEFAULT: "#33277d",
          dark: "#221A54",
        },
        beige: {
          light: "#FFFDF0",
          DEFAULT: "#FCF9DE",
          dark: "#EAE6C0",
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
