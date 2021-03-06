<%
var cfgJson = grunt.config('cfgJson');
%>
<%
var cfgTestJson = grunt.config('cfgTestJson');
%>
// A reference configuration file.
exports.config = {
	// ----- How to setup Selenium -----
	//
	// There are three ways to specify how to use Selenium. Specify one of the
	// following:
	//
	// 1. seleniumServerJar - to start Selenium Standalone locally.
	// 2. seleniumAddress - to connect to a Selenium server which is already
	//    running.
	// 3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.
	//
	// If the chromeOnly option is specified, no Selenium server will be started,
	// and chromeDriver will be used directly (from the location specified in
	// chromeDriver)

	// The location of the selenium standalone server .jar file, relative
	// to the location of this config. If no other method of starting selenium
	// is found, this will default to
	// node_modules/protractor/selenium/selenium-server...
	seleniumServerJar: null,
	// The port to start the selenium server on, or null if the server should
	// find its own unused port.
	// seleniumPort: null,
	seleniumPort: 4444,
	// Chromedriver location is used to help the selenium standalone server
	// find chromedriver. This will be passed to the selenium jar as
	// the system property webdriver.chrome.driver. If null, selenium will
	// attempt to find chromedriver using PATH.
	// chromeDriver: './selenium/chromedriver',
	chromeDriver: '../../../../node_modules/protractor/selenium/chromedriver',		//need extra ../ because inside one more (`protractor`) directory!
	// If true, only chromedriver will be started, not a standalone selenium.
	// Tests for browsers other than chrome will not run.
	chromeOnly: false,
	// Additional command line options to pass to selenium. For example,
	// if you need to change the browser timeout, use
	// seleniumArgs: ['-browserTimeout=60'],
	seleniumArgs: [],

	// If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
	// The tests will be run remotely using SauceLabs.
	<%
	if(cfgTestJson.sauceLabs.user && cfgTestJson.sauceLabs.key) {
	print("sauceUser: '"+cfgTestJson.sauceLabs.user+"',\n");
	print("\tsauceKey: '"+cfgTestJson.sauceLabs.key+"',\n");
	}
	else {
	print('sauceUser: null,\n');
	print('\tsauceKey: null,\n');
	}
	%>

	// The address of a running selenium server. If specified, Protractor will
	// connect to an already running instance of selenium. This usually looks like
	// seleniumAddress: 'http://192.168.1.6:4444/wd/hub',
	<%
	if(cfgTestJson.sauceLabs.user && cfgTestJson.sauceLabs.key) {
	print("seleniumAddress: null,\n");
	}
	else if(cfgTestJson.browserstack && cfgTestJson.browserstack.user && cfgTestJson.browserstack.access_key) {
	print("\tseleniumAddress: 'http://hub.browserstack.com/wd/hub',\n");
	}
	else {
	print("\tseleniumAddress: 'http://localhost:4444/wd/hub',\n");		//do NOT need server scheme / https here?
	}
	%>
	
	// The timeout for each script run on the browser. This should be longer
	// than the maximum time your application needs to stabilize between tasks.
	allScriptsTimeout: 20000,

	// ----- What tests to run -----
	//
	// Spec patterns are relative to the location of this config.
	specs: [
		// 'spec/*_spec.js',
		// '../test/e2e/**/*.scenarios.js',
		// '../../test/e2e/**/*.scenarios.js',		//need extra ../ because inside one more directory!
		<%
		var filePaths = grunt.config('filePathsTestProtractor');
		for(var ii=0; ii<filePaths.length; ii++) {
			if(ii !=0) {
				print('\t\t');
			}
			print('"../../'+filePaths[ii] + '",\n');
		}
		%>
	],

	// ----- Capabilities to be passed to the webdriver instance ----
	//
	// For a full list of available capabilities, see
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities
	// and
	// https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
	capabilities: {
		<%
		if((cfgTestJson.browserstack && cfgTestJson.browserstack.user && cfgTestJson.browserstack.access_key) && (typeof(protractorCaps) !=="undefined" && protractorCaps)) {
			print("\t'browserstack.user' : '"+cfgTestJson.browserstack.user+"',\n");
			print("\t'browserstack.key' : '"+cfgTestJson.browserstack.access_key+"',\n");
			print("\t'browserstack.debug' : 'true',\n");
			var xx;
			for(xx in protractorCaps) {
				print("\t'"+xx+"': '"+protractorCaps[xx]+"',\n");
			}
		}
		else {
			print("'browserName': 'chrome',\n");
		}
		%>
	},

	// A base URL for your application under test. Calls to protractor.get()
	// with relative paths will be prepended with this.
	// baseUrl: 'http://localhost:8000',
	baseUrl: '<% print(cfgTestJson.server.scheme); %>://<% print(cfgTestJson.server.domain); %>:<% print(cfgTestJson.server.port); %>',

	// Selector for the element housing the angular app - this defaults to
	// body, but is necessary if ng-app is on a descendant of <body>  
	rootElement: 'body',

	// A callback function called once protractor is ready and available, and
	// before the specs are executed
	// You can specify a file containing code to run by setting onPrepare to
	// the filename string.
	onPrepare: function() {
		// At this point, global 'protractor' object will be set up, and jasmine
		// will be available. For example, you can add a Jasmine reporter with:
		//     jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
		//         'outputdir/', true, true));
	},
	
	// The params object will be passed directly to the protractor instance,
	// and can be accessed from your test. It is an arbitrary object and can
	// contain anything you may need in your test.
	// This can be changed via the command line as:
	//   --params.login.user 'Joe'
	params: {
	login: {
	  user: 'Jane',
	  password: '1234'
	}
	},

	// ----- The test framework -----
	//
	// Jasmine is fully supported as a test and assertion framework.
	// Mocha has limited beta support. You will need to include your own
	// assertion framework if working with mocha.
	framework: 'jasmine',

	// ----- Options to be passed to minijasminenode -----
	jasmineNodeOpts: {
		// onComplete will be called just before the driver quits.
		onComplete: null,
		// If true, display spec names.
		isVerbose: false,
		// If true, print colors to the terminal.
		showColors: true,
		// If true, include stack traces in failures.
		includeStackTrace: true,
		// Default time to wait in ms before a test fails.
		defaultTimeoutInterval: 30000
	}
};
