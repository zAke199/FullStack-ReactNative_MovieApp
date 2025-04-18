# 🎬 MovieApp(iOS/Android) - ReactNative

MovieApp is a sleek and modern **movie discovery app** built with **React Native**. Whether you're looking for the latest blockbusters or hidden gems, CineFind makes it effortless to explore trending and popular films in real-time. It leverages the **TMDB API** for fetching movie data and uses **Appwrite** to track search queries and display trending content based on actual user behavior.

With a dynamic interface powered by **Tailwind CSS (via NativeWind)** and **Expo Router** for smooth navigation, CineFind ensures a responsive and intuitive experience on mobile devices.

---

## 🚀 Features

- 🔍 **Real-time Search** — Instantly search for movies with auto-throttled updates
- 🎞️ **Trending Movies Section** — Dynamically generated from live user search data
- 🧠 **Custom Trending Logic** — Tracks and ranks search terms using Appwrite based on frequency
- 🖼️ **Dynamic Poster Grid** — Infinite scrolling with smooth pagination
- 📲 **Mobile-Optimized UI** — Built with NativeWind and responsive TailwindCSS classes
- ⚡ **Fast Navigation** — Powered by Expo Router and seamless transitions

## 🔥 Trending Movies

- Unlike generic "trending" lists, the app Dynamically builds a trending movies list based on real user search activity.
- Stores searched movies and metadata in Appwrite Cloud.
- Maintains a `count` field for each search term.
- Increments count if the movie was searched before; otherwise, creates a new entry.
- Fetches and displays the top 5 most-searched movies in the **Trending** section.

---

## 🛠️ Tech Stack

| Category               | Tech Used                                                                 |
|------------------------|---------------------------------------------------------------------------|
| **Frontend**           | React Native (via Expo), TypeScript, Tailwind CSS (NativeWind)            |
| **Navigation**         | Expo Router                                                               |
| **Backend-as-a-Service** | Appwrite (for tracking and ranking user search data)                  |
| **API**                | TMDB (The Movie Database API)                                             |
| **State/Data Handling**| React Hooks, Custom `useFetch` hook                                       |
| **Deployment**         | EAS (Expo Application Services)                                           |
| **Design/Styling**     | TailwindCSS classes in JSX (through NativeWind)                           |

---

## 📸 Running the App

