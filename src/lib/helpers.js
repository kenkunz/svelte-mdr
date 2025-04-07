export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRectMidpoint({ left, top, width, height }) {
	return {
		x: left + width / 2,
		y: top + height / 2
	};
}

export function getNodeMidpoint(node) {
	return getRectMidpoint(node.getBoundingClientRect());
}

export function getDistance(point1, point2) {
	const dx = point2.x - point1.x;
	const dy = point2.y - point1.y;
	const magnitude = Math.sqrt(dx * dx + dy * dy);
	return { dx, dy, magnitude };
}

export function getNodeDistance(node1, node2) {
	return getDistance(getNodeMidpoint(node1), getNodeMidpoint(node2));
}

export function scaleDistance({ dx, dy, magnitude }, scale) {
	return {
		dx: dx / scale,
		dy: dy / scale,
		magnitude: magnitude / scale
	};
}
