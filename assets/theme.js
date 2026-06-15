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
        // Brand teal (giong giao dien CRM that). Dev Flutter map sang ColorScheme.
        brand: {
          50: "#eefcfb",
          100: "#d3f6f4",
          200: "#a8ece9",
          300: "#6fdcd8",
          400: "#34c3bf",
          500: "#14a8a4", // primary
          600: "#0c8a87",
          700: "#0e6e6c",
          800: "#115857",
          900: "#114848",
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
