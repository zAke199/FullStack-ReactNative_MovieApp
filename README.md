🎬 MovieApp

CineFind is a modern movie discovery app built with React Native, designed to help users explore trending and popular films seamlessly. The app fetches real-time movie data from the TMDB API and enhances user experience with a smart search feature. Every user search is tracked with Appwrite, enabling dynamic trending movie insights based on actual user behavior. With a clean, responsive UI powered by Tailwind CSS, CineFind offers an intuitive and visually engaging way to find your next favorite movie.

🔧 Features

🔍 Real-time Search with auto-throttled updates

🎞️ Trending Movies Section driven by live search data

🧠 Custom Trending Logic: Tracks user searches via Appwrite and sorts based on frequency

🖼️ Dynamic Poster Grid with infinite scroll (pagination)

📲 Mobile-optimized UI with TailwindCSS (via NativeWind)

⚡ Smooth navigation using Expo Router

🛠️ Tech Stack

Category

Tech Used

Frontend

React Native (via Expo), TypeScript, Tailwind CSS (NativeWind)

Navigation

Expo Router

Backend-as-a-Service

Appwrite (for storing & ranking user search data)

API

TMDB (The Movie Database API)

State/Data

React Hooks, custom useFetch hook

Deployment

EAS (Expo Application Services)

Design/Styling

TailwindCSS classes in JSX (through NativeWind)
