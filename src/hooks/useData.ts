import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Admin, Category, Order, Product } from "@/constants/entity";
import { fetchById, saveData } from "@/services/dataService";

type dataType = {
  title: string;
  type?: "create" | "update";
  id: number | string | undefined;
  data?: Category | Product | Admin | Order;
};

type saveType = {
  createNew: boolean;
  reset: () => void;
};

export const useData = ({ title, id, type, data }: dataType) => {
  return useQuery({
    queryKey: [title, id],
    queryFn: () => fetchById(title, id!),
    enabled: type === "update" && !!id,
    placeholderData: data,
  });
};

export const useSaveData = ({
  title,
  type = "create",
  id,
  data,
  createNew,
  reset,
}: dataType & saveType) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => saveData(title, type, id, data!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [title, id] });
      toast.success(`Successfully ${type}d a ${title}`);
      if (createNew) {
        reset();
      } else {
        router.push(`/dashboard/${title}`);
      }
    },
    onError: () => {
      toast.error(`Failed to ${type} a ${title}`);
    },
  });
};
