import { Header, LinkForm, MockupPreview } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobal } from "../../services/context";

const LinksView = () => {
  const [reRenderMockup, setReRenderMockup] = useState(false);
  return (
    <div className="flex flex-row gap-4 mt-4 p-4 sm:p-0">
      <div className="hidden md:flex md:w-1/3 relative">
        <MockupPreview
          className="w-full h-[calc(100vh-2rem)] sticky top-4"
          reRenderMockup={reRenderMockup}
        />
      </div>
      <LinkForm
        className="w-full md:w-2/3"
        setReRenderMockup={setReRenderMockup}
      />
    </div>
  );
};

export default function Links() {
  const { dispatchNavLink, navState, userState } = useGlobal();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.slice(1) !== navState.id) {
      dispatchNavLink("links");
    }
  }, []);

  useEffect(() => {
    if (userState.id === null) {
      dispatchNavLink("login");
      navigate("/login");
    }
  }, [userState]);

  return (
    <>
      <div className="bg-slate-100 sm:p-4">
        <Header />
        <LinksView />
      </div>
    </>
  );
}
