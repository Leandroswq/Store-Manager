const createError = (name) => {
  class MyErrors extends Error {
    constructor(message) {
      super(message);
      this.name = name;
    }
  }
  return MyErrors;
};

module.exports = {
  NotFoundError: createError('NotFound'),
  BadRequestError: createError('BadRequest'),
  UnprocessableEntity: createError('UnprocessableEntity'), 
};