import { CheckCircle2 } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-teal-400 text-secondary-foreground p-3">
      <CheckCircle2 className="bg-teal-400" />
      <p>{message}</p>
    </div>
  );
};
