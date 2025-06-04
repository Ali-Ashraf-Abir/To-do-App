import ColorSettings from "@/components/ColorPicker";

export default function PlannerPage() {
  return (
    <main className="min-h-screen bg-bgPrimaryLight dark:bg-bgPrimaryDark transition-colors">
      <ColorSettings></ColorSettings>
    </main>
  );
}
