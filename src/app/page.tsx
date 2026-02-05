import { BottomNav } from "@/components/rewards/BottomNav";
import { HeaderStats } from "@/components/rewards/HeaderStats";
import { DailyCheckIn } from "@/components/rewards/DailyCheckIn";
import { BonusCard } from "@/components/rewards/BonusCard";
import { SpinBanner } from "@/components/rewards/SpinBanner";
import { DailyGoal } from "@/components/rewards/DailyGoal";
import { TaskList } from "@/components/rewards/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-900 bg-[#252525]">
      <div className="mx-auto max-w-md bg-white min-h-screen shadow-sm relative flex flex-col">
        {/* Status Bar Placeholder */}
        <div className="flex justify-between items-center px-6 py-3 text-sm font-semibold sticky top-0 z-50 bg-white/80 backdrop-blur-md">
          <span>9:41</span>
          <div className="flex gap-1.5 item-center">
            <div className="flex gap-1">
              <div className="h-2.5 w-px bg-slate-900"></div>
              <div className="h-2.5 w-px bg-slate-900"></div>
              <div className="h-2.5 w-px bg-slate-900"></div>
              <div className="h-2.5 w-px bg-slate-400"></div>
            </div>
            <div className="h-3 w-4 border-[1.5px] border-slate-300 rounded-[4px] relative ml-1">
              <div className="absolute inset-0.5 bg-slate-900 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <main className="px-5 space-y-6 pt-2 pb-24 flex-1">
          <HeaderStats />
          <DailyCheckIn />
          <BonusCard />
          <SpinBanner />
          <div className="pt-2 space-y-8">
            <DailyGoal />
            <TaskList />
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
