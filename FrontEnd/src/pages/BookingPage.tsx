import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { HospitalCard } from '@/components/custom/HospitalCard';
import { DoctorCard } from '@/components/custom/DoctorCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { InfinitySpin } from 'react-loader-spinner';
import { Doctor , Hospital } from '@/types/types';

interface SelectedData {
    disease: string;
    doctor: string; // Comma-separated string of specializations
}

interface UserLocation {
    latitude: number;
    longitude: number;
}

export function BookingPage() {
    const location = useLocation();
    const { selectedData } = location.state as { selectedData: SelectedData } || {}; // Retrieve the passed data
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [hospitals, setHospitals] = useState<Hospital[]>([]); // State for hospitals
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null); // State for selected hospital
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null); // State for user location

    // Fetch user location
    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log("Geolocation success:", position);
                        setUserLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        console.error("Error fetching location:", error.message);
                        setLoading(false); // Stop loading if there's an error
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                setLoading(false); // Stop loading if geolocation is not supported
            }
        };

        fetchLocation();
    }, []);

    // Fetch doctors and hospitals based on user location and selected data
    useEffect(() => {
        const fetchDoctors = async () => {
            if (userLocation && selectedData) {
                const specializations = selectedData.doctor.split(',');
                const lastSpecialization = specializations[specializations.length - 1].trim();

                try {
                    const response = await axios.post<Doctor[]>(`${import.meta.env.VITE_BACKEND_API}/getdata`, {
                        specialization: lastSpecialization,
                        location: userLocation, // Pass user location to the server
                    });
                    setDoctors(response.data);
                    // Extract unique hospitals from the fetched doctors
                    const uniqueHospitals = response.data.map(doctor => doctor.department.hospital)
                        .filter((hospital, index, self) =>
                            index === self.findIndex((h) => h.id === hospital.id)
                        );
                    console.log(uniqueHospitals);
                    setHospitals(uniqueHospitals); // Set unique hospitals
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        setError("Failed to load doctors and hospitals");
                    } else {
                        setError("An unexpected error occurred");
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchDoctors();
    }, [userLocation, selectedData]); // Trigger when userLocation and selectedData are updated

    if (!selectedData) {
        return <p>No data available. Please go back and select a diagnosis.</p>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <InfinitySpin
                    width="200"
                    color="#4fa94d"
                />
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Filter doctors based on the selected hospital
    const filteredDoctors = selectedHospital
        ? doctors.filter(doctor => doctor.department.hospital.id === selectedHospital.id)
        : [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Book Appointment for {selectedData.disease}</CardTitle>
            </CardHeader>
            <CardContent>
                {!selectedHospital ? ( // If no hospital is selected
                    <>
                        <h3 className="mt-4 mb-2 text-lg font-semibold">Available Hospitals:</h3>
                        {hospitals.length > 0 ? (
                            <div className="space-y-4">
                                {hospitals.map((hospital) => (
                                    <HospitalCard
                                        key={hospital.id}
                                        hospital={hospital}
                                        onSelect={() => setSelectedHospital(hospital)} // Set the selected hospital
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No hospitals available for the selected specialization.</p>
                        )}
                    </>
                ) : ( // When a hospital is selected
                    <>
                        <h3 className="mt-4 mb-2 text-lg font-semibold">Doctors at {selectedHospital.name}:</h3>
                        <Button onClick={() => setSelectedHospital(null)}>Back to Hospitals</Button>
                        <div className="space-y-4">
                            {filteredDoctors.map(doctor => (
                                <DoctorCard key={doctor.name} doctor={doctor} />
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
