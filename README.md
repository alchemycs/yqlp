yqlq
====

This `yqlp` module is a YQL client for node.js forked from the excellent 
[node-yql](https://github.com/derek/node-yql) module by Derek Gathright.

This fork builds upon the previous work primarily through the introduction of
`YQL.execp` that returns a `promise` rather than using a `callback`.

Differences
-----------

Aside from adding promises, the main `YQL.exec` signature has been modified to
more closely follow the *[Continuation-passing Style (CPS)](http://en.wikipedia.org/wiki/Continuation-passing_style)*,
or `callback` pattern used by most of the node community.

For a nice introduction to the node `callback` convention I recommend reading 
the post, [Callback conventions in node.js, how and why](http://blog.gvm-it.eu/post/22040726249/callback-conventions-in-node-js-how-and-why)


* The `callback` function is now the *last* argument passed to `YQL.exec()`
* The `callback` function uses the standard nodejs pattern of `callback(error, result)`
* The `callback` parameter is mandatory on the `YQL.exec()` method
* New helper method `YQL.execp()` - *doesn't* take a callback, but returns a Q promise, see: <https://github.com/kriskowal/q/>

What is YQL?
------------

Yahoo! Query Language is an expressive SQL-like language that lets you query, filter, and join data across Web services. With YQL, apps run faster with fewer lines of code and a smaller network footprint.

Yahoo! and other websites across the Internet make much of their structured data available to developers, primarily through Web services. To access and query these services, developers traditionally endure the pain of locating the right URLs and documentation to access and query each Web service.

With YQL, developers can access and shape data across the Internet through one simple language, eliminating the need to learn how to call different APIs.

### Example YQL Queries

* SELECT title,abstract FROM search.web WHERE query="pizza";
* SELECT * FROM weather.forecast WHERE location = 90066;
* SELECT * FROM twitter.user.timeline WHERE id = 'yql';
* SELECT * FROM flickr.photos.interestingness(20);

You may find more examples at the [YQL console](http://developer.yahoo.com/yql/console/ "YQL console")


Installing yqlp
-----------------------
First, make sure you have Node installed. You can find instructions for installing it at <http://nodejs.org/#download>

With Node installed, you can install the `yqlp` module 2 ways: 

1) The easiest method is to use [NPM](http://github.com/isaacs/npm), node's package manager.  Once you have NPM installed, simply run:

	$ npm install yqlp

2) Or, you can clone the github repository, and just be sure you add this module's path to the $NODE_PATH env variable

	$ git clone https://github.com/alchemycs/yqlp.git


Use within Node
---------------

A basic example

![](http://s89997654.onlinehome.us/screencaps/example.js-20110507-181302.jpg)
![](http://s89997654.onlinehome.us/screencaps/Default-20100710-160425.jpg)


YQL.exec()
----------

function *exec* (*string* __query__ [, *object* __params__] [, *object* __httpOptions__] [, *function* __callback__(error, result) ])

* query - A YQL query
* params - Optional parameters for use within the YQL request querystring. Typical uses; including environment files, variable replacement within the YQL statement.
* httpOptions - Additional HTTP options
	* ssl: A boolean true/false flag to enable HTTPS (default: false)
	* Any valid [HTTP header](https://secure.wikimedia.org/wikipedia/en/wiki/List_of_HTTP_header_fields)
* callback - A callback function that receives the result of the query. The value `error` is set if something went wrong, otherwise `result` contains the response

YQL.execp()
-----------

*promise object* function *exec* (*string* __query__ [, *object* __params__] [, *object* __httpOptions__])

* query - A YQL query
* params - Optional parameters for use within the YQL request querystring. Typical uses; including environment files, variable replacement within the YQL statement.
* httpOptions - Additional HTTP options
    * ssl: A boolean true/false flag to enable HTTPS (default: false)
	* Any valid [HTTP header](https://secure.wikimedia.org/wikipedia/en/wiki/List_of_HTTP_header_fields)
* return - A promise object. See <http://documentup.com/kriskowal/q/> for more infomation.


Additional Resources
------------------------
* Callback conventions in node.js, how and why <http://blog.gvm-it.eu/post/22040726249/callback-conventions-in-node-js-how-and-why>
* Asynchronous Control Flow with Promises <http://howtonode.org/promises>
* Documentation: <http://developer.yahoo.com/yql/guide/>
* YQL Console: <http://developer.yahoo.com/yql/console/>
