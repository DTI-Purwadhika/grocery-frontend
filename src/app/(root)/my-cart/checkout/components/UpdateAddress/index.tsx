/* eslint-disable */
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
import { useRouter } from "next/navigation";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useParams } from "next/navigation";

import useCities from "@/hooks/useCities";
import { City } from "@/constants/city";
import { AddressDataResponse, getAddress } from "@/hooks/getAddress";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type addressData = {
  addressName: string;
  cityId: number;
  postcode: string;
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

  return <Marker ref={markerRef} draggable={true} position={position} />;
};

export const UpdateAddressForm: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const address: AddressDataResponse | undefined = getAddress(Number(id));
  const router = useRouter();
  const cookieValue = getCookie("Sid");
  const cities: City[] = useCities();
  const [position, setPosition] = useState<LatLng>({ lat: -7.257472, lng: 112.75209 });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const {
    control,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addressData>({
    defaultValues: {
      addressName: "",
      postcode: "",
      cityId: 0,
    },
  });
  const postcode = watch("postcode");

  useEffect(() => {
    setValue("addressName", address?.addressName || "");
    setValue("postcode", address?.postcode || "");
    setValue("lat", address?.lat);
    setValue("lng", address?.lng);
  }, [address, setValue]);

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
      setValue("addressName", suggestion.display_name);
      const newPosition = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) };

      setPosition(newPosition);
      setSuggestions([]);
    },
    [setValue, postcode],
  );

  const onSubmit = async (data: addressData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/${Number(id)}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            Authorization: `Bearer ${cookieValue}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update address");
      }
      setIsLoading(false);
      reset();
      toast.success("Address updated successfully", { position: "top-center", duration: 3000 });
      setTimeout(() => {
        router.push("/my-cart/checkout");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update address", { position: "top-center" });
    }
    console.log(data);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold text-center">Update Address</h2>
        <div className="flex mt-3 gap-4 flex-col lg:flex-row">
          <form className="gap-6 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 lg:gap-4">
              <Controller
                control={control}
                name="addressName"
                render={({ field }) => (
                  <Textarea
                    isRequired
                    {...field}
                    autoComplete="off"
                    label="Address"
                    labelPlacement="outside"
                    placeholder="Enter store address"
                  />
                )}
                rules={{ required: "Address is required" }}
              />
              {errors.addressName?.message && (
                <div className="text-red-500">{errors.addressName.message}</div>
              )}

              <Controller
                control={control}
                name="postcode"
                render={({ field }) => (
                  <Input
                    isRequired
                    {...field}
                    autoComplete="off"
                    label="Postcode"
                    labelPlacement="outside"
                    placeholder="Enter postcode"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handlePostcodeChange(e.target.value);
                    }}
                  />
                )}
                rules={{ required: "Postcode is required" }}
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
                label="Select a city"
                labelPlacement="outside"
                placeholder="Search a city"
                onSelectionChange={(selected) => {
                  setValue("cityId", Number(selected?.toString()));
                }}
              >
                {(city) => <AutocompleteItem key={city.id}>{city.name}</AutocompleteItem>}
              </Autocomplete>
            </div>

            <Button
              isDisabled={isLoading}
              type="submit"
              className="w-full bg-green-600 text-white font-semibold"
            >
              {isLoading ? "Loading..." : "Save"}

            </Button>
          </form>
          <div className="w-full h-64 lg:h-auto">
            <MapContainer
              center={[position.lat, position.lng]}
              style={{ height: "100%", width: "100%" }}
              zoom={13}
            >
              <TileLayer
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};
