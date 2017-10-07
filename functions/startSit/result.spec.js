const result = require('./result')
const randomize = require('./randomize')

describe('result.constructResult', () => {
  it('should call randomize.response with appropriate arguments', () => {
      const mockRandomizeResponse = jest.fn()
      randomize.response = mockRandomizeResponse
      mockRandomizeResponse.mockReturnValue('Mock return')

      expect(mockRandomizeResponse).not.toHaveBeenCalled()
      const projections = [
        {
          name: 'Foo',
          projection: 3,
        },
        {
          name: 'Bar',
          projection: 7,
        },
      ]
      const res = result.constructResult(projections)
      expect(mockRandomizeResponse).toHaveBeenCalledWith({
        betterPlayer: 'Bar',
        worsePlayer: 'Foo',
        coefficient: 3/7,
      })
      expect(res).toBe('Mock return')
  })

  it('should handle projections of 0', () => {
      const mockRandomizeResponse = jest.fn()
      randomize.response = mockRandomizeResponse

      const projections = [
        {
          name: 'Foo',
          projection: 0,
        },
        {
          name: 'Bar',
          projection: 0,
        },
      ]
      const res = result.constructResult(projections)
      expect(mockRandomizeResponse).not.toHaveBeenCalled()
      expect(res).toBeTruthy()
  })

  it('should handle a tie', () => {
      const mockRandomizeResponse = jest.fn()
      randomize.response = mockRandomizeResponse

      const projections = [
        {
          name: 'Foo',
          projection: 4,
        },
        {
          name: 'Bar',
          projection: 4,
        },
      ]
      const res = result.constructResult(projections)
      expect(mockRandomizeResponse).not.toHaveBeenCalled()
      expect(res).toBeTruthy()
  })
})