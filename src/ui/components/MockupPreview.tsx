import RightArrow from "../../assets/right-arrow.png";
import LinkedinIcon from "../../assets/linkedin-icon.png";
import TwitterIcon from "../../assets/twitter-icon.png";
import GithubIcon from "../../assets/github-icon.png";
import LinkIcon from "../../assets/link.png";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import ShadowLoader from "./ShadowLoader";
import { useGetUserInfo } from "../../application/useUserInfo";
import { useGetLinks } from "../../application/useLink";

interface IButtonProps {
  text: string;
  bgcolor: string;
  textColor?: string;
  imageUrl?: string;
  url?: string;
}

const Button = ({
  text,
  bgcolor,
  textColor = "text-white",
  imageUrl,
  url,
}: IButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      className={`flex flex-row gap-4 items-center justify-center ${bgcolor} ${textColor} px-4 py-2 rounded-lg`}
    >
      <img
        src={imageUrl}
        className="w-8 h-8 rounded-full border border-white"
      />
      <div className="block">{text}</div>
      <img
        width="24"
        height="32"
        src={RightArrow}
        alt="long-arrow-right"
        className="ml-auto"
      />
    </a>
  );
};

export default function MockupPreview({
  className,
  reRenderMockup,
}: {
  className?: string;
  reRenderMockup?: boolean;
}) {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profilepicture: "",
  });

  const [links, setLinks] = useState<
    {
      id: string;
      platform: string;
      url: string;
    }[]
  >([]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [bgColors, setBgColors] = useState<string[]>([]);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  const getUserInfo = useGetUserInfo();
  const { getLinksHandler } = useGetLinks();

  const [loadingLinks, setLoadingLinks] = useState(true);

  useEffect(() => {
    setLoadingUserInfo(true);
    getUserInfo().then((data) => {
      if (!data) return;
      setUserInfo({
        firstname: data.firstname as string,
        lastname: data.lastname as string,
        email: data.email as string,
        profilepicture: data.profileImage as string,
      });
      setLoadingUserInfo(false);
    });
  }, [reRenderMockup]);

  useEffect(() => {
    setLoadingLinks(true);
    getLinksHandler().then((data) => {
      if (!data) return;
      setLinks(data);
      setLoadingLinks(false);
    });
  }, [reRenderMockup]);

  useEffect(() => {
    setImageUrls(
      links.map((link) => {
        if (link.platform === "Github") return GithubIcon as string;
        if (link.platform === "Twitter") return TwitterIcon as string;
        if (link.platform === "Linkedin") return LinkedinIcon as string;

        return LinkIcon as string;
      })
    );

    setBgColors(
      links.map((link) => {
        if (link.platform === "Github") return "bg-slate-800";
        if (link.platform === "Twitter") return "bg-blue-400";
        if (link.platform === "Linkedin") return "bg-blue-600";

        return "bg-slate-600";
      })
    );
  }, [links, reRenderMockup]);

  return (
    <div className={`${className} bg-white rounded-lg p-4 lg:p-12 lg:px-16`}>
      <div className="outer-boundry border w-full h-full rounded-[3em] p-4">
        <div className="inner-boundry border w-full h-full rounded-[2em] overflow-hidden">
          <div className="top-bar w-1/2 h-8 rounded-[1em] border mx-auto -translate-y-4"></div>

          <div className="w-full h-full overflow-y-scroll no-scrollbar pb-12">
            <ProfileImage
              userInfo={userInfo}
              classname="w-32 h-32 flex mx-auto rounded-full border border-white items-center justify-center bg-cover"
            />

            {loadingUserInfo ? (
              <h2 className="text-md text-center font-bold my-2 text-slate-600">
                Loading...
              </h2>
            ) : (
              <>
                {userInfo.firstname && userInfo.lastname && (
                  <h2 className="text-md text-center font-bold my-2 text-slate-600">
                    {userInfo.firstname + " " + userInfo.lastname}
                  </h2>
                )}
                <p className="text-sm text-center break-all mx-2 text-slate-600">
                  {userInfo.email}
                </p>
              </>
            )}

            <div className="button-wrapper mx-auto w-full flex flex-col gap-4 px-4 py-4 mt-8">
              {loadingLinks ? (
                <ShadowLoader />
              ) : (
                links.map((link) => (
                  <Button
                    key={link.id}
                    text={link.platform}
                    url={link.url}
                    bgcolor={bgColors[links.indexOf(link)]}
                    imageUrl={imageUrls[links.indexOf(link)]}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
