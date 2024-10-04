export interface Doctor {
    id: number;
    name: string;
    specialty: string;// or specialty
    phoneNumber: string; // Add this
    email: string; // Add this
    rating: number; // Add rating
    image: string; // Add image URL
    availableDays: string[]; // Add available days
    department: {
        name: string;
        hospital: Hospital;
    };
}

export interface HospitalCardProps {
    hospital: {
        id: number;
        name: string;
        location: string;
        latitude: number;
        longitude: number;
        distance: number; // Accept distance as a prop
    };
    onSelect: () => void;
}


export interface Hospital {
    id: number;
    name: string;
    location: string;  // Add the missing property
    latitude: number;  // Add the missing property
    longitude: number; // Add the missing property
    distance: number;
}


export interface UserLocation {
    latitude: number | null;
    longitude: number | null;
}
