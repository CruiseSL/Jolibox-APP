import { BottomNav } from "@/components/rewards/BottomNav";
import { HeaderStats } from "@/components/rewards/HeaderStats";
import { DailyCheckIn } from "@/components/rewards/DailyCheckIn";
import { BonusCard } from "@/components/rewards/BonusCard";
import { SpinBanner } from "@/components/rewards/SpinBanner";
import { DailyGoal } from "@/components/rewards/DailyGoal";
import { TaskList } from "@/components/rewards/TaskList";

export default function Home() {
  return (
    <div className="w-full h-full bg-[#f7f8fa] relative flex flex-col overflow-hidden text-slate-900">
      {/* Status Bar Placeholder */}
      <div className="flex justify-between items-center px-6 py-3 text-sm font-semibold sticky top-0 z-50 bg-[#f7f8fa]/90 backdrop-blur-md flex-shrink-0">
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
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-5 pt-3 pb-[100px] flex flex-col">
          <HeaderStats />
          <div className="mt-5">
            <DailyCheckIn />
          </div>
          <div className="mt-3">
            <BonusCard />
          </div>
          <div className="mt-6">
            <SpinBanner />
          </div>
          <div className="mt-6">
            <DailyGoal />
          </div>
          <div className="mt-6">
            <TaskList />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
