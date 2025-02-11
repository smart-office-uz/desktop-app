import type { IChatStaff } from "@/core/entities/chat-staff.entity";

interface StaffDisplayerProps {
  staff: IChatStaff;
}

interface Props {
  staffs: IChatStaff[];
  StaffDisplayer<T extends StaffDisplayerProps>(props: T): JSX.Element;
}

export function StaffList(props: Props) {
  return props.staffs.map((staff, index) => (
    <props.StaffDisplayer key={staff.identifier + index} staff={staff} />
  ));
}
