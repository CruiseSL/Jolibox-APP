import { StatusBar } from "@/components/shared/StatusBar";
import { BottomNav } from "@/components/rewards/BottomNav";
import { HeaderStats } from "@/components/rewards/HeaderStats";
import { DailyCheckIn } from "@/components/rewards/DailyCheckIn";
import { BonusCard } from "@/components/rewards/BonusCard";
import { SpinBanner } from "@/components/rewards/SpinBanner";
import { DailyGoal } from "@/components/rewards/DailyGoal";
import { TaskList } from "@/components/rewards/TaskList";

export default function RewardsPage() {
  return (
    <div className="w-full h-full bg-[#f7f8fa] relative flex flex-col overflow-hidden text-slate-900">
      <StatusBar bgClass="bg-[#f7f8fa]/90" />

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
