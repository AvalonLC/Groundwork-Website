// Unit tests for the single shared pricing-calculation function.
//
// These tests exist primarily to GUARANTEE "one pricing calculation, not
// two": the chatbot's get_pricing_estimate tool and the human-facing
// PricingCalculator/site.js widget both call calculatePricing() from
// src/lib/pricing.ts. As long as both call sites keep importing this same
// function (verified separately by grep/build, see tests/integration), any
// test that pins this function's behavior pins BOTH surfaces at once.
//
// Run with: node --test --experimental-strip-types tests/unit/pricing.test.ts
// (or via `npm test`, which runs all files under tests/unit/).

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculatePricing, CALC_PLANS, AI_PACKAGES, clampUserCount } from '../../src/lib/pricing.ts'

test('core plan, included AI, no extra users -> base price only', () => {
  const r = calculatePricing('core', 1, 'included')
  assert.equal(r.ok, true)
  if (!r.ok) return
  assert.equal(r.basePrice, 259)
  assert.equal(r.additionalUsers, 0)
  assert.equal(r.additionalUsersCost, 0)
  assert.equal(r.aiPrice, 0)
  assert.equal(r.grandTotal, 259)
})

test('growth plan, 6 users (1 over included 5), AI Plus -> $413/mo', () => {
  const r = calculatePricing('growth', 6, 'plus')
  assert.equal(r.ok, true)
  if (!r.ok) return
  assert.equal(r.basePrice, 359)
  assert.equal(r.includedUsers, 5)
  assert.equal(r.additionalUsers, 1)
  assert.equal(r.additionalUsersCost, 25)
  assert.equal(r.aiPrice, 29)
  assert.equal(r.grandTotal, 413)
})

test('pro plan, exactly included user count -> zero additional-user cost', () => {
  const r = calculatePricing('pro', 10, 'essentials')
  assert.equal(r.ok, true)
  if (!r.ok) return
  assert.equal(r.additionalUsers, 0)
  assert.equal(r.additionalUsersCost, 0)
  assert.equal(r.grandTotal, 459 + 12)
})

test('custom AI package ("Contact sales") -> grandTotal is null, isCustomAi true, assumptions still populated', () => {
  const r = calculatePricing('pro', 12, 'custom')
  assert.equal(r.ok, true)
  if (!r.ok) return
  assert.equal(r.isCustomAi, true)
  assert.equal(r.grandTotal, null)
  assert.equal(r.aiPrice, null)
  assert.ok(Array.isArray(r.assumptions) && r.assumptions.length > 0, 'assumptions must be populated even for custom AI')
  assert.ok(
    r.assumptions.some((a) => /contact sales/i.test(a)),
    'assumptions must mention contacting sales for custom pricing'
  )
})

test('byok AI package -> $0 AI price (bring your own key), distinct from included', () => {
  const r = calculatePricing('core', 1, 'byok')
  assert.equal(r.ok, true)
  if (!r.ok) return
  assert.equal(r.aiPrice, 0)
  assert.equal(r.aiPackageKey, 'byok')
})

test('unknown plan key -> explicit error, not a thrown exception', () => {
  const r = calculatePricing('enterprise-made-up', 5, 'included')
  assert.equal(r.ok, false)
  if (r.ok) return
  assert.ok(typeof r.error === 'string' && r.error.length > 0)
})

test('unknown AI package key -> explicit error', () => {
  const r = calculatePricing('core', 5, 'not-a-real-package')
  assert.equal(r.ok, false)
})

test('clampUserCount rounds fractional input and clamps negative/zero/absurd inputs to a sane positive integer', () => {
  assert.equal(clampUserCount(-5), 1)
  assert.equal(clampUserCount(0), 1)
  assert.equal(clampUserCount(3.7), 4) // rounds, does not floor
  assert.equal(clampUserCount(3.2), 3)
  assert.equal(clampUserCount(NaN), 1)
  assert.ok(clampUserCount(999999) <= 1000, 'should have some reasonable upper bound, not literally unbounded')
})

test('every CALC_PLANS entry has positive basePrice/perUserPrice and non-empty name', () => {
  for (const plan of CALC_PLANS) {
    assert.ok(plan.basePrice > 0, `${plan.key} basePrice must be positive`)
    assert.ok(plan.perUserPrice > 0, `${plan.key} perUserPrice must be positive`)
    assert.ok(plan.name.length > 0)
  }
})

test('every AI_PACKAGES entry has a price that is either a non-negative number or null (custom)', () => {
  for (const pkg of AI_PACKAGES) {
    if (pkg.price !== null) {
      assert.ok(pkg.price >= 0, `${pkg.key} price must be >= 0 or null`)
    } else {
      assert.equal(pkg.key, 'custom', 'only the "custom" package should have a null price')
    }
  }
})

test('additional-user cost scales linearly with the per-user rate', () => {
  const r5 = calculatePricing('growth', 10, 'included') // 5 extra over 5 included
  const r10 = calculatePricing('growth', 15, 'included') // 10 extra over 5 included
  assert.equal(r5.ok, true)
  assert.equal(r10.ok, true)
  if (!r5.ok || !r10.ok) return
  assert.equal(r5.additionalUsersCost, 5 * 25)
  assert.equal(r10.additionalUsersCost, 10 * 25)
})
