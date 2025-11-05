import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => {
      return login(data);
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      navigate("/");
    },
    onError: () => {
      toast.error("Error");
    },
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    mutation.mutate({ data });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input
                  id="name"
                  type="name"
                  placeholder="siddharth"
                  className="border-white"
                  required
                  {...register("username")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="border-white"
                  {...register("password")}
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
