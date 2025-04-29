import type { Coordinate } from './coordinate';

export interface DistanceVector {
	dx: number;
	dy: number;
	magnitude: number;
}

interface Measurable {
	getBoundingClientRect: () => DOMRect;
}

export function getRectMidpoint({ left, top, width, height }: DOMRect): Coordinate {
	return {
		x: left + width / 2,
		y: top + height / 2
	};
}

export function getNodeMidpoint(node: Measurable) {
	return getRectMidpoint(node.getBoundingClientRect());
}

export function getDistance(point1: Coordinate, point2: Coordinate): DistanceVector {
	const dx = point2.x - point1.x;
	const dy = point2.y - point1.y;
	const magnitude = Math.sqrt(dx * dx + dy * dy);
	return { dx, dy, magnitude };
}

export function getNodeDistance(node1: Measurable, node2: Measurable) {
	return getDistance(getNodeMidpoint(node1), getNodeMidpoint(node2));
}

export function scaleDistance({ dx, dy, magnitude }: DistanceVector, scale: number) {
	return {
		dx: dx / scale,
		dy: dy / scale,
		magnitude: magnitude / scale
	};
}
