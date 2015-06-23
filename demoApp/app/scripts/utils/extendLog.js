/**
 *
 * Module to enhance the logging functionality
 *
 *
 *  Usage :

 1. needs 'jquery' and hopefully Angular/bootstrap downloads it. Include it in the webpage.

 2. Include the extendLog.js into the webpage.

 3. Create an instance of $log using :

 var logger = $log.getInstance('<some_name>')

 4. use the instace to log different severity messages like:

 logger.info("Hi");
 logger.warn("Hi");
 logger.error("Hi");
 logger.debug("Hi");

 5. Create a new instance of logger for usage at different modules. This is one way to keep track of the module wher ethe log message is being originated

 6. $scope can't be used to point the origin of the log message

 **/


angular.module("extendLog", [])
    .config(['$provide', function ($provide) {

        $provide.decorator('$log', ['$delegate', function ($delegate) {

            /*
             *  Method to send data to be logged to server
             *  Use ajax call to send data to which ever servlet or service that can handle the data
             */
            function logTheData(msg) {

                $.get("/log", {'message': msg}, function (data) {
                    console.log("saved to anotherlog file");
                });

            }

            /*
             * THESE ARE FALL_BACK METHODS FOR NON-'logger' INSTANCE
             * Intercept the call to $log.debug() so we can add
             * our enhancement. We're going to add on a date and
             * time stamp to the message that will be logged.
             */

            var origDebug = $delegate.debug,
                origWarn = $delegate.warn,
                origError = $delegate.error,
                origLog = $delegate.warn,
                origInfo = $delegate.info;


            $delegate.info = function () {
                var args = [].slice.call(arguments);
                var stack = (new Error()).stack.split('\n').slice(1);
                var msg = {};

                if ((typeof args[0]) == 'string') {
                    args[0] = [new Date().toString(), ',', "INFO", ',ANONYMOUS,', args[0], ',', stack[1]]
                        .join('');
                } else {
                    var details = args[0];
                    msg = {
                        'time': details[0],
                        'Severity': details[1],
                        'component': details[2],
                        'message': details[3],
                        'extra': details[4]
                    };
                }

                // logTheData(args);
                logTheData(JSON.stringify(msg));
                origInfo.apply(null, args)
            };
            $delegate.debug = function () {
                var args = [].slice.call(arguments);
                var stack = (new Error()).stack.split('\n').slice(1);                           // Use (instance of Error)'s stack to get the current line.

                if ((typeof args[0]) == 'string') {
                    args[0] = [new Date().toString(), ',', "DEBUG", ',ANONYMOUS,', args[0], ',', stack[1]]
                        .join('');
                }

                // logTheData(args);
                logTheData(JSON.stringify(args));
                origDebug.apply(null, args)
            };

            $delegate.warn = function () {
                var args = [].slice.call(arguments);
                var stack = (new Error()).stack.split('\n').slice(1);

                if ((typeof args[0]) == 'string') {
                    args[0] = [new Date().toString(), ',', "WARNING", ',ANONYMOUS,', args[0], ',', stack[1]]
                        .join('');
                }

                // logTheData(args);
                logTheData(JSON.stringify(args));
                origWarn.apply(null, args)
            };
            $delegate.error = function () {
                var args = [].slice.call(arguments);
                var stack = (new Error()).stack.split('\n').slice(1);

                if ((typeof args[0]) == 'string') {
                    args[0] = [new Date().toString(), ',', "ERROR", ',ANONYMOUS,', args[0], ',', stack[1]]
                        .join('');
                }

                // logTheData(args);
                logTheData(JSON.stringify(args));
                origError.apply(null, args)
            };
            $delegate.log = function () {
                var args = [].slice.call(arguments);
                var stack = (new Error()).stack.split('\n').slice(1);

                if ((typeof args[0]) == 'string') {
                    args[0] = [new Date().toString(), ',', "LOG", ',ANONYMOUS,', args[0], ',', stack[1]]
                        .join('');
                }
                logTheData(JSON.stringify(args));
                origLog.apply(null, args)
            };

            // Keep track of the original debug method, we'll need it later.

            $delegate.getInstance = function (context) {
                return {
                    log: enhanceLogging($delegate.log, 'LOG', context),
                    info: enhanceLogging($delegate.info, 'INFO', context),
                    warn: enhanceLogging($delegate.warn, 'WARN', context),
                    debug: enhanceLogging($delegate.debug, 'DEBUG', context),
                    error: enhanceLogging($delegate.error, 'ERROR', context)
                };
            }

            function enhanceLogging(loggingFunc, logType, context) {
                return function () {

                    var args = [].slice.call(arguments);
                    // var stack = (new Error()).stack.split('\n').slice(1);
                    var currDate = new Date().toString();
                    args[0] = [currDate, logType, context, args[0]
                        // , stack[1]
                    ];

                    // This will call the default debug overrides we wrote above with modified arguments
                    // so we won't logTheData here. Else we will have multiple logs for same issue
                    // logTheData(args);
                    loggingFunc.apply(null, args);
                };
            }

            // Finally return the delegate object which goes to the browser console
            return $delegate;

        }]);
    }]);


/**
 *    source :
 https://docs.angularjs.org/api/auto/service/$provide
 http://stackoverflow.com/questions/20738707/angularjs-log-show-line-number
 http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/
 https://www.credera.com/blog/technology-insights/java/client-side-error-logging-angularjs/
 http://justinchmura.com/2014/12/08/console-history-using-angulars-log/
 *
 **/