import { Aeco, Company, Rewards, User } from './types'

export interface TableContent {
  headers: string[]
  data: User[] | Company[] | Aeco[] | Rewards[] | Record<string, any>[]
}

export interface ColumnType {
  column: string
  type?: 'chip' | 'text' | 'number'
}
