'use client';

import { useState } from 'react';
import { getPaymentStatus } from '@base-org/account';
import { BasePayButton } from '@base-org/account-ui/react';

const TEST_AMOUNT = '0.01';

export function BasePayLab() {
  const recipient = process.env.NEXT_PUBLIC_BPS_PAYMENT_ADDRESS?.trim();
  const [transactionId, setTransactionId] = useState('');
  const [statusMessage, setStatusMessage] = useState('No test payment submitted yet.');

  const checkStatus = async () => {
    if (!transactionId) return;

    setStatusMessage('Checking Base Sepolia payment status…');

    try {
      const result = await getPaymentStatus({
        id: transactionId,
        testnet: true,
      });

      setStatusMessage(
        `Status: ${result.status}${result.amount ? ` · ${result.amount} USDC` : ''}${
          result.sender ? ` · sender ${result.sender}` : ''
        }`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown status-check error';
      setStatusMessage(`Status check failed: ${message}`);
    }
  };

  if (!recipient || recipient === '0x0000000000000000000000000000000000000000') {
    return (
      <section className="card">
        <h2>Base Pay configuration</h2>
        <p>
          Add a Base Sepolia recipient address to <code>NEXT_PUBLIC_BPS_PAYMENT_ADDRESS</code> before
          enabling the test payment.
        </p>
        <div className="status">No payment address configured.</div>
      </section>
    );
  }

  return (
    <section className="card">
      <p className="eyebrow">Base Pay · Base Sepolia</p>
      <h2>0.01 USDC test payment</h2>

      <ul className="meta">
        <li>
          <span>Network</span>
          <strong>Base Sepolia</strong>
        </li>
        <li>
          <span>Amount</span>
          <strong>{TEST_AMOUNT} USDC</strong>
        </li>
        <li>
          <span>Recipient</span>
          <code>{recipient}</code>
        </li>
      </ul>

      <BasePayButton
        paymentOptions={{
          amount: TEST_AMOUNT,
          to: recipient,
          testnet: true,
        }}
        colorScheme="light"
        size="large"
        onPaymentResult={(result) => {
          if (result.success) {
            const id = result.transactionHash ?? '';
            setTransactionId(id);
            setStatusMessage(id ? `Payment submitted: ${id}` : 'Payment submitted.');
          } else {
            setStatusMessage(`Payment failed: ${result.error ?? 'Unknown error'}`);
          }
        }}
      />

      <button className="secondaryButton" type="button" onClick={checkStatus} disabled={!transactionId}>
        Check payment status
      </button>

      <div className="status">{statusMessage}</div>
    </section>
  );
}
