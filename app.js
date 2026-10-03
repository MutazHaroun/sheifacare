// ==========================================================================
// Al-Shifa Clinic (عيادة الشفاء) - Main Application Logic & State Management
// ==========================================================================

// --- Initial Default Data (Preserved in localStorage) ---
const INITIAL_PATIENTS = [
  {
    id: "p_1",
    name: "أحمد محمد علي",
    age: 30,
    gender: "ذكر",
    phone: "0912345678",
    blood: "O+",
    notes: "يعاني من حساسية البنسلين، متابعة ضغط دورية"
  },
  {
    id: "p_2",
    name: "سارة علي حسن",
    age: 25,
    gender: "أنثى",
    phone: "0923456789",
    blood: "A+",
    notes: "فحص أسنان دوري - تنظيف وتبييض"
  },
  {
    id: "p_3",
    name: "خالد إبراهيم محمود",
    age: 42,
    gender: "ذكر",
    phone: "0918889900",
    blood: "B+",
    notes: "متابعة السكري من النوع الثاني"
  },
  {
    id: "p_4",
    name: "مريم عبد الله عمر",
    age: 18,
    gender: "أنثى",
    phone: "0925556677",
    blood: "AB+",
    notes: "فحص نظر دوري وقياس درجات النظارة"
  }
];

const INITIAL_DOCTORS = [
  {
    id: "d_1",
    name: "د. محمد المهدي",
    specialty: "طب الباطنية",
    phone: "0911122334",
    room: "عيادة 101",
    schedule: "الأحد - الخميس (9:00 ص - 2:00 م)",
    status: "متاح اليوم"
  },
  {
    id: "d_2",
    name: "د. فاطمة الزهراء",
    specialty: "طب الأسنان",
    phone: "0922233445",
    room: "عيادة 104",
    schedule: "السبت - الأربعاء (10:00 ص - 4:00 م)",
    status: "في غرفة الكشف"
  },
  {
    id: "d_3",
    name: "د. طارق السعيد",
    specialty: "طب الأطفال",
    phone: "0913344556",
    room: "عيادة 102",
    schedule: "يوميًا (8:30 ص - 1:30 م)",
    status: "متاح اليوم"
  },
  {
    id: "d_4",
    name: "د. ريم عبد السلام",
    specialty: "طب العيون",
    phone: "0924455667",
    room: "عيادة 108",
    schedule: "الإثنين والأربعاء (1:00 م - 6:00 م)",
    status: "في إجازة"
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: "a_1",
    patientName: "أحمد محمد علي",
    doctorName: "د. محمد المهدي",
    date: "2026-10-03",
    time: "10:00",
    reason: "متابعة الضغط والفحوصات المخبرية",
    status: "مؤكد"
  },
  {
    id: "a_2",
    patientName: "سارة علي حسن",
    doctorName: "د. فاطمة الزهراء",
    date: "2026-10-03",
    time: "11:30",
    reason: "جلسة تجميل وتنظيف أسنان",
    status: "في الانتظار"
  },
  {
    id: "a_3",
    patientName: "خالد إبراهيم محمود",
    doctorName: "د. محمد المهدي",
    date: "2026-10-04",
    time: "09:15",
    reason: "تحليل سكر تراكمي",
    status: "مؤكد"
  },
  {
    id: "a_4",
    patientName: "مريم عبد الله عمر",
    doctorName: "د. ريم عبد السلام",
    date: "2026-10-05",
    time: "14:00",
    reason: "كشف نظر دوري",
    status: "في الانتظار"
  }
];

const INITIAL_MEDICATIONS = [
  {
    id: "m_1",
    name: "باراسيتامول 500 ملغ",
    category: "مسكنات وخافض حرارة",
    quantity: 150,
    price: 3500,
    expiry: "2027-08-30"
  },
  {
    id: "m_2",
    name: "أوجمنتين 1 غرام (مضاد حيوي)",
    category: "مضادات حيوية",
    quantity: 8, // Low stock demo
    price: 12500,
    expiry: "2026-12-15"
  },
  {
    id: "m_3",
    name: "فيتامين د3 50000 وحدة",
    category: "فيتامينات ومكملات",
    quantity: 85,
    price: 8500,
    expiry: "2028-02-10"
  },
  {
    id: "m_4",
    name: "ميتفورمين 850 ملغ (للسكري)",
    category: "أدوية مزمنة",
    quantity: 5, // Low stock demo
    price: 5000,
    expiry: "2027-05-20"
  },
  {
    id: "m_5",
    name: "مرهم فيوسيدين مضاد للبكتيريا",
    category: "مراهم ومطهرات",
    quantity: 42,
    price: 4500,
    expiry: "2027-11-01"
  }
];

const INITIAL_INVOICES = [
  {
    id: "inv_1",
    invoiceNumber: "INV-2026-001",
    patientId: "p_1",
    patientName: "أحمد محمد علي",
    doctorId: "d_1",
    doctorName: "د. محمد المهدي",
    date: "2026-10-03",
    items: [
      { description: "كشفية طب باطنية وفحص سريري", qty: 1, unitPrice: 15000, total: 15000 },
      { description: "تحليل سكر وضغط دوري", qty: 1, unitPrice: 10000, total: 10000 },
      { description: "باراسيتامول 500 ملغ", qty: 1, unitPrice: 3500, total: 3500 }
    ],
    subtotal: 28500,
    discount: 2500,
    taxPercent: 0,
    taxAmount: 0,
    netTotal: 26000,
    paidAmount: 26000,
    remainingAmount: 0,
    paymentMethod: "نقدي",
    status: "مدفوع",
    notes: "تم السداد نقداً بالكامل - مراجعة بعد أسبوعين"
  },
  {
    id: "inv_2",
    invoiceNumber: "INV-2026-002",
    patientId: "p_2",
    patientName: "سارة علي حسن",
    doctorId: "d_2",
    doctorName: "د. فاطمة الزهراء",
    date: "2026-10-03",
    items: [
      { description: "جلسة تجميل وتنظيف أسنان كاملة", qty: 1, unitPrice: 40000, total: 40000 },
      { description: "مرهم ومطهر فموي", qty: 1, unitPrice: 5000, total: 5000 }
    ],
    subtotal: 45000,
    discount: 0,
    taxPercent: 0,
    taxAmount: 0,
    netTotal: 45000,
    paidAmount: 30000,
    remainingAmount: 15000,
    paymentMethod: "بطاقة مصرفية",
    status: "مدفوع جزئياً",
    notes: "المتبقي 15,000 ج.س يُسدد في جلسة المتابعة القادمة"
  },
  {
    id: "inv_3",
    invoiceNumber: "INV-2026-003",
    patientId: "p_3",
    patientName: "خالد إبراهيم محمود",
    doctorId: "d_1",
    doctorName: "د. محمد المهدي",
    date: "2026-10-02",
    items: [
      { description: "كشفية استشارية لمتابعة السكري", qty: 1, unitPrice: 25000, total: 25000 },
      { description: "ميتفورمين 850 ملغ (2 علب)", qty: 2, unitPrice: 5000, total: 10000 }
    ],
    subtotal: 35000,
    discount: 0,
    taxPercent: 0,
    taxAmount: 0,
    netTotal: 35000,
    paidAmount: 35000,
    remainingAmount: 0,
    paymentMethod: "تحويل بنكي",
    status: "مدفوع",
    notes: "سداد عبر تطبيق بنكك / فوري"
  },
  {
    id: "inv_4",
    invoiceNumber: "INV-2026-004",
    patientId: "p_4",
    patientName: "مريم عبد الله عمر",
    doctorId: "d_4",
    doctorName: "د. ريم عبد السلام",
    date: "2026-10-01",
    items: [
      { description: "فحص نظر شامل وقياس درجات العدسات", qty: 1, unitPrice: 12000, total: 12000 }
    ],
    subtotal: 12000,
    discount: 0,
    taxPercent: 0,
    taxAmount: 0,
    netTotal: 12000,
    paidAmount: 0,
    remainingAmount: 12000,
    paymentMethod: "تأمين صحي",
    status: "غير مدفوع",
    notes: "بانتظار موافقة شركة التأمين الصحي"
  }
];

