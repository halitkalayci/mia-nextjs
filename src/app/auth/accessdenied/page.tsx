import Link from "next/link";

export default function Page() {
    return (
        <div>
            <p>Access Denied</p>
            <Link href={"/"} >Go Back To Homepage</Link>
        </div>
    );
}