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

  /* ------------------------------------------------------- Process stepper */

  function initProcess() {
    var stages = document.querySelectorAll("[data-stage]");
    if (!stages.length) return;

    stages.forEach(function (stage) {
      var activate = function () {
        stages.forEach(function (s) { s.classList.remove("is-active"); });
        stage.classList.add("is-active");
      };
      stage.addEventListener("mouseenter", activate);
      stage.addEventListener("focusin", activate);
    });
  }

  /* --------------------------------------------------------- ROI calculator */

  /*
   * Deliberately conservative. Uplift assumptions sit at the LOW end of
   * realistic agency results and are stated openly on the page — an inflated
   * calculator destroys credibility with exactly the sophisticated buyer it
   * is meant to attract.
   *
   * PLACEHOLDER BENCHMARKS: replace with GTech's own campaign data.
   */
  /*
   * `margin` is the gross contribution margin. ROI is calculated on PROFIT,
   * not revenue — quoting ROI on revenue overstates return by 2-3x and is the
   * most common dishonesty in agency calculators.
   *
   * `traffic` is a sensible starting point per sector, so a high-ticket B2B
   * default does not open on e-commerce traffic volumes and produce nonsense.
   *
   * `closeRate` is the critical one. In transactional sectors a conversion IS
   * the sale, so it is 1. In lead-generation sectors a conversion is an
   * ENQUIRY, and only a fraction become customers — treating every enquiry as
   * a closed deal at full value inflates the result several times over.
   */
  var INDUSTRY = {
    ecommerce:    { label: "E-commerce",             traffic: 25000, cvr: 2.0, aov: 65,   closeRate: 1.00, margin: 0.40, trafficLift: 0.55, cvrLift: 0.20 },
    hospitality:  { label: "Hospitality & Leisure",  traffic: 15000, cvr: 3.2, aov: 48,   closeRate: 1.00, margin: 0.65, trafficLift: 0.60, cvrLift: 0.22 },
    professional: { label: "Professional Services",  traffic: 4000,  cvr: 2.6, aov: 1800, closeRate: 0.25, margin: 0.50, trafficLift: 0.45, cvrLift: 0.25 },
    healthcare:   { label: "Healthcare & Dental",    traffic: 6000,  cvr: 3.5, aov: 850,  closeRate: 0.35, margin: 0.55, trafficLift: 0.50, cvrLift: 0.18 },
    b2bsaas:      { label: "B2B SaaS",               traffic: 3000,  cvr: 1.4, aov: 4200, closeRate: 0.20, margin: 0.75, trafficLift: 0.40, cvrLift: 0.28 },
    trades:       { label: "Trades & Home Services", traffic: 5000,  cvr: 4.0, aov: 1200, closeRate: 0.30, margin: 0.35, trafficLift: 0.65, cvrLift: 0.15 }
  };

  /*
   * Beyond this the model is extrapolating well past anything it can support,
   * so the figure is shown as a floor ("500%+") rather than a false precision.
   */
  var ROI_DISPLAY_CAP = 500;

  function initCalculator() {
    var form = document.querySelector("[data-calc]");
    if (!form) return;

    var gbp0 = new Intl.NumberFormat("en-GB", {
      style: "currency", currency: "GBP", maximumFractionDigits: 0
    });
    var num = new Intl.NumberFormat("en-GB");

    var el = function (name) { return form.querySelector('[data-calc-field="' + name + '"]'); };
    var out = function (name) { return document.querySelector('[data-calc-out="' + name + '"]'); };

    var fields = {
      industry: el("industry"),
      traffic: el("traffic"),
      trafficNum: el("trafficNum"),
      cvr: el("cvr"),
      cvrNum: el("cvrNum"),
      aov: el("aov"),
      aovNum: el("aovNum"),
      budget: el("budget"),
      budgetNum: el("budgetNum")
    };

    function goal() {
      var checked = form.querySelector('input[name="goal"]:checked');
      return checked ? checked.value : "both";
    }

    function compute() {
      var industry = INDUSTRY[fields.industry.value] || INDUSTRY.ecommerce;
      var traffic = Number(fields.traffic.value);
      var cvr = Number(fields.cvr.value) / 100;
      var aov = Number(fields.aov.value);
      var budget = Number(fields.budget.value);
      var g = goal();

      // Only the levers matching the stated goal are applied.
      var trafficLift = g === "conversion" ? 0 : industry.trafficLift;
      var cvrLift = g === "traffic" ? 0 : industry.cvrLift;

      // Budget scaling: the benchmark assumes ~£5k/month. Dampened with a
      // square root so larger budgets show realistic diminishing returns
      // rather than a straight line, and capped at 1.5x.
      var scale = Math.min(Math.sqrt(budget / 5000), 1.5);
      trafficLift *= scale;
      cvrLift *= scale;

      // Only the share of conversions that actually close counts as revenue.
      var value = aov * industry.closeRate;

      var currentRevenue = traffic * cvr * value;
      // Month 6 is modelled at 60% of the 12-month uplift — SEO and paid
      // campaigns ramp rather than switch on.
      var revenue6 = traffic * (1 + trafficLift * 0.6) * (cvr * (1 + cvrLift * 0.6)) * value;
      var revenue12 = traffic * (1 + trafficLift) * (cvr * (1 + cvrLift)) * value;

      var uplift = revenue12 - currentRevenue;
      var annualUplift = uplift * 12;

      // ROI is measured on gross profit, never on revenue.
      var annualProfitUplift = annualUplift * industry.margin;
      var annualCost = budget * 12;
      var roi = annualCost > 0 ? ((annualProfitUplift - annualCost) / annualCost) * 100 : 0;

      // Break-even: first month where cumulative profit uplift clears cumulative spend.
      var breakEven = null;
      var cumulativeProfit = 0;
      for (var m = 1; m <= 24; m++) {
        var ramp = Math.min(m / 12, 1);
        cumulativeProfit += uplift * ramp * industry.margin;
        if (cumulativeProfit >= budget * m) { breakEven = m; break; }
      }

      return {
        currentRevenue: currentRevenue,
        revenue6: revenue6,
        revenue12: revenue12,
        uplift: uplift,
        annualUplift: annualUplift,
        annualProfitUplift: annualProfitUplift,
        roi: roi,
        capped: roi > ROI_DISPLAY_CAP,
        breakEven: breakEven,
        margin: industry.margin,
        industryLabel: industry.label
      };
    }

    function render() {
      var r = compute();

      var setText = function (name, value) {
        var node = out(name);
        if (node) node.textContent = value;
      };

      setText("uplift", gbp0.format(Math.round(r.uplift)));
      setText("current", gbp0.format(Math.round(r.currentRevenue)));
      setText("month6", gbp0.format(Math.round(r.revenue6)));
      setText("month12", gbp0.format(Math.round(r.revenue12)));
      setText("annual", gbp0.format(Math.round(r.annualUplift)));

      // Past the cap the model is extrapolating — show a floor, not false precision.
      if (r.capped) {
        setText("roi", ROI_DISPLAY_CAP + "%+");
        setText("ratio", (ROI_DISPLAY_CAP / 100 + 1).toFixed(0) + ":1+");
      } else {
        setText("roi", (r.roi >= 0 ? "+" : "") + Math.round(r.roi) + "%");
        setText("ratio", Math.max(r.roi / 100 + 1, 0).toFixed(1) + ":1");
      }

      setText("breakeven", r.breakEven
        ? r.breakEven + (r.breakEven === 1 ? " month" : " months")
        : "24+ months");

      var cap = document.querySelector("[data-calc-cap]");
      if (cap) cap.hidden = !r.capped;

      // Comparison bars, scaled against the larger of the two figures.
      var max = Math.max(r.currentRevenue, r.revenue12) || 1;
      var barCurrent = document.querySelector('[data-calc-bar="current"]');
      var barProjected = document.querySelector('[data-calc-bar="projected"]');
      if (barCurrent) {
        barCurrent.style.width = Math.max((r.currentRevenue / max) * 100, 14) + "%";
        barCurrent.textContent = gbp0.format(Math.round(r.currentRevenue));
      }
      if (barProjected) {
        barProjected.style.width = Math.max((r.revenue12 / max) * 100, 14) + "%";
        barProjected.textContent = gbp0.format(Math.round(r.revenue12));
      }

      syncUrl();
    }

    // Keep each slider and its number input in step.
    function pair(slider, number, format) {
      if (!slider || !number) return;
      var display = slider.parentElement.parentElement.querySelector("[data-calc-display]");

      var sync = function (source) {
        var value = Number(source.value);
        if (source === slider) {
          number.value = value;
        } else {
          value = Math.min(Math.max(value, Number(slider.min)), Number(slider.max));
          slider.value = value;
        }
        if (display) display.textContent = format ? format(value) : value;
        render();
      };

      slider.addEventListener("input", function () { sync(slider); });
      number.addEventListener("input", function () { sync(number); });
      sync(slider);
    }

    // Results are shareable — all inputs live in the URL query string.
    function syncUrl() {
      if (!window.history.replaceState) return;
      var params = new URLSearchParams({
        i: fields.industry.value,
        t: fields.traffic.value,
        c: fields.cvr.value,
        a: fields.aov.value,
        b: fields.budget.value,
        g: goal()
      });
      window.history.replaceState(null, "", "?" + params.toString() + "#roi-calculator");
    }

    function readUrl() {
      var params = new URLSearchParams(window.location.search);
      if (!params.has("i")) return false;
      var map = { i: "industry", t: "traffic", c: "cvr", a: "aov", b: "budget" };
      Object.keys(map).forEach(function (key) {
        var field = fields[map[key]];
        if (field && params.has(key)) field.value = params.get(key);
      });
      var g = params.get("g");
      if (g) {
        var radio = form.querySelector('input[name="goal"][value="' + g + '"]');
        if (radio) radio.checked = true;
      }
      return true;
    }

    // Selecting an industry pre-fills its benchmark conversion rate and AOV.
    fields.industry.addEventListener("change", function () {
      var industry = INDUSTRY[fields.industry.value];
      if (!industry) return;
      fields.traffic.value = industry.traffic;
      fields.trafficNum.value = industry.traffic;
      fields.cvr.value = industry.cvr;
      fields.cvrNum.value = industry.cvr;
      fields.aov.value = industry.aov;
      fields.aovNum.value = industry.aov;
      refreshDisplays();
      render();
    });

    function refreshDisplays() {
      var rows = form.querySelectorAll(".calc__row");
      rows.forEach(function (row) {
        var slider = row.querySelector(".range");
        var display = row.querySelector("[data-calc-display]");
        if (!slider || !display) return;
        var value = Number(slider.value);
        var name = slider.dataset.calcField;
        if (name === "traffic") display.textContent = num.format(value);
        else if (name === "cvr") display.textContent = value + "%";
        else display.textContent = gbp0.format(value);
        var number = form.querySelector('[data-calc-field="' + name + 'Num"]');
        if (number) number.value = value;
      });
    }

    form.querySelectorAll('input[name="goal"]').forEach(function (radio) {
      radio.addEventListener("change", render);
    });

    readUrl();
    pair(fields.traffic, fields.trafficNum, function (v) { return num.format(v); });
    pair(fields.cvr, fields.cvrNum, function (v) { return v + "%"; });
    pair(fields.aov, fields.aovNum, function (v) { return gbp0.format(v); });
    pair(fields.budget, fields.budgetNum, function (v) { return gbp0.format(v); });
    refreshDisplays();
    render();

    // Gated detail form — prototype only, no submission.
    var gate = document.querySelector("[data-calc-gate]");
    if (gate) {
      gate.addEventListener("submit", function (e) {
        e.preventDefault();
        gate.innerHTML =
          '<p style="font-size:14px;color:#fff;margin:0;">' +
          "Thanks — your full breakdown is on its way. " +
          "<em>(Prototype: no email is actually sent.)</em></p>";
      });
    }
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
    initProcess();
    initCalculator();
    initMobileCta();
    initStubForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
