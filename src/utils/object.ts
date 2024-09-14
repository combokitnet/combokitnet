export const cleanObject = (
  obj: Record<string, any>,
  keepKeys: string[] = []
) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Keep keys with non-empty values or the keys that should be preserved
    if (
      (value !== null && value !== undefined && value !== "") ||
      keepKeys.includes(key)
    ) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};
