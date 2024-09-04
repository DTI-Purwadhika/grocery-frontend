"use client";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";

import restService from "@/services/restService";
import { Product } from "@/constants/entity";
import { products } from "@/constants/defaultValue";
import Alert from "@/components/elements/Alert/SaveAlert";
import { FormType } from "@/shares/types";
import { capitalize } from "@/hooks/formatter";

const ProductForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { resultData } = await restService(`products/${id}`, "GET");

        setData(resultData);
        reset(resultData);
      } catch (error) {
        toast.error("Failed to fetch Product");
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

  const handleCreate = (createNew: boolean) => {
    if (type === "update") {
      restService(`products/${id}`, "PUT", data);
    } else {
      restService(`products`, "POST", data);
    }
    onClose();
    toast.success(`Product has been ${type}d`);

    if (createNew) reset();
    else router.push("/dashboard/products");
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
      <h2 className="text-2xl font-bold">{capitalize(type)} Product</h2>
      <div className="grid grid-cols-2 w-full gap-8">
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
              radius={"sm"}
              value={field.value}
              variant="bordered"
            />
          )}
        />
      </div>
      <ButtonGroup>
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
      </ButtonGroup>

      <Alert
        isOpen={isOpen}
        title={`This Product will be ${type}d`}
        onClose={onClose}
        onConfirm={handleCreate}
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
