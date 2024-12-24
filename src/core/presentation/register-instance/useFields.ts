import { useForm } from "react-hook-form";

export interface Fields {
  instanceUrl: string;
}

export function useFields() {
  const form = useForm<Fields>();

  return {
    form
  }
}
