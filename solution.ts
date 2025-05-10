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

type Photo = {
  name: string;
  extension: string;
  city: string;
  timestamp: string;
}

/**
 *
 */
export const solution = (S: string) => {
  const photos = parseInput(S)
  return photos.map(assignName(buildIndex(photos))).join('\n')
}

//
// Index building
//

type PhotoIndex = {
  [city: string]: Photo[]
}

const createIndex = (photos: Photo[]): PhotoIndex => photos.reduce(processPhoto, {})
const processPhoto = (index: PhotoIndex, photo: Photo): PhotoIndex => assignPhoto(photo.city, photo)(index)
const assignPhoto = (city: string, photo: Photo) =>
  over(
    lensProp<PhotoIndex, string>(city),
    append(photo)
  )

const sortIndex: (index: PhotoIndex) => PhotoIndex = mapObjIndexed(sortBy(prop('timestamp')))

const buildIndex = pipe(createIndex, sortIndex)

const assignName = (index: PhotoIndex) => (photo: Photo) =>
    formatPhoto(photo, getPhotoNumber(index, photo))

const formatPhoto = (photo: Photo, n: string) => `${photo.city}${n}.${photo.extension}`
const getPhotoNumber = (index: PhotoIndex, photo: Photo) =>
    padding(index[photo.city].length, index[photo.city].indexOf(photo) + 1)
export const padding = (totalAmount: number, number: number) =>
    `${number}`.padStart(`${totalAmount}`.length, '0')

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
