import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { HospitalCard } from '@/components/custom/HospitalCard';
import { DoctorCard } from '@/components/custom/DoctorCard'; // Import your DoctorCard component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { InfinitySpin } from 'react-loader-spinner'; // Ensure you have this installed

export function BookingPage() {
    const location = useLocation();
    const { selectedData } = location.state || {}; // Retrieve the passed data
    const [doctors, setDoctors] = useState([]);
    const [hospitals, setHospitals] = useState([]); // State for hospitals
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState(null); // State for selected hospital

    useEffect(() => {
        if (selectedData) {
            const specializations = selectedData.doctor.split(',');
            const lastSpecialization = specializations[specializations.length - 1].trim();

            const fetchDoctors = async () => {
                try {
                    const response = await axios.post("http://localhost:8000/getdata", {
                        specialization: lastSpecialization
                    });
                    setDoctors(response.data);
                    // Extract unique hospitals from the fetched doctors
                    const uniqueHospitals = response.data.map(doctor => doctor.department.hospital)
                        .filter((hospital, index, self) =>
                            index === self.findIndex((h) => h.id === hospital.id)
                        );
                    setHospitals(uniqueHospitals); // Set unique hospitals
                } catch (error) {
                    setError("Failed to load doctors and hospitals");
                } finally {
                    setLoading(false);
                }
            };

            fetchDoctors();
        } else {
            setLoading(false);
        }
    }, [selectedData]);

    if (!selectedData) {
        return <p>No data available. Please go back and select a diagnosis.</p>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
            </div> // Centered Loader
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
                        <Button onClick={() => setSelectedHospital(null)}>Back to Hospitals</Button> {/* Button to go back */}
                        <div className="space-y-4 ">
                            {doctors
                                .filter(doctor => doctor.department.hospital.id === selectedHospital.id)
                                .map(doctor => (
                                    <DoctorCard key={doctor.name} doctor={doctor} />
                                ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
