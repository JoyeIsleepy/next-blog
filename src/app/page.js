"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { request } from "@/utils/request";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        index 页面 layout 404页面独立
        <div>
          <Link href="/deal">交易管理</Link>
        </div>
      </main>
    </div>
  );
}
