import React, { useEffect, useState } from "react";
import { useLocation } from "@/providers/LocationProvider";

export const Location: React.FC = () => {
  //   const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLocation } = useLocation();

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Permission denied. Unable to retrieve location.");
              console.error(error);
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              console.error(error);
              break;
            case error.TIMEOUT:
              setError("Location request timed out.");
              console.error(error);
              break;
            default:
              setError("An unknown error occurred.");
              console.error(error);
              break;
          }
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      console.error(error);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return <></>;
};
