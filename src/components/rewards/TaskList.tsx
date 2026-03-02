import { Gamepad2, Film, Smartphone } from "lucide-react";
import { TaskItem } from "@/components/shared/TaskItem";

export function TaskList() {
    return (
        <div className="space-y-4 pb-8">
            <h2 className="text-[17px] font-black text-slate-900 mb-2 px-1">Tasks</h2>
            <div className="space-y-6">
                <TaskItem
                    icon={Gamepad2}
                    title="Play 7 games (2/7)"
                    reward="+1000"
                    progress={25}
                    actionLabel="Claim"
                    actionVariant="primary"
                    bonusBadge="+6"
                />

                <TaskItem
                    icon={Film}
                    title="Watch 3 home videos"
                    reward="+1000"
                    progress={40}
                    actionLabel="Go"
                    actionVariant="secondary"
                />

                <TaskItem
                    icon={Smartphone}
                    title="Register a Jolibox account"
                    reward="+1000"
                    progress={0}
                    hideProgress
                    actionLabel="Claimed"
                    actionVariant="ghost"
                />
            </div>
        </div>
    );
}
