import { QueryCommon, QueryCommonDto } from '../interfaces/QueryCommon';

export class QueryHelper {
  static getQueryCommon(query: QueryCommonDto): QueryCommon {
    console.log(query);
    const {
      page = 1,
      pageSize = 10,
      orderBy = 'createdAt',
      order = 'DESC',
    } = query;
    const offset = (page - 1) * pageSize;

    return {
      order: [[orderBy, order]],
      limit: pageSize,
      offset,
    };
  }

  static getPageInfo(
    page,
    pageSize,
    total,
  ): {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    total: number;
  } {
    const totalPages = Math.ceil(total / pageSize);
    const currentPage = page > totalPages ? totalPages : page;
    return {
      totalPages,
      currentPage,
      pageSize,
      total,
    };
  }
}
