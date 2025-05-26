// Inject random unexpected fields into a base object
export function withExtras<T>(base: T): T & Record<string, any> {
  const extras: Record<string, any> = {};

    const key = 'fuzz_' + Math.random().toString(36).substring(2, 8);
    const value = Math.random() > 0.5
      ? Math.floor(Math.random() * 100)
      : { nested: true, random: Math.random() };
    extras[key] = value;

  return { ...base, ...extras };
}

// Mutate one specific field with a bad value
export function fuzzField<T>(base: T, field: keyof T, badValue: any): T {
  return { ...base, [field]: badValue };
}