"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { siteUrl } from "@/lib/site-url";

/** W podglądzie na żywo (panel → „Podgląd”) odświeża stronę po każdym zapisie. */
export default function LivePreviewListener() {
  const router = useRouter();
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={siteUrl} />;
}
