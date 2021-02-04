import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Model'
import { QueryString } from 'Contracts/request'

export class QueryStringSearchService {
  constructor(public queryString: QueryString) {}

  public handler(
    query: ModelQueryBuilderContract<any>,
    queryString: QueryString = this.queryString
  ) {
    query.select(queryString.fields)

    if (queryString.includes) {
      for (const column of Object.keys(queryString.includes)) {
        query.preload(column, (query) => {
          if (queryString.includes) {
            return this.handler(query, queryString.includes[column])
          }
        })
      }
    }

    if (queryString.sort) {
      for (const column of Object.keys(queryString.sort)) {
        query.orderBy(column, queryString.sort[column])
      }
    }

    if (queryString.limit) {
      query.limit(queryString.limit)
    }

    if (queryString.offset) {
      query.offset(queryString.offset)
    }

    if (queryString.endsWith) {
      for (const column of Object.keys(queryString.endsWith)) {
        query.orWhereRaw(`${column} LIKE '%${queryString.endsWith[column]}'`)
      }
    }

    if (queryString.startsWith) {
      for (const column of Object.keys(queryString.startsWith)) {
        query.orWhereRaw(`${column} LIKE '${queryString.startsWith[column]}%'`)
      }
    }

    if (queryString.like) {
      for (const column of Object.keys(queryString.like)) {
        query.orWhereRaw(`${column} LIKE '%${queryString.like[column]}%'`)
      }
    }

    if (queryString.eq) {
      for (const column of Object.keys(queryString.eq)) {
        query.where(column, '=', queryString.eq[column])
      }
    }

    if (queryString.gt) {
      for (const column of Object.keys(queryString.gt)) {
        query.where(column, '>', queryString.gt[column])
      }
    }

    if (queryString.gte) {
      for (const column of Object.keys(queryString.gte)) {
        query.where(column, '>=', queryString.gte[column])
      }
    }

    if (queryString.lt) {
      for (const column of Object.keys(queryString.lt)) {
        query.where(column, '<', queryString.lt[column])
      }
    }

    if (queryString.lte) {
      for (const column of Object.keys(queryString.lte)) {
        query.where(column, '<=', queryString.lte[column])
      }
    }

    if (queryString.in) {
      for (const column of Object.keys(queryString.in)) {
        query.whereIn(column, queryString.in[column])
      }
    }

    if (queryString.notIn) {
      for (const column of Object.keys(queryString.notIn)) {
        query.whereNotIn(column, queryString.notIn[column])
      }
    }

    if (queryString.isNotNull) {
      for (const column of Object.values(queryString.isNotNull)) {
        query.whereNotNull(column)
      }
    }

    if (queryString.between) {
      for (const column of Object.keys(queryString.between)) {
        query.whereBetween(column, queryString.between[column])
      }
    }

    if (queryString.notBetween) {
      for (const column of Object.keys(queryString.notBetween)) {
        query.whereNotBetween(column, queryString.notBetween[column])
      }
    }

    return query
  }
}
