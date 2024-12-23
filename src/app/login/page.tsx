"use client";

import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";
import { useRouter } from "next/navigation";
import Login from "@/container/Login";

export default function LoginPage() {
  const context = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    if (!context) return;
    if (context.sharedState.view) router.push("/");
  }, [context]);

  if (!context) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <Login />
    </div>
  );
}
