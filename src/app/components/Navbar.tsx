import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div>
      <ul className="flex  justify-between m-10 items-center ">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex flex-row-reverse gap-10">
          <Link href="/profile">
            <li>Profile</li>
          </Link>

          <Link href="/login">
            <li>Log in</li>
          </Link>

          <Link href="/signup">
            <li>Sign up</li>
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
