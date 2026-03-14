import { getAdminState } from "@/lib/api/admin";
import { AdminView } from "./admin-view";

export default async function AdminPage() {
  const state = await getAdminState();
  return <AdminView state={state} />;
}
