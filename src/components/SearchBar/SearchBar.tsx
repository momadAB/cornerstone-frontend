import { useEffect, useRef } from "react";
import { useSearch } from "@/components/SearchBar/SearchContext";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { searchQuery, setSearchQuery, searchType } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Auto-focus on search input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative group w-full">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        placeholder={`Search ${
          searchType === "history" ? "history records" : "chats/users"
        }...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-10 bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 text-sm text-white 
        placeholder:text-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
      />
    </div>
  );
}
