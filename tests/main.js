#!/bin/node
/*

Software Copyright License Agreement (BSD License)

Copyright (c) 2010, Yahoo! Inc.
All rights reserved.

*/

var assert = require('assert'),
    yql    = require('../lib/yql');

// Example #1 - Param binding
new yql.exec("SELECT * FROM weather.forecast WHERE (location = @zip)", {"zip": 90066}, function(error, response) {
    var testID = "1";
    try {
        assert.ok(response.query.results);
        pass(testID);
    }
    catch (e) { return fail(testID, e); }
});


// Example #2 - Param binding + SSL
new yql.exec("SELECT * FROM html WHERE url = @url", {url:"http://www.yahoo.com"}, {ssl:true}, function(error, response) {
    var testID = "2";
    try {
        assert.ok(response.query.count);
        pass(testID);
    }
    catch (e) { return fail(testID, e); }
});


// Example #3 - Non-existent table
new yql.exec("SELECT * FROM foobar.badTable", function(error, response) {
    var testID = "3";
    try {
        // error object will be set if a YQL error occured
        assert.ok(error);
        pass(testID);
    }
    catch (e) { return fail(testID, e); }
});


// Example #4 - Missing required fields
new yql.exec("SELECT * FROM html", function(error, response) {
    var testID = "4";
    try {
        // error object will be set if a YQL error occured
        assert.ok(error);
        pass(testID);
    }
    catch (e) { return fail(testID, e); }
});

// Example #5 - Param binding as promise
(function() {
    var testID = 5;
    yql.execp("SELECT * FROM weather.forecast WHERE (location = @zip)", {"zip": 90066})
    .then(function(response) { //success
        try {
            assert.ok(response.query.results);
            pass(testID);
        }
        catch (e) { return fail(testID, e); }
    }, function(error) {
        fail(testID, error);
    });
})();

// Example #6 - Param binding + SSL as promise
(function() {
    var testID = 6;
    yql.execp("SELECT * FROM html WHERE url = @url", {url:"http://www.yahoo.com"}, {ssl:true})
    .then(function(response) { //success
        try {
            assert.ok(response.query.results);
            pass(testID);
        }
        catch (e) { return fail(testID, e); }
    }, function(error) {
        fail(testID, error);
    });
})();

// Example #7 - Non-existent table as promise
(function() {
    var testID = 7;
    yql.execp("SELECT * FROM foobar.badTable")
    .then(function(response) { //success
        fail(testID, response);
    }, function(error) {
        try {
            assert.ok(error);
            pass(testID);
        }
        catch (e) { return fail(testID, e); }
    });
})();

// Example #8 - Missing required fields
(function() {
    var testID = 8;
    yql.execp("SELECT * FROM html")
    .then(function(response) { //success
        fail(testID, response);
    }, function(error) {
        try {
            assert.ok(error);
            pass(testID);
        }
        catch (e) { return fail(testID, e); }
    });
})();


function pass(testID) {
    console.log("Test #" + testID + " ... Passed");
}
function fail(testID, error) {
    console.log("Test #" + testID + " ... FAIL", error);
}