import EditUserForm from "@/components/user/EditUserForm";
import { useRouter } from "next/router";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      <EditUserForm id={id} />
    </div>
  );
}
