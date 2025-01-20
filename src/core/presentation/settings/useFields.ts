import { appInstanceService } from "@/core/services/app-instance.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  instanceUrl: z.string().url(),
  notificationServiceToken: z.string(),
});

export interface Fields {
  instanceUrl: string;
  notificationServiceToken: string;
}

export function useFields() {
  const form = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: {
      instanceUrl: appInstanceService.getBaseUrl() ?? undefined,
      notificationServiceToken:
        appInstanceService.getNotificationToken() ?? undefined,
    },
  });

  return {
    form,
  };
}
