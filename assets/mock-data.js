/*
 * MOCK DATA TẬP TRUNG - dữ liệu GIẢ / ẨN DANH.
 *
 * QUY TẮC:
 *  - KHÔNG gọi API thật (không fetch/axios/XHR). Đây là mockup tĩnh.
 *  - KHÔNG dùng tên thật, mã khách hàng thật, doanh thu thật. Chỉ giá trị ví dụ.
 *  - Key field giữ đúng tên DTO bên CRM để dev Flutter map dễ dàng.
 */
window.MockData = {
  // ----- Bộ lọc / context -----
  group: "SALE",
  factory: "FM HƯƠNG CANH",
  warehouse: "KHO HƯƠNG CANH",
  dateFrom: "2026-05-31",
  dateTo: "2026-06-30",
  customerCodes: ["2000000001", "2000000002", "2000000003", "2000000004"],
  salesmen: [
    { fullName: "Nguyễn Văn A", code: "10100001", role: "Admin", orderCount: 1, checked: true },
  ],

  // ----- Menu trái (nhóm Giao dịch đang mở). 'route' = hash route -----
  menu: [
    { label: "Quản lý dữ liệu", color: "bg-sky-500", open: false, children: [
      { label: "Quản lý sản phẩm", route: "#/products" },
      { label: "Quản lý nhà máy",  route: "#/plants" },
    ] },
    {
      label: "Giao dịch", color: "bg-teal-500", open: true,
      children: [
        { label: "2. Quản lý đơn hàng",            route: "#/orders" },
        { label: "3. Quản lý khách hàng",          route: "#/customers" },
        { label: "4. Tạo đơn hàng",                route: "#/create-order" },
        { label: "5. Quản lý hoạt động đổi quà",   route: "#/rewards" },
        { label: "9. AI forecast",                 route: "#/ai-forecast" },
        { label: "10. Sales Forecast Tháng",       route: "#/forecast-month" },
        { label: "11. Forecast nội bộ (ITN)",      route: "#/forecast-itn" },
        { label: "12. Review Salesforecast V2",    route: "#/review-sfc" },
      ],
    },
    { label: "Đánh giá khách hàng", color: "bg-amber-500", open: false, children: [
      { label: "Chấm điểm khách hàng", route: "#/grading" },
    ] },
    { label: "Báo cáo", color: "bg-indigo-500", open: false, children: [
      { label: "Báo cáo sản lượng", route: "#/report-volume" },
    ] },
    { label: "Tài liệu hướng dẫn", color: "bg-rose-500", open: false, children: [
      { label: "Tài liệu", route: "#/docs" },
    ] },
  ],

  // ----- Tab trạng thái đơn hàng (số = badge) -----
  orderTabs: [
    { key: "chua_dat",     label: "Chưa đặt hàng",   badge: 0 },
    { key: "cho_xac_nhan", label: "Chờ xác nhận",    badge: 1 },
    { key: "da_xac_nhan",  label: "Đã xác nhận",     badge: 0 },
    { key: "dang_nhan",    label: "Đang nhận hàng",  badge: 0 },
    { key: "da_nhan",      label: "Đã nhận hàng",    badge: 0 },
    { key: "da_huy",       label: "Đã hủy",          badge: 0 },
    { key: "tat_ca",       label: "Tất cả",          badge: 0 },
  ],

  // ----- Đơn hàng theo tab (dữ liệu giả) -----
  // Cột: so_phieu_noibo, ten_khach_hang, thoi_gian_cap_nhat, ngay_lay_hang
  orders: {
    chua_dat: [
      { so_phieu_noibo: "NB-260601-001", ten_khach_hang: "Khách Hàng Mẫu A", thoi_gian_cap_nhat: "01.06.2026 08:12", ngay_lay_hang: null },
      { so_phieu_noibo: "NB-260601-002", ten_khach_hang: "Khách Hàng Mẫu B", thoi_gian_cap_nhat: "01.06.2026 09:30", ngay_lay_hang: null },
      { so_phieu_noibo: "NB-260602-003", ten_khach_hang: "Khách Hàng Mẫu C", thoi_gian_cap_nhat: "02.06.2026 14:05", ngay_lay_hang: null },
    ],
    cho_xac_nhan: [
      { so_phieu_noibo: "NB-260603-010", ten_khach_hang: "Khách Hàng Mẫu D", thoi_gian_cap_nhat: "03.06.2026 10:45", ngay_lay_hang: "07.06.2026" },
    ],
    da_xac_nhan: [
      { so_phieu_noibo: "NB-260604-021", ten_khach_hang: "Khách Hàng Mẫu E", thoi_gian_cap_nhat: "04.06.2026 11:20", ngay_lay_hang: "09.06.2026" },
      { so_phieu_noibo: "NB-260604-022", ten_khach_hang: "Khách Hàng Mẫu F", thoi_gian_cap_nhat: "04.06.2026 16:00", ngay_lay_hang: "10.06.2026" },
    ],
    dang_nhan: [
      { so_phieu_noibo: "NB-260605-030", ten_khach_hang: "Khách Hàng Mẫu G", thoi_gian_cap_nhat: "05.06.2026 07:50", ngay_lay_hang: "06.06.2026" },
    ],
    da_nhan: [
      { so_phieu_noibo: "NB-260606-041", ten_khach_hang: "Khách Hàng Mẫu H", thoi_gian_cap_nhat: "06.06.2026 13:10", ngay_lay_hang: "06.06.2026" },
    ],
    da_huy: [
      { so_phieu_noibo: "NB-260606-050", ten_khach_hang: "Khách Hàng Mẫu I", thoi_gian_cap_nhat: "06.06.2026 15:42", ngay_lay_hang: null },
    ],
    get tat_ca() {
      return [].concat(this.chua_dat, this.cho_xac_nhan, this.da_xac_nhan, this.dang_nhan, this.da_nhan, this.da_huy);
    },
  },

  // ----- Forecast noi bo (SALES_FORECAST_ITN) -----
  // Map 1-1 voi SfcItnDataDTO: { importMonth, importYear, plants[], months[] }
  //   months[]:        { monthOffset, forecastMonth, forecastYear, productGroups[] }
  //   productGroups[]: { productGroupDesc, skus[] }
  //   skus[]:          { id, plant, materialCode, materialName, forecastMonth, forecastYear, forecast }
  // (totalForecast cua month/group duoc tinh lai khi render de tranh lech so lieu)
  itn: {
    importMonth: 6,
    importYear: 2026,
    plants: ["1001", "1002"],
    plantOptions: [
      { code: "1001", name: "FM Hương Canh" },
      { code: "1002", name: "FM Bình Định" },
    ],
    months: [
      {
        monthOffset: 1, forecastMonth: 7, forecastYear: 2026,
        productGroups: [
          { productGroupDesc: "Heo", skus: [
            { id: 1,  plant: "1001", materialCode: "000000000010010001", materialName: "Cám heo con tập ăn 10kg", forecastMonth: 7, forecastYear: 2026, forecast: 1200 },
            { id: 2,  plant: "1001", materialCode: "000000000010010002", materialName: "Cám heo thịt 25kg",        forecastMonth: 7, forecastYear: 2026, forecast: 3400 },
            { id: 3,  plant: "1002", materialCode: "000000000010010002", materialName: "Cám heo thịt 25kg",        forecastMonth: 7, forecastYear: 2026, forecast: 2800 },
          ] },
          { productGroupDesc: "Gà", skus: [
            { id: 4,  plant: "1001", materialCode: "000000000020010001", materialName: "Cám gà thịt 25kg",         forecastMonth: 7, forecastYear: 2026, forecast: 5100 },
            { id: 5,  plant: "1002", materialCode: "000000000020010002", materialName: "Cám gà đẻ 25kg",           forecastMonth: 7, forecastYear: 2026, forecast: 1750 },
          ] },
        ],
      },
      {
        monthOffset: 2, forecastMonth: 8, forecastYear: 2026,
        productGroups: [
          { productGroupDesc: "Heo", skus: [
            { id: 6,  plant: "1001", materialCode: "000000000010010001", materialName: "Cám heo con tập ăn 10kg", forecastMonth: 8, forecastYear: 2026, forecast: 1300 },
            { id: 7,  plant: "1001", materialCode: "000000000010010002", materialName: "Cám heo thịt 25kg",        forecastMonth: 8, forecastYear: 2026, forecast: 3550 },
            { id: 8,  plant: "1002", materialCode: "000000000010010002", materialName: "Cám heo thịt 25kg",        forecastMonth: 8, forecastYear: 2026, forecast: 2950 },
          ] },
          { productGroupDesc: "Gà", skus: [
            { id: 9,  plant: "1001", materialCode: "000000000020010001", materialName: "Cám gà thịt 25kg",         forecastMonth: 8, forecastYear: 2026, forecast: 4900 },
            { id: 10, plant: "1002", materialCode: "000000000020010002", materialName: "Cám gà đẻ 25kg",           forecastMonth: 8, forecastYear: 2026, forecast: 1820 },
          ] },
        ],
      },
      {
        monthOffset: 3, forecastMonth: 9, forecastYear: 2026,
        productGroups: [
          { productGroupDesc: "Heo", skus: [
            { id: 11, plant: "1001", materialCode: "000000000010010001", materialName: "Cám heo con tập ăn 10kg", forecastMonth: 9, forecastYear: 2026, forecast: 1250 },
            { id: 12, plant: "1002", materialCode: "000000000010010002", materialName: "Cám heo thịt 25kg",        forecastMonth: 9, forecastYear: 2026, forecast: 3000 },
          ] },
          { productGroupDesc: "Gà", skus: [
            { id: 13, plant: "1001", materialCode: "000000000020010001", materialName: "Cám gà thịt 25kg",         forecastMonth: 9, forecastYear: 2026, forecast: 5300 },
            { id: 14, plant: "1002", materialCode: "000000000020010002", materialName: "Cám gà đẻ 25kg",           forecastMonth: 9, forecastYear: 2026, forecast: 1900 },
          ] },
          { productGroupDesc: "(Khác)", skus: [
            { id: 15, plant: "1001", materialCode: "000000000090010001", materialName: "Phụ phẩm chưa phân nhóm",  forecastMonth: 9, forecastYear: 2026, forecast: 420 },
          ] },
        ],
      },
    ],
  },
};
