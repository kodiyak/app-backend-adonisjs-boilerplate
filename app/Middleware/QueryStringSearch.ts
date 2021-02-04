import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { QueryStringSearchService } from 'App/Services/QueryStringSearchService'

export default class QueryStringSearch {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const {
      fields = ['*'],
      sort,
      includes,
      isNotNull,
      limit,
      offset,
      isNull,
      endsWith,
      eq,
      gt,
      gte,
      like,
      lt,
      lte,
      in: whereIn,
      startsWith,
      notIn,
      between,
      notBetween,
      ...rest
    } = request.all()

    request.updateBody(rest)

    const traitItem = (field: any) => {
      if (typeof field === 'string') {
        return JSON.parse(field)
      }
      return field
    }

    const query = new QueryStringSearchService({
      fields: traitItem(fields),
      includes: traitItem(includes),
      sort: traitItem(sort),
      endsWith: traitItem(endsWith),
      gt: traitItem(gt),
      eq: traitItem(eq),
      gte: traitItem(gte),
      like: traitItem(like),
      isNotNull: traitItem(isNotNull),
      lt: traitItem(lt),
      lte: traitItem(lte),
      startsWith: traitItem(startsWith),
      in: traitItem(whereIn),
      notIn: traitItem(notIn),
      between: traitItem(between),
      notBetween: traitItem(notBetween),
      limit: traitItem(limit),
      isNull: traitItem(isNull),
      offset: traitItem(offset),
    })

    request.query = query

    await next()
  }
}
