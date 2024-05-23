"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProductValidationSchema } from "@/libs/validation/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const form = useForm({ resolver: yupResolver(addProductValidationSchema) });
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const onSubmit = async (event: any) => {
    const formData = new FormData();
    formData.append("deneme", "123");
    Object.keys(event).forEach((key) => {
      formData.append(key, event[key]);
    });

    const response = await fetch("/api/admin/product/", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();

    if (json.success) router.push("/admin/product/list");
  };

  const fetchCategories = async () => {
    const response = await fetch("/api/admin/category");
    const json = await response.json();
    setCategories(json.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col mt-5 justify-center items-center">
      <h3>Create Category Form</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <Input
                    defaultValue={""}
                    className="my-2"
                    placeholder="Product Name"
                    {...field}
                  />
                );
              }}
            />
            {form.formState.errors.name && (
              <small>{form.formState.errors.name.message}</small>
            )}
          </div>

          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <Input
                    defaultValue={""}
                    className="my-2"
                    placeholder="Product Description"
                    {...field}
                  />
                );
              }}
            />
            {form.formState.errors.description && (
              <small>{form.formState.errors.description?.message}</small>
            )}
          </div>

          <div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <Input
                    defaultValue={""}
                    className="my-2"
                    placeholder="Product Price"
                    type="number"
                    {...field}
                  />
                );
              }}
            />
            {form.formState.errors.price && (
              <small>{form.formState.errors.price?.message}</small>
            )}
          </div>

          {categories.length > 0 && (
            <div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={"1"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category: any) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div>
            <Controller
              name="file"
              control={form.control}
              render={({ field }) => {
                return (
                  <input
                    className="my-2"
                    type="file"
                    onChange={(e) => {
                      console.log(e);
                      field.onChange(e.target.files ? e.target.files[0] : null);
                    }}
                  />
                );
              }}
            />
          </div>

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
