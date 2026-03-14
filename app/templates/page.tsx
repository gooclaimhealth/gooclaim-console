import { getTemplates } from "@/lib/api/templates";
import { TemplatesView } from "./templates-view";

export default async function TemplatesPage() {
  const templates = await getTemplates();
  return <TemplatesView templates={templates} />;
}
