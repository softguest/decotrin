"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function AddPost() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [file, setFile] = useState<File | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("platform", platform);
    formData.append("scheduledAt", scheduledAt);
    formData.append("campaignId", id as string);
    if (file) formData.append("file", file);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Post created!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Create Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        className="w-full border p-2"
      />
      <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full border p-2">
        <option value="twitter">Twitter (X)</option>
        <option value="facebook">Facebook</option>
        <option value="linkedin">LinkedIn</option>
      </select>
      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
        className="w-full border p-2"
      />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border p-2" />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Post
      </button>
    </div>
  );
}
