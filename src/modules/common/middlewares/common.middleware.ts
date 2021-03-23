// const debugLog = debug("server:common-middleware");
class CommonMiddleware {
  private static instance: CommonMiddleware;

  static getInstance() {
    if (!CommonMiddleware.instance) {
      CommonMiddleware.instance = new CommonMiddleware();
    }
    return CommonMiddleware.instance;
  }
}

export default CommonMiddleware.getInstance();
