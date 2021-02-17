import debug from "debug";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";

const debugLog: debug.IDebugger = debug("server:user-dao");

class UserDao {
  private static instance: UserDao;

  static getInstance(): UserDao {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao();
    }
    return UserDao.instance;
  }

  async create(user: User) {
    const userRepository = getRepository(User);
    userRepository.create();
  }
}

export default UserDao.getInstance();
