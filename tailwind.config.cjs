/** @type {import('tailwindcss').Config} */

module.exports = {
    safelist: [{ pattern: /grid-cols-\d+/, variants: ['sm', 'md', 'lg', 'xl'] }],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#FC7B28',
                body: '#344054',
            },
            dropShadow: {
                secondary: ['0px 1px 2px rgba(16, 24, 40, 0.05)', '0px 0px 0px 2px #F2F4F7'],
            },
        },
    },
    plugins: [],
};
