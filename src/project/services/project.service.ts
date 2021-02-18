import { Request, Response, NextFunction } from "express";
import { CRUD } from "../../common/interfaces/crud.interface";
import projectDao from "../daos/project.dao";

class ProjectService implements CRUD {
  private static instance: ProjectService;

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  async getProjectByUserId(userId: number, page: number, limit: number) {
    const projectList = await projectDao.getProjectByUserId(
      userId,
      page,
      limit
    );

    projectList.forEach((project) => {
      delete project.users;
    });

    return projectList;
  }

  create: (resource: unknown) => Promise<unknown>;
  list: (limit: number, page: number) => Promise<unknown>;
  updateById: (resourceId: number) => Promise<unknown>;
  readById: (resourceId: number) => Promise<unknown>;
  deleteById: (resourceId: number) => Promise<unknown>;
  patchById: (resourceId: number) => Promise<unknown>;
}

export default ProjectService.getInstance();
