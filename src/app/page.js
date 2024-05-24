'use client'
import Image from "next/image";
import { InputTabs } from "./components/tabs";
import { Typography } from "@material-tailwind/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography className="text-3xl font-extrabold mb-3">
        Ecommerce customers Yearly Expenditure Predicter
      </Typography>
      <InputTabs/>
    </main>
  );
}
