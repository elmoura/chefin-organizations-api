export function jsonBodyParser<ResultType = Record<string, unknown>>(
  body: string | null
): ResultType {
  return JSON.parse(body || '{}');
}
