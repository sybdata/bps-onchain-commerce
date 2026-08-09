# BPS Onchain Commerce — Agent Notes

## Scope

This repository is an experimental BPS commerce lab. Keep changes small, reviewable, and aligned with the official Base documentation.

## v0.1 rules

- Use Base Sepolia only for payment testing.
- Never commit private keys, seed phrases, API secrets, or wallet recovery data.
- Never trust a payment amount supplied by the browser as canonical order pricing.
- Never fulfill an order from a client-side payment result alone.
- Server verification must check payment completion, amount, recipient, and replay protection before a future `Verified Purchase` state is accepted.
- Do not introduce OnchainKit as a foundational dependency.
- Do not add Identity, IPFS, reviews, or smart contracts until the payment proof is stable unless explicitly scoped.

## Primary references

- https://docs.base.org/base-account/quickstart/web-react
- https://docs.base.org/base-account/guides/accept-payments
- https://docs.base.org/base-account/reference/base-pay/getPaymentStatus
