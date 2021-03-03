class HttpErrors {
  private static instance: HttpErrors;

  static getInstance() {
    if (!HttpErrors.instance) {
      HttpErrors.instance = new HttpErrors();
    }
    return HttpErrors.instance;
  }
}

export default HttpErrors.getInstance();
