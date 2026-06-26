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
  // Accordion: Thang (M+1/M+2/M+3) -> Nhom san pham -> bang chi tiet SKU.
  // itnState.open: { "m1": true, "m1-g0": false, ... } luu trang thai mo/dong.
  var itnState = { open: { m1: true }, search: "" };
  var num = function (n) { return (n == null ? 0 : n).toLocaleString("vi-VN"); };

  function itnIsOpen(key) { return !!itnState.open[key]; }

  // Dropdown chon nhieu nha may (checkbox) cho toolbar loc.
  // openKey: key luu trang thai mo trong itnState (vd "plantOpen").
  function itnPlantsDropdown(openKey, attr) {
    var it = M.itn;
    var sel = it.plantOptions.filter(function (p) { return it.plants.indexOf(p.code) > -1; });
    var label = sel.length ? sel.map(function (s) { return s.code; }).join(", ") : "Chọn nhà máy";
    var panel = itnState[openKey]
      ? '<div class="itn-plant-panel absolute z-30 mt-1 w-64 bg-white border border-ink-300 rounded-lg shadow-card p-1.5 max-h-60 overflow-auto">' +
          it.plantOptions.map(function (p) {
            var on = it.plants.indexOf(p.code) > -1;
            return '<label class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-ink-100 cursor-pointer text-sm">' +
              '<input type="checkbox" ' + attr + '="' + p.code + '" ' + (on ? "checked" : "") + ' class="h-4 w-4 accent-brand-500"/>' +
              '<span class="font-medium text-ink-700">' + p.code + "</span>" +
              '<span class="text-ink-500 truncate">· ' + p.name + "</span></label>";
          }).join("") +
        "</div>"
      : "";
    return '<div class="relative">' +
      '<button type="button" data-itnplantbtn="' + openKey + '" class="min-w-48 w-full flex items-center justify-between gap-2 border border-ink-300 rounded-lg px-2 py-1.5 text-sm bg-white hover:border-brand-400 focus:border-brand-500 outline-none">' +
        '<span class="truncate ' + (sel.length ? "text-ink-800" : "text-ink-400") + '">' + label + "</span>" +
        '<svg class="h-4 w-4 text-ink-400 shrink-0 transition ' + (itnState[openKey] ? "rotate-180" : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>' +
      "</button>" + panel +
    "</div>";
  }

  function paintItnPlants() {
    var box = document.getElementById("itnPlantsBox");
    if (box) box.innerHTML = itnPlantsDropdown("plantOpen", "data-itnplant");
  }

  // Mo phong goi API khi doi tham so (mockup: chi repaint + toast).
  function itnReloadData() {
    var p = document.getElementById("itnPeriod");
    if (p) p.innerHTML = 'Dữ liệu forecast nội bộ &mdash; kỳ import <span class="font-medium text-ink-700">Tháng ' + M.itn.importMonth + "/" + M.itn.importYear + "</span>";
    paintItnAccordion();
    itnToast("Tải dữ liệu kỳ import T" + M.itn.importMonth + "/" + M.itn.importYear + " (mockup)");
  }

  function renderItn() {
    var it = M.itn;
    var monthLabel = "Tháng " + it.importMonth + "/" + it.importYear;

    // Toolbar: thang/nam import, nha may, nut import
    var toolbar =
      '<div class="px-5 py-3 border-b border-ink-300 shrink-0 flex flex-wrap items-end gap-3">' +
        '<div><label class="block text-[11px] text-ink-500 mb-0.5">Tháng import</label>' +
          '<select id="itnMonthSel" class="border border-ink-300 rounded-lg px-2 py-1.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none">' +
            Array.apply(null, { length: 12 }).map(function (_, i) {
              return '<option value="' + (i + 1) + '" ' + (i + 1 === it.importMonth ? "selected" : "") + '>' + (i + 1) + "</option>";
            }).join("") +
          "</select></div>" +
        '<div><label class="block text-[11px] text-ink-500 mb-0.5">Năm import</label>' +
          '<input id="itnYearInp" type="number" value="' + it.importYear + '" class="w-24 border border-ink-300 rounded-lg px-2 py-1.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none"/></div>' +
        '<div><label class="block text-[11px] text-ink-500 mb-0.5">Nhà máy (plants)</label>' +
          '<div id="itnPlantsBox"></div></div>' +
        '<div class="ml-auto flex items-center gap-2">' +
          '<input id="itnFileInput" type="file" accept=".xlsx,.xls" class="hidden"/>' +
          '<button id="btnItnImport" class="px-4 py-2 rounded-lg font-medium bg-brand-500 text-white hover:bg-brand-600 text-sm flex items-center gap-1.5">' +
            '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>' +
            "Import Excel</button>" +
        "</div>" +
      "</div>";

    // Thanh tim kiem (theo ma / ten SKU) - dat ngay duoi toolbar thang import
    var searchBar =
      '<div class="px-5 py-2.5 border-b border-ink-100 shrink-0">' +
        '<div class="relative max-w-sm">' +
          '<svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/></svg>' +
          '<input id="itnSearch" type="text" value="' + (itnState.search || "") + '" placeholder="Tìm theo mã hoặc tên SKU" ' +
            'class="w-full pl-9 pr-3 py-1.5 rounded-lg bg-ink-100 border border-transparent focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm"/>' +
        "</div>" +
      "</div>";

    return toolbar + searchBar +
      '<div id="itnPeriod" class="px-5 py-2.5 text-sm text-ink-500 shrink-0">Dữ liệu forecast nội bộ &mdash; kỳ import <span class="font-medium text-ink-700">' + monthLabel + "</span></div>" +
      '<div id="itnAccordion" class="flex-1 overflow-auto p-4 space-y-3"></div>';
  }

  // Bang chi tiet SKU cho 1 nhom san pham: Plant | Material Code | Material Name | Forecast
  function itnDetailTable(skus) {
    var rows = skus.map(function (k) {
      return '<tr class="hover:bg-ink-100/60">' +
        '<td class="px-4 py-2.5 font-medium text-ink-700">' + (k.plant || '<span class="text-ink-300">&mdash;</span>') + "</td>" +
        '<td class="px-4 py-2.5 font-medium text-brand-600 tabular-nums">' + k.materialCode + "</td>" +
        '<td class="px-4 py-2.5">' + k.materialName + "</td>" +
        '<td class="px-4 py-2.5 text-right tabular-nums">' + num(k.forecast) + "</td>" +
      "</tr>";
    }).join("");
    return '<div class="overflow-x-auto border-t border-ink-100 bg-ink-100/30">' +
      '<table class="w-full text-[13px]">' +
        '<thead class="bg-ink-100 text-ink-500 text-left">' +
          "<tr>" +
            '<th class="px-4 py-2 font-medium">Plant</th>' +
            '<th class="px-4 py-2 font-medium">Material Code</th>' +
            '<th class="px-4 py-2 font-medium">Material Name</th>' +
            '<th class="px-4 py-2 font-medium text-right">Forecast</th>' +
          "</tr>" +
        "</thead>" +
        '<tbody class="divide-y divide-ink-100 bg-white">' + rows + "</tbody>" +
      "</table></div>";
  }

  // Loc SKU theo ma / ten (chuoi tim kiem)
  function itnSkuMatch(k, q) {
    if (!q) return true;
    return (k.materialCode || "").toLowerCase().indexOf(q) > -1 ||
           (k.materialName || "").toLowerCase().indexOf(q) > -1;
  }
  function itnSumSkus(skus) {
    return skus.reduce(function (s, k) { return s + (k.forecast || 0); }, 0);
  }

  function paintItnAccordion() {
    var box = document.getElementById("itnAccordion");
    if (!box) return;
    if (!M.itn.months.length) {
      box.innerHTML = '<div class="py-20 text-center text-ink-300 text-sm">Không có dữ liệu</div>';
      return;
    }

    var q = (itnState.search || "").trim().toLowerCase();
    var searching = !!q;

    var html = M.itn.months.map(function (m) {
      var mKey = "m" + m.monthOffset;

      // Loc nhom + sku theo tu khoa
      var filtered = m.productGroups.map(function (g, gi) {
        return { gi: gi, g: g, skus: g.skus.filter(function (k) { return itnSkuMatch(k, q); }) };
      }).filter(function (fg) { return fg.skus.length > 0; });

      if (searching && !filtered.length) return ""; // an thang khong co ket qua

      var mOpen = searching ? true : itnIsOpen(mKey);
      var monthTotal = filtered.reduce(function (s, fg) { return s + itnSumSkus(fg.skus); }, 0);

      var groups = "";
      if (mOpen) {
        groups = filtered.map(function (fg) {
          var gKey = mKey + "-g" + fg.gi;
          var gOpen = searching ? true : itnIsOpen(gKey);
          return '<div class="border-t border-ink-100">' +
            '<button data-itnkey="' + gKey + '" class="itn-toggle w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-ink-100/60">' +
              '<svg class="h-4 w-4 text-ink-500 transition ' + (gOpen ? "rotate-90" : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>' +
              '<span class="font-medium text-ink-800">' + fg.g.productGroupDesc + "</span>" +
              '<span class="ml-auto text-sm text-ink-500 tabular-nums">' + num(itnSumSkus(fg.skus)) + "</span>" +
            "</button>" +
            (gOpen ? itnDetailTable(fg.skus) : "") +
          "</div>";
        }).join("");
      }

      return '<div class="bg-white rounded-card shadow-card overflow-hidden">' +
        '<button data-itnkey="' + mKey + '" class="itn-toggle w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-ink-100/60">' +
          '<svg class="h-4 w-4 text-ink-500 transition ' + (mOpen ? "rotate-90" : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>' +
          '<span class="font-semibold">Tháng ' + m.forecastMonth + "/" + m.forecastYear + "</span>" +
          '<span class="ml-2 text-xs text-ink-400">(M+' + m.monthOffset + ")</span>" +
          '<span class="ml-auto text-sm font-semibold text-brand-600 tabular-nums">' + num(monthTotal) + "</span>" +
        "</button>" +
        groups +
      "</div>";
    }).join("");

    box.innerHTML = html || '<div class="py-20 text-center text-ink-300 text-sm">Không tìm thấy SKU phù hợp</div>';
  }

  function itnToast(msg) {
    var t = document.createElement("div");
    t.className = "fixed bottom-5 right-5 z-50 bg-success text-white px-4 py-2.5 rounded-lg shadow-card text-sm flex items-center gap-2";
    t.innerHTML = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>' + msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }

  function itnTogglePlant(code) {
    var i = M.itn.plants.indexOf(code);
    if (i > -1) M.itn.plants.splice(i, 1); else M.itn.plants.push(code);
  }

  // Click document: mo/dong dropdown nha may + dong khi bam ra ngoai.
  function itnDocClick(e) {
    var btn = e.target.closest("[data-itnplantbtn]");
    if (btn) {
      itnState.plantOpen = !itnState.plantOpen;
      paintItnPlants();
      return;
    }
    if (e.target.closest(".itn-plant-panel")) return; // tick checkbox -> giu mo
    if (itnState.plantOpen) { itnState.plantOpen = false; paintItnPlants(); }
  }

  // Change document: tick chon nha may (toolbar) -> reload du lieu.
  function itnDocChange(e) {
    var t = e.target;
    if (!t || !t.getAttribute) return;
    if (t.getAttribute("data-itnplant") != null) {
      itnTogglePlant(t.getAttribute("data-itnplant"));
      paintItnPlants();
      itnReloadData();
    }
  }

  function afterItn() {
    paintItnAccordion();
    paintItnPlants();

    var byId = function (id) { return document.getElementById(id); };

    // Accordion toggle (thang / nhom)
    var box = document.getElementById("itnAccordion");
    if (box) box.addEventListener("click", function (e) {
      var btn = e.target.closest(".itn-toggle");
      if (!btn) return;
      var key = btn.getAttribute("data-itnkey");
      itnState.open[key] = !itnState.open[key];
      paintItnAccordion();
    });

    // Doi thang import -> "goi API"
    if (byId("itnMonthSel")) byId("itnMonthSel").addEventListener("change", function () {
      M.itn.importMonth = parseInt(this.value, 10);
      itnReloadData();
    });

    // Doi nam import -> "goi API"
    if (byId("itnYearInp")) byId("itnYearInp").addEventListener("change", function () {
      var y = parseInt(this.value, 10);
      if (y >= 2000 && y <= 2100) { M.itn.importYear = y; itnReloadData(); }
    });

    // Tim kiem theo ma / ten SKU -> loc tai cho
    if (byId("itnSearch")) byId("itnSearch").addEventListener("input", function () {
      itnState.search = this.value;
      paintItnAccordion();
    });

    // Dropdown nha may: mo/dong + tick checkbox. Delegate tren document.
    document.addEventListener("click", itnDocClick);
    document.addEventListener("change", itnDocChange);

    // Import Excel: bam nut -> mo file, chon xong -> "goi API import" voi tham so dang loc
    if (byId("btnItnImport")) byId("btnItnImport").addEventListener("click", function () {
      var fi = byId("itnFileInput");
      if (fi) fi.click();
    });
    if (byId("itnFileInput")) byId("itnFileInput").addEventListener("change", function () {
      if (!this.files || !this.files.length) return;
      var name = this.files[0].name;
      var plants = M.itn.plants.length ? M.itn.plants.join(", ") : "(chưa chọn nhà máy)";
      itnToast('Import "' + name + '" — kỳ T' + M.itn.importMonth + "/" + M.itn.importYear + ", plants: " + plants + " (mockup)");
      this.value = ""; // reset de co the chon lai cung file
    });
  }

  /* ---------- Bảng định tuyến ---------- */
  var ph = function (t) { return function () { return ui.placeholder(t); }; };
  var routes = {
    "#/orders":         { title: "Quản lý đơn hàng", filter: true, noHeader: true, render: renderOrders, after: afterOrders },
    "#/dashboard":      { title: "Tổng quan", render: ph("Tổng quan") },
    "#/customers":      { title: "Quản lý khách hàng", render: ph("Quản lý khách hàng") },
    "#/create-order":   { title: "Tạo đơn hàng", render: ph("Tạo đơn hàng") },
    "#/rewards":        { title: "Quản lý hoạt động đổi quà", render: ph("Quản lý hoạt động đổi quà") },
    "#/visits":         { title: "Hoạt động viếng thăm", render: ph("Hoạt động viếng thăm") },
    "#/sales-routes":   { title: "Tuyến bán hàng", render: ph("Tuyến bán hàng") },
    "#/demand-budget":  { title: "Dự báo nhu cầu & ngân sách", render: ph("Dự báo nhu cầu & ngân sách") },
    "#/ai-forecast":    { title: "AI forecast", render: ph("AI forecast") },
    "#/forecast-month": { title: "Sales Forecast Tháng", render: ph("Sales Forecast Tháng") },
    "#/forecast-itn":   { title: "Sales Forecast Tháng (ITN)", noHeader: true, render: renderItn, after: afterItn },
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
