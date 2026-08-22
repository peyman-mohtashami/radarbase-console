export function withLanguage(
  value: Record<string, string> | undefined,
  lang: string,
): Record<string, string> {
  return {
    ...value,
    [lang]: value?.[lang] ?? '',
  };
}
