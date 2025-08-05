export function getRandomItem<T>(items: T[]) {
	const randomIndex = Math.floor(Math.random() * items.length);
	return items[randomIndex];
}
