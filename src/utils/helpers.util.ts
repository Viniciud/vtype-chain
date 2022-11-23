import { BinaryLike, createHash } from 'crypto'

export function hash(data: BinaryLike): string {
  return createHash('sha256').update(JSON.stringify(data)).digest('hex')
}

export function checkedHash({ hash = '', difficulty = 4, prefix = '0' }) {
  const check: string = prefix.repeat(difficulty)
  return hash.startsWith(check)
}
