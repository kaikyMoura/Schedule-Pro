import type { Config } from "tailwindcss";

export default {
    important: true,
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                componentColor: "var(--component-color)",
                textColor: "var(--text-color)",
            },
        },
    },
    plugins: [],
} satisfies Config;