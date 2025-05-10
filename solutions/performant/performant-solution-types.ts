
/**
 * A structured representation of a Photo which contains
 * - the parsed info from the input
 * - its position in the original input (therefore its
 */
export type Photo = {
  name: string;
  extension: string;
  city: string;
  timestamp: string;

  /** The assigned position-number within the city already with the format having leading zeros */
  number?: string;
}

/**
 *
 */
export type ProcessingState = {
  lastTokenStart: number;
  currentLineTokens: string[];

  /**
   * We keep the parsed photos here in the same order as they appear in the input
   * Which can be seen as the (almost) final result.
   * This gets populated while parsing, then "number" gets assigned
   */
  photos: Photo[];

  /**
   * Intermediate data representation indexed by cities.
   * The Photo objects here MUST be the same instance (identity not equality) than those stored in "photos".
   * This gives us a partitioned view of the `photos` field, by city which allows us to sort them with different
   * numbers for each city.
   */
  cities: {
    [city: string]: Photo[];
  }
}