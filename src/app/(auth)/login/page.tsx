import AuthForm from "@/components/AuthForm";


export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-bgPrimaryLight dark:bg-bgPrimaryDark transition-colors duration-300">

      
      <AuthForm type="login" />
    </main>
  );
}
