import Homepage from "@/components/pages/Homepage";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loader className="w-10 h-10 animate-spin"/>}>
      <Homepage/>
      </Suspense>
    </div>
  );
}
