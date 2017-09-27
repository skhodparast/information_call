/**
 * Created by Sajjad on 06/09/2017.
 */
app.controller('updatephone', function ($scope, $http, $element, $compile) {
    document.getElementById("delete_table").style.display = "none";
    $scope.div_update = false;
    $scope.div_update_insert = false
    $scope.div_update_group = false
    $scope.button_phone_university = function () {
        var local = "/Update";
        var Indata = {
            fun: 'button_phone_university',
            phone_university: $scope.model_phone_university
        }
        $http({
            url: local,
            method: 'POST',
            params: Indata
        }).then(function success(response) {
            $scope.answer_update = response.data.answer_update;
            document.getElementById("message_phone_university").style.display = "block";
            if ($scope.answer_update == true) {
                $scope.status_phone_university = {'true': true}
            } else {
                $scope.status_phone_university = {'false': true}
            }
            $("#message_phone_university").fadeOut(3000)
        }, function error(response) {
        });
    }
    $scope.insert_group = function () {
        $scope.input_insert_group = $("#input_insert_groupp").val()
        var local = "/Update";
        var Indata = {
            fun: 'insert_group',
            input_insert_group: $("#input_insert_groupp").val()
        }
        $http({
            url: local,
            method: 'POST',
            params: Indata
        }).then(function success(response) {

            $("#input_insert_groupp").val('')
            $scope.insert_id_groups = response.data.id_group;
            $scope.input_insert_groups = response.data.input_insert_group;
            document.getElementById("message_insert_group").style.display = "block";
            if ($scope.insert_id_groups != 0) {
                $scope.status_insert_group = {'true': true}
                var html = '<option id="selected_group_' + $scope.insert_id_groups + '"' +
                        'value="' + $scope.insert_id_groups + '">' + $scope.input_insert_groups + '</option>',
                    el = document.getElementById('name_groups');
                angular.element(el).append($compile(html)($scope))
                $scope.mgroup = 0;
                $scope.fun_group();
            } else {
                $scope.status_insert_group = {'false': true}
            }
            $("#message_insert_group").fadeOut(6000)
        }, function error(response) {
        });
    }
    $scope.fun_group = function () {
        var mgroup = $scope.mgroup
        var local = "/Update";
        var Indata = {
            fun: 'fun_group',
            id_group: mgroup
        }
        $http({
            url: local,
            method: 'POST',
            params: Indata
        }).then(function success(response) {
            $scope.phones_group = response.data.phone_group;
            $scope.name_group = response.data.name_group;
            $scope.id_group = response.data.id_group;
            $scope.div_update_insert = true
            $scope.div_update = false
            $scope.div_update_group = false
            if ($scope.id_group == 0) {
                document.getElementById("delete_table").style.display = "none";
                $scope.div_update_insert = false;
            } else {
                $("#delete_table_buttom").val(mgroup)
                document.getElementById("delete_table").style.display = "block";
            }
            $("#show_update_qroup").text($scope.name_group.name);
        }, function error(response) {
        });
    }
    $scope.delete_tablee = function () {
        $(document).on("click", "#delete_table", function () {
            var id_delete_group = $("#delete_table_buttom").val()
            var local = "/Update";
            var Indata = {
                fun: 'delete_table',
                id_delete_group: id_delete_group
            }
            $http({
                url: local,
                method: 'DELETE',
                params: Indata
            }).then(function success(response) {
                $scope.delete_group = response.data.delete;
                if ($scope.delete_group == 'true') {
                    el = document.getElementById("selected_group_" + id_delete_group);
                    angular.element(el).remove()
                    $scope.mgroup = 0;
                    $scope.fun_group();
                    $scope.delete_table = {'true': true}
                    $("#message_delete_table").fadeOut(3000)
                } else {
                    $scope.delete_table = {'false': true}
                    $("#message_delete_table").fadeOut(3000)
                }
            }, function error(response) {
            });
        });
    }
    $scope.fun_update_insert = function () {
        document.getElementById("message_update_insert").style.display = "block";
        $scope.title_update_insert = $("#title_update_insert").val();
        $scope.phone_update_insert = $("#phone_update_insert").val();
        $scope.id_group_update_insert = $("#id_group_update_insert").val();
        var title = $scope.title_update_insert
        var phone = $scope.phone_update_insert
        var local = "/Update";
        var Indata = {
            fun: 'fun_update_insert',
            title_update_insert: $scope.title_update_insert,
            phone_update_insert: $scope.phone_update_insert,
            id_group_update_insert: $scope.id_group_update_insert
        }
        $http({
            url: local,
            method: 'POST',
            params: Indata
        }).then(function success(response) {
            $scope.state_update_insert = response.data.insert;
            $scope.div_update_insert = true;
            if ($scope.state_update_insert != 0) {
                $scope.status_update_insert = {'true': true};
                var html = '<tr id="tr_update' + $scope.state_update_insert + '"><td class="padding_2" id="title' + $scope.state_update_insert + '">' + title +
                        '</td><td class="padding_2" id="phone' + $scope.state_update_insert + '">' + phone + '</td>' +
                        '<td class="padding_2"><button class="color_blue" ng-click="fun_change()" id="show_update" value="' + $scope.state_update_insert + '">آپدیت</button>' +
                        '</td><td class="padding_2"><button class="color_red" ng-click="fun_delete()" id="delete" value="' + $scope.state_update_insert + '" class="color_red"><b>حذف</b>' +
                        '</button></td></tr>',
                    el = document.getElementById('tbody_update');
                angular.element(el).append($compile(html)($scope))
                $("#title_update_insert").val('')
                $("#phone_update_insert").val('')
                $("#message_update_insert").fadeOut(3000)
            }
            else {
                $scope.status_update_insert = {'false': true};
                $("#message_update_insert").fadeOut(3000)
            }
        }, function error(response) {
        });
    }
    $scope.fun_change = function () {
        $scope.div_update = true;
        document.getElementById("message_update").style.display = "none";
        $(document).on("click", "#show_update", function () {
            var id_ = $(this).val();
            var title = $("#title" + id_).text();
            var phone = $("#phone" + id_).text();
            $("#title_update").val(title);
            $("#phone_update").val(phone);
            $("#id_update").val(id_);
        });
    }
    $scope.fun_delete = function () {
        $(document).on("click", "#delete", function () {
            document.getElementById("message_delete").style.display = "block";
            var id_ = $(this).val();
            var local = "/Update";
            var Indata = {
                fun: 'fun_delete',
                id_dalete: id_
            }
            $http({
                url: local,
                method: 'DELETE',
                params: Indata
            }).then(function success(response) {
                $scope.phone_delete = response.data.delete;
                if ($scope.phone_delete == true) {
                    $scope.phone_delete = {'true': true};
                    $("#message_delete").fadeOut(3000)
                    el = document.getElementById("tr_update" + id_);
                    angular.element(el).remove()
                }
                else {
                    $scope.phone_delete = {'false': true};
                    $("#message_delete").fadeOut(3000)
                }
            }, function error(response) {
            });
        });
    }
    $scope.fun_save_update = function () {
        document.getElementById("message_update").style.display = "block";
        $scope.id_update = $("#id_update").val();
        $scope.title_update = $("#title_update").val();
        $scope.phone_update = $("#phone_update").val();
        var local = "/Update";
        var Indata = {
            fun: 'fun_save_update',
            id_update: $scope.id_update,
            title_update: $scope.title_update,
            phone_update: $scope.phone_update
        }
        $http({
            url: local,
            method: 'POST',
            params: Indata
        }).then(function success(response) {
            $scope.status = response.data.update;
            $scope.div_update = false;
            if ($scope.status == true) {
                $scope.state = {'true': true};
                var title = $("#title" + $scope.id_update).text($scope.title_update);
                var phone = $("#phone" + $scope.id_update).text($scope.phone_update);
                $("#message_update").fadeOut(3000)
            }
            else {
                $scope.state = {'false': true};
                $("#message_update").fadeOut(3000)
            }
        }, function error(response) {
        });
    }
    $scope.fun_change_group = function () {
        $scope.div_update_group = true;
        var name_group = $("#show_update_qroup").text();
        id_group = $scope.name_group.id
        document.getElementById("message_update_group").style.display = "none";
        $("#group_update").val(name_group);
        $("#id_update_group").val(id_group);
    }
    $scope.fun_save_update_group = function () {
        document.getElementById("message_update_group").style.display = "block";
        $scope.id_update_group = $("#id_update_group").val();
        $scope.group_update = $("#group_update").val();
        var local = "/Update";
        var Indata = {
            fun: 'fun_save_update_group',
            id_update_group: $scope.id_update_group,
            group_update: $scope.group_update
        }
        $http({
            url: local,
            method: 'POST',
            params: Indata
        }).then(function success(response) {
            $scope.status_group = response.data.update;
            $scope.div_update_group = false;
            if ($scope.status_group == true) {
                $scope.status_group = {'true': true};
                $("#show_update_qroup").text($scope.group_update);
                $("#selected_group_" + $scope.id_update_group).text($scope.group_update)
                $("#message_update_group").fadeOut(3000)
            }
            else {
                $scope.status_group = {'false': true};
                $("#message_update_group").fadeOut(3000)
            }
        }, function error(response) {
        });
    }
});