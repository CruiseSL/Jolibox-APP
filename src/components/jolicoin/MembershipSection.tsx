export function MembershipSection() {
    const items = [
        {
            title: "Basic · 1 Day",
            price: "10 Jolicoin",
            subtitle: "Skip all game ads for today",
            tag: "Most Popular",
            tagColor: "bg-purple-100 text-purple-700"
        },
        {
            title: "Basic · 3 Days",
            price: "25 Jolicoin",
            subtitle: "Enjoy ad-free gaming for 3 days",
            tag: "Best Value",
            tagColor: "bg-green-100 text-green-700"
        },
        {
            title: "Basic · 7 Days",
            price: "50 Jolicoin",
            subtitle: "A full week without game ads",
            tag: null
        },
        {
            title: "Standard · 1 Day",
            price: "20 Jolicoin",
            subtitle: "Skip game & drama ads for a day",
            tag: "Try Premium",
            tagColor: "bg-blue-100 text-blue-600"
        },
    ];

    return (
        <div className="space-y-3 pb-8">
            <h3 className="text-base font-bold text-slate-900">Membership</h3>

            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100 min-h-[84px] flex flex-col justify-center">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col items-start gap-1">
                                {item.tag && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor} mb-0.5`}>
                                        {item.tag}
                                    </span>
                                )}
                                <div className="font-bold text-slate-900 text-sm">
                                    {item.title}
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
                                    {item.subtitle}
                                </div>
                            </div>

                            <span className="text-[#AD00FF] font-bold text-sm text-right shrink-0 ml-2 self-center">
                                {item.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
