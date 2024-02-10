const recordAt = <T>(record: Record<string, T>, key: string): T | undefined => record[key]

export default recordAt
