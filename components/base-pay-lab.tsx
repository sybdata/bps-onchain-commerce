'use client';

import { useState } from 'react';
import { getPaymentStatus } from '@base-org/account';
import { BasePayButton } from '@base-org/account-ui/react';

const TEST_AMOUNT = '0.01';
const DEFAULT_BPS_TEST_RECIPIENT = '0x78d9fda589d2eac76c86f9c490f288ae60bf92a0';

export function BasePayLab() {
  const recipient =
    process.env.NEXT_PUBLIC_BPS_PAYMENT_ADDRESS?.trim() || DEFAULT_BPS_TEST_RECIPIENT;
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
