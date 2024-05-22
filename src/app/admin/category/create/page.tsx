"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCategoryValidationSchema } from "@/libs/validation/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm({ resolver: yupResolver(addCategoryValidationSchema) });

  const onSubmit = (s: any) => {
    console.log(s);
  };

  return (
    <div className="flex flex-col mt-5 justify-center items-center">
      <h3>Create Category Form</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <Input
                  defaultValue={""}
                  className="my-2"
                  placeholder="Kategori Adı"
                  {...field}
                />
              );
            }}
          />
          {form.formState.errors.name && (
            <small>{form.formState.errors.name?.message}</small>
          )}
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
