import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loadingpage from "./Loadingpage";

function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <Loadingpage />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedPage;
