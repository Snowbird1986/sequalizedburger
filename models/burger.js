// var orm = require("../config/orm.js");

// var burger = {
//     all: function(cb) {
//         orm.selectAll("burgers", function(res) {
//             cb(res);
//           });
//     },
//     create: function(newName,cb) {
//         orm.insertOne("burgers", "burger_name", newName, function(res) {
//           cb(res);
//         });
//       },
//     update: function(objColVals, condition, cb) {
//     orm.updateOne("burgers",objColVals,condition, function(res) {
//         cb(res);
//     });
//     }

// }
// module.exports = burger;

module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      burger_name: DataTypes.STRING,
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue:false}
    });
    return Burger;
  };