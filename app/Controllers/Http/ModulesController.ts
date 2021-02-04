import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModuleService } from 'App/Services/ModuleService'
import Hash from '@ioc:Adonis/Core/Hash'

export default class ModulesController {
  public async getModule(ctx: HttpContextContract) {
    const model = await import(`../../Models/${ctx.params.module}`)
    const m = new ModuleService(model.default)
    return m
  }

  public async index(ctx: HttpContextContract) {
    const m = await this.getModule(ctx)
    return await m.applyQuery(ctx.request.query)
  }

  public async store(ctx: HttpContextContract) {
    const m = await this.getModule(ctx)
    const { data, relationships } = await m.fetchAdditionals(ctx.request.all())
    // @ts-ignore
    if (data.password) {
      // @ts-ignore
      data.password = await Hash.make(data.password)
    }
    const [rowId] = await m.table.insert(data)

    const row = await m.model.query().where('id', rowId).firstOrFail()

    for (const relationship of relationships) {
      await row.related(relationship.key).attach(relationship.value)
      await row.preload(relationship.key)
    }

    return [row]
  }

  public async update(ctx: HttpContextContract) {
    const m = await this.getModule(ctx)
    const { data } = await m.fetchAdditionals(ctx.request.all())
    const { id } = ctx.params
    await m.from.where('id', id).update(data)
    ctx.request.query.queryString.eq = {
      ...ctx.request.query.queryString.eq,
      id,
    }
    ctx.request.query.queryString.limit = 1

    return await m.applyQuery(ctx.request.query)
  }

  public async destroy(ctx: HttpContextContract) {
    const m = await this.getModule(ctx)
    const { id } = ctx.params
    const data = await m.model.query().where('id', id).firstOrFail()
    await data.delete()

    return [data]
  }

  public async related(ctx: HttpContextContract) {
    const { related, id, method } = ctx.params
    const input = ctx.request.all()
    const m = await this.getModule(ctx)
    const data = await m.model.query().where('id', id).firstOrFail()
    await data.related(related)[method](input.data)
    await data.preload(related)
    return data
  }
}
