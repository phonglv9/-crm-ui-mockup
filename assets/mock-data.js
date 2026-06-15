/*
 * MOCK DATA TAP TRUNG - du lieu GIA / AN DANH.
 *
 * QUY TAC:
 *  - KHONG goi API that (khong fetch/axios/XHR). Day la mockup tinh.
 *  - KHONG dung ten that, ma khach hang that, doanh thu that. Chi gia tri vi du.
 *  - Key field giu dung ten DTO ben CRM de dev Flutter map de dang.
 *
 * Cach dung trong man hinh:
 *   <script src="../assets/mock-data.js"></script>
 *   const data = MockData.orderPlacement;
 */
window.MockData = {
  // Map tu List<OrderPlacementDTO> (GET /api/Share/GetOrderPlacement)
  orderPlacement: [
    { customer_code: "CUST-0001", so_code: "SO-2025-00012", order_date_creation: "2025-01-05", ordered_date: "2025-01-07", so_date: "2025-01-07", cancel_date: null,         so_status: "30", so_status_name: "Da lay hang",   _status: "success" },
    { customer_code: "CUST-0001", so_code: "SO-2025-00018", order_date_creation: "2025-01-09", ordered_date: "2025-01-11", so_date: null,         cancel_date: null,         so_status: "10", so_status_name: "Cho lay hang",  _status: "warning" },
    { customer_code: "CUST-0002", so_code: "SO-2025-00021", order_date_creation: "2025-01-12", ordered_date: "2025-01-14", so_date: null,         cancel_date: "2025-01-13", so_status: "99", so_status_name: "Da huy",        _status: "danger"  },
    { customer_code: "CUST-0002", so_code: "SO-2025-00027", order_date_creation: "2025-01-18", ordered_date: "2025-01-20", so_date: "2025-01-20", cancel_date: null,         so_status: "30", so_status_name: "Da lay hang",   _status: "success" },
  ],

  // Map tu OrderQtyRevenueDTO (GET /api/Share/GetOrderQtyRevenueSummary)
  orderQtyRevenueSummary: {
    OrderCount: 128,              // So don hang
    AccumulatedQuantity: 342.5,   // San luong (tan)
    AccumulatedAmount: 4810,      // So tien (trieu dong)
  },

  // Map tu danh sach khach hang (GET /api/Share/GetCustomers)
  customers: [
    { customerCode: "CUST-0001", fullName: "Khach Hang Mau A" },
    { customerCode: "CUST-0002", fullName: "Khach Hang Mau B" },
    { customerCode: "CUST-0003", fullName: "Khach Hang Mau C" },
  ],
};
