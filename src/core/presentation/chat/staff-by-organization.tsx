import { IChatOrganization } from "@/core/entities/chat-organization.entity";
import { useGetStaffList } from "@/core/use-cases/chat/get-staff-list";
import { useOpenNewChatWithStaff } from "@/core/use-cases/chat/new-chat-with-staff";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { OrganizationList } from "./organization-list";
import { StaffList } from "./staff-list";
import { StaffPerson } from "./staff-person";

export function StaffByOrganization() {
  const [organizationId, setOrganizationId] = useState<number | undefined>();

  return (
    <>
      <OrganizationList onSelect={setOrganizationId} />
      {organizationId !== undefined && (
        <InfiniteScrollStaffList organizationId={organizationId} />
      )}
    </>
  );
}

function InfiniteScrollStaffList(props: {
  organizationId?: IChatOrganization["id"];
}) {
  const { organizationId } = props;

  const { handleStartNewChat } = useOpenNewChatWithStaff();
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
            handleStaffSelect={(staff) => handleStartNewChat(staff.identifier)}
          />
        )}
        staffs={staffListData.staffList}
      />
      {staffListData.isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin w-4 h-4" />
        </div>
      )}
    </ul>
  );
}
