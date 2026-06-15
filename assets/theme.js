/*
 * Design tokens dung chung cho toan bo mockup.
 * Nhung file nay TRUOC the <script src="tailwindcss"> de cau hinh Tailwind Play CDN.
 * Doi token o day -> tat ca trang tu dong cap nhat.
 */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Brand Japfa (xanh la). Dev Flutter map sang ColorScheme.
        brand: {
          50: "#eefbf2",
          100: "#d6f5df",
          200: "#afe9c2",
          300: "#7bd79e",
          400: "#45bd74",
          500: "#1fa257", // primary
          600: "#138246",
          700: "#11673a",
          800: "#115231",
          900: "#0f432a",
        },
        ink: {
          // Mau chu / nen trung tinh
          900: "#0f172a",
          700: "#334155",
          500: "#64748b",
          300: "#cbd5e1",
          100: "#f1f5f9",
        },
        danger: "#dc2626",
        warning: "#d97706",
        success: "#16a34a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,23,42,.08), 0 8px 24px rgba(15,23,42,.06)",
      },
    },
  },
};
