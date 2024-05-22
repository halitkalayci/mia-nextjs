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
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
export default function Page() {
  const form = useForm({ resolver: yupResolver(addProductValidationSchema) });
  const [categories, setCategories] = useState([]);

  const onSubmit = (event: any) => {
    console.log(event);
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
                    placeholder="Ürün Adı"
                    {...field}
                  />
                );
              }}
            />
            {form.formState.errors.name && (
              <small>{form.formState.errors.name.message}</small>
            )}
          </div>

          {categories.length > 0 && (
            <div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
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
              {form.formState.errors.name && (
                <small>{form.formState.errors.name.message}</small>
              )}
            </div>
          )}
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
