import { AddressCard, PaymentCard, ShippingCard } from "./Card";

const Datacheckout = () => {
  return (
    <div className="flex flex-col gap-4">
      <AddressCard />
      <PaymentCard />
      <ShippingCard />
    </div>
  );
};

export default Datacheckout;
