export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRectMidpoint({ left, top, width, height }) {
	return {
		x: left + width / 2,
		y: top + height / 2
	};
}

export function getNodeDistance(node1, node2) {
	const rect1 = node1.getBoundingClientRect();
	const mid1 = getRectMidpoint(rect1);

	const rect2 = node2.getBoundingClientRect();
	const mid2 = getRectMidpoint(rect2);

	const dx = mid2.x - mid1.x;
	const dy = mid2.y - mid1.y;

	const distance = Math.sqrt(dx * dx + dy * dy);

	return { dx, dy, distance };
}
