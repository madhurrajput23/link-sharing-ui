import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGlobal } from "../../services/context";

export default function Dashboard() {
  const { dispatchNavLink, navState } = useGlobal();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.slice(1) !== navState.id) {
      dispatchNavLink("dashboard");
    }
  });

  return (
    <>
      <div className="bg-slate-500">Dashboard Page</div>
    </>
  );
}
