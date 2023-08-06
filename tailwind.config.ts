/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "380px",
        "w-400": "400px",
        "w-590": "590px",
        "w-768": "768px",
        "w-1170": "1170px",
        "w-1400": "1400px",
        "w-1496": "1496px",
      },
      flex: {
        full: "0 0 100%",
      },
      fontFamily: {
        BalooTamma: ["BalooTamma", "sans-serif"],
        Baloo: ["Baloo", "cursive"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        peach: "var(--peach)",
        greenGradientFrom: "var(--green-gradient-from)",
        greenGradientTo: "var(--green-gradient-to)",
        primaryGreen: "var(--primary-green)",
        secondaryGreen: "var(--secondary-green)",
        greenNavbarText: "var(--green-navbar-text)",
        greenNavbarHover: "var(--green-navbar-hover)",
        greenButtonBackground: "var(--green-button-background)",
        greenButtonText: "var(--green-button-text)",
        locationText: "var(--location-text)",
        primaryButtonBorder: "var(--primary-button-border)",
        secondaryButtonBorder: "var(--secondary-button-border)",
        appointmentButtonBorder: "var(--appointment-button-border)",
        offWhiteText: "var(--off-white-text)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
