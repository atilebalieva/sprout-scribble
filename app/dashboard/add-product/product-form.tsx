"use client";

import { ProductSchema } from "@/types/products-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { DollarSign } from "lucide-react";

export default function ProductForm() {
  const form = useForm<z.infer<typeof ProductSchema>>({ defaultValues: { title: "", description: "", price: 0 } });

  const { execute, status } = useAction();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={() => console.log("form")} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Saekdong Stripe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      {/*  <Input placeholder="Saekdong Stripe" {...field} />
                       */}{" "}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tiproduct-price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product price</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <DollarSign size={36} className="p-2 bg-muted rounded-md" />
                        <Input {...field} type="number" placeholder=" Your price in USD" step="0.1" min={0} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={status === "executing" || !form.formState.isValid || !form.formState.isDirty}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
