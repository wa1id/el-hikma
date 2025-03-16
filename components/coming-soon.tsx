"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Naam moet minimaal 2 karakters bevatten" }),
  email: z.string().email({ message: "Ongeldig e-mailadres" }),
  message: z
    .string()
    .min(10, { message: "Bericht moet minimaal 10 karakters bevatten" }),
});

export default function ComingSoon() {
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    setIsSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Formulier succesvol verzonden!", {
          description: "We nemen binnenkort contact met u op.",
        });
        form.reset();
        setIsSubmitted(true);
      } else {
        toast.error("Er is een fout opgetreden bij het verzenden.", {
          description: "Controleer uw gegevens en probeer het opnieuw.",
        });
      }
    } catch {
      toast.error("Er is een fout opgetreden bij het verzenden.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-end p-4 md:justify-center">
      <Image src="/image-4.png" alt="" fill className="object-cover" priority />
      <div className="relative z-10 w-full max-w-md translate-y-0 space-y-8 rounded-xl bg-white bg-opacity-65 p-6 shadow-lg backdrop-blur-sm backdrop-filter md:translate-y-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Contacteer ons</h1>
          <p className="mt-2 text-gray-600">
            We werken hard om u iets geweldigs te brengen. Blijf op de hoogte!
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Naam</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-600 shadow-sm placeholder:text-gray-600"
                      placeholder="Naam"
                      {...field}
                    />
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
                  <FormLabel className="sr-only">E-mailadres</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-600 shadow-sm placeholder:text-gray-600"
                      type="email"
                      placeholder="E-mailadres"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Bericht</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-600 shadow-sm placeholder:text-gray-600"
                      placeholder="Uw bericht"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Verzenden..." : "Verstuur bericht"}
            </Button>

            {isSubmitted && (
              <div className="mt-4 text-center text-sm text-green-600">
                Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact
                met u op.
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
