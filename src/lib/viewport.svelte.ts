import { translatePx } from './settings';
import { isCoordinate } from './coordinate';

export class Viewport {
	x = $state(0);
	y = $state(0);
	scale = $state(1);

	translate(coordinate: unknown) {
		if (!isCoordinate(coordinate)) {
			throw new Error(`Invalid coordinate: ${coordinate}`);
		}
		this.x += coordinate.x * translatePx;
		this.y += coordinate.y * translatePx;
	}
}
