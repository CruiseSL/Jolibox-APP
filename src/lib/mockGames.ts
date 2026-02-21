export interface Game {
    id: string;
    title: string;
    category: string;
    image: string; // The square logo (local asset)
    videoUrl?: string; // Optional video loop for FYP
    rating: number;
    likes: string; // e.g. "1.2M", "890K"
}

export const MOCK_GAMES: Game[] = [
    {
        id: "subway-surfers",
        title: "Subway Surfers",
        category: "Action",
        image: "/games/subway-surfers.png",
        videoUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2071&auto=format&fit=crop",
        rating: 4.6,
        likes: "2.1M"
    },
    {
        id: "roblox",
        title: "Roblox",
        category: "Adventure",
        image: "/games/roblox.png",
        videoUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        rating: 4.4,
        likes: "1.8M"
    },
    {
        id: "genshin-impact",
        title: "Genshin Impact",
        category: "RPG",
        image: "/games/genshin-impact.png",
        videoUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
        rating: 4.2,
        likes: "956K"
    },
    {
        id: "candy-crush",
        title: "Candy Crush Saga",
        category: "Casual",
        image: "/games/candy-crush.png",
        videoUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2071&auto=format&fit=crop",
        rating: 4.5,
        likes: "3.4M"
    },
    {
        id: "brawl-stars",
        title: "Brawl Stars",
        category: "Action",
        image: "/games/brawl-stars.png",
        rating: 4.3,
        likes: "890K"
    },
    {
        id: "pubg-mobile",
        title: "PUBG MOBILE",
        category: "Action",
        image: "/games/pubg-mobile.png",
        rating: 4.1,
        likes: "4.1M"
    },
    {
        id: "clash-of-clans",
        title: "Clash of Clans",
        category: "Strategy",
        image: "/games/clash-of-clans.png",
        rating: 4.6,
        likes: "1.2M"
    },
    {
        id: "among-us",
        title: "Among Us",
        category: "Action",
        image: "/games/among-us.png",
        rating: 4.0,
        likes: "2.8M"
    },
    {
        id: "monopoly-go",
        title: "MONOPOLY GO!",
        category: "Board",
        image: "/games/monopoly-go.png",
        rating: 4.7,
        likes: "5.5M"
    },
    {
        id: "royal-match",
        title: "Royal Match",
        category: "Puzzle",
        image: "/games/royal-match.png",
        rating: 4.6,
        likes: "780K"
    },
    {
        id: "pokemon-go",
        title: "Pokémon GO",
        category: "Adventure",
        image: "/games/pokemon-go.png",
        rating: 4.2,
        likes: "6.2M"
    },
    {
        id: "stumble-guys",
        title: "Stumble Guys",
        category: "Action",
        image: "/games/stumble-guys.png",
        rating: 4.1,
        likes: "1.1M"
    }
];

// Helper to get a realistic mock game by ID, or fallback.
export function getGameById(id: string): Game {
    return MOCK_GAMES.find((g) => g.id === id) || MOCK_GAMES[0];
}
