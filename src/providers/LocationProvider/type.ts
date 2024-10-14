export type LatLng = {
  lat: number;
  lng: number;
};

export type LocationContextType = {
  latLng: LatLng;
  setLocation: ({ lat, lng }: LatLng) => void;
};
