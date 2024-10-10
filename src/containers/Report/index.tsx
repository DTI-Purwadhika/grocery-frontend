"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { LogIn, LogOut, MoveDown, MoveUp, Rabbit, Turtle } from "lucide-react";

import { Datatable } from "@/components/data";
import { StockReport } from "@/constants/field";
import { DataSelect } from "@/components/elements";

const Report = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Supply Chain Insights",
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = ["Baby Product", "Vegetables", "Fruits", "Meat", "Fish", "Other"];

  const data = {
    labels,
    datasets: [
      {
        label: "Inbound",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 0",
      },
      {
        label: "Outbound",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardBody className="flex flex-col gap-1">
            <h3 className="flex flex-row gap-2 font-medium mb-3">
              <Rabbit /> Top Mover
            </h3>
            <div className="text-4xl font-semibold flex flex-row justify-center items-center gap-4">
              <p className="flex flex-row items-center text-primary">
                <MoveUp /> 100
              </p>
              <p className="items-center flex flex-row text-danger">
                80
                <MoveDown />
              </p>
            </div>
            <p className="text-center font-medium">Baby Product</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex flex-col gap-1">
            <h3 className="flex flex-row gap-2 font-medium mb-3">
              <Turtle /> Slowest Mover
            </h3>
            <div className="text-4xl font-semibold flex flex-row justify-center items-center gap-4">
              <p className="flex flex-row items-center text-primary">
                <MoveUp /> 0
              </p>
              <p className="items-center flex flex-row text-danger">
                0
                <MoveDown />
              </p>
            </div>
            <p className="text-center font-medium">Fruits</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex flex-col gap-1">
            <h3 className="flex flex-row gap-2 font-medium mb-3">
              <LogOut /> Highest Outbound
            </h3>
            <p className="text-4xl font-semibold text-center text-danger">0</p>
            <p className="text-center font-medium">Fruits</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex flex-col gap-1">
            <h3 className="flex flex-row gap-2 font-medium mb-3">
              <LogIn /> Highest Inbound
            </h3>
            <p className="text-4xl font-semibold text-center text-primary">0</p>
            <p className="text-center font-medium">Fruits</p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardBody className="flex flex-col gap-4 px-8 py-6">
          <div className="flex flex-row gap-4">
            <DataSelect source="categories" />
            <DataSelect source="stores" />
          </div>
          <Bar data={data} options={options} />
        </CardBody>
      </Card>
      <div />
      <Datatable
        columns={StockReport.columns}
        defaultCol={StockReport.selected}
        title="stock-history"
      />
    </div>
  );
};

export default Report;
