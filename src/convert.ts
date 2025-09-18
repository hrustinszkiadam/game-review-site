import * as fs from 'node:fs';
import type { GameRating, RatingsData } from './types';

let inputFilePath = 'input.csv';
const outputFilePath = 'public/ratings.json' as const;

//get params from command line (npm run convert yourfile.csv)
if (process.argv.length >= 3) {
	const arg = process.argv[2];
	if (arg.endsWith('.csv')) {
		inputFilePath = arg;
	}
}

const parseGameRatings = (): GameRating[] => {
	const data = fs.readFileSync(inputFilePath, 'utf-8');
	const lines = data.split(/\r?\n/).slice(1);
	const ratings: GameRating[] = [];
	for (const line of lines) {
		if (line.trim() === '') continue;
		const [name, ratingStr, wikipediaUrl] = line.split(',');

		const rating = parseFloat(ratingStr);
		if (isNaN(rating)) continue;
		ratings.push({
			name: name.trim(),
			rating,
			wikipediaUrl: wikipediaUrl.trim(),
		});
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
