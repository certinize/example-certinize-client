/**
 * Resolve HTTP response
 * @param {any} promise
 * @return {any}
 */
export async function resolve(promise) {
  const resolved = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    resolved.error = e;
  }

  return resolved;
}
