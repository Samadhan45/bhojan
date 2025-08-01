# 🍲 Bhojan Planner

![Bhojan Planner Banner](https://placehold.co/1200x400/7C3AED/FFFFFF?text=Bhojan+Planner)

[![Live Demo](https://img.shields.io/badge/🚀%20Live-Demo-purple?style=for-the-badge)](https://bhojan-one.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **Bhojan Planner** is a modern meal planning web app that simplifies your food routines, reduces waste, and helps you organize your meals in a smart, efficient way.

---

## 🌟 Project Overview

Bhojan Planner is built to help individuals and families:

* Plan meals for the week
* Discover new recipes
* Track pantry items and generate smart grocery lists
* Share surplus food within their community

It’s more than just a planner—it's a food management companion designed for modern kitchens.

---

## ✨ Key Features

* ✅ **Weekly Meal Planner** — Plan your breakfast, lunch, and dinner for every day with an intuitive drag-and-drop interface.
* 🔍 **Recipe Finder** — Discover recipes based on available ingredients.
* 🛒 **Grocery List Generator** — Auto-generate a shopping list from your meal plan.
* 🧂 **Pantry Tracker** — Track ingredients you already have and avoid duplicates.
* ♻️ **Food Sharing (Optional)** — List and claim surplus food to reduce waste.
* 🔐 **User Authentication** — Secure login using JWT.
* 📱 **Responsive UI** — Works beautifully across mobile, tablet, and desktop devices.

---

## 🛠️ Tech Stack

| Tech                     | Description              |
| ------------------------ | ------------------------ |
| **React.js**             | Frontend Framework       |
| **Tailwind CSS**         | Styling Framework        |
| **Node.js + Express.js** | Backend API Server       |
| **MongoDB**              | NoSQL Database           |
| **JWT**                  | Authentication Mechanism |

---

## 🚀 Getting Started

### Prerequisites

* Node.js and npm installed globally

```bash
npm install npm@latest -g
```

---

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your_username/bhojan-planner.git
cd bhojan-planner
```

#### Setup Frontend

```bash
cd client
npm install
```

#### Setup Backend

```bash
cd ../server
npm install
```

#### Add Environment Variables

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### ▶️ Run the Application

**Start Backend**

```bash
cd server
npm start
```

**Start Frontend**

```bash
cd client
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contributing

Contributions are welcome and appreciated!

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/FeatureName

# 3. Commit your changes
git commit -m "Add FeatureName"

# 4. Push to your branch
git push origin feature/FeatureName

# 5. Open a Pull Request
```

Or simply open an issue with the label **enhancement**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [MongoDB](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)

---

## 💡 Future Enhancements

* ✅ AI-powered meal suggestions
* ✅ Voice-based grocery input
* ✅ Family account sharing
* ✅ Calorie tracking and nutrition tips

---

> Made with ❤️ for better eating and happier kitchens.
