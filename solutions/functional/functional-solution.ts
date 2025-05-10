import {
  always, append,
  ifElse,
  isEmpty, lensProp,
  map,
  mapObjIndexed,
  over,
  pipe,
  prop,
  sortBy,
  split,
  trim,
} from "ramda";
import {padding} from "../commons/commons";

/**
 * A higher level solution that doesn't focus mainly on performance.
 * It has 3 steps
 *  - parse the inputs.
 *  - build and index by city whose photos are sorted by timestamp.
 *  - the create the final result computing each photo's position.
 *
 *  Although less performant in various steps of the logic compared to "performant-solution" it is clearly
 *  shorter in terms of code: 1 file, very small one-liner functions using higher-order function composition
 *  through ramda library. I call it "functional" because of this latter fact (not that we use recursion or fully
 *  immutable structures, etc)
 */
export const solution = (S: string) => {
  const photos = parseInput(S)
  return photos.map(assignName(buildIndex(photos))).join('\n')
}

//
// Index building
//

const createIndex = (photos: Photo[]): PhotoIndex => photos.reduce(processPhoto, {})
const processPhoto = (index: PhotoIndex, photo: Photo): PhotoIndex => assignPhoto(photo.city, photo)(index)
const assignPhoto = (city: string, photo: Photo) =>
  over(
    lensProp<PhotoIndex, string>(city),
    append(photo)
  )

// sort each city's photos
const sortIndex: (index: PhotoIndex) => PhotoIndex = mapObjIndexed(sortBy(prop('timestamp')))

const buildIndex = pipe(createIndex, sortIndex)

const assignName = (index: PhotoIndex) => (photo: Photo) =>
    formatPhoto(photo, getPhotoNumber(index, photo))

const formatPhoto = (photo: Photo, n: string) => `${photo.city}${n}.${photo.extension}`

/**
 * Computes the photo number by doing a lookup into the city.
 * This is enhanced in the "performant-solution"
 */
const getPhotoNumber = (index: PhotoIndex, photo: Photo) =>
    padding(index[photo.city].length, index[photo.city].indexOf(photo) + 1)

//
// Parsing
//

const parseByDelimiter = (delimiter: string) => pipe(split(delimiter), map(trim))
const parseLines = ifElse(
    isEmpty,
    always([]),
    parseByDelimiter('\n')
)
const parseLine = (line: string): Photo => {
  const [n, city, timestamp] = parseByDelimiter(',')(line)
  const [name, extension] = n.split('.')
  return {
    name,
    extension,
    city,
    timestamp
  }
}

const parseInput = pipe(parseLines, map(parseLine))
