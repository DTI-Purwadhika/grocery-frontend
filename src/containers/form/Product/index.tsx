"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Card, CardBody } from "@nextui-org/card";

import { Product } from "@/constants/entity";
import { products } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { toCapital } from "@/services/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import { FileUploader, CategorySelect, NumberInput } from "@/components/form";
import { UploadFile } from "@/services/uploadService";
import { Loading } from "@/components/elements";
import { useData, useSaveData } from "@/hooks/useData";

const ProductForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useData({ title: "products", id, type, data: products });
  const [tempData, setTempData] = useState<Product>(data as Product);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: tempData,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [currentName, setCurrentName] = useState("product");
  const [uploading, setUploading] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTempData(data as Product);
    reset(data as Product);
    setLoading(false);
  }, [data]);

  const onReset = () => {
    reset();
    setFiles([]);
  };

  const { mutate: saveProduct } = useSaveData({
    title: "products",
    id,
    type,
    data: tempData,
    createNew,
    reset: onReset,
  });

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

  const onSubmit: SubmitHandler<Product> = (newData) => {
    setTempData(newData);
    onOpen();
  };

  const onCreate = async (createNew: boolean) => {
    setUploading(true);
    setCreateNew(createNew);

    const images = await onUpload();

    setUploading(false);

    const savedData = { ...tempData, images };

    setTempData(savedData as Product);

    if (images) {
      saveProduct();
      onClose();
    }
  };

  if (!data || loading) {
    return <Loading title="Product Form" />;
  }

  return (
    <Card>
      <CardBody>
        <form className="flex flex-col gap-4 p-4 items-start" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-4 w-full">
            <Card className="col-span-2" shadow="sm">
              <CardBody className="flex gap-8 p-6 aspect-[3/4]">
                <h2 className="text-2xl font-bold">{toCapital(type)} Product</h2>
                <p className="text-sm">
                  {toCapital(type)} a new product by filling in the fields below.
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
                      defaultValue={tempData.name}
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
                      defaultValue={tempData.description}
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
                      defaultValue={tempData.category}
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
                      defaultValue={tempData.price?.toString()}
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
                  {toCapital(currentName || "product")} Inventory
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
                  <strong>{tempData.name}</strong>
                </p>
                <p className="mb-4">
                  Category: <br />
                  {tempData.category}
                </p>
              </div>
              <p className="mb-4">
                Price: <br />
                Rp {tempData.price},-
              </p>
              <p>
                Description: <br />
                {tempData.description}
              </p>
            </div>
          </Alert>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProductForm;
