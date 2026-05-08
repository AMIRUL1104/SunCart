# 🌞 SunCart – Summer Essentials Store

A modern and responsive eCommerce web application built with **Next.js**, designed for summer-themed products like sunglasses, outfits, skincare, and beach accessories. Users can explore products, manage cart, and complete checkout flow after authentication.

---

## 🚀 Live Demo

👉 https://sun-cart-taupe.vercel.app

---

## 📁 GitHub Repository

👉 https://github.com/AMIRUL1104/SunCart

---

## 📌 Project Purpose

This project is developed as a **bootcamp assignment (Category-A8-Jackfruit)**.  
The main goal is to build a real-world eCommerce frontend system with authentication, product browsing, cart management, protected routes, and modern UI design using Next.js.

---

## ✨ Key Features

### 🏠 Home Page

- Hero section with summer sale banner
- Highlight offers (e.g., 50% OFF deals)
- Popular products section (from JSON data)
- Category-based UI sections
- Smooth animations for better UX

---

### 📦 Product System

- Static JSON product database
- Product listing page
- Product details page (protected route)
- Related products section (smart recommendation system)

---

### 🔐 Authentication (BetterAuth)

- Email & password login system
- User registration (Name, Email, Photo URL, Password)
- Google social login
- Protected routes (Product Details, Profile)
- Auto redirect after login

---

### 🛒 Cart System (LocalStorage Based)

- Add products to cart
- Increase / decrease quantity
- Remove items from cart
- Persistent cart using **LocalStorage**
- Cart state remains after refresh

---

### 💳 Checkout System

- Fully functional checkout page
- Users must fill required information:
  - Name
  - Email
  - Address
  - Phone number
- Order summary before confirmation
- Order placed successfully (frontend only)
- ❗ Payment gateway is NOT integrated (intentional for assignment scope)

---

### 👤 Profile System

- Display user information (name, email, photo)
- Update profile feature (bonus)

---

### 🛍️ Related Products Feature

- Shows similar products on product details page
- Based on category matching

---

## 📱 Responsiveness

Fully optimized for:

- 📱 Mobile
- 📟 Tablet
- 💻 Desktop

---

## 🧩 Tech Stack

- ⚡ Next.js (App Router)
- 🎨 Tailwind CSS
- 🧩 DaisyUI / HeroUI
- 🔐 BetterAuth
- 🎞️ Animate.css

---

## 📂 Project Structure

```text
/app
  /home
  /products
  /product/[id]
  /cart
  /checkout
  /login
  /register
  /profile
/components
/data/products.json
/assets
```

---

## 📌 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/AMIRUL1104/SunCart
cd SunCart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the required variables:

```env
# BetterAuth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional for social login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database (if applicable)
DATABASE_URL=your_database_url
```

> 💡 Refer to [BetterAuth Docs](https://better-auth.com) for full configuration options.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 5. Build for Production (Optional)

```bash
npm run build
npm start
```

---

## 📤 Deployment

Deployed on **Vercel**  
👉 https://sun-cart-taupe.vercel.app

To deploy your own version:

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add environment variables in the Vercel dashboard
4. Click **Deploy**

---

## 📄 License

This project is developed for educational purposes as part of a bootcamp assignment.
