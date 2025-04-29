import { randomInt } from './random';

export const tempers = ['WO', 'FC', 'DR', 'MA'] as const;

export type Temper = (typeof tempers)[number];

export type TemperCounts = Record<Temper, number>;

export function getRandomTemper(): Temper {
	return tempers[randomInt(0, 3)];
}
