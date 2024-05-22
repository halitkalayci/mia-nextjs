import { number, object, string } from "yup";

export const addCategoryValidationSchema = object({
  name: string()
    .required("Kategori adı zorunludur.")
    .min(3, "Kategori adı en az 3 karakter olmalıdır."),
});

export const updateCategoryValidationSchema = object({
  id: number().required().min(1),
  name: string()
    .required("Kategori adı zorunludur.")
    .min(3, "Kategori adı en az 3 karakter olmalıdır."),
});

export const addProductValidationSchema = object({
  name: string().required().min(3),
  categoryId: number().required().min(1),
  description: string().min(5),
  price: number().required().min(1),
});
