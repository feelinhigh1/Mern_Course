import UnderConstruction from "@/components/UnderConstruction";
import withAuth from "@/hoc/withAuth";

const index = () => {
  return (
    <div>
      <UnderConstruction
        title="Settings"
        message="Settings page is under construction. Stay tuned!"
      />
    </div>
  );
};

export default withAuth(index);
