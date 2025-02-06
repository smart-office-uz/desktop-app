import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/select";
import { useGetOrganizationList } from "@/core/use-cases/chat/get-organization-list";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onSelect(organizationId: number): void;
}

export function OrganizationList({ onSelect }: Props) {
  const query = useGetOrganizationList();

  const [value, setValue] = useState<string | undefined>(
    String(query.organizationList?.[0]?.id)
  );

  useEffect(() => {
    if (value !== undefined) onSelect(Number(value));
  }, [value]);

  if (query.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (query.isError) return <p>{query.error?.message}</p>;

  function handleValueChange(organizationId: string) {
    setValue(organizationId);
  }

  return (
    <Select
      onValueChange={handleValueChange}
      value={String(query.organizationList?.[0]?.id)}
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
