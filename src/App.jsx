import { useEffect, useState } from "react";
import MapView from "./components/MapView";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minMag, setMinMag] = useState(0);

  const apiUrl =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        if (!data.features?.length) throw new Error("No recent earthquakes found");

        setEarthquakes(data.features);
      } catch (err) {
        console.error("Error fetching earthquake data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter quakes by selected minimum magnitude
  const filtered = earthquakes.filter(
    (e) => (e.properties?.mag ?? 0) >= minMag
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-center md:text-left">
          <h1 className="text-xl font-semibold">🌎 Earthquake Visualizer</h1>
          <p className="text-sm text-slate-300">
            Recent quakes (past 24 hours) — Data from USGS
          </p>
        </div>

        {/* Magnitude Filter */}
        <div className="mt-3 md:mt-0 flex items-center space-x-2">
          <label className="text-sm text-slate-200">Min Magnitude</label>
          <select
            value={minMag}
            onChange={(e) => setMinMag(Number(e.target.value))}
            className="bg-slate-800 text-white px-2 py-1 rounded hover:bg-slate-700 transition"
          >
            <option value={0}>All</option>
            <option value={1}>1.0+</option>
            <option value={2}>2.0+</option>
            <option value={3}>3.0+</option>
            <option value={4}>4.0+</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        {loading ? (
          <p className="text-gray-400 animate-pulse">Loading earthquake data...</p>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No earthquakes match the selected magnitude.</p>
        ) : (
          <MapView earthquakes={filtered} />
        )}
      </main>

      {/* Footer */}
      <footer className="text-xs text-center text-slate-500 p-2 border-t border-slate-800">
        Data Source: USGS | Built for Casey, Geography Student
      </footer>
    </div>
  );
}

export default App;
