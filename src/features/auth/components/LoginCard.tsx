import { useForm } from "react-hook-form";
import { DottedSeperator } from "../../../components/DottedSeperator";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../../lib/axios";
import { toast } from "sonner";
import { useUserStore } from "../../../store/user.store";

export const LoginCard = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const setClient = useUserStore((state) => state.setClient);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/user/login", {
        phoneNumber: values.phoneNumber,
        password: values.password,
      });

      if (!response.data.success) {
        setError(response.data.msg || "Internal server error");
        return;
      }

      toast.success("Logged in");
      setClient(response.data.details);

      navigate(`/${response.data.details.id}`);
    } catch (error) {
      console.log(error);
      setError("Internal server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-[95%] h-full md:w-[487px] mt-20">
      <CardHeader className="flex justify-center items-center p-1 text-center">
        <CardTitle className="text-2xl text-base-content">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <div className="px-4 md:px-7">
        <DottedSeperator color="black" />
      </div>
      <CardContent className="px-4 md:px-7 py-1 md:py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      {...field}
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      minLength={8}
                      {...field}
                      placeholder="Enter your password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              variant={"default"}
              className="w-full h-11"
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-4 md:px-7">
        <DottedSeperator color="black" />
      </div>
      <CardFooter className="px-4 md:px-7 flex flex-col gap-y-2 md:gap-y-3 items-center justify-center">
        <p className="text-sm md:text-base text-base-content">
          Don&apos;t have an account?
          <Link to={"/register"}>
            <span className="text-blue-700 hover:underline hover:underline-offset-1">
              &nbsp;Sign Up
            </span>
          </Link>
        </p>
        <p className="text-red-600 text-sm md:text-base">{error}</p>
      </CardFooter>
    </Card>
  );
};
