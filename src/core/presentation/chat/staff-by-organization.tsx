import { IChatOrganization } from "@/core/entities/chat-organization.entity";
import { useGetStaffList } from "@/core/use-cases/chat/get-staff-list";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const listRef = useRef<HTMLUListElement | null>(null);

  const handleScroll = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      // Check if scrolled to bottom
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("Scrolled to bottom!");
        onScrollToBottom();
      }
    }
  }, []);

  function onScrollToBottom() {
    staffListData.fetchNextPage();
  }

  useEffect(() => {
    const ulElement = listRef.current;

    if (ulElement) {
      ulElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <ul className="max-h-[500px] grid gap-3 overflow-auto" ref={listRef}>
      <StaffList
        PersonDisplayer={({ staff }) => (
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
