import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/select";
import { useGetOrganizationList } from "@/core/use-cases/chat/get-organization-list";
import { Loader2 } from "lucide-react";

export function OrganizationList() {
  const query = useGetOrganizationList();
  let defaultOrganizationId: string | undefined = undefined;

  if (query.isLoading) return <Loader2 />;
  if (query.isError) return <p>{query.error?.message}</p>;

  if (query.organizationList !== undefined) {
    const firstOrganization = query.organizationList?.[0];

    defaultOrganizationId = String(firstOrganization.id);
  }

  function handleValueChange(organizationId: string) {
    console.log({
      src: "OrganizationList -> handleValueChange",
      data: {
        organizationId,
      },
    });
  }

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={defaultOrganizationId}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {query.organizationList?.map((organization) => (
          <SelectItem key={organization.id} value={String(organization.id)}>
            {organization.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
