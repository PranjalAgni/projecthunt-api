import { CRUD } from "@common/interfaces/crud.interface";
import { Comment } from "@entities/Comment";
import { Project } from "@entities/Project";
import { User } from "@entities/User";
import projectDao from "@project/daos/project.dao";
import {
  CreateCommentDto,
  CreateProjectDto,
  ReadProjectDto
} from "@project/dtos/project.dto";

class ProjectService implements CRUD {
  private static instance: ProjectService;

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  async create(projectData: CreateProjectDto) {
    return await projectDao.create(projectData);
  }

  async findById(projectId: number) {
    return await projectDao.findById(projectId);
  }

  async getProjects(data: ReadProjectDto) {
    const { page, limit, sortBy, name, tag } = data;
    return await projectDao.getProjects(sortBy, name, tag, page, limit);
  }

  async getProjectByUserId(userId: number, page: number, limit: number) {
    const projectList = await projectDao.getProjectByUserId(
      userId,
      page,
      limit
    );

    return projectList;
  }

  async createComment(
    user: User,
    project: Project,
    commentData: CreateCommentDto
  ) {
    const { title, body } = commentData;
    const comment = new Comment();
    comment.title = title;
    comment.body = body;
    comment.user = user;
    comment.project = project;

    return await projectDao.createComment(comment);
  }

  async getVotesOnProject(projectId: number) {
    return await projectDao.getVotesOnProject(projectId);
  }

  async getComments(projectId: number) {
    return await projectDao.getCommentsByProjectId(projectId);
  }

  list: (limit: number, page: number) => Promise<unknown>;
  updateById: (resourceId: number) => Promise<unknown>;
  readById: (resourceId: number) => Promise<unknown>;
  deleteById: (resourceId: number) => Promise<unknown>;
  patchById: (resourceId: number) => Promise<unknown>;
}

export default ProjectService.getInstance();
