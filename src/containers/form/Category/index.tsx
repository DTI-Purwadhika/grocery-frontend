"use client";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import restService from "@/services/restService";
import { Category } from "@/constants/entity";
import { categories } from "@/constants/defaultValue";
import Alert from "@/components/elements/SaveAlert";
import { FormType } from "@/shares/types";
import { capitalize } from "@/hooks/formatter";

const CategoryForm = ({ type = "create" }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<Category>(categories);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: categories,
  });

  const onSubmit: SubmitHandler<Category> = (newData) => {
    setData(newData);
    onOpen();
  };

  const handleCreate = (createNew: boolean) => {
    restService("categories", "POST", data);
    onClose();
    toast.success("Category has been created");

    if (createNew) reset();
    else router.push("/dashboard/categories");
  };

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
        title="This Category will be created"
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

export default CategoryForm;
