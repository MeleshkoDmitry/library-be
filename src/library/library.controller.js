class LibController {
      constructor(libService) {
            this._libService = libService;
      }

      find(req, res, next) {
            this._libService.find(req.query.title, req.query.author, req.query.page, req.query.perPage)
                  .then((data) => {
                        res.json(data);
                  })
                  .catch((err) => {
                        res.send(err);
                        return next(err);
                  });
      }

      addNewBook(req, res, next) {
            this._libService.addToLibrary(req.body.title, req.body.author)
                  .then((data) => {
                        res.json(data).status(201);
                  })
                  .catch((err) => {
                        res.send(err);
                        return next(err);
                  });
      }

      delBook(req, res, next) {
            this._libService.deleteBookFromLibrary(req.params.id)
                  .then(() => {
                        res.status(204).send({ message: 'Successful deleted' });
                  })
                  .catch((err) => {
                        res.status(404).send({ message: 'Not found: ' + req.params.id });
                        return next(err);
                  });
      }

      editBook(req, res, next) {
            const fn = function (resolve, reject) {
                  if (req.params.id === req.body._id) {
                        resolve();
                  } else {
                        reject(new ParameterError(req.params.id, req.body._id));
                  }
            };

            return new Promise(fn)
                  .then(() => this._libService.editBookFromLibrary(req.params.id, req.body.title, req.body.author))
                  .then((data) => {
                        res.json(data).status(200);
                  })
                  .catch((e) => {
                        if (e && e instanceof ParameterError) {
                              res.status(e.status).send(e.message);
                              return next(e);
                        } else {
                              res.status(404).send({ message: `Not found: ${req.params.id}` });
                        }
                  });
      }

      findByID(req, res, next) {
            this._libService.findById(req.params.id)
                  .then((data) => {
                        if (data === null) {
                              res.status(404).send('Not found: ' + req.params.id);
                        } else {
                              res.json(data);
                        }
                  })
                  .catch((err) => {
                        res.send('Not found: ' + req.params.id);
                        return next(err);
                  });
      }
}
/**
 * @param {*} parameter
 * @param {*} parameter2
 */
class ParameterError {
      constructor(parameter, parameter2) {
            this.name = 'ParameterError';
            this.parameter = parameter;
            this.parameter2 = parameter2;
            this.status = 400;
            this.message = 'Error in parameter: ' + parameter + ' do not much ' + parameter2;
            if (Error.captureStackTrace) {
                  Error.captureStackTrace(this, ParameterError);
            } else {
                  this.stack = (new Error()).stack;
            }
      }
}
ParameterError.prototype = Object.create(Error.prototype);

module.exports = LibController;
