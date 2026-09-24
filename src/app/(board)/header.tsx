import { LogInIcon, SearchIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";

import { Input } from "@/components/input";

export function Header() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  function handleSearchUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates:
        event.target.value.length !== 0 ? debounce(500) : undefined,
    });
  }

  return (
    <header className="max-w-[900px] mx-auto w-full flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the development progress of our entire platform.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="absolute size-4 text-navy-200 left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />

          <Input
            type="text"
            placeholder="Search for features..."
            className="w-[270px] pl-8"
            value={search}
            onChange={handleSearchUpdate}
          />
        </div>

        <button
          type="button"
          className="size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 cursor-pointer"
        >
          <LogInIcon className="size-3.5 text-navy-200" />
        </button>
      </div>
    </header>
  );
}
