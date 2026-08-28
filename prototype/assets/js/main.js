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

    // Mega-menu: hover on pointer devices, click/Escape everywhere, with grace buffer.
    document.querySelectorAll("[data-megamenu]").forEach(function (item) {
      var trigger = item.querySelector(".nav__link");
      if (!trigger) return;

      var closeTimer = null;

      var open = function (state) {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        item.classList.toggle("is-open", state);
        trigger.setAttribute("aria-expanded", String(state));
      };

      item.addEventListener("mouseenter", function () {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        open(true);
      });

      item.addEventListener("mouseleave", function () {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          open(false);
        }, 260); // 260ms grace period so moving cursor diagonally never closes the mega menu
      });

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
    // Automatically equip key UI components with staggered scroll-reveal
    var staggerSelectors = [
      ".svc-grid > .svc-card",
      ".bento > .bento__tile",
      ".stats-row > .stat",
      ".cards-carousel > .card-work",
      ".process__step",
      ".reason",
      ".post-card",
      ".growth-card"
    ];

    staggerSelectors.forEach(function (sel) {
      var els = document.querySelectorAll(sel);
      els.forEach(function (el, idx) {
        if (!el.hasAttribute("data-reveal")) {
          el.setAttribute("data-reveal", "");
          el.setAttribute("data-reveal-delay", String((idx % 4) * 80));
        }
      });
    });

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
          var delay = Number(entry.target.dataset.revealDelay || 0);
          if (delay > 0) {
            setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, delay);
          } else {
            entry.target.classList.add("is-visible");
          }
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
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

        /*
         * Closing the currently-open row removes ~1,400px from the document.
         * If that row sits ABOVE the one being clicked, everything below it
         * shifts up by that amount while the scroll position stays put — so
         * the page appears to leap downwards and the row you clicked vanishes
         * off the top. Measure the trigger's viewport position before the
         * mutation and restore it afterwards, so the row you touched stays
         * exactly where your eye already is.
         */
        var beforeTop = trigger.getBoundingClientRect().top;

        items.forEach(close);
        if (willOpen) open(item);

        var header = document.querySelector("[data-header]");
        var headerH = header ? header.getBoundingClientRect().height : 0;

        if (isPhone() && willOpen) {
          // On mobile, smoothly bring the top of the clicked service into view at the first fold
          setTimeout(function () {
            var header = document.querySelector("[data-header]");
            var headerH = header ? header.getBoundingClientRect().height : 0;
            var targetY = window.pageYOffset + item.getBoundingClientRect().top - headerH - 8;
            window.scrollTo({
              top: targetY,
              behavior: reduceMotion ? "auto" : "smooth"
            });
          }, 100);
          return;
        }

        /*
         * The panel animates its height over ~520ms, so the layout keeps
         * shifting frame by frame. Correcting once on the next frame catches
         * the animation mid-flight and lands in the wrong place — so re-anchor
         * every frame until it settles.
         */
        var deadline = performance.now() + 620;

        (function pin() {
          var delta = trigger.getBoundingClientRect().top - beforeTop;
          if (Math.abs(delta) > 0.5) window.scrollBy({ top: delta, behavior: "auto" });
          if (performance.now() < deadline) window.requestAnimationFrame(pin);
        })();
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

  /* -------------------------------------------------------- Mega-menu panes */

  // The service list on the left drives the sub-service pane on the right.
  // Hover and focus both switch it, so it works for pointer and keyboard.
  function initMegaPanes() {
    var rows = Array.prototype.slice.call(document.querySelectorAll("[data-mega-tab]"));
    if (!rows.length) return;

    var panels = document.querySelectorAll("[data-mega-panel]");

    function show(key) {
      rows.forEach(function (r) {
        var on = r.dataset.megaTab === key;
        r.classList.toggle("is-active", on);
        r.setAttribute("aria-selected", String(on));
      });
      panels.forEach(function (pnl) { pnl.hidden = pnl.dataset.megaPanel !== key; });
    }

    rows.forEach(function (row) {
      row.addEventListener("mouseenter", function () { show(row.dataset.megaTab); });
      row.addEventListener("focus", function () { show(row.dataset.megaTab); });
      row.addEventListener("click", function () { show(row.dataset.megaTab); });
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

  /* ---------------------------------------------------- Carousel controls */

  function initCarouselControls() {
    var navs = Array.prototype.slice.call(document.querySelectorAll("[data-carousel-controls]"));
    navs.forEach(function (nav) {
      var section = nav.closest("section, .container") || nav.parentElement;
      var track = section ? section.querySelector("[data-carousel-track], .stories, .posts, .solutions, .industries") : null;
      if (!track) return;

      var prev = nav.querySelector("[data-carousel-prev]");
      var next = nav.querySelector("[data-carousel-next]");

      function updateDisabled() {
        if (prev) {
          prev.disabled = track.scrollLeft <= 6;
        }
        if (next) {
          var maxScroll = track.scrollWidth - track.clientWidth - 6;
          next.disabled = track.scrollLeft >= maxScroll;
        }
      }

      if (prev) {
        prev.addEventListener("click", function () {
          var card = track.firstElementChild;
          var step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.85;
          track.scrollBy({ left: -step, behavior: reduceMotion ? "auto" : "smooth" });
        });
      }

      if (next) {
        next.addEventListener("click", function () {
          var card = track.firstElementChild;
          var step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.85;
          track.scrollBy({ left: step, behavior: reduceMotion ? "auto" : "smooth" });
        });
      }

      track.addEventListener("scroll", updateDisabled, { passive: true });
      window.addEventListener("resize", updateDisabled);
      updateDisabled();
    });
  }

  /* ---------------------------------------------------- Scroll to top */

  function initScrollTop() {
    var btn = document.querySelector("[data-scroll-top]");
    if (!btn) return;

    var onScroll = function () {
      btn.classList.toggle("is-visible", window.scrollY > 380);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------- Portfolio Filters */

  function initPortfolioFilters() {
    var filterBtns = document.querySelectorAll("[data-portfolio-filter]");
    var items = document.querySelectorAll("[data-portfolio-category]");
    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetCat = btn.getAttribute("data-portfolio-filter");
        
        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        items.forEach(function (item) {
          var itemCats = (item.getAttribute("data-portfolio-category") || "").split(" ");
          if (targetCat === "all" || itemCats.indexOf(targetCat) !== -1) {
            item.style.display = "";
            setTimeout(function () {
              item.style.opacity = "1";
              item.style.transform = "none";
            }, 20);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.96)";
            setTimeout(function () {
              item.style.display = "none";
            }, 250);
          }
        });
      });
    });
  }

  /* ------------------------------------------------ Corporate Services Tabs */
  function initCorpServicesTabs() {
    var tabs = document.querySelectorAll(".corp-svc-tab");
    var panels = document.querySelectorAll(".corp-svc-panel");
    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var targetId = tab.getAttribute("data-tab-target");
        if (!targetId) return;

        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });

        panels.forEach(function (p) {
          p.classList.remove("is-active");
        });

        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");

        var activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add("is-active");
        }
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
    initCarouselControls();
    initMegaPanes();
    initFaq();
    initScrollTop();
    initStubForms();
    initPortfolioFilters();
    initCorpServicesTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
