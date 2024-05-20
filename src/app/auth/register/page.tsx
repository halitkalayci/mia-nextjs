"use client";

import { FormEvent } from "react";

export default function Page() {
  const handleSubmit = async (event: FormEvent) => {};

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <p>Register Page</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Username</label>
          <input
            className="shadow appearance-none border rounded"
            type="text"
            name="username"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="shadow appearance-none border rounded"
            type="password"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 rounded text-white w-full p-3"
        >
          Register
        </button>
      </form>
    </div>
  );
}
