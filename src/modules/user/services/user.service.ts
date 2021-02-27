import { CRUD } from "../../common/interfaces/crud.interface";
import { User } from "../../../entities/User";
import userDao from "../daos/user.dao";
import { CreateUserDto, ReadUserDto } from "../dtos/user.dto";

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
    let usersList: Array<User> | null = null;
    if (userData.sortBy === "popular") {
      usersList = await userDao.getUsersOrderedByPopularity(
        userData.page,
        userData.limit
      );
    } else {
      usersList = await userDao.getUsersOrderedByRecentProject(
        userData.page,
        userData.limit
      );
    }

    return usersList;
  }

  async findUserById(userId: number) {
    return await userDao.findOne(userId);
  }

  async getVotesByUserId(userId: number) {
    return await userDao.getVotesByUserId(userId);
  }

  async getCommentsByUserId(userId: number) {
    return await userDao.getCommentsByUserId(userId);
  }

  async getHashTags() {
    return await userDao.getHashTags();
  }

  async getUserBySessionId(sessionId: string): Promise<User> {
    const authToken = await userDao.getUserBySessionId(sessionId);
    return authToken.user;
  }

  async createUserSession(user: User): Promise<string> {
    const authToken = await userDao.createUserAuthToken(user);
    return authToken.sessionId;
  }

  list: (limit: number, page: number) => Promise<unknown>;
  updateById: (resourceId: number) => Promise<unknown>;
  readById: (resourceId: number) => Promise<unknown>;
  deleteById: (resourceId: number) => Promise<unknown>;
  patchById: (resourceId: number) => Promise<unknown>;
}

export default UserService.getInstance();
