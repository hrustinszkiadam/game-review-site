export type GameRating = {
	name: string;
	rating: number;
};

export type RatingsData = {
	averageRating: number;
	games: GameRating[];
};
