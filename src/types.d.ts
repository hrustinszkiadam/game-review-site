export type GameRating = {
	name: string;
	rating: number;
	wikipediaUrl: string;
};

export type RatingsData = {
	averageRating: number;
	games: GameRating[];
};
