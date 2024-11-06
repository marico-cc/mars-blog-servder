export type Ordering = `DESC` | `ASC`;

export interface QueryCommonDto {
  page?: number;
  pageSize?: number;
  limit?: number;
  orderBy?: string;
  order?: Ordering;
}

export interface QueryCommon {
  order: [string, Ordering][];
  limit?: number;
  offset: number;
}
