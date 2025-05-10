import {solution} from "./solution";

describe('photo-helper', () => {

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

    })

  })

})