import parseCommitMessage from '../parseCommitMessage'

describe('commitlintPluginJiraTests', () => {
  const testCommitMessages = {
    singleScope: 'IB-1111: test commit message',
    multyScope: 'IB-1112, IB-21: test commit message',
    singleScopeWipTask: '[WIP]IB-1113: test commit message',
    multyScopeWipTask: '[WIP]IB-1114, IB-21: test commit message',
    emptyTaskIds: ': my commit message',
    missingSeparator: 'IB-1115 my commit message',
  }

  it('should return correct commitTaskIds', () => {
    expect(
      parseCommitMessage(testCommitMessages.singleScope).commitTaskIds,
    ).toEqual(['IB-1111'])
    expect(
      parseCommitMessage(testCommitMessages.singleScopeWipTask).commitTaskIds,
    ).toEqual(['IB-1113'])
    expect(
      parseCommitMessage(testCommitMessages.multyScope).commitTaskIds,
    ).toEqual(['IB-1112', 'IB-21'])
    expect(
      parseCommitMessage(testCommitMessages.multyScopeWipTask).commitTaskIds,
    ).toEqual(['IB-1114', 'IB-21'])
    expect(
      parseCommitMessage(testCommitMessages.missingSeparator).commitTaskIds,
    ).toEqual([])
  })

  it('should return correct commitFooter', () => {
    expect(
      parseCommitMessage(testCommitMessages.singleScope).commitFooter,
    ).toEqual('test commit message')
    expect(
      parseCommitMessage(testCommitMessages.missingSeparator).commitFooter,
    ).toEqual('IB-1115 my commit message')
  })

  it('should return correct commitStatus', () => {
    expect(
      parseCommitMessage(testCommitMessages.singleScopeWipTask).commitStatus,
    ).toEqual('WIP')
    expect(
      parseCommitMessage(testCommitMessages.multyScopeWipTask).commitStatus,
    ).toEqual('WIP')
  })

  it('should return empty array of taskIds', () => {
    expect(
      parseCommitMessage(testCommitMessages.emptyTaskIds).commitTaskIds,
    ).toEqual([])
    expect(
      parseCommitMessage(testCommitMessages.missingSeparator).commitTaskIds,
    ).toEqual([])
  })
})
