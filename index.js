document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);

    alert("device ready");
}

function onPause()
{
    alert("pause");
}


function onResume()
{
    alert("resume");
}

$(document).on("pagecreate","#nameScreen", onPageCreated);

function onPageCreated() {
    var ractive = new Ractive({
        template: '#username',
    });
}