import type { IChatStaff } from "@/core/entities/chat-staff.entity";

interface StaffDisplayerProps {
  staff: IChatStaff;
}

interface Props {
  staffs: IChatStaff[];
  PersonDisplayer<T extends StaffDisplayerProps>(props: T): JSX.Element;
}

export function StaffList(props: Props) {
  return props.staffs.map((staff) => <props.PersonDisplayer staff={staff} />);
}
