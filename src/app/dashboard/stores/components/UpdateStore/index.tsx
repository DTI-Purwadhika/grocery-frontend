"use client";
import React, { useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import { City } from "@/constants/city";
import useCities from "@/hooks/useCities";
import { useRouter } from "next/navigation";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useStore } from "@/hooks/useStore";
import { useParams } from "next/navigation";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type storeData = {
  name: string | undefined;
  address: string | undefined;
  cityId: number;
  postcode: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
};

interface Suggestion {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: {
    postcode?: string;
    [key: string]: string | undefined;
  };
}

interface LatLng {
  lat: number;
  lng: number;
}

interface DraggableMarkerProps {
  position: LatLng;
  setPosition: (position: LatLng) => void;
}

const DraggableMarker: React.FC<DraggableMarkerProps> = ({ position, setPosition }) => {
  const markerRef = useRef<L.Marker | null>(null);
  const map = useMap();

  useEffect(() => {
    map.panTo(position);
  }, [map, position]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.on("dragend", () => {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          map.panTo(newPosition);
        }
      });
    }
  }, [map, setPosition]);

  return <Marker draggable={true} position={position} ref={markerRef} />;
};

export const UpdateStoreForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const cookieValue = getCookie("Sid");
  const cities: City[] = useCities();
  const [position, setPosition] = useState<LatLng>({ lat: -7.257472, lng: 112.75209 });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { store } = useStore(id);
  const {
    control,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<storeData>({
    defaultValues: {
      name: "",
      address: "",
      postcode: "",
      cityId: 0,
      lat: position.lat,
      lng: position.lng,
    },
  });
  const postcode = watch("postcode");

  useEffect(() => {
    setValue("name", store?.name);
    setValue("address", store?.address);
    setValue("postcode", store?.postcode);
    setValue("lat", store?.lat);
    setValue("lng", store?.lng);
  }, [store, setValue]);

  useEffect(() => {
    setValue("lat", position?.lat);
    setValue("lng", position?.lng);
  }, [position, setValue]);

  const handlePostcodeChange = async (postcode: string) => {
    if (postcode.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&country=id&addressdetails=1&postalcode=${postcode}`,
        );
        const data: Suggestion[] = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching postcode suggestions");
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = useCallback(
    (suggestion: Suggestion) => {
      const selectedPostCode = suggestion.address?.postcode || postcode;
      setValue("postcode", selectedPostCode);
      setValue("address", suggestion.display_name);
      const newPosition = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) };
      setPosition(newPosition);
      setSuggestions([]);
    },
    [setValue, postcode],
  );

  const onSubmit = async (data: storeData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/stores/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          Authorization: `Bearer ${cookieValue}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update store");
      }
      reset();
      toast.success("Store updated successfully", { position: "top-center", duration: 3000 });
      setTimeout(() => {
        router.push("/dashboard/stores");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update store", { position: "top-center" });
    }
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold text-center">Update Store Details</h2>
        <div className="flex mt-3 gap-4 flex-col lg:flex-row">
          <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex flex-col w-full">
            <div className="flex flex-col gap-2 lg:gap-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    isRequired
                    {...field}
                    type="text"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter store name"
                    autoComplete="off"
                  />
                )}
              />
              {errors.name?.message && <div className="text-red-500">{errors.name.message}</div>}

              <Controller
                name="address"
                rules={{ required: "Address is required" }}
                control={control}
                render={({ field }) => (
                  <Textarea
                    isRequired
                    {...field}
                    label="Address"
                    labelPlacement="outside"
                    placeholder="Enter store address"
                    autoComplete="off"
                  />
                )}
              />
              {errors.address?.message && (
                <div className="text-red-500">{errors.address.message}</div>
              )}

              <Controller
                name="postcode"
                rules={{ required: "Postcode is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handlePostcodeChange(e.target.value);
                    }}
                    label="Postcode"
                    labelPlacement="outside"
                    placeholder="Enter postcode"
                    autoComplete="off"
                  />
                )}
              />
              {errors.postcode?.message && (
                <div className="text-red-500">{errors.postcode.message}</div>
              )}

              {suggestions.length > 0 && (
                <ul className="bg-white border border-gray-300">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}
              <Autocomplete
                isRequired
                defaultItems={cities}
                placeholder="Search a city"
                onSelectionChange={(selected) => {
                  setValue("cityId", Number(selected?.toString()));
                }}
                label="Select a city"
                labelPlacement="outside"
              >
                {(city) => <AutocompleteItem key={city.id}>{city.name}</AutocompleteItem>}
              </Autocomplete>
            </div>
            <Button type="submit" className="w-full bg-green-600 text-white font-semibold">
              Save
            </Button>
          </form>
          <div className="w-full h-64 lg:h-auto">
            <MapContainer
              center={[position.lat, position.lng]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <DraggableMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};
