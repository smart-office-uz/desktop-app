import { useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// components
import { Button } from "@/app/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/form";
import { Input } from "@/app/components/input";

// api
import { useSignInHandler } from "../api/useSignInHandler";

// hooks
import { useForm } from "../lib/useForm";

// services
import SessionService from "@/core/services/session.service";

export const SignInForm = () => {
  const { navigate } = useRouter();
  const { signIn, isPending } = useSignInHandler({
    onSuccess: (response) => {
      const sessionService = new SessionService();
      sessionService.createNew({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      toast.success("Tizimga kirish muvaffaqqiyatli amalga oshirildi!");
      // TODO: display a native notification
      // navigate({
      //   to: "/",
      // });
      // this is a temporary solution to make sure the notification service is reinitialized after the user is signed in
      window.location.href = "/";
    },
    onError: (response) => {
      toast.error(response.message);
    },
  });
  const { form, handleSubmit } = useForm({
    handler: signIn,
  });

  return (
    <Form {...form}>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Username va parolni kiriting</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="alisher" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parol</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={isPending} className="w-full" type="submit">
              Tizimga kirish
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
