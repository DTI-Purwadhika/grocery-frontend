"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

import { Category } from "@/constants/entity";
import { categories } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { useCapitalize } from "@/hooks/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import restService from "@/services/restService";

import OnSave from "../services/onSave";

const CategoryForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<Category>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { resultData } = await restService(`categories/${id}`, "GET");

        setData(resultData);
        reset(resultData);
      } catch (error) {
        toast.error("Failed to fetch category");
      } finally {
        setLoading(false);
      }
    };

    if (type === "update" && id) {
      fetchData();
    } else {
      setData(categories);
      setLoading(false);
    }
  }, [id, type]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<Category> = (newData) => {
    setData(newData);
    onOpen();
  };

  const onCreate = (createNew: boolean) => {
    OnSave({ createNew, type, id, data, onClose, reset, router, title: "categories" });
  };

  if (loading) {
    return (
      <div>
        <Spinner label="Getting Category..." />{" "}
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody className="w-full gap-4 p-7 grid grid-cols-3">
          <Card shadow="sm">
            <CardBody className="flex gap-8 p-6 ">
              <h2 className="text-2xl font-bold">{useCapitalize(type)} Category</h2>
              <p className="text-sm">
                {useCapitalize(type)} a new category by filling in the fields below.
              </p>
            </CardBody>
          </Card>
          <Card className="col-span-2" shadow="sm">
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
                    placeholder="Daily needs..."
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
                    placeholder="Essentials such as groceries, toiletries, and household supplies that are required for everyday living...."
                    radius={"sm"}
                    value={field.value}
                    variant="bordered"
                  />
                )}
              />
            </CardBody>
          </Card>
        </CardBody>
        <CardFooter className="flex gap-4 px-7 pb-7">
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button
            color="danger"
            type="reset"
            variant="light"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
        </CardFooter>
      </Card>

      <Alert
        isOpen={isOpen}
        title={`This Category will be ${type}d`}
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

export default CategoryForm;
