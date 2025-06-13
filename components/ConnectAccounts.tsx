"use client";

import { signIn } from "next-auth/react";

export default function ConnectAccounts() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Connect Social Accounts</h2>
      <button onClick={() => signIn("facebook")} className="bg-blue-600 text-white px-4 py-2 rounded">
        Connect Facebook
      </button>
      <button onClick={() => signIn("twitter")} className="bg-sky-500 text-white px-4 py-2 rounded">
        Connect Twitter (X)
      </button>
      <button onClick={() => signIn("linkedin")} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Connect LinkedIn
      </button>
    </div>
  );
}
