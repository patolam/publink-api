import { Injectable } from '@nestjs/common';
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { validate as uuidValidate } from 'uuid';
import { EntityType, HistoryData, Type } from "./app.model";
import { historyQuery } from "./app.query";

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource
  ) {
  }

  async getHistory(
    {
      organizationId,
      cursorDir,
      cursorId,
      pageSize,
    }) {

    const isValidId = uuidValidate(organizationId);

    const data = await this.dataSource.query<HistoryData[]>(historyQuery({
      organizationId: isValidId ? organizationId : '',
      cursorDir,
      cursorId,
      pageSize,
    })) ?? [];

    let modifiedData = data.map(item => ({
      ...item,
      type: Object.keys(Type).find(key => Type[key] === item.type),
      entity_type: Object.keys(EntityType).find(key => EntityType[key] === item.type),
    }));

    return (cursorDir === 'prev' ? {
      data: modifiedData.reverse(),
      prev_cursor: data.at(-1)?.cursor_id,
      next_cursor: data.at(0)?.cursor_id,
    } : {
      data: modifiedData,
      prev_cursor: data.at(0)?.cursor_id,
      next_cursor: data.at(-1)?.cursor_id,
    })
  }
}
