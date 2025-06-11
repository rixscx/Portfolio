import type { Config } from "tailwindcss"

const config: Config = {

  darkMode: ["class"],

  content: [

    "./pages/**/*.{js,ts,jsx,tsx,mdx}",

    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./app/**/*.{js,ts,jsx,tsx,mdx}",

    "*.{js,ts,jsx,tsx,mdx}",

  ],

  theme: {

    container: {

      center: true,

      padding: "2rem",

      screens: {

        "2xl": "1400px",

      },

    },

    extend: {

      colors: {

        border: "hsl(var(--border))",

        input: "hsl(var(--input))",

        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",

        foreground: "hsl(var(--foreground))",

        primary: {

          DEFAULT: "hsl(var(--primary))",

          foreground: "hsl(var(--primary-foreground))",

        },

        secondary: {

          DEFAULT: "hsl(var(--secondary))",

          foreground: "hsl(var(--secondary-foreground))",

        },

        destructive: {

          DEFAULT: "hsl(var(--destructive))",

          foreground: "hsl(var(--destructive-foreground))",

        },

        muted: {

          DEFAULT: "hsl(var(--muted))",

          foreground: "hsl(var(--muted-foreground))",

        },

        accent: {

          DEFAULT: "hsl(var(--accent))",

          foreground: "hsl(var(--accent-foreground))",

        },

        popover: {

          DEFAULT: "hsl(var(--popover))",

          foreground: "hsl(var(--popover-foreground))",

        },

        card: {

          DEFAULT: "hsl(var(--card))",

          foreground: "hsl(var(--card-foreground))",

        },

        // Dark theme colors

        cyan: {

          50: "#ecfeff",

          100: "#cffafe",

          200: "#a5f3fc",

          300: "#67e8f9",

          400: "#22d3ee",

          500: "#06b6d4",

          600: "#0891b2",

          700: "#0e7490",

          800: "#155e75",

          900: "#164e63",

        },

        magenta: {

          50: "#fdf2f8",

          100: "#fce7f3",

          200: "#fbcfe8",

          300: "#f9a8d4",

          400: "#f472b6",

          500: "#ec4899",

          600: "#db2777",

          700: "#be185d",

          800: "#9d174d",

          900: "#831843",

        },

      },

      borderRadius: {

        lg: "var(--radius)",

        md: "calc(var(--radius) - 2px)",

        sm: "calc(var(--radius) - 4px)",

      },

      keyframes: {

        "accordion-down": {

          from: { height: "0" },

          to: { height: "var(--radix-accordion-content-height)" },

        },

        "accordion-up": {

          from: { height: "var(--radix-accordion-content-height)" },

          to: { height: "0" },

        },

        "fade-in": {

          "0%": { opacity: "0" },

          "100%": { opacity: "1" },

        },

        "fade-in-up": {

          "0%": {

            opacity: "0",

            transform: "translateY(30px)",

          },

          "100%": {

            opacity: "1",

            transform: "translateY(0)",

          },

        },

        "scale-in": {

          "0%": {

            opacity: "0",

            transform: "scale(0.9)",

          },

          "100%": {

            opacity: "1",

            transform: "scale(1)",

          },

        },

        "glow-pulse": {

          "0%, 100%": {

            boxShadow: "0 0 5px currentColor",

          },

          "50%": {

            boxShadow: "0 0 20px currentColor, 0 0 30px currentColor",

          },

        },

        holographic: {

          "0%, 100%": {

            backgroundPosition: "0% 0%",

          },

          "50%": {

            backgroundPosition: "100% 100%",

          },

        },

        "neon-glow": {

          "0%, 100%": {

            textShadow: "0 0 5px currentColor",

          },

          "50%": {

            textShadow: "0 0 10px currentColor, 0 0 20px currentColor",

          },

        },

        float: {

          "0%, 100%": {

            transform: "translateY(0px)",

          },

          "50%": {

            transform: "translateY(-10px)",

          },

        },

      },

      animation: {

        "accordion-down": "accordion-down 0.2s ease-out",

        "accordion-up": "accordion-up 0.2s ease-out",

        "fade-in": "fade-in 0.5s ease-out",

        "fade-in-up": "fade-in-up 0.6s ease-out",

        "scale-in": "scale-in 0.3s ease-out",

        "glow-pulse": "glow-pulse 2s ease-in-out infinite",

        holographic: "holographic 3s ease-in-out infinite",

        "neon-glow": "neon-glow 2s ease-in-out infinite",

        float: "float 3s ease-in-out infinite",

      },

      fontFamily: {

        sans: ["Inter", "system-ui", "sans-serif"],

        mono: ["JetBrains Mono", "monospace"],

      },

      spacing: {

        "18": "4.5rem",

        "88": "22rem",

        "128": "32rem",

      },

      maxWidth: {

        "8xl": "88rem",

        "9xl": "96rem",

      },

      typography: {

        DEFAULT: {

          css: {

            maxWidth: "none",

            color: "hsl(var(--foreground))",

            a: {

              color: "hsl(var(--primary))",

              "&:hover": {

                color: "hsl(var(--primary))",

              },

            },

          },

        },

      },

      boxShadow: {

        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",

        "glow-magenta": "0 0 20px rgba(236, 72, 153, 0.3)",

        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.3)",

        "neon-cyan": "0 0 5px #06b6d4, 0 0 20px #06b6d4, 0 0 35px #06b6d4",

        "neon-magenta": "0 0 5px #ec4899, 0 0 20px #ec4899, 0 0 35px #ec4899",

      },

    },

  },

  plugins: [require("tailwindcss-animate")],

}

export default config
