"use client";
import { AddressDataResponse, useAddress } from "@/hooks/useAddress";
import { getPrimaryAddress, PrimaryAddress } from "@/hooks/PrimaryAddress";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Pin, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Delivery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [deleteAddressModal, setDeleteAddressModal] = useState<boolean>(false);
  const [willDeleteAddressId, setWillDeleteAddressId] = useState<number>(0);
  const primaryAddressData: PrimaryAddress | undefined = getPrimaryAddress();
  const addresses: AddressDataResponse[] | undefined = useAddress();
  const [primaryAddressId, setPrimaryAddressId] = useState<number>();
  const [primaryAddressName, setPrimaryAddressName] = useState<string>();
  const [primaryAddressCity, setPrimaryAddressCity] = useState<string>();
  const cookieValue = getCookie("Sid");

  useEffect(() => {
    setPrimaryAddressId(primaryAddressData?.id);
    setPrimaryAddressName(primaryAddressData?.addressName);
    setPrimaryAddressCity(primaryAddressData?.city);
  }, [primaryAddressData]);

  const closeDeleteAddressModal = () => {
    setDeleteAddressModal(false);
  };

  const choosePrimaryAddress = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/change-primary-address/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: `Bearer ${cookieValue}`,
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to change primary address");
      }

      const data = await response.json();

      setPrimaryAddressId(id);
      setPrimaryAddressName(data.data.addressName);
      setPrimaryAddressCity(data.data.city);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAddress = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/${willDeleteAddressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: `Bearer ${cookieValue}`,
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      setWillDeleteAddressId(0);
      closeDeleteAddressModal();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const addressContent = (
    <div className="flex flex-col gap-2 ">
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <>
            <Card key={address.id} shadow="sm">
              <CardBody className="flex flex-col justify-between px-5 py-4 items-end">
                <div className="flex flex-col gap-2">
                  {/* <h3 className="font-semibold text-md">Primary Address</h3> */}
                  <div className="flex flex-row items-start gap-2 text-xs">
                    {primaryAddressId === address.id && (
                      <Pin className="text-primary text-sm w-6 h-6" />
                    )}
                    <p>
                      <span className="font-bold">Address Line:</span> {address.addressName}
                      <br />
                      <br />
                      <span className="font-bold">City:</span> {address.city}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                  {primaryAddressId !== address.id && (
                    <>
                      <Button
                        color="primary"
                        size="sm"
                        onPress={() => choosePrimaryAddress(address.id)}
                      >
                        Choose
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    color="danger"
                    isIconOnly
                    onPress={() => {
                      setWillDeleteAddressId(address.id);
                      setDeleteAddressModal(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                  <Link href={`/my-cart/checkout/${address.id}/update-address`}>
                    <Button size="sm" isIconOnly color="default">
                      <FaPencilAlt />
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </>
        ))
      ) : (
        <>
          <p className="font-semibold text-sm">
            You have no address yet, please add a new address.
          </p>
        </>
      )}
    </div>
  );

  return (
    <>
      <Card shadow="sm">
        <CardBody
          className="flex flex-row justify-between px-5 py-4 cursor-pointer hover:bg-default-100"
          onClick={() => onOpen()}
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-md">Delivery Address</h3>
            <div className="flex flex-row items-start gap-2 text-xs">
              <Pin className="text-primary text-sm" size={16} />
              <p>
                {primaryAddressName}
                <br />
                <br />
                {primaryAddressCity}
              </p>
            </div>
          </div>
          <ChevronRight />
        </CardBody>
      </Card>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Choose Delivery Address</ModalHeader>
              <ModalBody>{addressContent}</ModalBody>
              <ModalFooter>
                <Link href="/my-cart/checkout/create-address">
                  <Button color="success" variant="light">
                    Add New Address
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        classNames={{
          closeButton: "hover:bg-red-500 transition duration-300 text-black",
        }}
        backdrop={"blur"}
        isOpen={deleteAddressModal}
        onClose={closeDeleteAddressModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Address</ModalHeader>
              <ModalBody>
                <p className="font-semibold">
                  Are you sure you want to delete this address? This action can't be undone!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={deleteAddress}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Delivery;
