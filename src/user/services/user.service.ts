import { User } from "../../entities/User";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto, ReadUserDto } from "../dtos/user.dto";
import userDao from "../daos/user.dao";

class UserService implements CRUD {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async create(userData: CreateUserDto): Promise<User> {
    return await userDao.create(userData);
  }

  async getAllUsers(userData: ReadUserDto) {
    let usersList: Array<User> = await userDao.getUsersOrderedByRecentProject(
      userData.page,
      userData.limit
    );

    return usersList;
  }

  list: (limit: number, page: number) => Promise<unknown>;
  updateById: (resourceId: number) => Promise<unknown>;
  readById: (resourceId: number) => Promise<unknown>;
  deleteById: (resourceId: number) => Promise<unknown>;
  patchById: (resourceId: number) => Promise<unknown>;
}

export default UserService.getInstance();
