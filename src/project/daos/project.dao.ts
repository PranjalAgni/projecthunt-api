import debug from "debug";
import { getRepository } from "typeorm";
import { Project } from "../../entities/Project";
import { CreateProjectDto } from "../dtos/project.dto";

const debugLog: debug.IDebugger = debug("server:user-dao");

class ProjectDao {
  private static instance: ProjectDao;

  static getInstance(): ProjectDao {
    if (!ProjectDao.instance) {
      ProjectDao.instance = new ProjectDao();
    }
    return ProjectDao.instance;
  }

  async create(project: CreateProjectDto) {
    return await getRepository(Project).create(project).save();
  }

  async getProjectByUserId(userId: number, page: number, limit: number) {
    const offset = (page - 1) * limit;

    return await getRepository(Project)
      .createQueryBuilder("project")
      .leftJoin("project.users", "user")
      .where("user.userId = :userId", { userId })
      .skip(offset)
      .take(limit)
      .getMany();
  }
}

export default ProjectDao.getInstance();
