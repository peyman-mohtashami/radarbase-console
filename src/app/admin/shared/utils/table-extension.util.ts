export function getHighestPriorityClass(tableFields: { extensionClass?: string }[]): string {
  /**
   * Maps extension class strings to their respective numeric representations.
   */
  const extensionClassMapper: Record<string, number> = {
    'hidden': 0,
    'block xs:hidden': 1,
    'block sm:hidden': 2,
    'block md:hidden': 3,
    'block lg:hidden': 4,
    'block xl:hidden': 5,
    'block 2xl:hidden': 6,
    'block 3xl:hidden': 7,
    'block': 8,
  };

  /**
   * Maps numeric extension class representations back to their corresponding class strings.
   */
  const numericToClassMapper: Record<number, string> = {
    0: 'hidden',
    1: 'block xs:hidden',
    2: 'block sm:hidden',
    3: 'block md:hidden',
    4: 'block lg:hidden',
    5: 'block xl:hidden',
    6: 'block 2xl:hidden',
    7: 'block 3xl:hidden',
    8: 'block',
  };

  let highestPriority = 0;

  tableFields.forEach(field => {
    if (field.extensionClass && extensionClassMapper[field.extensionClass] !== undefined) {
      highestPriority = Math.max(highestPriority, extensionClassMapper[field.extensionClass]);
    }
  });

  return numericToClassMapper[highestPriority];
}
