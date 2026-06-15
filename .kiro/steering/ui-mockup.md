# CRM UI Mockup - Steering

Day la project **mockup giao dien** (design reference) cho he thong CRM Japfa.
Muc tieu: dua vao code Backend (DTO/endpoint) de ve san giao dien dep bang HTML/JS thuan,
lam tai lieu tham chieu cho dev **Flutter** lam theo. Khong phai production app.

## Nguyen tac TOI QUAN TRONG

1. **KHONG BAO GIO goi API that.** Tuyet doi khong dung `fetch`, `XMLHttpRequest`, axios, WebSocket
   hay bat ky ket noi mang nao toi backend CRM. Day la mockup tinh, tranh lo du lieu that.
2. **Moi du lieu deu la mock tinh**, dat trong `assets/mock-data.js`. Du lieu phai la **gia/an danh**:
   khong dung ten that, ma khach hang that, so dien thoai, doanh thu that... Dung gia tri vi du.
3. Khi them man hinh moi: doc DTO/controller ben CRM de lay **ten field + kieu du lieu**, roi tao
   mock tuong ung trong `mock-data.js`. Chi lay schema, khong copy du lieu that.

## Tech stack

- HTML/CSS/JS thuan, **khong build step**, khong Node/npm.
- **Tailwind Play CDN** (`https://cdn.tailwindcss.com`) - chi dung cho mockup, khong dung production.
- Font **Inter** qua Google Fonts.
- Design tokens dung chung o `assets/theme.js` (nap TRUOC the tailwind CDN).

## Cau truc thu muc

```
crm-ui-mockup/
├── index.html             # Design system gallery (mau, typography, component)
├── assets/
│   ├── theme.js           # Design tokens (brand colors, font, radius, shadow)
│   └── mock-data.js       # TAT CA du lieu mock tap trung o day
├── screens/
│   └── *.html             # Moi man hinh 1 file, dat ten theo nghiep vu
└── .kiro/steering/        # File nay
```

## Design tokens (assets/theme.js)

- Mau chinh: `brand.500` (#1fa257 - xanh la Japfa). Thang do `brand.50..900`.
- Mau trung tinh: `ink.100..900`. Trang thai: `success`, `warning`, `danger`.
- Font: `font-sans` = Inter. Bo goc card: `rounded-card` (16px). Do bong: `shadow-card`.
- Doi token o `theme.js` -> tat ca trang tu cap nhat. Khong hardcode ma mau trong HTML.

## Component conventions (de dev Flutter map 1-1)

- **Button**: `px-4 py-2 rounded-lg font-medium` + variant (primary `bg-brand-500 text-white`,
  secondary `bg-brand-50 text-brand-700`, outline `border border-ink-300`).
- **Card**: `bg-white rounded-card shadow-card p-5`.
- **Input**: `border border-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200`.
- **Badge/Status**: `px-2.5 py-1 rounded-full text-xs font-medium` + mau theo trang thai
  (`bg-success/10 text-success`, ...).
- **Table**: header `bg-ink-100 text-ink-500`, row `divide-y divide-ink-100 hover:bg-ink-100/60`.

## Quy uoc map DTO -> UI

- Field DTO giu nguyen ten (vd `so_code`, `order_date_creation`) lam key trong mock-data.
- Ngay: hien thi dang `yyyy-MM-dd` (BE dung culture de-CH, nhan ca ISO; xem WebApiConfig ben CRM).
- Field null -> hien `&mdash;` mau `text-ink-300`.

## Deploy (Cloudflare Pages)

- Static site, khong can build. Build command: de trong. Output directory: `/` (root).
- Moi commit len nhanh chinh se tu deploy.

## Khi duoc yeu cau "dung man hinh X tu controller Y"

1. Doc controller + DTO ben CRM, liet ke endpoint + field.
2. Them mock tuong ung vao `assets/mock-data.js` (du lieu gia, an danh).
3. Tao `screens/<ten>.html` dung component co san, nap `theme.js` + `mock-data.js`.
4. Tuyet doi khong them code goi API.