// --- State Stores ---
let patients = JSON.parse(localStorage.getItem("clinic_patients")) || INITIAL_PATIENTS;
let doctors = JSON.parse(localStorage.getItem("clinic_doctors")) || INITIAL_DOCTORS;
let appointments = JSON.parse(localStorage.getItem("clinic_appointments")) || INITIAL_APPOINTMENTS;
let medications = JSON.parse(localStorage.getItem("clinic_medications")) || INITIAL_MEDICATIONS;
let invoices = JSON.parse(localStorage.getItem("clinic_invoices")) || INITIAL_INVOICES;

function saveState() {
  localStorage.setItem("clinic_patients", JSON.stringify(patients));
  localStorage.setItem("clinic_doctors", JSON.stringify(doctors));
  localStorage.setItem("clinic_appointments", JSON.stringify(appointments));
  localStorage.setItem("clinic_medications", JSON.stringify(medications));
  localStorage.setItem("clinic_invoices", JSON.stringify(invoices));
  updateDashboardAndBadges();
}

// --- Navigation Handling ---
const pageTitles = {
  dashboard: { title: "لوحة التحكم", subtitle: "نظرة عامة على نشاط العيادة اليومي وإحصائيات العمل" },
  patients: { title: "إدارة المرضى", subtitle: "قائمة المرضى، السجلات الطبية، والملفات الصحية" },
  appointments: { title: "جدول المواعيد", subtitle: "إدارة الحجوزات والمواعيد وجدول الكشوفات" },
  doctors: { title: "الكادر الطبي والأطباء", subtitle: "بيانات الأطباء، التخصصات، وساعات الدوام" },
  pharmacy: { title: "إدارة الصيدلية والمخزون", subtitle: "متابعة مخزون الأدوية، تواريخ الانتهاء، والأسعار" },
  invoices: { title: "إدارة الفواتير والمدفوعات", subtitle: "إصدار الفواتير، متابعة الإيرادات والمطالبات، وطباعة السندات" }
};

function navigateTo(pageId) {
  // Update sidebar active item
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-page") === pageId);
  });

  // Update page view
  document.querySelectorAll(".page-view").forEach(page => {
    page.classList.remove("active");
  });
  const activePage = document.getElementById(`page-${pageId}`);
  if (activePage) {
    activePage.classList.add("active");
  }

  // Update topbar headers
  const info = pageTitles[pageId] || pageTitles.dashboard;
  document.getElementById("currentPageTitle").textContent = info.title;
  document.getElementById("currentPageSubtitle").textContent = info.subtitle;

  // Render relevant page
  if (pageId === "dashboard") renderDashboard();
  if (pageId === "patients") renderPatientsTable();
  if (pageId === "appointments") renderAppointmentsTable();
  if (pageId === "doctors") renderDoctorsGrid();
  if (pageId === "pharmacy") renderPharmacyTable();
  if (pageId === "invoices") renderInvoicesTable();

  // Close mobile sidebar if open
  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Setup Nav Click Listeners
document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const pageId = btn.getAttribute("data-page");
    navigateTo(pageId);
  });
});

// Sidebar Mobile Toggles
document.getElementById("openSidebarBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("open");
});

document.getElementById("closeSidebarBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("open");
});

// Quick Add button opens the current page modal or appointment by default
document.getElementById("quickAddBtn").addEventListener("click", () => {
  const activeNavItem = document.querySelector(".nav-item.active");
  const currentPage = activeNavItem ? activeNavItem.getAttribute("data-page") : "dashboard";
  
  if (currentPage === "patients") openAddPatientModal();
  else if (currentPage === "doctors") openAddDoctorModal();
  else if (currentPage === "pharmacy") openAddMedicationModal();
  else if (currentPage === "invoices") openAddInvoiceModal();
  else openAddAppointmentModal();
});

// --- Live Clock ---
function updateLiveClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("ar-SA", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const clockEl = document.getElementById("timeString");
  if (clockEl) clockEl.textContent = timeStr;
}
setInterval(updateLiveClock, 1000);
updateLiveClock();

// ==========================================================================
// 1. DASHBOARD FUNCTIONS
// ==========================================================================
function updateDashboardAndBadges() {
  // Badges
  const patientBadge = document.getElementById("patientsCountBadge");
  const appBadge = document.getElementById("appointmentsTodayBadge");
  const invBadge = document.getElementById("invoicesCountBadge");

  if (patientBadge) patientBadge.textContent = patients.length;
  
  const todayStr = new Date().toISOString().split("T")[0];
  const todayApps = appointments.filter(a => a.date === todayStr);
  if (appBadge) appBadge.textContent = todayApps.length;
  if (invBadge) invBadge.textContent = invoices.length;

  // Financial calculations
  const totalCollected = invoices.reduce((sum, inv) => sum + (Number(inv.paidAmount) || 0), 0);
  const totalBilled = invoices.reduce((sum, inv) => sum + (Number(inv.netTotal) || 0), 0);
  const totalPending = invoices.reduce((sum, inv) => sum + (Number(inv.remainingAmount) || 0), 0);

  // Dashboard Stats Numbers
  const dashPatients = document.getElementById("dashTotalPatients");
  const dashTodayApp = document.getElementById("dashTodayAppointments");
  const dashDoctors = document.getElementById("dashActiveDoctors");
  const dashMeds = document.getElementById("dashTotalMeds");
  const dashRev = document.getElementById("dashTotalRevenue");

  if (dashPatients) dashPatients.textContent = patients.length;
  if (dashTodayApp) dashTodayApp.textContent = todayApps.length || appointments.length;
  if (dashDoctors) dashDoctors.textContent = doctors.filter(d => d.status === "متاح اليوم").length;
  if (dashMeds) dashMeds.textContent = medications.length;
  if (dashRev) dashRev.textContent = `${totalCollected.toLocaleString("ar-SD")} ج.س`;

  // Invoices Page Summary Cards
  const billedEl = document.getElementById("invoicesTotalBilled");
  const collectedEl = document.getElementById("invoicesTotalCollected");
  const pendingEl = document.getElementById("invoicesTotalPending");

  if (billedEl) billedEl.textContent = `${totalBilled.toLocaleString("ar-SD")} ج.س`;
  if (collectedEl) collectedEl.textContent = `${totalCollected.toLocaleString("ar-SD")} ج.س`;
  if (pendingEl) pendingEl.textContent = `${totalPending.toLocaleString("ar-SD")} ج.س`;
}

function renderDashboard() {
  updateDashboardAndBadges();

  // Recent Appointments widget
  const tbody = document.getElementById("dashLatestAppointmentsList");
  if (tbody) {
    if (appointments.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color: var(--text-muted);">لا توجد مواعيد مسجلة حتى الآن</td></tr>`;
    } else {
      const recent = [...appointments].slice(-4).reverse();
      tbody.innerHTML = recent.map(app => {
        let statusClass = "status-pending";
        if (app.status === "مؤكد") statusClass = "status-confirmed";
        if (app.status === "مكتمل") statusClass = "status-completed";
        if (app.status === "ملغي") statusClass = "status-cancelled";

        return `
          <tr>
            <td><strong>${escapeHtml(app.patientName)}</strong></td>
            <td>${escapeHtml(app.doctorName)}</td>
            <td><i class="fa-regular fa-calendar color-sky"></i> ${app.date} | ${app.time}</td>
            <td><span class="status-pill ${statusClass}">${app.status}</span></td>
          </tr>
        `;
      }).join("");
    }
  }

  // Pharmacy Alerts widget
  const alertsContainer = document.getElementById("dashPharmacyAlertsList");
  if (alertsContainer) {
    const lowStockMeds = medications.filter(m => m.quantity < 15);
    if (lowStockMeds.length === 0) {
      alertsContainer.innerHTML = `
        <div style="text-align:center; padding: 25px; color: var(--success-color);">
          <i class="fa-solid fa-circle-check" style="font-size: 2rem; margin-bottom: 8px;"></i>
          <p style="font-weight: 700;">جميع الأدوية متوفرة بكميات كافية في الصيدلية.</p>
        </div>
      `;
    } else {
      alertsContainer.innerHTML = lowStockMeds.map(m => `
        <div class="alert-item">
          <div class="alert-item-info">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>
              <h4>${escapeHtml(m.name)}</h4>
              <p>المتبقي في المخزن: <strong>${m.quantity}</strong> فقط (${escapeHtml(m.category)})</p>
            </div>
          </div>
          <button class="btn btn-sm btn-primary" onclick="openEditMedicationModal('${m.id}')">تحديث</button>
        </div>
      `).join("");
    }
  }
}

