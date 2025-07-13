# Entrify

Entrify is a full-stack event and movie booking platform inspired by BookMyShow, but extended to support SaaS features for venue partners. This project demonstrates secure authentication, payment processing, seat selection, and role-based access control.

## 🏗️ Project Structure

```
entrify/
├── client/            # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/   # Axios API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── tailwind.config.js
├── server/            # Backend (Node.js + Express + Mongoose)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── stripeWebhook.js
│   ├── server.js
│   └── .env
└── README.md
```

## 🚀 Features

✅ User Registration & Login  
✅ JWT Authentication (stored in cookies)  
✅ Role-based authorization (Admin/User)  
✅ Movies, Theatres, Shows CRUD (Admin only)  
✅ Seat selection with dynamic booking  
✅ Stripe Checkout Integration  
✅ Webhook to finalize bookings after payment success  
✅ Email notifications with nodemailer  
✅ Rate limiting to prevent abuse  

## 🛡️ Security Measures

- Passwords hashed with bcrypt
- JWT tokens stored securely in cookies
- `express-rate-limit` to prevent abuse
- `helmet` for HTTP header protection
- Input validation on backend
- Mongoose schema validation

## 🧾 How to Run Locally

1️⃣ **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/entrify.git
cd entrify
```

2️⃣ **Install backend dependencies**

```bash
cd server
npm install
```

3️⃣ **Install frontend dependencies**

```bash
cd ../client
npm install
```

4️⃣ **Configure environment variables**

Create a `.env` file in the `server/` directory:

```
PORT=8080
MONGO_URL=mongodb+srv://...
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

5️⃣ **Run backend**

```bash
cd server
npm run dev
```

6️⃣ **Run frontend**

```bash
cd ../client
npm run dev
```

The frontend will be served on `http://localhost:5173` and the backend on `http://localhost:8080`.

## 💳 Stripe Integration

- On payment, Stripe Checkout session is created.
- Webhook endpoint listens for `checkout.session.completed` events.
- Booking is saved only after payment succeeds.
- Email confirmation is sent to the user.

## ✉️ Email Sending

- Nodemailer configured with Gmail or any SMTP service.
- Used to send OTPs and booking confirmations.

## 🎯 Rate Limiting

- Limits requests to 40 per 5 minutes per IP.
- Returns a dynamic message showing minutes remaining.

## 🧩 Technologies Used

- **Frontend:** React, TailwindCSS, Ant Design, Axios, React Router
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Payments:** Stripe
- **Email:** Nodemailer

## 🌟 Why Entrify?

This project showcases a full production-like workflow:
- Authentication & authorization
- Payment processing with Stripe webhooks
- Role-based dashboards
- Real-world security practices
- Clean UI built with Tailwind and Ant Design

It demonstrates an end-to-end application suitable for production, but built as a learning project.

---

Feel free to explore the code, run it locally, and try the features!
