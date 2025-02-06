import { Button } from "@/app/components/button";
import { Form } from "@/app/components/form";
import { useForm } from "react-hook-form";

export function CreateNewGroupForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log(values);
        })}
      >
        <Button>Saqlash</Button>
      </form>
    </Form>
  );
}
