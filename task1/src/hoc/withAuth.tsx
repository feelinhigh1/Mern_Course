import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PUBLIC_ROUTES = ["/login", "/forgot-password", "/reset-password"];

export default function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      // Allow access to public routes regardless of token
      if (PUBLIC_ROUTES.includes(router.pathname)) {
        setAuthorized(true);
        return;
      }

      // Protected route — check for token
      if (!token) {
        router.replace("/login");
      } else {
        setAuthorized(true);
      }
    }, [router.pathname]);

    if (!authorized) {
      return null; // or a spinner
    }

    return <WrappedComponent {...props} />;
  };
}
