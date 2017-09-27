/**
 * Created by Sajjad on 06/09/2017.
 */
app.controller('viewphone', function ($scope, $http, $element, $compile) {
        $(document).on("click", "#botton_group", function () {
            var text = $(this).text();
            var local = "/View";
            var Indata = {
                fun: 'show_table',
                id_table: $(this).val()
            }
            $http({
                url: local,
                method: 'POST',
                params: Indata
            }).then(function success(response) {
                $scope.table = response.data.table;
                if ($scope.table != []) {
                    var html = '<table class="table_main text-center col-lg-12 col-md-12 margin_top_10 padding_2">' +
                            '<thead> <tr> <th class="text-center" colspan="2">' + text + ' </th> </tr> </thead> <tbody>'
                        ,
                        el = document.getElementById('show_table');
                    angular.element(el).html(html)
                    for (i = 0; i < $scope.table.length; i++) {
                        angular.element(el).append('<tr class="text-center col-lg-12 col-md-12 margin_top_10 padding_2 b_dark"> <td class="col-md-6 col-lg-6">' + $scope.table[i]['title']+'</td> <td class="col-md-6 col-lg-6">' + $scope.table[i]['phone']+'</td></tr></tbody></table>')
                    }
                } else {
                }
            }, function error(response) {
            });
        })
    })