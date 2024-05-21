/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { login } from "@/app/actions/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema: any = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const signin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };
      login(data);

      router.push("/");
    } catch (error: any) {
      if (error.response.status !== 200) {
        toast({
          title: "Error",
          description: (
            <p className="shadow-sm mt-2 p-4 rounded-md text-red-800">
              {JSON.stringify(error.response.data.message, null, 2)}
            </p>
          ),
        });
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    console.log(values);
  }

  return (
    <div className="flex justify-center lg:justify-around items-center py-5 h-screen container">
      <div className="flex-1 max-w-md">
        <h1 className="mb-10 font-bold text-3xl text-center">Sign in</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <small className="block">
                Don&apos;t Have Account?{" "}
                <Link href={"/coaches/signup"} className="text-orange-400">
                  Sign up
                </Link>{" "}
              </small>
              <small className="block">
                <Link
                  href={"/coaches/forgotPassword"}
                  className="text-orange-400"
                >
                  ForgotPassword
                </Link>{" "}
              </small>
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                " Sign in"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default signin;
