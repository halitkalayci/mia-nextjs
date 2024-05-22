"use client";
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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment, useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>({});

  const fetchCategories = async () => {
    const response = await fetch("/api/admin/category");
    const json = await response.json();
    setCategories(json.categories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async () => {
    //TODO: Fetch delete request with id
    console.log("Deleting category:" + categoryToDelete.id);

    const response = await fetch("/api/admin/category/" + categoryToDelete.id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (json.success)
      //! => Verileri API'den tekrar yüklemek, silinen veriyi ön tarafta js ile silmek.
      fetchCategories();

    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-3">
        <div className="px-10 w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: any) => {
                return (
                  <Fragment key={category.id}>
                    <TableRow>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <Button className="mr-3">
                          <i className="pi pi-info"></i>
                        </Button>

                        <Button
                          onClick={() => {
                            setDeleteModalOpen(true);
                            setCategoryToDelete(category);
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
      </div>
      <AlertDialog open={deleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to delete category `{categoryToDelete.name}` ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteCategory}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
