import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";

// dtos
import { signInSchema, type SignInDto } from "../dtos/sign-in";

interface UseFormProps {
  handler: (data: SignInDto) => void;
}

export const useForm = (props: UseFormProps) => {
  const form = useReactHookForm<SignInDto>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = (data: SignInDto) => {
    props.handler(data);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
