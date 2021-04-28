declare global {
  interface Window {
    requestIdleCallback: (
      callback: () => void,
      config: { timeout: number },
    ) => void;
  }
}

/**
 * Delays an operation by 1-2x the given timeout, then requests
 * idle time so the operation doesn’t affect app performance.
 */
export const delayAndIdle = (
  callback: () => void,
  timeoutHandle: number,
  timeout: number,
) => {
  if (timeoutHandle) {
    window.clearTimeout(timeoutHandle);
  }

  return window.setTimeout(() => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout });
    } else {
      callback();
    }
  }, timeout);
};
