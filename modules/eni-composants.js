/**
 * Created by Nicolas on 21/12/2016.
 */

(function(){
    "use strict";

    var module = angular.module("eniComposants",[]);

    module.directive("eniRange",function(){ // <eni-range />

        return {
            restrict: "E",
//            templateUrl:"directives/eni-range/eni-range.html",
            template:`
                <style>
                    .eni-range.eni-range-label { display: inline-block; width: 1.6em; line-height: 1.6em; border: 1px solid currentColor; text-align: center; }
                </style>
                <input type="range" ng-model="valeurmax" nng-model-options="{ getterSetter: true }" min="1" max="{{max}}" />{{initial}}
                <!--input type="text" ng-model="valeurmax" maxlength="2" 
                        style="width:2em;text-align:center" /-->
                <span class="eni-range eni-range-label" ng-click="test()">{{valeurmax}}</span>
            `,
            scope: {
                initial:"@",
                valeurmax:"=",
                test:"&",
                max:"@"
            },
            link: function(scope, element, attr){
                scope.max = 20;
                console.dir(element);
                element[0].querySelector("input[type='range']").addEventListener("input",function(){
                    //               element.find("input").on("input",function(){
                    console.log("input");
                    element.find("span").css("backgroundColor","yellow");
                },false);
            }
            // controller: ["$scope",function($scope){
            //
            //     var _valeurmax = 0;
            //     $scope.valeurmax = function(_value){
            //         _valeurmax = (angular.isDefined(_value))?parseInt(_value):_valeurmax;
            //         return _valeurmax;
            //     }
            //
            // }]
        }
    });






})();