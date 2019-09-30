import { parseCommitMessage } from 'commitlint-jira-utils'
import { COMMIT_MESSAGE_SEPARATOR } from 'commitlint-jira-utils/src/commitlintJiraConstants'
import { TRuleResolver } from '../../@types'

const jiraTaskIdEmptyRuleResolver: TRuleResolver = parsed => {
  const rawCommitMessage = parsed.raw
  if (!rawCommitMessage) return [false, 'Commit message should not be empty']

  const commitMessage = parseCommitMessage(rawCommitMessage)

  const isRuleValid = commitMessage.commitTaskIds.length > 0
  return [
    isRuleValid,
    `the commit message must provide minimum one task id followed by ${COMMIT_MESSAGE_SEPARATOR} if task not have an id use a conventional task id e.g: IB-0000${COMMIT_MESSAGE_SEPARATOR}`,
  ]
}
export default jiraTaskIdEmptyRuleResolver
