import {Tokenizer} from "./tokenizer";
import {ProcessingState} from "./performant-solution-types";

/**
 * Does all the parsing of the input string into our ProcessingState
 * This already indexes photos by cities.
 * No sorting yet.
 */
export const parse = (S: string): ProcessingState => {
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
  tokenizer.onEnd()
  return tokenizer.state
}