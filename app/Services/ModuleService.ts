import { LucidModel, ModelAttributes } from '@ioc:Adonis/Lucid/Model'
import Database from '@ioc:Adonis/Lucid/Database'
import { QueryStringSearchService } from './QueryStringSearchService'
import {
  DatabaseQueryBuilderContract,
  InsertQueryBuilderContract,
} from '@ioc:Adonis/Lucid/DatabaseQueryBuilder'

interface RelationshipMap {
  key: string
  value: any
}

export class ModuleService<T extends LucidModel> {
  public from: DatabaseQueryBuilderContract<any>
  public table: InsertQueryBuilderContract<any>
  public columns?: any

  constructor(public model: T) {
    console.log(this.model.table)
    this.from = Database.from(this.model.table)
    this.table = Database.table(this.model.table)
  }

  public async fetchColumns() {
    if (!this.columns) {
      this.columns = await Database.rawQuery(`SHOW COLUMNS FROM ${this.model.table}`).exec()
    }
    return this
  }

  public async fetchAdditionals(input: Partial<ModelAttributes<InstanceType<T>>>) {
    await this.fetchColumns()
    const data: Partial<ModelAttributes<InstanceType<T>>> = {}
    const additionals = {}
    const relationships: RelationshipMap[] = []
    const columns = this.columns?.[0].map((column) => column.Field) || []

    for (const inputKey of Object.keys(input)) {
      if (columns.includes(inputKey)) {
        data[inputKey] = input[inputKey]
      } else {
        additionals[inputKey] = input[inputKey]
      }
    }
    for (const additionalKey of Object.keys(additionals)) {
      if (this.model.$hasRelation(additionalKey)) {
        relationships.push({
          key: additionalKey,
          value: additionals[additionalKey],
        })
      }
    }

    return {
      data,
      additionals,
      relationships,
    }
  }

  public applyQuery(query: QueryStringSearchService) {
    return query.handler(this.model.query())
  }
}
