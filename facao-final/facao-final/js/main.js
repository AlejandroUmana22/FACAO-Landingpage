/* ============================================================
   FACAO — main.js
   Inicializa íconos y maneja toda la interactividad del sitio:
   navbar, menú móvil, scroll reveal, contadores, slider
   antes/después, filtro de portafolio y formularios.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     0. Datos del portafolio
     ---------------------------------------------------------- */
  const PORTFOLIO_PROJECTS = [
    { id: 1, title: "Residencia Altos del Bosque", category: "residencial", area: "485 m²", location: "Bogotá, Cundinamarca", type: "Unifamiliar Premium", year: "2024", image: "https://images.unsplash.com/photo-1635006459494-c9b9665a666e?w=900&h=700&fit=crop&auto=format", tall: true },
    { id: 2, title: "Torre Empresarial Norte", category: "comercial", area: "12,400 m²", location: "Medellín, Antioquia", type: "Oficinas Premium", year: "2024", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&h=500&fit=crop&auto=format", tall: false },
    { id: 3, title: "Conjunto Parques del Río", category: "residencial", area: "2,800 m²", location: "Cali, Valle del Cauca", type: "Multifamiliar", year: "2023", image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?w=900&h=500&fit=crop&auto=format", tall: false },
    { id: 4, title: "Centro Comercial Viento Norte", category: "comercial", area: "8,600 m²", location: "Barranquilla, Atlántico", type: "Retail & Gastronomía", year: "2023", image: "https://images.unsplash.com/photo-1512403754473-27835f7b9984?w=900&h=700&fit=crop&auto=format", tall: true },
    { id: 5, title: "Planos Constructivos — Edificio Lux", category: "planos", area: "3,200 m²", location: "Bogotá, Cundinamarca", type: "Planos NSR-10", year: "2024", image: "https://images.unsplash.com/photo-1721244654392-9c912a6eb236?w=900&h=500&fit=crop&auto=format", tall: false },
    { id: 6, title: "Render Animado — Residencia Sol", category: "renders", area: "320 m²", location: "Chía, Cundinamarca", type: "Animación 4K", year: "2024", image: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=900&h=500&fit=crop&auto=format", tall: false },
    { id: 7, title: "Corporativo Skyline", category: "comercial", area: "5,100 m²", location: "Pereira, Risaralda", type: "Oficinas / Coworking", year: "2023", image: "https://images.unsplash.com/photo-1550510537-64a36484eae2?w=900&h=700&fit=crop&auto=format", tall: true },
    { id: 8, title: "Vivienda Unifamiliar El Retiro", category: "residencial", area: "260 m²", location: "El Retiro, Antioquia", type: "Casa de Campo", year: "2023", image: "https://images.unsplash.com/photo-1625447521754-764d517239e6?w=900&h=500&fit=crop&auto=format", tall: false },
  ];

  const FALLBACK_IMG =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

  /* ----------------------------------------------------------
     1. Íconos Lucide
     ---------------------------------------------------------- */
  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  /* ----------------------------------------------------------
     2. Scroll suave a anclas (data-nav-target)
     ---------------------------------------------------------- */
  function scrollToSelector(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function initSmoothNav() {
    document.body.addEventListener("click", (e) => {
      const trigger = e.target.closest(".nav-trigger");
      if (!trigger) return;
      const target = trigger.getAttribute("data-nav-target");
      if (!target) return;

      const menu = document.getElementById("mobile-menu");
      const wasOpen = menu && menu.classList.contains("is-open");

      if (wasOpen) {
        closeMobileMenu();
        setTimeout(() => scrollToSelector(target), 300);
      } else {
        scrollToSelector(target);
      }
    });
  }

  /* ----------------------------------------------------------
     3. Navbar: fondo sólido al hacer scroll
     ---------------------------------------------------------- */
  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    function update() {
      const menu = document.getElementById("mobile-menu");
      const menuOpen = menu && menu.classList.contains("is-open");
      const scrolled = window.scrollY > 60;

      if (scrolled || menuOpen) {
        navbar.classList.remove("navbar-transparent");
        navbar.classList.add("navbar-solid");
      } else {
        navbar.classList.remove("navbar-solid");
        navbar.classList.add("navbar-transparent");
      }
    }

    window.addEventListener("scroll", update);
    update();
  }

  /* ----------------------------------------------------------
     4. Menú móvil fullscreen
     ---------------------------------------------------------- */
  function openMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.getElementById("menu-toggle");
    const iconOpen = document.getElementById("icon-menu-open");
    const iconClose = document.getElementById("icon-menu-close");
    if (!menu) return;
    menu.classList.add("is-open");
    if (iconOpen) iconOpen.classList.add("hidden");
    if (iconClose) iconClose.classList.remove("hidden");
    if (toggle) toggle.setAttribute("aria-expanded", "true");

    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("navbar-solid");
    }
  }

  function closeMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const toggle = document.getElementById("menu-toggle");
    const iconOpen = document.getElementById("icon-menu-open");
    const iconClose = document.getElementById("icon-menu-close");
    if (!menu) return;
    menu.classList.remove("is-open");
    if (iconOpen) iconOpen.classList.remove("hidden");
    if (iconClose) iconClose.classList.add("hidden");
    if (toggle) toggle.setAttribute("aria-expanded", "false");

    if (window.scrollY <= 60) {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.classList.remove("navbar-solid");
        navbar.classList.add("navbar-transparent");
      }
    }
  }

  function initMobileMenuToggle() {
    const toggle = document.getElementById("menu-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const menu = document.getElementById("mobile-menu");
      const isOpen = menu && menu.classList.contains("is-open");
      if (isOpen) closeMobileMenu();
      else openMobileMenu();
    });
  }

  /* ----------------------------------------------------------
     5. Scroll reveal genérico (IntersectionObserver)
     ---------------------------------------------------------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-scale, .reveal-x-left");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     6. Línea de progreso del timeline (sección Proceso)
     ---------------------------------------------------------- */
  function initTimelineProgress() {
    const line = document.getElementById("timeline-progress");
    if (!line) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(line);
  }

  /* ----------------------------------------------------------
     7. Contadores animados (sección Stats)
     ---------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = parseInt(el.getAttribute("data-duration"), 10) || 1800;
    const format = el.getAttribute("data-format");
    const steps = 55;
    const stepValue = target / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const rounded = Math.floor(current);
      el.textContent =
        format === "k" && rounded >= 1000 ? (rounded / 1000).toFixed(0) + "K" : rounded;
    }, interval);
  }

  function initStatCounters() {
    const counters = document.querySelectorAll(".stat-counter");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     8. Portafolio: render dinámico + filtro de categorías
     ---------------------------------------------------------- */
  function portfolioCardDesktopHTML(project) {
    return `
      <li class="portfolio-card relative overflow-hidden cursor-pointer group reveal-scale is-visible"
           style="grid-row: ${project.tall ? "span 2" : "span 1"};"
           data-category="${project.category}">
        <img src="${project.image}" alt="${project.title} — proyecto arquitectónico FACAO"
             class="w-full h-full object-cover" style="filter: brightness(0.55) saturate(0.7);"
             loading="lazy" onerror="this.src='${FALLBACK_IMG}'" />
        <div class="portfolio-overlay absolute inset-0" aria-hidden="true"></div>
        <div class="absolute inset-0 flex flex-col justify-end p-7">
          <p class="portfolio-badge mb-3 w-fit" style="background:#DC2626; padding: 3px 8px;">
            <span class="text-white uppercase font-mono" style="font-size: 8px; letter-spacing: 0.2em;">${project.type}</span>
          </p>
          <p class="text-white mb-3 font-heading font-bold" style="font-size: 20px; line-height: 1.15;">${project.title}</p>
          <dl class="portfolio-data grid grid-cols-3 gap-3 mb-4 m-0">
            <div>
              <dt class="text-gray-500 uppercase font-mono" style="font-size: 8px; letter-spacing: 0.15em;">Área</dt>
              <dd class="text-gray-200 mt-0.5 font-mono m-0" style="font-size: 9px;">${project.area}</dd>
            </div>
            <div>
              <dt class="text-gray-500 uppercase font-mono" style="font-size: 8px; letter-spacing: 0.15em;">Ubicación</dt>
              <dd class="text-gray-200 mt-0.5 font-mono m-0" style="font-size: 9px;">${project.location}</dd>
            </div>
            <div>
              <dt class="text-gray-500 uppercase font-mono" style="font-size: 8px; letter-spacing: 0.15em;">Año</dt>
              <dd class="text-gray-200 mt-0.5 font-mono m-0" style="font-size: 9px;">${project.year}</dd>
            </div>
          </dl>
          <button class="portfolio-cta flex items-center gap-2 text-accent transition-all duration-200 font-mono uppercase" style="font-size: 10px; letter-spacing: 0.18em;">
            Explorar Modelo
            <i data-lucide="arrow-right" class="w-[11px] h-[11px]"></i>
          </button>
        </div>
        <span class="portfolio-corner absolute top-4 right-4 w-4 h-4 border-t border-r border-accent" aria-hidden="true"></span>
      </li>`;
  }

  function portfolioCardMobileHTML(project) {
    return `
      <li class="relative flex-shrink-0 overflow-hidden" style="width:280px; height:360px;" data-category="${project.category}">
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover"
             style="filter: brightness(0.6) saturate(0.75);" loading="lazy"
             onerror="this.src='${FALLBACK_IMG}'" />
        <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.95) 100%);" aria-hidden="true"></div>
        <div class="absolute bottom-0 left-0 right-0 p-5">
          <p class="text-white mb-1 font-heading font-bold" style="font-size: 18px; line-height: 1.15;">${project.title}</p>
          <p class="flex gap-4">
            <span class="text-gray-400 font-mono" style="font-size: 9px;">${project.area}</span>
            <span class="text-gray-600 font-mono" style="font-size: 9px;">${project.year}</span>
          </p>
        </div>
      </li>`;
  }

  function renderPortfolio(filter) {
    const desktopGrid = document.getElementById("portfolio-grid-desktop");
    const mobileGrid = document.getElementById("portfolio-grid-mobile");
    if (!desktopGrid || !mobileGrid) return;

    const filtered =
      filter === "todos" ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

    desktopGrid.innerHTML = filtered.map(portfolioCardDesktopHTML).join("");
    mobileGrid.innerHTML = filtered.map(portfolioCardMobileHTML).join("");
    initIcons();
  }

  function initPortfolioFilters() {
    const filterBar = document.getElementById("portfolio-filters");
    if (!filterBar) return;

    renderPortfolio("todos");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-tab");
      if (!btn) return;
      const category = btn.getAttribute("data-category");

      filterBar.querySelectorAll(".filter-tab").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      renderPortfolio(category);
    });
  }

  /* ----------------------------------------------------------
     9. Slider Antes/Después (sección Proceso)
     ---------------------------------------------------------- */
  function initCompareSlider() {
    const container = document.getElementById("compare-slider");
    const before = document.getElementById("compare-before");
    const beforeImg = before ? before.querySelector("img") : null;
    const handle = document.getElementById("compare-handle");
    const labelBefore = document.getElementById("label-before");
    const labelAfter = document.getElementById("label-after");
    if (!container || !before || !handle) return;

    let dragging = false;
    let pos = 42;

    function applyPosition() {
      before.style.width = pos + "%";
      handle.style.left = pos + "%";
      handle.setAttribute("aria-valuenow", Math.round(pos));
      if (beforeImg) beforeImg.style.width = (100 / pos) * 100 + "%";
      if (labelBefore) labelBefore.style.opacity = pos > 12 ? "1" : "0";
      if (labelAfter) labelAfter.style.opacity = pos < 88 ? "1" : "0";
    }

    function updateFromClientX(clientX) {
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      pos = Math.max(4, Math.min(96, x));
      applyPosition();
    }

    container.addEventListener("mousedown", () => (dragging = true));
    window.addEventListener("mouseup", () => (dragging = false));
    container.addEventListener("mouseleave", () => (dragging = false));
    container.addEventListener("mousemove", (e) => {
      if (dragging) updateFromClientX(e.clientX);
    });

    container.addEventListener("touchstart", () => (dragging = true), { passive: true });
    container.addEventListener("touchend", () => (dragging = false));
    container.addEventListener(
      "touchmove",
      (e) => {
        if (dragging && e.touches[0]) updateFromClientX(e.touches[0].clientX);
      },
      { passive: true }
    );

    handle.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { pos = Math.max(4, pos - 2); applyPosition(); }
      if (e.key === "ArrowRight") { pos = Math.min(96, pos + 2); applyPosition(); }
    });

    applyPosition();
  }

  /* ----------------------------------------------------------
     10. Formulario de contacto
     ---------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    const success = document.getElementById("contact-success");
    const refP = document.getElementById("contact-ref");
    if (!form || !success) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Aquí se integraría un backend real (fetch a una API, Formspree,
      // EmailJS, etc.). Por ahora se simula el envío.

      const ref = Math.floor(Math.random() * 90000) + 10000;
      if (refP) refP.textContent = "Ref. #" + ref + "-FCO";

      form.style.display = "none";
      success.style.display = "flex";
      initIcons();
    });
  }

  function initNewsletterForm() {
    document.body.addEventListener("submit", (e) => {
      const form = e.target.closest("#newsletter-form");
      if (!form) return;
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input) {
        alert("¡Gracias por suscribirte! Te escribiremos a " + input.value);
        input.value = "";
      }
    });
  }
/* ----------------------------------------------------------
   12. Control de zoom de página (accesibilidad)
   ---------------------------------------------------------- */
