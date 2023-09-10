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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hasl(var(--background))",
        foreground: "hasl(var(--foreground))",
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
          DEFAULT: "var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        peach: "var(--peach)",
        peachServicesText: "var(--peach-services-text)",
        greenGradientFrom: "var(--green-gradient-from)",
        greenGradientTo: "var(--green-gradient-to)",
        whiteGradientFrom: "var(--white-gradient-from)",
        whiteGradientTo: "var(--white-gradient-to)",
        primaryGreen: "var(--primary-green)",
        secondaryGreen: "var(--secondary-green)",
        greenServicesText: "var(--green-services-text)",
        greenNavbarText: "var(--green-navbar-text)",
        greenNavbarHover: "var(--green-navbar-hover)",
        greenButtonBackground: "var(--green-button-background)",
        greenButtonText: "var(--green-button-text)",
        greenContactFormText: "var(--green-contact-form-text)",
        locationText: "var(--location-text)",
        primaryButtonBorder: "var(--primary-button-border)",
        secondaryButtonBorder: "var(--secondary-button-border)",
        appointmentButtonBorder: "var(--appointment-button-border)",
        contactButtonBorder: "var(--contact-button-border)",
        contactButtonBackground: "var(--contact-button-background)",
        offWhiteText: "var(--off-white-text)",
        lightSectionText: "var(--light-section-text)",
        darkSectionText: "var(--dark-section-text)",
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
