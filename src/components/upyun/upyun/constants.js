// NOTE: choose node.js first
// process is defined in client test

export const isBrowser = typeof window !== 'undefined' &&
  (typeof process === 'undefined' || process.title === 'browser')

export const PARTSIZE = 1024 * 1024
