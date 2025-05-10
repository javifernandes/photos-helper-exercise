import {Photo, ProcessingState} from "./performant-solution-types";
import {padding} from "../../solution";

/**
 * Mutates the state by computing the number for each photo within each city.
 * Afterward every photo object will contain already its position within that city in Photo.number
 */
export const sortPhotos = (state: ProcessingState) => {
  Object.values(state.cities).forEach(photos => {
    // sort by timestamp
    photos.sort(sorterByTimestamp)

    // assign the position according to timestamp
    photos.forEach((photo, index) => {
      photo.number = padding(photos.length, index + 1)
    })
  })
  return state
}

const sorterByTimestamp = (p1: Photo, p2: Photo) => {
  if (p1.timestamp < p2.timestamp) return - 1
  else if (p1.timestamp > p2.timestamp) return 1
  else return 0
}