export function handleError(message: string, error: unknown): never {
	console.error(`${message}:`, error);
	throw new Error(`${message}: ${error instanceof Error ? error.message : 'Unknown error'}`);
}
