import { Badge } from "@/components/ui/badge";

export function MembershipSection() {
    const items = [
        {
            title: "Basic · 1 Week",
            price: "50 Jolicoin",
            tag: "Most Popular",
            tagColor: "bg-purple-100 text-purple-700"
        },
        {
            title: "Basic · 1 Month",
            price: "100 Jolicoin",
            tag: "Best Value",
            tagColor: "bg-green-100 text-green-700"
        },
        {
            title: "Standard · 1 Week",
            price: "100 Jolicoin",
            tag: null
        },
    ];

    return (
        <div className="space-y-3 pb-8">
            <h3 className="text-lg font-bold text-slate-900">Membership</h3>

            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100 flex items-center justify-between min-h-[80px]">
                        <div className="space-y-1.5">
                            {item.tag && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                                    {item.tag}
                                </span>
                            )}
                            <div className="font-bold text-slate-900 text-sm">
                                {item.title}
                            </div>
                        </div>
                        <span className="text-[#AD00FF] font-bold text-sm">
                            {item.price}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
