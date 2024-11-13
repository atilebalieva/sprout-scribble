import { AlertCircle } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-teal-400/25 text-xs fontmedium text-secondary-foreground my-2 p-3 flex gap-3 items-center">
      <AlertCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
