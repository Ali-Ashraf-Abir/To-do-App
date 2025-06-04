import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-bgPrimaryLight dark:bg-bgPrimaryDark transition-colors duration-300">
      <AuthForm type="register" />
    </main>
  );
}
