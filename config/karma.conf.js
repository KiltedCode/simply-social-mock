module.exports = function(config) {
  config.set({
	basePath: '../',

    files: [
		'dev/frodo/app/lib/angular/angular.js',
		'dev/frodo/app/lib/angular/angular-route.js',
		'test/lib/angular/angular-mocks.js',
		'app/components/*.js',
		'app/components/**/*.js',
        'test/unit/**/*.js',

		{pattern: 'test/data/**', watched: true, served: true, included: false}
    ],

    exclude: [],

    frameworks: ['jasmine'],

    autoWatch: true,

    browsers: ['PhantomJS'],

    junitReporter: {
		outputFile: 'test_out/unit.xml',
		suite: 'unit'
    }
  });
};