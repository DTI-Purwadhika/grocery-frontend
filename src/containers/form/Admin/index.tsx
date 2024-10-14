"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { useEffect, useState } from "react";

import { Admin } from "@/constants/entity";
import { admins } from "@/constants/defaultValue";
import { FormType } from "@/shares/types";
import { toCapital } from "@/services/formatter";
import Alert from "@/components/elements/Alert/SaveAlert";
import { Loading } from "@/components/elements";
import { useData, useSaveData } from "@/hooks/useData";
import { DataSelector, SingleFileUploader } from "@/components/form";
import { UploadFile } from "@/services/uploadService";

const AdminForm = ({ type = "create", id }: FormType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useData({ title: "admins", id, type, data: admins });
  const [tempData, setTempData] = useState<Admin>(data as Admin);
  const [readyData, setReadyData] = useState<Admin>();
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Admin>({
    defaultValues: tempData,
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (type === "update") {
      const image = (data as Admin)?.profilePicture;

      fetch(image)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], image?.split("/")?.pop() || "image.jpg", {
            type: "image/jpeg",
          });

          setFile(file);
        });
    }
    setTempData(data as Admin);
    reset(data as Admin);
    setLoading(false);
  }, [data]);

  const onReset = () => {
    reset();
    setFile(null);
  };

  const { mutate: saveAdmin } = useSaveData({
    title: "admins",
    id,
    type,
    data: tempData,
    createNew,
    reset: onReset,
  });

  useEffect(() => {
    if (readyData) saveAdmin();
  }, [readyData]);

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

  const onSubmit: SubmitHandler<Admin> = (newData) => {
    setTempData(newData);
    onOpen();
  };

  const onCreate = async (createNew: boolean) => {
    setUploading(true);
    setCreateNew(createNew);

    const profilePicture = await onUpload();
    const newTempData = { ...tempData, profilePicture };

    setTempData(newTempData as Admin);
    setUploading(false);
    if (profilePicture) {
      setReadyData(newTempData as Admin);
      onClose();
    }
  };

  if (!data || loading) {
    return <Loading title="Admin Form" />;
  }

  return (
    <form id={type + "admin"} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody className="w-full gap-4 p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card shadow="sm">
            <CardBody className="flex gap-8 p-6 ">
              <h2 className="text-2xl font-bold">{toCapital(type)} Admin</h2>
              <p className="text-sm">
                {toCapital(type)} a new admin by filling in the fields below.
              </p>
            </CardBody>
          </Card>
          <div className="flex flex-col gap-4">
            <Card className="h-fit" shadow="sm">
              <CardBody className="flex gap-4 p-4">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      isRequired
                      defaultValue={tempData.name}
                      errorMessage={errors.name?.message?.toString()}
                      isInvalid={errors.name && true}
                      label={"Name"}
                      labelPlacement="outside"
                      placeholder="Jane Doe..."
                      radius={"sm"}
                      value={field.value}
                      variant={"bordered"}
                    />
                  )}
                  rules={{ required: "Name is required" }}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      isRequired
                      defaultValue={tempData.email}
                      errorMessage={errors.email?.message?.toString()}
                      isInvalid={errors.email && true}
                      label={"Email"}
                      labelPlacement="outside"
                      placeholder="jane.doe@cisrt.com..."
                      radius={"sm"}
                      type="email"
                      value={field.value}
                      variant={"bordered"}
                    />
                  )}
                  rules={{
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                  }}
                />
              </CardBody>
            </Card>
            <Card className="col-span-3 h-fit" shadow="sm">
              <CardBody className="flex gap-4 p-4 h-fit">
                <Controller
                  control={control}
                  name="storeId"
                  render={({ field }) => (
                    <DataSelector
                      {...field}
                      isRequired
                      defaultValue={tempData.storeId}
                      errorMessage={errors.storeId?.message?.toString()}
                      isInvalid={errors.storeId && true}
                      label="Store"
                      selectedKey={tempData?.storeId || field.value}
                      source="stores"
                      value={field.value}
                    />
                  )}
                  rules={{ required: "Store is required" }}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      isRequired
                      defaultValue={tempData.password}
                      errorMessage={errors.password?.message?.toString()}
                      isInvalid={errors.password && true}
                      label={"Password"}
                      labelPlacement="outside"
                      placeholder="********"
                      radius={"sm"}
                      type="password"
                      value={field.value}
                      variant={"bordered"}
                    />
                  )}
                  rules={{
                    required: "Password is required",
                    // pattern: {
                    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                    //   message:
                    //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
                    // },
                  }}
                />
              </CardBody>
            </Card>
          </div>
          <Card className="md:col-span-2 lg:col-span-1" shadow="sm">
            <CardBody className="flex gap-4 p-4 aspect-square md:aspect-video lg:aspect-square">
              <SingleFileUploader file={file} isUploading={uploading} setFile={setFile} />
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
        title={`This Admin will be ${type}d`}
        onClose={onClose}
        onConfirm={onCreate}
      >
        <div>
          <p className="mb-4">
            Name: <br />
            <strong>{tempData.name}</strong>
          </p>
          <p className="mb-4">
            Email: <br />
            <strong>{tempData.email}</strong>
          </p>
          <p className="mb-4">
            Assigned to: <br />
            <strong>{tempData.storeId}</strong>
          </p>
        </div>
      </Alert>
    </form>
  );
};

export default AdminForm;
