// Inicializar el mapa
const mymap = L.map("mapid").setView([-34.603722, -58.381592], 12);

// Agregar el mapa base de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>",
    maxZoom: 19,
}).addTo(mymap);

// Array con las coordenadas de los puntos
const markers = [
    { lat: -34.603722, lng: -58.39, nro: 1 },
    { lat: -34.603722, lng: -58.39, nro: 1 },
    { lat: -34.603722, lng: -58.39, nro: 2 },
    { lat: -34.603722, lng: -58.39, nro: 3 },
    { lat: -34.603722, lng: -58.39, nro: 3 },
    { lat: -34.603722, lng: -58.39, nro: 3 },
    { lat: -34.603722, lng: -58.38, nro: 3 },
    { lat: -34.603722, lng: -58.38, nro: 3 },
    { lat: -34.603722, lng: -58.38, nro: 3 },
    { lat: -34.603722, lng: -58.38, nro: 3 }
];

// Crear un icono personalizado para los marcadores
const iconoMarcador = L.icon({
    iconUrl: "https://cdn.jsdelivr.net/leaflet/1.0.0-rc.3/images/marker-icon.png",
    iconRetinaUrl: "https://cdn.jsdelivr.net/leaflet/1.0.0-rc.3/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: "https://cdn.jsdelivr.net/leaflet/1.0.0-rc.3/images/marker-shadow.png",
    shadowSize: [41, 41],
});

// Agrupar los marcadores según su densidad
const groupMarkers = () => {
    // Crear un cluster personalizado
    const markersCluster = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
            // Contar el número de marcadores en el cluster
            const count = cluster.getChildCount();

            // Definir el tamaño del icono según la cantidad de marcadores en el cluster
            let size = "small";
            if (count >= 10 && count < 50) {
                size = "medium";
            } else if (count >= 50) {
                size = "large";
            }

            // Devolver el icono personalizado
            return L.divIcon({
                html: `<div class="cluster-icon ${size}">${count}</div>`,
                className: "cluster",
                iconSize: L.point(40, 40),
            });
        },
    });

    // Añadir cada marcador al cluster
    markers.forEach((marker) => {
        const latLng = [marker.lat, marker.lng];
        //const markerPopup = L.popup().setContent(`Latitud: ${marker.lat}, Longitud: ${marker.lng}`);
        //const markerTooltip = L.tooltip().setContent(`Latitud: ${marker.lat}, Longitud: ${marker.lng}`);
        const markerPopup = L.popup().setContent(`<a href="#">Reclamo N°: ${marker.nro}</a>`);
        const markerTooltip = L.tooltip().setContent(`Reclamo N°: ${marker.nro}`);

        const markerInstance = L.marker(latLng, { icon: iconoMarcador })
            .bindPopup(markerPopup)
            .bindTooltip(markerTooltip);
        markersCluster.addLayer(markerInstance);
    });

    // Añadir el cluster al mapa
    mymap.addLayer(markersCluster);
};

// Añadimos los marcadores al mapa
groupMarkers();
