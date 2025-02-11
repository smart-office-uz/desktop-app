import ChatOrganizationService from "@/core/services/chat-organization.service";
import { useQuery } from "@tanstack/react-query";

export function useGetOrganizationList() {
  const chatOrganizationService = new ChatOrganizationService();

  const query = useQuery({
    queryKey: ["chatOrgList"],
    queryFn: async function () {
      return await chatOrganizationService.getAll();
    },
  });

  return {
    organizationList: query.data,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
  };
}
