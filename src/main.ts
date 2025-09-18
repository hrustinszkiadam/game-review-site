import getGameRatings from './getJson';
import type { GameRating, RatingsData } from './types';

const avgRatingElement = document.querySelector(
	'#avg-rating'
) as HTMLHeadingElement;

const cardTemplate = document.querySelector(
	'#card-template'
) as HTMLTemplateElement;

const createCard = (game: GameRating): HTMLDivElement => {
	const card = cardTemplate.content.cloneNode(true) as HTMLDivElement;
	card.querySelector('.card-title')!.textContent = game.name;
	const ratingStars = Math.round(game.rating);
	card.querySelector('.card-text')!.textContent = `${'⭐'.repeat(ratingStars)}`;
	const cardBody = card.querySelector('.card') as HTMLDivElement;
	if (game.rating >= 4.8) {
		cardBody.style.backgroundColor = 'lightgreen';
	} else if (game.rating < 4.0) {
		cardBody.style.backgroundColor = 'lemonchiffon';
	}
	card.querySelector('.card-link')!.setAttribute('href', game.wikipediaUrl);

	return card;
};

const fillGames = (games: GameRating[]): void => {
	games.forEach((game) => {
		const card = createCard(game);
		document.querySelector('#game-reviews')!.appendChild(card);
	});
};

const main = async (): Promise<void> => {
	const gameRatings: RatingsData = await getGameRatings();

	avgRatingElement.textContent = `A megjelenített játékok átlagos értékelése: ${gameRatings.averageRating}⭐`;

	fillGames(gameRatings.games);
};

main();
