import { IChatOrganization } from "@/core/entities/chat-organization.entity";
import { ChatStaffService } from "@/core/services/chat-staff.service";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: {
    organizationId: IChatOrganization["id"] | undefined;
  };
}

export function useGetStaffList(props: Props) {
  const { params } = props;

  console.log({
    src: "useGetStaffList",
    data: {
      params,
    },
  });
  const query = useQuery({
    queryKey: ["getStaffList"],
    queryFn: async function () {
      const service = new ChatStaffService();

      return await service.getByOrganizationId({
        id: params.organizationId,
      });
    },
  });

  return {
    staffList: query.data,
    isLoading: query.isLoading || query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
  };
}
