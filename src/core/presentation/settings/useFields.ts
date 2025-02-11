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

interface Props {
  defaultValues?: Partial<Fields>;
}

export function useFields({ defaultValues }: Props) {
  const form = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return {
    form,
  };
}
