
type IterationState = {
  lastTokenStart: number;
  currentLineTokens: string[];
  photos: any[];
}

class Tokenizer {
  S: string
  state: IterationState

  constructor(S: string) {
    this.S = S
    this.state = {
      lastTokenStart: 0,
      currentLineTokens: [],

      photos: []
    }
  }

  onNewLine(i: number) {
    const [name, extension, city, timestamp] = this.state.currentLineTokens
    this.state.photos.push({
      name,
      extension,
      city,
      timestamp
    })
    this.state.currentLineTokens = []
    this.state.lastTokenStart = i
  }

  onTokenSeparator(i: number) {
    this.state.currentLineTokens.push(this.S.substring(this.state.lastTokenStart, i).trim())
    this.state.lastTokenStart = i + 1
  }

  onEnd() {
    this.onTokenSeparator(this.S.length)
    this.onNewLine(this.S.length)
  }
}

export const solution = (S: string) => {
  if (S.length === 0) return ''
  const state = parseState(S)
  return S
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