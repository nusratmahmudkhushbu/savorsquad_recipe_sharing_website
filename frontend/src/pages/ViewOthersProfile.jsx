import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import OthersProfile from "../components/OthersProfile";

const ViewOthersProfile = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      {/* <Header /> */}
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="m1-0">
            <OthersProfile userId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewOthersProfile;