// ==========================================================================
// 2. PATIENTS MANAGEMENT (صفحة المرضى 👥)
// ==========================================================================
function renderPatientsTable(listToRender = patients) {
  const tbody = document.getElementById("patientsTableBody");
  const countPill = document.getElementById("patientsFilteredCount");
  if (countPill) countPill.textContent = `${listToRender.length} مريض`;

  if (!tbody) return;

  if (listToRender.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-muted);">
          <i class="fa-solid fa-user-slash" style="font-size: 2.2rem; margin-bottom: 10px; display: block; color: var(--accent-pink);"></i>
          لا يوجد مرضى يطابقون خيارات البحث
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listToRender.map((p, idx) => `
    <tr>
      <td><strong>#${idx + 1}</strong></td>
      <td>
        <div style="display:flex; align-items:center; gap:8px;">
          <i class="fa-solid ${p.gender === 'أنثى' ? 'fa-female' : 'fa-male'} color-sky"></i>
          <strong>${escapeHtml(p.name)}</strong>
        </div>
      </td>
      <td>${p.age} سنة</td>
      <td>${escapeHtml(p.gender)}</td>
      <td><span dir="ltr">${escapeHtml(p.phone)}</span></td>
      <td><span class="blood-badge">${escapeHtml(p.blood || 'غير محدد')}</span></td>
      <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${escapeHtml(p.notes || 'لا توجد ملاحظات')}
      </td>
      <td>
        <div class="action-btn-group">
          <button class="table-act-btn act-view" title="عرض التفاصيل" onclick="viewPatientDetails('${p.id}')">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="table-act-btn act-edit" title="تعديل" onclick="openEditPatientModal('${p.id}')">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="table-act-btn act-delete" title="حذف" onclick="deletePatient('${p.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

function filterPatients() {
  const query = (document.getElementById("patientSearchInput")?.value || "").toLowerCase().trim();
  const gender = document.getElementById("patientGenderFilter")?.value || "all";

  const filtered = patients.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query) || p.phone.includes(query);
    const matchGender = gender === "all" || p.gender === gender;
    return matchQuery && matchGender;
  });

  renderPatientsTable(filtered);
}

function openAddPatientModal() {
  document.getElementById("patientForm").reset();
  document.getElementById("patientId").value = "";
  document.getElementById("patientModalTitle").innerHTML = `<i class="fa-solid fa-user-plus color-sky"></i> إضافة مريض جديد`;
  document.getElementById("patientSubmitBtn").textContent = "حفظ المريض";
  openModal("patientModal");
}

function openEditPatientModal(id) {
  const patient = patients.find(p => p.id === id);
  if (!patient) return;

  document.getElementById("patientId").value = patient.id;
  document.getElementById("patientName").value = patient.name;
  document.getElementById("patientAge").value = patient.age;
  document.getElementById("patientGender").value = patient.gender;
  document.getElementById("patientPhone").value = patient.phone;
  document.getElementById("patientBlood").value = patient.blood || "غير محدد";
  document.getElementById("patientNotes").value = patient.notes || "";

  document.getElementById("patientModalTitle").innerHTML = `<i class="fa-solid fa-user-pen color-sky"></i> تعديل بيانات المريض`;
  document.getElementById("patientSubmitBtn").textContent = "تحديث البيانات";
  openModal("patientModal");
}

function handlePatientSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("patientId").value;
  const name = document.getElementById("patientName").value.trim();
  const age = parseInt(document.getElementById("patientAge").value, 10);
  const gender = document.getElementById("patientGender").value;
  const phone = document.getElementById("patientPhone").value.trim();
  const blood = document.getElementById("patientBlood").value;
  const notes = document.getElementById("patientNotes").value.trim();

  if (!name || isNaN(age) || !phone) {
    showToast("يرجى ملء جميع الحقول المطلوبة", "danger");
    return;
  }

  if (id) {
    // Edit existing
    const index = patients.findIndex(p => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], name, age, gender, phone, blood, notes };
      showToast("تم تحديث بيانات المريض بنجاح", "success");
    }
  } else {
    // Add new
    const newPatient = {
      id: "p_" + Date.now(),
      name,
      age,
      gender,
      phone,
      blood,
      notes
    };
    patients.unshift(newPatient);
    showToast("تمت إضافة المريض بنجاح", "success");
  }

  saveState();
  closeModal("patientModal");
  filterPatients();
}

function deletePatient(id) {
  const patient = patients.find(p => p.id === id);
  if (!patient) return;

  if (confirm(`هل أنت متأكد من حذف المريض "${patient.name}" نهائيًا؟`)) {
    patients = patients.filter(p => p.id !== id);
    // Also remove appointments for this patient
    appointments = appointments.filter(a => a.patientName !== patient.name);
    saveState();
    filterPatients();
    showToast("تم حذف المريض بنجاح", "info");
  }
}

function viewPatientDetails(id) {
  const p = patients.find(p => p.id === id);
  if (!p) return;

  const patientAppointments = appointments.filter(a => a.patientName === p.name);

  document.getElementById("viewDetailsTitle").innerHTML = `<i class="fa-solid fa-hospital-user color-sky"></i> الملف الطبي للمريض`;
  document.getElementById("viewDetailsContent").innerHTML = `
    <div class="detail-item-grid">
      <div class="detail-block">
        <span class="detail-label">اسم المريض</span>
        <span class="detail-value">${escapeHtml(p.name)}</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">العمر والجنس</span>
        <span class="detail-value">${p.age} سنة (${escapeHtml(p.gender)})</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">رقم الهاتف</span>
        <span class="detail-value" dir="ltr">${escapeHtml(p.phone)}</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">فصيلة الدم</span>
        <span class="detail-value"><span class="blood-badge">${escapeHtml(p.blood)}</span></span>
      </div>
    </div>
    
    <div class="detail-block" style="margin-top: 12px;">
      <span class="detail-label">التشخيص والملاحظات الطبية</span>
      <p style="margin-top: 6px; font-size: 0.95rem;">${escapeHtml(p.notes || "لا توجد ملاحظات مسجلة")}</p>
    </div>

    <div style="margin-top: 16px;">
      <h4 style="font-size: 1rem; margin-bottom: 8px; color: var(--primary-sky-dark);">
        <i class="fa-solid fa-calendar-check"></i> سجل المواعيد السابقة والحالية (${patientAppointments.length}):
      </h4>
      ${patientAppointments.length === 0 ? '<p style="color: var(--text-muted); font-size: 0.9rem;">لا توجد مواعيد مسجلة لهذا المريض.</p>' : `
        <ul style="padding-right: 20px; font-size: 0.9rem; line-height: 1.8;">
          ${patientAppointments.map(a => `
            <li>
              <strong>${a.date} (${a.time})</strong> مع <strong>${escapeHtml(a.doctorName)}</strong> - 
              <span class="status-pill ${a.status === 'مؤكد' ? 'status-confirmed' : 'status-pending'}">${a.status}</span>
            </li>
          `).join("")}
        </ul>
      `}
    </div>
  `;

  openModal("viewDetailsModal");
}

// ==========================================================================
// 3. APPOINTMENTS MANAGEMENT (صفحة المواعيد 📅)
// ==========================================================================
function renderAppointmentsTable(listToRender = appointments) {
  const tbody = document.getElementById("appointmentsTableBody");
  const countPill = document.getElementById("appointmentsFilteredCount");
  if (countPill) countPill.textContent = `${listToRender.length} موعد`;

  if (!tbody) return;

  if (listToRender.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-muted);">
          <i class="fa-regular fa-calendar-xmark" style="font-size: 2.2rem; margin-bottom: 10px; display: block; color: var(--accent-pink);"></i>
          لا توجد مواعيد تطابق خيارات التصفية
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listToRender.map((app, idx) => {
    let statusClass = "status-pending";
    if (app.status === "مؤكد") statusClass = "status-confirmed";
    if (app.status === "مكتمل") statusClass = "status-completed";
    if (app.status === "ملغي") statusClass = "status-cancelled";

    return `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td><strong>${escapeHtml(app.patientName)}</strong></td>
        <td><i class="fa-solid fa-user-md color-sky"></i> ${escapeHtml(app.doctorName)}</td>
        <td><i class="fa-regular fa-calendar"></i> ${app.date}</td>
        <td><i class="fa-regular fa-clock"></i> ${app.time}</td>
        <td>${escapeHtml(app.reason || 'كشف روتيني')}</td>
        <td><span class="status-pill ${statusClass}">${app.status}</span></td>
        <td>
          <div class="action-btn-group">
            <button class="table-act-btn act-view" title="تفاصيل الموعد" onclick="viewAppointmentDetails('${app.id}')">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button class="table-act-btn act-edit" title="تعديل الموعد" onclick="openEditAppointmentModal('${app.id}')">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="table-act-btn act-delete" title="إلغاء / حذف" onclick="deleteAppointment('${app.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function filterAppointments() {
  const query = (document.getElementById("appointmentSearchInput")?.value || "").toLowerCase().trim();
  const status = document.getElementById("appointmentStatusFilter")?.value || "all";
  const date = document.getElementById("appointmentDateFilter")?.value;

  const filtered = appointments.filter(app => {
    const matchQuery = app.patientName.toLowerCase().includes(query) || app.doctorName.toLowerCase().includes(query);
    const matchStatus = status === "all" || app.status === status;
    const matchDate = !date || app.date === date;
    return matchQuery && matchStatus && matchDate;
  });

  renderAppointmentsTable(filtered);
}

function populateAppointmentDropdowns(selectedPatient = "", selectedDoctor = "") {
  const patSelect = document.getElementById("appPatientSelect");
  const docSelect = document.getElementById("appDoctorSelect");

  if (patSelect) {
    if (patients.length === 0) {
      patSelect.innerHTML = `<option value="">لا يوجد مرضى مسجلون، يرجى إضافة مريض أولاً</option>`;
    } else {
      patSelect.innerHTML = patients.map(p => `
        <option value="${escapeHtml(p.name)}" ${p.name === selectedPatient ? 'selected' : ''}>
          ${escapeHtml(p.name)} (${p.phone})
        </option>
      `).join("");
    }
  }

  if (docSelect) {
    if (doctors.length === 0) {
      docSelect.innerHTML = `<option value="">لا يوجد أطباء مسجلون</option>`;
    } else {
      docSelect.innerHTML = doctors.map(d => `
        <option value="${escapeHtml(d.name)}" ${d.name === selectedDoctor ? 'selected' : ''}>
          ${escapeHtml(d.name)} - ${escapeHtml(d.specialty)}
        </option>
      `).join("");
    }
  }
}

function openAddAppointmentModal() {
  populateAppointmentDropdowns();
  document.getElementById("appointmentForm").reset();
  document.getElementById("appointmentId").value = "";
  
  // Set default date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("appDate").value = today;
  document.getElementById("appTime").value = "10:00";

  document.getElementById("appointmentModalTitle").innerHTML = `<i class="fa-solid fa-calendar-plus color-sky"></i> حجز موعد جديد`;
  document.getElementById("appointmentSubmitBtn").textContent = "حفظ الموعد";
  openModal("appointmentModal");
}

function openEditAppointmentModal(id) {
  const app = appointments.find(a => a.id === id);
  if (!app) return;

  populateAppointmentDropdowns(app.patientName, app.doctorName);
  document.getElementById("appointmentId").value = app.id;
  document.getElementById("appPatientSelect").value = app.patientName;
  document.getElementById("appDoctorSelect").value = app.doctorName;
  document.getElementById("appDate").value = app.date;
  document.getElementById("appTime").value = app.time;
  document.getElementById("appReason").value = app.reason || "";
  document.getElementById("appStatus").value = app.status;

  document.getElementById("appointmentModalTitle").innerHTML = `<i class="fa-solid fa-calendar-day color-sky"></i> تعديل الموعد`;
  document.getElementById("appointmentSubmitBtn").textContent = "تحديث الموعد";
  openModal("appointmentModal");
}

function handleAppointmentSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("appointmentId").value;
  const patientName = document.getElementById("appPatientSelect").value;
  const doctorName = document.getElementById("appDoctorSelect").value;
  const date = document.getElementById("appDate").value;
  const time = document.getElementById("appTime").value;
  const reason = document.getElementById("appReason").value.trim();
  const status = document.getElementById("appStatus").value;

  if (!patientName || !doctorName || !date || !time) {
    showToast("يرجى اختيار المريض والطبيب وتحديد التاريخ والوقت", "danger");
    return;
  }

  if (id) {
    // Edit existing
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], patientName, doctorName, date, time, reason, status };
      showToast("تم تحديث الموعد بنجاح", "success");
    }
  } else {
    // Add new
    const newApp = {
      id: "a_" + Date.now(),
      patientName,
      doctorName,
      date,
      time,
      reason,
      status
    };
    appointments.unshift(newApp);
    showToast("تم حجز الموعد بنجاح", "success");
  }

  saveState();
  closeModal("appointmentModal");
  filterAppointments();
}

