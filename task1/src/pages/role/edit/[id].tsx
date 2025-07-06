import EditRoleForm from "@/components/role/EditRoleForm";
import { useRouter } from "next/router";

export default function EditRolePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      <EditRoleForm id={id} />
    </div>
  );
}
