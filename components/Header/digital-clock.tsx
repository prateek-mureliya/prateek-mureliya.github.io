"use client";

import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "../UI/skeleton";
import { is24HourStorage } from "@/lib/storage";
import { Tooltip, TooltipContent, TooltipTrigger } from "../UI/tooltip";

export default function DigitalClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(is24HourStorage.get());
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";

    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      time.getDay()
    ];

    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][time.getMonth()];

    const date = time.getDate().toString().padStart(2, "0");
    const hh = time.getHours();

    const hours = is24Hour
      ? hh.toString().padStart(2, "0")
      : (hh % 12 || 12).toString().padStart(2, "0");

    const minutes = time.getMinutes().toString().padStart(2, "0");

    const ampm = is24Hour ? "" : hh > 11 ? " PM" : " AM";

    return `${day}, ${date} ${month}, ${hours}:${minutes}${ampm}`;
  }, [time, is24Hour, mounted]);

  const is24HourHandler = () => {
    setIs24Hour(!is24Hour);
    is24HourStorage.set(!is24Hour);
  };

  return mounted ? (
    <Tooltip>
      <TooltipTrigger>
        <div
          role='system-date-time'
          className='text-sm cursor-default select-none'
          onClick={is24HourHandler}
        >
          {formattedTime}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        Switch to {is24Hour ? 12 : 24}-hour format
      </TooltipContent>
    </Tooltip>
  ) : (
    <Skeleton className='h-[20px] w-[130px] rounded-full' />
  );
}
