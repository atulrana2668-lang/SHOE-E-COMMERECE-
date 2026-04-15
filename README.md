# Stride Studio – Premium E-Commerce Frontend

A fully responsive, luxury-grade e-commerce frontend built to simulate a premium sneaker marketplace. This project was developed as an end-to-end frontend experience focusing heavily on custom UI/UX, complex CSS architecture without boilerplate libraries, and Next.js dynamic routing.

## 🚀 Features

- **Cinematic Product Catalog:** A heavily dynamic hero sections and immersive layout using premium styling, glass-morphism, and radial gradient backdrops.
- **Dynamic Routing:** Individual Product Detail Pages (PDP) implemented utilizing Next.js app directory dynamically structured routes (`/product/[id]`).
- **Global State Cart Panel:** A slide-out global cart interface managing "Add to Bag" functionality, persistent live cart totals, and size selection logic using React Context.
- **Interactive Checkout Flow:** A multi-step checkout workflow managing order summaries, customer forms, state management, and an ultimate order success state.
- **Micro-Animations:** Seamless transitions, button hover shadows, custom CSS scrollbars, scale and float keyframe animations strictly built with vanilla CSS.
- **Audience Curation Pages:** Segmented catalogs exclusively built for Men, Women, and Kids using isolated CSS Grid merchandising blocks.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router, Version 14+)
- **Language:** TypeScript
- **State Management:** React Context API (`auth-provider.tsx`, `cart-provider.tsx`)
- **Styling:** Highly advanced Vanilla CSS (`globals.css` with extensive custom tokens, grid properties, and media queries avoiding third-party dependencies)
- **Deployment & Architecture:** SSR / CSR hybrid Next.js principles

## 💻 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atulrana2668-lang/SHOE-E-COMMERECE-.git
   cd SHOE-E-COMMERECE-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the outcome.

## 📝 Next Steps (Backend Integration phase)
- [ ] Implement genuine User Authentication (via Clerk or NextAuth)
- [ ] Migrate `store-data.ts` logic into a real-world database (PostgreSQL / MongoDB)
- [ ] Integrate an actual Payment Gateway (Stripe or Razorpay) for dynamic live checkout.

## 👨‍💻 Developer Information
Developed structurally and styled heavily from the ground up by **Atul Rana**.
