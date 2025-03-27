import { Company, Rewards, User } from './types'

export interface TableContent {
  headers: string[]
  data: User[] | Company[] | Rewards[]
}

export interface ColumnType {
  column: string
  type?: 'chip' | 'text' | 'number'
}