function initZoomControl() {
  const inBtn = document.getElementById("zoom-in");
  const outBtn = document.getElementById("zoom-out");
  const resetBtn = document.getElementById("zoom-reset");
  const status = document.getElementById("zoom-status");
  if (!inBtn || !outBtn || !resetBtn) return;

  const MIN = 0.8, MAX = 1.6, STEP = 0.1, KEY = "facao-zoom";
  let level = parseFloat(localStorage.getItem(KEY)) || 1;

  function apply() {
    level = Math.round(level * 10) / 10; // evita errores de coma flotante
    document.documentElement.style.zoom = level;
    try { localStorage.setItem(KEY, level); } catch (e) {}
    if (status) status.textContent = "Tamaño de página: " + Math.round(level * 100) + "%";
    outBtn.disabled = level <= MIN;
    inBtn.disabled = level >= MAX;
  }

  inBtn.addEventListener("click", () => { if (level < MAX) { level += STEP; apply(); } });
  outBtn.addEventListener("click", () => { if (level > MIN) { level -= STEP; apply(); } });
  resetBtn.addEventListener("click", () => { level = 1; apply(); });

  apply();
}
  /* ----------------------------------------------------------
     11. Init general
     ---------------------------------------------------------- */
  function init() {
    initIcons();
    initSmoothNav();
    initNavbarScroll();
    initMobileMenuToggle();
    initScrollReveal();
    initTimelineProgress();
    initStatCounters();
    initPortfolioFilters();
    initCompareSlider();
    initContactForm();
    initNewsletterForm();
    initContactForm();
    initNewsletterForm();
    initZoomControl();   

  }

  document.addEventListener("DOMContentLoaded", init);
})();
