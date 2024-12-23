import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { useSetAppInstanceBaseUrl } from "@/core/use-cases/app-instance/use-set-app-instance-base-url";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/register-instance")({
  component: () => {
    const navigate = useNavigate();
    const instanceInputRef = useRef<HTMLInputElement>(null);

    function handleSubmit() {
      if (instanceInputRef.current === null) return;

      const instanceInputValue = instanceInputRef.current.value;

      useSetAppInstanceBaseUrl({
        url: instanceInputValue,
      });

      navigate({
        to: "/sign-in",
        from: "/register-instance",
      });
    }

    return (
      <form
        className="min-h-screen flex items-center justify-center"
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid gap-2 max-w-[500px] mx-auto">
          <Input
            ref={instanceInputRef}
            type="url"
            placeholder="Enter your instance URL"
            required
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  },
});
