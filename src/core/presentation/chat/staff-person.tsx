import { Button } from "@/app/components/button";
import type { IChatStaff } from "@/core/entities/chat-staff.entity";
import { MessageCircle } from "lucide-react";

interface Props {
  person: IChatStaff;
  handleStaffSelect(staffPerson: IChatStaff): void;
}

export function StaffPerson(props: Props) {
  const { person, handleStaffSelect } = props;

  function handleMessageButtonClick() {
    handleStaffSelect(person);
  }

  return (
    <div className="flex gap-6 items-center border p-2 rounded-lg">
      <div>
        <div>{person.displayName}</div>
        <div>{person.positionName}</div>
      </div>
      <Button onClick={handleMessageButtonClick}>
        <MessageCircle />
      </Button>
    </div>
  );
}
