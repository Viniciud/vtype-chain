import sha256 from 'crypto-js/sha256';

export function hash(data: any): string {
  let hash = sha256(JSON.stringify(data)).toString()
  return hash
}

export function checkedHash({ hash = '', difficulty = 4, prefix = '0' }): boolean {
  const check: string = prefix.repeat(difficulty)
  return hash.startsWith(check)
}
