import type { Metadata } from "next";

import { Suspense } from "react";
import LoadingSpin from "@/components/LoadingSpin";
import LoginComponent from "./_component/LoginComponent";

export const metadata: Metadata = { 
  title: "Sign In",
  description: "Math || English || Science || Technology",
};
function SignInPage() {
  return (
    <div className="flex flex-col justify-center mt-8">
      <h1 className="text-center text-2xl">Log In</h1>
      <div className="my-8 flex justify-center">
        <Suspense fallback={<LoadingSpin />}>
          <LoginComponent />
        </Suspense>
      </div>
    </div>
  );
} 

export default SignInPage;
