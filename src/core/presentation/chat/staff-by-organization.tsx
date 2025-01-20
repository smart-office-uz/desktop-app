import { ScrollArea } from "@/app/components/scroll-area";
import { useGetStaffList } from "@/core/use-cases/chat/get-staff-list";
import { useState } from "react";
import { OrganizationList } from "./organization-list";
import { StaffList } from "./staff-list";

export function StaffByOrganization() {
  const [organizationId, setOrganizationId] = useState<number | undefined>();

  const getStaffListData = useGetStaffList({
    params: {
      organizationId,
    },
  });

  return (
    <>
      <OrganizationList onSelect={setOrganizationId} />
      <ScrollArea className="h-[500px]">
        <ul className="grid gap-3">
          <StaffList
            handleStaffSelect={function (staff) {
              alert(staff.displayName);
            }}
            staffs={getStaffListData.staffList ?? []}
          />
        </ul>
      </ScrollArea>
    </>
  );
}
