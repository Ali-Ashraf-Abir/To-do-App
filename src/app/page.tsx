
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className=" bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <section className="flex flex-col items-center justify-center text-center px-4 py-20 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Organize Your Life with <span className="text-blue-500">ToDoApp</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
          Your tasks. Your schedule. One place to manage them all, with beautiful dark/light themes and easy-to-use interface.
        </p>
        <Link
          href="register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
