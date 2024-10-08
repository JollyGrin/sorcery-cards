import recipes from "@/components/ui/recipes";
import { defineConfig } from "@pandacss/dev";

const semanticTokens = {
  // Example: Set primary color to another value
  colors: {
    primary: {
      DEFAULT: {
        value: {
          // Light mode
          base: "{colors.grayscale.900}",
          // Dark mode
          _dark: "{colors.grayscale.50}",
        },
      },
    },
  },
};

export default defineConfig({
  // Required: Add the preset to your config.
  presets: ["@shadow-panda/preset"],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Use React
  jsxFramework: "react",

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: { semanticTokens, recipes },
  },

  outdir: "styled-system",
});
