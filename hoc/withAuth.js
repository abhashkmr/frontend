import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const userIsAuthenticated =
      typeof window !== "undefined" &&
      sessionStorage.getItem("jwtToken") !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/auth/login");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
