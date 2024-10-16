"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Snippet } from "@nextui-org/snippet";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { UploadFile } from "@/services/uploadService";
import restService from "@/services/restService";
import { Order } from "@/constants/entity";
import { SingleFileUploader } from "@/components/form";
import { Loading } from "@/components/elements";

const Payment = ({ id }: { id: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Order>({} as Order);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { resultData } = await restService("checkouts/" + id);

      setData(resultData);
      if (resultData.status !== "Menunggu_Pembayaran")
        router.push("/my-cart/checkout/payment-success");
      else setIsLoading(false);
    };

    fetchData();
  }, []);

  const onUpload = async () => {
    if (file === null) {
      alert("Please select images first.");

      return;
    }

    try {
      const response = await UploadFile(file);

      return response.Location;
    } catch (error) {
      alert("Failed to upload file.");

      return false;
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const proofPic = await onUpload();

    setIsUploading(false);
    if (proofPic) {
      restService("checkouts/" + data.id + `?update=${proofPic}&status=upload_proof`, "PUT");
      router.push("/my-cart/checkout/payment-success");
    }
  };

  if (isLoading) {
    return <Loading title="Payment" />;
  }

  return (
    <div className="grid grid-rows-[1fr_auto] h-[79vh] overflow-hidden gap-1">
      <ScrollShadow className="grid grid-rows-[auto_1fr_1fr]">
        <div className="w-full mx-auto h-fit flex flex-col gap-2 p-2">
          <h2 className="text-sm font-semibold">Transfer Amount</h2>
          <Snippet className="text-2xl" size="lg" symbol="Rp" variant="bordered">
            {data.totalPayment}
          </Snippet>
          <h2 className="text-sm font-semibold mt-2">Bank Account (PT. Grocery Sejahtera)</h2>
          <Snippet className="text-2xl" size="lg" symbol=" " variant="bordered">
            1001000101
          </Snippet>
          <h2 className="text-sm font-semibold mt-6">Transfer Instruction</h2>
        </div>
        <Accordion isCompact>
          <AccordionItem key="1" aria-label="Accordion 1" title="Transfer with BI-FAST">
            <ol className="list-decimal py-2 px-4 flex flex-col gap-4">
              <li>
                <strong>Choose a Supported Bank:</strong> First, select a bank that supports
                BI-FAST. Make sure your mobile banking app is up to date.
              </li>
              <li>
                <strong>Access the BI-FAST Transfer Menu:</strong> Open your mobile banking app and
                navigate to the transfer section. Look for the menu related to BI-FAST transfers.
              </li>
              <li>
                <strong>Enter Recipient Details:</strong> Input the recipient&apos;s,
                <strong>payment@grocery.app</strong>
              </li>
              <li>
                <strong>Specify the Transfer Amount:</strong> Enter the amount you want to transfer.
              </li>
              <li>
                <strong>Confirm the Transaction:</strong> Double-check all details and confirm the
                transaction.
              </li>
            </ol>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Transfer from BCA">
            <strong>Use BCA Mobile Banking</strong>
            <ol className="list-decimal py-2 px-4 flex flex-col gap-4 ">
              <li>Open the BCA mobile app.</li>
              <li>Select &apos;m-Transfer&apos;.</li>
              <li>Choose &apos;Transfer Antar Rekening&apos; (Interbank Transfer).</li>
              <li>
                Enter the <strong>1001000101 (PT. Grocery Sejahtera)</strong> as receipt number, the
                transfer amount, and any necessary notes.
              </li>
              <li>Double-check that all the information is correct.</li>
              <li>Confirm the transfer by entering your PIN.</li>
            </ol>
            <br />
            <strong>Use BCA ATM Machine</strong>
            <ol className="list-decimal py-2 px-4 flex flex-col gap-4">
              <li>Visit the nearest BCA ATM.</li>
              <li>Insert your BCA ATM card into the machine.</li>
              <li>Enter your 6-digit BCA ATM PIN.</li>
              <li>Select the &quot;Other Transactions&quot; menu.</li>
              <li>Choose &quot;Transfer&quot; and then &quot;To BCA Account.&quot;</li>
              <li>
                Enter <strong>1001000101 (PT. Grocery Sejahtera)</strong> as receipt number.
              </li>
              <li>Specify the desired transfer amount.</li>
              <li>Confirm the transaction by clicking &quot;Yes.&quot;</li>
              <li>Wait for the BCA transfer receipt to appear.</li>
            </ol>
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Transfer from Other BANK">
            <ol className="list-decimal py-2 px-4 flex flex-col gap-4 ">
              <li>Visit the nearest ATM.</li>
              <li>Insert your ATM card into the machine.</li>
              <li>Enter your 6-digit ATM PIN.</li>
              <li>Select the &quot;Other Transactions&quot; menu.</li>
              <li>Choose &quot;Transfer&quot; and then &quot;To Other Account.&quot;</li>
              <li>
                Enter <strong>014 1001000101 (PT. Grocery Sejahtera)</strong> as receipt number.
              </li>
              <li>Specify the desired transfer amount.</li>
              <li>Confirm the transaction by clicking &quot;Yes.&quot;</li>
              <li>Wait for the transfer receipt to appear.</li>
            </ol>
          </AccordionItem>
        </Accordion>
        <div className={`w-full my-4 px-2 ${file === null ? "h-52" : "aspect-square"}`}>
          <SingleFileUploader file={file} isUploading={isUploading} setFile={setFile} />
        </div>
      </ScrollShadow>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          color="primary"
          isDisabled={(file === null || isUploading) && true}
          radius="sm"
          size="lg"
          onClick={handleUpload}
        >
          <Camera /> {isUploading ? "Uploading..." : "Upload Transfer Proof"}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
