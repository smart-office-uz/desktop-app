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
import { useFields } from "./useFields";
import { useUpdateSettingsMutation } from "./useMutation";

interface Props {
  onUpdate(): void;
}

export function SettingsForm(props: Props) {
  const { form } = useFields();

  const mutation = useUpdateSettingsMutation({
    onSuccess: props.onUpdate,
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
          Saqlash
        </Button>
      </form>
    </Form>
  );
}
