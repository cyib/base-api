module.exports = function(model, where, newItem) {
    return model
      .findOne({ where: where })
      .then(function (foundItem) {
        if (!foundItem) {
          return model
            .create(newItem)
            .then(function (item) { return { item: item, created: true }; })
        }
        if(newItem.id != foundItem.id) newItem.id = foundItem.id;
        return model
          .update(newItem, { where: where })
          .then(function (item) { return { item: item, created: false } });
      });
  }
