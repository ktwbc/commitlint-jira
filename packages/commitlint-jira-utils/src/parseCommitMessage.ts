import { TParseCommitMessage } from '../@types'
import {
  COMMIT_MESSAGE_SEPARATOR,
  COMMIT_TASK_IDS_SEPARATOR,
  COMMIT_TASK_STATUS_PATTERN,
  COMMIT_STATUS_SEPARATORS,
} from './commitlintJiraConstants'

const parseCommitMessage: TParseCommitMessage = commitMessage => {
  const [rawCommitHeader, commitFooter] =
    commitMessage.indexOf(COMMIT_MESSAGE_SEPARATOR) <= -1
      ? ['', commitMessage]
      : commitMessage.split(COMMIT_MESSAGE_SEPARATOR)
  const rawCommitStatus = rawCommitHeader.split(COMMIT_STATUS_SEPARATORS.end)
  const commitStatus = rawCommitStatus.length
    ? rawCommitStatus[0].replace(COMMIT_STATUS_SEPARATORS.start, '')
    : ''
  const commitHeader = rawCommitHeader.replace(COMMIT_TASK_STATUS_PATTERN, '')

  return {
    commitTaskIds: commitHeader
      .split(COMMIT_TASK_IDS_SEPARATOR)
      .map(taskId => taskId.trim())
      .filter(taskId => taskId),
    commitFooter: commitFooter ? commitFooter.trim() : '',
    commitHeader: commitHeader ? commitHeader.trim() : '',
    commitStatus: commitStatus ? commitStatus.trim() : '',
  }
}

export default parseCommitMessage
