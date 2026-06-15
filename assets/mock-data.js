/*
 * MOCK DATA TAP TRUNG - du lieu GIA / AN DANH.
 *
 * QUY TAC:
 *  - KHONG goi API that (khong fetch/axios/XHR). Day la mockup tinh.
 *  - KHONG dung ten that, ma khach hang that, doanh thu that. Chi gia tri vi du.
 *  - Key field giu dung ten DTO ben CRM de dev Flutter map de dang.
 */
window.MockData = {
  // ----- Bo loc / context (mo phong sidebar + panel phai) -----
  group: "SALE",
  factory: "FM HUONG CANH",
  warehouse: "KHO HUONG CANH",
  dateFrom: "2026-05-31",
  dateTo: "2026-06-30",
  customerCodes: ["2000000001", "2000000002", "2000000003", "2000000004"],
  salesmen: [
    { fullName: "Nguyen Van A", code: "10100001", role: "Admin", orderCount: 1, checked: true },
  ],

  // ----- Menu trai (nhom Giao dich dang mo) -----
  menu: [
    { label: "Quan ly du lieu", icon: "db", color: "bg-sky-500", open: false, children: [] },
    {
      label: "Giao dich", icon: "swap", color: "bg-brand-500", open: true,
      children: [
        "2. Quan ly don hang",
        "3. Quan ly khach hang",
        "4. Tao don hang",
        "5. Quan ly hoat dong doi qua",
        "9. AI forecast",
        "10. Sales Forecast Thang",
        "12. Review Salesforecast V2",
      ],
    },
    { label: "Danh gia khach hang", icon: "star", color: "bg-amber-500", open: false, children: [] },
    { label: "Bao cao", icon: "chart", color: "bg-indigo-500", open: false, children: [] },
    { label: "Tai lieu huong dan", icon: "doc", color: "bg-rose-500", open: false, children: [] },
  ],

  // ----- Tab trang thai don hang (so = badge) -----
  orderTabs: [
    { key: "chua_dat",     label: "Chua dat hang",   badge: 0 },
    { key: "cho_xac_nhan", label: "Cho xac nhan",    badge: 1 },
    { key: "da_xac_nhan",  label: "Da xac nhan",     badge: 0 },
    { key: "dang_nhan",    label: "Dang nhan hang",  badge: 0 },
    { key: "da_nhan",      label: "Da nhan hang",    badge: 0 },
    { key: "da_huy",       label: "Da huy",          badge: 0 },
    { key: "tat_ca",       label: "Tat ca",          badge: 0 },
  ],

  // ----- Don hang theo tab (du lieu gia) -----
  // Cot: so_phieu_noibo, ten_khach_hang, thoi_gian_cap_nhat, ngay_lay_hang
  orders: {
    chua_dat: [
      { so_phieu_noibo: "NB-260601-001", ten_khach_hang: "Khach Hang Mau A", thoi_gian_cap_nhat: "2026-06-01 08:12", ngay_lay_hang: null },
      { so_phieu_noibo: "NB-260601-002", ten_khach_hang: "Khach Hang Mau B", thoi_gian_cap_nhat: "2026-06-01 09:30", ngay_lay_hang: null },
      { so_phieu_noibo: "NB-260602-003", ten_khach_hang: "Khach Hang Mau C", thoi_gian_cap_nhat: "2026-06-02 14:05", ngay_lay_hang: null },
    ],
    cho_xac_nhan: [
      { so_phieu_noibo: "NB-260603-010", ten_khach_hang: "Khach Hang Mau D", thoi_gian_cap_nhat: "2026-06-03 10:45", ngay_lay_hang: "2026-06-07" },
    ],
    da_xac_nhan: [
      { so_phieu_noibo: "NB-260604-021", ten_khach_hang: "Khach Hang Mau E", thoi_gian_cap_nhat: "2026-06-04 11:20", ngay_lay_hang: "2026-06-09" },
      { so_phieu_noibo: "NB-260604-022", ten_khach_hang: "Khach Hang Mau F", thoi_gian_cap_nhat: "2026-06-04 16:00", ngay_lay_hang: "2026-06-10" },
    ],
    dang_nhan: [
      { so_phieu_noibo: "NB-260605-030", ten_khach_hang: "Khach Hang Mau G", thoi_gian_cap_nhat: "2026-06-05 07:50", ngay_lay_hang: "2026-06-06" },
    ],
    da_nhan: [
      { so_phieu_noibo: "NB-260606-041", ten_khach_hang: "Khach Hang Mau H", thoi_gian_cap_nhat: "2026-06-06 13:10", ngay_lay_hang: "2026-06-06" },
    ],
    da_huy: [
      { so_phieu_noibo: "NB-260606-050", ten_khach_hang: "Khach Hang Mau I", thoi_gian_cap_nhat: "2026-06-06 15:42", ngay_lay_hang: null },
    ],
    get tat_ca() {
      return [].concat(this.chua_dat, this.cho_xac_nhan, this.da_xac_nhan, this.dang_nhan, this.da_nhan, this.da_huy);
    },
  },

  // ----- (giu lai) Du lieu man hinh order-placement cu -----
  orderPlacement: [
    { customer_code: "CUST-0001", so_code: "SO-2025-00012", order_date_creation: "2025-01-05", ordered_date: "2025-01-07", so_date: "2025-01-07", so_status_name: "Da lay hang",  _status: "success" },
    { customer_code: "CUST-0001", so_code: "SO-2025-00018", order_date_creation: "2025-01-09", ordered_date: "2025-01-11", so_date: null,         so_status_name: "Cho lay hang", _status: "warning" },
    { customer_code: "CUST-0002", so_code: "SO-2025-00021", order_date_creation: "2025-01-12", ordered_date: "2025-01-14", so_date: null,         so_status_name: "Da huy",       _status: "danger"  },
  ],
  orderQtyRevenueSummary: { OrderCount: 128, AccumulatedQuantity: 342.5, AccumulatedAmount: 4810 },
};
