/**
 * Execute given callback on the next browser repaint. It also returns a
 * promise, so instead of a callback, it can be awaited.
 *
 * @param callback
 * @returns Promise
 */
export declare function nextTick(callback?: () => void): Promise<unknown>;
