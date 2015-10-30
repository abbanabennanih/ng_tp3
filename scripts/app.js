var app = angular.module('app', ['ngRoute']);

//Router + mapping
app.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'AppController',
            templateUrl: 'templates/home.html'
        })
        .when('/home', {
            controller: 'AppController',
            templateUrl: 'templates/home.html'
        })
        .when('/a-propos', {
            controller: 'AboutController',
            templateUrl: 'templates/about.html'
        })
        .when('/recrutement', {

            controller: 'RecrutementController',

            templateUrl: 'templates/recrutement.html'

        })
        .when('/quotation', {
            controller: 'QuotationController',
            templateUrl: 'templates/quotation.html'
        })
        .when('/contact', {
            controller: 'ContactController',
            templateUrl: 'templates/contact.html'
        })
        .when('/contactStorage', {
            controller: 'ContactStorageController',
            templateUrl: 'templates/contactStorage.html'
        })
        .when('/404', {
            controller: 'NotFoundController',
            templateUrl: 'templates/404.html'
        })
        .when('/dynamic', {
            controller: 'DynamicFormController',
            templateUrl: 'templates/dynamicForm.html'
        })
        .otherwise({redirectTo: '/404'})
        ;

});

//Factories
app.factory('contactFormFactory', function(){
     var fields = [
         
             {
                 
                 "type": "text",
                 "required": "true",
                 "maxLength": 15,
                 "label": "Name",
                 "placeholder": "Name"
             },
             {
                
                 "type": "text",
                 "required": "true",
                 "maxLength": 15,
                 "label": "Email",
                 "placeholder": "john@doe.com"
             },
             {
                
                 "type": "textarea",
                 "required": "true",
                 "maxLength": 30,
                 "label": "Message"
             },
             {
                
                 "type": "checkbox",
                 "required": "false",
                 "label": "Terms and Conditions"
             },
             {
                 "label" : 'Submit',
                 "type": "button",
                 
             }
        
     ];
     
     var factory = {};

     factory.getFields = function() {
         return fields;
     }

     return factory;
});

//Controllers

app.controller('DynamicFormController', function($scope, contactFormFactory) {
     $scope.fields = [];

     function init() {
         $scope.fields = contactFormFactory.getFields();
     }
     init();

});

app.controller('AppController', ['$scope', function($scope){

    console.log('AppController');

}]);


app.controller('AboutController', ['$scope', function($scope){

    console.log('AboutController');

}]);


app.controller('RecrutementController', ['$scope', function($scope){

    console.log('RecrutementController');

}]);

app.controller('QuotationController', ['$scope', function($scope){

    console.log('QuotationController');

}]);

app.controller('ContactController', ['$scope', function($scope){

    
    $scope.contactSubmit = function(contact) {              
        var itemsArray = [];
        var contactDataStorage = localStorage.getItem('contactData');
        if(contactDataStorage != '') {
            itemsArray = JSON.parse(contactDataStorage) ;
        }
        
        itemsArray.push(contact);
        localStorage.setItem('contactData', JSON.stringify(itemsArray)); 

    }
}]);

app.controller('ContactStorageController', ['$scope', function($scope){
    
    $scope.contacts = JSON.parse(localStorage.getItem('contactData'))  || [];
    

}]);

app.controller('NotFoundController', ['$scope', function($scope){

    console.log('NotFoundController');

}]);

//Custom directives
angular.module('formDirective', [])
.controller('FormDirectiveController', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('formDirective', function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };
});