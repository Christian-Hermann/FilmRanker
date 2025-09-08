FilmRanker

FilmRanker is a full-stack web application that lets users add, browse, search, and rank their favorite movies.

Live: https://filmranker-2025.netlify.app  
API: https://filmranker.onrender.com

It’s built with React (frontend), Express (backend), and PostgreSQL (database), and uses JWT authentication to keep each user’s movies private.

---

Features

- User Authentication – Users can register, log in, and stay signed in using JSON Web Tokens (JWT).
- Add Movies – Title, director, genre, and release year.
- Search & Filter – Search movies by title, director, genre, or year.
- User-Specific Data – Each user only sees and manages their own movies.
- Delete Movies – Remove a movie from your list.
- ⬆️/⬇️ Arrow Buttons – Adjust movie rankings visually.
- Frontend Built with React Hooks – Uses 'useState' and `useEffect for state and data fetching.

---

Tech Stack

Frontend:

- React (Vite)
- JavaScript (ES6)
- CSS (custom styles)

Backend:

- Node.js / Express.js
- PostgreSQL
- JWT Authentication

Tools:

- Thunder Client (API testing)
- Git & GitHub (version control)

---

Planned Features:

- Ranking System – Allow users to set a ranking for each movie and reorder their list.
- Scrollable Movie List – Better layout for large collections.
- Improved Search – Case-insensitive and more responsive.
- Better Styling – More polished, user-friendly interface.

---

Project Structure

FilmRanker/
├── backend/
│ ├── api/ # Express route handlers (movies, auth)
│ ├── middleware/ # Authentication and request helpers
│ ├── db/ # PostgreSQL connection and queries
│ └── app.js # Main Express app setup
│
├── frontend/
│ ├── components/ # React UI components
│ ├── api/ # Frontend API request helpers
│ ├── App.jsx # Main React component
│ └── main.jsx # Entry point
│
└── README.md
