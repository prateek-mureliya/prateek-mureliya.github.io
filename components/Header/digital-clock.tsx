"use client";

import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "../UI/skeleton";
import { useLocalStorage } from "@/hook/useLocalStorage";
import { cn } from "@/lib/utils";
import {
  getAMPM,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
} from "@/lib/date-utils";

export default function DigitalClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useLocalStorage("is24Hour", false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    setMounted(true);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";

    const day = getDay(time);
    const month = getMonth(time);
    const date = getDate(time);
    const hours = getHours(time, is24Hour);
    const minutes = getMinutes(time);
    const ampm = getAMPM(time, is24Hour);

    return `${day}, ${date} ${month}, ${hours}:${minutes}${ampm}`;
  }, [time, is24Hour, mounted]);

  const is24HourHandler = () => {
    setIs24Hour(!is24Hour);
  };

  const className =
    "self-center col-start-2 justify-self-center cursor-default select-none";

  return mounted ? (
    <div
      role='system-date-time'
      className={cn("text-sm h-fit", className)}
      onClick={is24HourHandler}
    >
      {formattedTime}
    </div>
  ) : (
    <Skeleton className={cn("h-[20px] w-[140px] rounded-full", className)} />
  );
}
