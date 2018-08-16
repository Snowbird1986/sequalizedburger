var connection = require("./connection.js");
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) {
                return res.status(500).end();
              }
            cb(result);
            // res.render("index", { burger_name: data });
        })
    },
    insertOne: function(tableInput, columnName, newName,cb) {
        var queryString = "INSERT INTO " + tableInput;

            queryString += " (";
            queryString += columnName.toString();
            queryString += ") ";
            queryString += "VALUES (";
            queryString += printQuestionMarks(newName.length);
            queryString += ") ";

            console.log(queryString);
        connection.query(queryString, newName,
            function(err, result) {
                if (err) {
                    return res.status(500).end();
                  }
                cb(result);
                // res.json({ id: result.insertId });
                // console.log({ id: result.insertId });
                // res.redirect("/");
        })
    },
    updateOne: function(tableInput, objColVals, condition, cb) {
        var queryString = "UPDATE " + tableInput;

            queryString += " SET ";
            queryString += objToSql(objColVals);
            queryString += " WHERE ";
            queryString += condition;

            console.log(queryString);
            connection.query(queryString,
            function(err, result) {
                if (err) {
                    // If an error occurred, send a generic server failure
                    return result.status(500).end();
                  }
                  else if (result.changedRows === 0) {
                    // If no rows were changed, then the ID must not exist, so 404
                    return result.status(404).end();
                  }
                  cb(result);
                //   res.redirect("/").status(200).end();
                }
            )
        }
    }
module.exports = orm;