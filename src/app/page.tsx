import { ArchiveIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-[1620px] w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <div></div>

      <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
        <div className="bg-navy-800 rounded-xl border-[0.5px] border-navy-500 pt-3 flex flex-col gap-1">
          {/* Header */}
          <div className="flex items-center justify-between px-3">
            <span className="bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
              <ArchiveIcon className="size-3" />
              Backlog
            </span>

            <span className="text-xs text-navy-200">16</span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2.5 overflow-y-scroll p-3">
            <div>card 1</div>
            <div>card 2</div>
            <div>card 3</div>
          </div>
        </div>
      </main>
    </div>
  );
}
