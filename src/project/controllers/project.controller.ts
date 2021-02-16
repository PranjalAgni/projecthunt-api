import debug from "debug";

const log: debug.IDebugger = debug("server:user-controller");

class ProjectController {
  private static instance: ProjectController;

  static getInstance(): ProjectController {
    if (!ProjectController.instance) {
      ProjectController.instance = new ProjectController();
    }
    return ProjectController.instance;
  }
}

export default ProjectController.getInstance();
