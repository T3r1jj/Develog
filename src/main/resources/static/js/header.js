function openTodayNote() {
    window.location.href = "/today/" + new Date().toISOString().split("T")[0];
}

function initializeDatePicker(button) {
    try {
        $(button).datepicker('open');
    } catch (uninitialized) {
        $.ajax({
            url: '/notes',
            type: 'get',
            success: function (response) {
                if (response === "") {
                    return;
                }
                var datePicker = $(button);
                datePicker.datepicker({
                    defaultDate: new Date(),
                    maxDate: new Date(),
                    disableDayFn: function (date) {
                        date.setDate(date.getDate() + 1);
                        return $.inArray(date.toISOString().split("T")[0], response) === -1
                    },
                    onSelect: function (date) {
                        date.setDate(date.getDate() + 1);
                        window.location.href = "/search?date=" + date.toISOString().split("T")[0];
                    },
                    i18n: i18n.calendar
                });
                datePicker.datepicker('open');
            }
        });
    }
}

$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.tooltipped').tooltip();
});