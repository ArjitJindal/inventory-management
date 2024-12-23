"use client";

import Dashboard from "@/container/Dashboard/Dashboard";
import Header from "@/container/Header/header";
import { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const context = useContext(MyContext);

  useEffect(() => {
    if (!context) return;
    if (!context.sharedState.view) router.push("/login");
  }, [context]);

  if (!context) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Dashboard />
    </div>
  );
}
