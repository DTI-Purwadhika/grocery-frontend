"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { Card, CardBody } from "@nextui-org/card";

import { Product } from "@/constants/entity";
import { products } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { capitalize } from "@/hooks/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import restService from "@/services/restService";

import OnSave from "../services/onSave";

const ProductForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<Product>();
  const [loading, setLoading] = useState(true);

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

  const onCreate = (createNew: boolean) => {
    OnSave({ createNew, type, id, data, onClose, reset });
  };

  if (loading) {
    return (
      <div>
        <Spinner label="Getting Product..." />{" "}
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <form className="flex flex-col gap-4 items-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-6 gap-4 w-full">
        <Card className="col-span-2">
          <CardBody className="flex gap-4 px-6 py-4">
            <h2 className="text-2xl font-bold">{capitalize(type)} Product</h2>
            <p>{capitalize(type)} a new product by filling in the fields below.</p>
          </CardBody>
        </Card>
        <Card className="col-span-4">
          <CardBody className="flex gap-4 p-4" />
        </Card>
        <Card className="col-span-3">
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

        <Card className="col-span-3">
          <CardBody className="flex gap-4 p-4">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={data.category}
                  errorMessage={errors.category?.message?.toString()}
                  isInvalid={errors.category && true}
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Fruits"
                  radius={"sm"}
                  value={field.value}
                  variant="bordered"
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={data.price.toString()}
                  errorMessage={errors.price?.message?.toString()}
                  isInvalid={errors.price && true}
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Fruits"
                  radius={"sm"}
                  type="number"
                  value={field.value?.toString()}
                  variant="bordered"
                />
              )}
            />
          </CardBody>
        </Card>
      </div>
      <div className="flex gap-4">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button
          color="danger"
          type="reset"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
      </div>

      <Alert
        isOpen={isOpen}
        title={`This Product will be ${type}d`}
        onClose={onClose}
        onConfirm={onCreate}
      >
        <div>
          <p className="mb-4">
            Name: <br />
            <strong>{data.name}</strong>
          </p>
          <p>
            Description: <br />
            {data.description}
          </p>
        </div>
      </Alert>
    </form>
  );
};

export default ProductForm;
