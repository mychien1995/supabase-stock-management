import TopHeaderImage from "@/assets/images/dashboard/top-header.png";
import { getBannerInfo } from "./topBannerSlice";
import { useAppSelector } from "@/app/hooks";
const TopBanner = () => {
  const bannerInfo = useAppSelector(getBannerInfo);
  return (
    <div className="iq-navbar-header" style={{ height: "215px" }}>
      <div className="container-fluid iq-container">
        <div className="row">
          <div className="col-md-12">
            <div className="flex-wrap d-flex justify-content-between align-items-center">
              <div>
                <h1> {bannerInfo.title}</h1>
                <p>{bannerInfo.subTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="iq-header-img">
        <img
          src={TopHeaderImage}
          alt="header"
          className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
        />
      </div>
    </div>
  );
};

export default TopBanner;
