import { IChatOrganization } from "@/core/entities/chat-organization.entity";
import { useGetStaffList } from "@/core/use-cases/chat/get-staff-list";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useState } from "react";
import { OrganizationList } from "./organization-list";
import { StaffList } from "./staff-list";
import { StaffPerson } from "./staff-person";

export function StaffByOrganization() {
  const [organizationId, setOrganizationId] = useState<number | undefined>();

  return (
    <>
      <OrganizationList onSelect={setOrganizationId} />
      <InfiniteScrollStaffList organizationId={organizationId} />
    </>
  );
}

function InfiniteScrollStaffList(props: {
  organizationId?: IChatOrganization["id"];
}) {
  const { organizationId } = props;

  const staffListData = useGetStaffList({
    params: {
      organizationId,
    },
  });
  const staffListRef = useInfiniteScroll<HTMLUListElement>({
    onScrollToBottom() {
      staffListData.fetchNextPage();
    },
  });

  return (
    <ul className="max-h-[500px] grid gap-3 overflow-auto" ref={staffListRef}>
      <StaffList
        StaffDisplayer={({ staff }) => (
          <StaffPerson
            person={staff}
            handleStaffSelect={function (staff) {
              alert(staff.displayName);
            }}
          />
        )}
        staffs={staffListData.staffList}
      />
    </ul>
  );
}
