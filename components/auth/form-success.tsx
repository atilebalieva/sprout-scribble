import { CheckCircle2 } from "lucide-react";

export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-teal-400/25 text-secondary-foreground my-2 text-xs font-medium p-3 flex gap-3 items-center">
      <CheckCircle2 className="bg-teal-400" />
      <p>{message}</p>
    </div>
  );
};
