 /**
 * 
 * Module to enhance the logging functionality  
 *
 *
 *  Usage : 
    
    1. Create an instance of $log using :

        var logger = $log.getInstance('<some_name>')
    
    2. use the instace to log different severity messages like:
        
        logger.info("Hi");
        logger.warn("Hi");
        logger.error("Hi");
        logger.debug("Hi");

    3. Create a new instance of logger for usage at different modules. This is one way to keep track of the module wher ethe log message is being originated
    
    4. $scope can't be used to point the origin of the log message

 **/


angular.module("extendLog", [])
.config(['$provide', function ($provide) {

    $provide.decorator('$log', ['$delegate', function ($delegate) {
        // Keep track of the original debug method, we'll need it later.
        
        $delegate.getInstance = function(context) {
            return {
             log   : enhanceLogging($delegate.log, context),
             info  : enhanceLogging($delegate.info, context),
             warn  : enhanceLogging($delegate.warn, context),
             debug : enhanceLogging($delegate.debug, context),
             error : enhanceLogging($delegate.error, context)
          };
        }

        // function enhanceLogging(loggingFunc, context) {
        //     return function() {
        //         var modifiedArguments = [].slice.call(arguments);
        //         modifiedArguments[0] = [new Date().toString() + '::[' + context + ']> '] + modifiedArguments[0];
        //         loggingFunc.apply(null, modifiedArguments);
        //     };
        // }
                function enhanceLogging(loggingFunc, context) {
            return function() {

                var args = [].slice.call(arguments);
                var stack = (new Error()).stack.split('\n').slice(1);

                args[0] = [new Date().toString()+ ' - ','DEBUG - ', context+' - ', args[0]+' - ', stack[1]];
                loggingFunc.apply(null, args);
            };
        }

        
        /*
         * THESE ARE FALL_BACK METHODS FOR NON-'logger' INSTANCE
         * Intercept the call to $log.debug() so we can add  
         * our enhancement. We're going to add on a date and 
         * time stamp to the message that will be logged.
         */

        var origDebug = $delegate.debug;
        var origWarn = $delegate.warn;
        var origError = $delegate.error;

        $delegate.debug = function () {
            var args = [].slice.call(arguments);
            var stack = (new Error()).stack.split('\n').slice(1);                           // Use (instance of Error)'s stack to get the current line.

            args[0] = [new Date().toString(),' - ',"DEBUG", ' - ', args[0], '-', stack[1]]  // Create a String of arguments to pass to the console
                        .join('');
            
            
            origDebug.apply(null, args)
        };

        $delegate.warn = function () {
            var args = [].slice.call(arguments);
            var stack = (new Error()).stack.split('\n').slice(1);

            
            args[0] = 
                [new Date().toString(),' - ',"WARNING", ' - ', args[0], stack[1]]
                .join('');

            origWarn.apply(null, args)
        };
        $delegate.error = function () {
            var args = [].slice.call(arguments);
            var stack = (new Error()).stack.split('\n').slice(1);

            args[0] = [new Date().toString(),' - ',"ERROR", ' - ', args[0], '-', stack[1]]
                        .join('');

            origError.apply(null, args)
        };
        
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