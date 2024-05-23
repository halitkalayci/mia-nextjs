"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState({});

  const fetchProductById = async () => {
    let id = searchParams.get("id");
    if (!id) {
      router.push("/admin/product/list");
      return;
    }

    const response = await fetch("/api/admin/product/" + id);
    const json = await response.json();

    if (json.success) setProduct(json.product);
    else router.push("/admin/product/list");
  };

  useEffect(() => {
    fetchProductById();
  }, []);
  return <div></div>;
}
