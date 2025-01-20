import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/select";
import { useGetOrganizationList } from "@/core/use-cases/chat/get-organization-list";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface Props {
  onSelect(organizationId: number): void;
}

export function OrganizationList({ onSelect }: Props) {
  const query = useGetOrganizationList();
  let defaultOrganizationId: string | undefined = undefined;

  useEffect(() => {
    if (defaultOrganizationId) {
      onSelect(Number(defaultOrganizationId));
    }
  }, [defaultOrganizationId]);

  if (query.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (query.isError) return <p>{query.error?.message}</p>;

  if (query.organizationList !== undefined) {
    const firstOrganization = query.organizationList?.[0];
    defaultOrganizationId = String(firstOrganization.id);
  }

  function handleValueChange(organizationId: string) {
    onSelect(Number(organizationId));
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
