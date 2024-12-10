'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from "sonner"
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, { message: "Naam moet minimaal 2 karakters bevatten" }),
  email: z.string().email({ message: "Ongeldig e-mailadres" }),
  message: z.string().min(10, { message: "Bericht moet minimaal 10 karakters bevatten" }),
})

export default function ComingSoon() {
  const [isPending, setIsPending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true)
    setIsSubmitted(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Formulier succesvol verzonden!', {
          description: 'We nemen binnenkort contact met u op.',
        })
        form.reset()
        setIsSubmitted(true)
      } else {
        console.error('Form errors:', data.errors)
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Er is een fout opgetreden bij het verzenden.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center md:justify-center justify-end p-4">
      <Image src="/image-4.png" alt="" fill className="object-cover" priority />
      <div className="relative z-10 max-w-md w-full space-y-8 bg-white bg-opacity-65 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-lg md:translate-y-0 translate-y-0">
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
                      className="placeholder:text-gray-600 border-gray-600 shadow-sm"
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
                      className="placeholder:text-gray-600 border-gray-600 shadow-sm"
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
                      className="placeholder:text-gray-600 border-gray-600 shadow-sm"
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
              {isPending ? 'Verzenden...' : 'Verstuur bericht'}
            </Button>

            {isSubmitted && (
              <div className="text-center text-sm text-green-600 mt-4">
                Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact
                met u op.
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}
