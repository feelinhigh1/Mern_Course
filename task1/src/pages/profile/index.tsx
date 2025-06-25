import UnderConstruction from "@/components/UnderConstruction";
import React from "react";

export default function index() {
  // const admin = {
  //   name: "Sushan Poudel",
  //   email: "sushan.poudel.242833@gmail.com",
  //   role: "Administrator",
  //   joinedAt: "2023-01-15",
  //   initials: "A•B",
  // };

  return (
    <UnderConstruction
      title="Profile"
      message="Profile page is under construction. Stay tuned!"
    />
    // <div className="p-6 max-w-4xl mx-auto space-y-6">
    //   <h1 className="text-4xl font-extrabold text-gray-800">Profile</h1>

    //   <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-center md:items-start border border-gray-200">
    //     {/* Avatar initials placeholder */}
    //     <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-700 to-cyan-800 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
    //       {admin.initials}
    //     </div>

    //     {/* Info section */}
    //     <div className="flex-1 space-y-4 text-gray-800 w-full">
    //       <div>
    //         <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
    //           Full Name
    //         </p>
    //         <p className="text-lg font-semibold">{admin.name}</p>
    //       </div>
    //       <div>
    //         <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
    //           Email
    //         </p>
    //         <p className="text-lg font-semibold">{admin.email}</p>
    //       </div>
    //       <div>
    //         <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
    //           Role
    //         </p>
    //         <p className="text-lg font-semibold">{admin.role}</p>
    //       </div>
    //       <div>
    //         <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
    //           Joined Date
    //         </p>
    //         <p className="text-lg font-semibold">{admin.joinedAt}</p>
    //       </div>

    //       {/* Optional: Edit profile button */}
    //       <button className="mt-4 px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition">
    //         Edit Profile
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
