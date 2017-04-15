(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	authInterceptor.$inject = ["API", "auth"];
	userService.$inject = ["$http", "API", "auth"];
	authService.$inject = ["$window"];
	MainCtrl.$inject = ["user", "auth"];
	function constants() {
		return {
			name: 'Chetan   '
		};
	}

	function authInterceptor(API, auth) {
		console.log('Intercepting ');
		return {
			// automatically attach Authorization header
			request: function request(config) {
				return config;
			},

			// If a token was s ent back, save it
			response: function response(res) {
				return res;
			}
		};
	}

	function authService($window) {
		var self = this;

		// Add JWT methods here
	}

	function userService($http, API, auth) {
		var self = this;
		self.getQuote = function () {
			return $http.get(API + '/auth/quote');
		};

		self.register = function (username, password) {
			return $http.post(API + '/auth/register', {
				username: username,
				password: password
			});

			self.login = function (username, password) {
				return $http.post(API + '/auth/login', {
					username: username,
					password: password
				});
			};
		};

		// add authentication methods here
	}

	// We won't touch anything in here
	function MainCtrl(user, auth) {
		var self = this;
		function handleRequest(res) {
			var token = res.data ? res.data.token : null;
			if (token) {
				console.log('JWT:', token);
			}
			self.message = res.data.message;
		}

		self.login = function () {
			user.login(self.username, self.password).then(handleRequest, handleRequest);
		};
		self.register = function () {
			console.log("test");

			user.register(self.username, self.password).then(handleRequest, handleRequest);
		};
		self.getQuote = function () {
			user.getQuote().then(handleRequest, handleRequest);
		};
		self.logout = function () {
			auth.logout && auth.logout();
		};
		self.isAuthed = function () {
			return auth.isAuthed ? auth.isAuthed() : false;
		};
	}

	angular.module('practice', ['ngRoute', 'angular-loading-bar', 'ngSanitize']).directive('newContent', function () {
		return {
			template: 'His'
		};
	}).directive('appHeader', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/header.html',
			controller: ["$location", function controller($location) {
				var self = this;
				this.checkLink = function (link) {
					return $location.path() == '/' + link;
				};
			}],
			controllerAs: 'linkCtrl'
		};
	}).directive('appFooter', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/footer.html'
		};
	}).constant('config', {
		name: 'Practice App'
	}).constant('API', 'http://localhost:5000').factory('activeLink', function () {
		var curlink = 'home';
		return {
			setLink: function setLink(value) {
				curlink = value;
			},
			getLink: function getLink() {
				return curlink;
			}
		};
	}).factory('test', function () {
		return {
			isAuthenticated: true
		};
	}).factory('authInterceptor', authInterceptor).service('user', userService).service('auth', authService).controller('Main', MainCtrl).config(["$routeProvider", "$locationProvider", "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
		// $locationProvider.hashPrefix('');
		// $locationProvider.html5Mode({enabled: true, requireBase: false, rewriteLinks: false});

		$routeProvider.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController',
			controllerAs: 'homeCtrl'
		}).when('/about', {
			templateUrl: 'views/about.html',
			controller: 'AboutController',
			controllerAs: 'aboutCtrl'
		}).when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'ContactController',
			controllerAs: 'contactCtrl',
			link: function link(scope, element) {
				// console.log(scope, element);
			}
		}).when('/login', {
			templateUrl: 'views/login.html',
			controller: MainCtrl,
			controllerAs: 'main'
		}).when('/register', {
			templateUrl: 'views/register.html',
			controller: MainCtrl,
			controllerAs: 'main'
		}).otherwise({
			template: 'No route defined'
		});
	}]).run(['$rootScope', '$location', '$log', 'test', function ($rootScope, $location, $log, test) {
		$rootScope.$on('$routeChangeStart', function (e, current, pre) {
			if ($location.path() !== '/' && test.isAuthenticated == false) {
				alert('not allowed');
				// $location.path('/');
			}
		});
		$rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
			// activeLink.setLink(current);
			// console.log('Current route name: ' + current);
			// Get all URL parameter
		});
	}]);
})();

},{}]},{},[1]);
