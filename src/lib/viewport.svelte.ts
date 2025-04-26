import { translatePx, zoomRatio } from './settings';
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

	zoom(direction: unknown) {
		if (![0, 1, -1].includes(Number(direction))) {
			throw new Error(`Invalid zoom direction: ${direction}`);
		}

		if (direction === 0) this.scale = 1;
		if (direction === 1) this.scale *= zoomRatio;
		if (direction === -1) this.scale /= zoomRatio;
	}
}
