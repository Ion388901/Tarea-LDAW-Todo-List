const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    //console.log('Task created with id: ', id);
    //res.redirect('/');
    // if the request is expecting an ajax or json response
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}

exports.done = (req, res) => {
  let id = req.params.id;
  Task.find(id)
  .then((task) => {
    return Task.markAsDone(task);
  })
  .then((result) => {
    res.redirect('/');
  });
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Task.find(id)
  .then((task) => {
    if(task == null) {
      res.status(404).send('Not found');
      return;
    }
    Task.delete(task.id)
      .then((id) => {
        res.redirect('/');
      });
  });
}