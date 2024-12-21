/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '7/10': '70%',
        '3/10': '30%',
      },
      keyframes: {
        // ... existing animations ...
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        // ... existing animations ...
        pulse: 'pulse 2s ease-in-out infinite',
        slideInFromRight: 'slideInFromRight 0.8s ease-out',
        fadeIn: 'fadeIn 0.5s ease-in',
        scaleUp: 'scaleUp 0.5s ease-out',
        slideInFromBottom: 'slideInFromBottom 0.8s ease-out'
      },
    },
  },
  // theme: {
  //   extend: {},
  // },
  plugins: [],
}
// tailwind.config.js


