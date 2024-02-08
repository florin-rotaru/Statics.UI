export function isNullOrUndefined(
  value: null | undefined | boolean | number | bigint | string
): boolean {
  return value === null || value === undefined;
}
