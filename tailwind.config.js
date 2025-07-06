module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // for App Router
        "./pages/**/*.{js,ts,jsx,tsx}", // optional if using Pages Router
        "./components/**/*.{js,ts,jsx,tsx}", // custom components
        "./src/**/*.{js,ts,jsx,tsx}", // in case styles or layouts are under src/
    ],

    theme: {
        extend: {
            sans: ["Poppins", "sans-serif"],
            gridTemplateColumns: {
                "70/30": "70% 28%",
            },
        },
    },
    plugins: [],
};
