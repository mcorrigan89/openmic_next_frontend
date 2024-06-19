import { SigninForm } from "./signin-form";

export default function SigninPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center gap-16 p-8 pb-20 pt-60 font-sans sm:p-20">
      <SigninForm />
    </div>
  );
}
