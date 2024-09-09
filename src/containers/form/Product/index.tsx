"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { Card, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";

import { Product } from "@/constants/entity";
import { products } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { useCapitalize } from "@/hooks/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import restService from "@/services/restService";
import FileUploader from "@/components/form/FileUploader";
import CategorySelect from "@/components/form/CategorySelect";
import NumberInput from "@/components/form/NumberInput";
import { UploadFile } from "@/services/uploadService";

import OnSave from "../services/onSave";

const ProductForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<Product>();
  const [files, setFiles] = useState<File[]>([]);
  const [currentName, setCurrentName] = useState("product");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { resultData } = await restService(`products/${id}`, "GET");

        setData(resultData);
        reset(resultData);
      } catch (error) {
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (type === "update" && id) {
      fetchData();
    } else {
      setData(products);
      setLoading(false);
    }
  }, [id, type]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<Product> = (newData) => {
    setData(newData);
    onOpen();
  };

  const onCreate = async (createNew: boolean) => {
    setUploading(true);
    const images = await onUpload();

    setUploading(false);

    const savedData = { ...data, images };

    if (images) {
      OnSave({
        createNew,
        type,
        id,
        data: savedData,
        onClose,
        reset: () => onReset(),
        router,
        title: "products",
      });
    }
  };

  const onReset = () => {
    reset();
    setFiles([]);
  };

  const onUpload = async () => {
    if (files.length === 0) {
      alert("Please select images first.");

      return;
    }

    try {
      const newImages: Product["images"] = [];

      for (const file of files) {
        const response = await UploadFile(file);

        newImages.push({
          url: response.Location,
          altText: file.name,
        });
      }

      return newImages;
    } catch (error) {
      alert("Failed to upload files.");

      return false;
    }
  };

  if (loading)
    <div>
      <Spinner label="Getting Product..." />
    </div>;

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Card>
      <CardBody>
        <form className="flex flex-col gap-4 p-4 items-start" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-4 w-full">
            <Card className="col-span-2" shadow="sm">
              <CardBody className="flex gap-8 p-6 aspect-[3/4]">
                <h2 className="text-2xl font-bold">{useCapitalize(type)} Product</h2>
                <p className="text-sm">
                  {useCapitalize(type)} a new product by filling in the fields below.
                </p>
              </CardBody>
            </Card>
            <Card className="col-span-4" shadow="sm">
              <CardBody className="flex gap-4 p-4">
                <FileUploader files={files} isUploading={uploading} setFiles={setFiles} />
              </CardBody>
            </Card>
            <Card className="col-span-3" shadow="sm">
              <CardBody className="flex gap-4 p-4">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      defaultValue={data.name}
                      errorMessage={errors.name?.message?.toString()}
                      isInvalid={errors.name && true}
                      label={"Name"}
                      labelPlacement="outside"
                      placeholder="Strawberry... "
                      radius={"sm"}
                      value={field.value}
                      variant={"bordered"}
                      onBlur={() => setCurrentName(field.value)}
                    />
                  )}
                  rules={{ required: "Name is required" }}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      defaultValue={data.description}
                      errorMessage={errors.description?.message?.toString()}
                      isInvalid={errors.description && true}
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Juicy, sweet, and packed with vitamins, making them a delicious and healthy treat..."
                      radius={"sm"}
                      value={field.value}
                      variant="bordered"
                    />
                  )}
                />
              </CardBody>
            </Card>

            <Card className="col-span-3 h-fit" shadow="sm">
              <CardBody className="flex gap-4 p-4">
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <CategorySelect
                      {...field}
                      defaultValue={data.category}
                      errorMessage={errors.category?.message?.toString()}
                      isInvalid={errors.category && true}
                      label="Category"
                      selectedKey={field.value}
                      value={field.value}
                    />
                  )}
                  rules={{ required: "Category is required" }}
                />
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      isRequired
                      defaultValue={data.price?.toString()}
                      endContent=",-"
                      errorMessage={errors.price?.message?.toString()}
                      isInvalid={errors.price && true}
                      label="Price"
                      placeholder="10000..."
                      startContent="Rp"
                      value={field.value?.toString()}
                    />
                  )}
                  rules={{ required: "Price is required" }}
                />
              </CardBody>
            </Card>

            <Card className="col-span-6 h-fit" shadow="sm">
              <CardBody className="flex gap-4 p-4">
                <h3 className="font-semibold text-lg">
                  {useCapitalize(currentName || "product")} Inventory
                </h3>
                <p className="text-sm">Manage the stock of {currentName} for your store</p>
              </CardBody>
            </Card>
          </div>
          <div className="flex gap-4 mt-4">
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button
              color="danger"
              type="reset"
              variant="light"
              onClick={() => {
                onReset();
              }}
            >
              Reset
            </Button>
          </div>

          <Alert
            isDisabled={uploading}
            isOpen={isOpen}
            isUpload={uploading}
            title={`This Product will be ${type}d`}
            onClose={onClose}
            onConfirm={onCreate}
          >
            <div>
              <div className="grid grid-cols-2">
                <p className="mb-4">
                  Name: <br />
                  <strong>{data.name}</strong>
                </p>
                <p className="mb-4">
                  Category: <br />
                  {data.category}
                </p>
              </div>
              <p className="mb-4">
                Price: <br />
                Rp {data.price},-
              </p>
              <p>
                Description: <br />
                {data.description}
              </p>
            </div>
          </Alert>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProductForm;
