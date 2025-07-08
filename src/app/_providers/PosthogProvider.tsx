"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { env } from "~/env";
import dynamicLoader from "next/dynamic";

const SuspendedPostHogPageView = dynamicLoader(
  () => import("./PageViewTracker"),
  {
    ssr: false,
  },
);

export default function PosthogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/relay-Bdyy",
      ui_host: "https://eu.i.posthog.com",
      capture_pageview: false,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}
