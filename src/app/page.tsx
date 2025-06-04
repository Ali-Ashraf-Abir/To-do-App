import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-bgPrimaryLight dark:bg-bgPrimaryDark transition-colors duration-300">

      <section className="flex flex-col items-center justify-center text-center px-4 py-20 min-h-screen">
        <h1 className="text-4xl font-bold text-textPrimaryLight dark:text-textPrimaryDark mb-4">
          Organize Your Life with <span className="text-btnBgLight dark:text-btnBgDark">ToDoApp</span>
        </h1>
        <p className="text-lg text-textSecondaryLight dark:text-textSecondaryDark mb-8 max-w-xl">
          Your tasks. Your schedule. One place to manage them all, with beautiful dark/light themes and easy-to-use interface.
        </p>
        <Link
          href="/register"
          className="px-6 py-3 bg-btnBgLight hover:bg-btnBgHoverLight dark:bg-btnBgDark dark:hover:bg-btnBgHoverDark text-white rounded-lg transition"
        >
          Get Started
        </Link>
      </section>

    </main>
  );
}
