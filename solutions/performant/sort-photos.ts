import {Photo, ProcessingState} from "./performant-solution-types";

/**
 * Mutates the state by computing the number for each photo within each cities.
 * Afterwards every photo object will contain already its position within the city.
 */
export const sortPhotos = (state: ProcessingState) => {
  Object.values(state.cities).forEach(photos => {
    // sort by timestamp
    photos.sort(sorterByTimestamp)

    // assign the position according to timestamp
    photos.forEach((photo, index) => {
      photo.number = index + 1
    })
  })
}

const sorterByTimestamp = (p1: Photo, p2: Photo) => {
  if (p1.timestamp < p2.timestamp) return - 1
  else if (p1.timestamp > p2.timestamp) return 1
  else return 0
}
