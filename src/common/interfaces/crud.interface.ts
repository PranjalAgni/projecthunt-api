export interface CRUD<T> {
  list: (limit: number, page: number) => Promise<T[]>;
  create: (resource: T) => Promise<T>;
  updateById: (resourceId: number) => Promise<T>;
  readById: (resourceId: number) => Promise<T>;
  deleteById: (resourceId: number) => Promise<T>;
  patchById: (resourceId: number) => Promise<T>;
}
