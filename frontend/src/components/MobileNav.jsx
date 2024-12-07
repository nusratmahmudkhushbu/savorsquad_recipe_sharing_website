// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { apiStart } from "../../api";

// const MobileNav = ({ menuItems, Logo, userProfile, onLogout }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const navigate = useNavigate();

//   return (
//     <nav className="h-16 flex justify-between items-center px-6 lg:px-12 bg-white shadow-md z-40">
//       <a href="/">
//         <img src={Logo} alt="logo" className="h-12 w-auto" />
//       </a>
//       <div className="lg:hidden">
//         <button
//           onClick={toggleMobileMenu}
//           className="text-secondary focus:outline-none"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d={
//                 isMobileMenuOpen
//                   ? "M6 18L18 6M6 6l12 12"
//                   : "M4 6h16M4 12h16m-7 6h7"
//               }
//             ></path>
//           </svg>
//         </button>
//       </div>
//       <ul className="hidden lg:flex gap-7">
//         {menuItems?.map((menu, index) => (
//           <li key={index}>
//             <Link to="/" className="font-medium capitalize text-secondary">
//               {menu}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <ul className="hidden lg:flex items-center gap-4 font-medium">
//         {userProfile ? (
//           <>
//             <li>
//               <img
//                 src={`${apiStart}${userProfile.photo}`}
//                 alt="User Profile"
//                 className="h-10 w-10 rounded-full object-cover"
//               />
//             </li>
//             <li>
//               <button
//                 onClick={onLogout}
//                 className="text-secondary px-4 py-2 rounded"
//               >
//                 Log Out
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to="/login">
//                 <button className="text-secondary px-4 py-2 rounded">
//                   Log In
//                 </button>
//               </Link>
//             </li>
//             <li>
//               <Link to="/signup">
//                 <button className="text-secondary px-4 py-2 rounded">
//                   Sign Up
//                 </button>
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//       {isMobileMenuOpen && (
//         <ul className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4">
//           {menuItems?.map((menu, index) => (
//             <li key={index}>
//               <Link
//                 to="/"
//                 className="font-medium capitalize text-secondary"
//                 onClick={toggleMobileMenu}
//               >
//                 {menu}
//               </Link>
//             </li>
//           ))}
//           {userProfile ? (
//             <>
//               <li>
//                 <Link to="/userprofile">
//                   <button className="text-secondary px-4 py-2 rounded">
//                     Userprofile
//                   </button>
//                 </Link>
//               </li>
//               <li>
//                 <img
//                   src={`${apiStart}${userProfile.photo}`}
//                   alt="User Profile"
//                   className="h-10 w-10 rounded-full object-cover"
//                 />
//               </li>
//               {!userProfile.isVerified && (
//                 <Link to="/verify-email">
//                   <button className="px-4 py-2 rounded text-red-700 border border-red-600">
//                     Verify Email
//                   </button>
//                 </Link>
//               )}
//               <li>
//                 <button
//                   onClick={() => {
//                     toggleMobileMenu();
//                     onLogout();
//                   }}
//                   className=<"text-secondary px-4 py-2 rounded bg-red-500 text-white"></li>
//                 >
//                   Log Out
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to="/login" onClick={toggleMobileMenu}>
//                   <button className="font-medium capitalize text-secondary">
//                     Log In
//                   </button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/signup" onClick={toggleMobileMenu}>
//                   <button className="font-medium capitalize text-secondary">
//                     Sign Up
//                   </button>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default MobileNav;


//////////////////
///////////
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiStart } from "../../api";

const MobileNav = ({ menuItems, Logo, userProfile, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <nav className="h-16 flex justify-between items-center px-6 lg:px-12 bg-white shadow-md z-40">
      {/* Logo Section */}
      <a href="/">
        <img src={Logo} alt="logo" className="h-12 w-auto" />
      </a>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-secondary focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            ></path>
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-7">
        {menuItems?.map((menu, index) => (
          <li key={index}>
            <Link to="/" className="font-medium capitalize text-secondary">
              {menu}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop User Actions */}
      <ul className="hidden lg:flex items-center gap-4 font-medium">
        {userProfile ? (
          <>
            <li>
              <img
                src={`${apiStart}${userProfile.photo}`}
                alt="User Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </li>
            <li>
              <button
                onClick={onLogout}
                className="text-secondary px-4 py-2 rounded"
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="text-secondary px-4 py-2 rounded">
                  Log In
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="text-secondary px-4 py-2 rounded">
                  Sign Up
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4">
          {menuItems?.map((menu, index) => (
            <li key={index}>
              <Link
                to="/"
                className="font-medium capitalize text-secondary"
                onClick={toggleMobileMenu}
              >
                {menu}
              </Link>
            </li>
          ))}

          {userProfile ? (
            <>
              <li>
                <Link to="/userprofile">
                  <button className="text-secondary px-4 py-2 rounded">
                    User Profile
                  </button>
                </Link>
              </li>
              <li>
                <img
                  src={`${apiStart}${userProfile.photo}`}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </li>
              {!userProfile.isVerified && (
                <li>
                  <Link to="/verify-email">
                    <button className="px-4 py-2 rounded text-red-700 border border-red-600">
                      Verify Email
                    </button>
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    onLogout();
                  }}
                  className="text-secondary px-4 py-2 rounded bg-red-500 text-white"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMobileMenu}>
                  <button className="font-medium capitalize text-secondary">
                    Log In
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={toggleMobileMenu}>
                  <button className="font-medium capitalize text-secondary">
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default MobileNav;
