/* ==========================================================================
   GTech Digital — prototype behaviour
   Vanilla JS, progressively enhanced. Every feature degrades to usable
   static content if this file fails to load.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- Header */

  function initHeader() {
    var header = document.querySelector("[data-header]");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Mega-menu: hover on pointer devices, click/Escape everywhere.
    document.querySelectorAll("[data-megamenu]").forEach(function (item) {
      var trigger = item.querySelector(".nav__link");
      if (!trigger) return;

      var open = function (state) {
        item.classList.toggle("is-open", state);
        trigger.setAttribute("aria-expanded", String(state));
      };

      item.addEventListener("mouseenter", function () { open(true); });
      item.addEventListener("mouseleave", function () { open(false); });

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        open(!item.classList.contains("is-open"));
      });

      item.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          open(false);
          trigger.focus();
        }
      });

      // Close when focus leaves the whole item.
      item.addEventListener("focusout", function (e) {
        if (!item.contains(e.relatedTarget)) open(false);
      });
    });
  }

  /* --------------------------------------------------------- Mobile drawer */

  function initMobileNav() {
    var drawer = document.querySelector("[data-mobile-nav]");
    var openBtn = document.querySelector("[data-nav-open]");
    var closeBtn = document.querySelector("[data-nav-close]");
    if (!drawer || !openBtn) return;

    var setOpen = function (state) {
      drawer.classList.toggle("is-open", state);
      drawer.setAttribute("aria-hidden", String(!state));
      openBtn.setAttribute("aria-expanded", String(state));
      document.body.style.overflow = state ? "hidden" : "";
      if (state) {
        var first = drawer.querySelector("a, button");
        if (first) first.focus();
      } else {
        openBtn.focus();
      }
    };

    openBtn.addEventListener("click", function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });

    drawer.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) setOpen(false);
    });
  }

  /* -------------------------------------------------------- Scroll reveals */

  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          // Stagger siblings by 60ms.
          var delay = Number(entry.target.dataset.revealDelay || 0);
          setTimeout(function () {
            entry.target.classList.add("is-visible");
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------ Animated counters */

  function initCounters() {
    var counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length) return;

    var run = function (el) {
      var target = parseFloat(el.dataset.countTo);
      var decimals = Number(el.dataset.countDecimals || 0);

      if (reduceMotion) {
        el.textContent = target.toFixed(decimals);
        return;
      }

      var duration = 1600;
      var start = null;

      var step = function (ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          run(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------- Service accordion */

  /*
   * Replaces v1's four service cards plus four repeated bullet sections with
   * one indexed list. Exactly one row is open at a time, so the section has a
   * predictable height and the page keeps an editorial rhythm.
   */
  function initServices() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-svc]"));
    if (!items.length) return;

    var isPhone = function () { return window.matchMedia("(max-width: 767px)").matches; };

    function close(item) {
      item.classList.remove("is-open");
      var t = item.querySelector("[data-svc-toggle]");
      if (t) t.setAttribute("aria-expanded", "false");
    }

    function open(item) {
      item.classList.add("is-open");
      var t = item.querySelector("[data-svc-toggle]");
      if (t) t.setAttribute("aria-expanded", "true");
    }

    /*
     * On a phone the open panel is roughly a full screen tall, so leaving one
     * open by default buries the other three below the fold. Start fully
     * collapsed there: the visitor sees all four services at once and picks.
     * On desktop the first stays open, because the space is free.
     */
    function applyDefault() {
      if (isPhone()) items.forEach(close);
    }

    applyDefault();
    window.addEventListener("resize", function () {
      if (isPhone()) return;
      // Coming back to desktop with nothing open leaves an empty-looking list.
      if (!items.some(function (i) { return i.classList.contains("is-open"); })) open(items[0]);
    });

    items.forEach(function (item) {
      var trigger = item.querySelector("[data-svc-toggle]");
      if (!trigger) return;

      trigger.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        items.forEach(close);
        if (!willOpen) return;

        open(item);

        // On a phone, opening a row lower down would otherwise push its own
        // header off-screen. Bring the header back to just under the sticky bar.
        if (isPhone()) {
          var header = document.querySelector("[data-header]");
          var offset = (header ? header.getBoundingClientRect().height : 0) + 8;
          window.requestAnimationFrame(function () {
            var top = window.scrollY + trigger.getBoundingClientRect().top - offset;
            window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
          });
        }
      });
    });
  }

  /* ------------------------------------------- Mega-menu vertical position */

  // The menu is fixed and full-bleed, so it must sit flush under the header
  // whatever height the header resolves to.
  function initMegaOffset() {
    var header = document.querySelector("[data-header]");
    if (!header) return;
    var set = function () {
      document.documentElement.style.setProperty(
        "--mega-top", header.getBoundingClientRect().height + "px"
      );
    };
    set();
    window.addEventListener("resize", set);
  }

  /* ---------------------------------------------------- Testimonial slider */

  /*
   * Progressive enhancement: the track only becomes a slider once JS adds
   * .is-ready. Without it the slides stack and every testimonial stays
   * readable, which also keeps them all in the accessible tree for search.
   */
  function initSlider() {
    var root = document.querySelector("[data-slider]");
    if (!root) return;

    var track = root.querySelector("[data-slider-track]");
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    var prev = root.querySelector("[data-slider-prev]");
    var next = root.querySelector("[data-slider-next]");
    var dotsWrap = root.querySelector("[data-slider-dots]");
    var current = root.querySelector("[data-slider-current]");
    if (!track || slides.length < 2) return;

    track.classList.add("is-ready");

    var index = 0;
    var dots = [];

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider__dot";
        dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
        dot.addEventListener("click", function () { go(i); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function go(i) {
      index = Math.max(0, Math.min(i, slides.length - 1));
      track.style.transform = "translateX(-" + index * 100 + "%)";

      dots.forEach(function (d, di) {
        d.classList.toggle("is-active", di === index);
        d.setAttribute("aria-current", di === index ? "true" : "false");
      });

      // Off-screen slides must not be reachable by keyboard.
      slides.forEach(function (s, si) {
        s.setAttribute("aria-hidden", si === index ? "false" : "true");
        s.querySelectorAll("a, button").forEach(function (el) {
          el.tabIndex = si === index ? 0 : -1;
        });
      });

      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
      if (current) current.textContent = String(index + 1).padStart(2, "0");
    }

    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(index - 1); }
      if (e.key === "ArrowRight") { go(index + 1); }
    });

    // Touch swipe.
    var startX = null;
    root.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    root.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) go(dx < 0 ? index + 1 : index - 1);
      startX = null;
    }, { passive: true });

    go(0);
  }

  /* ------------------------------------------------------------------ Tabs */

  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-tab]"));
    if (!tabs.length) return;

    function show(name) {
      tabs.forEach(function (t) {
        t.setAttribute("aria-selected", String(t.dataset.tab === name));
      });
      document.querySelectorAll("[data-tabpanel]").forEach(function (panel) {
        panel.hidden = panel.dataset.tabpanel !== name;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { show(tab.dataset.tab); });

      // Left/right arrows move between tabs, per the WAI-ARIA tabs pattern.
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (!next) return;
        e.preventDefault();
        next.focus();
        show(next.dataset.tab);
      });
    });
  }

  /* ------------------------------------------------------------------- FAQ */

  function initFaq() {
    document.querySelectorAll("[data-faq]").forEach(function (item) {
      var trigger = item.querySelector("[data-faq-toggle]");
      if (!trigger) return;

      trigger.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(open));
      });
    });
  }

  /* ------------------------------------------------------- Sticky mobile CTA */

  function initMobileCta() {
    var bar = document.querySelector("[data-mobile-cta]");
    var hero = document.querySelector(".hero");
    if (!bar || !hero) return;

    var onScroll = function () {
      bar.classList.toggle("is-visible", window.scrollY > hero.offsetHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------ Prototype forms */

  function initStubForms() {
    document.querySelectorAll("[data-stub-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var note = form.querySelector("[data-stub-note]");
        if (note) {
          note.hidden = false;
        } else {
          window.alert("Prototype only — this form is not connected.");
        }
        form.reset();
      });
    });
  }

  /* ---------------------------------------------------------------- Boot */

  function boot() {
    initHeader();
    initMobileNav();
    initReveal();
    initCounters();
    initServices();
    initMegaOffset();
    initSlider();
    initTabs();
    initFaq();
    initMobileCta();
    initStubForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
