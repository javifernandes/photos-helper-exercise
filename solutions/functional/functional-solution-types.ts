
type Photo = {
  name: string;
  extension: string;
  city: string;
  timestamp: string;
}

type PhotoIndex = {
  [city: string]: Photo[]
}