function deleteAppointment(id) {
  if (confirm("هل أنت متأكد من حذف هذا الموعد؟")) {
    appointments = appointments.filter(a => a.id !== id);
    saveState();
    filterAppointments();
    showToast("تم حذف الموعد", "info");
  }
}

function viewAppointmentDetails(id) {
  const app = appointments.find(a => a.id === id);
  if (!app) return;

  document.getElementById("viewDetailsTitle").innerHTML = `<i class="fa-solid fa-calendar-check color-sky"></i> تفاصيل الموعد الطبي`;
  document.getElementById("viewDetailsContent").innerHTML = `
    <div class="detail-item-grid">
      <div class="detail-block">
        <span class="detail-label">المريض</span>
        <span class="detail-value">${escapeHtml(app.patientName)}</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">الطبيب المعالج</span>
        <span class="detail-value">${escapeHtml(app.doctorName)}</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">تاريخ الموعد</span>
        <span class="detail-value"><i class="fa-regular fa-calendar color-sky"></i> ${app.date}</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">الوقت</span>
        <span class="detail-value"><i class="fa-regular fa-clock color-pink"></i> ${app.time}</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">الحالة</span>
        <span class="detail-value">${app.status}</span>
      </div>
      <div class="detail-block">
        <span class="detail-label">سبب الزيارة</span>
        <span class="detail-value">${escapeHtml(app.reason || 'كشف ومتابعة')}</span>
      </div>
    </div>
  `;

  openModal("viewDetailsModal");
}

