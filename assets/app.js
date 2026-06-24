/*
 * App SPA: hash router + template dùng chung.
 * KHÔNG gọi API - mọi dữ liệu lấy từ window.MockData.
 *
 * Thêm màn hình: thêm 1 entry vào `routes` + 1 child vào `menu` (mock-data.js).
 *   "#/path": { title, filter?, noHeader?, render(), after?() }
 */
(function () {
  "use strict";
  var M = window.MockData;

  var ui = {
    chevron: function (open) {
      return '<svg class="h-4 w-4 text-ink-300 transition ' + (open ? "rotate-180" : "") +
        '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
    },
    date: function (d) { return d ? d : '<span class="text-ink-300">&mdash;</span>'; },
    pageHeader: function (title, subtitle) {
      return '<div class="px-5 py-4 border-b border-ink-300 shrink-0">' +
        '<h1 class="text-lg font-semibold">' + title + '</h1>' +
        (subtitle ? '<p class="text-sm text-ink-500 mt-0.5">' + subtitle + '</p>' : '') + '</div>';
    },
    placeholder: function (title) {
      return ui.pageHeader(title) +
        '<div class="flex-1 grid place-items-center text-center text-ink-500">' +
        '<div><div class="mx-auto mb-3 h-12 w-12 rounded-xl bg-brand-50 grid place-items-center text-brand-500">' +
        '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg></div>' +
        '<p class="font-medium text-ink-700">' + title + '</p>' +
        '<p class="text-sm text-ink-500 mt-1">Màn hình mockup &mdash; đang chờ thiết kế chi tiết.</p></div></div>';
    },
  };

  /* ---------- Trang: Quản lý đơn hàng ---------- */
  var ordersState = { tab: "chua_dat" };

  function renderOrders() {
    var tabs = M.orderTabs.map(function (t) {
      var active = t.key === ordersState.tab;
      var badge = t.badge > 0
        ? '<span class="ml-1 inline-grid place-items-center h-4 min-w-4 px-1 rounded-full bg-danger text-white text-[10px] font-semibold">' + t.badge + '</span>'
        : "";
      return '<button data-tab="' + t.key + '" class="tab-btn relative px-3 py-2.5 text-[13px] whitespace-nowrap border-b-2 -mb-px ' +
        (active ? "border-brand-500 text-brand-600 font-semibold" : "border-transparent text-ink-700 hover:text-ink-900") +
        '">' + t.label + badge + "</button>";
    }).join("");

    return '' +
      '<div id="orderTabs" class="flex items-center gap-1 px-3 border-b border-ink-300 overflow-x-auto shrink-0">' + tabs + '</div>' +
      '<div class="flex-1 overflow-auto">' +
        '<table class="w-full text-[13px]">' +
          '<thead class="bg-ink-100 text-ink-500 text-left sticky top-0">' +
            '<tr>' +
              '<th class="px-4 py-2 font-medium border-b border-ink-300">Số phiếu(Nội bộ)</th>' +
              '<th class="px-4 py-2 font-medium border-b border-ink-300">Tên khách hàng</th>' +
              '<th class="px-4 py-2 font-medium border-b border-ink-300">Thời gian cập nhật cuối &uarr;</th>' +
              '<th class="px-4 py-2 font-medium border-b border-ink-300">Ngày lấy hàng</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody id="orderRows" class="divide-y divide-ink-100"></tbody>' +
        '</table>' +
        '<div id="orderEmpty" class="hidden py-20 text-center text-ink-300 text-sm">Không có dữ liệu</div>' +
      '</div>';
  }

  function paintOrderRows() {
    var data = M.orders[ordersState.tab] || [];
    var tbody = document.getElementById("orderRows");
    var empty = document.getElementById("orderEmpty");
    if (!tbody) return;
    if (!data.length) { tbody.innerHTML = ""; empty.classList.remove("hidden"); return; }
    empty.classList.add("hidden");
    tbody.innerHTML = data.map(function (r) {
      return '<tr class="hover:bg-brand-50/50 cursor-pointer">' +
        '<td class="px-4 py-2.5 font-medium text-brand-600">' + r.so_phieu_noibo + "</td>" +
        '<td class="px-4 py-2.5">' + r.ten_khach_hang + "</td>" +
        '<td class="px-4 py-2.5 text-ink-700">' + ui.date(r.thoi_gian_cap_nhat) + "</td>" +
        '<td class="px-4 py-2.5">' + ui.date(r.ngay_lay_hang) + "</td>" +
      "</tr>";
    }).join("");
  }

  function afterOrders() {
    paintOrderRows();
    var bar = document.getElementById("orderTabs");
    if (bar) bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".tab-btn");
      if (!btn) return;
      ordersState.tab = btn.getAttribute("data-tab");
      document.getElementById("view").innerHTML = renderOrders();
      afterOrders();
    });
  }

  /* ---------- Panel phải: Bộ lọc ---------- */
  function renderFilterPanel() {
    return '' +
      '<div class="px-4 py-3 border-b border-ink-100 flex items-center justify-between shrink-0">' +
        '<span class="font-semibold text-sm">Bộ lọc tìm kiếm</span>' +
        '<button class="flex items-center gap-1 text-brand-600 text-sm font-medium hover:text-brand-700">' +
          '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>Áp dụng</button>' +
      '</div>' +
      '<div class="p-4 space-y-5 overflow-y-auto text-sm">' +
        // Kho (dropdown gạch chân)
        '<button class="w-full flex items-center justify-between border-b border-ink-300 pb-2 font-semibold text-ink-900">' +
          M.warehouse + ui.chevron(false) + '</button>' +
        // Khoảng ngày (gạch chân)
        '<div class="grid grid-cols-2 gap-3">' +
          '<div class="border-b border-ink-300 pb-1"><label class="block text-[11px] text-ink-500 mb-0.5">Từ ngày</label>' +
            '<input type="date" value="' + M.dateFrom + '" class="w-full text-[13px] bg-transparent outline-none"/></div>' +
          '<div class="border-b border-ink-300 pb-1"><label class="block text-[11px] text-ink-500 mb-0.5">Đến ngày</label>' +
            '<input type="date" value="' + M.dateTo + '" class="w-full text-[13px] bg-transparent outline-none"/></div>' +
        '</div>' +
        // Danh sách khách hàng
        '<div><label class="block text-[11px] text-ink-500 mb-1">Danh sách khách hàng</label>' +
          '<div class="text-xs text-ink-700 break-words leading-relaxed">' + M.customerCodes.join(",") + '</div></div>' +
        // Danh sách salesmans
        '<div><label class="block text-[11px] text-ink-500 mb-2">Danh sách salesmans</label><div class="space-y-2">' +
          M.salesmen.map(function (s) {
            return '<label class="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-100 cursor-pointer">' +
              '<input type="checkbox" ' + (s.checked ? "checked" : "") + ' class="h-4 w-4 accent-brand-500"/>' +
              '<span class="flex-1"><span class="block font-medium text-ink-900">' + s.fullName + '</span>' +
              '<span class="block text-xs text-ink-500">' + s.code + '</span>' +
              '<span class="block text-xs text-ink-500">' + s.role + '</span></span>' +
              '<span class="text-ink-500 text-sm">' + s.orderCount + '</span></label>';
          }).join("") +
        '</div></div>' +
      '</div>';
  }

  /* ---------- Trang: Forecast nội bộ (ITN) ---------- */
  var itnState = { tab: 1 }; // monthOffset dang xem (1 = M+1)
  var num = function (n) { return (n == null ? 0 : n).toLocaleString("vi-VN"); };

  function itnMonth() {
    var d = M.itn.months.filter(function (m) { return m.monthOffset === itnState.tab; })[0];
    return d || M.itn.months[0];
  }
  function itnMonthTotal(m) {
    return m.productGroups.reduce(function (s, g) {
      return s + g.skus.reduce(function (ss, k) { return ss + (k.forecast || 0); }, 0);
    }, 0);
  }

  function renderItn() {
    var it = M.itn;
    var monthLabel = "Tháng " + it.importMonth + "/" + it.importYear;

    // Toolbar: thang/nam import, nha may, nut import
    var toolbar =
      '<div class="px-5 py-3 border-b border-ink-300 shrink-0 flex flex-wrap items-end gap-3">' +
        '<div><label class="block text-[11px] text-ink-500 mb-0.5">Tháng import</label>' +
          '<select class="border border-ink-300 rounded-lg px-2 py-1.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none">' +
            Array.apply(null, { length: 12 }).map(function (_, i) {
              return '<option ' + (i + 1 === it.importMonth ? "selected" : "") + '>' + (i + 1) + "</option>";
            }).join("") +
          "</select></div>" +
        '<div><label class="block text-[11px] text-ink-500 mb-0.5">Năm import</label>' +
          '<input type="number" value="' + it.importYear + '" class="w-24 border border-ink-300 rounded-lg px-2 py-1.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"/></div>' +
        '<div class="min-w-48"><label class="block text-[11px] text-ink-500 mb-0.5">Nhà máy (plants)</label>' +
          '<div class="flex flex-wrap gap-1">' +
            it.plantOptions.map(function (p) {
              var on = it.plants.indexOf(p.code) > -1;
              return '<span class="px-2 py-1 rounded-full text-xs font-medium ' +
                (on ? "bg-brand-50 text-brand-700 border border-brand-200" : "bg-ink-100 text-ink-500 border border-transparent") +
                '">' + p.code + " · " + p.name + "</span>";
            }).join("") +
          "</div></div>" +
        '<div class="ml-auto flex items-center gap-2">' +
          '<button class="px-4 py-2 rounded-lg font-medium border border-ink-300 text-ink-700 hover:bg-ink-100 text-sm">Xem dữ liệu</button>' +
          '<button id="btnItnImport" class="px-4 py-2 rounded-lg font-medium bg-brand-500 text-white hover:bg-brand-600 text-sm flex items-center gap-1.5">' +
            '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>' +
            "Import Excel</button>" +
        "</div>" +
      "</div>";

    // Tab thang M+1 / M+2 / M+3
    var tabs = it.months.map(function (m) {
      var active = m.monthOffset === itnState.tab;
      return '<button data-itntab="' + m.monthOffset + '" class="itn-tab relative px-3 py-2.5 text-[13px] whitespace-nowrap border-b-2 -mb-px ' +
        (active ? "border-brand-500 text-brand-600 font-semibold" : "border-transparent text-ink-700 hover:text-ink-900") +
        '">M+' + m.monthOffset + " (" + m.forecastMonth + "/" + m.forecastYear + ")" +
        '<span class="ml-1.5 text-ink-500 font-normal">' + num(itnMonthTotal(m)) + "</span></button>";
    }).join("");

    return toolbar +
      '<div class="px-5 py-2.5 text-sm text-ink-500 shrink-0">Dữ liệu forecast nội bộ &mdash; kỳ import <span class="font-medium text-ink-700">' + monthLabel + "</span></div>" +
      '<div id="itnTabs" class="flex items-center gap-1 px-3 border-b border-ink-300 overflow-x-auto shrink-0">' + tabs + "</div>" +
      '<div class="flex-1 overflow-auto">' +
        '<table class="w-full text-[13px]">' +
          '<thead class="bg-ink-100 text-ink-500 text-left sticky top-0 z-10">' +
            "<tr>" +
              '<th class="px-4 py-2 font-medium border-b border-ink-300">Nhà máy</th>' +
              '<th class="px-4 py-2 font-medium border-b border-ink-300">Mã sản phẩm</th>' +
              '<th class="px-4 py-2 font-medium border-b border-ink-300">Tên sản phẩm</th>' +
              '<th class="px-4 py-2 font-medium border-b border-ink-300 text-right">Forecast (FC)</th>' +
            "</tr>" +
          "</thead>" +
          '<tbody id="itnRows" class="divide-y divide-ink-100"></tbody>' +
        "</table>" +
        '<div id="itnEmpty" class="hidden py-20 text-center text-ink-300 text-sm">Không có dữ liệu</div>' +
      "</div>" +
      itnImportModal();
  }

  function paintItnRows() {
    var m = itnMonth();
    var tbody = document.getElementById("itnRows");
    var empty = document.getElementById("itnEmpty");
    if (!tbody) return;
    if (!m.productGroups.length) { tbody.innerHTML = ""; empty.classList.remove("hidden"); return; }
    empty.classList.add("hidden");

    var html = m.productGroups.map(function (g) {
      var groupTotal = g.skus.reduce(function (s, k) { return s + (k.forecast || 0); }, 0);
      var head =
        '<tr class="bg-brand-50/60"><td colspan="3" class="px-4 py-2 font-semibold text-brand-700">' + g.productGroupDesc + "</td>" +
        '<td class="px-4 py-2 text-right font-semibold text-brand-700">' + num(groupTotal) + "</td></tr>";
      var rows = g.skus.map(function (k) {
        return '<tr class="hover:bg-ink-100/60">' +
          '<td class="px-4 py-2.5">' + k.plant + "</td>" +
          '<td class="px-4 py-2.5 font-medium text-brand-600">' + k.materialCode + "</td>" +
          '<td class="px-4 py-2.5">' + k.materialName + "</td>" +
          '<td class="px-4 py-2.5 text-right tabular-nums">' + num(k.forecast) + "</td>" +
        "</tr>";
      }).join("");
      return head + rows;
    }).join("");

    // Hang tong cuoi bang
    html += '<tr class="bg-ink-100 font-semibold"><td colspan="3" class="px-4 py-2.5 text-right">Tổng tháng</td>' +
      '<td class="px-4 py-2.5 text-right tabular-nums">' + num(itnMonthTotal(m)) + "</td></tr>";

    tbody.innerHTML = html;
  }

  function itnImportModal() {
    return '' +
      '<div id="itnModal" class="hidden fixed inset-0 z-40 bg-ink-900/40 grid place-items-center p-4">' +
        '<div class="bg-white rounded-card shadow-card w-full max-w-lg overflow-hidden">' +
          '<div class="px-5 py-4 border-b border-ink-100 flex items-center justify-between">' +
            '<h3 class="font-semibold">Import forecast nội bộ (Excel)</h3>' +
            '<button id="itnModalClose" class="h-8 w-8 grid place-items-center rounded hover:bg-ink-100 text-ink-500">' +
              '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
          "</div>" +
          '<div class="p-5 space-y-4 text-sm">' +
            '<div class="grid grid-cols-3 gap-3">' +
              '<div><label class="block text-[11px] text-ink-500 mb-0.5">Tháng import</label>' +
                '<input value="' + M.itn.importMonth + '" class="w-full border border-ink-300 rounded-lg px-2 py-1.5"/></div>' +
              '<div><label class="block text-[11px] text-ink-500 mb-0.5">Năm import</label>' +
                '<input value="' + M.itn.importYear + '" class="w-full border border-ink-300 rounded-lg px-2 py-1.5"/></div>' +
              '<div><label class="block text-[11px] text-ink-500 mb-0.5">Plants</label>' +
                '<input value="' + M.itn.plants.join(",") + '" class="w-full border border-ink-300 rounded-lg px-2 py-1.5"/></div>' +
            "</div>" +
            '<label class="block border-2 border-dashed border-ink-300 rounded-xl py-8 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50/40">' +
              '<svg class="h-8 w-8 mx-auto mb-2 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>' +
              '<div class="font-medium text-ink-700">Chọn hoặc kéo thả file Excel (.xlsx)</div>' +
              '<div class="text-xs text-ink-500 mt-1">file_forecast_itn.xlsx</div>' +
              '<input type="file" accept=".xlsx,.xls" class="hidden"/></label>' +
            '<div class="bg-ink-100 rounded-lg p-3 text-xs text-ink-700">' +
              '<div class="font-medium mb-1">Định dạng cột yêu cầu:</div>' +
              '<code class="text-ink-700">PLANT | CODE OF PRODUCTS | NAME OF PRODUCTS | FC (M+1) | FC (M+2) | FC (M+3)</code>' +
            "</div>" +
          "</div>" +
          '<div class="px-5 py-4 border-t border-ink-100 flex justify-end gap-2">' +
            '<button id="itnModalCancel" class="px-4 py-2 rounded-lg font-medium border border-ink-300 text-ink-700 hover:bg-ink-100 text-sm">Hủy</button>' +
            '<button id="itnModalSubmit" class="px-4 py-2 rounded-lg font-medium bg-brand-500 text-white hover:bg-brand-600 text-sm">Import</button>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function itnToast(msg) {
    var t = document.createElement("div");
    t.className = "fixed bottom-5 right-5 z-50 bg-success text-white px-4 py-2.5 rounded-lg shadow-card text-sm flex items-center gap-2";
    t.innerHTML = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>' + msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }

  function afterItn() {
    paintItnRows();

    var tabBar = document.getElementById("itnTabs");
    if (tabBar) tabBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".itn-tab");
      if (!btn) return;
      itnState.tab = parseInt(btn.getAttribute("data-itntab"), 10);
      document.getElementById("view").innerHTML = renderItn();
      afterItn();
    });

    var modal = document.getElementById("itnModal");
    var open = function () { if (modal) modal.classList.remove("hidden"); };
    var close = function () { if (modal) modal.classList.add("hidden"); };
    var byId = function (id) { return document.getElementById(id); };
    if (byId("btnItnImport")) byId("btnItnImport").addEventListener("click", open);
    if (byId("itnModalClose")) byId("itnModalClose").addEventListener("click", close);
    if (byId("itnModalCancel")) byId("itnModalCancel").addEventListener("click", close);
    if (byId("itnModalSubmit")) byId("itnModalSubmit").addEventListener("click", function () {
      close();
      itnToast("Import thành công (mockup) — không gọi API thật.");
    });
    if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
  }

  /* ---------- Bảng định tuyến ---------- */
  var ph = function (t) { return function () { return ui.placeholder(t); }; };
  var routes = {
    "#/orders":         { title: "Quản lý đơn hàng", filter: true, noHeader: true, render: renderOrders, after: afterOrders },
    "#/customers":      { title: "Quản lý khách hàng", render: ph("Quản lý khách hàng") },
    "#/create-order":   { title: "Tạo đơn hàng", render: ph("Tạo đơn hàng") },
    "#/rewards":        { title: "Quản lý hoạt động đổi quà", render: ph("Quản lý hoạt động đổi quà") },
    "#/ai-forecast":    { title: "AI forecast", render: ph("AI forecast") },
    "#/forecast-month": { title: "Sales Forecast Tháng", render: ph("Sales Forecast Tháng") },
    "#/forecast-itn":   { title: "Forecast nội bộ (ITN)", noHeader: true, render: renderItn, after: afterItn },
    "#/review-sfc":     { title: "Review Salesforecast V2", render: ph("Review Salesforecast V2") },
    "#/products":       { title: "Quản lý sản phẩm", render: ph("Quản lý sản phẩm") },
    "#/plants":         { title: "Quản lý nhà máy", render: ph("Quản lý nhà máy") },
    "#/grading":        { title: "Chấm điểm khách hàng", render: ph("Chấm điểm khách hàng") },
    "#/report-volume":  { title: "Báo cáo sản lượng", render: ph("Báo cáo sản lượng") },
    "#/docs":           { title: "Tài liệu hướng dẫn", render: ph("Tài liệu hướng dẫn") },
  };
  var DEFAULT_ROUTE = "#/orders";

  /* ---------- Sidebar menu ---------- */
  function renderMenu(currentRoute) {
    var html = M.menu.map(function (m) {
      var children = m.open && m.children.length
        ? '<div class="mt-0.5 mb-1 space-y-0.5">' + m.children.map(function (c) {
            var active = c.route === currentRoute;
            return '<a href="' + c.route + '" class="block pl-11 pr-2 py-1.5 rounded-lg text-[13px] ' +
              (active ? "text-brand-600 bg-brand-50 font-medium" : "text-ink-700 hover:bg-ink-100") + '">' + c.label + "</a>";
          }).join("") + "</div>"
        : "";
      return '<div>' +
        '<button data-group="' + m.label + '" class="group-btn w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-ink-100">' +
          '<span class="h-7 w-7 rounded-full ' + m.color + ' grid place-items-center text-white shrink-0">' +
            '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg></span>' +
          '<span class="flex-1 text-left font-medium text-ink-700">' + m.label + "</span>" + ui.chevron(m.open) +
        "</button>" + children + "</div>";
    }).join("");
    var nav = document.getElementById("menu");
    nav.innerHTML = html;
    nav.querySelectorAll(".group-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var label = btn.getAttribute("data-group");
        var item = M.menu.filter(function (x) { return x.label === label; })[0];
        if (item) { item.open = !item.open; renderMenu(location.hash); }
      });
    });
  }

  /* ---------- Router ---------- */
  function navigate() {
    var hash = location.hash || DEFAULT_ROUTE;
    var route = routes[hash] || routes[DEFAULT_ROUTE];
    var view = document.getElementById("view");
    var filterEl = document.getElementById("filterPanel");

    var body = route.render();
    view.innerHTML = body;
    if (route.after) route.after();

    if (route.filter) {
      filterEl.innerHTML = renderFilterPanel();
      filterEl.classList.remove("hidden"); filterEl.classList.add("flex");
    } else {
      filterEl.classList.add("hidden"); filterEl.classList.remove("flex");
    }

    renderMenu(hash);
    document.title = route.title + " - Japfa Feed Sales";
  }

  /* ---------- Tương tác top bar ---------- */
  function bindChrome() {
    var collapsed = false;
    document.getElementById("btnCollapse").addEventListener("click", function () {
      collapsed = !collapsed;
      var sb = document.getElementById("sidebar");
      sb.classList.toggle("w-60", !collapsed);
      sb.classList.toggle("w-0", collapsed);
      sb.classList.toggle("overflow-hidden", collapsed);
    });
  }

  window.addEventListener("hashchange", navigate);
  window.addEventListener("DOMContentLoaded", function () {
    bindChrome();
    if (!location.hash) location.hash = DEFAULT_ROUTE;
    navigate();
  });
})();
