export interface CRUD {
  list: (limit: number, page: number) => Promise<unknown>;
  create: (resource: unknown) => Promise<unknown>;
  updateById: (resourceId: number) => Promise<unknown>;
  readById: (resourceId: number) => Promise<unknown>;
  deleteById: (resourceId: number) => Promise<unknown>;
  patchById: (resourceId: number) => Promise<unknown>;
}
