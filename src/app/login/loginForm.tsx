"use client";
import { Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormTextField from "@/components/ui/FormTextField/FormTextField";
import { signIn } from "@/services/auth/authService";
import { useAccount } from "@/context/accountProvider";
import { setAccessToken, setUserAccount } from "@/utils/localStorage";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Password too short"),
});

type IFormInput = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { setAccount } = useAccount();
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("formValues", data);
    try {
      const res = await signIn(data);
      setAccount(res.data.user);
      setAccessToken(res.data.accessToken);
      setUserAccount(res.data.user);
      if (res) {
        console.log("success", res);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="rounded-xl p-8 w-full md:w-[50%] bg-white shadow-xl">
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
          className="text-white py-2 px-4 my-4 rounded"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
