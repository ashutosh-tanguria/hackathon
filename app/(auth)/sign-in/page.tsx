import { AuthCard } from "@/features/auth/components/auth-card";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <AuthCard title="Welcome Back">
      <SignInForm />
    </AuthCard>
  );
}