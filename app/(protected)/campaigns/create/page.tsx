"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCampaign() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/campaigns", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Campaign</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Campaign Name"
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </div>
  );
}
