import debug from "debug";
import { Project } from "../../entities/Project";
import { getConnection, getManager, getRepository } from "typeorm";
import { User } from "../../entities/User";
import { CreateUserDto } from "../dtos/user.dto";

const debugLog: debug.IDebugger = debug("server:user-dao");

class UserDao {
  private static instance: UserDao;

  static getInstance(): UserDao {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao();
    }
    return UserDao.instance;
  }

  async create(user: CreateUserDto) {
    return await getRepository(User).create(user).save();
  }

  async findOne(userId: number) {
    return await getRepository(User).findOne({
      userId
    });
  }

  async getUsersOrderedByPopularity() {
    return await getConnection().query(`
    SELECT mpu."userId" FROM public.map_project_user as mpu INNER JOIN (SELECT v."project", SUM(v.value) as upvotes FROM public.vote as v WHERE v."value" = 1 GROUP BY v."project") as v ON v."project" = mpu."projectId" ORDER BY v."upvotes" DESC;
    `);
  }

  async getUsersOrderedByRecentProject(page: number, limit: number) {
    return await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.projects", "project")
      .orderBy("project.createdAt", "DESC")
      .getMany();
  }
}

export default UserDao.getInstance();
