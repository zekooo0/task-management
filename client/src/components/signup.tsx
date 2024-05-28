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
import { login, signup } from "@/app/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema: any = z.object({
  username: z.string().min(1, {
    message: "Password must be at least 1 character.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  linkedinUrl: z.string().startsWith("https://www.linkedin.com/in/"),
});

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      linkedinUrl: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const data = {
        username: values.username,
        email: values.email,
        password: values.password,
        linkedinUrl: values.linkedinUrl,
      };
      const res = await signup(data);
      if (res === 201) {
        router.push("/signin");
      } else throw new Error(res);
    } catch (error: any) {
      toast({
        title: "Error",
        description: (
          <p className="shadow-sm mt-2 p-4 rounded-md text-red-400">{error}</p>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center lg:justify-around items-center py-5 h-screen container">
      <div className="flex-1 max-w-md">
        <h1 className="mb-10 font-bold text-3xl text-center">Sign up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.linkedin.com/in/***"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <small className="block">
                Already Have Account?{" "}
                <Link href={"/signin"} className="text-orange-400">
                  Sign in
                </Link>{" "}
              </small>
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                " Sign up"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
