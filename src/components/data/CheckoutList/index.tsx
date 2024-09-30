import { AddressCard, PaymentCard } from "./Card";

const Datacheckout = () => {
  return (
    <div className="flex flex-col gap-4">
      <AddressCard />
      <PaymentCard />
    </div>
  );
};

export default Datacheckout;
