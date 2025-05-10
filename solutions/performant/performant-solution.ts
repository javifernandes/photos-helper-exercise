import {sortPhotos} from "./sort-photos";
import {Photo, ProcessingState} from "./performant-solution-types";
import {parse} from "./parse";

/**
 * A more procedural but improved version in terms of performance.
 * It is based on this logic
 * - we first parse and index the content both by city and by its original photo appearance
 *   the ProcessingState here is very important. It is a mutable structure with "redundancy".
 *   A Photo appears there in both branches of the structure, the array of Photo as well as within the Cities index.
 * - once we have all the information we sort photos within each city and already assign their final numbers there.
 * - then the last step is just to map the array of photos (which already have a number) into the required output format.
 *   No logic here.
 *
 * The parsing has been done also "manually" or low-level with a custom tokenizer to avoid multiple iterations of the
 * strings (split, map, etc).
 * The same with the output, doing a single iteration.
 */
export const solution = (S: string) => {
  if (S.length === 0) return ''
  return computeResult(sortPhotos(parse(S)))
}

const computeResult = (state: ProcessingState) => {
  const lastIndex = state.photos.length - 1

  return state.photos.reduce((result, photo, index) =>
    result + computeFileName(state, photo, index < lastIndex),
    ''
  )
}

const computeFileName = (state: ProcessingState, photo: Photo, isLast: boolean) =>
    `${photo.city}${photo.number}.${photo.extension}${isLast ? '\n': ''}`


