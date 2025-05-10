import {values} from "ramda";

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
  const index = buildIndex(photos)

  return photos.map(assignName(index)).join('\n')
}

//
// Index building
//

type PhotoIndex = {
  [city: string]: Photo[]
}

const buildIndex = (photos: Photo[]): PhotoIndex => sortIndex(photos.reduce(processPhoto, {}))
const processPhoto = (index: PhotoIndex, photo: Photo): PhotoIndex =>
  assignPhoto(index, photo.city, photo)
const assignPhoto = (index: PhotoIndex, city: string, photo: Photo) => {
  const photos = index[city] || []
  photos.push(photo)
  index[city] = photos
  return index
}
const sortIndex = (index: PhotoIndex) => {
  values(index).forEach(photos => photos.sort())
  return index
}

const assignName = (index: PhotoIndex) => (photo: Photo) =>
    formatPhoto(photo, getNumber(index, photo))

const formatPhoto = (photo: Photo, n: number) => `${photo.city}${n}.${photo.extension}`
const getNumber = (index: PhotoIndex, photo: Photo) =>
    index[photo.city].indexOf(photo) + 1

//
// Parsing
//

const parseInput = (S: string) => parseLines(S).map(parseLine)
const parseLines = (S: string) => S.length === 0 ? [] : S.split('\n').map(s => s.trim())
const parseLine = (line: string): Photo => {
  const [n, city, timestamp] = line.split(',').map(t => t.trim())
  const [name, extension] = n.split('.')
  return {
    name,
    extension,
    city,
    timestamp
  }
}