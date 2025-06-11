export interface SelectOption {
  value: string;
  label: string;
  icon: string;
}
/**
 * Contains the list of countries
 * 
 * @type {SelectOption[]}
 */
export const countries: readonly SelectOption[] = [
  { value: 'BR', label: 'Brasil', icon: 'https://hatscripts.github.io/circle-flags/flags/br.svg' },
  { value: 'US', label: 'USA', icon: 'https://hatscripts.github.io/circle-flags/flags/us.svg' },
  // Other countries can be added here
] as const;

export type CountryCode = typeof countries[number]['value'];