import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface Fields {
  instanceUrl: string;
  notificationServiceToken: string;
}

const schema = z.object({
  instanceUrl: z
    .string({
      required_error: "Ushbu maydonni to'ldirish majburiy",
    })
    .url("Iltimos, to'g'ri formatdagi linkni kiriting!")
    .min(1, "Ushbu maydonni to'ldirish majburiy"),
  notificationServiceToken: z
    .string({
      required_error: "Ushbu maydon majburiy",
    })
    .min(1, "Ushbu maydonni to'ldirish majburiy"),
});

export function useFields() {
  const form = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  return {
    form,
  };
}
