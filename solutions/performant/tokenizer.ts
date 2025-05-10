import {ProcessingState} from "./performant-solution-types";

export class Tokenizer {
  S: string
  state: ProcessingState

  constructor(S: string) {
    this.S = S
    this.state = {
      lastTokenStart: 0,
      currentLineTokens: [],

      photos: [],

      cities: {},
    }
  }

  onNewLine(i: number) {
    this.onTokenSeparator(i)
    const [name, extension, city, timestamp] = this.state.currentLineTokens
    const photo = {
      name,
      extension,
      city,
      timestamp,
      endPosition: i
    }
    this.state.photos.push(photo)
    if (!this.state.cities[city]) {
      this.state.cities[city] = []
    }
    this.state.cities[city].push(photo)
    this.state.currentLineTokens = []
    this.state.lastTokenStart = i
  }

  onTokenSeparator(i: number) {
    this.state.currentLineTokens.push(this.S.substring(this.state.lastTokenStart, i).trim())
    this.state.lastTokenStart = i + 1
  }

  onEnd() {
    this.onNewLine(this.S.length)
  }
}

export const parseState = (S: string) => {

  const tokenizer = new Tokenizer(S)

  for (let i = 0; i < S.length; i++) {
    const character = S[i]

    if (character === '\n') {
      tokenizer.onNewLine(i)
    }
    else if (character === ',' || character === '.') {
      tokenizer.onTokenSeparator(i)
    }
  }

  // last item
  tokenizer.onEnd()

  return tokenizer.state
}

export const tokenize = (S: string) => parseState(S).photos