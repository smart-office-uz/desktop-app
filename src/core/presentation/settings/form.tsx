import { Button } from "@/app/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/form";
import { Input } from "@/app/components/input";
import { Textarea } from "@/app/components/textarea";
import { useLoadAppInstanceContext } from "@/core/use-cases/app-instance/use-load-app-instance-ctx";
import { Loader2 } from "lucide-react";
import { type Fields, useFields } from "./useFields";
import { useUpdateSettingsMutation } from "./useMutation";

interface Props {
  onUpdate(): void;
}

export function SettingsForm(props: Props) {
  const appInstanceCtx = useLoadAppInstanceContext();

  if (appInstanceCtx === undefined) return;

  return (
    <FormComponent
      defaultValues={{
        instanceUrl: appInstanceCtx.baseUrl,
        notificationServiceToken: appInstanceCtx.centrifugeToken,
      }}
      onUpdate={props.onUpdate}
    />
  );
}

interface FormComponentProps {
  defaultValues: Partial<Fields>;
  onUpdate(): void;
}

function FormComponent({ defaultValues, onUpdate }: FormComponentProps) {
  const { form } = useFields({
    defaultValues,
  });

  const mutation = useUpdateSettingsMutation({
    onSuccess: onUpdate,
  });
  const isSubmitButtonDisabled = !form.formState.isValid || mutation.isPending;

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
        })}
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="instanceUrl"
            rules={{
              required: true,
            }}
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ilova linkini kiriting</FormLabel>
                <FormControl>
                  <Input type="url" className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notificationServiceToken"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Centrifuge tokenni kiriting</FormLabel>
                <FormControl>
                  <Textarea className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" disabled={isSubmitButtonDisabled}>
          {mutation.isPending && <Loader2 className="w-5 h-5 mr-2" />}
          Saqlash
        </Button>
      </form>
    </Form>
  );
}
