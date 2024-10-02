import { Datacheckout, Total } from "@/components/data";

const Checkout = () => {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <Datacheckout />
      <Total source="checkout" />
    </div>
  );
};

export default Checkout;
