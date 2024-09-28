import React, { useEffect, useRef,useState } from 'react';

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const center=[27.1876,88.4997];
  const zoom=15;
  const [Center,setCenter]=useState(center);
  const [Zoom,setZoom]=useState(zoom);
  useEffect(() => {
    const platform = new H.service.Platform({
      apikey: import.meta.env.VITE_API_KEY, 
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      mapContainerRef.current,
      defaultLayers.vector.normal.map,
      {
        zoom: zoom,
        center: { lat: center[0], lng: center[1] }, // Example coordinates
      }
    );

    const mapEvents = new H.mapevents.MapEvents(map);
    const behavior = new H.mapevents.Behavior(mapEvents);
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    return () => {
      map.dispose();
    };
  }, []);

  return (
  <>
    <div >Lat:{center[0]} long:{center[1]}</div>
    <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
  </>
    
  )
 
};

export default MapComponent;
