import { useAuth } from "@/hooks/useAuth";
import React from "react";
import "./loading.css";

export default function Loading() {
  const authContext: any = useAuth();
  console.log(authContext);
  return (
    <>
      {authContext && authContext.loading && (
        <>
          <div className="overlay">
            <div className="overlay__inner">
              <div className="overlay__content">
                <span className="spinner"></span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
