/**
 * Created by Nicolas on 01/06/2016.
 */
angular.module("banque")
    .directive("eniRange",function(){ // <eni-range />

        return {
            restrict: "E",
            templateUrl:"directives/eni-range/eni-range.html",
            scope: {
                valeurmax:"=",
//                initial:"@",
//                test:"&",
                max:"@"
            }
        }
    });
