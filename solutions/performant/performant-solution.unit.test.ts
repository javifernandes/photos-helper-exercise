import {parseState} from "./tokenizer";

describe('performant solution - unitary tests', () => {

  describe('parseState()', () => {

    it('should parse a single line', () => {
      const input = 'a.txt, Buenos Aires, 2020-01-01 01:01:01'
      expect(parseState(input))
          .toEqual({
            currentLineTokens: [],
            lastTokenStart: input.length,
            photos: [
              {
                name: 'a',
                extension: 'txt',
                city: 'Buenos Aires',
                timestamp: '2020-01-01 01:01:01',
                endPosition: 40
              }
            ],
            cities: {
              'Buenos Aires': [
                {
                  name: 'a',
                  extension: 'txt',
                  city: 'Buenos Aires',
                  timestamp: '2020-01-01 01:01:01',
                  endPosition: 40
                }
              ]
            }
          })
    })

    it('should parse 2 lines', () => {
      const input = 'a.txt, Buenos Aires, 2020-01-01 01:01:01\nb.txt, Buenos Aires, 2020-01-01 01:01:01'
      expect(parseState(input))
          .toEqual({
            currentLineTokens: [],
            lastTokenStart: input.length,
            photos: [
              {
                name: 'a',
                extension: 'txt',
                city: 'Buenos Aires',
                timestamp: '2020-01-01 01:01:01',
                endPosition: 40
              },
              {
                name: 'b',
                extension: 'txt',
                city: 'Buenos Aires',
                timestamp: '2020-01-01 01:01:01',
                endPosition: 81
              }
            ],
            cities: {
              'Buenos Aires': [
                {
                  name: 'a',
                  extension: 'txt',
                  city: 'Buenos Aires',
                  timestamp: '2020-01-01 01:01:01',
                  endPosition: 40
                },
                {
                  name: 'b',
                  extension: 'txt',
                  city: 'Buenos Aires',
                  timestamp: '2020-01-01 01:01:01',
                  endPosition: 81
                }
              ]
            }
          })
    })

  })

})