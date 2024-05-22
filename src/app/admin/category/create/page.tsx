"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCategoryValidationSchema } from "@/libs/validation/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();
  const form = useForm({ resolver: yupResolver(addCategoryValidationSchema) });

  const onSubmit = async (category: any) => {
    const response = await fetch("/api/admin/category", {
      method: "POST",
      body: JSON.stringify(category),
    });

    const responseAsJson = await response.json();

    if (responseAsJson.success) router.push("/admin/category/list");
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
