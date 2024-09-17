import { Card, CardBody } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";

import { TitleType } from "@/shares/types";

const Loading = ({ title, noCard = false }: TitleType & { noCard?: boolean }) => {
  const primary = (
    <Spinner
      className="w-full h-full bg-background p-auto"
      label={`Preparing your ${title} for you...`}
    />
  );

  const withCart = (
    <Card className="w-full min-h-96">
      <CardBody className="w-full h-full">{primary}</CardBody>
    </Card>
  );

  return noCard ? primary : withCart;
};

export default Loading;
