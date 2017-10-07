const randomize = require('./randomize')
const randomizeResponse = require('./randomize/response')
const randomizeSmallTalk = require('./randomize/smallTalk')

describe('randomize.response', () => {
  it('should add a bendection at the end', () => {
    const mockBenediction = jest.fn()
    randomizeSmallTalk.benediction = mockBenediction
    mockBenediction.mockReturnValue('Good luck!')

    expect(mockBenediction).not.toHaveBeenCalled()
    const resp = randomize.response({
      betterPlayer: 'Foo',
      worsePlayer: 'Bar',
      coefficient: 1,
    })
    expect(mockBenediction).toHaveBeenCalledTimes(1)
    expect(resp).toMatch(/Good luck!/)
    jest.resetAllMocks()
  })

  it(`should include the players' names, no matter the coefficient`, () => {
    [.2, .6, .85, .98].forEach(coefficient => {
      const resp = randomize.response({
        betterPlayer: 'Foo',
        worsePlayer: 'Bar',
        coefficient,
      })
      expect(resp).toMatch(/Foo/)
      expect(resp).toMatch(/Bar/)
    })
  })

  it('should call blowOut if coefficient is less than .5', () => {
    const mockBlowOut = jest.fn()
    randomizeResponse.blowOut = mockBlowOut
    mockBlowOut.mockReturnValue('Blow out!')

    expect(mockBlowOut).not.toHaveBeenCalled()
    const resp = randomize.response({
      betterPlayer: 'Foo',
      worsePlayer: 'Bar',
      coefficient: .23,
    })
    expect(mockBlowOut).toHaveBeenCalledWith('Foo', 'Bar')
    expect(resp).toMatch(/Blow out!/)
  })

  it('should call recommend if coefficient is .5 to .8', () => {
    const mockRecommend = jest.fn()
    randomizeResponse.recommend = mockRecommend
    mockRecommend.mockReturnValue('Recommend!')

    expect(mockRecommend).not.toHaveBeenCalled()
    const resp = randomize.response({
      betterPlayer: 'Foo',
      worsePlayer: 'Bar',
      coefficient: .64,
    })
    expect(mockRecommend).toHaveBeenCalledWith('Foo', 'Bar')
    expect(resp).toMatch(/Recommend!/)
  })

  it('should call suggest if coefficient is .8 to .95', () => {
    const mockSuggest = jest.fn()
    randomizeResponse.suggest = mockSuggest
    mockSuggest.mockReturnValue('Suggest!')

    expect(mockSuggest).not.toHaveBeenCalled()
    const resp = randomize.response({
      betterPlayer: 'Foo',
      worsePlayer: 'Bar',
      coefficient: .89,
    })
    expect(mockSuggest).toHaveBeenCalledWith('Foo', 'Bar')
    expect(resp).toMatch(/Suggest!/)
  })

  it('should call slight if coefficient is .95 to 1', () => {
    const mockSlight = jest.fn()
    randomizeResponse.slight = mockSlight
    mockSlight.mockReturnValue('Slight!')

    expect(mockSlight).not.toHaveBeenCalled()
    const resp = randomize.response({
      betterPlayer: 'Foo',
      worsePlayer: 'Bar',
      coefficient: .951,
    })
    expect(mockSlight).toHaveBeenCalledWith('Foo', 'Bar')
    expect(resp).toMatch(/Slight!/)
  })
})