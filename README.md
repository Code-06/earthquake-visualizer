# 🌎 Earthquake Visualizer

> **A real-time interactive map showing recent global earthquake activity**  
> Built for **Casey**, a geography student, to visualize seismic patterns using the **USGS Earthquake API**.

---

## 🧭 Overview

The **Earthquake Visualizer** is a web application that displays live earthquake data on an interactive world map.  
Users can explore earthquake magnitudes, locations, and times, with filtering options to focus on specific magnitudes.  
It’s designed to be simple, responsive, and informative — ideal for both students and enthusiasts studying global seismic activity.

---

## 🚀 Features

- 🗺️ **Interactive Map** – Built with [React Leaflet](https://react-leaflet.js.org/) for smooth map interactions.  
- 🌍 **Real-time Data** – Fetches live earthquake updates from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson).  
- ⚡ **Magnitude Filter** – View earthquakes by minimum magnitude (1.0+, 2.0+, etc.).  
- 📱 **Responsive Design** – Works seamlessly across desktop, tablet, and mobile.  
- 🧩 **Error Handling** – Graceful fallback messages for network errors or no data.  
- 🎨 **Modern UI** – Custom Tailwind CSS theme with dark mode aesthetics.  

---

## 🧑‍💻 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React + Vite** | Fast, modern frontend framework and build tool |
| **Tailwind CSS** | Utility-first styling for a responsive design |
| **React Leaflet** | Interactive map rendering |
| **USGS API** | Real-time earthquake data source |
| **JavaScript (ES6+)** | Core logic and interactivity |

---

## ⚙️ Installation & Setup

To run locally:

```bash
# Clone this repository
git clone https://github.com/Code-06/earthquake-visualizer.git

# Navigate into the project folder
cd earthquake-visualizer

# Install dependencies
npm install

# Run the app locally
npm run dev
