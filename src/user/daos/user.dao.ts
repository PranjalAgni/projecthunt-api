import debug from "debug";
import { getReasonPhrase } from "http-status-codes";
import { Vote } from "../../entities/Vote";
import { getConnection, getRepository } from "typeorm";
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

  async getUsersOrderedByPopularity(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const userByPopularityQueryString = `
    SELECT u."userId", u."username", u."avatar", u."bio", u."linkedin", u."twitter", u."youtube", u."createdAt", u."deletedAt", u."updatedAt" FROM public."user" as u INNER JOIN public.map_project_user as mpu ON u."userId" = mpu."userId" INNER JOIN (SELECT v."project", SUM(v.value) as upvotes FROM public.vote as v WHERE v."value" = 1 GROUP BY v."project") as v ON v."project" = mpu."projectId" ORDER BY v."upvotes" DESC OFFSET ${offset} LIMIT ${limit};`;

    return await getConnection().query(userByPopularityQueryString);
  }

  async getUsersOrderedByRecentProject(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.projects", "project")
      .orderBy("project.createdAt", "DESC")
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async getVotesByUserId(userId: number) {
    return await getRepository(Vote)
      .createQueryBuilder("vote")
      .where("vote.users.userId = :userId", { userId })
      .getMany();
  }
}

export default UserDao.getInstance();
