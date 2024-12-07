import React from "react";
import FryingpanSpinner from "../components/FryingpanSpinner";

// export default function Loadingpage() {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <FadeLoader />
//     </div>
//   );
// }

export default function Loadingpage() {
  return <FryingpanSpinner extraClassName={"min-h-screen"} />;
}
