export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  if (Object.keys(message).length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-green-800 dark:text-green-300 bg-green-100 border-l-2 border-green-600 px-4 py-2 dark:bg-neutral-800">
          {message.success}
        </div>
      )}

      {"error" in message && (
        <div className="text-red-800 dark:text-red-300 bg-red-100 border-l-2 border-red-600 px-4 py-2 dark:bg-neutral-800">
          {message.error}
        </div>
      )}

      {"message" in message && (
        <div className="text-blue-800 dark:text-blue-300 bg-blue-100 border-l-2 border-blue-600 px-4 py-2 dark:bg-neutral-800">
          {message.message}
        </div>
      )}
    </div>
  );
}
