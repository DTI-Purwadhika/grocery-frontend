"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Card, CardBody } from "@nextui-org/card";
import { useQuery } from "@tanstack/react-query";

import { Product } from "@/constants/entity";
import { products } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { toCapital } from "@/services/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import { FileUploader, DataSelector, NumberInput } from "@/components/form";
import { UploadFile } from "@/services/uploadService";
import { Loading } from "@/components/elements";
import { useData, useSaveData } from "@/hooks/useData";
import { fetchData } from "@/services/dataService";

const ProductForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useData({ title: "products", id, type, data: products });
  const { data: stores, isLoading } = useQuery({
    queryKey: [`stores`, "", 1, 100, "id", "asc", "", ""],
    queryFn: fetchData,
    staleTime: 10000,
  });
  const [tempData, setTempData] = useState<Product>(data as Product);
  const [readyData, setReadyData] = useState<Product>();
  const [tempStock, setTempStock] = useState<Product["stocks"]>();
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
    if (type === "update") {
      const images = (data as Product)?.images;

      images.map((image: { url: string }) =>
        fetch(image.url)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], image?.url?.split("/")?.pop() || "image.jpg", {
              type: "image/jpeg",
            });

            setFiles((prevFiles) => [...prevFiles, file]);
          }),
      );
    }
    setTempData(data as Product);
    reset(data as Product);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (type === "create") {
      const newStocks: Product["stocks"] = stores?.content?.map(
        (store: { id: string; name: string }) => ({
          storeId: store.id,
          storeName: store.name,
          stock: 0,
        }),
      );

      setTempStock(newStocks);
    } else {
      setTempStock(tempData.stocks);
    }
  }, [stores]);

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

  useEffect(() => {
    if (readyData) saveProduct();
  }, [readyData]);

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

    if (images) {
      const savedData = { ...tempData, images, stocks: tempStock };

      setTempData(savedData as Product);
      setReadyData(savedData as Product);
      onClose();
    }
  };

  const onStockInput = ({ storeId, stock }: { storeId: string; stock: number }) => {
    const newStocks = tempStock?.map((stocky) => {
      if (stocky.storeId === storeId) {
        return {
          ...stocky,
          stock,
        };
      }

      return stocky;
    });

    setTempStock(newStocks);
  };

  if (!data || loading) {
    return <Loading title="Product Form" />;
  }

  return (
    <Card>
      <CardBody>
        <form className="flex flex-col gap-4 p-4 items-start" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 w-full">
            <Card className="lg:col-span-2" shadow="sm">
              <CardBody className="flex gap-8 p-6 lg:aspect-[3/4]">
                <h2 className="text-2xl font-bold">{toCapital(type)} Product</h2>
                <p className="text-sm">
                  {toCapital(type)} a new product by filling in the fields below.
                </p>
              </CardBody>
            </Card>
            <Card className="lg:col-span-4" shadow="sm">
              <CardBody className="flex gap-4 p-4 aspect-square lg:aspect-[7/5]">
                <FileUploader files={files} isUploading={uploading} setFiles={setFiles} />
              </CardBody>
            </Card>
            <Card className="lg:col-span-3" shadow="sm">
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

            <Card className="lg:col-span-3 h-fit" shadow="sm">
              <CardBody className="flex gap-4 p-4">
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <DataSelector
                      {...field}
                      defaultValue={tempData.category}
                      errorMessage={errors.category?.message?.toString()}
                      isInvalid={errors.category && true}
                      label="Category"
                      selectedKey={field.value}
                      source="categories"
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
                      value={
                        type === "update" ? tempData?.price?.toString() : field.value?.toString()
                      }
                    />
                  )}
                  rules={{ required: "Price is required" }}
                />
              </CardBody>
            </Card>
            <Card className={`lg:col-span-6 h-fit ${isLoading ? "hidden" : ""}`} shadow="sm">
              <CardBody className="flex gap-4 p-4">
                <h3 className="font-semibold text-lg">
                  {toCapital(currentName || "product")} Inventory
                </h3>
                <p className="text-sm">Manage the stock of {currentName} for your store</p>
                <div className="md:grid md:grid-cols-2 gap-4 md:gap-x-8">
                  {tempStock?.map((stock) => (
                    <div
                      key={stock?.storeId}
                      className="flex flex-col md:grid md:grid-cols-2 gap-2 items-center"
                    >
                      <p>{stock?.storeName}</p>
                      <NumberInput
                        value={stock?.stock?.toString() || "0"}
                        onChange={(e) =>
                          onStockInput({
                            storeId: stock?.storeId,
                            stock: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
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
