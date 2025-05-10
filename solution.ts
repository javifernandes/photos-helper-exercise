
/**
 *
 */
export const solution = (S: string) =>
    parseLines(S)
        .map(line => formatPhoto(parseLine(line)))
        .join('\n')

const formatPhoto = (photo: Photo) => `${photo.city}1.${photo.extension}`


type Photo = {
  name: string;
  extension: string;
  city: string;
  timestamp: string;
}

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