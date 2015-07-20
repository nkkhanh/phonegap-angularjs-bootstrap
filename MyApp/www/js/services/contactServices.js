"use strict";

myApp.service('contactServices', function() {

    // var db = window.sqlitePlugin.openDatabase({
    //     name: "my.db"
    // });

    var updateContact = function(contact, callback) {
        var db = window.sqlitePlugin.openDatabase({
            name: "my.db"
        });

        db.transaction(function(tx) {

          //  tx.executeSql('CREATE TABLE IF NOT EXISTS contact_table (id integer primary key, name text, email text, phone text, company_name text, location_lat float, location_lon float)');

            tx.executeSql("UPDATE contact_table SET name=?, email=?, phone=?, company_name=?, location_lat=?, location_lon=? WHERE id=?", [contact.name, contact.email, contact.phone, contact.company_name, contact.location_lat, contact.location_lon, contact.id], function(tx, res) {
                    if (typeof(callback) == 'function') {
                        return callback(true);
                    }
                },
                function(e) {
                    console.log("ERROR: " + e.message);
                    if (typeof(callback) == 'function') {
                        return callback(false);
                    }
                });
        });
    };
    var insertContact = function(contact, callback) {
        var db = window.sqlitePlugin.openDatabase({
            name: "my.db"
        });

        db.transaction(function(tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS contact_table (id integer primary key, name text, email text, phone text, company_name text, location_lat float, location_lon float)');

            tx.executeSql("INSERT INTO contact_table (name, email, phone, company_name, location_lat, location_lon) VALUES (?,?,?,?,?,?)", [contact.name, contact.email, contact.phone, contact.company_name, contact.location_lat, contact.location_lon], function(tx, res) {
                    if (typeof(callback) == 'function') {
                        return callback(true);
                    }
                },
                function(e) {
                    console.log("ERROR: " + e.message);
                    if (typeof(callback) == 'function') {
                        return callback(false);
                    }
                });
        });
    };
    var deleteContact = function(id, callback) {
        var db = window.sqlitePlugin.openDatabase({
            name: "my.db"
        });

        db.transaction(function(tx) {
            tx.executeSql("delete from contact_table where id = ?", [id], function(tx, res) {
                    if (typeof(callback) == 'function') {
                        return callback(true);
                    }

                },
                function(e) {
                    console.log("ERROR: " + e.message);
                    if (typeof(callback) == 'function') {
                        return callback(false);
                    }
                });
        });
    };
    var getContactAll = function(callback) {
        var db = window.sqlitePlugin.openDatabase({
            name: "my.db"
        });
        db.transaction(function(tx) {
          // tx.executeSql("select name, email, phone, company_name from contact_table;", [], function(tx, res) {
            tx.executeSql("select *  from contact_table;", [], function(tx, res) {
                var len = res.rows.length;
                var listContact = [];
                for (var i = 0; i < len; i++) {
                    var item = res.rows.item(i);
                    listContact.push(item);
                }
                if (typeof(callback) == 'function') {
                    return callback(true, listContact);
                }

            }, function(e) {
                console.log("ERROR: " + e.message);
                if (typeof(callback) == 'function') {
                    return callback(false, []);
                }
            });

        });
    };
    var getContactById = function(id, callback) {
        var db = window.sqlitePlugin.openDatabase({
            name: "my.db"
        });
        db.transaction(function(tx) {
           // tx.executeSql("select id, name, email, phone, company_name, location_lat, location_lon  from contact_table;", [], function(tx, res) {
            tx.executeSql("select * from contact_table;", [], function(tx, res) {
                var len = res.rows.length;
                for (var i = 0; i < len; i++) {
                    var item = res.rows.item(i);
                    if (item.id == id) {
                        if (typeof(callback) == 'function') {
                            return callback(true, item);
                        }
                    }
                }
                return null;

            }, function(e) {
                console.log("ERROR: " + e.message);
                if (typeof(callback) == 'function') {
                    return callback(false, null);
                }
            });

        });
    };

    return {
        insertContact: insertContact,
        updateContact: updateContact,
        deleteContact: deleteContact,
        getContactAll: getContactAll,
        getContactById: getContactById,
    }
});
