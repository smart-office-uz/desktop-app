import type { IChatStaff } from "@/core/entities/chat-staff.entity";
import { StaffPerson } from "./staff-person";

interface Props {
  staffs: IChatStaff[];
  handleStaffSelect(staff: IChatStaff): void;
}

export function StaffList(props: Props) {
  return props.staffs.map((staff) => (
    <StaffPerson handleStaffSelect={props.handleStaffSelect} person={staff} />
  ));
}
