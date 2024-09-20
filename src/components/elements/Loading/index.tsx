import { Spinner } from "@nextui-org/spinner";

import { TitleType } from "@/shares/types";

const Loading = ({ title }: TitleType) => (
  <Spinner
    className="w-full h-full bg-background p-auto"
    label={`Preparing your ${title} for you...`}
  />
);

export default Loading;
