import { User } from "../../entities/User";
import { CRUD } from "../../common/interfaces/crud.interface";

class UserService implements CRUD<User> {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  list: (limit: number, page: number) => Promise<User[]>;
  create: (resource: User) => Promise<User>;
  updateById: (resourceId: number) => Promise<User>;
  readById: (resourceId: number) => Promise<User>;
  deleteById: (resourceId: number) => Promise<User>;
  patchById: (resourceId: number) => Promise<User>;
}

export default UserService.getInstance();
