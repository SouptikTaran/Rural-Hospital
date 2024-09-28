import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

export default function MapComponent() {
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const center = [ 27.3314, 88.6138];
    const zoom =5;
    const [Center, setCenter] = useState(center);
    const [Zoom, setZoom] = useState(zoom);

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: center,
          zoom: zoom
        });
    
        mapRef.current.on('move', () => {
          // get the current center coordinates and zoom level from the map
          const mapCenter = mapRef.current.getCenter()
          const mapZoom = mapRef.current.getZoom()
    
          // update state
          setCenter([ mapCenter.lng, mapCenter.lat ])
          setZoom(mapZoom)
        })
    
        return () => {
          mapRef.current.remove()
        }
      }, [])

    
    return (
        <>
            <div className="p-4 text-[#44457d]">
                Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
            </div>
            <div style={{ width: '100%', height: '400px' }} ref={mapContainerRef}></div>
        </>
    );
}
