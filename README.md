# CRM UI Mockup

Mockup giao diện (design reference) cho hệ thống CRM Japfa. Dựa trên schema của Backend
(DTO/endpoint) để dựng sẵn giao diện đẹp bằng **HTML/JS thuần + Tailwind**, làm tài liệu
tham chiếu cho dev **Flutter** làm theo.

> Đây **không phải** production app. Toàn bộ dữ liệu là **mock tĩnh, ẩn danh** trong
> `assets/mock-data.js`. **Không gọi API thật** để tránh lộ dữ liệu.

## Chạy thử (local)

Không cần build, không cần Node. Mở thẳng file bằng trình duyệt:

- `index.html` — Design system (màu, typography, component)
- `screens/order-placement.html` — Màn hình mẫu

Cần internet để tải Tailwind Play CDN + Google Fonts.

## Cấu trúc

```
crm-ui-mockup/
├── index.html            # Design system gallery
├── assets/
│   ├── theme.js          # Design tokens (brand colors, font, radius, shadow)
│   └── mock-data.js      # Toàn bộ dữ liệu mock (ẩn danh)
├── screens/
│   └── order-placement.html
└── .kiro/steering/       # Quy ước design cho Kiro
```

## Deploy lên Cloudflare Pages

1. Push project này lên một Git repo riêng (GitHub/GitLab).
2. Trên Cloudflare Pages: **Create a project** → kết nối repo.
3. Cấu hình build:
   - **Framework preset:** None
   - **Build command:** (để trống)
   - **Build output directory:** `/`
4. Mỗi commit lên nhánh chính sẽ tự động deploy.

## Lưu ý production (tuỳ chọn)

Tailwind Play CDN chỉ phù hợp cho mockup. Nếu sau này muốn bản deploy gọn/nhanh hơn,
có thể build CSS tĩnh bằng Tailwind CLI và bỏ thẻ CDN — nhưng khi đó sẽ cần một bước build.
