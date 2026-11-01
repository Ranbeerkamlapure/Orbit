# 🌍 Orbit — Discover Your Next Stay

Orbit is a full-stack property listing web application inspired by Airbnb. It allows users to explore properties, create their own listings, upload property images, and share reviews.

The project focuses on building a responsive user experience while implementing backend concepts such as authentication, authorization, database management, and RESTful routing.

**Live Demo:** https://orbit-d5q8.onrender.com/listings

**GitHub Repository:** https://github.com/Ranbeerkamlapure/Orbit

---

## ✨ Features

- **User Authentication:** Secure signup, login, and logout using Passport.js.
- **Property Listings:** Browse available properties with images, descriptions, prices, and locations.
- **Create & Manage Listings:** Authenticated users can create, edit, and delete their listings.
- **Image Uploads:** Upload and manage property images.
- **Reviews & Ratings:** Users can share reviews and ratings for properties.
- **Authorization:** Restrict listing and review operations to authorized users.
- **Responsive Design:** Optimized layouts for mobile, tablet, and desktop screens.
- **Session Management:** Persistent session storage using MongoDB.
- **Flash Messages:** Display success and error notifications.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript, EJS |
| Styling | Bootstrap 5, Custom CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | Passport.js, Passport-Local |
| Session Management | Express-Session, Connect-Mongo |
| Templating | EJS, EJS-Mate |
| Deployment | Render |
| Version Control | Git, GitHub |

## 📸 Screenshots

_Add screenshots of your Orbit homepage, property details, login page, and mobile view here._

## 🚀 Getting Started

Follow these instructions to run Orbit locally.

### 1. Clone the repository

```bash
git clone https://github.com/Ranbeerkamlapure/Orbit.git
```

### 2. Navigate to the project directory

```bash
cd Orbit
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
ATLAS_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

Add any additional environment variables required by your image-upload configuration.

### 5. Run the application

```bash
node app.js
```

Open your browser:

```text
http://localhost:8080
```

## 🌱 Sample Data

Orbit includes a sample dataset to populate the application with demo properties.

To insert the sample listings into your configured MongoDB database:

```bash
npm run seed
```

The seed script inserts missing sample listings without deleting existing records.

## 📁 Project Structure

```text
Orbit/
│
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── app.js
├── package.json
└── README.md
```

## 🔐 Security

- Password authentication handled using Passport-Local.
- Passwords are securely hashed through the authentication strategy.
- Session data is stored in MongoDB.
- Authorization checks protect user-specific operations.
- Environment variables are used for sensitive configuration.

**Important:** Never commit your `.env` file or expose database credentials in the repository.

## 🌐 Deployment

Orbit is deployed using Render.

Live application: https://orbit-d5q8.onrender.com/listings

The application connects to MongoDB Atlas for cloud database storage.

## 👨‍💻 Author

**Ranbeer Kamlapure**

Electronics and Computer Engineering Student | Full Stack Developer

- GitHub: https://github.com/Ranbeerkamlapure
- LinkedIn: www.linkedin.com/in/ranbeer-kamlapure-77b514259

---

⭐ If you like this project, consider giving the repository a star!
