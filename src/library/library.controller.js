class LibController {
  constructor(libService) {
    this._libService = libService;
  }

  addBook(req, res, next) {
    this._libService.addBook(req.body.title, req.body.author)
      .then(data => res.json(data).status(201))
      .catch((err) => {
        res.send(err);
        return next(err);
      });
  }

  find(req, res, next) {
    const query = req.query || {}
    this._libService.find(query.title, query.author, query.page, query.pageSize, query.sort)
      .then(data => res.json(data))
      .catch((err) => {
        res.send(err);
        return next(err);
      });
  }

  findById(req, res, next) {
    this._libService.findById(req.params.id)
      .then(data => res.json(data))
      .catch((err) => {
        res.status(404).send('Not found: ' + req.params.id);
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
      .then(() => this._libService.editBook(req.params.id, req.body.title, req.body.author))
      .then(data => res.json(data).status(200))
      .catch((e) => {
        if (e && e instanceof ParameterError) {
          res.status(e.status).send(e.message);
          return next(e);
        } else {
          res.status(404).send({ message: `Not found: ${req.params.id}` });
        }
      });
  }

  deleteBook(req, res, next) {
    this._libService.deleteBook(req.params.id)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        res.status(404).send({ message: 'Not found: ' + req.params.id });
        return next(err);
      });
  }
}

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
