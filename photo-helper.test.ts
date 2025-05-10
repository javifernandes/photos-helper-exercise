import {solution as functionalSolution } from "./solution";
import {solution as performantSolution } from './solutions/performant/performant-solution'

/**
 * A single set of tests that apply for both solutions
 */
describe.each([
    ['functional', functionalSolution],
    ['performant', performantSolution]
])('photo-helper - SOLUTION [ %s ]', (name, solution) => {

  describe('solution', () => {

    it("should return empty for empty string", () => {
      expect(solution('')).toEqual('')
    })

    describe('1 photo', () => {

      it(`should return CITY_NR.ext}`, () => {
        expect(solution('photo.png, Buenos Aires, 2025-05-10 10:26:00'))
            .toEqual('Buenos Aires1.png')
      })

    })

    describe('2 photos', () => {

      describe('different cities', () => {

        it(`should return CITY_NR.ext}`, () => {
          expect(solution('photo.png, Buenos Aires, 2025-05-10 10:26:00\nanother.jpg, London, 2023-05-10 10:26:00'))
              .toEqual('Buenos Aires1.png\nLondon1.jpg')
        })

      })

      describe('same city', () => {

        describe('already sorted', () => {

          it(`should return CITY_NR.ext}`, () => {
            expect(solution('photo.png, Buenos Aires, 2020-01-01 01:01:01\nanother.jpg, Buenos Aires, 2021-01-01 01:01:01'))
                .toEqual('Buenos Aires1.png\nBuenos Aires2.jpg')
          })

        })

      })

    })

    describe('> 9 photos', () => {

      describe('same city', () => {

          it(`should return CITY_NR.ext}`, () => {
            const input = [
              'photo3.png, Buenos Aires, 2023-01-01 01:01:01',
              'photo2.png, Buenos Aires, 2022-01-01 01:01:01',
              'photo10.png, Buenos Aires, 2030-01-01 01:01:01',
              'photo8.png, Buenos Aires, 2028-01-01 01:01:01',
              'photo5.png, Buenos Aires, 2025-01-01 01:01:01',
              'photo7.png, Buenos Aires, 2027-01-01 01:01:01',
              'photo9.png, Buenos Aires, 2029-01-01 01:01:01',
              'photo6.png, Buenos Aires, 2026-01-01 01:01:01',
              'photo1.png, Buenos Aires, 2021-01-01 01:01:01',
              'photo4.png, Buenos Aires, 2024-01-01 01:01:01',
            ]
            expect(solution(input.join('\n')))
                .toEqual([
                  'Buenos Aires03.png',
                  'Buenos Aires02.png',
                  'Buenos Aires10.png',
                  'Buenos Aires08.png',
                  'Buenos Aires05.png',
                  'Buenos Aires07.png',
                  'Buenos Aires09.png',
                  'Buenos Aires06.png',
                  'Buenos Aires01.png',
                  'Buenos Aires04.png',
                ].join('\n'))
          })

      })

    })

  })

})
