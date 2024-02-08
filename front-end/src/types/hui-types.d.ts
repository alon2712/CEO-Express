export {};

declare global {
	/**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
	interface HistoryType {
		name: string;
		id: string;
	}
}
