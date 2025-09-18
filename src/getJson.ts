import type { RatingsData } from './types';

const getGameRatings = async (): Promise<RatingsData> => {
	const response = await fetch('/ratings.json');
	const data = await response.json();
	if (!data || !Array.isArray(data.games)) {
		throw new Error('Invalid data format');
	}

	return data as RatingsData;
};

export default getGameRatings;
