import Link from "next/link";
import React from "react";

const ProtectedNavItem = (props: any) => {
  return (
    props.authContext.auth &&
    props.authContext.auth.roles.some((role: any) =>
      props.requiredRoles.some((r: any) => r == role)
    ) && (
      <Link
        href={props.href}
        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
        aria-current="page"
      >
        {props.label}
      </Link>
    )
  );
};

export default ProtectedNavItem;
