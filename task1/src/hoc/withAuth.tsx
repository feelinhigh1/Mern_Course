// hoc/withAuth.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      } else {
        setAuthorized(true);
      }
    }, []);

    if (!authorized) {
      return null; // or loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}
