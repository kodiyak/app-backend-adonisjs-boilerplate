import { StrictValues } from '@ioc:Adonis/Lucid/DatabaseQueryBuilder'
import { QueryStringSearchService } from 'App/Services/QueryStringSearchService'

export interface QueryString {
  fields: string[]
  limit?: number
  offset?: number
  sort?: {
    [key: string]: 'desc' | 'asc'
  }
  includes?: {
    [key: string]: QueryString
  }
  like?: {
    [key: string]: StrictValues
  }
  eq?: {
    [key: string]: StrictValues
  }
  lt?: {
    [key: string]: StrictValues
  }
  gt?: {
    [key: string]: StrictValues
  }
  lte?: {
    [key: string]: StrictValues
  }
  gte?: {
    [key: string]: StrictValues
  }
  startsWith?: {
    [key: string]: StrictValues
  }
  endsWith?: {
    [key: string]: StrictValues
  }
  in?: {
    [key: string]: StrictValues[]
  }
  notIn?: {
    [key: string]: StrictValues[]
  }
  isNull?: string[]
  isNotNull?: string[]
  between?: {
    [key: string]: [StrictValues, StrictValues]
  }
  notBetween?: {
    [key: string]: [StrictValues, StrictValues]
  }
}

declare module '@ioc:Adonis/Core/Request' {
  interface RequestContract {
    query: QueryStringSearchService
  }
}
