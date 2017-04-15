(function() {
    function constants() {
        return {
            name: 'Chetan'
        };
    }

    function authInterceptor(API, auth) {

        return {
            // automatically attach Authorization header
            request: function(config) {
                return config;
            },

            // If a token was s ent back, save it
            response: function(res) {
                return res;
            },
        };
    }

    function authService($window) {
        var self = this;

        // Add JWT methods here
    }

    function userService($http, API, auth) {
        var self = this;
        self.getQuote = function() {
            return $http.get(API + '/auth/quote');
        }

        self.register = function(username, password) {
            return $http.post(API + '/auth/register', {
                username: username,
                password: password
            });

            self.login = function(username, password) {
                return $http.post(API + '/auth/login', {
                    username: username,
                    password: password
                })
            };
        }

        // add authentication methods here

    }

    // We won't touch anything in here
    function MainCtrl(user, auth, DEF) {
        var self = this;
        self.DEF = DEF;
        function handleRequest(res) {
            var token = res.data ? res.data.token : null;
            if (token) {
                console.log('JWT:', token);
            }
            self.message = res.data.message;
        }

        self.login = function() {
            user.login(self.username, self.password)
                .then(handleRequest, handleRequest)
        }
        self.register = function() {
            console.log("test");

            user.register(self.username, self.password)
                .then(handleRequest, handleRequest)
        }
        self.getQuote = function() {
            user.getQuote()
                .then(handleRequest, handleRequest)
        }
        self.logout = function() {
            auth.logout && auth.logout()
        }
        self.isAuthed = function() {
            return auth.isAuthed ? auth.isAuthed() : false
        }
    }




    angular.module('practice', ['ngRoute', 'angular-loading-bar', 'ngSanitize'])
        .directive('newContent', function() {
            return {
                template: 'His'
            };
        })
        .directive('appHeader', function() {
            return {
                restrict: 'E',
                templateUrl: 'views/partials/header.html',
                controller: function($location) {
                    var self = this;
                    this.checkLink = function(link) {
                        return $location.path() == '/' + link;
                    }
                },
                controllerAs: 'linkCtrl'
            }
        })
        .directive('appFooter', function() {
            return {
                restrict: 'E',
                templateUrl: 'views/partials/footer.html'
            }
        })
        .constant('config', {
            name: 'Practice App'
        })
        .constant('API', 'http://localhost:5000')
        .factory('activeLink', function() {
            var curlink = 'home';
            return {
                setLink: function(value) {
                    curlink = value;
                },
                getLink: function() {
                    return curlink;
                }
            }
        })
        .factory('test', function() {
            return {
                isAuthenticated: true
            };
        })
        .factory('TestFactory', function(a, b){
          return a + b;
        })
        .factory('authInterceptor', authInterceptor)
        .service('user', userService)
        .service('auth', authService).controller('Main', MainCtrl)
        .config(function($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            // $locationProvider.hashPrefix('');
            // $locationProvider.html5Mode({enabled: true, requireBase: false, rewriteLinks: false});

            $routeProvider.when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl',
                    AEMdata: 'Chetan',
                    data:{
                      AEMdata: 'bla'
                    }
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutController',
                    controllerAs: 'aboutCtrl'
                })
                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'ContactController',
                    controllerAs: 'contactCtrl'
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: MainCtrl,
                    controllerAs: 'main',
                })
                .when('/register', {
                    templateUrl: 'views/register.html',
                    controller: MainCtrl,
                    controllerAs: 'main',
                })
                .otherwise({
                    template: 'No route defined'
                });
        })
        .constant('DEF', 'http://www.google.com')
        .run(['$rootScope', '$location', '$log', 'test', 'DEF', '$http',
        function($rootScope, $location, $log, test, DEF, $http) {

            $rootScope.$on('$routeChangeStart', function(e, next, current) {
              console.log('start');

                window.next = next;
                $http.get('http://localhost/practice/api.php').then(function(data){
                    $rootScope.AEMdata = data.data;
                });

                if ($location.path() !== '/' && test.isAuthenticated == false) {
                    alert('not allowed');
                    // $location.path('/');
                }
            });
            $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
                var new_scope = $rootScope.$new();
                new_scope.AEMdata = $rootScope.AEMdata;

                console.log($rootScope.AEMdata);
            });
        }])
        .config(function($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        });
})();
