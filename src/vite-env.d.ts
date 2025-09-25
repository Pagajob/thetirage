/// <reference types="vite/client" />

// Declare Stripe pricing table custom element
declare namespace JSX {
  interface IntrinsicElements {
    'stripe-pricing-table': {
      'pricing-table-id': string;
      'publishable-key': string;
    };
  }
}
