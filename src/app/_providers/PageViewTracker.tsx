import { usePostHog } from "posthog-js/react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PosthogPageView() {
  const posthog = usePostHog();

  // Identify user
  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user?.id) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
      });
    } else {
      posthog.reset();
    }
  }, [posthog, userInfo]);

  // Track page view
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog) {
      // Construct full URL including search params and capture page view event
      let url = window.origin + pathname;
      if (searchParams.toString()) url = url + `?${searchParams.toString()}`;
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  // Return null to avoid rendering anything
  return null;
}
