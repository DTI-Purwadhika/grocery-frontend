"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";

import { Category } from "@/constants/entity";
import { categories } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { capitalize } from "@/hooks/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import restService from "@/services/restService";

import OnSave from "../services/onSave";

const CategoryForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<Category>();
  const [loading, setLoading] = useState(true);

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
    OnSave({ createNew, type, id, data, onClose, reset });
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
    <form className="flex flex-col gap-4 items-start" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">{capitalize(type)} Category</h2>
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
