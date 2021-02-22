import { getRepository } from "typeorm";
import { Comment } from "../../entities/Comment";
import { Project } from "../../entities/Project";
import { Vote } from "../../entities/Vote";
import { CreateProjectDto } from "../dtos/project.dto";

// const debugLog: debug.IDebugger = debug("server:project-dao");

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

  async getProjects(
    sortBy: string,
    name: string,
    tag: string,
    page: number,
    limit: number
  ) {
    const offset = (page - 1) * limit;
    let getProjectsQuery = getRepository(Project).createQueryBuilder("project");
    if (name) {
      getProjectsQuery = getProjectsQuery.andWhere("project.title LIKE :name", {
        name: `%${name}%`
      });
    }

    if (tag) {
      getProjectsQuery = getProjectsQuery
        .leftJoin("project.tags", "tags")
        .where("tags.tag = :tag", { tag });
    }

    if (sortBy === "new") {
      getProjectsQuery = getProjectsQuery.orderBy("project.createdAt DESC");
    } else if (sortBy === "trending") {
      // sum votes of last 7 days and order by DESC, we will get trending projects
      getProjectsQuery = getProjectsQuery.orderBy("project.createdAt DESC");
    } else if (sortBy === "popular") {
      // write query here
    }

    await getProjectsQuery.skip(offset).take(limit);
  }

  async findOne(projectId: number) {
    return await getRepository(Project).findOne({
      projectId
    });
  }

  async getVotesOnProject(projectId: number) {
    return await getRepository(Vote)
      .createQueryBuilder("vote")
      .where("vote.project = :projectId", { projectId })
      .andWhere("vote.value = 1")
      .getCount();
  }

  async getCommentsByProjectId(projectId: number) {
    return await getRepository(Comment)
      .createQueryBuilder("comment")
      .select(["comment.title", "comment.body"])
      .where("comment.project = :projectId", { projectId })
      .getMany();
  }

  async createComment(comment: Comment) {
    return await getRepository(Comment).save(comment);
  }

  async findById(projectId: number) {
    return await getRepository(Project).findOne({
      projectId
    });
  }
}

export default ProjectDao.getInstance();
