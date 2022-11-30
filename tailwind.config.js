const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./ui/**/*.{ts,tsx}",
        "./content/**/*.{md,mdx}",
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        container: {
            center: true,
            padding: "1.5rem",
            screens: {
                lg: "1024px",
            },
        },
        extend: {
            fontFamily: {
                display: ["var(--font-satoshi)", "system-ui", "sans-serif"],
                default: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            colors: {
                ...colors,
                appbg: "rgb(0, 2, 18)",
                brand: {
                    50: "#f3f3f3",
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/forms"),
        require("tailwindcss-animate"),
    ],
}
