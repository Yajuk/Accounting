"use client";
import { TextField, Button, FormControl, FormHelperText } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormTextField from "@/components/ui/FormTextField/FormTextField";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password too short"),
});

type IFormInput = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, ...restFormState },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  console.log({
    errors,
    restFormState,
  });
  return (
    <div className="rounded-xl p-8 w-[50%] bg-white shadow-md">
      <h1 className="text-3xl text-center font-bold mb-6 underline">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormTextField name={"email"} control={control} label={"Email"} />
        <FormTextField
          name={"password"}
          control={control}
          label={"Password"}
          type="password"
        />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
