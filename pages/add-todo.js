import AddTodo from "@/templates/AddTodo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/sign-in");
    }
  }, [status]);
  return <AddTodo />;
}
