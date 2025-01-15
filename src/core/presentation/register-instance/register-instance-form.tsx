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
import { Fields, useFields } from "./useFields";

interface Props {
  handleSubmit(values: Fields): void;
}

export function RegisterInstanceForm(props: Props) {
  const { form } = useFields();

  return (
    <Form {...form}>
      <form
        className="min-h-screen max-w-[650px] w-full mx-auto flex items-center justify-center"
        onSubmit={form.handleSubmit(props.handleSubmit)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="instanceUrl"
            rules={{
              required: true,
            }}
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
          <Button type="submit">Tasdiqlash</Button>
        </div>
      </form>
    </Form>
  );
}
