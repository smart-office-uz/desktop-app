import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import type { IChatStaff } from "@/core/entities/chat-staff.entity";

interface Props {
  person: IChatStaff;
  handleStaffSelect(staffPerson: IChatStaff): void;
}

export function StaffPerson(props: Props) {
  const { person, handleStaffSelect } = props;

  function handleClick() {
    handleStaffSelect(person);
  }

  return (
    <li
      className="flex gap-6 items-center border p-2 rounded-lg cursor-pointer transition-colors hover:bg-secondary"
      onClick={handleClick}
    >
      <Avatar>
        <AvatarImage className="object-cover" src={person.profileImageLink} />
        <AvatarFallback>{person.displayName[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div>{person.displayName}</div>
        <div>{person.positionName}</div>
      </div>
    </li>
  );
}
