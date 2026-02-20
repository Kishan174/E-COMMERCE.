# E-Commerce App

A simple, full-featured e-commerce app built with React and Node.js.

##  Features

- **Sign Up & Login** - Create accounts and log in securely with JWT tokens
- **Browse Products** - View all available products
- **Shopping Cart** - Add, remove, and update item quantities
- **User Sessions** - Cart stays with your account

##  Tech Stack

**Backend:** Node.js, Express, bcryptjs, JWT  
**Frontend:** React, React Router, Axios

##  Quick Start

### Backend
`bash
cd backend
npm install
npm start
`
Server runs at http://localhost:5000

### Frontend
`bash
cd frontend
npm install
npm start
`
App opens at http://localhost:3000

##  How to Use

1. **Create an Account** - Click Register and fill in your details
2. **Browse & Shop** - Check out the products page
3. **Add Items** - Choose quantities and add to cart
4. **Manage Cart** - View and edit your items before checkout

##  How It Works

- Your password is securely hashed before it's stored
- When you log in, you get a token that proves you're logged in (it expires after 7 days)
- This token is sent with each request so the app knows it's you
- Protected pages (like your cart) check if you have a valid token

##  Setup Notes

**Environment variables** in `backend/.env`:
`
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
`

##  Troubleshooting

| Issue | Fix |
|-------|-----|
| Backend won't start | Check if port 5000 is free, run `npm install` |
| Frontend won't connect | Make sure backend is running on port 5000 |
| Login not working | Clear browser cache, check console for errors |
| Cart data disappears | Cart resets when server restarts (it's a demo) |