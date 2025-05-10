import {ProcessingState} from "./performant-solution-types";

/**
 * Acts like a builder of the ProcessingState during the parsing of the input string (iteration).
 * Allows to split the code for clarity between iterating and the actual processing of each element.
 * Makes the iteration in parse() a higher abstraction level encapsulating here the tokenization.
 *
 * Because of performance reasons it already indexes/group photos by city when it parses one.
 * So we parse and index at the same time.
 */
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
    // store in photo
    this.state.photos.push(photo)
    // store in cities index
    if (!this.state.cities[city]) { this.state.cities[city] = [] }
    this.state.cities[city].push(photo)

    // update tokenize state for the next line
    this.state.currentLineTokens = []
    this.state.lastTokenStart = i
  }

  onTokenSeparator(i: number) {
    // close the 'ongoing' token and store it in our memory and prepare for next token.
    this.state.currentLineTokens.push(this.S.substring(this.state.lastTokenStart, i).trim())
    this.state.lastTokenStart = i + 1
  }

  onEnd() {
    // process the last one (state) in memory (otherwise we would lose the last line)
    this.onNewLine(this.S.length)
  }
}

