# BPS Onchain Commerce

**Status:** Experimental / Web3 Lab  
**Version:** v0.1 planning baseline

BPS Onchain Commerce is an experimental commerce layer for verified USDC payments and interactions on Base.

The project is intentionally separate from the main BPS website. Its purpose is to test a small, verifiable payment vertical without turning the production BPS site into a Web3 laboratory.

## v0.1 goal

Prove one complete flow on Base Sepolia:

```text
BPS Product
  → server-authoritative Order
  → Base Pay
  → USDC on Base Sepolia
  → transaction hash
  → server-side payment verification
  → Verified Purchase
```

## Current technical direction

- Next.js + TypeScript
- Base Account SDK (`@base-org/account`)
- Base Pay for USDC payments
- Base Sepolia for test transactions
- `@base-org/account-ui` for the initial UI layer
- server-authoritative product pricing
- server-side verification with `getPaymentStatus()`
- replay protection by tracking processed transaction IDs

The project does **not** use the deprecated OnchainKit architecture as its foundation.

## Core rule

The browser is never the source of truth for payment amount or payment completion.

A client submits an order intent such as `productId` and `quantity`. The server resolves the canonical product and price, creates the order, and only marks it as verified after independently validating the Base payment.

## Planned v0.1 architecture

```text
Client
  │
  ├─ POST /api/orders
  │      └─ server validates product + canonical price
  │
  ├─ Base Pay
  │      └─ USDC / Base Sepolia
  │
  └─ POST /api/orders/:id/verify
         └─ getPaymentStatus(transactionHash, testnet=true)
                └─ verify completed + recipient + amount
                       └─ order = VERIFIED
```

## Payment-provider boundary

The commerce model should not depend permanently on one payment provider.

```text
PaymentProvider
  ├─ base-pay             # v0.1
  ├─ direct-usdc          # possible future path
  └─ coinbase-business   # future adapter when regionally available
```

## Roadmap

The first milestone is deliberately narrow: a verified test purchase on Base Sepolia.

Possible later layers:

```text
Verified Purchase
  → BPS Identity
  → Verified Interaction / Review
  → CID / IPFS
  → optional smart-contract logic
```

These later layers are not part of the initial v0.1 payment proof.

## Reference documentation

- Base — Web (Next.js) Quickstart: https://docs.base.org/base-account/quickstart/web-react
- Base — Accept Payments: https://docs.base.org/base-account/guides/accept-payments
- Base — `pay()`: https://docs.base.org/base-account/reference/base-pay/pay
- Base — `getPaymentStatus()`: https://docs.base.org/base-account/reference/base-pay/getPaymentStatus

## Repository role

This repository is a BPS experimental technical asset. The main BPS product remains separate and can consume proven modules later through an explicit integration decision.
