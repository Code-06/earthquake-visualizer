import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ earthquakes = [] }) => {
  // Marker color based on magnitude
  const getColor = (mag) => {
    if (mag === null || mag === undefined) return "#999";
    if (mag < 2) return "#2dd4bf";
    if (mag < 4) return "#f59e0b";
    return "#ef4444";
  };

  // Marker radius scaled by magnitude
  const getRadius = (mag) => Math.max(4, (mag || 0) * 3);

  // Map center (roughly global)
  const center = [20, 0];

  return (
    <div className="h-full w-full">
      <MapContainer center={center} zoom={2} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Earthquake Markers */}
        {earthquakes.map((eq) => {
          const coords = eq.geometry?.coordinates || [];
          const [lng, lat, depth] = coords;
          const mag = eq.properties?.mag;
          const place = eq.properties?.place || "Unknown location";
          const time = eq.properties?.time;

          if (typeof lat !== "number" || typeof lng !== "number") return null;

          return (
            <CircleMarker
              key={eq.id}
              center={[lat, lng]}
              radius={getRadius(mag)}
              pathOptions={{
                color: getColor(mag),
                fillColor: getColor(mag),
                fillOpacity: 0.8,
                weight: 1,
              }}
            >
              <Popup>
                <div className="text-sm">
                  <div><strong>Place:</strong> {place}</div>
                  <div><strong>Magnitude:</strong> {mag ?? "N/A"}</div>
                  <div><strong>Depth:</strong> {depth ?? "N/A"} km</div>
                  <div><strong>Time:</strong> {time ? new Date(time).toLocaleString() : "N/A"}</div>
                  {eq.properties?.url && (
                    <div className="mt-2">
                      <a
                        href={eq.properties.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline hover:text-blue-300"
                      >
                        More details
                      </a>
                    </div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
