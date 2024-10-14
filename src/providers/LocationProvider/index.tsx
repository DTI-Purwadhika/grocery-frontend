"use client";
import { ChildType } from "@/shares/types";
import { useState } from "react";
import { useContext, createContext } from "react";
import { LatLng, LocationContextType } from "./type";

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
};

export const LocationProvider = ({ children }: ChildType) => {
  const [latLng, setLatLng] = useState<LatLng>({ lat: 0, lng: 0 });

  const setLocation = ({ lat, lng }: LatLng) => {
    setLatLng({ lat: lat, lng: lng });
  };

  return (
    <>
      <LocationContext.Provider value={{ latLng, setLocation }}>
        {children}
      </LocationContext.Provider>
    </>
  );
};
