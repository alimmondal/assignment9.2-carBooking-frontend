import PublicHeader from "@/components/view/Header/PublicHeader/PublicHeader";
import Banner from "@/components/view/Public/Banner";
import AvailableService from "./available-services/page";

const PublicPage = () => {
  return (
    <>
      <div className="">
        <PublicHeader />
        <div className="">
          <Banner />
        </div>
        <div className="my-20">
          <h1 className="my-10 text-sky-700 text-center text-4xl">
            Our Available Cars
          </h1>
          <div className="overflow-hidden">
            <AvailableService />
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicPage;
