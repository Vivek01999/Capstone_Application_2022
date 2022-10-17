function putStatus() {
    $.ajax({
        type: "GET",
        url: "https://api.srv3r.com/toggle/",
        data: {toggle_select: true},
        success: function (result) {
            if (result == 1) {
                $('#customSwitch1').prop('checked', true);
                statusText(1);
            } else {
                $('#customSwitch1').prop('checked', false);
                statusText(0);
            }
            lastUpdated();
        }
    });
}


function onToggle() {
    $('#toggleForm :checkbox').change(function () {
        if (this.checked) {
            //alert('checked');
            updateStatus(1);
            statusText(1);
        } else {
            //alert('NOT checked');
            updateStatus(0);
            statusText(0);
        }
    });
}

function updateStatus(status_val) {
    $.ajax({
        type: "POST",
        url: "https://api.srv3r.com/toggle/",
        data: {toggle_update: true, status: status_val},
        success: function (result) {
            console.log(result);
            lastUpdated();
        }
    });
}

function lastUpdated() {
    $.ajax({
        type: "GET",
        url: "https://api.srv3r.com/toggle/",
        data: {toggle_updated: true},
        success: function (result) {
            document.getElementById("updatedAt").innerText = "Last updated at: " + result;
        }
    });
}

$(document).ready(function () {
    putStatus();//Set button to current status
    onToggle();//Update when toggled
    statusText();//Last updated text
});