/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@devlinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    // Cancela o observador, assim que o componente Private é finalizado.
    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
