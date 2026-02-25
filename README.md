# 🥬 VeggieBash – MERN Stack Grocery Marketplace

A full-stack grocery e-commerce platform showcasing modern web development practices with secure authentication, serverless-compatible file uploads, and seamless payment integration.

**Live Demo:**
- 🌐 **Frontend:** https://veggie-bash-frt.vercel.app

---

## 🛠 Tech Stack

### Frontend
- **React.js** (Vite) – Lightning-fast development & build
- **Context API** – Lightweight state management
- **Axios** – HTTP client for API communication
- **Tailwind CSS** – Responsive, utility-first styling
- **React Hot Toast** – User feedback notifications

### Backend
- **Node.js + Express.js** – RESTful API server
- **MongoDB + Mongoose** – Document database & ODM
- **JWT Authentication** – Stateless, secure token-based auth
- **Multer** – Memory-based file handling (serverless-safe)
- **Cloudinary** – Cloud image storage & CDN
- **Stripe** – Payment processing & webhooks

### Deployment
- **Vercel** – Frontend & serverless backend hosting
- **MongoDB Atlas** – Managed cloud database
- **Cloudinary** – Image storage & optimization

---

## 🔐 Authentication & Security

- **JWT-based authentication** with refresh tokens
- **HTTP-only cookies** for secure token storage (`sameSite: none`, `secure: true`)
- **Role-based access control** (User, Seller, Admin)
- **Cookie-based sessions** with CORS handling
- **Secure password hashing** (bcrypt)
- **Server-side payment verification** with Stripe webhooks

---

## 🎯 Core Features

### 👤 User Module
- User registration & login with JWT
- Browse products across categories
- Add/remove items from persistent cart
- Address management for checkout
- Place orders via COD or Stripe
- View order history & status

### 🏪 Seller Module
- Secure seller login (admin-controlled credentials)
- Add/edit products with multiple images
- Cloudinary image uploads (serverless-compatible)
- Real-time stock management
- View platform analytics

### 🛒 Payment Gateway
- **Stripe Checkout** integration
- **Webhook handling** for payment confirmation
- Support for **COD** (Cash on Delivery)
- Secure, PCI-compliant transactions

---

## 📦 Product Categories

🥕 Vegetables | 🍎 Fruits | 🥛 Dairy & Eggs | 🍞 Bakery | 🍚 Staples/Grains | 🥤 Beverages | 🍜 Packaged Foods

---

## 💡 Real-World Solutions Implemented

### 🚀 Serverless File Upload Architecture
**Problem:** Local file storage crashes on serverless platforms (Vercel).  
**Solution:** 
- Multer memory storage (no disk writes)
- Cloudinary stream uploads
- Direct buffer-to-cloud pipeline
- Zero local file system dependency

### 🔗 Cross-Domain Authentication
**Problem:** Cookie-based auth blocked by CORS on different domains.  
**Solution:** 
- Explicit CORS configuration with credentials
- Secure cookie settings for production
- Frontend axios instance with withCredentials

### 💳 Stripe Webhook Integration
**Problem:** Raw body required for signature verification.  
**Solution:** 
- Custom Express middleware for raw body parsing
- Webhook endpoint security validation
- Idempotent payment handling

### 🛒 Cart Persistence
**Problem:** Cart data lost on page refresh.  
**Solution:** 
- MongoDB-backed cart storage
- Real-time synchronization with auth state
- Seamless local-to-database migration

---

## 📁 Project Structure

```
veggiebash/
├── Frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route pages
│   │   ├── context/             # Context API state
│   │   ├── assets/              # Images, icons
│   │   └── main.jsx
│   ├── .env                     # Frontend config
│   └── vite.config.js
│
├── Backend/
│   ├── controllers/             # Business logic
│   ├── models/                  # MongoDB schemas
│   ├── routes/                  # API endpoints
│   ├── middlewares/             # Auth, validation
│   ├── configs/                 # Database, external services
│   ├── .env                     # Backend config
│   └── server.js
│
└── README.md
```

---


## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Cloudinary account
- Stripe account

### Installation

**Backend Setup:**
```bash
cd Backend
npm install
npm create-env              # Create .env file
npm run dev                 # Start development server
```

**Frontend Setup:**
```bash
cd Frontend
npm install
npm create-env              # Create .env file
npm run dev                 # Start Vite dev server
```

### Running in Production
```bash
# Backend
npm run build
npm start

# Frontend
npm run build
npm preview
```

---

## 🧪 Testing Payment Flow

1. Visit the live demo
2. Register as a user or use demo credentials
3. Add products to cart
4. Proceed to checkout → Select **Stripe** or **COD**
5. For Stripe: Use test card `4242 4242 4242 4242`
6. Confirm payment webhook processing in Stripe dashboard

---

## 📈 Future Enhancements

- [ ] Admin dashboard with sales analytics
- [ ] Advanced product search & filtering
- [ ] Real-time order status tracking
- [ ] Pagination for product listings
- [ ] Wishlist & product reviews
- [ ] Email notifications for orders
- [ ] Inventory alerts for low stock
- [ ] Refund management system

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Dushyant Singh Tanwar**  
Full-Stack MERN Developer | Building scalable, production-ready applications

📧 Connect with me or explore more projects!

---

## 📚 Learning Resources Used

- MERN Stack Best Practices
- Serverless Architecture Design
- JWT Authentication & Security
- Stripe Integration Guide
- Cloudinary Stream Upload
- MongoDB Schema Design

---