// ==========================================================================
// 4. DOCTORS MANAGEMENT (صفحة الأطباء 👨‍⚕️)
// ==========================================================================
function renderDoctorsGrid(listToRender = doctors) {
  const grid = document.getElementById("doctorsGrid");
  if (!grid) return;

  if (listToRender.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
        <i class="fa-solid fa-user-doctor" style="font-size: 3rem; margin-bottom: 12px; color: var(--accent-pink);"></i>
        <h3 style="color: var(--text-dark); margin-bottom: 6px;">لا يوجد أطباء مطابقون للبحث</h3>
        <p style="color: var(--text-muted);">يمكنك إضافة طبيب جديد أو تغيير خيارات التصفية.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = listToRender.map(doc => {
    let statusClass = "status-available";
    if (doc.status === "في غرفة الكشف") statusClass = "status-in-session";
    if (doc.status === "في إجازة") statusClass = "status-on-leave";

    return `
      <div class="doctor-card">
        <div class="doctor-card-top">
          <div class="doc-avatar-box">
            <i class="fa-solid fa-user-doctor"></i>
          </div>
          <div class="doc-info-main">
            <h3>${escapeHtml(doc.name)}</h3>
            <span class="doc-spec">${escapeHtml(doc.specialty)}</span>
            <div style="margin-top: 4px;">
              <span class="status-pill ${statusClass}">${doc.status}</span>
            </div>
          </div>
        </div>

        <div class="doc-meta-list">
          <div class="doc-meta-item">
            <i class="fa-solid fa-phone"></i>
            <span dir="ltr">${escapeHtml(doc.phone)}</span>
          </div>
          <div class="doc-meta-item">
            <i class="fa-solid fa-door-open"></i>
            <span>${escapeHtml(doc.room || 'عيادة عامة')}</span>
          </div>
          <div class="doc-meta-item">
            <i class="fa-regular fa-clock"></i>
            <span>${escapeHtml(doc.schedule || 'أوقات الدوام الرسمية')}</span>
          </div>
        </div>

        <div class="doctor-card-footer">
          <button class="btn btn-sm btn-primary" onclick="quickBookDoctor('${escapeHtml(doc.name)}')">
            <i class="fa-regular fa-calendar-plus"></i>
            <span>حجز موعد</span>
          </button>
          <div class="action-btn-group">
            <button class="table-act-btn act-edit" title="تعديل بيانات الطبيب" onclick="openEditDoctorModal('${doc.id}')">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="table-act-btn act-delete" title="حذف الطبيب" onclick="deleteDoctor('${doc.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function filterDoctors() {
  const query = (document.getElementById("doctorSearchInput")?.value || "").toLowerCase().trim();
  const specialty = document.getElementById("doctorSpecialtyFilter")?.value || "all";

  const filtered = doctors.filter(d => {
    const matchQuery = d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query);
    const matchSpec = specialty === "all" || d.specialty === specialty;
    return matchQuery && matchSpec;
  });

  renderDoctorsGrid(filtered);
}

function openAddDoctorModal() {
  document.getElementById("doctorForm").reset();
  document.getElementById("doctorId").value = "";
  document.getElementById("doctorModalTitle").innerHTML = `<i class="fa-solid fa-user-doctor color-sky"></i> إضافة طبيب جديد`;
  document.getElementById("doctorSubmitBtn").textContent = "حفظ بيانات الطبيب";
  openModal("doctorModal");
}

function openEditDoctorModal(id) {
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;

  document.getElementById("doctorId").value = doc.id;
  document.getElementById("docName").value = doc.name;
  document.getElementById("docSpecialty").value = doc.specialty;
  document.getElementById("docStatus").value = doc.status;
  document.getElementById("docPhone").value = doc.phone;
  document.getElementById("docRoom").value = doc.room || "";
  document.getElementById("docSchedule").value = doc.schedule || "";

  document.getElementById("doctorModalTitle").innerHTML = `<i class="fa-solid fa-user-pen color-sky"></i> تعديل بيانات الطبيب`;
  document.getElementById("doctorSubmitBtn").textContent = "تحديث البيانات";
  openModal("doctorModal");
}

function handleDoctorSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("doctorId").value;
  const name = document.getElementById("docName").value.trim();
  const specialty = document.getElementById("docSpecialty").value;
  const status = document.getElementById("docStatus").value;
  const phone = document.getElementById("docPhone").value.trim();
  const room = document.getElementById("docRoom").value.trim();
  const schedule = document.getElementById("docSchedule").value.trim();

  if (!name || !phone) {
    showToast("يرجى ملء جميع الحقول المطلوبة", "danger");
    return;
  }

  if (id) {
    const index = doctors.findIndex(d => d.id === id);
    if (index !== -1) {
      doctors[index] = { ...doctors[index], name, specialty, status, phone, room, schedule };
      showToast("تم تحديث بيانات الطبيب بنجاح", "success");
    }
  } else {
    const newDoc = {
      id: "d_" + Date.now(),
      name,
      specialty,
      status,
      phone,
      room,
      schedule
    };
    doctors.unshift(newDoc);
    showToast("تمت إضافة الطبيب بنجاح", "success");
  }

  saveState();
  closeModal("doctorModal");
  filterDoctors();
}

function deleteDoctor(id) {
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;

  if (confirm(`هل أنت متأكد من حذف ${doc.name}؟`)) {
    doctors = doctors.filter(d => d.id !== id);
    saveState();
    filterDoctors();
    showToast("تم حذف الطبيب", "info");
  }
}

function quickBookDoctor(docName) {
  navigateTo("appointments");
  openAddAppointmentModal();
  const selectEl = document.getElementById("appDoctorSelect");
  if (selectEl) selectEl.value = docName;
}

// ==========================================================================
// 5. PHARMACY MANAGEMENT (صفحة الصيدلية 💊)
// ==========================================================================
function renderPharmacyTable(listToRender = medications) {
  const tbody = document.getElementById("medsTableBody");
  const countPill = document.getElementById("medsFilteredCount");
  if (countPill) countPill.textContent = `${listToRender.length} صنف`;

  if (!tbody) return;

  if (listToRender.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: var(--text-muted);">
          <i class="fa-solid fa-pills" style="font-size: 2.2rem; margin-bottom: 10px; display: block; color: var(--accent-pink);"></i>
          لا توجد أدوية مطابقة للبحث
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listToRender.map((med, idx) => {
    const isLow = med.quantity < 15;
    const statusPill = isLow 
      ? `<span class="status-pill status-low-stock"><i class="fa-solid fa-triangle-exclamation"></i> مخزون منخفض (${med.quantity})</span>`
      : `<span class="status-pill status-available"><i class="fa-solid fa-check"></i> متوفر (${med.quantity})</span>`;

    return `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td>
          <strong>${escapeHtml(med.name)}</strong>
        </td>
        <td><span class="badge badge-sky">${escapeHtml(med.category)}</span></td>
        <td><strong>${med.quantity}</strong> عبوة</td>
        <td><strong>${Number(med.price).toLocaleString("ar-SD")}</strong> ج.س</td>
        <td><i class="fa-regular fa-calendar-days color-pink"></i> ${med.expiry}</td>
        <td>${statusPill}</td>
        <td>
          <div class="action-btn-group">
            <button class="table-act-btn act-edit" title="تعديل الدواء" onclick="openEditMedicationModal('${med.id}')">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="table-act-btn act-delete" title="حذف الدواء" onclick="deleteMedication('${med.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function filterMedications() {
  const query = (document.getElementById("medSearchInput")?.value || "").toLowerCase().trim();
  const category = document.getElementById("medCategoryFilter")?.value || "all";

  const filtered = medications.filter(m => {
    const matchQuery = m.name.toLowerCase().includes(query) || m.category.toLowerCase().includes(query);
    const matchCat = category === "all" || m.category === category;
    return matchQuery && matchCat;
  });

  renderPharmacyTable(filtered);
}

function openAddMedicationModal() {
  document.getElementById("medicationForm").reset();
  document.getElementById("medId").value = "";
  document.getElementById("medModalTitle").innerHTML = `<i class="fa-solid fa-pills color-sky"></i> إضافة دواء إلى الصيدلية`;
  document.getElementById("medSubmitBtn").textContent = "حفظ الدواء";
  openModal("medicationModal");
}

function openEditMedicationModal(id) {
  const med = medications.find(m => m.id === id);
  if (!med) return;

  document.getElementById("medId").value = med.id;
  document.getElementById("medName").value = med.name;
  document.getElementById("medCategory").value = med.category;
  document.getElementById("medQuantity").value = med.quantity;
  document.getElementById("medPrice").value = med.price;
  document.getElementById("medExpiry").value = med.expiry;

  document.getElementById("medModalTitle").innerHTML = `<i class="fa-solid fa-pen-to-square color-sky"></i> تعديل بيانات الدواء`;
  document.getElementById("medSubmitBtn").textContent = "تحديث البيانات";
  openModal("medicationModal");
}

function handleMedicationSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("medId").value;
  const name = document.getElementById("medName").value.trim();
  const category = document.getElementById("medCategory").value;
  const quantity = parseInt(document.getElementById("medQuantity").value, 10);
  const price = parseFloat(document.getElementById("medPrice").value);
  const expiry = document.getElementById("medExpiry").value;

  if (!name || isNaN(quantity) || isNaN(price) || !expiry) {
    showToast("يرجى إدخال جميع بيانات الدواء بصورة صحيحة", "danger");
    return;
  }

  if (id) {
    const index = medications.findIndex(m => m.id === id);
    if (index !== -1) {
      medications[index] = { ...medications[index], name, category, quantity, price, expiry };
      showToast("تم تحديث الدواء بنجاح", "success");
    }
  } else {
    const newMed = {
      id: "m_" + Date.now(),
      name,
      category,
      quantity,
      price,
      expiry
    };
    medications.unshift(newMed);
    showToast("تمت إضافة الدواء إلى الصيدلية بنجاح", "success");
  }

  saveState();
  closeModal("medicationModal");
  filterMedications();
}

function deleteMedication(id) {
  const med = medications.find(m => m.id === id);
  if (!med) return;

  if (confirm(`هل تريد بالتأكيد حذف الدواء "${med.name}"؟`)) {
    medications = medications.filter(m => m.id !== id);
    saveState();
    filterMedications();
    showToast("تم حذف الدواء من الصيدلية", "info");
  }
}

// ==========================================================================
// 6. INVOICES & BILLING MANAGEMENT (صفحة الفواتير والمدفوعات 💳)
// ==========================================================================
function renderInvoicesTable(listToRender = invoices) {
  const tbody = document.getElementById("invoicesTableBody");
  const countPill = document.getElementById("invoicesFilteredCount");
  if (countPill) countPill.textContent = `${listToRender.length} فاتورة`;

  if (!tbody) return;

  if (listToRender.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: var(--text-muted);">
          <i class="fa-solid fa-file-circle-xmark" style="font-size: 2.2rem; margin-bottom: 10px; display: block; color: var(--accent-pink);"></i>
          لا توجد فواتير تطابق خيارات البحث الحالية
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listToRender.map((inv, index) => {
    let statusBadgeClass = "badge-sky";
    if (inv.status === "مدفوع") statusBadgeClass = "badge-success";
    else if (inv.status === "مدفوع جزئياً") statusBadgeClass = "badge-warning";
    else if (inv.status === "غير مدفوع") statusBadgeClass = "badge-pink";

    const remaining = Number(inv.remainingAmount) || 0;
    const remainingText = remaining > 0 
      ? `<span style="color: var(--danger-color); font-weight: 700;">${remaining.toLocaleString("ar-SD")} ج.س</span>` 
      : `<span style="color: var(--success-color); font-weight: 600;">0.00 ج.س</span>`;

    return `
      <tr>
        <td><strong style="color: var(--primary-sky-dark);">${escapeHtml(inv.invoiceNumber)}</strong></td>
        <td>
          <div class="patient-cell">
            <div class="avatar-sm"><i class="fa-solid fa-user"></i></div>
            <strong>${escapeHtml(inv.patientName)}</strong>
          </div>
        </td>
        <td>${escapeHtml(inv.doctorName)}</td>
        <td><i class="fa-regular fa-calendar color-sky"></i> ${inv.date}</td>
        <td><strong>${Number(inv.netTotal).toLocaleString("ar-SD")} ج.س</strong></td>
        <td style="color: var(--success-color); font-weight: 700;">${Number(inv.paidAmount).toLocaleString("ar-SD")} ج.س</td>
        <td>${remainingText}</td>
        <td><span class="badge" style="background:#f1f5f9; color:var(--text-dark);">${escapeHtml(inv.paymentMethod)}</span></td>
        <td><span class="badge ${statusBadgeClass}">${escapeHtml(inv.status)}</span></td>
        <td>
          <div class="action-btns">
            <button class="action-btn btn-view" title="عرض وطباعة الفاتورة" onclick="viewAndPrintInvoice('${inv.id}')">
              <i class="fa-solid fa-print"></i>
            </button>
            <button class="action-btn btn-edit" title="تعديل الفاتورة" onclick="openEditInvoiceModal('${inv.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="action-btn btn-delete" title="حذف الفاتورة" onclick="deleteInvoice('${inv.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function filterInvoices() {
  const query = (document.getElementById("invoiceSearchInput")?.value || "").toLowerCase().trim();
  const status = document.getElementById("invoiceStatusFilter")?.value || "all";
  const method = document.getElementById("invoiceMethodFilter")?.value || "all";

  const filtered = invoices.filter(inv => {
    const matchQuery = 
      (inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(query)) ||
      (inv.patientName && inv.patientName.toLowerCase().includes(query)) ||
      (inv.doctorName && inv.doctorName.toLowerCase().includes(query));

    const matchStatus = status === "all" || inv.status === status;
    const matchMethod = method === "all" || inv.paymentMethod === method;

    return matchQuery && matchStatus && matchMethod;
  });

  renderInvoicesTable(filtered);
}

function populateInvoiceSelects() {
  // Populate Patients
  const patSelect = document.getElementById("invPatientSelect");
  if (patSelect) {
    patSelect.innerHTML = patients.map(p => 
      `<option value="${p.id}" data-name="${escapeHtml(p.name)}">${escapeHtml(p.name)} (هاتف: ${escapeHtml(p.phone)})</option>`
    ).join("");
  }

  // Populate Doctors
  const docSelect = document.getElementById("invDoctorSelect");
  if (docSelect) {
    docSelect.innerHTML = doctors.map(d => 
      `<option value="${d.id}" data-name="${escapeHtml(d.name)}">${escapeHtml(d.name)} - ${escapeHtml(d.specialty)}</option>`
    ).join("");
  }

  // Populate Pharmacy quick medications
  const pharmGroup = document.getElementById("invPharmacyOptGroup");
  if (pharmGroup) {
    pharmGroup.innerHTML = medications.map(m => 
      `<option value="${escapeHtml(m.name)}|1|${m.price}">${escapeHtml(m.name)} (${Number(m.price).toLocaleString("ar-SD")} ج.س - متوفر: ${m.quantity})</option>`
    ).join("");
  }
}

function openAddInvoiceModal() {
  const form = document.getElementById("invoiceForm");
  if (form) form.reset();

  document.getElementById("invoiceId").value = "";
  document.getElementById("invoiceModalTitle").innerHTML = `<i class="fa-solid fa-file-invoice-dollar color-sky"></i> إنشاء فاتورة جديدة`;
  document.getElementById("invoiceSubmitBtn").textContent = "حفظ الفاتورة";

  // Auto generate invoice number
  const nextNumber = "INV-" + new Date().getFullYear() + "-" + String(invoices.length + 1).padStart(3, "0");
  document.getElementById("invNumber").value = nextNumber;
  document.getElementById("invDate").value = new Date().toISOString().split("T")[0];

  populateInvoiceSelects();

  // Reset items body and add 1 default row
  const itemsBody = document.getElementById("invoiceItemsBody");
  if (itemsBody) itemsBody.innerHTML = "";
  addInvoiceItemRow("كشفية طبية وفحص سريري", 1, 15000);

  document.getElementById("invDiscount").value = 0;
  document.getElementById("invTax").value = 0;
  document.getElementById("invPaidAmount").value = 15000;

  calculateInvoiceTotals();
  openModal("invoiceModal");
}

function openEditInvoiceModal(id) {
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;

  populateInvoiceSelects();

  document.getElementById("invoiceId").value = inv.id;
  document.getElementById("invNumber").value = inv.invoiceNumber;
  document.getElementById("invDate").value = inv.date;
  document.getElementById("invPatientSelect").value = inv.patientId || "";
  document.getElementById("invDoctorSelect").value = inv.doctorId || "";
  document.getElementById("invPaymentMethod").value = inv.paymentMethod || "نقدي";
  document.getElementById("invDiscount").value = inv.discount || 0;
  document.getElementById("invTax").value = inv.taxPercent || 0;
  document.getElementById("invPaidAmount").value = inv.paidAmount || 0;
  document.getElementById("invNotes").value = inv.notes || "";

  document.getElementById("invoiceModalTitle").innerHTML = `<i class="fa-solid fa-pen-to-square color-sky"></i> تعديل الفاتورة (${escapeHtml(inv.invoiceNumber)})`;
  document.getElementById("invoiceSubmitBtn").textContent = "تحديث الفاتورة";

  // Render items
  const itemsBody = document.getElementById("invoiceItemsBody");
  if (itemsBody) {
    itemsBody.innerHTML = "";
    if (inv.items && inv.items.length > 0) {
      inv.items.forEach(item => {
        addInvoiceItemRow(item.description, item.qty, item.unitPrice);
      });
    } else {
      addInvoiceItemRow("خدمة طبية", 1, inv.netTotal || 0);
    }
  }

  calculateInvoiceTotals();
  openModal("invoiceModal");
}

function addInvoiceItemRow(description = "", qty = 1, unitPrice = 0) {
  const tbody = document.getElementById("invoiceItemsBody");
  if (!tbody) return;

  const row = document.createElement("tr");
  row.className = "invoice-item-row";

  const total = (Number(qty) || 1) * (Number(unitPrice) || 0);

  row.innerHTML = `
    <td>
      <input type="text" class="item-desc-input" placeholder="اسم الخدمة، التحليل، أو الدواء..." value="${escapeHtml(description)}" required oninput="calculateInvoiceTotals()">
    </td>
    <td>
      <input type="number" class="item-qty-input" min="1" step="1" value="${qty}" required oninput="updateRowSubtotal(this)">
    </td>
    <td>
      <input type="number" class="item-price-input" min="0" step="0.5" value="${unitPrice}" required oninput="updateRowSubtotal(this)">
    </td>
    <td>
      <span class="item-row-total">${total.toLocaleString("ar-SD")} ج.س</span>
    </td>
    <td style="text-align: center;">
      <button type="button" class="btn-delete-row" title="حذف البند" onclick="removeInvoiceItemRow(this)">
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
    </td>
  `;

  tbody.appendChild(row);
  calculateInvoiceTotals();
}

function updateRowSubtotal(inputEl) {
  const row = inputEl.closest("tr");
  if (!row) return;

  const qty = parseFloat(row.querySelector(".item-qty-input")?.value) || 0;
  const price = parseFloat(row.querySelector(".item-price-input")?.value) || 0;
  const total = qty * price;

  const totalEl = row.querySelector(".item-row-total");
  if (totalEl) totalEl.textContent = `${total.toLocaleString("ar-SD")} ج.س`;

  calculateInvoiceTotals();
}

function removeInvoiceItemRow(btn) {
  const tbody = document.getElementById("invoiceItemsBody");
  const rows = tbody.querySelectorAll("tr");
  if (rows.length <= 1) {
    showToast("يجب أن تحتوي الفاتورة على بند واحد على الأقل", "danger");
    return;
  }
  btn.closest("tr").remove();
  calculateInvoiceTotals();
}

function handleQuickItemAdd(val) {
  if (!val) return;
  const parts = val.split("|");
  if (parts.length === 3) {
    const desc = parts[0];
    const qty = parseInt(parts[1], 10) || 1;
    const price = parseFloat(parts[2]) || 0;

    // Check if the first row is empty, replace it
    const firstRow = document.querySelector("#invoiceItemsBody tr");
    if (firstRow) {
      const descInput = firstRow.querySelector(".item-desc-input");
      if (descInput && !descInput.value.trim()) {
        descInput.value = desc;
        firstRow.querySelector(".item-qty-input").value = qty;
        firstRow.querySelector(".item-price-input").value = price;
        updateRowSubtotal(descInput);
        document.getElementById("invQuickItemSelect").value = "";
        return;
      }
    }

    addInvoiceItemRow(desc, qty, price);
  }
  document.getElementById("invQuickItemSelect").value = "";
}

function calculateInvoiceTotals() {
  const rows = document.querySelectorAll("#invoiceItemsBody tr");
  let subtotal = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector(".item-qty-input")?.value) || 0;
    const price = parseFloat(row.querySelector(".item-price-input")?.value) || 0;
    subtotal += (qty * price);
  });

  const discount = parseFloat(document.getElementById("invDiscount")?.value) || 0;
  const taxPercent = parseFloat(document.getElementById("invTax")?.value) || 0;

  const taxableAmount = Math.max(0, subtotal - discount);
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const netTotal = taxableAmount + taxAmount;

  const paidAmount = parseFloat(document.getElementById("invPaidAmount")?.value) || 0;
  const remaining = Math.max(0, netTotal - paidAmount);

  // Update DOM displays
  const subEl = document.getElementById("invSubtotalText");
  const netEl = document.getElementById("invNetTotalText");
  const remEl = document.getElementById("invRemainingText");

  if (subEl) subEl.textContent = `${subtotal.toLocaleString("ar-SD")} ج.س`;
  if (netEl) netEl.textContent = `${netTotal.toLocaleString("ar-SD")} ج.س`;
  if (remEl) remEl.textContent = `${remaining.toLocaleString("ar-SD")} ج.س`;
}

function handleInvoiceSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("invoiceId").value;
  const invoiceNumber = document.getElementById("invNumber").value.trim();
  const date = document.getElementById("invDate").value;
  const patSelect = document.getElementById("invPatientSelect");
  const docSelect = document.getElementById("invDoctorSelect");
  const paymentMethod = document.getElementById("invPaymentMethod").value;
  const discount = parseFloat(document.getElementById("invDiscount").value) || 0;
  const taxPercent = parseFloat(document.getElementById("invTax").value) || 0;
  const paidAmount = parseFloat(document.getElementById("invPaidAmount").value) || 0;
  const notes = document.getElementById("invNotes").value.trim();

  const patientId = patSelect.value;
  const patientName = patSelect.options[patSelect.selectedIndex]?.getAttribute("data-name") || "مريض عام";

  const doctorId = docSelect.value;
  const doctorName = docSelect.options[docSelect.selectedIndex]?.getAttribute("data-name") || "طبيب العيادة";

  // Collect line items
  const itemRows = document.querySelectorAll("#invoiceItemsBody tr");
  const items = [];
  let subtotal = 0;

  itemRows.forEach(row => {
    const desc = row.querySelector(".item-desc-input")?.value.trim() || "خدمة";
    const qty = parseFloat(row.querySelector(".item-qty-input")?.value) || 1;
    const unitPrice = parseFloat(row.querySelector(".item-price-input")?.value) || 0;
    const total = qty * unitPrice;

    subtotal += total;
    items.push({ description: desc, qty, unitPrice, total });
  });

  if (items.length === 0) {
    showToast("يرجى إضافة بند واحد على الأقل للفاتورة", "danger");
    return;
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const netTotal = taxableAmount + taxAmount;
  const remainingAmount = Math.max(0, netTotal - paidAmount);

  let status = "غير مدفوع";
  if (paidAmount >= netTotal && netTotal > 0) {
    status = "مدفوع";
  } else if (paidAmount > 0 && paidAmount < netTotal) {
    status = "مدفوع جزئياً";
  }

  const invoiceData = {
    id: id || ("inv_" + Date.now()),
    invoiceNumber,
    patientId,
    patientName,
    doctorId,
    doctorName,
    date,
    items,
    subtotal,
    discount,
    taxPercent,
    taxAmount,
    netTotal,
    paidAmount,
    remainingAmount,
    paymentMethod,
    status,
    notes
  };

  if (id) {
    const index = invoices.findIndex(i => i.id === id);
    if (index !== -1) {
      invoices[index] = invoiceData;
      showToast("تم تحديث الفاتورة بنجاح", "success");
    }
  } else {
    invoices.unshift(invoiceData);
    showToast("تم إنشاء الفاتورة الجديدة بنجاح", "success");
  }

  saveState();
  closeModal("invoiceModal");
  filterInvoices();
}

function deleteInvoice(id) {
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;

  if (confirm(`هل أنت متأكد من حذف الفاتورة رقم "${inv.invoiceNumber}" الخاصة بالمريض "${inv.patientName}"؟`)) {
    invoices = invoices.filter(i => i.id !== id);
    saveState();
    filterInvoices();
    showToast("تم حذف الفاتورة بنجاح", "info");
  }
}

// Printable Invoice Generator
function viewAndPrintInvoice(id) {
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;

  const patient = patients.find(p => p.id === inv.patientId) || { name: inv.patientName, phone: "غير مسجل", age: "-", blood: "غير محدد" };
  const doctor = doctors.find(d => d.id === inv.doctorId) || { name: inv.doctorName, specialty: "العيادات العامة", room: "العيادة الرئيسية" };

  const container = document.getElementById("printableInvoiceDocument");
  if (!container) return;

  let statusColor = "#16a34a";
  if (inv.status === "مدفوع جزئياً") statusColor = "#d97706";
  if (inv.status === "غير مدفوع") statusColor = "#dc2626";

  container.innerHTML = `
    <!-- Top Header & Clinic Identity -->
    <div class="inv-doc-header">
      <div class="inv-clinic-brand">
        <div class="inv-clinic-logo-icon">
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
        <div class="inv-clinic-title">
          <h2>مجمع عيادة الشفاء الطبية الذكية</h2>
          <p>Al-Shifa Smart Medical Clinic | نظام الإدارة الطبي الشامل</p>
          <p><i class="fa-solid fa-phone color-sky"></i> 0912345678 &bull; <i class="fa-solid fa-location-dot color-sky"></i> الخرطوم - السودان</p>
        </div>
      </div>
      <div class="inv-header-meta">
        <div class="inv-badge-num">${escapeHtml(inv.invoiceNumber)}</div>
        <div class="inv-date-text"><i class="fa-regular fa-calendar"></i> التاريخ: ${inv.date}</div>
        <div style="margin-top: 6px;">
          <span style="display:inline-block; padding: 3px 12px; border-radius: 9999px; font-weight:800; font-size:0.85rem; color: #ffffff; background: ${statusColor};">
            ${escapeHtml(inv.status)}
          </span>
        </div>
      </div>
    </div>

    <!-- Patient & Doctor Parties Grid -->
    <div class="inv-parties-grid">
      <div class="inv-party-col">
        <h4><i class="fa-solid fa-user-injured"></i> بيانات المريض:</h4>
        <p><strong>الاسم:</strong> ${escapeHtml(inv.patientName)}</p>
        <p><strong>رقم الهاتف:</strong> ${escapeHtml(patient.phone || "غير متوفر")}</p>
        <p><strong>العمر / فصيلة الدم:</strong> ${patient.age || "-"} سنة / ${patient.blood || "غير محدد"}</p>
      </div>
      <div class="inv-party-col">
        <h4><i class="fa-solid fa-user-doctor"></i> الطبيب المعالج والعيادة:</h4>
        <p><strong>الطبيب:</strong> ${escapeHtml(inv.doctorName)}</p>
        <p><strong>التخصص:</strong> ${escapeHtml(doctor.specialty || "طب عام")}</p>
        <p><strong>الغرفة / العيادة:</strong> ${escapeHtml(doctor.room || "عيادة الكشف")}</p>
      </div>
    </div>

    <!-- Itemized Services Table -->
    <table class="inv-print-table">
      <thead>
        <tr>
          <th style="width: 8%;">#</th>
          <th style="width: 50%;">الخدمة / الإجراء / الدواء</th>
          <th style="width: 12%; text-align: center;">الكمية</th>
          <th style="width: 15%; text-align: left;">سعر الوحدة</th>
          <th style="width: 15%; text-align: left;">الإجمالي</th>
        </tr>
      </thead>
      <tbody>
        ${inv.items.map((item, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${escapeHtml(item.description)}</strong></td>
            <td style="text-align: center;">${item.qty}</td>
            <td style="text-align: left;">${Number(item.unitPrice).toLocaleString("ar-SD")} ج.س</td>
            <td style="text-align: left;"><strong>${Number(item.total).toLocaleString("ar-SD")} ج.س</strong></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <!-- Financial Breakdown & Notes -->
    <div class="inv-financial-summary-wrap">
      <div class="inv-notes-box">
        <h5><i class="fa-solid fa-circle-info color-sky"></i> ملاحظات وطريقة الدفع:</h5>
        <p><strong>طريقة السداد:</strong> ${escapeHtml(inv.paymentMethod)}</p>
        <p>${inv.notes ? escapeHtml(inv.notes) : "نشكركم على زيارتكم لعيادة الشفاء الطبية. نتمنى لكم دوام الصحة والعافية."}</p>
      </div>

      <div class="inv-totals-box">
        <div class="inv-total-line">
          <span>المجموع الفرعي:</span>
          <span>${Number(inv.subtotal).toLocaleString("ar-SD")} ج.س</span>
        </div>
        ${inv.discount > 0 ? `
          <div class="inv-total-line" style="color: var(--danger-color);">
            <span>الخصم الممنوح:</span>
            <span>-${Number(inv.discount).toLocaleString("ar-SD")} ج.س</span>
          </div>
        ` : ''}
        ${inv.taxPercent > 0 ? `
          <div class="inv-total-line">
            <span>الضريبة (${inv.taxPercent}%):</span>
            <span>+${Number(inv.taxAmount).toLocaleString("ar-SD")} ج.س</span>
          </div>
        ` : ''}
        <div class="inv-total-line grand-total">
          <span>المبلغ الإجمالي المستحق:</span>
          <span>${Number(inv.netTotal).toLocaleString("ar-SD")} ج.س</span>
        </div>
        <div class="inv-total-line paid-total">
          <span>المبلغ المدفوع:</span>
          <span>${Number(inv.paidAmount).toLocaleString("ar-SD")} ج.س</span>
        </div>
        <div class="inv-total-line due-total">
          <span>المبلغ المتبقي:</span>
          <span>${Number(inv.remainingAmount).toLocaleString("ar-SD")} ج.س</span>
        </div>
      </div>
    </div>

    <!-- Signatures & Stamp -->
    <div class="inv-signatures-row">
      <div class="inv-signature-block">
        <p>توقيع وختم المحاسب / الاستقبال</p>
        <div class="inv-signature-line"></div>
      </div>
      <div class="inv-signature-block">
        <p>ختم الطبيب المعالج</p>
        <div class="inv-signature-line"></div>
      </div>
    </div>
  `;

  openModal("printInvoiceModal");
}

function printCurrentInvoice() {
  window.print();
}

// ==========================================================================
// UTILITY FUNCTIONS (Modals, Toasts, Helpers)
// ==========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
  }
}

// Close modal when clicking on backdrop
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-backdrop")) {
    e.target.classList.remove("open");
  }
});

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "danger") icon = "fa-circle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size: 1.2rem; color: ${type === 'success' ? 'var(--success-color)' : type === 'danger' ? 'var(--danger-color)' : 'var(--primary-sky)'};"></i>
    <span style="font-weight: 600; font-size: 0.92rem; color: var(--text-dark);">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Initial boot
document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  renderPatientsTable();
  renderAppointmentsTable();
  renderDoctorsGrid();
  renderPharmacyTable();
  renderInvoicesTable();
});

