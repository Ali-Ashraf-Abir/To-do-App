
import TodoDashboard from "@/components/TodoDashboard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-bgPrimaryLight dark:bg-bgPrimaryDark transition-colors">
      <TodoDashboard />
    </main>
  );
}