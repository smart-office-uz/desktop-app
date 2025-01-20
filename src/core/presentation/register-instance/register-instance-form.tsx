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
import { Fields, useFields } from "./useFields";

interface Props {
  handleSubmit(values: Fields): void;
}

export function RegisterInstanceForm(props: Props) {
  const { form } = useFields();

  return (
    <Form {...form}>
      <form
        className="min-h-screen max-w-[600px] w-full mx-auto flex items-center justify-center"
        onSubmit={form.handleSubmit(props.handleSubmit)}
      >
        <div className="grid gap-2 w-full">
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
                  <Input
                    type="url"
                    className="w-full"
                    placeholder="https://smart-office.uz"
                    {...field}
                  />
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
          <Button type="submit" disabled={!form.formState.isValid}>
            Tasdiqlash
          </Button>
        </div>
      </form>
    </Form>
  );
}
