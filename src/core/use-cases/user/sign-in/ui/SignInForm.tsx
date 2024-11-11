// import { useRouter } from "@tanstack/react-router";
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
import { Checkbox } from "@/app/components/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/form";
import { Input } from "@/app/components/input";
import { PasswordInput } from "@/app/components/password-input";
// api
import { useSignInHandler } from "../api/useSignInHandler";

// hooks
import { useForm } from "../lib/useForm";

// services
import SessionService from "@/core/services/session.service";

export const SignInForm = () => {
  // const { navigate } = useRouter();
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
      toast.error(response.message, {
        className: "bg-destructive text-white",
      });
    },
  });
  const { form, handleSubmit } = useForm({
    handler: signIn,
  });

  return (
    <Form {...form}>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <Card className="border-0 shadow-none">
          <CardHeader className="">
            <CardTitle className="text-4xl font-semibold">
              Tizimga kirish
            </CardTitle>
            <CardDescription className="font-medium text-darkGray dark:text-foreground">
              Tizimga kirish uchun shaxsiy login va parolni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                className="border-darkGray data-[state=checked]:bg-darkGray"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-darkGray font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Meni eslab qol
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={isPending}
              className="w-full font-semibold"
              type="submit"
            >
              Tizimga kirish
              {isPending && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
