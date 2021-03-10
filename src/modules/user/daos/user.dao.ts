import { getConnection, getRepository } from "typeorm";
import { AuthToken } from "../../../entities/AuthToken";
import { Comment } from "../../../entities/Comment";
import { HashTag } from "../../../entities/HashTag";
import { Image } from "../../../entities/Image";
import { User } from "../../../entities/User";
import { UserGithub } from "../../../entities/UserGithub";
import { Vote } from "../../../entities/Vote";

// const debugLog: debug.IDebugger = debug("server:user-dao");

class UserDao {
  private static instance: UserDao;

  static getInstance(): UserDao {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao();
    }
    return UserDao.instance;
  }

  async create(user: User) {
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
      .leftJoin("vote.user", "user")
      .where("user.userId = :userId", { userId })
      .getMany();
  }

  async getCommentsByUserId(userId: number) {
    return await getRepository(Comment)
      .createQueryBuilder("comment")
      .select(['comment."commentId"', "comment.title", "comment.body"])
      .where('comment."user" = :userId', { userId })
      .getMany();
  }

  async getHashTags() {
    return await getRepository(HashTag)
      .createQueryBuilder("hashtag")
      .select("hashtag.tag")
      .getMany();
  }

  async getUserBySessionId(sessionId: string) {
    return await getRepository(AuthToken)
      .createQueryBuilder("authToken")
      .leftJoinAndSelect("authToken.user", "user")
      .where("authToken.sessionId = :sessionId", { sessionId })
      .getOne();
  }

  async createUserAuthToken(user: User) {
    return await getRepository(AuthToken)
      .create({
        user
      })
      .save();
  }

  async createImage(image: Image) {
    return await getRepository(Image).create(image).save();
  }

  async createGithubUser(userGithub: UserGithub) {
    return await getRepository(UserGithub).create(userGithub).save();
  }
}

export default UserDao.getInstance();
