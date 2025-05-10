import { parseState } from './performant-solution'

describe('performant solution - unitary tests', () => {

  describe('parseState()', () => {

    it('should work', () => {
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
                timestamp: '2020-01-01 01:01:01'
              }
            ]
          })
    })

  })

})