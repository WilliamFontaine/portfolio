/**
 * Creates typed element refs for section components
 * Eliminates boilerplate ref declarations following DRY principle
 *
 * @example
 * const { sectionRef, titleRef, descRef } = createSectionRefs(
 *   'sectionRef', 'titleRef', 'descRef'
 * )
 */
export function createSectionRefs<T extends string>(
  ...refNames: T[]
): Record<T, Ref<HTMLElement | undefined>> {
  return Object.fromEntries(
    refNames.map((name) => [name, ref<HTMLElement>()]),
  ) as Record<T, Ref<HTMLElement | undefined>>
}
