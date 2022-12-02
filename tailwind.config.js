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
                appbg: "#14141b",
                palette: {
                    100: "#232530",
                    150: "#1e1e26",
                    200: "#22222e",
                    300: "#2b2b3c",
                    400: "#1c1d25",
                    500: "#161620",
                    600: "#14141b",
                },
                brandtext: {
                    200: "#eaebfc",
                    300: "#c8c9d9",
                    400: "#c8c9d9",
                    500: "#eaebfc",
                    600: "#737388",
                },
                default: "#eaebfc",
                placeholder: "#3c3e58",
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
