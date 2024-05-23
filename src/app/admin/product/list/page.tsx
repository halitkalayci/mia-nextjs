"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Fragment, useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const fetchProducts = async () => {
    const response = await fetch("/api/admin/product");
    const json = await response.json();

    if (json.success) setProducts(json.products);
  };

  const deleteProduct = async () => {
    const response = await fetch("/api/admin/product/" + productToDelete.id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (json.success) fetchProducts();

    setOpenDeleteModal(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-3">
        <div className="px-10 w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: any) => {
                return (
                  <Fragment key={product.id}>
                    <TableRow>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <Image
                          width={120}
                          height={120}
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Link href={"/admin/product/update?id=" + product.id}>
                          <Button className="mr-3">
                            <i className="pi pi-info"></i>
                          </Button>
                        </Link>

                        <Button
                          onClick={() => {
                            setProductToDelete(product);
                            setOpenDeleteModal(true);
                          }}
                          variant={"destructive"}
                        >
                          <i className="pi pi-trash"></i>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={openDeleteModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure to delete product `{productToDelete?.name}` ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenDeleteModal(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={deleteProduct}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
