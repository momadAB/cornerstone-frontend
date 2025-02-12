import { Sparkles } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  businessName: string;
}

export function Header({ businessName }: HeaderProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          <h2 className="text-sm font-semibold text-white">
            Generated Assessment & Ratios
          </h2>
          <Link
            href="#"
            className="text-xs text-[#FFD700] hover:underline ml-1"
          >
            How do we get this information?
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-[#FFD700] text-sm">{businessName}</h3>
        <div className="flex gap-2.5">
          <Link href="#" className="text-[#FFD700] text-xs hover:underline">
            Business License
          </Link>
          <Link href="#" className="text-[#FFD700] text-xs hover:underline">
            Financial Statement
          </Link>
        </div>
      </div>
    </div>
  );
}
