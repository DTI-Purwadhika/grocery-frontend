"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { useEffect, useState } from "react";

import { Category } from "@/constants/entity";
import { categories } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { toCapital } from "@/services/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import { Loading } from "@/components/elements";
import { useData, useSaveData } from "@/hooks/useData";

const CategoryForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useData({ title: "categories", id, type, data: categories });
  const [tempData, setTempData] = useState<Category>(data as Category);
  const [loading, setLoading] = useState(true);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: data,
  });

  useEffect(() => {
    setLoading(true);
    setTempData(data as Category);
    reset(data as Category);
    setLoading(false);
  }, [data]);

  const [createNew, setCreateNew] = useState(false);

  const { mutate: saveCategory } = useSaveData({
    title: "categories",
    id,
    type,
    data: tempData,
    createNew,
    reset,
  });

  const onSubmit: SubmitHandler<Category> = (newData) => {
    setTempData(newData);
    onOpen();
  };

  const onCreate = (createNew: boolean) => {
    setCreateNew(createNew);
    saveCategory();
    onClose();
  };

  if (!data || loading) {
    return <Loading title="Category Form" />;
  }

  return (
    <form id={type + "category"} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody className="w-full gap-4 p-7 grid grid-cols-3">
          <Card shadow="sm">
            <CardBody className="flex gap-8 p-6 ">
              <h2 className="text-2xl font-bold">{toCapital(type)} Category</h2>
              <p className="text-sm">
                {toCapital(type)} a new category by filling in the fields below.
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
                    defaultValue={tempData.name}
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
                    defaultValue={tempData.description}
                    errorMessage={errors.description?.message?.toString()}
                    isInvalid={errors.description && true}
                    label="Description"
                    labelPlacement="outside"
                    placeholder={
                      type === "create"
                        ? "Essentials such as groceries, toiletries, and household supplies that are required for everyday living...."
                        : tempData.description
                    }
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
            <strong>{tempData.name}</strong>
          </p>
          <p>
            Description: <br />
            {tempData.description}
          </p>
        </div>
      </Alert>
    </form>
  );
};

export default CategoryForm;
