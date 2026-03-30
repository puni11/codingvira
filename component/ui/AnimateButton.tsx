import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";

export default function Button({ status, text }: { status: string; text: string }) {
  return (
    <button
      disabled={status === "loading"}
      className="w-full bg-black text-white rounded-xl cursor-pointer py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-all"
    >
      {status === "loading" && <Loader2 className="animate-spin" size={18} />}
      {status === "success" && <CheckCircle size={18} />}
      {status === "idle" && (
        <>
          {text}
          <ChevronRight size={16} />
        </>
      )}
      {status === "error" && text}
    </button>
  );
}