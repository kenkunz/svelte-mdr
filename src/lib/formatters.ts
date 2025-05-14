export function formatPercent(n: number) {
	return n.toLocaleString('en-us', { style: 'percent', roundingMode: 'floor' });
}
