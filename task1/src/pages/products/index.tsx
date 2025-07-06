import UnderConstruction from "@/components/UnderConstruction";
import withAuth from "@/hoc/withAuth";

const index = () => {
  return (
    <UnderConstruction
      title="Products"
      message="Products page is under construction. Stay tuned!"
    />
  );
};

export default withAuth(index);
