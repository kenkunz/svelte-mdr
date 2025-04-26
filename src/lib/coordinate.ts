export interface Coordinate {
	x: number;
	y: number;
}

export function isCoordinate(c: unknown): c is Coordinate {
	if (!(c instanceof Object)) return false;
	const { x, y } = c as any;
	return typeof x === 'number' && typeof y === 'number';
}
