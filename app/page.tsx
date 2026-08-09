import { BasePayLab } from '../components/base-pay-lab';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">BPS Onchain Commerce · v0.1</p>
        <h1>Verified USDC payments on Base.</h1>
        <p className="lead">
          First runnable experiment: Base Pay on Base Sepolia. This page proves SDK connectivity and
          transaction flow before the server-authoritative BPS Order layer is added.
        </p>
      </section>

      <div className="grid">
        <BasePayLab />

        <section className="card">
          <p className="eyebrow">Architecture rule</p>
          <h2>Client status is not fulfillment.</h2>
          <p className="warning">
            The browser may display a transaction result, but BPS must not treat that as a verified
            purchase. The next implementation step is backend validation with
            <code> getPaymentStatus()</code>, canonical server pricing, recipient/amount checks and
            replay protection.
          </p>
          <ul className="meta">
            <li>
              <span>Quickstart</span>
              <strong>Current</strong>
            </li>
            <li>
              <span>Server order</span>
              <strong>Next</strong>
            </li>
            <li>
              <span>Verified Purchase</span>
              <strong>Planned</strong>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
