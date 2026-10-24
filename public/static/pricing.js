"use strict";
var GroundworkPricing = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/lib/pricing.ts
  var pricing_exports = {};
  __export(pricing_exports, {
    AI_PACKAGES: () => AI_PACKAGES,
    CALC_PLANS: () => CALC_PLANS,
    PLAN_ADDED_FEATURES: () => PLAN_ADDED_FEATURES,
    PLAN_AI_ALLOWANCE: () => PLAN_AI_ALLOWANCE,
    PLAN_TIER_ORDER: () => PLAN_TIER_ORDER,
    ROI_DEFAULT_HOURLY_COST_USD: () => ROI_DEFAULT_HOURLY_COST_USD,
    ROI_TIME_SAVINGS_FRACTION: () => ROI_TIME_SAVINGS_FRACTION,
    calculatePricing: () => calculatePricing,
    calculateRoi: () => calculateRoi,
    clampUserCount: () => clampUserCount,
    comparePlans: () => comparePlans,
    getAiPackage: () => getAiPackage,
    getPlan: () => getPlan
  });
  var CALC_PLANS = [
    { key: "core", name: "Core", basePrice: 259, includedUsers: 1, perUserPrice: 25 },
    { key: "growth", name: "Growth", basePrice: 359, includedUsers: 5, perUserPrice: 25, badge: "Most popular" },
    { key: "pro", name: "Pro", basePrice: 459, includedUsers: 10, perUserPrice: 25 }
  ];
  var AI_PACKAGES = [
    { key: "included", label: "Included AI", optionText: "Included AI \u2014 $0/mo (plan allowance)", price: 0, lineLabel: "Included AI" },
    { key: "essentials", label: "AI Essentials", optionText: "AI Essentials \u2014 $12/mo (500 actions)", price: 12, lineLabel: "AI Essentials" },
    { key: "plus", label: "AI Plus", optionText: "AI Plus \u2014 $29/mo (1,500 actions)", price: 29, lineLabel: "AI Plus" },
    { key: "max", label: "AI Max", optionText: "AI Max \u2014 $59/mo (5,000 actions)", price: 59, lineLabel: "AI Max" },
    { key: "byok", label: "Use my own API key", optionText: "Use my own API key \u2014 $0 Groundwork charge", price: 0, lineLabel: "Your API key (BYOK)" },
    { key: "custom", label: "Custom", optionText: "Custom \u2014 contact sales", price: null, lineLabel: "Custom" }
  ];
  function clampUserCount(v) {
    if (!Number.isFinite(v) || v < 1) return 1;
    if (v > 999) return 999;
    return Math.round(v);
  }
  function getPlan(planKey) {
    return CALC_PLANS.find((p) => p.key === planKey);
  }
  function getAiPackage(aiKey) {
    return AI_PACKAGES.find((a) => a.key === aiKey);
  }
  var PLAN_TIER_ORDER = ["core", "growth", "pro"];
  var PLAN_ADDED_FEATURES = {
    core: [
      "Pipeline, Leads, Clients & Properties",
      "Estimates & proposals",
      "Communications & templates",
      "Schedule Board & Dispatch",
      "Work Orders & Time Tracker",
      "Invoices & Payments",
      "Field Mode (mobile) & After Action Reports"
    ],
    growth: [
      "Business Pulse, Money Loop & Operations Snapshot",
      "Budget & Rates \u2014 burdened labor & equipment costing",
      "Recurring services & asset/maintenance tracking",
      "Deposits & statements",
      "Approval queue",
      "Academy \u2014 role-based training"
    ],
    pro: [
      "Automation Center & workflow builder",
      "Audit log",
      "Client Portal \u2014 invite, activity log, preview as client",
      "Groundwork AI Coach \u2014 owner-level at-risk deal alerts",
      "System config, custom templates & AAR question builder",
      "SSO / SAML",
      "API access",
      "Dedicated success manager",
      "Bring your own OpenAI API key available"
    ]
  };
  var PLAN_AI_ALLOWANCE = {
    core: "100 AI actions/mo included",
    growth: "250 AI actions/mo included",
    pro: "500 AI actions/mo included"
  };
  function comparePlans(planKeyA, planKeyB) {
    const planA = getPlan(planKeyA);
    if (!planA) return { ok: false, error: `Unknown plan "${planKeyA}". Valid plans: ${CALC_PLANS.map((p) => p.key).join(", ")}.` };
    const planB = getPlan(planKeyB);
    if (!planB) return { ok: false, error: `Unknown plan "${planKeyB}". Valid plans: ${CALC_PLANS.map((p) => p.key).join(", ")}.` };
    if (planA.key === planB.key) {
      return { ok: false, error: "Pick two different plans to compare." };
    }
    const idxA = PLAN_TIER_ORDER.indexOf(planA.key);
    const idxB = PLAN_TIER_ORDER.indexOf(planB.key);
    const [lowIdx, highIdx] = idxA < idxB ? [idxA, idxB] : [idxB, idxA];
    const addedGoingUp = [];
    for (let i = lowIdx + 1; i <= highIdx; i++) {
      addedGoingUp.push(...PLAN_ADDED_FEATURES[PLAN_TIER_ORDER[i]]);
    }
    const onlyInB = idxA < idxB ? addedGoingUp : [];
    const onlyInA = idxA > idxB ? addedGoingUp : [];
    const toSide = (p) => {
      var _a;
      return {
        key: p.key,
        name: p.name,
        basePrice: p.basePrice,
        includedUsers: p.includedUsers,
        perUserPrice: p.perUserPrice,
        aiAllowance: (_a = PLAN_AI_ALLOWANCE[p.key]) != null ? _a : "See plan details"
      };
    };
    return {
      ok: true,
      planA: toSide(planA),
      planB: toSide(planB),
      onlyInB,
      onlyInA,
      assumptions: [
        `${planA.name}: $${planA.basePrice}/mo base, includes ${planA.includedUsers} user${planA.includedUsers === 1 ? "" : "s"}, then $${planA.perUserPrice}/mo per additional user.`,
        `${planB.name}: $${planB.basePrice}/mo base, includes ${planB.includedUsers} user${planB.includedUsers === 1 ? "" : "s"}, then $${planB.perUserPrice}/mo per additional user.`,
        "Base prices shown here exclude any optional AI add-on package and any additional-user cost beyond what\u2019s included \u2014 use get_pricing_estimate for an exact total at a specific team size."
      ]
    };
  }
  var ROI_TIME_SAVINGS_FRACTION = 0.3;
  var ROI_DEFAULT_HOURLY_COST_USD = 35;
  var WEEKS_PER_MONTH = 4.33;
  function calculateRoi(adminHoursPerWeekInput, hourlyCostUsdInput, planKey, totalUsersInput, aiPackageKey) {
    if (!Number.isFinite(adminHoursPerWeekInput) || adminHoursPerWeekInput < 0) {
      return { ok: false, error: 'Field "admin_hours_per_week" must be a non-negative number.' };
    }
    const adminHoursPerWeek = Math.min(adminHoursPerWeekInput, 168);
    const hourlyCostUsd = Number.isFinite(hourlyCostUsdInput) && hourlyCostUsdInput > 0 ? hourlyCostUsdInput : ROI_DEFAULT_HOURLY_COST_USD;
    const hoursSavedPerWeek = adminHoursPerWeek * ROI_TIME_SAVINGS_FRACTION;
    const hoursSavedPerMonth = hoursSavedPerWeek * WEEKS_PER_MONTH;
    const dollarsSavedPerMonth = hoursSavedPerMonth * hourlyCostUsd;
    const assumptions = [
      `Estimate assumes ~${Math.round(ROI_TIME_SAVINGS_FRACTION * 100)}% of current admin/scheduling/invoicing time is reclaimed by consolidating into one system \u2014 a planning estimate, not a guarantee, and it will vary by business.`,
      `Based on ${adminHoursPerWeek} admin hour${adminHoursPerWeek === 1 ? "" : "s"}/week today at an assumed $${hourlyCostUsd}/hr loaded cost${Number.isFinite(hourlyCostUsdInput) && hourlyCostUsdInput > 0 ? "" : " (default \u2014 tell me your real number for a more accurate estimate)"}.`
    ];
    let subscriptionCostUsd = null;
    let netMonthlyValueUsd = null;
    if (planKey) {
      const totalUsers = Number.isFinite(totalUsersInput) ? totalUsersInput : 1;
      const pricing = calculatePricing(planKey, totalUsers, aiPackageKey || "included");
      if (!pricing.ok) return pricing;
      if (pricing.grandTotal !== null) {
        subscriptionCostUsd = pricing.grandTotal;
        netMonthlyValueUsd = dollarsSavedPerMonth - subscriptionCostUsd;
        assumptions.push(`Compared against the ${pricing.planName} plan at $${pricing.grandTotal}/mo (see get_pricing_estimate for the full breakdown).`);
      } else {
        assumptions.push(`${pricing.planName} plan with a Custom AI package has no fixed number to net against \u2014 contact sales for that quote.`);
      }
    }
    return {
      ok: true,
      adminHoursPerWeek,
      hourlyCostUsd,
      hoursSavedPerWeek: Math.round(hoursSavedPerWeek * 10) / 10,
      hoursSavedPerMonth: Math.round(hoursSavedPerMonth * 10) / 10,
      dollarsSavedPerMonth: Math.round(dollarsSavedPerMonth),
      subscriptionCostUsd,
      netMonthlyValueUsd: netMonthlyValueUsd !== null ? Math.round(netMonthlyValueUsd) : null,
      assumptions
    };
  }
  function calculatePricing(planKey, totalUsersInput, aiPackageKey) {
    const plan = getPlan(planKey);
    if (!plan) {
      return { ok: false, error: `Unknown plan "${planKey}". Valid plans: ${CALC_PLANS.map((p) => p.key).join(", ")}.` };
    }
    const aiPackage = getAiPackage(aiPackageKey);
    if (!aiPackage) {
      return { ok: false, error: `Unknown AI package "${aiPackageKey}". Valid packages: ${AI_PACKAGES.map((a) => a.key).join(", ")}.` };
    }
    const totalUsers = clampUserCount(totalUsersInput);
    const additionalUsers = Math.max(0, totalUsers - plan.includedUsers);
    const additionalUsersCost = additionalUsers * plan.perUserPrice;
    const isCustomAi = aiPackage.price === null;
    const grandTotal = isCustomAi ? null : plan.basePrice + additionalUsersCost + aiPackage.price;
    const assumptions = [
      `${plan.name} base platform fee: $${plan.basePrice}/mo (includes ${plan.includedUsers} user${plan.includedUsers === 1 ? "" : "s"})`
    ];
    if (additionalUsers > 0) {
      assumptions.push(`${additionalUsers} additional user${additionalUsers === 1 ? "" : "s"} beyond the included allotment \xD7 $${plan.perUserPrice}/mo = $${additionalUsersCost}/mo`);
    } else {
      assumptions.push(`${totalUsers} total user${totalUsers === 1 ? "" : "s"} \u2014 within the ${plan.includedUsers} included in the base fee, so $0/mo in additional user cost`);
    }
    if (isCustomAi) {
      assumptions.push(`${aiPackage.label}: priced individually \u2014 contact sales for a number`);
    } else {
      assumptions.push(`${aiPackage.label}: $${aiPackage.price}/mo, billed once per company (not per user)`);
    }
    assumptions.push("All figures are monthly, billed monthly. Customer-portal / external logins are never counted or charged.");
    return {
      ok: true,
      planKey: plan.key,
      planName: plan.name,
      basePrice: plan.basePrice,
      includedUsers: plan.includedUsers,
      perUserPrice: plan.perUserPrice,
      totalUsers,
      additionalUsers,
      additionalUsersCost,
      aiPackageKey: aiPackage.key,
      aiPackageLabel: aiPackage.label,
      aiPrice: aiPackage.price,
      isCustomAi,
      grandTotal,
      assumptions
    };
  }
  return __toCommonJS(pricing_exports);
})();
