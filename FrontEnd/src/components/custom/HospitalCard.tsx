// HospitalCard.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '../ui/button';

interface HospitalCardProps {
    hospital: {
        id: number;
        name: string;
        location: string;
        latitude: number;
        longitude: number;
    };
    onSelect: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onSelect }) => {
    return (
        <Card className="max-w-md mx-auto hover:shadow-lg transition-shadow duration-300"> {/* Adjusted width */}
            <CardHeader>
                <div className="w-full h-48">
                    <MapContainer center={[hospital.latitude, hospital.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[hospital.latitude, hospital.longitude]}>
                            <Popup>{hospital.name}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle>{hospital.name}</CardTitle>
                <CardDescription className="mt-2">
                    <div className="flex items-center">
                        <span>{hospital.location}</span>
                    </div>
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Button onClick={onSelect} className="w-full">Select Hospital</Button>
            </CardFooter>
        </Card>
    );
};
