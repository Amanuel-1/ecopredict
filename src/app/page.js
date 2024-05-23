import Image from "next/image";
import { InputTabs } from "./components/tabs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InputTabs/>
    </main>
  );
}
