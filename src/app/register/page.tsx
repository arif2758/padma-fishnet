import type { Metadata } from "next";
import Register from "./_component/Register";
import { Suspense } from "react";
import LoadingSpin from "@/components/LoadingSpin";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Math || English || Science || Technology",
};

function SignUpPage() {
  return (
    <div className="flex flex-col justify-center mt-8">
      <h1 className="text-center text-2xl">Sign Up</h1>
      <div className="my-8 flex justify-center">
        <Suspense fallback={<LoadingSpin />}>
          <Register />
        </Suspense>
      </div>
    </div>
  );
}

export default SignUpPage;
