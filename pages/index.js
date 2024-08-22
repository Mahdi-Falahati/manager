import HomePage from "@/templates/HomePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Index() {
  const { status } = useSession();
  const router = useRouterr();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sin-in");
    }
  }, [status]);

  return <HomePage />;
}
