# BPS Onchain Commerce v0.1 — Implementation Sequence

## Milestone A — Quickstart baseline

- Next.js + TypeScript baseline
- Base Account SDK and Base Account UI
- Base Pay configured for Base Sepolia
- test payment result displayed in the browser
- diagnostic `getPaymentStatus(..., testnet: true)` check

This milestone proves SDK connectivity only. It is not a verified purchase implementation.

## Milestone B — Server-authoritative order

The browser submits only an order intent such as `productId` and `quantity`.

The server resolves:

- canonical product
- canonical unit price
- total amount
- expected recipient
- order ID

## Milestone C — Server payment verification

The server receives `orderId` + transaction ID and calls `getPaymentStatus()` with `testnet: true`.

Before marking an order verified, validate:

1. payment status is `completed`;
2. amount equals the canonical order amount;
3. recipient equals the configured BPS test recipient;
4. transaction ID has not already been processed;
5. when BPS Identity is later present, sender matches the authenticated identity.

Only then can the order become `VERIFIED`.

## Milestone D — persistence

Replace any temporary lab-state implementation with a persistent store and a unique constraint on transaction ID before treating the flow as production-capable.
