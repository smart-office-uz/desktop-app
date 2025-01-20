import { IChatOrganization } from "@/core/entities/chat-organization.entity";
import { ChatStaffService } from "@/core/services/chat-staff.service";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  params: {
    organizationId: IChatOrganization["id"] | undefined;
  };
}

export function useGetStaffList(props: Props) {
  const { params } = props;

  const query = useInfiniteQuery({
    queryKey: ["getStaffList"],
    queryFn: async function ({ pageParam }) {
      const service = new ChatStaffService();

      return await service.getByOrganizationId({
        id: params.organizationId,
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage?.length === 0) return undefined;

      return lastPageParam + 1;
    },
    initialPageParam: 1,
  });

  return {
    staffList: query.data?.pages?.flatMap((page) => page) ?? [],
    isLoading: query.isLoading || query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
  };
}
