import React from "react";
import withAuth from "@/hoc/withAuth";
// import Chart1 from "@/components/Chart/Chart1";
// import Chart2 from "@/components/Chart/Chart2";
import UnderConstruction from "@/components/UnderConstruction";

const index = () => {
  return (
    <>
      {/* <div className="text-xm font-semibold text-gray-800">
        Welcome to the Admin Dashboard 👋
      </div> */}
      {/* <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Chart1 />
        <Chart2 />
      </div> */}
      <UnderConstruction
        title="Dashboard"
        message="Dashboard page is under construction. Stay tuned!"
      />
    </>
  );
};

export default withAuth(index);
