/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Tu App.tsx usa clases dinámicas como `bg-${color}-500`.
  // Tailwind no puede detectar esto estáticamente. Para asegurar que todas las
  // variantes de color que usas estén disponibles, las añadimos a la "safelist".
  safelist: [
    {
      pattern: /(bg|text|border)-(blue|green|amber|purple|indigo|cyan|red|pink|black)-.+/,
    },
    'font-bold', 'text-xl', 'text-2xl', 'tracking-tighter' // Para los logos de texto
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}