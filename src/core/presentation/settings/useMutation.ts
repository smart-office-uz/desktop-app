import { useSetAppInstanceContext } from "@/core/use-cases/app-instance/use-set-app-instance-ctx";
import { useMutation } from "@tanstack/react-query";
import { Fields } from "./useFields";

export function useUpdateSettingsMutation(props: { onSuccess: () => void }) {
  return useMutation({
    mutationKey: ["updateSettings"],
    mutationFn: async function (settings: Fields) {
      useSetAppInstanceContext({
        notificationServiceToken: settings.notificationServiceToken,
        url: settings.instanceUrl,
      });
    },
    onSuccess() {
      props.onSuccess();
    },
  });
}
