"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<any>({});
  const router = useRouter();

  const fetchCategoryById = async () => {
    const response = await fetch("/api/admin/category/" + params.id);
    const json = await response.json();

    if (json.success) setCategory(json.category);
    else router.push("/admin/category/list");
  };

  useEffect(() => {
    fetchCategoryById();
  }, []);

  return (
    <div>
      {category.id} <br />
      {category.name}
    </div>
  );
}
