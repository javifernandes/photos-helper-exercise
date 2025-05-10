import {parseState} from "./tokenizer";
import {sortPhotos} from "./sort-photos";
import {padding} from "../../solution";
import {Photo, ProcessingState} from "./performant-solution-types";

/**
 *
 */
export const solution = (S: string) => {
  if (S.length === 0) return ''

  // parse and index by city
  const state = parseState(S)

  // sort assigning numbers to photos
  sortPhotos(state)

  // map the input files rendering them accordingly with the assigned number
  return computeResult(state)
}

const computeResult = (state: ProcessingState) => {
  let result = ''
  const lastIndex = state.photos.length - 1
  state.photos.forEach((photo, index) => {
    result += computeFileName(photo, state, index < lastIndex)
  })
  return result
}

const computeFileName = (photo: Photo, state: ProcessingState, isLast: boolean) =>
    `${photo.city}${padding(state.cities[photo.city].length, photo.number as number)}.${photo.extension}${isLast ? '\n': ''}`

