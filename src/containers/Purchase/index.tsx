"use client";

import { DateRangePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { SharedSelection } from "@nextui-org/system";

import { SearchBar } from "@/components/elements";
import { Datapurchase } from "@/components/data";

const Purchase = () => {
  const [date, setDate] = useState<{ start: CalendarDate; end: CalendarDate }>({
    start: today(getLocalTimeZone()).subtract({ days: 7 }),
    end: today(getLocalTimeZone()),
  });
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState("7");
  const [sort, setSort] = useState("date...desc");

  const handleRageChange = (value: SharedSelection) => {
    switch (value.currentKey) {
      case "thismonth":
        setDate({
          start: today(getLocalTimeZone()).set({ day: 1 }),
          end: today(getLocalTimeZone()),
        });
        break;
      case "thisyear":
        setDate({
          start: today(getLocalTimeZone()).set({ month: 1, day: 1 }),
          end: today(getLocalTimeZone()),
        });
        break;
      case "custom":
        setDate({
          start: today(getLocalTimeZone()).subtract({ days: 7 }),
          end: today(getLocalTimeZone()),
        });
        break;
      default:
        setDate({
          start: today(getLocalTimeZone()).subtract({ days: parseInt(value.currentKey as string) }),
          end: today(getLocalTimeZone()),
        });
        break;
    }

    setRange(value.currentKey as string);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="hidden">
        <SearchBar title={"purchases"} />
        <div className="grid grid-cols-3 gap-2">
          <Select
            isRequired
            aria-label="Purchases Range"
            defaultSelectedKeys={[range]}
            onSelectionChange={(value) => handleRageChange(value)}
          >
            <SelectItem key={"1"}>1 Day</SelectItem>
            <SelectItem key={"7"}>7 Day</SelectItem>
            <SelectItem key={"thismonth"}>This Month</SelectItem>
            <SelectItem key={"31"}>1 Month</SelectItem>
            <SelectItem key={"thisyear"}>This Year</SelectItem>
            <SelectItem key={"365"}>1 Year</SelectItem>
            <SelectItem key={"custom"}>Custom Range</SelectItem>
          </Select>
          <Select
            isRequired
            aria-label="Purchases Status"
            defaultSelectedKeys={[status]}
            onSelectionChange={(value) => setStatus(value.currentKey as string)}
          >
            <SelectItem key={"all"}>All</SelectItem>
            <SelectItem key={"menunggu_pembayaran"}>Waiting for Payment</SelectItem>
            <SelectItem key={"menunggu_konfirmasi_pembayaran"}>Waiting for Confirmation</SelectItem>
            <SelectItem key={"diproses"}>Processed</SelectItem>
            <SelectItem key={"dikirim"}>Shipped</SelectItem>
            <SelectItem key={"pesanan_dikonfirmasi"}>Confirmed</SelectItem>
            <SelectItem key={"dibatalkan"}>Cancelled</SelectItem>
          </Select>
          <Select
            isRequired
            aria-label="Purchases Sort"
            defaultSelectedKeys={[sort]}
            onSelectionChange={(value) => setSort(value.currentKey as string)}
          >
            <SelectItem key={"date...desc"}>Newest</SelectItem>
            <SelectItem key={"date...asc"}>Oldest</SelectItem>
          </Select>
        </div>
        <div className={`w-full ${range === "custom" ? "block" : "hidden"}`}>
          <DateRangePicker
            aria-label="Purchases Range"
            defaultValue={date}
            isReadOnly={range !== "custom"}
            maxValue={today(getLocalTimeZone())}
            value={date}
            variant="bordered"
            onChange={setDate}
          />
        </div>
      </div>
      {/* <div className="w-full px-10 text-center flex flex-col items-center h-full justify-center">
        <Scroll className="text-foreground-600 mb-4" size={100} />
        <h2 className="text-2xl mb-1">There's no purchases</h2>
        <p>Browse our products and purchase an item.</p>
      </div> */}
      <Datapurchase />
    </div>
  );
};

export default Purchase;
