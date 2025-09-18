import * as fs from 'node:fs';
import type { GameRating, RatingsData } from './types';

const inputFilePath = 'input.csv' as const;
const outputFilePath = 'public/ratings.json' as const;

const parseGameRatings = (): GameRating[] => {
	const data = fs.readFileSync(inputFilePath, 'utf-8');
	const lines = data.split(/\r?\n/).slice(1);
	const ratings: GameRating[] = [];
	for (const line of lines) {
		if (line.trim() === '') continue;
		const [name, ratingStr] = line.split(',');

		const rating = parseFloat(ratingStr);
		if (isNaN(rating)) continue;
		ratings.push({ name: name.trim(), rating });
	}

	return ratings;
};

const saveAsJSON = (ratings: RatingsData): void => {
	const jsonData = JSON.stringify(ratings, null, 2);
	fs.writeFileSync(outputFilePath, jsonData, 'utf-8');
};

const main = (): void => {
	const ratings = parseGameRatings();
	const avgRating =
		ratings.reduce((sum, { rating }) => sum + rating, 0) / ratings.length;
	const jsonObject = {
		averageRating: parseFloat(avgRating.toFixed(3)),
		games: ratings.sort((a, b) => b.rating - a.rating),
	};
	saveAsJSON(jsonObject);
};

main();
