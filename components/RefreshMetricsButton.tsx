"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function RefreshMetricsButton({ postId }: { postId: string }) {
  const router = useRouter();

  const refresh = async () => {
    await fetch(`/api/metrics/${postId}`);
    router.refresh();
  };

  return <Button onClick={refresh}>Refresh Metrics</Button>;
}
