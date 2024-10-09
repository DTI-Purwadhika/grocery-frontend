import { Heart } from "lucide-react";

const page = () => {
  return (
    <div className="w-full px-10 text-center flex flex-col items-center h-full justify-center">
      <Heart className="text-foreground-600 mb-4" size={100} />
      <h2 className="text-2xl mb-1">No Favorite Items.</h2>
      <p>Browse our products and add items to your favorite.</p>
    </div>
  );
};

export default page;
