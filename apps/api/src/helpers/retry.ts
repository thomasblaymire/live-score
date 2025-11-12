// An exponential backoff retry function
export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 100
): Promise<T> {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    return await retry(fn, retries - 1, delay * 2);
  }
}
