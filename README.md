# The Nxt Scene Storefront — Portable Export

This package contains the exact source and local assets used by the currently deployed storefront version 7 at:

`https://thenxtscene.aritakenchi.chatgpt.site`

Source revision: `210d8f9cb4fa3adf6c6cca97a1b630e3cf01dea3`

## Included

- `index.html` — storefront structure, product modal, cart, checkout and confirmation views
- `styles.css` — complete branding, layout, responsive styles and interaction states
- `app.js` — all six products, variants, pricing, cart persistence, quantity controls, checkout state and payment-integration boundary
- `assets/` — the master logo and all product images used by the storefront
- `package.json` — lightweight local preview command

Products preserved in this export:

1. Karma Circle Oversized Tee — ₹999
2. GYMDARI Oversized Tee — ₹999
3. Queen of Hearts Oversized Tee — ₹999
4. Stay Humble Hustle Hard Hoodie — ₹1,299
5. Bohot Paise Hoodie — ₹1,299
6. Holy Ingredients Oversized Tee — ₹999

## Import into another ChatGPT account

Upload the ZIP to the destination account and ask ChatGPT to create a new private Site from the uploaded project without changing its HTML, CSS, JavaScript, product data or assets. Ask it to keep the Site private until you approve publishing.

The source account's `.openai/hosting.json` is intentionally excluded because it identifies the existing Site and cannot be transferred safely to another account. The destination account must create its own Site identity while using these files unchanged.

## Local preview

From this folder, run:

```bash
npm run serve
```

Then open `http://localhost:4173`.

## Payment note

This export preserves the current storefront exactly. Its checkout interface calculates the cart total and contains the secure Razorpay integration boundary, but successful payment confirmation still requires a protected server-side Razorpay order-creation and signature-verification backend. Never place a Razorpay Key Secret in `app.js` or any browser-visible file.
