URL Shortener

🔗 Live: https://url-shortner-git-main-sampaths-projects-a10d7eb4.vercel.app/

A simple and efficient URL Shortener built with the MERN stack (MongoDB, Express.js, React, Node.js).
It allows users to shorten long URLs into compact links and redirect seamlessly.

🚀 Features

Shorten long URLs into unique short codes.

Redirect users to the original URL.

Track click counts for each short URL.

User authentication (optional – if you already added it).

MongoDB for storing URL data.

Deployed on Render (backend) and Vercel (frontend).

🛠️ Tech Stack

Frontend: React, Tailwind CSS (if used), Vercel
Backend: Node.js, Express.js, MongoDB, Render
Database: MongoDB Atlas

⚙️ Installation & Setup
1. Clone the repo
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

2. Setup Backend
cd server
npm install


Create a .env file inside /server with:

MONGO_URI=your_mongodb_connection_string
PORT=5000
BASE_URL=https://your-backend-url.onrender.com
JWT_SECRET=your_jwt_secret (if auth is used)


Start the backend:

npm start

3. Setup Frontend
cd client
npm install
npm run dev   # for local development

📦 API Endpoints
Create Short URL

POST /api/shorten

{
  "longUrl": "https://www.example.com/some/very/long/url"
}

Redirect Short URL

GET /:code

Redirects to the original URL.

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📄 License

This project is licensed under the MIT License.
