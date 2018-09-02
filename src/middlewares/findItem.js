'use strict';
module.exports = (modelName, paramId = 'id') => {
  return async(req, res, next) => {
    const Model = require(`../models/${modelName}`);
    const model = await Model.find(req.params[paramId]);

    if (!model){
      return res.status(404).json({
        message: `${modelName} not found. id = ${req.params[paramId]}`,
      });
    } else {
      if (paramId === 'id') {
        req.body.model = model;
      } else {
        req.body.parentModel = model;
      }
      next();
    }

  };
};
