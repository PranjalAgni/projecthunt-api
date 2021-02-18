import { CRUD } from "../../common/interfaces/crud.interface";
import projectDao from "../daos/project.dao";
import { CreateProjectDto } from "../dtos/project.dto";

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

  async getProjectByUserId(userId: number, page: number, limit: number) {
    const projectList = await projectDao.getProjectByUserId(
      userId,
      page,
      limit
    );

    return projectList;
  }

  list: (limit: number, page: number) => Promise<unknown>;
  updateById: (resourceId: number) => Promise<unknown>;
  readById: (resourceId: number) => Promise<unknown>;
  deleteById: (resourceId: number) => Promise<unknown>;
  patchById: (resourceId: number) => Promise<unknown>;
}

export default ProjectService.getInstance();
