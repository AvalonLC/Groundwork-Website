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
    calculatePricing: () => calculatePricing,
    clampUserCount: () => clampUserCount,
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
