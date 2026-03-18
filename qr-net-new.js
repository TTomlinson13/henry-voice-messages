let isFormChanged = false;
let qrRequiredFields = null;

var nonCondoStories = [{ id: '', value: 'Please Select Number of Stories' }, {
    id: '3afd1243-475f-11ea-a01e-000d3a7ae61a',
    value: '1'
}, { id: '3c29f87f-475f-11ea-a01e-000d3a7ae61a', value: '1.5' }, {
    id: '4051df24-475f-11ea-a01e-000d3a7ae61a',
    value: '2'
}, { id: '4180dee6-475f-11ea-a01e-000d3a7ae61a', value: '2.5' }, {
    id: '43231c40-475f-11ea-a01e-000d3a7ae61a',
    value: '3'
}, { id: '49d300d2-475f-11ea-a01e-000d3a7ae61a', value: 'Bi-Level' }, {
    id: '4c240c1e-475f-11ea-a01e-000d3a7ae61a',
    value: 'Tri-Level'
}];

// Condo stories based on the table you provided
var condoStories = [{ id: '', value: 'Please Select Number of Stories' }, {
    id: '3afd1243-475f-11ea-a01e-000d3a7ae61a',
    value: '1'
}, { id: '4051df24-475f-11ea-a01e-000d3a7ae61a', value: '2' }, {
    id: '43231c40-475f-11ea-a01e-000d3a7ae61a',
    value: '3'
}, { id: '43e23b42-475f-11ea-a01e-000d3a7ae61a', value: '4' }, {
    id: 'a3259b43-d447-11ef-ba64-00224853ff9b',
    value: '5'
}, { id: 'a32c048e-d447-11ef-ba64-00224853ff9b', value: '6' }, {
    id: 'a32c2840-d447-11ef-ba64-00224853ff9b',
    value: '7'
}, { id: 'a32c4ad5-d447-11ef-ba64-00224853ff9b', value: '8' }, {
    id: 'a32d6358-d447-11ef-ba64-00224853ff9b',
    value: '9'
}, { id: 'a32d858b-d447-11ef-ba64-00224853ff9b', value: '10' }, {
    id: 'a32da61c-d447-11ef-ba64-00224853ff9b',
    value: '11'
}, { id: 'a32dc6e4-d447-11ef-ba64-00224853ff9b', value: '12' }, {
    id: 'a32de5fe-d447-11ef-ba64-00224853ff9b',
    value: '13'
}, { id: 'a32e039c-d447-11ef-ba64-00224853ff9b', value: '14' }, {
    id: 'a32e2388-d447-11ef-ba64-00224853ff9b',
    value: '15'
}, { id: 'a32e424d-d447-11ef-ba64-00224853ff9b', value: '16' }, {
    id: 'a32e61f5-d447-11ef-ba64-00224853ff9b',
    value: '17'
}, { id: 'a32e82bb-d447-11ef-ba64-00224853ff9b', value: '18' }, {
    id: 'a32ea1d9-d447-11ef-ba64-00224853ff9b',
    value: '19'
}, { id: 'a32f5b60-d447-11ef-ba64-00224853ff9b', value: '20' }, {
    id: 'a32f7c44-d447-11ef-ba64-00224853ff9b',
    value: '21'
}, { id: 'a32f9e06-d447-11ef-ba64-00224853ff9b', value: '22' }, {
    id: 'a32fbdf8-d447-11ef-ba64-00224853ff9b',
    value: '23'
}, { id: 'a33052ee-d447-11ef-ba64-00224853ff9b', value: '24' }, {
    id: 'a3307716-d447-11ef-ba64-00224853ff9b',
    value: '25'
}, { id: 'a33099fc-d447-11ef-ba64-00224853ff9b', value: '26' }, {
    id: 'a330b9dc-d447-11ef-ba64-00224853ff9b',
    value: '27'
}, { id: 'a330d64d-d447-11ef-ba64-00224853ff9b', value: '28' }, {
    id: 'a330f40a-d447-11ef-ba64-00224853ff9b',
    value: '29'
}, { id: 'a331167e-d447-11ef-ba64-00224853ff9b', value: '30' }, {
    id: 'a3313660-d447-11ef-ba64-00224853ff9b',
    value: '31'
}, { id: 'a33155db-d447-11ef-ba64-00224853ff9b', value: '32' }, {
    id: 'a33173b3-d447-11ef-ba64-00224853ff9b',
    value: '33'
}, { id: 'a3319114-d447-11ef-ba64-00224853ff9b', value: '34' }, {
    id: 'a331adda-d447-11ef-ba64-00224853ff9b',
    value: '35'
}, { id: 'a331cc02-d447-11ef-ba64-00224853ff9b', value: '36' }, {
    id: 'a331e8da-d447-11ef-ba64-00224853ff9b',
    value: '37'
}, { id: 'a3320641-d447-11ef-ba64-00224853ff9b', value: '38' }, {
    id: 'a33223ce-d447-11ef-ba64-00224853ff9b',
    value: '39'
}, { id: 'a3324223-d447-11ef-ba64-00224853ff9b', value: '40' }, {
    id: 'a332627a-d447-11ef-ba64-00224853ff9b',
    value: '41'
}, { id: 'a3328079-d447-11ef-ba64-00224853ff9b', value: '42' }, {
    id: 'a332a297-d447-11ef-ba64-00224853ff9b',
    value: '43'
}, { id: 'a332bff1-d447-11ef-ba64-00224853ff9b', value: '44' }, {
    id: 'a332de1e-d447-11ef-ba64-00224853ff9b',
    value: '45'
}, { id: 'a332fe2e-d447-11ef-ba64-00224853ff9b', value: '46' }, {
    id: 'a3331f57-d447-11ef-ba64-00224853ff9b',
    value: '47'
}, { id: 'a33343ad-d447-11ef-ba64-00224853ff9b', value: '48' }, {
    id: 'a3336f58-d447-11ef-ba64-00224853ff9b',
    value: '49'
}, { id: 'a3338f38-d447-11ef-ba64-00224853ff9b', value: '50' }, {
    id: 'a333abd7-d447-11ef-ba64-00224853ff9b',
    value: '51'
}, { id: 'a333caee-d447-11ef-ba64-00224853ff9b', value: '52' }, {
    id: 'a333ea69-d447-11ef-ba64-00224853ff9b',
    value: '53'
}, { id: 'a3340be6-d447-11ef-ba64-00224853ff9b', value: '54' }, {
    id: 'a3343291-d447-11ef-ba64-00224853ff9b',
    value: '55'
}, { id: 'a334560f-d447-11ef-ba64-00224853ff9b', value: '56' }, {
    id: 'a3347b3a-d447-11ef-ba64-00224853ff9b',
    value: '57'
}, { id: 'a3349b2a-d447-11ef-ba64-00224853ff9b', value: '58' }, {
    id: 'a334bef3-d447-11ef-ba64-00224853ff9b',
    value: '59'
}, { id: 'a33521a3-d447-11ef-ba64-00224853ff9b', value: '60' }, {
    id: 'a33544c6-d447-11ef-ba64-00224853ff9b',
    value: '61'
}, { id: 'a3356761-d447-11ef-ba64-00224853ff9b', value: '62' }, {
    id: 'a3358fa8-d447-11ef-ba64-00224853ff9b',
    value: '63'
}, { id: 'a335af90-d447-11ef-ba64-00224853ff9b', value: '64' }, {
    id: 'a335ce57-d447-11ef-ba64-00224853ff9b',
    value: '65'
}, { id: 'a335f09f-d447-11ef-ba64-00224853ff9b', value: '66' }, {
    id: 'a33613ff-d447-11ef-ba64-00224853ff9b',
    value: '67'
}, { id: 'a3363d8f-d447-11ef-ba64-00224853ff9b', value: '68' }, {
    id: 'a33663a1-d447-11ef-ba64-00224853ff9b',
    value: '69'
}, { id: 'a3367f8f-d447-11ef-ba64-00224853ff9b', value: '70' }];


function updateFloorOptions(isCondo, curVal) {
    var field = $('#733a95dd-4759-11ea-a01e-000d3a7ae61a'); // Your select element

    // Destroy any existing Select2 instance
    if (field.hasClass('select2-hidden-accessible')) {
        field.select2('destroy');
    }
    // Clear the current options
    field.empty();

    // Populate options based on condo or non-condo
    var stories = isCondo ? condoStories : nonCondoStories;

    // Add options to the select element
    stories.forEach(function (story) {
        if (story.id == curVal) {
            field.append(new Option(story.value, story.id, false, true));
        } else {
            field.append(new Option(story.value, story.id));
        }
    });

    // Reinitialize Select2 after populating options
    field.select2({
        width: '100%', height: '35px'
    });
}


function qrHideLoader() {
    $('.loader').hide();
}

function qrShowLoader(message = null) {
    $('.loader').show();
    if (message !== null) {
        $('#loader-message').html(message);
    } else {
        $('#loader-message').html('');
    }
    setTimeout(qrHideLoader(), 60000);
}

function uncheckNotAllowed(objCheckbox, msg) {
    if (!$(objCheckbox).is(':checked')) {
        $(objCheckbox).prop('checked', true);
        qrDisplayAlert(msg, "error");
    }
}

function emptyOffCanvasPanelQR() {
    var modal_qtpanel = $('#qtpanel');
    modal_qtpanel.find('.offcanvas-header').removeClass('d-flex flex-wrap');
    modal_qtpanel.find('.offcanvas-header').html('<h5 id="qtpanelLabel"></h5><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>');
    modal_qtpanel.find('.offcanvas-body').html('');
}

function launchOffCanvasPanelQR(data, header) {
    emptyOffCanvasPanelQR();
    var modal_qtpanel = $('#qtpanel');
    modal_qtpanel.find('.offcanvas-header>h5').html(header);
    modal_qtpanel.find('.offcanvas-body').html(data);
    modal_qtpanel.offcanvas('show');
    if ($('#qtpanel').css("visibility") === 'visible') {
    } else {
        $(".qtPanelShow").trigger("click");
    }
    $('select').each(function () {
        if (!$(this).hasClass('choiceSelect')) {
            $(this).select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
            });
        }
    })
}

function isQRElementInView(element) {
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
}

function removeQRQueryParamAndUpdateURL(parameterName) {
    var url = window.location.href;
    var urlParts = url.split("?");
    if (urlParts.length >= 2) {
        var prefix = encodeURIComponent(parameterName) + "=";
        var queryParams = urlParts[1].split("&");

        for (var i = queryParams.length - 1; i >= 0; i--) {
            if (queryParams[i].lastIndexOf(prefix, 0) === 0) {
                queryParams.splice(i, 1);
            }
        }

        url = urlParts[0] + (queryParams.length > 0 ? "?" + queryParams.join("&") : "");

        // Update the browser URL without a full page reload
        history.pushState(null, null, url);
    }

    return url;
}

function emptyCenteredModalQR() {
    $('#centeredModalTitle').html('');
    $('#centeredModalBody').html('');
}

function emptyAndCloseCenteredModalQR() {
    $('#centeredModalTitle').html('');
    $('#centeredModalBody').html('');
    $("#centeredModalButton").trigger("click");
}

function hideCenteredModalQR() {
    $('#centeredModal').modal('hide');
}

function showCenteredModalQR() {
    $('#centeredModal').modal('show');
}

function launchCenteredModalQR(data, header, size) {
    emptyCenteredModal();
    if (size) { // Check if size parameter is provided
        if ($('#centeredModal .modal-dialog').hasClass(size)) {
        } else {
            $('#centeredModal .modal-dialog').addClass(size);
        }
    } else if (header == 'Potential Duplicate Lead(s) Found' || header == 'Edit User' || header == 'Edit Carrier List' || header == 'Current Claims Info') {
        if ($('#centeredModal .modal-dialog').hasClass('modal-xl')) {
        } else {
            $('#centeredModal .modal-dialog').addClass('modal-xl');
        }
    } else {
        if ($('#centeredModal .modal-dialog').hasClass('modal-xl')) {
            $('#centeredModal .modal-dialog').removeClass('modal-xl');
        } else {
        }
    }
    $('#centeredModalTitle').html(header);
    $('#centeredModalBody').html(data);
    $('#centeredModal').modal('show');
}

function qrDisplayAlert(message, type) {
    // Set the default delay to 1 second (1000 milliseconds)
    // alertify.set("notifier", "delay", 1000);
    var notificationAlert;
    switch (type) {
        case "success":
            alertify.set("notifier", "position", "top-center");
            notificationAlert = alertify.success(message);
            break;
        case "error":
            alertify.set("notifier", "position", "top-center");
            notificationAlert = alertify.error(message);
            break;
        case "message":
            alertify.set("notifier", "position", "top-center");
            notificationAlert = alertify.message(message);
            break;
        default:
            return true;
    }
    // Set a timeout to close the notification after 1 second (1000 milliseconds)
    setTimeout(function () {
        notificationAlert.dismiss();
    }, 2000);

}

$(document).on('click', '#signIn', function (e) {
    e.preventDefault();
    $("#signIn").prop("disabled", true);
    qrShowLoader();
    var url = "functions/qr_functions.php";
    var user = $('#login-email').val();
    $.ajax({
        type: "POST", url: url, data: 'check-user=' + user, dataType: 'JSON', success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (data.hasCD === 'Yes') {
                    qrHideLoader();
                    var currentHostname = window.location.hostname;
                    var cdUrl = new URL(data.CDURL);
                    var cdHostname = cdUrl.hostname;
                    if (currentHostname !== cdHostname) {
                        qrHideLoader();
                        Swal.fire({
                            title: 'Client Dynamics Subscription Detected',
                            text: 'It was detected that you also have Client Dynamics. For the best user experience, you should login via that portal.',
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonText: 'Go to Portal',
                            cancelButtonText: 'Continue Here'
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                window.location.href = data.CDURL;
                            } else {
                                qrHideLoader();
                                handleLogin(data);
                            }
                        });
                    } else {
                        qrHideLoader();
                        handleLogin(data);
                    }
                } else {
                    handleLogin(data);
                }
            } else if (data && data.status == "Invalid Access") {
                qrHideLoader();
                var status = data.status;
                Swal.fire({
                    title: 'Access Denied!',
                    html: "You do not have access to this Client Dynamics portal, To login to QuoteRUSH Web, please navigate to <a href='https://web.quoterush.com'>https://web.quoterush.com</a>.",
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            } else {
                qrDisplayAlert("There was a problem with your username / password. Please try again, or contact support.", "error")
                qrHideLoader();
                setTimeout(location.reload.bind(location), 3000);
            }
        }
    });
    $("#signIn").prop("disabled", false);
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.sendToVendor', function (event) {
    event.preventDefault();
    var vendor = $(this).attr('data-value');
    var postVar = `sendTo` + $(this).attr('data-value');
    var postId = $(this).attr('data-lead');
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: `${postVar}=${postId}`, success: function (data, result) {
            if (data && data.status === "Got Data") {
                qrDisplayAlert(`This lead has been successfully sent to ${vendor}`, "success");
            } else {
                qrDisplayAlert(`We were unable to send this to ${vendor}, please try again later or contact Support for assistance.`, "error");
            }
        }, error: function (e) {
            qrDisplayAlert(`We were unable to send this to ${vendor}, please try again later or contact Support for assistance.`, "error");
        }
    });
    return false;
});


function handleLogin(data) {
    if (data.multiple == 'Yes') {
        var agency = data.agencies;
        var agencylist = JSON.parse(agency);
        Swal.fire({
            title: 'Select Agency to Login To',
            input: 'select',
            inputOptions: agencylist,
            inputPlaceholder: 'Please Select Agency',
            showCancelButton: true,
            inputValidator: function (value) {
                return new Promise(function (resolve) {
                    if (value !== '') {
                        resolve();
                    } else {
                        resolve('You need to select an Agency');
                    }
                });
            }
        }).then(function (result) {
            if (result.isConfirmed) {
                $('#AgencyId').val(result.value);
                var sAgency = result.value;
                var user = $('#login-email').val();
                var url = "functions/qr_functions.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: 'check-agency-for-cd=' + sAgency + '&check-user-for-cd=' + user,
                    dataType: 'JSON',
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            if (data.hasCD === 'Yes') {
                                var currentHostname = window.location.hostname;
                                var cdUrl = new URL(data.CDURL);
                                var cdHostname = cdUrl.hostname;
                                if (currentHostname !== cdHostname) {
                                    Swal.fire({
                                        title: 'Client Dynamics Subscription Detected',
                                        text: 'It was detected that you also have Client Dynamics. For the best user experience, you should login via that portal.',
                                        icon: 'info',
                                        showCancelButton: true,
                                        confirmButtonText: 'Go to Portal',
                                        cancelButtonText: 'Continue Here'
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            window.location.href = data.CDURL;
                                        } else {
                                            $('#login-new').submit();
                                        }
                                    });
                                } else {
                                    $('#login-new').submit();
                                }
                            } else {
                                $('#login-new').submit();
                            }
                        } else {
                            $('#login-new').submit();
                        }
                    }
                });
            }
        });
    } else {
        $('#AgencyId').val(data.agency);
        $('#login-new').submit();
    }
    qrHideLoader();
}


$(document).on('submit', '#sso-login-new', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    $("#signIn").prop("disabled", true);
    $.ajax({
        type: "POST", url: url, data: $("#sso-login-new").serialize(), success: function (data, result) {
            if (data && data.status == 'Got Data') {
                var urlLocation = GetQRURLParameter('location');
                if (urlLocation == '' || urlLocation == undefined || urlLocation == 'undefined') {
                    window.location.href = 'qr-index.php';
                } else {
                    window.location.href = decodeURIComponent(urlLocation).replace(/^\/+/, '');
                }
            } else {
                window.location.href = 'qr-logout.php';
            }
        }
    });
    return false;
});

$(document).on('submit', '#login-new', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    $("#signIn").prop("disabled", true);
    $.ajax({
        type: "POST", url: url, data: $("#login-new").serialize(), success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (data.Validated == 'No') {
                    // global-ish vars for this dialog
                    var mfaTimerInterval;
                    var mfaTimeLeft = 300; // 5 minutes in seconds

                    Swal.fire({
                        title: "Multi-Factor Authentication",
                        html:
                            '<label class="control-label">Please enter the Code you received</label>' +
                            '<input class="form-control" type="text" id="authCode" />' +
                            '<p/>' +
                            '<input class="form-check-input" type="checkbox" id="rememberMe" />' +
                            '<label class="control-label">Remember Me</label>' +
                            '<p/>' +
                            '<div id="mfa-timer" class="text-danger font-weight-bold"></div>', // <- timer display
                        type: "info",
                        showCancelButton: false,
                        closeOnConfirm: false,
                        confirmButtonText: "Submit",
                        cancelButtonText: "Cancel",
                        showLoaderOnConfirm: true,
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger m-l-10',

                        // start countdown when popup opens
                        didOpen: function () {
                            var popup = Swal.getPopup();
                            var timerEl = popup.querySelector('#mfa-timer');

                            function updateTimer() {
                                var minutes = Math.floor(mfaTimeLeft / 60);
                                var seconds = mfaTimeLeft % 60;
                                timerEl.textContent =
                                    'Time remaining: ' +
                                    minutes + ':' +
                                    (seconds < 10 ? '0' : '') + seconds;
                            }

                            updateTimer(); // initial render

                            mfaTimerInterval = setInterval(function () {
                                mfaTimeLeft--;

                                if (mfaTimeLeft <= 0) {
                                    clearInterval(mfaTimerInterval);
                                    Swal.close(); // close MFA prompt

                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Code Expired',
                                        html: 'Your authentication code has expired. Please request a new code and try again.'
                                    });

                                } else {
                                    updateTimer();
                                }
                            }, 1000);
                        },

                        // make sure we don't leak intervals if dialog closes some other way
                        willClose: function () {
                            if (mfaTimerInterval) {
                                clearInterval(mfaTimerInterval);
                                mfaTimerInterval = null;
                            }
                        },

                        preConfirm: function (givenData) {
                            return new Promise(function (resolve, reject) {
                                var inp = Swal.getPopup().querySelector('#authCode').value;
                                var remember = Swal.getPopup().querySelector('#rememberMe').checked;
                                if (remember == true) {
                                    rem = "Yes";
                                } else {
                                    rem = "No";
                                }
                                var ag = $('#AgencyId').val();
                                var em = $('#login-email').val();
                                $.ajax({
                                    type: "post",
                                    url: "functions/qr_functions.php",
                                    data: 'authCode=' + inp + '&authAgency=' + ag + '&authEmail=' + em + '&Remember=' + rem,
                                }).done(function (response) {
                                    if (response.status === 'Got Data') {
                                        Swal.fire({
                                            type: 'success',
                                            title: 'Correct!',
                                            html: 'Please wait while we re-direct you to your portal.'
                                        });
                                        var urlLocation = GetQRURLParameter('location');
                                        if (urlLocation == '' || urlLocation == undefined || urlLocation == 'undefined') {
                                            window.location.href = 'qr-index.php';
                                        } else {
                                            window.location.href = decodeURIComponent(urlLocation).replace(/^\/+/, '');
                                        }
                                    } else {
                                        Swal.fire({
                                            title: "Multi-Factor Authentication",
                                            input: 'text',
                                            text: "Please try again to enter the code you received in your email.",
                                            type: "error",
                                            showCancelButton: false,
                                            closeOnConfirm: false,
                                            confirmButtonText: "Submit",
                                            cancelButtonText: "Cancel",
                                            showLoaderOnConfirm: true,
                                            confirmButtonClass: 'btn btn-success',
                                            cancelButtonClass: 'btn btn-danger m-l-10',
                                            preConfirm: function (givenData) {
                                                return new Promise(function (resolve, reject) {
                                                    var inp = givenData;
                                                    $.ajax({
                                                        type: "post",
                                                        url: "functions/qr_functions.php",
                                                        data: 'authCode=' + inp + '&authAgency=' + ag + '&authEmail=' + em,
                                                    }).done(function (response) {
                                                        if (response.status === 'Got Data') {
                                                            Swal.fire({
                                                                type: 'success',
                                                                title: 'Correct!',
                                                                html: 'Please wait while we re-direct you to your portal.'
                                                            });
                                                            var urlLocation = GetQRURLParameter('location');
                                                            if (urlLocation == '' || urlLocation == undefined || urlLocation == 'undefined') {
                                                                window.location.href = 'qr-index.php';
                                                            } else {
                                                                window.location.href = decodeURIComponent(urlLocation).replace(/^\/+/, '');
                                                            }
                                                        } else {
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'Authentication Failed',
                                                                html: 'You have input the incorrect code too many times. Please try again.'
                                                            });
                                                            window.location.replace("qr-logout.php");
                                                        }
                                                    })
                                                })
                                            },
                                            allowOutsideClick: false
                                        });
                                    }
                                })
                            })
                        },
                        allowOutsideClick: false
                    });
                }
                if (data.Validated == 'Yes') {
                    var ag = $('#AgencyId').val();
                    var em = $('#login-email').val();
                    var inp = $("#CookieValidator").val();
                    $.ajax({
                        type: "post",
                        url: "functions/qr_functions.php",
                        data: 'authValidator=' + inp + '&authAgency=' + ag + '&authEmail=' + em,
                    }).done(function (response) {
                        if (response.status === 'Got Data') {
                            Swal.fire({
                                type: 'success',
                                title: 'Correct!',
                                html: 'Please wait while we re-direct you to your portal.'
                            });
                            var urlLocation = GetQRURLParameter('location');
                            if (urlLocation == '' || urlLocation == undefined || urlLocation == 'undefined') {
                                window.location.href = 'qr-index.php';
                            } else {
                                window.location.href = decodeURIComponent(urlLocation).replace(/^\/+/, '');
                            }
                        } else {
                            Swal.fire({
                                title: 'Whoops!', text: 'Invalid Login Attempt', icon: 'error', confirmButtonText: 'Ok!'
                            });
                        }
                    })
                }
            } else if (data && data.status == "Invalid Access") {
                var status = data.status;
                Swal.fire({
                    title: 'Access Denied!',
                    text: "You do not have access to this Client Dynamics portal, To login to QuoteRUSH Web, please navigate to https://web.quoterush.com.",
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            } else {
                var status = data.status;
                Swal.fire({
                    title: 'Whoops!', text: status, icon: 'error', confirmButtonText: 'Ok!'
                });
            }
        }

    });
    $("#signIn").prop("disabled", false);
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.qrCarrierSelector', function (e) {
    e.preventDefault();
    var range = $(this).attr('data-value');
    if (range == 'Custom') {
        $('.qrCarrierSelector').removeAttr('checked');
        $(this).attr('checked', true);
        Swal.fire({
            title: 'Please Select a Date Range', html: `
                <label class="control-label" for="startDate">Start Date</label>
                <input type="date" id="startDate" class="form-control">
                <label class="control-label" for="endDate">End Date</label>
                <input type="date" id="endDate" class="form-control">`, focusConfirm: false, preConfirm: () => {
                const startDate = new Date(document.getElementById('startDate').value);
                const endDate = new Date(document.getElementById('endDate').value);
                const oneYearAfterStart = new Date(startDate);
                oneYearAfterStart.setFullYear(startDate.getFullYear() + 1);

                if (endDate > oneYearAfterStart) {
                    Swal.showValidationMessage("The date range must not exceed one year.");
                    return false;
                }

                return document.getElementById('startDate').value + '|' + document.getElementById('endDate').value;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                qrShowLoader("Depending on your selected date range, your dashboard may take an extended period of time to load.");
                var range = result.value;
                var dates = range.split('|');
                var formattedRange = `${dates[0]} - ${dates[1]}`;
                $('#currentFilter').val(range);

                $.ajax({
                    url: 'functions/qr_functions.php',
                    type: "POST",
                    data: 'get-qr-carrier-counters=Custom&startDate=' + dates[0] + '&endDate=' + dates[1],
                    dataType: "json",
                    success: function (data) {
                        if (!data || data.status !== 'Got Data') {
                            Swal.fire('Well, this is awkward...', "We were unable to get that data. Please try again.", 'error');
                            qrHideLoader();
                            return;
                        }
                        $('#total-quotes-stat').html(data.totalQuoteVolume);
                        $('#total-blocked-quotes-stat').html(data.totalBlockedQuotes);
                        $('#total-bindable-quotes-stat').html(data.totalBindableQuotes);
                        qrHideLoader();
                    },
                    error: function () {
                        Swal.fire('Well, this is awkward...', "We were unable to get that data. Please try again.", 'error');
                        qrHideLoader();
                    }
                });

                qrHideLoader();
            }
        });
    } else {
        qrShowLoader("Depending on your selected date range, your dashboard may take an extended period of time to load.");
        $('.qrCarrierSelector').removeAttr('checked');
        $(this).attr('checked', true);
        var idOfSelected = $(this).attr('id');
        var range = $(this).attr('data-value');
        $.ajax({
            url: 'functions/qr_functions.php',
            type: "POST",
            data: 'get-qr-carrier-counters=' + range,
            dataType: "json",
            success: function (data) {
                if (!data || data.status !== 'Got Data') {
                    Swal.fire('Well, this is awkward...', "We were unable to get that data. Please try again.", 'error');
                    qrHideLoader();
                    return;
                }
                $('#total-quotes-stat').html(data.totalQuoteVolume);
                $('#total-blocked-quotes-stat').html(data.totalBlockedQuotes);
                $('#total-bindable-quotes-stat').html(data.totalBindableQuotes);
                qrHideLoader();
            },
            error: function () {
                Swal.fire('Well, this is awkward...', "We were unable to get that data. Please try again.", 'error');
                qrHideLoader();
            }
        });
        $('#currentFilter').val(range);
        var labelText = $('label[for="' + idOfSelected + '"]').text();
        $('#dataset').html(labelText);

        qrHideLoader();
    }
    return false; // avoid to execute the actual submit of the form.
});


function findLabel($field) {
    const id = $field.attr('id');

    if (id) {
        const byFor = $('label[for="' + id + '"]');
        if (byFor.length) return byFor.first();
    }

    const wrappingLabel = $field.closest('label');
    if (wrappingLabel.length) return wrappingLabel.first();

    const container = $field.closest('.form-group, .mb-3, .form-floating, .form-row, .row, .col');
    if (container.length) {
        const labelInContainer = container.find('label').first();
        if (labelInContainer.length) return labelInContainer;
    }

    const prevLabel = $field.prevAll('label').first();
    if (prevLabel.length) return prevLabel;

    return $();
}


$(document).on('click', '.mainTabs', function (event) {

    var ftype = $('#FormType').val();
    if (ftype != '') {
        let reqFieldsUpdate = updateRequiredLeadFields();
    }

    if ($(this).attr('href') == '#runquotes') {
        qrShowLoader("Please wait while we save the lead changes and retrieve carrier information.");
        var form_type_value = document.getElementById('FormType').value;
        if (isFormChanged) {
            var url = "functions/qr_functions.php";
            $.ajax({
                type: "POST",
                url: url,
                dataType: 'JSON',
                data: $('#updLead').serialize(),
                success: function (data, result) {
                    if (data && data.status === "Got Data") {

                    }
                    if (data && data.status !== "Got Data") {
                        qrHideLoader();
                        Swal.fire({
                            title: 'Error!',
                            text: 'We were unable to save this lead, please try again before attempting to run Quotes. Please contact support if this problem persists.',
                            icon: 'error',
                            confirmButtonText: ':('
                        });
                    }
                },
                error: function (request, status, err) {
                    qrHideLoader();
                    Swal.fire({
                        title: 'Error!',
                        text: 'We were unable to save this lead, please try again before attempting to run Quote(s). Please contact support if this problem persists.',
                        icon: 'error',
                        confirmButtonText: ':('
                    });
                    return false;
                }
            });
        }
        var url = "functions/qr_functions.php";
        var lead = $('#Lead_Id').val();
        $('#runquotes').html('');
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'JSON',
            data: 'get-rq-sites=true&leadId=' + lead + '&rqLOB=Home&formType=' + form_type_value,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#runquotes').append(data.data);
                    $('.quote-sites').on('scroll', function () {
                        var window_top = $('.sticky-title').scrollTop();
                        if (window_top > 50) {
                            $('.sticky-h2').addClass('stick');
                        } else {
                            $('.sticky-h2').removeClass('stick');
                        }
                    });
                    $('.select-sites').on('scroll', function () {
                        var window_top = $('.sticky-title').scrollTop();
                        if (window_top > 50) {
                            $('.sticky-h2').addClass('stick');
                        } else {
                            $('.sticky-h2').removeClass('stick');
                        }
                    });
                    $(".rqCarrier").change(function () {
                        qrShowLoader();
                        $('.showselectedcheckbox').show();

                        var html = "<div class='col-12 p-0' data-simplebar='init' style='max-height: 280px;'><ul class='list-group rounded-0'>";
                        $("input[name='rq-carriers[]']:checked").each(function () {
                            searchresult = $(this).val();
                            html += "<li class='list-group-item text-left rounded-0'>" + searchresult + "</li>";
                        });
                        html += "</ul></div>"
                        $('.showselectedcheckbox').html(html);

                        var curETA = $('#rqETA').attr('data-value');
                        if (this.checked) {
                            removed = false;
                            var numSelected = parseInt($('#rq-sites-selected').val()) + 1;
                            $('#rq-sites-selected').val(numSelected);
                            var carrier = $(this).attr('data-value');
                            var curSelection = $('#selected-carriers').val();
                            var newVal = curSelection + carrier + '|';
                            $('#selected-carriers').val(newVal);
                        } else {

                            removed = true;
                            var numSelected = parseInt($('#rq-sites-selected').val()) - 1;
                            $('#rq-sites-selected').val(numSelected);
                            if (parseInt($('#rq-sites-selected').val()) == 0) {
                                $('#rqETA').html('Estimated Time to Complete Quotes - 0 minutes');
                            }
                            var carrier = $(this).attr('data-value');
                            var curSelection = $('#selected-carriers').val();
                            var newVal = curSelection.replace(carrier + '|', '');
                            $('#selected-carriers').val(newVal);
                        }

                        $.ajax({
                            type: "POST",
                            url: url,
                            dataType: 'JSON',
                            data: 'get-rq-eta=' + curETA + '&removed=' + removed + '&rq-sites-selected=' + numSelected,
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {
                                    if (parseInt($('#rq-sites-selected').val()) == 0) {
                                        $('.showselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0 h-100"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
                                        $('#rqETA').html('Estimated Time to Complete Quotes - 0 minutes');
                                        $('#rqETA').attr('data-value', data.ETA);
                                    } else {
                                        $('#rqETA').html(data.data);
                                        $('#rqETA').attr('data-value', numSelected);
                                        $('#rqETA').attr('data-value', data.ETA);
                                    }
                                }
                                if (data && data.status !== "Got Data") {
                                }
                            }
                        });
                        qrHideLoader();
                    });


                    $(".rqAutoCarrier").change(function () {
                        qrShowLoader();
                        $('.autoshowselectedcheckbox').show();
                        var html = "<div class='col-12 p-0' data-simplebar='init' style='max-height: 280px;'><ul class='list-group rounded-0'>";
                        $("input[name='rq-auto-carriers[]']:checked").each(function () {
                            searchresult = $(this).val();
                            html += "<li class='list-group-item text-left rounded-0'>" + searchresult + "</li>";
                        });

                        html += "</ul></div>"
                        $('.autoshowselectedcheckbox').html(html);

                        var curETA = $('#rqAutoETA').attr('data-value');
                        if (this.checked) {
                            removed = false;
                            var numSelected = parseInt($('#rq-auto-sites-selected').val()) + 1;
                            $('#rq-auto-sites-selected').val(numSelected);
                            var carrier = $(this).attr('data-value');
                            var curSelection = $('#selected-auto-carriers').val();
                            var newVal = curSelection + carrier + '|';
                            $('#selected-auto-carriers').val(newVal);
                        } else {
                            removed = true;
                            var numSelected = parseInt($('#rq-auto-sites-selected').val()) - 1;
                            $('#rq-auto-sites-selected').val(numSelected);
                            if (parseInt($('#rq-auto-sites-selected').val()) == 0) {
                                $('.autoshowselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0 h-100"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
                                $('#rqAutoETA').html('Estimated Time to Complete Quotes - 0 minutes');
                            }
                            var carrier = $(this).attr('data-value');
                            var curSelection = $('#selected-auto-carriers').val();
                            var newVal = curSelection.replace(carrier + '|', '');
                            $('#selected-auto-carriers').val(newVal);
                        }
                        $.ajax({
                            type: "POST",
                            url: url,
                            dataType: 'JSON',
                            data: 'get-auto-rq-eta=' + curETA + '&removed=' + removed + '&rq-auto-sites-selected=' + numSelected,
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {

                                    if (parseInt($('#rq-auto-sites-selected').val()) == 0) {
                                        $('#rqAutoETA').html('Estimated Time to Complete Quotes - 0 minutes');
                                        $('#rqAutoETA').attr('data-value', data.ETA);
                                    } else {
                                        $('#rqAutoETA').html(data.data);
                                        $('#rqAutoETA').attr('data-value', data.ETA);
                                    }
                                }
                                if (data && data.status !== "Got Data") {
                                }
                            }
                        });
                        qrHideLoader();
                    });

                    $(".rqFloodCarrier").change(function () {
                        qrShowLoader();
                        $('.floodshowselectedcheckbox').show();
                        var html = "<div class='col-12 p-0' data-simplebar='init' style='max-height: 280px;'><ul class='list-group rounded-0'>";
                        $("input[name='rq-flood-carriers[]']:checked").each(function () {
                            searchresult = $(this).val();
                            html += "<li class='list-group-item text-left rounded-0'>" + searchresult + "</li>";
                        });

                        html += "</ul></div>"
                        $('.floodshowselectedcheckbox').html(html);

                        var curETA = $('#rqFloodETA').attr('data-value');
                        if (this.checked) {
                            removed = false;
                            var numSelected = parseInt($('#rq-flood-sites-selected').val()) + 1;
                            $('#rq-flood-sites-selected').val(numSelected);
                            var carrier = $(this).attr('data-value');
                            var curSelection = $('#selected-flood-carriers').val();
                            var newVal = curSelection + carrier + '|';
                            $('#selected-flood-carriers').val(newVal);
                        } else {
                            removed = true;
                            var numSelected = parseInt($('#rq-flood-sites-selected').val()) - 1;
                            $('#rq-flood-sites-selected').val(numSelected);
                            if (parseInt($('#rq-flood-sites-selected').val()) == 0) {
                                $('.floodshowselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0 h-100"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
                                $('#rqFloodETA').html('Estimated Time to Complete Quotes - 0 minutes');
                            }
                            var carrier = $(this).attr('data-value');
                            var curSelection = $('#selected-flood-carriers').val();
                            var newVal = curSelection.replace(carrier + '|', '');
                            $('#selected-flood-carriers').val(newVal);
                        }
                        $.ajax({
                            type: "POST",
                            url: url,
                            dataType: 'JSON',
                            data: 'get-flood-rq-eta=' + curETA + '&removed=' + removed + '&rq-flood-sites-selected=' + numSelected,
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {

                                    if (parseInt($('#rq-flood-sites-selected').val()) == 0) {
                                        $('#rqFloodETA').html('Estimated Time to Complete Quotes - 0 minutes');
                                        $('#rqFloodETA').attr('data-value', data.ETA);
                                    } else {
                                        $('#rqFloodETA').html(data.data);
                                        $('#rqFloodETA').attr('data-value', data.ETA);
                                    }
                                }
                                if (data && data.status !== "Got Data") {
                                }
                            }
                        });
                        qrHideLoader();
                    });

                    if (data.hasHomeCarrierList == true) {
                        const homeCarrierList = data.homeCarrierList;
                        Object.entries(homeCarrierList).forEach(([carrierId, carrier]) => {
                            $('input[type="checkbox"].rqCarrier[data-value="' + carrier + '"]').prop('checked', true).trigger('change');
                        });
                        $('#addallcarrier').html('Remove Carrier List');
                        $('#flexCheckIndeterminate').prop('checked', true);
                    }
                    if (data.hasAutoCarrierList == true) {
                        const autoCarrierList = data.autoCarrierList;
                        Object.entries(autoCarrierList).forEach(([carrierId, carrier]) => {
                            $('input[type="checkbox"].rqAutoCarrier[data-value="' + carrier + '"]').prop('checked', true).trigger('change');
                        });
                        $('#autoaddallcarrier').html('Remove Carrier List');
                        $('#autoflexCheckIndeterminate').prop('checked', true);
                    }
                    if (data.hasFloodCarrierList == true) {
                        const floodCarrierList = data.floodCarrierList;
                        Object.entries(floodCarrierList).forEach(([carrierId, carrier]) => {
                            $('input[type="checkbox"].rqFloodCarrier[data-value="' + carrier + '"]').prop('checked', true).trigger('change');
                        });
                        $('#floodaddallcarrier').html('Remove Carrier List');
                        $('#floodflexCheckIndeterminate').prop('checked', true);
                    }
                    if (data.otherHomeCarrierLists) {
                        $('#homeCarrierListSelect').select2({
                            theme: "bootstrap-5", width: '100%'
                        });
                        const otherHomeCarrierLists = data.otherHomeCarrierLists;
                        $('#homeCarrierListSelect').change(function () {
                            var selectedValue = $(this).val();
                            if (selectedValue != '') {
                                var carriersList = otherHomeCarrierLists[selectedValue].Carriers;
                                $('.rqCarrier').prop('checked', false);
                                carriersList.forEach(function (carrier) {
                                    $('input[type="checkbox"].rqCarrier[data-value="' + carrier + '"]').prop('checked', true);
                                });
                                $('#addallcarrier').html('Remove Carrier List');
                                $('#flexCheckIndeterminate').prop('checked', true);
                                $(".rqCarrier").trigger('change');
                            }
                        });
                    }

                    if (data.otherAutoCarrierLists) {
                        $('#autoCarrierListSelect').select2({
                            theme: "bootstrap-5", width: '100%'
                        });
                        const otherAutoCarrierLists = data.otherAutoCarrierLists;
                        $('#autoCarrierListSelect').change(function () {
                            var selectedValue = $(this).val();
                            if (selectedValue != '') {
                                var carriersList = otherAutoCarrierLists[selectedValue].Carriers;
                                $('.rqAutoCarrier').prop('checked', false);
                                carriersList.forEach(function (carrier) {
                                    $('input[type="checkbox"].rqAutoCarrier[data-value="' + carrier + '"]').prop('checked', true);
                                });
                                $('#autoaddallcarrier').html('Remove Carrier List');
                                $('#autoflexCheckIndeterminate').prop('checked', true);
                                $(".rqAutoCarrier").trigger('change');
                            }
                        });
                    }

                    if (data.otherFloodCarrierLists) {
                        $('#floodCarrierListSelect').select2({
                            theme: "bootstrap-5", width: '100%'
                        });
                        const otherFloodCarrierLists = data.otherFloodCarrierLists;
                        $('#floodCarrierListSelect').change(function () {
                            var selectedValue = $(this).val();
                            if (selectedValue != '') {
                                var carriersList = otherFloodCarrierLists[selectedValue].Carriers;
                                $('.rqFloodCarrier').prop('checked', false);
                                carriersList.forEach(function (carrier) {
                                    $('input[type="checkbox"].rqFloodCarrier[data-value="' + carrier + '"]').prop('checked', true);
                                });
                                $('#floodaddallcarrier').html('Remove Carrier List');
                                $('#floodflexCheckIndeterminate').prop('checked', true);
                                $(".rqFloodCarrier").trigger('change');
                            }
                        });
                    }

                    qrHideLoader();
                    if (data.hasVB == false) {
                        Swal.fire({
                            title: 'Error!',
                            html: 'In order to run quotes in QuoteRUSH Web you must have a VirtualBOT. Please have your agency admin request this be added to the account by contacting billing@quoterush.com',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Error!',
                        html: 'We just tried to get the sites you could quote with but ran into a problem. Please make sure all of the lead infomation is correct.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    qrHideLoader();
                }
            }
        });
    } else {

    }
});

$(document).on('blur focusout change', '.missingInfo', function (event) {
    if ($(this).val() !== '') {
        $(this).prev('label').removeClass('missingInfo');
        $(this).removeClass('missingInfo').addClass('is-valid');
    } else {
        $(this).prev('label').addClass('missingInfo');
        $(this).removeClass('is-valid').addClass('missingInfo');
    }
});

$(document).on('click', '.newLeadLOBSelector', function (event) {
    if ($(this).hasClass('selected')) {
        var lob = $(this).attr('data-value');
        $(this).removeClass('selected');
        $(this).closest('div').find('.card').addClass('bg-primary').removeClass('bg-success');
        $('input[value="' + lob + '"]').remove();
        if (lob == 'Auto') {
            $('#newLeadLOBError').html('');
        }

    } else {
        $(this).addClass('selected');
        var lob = $(this).attr('data-value');

        $('#new-qr-lead-form').append('<input type="hidden" name="new-qr-lead-lobs[]" value="' + lob + '" />');
        $(this).closest('div').find('.card').addClass('bg-success').removeClass('bg-primary');
        if (lob == 'Home') {
            //placeholder for checking lookup counter
        }
        if (lob == 'Auto') {
            //placeholder for checking auto lookup permissions
            var url = 'functions/qr_functions.php';
            $.ajax({
                type: "POST", url: url, data: 'check-qr-lexisnexis=true', success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        if (data.data != 1) {
                            $('#newLeadLOBError').html('<p class="text-primary">Did you know that we can do automatic lookups to retrieve driver and vehicle information? To enable this please reach out to the Admin in your office!</p>');
                        }
                    }
                    if (data && data.status !== "Got Data") {
                        $('#newLeadLOBError').html('<p class="text-primary">Did you know that we can do automatic lookups to retrieve driver and vehicle information? To enable this please reach out to the Admin in your office!</p>');
                    }
                }
            });

        }
    }
});

$(document).on('change', '#reshopCarrierLimitSel', function (event) {
    if ($(this).val() === "Yes") {
        $('#reshopCarrierLimitDiv').show();
        if ($('#reshopCarrierList').attr('data-select2-id') !== undefined) {
            $('#reshopCarrierList').select2('destroy');
        }
        $('#reshopCarrierList').select2({ theme: "bootstrap-5", width: '100%' });
    } else {
        $('#reshopCarrierLimitDiv').hide();
    }
});

$(document).on('click', '#qr-reshop-bot-href', function (event) {
    qrShowLoader();
    const elements = {
        "#qr-reshop-bot-htiming": "HomeTiming",
        "#qr-reshop-bot-atiming": "AutoTiming",
        "#qr-reshop-bot-ftiming": "FloodTiming",
        "#qr-reshop-bot-limit-by": "LimitBy",
        "#qr-reshop-bot-limit-by-value": "LimitByValue",
        "#qr-reshop-report-interval": "ReportInterval",
        "#qr-reshop-field-trigger": "TriggerOn",
        "#reshopCarrierLimitDiv": "LimitCarriers"
    };
    $.ajax({
        type: "POST", url: url, data: 'get-qr-reshop-settings=true', timeout: 10000, success: function (data) {
            if (data && data.status === "Got Data") {
                for (const [key, value] of Object.entries(elements)) {
                    if (value === "LimitCarriers") {
                        if (data[value] === "") {
                            $("#reshopCarrierLimitRow").remove();
                        } else {
                            $(key).html(data[value]);
                        }
                    } else {
                        if ($(key).length > 0) {
                            $(key).val(data[value]).trigger('change');
                        }
                    }
                }
                if ($('#reshopError').length > 0) {
                    $('#reshopError').remove();
                }
                $('#qr-reshop-bot-settings').show();
                $('#qr-reshop-bot-settings select').select2({
                    theme: "bootstrap-5", width: '100%'
                });
                if ($('#reshopCarrierList').length > 0) {
                    $('#reshopCarrierLimitSel').val('Yes').trigger('change');
                }
            } else {
                if ($('#reshopError').length <= 0) {
                    $('#qr-reshop-bot-settings').before('<h4 id="reshopError" class="text-center">We could not retrieve your current ReShopBOT Settings, please click this tab again to try and load the settings, or contact Support for assistance.</h4>');
                }
                $('#qr-reshop-bot-settings').hide();
            }
        }, error: function () {
            if ($('#reshopError').length <= 0) {
                $('#qr-reshop-bot-settings').before('<h4 id="reshopError" class="text-center">We could not retrieve your current ReShopBOT Settings, please click this tab again to try and load the settings, or contact Support for assistance.</h4>');
            }
            $('#qr-reshop-bot-settings').hide();
        }, timeout: function () {
            if ($('#reshopError').length <= 0) {
                $('#qr-reshop-bot-settings').before('<h4 id="reshopError" class="text-center">We could not retrieve your current ReShopBOT Settings, please click this tab again to try and load the settings, or contact Support for assistance.</h4>');
            }
            $('#qr-reshop-bot-settings').hide();
        }, complete: function () {
            qrHideLoader();
        }
    });
});

$(document).on('change', '#qr-reshop-bot-limit-by', function (e) {
    e.preventDefault();
    var selectedVal = $(this).val(); // Get the selected option's text
    if (selectedVal != '') {
        $('#limitByValue').show();
        $('#qr-reshop-bot-limit-by-value').attr('required', true);
    } else {
        $('#limitByValue').hide();
        $('#qr-reshop-bot-limit-by-value').removeAttr('required');
    }
    return false;

});


$(document).on('change', '#b5491be7-4759-11ea-a01e-000d3a7ae61a', function () {
    var selectedValueText = $(this).find('option:selected').text(); // Get the selected option's text

    if (selectedValueText === 'Gable') {
        // Update the class of #b5491be7-4759-11ea-a01e-000d3a7ae61a-div
        $('#b5491be7-4759-11ea-a01e-000d3a7ae61a-div')
            .removeClass('col-md-6 col-lg-4 mb-3')
            .addClass('col-md-3 col-lg-2 mb-3');

        // Append the #hipPercentage-div if it doesn't already exist
        if ($('#hipPercentage-div').length === 0) {
            $('#b5491be7-4759-11ea-a01e-000d3a7ae61a-div').after(`
                <div class="col-lg-2 mb-3 col-md-3 col-sm-12 col-xs-12" id="hipPercentage-div">
                    <label class="control-label" for="hipPercentage">Hip Percent</label>
                    <select name="hipPercentage" id="hipPercentage" class="form-select" searchable="Search here.." tabindex="0" aria-hidden="false">
                        <option value="">Select an Option</option>
                        <option value="N/A">N/A</option>
                        <option value="70%">70%</option>
                        <option value="75%">75%</option>
                        <option value="80%">80%</option>
                        <option value="85%">85%</option>
                    </select>
                </div>
            `);

            $('#hipPercentage').select2({
                theme: "bootstrap-5", width: '100%'
            });

        }
    } else {
        if ($('#hipPercentage-div').length > 0) {
            $('#hipPercentage-div').remove();
        }
        $('#b5491be7-4759-11ea-a01e-000d3a7ae61a-div')
            .removeClass('col-md-3 col-lg-2 mb-3')
            .addClass('col-md-6 col-lg-4 mb-3');
    }
});

$(document).on('click', '#viewQRLeadButton', function (e) {
    e.preventDefault();
    const loadTab = new URLSearchParams(window.location.search).get('loadTab');
    if (!loadTab) {
        qrShowLoader();
    }
    isFormChanged = false;
    const val = $(this).attr('data-value');
    let viewLeadButton = $(this);
    $.ajax({
        url: "functions/qr_functions.php", type: "POST", data: `get-qr-lead-edit=${val}`, beforeSend: function () {
            $(".loader-div").fadeIn();
        }, success: function (data, result) {
            const { status, existingPermits, leadInfoHeader, rceGridList, data: lead_info } = data;
            if (!loadTab) {
                qrHideLoader();
            }
            if (status != "Got Data") {
                Swal.fire('Well, this is awkward...', "Something went wrong looking for the lead info! Please contact support if this persists.", 'error');
                return;
            }

            $('#qr-lead-info-row').html(lead_info);
            $("#leadInfoHeader").html(leadInfoHeader);
            const ft = $('#FormType').val();
            if (ft == 'HO-4: Renters Policy') {
                $('#45c179fe-4762-11ea-a01e-000d3a7ae61a-div').hide();
                $('#4ba4acf4-4762-11ea-a01e-000d3a7ae61a-div').hide();
                $('#4cf7497f-7349-11ea-a48e-000d3a7ae61a-div').hide();
                $('#4cf74fc1-7349-11ea-a48e-000d3a7ae61a-div').hide();
                $('#56c19d6c-4762-11ea-a01e-000d3a7ae61a-div').hide();
            }

            if (ft == 'HO-6: Condo Owners Policy') {
                $('#4ba4acf4-4762-11ea-a01e-000d3a7ae61a-div').hide();
                $('#4cf7497f-7349-11ea-a48e-000d3a7ae61a-div').hide();
                $('#56c19d6c-4762-11ea-a01e-000d3a7ae61a-div').hide();
            }

            if (rceGridList) {
                const { Grid } = gridjs;
                $('#current-rces-table').html('');
                new Grid({
                    columns: ['Carrier', 'RCE', 'RCE Date', {
                        name: 'Id', hidden: true
                    }], pagination: {
                        limit: 10
                    }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.rceGridList, style: {
                        tr: {
                            'min-width': 'auto'
                        }, th: {
                            'white-space': 'nowrap',

                        }, td: {
                            'min-width': 'auto'
                        }
                    }
                }).render(document.getElementById('current-rces-table'));
            }

            if (existingPermits == true) {
                $('#permits-info-row').html('');
                $('#permits-info-row').html('<div id="permits-table"></div>');
                const { Grid } = gridjs;
                new Grid({
                    columns: [{
                        name: 'Id', hidden: true
                    }, 'Permit Number', 'Description', 'Type', 'Project Name', 'Effective Date', 'Job Value', 'Status', 'Business Name', 'Homeowner Name', {
                        name: 'Added', hidden: true
                    }], pagination: {
                        limit: 10
                    }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.permits,
                }).render(document.getElementById('permits-table'));
            }

            const currIndustry = $('#75959cb3-46df-11ea-ac96-000d3a7ae61a').val();
            const currOccupation = $('#7aa383d6-46df-11ea-ac96-000d3a7ae61a').val();
            if (currIndustry != '' && currOccupation == '') {
                $('#75959cb3-46df-11ea-ac96-000d3a7ae61a').trigger('change');
            }

            $('#updLead select').select2();
            if ($('#misInternational').is(':checked')) {
                $('#18005ee9-46f9-11ea-a01e-000d3a7ae61a').select2('destroy');
                $('#18005ee9-46f9-11ea-a01e-000d3a7ae61a-div').hide();
                $('#1c8baa79-46f9-11ea-a01e-000d3a7ae61a-div').hide();
                $('#mProvince-div').show();
                $('#mCountry-div').show();
            }

            $("#updLead").on('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });

            const LOB = GetURLParameter('summaryLOB');
            if (LOB != undefined && LOB != '') {
                $('#Home').trigger('click');
            }

            $(function () {
                const form = document.getElementById('updLead'); // Get the specific form by its ID
                if (!form)  // Check if the form exists
                    return;

                // Attach event listeners to the form's elements
                const formElements = form.elements;
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].addEventListener('input', setFormChangedFlag); // For text inputs
                    formElements[i].addEventListener('change', setFormChangedFlag); // For checkboxes, radios, and selects
                }

                $('select').on('change.select2', function () {
                    setFormChangedFlag();
                });
            });

            // Function to set the flag when a form element changes
            var setFormChangedFlag = function () {
                if (isFormChanged === false) {
                    isFormChanged = true;
                    if (!$('#saveLeadInfo').hasClass('pulse')) {
                        $('#saveLeadInfo').addClass('pulse');
                    }
                }
            };

            if ($('#overview-quotes-table-home').length > 0) {
                const lead = GetURLParameter("Lead");
                const days = $("#daysprint").val();
                $('#overview-quotes-table-home').DataTable({
                    "destroy": true, "processing": true, "serverSide": true, "responsive": true, "ajax": {
                        "url": "qr-hq-data-grid-v2.php", "type": "GET", "data": function (d) {
                            d.lead = lead; // Assuming 'val' is already defined
                            d.days = days; // Assuming 'days' is already defined
                        }
                    }, columnDefs: [{ targets: 1, responsivePriority: 1 }, // Highest priority, last to be hidden
                    { targets: 2, responsivePriority: 2 }], "columns": [{ "data": "Id" }, {
                        "data": "Carrier", "render": function (data, type, row) {
                            // Using CarrierURL to generate link for the Carrier column
                            return data ? `<a href="${row.CarrierURL}" target="_blank" class='btn btn-primary waves-effect waves-light btn-sm'>${data} <i class='fa fa-arrow-up-right-from-square'></i></a>` : data;
                        }
                    }, { "data": "Description" }, { "data": "Premium" }, {
                        "data": "QuoteDate", "type": "date"
                    }, {
                        "data": "Property", "orderable": false, "visible": false
                    }, {
                        "data": "Actions", "orderable": false, "render": function (data, type, row) {
                            return `<div class="btn-group"><button title="View Quote Messages" class="btn btn-sm btn-success viewHomeQuoteMessages" data-value="${row.Id}"><i class="fa fa-eye font-size-14"></i></button>
                        <button title="Edit Quote" class="btn btn-sm btn-primary editQRQuote" data-lob="Home" data-value="${row.Id}"><i class="mdi mdi-pencil font-size-14"></i></button>
                        <button title="Delete Quote" class="btn btn-sm btn-danger deleteHomeQuote" data-value="${row.Id}"><i class="mdi mdi-delete font-size-14"></i></button></div>`;
                        }, "orderable": false
                    }, {
                        "data": "CarrierURL", "visible": false // Ensure the URL is hidden in the table
                    }], "order": [[4, "desc"]], rowCallback: function (row, data) {
                        const html = String(data.Description || '');
                        row.classList.remove('row-qWindOnly', 'row-qWindExcluded', 'row-qRiskIneligible', 'row-qWindExcludedAndIneligible', 'row-qCDReshop', 'row-qReShopBOT');

                        if (html.includes('qWindOnly')) row.classList.add('row-qWindOnly');
                        if (html.includes('qWindExcluded')) row.classList.add('row-qWindExcluded');
                        if (html.includes('qRiskIneligible')) row.classList.add('row-qRiskIneligible');
                        if (html.includes('qWindExcludedAndIneligible')) row.classList.add('row-qWindExcludedAndIneligible');
                        if (html.includes('qCDReshop')) row.classList.add('row-qCDReshop');
                        if (html.includes('qReShopBOT')) row.classList.add('row-qReShopBOT');
                    }
                });
            }

            $(document).on('click', '#saveLeadInfo', function () {
                // Implement saving logic here
                isFormChanged = false;
                if ($('#saveLeadInfo').hasClass('pulse')) {
                    $('#saveLeadInfo').removeClass('pulse');
                }
            });

            if ($('#92caf366-4759-11ea-a01e-000d3a7ae61a').val() != '' && $('#92caf366-4759-11ea-a01e-000d3a7ae61a').val() == '74450a91-475f-11ea-a01e-000d3a7ae61a') {
                $('#749d08d6-7c50-11ef-90aa-6045bd7d2a4f-div').show();
                $('#84fb9390-7c50-11ef-90aa-6045bd7d2a4f-div').show();
            } else {
                $('#749d08d6-7c50-11ef-90aa-6045bd7d2a4f').val('').trigger('change');
                $('#749d08d6-7c50-11ef-90aa-6045bd7d2a4f-div').hide();
                $('#84fb9390-7c50-11ef-90aa-6045bd7d2a4f').val('').trigger('change');
                $('#84fb9390-7c50-11ef-90aa-6045bd7d2a4f-div').hide();
            }
            // Event to prompt the user before leaving the page if the form has been changed
            const entity = $('#4d2d38bd-46df-11ea-ac96-000d3a7ae61a').val();
            if (entity == 'eb4a9013-46e1-11ea-ac96-000d3a7ae61a') {
                $('#010a4bc1-fc7a-11eb-9f95-000d3a7ae61a-div').hide();
            } else {
                $('#010a4bc1-fc7a-11eb-9f95-000d3a7ae61a-div').show();
            }

            const current_stories = $('#733a95dd-4759-11ea-a01e-000d3a7ae61a').val();
            if (['0ff61bef-475f-11ea-a01e-000d3a7ae61a', '11fdeacc-475f-11ea-a01e-000d3a7ae61a'].includes($('#64ec3f94-4759-11ea-a01e-000d3a7ae61a').val())) {
                updateFloorOptions(true, current_stories); // Condo or Apartment, update with 1-70 floors
                $('label[for="733a95dd-4759-11ea-a01e-000d3a7ae61a"]').text('Stories (Bldg)');
                $('#724c4172-302f-11f0-a5a3-000d3ae5ae41-div').show();
            } else {
                updateFloorOptions(false, current_stories); // Neither Condo nor Apartment, update with predefined stories
                $('label[for="733a95dd-4759-11ea-a01e-000d3a7ae61a"]').text('Stories');
                $('#724c4172-302f-11f0-a5a3-000d3ae5ae41-div').hide();
            }

            const structures_with_units_in_building_number = ['11fdeacc-475f-11ea-a01e-000d3a7ae61a', '0ff61bef-475f-11ea-a01e-000d3a7ae61a', 'fe77fde9-475e-11ea-a01e-000d3a7ae61a', 'f9c3abc0-475e-11ea-a01e-000d3a7ae61a', 'f118befb-475e-11ea-a01e-000d3a7ae61a', 'edeaa2bd-475e-11ea-a01e-000d3a7ae61a'];
            if (structures_with_units_in_building_number.includes($('#64ec3f94-4759-11ea-a01e-000d3a7ae61a').val())) {
                $('#84bea54d-4759-11ea-a01e-000d3a7ae61a-div').show();
            } else {
                $('#84bea54d-4759-11ea-a01e-000d3a7ae61a-div').hide();
            }

            $("#daysprint").trigger("change");

            function ensureApplicableIfNotNewlyPurchased() {
                const new_purchase = $('#c73276e7-4758-11ea-a01e-000d3a7ae61a').select2('data')[0].text;
                const currently_insured_element = $('#7aee18cc-4762-11ea-a01e-000d3a7ae61a');
                const currently_insured = currently_insured_element.select2('data')[0].text;

                currently_insured_element.find('option:contains(N/A)').prop('disabled', new_purchase !== 'Yes');
                if (new_purchase !== 'Yes' && currently_insured === 'N/A') {
                    launchCenteredModalQR(`<div style="font-size: 1.5vw; text-align: center;">
                                                <div class="p-4" style="font-size: .7vw; text-align: center;">
                                                    You need to reselect an option for Currently Insured, as 'N/A 'is not a valid option when the property is not a new purchase.
                                                </div>
                                                <button class="btn btn-success my-1" id="na_unset_confirm" style="font-size: .7vw;">Ok</button>
                                            </div>`, 'Currently Insured Cannot be N/A');

                    $('#na_unset_confirm').on('click', function () {
                        emptyAndCloseCenteredModalQR();
                        $('#home-info-tab')[0].click();
                        $('.nav.nav-pills > .nav-link.rounded-0.p-2').eq(6)[0].click();

                        setTimeout(() => {
                            document.getElementById('7aee18cc-4762-11ea-a01e-000d3a7ae61a').parentElement.scrollIntoView();
                        }, 500);

                        $('#7aee18cc-4762-11ea-a01e-000d3a7ae61a').next().addClass('pulse');
                        $('#7aee18cc-4762-11ea-a01e-000d3a7ae61a').parent().addClass('pulse');

                        setTimeout(() => {
                            $('#7aee18cc-4762-11ea-a01e-000d3a7ae61a').parent().removeClass('pulse');
                        }, 5000);

                        setTimeout(() => {
                            $('#7aee18cc-4762-11ea-a01e-000d3a7ae61a').next().removeClass('pulse');
                        }, 10000);
                    });

                    currently_insured_element.val('');
                }

                currently_insured_element
                    .find('option:contains(N/A)')
                    .text(new_purchase === 'No' ? 'N/A (Only For New Purchase)' : 'N/A');

                currently_insured_element.select2();
                currently_insured_element.trigger('change.select2');
            }

            // When new purchase is toggled, enable or disable N/A option from Currently Insured as appropriate
            $(document).on('change', '#c73276e7-4758-11ea-a01e-000d3a7ae61a', function () {
                ensureApplicableIfNotNewlyPurchased();
            });

            ensureApplicableIfNotNewlyPurchased();

            $.ajax({
                type: 'POST',
                url: 'functions/qr_functions.php',
                data: { getConditionalFields: true },
                dataType: 'json',
                success: function (response) {
                    if (response.status === 'Got Data' && Array.isArray(response.data)) {
                        initializeConditionalLogic(response.data); // Call the logic function
                    } else {
                    }
                },
                error: function (xhr, status, error) {
                }
            });

            function initializeConditionalLogic(data) {
                // Ensure data is an array and contains valid items
                if (!Array.isArray(data) || data.length === 0) {
                    return;
                }

                data.forEach(function (field) {
                    // Check if the required properties exist in the field object
                    if (!field.FieldId || !field.ConditionalField_Id || !field.ConditionalField_Value) {
                        return;
                    }

                    const sectionId = `#${field.FieldId}-div`;
                    const conditionalFieldId = `#${field.ConditionalField_Id}`;

                    // Check if the section exists before trying to hide it
                    if ($(sectionId).length === 0) {
                    } else {
                        $(sectionId).hide(); // Hide the section
                    }

                    // Check if the conditional field exists before binding the event
                    if ($(conditionalFieldId).length === 0) {
                    } else {
                        let cValue = $(conditionalFieldId).val(); // Get the value of the changed field

                        // Ensure the target section exists before toggling visibility
                        if ($(sectionId).length === 0) {
                            return;
                        }

                        // Show or hide the section based on the condition
                        if (cValue === field.ConditionalField_Value) {
                            $(sectionId).show(); // Unhide the section if the value matches
                        }
                        $(document).on("change", conditionalFieldId, function () {
                            const currentValue = $(this).val(); // Get the value of the changed field

                            // Ensure the target section exists before toggling visibility
                            if ($(sectionId).length === 0) {
                                return;
                            }

                            // Show or hide the section based on the condition
                            if (currentValue === field.ConditionalField_Value) {
                                $(sectionId).show(); // Unhide the section if the value matches
                            } else {
                                $(sectionId).hide(); // Hide the section if the value does not match
                            }
                        });
                    }
                });
            }

            loadGoogleMapsApi(() => {
                initializeAutocomplete('updLead', 'f3e38f9a-46f8-11ea-a01e-000d3a7ae61a');
                initializeAutocomplete('updLead', '911de265-4758-11ea-a01e-000d3a7ae61a');
                initializeAutocomplete('updLead', '6605ccec-d22a-11ec-a789-000d3a7ae61a');
            });

            if (loadTab) {
                const tabEl =
                    document.getElementById(loadTab) ||
                    document.getElementById(`${loadTab.toLowerCase()}tablink`);

                if (tabEl) {
                    bootstrap.Tab.getOrCreateInstance(tabEl).show();
                    $('#' + loadTab).trigger('click');
                }



                const u = new URL(window.location.href);
                u.searchParams.delete('loadTab');
                history.replaceState(null, '', u);
                qrHideLoader();
            }
            $("#viewQRLeadButton").replaceWith(`<button class="btn btn-sm btn-primary" id="back-button" onclick="leadBackBtnclick()"><i class="fas fa-arrow-left fa-lg" aria-hidden="true"></i></button>`);
        }
    });

    window.addEventListener('beforeunload', function (e) {
        if (isFormChanged) {
            const confirmationMessage = 'You have unsaved changes on the form. Please click cancel and the green Save button to the right to save changes. Are you sure you want to leave?';
            e.preventDefault();  // Standard way to prevent navigation
            e.returnValue = confirmationMessage;  // For older browsers
            return confirmationMessage; // Required for some browsers
        }
    });
});

function validatePhone(phone) {
    var regex = /^([0-9()\s\-]{0,24})+$/i;
    return regex.test(phone);
}

$(document).on('input', '.phoneFormat', function (event) {
    var phone = $(this).val();
    var isValid = validatePhone(phone);
    if (isValid || phone == "") {
        $("#nextWFBtn").prop("disabled", false);

        $("#error-ag-cont-phone").css("display", "none");
        $(this).css({
            border: "",
        });
        var cleaned = ('' + phone).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            $(this).val('(' + match[1] + ') ' + match[2] + '-' + match[3]);
        }
        return null;
    } else {
        $("#error-ag-cont-phone").css("display", "block");
        $(this).css({
            border: "3px solid red",
        });
        $("#nextWFBtn").prop("disabled", true);
    }
});

$(document).on('change', '#4cf7497f-7349-11ea-a48e-000d3a7ae61a', function (e) {
    var selectedItem = $(this).find(":selected").text();
    //alert(selectedItem);
    var covA = $("#45c179fe-4762-11ea-a01e-000d3a7ae61a").val();
    var covBtxt = $("#4ba4acf4-4762-11ea-a01e-000d3a7ae61a");
    if (selectedItem == "0% - Excluded") {
        covBtxt.val(0);
    } else {
        var perc = selectedItem.replace('%', '');
        var percentage = parseInt(perc) / 100;
        var calc = percentage * parseFloat(covA); // Ensure covA is treated as a number
        var roundedCalc = Math.round(calc); // Use Math.round to round to the nearest whole number
        covBtxt.val(roundedCalc);
    }
});

$(document).on('change', '#4cf74fc1-7349-11ea-a48e-000d3a7ae61a', function (e) {
    var selectedItem = $(this).find(":selected").text();
    //alert(selectedItem);
    var covA = $("#45c179fe-4762-11ea-a01e-000d3a7ae61a").val();
    var covCtxt = $("#51026c3d-4762-11ea-a01e-000d3a7ae61a");
    if (selectedItem == "0% - Excluded") {
        covCtxt.val(0);
    } else {
        var perc = selectedItem.replace('%', '');
        var percentage = parseInt(perc) / 100;
        var calc = percentage * parseFloat(covA); // Ensure covA is treated as a number
        var roundedCalc = Math.round(calc); // Use Math.round to round to the nearest whole number
        covCtxt.val(roundedCalc);
    }
});

$(document).on('change', '#4cf75074-7349-11ea-a48e-000d3a7ae61a', function (e) {
    var selectedItem = $(this).find(":selected").text();
    //alert(selectedItem);
    var covA = $("#45c179fe-4762-11ea-a01e-000d3a7ae61a").val();
    var covDtxt = $("#56c19d6c-4762-11ea-a01e-000d3a7ae61a");
    if (selectedItem == "0% - Excluded") {
        covDtxt.val(0);
    } else {
        var perc = selectedItem.replace('%', '');
        var percentage = parseInt(perc) / 100;
        var calc = percentage * parseFloat(covA); // Ensure covA is treated as a number
        var roundedCalc = Math.round(calc); // Use Math.round to round to the nearest whole number
        covDtxt.val(roundedCalc);
    }
});


$(document).on('focus', '#b7060d42-6d6e-11ea-80ca-000d3a7ae61a', function (event) {
    const selectedIndustry = $('#b7060ca6-6d6e-11ea-80ca-000d3a7ae61a option:selected').attr('value');
    const occupFieldId = 'b7060d42-6d6e-11ea-80ca-000d3a7ae61a';
    updateOccupationListByIndustry(selectedIndustry, occupFieldId);
    if (selectedIndustry == '') {
        //$('#7aa383d6-46df-11ea-ac96-000d3a7ae61a-default').prop('disabled', true);
        $("#b7060d42-6d6e-11ea-80ca-000d3a7ae61a").empty();
        $("#b7060d42-6d6e-11ea-80ca-000d3a7ae61a").append('<option value="">Select an Industry First</option>');
    }
});
$(document).on('focus', '#7aa383d6-46df-11ea-ac96-000d3a7ae61a', function (event) {
    var selectedIndustry = $('#75959cb3-46df-11ea-ac96-000d3a7ae61a').val();
    if (selectedIndustry == '') {
        //$('#7aa383d6-46df-11ea-ac96-000d3a7ae61a-default').prop('disabled', true);
        $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").empty();
        $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").append('<option value="">Select an Industry First</option>');
    }
});
$(document).on('focus', '#793e18f4-46fc-11ea-a01e-000d3a7ae61a', function (event) {
    var selectedIndustry = $('#7441fb75-46fc-11ea-a01e-000d3a7ae61a').val();
    if (selectedIndustry == '') {
        //$('#7aa383d6-46df-11ea-ac96-000d3a7ae61a-default').prop('disabled', true);
        $("#793e18f4-46fc-11ea-a01e-000d3a7ae61a").empty();
        $("#793e18f4-46fc-11ea-a01e-000d3a7ae61a").append('<option value="">Select an Industry First</option>');

    }
});

$(document).on('click', '#client-info-tab', function (event) {

    var selectedIndustry = $('#75959cb3-46df-11ea-ac96-000d3a7ae61a').val();
    if (selectedIndustry == '') {
        //$('#7aa383d6-46df-11ea-ac96-000d3a7ae61a-default').prop('disabled', true);
        $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").empty();
        $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").append('<option value="">Select an Occupation</option>');

    }
    $('select option')
        .filter(function () {
            return $.trim(this.text).length == 0;
        })
        .remove();
});
$(document).on('click', 'a', function (event) {
    var href = $(this).attr('data-value');
    if (href = "applicant-info") {
        var selectedIndustry = $('#75959cb3-46df-11ea-ac96-000d3a7ae61a').val();
        if (selectedIndustry == '') {
            //$('#7aa383d6-46df-11ea-ac96-000d3a7ae61a-default').prop('disabled', true);
            $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").empty();
            $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").append('<option value="">Select an Occupation</option>');
        }
        $('select option')
            .filter(function () {
                return $.trim(this.text).length == 0;
            })
            .remove();
    }
    if (href = 'co-applicant-info') {
        var selectedIndustry = $('#7441fb75-46fc-11ea-a01e-000d3a7ae61a').val();
        if (selectedIndustry == '') {
            //$('#7aa383d6-46df-11ea-ac96-000d3a7ae61a-default').prop('disabled', true);
            $("#793e18f4-46fc-11ea-a01e-000d3a7ae61a").empty();
            $("#793e18f4-46fc-11ea-a01e-000d3a7ae61a").append('<option value="">Select an Occupation</option>');

        }
    }
});

$(document).on('click', 'a', function (event) {
    var href = $(this).attr('href');
    if (href = "#client") {
        var selectedIndustry = $('#75959cb3-46df-11ea-ac96-000d3a7ae61a').val();
        if (selectedIndustry == '') {
            //$('#7aa383d6-46df-11ea-ac96-000d3a7ae61a-default').prop('disabled', true);
            $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").empty();
            $("#7aa383d6-46df-11ea-ac96-000d3a7ae61a").append('<option value="">Select an Occupation</option>');
        }
    }

});

$(document).on('keypress', '#p_sqft,#p_yearbuilt', function (e) {
    var regex = new RegExp("^[0-9-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
});


$(document).on('keypress input paste', '#02b12493-46f9-11ea-a01e-000d3a7ae61a,#9f99f8b8-4758-11ea-a01e-000d3a7ae61a,#p_zipcode', function (e) {
    var regex = new RegExp("^[A-Za-z0-9\\s-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
});

$(document).on('input', '#p_yearbuilt', function (e) {
    $(this).attr('maxlength', '4');
});

$(document).on('keyup', '#911de265-4758-11ea-a01e-000d3a7ae61a', function (event) {
    var getPropDataButton = $('#getPropertyData');
    if (getPropDataButton.hasClass('btn-success')) {
        $('#getPropertyData').removeClass('btn-success');
        $('#getPropertyData').addClass('theme-btn');
    }
});
$(document).on('keyup', '#99f5a70e-4758-11ea-a01e-000d3a7ae61a', function (event) {
    var getPropDataButton = $('#getPropertyData');
    if (getPropDataButton.hasClass('btn-success')) {
        $('#getPropertyData').removeClass('btn-success');
        $('#getPropertyData').addClass('theme-btn');
    }
});
$(document).on('keyup', '#9f99f8b8-4758-11ea-a01e-000d3a7ae61a', function (event) {
    var getPropDataButton = $('#getPropertyData');
    if (getPropDataButton.hasClass('btn-success')) {
        $('#getPropertyData').removeClass('btn-success');
        $('#getPropertyData').addClass('theme-btn');
    }
});
$(document).on('keyup', '#a37eb604-4758-11ea-a01e-000d3a7ae61a', function (event) {
    var getPropDataButton = $('#getPropertyData');
    if (getPropDataButton.hasClass('btn-success')) {
        $('#getPropertyData').removeClass('btn-success');
        $('#getPropertyData').addClass('theme-btn');
    }
});
$(document).on('change', '#b219896b-4758-11ea-a01e-000d3a7ae61a', function (event) {
    var getPropDataButton = $('#getPropertyData');
    if (getPropDataButton.hasClass('btn-success')) {
        $('#getPropertyData').removeClass('btn-success');
        $('#getPropertyData').addClass('theme-btn');
    }
});
$(document).on('keyup', '#b6f058a4-4758-11ea-a01e-000d3a7ae61a', function (event) {
    var getPropDataButton = $('#getPropertyData');
    if (getPropDataButton.hasClass('btn-success')) {
        $('#getPropertyData').removeClass('btn-success');
        $('#getPropertyData').addClass('theme-btn');
    }
});

$(document).on('change', '#FormType', function (event) {
    var val = $(this).val();
    if (val != '') {
        $('#property-info-section').show();
    } else {
        $('#property-info-section').show();
    }
});

$(document).on('change', '#FormType', function (event) {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        html: 'Are you sure you want to change the Form Type for this property? <br><br><b>Note:</b> Defaults will be applied if you confirm the change which may cause previous changes you made to be lost.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            $("#FormType").val(sessionStorage.getItem("optval"));
        }


    })

});

$(document).on('change', '#4d2d38bd-46df-11ea-ac96-000d3a7ae61a', function (event) {
    event.preventDefault();
    var val = $('#4d2d38bd-46df-11ea-ac96-000d3a7ae61a').val();
    if (val == 'eb4a9013-46e1-11ea-ac96-000d3a7ae61a') {
        $('#010a4bc1-fc7a-11eb-9f95-000d3a7ae61a-div').hide();
    } else {
        $('#010a4bc1-fc7a-11eb-9f95-000d3a7ae61a-div').show();
    }
});

function check_uncheck_checkbox(isChecked) {
    if (isChecked) {
        $('#addallcarrier').html('Remove All');
        $('.showselectedcheckbox').show();
        $('input[name="rq-carriers[]"]').each(function () {
            this.checked = true;
        })
            .get();
        var html = "<div class='col-12 p-0' data-simplebar='init' style='max-height: 280px;'><ul class='list-group rounded-0'>";
        var separator = '';
        var total = 0;
        $("input[name='rq-carriers[]']:checked").each(function () {
            total++;
            searchresult = $(this).val();
            separator += searchresult + "|";
            html += "<li class='list-group-item text-left rounded-0'>" + searchresult + "</li>";
        });
        html += "</ul></div>"

        separator = separator.substring(0, separator.length - 1);
        $('.showselectedcheckbox').html(html);
        $('#selected-carriers').val(separator);
        $('#rq-sites-selected').val(total);
        var curETA = $('#rqETA').attr('data-value');
        var numSelected = parseInt($('#rq-sites-selected').val());
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'JSON',
            data: 'get-rq-eta=' + curETA + '&removed=false&rq-sites-selected=' + numSelected,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    if (parseInt($('#rq-sites-selected').val()) == 0) {
                        $('.showselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0 h-100"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
                        $('#rqETA').html('Estimated Time to Complete Quotes - 0 minutes');
                        $('#rqETA').attr('data-value', data.ETA);
                    } else {
                        $('#rqETA').html(data.data);
                        $('#rqETA').attr('data-value', data.ETA);
                    }
                }
                if (data && data.status !== "Got Data") {
                }
            }
        });

    } else {
        $('#addallcarrier').html('Add All');
        $('.showselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
        $('input[name="rq-carriers[]"]').each(function () {
            this.checked = false;
        });
        $('#selected-carriers').val('');
        $('#rq-sites-selected').val('0');
        $('#rqETA').html('Estimated Time to Complete Quotes - 0 minutes');
        $('#rqETA').attr('data-value', "0");
    }
}

$(document).on('click', '#addDogBreed', function (event) {
    event.preventDefault();
    var breed = $('#dogbreed-selector').val();
    var b = document.getElementById('dogbreed-bites');
    if (breed == '') {
        Swal.fire({
            title: 'Whoops!', html: 'To add a dog you must select a breed.', icon: 'error', confirmButtonText: 'Ok!'
        });
    } else {
        if (b.checked == true) {
            var dog = '<li class="llist-group-item d-flex align-items-center">' + breed + ' (BITE HISTORY)<input type="hidden" name="dogbreeds[]" value="' + breed + ' (BITE HISTORY)"><a class="btn-floating btn-sm btn-danger m-2 remBreed"><i class="fas fa-trash-alt"></i></a></li>';
        } else {
            var dog = '<li class="llist-group-item d-flex align-items-center">' + breed + '<input type="hidden" name="dogbreeds[]" value="' + breed + '"><a class="btn-floating btn-sm btn-danger m-2 remBreed"><i class="fas fa-trash-alt"></i></a></li>';
        }
        $('#dogbreed-list').append(dog);
    }
    return false;
});

$(document).on('click', '.remBreed', function (event) {
    $(this).closest("li").remove();
});

function autocheck_uncheck_checkbox(isChecked) {
    if (isChecked) {
        $('#autoaddallcarrier').html('Remove All');
        $('.autoshowselectedcheckbox').show();
        $('input[name="rq-auto-carriers[]"]').each(function () {
            this.checked = true;
        })
            .get();
        var html = "<div class='col-12 p-0' data-simplebar='init' style='max-height: 280px;'><ul class='list-group rounded-0'>";
        var separator = '';
        var total = 0;
        $("input[name='rq-auto-carriers[]']:checked").each(function () {
            total++;
            searchresult = $(this).val();
            separator += searchresult + "|";
            html += "<li class='list-group-item text-left rounded-0'>" + searchresult + "</li>";
        });
        html += "</ul></div>"
        separator = separator.substring(0, separator.length - 1);
        $('#rq-auto-sites-selected').val(total);
        var curETA = $('#rqAutoETA').attr('data-value');
        var numSelected = parseInt($('#rq-auto-sites-selected').val());
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'JSON',
            data: 'get-auto-rq-eta=' + curETA + '&removed=false&rq-auto-sites-selected=' + numSelected,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    if (parseInt($('#rq-auto-sites-selected').val()) == 0) {
                        $('.showselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0 h-100"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
                        $('#rqAutoETA').html('Estimated Time to Complete Quotes - 0 minutes');
                        $('#rqAutoETA').attr('data-value', data.ETA);
                    } else {
                        $('#rqAutoETA').html(data.data);
                        $('#rqAutoETA').attr('data-value', data.ETA);
                    }
                }
                if (data && data.status !== "Got Data") {
                }
            }
        });
        $('.autoshowselectedcheckbox').html(html);
        $('#selected-auto-carriers').val(separator)

    } else {
        $('#autoaddallcarrier').html('Add All');
        $('.autoshowselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
        $('input[name="rq-auto-carriers[]"]').each(function () {
            this.checked = false;
        });
        $('#selected-auto-carriers').val('');
        $('#rq-auto-sites-selected').val('0');
        $('#rqAutoETA').html('Estimated Time to Complete Quotes - 0 minutes');
        $('#rqAutoETA').attr('data-value', "0");
    }
}

function floodcheck_uncheck_checkbox(isChecked) {
    if (isChecked) {
        $('#floodaddallcarrier').html('Remove All');
        $('.floodshowselectedcheckbox').show();
        $('input[name="rq-flood-carriers[]"]').each(function () {
            this.checked = true;
        })
            .get();
        var html = "<div class='col-12 p-0' data-simplebar='init' style='max-height: 280px;'><ul class='list-group rounded-0'>";
        var separator = '';
        var total = 0;
        $("input[name='rq-flood-carriers[]']:checked").each(function () {
            total++;
            searchresult = $(this).val();
            separator += searchresult + "|";
            html += "<li class='list-group-item text-left rounded-0'>" + searchresult + "</li>";
        });
        html += "</ul></div>"
        separator = separator.substring(0, separator.length - 1);
        $('#rq-flood-sites-selected').val(total);
        var curETA = $('#rqFloodETA').attr('data-value');
        var numSelected = parseInt($('#rq-flood-sites-selected').val());
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'JSON',
            data: 'get-flood-rq-eta=' + curETA + '&removed=false&rq-flood-sites-selected=' + numSelected,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    if (parseInt($('#rq-flood-sites-selected').val()) == 0) {
                        $('.showselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0 h-100"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
                        $('#rqFloodETA').html('Estimated Time to Complete Quotes - 0 minutes');
                        $('#rqFloodETA').attr('data-value', data.ETA);
                    } else {
                        $('#rqFloodETA').html(data.data);
                        $('#rqFloodETA').attr('data-value', data.ETA);
                    }
                }
                if (data && data.status !== "Got Data") {
                }
            }
        });
        $('.floodshowselectedcheckbox').html(html);
        $('#selected-flood-carriers').val(separator)

    } else {
        $('#floodaddallcarrier').html('Add All');
        $('.floodshowselectedcheckbox').html('<div class="col-12 p-0" data-simplebar="init" style="max-height: 280px;"><ul class="list-group rounded-0"><li class="list-group-item text-left rounded-0"> No Carrier Selected </li></ul></div>');
        $('input[name="rq-flood-carriers[]"]').each(function () {
            this.checked = false;
        });
        $('#selected-flood-carriers').val('');
        $('#rq-flood-sites-selected').val('0');
        $('#rqFloodETA').html('Estimated Time to Complete Quotes - 0 minutes');
        $('#rqFloodETA').attr('data-value', "0");
    }
}

$(document).on('click', '#saveLeadInfo', function (event) {
    event.preventDefault();
    qrShowLoader();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, dataType: 'JSON', data: $('#updLead').serialize(), success: function (data, result) {
            qrHideLoader("Please wait while we save the Lead changes.");
            if (data && data.status === "Got Data") {
                Swal.fire({
                    title: 'Success!', text: 'Lead Updated Successfully.', icon: 'success', confirmButtonText: 'Ok!'
                });
                if ($('#save-apply-defaults').length > 0) {
                    setTimeout(location.reload.bind(location), 2000);
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'We were unable to update that Lead. Please contact support if this problem persists.',
                    icon: 'error',
                    confirmButtonText: ':('
                });
            }
        }, error: function (request, status, err) {
            qrHideLoader();
            Swal.fire({
                title: 'Error!',
                text: 'We were unable to save this lead, please try again before attempting to run Quote(s). Please contact support if this problem persists.',
                icon: 'error',
                confirmButtonText: ':('
            });
            return false;
        }
    });
});


$(document).on('click', '.editQRUser, .reactivateQRUser, .sub-agency-editQRUser, .sub-agency-reactivateQRUser', function (event) {
    event.preventDefault();
    qrShowLoader();
    let dataParam;
    const userId = $(this).attr('data-value');
    let agencyId;
    if ($(this).hasClass('editQRUser')) {
        dataParam = 'edit-qr-user=' + userId;
        agencyId = $("#upd-qr-client-qrid").val();
    } else if ($(this).hasClass('reactivateQRUser')) {
        dataParam = 'reactivate-qr-user=' + userId;
        agencyId = $("#upd-qr-client-qrid").val();
    } else if ($(this).hasClass('sub-agency-editQRUser')) {
        agencyId = $("#Sub-QR-Agency-Id").val();
        dataParam = 'edit-sub-agency-qr-user=' + userId + '&sub-agencyId=' + agencyId;
    } else if ($(this).hasClass('sub-agency-reactivateQRUser')) {
        agencyId = $("#Sub-QR-Agency-Id").val();
        dataParam = 'reactivate-sub-agency-qr-user=' + userId + '&sub-agencyId=' + agencyId;
    }
    $.ajax({
        type: "POST",
        url: "functions/qr_functions.php",
        dataType: 'JSON',
        data: dataParam,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                qrHideLoader();
                launchCenteredModalQR(data.data, 'Edit User');

                $(function () {
                    var isGood = false;
                    $(document).on('keyup', '#usr_mng_pass', function (event) {
                        var pswd = $("#usr_mng_pass").val();

                        if (pswd.length < 8) {
                            $("#length").removeClass("valid fa fa-check").addClass("invalid fa fa-close");
                            isGood = false;
                        } else {
                            $("#length").removeClass("invalid fa fa-close").addClass("valid fa fa-check");
                            isGood = true;
                        }

                        if (pswd.match(/[A-z]/)) {
                            $("#letter").removeClass("invalid fa fa-close").addClass("valid fa fa-check");
                            isGood = true;
                        } else {
                            $("#letter").removeClass("valid fa fa-check").addClass("invalid fa fa-close");
                            isGood = false;
                        }

                        if (pswd.match(/[A-Z]/)) {
                            $("#capital").removeClass("invalid fa fa-close").addClass("valid fa fa-check");
                            isGood = true;
                        } else {
                            $("#capital").removeClass("valid fa fa-check").addClass("invalid fa fa-close");
                            isGood = false;
                        }

                        if (pswd.match(/\d/)) {
                            $("#number").removeClass("invalid fa fa-close").addClass("valid fa fa-check");
                            isGood = true;
                        } else {
                            $("#number").removeClass("valid fa fa-check").addClass("invalid fa fa-close");
                            isGood = false;
                        }
                        if (isGood == false) {
                            $("#psswd_info").show();
                            $('#usr_mng_pass').trigger('focus');
                        } else {
                            $("#psswd_info").hide();
                        }
                    });
                });
            }
            if (data && data.status !== "Got Data") {
                qrHideLoader();
                qrDisplayAlert("Whoops! We were unable to get the information for that user. Please try again!", "error");
            }
        }
    });
});


$(document).on('click', '#duplicateQRLead', function (event) {
    event.preventDefault();
    new swal({
        title: 'Duplicate Lead', html: `<h5>Please complete the fields below.</h5>
        <div>
            <div class="col-md-12 mb-2">
                <label class="control-label" for="duplicate-lead-fname">First Name</label>
                <input class="form-control" type="text" value="" id="duplicate-lead-fname">
            </div>
            <div class="col-md-12 mb-2">
                <label class="control-label" for="duplicate-lead-fname">Middle Name</label>
                <input class="form-control" type="text" value="" id="duplicate-lead-mname">
            </div>
            <div class="col-md-12 mb-2">
                <label class="control-label" for="duplicate-lead-fname">Last Name</label>
                <input class="form-control" type="text" value="" id="duplicate-lead-lname">
            </div>
            </div>
    `, focusConfirm: false, preConfirm: () => {
            if (document.getElementById('duplicate-lead-fname').value != '' && document.getElementById('duplicate-lead-fname').value != '') {
                qrShowLoader("Please wait while we generate a duplicate Lead.");
                var dfname = document.getElementById('duplicate-lead-fname').value;
                var dmname = document.getElementById('duplicate-lead-mname').value;
                var dlname = document.getElementById('duplicate-lead-lname').value;
                $('#updLead').append('<input type="hidden" id="duplicate-qr-lead" name="duplicate-qr-lead" value="true" />');
                $('#updLead').append('<input type="hidden" id="duplicate-qr-lead-fname" name="duplicate-qr-lead-fname" value="' + dfname + '" />');
                $('#updLead').append('<input type="hidden" id="duplicate-qr-lead-mname" name="duplicate-qr-lead-mname" value="' + dmname + '" />');
                $('#updLead').append('<input type="hidden" id="duplicate-qr-lead-lname" name="duplicate-qr-lead-lname" value="' + dlname + '" />');
                var url = "functions/qr_functions.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: 'JSON',
                    data: $('#updLead').serialize(),
                    success: function (data, result) {
                        if (data && data.status === "Got Data" && data.duplicatedLead != '' && data.duplicatedLead != 'undefined') {
                            qrHideLoader();
                            Swal.fire({
                                title: 'Success!',
                                text: 'Lead Duplicated Successfully. Opening that lead in a few seconds.',
                                icon: 'success',
                                confirmButtonText: 'Ok!'
                            });
                            setTimeout(window.location = 'qr-lead.php?Lead=' + data.duplicatedLead, 3000);
                        }
                        if (data && data.status !== "Got Data") {
                            qrHideLoader();
                            $('#duplicate-qr-lead').remove();
                            Swal.fire({
                                title: 'Error!',
                                text: 'We were unable to duplicate this lead. Please contact support if this problem persists.',
                                icon: 'error',
                                confirmButtonText: ':('
                            });
                        }
                    },
                    error: function (request, status, err) {
                        qrHideLoader();
                        Swal.fire({
                            title: 'Error!',
                            text: 'We were unable to duplicate this Lead, please try again or contact Support if this problem persists.',
                            icon: 'error',
                            confirmButtonText: ':('
                        });
                        return false;
                    }
                });
            } else {
                Swal.fire('Okay!', "You need to input a First and Last name for the duplicate lead.", 'error')
            }
        }
    });
});

$(document).on('click', '.enterAdminMode', function (event) {
    event.preventDefault();

    qrShowLoader();
    const val = $("#adminPass").val();

    $.ajax({
        type: "POST",
        url: "functions/qr_functions.php",
        dataType: 'JSON',
        data: `validateAdminCreds=${encodeURIComponent(val)}`,
        success: function (data, result) {
            const { status } = data;

            if (status != "Got Data") {
                qrHideLoader();

                Swal.fire({
                    title: 'Error!',
                    text: 'We were unable to verify your admin credentials. Please try again.',
                    icon: 'error',
                    confirmButtonText: ':('
                });

                $(".passFields").hide();
                qrDisplayAlert("Invalid Password.Please try again!", "error");

                return;
            }

            qrHideLoader();
            $('.showPassFields').html("You are logged in as admin");
            $('.showPassFields').attr('disabled', true);
            $(".passFields").hide();
            $(".addNewEntry").attr('disabled', false);
            $(".editEntry").attr('disabled', false);
            $("#selectUser").attr('disabled', false);
        }
    });
});

$(document).on('click', '.addGarage', function (event) {
    event.preventDefault();
    var ld = $('#Lead_Id').val();
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: 'add-garage=' + ld, success: function (data, result) {
            if (data && data.status === "Got Data") {
                var modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text("Add Garage");

                modal_qtpanel.find('.offcanvas-body').html(data.data);
                $('#qtpanel').offcanvas('show');
                $('#addGarageType,#addGarageCapacity').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                });
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to get the form to add a garage for this lead! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }
    });
    return false;
});

function removeGarage(type) {
    return (type > 0) ? "<button type='button' title='Remove' data-value='" + type + "' class='btn btn-outline-danger delGarage'><i class='fas fa-trash-alt'></i></button>" : "<button type='button' title='Remove' data-value='" + type + "' class='btn btn-outline-danger delGarage'><i class='fas fa-trash-alt'></i></button>";
}

$(document).on('submit', '#addGarageForm', function (e) {

    var form = $("#addGarageForm");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        e.preventDefault();
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: $('#addGarageForm').serialize(), dataType: 'JSON',

            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    tData = data.list;
                    const { Grid, html, h } = gridjs;
                    $('#current-garages').html('');
                    const currentGarrage = new Grid({
                        columns: ['Type', 'Capacity', {
                            name: 'Remove',
                            formatter: (_, row) => html(`<div role='group' class='custom-btn-group text-nowrap'> <a href='javascript:;'  class='btn btn-outline-danger delGarage' data-value=${row.cells[2].data}><i class='fas fa-trash-alt'></i></a></div>`)
                        },], pagination: {
                            limit: 10
                        }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: tData,
                    }).render(document.getElementById('current-garages'));
                    currentGarrage
                        .updateConfig({
                            data: tData,
                        })
                        .forceRender();
                    setTimeout(() => {
                    }, 1000);
                    Swal.fire({
                        title: 'Success!', text: 'Garage added successfully!', icon: 'success', confirmButtonText: 'Ok!'
                    });
                    var modal_qtpanel = $('#qtpanel');
                    modal_qtpanel.find('.offcanvas-header>h5').text("");
                    modal_qtpanel.find('.offcanvas-body').html('');
                    $('#qtpanel').offcanvas('hide');


                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to get the form to add a garage for this lead! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});

$(document).on('click', '.delGarage', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');
    var lid = $('#Lead_Id').val();
    //var row = $(this).closest('tr');

    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this Garage, it is not recoverable?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var url = 'functions/qr_functions.php';
            $.ajax({
                type: "POST", url: url, data: 'delGarageId=' + val + '&delGarageLead=' + lid, dataType: 'JSON',

                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        tData = data.list;
                        const { Grid, html, h } = gridjs;
                        $('#current-garages').html('');
                        const currentGarrage = new Grid({
                            columns: ['Type', 'Capacity', {
                                name: 'Remove',
                                formatter: (_, row) => html(`<div role='group' class='custom-btn-group text-nowrap'> <a href='javascript:;'  class='btn btn-outline-danger delGarage' data-value=${row.cells[2].data}><i class='fas fa-trash-alt'></i></a></div>`)
                            },], pagination: {
                                limit: 10
                            }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: tData,
                        }).render(document.getElementById('current-garages'));
                        currentGarrage
                            .updateConfig({
                                data: tData,
                            })
                            .forceRender();
                        setTimeout(() => {
                        }, 1000);
                        Swal.fire({
                            title: 'Success!', text: 'Garage deleted.', icon: 'success', confirmButtonText: 'Ok!'
                        });
                        row.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to remove that garage! Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Try again!'
                        });
                    }
                }
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) {


        }


    })

});

$(document).on('click', '.addPorch', function (event) {
    event.preventDefault();
    var ld = $('#Lead_Id').val();
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: 'add-porch=' + ld, success: function (data, result) {
            if (data && data.status === "Got Data") {
                var modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text("Add Porch");
                modal_qtpanel.find('.offcanvas-body').html(data.data);
                $('#qtpanel').offcanvas('show');
                $('select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                });
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to get the form to add a porch for this lead! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }
    });
});

$(document).on('keyup', '#addPorchCapacity', function (event) {
    var capacity = $(this).val();
    var capacity = capacity.trim();
    if (capacity == '' || capacity == 'undefined') {
        $('#addPorchButton').prop('disabled', true);
        $('#addPorchButton').css('opacity', '0.4');
    } else {
        $('#addPorchButton').prop('disabled', false);
        $('#addPorchButton').css('opacity', '1');
    }
})


$(document).on('change', '#autoFillDriverFrom', function (event) {
    event.preventDefault();
    if ($(this).val() != '') {
        qrDisplayAlert("Please wait...", "info");
        $("#addDriverForm .select").each(function () {
            $(this).select2('destroy');
        });
        if ($(this).val() == 'Applicant') {
            var prefix = $('#4f128e56-46df-11ea-ac96-000d3a7ae61a option:selected').text();
            var appF = $('#5171ff30-46df-11ea-ac96-000d3a7ae61a').val();
            var appM = $('#545de4fa-46df-11ea-ac96-000d3a7ae61a').val();
            var appL = $('#5951a671-46df-11ea-ac96-000d3a7ae61a').val();
            var suffix = $('#5ea31c18-46df-11ea-ac96-000d3a7ae61a option:selected').text();
            var maritalStatus = $('#6f38cd5e-46df-11ea-ac96-000d3a7ae61a option:selected').text();
            var dob = $('#658ad114-46df-11ea-ac96-000d3a7ae61a').val();
            var gender = $('#6a2a1c50-46df-11ea-ac96-000d3a7ae61a option:selected').text();
            var industry = $('#75959cb3-46df-11ea-ac96-000d3a7ae61a option:selected').text();
            var occupation = $('#7aa383d6-46df-11ea-ac96-000d3a7ae61a option:selected').text();
            var relationship = 'Insured'

        } else if ($(this).val() == 'Co-Applicant') {
            var prefix = $('#59564e8d-46fa-11ea-a01e-000d3a7ae61a option:selected').text();
            var appF = $('#80d2d433-46fb-11ea-a01e-000d3a7ae61a').val();
            var appM = $('#89fbef52-46fb-11ea-a01e-000d3a7ae61a').val();
            var appL = $('#bbb6d2f1-46fb-11ea-a01e-000d3a7ae61a').val();
            var suffix = $('#28b42dcf-46fc-11ea-a01e-000d3a7ae61a option:selected').text();
            var relationship = $('#4b08ecf6-46fc-11ea-a01e-000d3a7ae61a option:selected').text();
            var maritalStatus = $('#687420ee-46fc-11ea-a01e-000d3a7ae61a option:selected').text();
            var dob = $('#53a73023-46fc-11ea-a01e-000d3a7ae61a').val();
            var gender = $('#6057b45f-46fc-11ea-a01e-000d3a7ae61a option:selected').text();
            var industry = $('#7441fb75-46fc-11ea-a01e-000d3a7ae61a option:selected').text();
            var occupation = $('#793e18f4-46fc-11ea-a01e-000d3a7ae61a option:selected').text();
        }
        if (relationship != '' && relationship != 'Select an Option') {
            $("#addDriverForm #b70600da-6d6e-11ea-80ca-000d3a7ae61a option").each(function () {
                if ($(this).html() == relationship) {
                    var optId = $(this).attr('value');
                    $("#addDriverForm #b70600da-6d6e-11ea-80ca-000d3a7ae61a").val(optId).trigger('change');
                }
            });
        }
        if (prefix != '' && prefix != 'Select an Option') {
            $("#addDriverForm #b70606bd-6d6e-11ea-80ca-000d3a7ae61a option").each(function () {
                if ($(this).html() == prefix) {
                    var optId = $(this).attr('value');
                    $("#addDriverForm #b70606bd-6d6e-11ea-80ca-000d3a7ae61a").val(optId).trigger('change');
                }
            });
        }
        if (suffix != '' && suffix != 'Select an Option') {
            $("#addDriverForm #b70609d6-6d6e-11ea-80ca-000d3a7ae61a option").each(function () {
                if ($(this).html() == suffix) {
                    var optId = $(this).attr('value');
                    $("#addDriverForm #b70609d6-6d6e-11ea-80ca-000d3a7ae61aa").val(optId).trigger('change');
                }
            });
        }
        if (maritalStatus != '' && maritalStatus != 'Select an Option') {
            $("#addDriverForm #b7060a66-6d6e-11ea-80ca-000d3a7ae61a option").each(function () {
                if ($(this).html() == maritalStatus) {
                    var optId = $(this).attr('value');
                    $("#addDriverForm #b7060a66-6d6e-11ea-80ca-000d3a7ae61a").val(optId).trigger('change');
                }
            });
        }
        if (gender != '' && gender != 'Select an Option') {
            $("#addDriverForm #b7060c1e-6d6e-11ea-80ca-000d3a7ae61a option").each(function () {
                if ($(this).html() == gender) {
                    var optId = $(this).attr('value');
                    $("#addDriverForm #b7060c1e-6d6e-11ea-80ca-000d3a7ae61a").val(optId).trigger('change');
                }
            });
        }
        if (industry != '' && industry != 'Select an Option') {
            $("#addDriverForm #b7060ca6-6d6e-11ea-80ca-000d3a7ae61a option").each(function () {
                if ($(this).html() == industry) {
                    var optId = $(this).attr('value');
                    $("#addDriverForm #b7060ca6-6d6e-11ea-80ca-000d3a7ae61a").val(optId).trigger('change');
                }
            });
        }
        if (industry != '' && industry != 'Select an Option') {
            setTimeout(function () {
                if (occupation != '' && occupation != 'Select an Option') {
                    $("#addDriverForm #b7060d42-6d6e-11ea-80ca-000d3a7ae61a option").each(function () {
                        if ($(this).html() == occupation) {
                            var optId = $(this).attr('value');
                            $("#addDriverForm #b7060d42-6d6e-11ea-80ca-000d3a7ae61a").val(optId).trigger('change');
                        }
                    });
                }
            }, 2000);
        }
        if (appF != '') {
            $('#b70607f1-6d6e-11ea-80ca-000d3a7ae61a').val(appF);
        }
        if (appM != '') {
            $('#b706089a-6d6e-11ea-80ca-000d3a7ae61a').val(appM);
        }
        if (appL != '') {
            $('#b7060941-6d6e-11ea-80ca-000d3a7ae61a').val(appL);
        }
        if (dob != '') {
            $('#b7060b8f-6d6e-11ea-80ca-000d3a7ae61a').val(dob);
        }

        $("#addDriverForm .select").each(function () {
            $(this).select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
            });
        });
    }
});


$(document).on('change', '#addPorchType', function (event) {
    var addPorchType = $('#addPorchType').val();
    var addPorchCapacity = $('#addPorchCapacity').val();
    if (addPorchType && addPorchCapacity) {
        $('#addPorchButton').prop('disabled', false);
        $('#addPorchButton').css('opacity', '1');
    } else {
        $('#addPorchButton').prop('disabled', true);
        $('#addPorchButton').css('opacity', '0.4');
    }
});

$(document).on('click', '#addPorchCapacity', function (event) {
    var capacity = $(this).val();
    var capacity = capacity.trim();
    if (capacity == '' || capacity == 'undefined') {
        $('#addPorchButton').prop('disabled', true);
        $('#addPorchButton').css('opacity', '0.4');
    } else {
        $('#addPorchButton').prop('disabled', false);
        $('#addPorchButton').css('opacity', '1');
    }
})

$(document).on('click', '#addPorchButton', function (event) {
    var addPorchCapacity = $("#addPorchCapacity").val();
    var addPorchType = $("#addPorchType").val();
    if (addPorchCapacity == '' || addPorchCapacity == 'undefined' || addPorchType == '' || addPorchType == 'undefined') {
        if (addPorchCapacity == '' || addPorchCapacity == 'undefined') {
            $("#addPorchCapacity").css("border", "2px solid red");
        }
        if (addPorchType == '' || addPorchType == 'undefined') {
            // $("#addPorchType").css("border", "2px solid red");
            $("#select2-addPorchType-container").parent().addClass('borderRed');

        }
        $('#addPorchButton').prop('disabled', true);
        $('#addPorchButton').css('opacity', '0.4');
    } else {
        $("#addPorchCapacity").css("border", "1px solid #ced4da");
        $("#select2-addPorchType-container").parent().removeClass('borderRed');
        //  $("#addPorchType").css("border", "1px solid #ced4da");
        $('#addPorchButton').prop('disabled', false);
        $('#addPorchButton').css('opacity', '1');
        event.preventDefault();
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: $('#addPorchForm').serialize(), success: function (data, result) {
                if (data && data.status === "Got Data") {
                    var ptype = data.ptype;
                    var psft = data.psft;
                    var porch = data.porch;
                    var table = $("#current-porches");
                    var firstTd = $("td:first", table);
                    var secondTd = firstTd.next();
                    if (secondTd.text() == "None Found") {
                        $("#current-porches tr:eq(1)").remove();
                    }
                    $('#current-porches tr:last').after('<tr><td>' + ptype + '</td><td>' + psft + '</td><td><button class="btn btn-sm btn-danger delPorch" data-value="' + porch + '" type="submit"><i class="far fa-trash-alt"></i></button></tr>');
                    Swal.fire({
                        title: 'Success!', text: 'Porch added successfully!', icon: 'success', confirmButtonText: 'Ok!'
                    });
                    var modal_qtpanel = $('#qtpanel');
                    modal_qtpanel.find('.offcanvas-header>h5').text("");
                    modal_qtpanel.find('.offcanvas-body').html('');
                    $('#qtpanel').offcanvas('hide');
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to add a porch for this lead! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
    }
});

$(document).on('click', '.delPorch', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');
    var lid = $('#Lead_Id').val();
    var row = $(this).closest('tr');

    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this Porch/Deck/Patio, it is not recoverable?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var url = 'functions/qr_functions.php';
            $.ajax({
                type: "POST",
                url: url,
                data: 'delPorchId=' + val + '&delPorchLead=' + lid,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Porch/Deck/Patio deleted.',
                            icon: 'success',
                            confirmButtonText: 'Ok!'
                        });
                        row.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to remove that Porch/Deck/Patio! Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {


        }


    })

});


$(document).on('click', '#checkForPropertyPermits', function (e) {
    var pid = $(this).attr('data-value');
    var lastChecked = $(this).attr('data-last-checked');
    if (lastChecked == 'Never') {
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: 'checkForPropertyPermits=' + pid, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    if (data.permitsFound == false) {
                        Swal.fire({
                            title: 'We Checked!',
                            text: 'No permits were found for this property.',
                            icon: 'info',
                            confirmButtonText: 'Try again!'
                        });
                    } else {
                        Swal.fire({
                            title: 'We Found Some!',
                            text: 'We found some permits for this property. Please see the table for the information found.',
                            icon: 'success',
                            confirmButtonText: 'Ok!'
                        });
                        $('#permits-info-row').html('');
                        $('#permits-info-row').html('<div id="permits-table"></div>');
                        const { Grid, html, h } = gridjs;
                        const permitsGrid = new Grid({
                            columns: [{
                                name: 'Id', hidden: true
                            }, 'Permit Number', 'Description', 'Type', 'Project Name', 'Effective Date', 'Job Value', 'Status', 'Business Name', 'Homeowner Name', {
                                name: 'Added', hidden: true
                            }], pagination: {
                                limit: 10
                            }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.permits,
                        }).render(document.getElementById('permits-table'));
                    }
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to retrieve permits for this property. If this persists, please contact support.',
                        icon: 'error',
                        confirmButtonText: 'Try again!'
                    });
                }
            }
        });
    } else if (parseInt(lastChecked) > 30) {
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: 'checkForPropertyPermits=' + pid, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    if (data.permitsFound == false) {
                        Swal.fire({
                            title: 'We Checked!',
                            text: 'No permits were found for this property.',
                            icon: 'info',
                            confirmButtonText: 'Try again!'
                        });
                    } else {
                        Swal.fire({
                            title: 'We Found Some!',
                            text: 'We found some permits for this property. Please see the table for the information found.',
                            icon: 'success',
                            confirmButtonText: 'Ok!'
                        });
                        $('#permits-info-row').html('');
                        $('#permits-info-row').html('<div id="permits-table"></div>');
                        const { Grid, html, h } = gridjs;
                        const permitsGrid = new Grid({
                            columns: [{
                                name: 'Id', hidden: true
                            }, 'Permit Number', 'Description', 'Type', 'Project Name', 'Effective Date', 'Job Value', 'Status', 'Business Name', 'Homeowner Name', {
                                name: 'Added', hidden: true
                            }], pagination: {
                                limit: 10
                            }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.permits,
                        }).render(document.getElementById('permits-table'));
                    }
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to retrieve permits for this property. If this persists, please contact support.',
                        icon: 'error',
                        confirmButtonText: 'Try again!'
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: 'Are you sure you want to check for Permits again?',
            html: '<p>This property was checked for permits within the last 30 days, this action could result in additional fees to your Agency.</p>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                var url = 'functions/qr_functions.php';
                $.ajax({
                    type: "POST", url: url, data: 'checkForPropertyPermits=' + pid, success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            if (data.permitsFound == false) {
                                Swal.fire({
                                    title: 'We Checked!',
                                    text: 'No permits were found for this property.',
                                    icon: 'info',
                                    confirmButtonText: 'Try again!'
                                });
                            } else {
                                Swal.fire({
                                    title: 'We Found Some!',
                                    text: 'We found some permits for this property. Please see the table for the information found.',
                                    icon: 'success',
                                    confirmButtonText: 'Ok!'
                                });
                                $('#permits-info-row').html('');
                                $('#permits-info-row').html('<div id="permits-table"></div>');
                                const { Grid, html, h } = gridjs;
                                const permitsGrid = new Grid({
                                    columns: [{
                                        name: 'Id', hidden: true
                                    }, 'Permit Number', 'Description', 'Type', 'Project Name', 'Effective Date', 'Job Value', 'Status', 'Business Name', 'Homeowner Name', {
                                        name: 'Added', hidden: true
                                    }], pagination: {
                                        limit: 10
                                    }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.permits,
                                }).render(document.getElementById('permits-table'));
                            }
                        }
                        if (data && data.status !== "Got Data") {
                            Swal.fire({
                                title: 'Whoops!',
                                text: 'We were unable to retrieve permits for this property. If this persists, please contact support.',
                                icon: 'error',
                                confirmButtonText: 'Try again!'
                            });
                        }
                    }
                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {


            }


        })
    }
});


function setPoolType(data) {
    var poolSelect = $("#c35fa918-4759-11ea-a01e-000d3a7ae61a");

    // Destroy existing select2 instance
    poolSelect.select2('destroy');

    if (data.haspool === 'Yes' && data.pooltype !== 'None') {
        var text2 = data.pooltype;
        poolSelect.find("option").filter(function () {
            return this.text === text2;
        }).prop('selected', true);
    } else {
        var text2 = 'None';
        poolSelect.find("option").filter(function () {
            return this.text === text2;
        }).prop('selected', true);
    }

    // Trigger change to update the select element
    poolSelect.trigger('change');

    // Re-initialize select2 with the desired options
    poolSelect.select2({
        theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
    });
}

$(document).on('click', '#getPropertyData', function (e) {
    if ($('#9f99f8b8-4758-11ea-a01e-000d3a7ae61a').val() == '') {
        Swal.fire({
            title: 'Error!',
            text: 'For us to do a lookup on that address we need both the Address and Zipcode',
            icon: 'error',
            confirmButtonText: 'Try again!'
        })
    } else {
        var url = "functions/qr_functions.php";
        var address = $('#911de265-4758-11ea-a01e-000d3a7ae61a').val();
        var address2 = $('#99f5a70e-4758-11ea-a01e-000d3a7ae61a').val();
        var zip = $('#9f99f8b8-4758-11ea-a01e-000d3a7ae61a').val();
        var pid = $(this).attr('data-value');
        $.ajax({
            type: "POST",
            url: url,
            data: "get-property-data=" + address + '&zip=' + zip + '&addressline2=' + address2 + '&propertyData-PropertyId=' + pid,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    Swal.fire({
                        title: 'We found it!',
                        text: 'Is this your address? ' + data.data,
                        icon: 'success',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'No, that is not my address',
                        confirmButtonText: 'Yes!'
                    }).then((result) => {
                        if (result.value) {
                            $('#getPropertyData').removeClass('theme-btn');
                            $('#getPropertyData').addClass('btn-success');
                            $("#18005ee9-46f9-11ea-a01e-000d3a7ae61a option[id=" + data.state + "]").attr('selected', 'selected');
                            $('#911de265-4758-11ea-a01e-000d3a7ae61a').val(data.address);
                            $('#911de265-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                            $('#9f99f8b8-4758-11ea-a01e-000d3a7ae61a').val(data.zip);
                            $('#9f99f8b8-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                            $('#a37eb604-4758-11ea-a01e-000d3a7ae61a').val(data.city);
                            $('#a37eb604-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                            $('#b6f058a4-4758-11ea-a01e-000d3a7ae61a').val(data.county);
                            $('#b6f058a4-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                            var text2 = data.state;
                            $("#b219896b-4758-11ea-a01e-000d3a7ae61a option").filter(function () {
                                return this.text == text2;
                            }).attr('selected', true);

                            $('#5bce427c-4759-11ea-a01e-000d3a7ae61a').val(data.yearbuilt);
                            $('#5bce427c-4759-11ea-a01e-000d3a7ae61a-label').addClass('active');

                            var text2 = data.hometype;
                            $("#64ec3f94-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                return this.text == text2;
                            }).attr('selected', true);


                            var text2 = data.stories;
                            $("#64ec3f94-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                return this.text == text2;
                            }).attr('selected', true);


                            $('#8b704857-4759-11ea-a01e-000d3a7ae61a').val(data.squarefeet);
                            $('#8b704857-4759-11ea-a01e-000d3a7ae61a-label').addClass('active');

                            var text2 = data.walltype;
                            $("#92caf366-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                return this.text == text2;
                            }).attr('selected', true);


                            var text2 = data.stories;
                            $("#733a95dd-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                return this.text == text2;
                            }).attr('selected', true);


                            var text2 = data.foundation;
                            $("#ace4457d-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                return this.text == text2;
                            }).attr('selected', true);


                            var text2 = data.roofmaterial;
                            $("#b8f62196-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                return this.text == text2;
                            }).attr('selected', true);

                            setPoolType(data);

                            $('#45c179fe-4762-11ea-a01e-000d3a7ae61a').val(data.assessedvalue);
                            $('#45c179fe-4762-11ea-a01e-000d3a7ae61a').addClass('active');
                            if (data.permitsFound == false) {
                            } else {
                                $('#permits-info-row').html('');
                                $('#permits-info-row').html('<div id="permits-table"></div>');
                                const { Grid, html, h } = gridjs;
                                const permitsGrid = new Grid({
                                    columns: [{
                                        name: 'Id', hidden: true
                                    }, 'Permit Number', 'Description', 'Type', 'Project Name', 'Effective Date', 'Job Value', 'Status', 'Business Name', 'Homeowner Name', {
                                        name: 'Added', hidden: true
                                    }], pagination: {
                                        limit: 10
                                    }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.permits,
                                }).render(document.getElementById('permits-table'));
                            }

                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            Swal.fire({
                                title: 'Error!',
                                text: 'We were unable to pull information for that property. You can try again by modifying the address and zip.',
                                icon: 'error',
                                confirmButtonText: 'Try again!'
                            })

                        }

                    })
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Error!',
                        text: 'We were unable to pull information for that property. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Try again!'
                    })
                }
            }
        });
    }
});

$(document).on('focusout', '#02b12493-46f9-11ea-a01e-000d3a7ae61a', function (e) {
    if ($('#02b12493-46f9-11ea-a01e-000d3a7ae61a').val() == '') {
        Swal.fire({
            title: 'Error!',
            text: 'For us to do a lookup on that address we need both the Address and Zipcode',
            icon: 'error',
            confirmButtonText: 'Try again!'
        })
    } else {
        Swal.fire({
            title: 'Quick Question!',
            text: "Is the mailing address the same as the property address?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            var url = "functions/qr_functions.php";
            var address = $('#f3e38f9a-46f8-11ea-a01e-000d3a7ae61a').val();
            var zip = $('#02b12493-46f9-11ea-a01e-000d3a7ae61a').val();
            $('#propertySameAsMailingRow').hide();
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: "get-property-data=" + address + ' ' + zip,
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            Swal.fire({
                                title: 'We found it!',
                                text: 'Is this your address? ' + data.data,
                                icon: 'success',
                                showCancelButton: true,
                                cancelButtonColor: '#d33',
                                cancelButtonText: 'No, that is not my address',
                                confirmButtonText: 'Yes!'
                            }).then((result) => {
                                $('#loader').show();
                                $('#1c8baa79-46f9-11ea-a01e-000d3a7ae61a').val(data.county);
                                $('#1c8baa79-46f9-11ea-a01e-000d3a7ae61a-label').addClass('active');
                                $('#08e125a4-46f9-11ea-a01e-000d3a7ae61a').val(data.city);
                                $('#08e125a4-46f9-11ea-a01e-000d3a7ae61a-label').focus();
                                var text2 = data.state;
                                $("#18005ee9-46f9-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);
                                $("#18005ee9-46f9-11ea-a01e-000d3a7ae61a option[id=" + data.state + "]").attr('selected', 'selected');
                                $('#911de265-4758-11ea-a01e-000d3a7ae61a').val(data.address);
                                $('#911de265-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                                $('#9f99f8b8-4758-11ea-a01e-000d3a7ae61a').val(data.zip);
                                $('#9f99f8b8-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                                $('#a37eb604-4758-11ea-a01e-000d3a7ae61a').val(data.city);
                                $('#a37eb604-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                                $('#b6f058a4-4758-11ea-a01e-000d3a7ae61a').val(data.county);
                                $('#b6f058a4-4758-11ea-a01e-000d3a7ae61a-label').addClass('active');
                                var text2 = data.state;
                                $("#b219896b-4758-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);

                                $('#5bce427c-4759-11ea-a01e-000d3a7ae61a').val(data.yearbuilt);
                                $('#5bce427c-4759-11ea-a01e-000d3a7ae61a-label').addClass('active');

                                var text2 = data.hometype;
                                $("#64ec3f94-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);


                                var text2 = data.stories;
                                $("#64ec3f94-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);


                                $('#8b704857-4759-11ea-a01e-000d3a7ae61a').val(data.squarefeet);
                                $('#8b704857-4759-11ea-a01e-000d3a7ae61a-label').addClass('active');

                                var text2 = data.walltype;
                                $("#92caf366-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);


                                var text2 = data.stories;
                                $("#733a95dd-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);


                                var text2 = data.foundation;
                                $("#ace4457d-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);


                                var text2 = data.roofmaterial;
                                $("#b8f62196-4759-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);

                                setPoolType(data);

                                $('#45c179fe-4762-11ea-a01e-000d3a7ae61a').val(data.assessedvalue);
                                $('#45c179fe-4762-11ea-a01e-000d3a7ae61a').addClass('active');

                            })
                        }
                        if (data && data.status !== "Got Data") {
                            Swal.fire({
                                title: 'Error!',
                                text: 'We were unable to pull information for that property. Please try again.',
                                icon: 'error',
                                confirmButtonText: 'Try again!'
                            })
                        }
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {

                $.ajax({
                    type: "POST",
                    url: url,
                    data: "get-property-data=" + address + ' ' + zip,
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            Swal.fire({
                                title: 'We found it!',
                                text: 'Is this your address? ' + data.data,
                                icon: 'success',
                                showCancelButton: true,
                                cancelButtonColor: '#d33',
                                cancelButtonText: 'No, that is not my address',
                                confirmButtonText: 'Yes!'
                            }).then((result) => {
                                $('#loader').show();
                                $('#1c8baa79-46f9-11ea-a01e-000d3a7ae61a').val(data.county);
                                $('#1c8baa79-46f9-11ea-a01e-000d3a7ae61a-label').addClass('active');
                                $('#08e125a4-46f9-11ea-a01e-000d3a7ae61a').val(data.city);
                                $('#08e125a4-46f9-11ea-a01e-000d3a7ae61a-label').focus();
                                var text2 = data.state;
                                $("#18005ee9-46f9-11ea-a01e-000d3a7ae61a option").filter(function () {
                                    return this.text == text2;
                                }).attr('selected', true);

                            })
                        }
                        if (data && data.status !== "Got Data") {
                            Swal.fire({
                                title: 'Error!',
                                text: 'We were unable to pull information for that property. Please try again.',
                                icon: 'error',
                                confirmButtonText: 'Try again!'
                            })
                        }
                    }
                });

            }
        })
    }
});

$(document).on('focusout', '#p_yearbuilt', function (event) {
    var yb = parseInt($('#p_yearbuilt').val());
    var pm = parseInt($('#p_yearbuilt_pm').val());
    var min = parseFloat(yb) - parseFloat(pm);
    var max = parseFloat(yb) + parseFloat(pm);
    $('#yb-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('focusout', '#p_yearbuilt_pm', function (event) {
    var yb = $('#p_yearbuilt').val();
    var pm = $('#p_yearbuilt_pm').val();
    var min = parseFloat(yb) - parseFloat(pm);
    var max = parseFloat(yb) + parseFloat(pm);
    $('#yb-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('change', '#p_yearbuilt_pm', function (event) {
    var yb = $('#p_yearbuilt').val();
    var pm = $('#p_yearbuilt_pm').val();
    var min = parseFloat(yb) - parseFloat(pm);
    var max = parseFloat(yb) + parseFloat(pm);
    $('#yb-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('focusout', '#p_cova', function (event) {
    var yb = parseInt($('#p_cova').val());
    var pm = parseInt($('#p_cova_pm').val());
    var perc = (parseFloat(pm) / 100) * parseFloat(yb);
    var min = parseFloat(yb) - parseFloat(perc);
    var max = parseFloat(yb) + parseFloat(perc);
    $('#cova-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('focusout', '#p_cova_pm', function (event) {
    var yb = parseInt($('#p_cova').val());
    var pm = parseInt($('#p_cova_pm').val());
    var perc = (parseFloat(pm) / 100) * parseFloat(yb);
    var min = parseFloat(yb) - parseFloat(perc);
    var max = parseFloat(yb) + parseFloat(perc);
    $('#cova-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('change', '#p_cova_pm', function (event) {
    var yb = parseInt($('#p_cova').val());
    var pm = parseInt($('#p_cova_pm').val());
    var perc = (parseFloat(pm) / 100) * parseFloat(yb);
    var min = parseFloat(yb) - parseFloat(perc);
    var max = parseFloat(yb) + parseFloat(perc);
    $('#cova-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('focusout', '#p_sqft', function (event) {
    var yb = parseInt($('#p_sqft').val());
    var pm = parseInt($('#p_sqft_pm').val());
    var min = parseFloat(yb) - parseFloat(pm);
    var max = parseFloat(yb) + parseFloat(pm);
    $('#sft-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('focusout', '#p_sqft_pm', function (event) {
    var yb = $('#p_sqft').val();
    var pm = $('#p_sqft_pm').val();
    var min = parseFloat(yb) - parseFloat(pm);
    var max = parseFloat(yb) + parseFloat(pm);
    $('#sft-ouput').html('<b>' + min + ' - ' + max + '</b>');
});

$(document).on('change', '#p_sqft_pm', function (event) {
    var yb = $('#p_sqft').val();
    var pm = $('#p_sqft_pm').val();
    var min = parseFloat(yb) - parseFloat(pm);
    var max = parseFloat(yb) + parseFloat(pm);
    $('#sft-ouput').html('<b>' + min + ' - ' + max + '</b>');
});


$(document).on('focusout', '#p_zipcode', function (event) {
    var str = $('#p_zipcode').val();
    var num = $('#p_zipcode_pm').val();
    var match = str.substr(0, num);
    var numx = 5 - num;
    var xs = '';
    while (numx > 0) {
        var xs = xs + 'X';
        numx--;
    }
    $('#zip-ouput').html('<b>' + match + xs + '</b>');
});

$(document).on('focusout', '#p_zipcode_pm', function (event) {
    var str = $('#p_zipcode').val();
    var num = $('#p_zipcode_pm').val();
    var match = str.substr(0, num);
    var numx = 5 - num;
    var xs = '';
    while (numx > 0) {
        var xs = xs + 'X';
        numx--;
    }
    $('#zip-ouput').html('<b>' + match + xs + '</b>');
});

$(document).on('change', '#p_zipcode_pm', function (event) {
    var str = $('#p_zipcode').val();
    var num = $('#p_zipcode_pm').val();
    var match = str.substr(0, num);
    var numx = 5 - num;
    var xs = '';
    while (numx > 0) {
        var xs = xs + 'X';
        numx--;
    }
    $('#zip-ouput').html('<b>' + match + xs + '</b>');
});

$(document).on('click', '.addQRVehicle', function (event) {
    event.preventDefault();
    qrShowLoader();
    var ld = $('#Lead_Id').val();
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: 'add-qr-vehicle=' + ld, success: function (data, result) {
            if (data && data.status === "Got Data") {
                //$('#centralModalLGInfoBody').html(data.data);
                //$('#centralModalLGInfoHeader').html('iAdd Vehicle');
                //qrHideLoader();
                //$('#centralModalLGInfoDemo').modal();
                var modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text("Add Vehicle");
                addApplyDefaultVehicleBtn();
                modal_qtpanel.find('.offcanvas-body').html(data.data);
                $('#qtpanel').offcanvas('show');
                $('select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                });
                qrHideLoader();

            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to add a vehicle for this lead! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
                qrHideLoader();
            }
        }
    });
});

$(document).on('click', '.haveVIN', function (event) {
    if ($(this).attr('data-value') == 'Yes') {
        $('#vehicleTypeSelector').hide();
        $('#addQRVehicleForm input').attr('readonly', true);
        $('#addQRVehicleForm select').prop('disabled', true);
        $('#addQRVehicleForm textarea').attr('readonly', true);
        $("#addQRVehicleForm select").prop('disabled', true);
        $('#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a').attr('readonly', false);
        $('#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a').trigger('focus');
        if ($('#vehicleTypeSelected').length > 0) {
            $('#vehicleTypeSelected').remove();
        }
        $('#addQRVehicleForm').show();
    } else if ($(this).attr('data-value') == 'No') {
        $('#addQRVehicleForm input').attr('readonly', true);
        $('#addQRVehicleForm select').prop('disabled', true);
        $('#addQRVehicleForm textarea').attr('readonly', true);
        $("#addQRVehicleForm select").prop('disabled', true);
        $('#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a').attr('readonly', true);
        $('#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
        $('#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a').select2('destroy');
        $('#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a').empty();
        var currentYear = new Date().getFullYear();
        $('#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a').append('<option value="">Please Choose Year</option>');
        for (var year = currentYear + 1; year >= 1942; year--) {
            $('#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a').append('<option value="' + year + '">' + year + '</option>');
        }
        $('#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
        $('#addQRVehicleForm').show();
    } else {
        $('#addQRVehicleForm').hide();
    }
});

$(document).on('click', '.qrOpenCarrierSite', function (event) {
    if ($(this).data('value') != '') {
        event.preventDefault();
        qrShowLoader();
        var carrier = $(this).attr('data-value');
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: 'qrOpenCarrierSite=' + carrier, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    Swal.fire({
                        title: 'Success!',
                        text: 'If you do not currently have QuoteRUSH open, please open it and login.',
                        icon: 'info',
                        confirmButtonText: 'Ok!'
                    });
                    qrHideLoader();
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to launch this via QuoteRUSH. Please try again or contact Support for assistance.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                    qrHideLoader();
                }
            }
        });
    } else {
        qrDisplayAlert("We were unable to to launch this via QuoteRUSH. Please try again or contact Support for assistance.");
    }
});


$(document).on('click', '.qrReminderEdit', function (event) {
    if ($(this).data('value') != '') {
        event.preventDefault();
        qrShowLoader();
        var reminder = $(this).attr('data-value');
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: 'qrReminderEdit=' + reminder, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    launchCenteredModalQR(data.data, "Update Reminder");
                    $('#centeredModal select').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModal")
                    });
                    qrHideLoader();
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to get the info for this Reminder. Please try again or contact Support for assistance.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                    qrHideLoader();
                }
            }
        });
    } else {
        qrDisplayAlert("We were unable to to launch this via QuoteRUSH. Please try again or contact Support for assistance.");
    }
});

$(document).on('change', '#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a', function (event) {
    if ($(this).val() != '') {
        event.preventDefault();
        qrShowLoader();
        var year = $(this).val();
        var type = $('#vehicleTypeSelected').val();
        var url = 'functions/vehicle_lookup_functions.php';
        $.ajax({
            type: "POST",
            url: url,
            data: 'get-makes-by-type=' + type + '&get-makes-by-year=' + year,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#d77a5059-6ef5-11ea-a890-000d3a7ae61a').select2('destroy');
                    $('#d77a5059-6ef5-11ea-a890-000d3a7ae61a').empty();
                    var currentYear = new Date().getFullYear();
                    $('#d77a5059-6ef5-11ea-a890-000d3a7ae61a').append('<option value="">Please Choose Make</option>');
                    $('#d77a5059-6ef5-11ea-a890-000d3a7ae61a').append(data.makes);
                    $('#d77a5059-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
                    $('#addQRVehicleForm input').attr('readonly', false);
                    $('#addQRVehicleForm select').prop('disabled', false);
                    $('#addQRVehicleForm textarea').attr('readonly', false);
                    $("#addQRVehicleForm select").prop('disabled', false);
                    $('#d77a5059-6ef5-11ea-a890-000d3a7ae61a').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                    });
                    qrHideLoader();
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to get Makes for that Year! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                    qrHideLoader();
                }
            }
        });
    } else {
        qrDisplayAlert("Please choose a valid Year.", "error");
    }
});

$(document).on('change', '#d77a5059-6ef5-11ea-a890-000d3a7ae61a', function (event) {
    if ($(this).val() != '') {
        event.preventDefault();
        qrShowLoader();
        var model = $(this).val();
        var type = $('#vehicleTypeSelected').val();
        var year = $('#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a').val();
        var url = 'functions/vehicle_lookup_functions.php';
        $.ajax({
            type: "POST",
            url: url,
            data: 'get-models-by-make=' + model + '&model-year=' + year,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a`).empty();
                    $(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a`).append(data.data);
                    $(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a`).select2();
                    $(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a`).prop('disabled', false);
                    $('#addQRVehicleForm input').attr('readonly', false);
                    $('#addQRVehicleForm select').prop('disabled', false);
                    $('#addQRVehicleForm textarea').attr('readonly', false);
                    $("#addQRVehicleForm select").prop('disabled', false);
                    $('#d77a50d1-6ef5-11ea-a890-000d3a7ae61a').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                    });
                    qrHideLoader();
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to get Models for that Year and Make combination! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                    qrHideLoader();
                }
            }
        });
    } else {
        qrDisplayAlert("Please choose a valid Make.", "error");
    }
});

$(document).on('change', '#d77a50d1-6ef5-11ea-a890-000d3a7ae61a', function (event) {
    if ($(this).val() != '') {
        event.preventDefault();
        qrShowLoader();
        var year = $(`#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a`).val();
        var make = $(`#d77a5059-6ef5-11ea-a890-000d3a7ae61a`).val();
        var model = $(this).children(":selected").val();
        var url = 'functions/vehicle_lookup_functions.php';
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: 'get-styles-by-ymm=' + make + '&model-year=' + year + '&model=' + model,
            success: function (data, result) {
                if (Array.isArray(data.styles)) {
                    $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).empty();
                    $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).append(`<option id='99' value='' disabled selected>Please Select Body Style</option>`);
                    for (var i = 0; i < data.styles.length; i++) {
                        $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).append(`<option id='${i}' value='${data.styles[i].Style}'>${data.styles[i].Style} (${data.styles[i].Engine})</option>`);
                    }
                    $('#addQRVehicleForm input').attr('readonly', false);
                    $('#addQRVehicleForm select').prop('disabled', false);
                    $('#addQRVehicleForm textarea').attr('readonly', false);
                    $("#addQRVehicleForm select").prop('disabled', false);
                    $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).prop('disabled', false);
                    $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                    });
                    if ($(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                        $(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).empty();
                    }
                    if ($(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                        $(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).empty();
                    }
                    if ($(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                        $(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).empty();
                    }
                    if ($(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                        $(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).empty();
                    }
                    if ($(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                        $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).select2('destroy');
                        $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).empty();
                        $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value=''>Please Select Primary Driver</option>`);
                        var dFName = $("#5171ff30-46df-11ea-ac96-000d3a7ae61a").val();
                        if ($("#545de4fa-46df-11ea-ac96-000d3a7ae61a").length > 0) {
                            var dMName = $("#545de4fa-46df-11ea-ac96-000d3a7ae61a").val();
                        }
                        var dLName = $("#5951a671-46df-11ea-ac96-000d3a7ae61a").val();
                        if (dMName !== undefined && dMName != '') {
                            var name = dFName + ' ' + dMName + ' ' + dLName;
                        } else {
                            var name = dFName + ' ' + dLName;
                        }
                        $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${name}'>${name}</option>`);
                    }
                    if ($(`#80d2d433-46fb-11ea-a01e-000d3a7ae61a`).length > 0) {
                        var dFName = $("#80d2d433-46fb-11ea-a01e-000d3a7ae61a").val();
                        if ($("#89fbef52-46fb-11ea-a01e-000d3a7ae61a").length > 0) {
                            var dMName = $("#89fbef52-46fb-11ea-a01e-000d3a7ae61a").val();
                        }
                        var dLName = $("#bbb6d2f1-46fb-11ea-a01e-000d3a7ae61a").val();
                        if (dMName !== undefined && dMName != '') {
                            var name = dFName + ' ' + dMName + ' ' + dLName;
                        } else {
                            var name = dFName + ' ' + dLName;
                        }
                        $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${name}'>${name}</option>`);
                    }
                    $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).select2();
                    qrHideLoader();
                    $(document).on('change', `#d77a513a-6ef5-11ea-a890-000d3a7ae61a`, function (e) {
                        var selectedStyle = $(this).find('option:selected').attr('id');
                        if (selectedStyle == '' || selectedStyle == '99') {
                        } else {
                            if ($(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                                $(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).empty();
                                $(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data.styles[selectedStyle].RestraintType}' selected>${data.styles[selectedStyle].RestraintType}</option>`);
                                $(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).select2({
                                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                                });
                            }
                            if ($(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                                $(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).empty();
                                $(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data.styles[selectedStyle].DriveType}' selected>${data.styles[selectedStyle].DriveType}</option>`);
                                $(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).select2({
                                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                                });
                            }
                            if ($(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                                $(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).empty();
                                $(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data.styles[selectedStyle].Engine}' selected>${data.styles[selectedStyle].Engine}</option>`);
                                $(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).select2({
                                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                                });
                            }
                            if ($(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                                $(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).empty();
                                $(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data.styles[selectedStyle].FuelType}' selected>${data.styles[selectedStyle].FuelType}</option>`);
                                $(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).select2({
                                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                                });
                            }
                            if ($(`#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                                $(`#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a`).val(`${data.styles[selectedStyle].FakeVIN}`);
                            }
                        }
                    });
                } else {
                    qrHideLoader();
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to find styles for that Year / Make / Model combination. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
    } else {
        qrDisplayAlert("Please choose a valid Model.", "error");
    }
});

$(document).on('focusout', '#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a', function (event) {
    event.preventDefault();
    val = $('#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a').val();
    if (val.length > 0) {
        if (val.length > 8) {
            $.ajax({
                url: 'functions/vehicle_lookup_functions.php',
                type: "POST",
                data: 'VehicleVIN=' + val,
                success: function (data, result) {
                    if (data[0] == 'Got Data') {
                        $('#addQRVehicleForm input').attr('readonly', false);
                        $('#addQRVehicleForm select').prop('disabled', false);
                        $('#addQRVehicleForm textarea').attr('readonly', false);
                        $("#addQRVehicleForm select").prop('disabled', false);
                        if ($(`#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[1]}'>${data[1]}</option>`);
                            $(`#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a option[value="${data[1]}"]`).prop('selected', true);
                            $(`#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a5059-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a5059-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[2]}'>${data[2]}</option>`);
                            $(`#d77a5059-6ef5-11ea-a890-000d3a7ae61a option[value="${data[2]}"]`).prop('selected', true);
                            $(`#d77a5059-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[3]}'>${data[3]}</option>`);
                            $(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a option[value="${data[3]}"]`).prop('selected', true);
                            $(`#d77a50d1-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[4]}'>${data[4]}</option>`);
                            $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a option[value="${data[4]}"]`).prop('selected', true);
                            $(`#d77a513a-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[8]}'>${data[8]}</option>`);
                            $(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a option[value="${data[8]}"]`).prop('selected', true);
                            $(`#d77a51aa-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[5]}'>${data[5]}</option>`);
                            $(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a option[value="${data[5]}"]`).prop('selected', true);
                            $(`#d77a5219-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[6]}'>${data[6]}</option>`);
                            $(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a option[value="${data[6]}"]`).prop('selected', true);
                            $(`#d77a528b-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${data[7]}'>${data[7]}</option>`);
                            $(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a option[value="${data[7]}"]`).prop('selected', true);
                            $(`#d77a52ef-6ef5-11ea-a890-000d3a7ae61a`).select2();
                        }
                        if ($(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).length > 0) {
                            $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).select2('destroy');
                            $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).empty();
                            $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value=''>Please Select Primary Driver</option>`);
                            var dFName = $("#5171ff30-46df-11ea-ac96-000d3a7ae61a").val();
                            if ($("#545de4fa-46df-11ea-ac96-000d3a7ae61a").length > 0) {
                                var dMName = $("#545de4fa-46df-11ea-ac96-000d3a7ae61a").val();
                            }
                            var dLName = $("#5951a671-46df-11ea-ac96-000d3a7ae61a").val();
                            if (dMName !== undefined && dMName != '') {
                                var name = dFName + ' ' + dMName + ' ' + dLName;
                            } else {
                                var name = dFName + ' ' + dLName;
                            }
                            $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${name}'>${name}</option>`);
                        }
                        if ($(`#80d2d433-46fb-11ea-a01e-000d3a7ae61a`).length > 0) {
                            var dFName = $("#80d2d433-46fb-11ea-a01e-000d3a7ae61a").val();
                            if ($("#89fbef52-46fb-11ea-a01e-000d3a7ae61a").length > 0) {
                                var dMName = $("#89fbef52-46fb-11ea-a01e-000d3a7ae61a").val();
                            }
                            var dLName = $("#bbb6d2f1-46fb-11ea-a01e-000d3a7ae61a").val();
                            if (dMName !== undefined && dMName != '') {
                                var name = dFName + ' ' + dMName + ' ' + dLName;
                            } else {
                                var name = dFName + ' ' + dLName;
                            }
                            $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).append(`<option value='${name}'>${name}</option>`);
                        }
                        $(`#d77a5427-6ef5-11ea-a890-000d3a7ae61a`).select2();
                    } else {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We need a valid VIN in order to do a vehicle lookup.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });

                    }
                }
            })
        } else {

            Swal.fire({
                title: 'Whoops!',
                text: 'We need a valid VIN in order to do a vehicle lookup.',
                icon: 'error',
                confirmButtonText: 'Ok!'
            });
        }
    }
    return false; //for good measure
});

$(document).on('submit', '#addQRVehicleForm', function (event) {
    var vin = $("#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a").val();
    var year = $("#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a").val();
    var make = $("#d77a5059-6ef5-11ea-a890-000d3a7ae61a").val();
    var model = $("#d77a50d1-6ef5-11ea-a890-000d3a7ae61a").val();
    var bodyStyle = $("#d77a513a-6ef5-11ea-a890-000d3a7ae61a").val();
    var fuel = $("#d77a52ef-6ef5-11ea-a890-000d3a7ae61a").val();
    if (vin == '' && (year == '' || make == '' || model == '' || bodyStyle == '')) {

        var firstField = null;
        if (fuel == '') {
            firstField = $("#d77a52ef-6ef5-11ea-a890-000d3a7ae61a");

            $("#d77a52ef-6ef5-11ea-a890-000d3a7ae61a").css("border", "2px solid red");
            qrDisplayAlert("Please select Fuel.", "error");
        }
        if (bodyStyle == '') {
            firstField = $("#d77a513a-6ef5-11ea-a890-000d3a7ae61a");

            $("#d77a513a-6ef5-11ea-a890-000d3a7ae61a").css("border", "2px solid red");
            qrDisplayAlert("Please select vehicle Body Style.", "error");
        }
        if (model == '') {
            firstField = $("#d77a50d1-6ef5-11ea-a890-000d3a7ae61a");

            $("#d77a50d1-6ef5-11ea-a890-000d3a7ae61a").css("border", "2px solid red");
            qrDisplayAlert("Please select vehicle Model.", "error");
        }
        if (make == '') {
            ifirstField = $("#d77a5059-6ef5-11ea-a890-000d3a7ae61a");

            $("#d77a5059-6ef5-11ea-a890-000d3a7ae61a").css("border", "2px solid red");
            qrDisplayAlert("Please select vehicle Make.", "error");
        }
        if (year == '') {
            firstField = $("#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a");

            $("#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a").css("border", "2px solid red");
            qrDisplayAlert("Please select vehicle Year.", "error");
        }
        if (vin == '' && (year == '' || make == '' || model == '' || bodyStyle == '')) {
            firstField = $("#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a");

            //$("#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a").css("border", "2px solid red");
            qrDisplayAlert("Please enter either a Vehicle VIN or valid Year / Make / Model and Style.", "error");
        }
        firstField.css("border", "2px solid red");
        firstField.trigger('focus');
        $('#addQRVehicleButton').prop('disabled', true);
        $('#addQRVehicleButton').css('opacity', '0.4');
        return false;
    } else {
        $("#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a,#d77a52ef-6ef5-11ea-a890-000d3a7ae61a,#d77a513a-6ef5-11ea-a890-000d3a7ae61a,#d77a50d1-6ef5-11ea-a890-000d3a7ae61a,#d77a5059-6ef5-11ea-a890-000d3a7ae61a,#d77a4fd1-6ef5-11ea-a890-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#addQRVehicleButton').prop('disabled', false);
        $('#addQRVehicleButton').css('opacity', '1');
        event.preventDefault();
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: $('#addQRVehicleForm').serialize(), success: function (data, result) {
                if (data && data.status === "Got Data") {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Vehicle added successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                    });
                    tdata = data.list;
                    const { Grid, html, h } = gridjs;
                    $('#current-vehicles').html('');
                    const vehsGrid = new Grid({
                        columns: [{
                            name: 'Id', hidden: true
                        }, 'Year', 'Make', 'Model', {
                            name: 'Edit?',
                            formatter: (_, row) => html(checkVehEdit(row.cells[0].data, row.cells[4].data))
                        },], pagination: {
                            limit: 10
                        }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: tdata,
                    }).render(document.getElementById('current-vehicles'));

                    vehsGrid
                        .updateConfig({
                            data: tdata,
                        })
                        .forceRender();
                    setTimeout(() => {

                    }, 1000);

                    var modal_qtpanel = $('#qtpanel');
                    modal_qtpanel.find('.offcanvas-header>h5').text("");
                    modal_qtpanel.find('.offcanvas-body').html('');
                    $('#qtpanel').offcanvas('hide');

                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to add this vehicle! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
        return false;
    }
});

$(document).on('click', '.editQRVehicle', function (event) {
    event.preventDefault();
    qrShowLoader();
    var val = $(this).attr('data-value');
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: 'edit-qr-vehicle=' + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                //$('#centralModalLGInfoBody').html(data.data);
                //$('#centralModalLGInfoHeader').html('Edit Vehicle');
                var modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text("Edit Vehicle");
                addApplyDefaultVehicleBtn();
                modal_qtpanel.find('.offcanvas-body').html(data.data);
                $('#qtpanel').offcanvas('show');
                $('select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                });
                var choice = $('#d77a5895-6ef5-11ea-a890-000d3a7ae61a').val();
                if (choice == '77a0caee-6f4d-11ea-b992-000d3a7ae61a') {
                    $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', false);
                    $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
                    $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
                } else if (choice == '77a0cb42-6f4d-11ea-b992-000d3a7ae61a') {
                    $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', false);
                    $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
                    $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
                } else {
                    $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', true);
                    $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', true);
                    $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', true);
                }
                if ($('#d77a50d1-6ef5-11ea-a890-000d3a7ae61a').val() == '' && $('#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a').val() != '') {
                    $('#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a').focus();
                    $('#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a').focusout();


                }
                //qrHideLoader();
                //$('#centralModalLGInfoDemo').modal();
                qrHideLoader();

            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to edit this vehicle! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
                qrHideLoader();
            }
        }
    });
});

$(document).on('click', '#editQRVehicleButton', function (event) {
    event.preventDefault();
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: $('#editQRVehicleForm').serialize(), success: function (data, result) {
            if (data && data.status === "Got Data") {
                Swal.fire({
                    title: 'Success!', text: 'Vehicle updated successfully!', icon: 'success', confirmButtonText: 'Ok!'
                });
                var modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text("");
                modal_qtpanel.find('.offcanvas-body').html('');
                $('#qtpanel').offcanvas('hide');
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to update this driver! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }
    });
});

$(document).on('click', '.delVehicle', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');
    var lid = $('#Lead_Id').val();
    var row = $(this).closest('tr');

    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this Vehicle, it is not recoverable?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var url = 'functions/qr_functions.php';
            $.ajax({
                type: "POST",
                url: url,
                data: 'delVehicleId=' + val + '&delVehicleLead=' + lid,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        Swal.fire({
                            title: 'Success!', text: 'Vehicle deleted.', icon: 'success', confirmButtonText: 'Ok!'
                        });
                        row.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to remove that vehicle! Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Try again!'
                        });
                    }
                }
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) {


        }
    })

});

$(document).on('click', '.addQRDriver', function (event) {
    event.preventDefault();
    qrShowLoader();
    var ld = $('#Lead_Id').val();
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: 'add-qr-driver=' + ld, success: function (data, result) {
            if (data && data.status === "Got Data") {
                var modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text("Add Driver");
                addApplyDefaultDriverBtn();
                modal_qtpanel.find('.offcanvas-body').html(data.data);
                $('#qtpanel').offcanvas('show');
                $('select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                });

                flatpickr("#b7060b8f-6d6e-11ea-80ca-000d3a7ae61a,#b70617bb-6d6e-11ea-80ca-000d3a7ae61a", {
                    enableTime: 0,
                    dateFormat: "m/d/Y",
                    maxDate: new Date().fp_incr(-1),
                    allowInput: true,
                    disableMobile: true
                });
                qrHideLoader();
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to add a driver for this lead! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
                qrHideLoader();
            }
        }
    });
});

$(document).on('keyup', '#b7061365-6d6e-11ea-80ca-000d3a7ae61a', function (event) {

    var license = $("#b7061365-6d6e-11ea-80ca-000d3a7ae61a").val();
    if (license == '' || license == 'undefined') {
        $("#b7061365-6d6e-11ea-80ca-000d3a7ae61a").css("border", "2px solid red");
        $('#addDriverButton').prop('disabled', true);
        $('#addDriverButton').css('opacity', '0.4');
    } else {
        $("#b7061365-6d6e-11ea-80ca-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#addDriverButton').prop('disabled', false);
        $('#addDriverButton').css('opacity', '1');
    }
});
$(document).on('keyup', '#b70607f1-6d6e-11ea-80ca-000d3a7ae61a', function (event) {

    var firstName = $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").val();
    if (firstName == '' || firstName == 'undefined') {
        $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").css("border", "2px solid red");
        $('#addDriverButton').prop('disabled', true);
        $('#addDriverButton').css('opacity', '0.4');
    } else {
        $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#addDriverButton').prop('disabled', false);
        $('#addDriverButton').css('opacity', '1');
    }
});
$(document).on('keyup', '#ticketEmail', function (event) {
    var email = $("#ticketEmail").val();
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        $("#ticketEmail").css("border-bottom", "2px solid red");
        $('.submitTicket').prop('disabled', true);
        $('.submitTicket').css('opacity', '0.4');
    } else {
        $("#ticketEmail").css("border-bottom", "1px solid #ced4da");
        $('.submitTicket').prop('disabled', false);
        $('.submitTicket').css('opacity', '1');
    }
});


$(document).on('keyup', '#d133260f-46f8-11ea-a01e-000d3a7ae61a', function (event) {

    var email = $("#d133260f-46f8-11ea-a01e-000d3a7ae61a").val();
    if (email == '') {
        $("#d133260f-46f8-11ea-a01e-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#saveLeadInfo').attr('disabled', false);
        return true;
    }
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        $("#d133260f-46f8-11ea-a01e-000d3a7ae61a").css("border", "2px solid red");
        $('#saveLeadInfo').attr('disabled', true);
        //return false;
    } else {
        $("#d133260f-46f8-11ea-a01e-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#saveLeadInfo').attr('disabled', false);
    }
});
$(document).on('keyup', '#ticketMessage', function (event) {
    var ticketMessage = $("#ticketMessage").val();
    if (ticketMessage == '') {
        $("#ticketMessage").css("border-bottom", "2px solid red");
        $('.submitTicket').prop('disabled', true);
        $('.submitTicket').css('opacity', '0.4');
    } else {
        $("#ticketMessage").css("border-bottom", "1px solid #ced4da");
        $('.submitTicket').prop('disabled', false);
        $('.submitTicket').css('opacity', '1');
    }
});
$(document).on('keyup', '#ticketName', function (event) {
    var ticketName = $("#ticketName").val();

    if (ticketName == '') {
        $("#ticketName").css("border-bottom", "2px solid red");
        $('.submitTicket').prop('disabled', true);
        $('.submitTicket').css('opacity', '0.4');
    } else {
        $("#ticketName").css("border-bottom", "1px solid #ced4da");
        $('.submitTicket').prop('disabled', false);
        $('.submitTicket').css('opacity', '1');
    }
});
$(document).on('change', '#d77a5895-6ef5-11ea-a890-000d3a7ae61a', function (event) {
    var addGarageCapacity = $("#d77a5895-6ef5-11ea-a890-000d3a7ae61a").val();
    if (addGarageCapacity == '') {
        $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', false);
        $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('disabled', false);
        $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').prop('disabled', false);
        $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').prop('disabled', false);
    }
});

$(document).on('keyup', '#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a', function (event) {
    var vin = $("#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a").val();
    //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (vin == '') {
        $("#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a").css("border", "2px solid red");
        $('#addQRVehicleButton').prop('disabled', true);
        $('#addQRVehicleButton').css('opacity', '0.4');
    } else {
        $("#d77a4a3e-6ef5-11ea-a890-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#addQRVehicleButton').prop('disabled', false);
        $('#addQRVehicleButton').css('opacity', '1');
    }
});
$(document).on('click', '#addDriverButton', function (event) {
    event.preventDefault();

    var firstName = $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").val();
    var licenseNumber = $("#b7061365-6d6e-11ea-80ca-000d3a7ae61a").val();
    var firstName = firstName.trim();
    var licenseNumber = licenseNumber.trim();
    if (firstName == '' || firstName == 'undefined') {

        var firstField = null;
        if (firstName == '' || firstName == 'undefined') {
            firstField = $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a");

            $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").css("border", "2px solid red");
            qrDisplayAlert("Please enter First Name.", "error");
        }

        firstField.trigger('focus');
        $('#addDriverButton').prop('disabled', true);
        $('#addDriverButton').css('opacity', '0.4');
    } else {
        $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#addDriverButton').prop('disabled', false);
        $('#addDriverButton').css('opacity', '1');

        var url = 'functions/qr_functions.php';

        $.ajax({
            type: "POST", url: url, data: $('#addDriverForm').serialize(), success: function (data, result) {
                if (data && data.status === "Got Data") {
                    tData = data.list;
                    const { Grid, html, h } = gridjs;
                    $('#current-drivers').html('');
                    const driversGrid = new Grid({
                        columns: [{
                            name: 'Id', hidden: true
                        }, 'First Name', 'Middle Name', 'Last Name', 'Date of Birth', 'Violations', {
                            name: 'Edit?',
                            formatter: (_, row) => html(checkDriverEdit(row.cells[0].data, row.cells[6].data))
                        },], pagination: {
                            limit: 10
                        }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: tData,
                    }).render(document.getElementById('current-drivers'));

                    driversGrid
                        .updateConfig({
                            data: tData,
                        })
                        .forceRender();
                    setTimeout(() => {

                    }, 1000);

                    Swal.fire({
                        title: 'Success!', text: 'Driver added successfully!', icon: 'success', confirmButtonText: 'Ok!'
                    });
                    var modal_qtpanel = $('#qtpanel');
                    modal_qtpanel.find('.offcanvas-header>h5').text("");
                    modal_qtpanel.find('.offcanvas-body').html('');
                    $('#qtpanel').offcanvas('hide');
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to add a driver for this lead! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
    }
});

$(document).on('click', '.editQRDriver', function (event) {
    event.preventDefault();
    qrShowLoader();
    var val = $(this).attr('data-value');
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: 'edit-qr-driver=' + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                var modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text("Edit Driver");
                addApplyDefaultDriverBtn();
                modal_qtpanel.find('.offcanvas-body').html(data.data);
                $('#qtpanel').offcanvas('show');
                $('select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                });
                qrHideLoader();
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to edit this driver! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
                qrHideLoader();
            }
        }
    });
});

$(document).on('click', '#editDriverButton', function (event) {

    var firstName = $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").val();
    var licenseNumber = $("#b7061365-6d6e-11ea-80ca-000d3a7ae61a").val();
    var firstName = firstName.trim();
    var licenseNumber = licenseNumber.trim();
    if (firstName == '' || firstName == 'undefined' || licenseNumber == '' || licenseNumber == 'undefined') {
        if (firstName == '' || firstName == 'undefined') {
            $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").css("border", "2px solid red");
        }
        if (licenseNumber == '' || licenseNumber == 'undefined') {
            $("#b7061365-6d6e-11ea-80ca-000d3a7ae61a").css("border", "2px solid red");
        }
        $('#addDriverButton').prop('disabled', true);
        $('#addDriverButton').css('opacity', '0.4');
    } else {
        $("#b70607f1-6d6e-11ea-80ca-000d3a7ae61a").css("border", "1px solid #ced4da");
        $('#addDriverButton').prop('disabled', false);
        $('#addDriverButton').css('opacity', '1');
        event.preventDefault();
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: $('#editDriverForm').serialize(), success: function (data, result) {
                if (data && data.status === "Got Data") {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Driver updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                    });

                    var tData = data.list;
                    const { Grid, html, h } = gridjs;
                    $('#current-drivers').html('');
                    const driversGrid = new Grid({
                        columns: [{
                            name: 'Id', hidden: true
                        }, 'First Name', 'Middle Name', 'Last Name', 'Date of Birth', 'Violations', {
                            name: 'Edit?',
                            formatter: (_, row) => html(checkDriverEdit(row.cells[0].data, row.cells[6].data))
                        },], pagination: {
                            limit: 10
                        }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: tData,
                    }).render(document.getElementById('current-drivers'));

                    driversGrid
                        .updateConfig({
                            data: tData,
                        })
                        .forceRender();
                    setTimeout(() => {

                    }, 1000);
                    var modal_qtpanel = $('#qtpanel');
                    modal_qtpanel.find('.offcanvas-header>h5').text("");
                    modal_qtpanel.find('.offcanvas-body').html('');
                    $('#qtpanel').offcanvas('hide');
                } else {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to update this driver! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
    }
});

$(document).on('click', '#addViolationButton', function (event) {
    event.preventDefault();
    var url = 'functions/qr_functions.php';
    var numItems = $('.violationDiv').length
    $.ajax({
        type: "POST",
        url: url,
        data: 'get-violation-fields=true&numViolations=' + numItems,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#violations-row').append(data.data);
                flatpickr(".dateField", {
                    enableTime: !0,
                    dateFormat: "Y-m-d",
                    altFormat: "m/d/Y",
                    allowInput: true,
                    disableMobile: true
                });

            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'We were unable to add a violation for this driver! Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }
    });
});

$(document).on('click', '.removeViolation', function (event) {
    event.preventDefault();
    var rem = $(this).attr('data-value');
    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to remove this violation, it is not recoverable?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $('#' + rem).remove();
        } else if (result.dismiss === Swal.DismissReason.cancel) {


        }
    })
});

$(document).on('click', '.removeExistingViolation', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');

    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this violation, it is not recoverable?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var url = 'functions/qr_functions.php';
            $.ajax({
                type: "POST", url: url, data: 'delViolationId=' + val, success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        Swal.fire({
                            title: 'Success!', text: 'Violation deleted.', icon: 'success', confirmButtonText: 'Ok!'
                        });
                        $('#violation-' + val).remove();
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to remove that violation! Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {


        }


    })
});

$(document).on('click', '.delDriver', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');
    var lid = $('#Lead_Id').val();
    var row = $(this).closest('tr');

    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this Driver, it is not recoverable?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var url = 'functions/qr_functions.php';
            qrShowLoader();
            $.ajax({
                type: "POST",
                url: url,
                data: 'delDriverId=' + val + '&delDriverLead=' + lid,
                success: function (data, result) {
                    qrHideLoader();
                    if (data && data.status === "Got Data") {
                        Swal.fire({
                            title: 'Success!', text: 'Driver deleted.', icon: 'success', confirmButtonText: 'Ok!'
                        });
                        row.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to remove that driver! Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Try again!'
                        });
                    }
                }
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) {


        }


    })

});


$(document).on('focusout', '#b9b34e11-694c-11ea-9670-000d3a7ae61a', function (event) {
    var carpet = $('#b9b34e11-694c-11ea-9670-000d3a7ae61a').val()
    if (carpet == '') {
        var carpet = 0;
    }
    var hardwood = $('#b9b34e90-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var tile = $('#b9b34f70-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var vinyl = $('#b9b34efe-694c-11ea-9670-000d3a7ae61a').val()
    if (vinyl == '') {
        var vinyl = 0;
    }
    var marble = $('#b9b3509c-694c-11ea-9670-000d3a7ae61a').val()
    if (marble == '') {
        var marble = 0;
    }
    var laminate = $('#b9b35105-694c-11ea-9670-000d3a7ae61a').val()
    if (laminate == '') {
        var laminate = 0;
    }
    var terrazzo = $('#b9b35177-694c-11ea-9670-000d3a7ae61a').val()
    if (terrazzo == '') {
        var terrazzo = 0;
    }
    var total = parseInt(carpet) + parseInt(hardwood) + parseInt(tile) + parseInt(vinyl) + parseInt(marble) + parseInt(laminate) + parseInt(terrazzo);
    if (total > 100) {
        $(this).val('0');
        Swal.fire({
            title: 'Whoops!',
            html: 'Flooring should total 100%, please verify the percentages in each of the flooring sections to make sure they equal 100%.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
});

$(document).on('focusout', '#b9b34e90-694c-11ea-9670-000d3a7ae61a', function (event) {
    var carpet = $('#b9b34e11-694c-11ea-9670-000d3a7ae61a').val()
    if (carpet == '') {
        var carpet = 0;
    }
    var hardwood = $('#b9b34e90-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var tile = $('#b9b34f70-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var vinyl = $('#b9b34efe-694c-11ea-9670-000d3a7ae61a').val()
    if (vinyl == '') {
        var vinyl = 0;
    }
    var marble = $('#b9b3509c-694c-11ea-9670-000d3a7ae61a').val()
    if (marble == '') {
        var marble = 0;
    }
    var laminate = $('#b9b35105-694c-11ea-9670-000d3a7ae61a').val()
    if (laminate == '') {
        var laminate = 0;
    }
    var terrazzo = $('#b9b35177-694c-11ea-9670-000d3a7ae61a').val()
    if (terrazzo == '') {
        var terrazzo = 0;
    }
    var total = parseInt(carpet) + parseInt(hardwood) + parseInt(tile) + parseInt(vinyl) + parseInt(marble) + parseInt(laminate) + parseInt(terrazzo);
    if (total > 100) {
        $(this).val('0');
        Swal.fire({
            title: 'Whoops!',
            html: 'Flooring should total 100%, please verify the percentages in each of the flooring sections to make sure they equal 100%.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
});

$(document).on('focusout', '#b9b34f70-694c-11ea-9670-000d3a7ae61a', function (event) {
    var carpet = $('#b9b34e11-694c-11ea-9670-000d3a7ae61a').val()
    if (carpet == '') {
        var carpet = 0;
    }
    var hardwood = $('#b9b34e90-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var tile = $('#b9b34f70-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var vinyl = $('#b9b34efe-694c-11ea-9670-000d3a7ae61a').val()
    if (vinyl == '') {
        var vinyl = 0;
    }
    var marble = $('#b9b3509c-694c-11ea-9670-000d3a7ae61a').val()
    if (marble == '') {
        var marble = 0;
    }
    var laminate = $('#b9b35105-694c-11ea-9670-000d3a7ae61a').val()
    if (laminate == '') {
        var laminate = 0;
    }
    var terrazzo = $('#b9b35177-694c-11ea-9670-000d3a7ae61a').val()
    if (terrazzo == '') {
        var terrazzo = 0;
    }
    var total = parseInt(carpet) + parseInt(hardwood) + parseInt(tile) + parseInt(vinyl) + parseInt(marble) + parseInt(laminate) + parseInt(terrazzo);
    if (total > 100) {
        $(this).val('0');
        Swal.fire({
            title: 'Whoops!',
            html: 'Flooring should total 100%, please verify the percentages in each of the flooring sections to make sure they equal 100%.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
});

$(document).on('focusout', '#b9b34efe-694c-11ea-9670-000d3a7ae61a', function (event) {
    var carpet = $('#b9b34e11-694c-11ea-9670-000d3a7ae61a').val()
    if (carpet == '') {
        var carpet = 0;
    }
    var hardwood = $('#b9b34e90-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var tile = $('#b9b34f70-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var vinyl = $('#b9b34efe-694c-11ea-9670-000d3a7ae61a').val()
    if (vinyl == '') {
        var vinyl = 0;
    }
    var marble = $('#b9b3509c-694c-11ea-9670-000d3a7ae61a').val()
    if (marble == '') {
        var marble = 0;
    }
    var laminate = $('#b9b35105-694c-11ea-9670-000d3a7ae61a').val()
    if (laminate == '') {
        var laminate = 0;
    }
    var terrazzo = $('#b9b35177-694c-11ea-9670-000d3a7ae61a').val()
    if (terrazzo == '') {
        var terrazzo = 0;
    }
    var total = parseInt(carpet) + parseInt(hardwood) + parseInt(tile) + parseInt(vinyl) + parseInt(marble) + parseInt(laminate) + parseInt(terrazzo);
    if (total > 100) {
        $(this).val('0');
        Swal.fire({
            title: 'Whoops!',
            html: 'Flooring should total 100%, please verify the percentages in each of the flooring sections to make sure they equal 100%.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
});

$(document).on('focusout', '#b9b3509c-694c-11ea-9670-000d3a7ae61a', function (event) {
    var carpet = $('#b9b34e11-694c-11ea-9670-000d3a7ae61a').val()
    if (carpet == '') {
        var carpet = 0;
    }
    var hardwood = $('#b9b34e90-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var tile = $('#b9b34f70-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var vinyl = $('#b9b34efe-694c-11ea-9670-000d3a7ae61a').val()
    if (vinyl == '') {
        var vinyl = 0;
    }
    var marble = $('#b9b3509c-694c-11ea-9670-000d3a7ae61a').val()
    if (marble == '') {
        var marble = 0;
    }
    var laminate = $('#b9b35105-694c-11ea-9670-000d3a7ae61a').val()
    if (laminate == '') {
        var laminate = 0;
    }
    var terrazzo = $('#b9b35177-694c-11ea-9670-000d3a7ae61a').val()
    if (terrazzo == '') {
        var terrazzo = 0;
    }
    var total = parseInt(carpet) + parseInt(hardwood) + parseInt(tile) + parseInt(vinyl) + parseInt(marble) + parseInt(laminate) + parseInt(terrazzo);
    if (total > 100) {
        $(this).val('0');
        Swal.fire({
            title: 'Whoops!',
            html: 'Flooring should total 100%, please verify the percentages in each of the flooring sections to make sure they equal 100%.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
});

$(document).on('focusout', '#b9b35105-694c-11ea-9670-000d3a7ae61a', function (event) {
    var carpet = $('#b9b34e11-694c-11ea-9670-000d3a7ae61a').val()
    if (carpet == '') {
        var carpet = 0;
    }
    var hardwood = $('#b9b34e90-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var tile = $('#b9b34f70-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var vinyl = $('#b9b34efe-694c-11ea-9670-000d3a7ae61a').val()
    if (vinyl == '') {
        var vinyl = 0;
    }
    var marble = $('#b9b3509c-694c-11ea-9670-000d3a7ae61a').val()
    if (marble == '') {
        var marble = 0;
    }
    var laminate = $('#b9b35105-694c-11ea-9670-000d3a7ae61a').val()
    if (laminate == '') {
        var laminate = 0;
    }
    var terrazzo = $('#b9b35177-694c-11ea-9670-000d3a7ae61a').val()
    if (terrazzo == '') {
        var terrazzo = 0;
    }
    var total = parseInt(carpet) + parseInt(hardwood) + parseInt(tile) + parseInt(vinyl) + parseInt(marble) + parseInt(laminate) + parseInt(terrazzo);
    if (total > 100) {
        $(this).val('0');
        Swal.fire({
            title: 'Whoops!',
            html: 'Flooring should total 100%, please verify the percentages in each of the flooring sections to make sure they equal 100%.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
});

$(document).on('focusout', '#b9b35177-694c-11ea-9670-000d3a7ae61a', function (event) {
    var carpet = $('#b9b34e11-694c-11ea-9670-000d3a7ae61a').val()
    if (carpet == '') {
        var carpet = 0;
    }
    var hardwood = $('#b9b34e90-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var tile = $('#b9b34f70-694c-11ea-9670-000d3a7ae61a').val()
    if (hardwood == '') {
        var hardwood = 0;
    }
    var vinyl = $('#b9b34efe-694c-11ea-9670-000d3a7ae61a').val()
    if (vinyl == '') {
        var vinyl = 0;
    }
    var marble = $('#b9b3509c-694c-11ea-9670-000d3a7ae61a').val()
    if (marble == '') {
        var marble = 0;
    }
    var laminate = $('#b9b35105-694c-11ea-9670-000d3a7ae61a').val()
    if (laminate == '') {
        var laminate = 0;
    }
    var terrazzo = $('#b9b35177-694c-11ea-9670-000d3a7ae61a').val()
    if (terrazzo == '') {
        var terrazzo = 0;
    }
    var total = parseInt(carpet) + parseInt(hardwood) + parseInt(tile) + parseInt(vinyl) + parseInt(marble) + parseInt(laminate) + parseInt(terrazzo);
    if (total > 100) {
        $(this).val('0');
        Swal.fire({
            title: 'Whoops!',
            html: 'Flooring should total 100%, please verify the percentages in each of the flooring sections to make sure they equal 100%.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
});

function pruneEmpty(value) {
    if (value === null || value === undefined || value === "") return null;

    if (Array.isArray(value)) {
        const arr = value
            .map(pruneEmpty)
            .filter(v => v !== null);
        return arr.length ? arr : null;
    }

    if (typeof value === "object") {
        const obj = {};
        for (const [k, v] of Object.entries(value)) {
            const cleaned = pruneEmpty(v);
            if (cleaned !== null) obj[k] = cleaned;
        }
        return Object.keys(obj).length ? obj : null;
    }

    return value;
}

function countValues(value) {
    if (value === null) return 0;
    if (Array.isArray(value)) {
        return value.reduce((sum, v) => sum + countValues(v), 0);
    }
    if (typeof value === "object") {
        return Object.values(value).reduce((sum, v) => sum + countValues(v), 0);
    }
    return 1;
}

function renderObject(obj, depth = 0) {
    if (!obj) return "";

    let html = `<div class="ai-section depth-${depth}">`;

    for (const [key, value] of Object.entries(obj)) {
        html += `<div class="ai-row">`;

        html += `<div class="ai-key">${key}</div>`;

        if (Array.isArray(value)) {
            html += `<div class="ai-value">`;
            value.forEach((item, i) => {
                html += `<div class="ai-array-item">
          <div class="ai-array-title">#${i + 1}</div>
          ${renderObject(item, depth + 1)}
        </div>`;
            });
            html += `</div>`;
        } else if (typeof value === "object") {
            html += `<div class="ai-value">${renderObject(value, depth + 1)}</div>`;
        } else {
            html += `<div class="ai-value">${escapeHtml(String(value))}</div>`;
        }

        html += `</div>`;
    }

    html += `</div>`;
    return html;
}



function renderAiExtractResult(data) {
    const host = document.getElementById("aiExtractView");
    if (!host) return;

    // Prefer structured, normalized output (best for humans + lead updates)
    const patch =
        (data && typeof data === "object" && data.patchNormalized && typeof data.patchNormalized === "object")
            ? data.patchNormalized
            : (data && typeof data === "object" && data.patchRaw && typeof data.patchRaw === "object")
                ? data.patchRaw
                : null;

    // Fallback: if patch isn't present, show the old raw fields table
    const rawFields = Array.isArray(data?.fields) ? data.fields : [];

    // State (toggle to show empties)
    const state = {
        showEmpty: false
    };

    function rerender() {
        host.innerHTML = "";

        // --- Header controls (always visible) ---
        const header = document.createElement("div");
        header.className = "d-flex align-items-center justify-content-between mb-2";

        const left = document.createElement("div");
        left.innerHTML = `
      <div class="fw-semibold">Extracted Information Summary</div>
    `;

        const right = document.createElement("div");
        right.className = "d-flex align-items-center gap-2";

        // Show empty toggle
        const toggleId = "aiShowEmptyToggle_" + Math.random().toString(16).slice(2);
        right.innerHTML = `
      <div class="form-check form-switch m-0">
        <input class="form-check-input" type="checkbox" id="${toggleId}">
        <label class="form-check-label small" for="${toggleId}">Show empty</label>
      </div>
      <button class="btn btn-sm btn-outline-secondary" type="button" id="aiCopyNormalizedBtn">Copy normalized JSON</button>
    `;

        header.appendChild(left);
        header.appendChild(right);
        host.appendChild(header);

        // Toggle listener
        setTimeout(() => {
            const t = document.getElementById(toggleId);
            if (t) {
                t.checked = state.showEmpty;
                t.addEventListener("change", () => {
                    state.showEmpty = !!t.checked;
                    rerender();
                });
            }

            const copyBtn = document.getElementById("aiCopyNormalizedBtn");
            if (copyBtn) {
                copyBtn.disabled = !patch;
                copyBtn.addEventListener("click", async () => {
                    try {
                        if (!patch) return;
                        const txt = JSON.stringify(patch, null, 2);
                        await navigator.clipboard.writeText(txt);
                        copyBtn.textContent = "Copied!";
                        setTimeout(() => (copyBtn.textContent = "Copy normalized JSON"), 1200);
                    } catch {
                        copyBtn.textContent = "Copy failed";
                        setTimeout(() => (copyBtn.textContent = "Copy normalized JSON"), 1200);
                    }
                });
            }
        }, 0);

        // --- Tabs container ---
        const nav = document.createElement("ul");
        nav.className = "nav nav-tabs";
        nav.id = "aiExtractTabsNav";
        nav.setAttribute("role", "tablist");

        const content = document.createElement("div");
        content.className = "tab-content pt-3";
        content.id = "aiExtractTabsContent";

        host.appendChild(nav);
        host.appendChild(content);

        // Decide what to display
        const displayPatch = patch ? (state.showEmpty ? patch : pruneBlanks(patch)) : null;

        // Build tabs:
        //  - Summary
        //  - Each top-level section (Client/HO/AutoPolicy/Autos/Drivers/Flood/...)
        //  - Debug tabs (Raw Fields, patchForDb, grouped, raw)
        const sections = [];

        // Summary tab
        sections.push({
            id: "ai_tab_summary",
            title: "Summary",
            badge: "",
            bodyHtml: renderSummaryHtml(displayPatch, data, rawFields)
        });

        // Patch-based tabs
        if (displayPatch && typeof displayPatch === "object") {
            const preferredOrder = ["Client", "HO", "AutoPolicy", "Autos", "Drivers", "Flood", "Claims", "PreviousAddress", "MobileHome"];
            const keys = Object.keys(displayPatch);

            const ordered = [
                ...preferredOrder.filter(k => keys.includes(k)),
                ...keys.filter(k => !preferredOrder.includes(k))
            ];

            for (const k of ordered) {
                const v = displayPatch[k];
                if (isBlank(v)) continue;

                const tabId = "ai_tab_" + slug(k);
                const badge = tabBadge(v);
                sections.push({
                    id: tabId,
                    title: k,
                    badge,
                    bodyHtml: renderAny(v, 0)
                });
            }
        }

        // Debug: Raw Fields tab (always, because it’s useful)
        sections.push({
            id: "ai_tab_raw_fields",
            title: "Raw Fields",
            badge: rawFields.length ? String(rawFields.length) : "",
            bodyHtml: renderRawFieldsTable(rawFields)
        });

        // Debug: patchForDb / grouped / raw (only if present)
        if (data?.patchForDb) {
            sections.push({
                id: "ai_tab_patch_db",
                title: "patchForDb",
                badge: "",
                bodyHtml: renderJsonBlock(data.patchForDb)
            });
        }
        if (data?.grouped) {
            sections.push({
                id: "ai_tab_grouped",
                title: "Grouped",
                badge: "",
                bodyHtml: renderJsonBlock(data.grouped)
            });
        }
        if (data?.raw) {
            sections.push({
                id: "ai_tab_raw",
                title: "Raw CU",
                badge: "",
                bodyHtml: renderJsonBlock(data.raw)
            });
        }

        // Render tabs
        sections.forEach((s, idx) => {
            const active = idx === 0;

            const li = document.createElement("li");
            li.className = "nav-item";
            li.setAttribute("role", "presentation");

            li.innerHTML = `
        <button class="nav-link ${active ? "active" : ""}"
                id="${s.id}-tab"
                type="button"
                role="tab"
                data-bs-toggle="tab"
                data-toggle="tab"
                data-bs-target="#${s.id}"
                data-target="#${s.id}"
                aria-controls="${s.id}"
                aria-selected="${active ? "true" : "false"}">
          ${escapeHtml(s.title)}
          ${s.badge ? `<span class="badge bg-secondary ms-2">${escapeHtml(s.badge)}</span>` : ""}
        </button>
      `;
            nav.appendChild(li);

            const pane = document.createElement("div");
            pane.className = `tab-pane fade ${active ? "show active" : ""}`;
            pane.id = s.id;
            pane.setAttribute("role", "tabpanel");
            pane.setAttribute("aria-labelledby", `${s.id}-tab`);
            pane.innerHTML = `
        <div style="max-height:60vh; overflow:auto;">
          ${s.bodyHtml}
        </div>
      `;
            content.appendChild(pane);
        });
    }

    rerender();
}

/* -----------------------------
   Rendering helpers
----------------------------- */

function renderSummaryHtml(patch, data, rawFields) {
    const docTypes = Array.isArray(data?.documentTypes) ? data.documentTypes : [];
    const sectionCounts = patch && typeof patch === "object" ? summarizeTopLevel(patch) : [];

    return `
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="border rounded p-3">
          <div class="fw-semibold mb-2">Run info</div>
          <div class="small">
            <div><span class="text-muted">Doc types:</span> ${escapeHtml(docTypes.join(", ") || "—")}</div>
            <div class="text-muted mt-2">Tip: use “Show empty” only when debugging; otherwise it’s noise.</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="border rounded p-3">
          <div class="fw-semibold mb-2">What we got</div>
          ${sectionCounts.length ? renderMiniCountsTable(sectionCounts) : `<div class="text-muted small">No structured patch available.</div>`}
        </div>
      </div>
    </div>
  `;
}

function summarizeTopLevel(patch) {
    const out = [];
    for (const k of Object.keys(patch)) {
        const v = patch[k];
        if (isBlank(v)) continue;
        out.push({
            key: k,
            badge: tabBadge(v),
            filled: countLeaves(v)
        });
    }
    return out.sort((a, b) => (b.filled - a.filled));
}

function renderMiniCountsTable(rows) {
    const trs = rows.map(r => `
    <tr>
      <td class="text-nowrap">${escapeHtml(r.key)}</td>
      <td class="text-end">${escapeHtml(r.badge || "")}</td>
      <td class="text-end">${escapeHtml(String(r.filled))}</td>
    </tr>
  `).join("");

    return `
    <table class="table table-sm mb-0">
      <thead>
        <tr>
          <th>Section</th>
          <th class="text-end">Items/Fields</th>
          <th class="text-end">Filled leaves</th>
        </tr>
      </thead>
      <tbody>${trs}</tbody>
    </table>
  `;
}

function renderRawFieldsTable(fields) {
    if (!Array.isArray(fields) || fields.length === 0) {
        return `<em>No fields extracted.</em>`;
    }

    const rows = fields.map(f => {
        const key = escapeHtml(f?.key ?? "");
        // Prefer valuePlain if available, so we can render nested structures nicely
        const v = (f && "valuePlain" in f) ? f.valuePlain : f?.value;
        return `
      <tr>
        <td class="text-nowrap">${key}</td>
        <td>${renderAny(maybeParseJson(v), 0)}</td>
      </tr>
    `;
    }).join("");

    return `
    <table class="table table-sm table-striped">
      <thead><tr><th style="width:25%">Key</th><th>Value</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderJsonBlock(obj) {
    const json = escapeHtml(JSON.stringify(obj, null, 2));
    return `<pre class="small bg-light border rounded p-2">${json}</pre>`;
}

function renderAny(value, depth) {
    value = maybeParseJson(value);

    if (isBlank(value)) return `<span class="text-muted">—</span>`;

    // keep rendering from going insane
    const maxDepth = 4;
    if (depth > maxDepth) {
        return `<pre class="small bg-light border rounded p-2">${escapeHtml(JSON.stringify(value, null, 2))}</pre>`;
    }

    if (Array.isArray(value)) {
        return renderArray(value, depth);
    }
    if (typeof value === "object") {
        return renderObject(value, depth);
    }

    // Scalars
    const s = String(value);
    if (s.length > 180) {
        return `
      <details>
        <summary class="small text-muted">Long text (${s.length} chars)</summary>
        <pre class="small bg-light border rounded p-2 mt-2">${escapeHtml(s)}</pre>
      </details>
    `;
    }
    return `<span>${escapeHtml(s)}</span>`;
}

function renderArray(arr, depth) {
    if (!arr.length) return `<span class="text-muted">—</span>`;

    const allObjects = arr.every(x => x && typeof x === "object" && !Array.isArray(x));
    if (allObjects) {
        // array of objects -> table with union headers (limited)
        const maxCols = 12;
        const headers = [];
        const headerSet = new Set();

        for (const row of arr.slice(0, 50)) {
            for (const k of Object.keys(row)) {
                if (!headerSet.has(k)) {
                    headerSet.add(k);
                    headers.push(k);
                    if (headers.length >= maxCols) break;
                }
            }
            if (headers.length >= maxCols) break;
        }

        const thead = headers.map(h => `<th>${escapeHtml(h)}</th>`).join("");
        const tbody = arr.map(row => {
            const tds = headers.map(h => `<td>${renderAny(row?.[h], depth + 1)}</td>`).join("");
            return `<tr>${tds}</tr>`;
        }).join("");

        return `
      <div class="small text-muted mb-2">Items: ${arr.length}</div>
      <div class="table-responsive">
        <table class="table table-sm table-striped">
          <thead><tr>${thead}</tr></thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>
    `;
    }

    // array of scalars/mixed -> list
    const lis = arr.map(x => `<li class="mb-1">${renderAny(x, depth + 1)}</li>`).join("");
    return `<div class="small text-muted mb-2">Items: ${arr.length}</div><ul class="mb-0">${lis}</ul>`;
}

/* -----------------------------
   Data cleaning + counts
----------------------------- */

function isBlank(v) {
    if (v === null || v === undefined) return true;

    if (typeof v === "string") {
        const s = v.trim();
        return s === "" || s === "-1";
    }

    if (Array.isArray(v)) {
        if (v.length === 0) return true;
        return v.every(isBlank);
    }

    if (typeof v === "object") {
        const keys = Object.keys(v);
        if (keys.length === 0) return true;
        return keys.every(k => isBlank(v[k]));
    }

    return false;
}

function pruneBlanks(v) {
    v = maybeParseJson(v);

    if (isBlank(v)) return null;

    if (Array.isArray(v)) {
        const out = v.map(pruneBlanks).filter(x => !isBlank(x));
        return out.length ? out : null;
    }

    if (typeof v === "object") {
        const out = {};
        for (const k of Object.keys(v)) {
            const pv = pruneBlanks(v[k]);
            if (!isBlank(pv)) out[k] = pv;
        }
        return Object.keys(out).length ? out : null;
    }

    return v;
}

function countLeaves(v) {
    v = maybeParseJson(v);
    if (isBlank(v)) return 0;

    if (Array.isArray(v)) return v.reduce((sum, x) => sum + countLeaves(x), 0);
    if (typeof v === "object") return Object.values(v).reduce((sum, x) => sum + countLeaves(x), 0);
    return 1; // scalar non-blank
}

function tabBadge(v) {
    v = maybeParseJson(v);
    if (Array.isArray(v)) return String(v.length);
    if (typeof v === "object") return String(countLeaves(v));
    return "1";
}

/* -----------------------------
   Utilities
----------------------------- */

function maybeParseJson(v) {
    if (typeof v !== "string") return v;
    const s = v.trim();
    if (!s) return v;

    if ((s.startsWith("{") && s.endsWith("}")) || (s.startsWith("[") && s.endsWith("]"))) {
        try { return JSON.parse(s); } catch { return v; }
    }
    return v;
}

function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function setDzStatus(msg, isError = false) {
    const el = document.getElementById("dzStatus");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "#b00020" : "#333";
}

$(document).on('click', '#openAIDocAnalyzer', function (event) {
    event.preventDefault();
    qrShowLoader();
    var lead = $('#Lead_Id').val();
    var ft = $('#FormType').val();
    let aiDocForm = `
    <div class='row mb-2'>
        <div class='col-12'>
            <form action='upload-ai-doc.php' class='dropzone p-3 mx-3 min-h-auto dz-clickable' id='drop_zoneCTab' method='post'>
                 <input type='hidden' name='upload_from' value='clientTab' />
                 <div class='dz-default m-0 dz-message'>
                      <span class='h6 m-0' id='replace-logo'>Update Supporting Doc(s)</span>
                 </div>
             </form>
             <div id='dzStatus' class='text-center mb-2'></div>
        </div>
     </div>
        <div class='row mb-2'><div class='col-12'>
            <div id="aiExtractView"></div>
        </div>`;
    launchCenteredModalQR(aiDocForm, 'Upload Document(s) to Analyze', 'modal-fullscreen');
    let myDropzone = new Dropzone("#drop_zoneCTab", {
        paramName: "file",
        maxFilesize: 100,
        timeout: 120000,
        url: "upload-ai-doc.php",

        init: function () {
            this.on("sending", () => {
                setDzStatus("Uploading & analyzing...");
                qrShowLoader("Analyzing the provided document, this could take up to 10 minutes....please wait.");
            });

            this.on("success", (file, resp, e) => {
                $('#drop_zoneCTab').remove();
                const data = (typeof resp === "string") ? JSON.parse(resp) : resp;
                handleAiDocUploadResponse(resp);
                qrHideLoader();
            });

            this.on("error", (file, message) => {
                setDzStatus(message || "Upload failed.", true);
                qrHideLoader();
            });
        }
    });

    qrHideLoader();
    return false;
});

$(document).on('click', '#openPredictor', function (event) {
    event.preventDefault();
    qrShowLoader();
    var lead = $('#Lead_Id').val();
    var ft = $('#FormType').val();
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: 'get-predictor-lead=' + lead + '&p_ft=' + ft, success: function (data, result) {
            if (data && data.status === "Got Data") {
                qrHideLoader();
                $('#predictorWrapper').append(data.data);
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }
    });
    return false;
});

$(document).on('click', '#savePredictorDefaults', function (event) {
    event.preventDefault();
    var yb = $('#p_yearbuilt_pm').val();
    var cova = $('#p_cova_pm').val();
    var sf = $('#p_sqft_pm').val();
    var zip = $('#p_zipcode_pm').val();
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST",
        url: url,
        data: 'set-predictor-defaults=true&ybpm=' + yb + '&covpm=' + cova + '&sfpm=' + sf + '&zip=' + zip,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                Swal.fire({
                    title: 'Success!', text: 'Defaults saved.', icon: 'success', confirmButtonText: 'Ok!'
                });
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }
    });
    return false;
});

$(document).on('click', '#showPResults', function (e) {
    e.preventDefault();
    qrShowLoader();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: $("#predictorForm").serialize(), success: function (data, result) {
            if (data && data.status === "Got Data") {
                qrHideLoader();
                $('#predictorResultsTableDiv').html(data.data);
                $('#predictor-results-table').dataTable({
                    responsive: true, "order": [[2, "desc"]]
                });
                var target = $('#predictorResultsTableDiv');
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            }
            if (data && data.status !== "Got Data") {
                qrHideLoader();
                Swal.fire({
                    title: 'Whoops!',
                    text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.deleteQRClaim', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');
    var tr = $(this).closest('tr');
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will remove this claim from the current Lead / Property.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else if (result.value) {
            $.ajax({
                url: 'functions/qr_functions.php',
                type: "POST",
                data: 'deleteQRClaim=' + val,
                success: function (data, result, row) {
                    if (data && data.status === "Got Data") {
                        Swal.fire({
                            title: 'Success!', text: 'Claim Deleted.', icon: 'success', confirmButtonText: 'Ok!'
                        });
                        tr.remove();
                        var $label = $('label[for="b934e1c0-4762-11ea-a01e-000d3a7ae61a"]');
                        $label.contents().each(function () {
                            // Check if the node is a text node
                            if (this.nodeType === 3) {  // Node type 3 is a text node
                                var originalText = this.nodeValue;
                                var trimmedText = originalText.trim();
                                // Update the number within the parentheses only if there's meaningful text
                                if (trimmedText !== '') {
                                    var updatedText = trimmedText.replace(/(\(\d+\))/, function (match) {
                                        var number = parseInt(match.replace(/\D/g, ''), 10) - 1; // Extract number, increment
                                        return '(' + number + ')'; // Reconstruct with new number
                                    });
                                    // Replace the text node value while preserving leading/trailing spaces
                                    this.nodeValue = originalText.replace(trimmedText, updatedText);
                                    return false; // Break the loop after updating the first relevant text node
                                }
                            }
                        });
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'There was a problem deleting that Claim. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                    }
                }
            });

        } else {

        }
    })
    return false; //for good measure
});

$(document).on('click', '.addNewQRClaim', function (e) {
    e.preventDefault();
    var $form = $('#addOrUpdateClaimForm');
    $form.find('input[type="text"], input[type="date"], input[type="email"], textarea').val('');
    $form.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
    $form.find('select').prop('selectedIndex', 0);
    $form.find('.select2-hidden-accessible').each(function () {
        $(this).val(null).trigger('change');
    });
    if ($('#editClaimId').length > 0) {
        $('#editClaimId').remove();
    }
    $('#claimsRow').toggle();
    $('.addOrUpdateClaim').text('Add Claim');
    return false;
})

$(document).on('click', '.cancelAddOrUpdateClaim', function () {
    var $form = $('#addOrUpdateClaimForm');
    $form.find('input[type="text"], input[type="date"], input[type="email"], textarea').val('');
    $form.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
    $form.find('select').prop('selectedIndex', 0);
    $form.find('.select2-hidden-accessible').each(function () {
        $(this).val(null).trigger('change');
    });
    if ($('#editClaimId').length > 0) {
        $('#editClaimId').remove();
    }
    $('#claimsRow').toggle();
    $('.addOrUpdateClaim').text('Add Claim');
});


$(document).on('click', '.editQRClaim', function () {
    var $row = $(this).closest('tr');
    var claimId = $(this).attr('data-value');
    $('.addOrUpdateClaim').text('Update Claim');
    $('#claimsRow').toggle();
    if ($('#editClaimId').length > 0) {
        $('#editClaimId').val(claimId);
    } else {
        $('#addOrUpdateClaimForm').append(`<input type='hidden' name='editClaimId' id='editClaimId' value='${claimId}' />`);
    }
    $row.find('td[data-info]').each(function () {
        var info = $(this).attr('data-info');
        var fieldId = $(this).attr('data-field');
        if ($('#' + fieldId).attr('type') === 'checkbox') {
            $('#' + fieldId).prop('checked', info == "1");
        } else if ($('#' + fieldId).hasClass('select2-hidden-accessible')) {
            $('#' + fieldId).val(info).trigger('change');
        } else {
            $('#' + fieldId).val(info);
        }
    });
});

$(document).on('click', '.addOrUpdateClaim', function (event) {
    var form = $("#addOrUpdateClaimForm")
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        event.preventDefault();
        qrShowLoader();
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: $('#addOrUpdateClaimForm').serialize(), success: function (data, result) {
                if (data && data.status === "Got Data") {
                    qrHideLoader();
                    emptyAndCloseCenteredModalQR();
                    if ($('#editClaimId').length > 0) {
                        var action = 'updated';
                    } else {
                        var action = 'added';
                        var $label = $('label[for="b934e1c0-4762-11ea-a01e-000d3a7ae61a"]');
                        $label.contents().each(function () {
                            // Check if the node is a text node
                            if (this.nodeType === 3) {  // Node type 3 is a text node
                                var originalText = this.nodeValue;
                                var trimmedText = originalText.trim();
                                // Update the number within the parentheses only if there's meaningful text
                                if (trimmedText !== '') {
                                    var updatedText = trimmedText.replace(/(\(\d+\))/, function (match) {
                                        var number = parseInt(match.replace(/\D/g, ''), 10) + 1; // Extract number, increment
                                        return '(' + number + ')'; // Reconstruct with new number
                                    });
                                    // Replace the text node value while preserving leading/trailing spaces
                                    this.nodeValue = originalText.replace(trimmedText, updatedText);
                                    return false; // Break the loop after updating the first relevant text node
                                }
                            }
                        });
                    }
                    Swal.fire({
                        title: 'Success!',
                        text: `Claim ${action} successfully! Reloading Claims info, please wait....`,
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                    });
                    var leadId = GetURLParameter('Lead');
                    if (leadId != '') {
                        var url = "functions/qr_functions.php";
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: 'getQRLeadClaimsDetail=' + leadId,
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {
                                    qrHideLoader();
                                    launchCenteredModalQR(data.data, 'Current Claims Info');
                                    if ($('#current-claims').length > 0) {
                                        $.fn.dataTable.moment('MM/DD/YYYY');
                                        $('#current-claims').DataTable({
                                            pageLength: 5, columnDefs: [{
                                                'type': 'date', 'targets': 1
                                            }]
                                        });
                                    }
                                    $('#centeredModalBody select').select2({
                                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModalBody")
                                    });
                                }
                                if (data && data.status !== "Got Data") {
                                    qrHideLoader();
                                    Swal.fire({
                                        title: 'Whoops!',
                                        text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                                        icon: 'error',
                                        confirmButtonText: 'Ok!'
                                    });
                                }
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                    }
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                    qrHideLoader();
                }
            }
        });
    }
    qrHideLoader();
    form.addClass('was-validated');
    return false;
});

$(document).on('click', '.viewEditClaims', function (e) {
    e.preventDefault();
    qrShowLoader();
    var leadId = GetURLParameter('Lead');
    if (leadId != '') {
        var url = "functions/qr_functions.php";
        $.ajax({
            type: "POST", url: url, data: 'getQRLeadClaimsDetail=' + leadId, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    qrHideLoader();
                    launchCenteredModalQR(data.data, 'Current Claims Info');
                    if ($('#current-claims').length > 0) {
                        $.fn.dataTable.moment('MM/DD/YYYY');
                        $('#current-claims').DataTable({
                            pageLength: 5, columnDefs: [{
                                'type': 'date', 'targets': 1
                            }]
                        });
                    }
                    $('#centeredModalBody select').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModalBody")
                    });
                }
                if (data && data.status !== "Got Data") {
                    qrHideLoader();
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: 'Whoops!',
            text: 'Well that did not work. Please try again, or contact support if the problem persists.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '.isFilter', function (e) {
    e.preventDefault();
    var choice = $(this).val();
    var selectid = $(this).attr('id');
    var selectValue = $(this).val();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'JSON',
        data: 'get-filter=' + encodeURIComponent(selectid) + '&filter-val=' + encodeURIComponent(choice),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                var str = data.empty;
                var a1 = new Array();
                a1 = str.split("|");
                for (i = 0; i < a1.length; i++) {
                    if (a1[i] != '') {
                        $('#' + a1[i])
                            .find('option')
                            .remove()
                            .end()
                            .append('<option value="">Please Select an Option</option>');
                    }
                }
                var jsonData = data;
                if (jsonData && jsonData.fields) {
                    for (var i = 0; i < jsonData.fields.length; i++) {
                        var counter = jsonData.fields[i];
                        if (counter.field_id != '') {
                            $('#' + counter.field_id).append('<option value="' + counter.option_id + '">' + counter.option_value + '</option>');
                        }
                    }
                }
                if (selectid === '92caf366-4759-11ea-a01e-000d3a7ae61a') {
                    if (selectValue != '' && selectValue == '74450a91-475f-11ea-a01e-000d3a7ae61a') {
                        $('#749d08d6-7c50-11ef-90aa-6045bd7d2a4f-div').show();
                        $('#84fb9390-7c50-11ef-90aa-6045bd7d2a4f-div').show();
                    } else {
                        $('#749d08d6-7c50-11ef-90aa-6045bd7d2a4f').val('').trigger('change');
                        $('#749d08d6-7c50-11ef-90aa-6045bd7d2a4f-div').hide();
                        $('#84fb9390-7c50-11ef-90aa-6045bd7d2a4f').val('').trigger('change');
                        $('#84fb9390-7c50-11ef-90aa-6045bd7d2a4f-div').hide();
                    }
                }
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('change', '#d77a5895-6ef5-11ea-a890-000d3a7ae61a', function (e) {
    e.preventDefault();
    var choice = $(this).val();
    if (choice == '77a0caee-6f4d-11ea-b992-000d3a7ae61a') {
        $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', false);
        $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
        $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
    } else if (choice == '77a0cb42-6f4d-11ea-b992-000d3a7ae61a') {
        $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', false);
        $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
        $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
    } else if (choice == '') {
        $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', false);
        $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
        $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', false);
    } else {
        $('#d77a5910-6ef5-11ea-a890-000d3a7ae61a').prop('readonly', true);
        $('#d77a5973-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', true);
        $('#d77a59d0-6ef5-11ea-a890-000d3a7ae61a').attr('disabled', true);
    }
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('focusout keyup input change', '#4ba4acf4-4762-11ea-a01e-000d3a7ae61a, #51026c3d-4762-11ea-a01e-000d3a7ae61a, #56c19d6c-4762-11ea-a01e-000d3a7ae61a', function (event) {
    if ($(this).val() != '') {
        var inputValue = $(this).val();
        var normalizedInput = inputValue.replace(/[^\d.,]+/g, '');
        var integerPart = parseInt(normalizedInput.replace(/,/g, ''), 10);
        if (isNaN(integerPart)) {
            integerPart = 0;
        }
        var finalValue = integerPart.toString();
        if (inputValue !== finalValue) {
            $(this).val(finalValue);
        }
    }
});

$(document).on('focusout keyup input change', '#45c179fe-4762-11ea-a01e-000d3a7ae61a', function (event) {
    event.preventDefault();
    if ($(this).val() != '') {
        var inputValue = $(this).val();
        var normalizedInput = inputValue.replace(/[^\d.,]+/g, '');
        var integerPart = parseInt(normalizedInput.replace(/,/g, ''), 10);
        if (isNaN(integerPart)) {
            integerPart = 0;
        }
        var finalValue = integerPart.toString();
        if (inputValue !== finalValue) {
            $(this).val(finalValue);
        }
        var ft = $('#FormType').val();
        var covA = $('#45c179fe-4762-11ea-a01e-000d3a7ae61a').val();
        if ($('#4cf74fc1-7349-11ea-a48e-000d3a7ae61a').val() != '') {
            var covCtxt = $("#51026c3d-4762-11ea-a01e-000d3a7ae61a");
            var selectedItem = $('#4cf74fc1-7349-11ea-a48e-000d3a7ae61a').find(":selected").text();
            if (selectedItem == "0% - Excluded") {
                covCtxt.val(0);
            } else {
                var perc = selectedItem.replace('%', '');
                var percentage = parseInt(perc) / 100;
                var calc = percentage * parseFloat(covA); // Ensure covA is treated as a number
                var roundedCalc = Math.round(calc); // Use Math.round to round to the nearest whole number
                covCtxt.val(roundedCalc);
            }
        }
        if ($('#4cf7497f-7349-11ea-a48e-000d3a7ae61a').val() != '') {
            var covBtxt = $("#4ba4acf4-4762-11ea-a01e-000d3a7ae61a");
            var selectedItem = $('#4cf7497f-7349-11ea-a48e-000d3a7ae61a').find(":selected").text();
            if ($('#4cf7497f-7349-11ea-a48e-000d3a7ae61a').find(":selected").text() == "0% - Excluded") {
                covBtxt.val(0);
            } else {
                var perc = selectedItem.replace('%', '');
                var percentage = parseInt(perc) / 100;
                var calc = percentage * parseFloat(covA); // Ensure covA is treated as a number
                var roundedCalc = Math.round(calc); // Use Math.round to round to the nearest whole number
                covBtxt.val(roundedCalc);
            }
        }
        if ($('#4cf75074-7349-11ea-a48e-000d3a7ae61a').val() != '') {
            var covDtxt = $("#56c19d6c-4762-11ea-a01e-000d3a7ae61a");
            var selectedItem = $('#4cf75074-7349-11ea-a48e-000d3a7ae61a').find(":selected").text();
            if (selectedItem == "0% - Excluded") {
                covDtxt.val(0);
            } else {
                var perc = selectedItem.replace('%', '');
                var percentage = parseInt(perc) / 100;
                var calc = percentage * parseFloat(covA); // Ensure covA is treated as a number
                var roundedCalc = Math.round(calc); // Use Math.round to round to the nearest whole number
                covDtxt.val(roundedCalc);
            }
        }
    }
});

$(document).on('click', '.displayButton', function (event) {
    event.preventDefault();
    if ($(this).hasClass('active')) {
        var div = $(this).attr('data-value');
        $('#' + div).hide();
        $(this).removeClass('active');
        $(this).blur();
    } else {
        var div = $(this).attr('data-value');
        $('#' + div).show();
        $(this).addClass('active');
        $(this).blur();
    }
});

$(document).on('click', '#verifyAddress', function (e) {
    e.preventDefault();
    qrShowLoader();
    if ($('#newLeadAddress').val() == '') {
        Swal.fire({
            title: 'Error!',
            text: 'For us to do a lookup on that address we need both the Address and Zipcode',
            icon: 'error',
            confirmButtonText: 'Try again!'
        })
    } else {
        qrShowLoader();
        var url = "functions/qr_functions.php";
        var address = $('#newLeadAddress').val();
        var addressline1 = address;
        var addressline2 = '';
        var city = $('#newLeadCity').val();
        var state = $('#newLeadState').val();
        if ($('#newLeadAddress2').val() == '') {
        } else {
            var address = address + ' ' + $('#newLeadAddress2').val();
            addressline2 = $('#newLeadAddress2').val();
        }
        var zip = $('#newLeadZip').val();
        var prevAddress = $('#newLeadPreviousAddress').val();
        if (document.getElementById('newLeadMailingSameAsProperty').checked) {
            var sameAsProperty = 'Yes';
        } else {
            var sameAsProperty = 'No';
        }
        var fname = $("#newLeadFirstName").val();
        var lname = $("#newLeadLastName").val();
        var email = $("#newLeadEmail").val();
        var phone = $("#newLeadPhone").val();

        if (prevAddress == '') {
            $.ajax({
                type: "POST",
                url: url,
                data: "get-property-data=" + addressline1 + '&addressline2=' + addressline2 + '&zip=' + zip + '&city=' + city + '&state=' + state + '&newLeadMailingSameAsProperty=' + sameAsProperty + '&newLeadFName=' + fname + '&newLeadLName=' + lname + '&newLeadPhone=' + phone + '&newLeadEMail=' + email,
                success: function (data, result) {
                    //

                    if (data && data.status === "Got Data") {
                        qrHideLoader();
                        Swal.fire({
                            title: 'We found it!',
                            html: 'Is this your address?<br/>' + data.data,
                            icon: 'success',
                            showCancelButton: true,
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'No, that is not my address',
                            confirmButtonText: 'Yes!'
                        }).then((result) => {
                            if (result.value) {
                                $('#newLeadState').val(data.state);
                                $('#911de265-4758-11ea-a01e-000d3a7ae61a').val(data.address);
                                $('#newLeadAddress').val(data.address);
                                $('#newLeadZip').val(data.zip);
                                $('#newLeadCity').val(data.city);
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'We were unable to pull information for that property. You can try again by modifying the address and zip.',
                                    icon: 'error',
                                    confirmButtonText: 'Try again!'
                                })
                            }
                        })
                    }
                    if (data && data.status !== "Got Data") {
                        qrHideLoader();
                        Swal.fire({
                            title: 'Error!',
                            text: 'We were unable to pull information for that property. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Try again!'
                        })
                    }
                }
            });
        } else {
            var prevAddress2 = $('#newLeadPreviousAddress2').val();
            var prevCity = $('#newLeadPreviousCity').val();
            var prevState = $('#newLeadPreviousState').val();
            var prevZip = $('#newLeadPreviousZip').val();
            $.ajax({
                type: "POST",
                url: url,
                data: "get-property-data=" + addressline1 + '&addressline2=' + addressline2 + '&zip=' + zip + '&city=' + city + '&state=' + state + '&prevAddress=' + prevAddress + '&prevAddress2=' + prevAddress2 + '&prevCity=' + prevCity + '&prevState=' + prevState + '&prevZip=' + prevZip + '&newLeadMailingSameAsProperty=' + sameAsProperty + '&newLeadFirstName=' + fname + '&newLeadLastName=' + lname + '&newLeadPhone=' + phone + '&newLeadEMail=' + email,
                success: function (data, result) {
                    //

                    if (data && data.status === "Got Data") {
                        qrHideLoader();
                        Swal.fire({
                            title: 'We found it!',
                            html: 'Is this your address?<br/>' + data.data,
                            icon: 'success',
                            showCancelButton: true,
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'No, that is not my address',
                            confirmButtonText: 'Yes!'
                        }).then((result) => {
                            if (result.value) {
                                $('#newLeadState').val(data.state);
                                $('#911de265-4758-11ea-a01e-000d3a7ae61a').val(data.address);
                                $('#newLeadAddress').val(data.address);
                                $('#newLeadZip').val(data.zip);
                                $('#newLeadCity').val(data.city);
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'We were unable to pull information for that property. You can try again by modifying the address and zip.',
                                    icon: 'error',
                                    confirmButtonText: 'Try again!'
                                })
                            }
                        })
                    }
                    if (data && data.status !== "Got Data") {
                        qrHideLoader();
                        Swal.fire({
                            title: 'Error!',
                            text: 'We were unable to pull information for that property. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Try again!'
                        })
                    }
                }
            });
        }
    }
    qrHideLoader();
});

$(document).on('click', '.addQRReminder', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    if ($('#Lead_Id').length > 0) {
        var val = $('#Lead_Id').val();
    } else {
        var val = GetQRURLParameter('Lead');
    }
    if (val != undefined && val != 'undefined' && val != '') {
        $.ajax({
            type: "POST", url: url, data: 'add-reminder=true&remLeadId=' + val, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    var modal_qtpanel = $('#qtpanel');
                    modal_qtpanel.find('.offcanvas-header>h5').text("Add Reminder");
                    modal_qtpanel.find('.offcanvas-body').html(data.data);
                    $('#qtpanel').offcanvas('show');
                    $('select').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                    });

                    qrHideLoader();
                }
                if (data && data.status !== "Got Data") {
                }
            }
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'We were unable to add a reminder for this lead. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try again!'
        })
    }
    return false;
});


$(document).on('click', '.coverageACalculator', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: 'getCalculatorAmounts=true', success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchCenteredModalQR(data.data, 'Coverage A Calculator');
                var sqft = $('#8b704857-4759-11ea-a01e-000d3a7ae61a').val();
                $('#coverageACalculatorSqFt').val(sqft);
                var checkedRadioButton = $('.coverageACalculatorQuality:checked').attr('id');
                var calcVal = $('#' + checkedRadioButton + '-value').val();
                if (calcVal != '' && calcVal > 0) {
                    var sqft = $('#8b704857-4759-11ea-a01e-000d3a7ae61a').val();
                    $('#cova-calculated').val(sqft * calcVal);
                }
                qrHideLoader();
            }
            if (data && data.status !== "Got Data") {
                qrDisplayAlert("We were unable to get the calculator at this time, please try again or contact Support for assistance.", "error");
            }
        }
    });
    return false;
});


$(document).on('click', '.updateCalcAmountsForAgency', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    var calcEconomy = $('#covacalc-economy-value').val();
    var calcStandard = $('#covacalc-standard-value').val();
    var calcAboveAverage = $('#covacalc-aboveaverage-value').val();
    var calcCustom = $('#covacalc-custom-value').val();
    var calcPremium = $('#covacalc-premium-value').val();
    var calcDefaultQuality = $('.coverageACalculatorQuality:checked').data('quality');
    var rid = $(this).attr('data-value');
    $.ajax({
        type: "POST",
        url: url,
        data: 'updateCalcAmountsForAgency=' + rid + '&calcDefaultQuality=' + calcDefaultQuality + '&calcEconomy=' + calcEconomy + '&calcStandard=' + calcStandard + '&calcAboveAverage=' + calcAboveAverage + '&calcCustom=' + calcCustom + '&calcPremium=' + calcPremium + '',
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#closeCoverageACalc').trigger('click');
                qrDisplayAlert("Calculator Amounts Updated Successfully.", "success");
                qrHideLoader();
            }
            if (data && data.status !== "Got Data") {
                qrDisplayAlert("We were unable to update the calculator amounts at this time, please try again or contact Support for assistance.", "error");
            }
        }
    });
    return false;
});

$(document).on('click', '.updateCoverageAFromCal', function (e) {
    e.preventDefault();
    var newCovA = $('#cova-calculated').val();
    $('#45c179fe-4762-11ea-a01e-000d3a7ae61a').val(newCovA);
    $('#closeCoverageACalc').trigger('click');
    return false;
});

$(document).on('change', '.coverageACalculatorQuality', function (e) {
    e.preventDefault();
    var id = $(this).attr('id');
    var calcVal = $('#' + id + '-value').val();
    if (calcVal != '' && calcVal > 0) {
        var sqft = $('#8b704857-4759-11ea-a01e-000d3a7ae61a').val();
        $('#cova-calculated').val(sqft * calcVal);
    }
    return false;
});

$(document).on('change keyup input', '.coverageACalculatorSqFt', function (e) {
    e.preventDefault();
    var checkedRadioButton = $('.coverageACalculatorQuality:checked').attr('id');
    var calcVal = $('#' + checkedRadioButton + '-value').val();
    if (calcVal != '' && calcVal > 0) {
        var sqft = $('#8b704857-4759-11ea-a01e-000d3a7ae61a').val();
        $('#cova-calculated').val(sqft * calcVal);
    }
    return false;
});

$(document).on('change keyup input', '.coverageACalculatorValue', function (e) {
    e.preventDefault();
    var checkedRadioButton = $('.coverageACalculatorQuality:checked').attr('id');
    var thisIdRaw = $(this).attr('id');
    var compId = thisIdRaw.replace('-value', '');
    if (checkedRadioButton == compId) {
        var calcVal = $('#' + checkedRadioButton + '-value').val();
        if (calcVal != '' && calcVal > 0) {
            var sqft = $('#8b704857-4759-11ea-a01e-000d3a7ae61a').val();
            $('#cova-calculated').val(sqft * calcVal);
        }
    }
    return false;
});


$(document).on('submit', '#newReminderForm', function (event) {
    var form = $("#newReminderForm")
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        var newReminderNotes = $("#newReminderNotes").val();
        var newReminderNotes = newReminderNotes.trim();
        if (newReminderNotes == '' || newReminderNotes == 'undefined') {
            $("#newReminderNotes").css("border", "2px solid red");
            qrDisplayAlert("Please fill the all required fields", "error");

        } else {
            event.preventDefault();
            qrShowLoader();
            var url = 'functions/qr_functions.php';
            $.ajax({
                type: "POST", url: url, data: $('#newReminderForm').serialize(), success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Reminder added successfully! We are going to refresh the page.',
                            icon: 'success',
                            confirmButtonText: 'Ok!'
                        });
                        qrHideLoader();
                        setTimeout(location.reload.bind(location), 6000);

                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to add this Reminder! Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                        qrHideLoader();
                    }
                }
            });
        }
    }
    qrHideLoader();
    form.addClass('was-validated');
    return false;
});


$(document).on('submit', '#qrReminderEditForm', function (event) {
    var form = $("#qrReminderEditForm")
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        var newReminderNotes = $("#qrReminderNotes").val();
        var newReminderNotes = newReminderNotes.trim();
        if (newReminderNotes == '' || newReminderNotes == 'undefined') {
            $("#qrReminderNotes").css("border", "2px solid red");
            qrDisplayAlert("Please fill the all required fields", "error");
        } else {
            event.preventDefault();
            qrShowLoader();
            var url = 'functions/qr_functions.php';
            $.ajax({
                type: "POST", url: url, data: $('#qrReminderEditForm').serialize(), success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        emptyAndCloseCenteredModalQR();
                        qrHideLoader();
                        Swal.fire({
                            title: 'Success!',
                            text: 'Reminder updated successfully! We are going to refresh the page.',
                            icon: 'success',
                            confirmButtonText: 'Ok!'
                        });
                        setTimeout(location.reload.bind(location), 3000);
                    } else if (data && data.status != "No Changes") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'No changes were found. If you have no changes please click Cancel, or contact Support for assistance.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                        qrHideLoader();
                    } else {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to update this Reminder! Please try again, or contact support if the problem persists.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                        qrHideLoader();
                    }
                }
            });
        }
    }
    qrHideLoader();
    form.addClass('was-validated');
    return false;
});

$(document).on('click', '.qrDismissReminder', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');
    var tr = $(this).closest('tr');
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Do you have any notes to add?",
        input: 'textarea',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Dismiss',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            if (result.value.trim() == "") {
                textToAdd = ""
            } else {
                textToAdd = result.value.trim();
            }

            var count = $('.notificationCounterBadge')[0].innerText;
            count--;
            $('.notificationCounterBadge')[0].innerText = count;
            $.ajax({
                url: 'functions/qr_functions.php',
                type: "POST",
                data: 'dismiss-reminder=' + val + '&dismiss-reminder-notes=' + textToAdd,
                success: function (data, result, row) {
                    if (data && data.status === "Got Data") {
                        Swal.fire({
                            title: 'Success!', text: 'Reminder Dismissed.', icon: 'success', confirmButtonText: 'Ok!'
                        });
                        $('#overview-task-complete .gridjs-table tbody').append(tr);
                        tr.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'There was a problem dismissing that reminder. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                    }
                }
            })
        }
    })
    return false; //for good measure
});


$(document).on('click', '.dismissAllQRNotifications', function (event) {
    event.preventDefault();
    var val = $(this).attr('data-value');
    var tr = $(this).closest('tr');
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will dismiss ALL of your current open reminders. To continue you must enter notes.",
        input: 'textarea',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Dismiss All',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            if (result.value.trim() == "") {
                textToAdd = ""
            } else {
                textToAdd = result.value.trim();
            }
            if (textToAdd == '') {
                Swal.fire({
                    title: 'Whoops!',
                    text: 'You have to enter notes when you dismiss all of your reminders at once. Please try again and enter notes.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            } else {
                $.ajax({
                    url: 'functions/qr_functions.php',
                    type: "POST",
                    data: 'dismiss-reminder=AllReminders&dismiss-reminder-notes=' + textToAdd,
                    success: function (data, result, row) {
                        if (data && data.status === "Got Data") {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Reminders Dismissed.',
                                icon: 'success',
                                confirmButtonText: 'Ok!'
                            });
                            $('.notificationCounterBadge')[0].innerText = 0;
                            $('#notificationsBar .simplebar-content').html("a href='#!' class='text-reset notification-item text-center'><div class='d-flex'><div class='flex-grow-1'><h6 class='mb-1'>No Reminders</h6><div class='font-size-13 text-muted'><p class='mb-1'>All caught up!</p></div></div></div></a>");
                        }
                        if (data && data.status !== "Got Data") {
                            Swal.fire({
                                title: 'Whoops!',
                                text: 'There was a problem dismissing all of your reminders. Please try again.',
                                icon: 'error',
                                confirmButtonText: 'Ok!'
                            });
                        }
                    }
                })
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.qrDeleteReminder', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    tr = $(this).closest('tr');
    $.ajax({
        url: 'functions/qr_functions.php',
        type: "POST",
        data: 'delete-reminder=' + val,
        success: function (data, result, row) {
            if (data && data.status === "Got Data") {
                qrDisplayAlert("Reminder deleted successfully", "success")
                tr.remove();
            }
            if (data && data.status !== "Got Data") {
                qrDisplayAlert("There was a problem deleting that reminder. Please try again, or contact support.", "error")
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '#deleteLead', function (event) {
    event.preventDefault();
    val = $('#Lead_Id').val();
    Swal.fire({
        title: "Delete Lead",
        text: "Are you sure you want to delete this Lead?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Delete Lead",
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'functions/qr_functions.php', type: "POST", data: 'delete-lead=' + val, // dataType: "json",
                beforeSend: function () {
                    qrShowLoader();
                }, success: function (data, result) {
                    qrHideLoader();
                    if (data && data.status === "Got Data") {

                        qrDisplayAlert("Lead Deleted, please wait while we navigate home.", "success")
                        setTimeout(window.location = "qr-index.php", 3000);
                    }
                    if (data && data.status !== "Got Data") {
                        qrHideLoader();
                        qrDisplayAlert("There was a problem deleting that lead. Please try again, or contact support.", "error")
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
        return false; //for good measure
    });
});


$(document).on('click', '.performAutoLookup', function (event) {
    event.preventDefault();
    qrShowLoader();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, dataType: 'JSON', data: $('#updLead').serialize(), success: function (data, result) {
            qrHideLoader("Please wait while we check for Auto information.");
            if (data && data.status === "Got Data") {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
                    }, buttonsStyling: false
                });

                swalWithBootstrapButtons.fire({
                    title: 'Please choose the address we should use to lookup the Driver(s) and Vehicle(s). (Default will be Mailing Address)',
                    html: `<div class="col-md-12 text-center mb-4 mt-2 border-bottom border-primary"><div class="form-check col-md-6 col-lg-4 mb-3" id="useMailing-div"><input id="useMailing" type="checkbox" class="form-check-input"><label class="control-label">Use Mailing Address</label></div><div class="form-check col-md-6 col-lg-4 mb-3" id="useProperty-div"><input id="useProperty" type="checkbox" class="form-check-input"><label class="control-label">Use Property Address</label></div></div>`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Lookup',
                    cancelButtonText: 'Cancel',
                    reverseButtons: false
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.cancel) {
                    } else {
                        var useMailingChecked = $('#useMailing').prop('checked');
                        var usePropertyChecked = $('#useProperty').prop('checked');
                        var postData = {};
                        if (useMailingChecked) {
                            postData.useMailing = true;
                        }
                        if (usePropertyChecked) {
                            postData.useProperty = true;
                        }

                        var leadId = GetURLParameter("Lead");
                        if (leadId != '') {
                            postData.AutoLookupLead = leadId;
                            $.ajax({
                                url: 'functions/qr_functions.php',
                                type: "POST",
                                data: postData,
                                success: function (data) {
                                    if (data && data.status === "Got Data") {
                                        var numDrivers = data.numDrivers;
                                        var numAutos = data.numAutos;
                                        Swal.fire({
                                            title: 'Success!',
                                            text: 'Lookup completed. Found ' + numDrivers + ' Driver(s), and ' + numAutos + ' Vehicle(s). Please wait while we reload the Lead to show the change(s).',
                                            icon: 'success',
                                            confirmButtonText: 'Ok!'
                                        });
                                        $('#viewQRLeadButton').trigger('click');
                                    } else {
                                        Swal.fire({
                                            title: 'Whoops!',
                                            text: 'There was a problem with the lookup. Please try again.',
                                            icon: 'error',
                                            confirmButtonText: 'Ok!'
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'We were unable to save the changes before performing a lookup. Please try again, and contact support if this problem persists.',
                    icon: 'error',
                    confirmButtonText: ':('
                });
            }
        }, error: function (request, status, err) {
            qrHideLoader();
            Swal.fire({
                title: 'Error!',
                text: 'We were unable location Auto information for this lead, please try again or contact Support if this problem persists.',
                icon: 'error',
                confirmButtonText: ':('
            });
            return false;
        }
    });
    return false; //for good measure
});


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function handleVisibilityChange() {
    if (document.hidden) {
    } else {
        // the page is visible
        var url = "functions/qr_functions.php";
        var lead = $('#Lead_Id').val();
        $.ajax({
            type: "POST", url: url, data: 'get-mtc-result=true&mtc-lead=' + lead, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    qrHideLoader();
                    $('#2231b7f6-4759-11ea-a01e-000d3a7ae61a').val(data.data);
                }
                if (data && data.status !== "Got Data") {
                    qrHideLoader();
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'Well that did not work. Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
        qrHideLoader();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
}

$(document).on('click', '#getMTC', function (e) {
    qrShowLoader();
    document.addEventListener("visibilitychange", handleVisibilityChange, false);
});


$(document).on('click', '#submitRQSitesHome', function (event) {
    event.preventDefault();
    if ($('#selected-carriers').val() != '') {
        qrShowLoader('Please wait, submitting Carrier(s)');
        var carriers = $('#selected-carriers').val();
        var lead = $('#Lead_Id').val();
        var url = 'functions/qr_functions.php';
        $('#submitRQSitesHome').attr('disabled', true);
        var runRCE = $('#runCarrierRCE').is(":checked");
        if (runRCE == false) {
            $.ajax({
                type: "POST",
                url: url,
                data: 'submit-to-bot=true&sites=' + carriers + '&Lead_Id=' + lead + '&LOB=Home',
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        $('#submitRQSitesHome').attr('disabled', false);
                        Swal.fire({
                            title: 'Success!',
                            text: data.sitesSubmitted + ' Carriers queued up!',
                            icon: 'success',
                            confirmButtonText: 'Ok!'
                        });
                    }
                    if (data && data.status !== "Got Data") {
                        $('#submitRQSitesHome').attr('disabled', false);
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to queue up that lead, please try again.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                    }
                },
                complete: function (result) {
                    qrHideLoader();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: url,
                data: 'submit-to-bot=true&sites=' + carriers + '&Lead_Id=' + lead + '&LOB=Home' + '&runCarrierRCE=true',
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        $('#submitRQSitesHome').attr('disabled', false);
                        Swal.fire({
                            title: 'Success!',
                            text: data.sitesSubmitted + ' Carriers queued up!',
                            icon: 'success',
                            confirmButtonText: 'Ok!'
                        });
                    }
                    if (data && data.status !== "Got Data") {
                        $('#submitRQSitesHome').attr('disabled', false);
                        Swal.fire({
                            title: 'Whoops!',
                            text: 'We were unable to queue up that lead, please try again.',
                            icon: 'error',
                            confirmButtonText: 'Ok!'
                        });
                    }
                },
                complete: function (result) {
                    qrHideLoader();
                },
                error: function (result) {
                    qrHideLoader();
                }
            });
        }
    } else {

        Swal.fire({
            title: 'Whoops!',
            text: 'You did not select any carriers. Please select carriers to quote with and re-submit.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
    return false;
});

$(document).on('click', '#submitRQSitesAuto', function (event) {
    event.preventDefault();
    if ($('#selected-auto-carriers').val() != '') {
        qrShowLoader(`Please wait, submitting Carrier(s)`);
        var carriers = $('#selected-auto-carriers').val();
        var lead = $('#Lead_Id').val();
        var url = 'functions/qr_functions.php';
        $('#submitRQSitesAuto').attr('disabled', true);
        $.ajax({
            type: "POST",
            url: url,
            data: 'submit-auto-to-bot=true&sites=' + carriers + '&Lead_Id=' + lead + '&LOB=Auto',
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#submitRQSitesAuto').attr('disabled', false);
                    Swal.fire({
                        title: 'Success!',
                        text: data.sitesSubmitted + ' Carriers queued up!',
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                    });
                }
                if (data && data.status !== "Got Data") {
                    $('#submitRQSitesAuto').attr('disabled', false);
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to queue up that lead, please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            },
            complete: function (result) {
                qrHideLoader();
            },
            error: function (result) {
                qrHideLoader();
            }
        });
    } else {

        Swal.fire({
            title: 'Whoops!',
            text: 'You did not select any carriers. Please select carriers to quote with and re-submit.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
    return false;
});

$(document).on('click', '#submitRQSitesFlood', function (event) {
    event.preventDefault();
    if ($('#selected-flood-carriers').val() != '') {
        qrShowLoader(`Please wait, submitting Carrier(s)`);
        var carriers = $('#selected-flood-carriers').val();
        var lead = $('#Lead_Id').val();
        var url = 'functions/qr_functions.php';
        $('#submitRQSitesFlood').attr('disabled', true);
        $.ajax({
            type: "POST",
            url: url,
            data: 'submit-flood-to-bot=true&sites=' + carriers + '&Lead_Id=' + lead + '&LOB=Flood',
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#submitRQSitesFlood').attr('disabled', false);
                    Swal.fire({
                        title: 'Success!',
                        text: data.sitesSubmitted + ' Carriers queued up!',
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                    });
                }
                if (data && data.status !== "Got Data") {
                    $('#submitRQSitesFlood').attr('disabled', false);
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to queue up that lead, please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            },
            complete: function (result) {
                qrHideLoader();
            },
            error: function (result) {
                qrHideLoader();
            }
        });
    } else {

        Swal.fire({
            title: 'Whoops!',
            text: 'You did not select any carriers. Please select carriers to quote with and re-submit.',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    }
    return false;
});

$(document).on('click', '.hideHomeQuotesZero', function (event) {
    var val = $("#viewQRLeadButton").attr('data-value');
    var values = [7, 14, 30, 60, 90, 120];
    var daysVal = $("#daysprint").val();
    var days = values[daysVal];

    if ($("#hq-div").length > 0) {
        var div = 'hq-table';
    }
    if ($("#overview-quotes-table-home").length > 0) {
        var div = 'overview-quotes-table-home';
    }

    $('#' + div).DataTable({
        "destroy": true, "processing": true, "responsive": true, "serverSide": true, "ajax": {
            "url": "qr-hq-data-grid-v2.php", "type": "GET", "data": function (d) {
                d.lead = val; // Assuming 'val' is already defined
                d.days = days; // Assuming 'days' is already defined
                d.hideZeroPremium = true;
            }
        }, columnDefs: [{ targets: 1, responsivePriority: 1 }, // Highest priority, last to be hidden
        { targets: 2, responsivePriority: 2 }], "columns": [{ "data": "Id" }, {
            "data": "Carrier", "render": function (data, type, row) {
                // Using CarrierURL to generate link for the Carrier column
                return data ? `<a href="${row.CarrierURL}" target="_blank" class='btn btn-primary waves-effect waves-light btn-sm'>${data} <i class='fa fa-arrow-up-right-from-square'></i></a>` : data;
            }
        }, { "data": "Description" }, { "data": "Premium" }, {
            "data": "QuoteDate", "type": "date"
        }, {
            "data": "Property", "orderable": false, "visible": false
        }, {
            "data": "Actions", "orderable": false, "render": function (data, type, row) {
                return `<div class="btn-group"><button title="View Quote Messages" class="btn btn-sm btn-success viewHomeQuoteMessages" data-value="${row.Id}"><i class="fa fa-eye font-size-14"></i></button>
                            <button title="Edit Quote" class="btn btn-sm btn-primary editQRQuote" data-lob="Home" data-value="${row.Id}"><i class="mdi mdi-pencil font-size-14"></i></button>
                            <button title="Delete Quote" class="btn btn-sm btn-danger deleteHomeQuote" data-value="${row.Id}"><i class="mdi mdi-delete font-size-14"></i></button></div>`;
            }, "orderable": false
        }, {
            "data": "CarrierURL", "visible": false // Ensure the URL is hidden in the table
        }], "order": [[4, "desc"]], rowCallback: function (row, data) {
            // Normalize once, avoid DOM queries
            const html = String(data.Description || '');

            row.classList.remove('row-qWindOnly', 'row-qWindExcluded', 'row-qRiskIneligible', 'row-qWindExcludedAndIneligible', 'row-qCDReshop', 'row-qReShopBOT');

            if (html.includes('qWindOnly')) row.classList.add('row-qWindOnly');
            if (html.includes('qWindExcluded')) row.classList.add('row-qWindExcluded');
            if (html.includes('qRiskIneligible')) row.classList.add('row-qRiskIneligible');
            if (html.includes('qWindExcludedAndIneligible')) row.classList.add('row-qWindExcludedAndIneligible');
            if (html.includes('qCDReshop')) row.classList.add('row-qCDReshop');
            if (html.includes('qReShopBOT')) row.classList.add('row-qReShopBOT');
        }
    });
});

$(document).on('click', '.ticketContact', function (event) {
    if ($("#ticketEmail").val() != '') {
        $('#emailable').addClass('active');
    }
})

$(document).on('click', '.resetHomeQuotes', function (event) {
    var val = GetURLParameter("Lead");
    var values = [7, 14, 30, 60, 90, 120];
    var daysVal = $("#daysprint").val();
    var days = values[daysVal];
    if ($("#hq-div").length > 0) {
        var div = 'hq-table';
    }
    if ($("#overview-quotes-table-home").length > 0) {
        var div = 'overview-quotes-table-home';
    }

    $('#' + div).DataTable({
        "destroy": true, "processing": true, "responsive": true, "serverSide": true, "ajax": {
            "url": "qr-hq-data-grid-v2.php", "type": "GET", "data": function (d) {
                d.lead = val; // Assuming 'val' is already defined
                d.days = days; // Assuming 'days' is already defined
            }
        }, columnDefs: [{ targets: 1, responsivePriority: 1 }, // Highest priority, last to be hidden
        { targets: 2, responsivePriority: 2 }], "columns": [{ "data": "Id" }, {
            "data": "Carrier", "render": function (data, type, row) {
                // Using CarrierURL to generate link for the Carrier column
                return data ? `<a href="${row.CarrierURL}" target="_blank" class='btn btn-primary waves-effect waves-light btn-sm'>${data} <i class='fa fa-arrow-up-right-from-square'></i></a>` : data;
            }
        }, { "data": "Description" }, { "data": "Premium" }, {
            "data": "QuoteDate", "type": "date"
        }, {
            "data": "Property", "orderable": false, "visible": false
        }, {
            "data": "Actions", "orderable": false, "render": function (data, type, row) {
                return `<div class="btn-group"><button title="View Quote Messages" class="btn btn-sm btn-success viewHomeQuoteMessages" data-value="${row.Id}"><i class="fa fa-eye font-size-14"></i></button>
                            <button title="Edit Quote" class="btn btn-sm btn-primary editQRQuote" data-lob="Home" data-value="${row.Id}"><i class="mdi mdi-pencil font-size-14"></i></button>
                            <button title="Delete Quote" class="btn btn-sm btn-danger deleteHomeQuote" data-value="${row.Id}"><i class="mdi mdi-delete font-size-14"></i></button></div>`;
            }, "orderable": false
        }, {
            "data": "CarrierURL", "visible": false // Ensure the URL is hidden in the table
        }], "order": [[4, "desc"]], rowCallback: function (row, data) {
            // Normalize once, avoid DOM queries
            const html = String(data.Description || '');

            row.classList.remove('row-qWindOnly', 'row-qWindExcluded', 'row-qRiskIneligible', 'row-qWindExcludedAndIneligible', 'row-qCDReshop', 'row-qReShopBOT');

            if (html.includes('qWindOnly')) row.classList.add('row-qWindOnly');
            if (html.includes('qWindExcluded')) row.classList.add('row-qWindExcluded');
            if (html.includes('qRiskIneligible')) row.classList.add('row-qRiskIneligible');
            if (html.includes('qWindExcludedAndIneligible')) row.classList.add('row-qWindExcludedAndIneligible');
            if (html.includes('qCDReshop')) row.classList.add('row-qCDReshop');
            if (html.includes('qReShopBOT')) row.classList.add('row-qReShopBOT');
        }
    });
});

$(document).on('click', '.hideAutoQuotesZero', function (event) {
    var val = GetURLParameter("Lead");
    var values = [7, 14, 30, 60, 90, 120];
    var daysVal = $("#daysprint").val();
    var days = values[daysVal];
    if ($("#aq-div").length > 0) {
        var div = 'aq-table';
    }
    if ($("#overview-quotes-table-auto").length > 0) {
        var div = 'overview-quotes-table-auto';
    }
    $('#' + div).DataTable({
        "destroy": true,
        "processing": true,
        "responsive": true,
        "serverSide": true,
        "ajax": {
            "url": "qr-aq-data-grid-v2.php", "type": "GET", "data": function (d) {
                d.lead = val;
                d.days = days;
                d.hideZeroPremium = true;
            }
        },
        columnDefs: [{ targets: 1, responsivePriority: 1 }, { targets: 2, responsivePriority: 2 }],
        "columns": [{ "data": "Id" }, {
            "data": "Carrier", "render": function (data, type, row) {
                return data ? `<a href="${row.CarrierURL}" target="_blank" class='btn btn-primary waves-effect waves-light btn-sm'>${data} <i class='fa fa-arrow-up-right-from-square'></i></a>` : data;
            }
        }, { "data": "Description" }, { "data": "Premium" }, {
            "data": "QuoteDate", "type": "date"
        }, {
            "data": "Actions", "orderable": false, "render": function (data, type, row) {
                return `<div class="btn-group"><button title="View Quote Messages" class="btn btn-sm btn-success viewAutoQuoteMessages" data-value="${row.Id}"><i class="fa fa-eye font-size-14"></i></button>
                            <button title="Edit Quote" class="btn btn-sm btn-primary editQRQuote" data-lob="Auto" data-value="${row.Id}"><i class="mdi mdi-pencil font-size-14"></i></button>
                            <button title="Delete Quote" class="btn btn-sm btn-danger deleteAutoQuote" data-value="${row.Id}"><i class="mdi mdi-delete font-size-14"></i></button></div>`;
            }, "orderable": false
        }, {
            "data": "CarrierURL", "visible": false // Ensure the URL is hidden in the table
        }],
        "order": [[4, "desc"]],
        rowCallback: function (row, data) {
            // Normalize once, avoid DOM queries
            const html = String(data.Description || '');

            row.classList.remove('row-qWindOnly', 'row-qWindExcluded', 'row-qRiskIneligible', 'row-qWindExcludedAndIneligible', 'row-qCDReshop', 'row-qReShopBOT');

            if (html.includes('qWindOnly')) row.classList.add('row-qWindOnly');
            if (html.includes('qWindExcluded')) row.classList.add('row-qWindExcluded');
            if (html.includes('qRiskIneligible')) row.classList.add('row-qRiskIneligible');
            if (html.includes('qWindExcludedAndIneligible')) row.classList.add('row-qWindExcludedAndIneligible');
            if (html.includes('qCDReshop')) row.classList.add('row-qCDReshop');
            if (html.includes('qReShopBOT')) row.classList.add('row-qReShopBOT');
        }
    });
});

$(document).on('click', '.resetAutoQuotes', function (event) {
    var val = GetURLParameter("Lead");
    var values = [7, 14, 30, 60, 90, 120];
    var daysVal = $("#daysprint").val();
    var days = values[daysVal];
    if ($("#aq-div").length > 0) {
        var div = 'aq-table';
    }
    if ($("#overview-quotes-table-auto").length > 0) {
        var div = 'overview-quotes-table-auto';
    }
    $('#' + div).DataTable({
        "destroy": true,
        "processing": true,
        "responsive": true,
        "serverSide": true,
        "ajax": {
            "url": "qr-aq-data-grid-v2.php", "type": "GET", "data": function (d) {
                d.lead = val;
                d.days = days;
            }
        },
        columnDefs: [{ targets: 1, responsivePriority: 1 }, { targets: 2, responsivePriority: 2 }],
        "columns": [{ "data": "Id" }, {
            "data": "Carrier", "render": function (data, type, row) {
                return data ? `<a href="${row.CarrierURL}" target="_blank" class='btn btn-primary waves-effect waves-light btn-sm'>${data} <i class='fa fa-arrow-up-right-from-square'></i></a>` : data;
            }
        }, { "data": "Description" }, { "data": "Premium" }, {
            "data": "QuoteDate", "type": "date"
        }, {
            "data": "Actions", "orderable": false, "render": function (data, type, row) {
                return `<div class="btn-group"><button title="View Quote Messages" class="btn btn-sm btn-success viewAutoQuoteMessages" data-value="${row.Id}"><i class="fa fa-eye font-size-14"></i></button>
                            <button title="Edit Quote" class="btn btn-sm btn-primary editQRQuote" data-lob="Auto" data-value="${row.Id}"><i class="mdi mdi-pencil font-size-14"></i></button>
                            <button title="Delete Quote" class="btn btn-sm btn-danger deleteAutoQuote" data-value="${row.Id}"><i class="mdi mdi-delete font-size-14"></i></button></div>`;
            }, "orderable": false
        }, {
            "data": "CarrierURL", "visible": false // Ensure the URL is hidden in the table
        }],
        "order": [[4, "desc"]],
        rowCallback: function (row, data) {
            const html = String(data.Description || '');

            row.classList.remove('row-qWindOnly', 'row-qWindExcluded', 'row-qRiskIneligible', 'row-qWindExcludedAndIneligible', 'row-qCDReshop', 'row-qReShopBOT');

            if (html.includes('qWindOnly')) row.classList.add('row-qWindOnly');
            if (html.includes('qWindExcluded')) row.classList.add('row-qWindExcluded');
            if (html.includes('qRiskIneligible')) row.classList.add('row-qRiskIneligible');
            if (html.includes('qWindExcludedAndIneligible')) row.classList.add('row-qWindExcludedAndIneligible');
            if (html.includes('qCDReshop')) row.classList.add('row-qCDReshop');
            if (html.includes('qReShopBOT')) row.classList.add('row-qReShopBOT');
        }
    });
});

$(document).on('click', '.hideFloodQuotesZero', function (event) {
    var val = GetURLParameter("Lead");
    var values = [7, 14, 30, 60, 90, 120];
    var daysVal = $("#daysprint").val();
    var days = values[daysVal];
    if ($("#fq-div").length > 0) {
        var div = 'fq-table';
    }
    if ($("#overview-quotes-table-flood").length > 0) {
        var div = 'overview-quotes-table-flood';
    }
    $('#' + div).DataTable({
        "destroy": true,
        "processing": true,
        "responsive": true,
        "serverSide": true,
        "ajax": {
            "url": "qr-fq-data-grid-v2.php", "type": "GET", "data": function (d) {
                d.lead = val;
                d.days = days;
                d.hideZeroPremium = true
            }
        },
        columnDefs: [{ targets: 1, responsivePriority: 1 }, { targets: 2, responsivePriority: 2 }],
        "columns": [{ "data": "Id" }, {
            "data": "Carrier", "render": function (data, type, row) {
                return data ? `<a href="${row.CarrierURL}" target="_blank" class='btn btn-primary waves-effect waves-light btn-sm'>${data} <i class='fa fa-arrow-up-right-from-square'></i></a>` : data;
            }
        }, { "data": "Description" }, { "data": "Premium" }, {
            "data": "QuoteDate", "type": "date"
        }, {
            "data": "Actions", "orderable": false, "render": function (data, type, row) {
                return `<div class="btn-group"><button title="View Quote Messages" class="btn btn-sm btn-success viewFloodQuoteMessages" data-value="${row.Id}"><i class="fa fa-eye font-size-14"></i></button>
                            <button title="Edit Quote" class="btn btn-sm btn-primary editQRQuote" data-lob="Flood" data-value="${row.Id}"><i class="mdi mdi-pencil font-size-14"></i></button>
                            <button title="Delete Quote" class="btn btn-sm btn-danger deleteFloodQuote" data-value="${row.Id}"><i class="mdi mdi-delete font-size-14"></i></button></div>`;
            }, "orderable": false
        }, {
            "data": "CarrierURL", "visible": false // Ensure the URL is hidden in the table
        }],
        "order": [[4, "desc"]],
        rowCallback: function (row, data) {
            // Normalize once, avoid DOM queries
            const html = String(data.Description || '');

            row.classList.remove('row-qWindOnly', 'row-qWindExcluded', 'row-qRiskIneligible', 'row-qWindExcludedAndIneligible', 'row-qCDReshop', 'row-qReShopBOT');

            if (html.includes('qWindOnly')) row.classList.add('row-qWindOnly');
            if (html.includes('qWindExcluded')) row.classList.add('row-qWindExcluded');
            if (html.includes('qRiskIneligible')) row.classList.add('row-qRiskIneligible');
            if (html.includes('qWindExcludedAndIneligible')) row.classList.add('row-qWindExcludedAndIneligible');
            if (html.includes('qCDReshop')) row.classList.add('row-qCDReshop');
            if (html.includes('qReShopBOT')) row.classList.add('row-qReShopBOT');
        }
    });
});

$(document).on('click', '.resetFloodQuotes', function (event) {
    var val = GetURLParameter("Lead");
    var values = [7, 14, 30, 60, 90, 120];
    var daysVal = $("#daysprint").val();
    var days = values[daysVal];
    if ($("#fq-div").length > 0) {
        var div = 'fq-table';
    }
    if ($("#overview-quotes-table-flood").length > 0) {
        var div = 'overview-quotes-table-flood';
    }
    $('#' + div).DataTable({
        "destroy": true,
        "processing": true,
        "responsive": true,
        "serverSide": true,
        "ajax": {
            "url": "qr-fq-data-grid-v2.php", "type": "GET", "data": function (d) {
                d.lead = val;
                d.days = days;
            }
        },
        columnDefs: [{ targets: 1, responsivePriority: 1 }, { targets: 2, responsivePriority: 2 }],
        "columns": [{ "data": "Id" }, {
            "data": "Carrier", "render": function (data, type, row) {
                return data ? `<a href="${row.CarrierURL}" target="_blank" class='btn btn-primary waves-effect waves-light btn-sm'>${data} <i class='fa fa-arrow-up-right-from-square'></i></a>` : data;
            }
        }, { "data": "Description" }, { "data": "Premium" }, {
            "data": "QuoteDate", "type": "date"
        }, {
            "data": "Actions", "orderable": false, "render": function (data, type, row) {
                return `<div class="btn-group"><button title="View Quote Messages" class="btn btn-sm btn-success viewFloodQuoteMessages" data-value="${row.Id}"><i class="fa fa-eye font-size-14"></i></button>
                            <button title="Edit Quote" class="btn btn-sm btn-primary editQRQuote" data-lob="Flood" data-value="${row.Id}"><i class="mdi mdi-pencil font-size-14"></i></button>
                            <button title="Delete Quote" class="btn btn-sm btn-danger deleteFloodQuote" data-value="${row.Id}"><i class="mdi mdi-delete font-size-14"></i></button></div>`;
            }, "orderable": false
        }, {
            "data": "CarrierURL", "visible": false
        }],
        "order": [[4, "desc"]],
        rowCallback: function (row, data) {
            // Normalize once, avoid DOM queries
            const html = String(data.Description || '');

            row.classList.remove('row-qWindOnly', 'row-qWindExcluded', 'row-qRiskIneligible', 'row-qWindExcludedAndIneligible', 'row-qCDReshop', 'row-qReShopBOT');

            if (html.includes('qWindOnly')) row.classList.add('row-qWindOnly');
            if (html.includes('qWindExcluded')) row.classList.add('row-qWindExcluded');
            if (html.includes('qRiskIneligible')) row.classList.add('row-qRiskIneligible');
            if (html.includes('qWindExcludedAndIneligible')) row.classList.add('row-qWindExcludedAndIneligible');
            if (html.includes('qCDReshop')) row.classList.add('row-qCDReshop');
            if (html.includes('qReShopBOT')) row.classList.add('row-qReShopBOT');
        }
    });
});

$(document).on('click', '.viewQuoteMessages', function (event) {
    const val = $(this).attr('data-value');
    const lob = $(this).data('lob');
    qrDisplayAlert('Please wait, loading...', 'info');

    $.ajax({
        url: 'functions/qr_functions.php',
        type: 'POST',
        data: `viewQuoteMessages=${val}&qmlob=${lob}`,
        dataType: 'JSON',
        success: function (data, result) {
            const { status, data: messages } = data;

            switch (status) {
                case 'Got Data':
                    launchCenteredModalQR(messages, 'Quote Messages');
                    break;
                case 'No Messages':
                    qrDisplayAlert('No Messages were found for that quote.', 'success');
                    break;
                default:
                    qrDisplayAlert('We were unable to pull messages for that quote. Please try again, or contact Support if this problem persists.', 'error');
            }
        }
    });
});

$(document).on('click', '.deleteFloodQuote', function (event) {
    var val = $(this).attr('data-value');
    var tr = $(this).closest('tr');
    $.ajax({
        url: "functions/qr_functions.php",
        type: "POST",
        data: "deleteFloodQuote=" + val,
        dataType: 'JSON',
        success: function (data, result) {
            if (data && data.status == 'Got Data') {
                tr.remove();
                qrDisplayAlert("Quote has been deleted.", "success");
            } else {
                qrDisplayAlert("We were unable to delete that quote. Please try again, or contact Support if this problem persists.", "error");
            }
        }
    });
});

$(document).on('click', '.deleteHomeQuote', function (event) {
    var val = $(this).attr('data-value');
    var tr = $(this).closest('tr');
    $.ajax({
        url: "functions/qr_functions.php",
        type: "POST",
        data: "deleteHomeQuote=" + val,
        dataType: 'JSON',
        success: function (data, result) {
            if (data && data.status == 'Got Data') {
                tr.remove();
                qrDisplayAlert("Quote has been deleted.", "success");
            } else {
                qrDisplayAlert("We were unable to delete that quote. Please try again, or contact Support if this problem persists.", "error");
            }
        }
    });
});

$(document).on('click', '.deleteAutoQuote', function (event) {
    var val = $(this).attr('data-value');
    var tr = $(this).closest('tr');
    $.ajax({
        url: "functions/qr_functions.php",
        type: "POST",
        data: "deleteAutoQuote=" + val,
        dataType: 'JSON',
        success: function (data, result) {
            if (data && data.status == 'Got Data') {
                tr.remove();
                qrDisplayAlert("Quote has been deleted.", "success");
            } else {
                qrDisplayAlert("We were unable to delete that quote. Please try again, or contact Support if this problem persists.", "error");
            }
        }
    });
});

$('#QRUserManage input[required]').attr('pattern', '.*\\S+.*');

$(document).on('click', '.registeredUser li a', function (event) {
    event.preventDefault();
    var user_id = $(this).attr('data-userid');
    qrShowLoader();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST",
        url: url,
        data: 'get_regs_user_data=' + user_id,
        dataType: 'JSON',
        success: function (data, result) {
            qrHideLoader();
            const { status, userArray } = data;

            if (status !== "Got Data") {
                qrDisplayAlert("Not able to fetch the user data. Try again later", "error");
                return;
            }

            const responseKeyToElementIdAndType = new Map([["AgencyUser_Id", {
                id: null,
                type: null
            }], ["Agency_Id", { id: null, type: null }], ["CanBulkEditLeads", {
                id: "bulkEditLeads",
                type: "checkbox"
            }], ["CanDeleteLeads", {
                id: "deleteLeads",
                type: "checkbox"
            }], ["CanExportLeadsToExcel", {
                id: "exportLeadsToExcel",
                type: "checkbox"
            }], ["CanManageAgencyDefaults", {
                id: "manageAgencyDefaults",
                type: "checkbox"
            }], ["CanManageAgencyLogo", {
                id: "manageAgencyLogo",
                type: "checkbox"
            }], ["CanManageCarrierLogins", {
                id: "manageCarrierLogins",
                type: "checkbox"
            }], ["CanManageGlobalCarrierLists", {
                id: "manageGlobalCarrierLists",
                type: "checkbox"
            }], ["CanManageLocalQuoteBots", {
                id: "manageLocalBots",
                type: "checkbox"
            }], ["CanManageQuickLinks", {
                id: "manageQuickLinks",
                type: "checkbox"
            }], ["CanManageQuoteRushUsers", {
                id: "manageQuoteRushUsers",
                type: "checkbox"
            }], ["CanManageRemotequoteQueue", {
                id: "manageRemotequoteQueue",
                type: "checkbox"
            }], ["CanManageWebForms", {
                id: "canManageWebforms",
                type: "checkbox"
            }], ["CanSeeAllLeads", {
                id: "seeAllLeads",
                type: "checkbox"
            }], ["CanSubmitQuotesAsOtherUsers", {
                id: "submitQuotesAsOthers",
                type: "checkbox"
            }], ["CanUsePremiumImporter", {
                id: "canImportPremium",
                type: "checkbox"
            }], ["CanUseProspectEstimator", {
                id: "canUseProspectEstimator",
                type: "checkbox"
            }], ["CanViewReports", { id: "viewAgencyReports", type: "checkbox" }], ["Deleted", {
                id: null,
                type: null
            }], ["EmailAddress", { id: "usr_mng_email", type: "value" }], ["Groups", {
                id: null,
                type: null
            }], ["Id", { id: "user_id", type: "value" }], ["IgnoreDuplicateCheck", {
                id: null,
                type: "value"
            }], ["IsAttomDataApproved", { id: null, type: null }], ["IsLexisNexisApproved", {
                id: "approvedForLexisNexis",
                type: "checkbox"
            }], ["MFA_Phone", { id: "usr_mng_mfa_phone", type: "value" }], ["MFA_Preference", {
                id: null,
                type: null
            }], ["Name", { id: "usr_mng_name", type: "value" }], ["Password", {
                id: null,
                type: null
            }], ["Phone", { id: "usr_mng_phone", type: "value" }], ["VerifiedEmail", { id: null, type: null }]]);

            const responseValues = userArray.GetAgencyUserByIdResult;
            Object.keys(responseValues).forEach((key, index) => {
                if (!responseKeyToElementIdAndType.has(key)) return;

                const { type, id } = responseKeyToElementIdAndType.get(key);
                switch (type) {
                    case "value":
                        resulting = $(`#${id}`).val(responseValues[`${key}`]);
                        break;
                    case "checkbox":
                        // Either the statement x[`${key}`] has a value of true, or false. Set the checkbox accordingly.
                        resulting = $(`#${id}`).prop("checked", responseValues[`${key}`]);
                        break;
                }
            });

            $("#usr_mng_mfa_pref").val(responseValues?.MFA_Preference);
            $("#usr_mng_mfa_pref").trigger('change');

            // Although the checked property is already set above, this particular one involves setting a disabled prop to false
            // which falls out from the general pattern captured above. I do this here rather than doing if(id === 'manageQuoteRushUsers')
            // in the above forEach, as that would cause the if statement to be evaluated/checked on EVERY item if I did that.
            if (!responseValues['CanManageQuoteRushUsers']) {
                $("#manageQuoteRushUsers").prop('disabled', false);
            }
            $('input:checkbox').removeAttr('disabled');
            $("#userMngBtn").show();
        }
    });
});

$(document).on('click', '.newUser', function (event) {
    document.getElementById("QRUserManage").reset();
    $("#user_id").val('');
    $(".delUserQR").attr('disabled', true);
    $('#QRUserManage input').val("");
    $('input:checkbox').removeAttr('checked');
    $('input:checkbox').removeAttr('disabled');
});

$(document).on('keyup', '#usr_mng_email', function (event) {

    if (!$("#user_id").val().trim()) {
        $('.delUserQR').attr('disabled', true);
    } else {
        if ($(this).val().length != 0) $('.delUserQR').attr('disabled', false); else $('.delUserQR').attr('disabled', true);
    }
})

$(document).on('keyup', '#usr_mng_name', function (event) {

    if (!$("#user_id").val().trim()) {
        $('.delUserQR').attr('disabled', true);
    } else {
        if ($(this).val().length != 0) $('.delUserQR').attr('disabled', false); else $('.delUserQR').attr('disabled', true);
    }
});

$(document).on('click', '.cancelUserQR', function (e) {
    e.preventDefault();
    const agency_profile_edit_user = $(this).data('agency-profile-edit-user');
    if (agency_profile_edit_user) {
        $('#qr-user-settings-href').trigger('click');
        emptyAndCloseCenteredModalQR();
    } else {
        emptyAndCloseOffCanvasPanel();
        $('#centeredModal').modal('hide');
    }
});

$(document).on('click', '.saveUserQR', function (e) {
    e.preventDefault();
    let form = $("#QRUserManage");

    if ($('#QRUserManage').length === 0 && $('#editQRUser').length > 0) {
        form = $("#editQRUser");
    }

    if (form[0]?.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        qrDisplayAlert("Please fill the all required fields.", "error");
        return;
    }

    const agency_profile_edit_user = $(this).data('agency-profile-edit-user');
    $.ajax({
        type: "POST",
        url: "functions/qr_functions.php",
        data: form.serialize() + "&save_user=1",
        success: function (data, result) {
            const { status } = data;
            let message = "", type = "";

            switch (status) {
                case "Got Data":
                    message = "User saved successfully!";
                    type = "success";
                    break;
                case "Updated":
                    message = "User data updated Successfully!";
                    type = "success";
                    break;
                case "required":
                    message = "Please fill all the required fields in proper format.";
                    type = "error";
                    break;
                case "Already":
                    message = "User already exists. Please try with any other email id.";
                    type = "success";
                    break;
                case "Failed":
                    message = "Whoops! There was a problem updating User Information. Please try again.";
                    type = "error";
                    break;
                default:
                    message = "Whoops! An unknown error has occured. Please try again.";
                    type = "error";
            }

            qrDisplayAlert(message, type);
            setTimeout(function () {
                if (agency_profile_edit_user) {
                    $('#qr-user-settings-href').trigger('click');
                    emptyAndCloseCenteredModalQR();
                } else {
                    emptyAndCloseOffCanvasPanel();
                    $('#centeredModal').modal('hide');
                }
            }, 2000);
        }
    });
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.qrProductivitySelector', function (e) {
    e.preventDefault();
    var range = $(this).attr('id');
    if (range == 'Custom') {
        $('.qrProductivitySelector').removeAttr('checked');
        $(this).attr('checked', true);
        Swal.fire({
            title: 'Please Select a Date Range', html: `
                <label class="control-label" for="startDate">Start Date</label>
                <input type="date" id="startDate" class="form-control">
                <label class="control-label" for="endDate">End Date</label>
                <input type="date" id="endDate" class="form-control">`, focusConfirm: false, preConfirm: () => {
                const startDate = new Date(document.getElementById('startDate').value);
                const endDate = new Date(document.getElementById('endDate').value);
                const oneYearAfterStart = new Date(startDate);
                oneYearAfterStart.setFullYear(startDate.getFullYear() + 1);

                if (endDate > oneYearAfterStart) {
                    Swal.showValidationMessage("The date range must not exceed one year.");
                    return false;
                }

                return document.getElementById('startDate').value + '|' + document.getElementById('endDate').value;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                var range = result.value;
                var dates = range.split('|');
                var formattedRange = `${dates[0]} - ${dates[1]}`;
                qrDisplayAlert("Please hold, loading your dashboards.", "message");
                qrShowLoader();
                var url = "functions/qr_functions.php";
                $.ajax({
                    type: "POST", url: url, data: 'get-qr-productivity-dashboard=' + range, success: function (data) {
                        $('#chartReRender').html('');
                        $('#qr-leads-agent-top-10').html('');
                        $('#home-quotes-agent-top-5').html('');
                        $('#auto-quotes-agent-top-5').html('');
                        $('#flood-quotes-agent-top-5').html('');
                        $('#home-quotes-method-agent-top-5').html('');
                        $('#auto-quotes-method-agent-top-5').html('');
                        $('#flood-quotes-method-agent-top-5').html('');
                        $('#chartReRender').html('<script>' + data.data + '</script>');
                        $('#currentFilter').val(data.filter);
                        $('#dataset').html(formattedRange);
                        qrHideLoader();
                    }, error: function () {
                        qrDisplayAlert("Try again, that did not work.", "error");
                        qrHideLoader();
                    }
                });
            }
        });
    } else {
        qrDisplayAlert("Please hold, loading your dashboards.", "message");
        qrShowLoader();
        $('.qrProductivitySelector').removeAttr('checked');
        $(this).attr('checked', true);
        var range = $(this).attr('id');
        var url = "functions/qr_functions.php";
        $.ajax({
            type: "POST", url: url, data: 'get-qr-productivity-dashboard=' + range, success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#chartReRender').html('');
                    $('#qr-leads-agent-top-10').html('');
                    $('#home-quotes-agent-top-5').html('');
                    $('#auto-quotes-agent-top-5').html('');
                    $('#flood-quotes-agent-top-5').html('');
                    $('#home-quotes-method-agent-top-5').html('');
                    $('#auto-quotes-method-agent-top-5').html('');
                    $('#flood-quotes-method-agent-top-5').html('');
                    $('#chartReRender').html('<script>' + data.data + '</script>');
                    $('#currentFilter').val(data.filter);
                    if (range === 'qrProductivityLast7') {
                        $('#dataset').html('Last Week');
                    } else if (range === 'qrProductivityLast30') {
                        $('#dataset').html('Last Month');
                    } else if (range === 'qrProductivityLast180') {
                        $('#dataset').html('Last 6 Months');
                    } else if (range === 'qrProductivityLast365') {
                        $('#dataset').html('Last Year');
                    } else {
                        $('#dataset').html('Not really sure....something broke. Please refresh!');
                    }
                    qrHideLoader();
                } else {
                    qrDisplayAlert("Try again, that did not work.", "error");
                    qrHideLoader();
                }
            }
        });
    }
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.delUserQR', function (e) {
    $("#usr_mng_pass").attr("required", false);
    $("#usr_mng_cnfpass").attr("required", false);
    var form = $("#QRUserManage");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        e.preventDefault();
        var usersid = $("#user_id").val();
        var email = $("#usr_mng_email").val();
        var url = "functions/qr_functions.php";
        var val = $(this).attr('data-value');
        Swal.fire({
            title: 'Are you  sure?',
            text: "Delete this User.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: 'del_user_data=' + email + '&userid=' + usersid,
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            qrDisplayAlert("User deleted Successfully. Refreshing the page, please wait", "success");
                            setTimeout(location.reload.bind(location), 3000);
                        }
                        if (data && data.status == "Failed") {
                            qrDisplayAlert("Whoops! There was a problem while deleting the User Information. Please try again.", "error");
                        }
                    }
                });
            }

        })
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.deleteQRUser', function (e) {
    var url = "functions/qr_functions.php";
    var val = $(this).attr('data-value');
    var tRow = $(this).closest('tr');
    Swal.fire({
        title: 'Are you sure?',
        text: "Delete this User.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'del_user_data=true&userid=' + val, success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        qrDisplayAlert("User deleted Successfully.", "success");
                        tRow.remove();
                    }
                    if (data && data.status == "Failed") {
                        qrDisplayAlert("Whoops! There was a problem while deleting this user. Please try again.", "error");
                    }
                }
            });
        }

    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.restoreQRUser', function (e) {
    var url = "functions/qr_functions.php";
    var val = $(this).attr('data-value');
    var tRow = $(this).closest('tr');
    Swal.fire({
        title: 'Are you sure?',
        text: "Restore this User.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'restore_user_data=true&userid=' + val, success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        qrDisplayAlert("User restored Successfully. Please refresh the page to see the user in the Active Users tab.", "success");
                        tRow.remove();
                    }
                    if (data && data.status == "Failed") {
                        qrDisplayAlert("Whoops! There was a problem while restoring this user. Please try again.", "error");
                    }
                }
            });
        }

    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.blockQRPC', function (e) {
    var url = "functions/qr_functions.php";
    var val = $(this).attr('data-value');
    var tRow = $(this).closest('tr');
    Swal.fire({
        title: 'Are you sure?',
        text: "This PC will no longer be able to access QuoteRUSH if you continue.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'blockQRPC=' + val, success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        qrDisplayAlert("PC Blocked Successfully.", "success");
                        tRow.remove();
                    }
                    if (data && data.status == "Failed") {
                        qrDisplayAlert("Whoops! There was a problem while blocking this PC. Please try again.", "error");
                    }
                }
            });
        }

    });
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.unblockQRPC', function (e) {
    var url = "functions/qr_functions.php";
    var val = $(this).attr('data-value');
    var tRow = $(this).closest('tr');
    Swal.fire({
        title: 'Are you sure?',
        text: "This PC will no longer be able to access QuoteRUSH if you continue.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'unblockQRPC=' + val, success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        qrDisplayAlert("PC Access Restored Successfully.", "success");
                        tRow.remove();
                    }
                    if (data && data.status == "Failed") {
                        qrDisplayAlert("Whoops! There was a problem while removing the block for this PC. Please try again, or contact Support.", "error");
                    }
                }
            });
        }

    });
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '#create-carrier-list-href', function (e) {
    var url = "functions/qr_functions.php";
    qrShowLoader();
    $.ajax({
        type: "POST", url: url, data: 'getCreateCarrierListOptions=true', success: function (data, result) {
            if (data && data.status === "Got Data") {
                var lobSelected = 0;
                var selectedValue = '';
                var selectedFTValue = '';
                var selectedSTValue = '';
                $('#create-carrier-list-row').html('<div class="col col-md-3 col-xs-12"><label class="control-label" for="lineOfBusinessSelect">Line of Business</label><select class="form-control" id="lineOfBusinessSelect"><option value="">Please Select Line of Business</option></select></div><div class="col-md-1 col-xs-12 text-center" id="firstComplete" style="display:none"><i class="fa-regular fa-right fa-3x text-success" style="margin-top:1.6rem!important;" aria-hidden="false"></i></div><div class="col col-md-3 col-xs-12" id="formTypeDIV" style="display:none;"><label class="control-label" for="formTypesSelect">Form Type</label><select id="formTypesSelect"></select></div><div class="col-md-1 col-xs-12 text-center" id="secondComplete" style="display:none"><i class="fa-regular fa-right fa-3x text-success" style="margin-top:1.6rem!important;" aria-hidden="false"></i></div><div class="col col-md-3 col-xs-12" id="stateSelectDIV" style="display:none;"><label class="control-label" for="stateCarrierListSelect">State</label><select id="stateCarrierListSelect"></select></div><div class="col-md-12 col-sm-12 col-xs-12 text-center mt-4" id="thirdComplete" style="display:none"><i class="fa-regular fa-down fa-3x text-center text-success" aria-hidden="false"></i></div>');
                const rdata = data.data;
                const lineOfBusinessSelect = document.getElementById('lineOfBusinessSelect');

                Object.entries(rdata).forEach(([guid, details]) => {
                    const option = document.createElement('option');
                    option.value = guid;
                    option.textContent = details.LineOfBusiness;
                    lineOfBusinessSelect.appendChild(option);
                });
                $('#lineOfBusinessSelect').select2({
                    theme: "bootstrap-5", width: '100%'
                });

                const sdata = data.states;
                const stateSelect = document.getElementById('stateCarrierListSelect');
                stateSelect.innerHTML = '<option value="">Please Select State or select the All States option</option><option value="AllStates">All States</option>';

                Object.entries(sdata).forEach(([state, details]) => {
                    const option = document.createElement('option');
                    option.value = details;
                    option.textContent = details;
                    stateSelect.appendChild(option);
                });
                $('#stateCarrierListSelect').select2({
                    theme: "bootstrap-5", width: '100%'
                });
                $(document).on('change', '#lineOfBusinessSelect', function () {
                    selectedValue = this.value;
                    if (selectedValue != '') {
                        if (lobSelected > 0) {
                            $('#formTypesSelect').select2('destroy');
                            if ($('#stateCarrierListSelect').val() != '') {
                                $('#stateCarrierListSelect').select2('destroy');
                                $('#stateCarrierListSelect').val(null);
                                $('#stateCarrierListSelect').prop('selectedIndex', 0);
                                $('#stateCarrierListSelect').select2({
                                    theme: "bootstrap-5", width: '100%'
                                });
                            }
                        }
                        const formTypes = rdata[selectedValue].FormTypes;
                        const formTypesSelect = document.getElementById('formTypesSelect');

                        formTypesSelect.innerHTML = '<option value="">Please Select Form Type</option>'; // Clear existing options

                        formTypes.forEach(formType => {
                            const formTypeId = Object.keys(formType)[0];
                            const formTypeName = formType[formTypeId];
                            const option = document.createElement('option');
                            option.value = formTypeId;
                            option.textContent = formTypeName;
                            formTypesSelect.appendChild(option);
                        });
                        $('#formTypeDIV').show();
                        $('#firstComplete').show();
                        $('#formTypesSelect').select2({
                            theme: "bootstrap-5", width: '100%'
                        });
                        lobSelected++;
                    } else {
                        $('#formTypeDIV').hide();
                        $('#firstComplete').hide();
                    }
                });
                $(document).on('change', '#formTypesSelect', function () {
                    selectedFTValue = this.value;
                    if (selectedFTValue != '') {
                        if ($('#stateCarrierListSelect').val() != '') {
                            $('#stateCarrierListSelect').select2('destroy');
                            $('#stateCarrierListSelect').val(null);
                            $('#stateCarrierListSelect').prop('selectedIndex', 0);
                            $('#stateCarrierListSelect').select2({
                                theme: "bootstrap-5", width: '100%'
                            });
                        }
                        $('#secondComplete').show();
                        $('#stateSelectDIV').show();
                    } else {
                        $('#secondComplete').hide();
                        $('#stateSelectDIV').hide();
                    }
                });
                $(document).on('change', '#stateCarrierListSelect', function () {
                    selectedSTValue = this.value;
                    if (selectedSTValue != '' && selectedFTValue != '' && selectedValue != '') {
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: 'getCarrierListForm=' + selectedValue + '&carrierListFormType=' + selectedFTValue + '&carrierListState=' + selectedSTValue,
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {
                                    if ($('#carrierListFormDIV').length > 0) {
                                        $('#carrierListFormDIV').remove();
                                    }
                                    $('#create-carrier-list-row').append(data.data);
                                    $('#thirdComplete').show();
                                } else {
                                    $('#thirdComplete').hide();
                                    qrDisplayAlert("We were unable to find any available carriers for your selections, please try a different combination.", "error");
                                }
                            }
                        });


                    } else {
                        qrDisplayAlert("You must select an option for each to continue.", "error");
                    }
                });
                $('#create-carrier-list-row').show();
                qrHideLoader();

            }
            if (data && data.status == "Failed") {
                $('#create-carrier-list-row').hide();
                $('#create-carrier-list-row').html('');
                qrHideLoader();
                qrDisplayAlert("Whoops! There was a problem getting the information needed to create a new list. Please refresh and try again, or contact Support.", "error");
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#newCarrierListForm', function (e) {
    e.preventDefault();
    qrShowLoader();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: $("#newCarrierListForm").serialize(), success: function (data, result) {
            if (data && data.status == 'Got Data') {
                qrHideLoader();
                qrDisplayAlert("List added successfully, refreshing the page. Please wait!", "success");
                setTimeout(location.reload.bind(location), 3000);
            } else if (data && data.status == 'Duplicate') {
                qrHideLoader();
                Swal.fire({
                    icon: 'error',
                    title: 'Duplicate Named List Found',
                    html: 'It looks like you already have a list with that name for the combination of '
                });
            } else {
                qrHideLoader();
                qrDisplayAlert("Whoops! There was a problem adding this new list. Please try again, or contact Support.", "error");
            }
        }
    });
    return false;
});

$(document).on('submit', '#editCarrierListForm', function (e) {
    e.preventDefault();
    qrShowLoader();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: $("#editCarrierListForm").serialize(), success: function (data, result) {
            if (data && data.status == 'Got Data') {
                qrHideLoader();
                qrDisplayAlert("List updated successfully, refreshing the page. Please wait!", "success");
                setTimeout(location.reload.bind(location), 3000);
            } else {
                qrHideLoader();
                qrDisplayAlert("Whoops! There was a problem adding this new list. Please try again, or contact Support.", "error");
            }
        }
    });
    return false;
});

$(document).on('click', '.editQRCarrierList', function (e) {
    var url = "functions/qr_functions.php";
    var val = $(this).attr('data-value');
    qrShowLoader();
    $.ajax({
        type: "POST", url: url, data: 'editCarrierList=' + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                qrHideLoader();
                launchCenteredModalQR(data.data, data.listTitle);
            }
            if (data && data.status == "Failed") {
                qrDisplayAlert("Whoops! There was a problem while retrieving this list. Please try again, or contact Support.", "error");
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.deleteQRCarrierList', function (e) {
    var url = "functions/qr_functions.php";
    var val = $(this).attr('data-value');
    var tRow = $(this).closest('tr');
    Swal.fire({
        title: 'Are you sure?',
        text: "This list will no longer be available to select when Running Quotes if you continue.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.value) {
            qrShowLoader();
            $.ajax({
                type: "POST", url: url, data: 'deleteCarrierList=' + val, success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        qrHideLoader();
                        qrDisplayAlert("Carrier List deleted successfully.", "success");
                        tRow.remove();
                    }
                    if (data && data.status == "Failed") {
                        qrHideLoader();
                        qrDisplayAlert("Whoops! There was a problem while removing the block for this PC. Please try again, or contact Support.", "error");
                    }
                }
            });
        }

    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#carrierSelect', function (e) {
    if (!$(this).val()) {
        $('#QRCarrierManageLoginRow').hide();
        return;
    }

    $('#custom_name').val($(this).val());
    const selectedOption = $(this).find(':selected');
    const dataThird = selectedOption.attr('data-third');

    if (dataThird !== undefined) {
        const fieldLabel = dataThird;
        $('#ThirdCredFieldLabel').html(fieldLabel);
        $('#ThirdCredFieldDiv').show();
    } else {
        $('#ThirdCredFieldDiv').hide();
        $('input[name=carrier_agency_id]').val('');
    }

    if ($('#stateSelect').val() != '' && $('#lobSelect').val() != '') {
        $('#QRCarrierManageLoginRow').show();
    } else {
        $('#QRCarrierManageLoginRow').hide();
    }
});

$(document).on('click', '.addNewEntry', function (e) {
    $("#QRCarrierLogManage,.carrierListTable").css("display", "none");
    $("#QRCarrierManage").css("display", "inherit");
    $("#idToBeUpdated").val('');
})

$(document).on('click', '.addNewEntry', function () {
    $('#individualLoginWrap')
        .removeClass('d-none')
        .css('display', '');
    $('#individual-login').prop('checked', false);
});

$(document).on('click', '.exitCarrierLogin, .delCarrierLogin, .editEntry', function () {
    $('#individual-login').prop('checked', false);
    $('#individualLoginWrap')
        .addClass('d-none')
        .css('display', '');
});

$(document).on('click', '.editEntry', function (e) {
    var val = $("#idToBeUpdated").val();
    if (val == "") {
        qrDisplayAlert("Please select a Entry to update.", "error");
    } else {
        $("#QRCarrierLogManage,.carrierListTable").css("display", "none");
        $.post("functions/qr_functions.php", "getSelectedEntryData=" + val, function (data) {
            $("#QRCarrierManage").css("display", "inherit");
            if (data.UserAccessList && data.UserAccessList.trim() !== '') {
                var result = data.UserAccessList.split('*');
                $.each(result, function (index, val) {
                    $("#availableUsers li a").each(function () {
                        var user = $(this).text();
                        if (user == val) {
                            $(this).parent().remove();
                        }
                    });
                    $("#selectedCarrierUser").append('<li><a value="' + val + '" name="selected_user_list[]" class="newUserDropdown dropdown-item multi-btn-group">' + val + '</a></li>');
                });
            }
            if (data.AdminPasswordRequired == true) {
                $('#admin-req').prop('checked', true);
            }
            setTimeout(function () {
                if (typeof data.State !== "undefined") {
                    $('#stateSelect')
                        .find('option')
                        .remove()
                        .end()
                        .append('<option value="' + data.State + '">' + data.State + '</option>')
                        .val(data.State);
                }
            }, 1000);
            setTimeout(function () {
                $('#carrierSelect')
                    .find('option')
                    .remove()
                    .end()
                    .append('<option value="' + data.SiteName + '" data-prod-url="' + data.ProductionURL + '">' + data.SiteName + '</option>')
                    .val(data.SiteName);
                //  $('#carrierSelect').val(data.SiteName).trigger('change');
            }, 2000);
            if (data.ProductionURL == "") {
                $('.testCarrierLogin').hide();
            } else {
                $('.testCarrierLogin').show();
            }
            $('#stateSelect').prop('disabled', 'disabled');
            $('#carrierSelect').prop('disabled', 'disabled');
            $('#lobSelect').prop('disabled', 'disabled');
            $('input[name=custom_name]').val(data.SiteNameCustom);
            $('input[name=login_name]').val(data.Username);
            $('input[name=carrier_pass]').val(data.Password);
            $('input[name=carrier_confrm_pass]').val(data.Password);
            if (data.ThirdCredential != '' && data.ThirdCredential != null && data.ThirdCredential != 'null') {
                $('input[name=carrier_agency_id]').val(data.AgencyId);
                $('#ThirdCredFieldLabel').html(data.ThirdCredential);
                $('#ThirdCredFieldDiv').show();
            } else {
                $('#ThirdCredFieldDiv').hide();
            }
            $('input[name=carrier_producer_code]').val(data.ProducerCode);
            $('#QRCarrierManageLoginRow').show();
        });
    }
})

$(document).on('change', '#selectUser', function (e) {
    $('#admin-log-req').prop('checked', false);
});

$(document).on('change', '#admin-log-req', function (e) {
    if ($(this).prop('checked')) {
        var email = $("#selectUser").val();
    } else {
        var email = "";
    }
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, dataType: 'JSON', data: 'get-carrier-list=' + email, success: function (data, result) {
            if (data && data.status === "Got Data") {
                const { Grid, html, h } = gridjs;
                $("#carrierList").html("");
                var carrierLists = new Grid({
                    columns: [{
                        name: "id", hidden: true
                    }, {
                        name: "Carrier",

                        formatter: (_, row) => html(checkId(row.cells[0].data, row.cells[1].data))
                    }, {
                        name: "Custom Name",

                        formatter: (_, row) => html(checkId(row.cells[0].data, row.cells[2].data))
                    }, {
                        name: "Access Type",

                        formatter: (_, row) => html(checkId(row.cells[0].data, row.cells[3].data))
                    }

                    ], pagination: {
                        limit: 10
                    }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.list,
                }).render(document.getElementById("carrierList"));
                setTimeout(() => {
                    // lets update the config
                    carrierLists.updateConfig({
                        search: true, data: data.list, style: {
                            th: {
                                'white-space': 'nowrap', 'min-width': 'auto'
                            }
                        }
                    }).forceRender();
                }, 500);
            }
        }
    })

});

$(document).on('click', '.subQRQB', function (event) {
    event.preventDefault();
    qrShowLoader('Please wait, working on loading that tab......');

    var $btn = $('#viewQRLeadButton');

    // Add &loadTab=runQuotes to the URL we’re about to navigate to
    const u = new URL(window.location.href);
    u.searchParams.set('loadTab', 'runquotestablink');
    history.replaceState(null, '', u);

    $btn.trigger('click');

});



$(document).on('change', '#upd-assigned-topbar, #upd-lead-source-topbar, #upd-lead-status-topbar', function (e) {
    e.preventDefault();
    var topbarField = $(this).attr('id');
    var topbarFieldValue = $(this).val();
    var topbarLead = GetQRURLParameter('Lead');
    var url = "functions/qr_functions.php";
    if (topbarLead != '' && topbarField != '' && topbarFieldValue != '') {
        $.ajax({
            type: "POST",
            url: url,
            data: "updQRTopbarfield=" + topbarField + "&topbarFieldValue=" + topbarFieldValue + "&topbarLead=" + topbarLead,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    qrDisplayAlert(data.fieldName + " Updated Successfully.", "success");
                    if ($('#' + topbarField.replace("-topbar", "")).length > 0) {
                        $('#' + topbarField.replace("-topbar", "")).select2('destroy');
                        $('#' + topbarField.replace("-topbar", "")).val(topbarFieldValue);
                        $('#' + topbarField.replace("-topbar", "")).trigger('change');
                        $('#' + topbarField.replace("-topbar", "")).select2({
                            theme: "bootstrap-5", width: '100%', dropdownParent: $(".projects-view")
                        });
                    }
                }
                if (data && data.status == "Failed") {
                    if (data.fieldName != '') {
                        qrDisplayAlert("Whoops! There was a problem updating the " + data.fieldName + ". Please try again.", "error");
                    } else {
                        qrDisplayAlert("Whoops! There was a problem updating this lead. Please try again.", "error");
                    }
                }
            }
        });
    } else {
        qrDisplayAlert("Whoops! There was a problem updating this lead. Please try again.", "error");
    }
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.newUserQR', function (e) {
    // $("#usr_mng_pass").attr("required", true);
    // $("#usr_mng_cnfpass").attr("required", true);

    var form = $("#QRUserManage");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        e.preventDefault();
        //$("#new_qr_user").val("newUser");
        var email = $("#usr_mng_email").val();
        var url = "functions/qr_functions.php";
        $.ajax({
            type: "POST",
            url: url,
            data: $("#QRUserManage").serialize() + "&new_qr_user=1",
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    qrDisplayAlert("User added Successfully. Refreshing the page, please wait", "success");
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status == "Failed") {
                    qrDisplayAlert("Whoops! There was a problem while adding the new user. Please try again.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$('#usr_mng_cnfpass').keyup(function () {
    var pass1 = document.getElementById('usr_mng_pass');
    var pass2 = document.getElementById('usr_mng_cnfpass');
    var message = document.getElementById('confirmmMessage');
    var goodColor = '#66cc66';
    var badColor = '#ff6666';
    if (pass1.value == pass2.value) {
        pass2.style.borderColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = 'Passwords Match!';
    } else {
        pass2.style.borderColor = badColor;
        message.style.color = badColor;
        message.innerHTML = 'Passwords Do Not Match!'
    }
});

function GetQRURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

// Combined click handler for both .tutorialLinkQR and .tutorialLinkQRD
$(document).on('click', '.tutorialLinkQR, .tutorialLinkQRD', function (e) {
    e.preventDefault();
    qrShowLoader();

    var embedLink = $(this).data('link');
    var headerSelector = $(this).attr('href');

    // Remove existing iframe
    $(headerSelector).find('iframe').remove();

    var iframe = document.createElement('iframe');
    iframe.src = embedLink;
    iframe.width = '100%';
    iframe.height = '640';
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';
    iframe.style.display = 'none';

    var iframeLoaded = false;

    iframe.onload = function () {
        iframeLoaded = true;
        iframe.style.display = 'block';
        qrHideLoader();
    };

    $(headerSelector).html(iframe);

    setTimeout(function () {
        if (!iframeLoaded) {
            qrHideLoader();
            window.open(embedLink, '_blank');
        }
    }, 5000);

    // Determine which scroll target to use
    var scrollTarget = $(this).hasClass('tutorialLinkQR') ? '#v-pills-tutorialLinkQR-tabContent' : '#v-pills-tutorialLinkQRD-tabContent';

    $('html, body').animate({
        scrollTop: $(scrollTarget).offset().top - 250
    }, 'slow');
});

// Combined keyup handler for both search boxes
$(document).on('keyup', '#qrTutorialSearch, #qrTutorialSearch2', function () {
    var searchText = $(this).val().toLowerCase();
    var targetClass = $(this).attr('id') === 'qrTutorialSearch' ? '.tutorialLinkQR' : '.tutorialLinkQRD';

    if (searchText.length < 2) {
        $(targetClass).show();
    } else {
        $(targetClass).each(function () {
            var textMatch = $(this).text().toLowerCase().includes(searchText);
            $(this).toggle(textMatch);
        });
    }
});


$("#usr_mng_pass").on("keyup", function () {
    var pswd = $(this).val();

    // Length check
    $("#length").toggleClass("valid fa fa-check", pswd.length >= 8)
        .toggleClass("invalid fa fa-close", pswd.length < 8);

    // Lowercase letter check
    $("#letter").toggleClass("valid fa fa-check", /[a-z]/.test(pswd))
        .toggleClass("invalid fa fa-close", !/[a-z]/.test(pswd));

    // Uppercase letter check
    $("#capital").toggleClass("valid fa fa-check", /[A-Z]/.test(pswd))
        .toggleClass("invalid fa fa-close", !/[A-Z]/.test(pswd));

    // Number check
    $("#number").toggleClass("valid fa fa-check", /\d/.test(pswd))
        .toggleClass("invalid fa fa-close", !/\d/.test(pswd));
}).on("focus", function () {
    $("#psswd_info").show();
}).on("blur", function () {
    $("#psswd_info").hide();
});


$(document).on('click', '#add-qr-lead, .addQRLead', function (event) {
    $.post("functions/qr_functions.php", "add-qr-lead=true", function (data) {
        launchOffCanvasPanel(data, 'Add Lead');
        loadGoogleMapsApi(() => {
            initializeAutocomplete('new-qr-lead-form', 'newLeadAddress');
            initializeAutocomplete('new-qr-lead-form', 'newLeadPreviousAddress');
        });
    });
});

function qrToolTip() {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: "hover"
        })
    });

    qrhideTooltip();
}

function qrhideTooltip() {
    $('body').on('click', '[data-bs-toggle="tooltip"]', function () {
        $(this).tooltip('hide');
    });
}

function qrToolTip() {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: "hover"
        })
    });

    qrhideTooltip();
}

function qrhideTooltip() {
    $('body').on('click', '[data-bs-toggle="tooltip"]', function () {
        $(this).tooltip('hide');
    });
}

$(document).on('click', '#import-qr-leads', function (event) {
    $.post("functions/qr_functions.php", "import-qr-leads=true", function (data) {
        launchOffCanvasPanel(data, 'Add Lead');
    });
});

$(document).on('click', '#qr-admin-user', function (event) {
    $.post("functions/qr_functions.php", "qr-admin-user=true", function (data) {
        launchOffCanvasPanel(data, 'Agency User Manager');
        if ($('#manageQuoteRushUsers').is(':checked')) {
            $('#QRUserManage input:checkbox').attr('disabled', false);
        } else {
            $('#QRUserManage input:checkbox').attr('disabled', true);
        }
        $('#QRUserManage input#usr_mng_email:not([pattern])').attr('pattern', '.*\\S+.*');
        $('#QRUserManage input#usr_mng_name:not([pattern])').attr('pattern', '.*\\S+.*');
        $('#QRUserManage input#usr_mng_pass:not([pattern])').attr('pattern', '.*\\S+.*');
        $('#QRUserManage input#usr_mng_phone:not([pattern])').attr('pattern', '.*\\S+.*');
    });
});

$(document).on('click', '#qr-admin-carrier', function (event) {
    $.post("functions/qr_functions.php", "qr-admin-carrier= true", function (data) {
        launchOffCanvasPanel(data, 'Agency Carrier Manager');
        var email = $("#userLoggedIn").val();
        $('#selectUser').val(email).trigger('change');
        if ($('#isCarrierAdmin').length > 0) {
            $(".addNewEntry").attr('disabled', false);
            $(".editEntry").attr('disabled', false);
            $("#selectUser").attr('disabled', false);
        }
    });
});


$(document).on('change', '#d77a4cea-6ef5-11ea-a890-000d3a7ae61a', function (event) {
    event.preventDefault();
    if ($(this).val() == 'Other') {
        $.ajax({
            type: "POST",
            url: 'functions/qr_functions.php',
            data: 'get-new-location-form=true',
            success: function (data, result) {
                // check for a filename
                if (data && data.status === "Got Data" && data.data != '') {
                    if ($('#addQRVehicleForm').length > 0) {
                        $('#addQRVehicleForm').hide();
                        $('.offcanvas-body').append(data.data);
                    }
                    if ($('#editQRVehicleForm').length > 0) {
                        $('#editQRVehicleForm').hide();
                        $('.offcanvas-body').append(data.data);
                    }
                }
            }
        });
    }
});

$(document).on('click', '#addNewLocationButton', function (event) {
    event.preventDefault();
    var form = $("#addNewLocationForm");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        var newLocation = 'Add New Location*' + $('#newLocationAddress').val() + ' : ' + $('#newLocationAddress2').val() + ' : ' + $('#newLocationCity').val() + ' : ' + $('#newLocationState').val() + ' : ' + $('#newLocationZip').val();
        $('#d77a4cea-6ef5-11ea-a890-000d3a7ae61a').select2('destroy');
        $("#d77a4cea-6ef5-11ea-a890-000d3a7ae61a").find("option[selected]").removeAttr("selected");
        $('#d77a4cea-6ef5-11ea-a890-000d3a7ae61a').append('<option value="' + newLocation + '" selected>' + newLocation + '</option>');
        $('#d77a4cea-6ef5-11ea-a890-000d3a7ae61a').change();
        $('#d77a4cea-6ef5-11ea-a890-000d3a7ae61a').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
        $("#addNewLocationForm").remove();
        if ($('#addQRVehicleForm').length > 0) {
            $('#addQRVehicleForm').show();
        }
        if ($('#editQRVehicleForm').length > 0) {
            $('#editQRVehicleForm').show();
        }
        return false; // avoid to execute the actual submit of the form.
    }
});

$(document).on('click', '#canceladdNewLocationButton', function (event) {
    event.preventDefault();
    $("#addNewLocationForm").remove();
    if ($('#addQRVehicleForm').length > 0) {
        $('#addQRVehicleForm').show();
    }
    if ($('#editQRVehicleForm').length > 0) {
        $('#editQRVehicleForm').show();
    }
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#qr-download-quoterush', function (event) {
    var url = 'functions/qr_functions.php';
    $.ajax({
        type: "POST", url: url, data: "get-short-url=true&installer-request=true", success: function (data, result) {
            if (data && data.status === "Got Data" && data.data != '') {
                var installLink = data.data;
                $.ajax({
                    type: "POST",
                    url: 'functions/qr_functions.php',
                    data: 'get-installer-config=true',
                    success: function (data, result) {
                        // check for a filename
                        if (data && data.status === "Got Data" && data.data != '') {
                            var configLink = data.data;
                            var a = document.createElement("a");
                            a.href = configLink;
                            a.download = 'qr-installer-config.json';
                            document.body.appendChild(a);
                            a.click();
                            a.remove();

                            var a = document.createElement("a");
                            a.href = installLink;
                            a.download = 'QRSetup.exe';
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            setTimeout(function () {
                                $.ajax({
                                    url: 'functions/qr_functions.php',
                                    type: "POST",
                                    data: 'cleanup-installer-config=true',
                                    dataType: "json",
                                    success: function (data, result) {
                                    }
                                });
                            }, 5000);
                        }
                    }
                });
            }
        }
    });
});

$(document).on('click', '#qr-adminLogin-carrier', function (event) {
    $.post("functions/qr_functions.php", "qr-adminLogin-carrier=true", function (data) {

        var modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Agency Carrier Manager");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $('#qtpanel').offcanvas('show');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
    });
});

$(document).on('change', '#qrMarketplaceCategory,#qrMarketplaceSubCategory', function (event) {
    event.preventDefault();
    $('.vendorCards').hide();
    var cat = $(this).val();
    if (cat != '') {
        $('.' + cat).show();
    } else {
        if ($('#qrMarketplaceCategory').val() == '' && $('#qrMarketplaceSubCategory').val() == '') {
            if ($('#catReset').hasClass('btn-danger')) {
                $('#catReset').removeClass('btn-danger').addClass('btn-primary');
            }
        }
        $('.vendorCards').show();
    }
    if ($('#catReset').hasClass('btn-danger')) {
    } else {
        $('#catReset').removeClass('btn-primary').addClass('btn-danger');
    }
});

$(document).on('click', '#catReset', function (event) {
    event.preventDefault();
    $('#qrMarketplaceSubCategory').val('').change();
    $('#qrMarketplaceCategory').val('').change();
    $('.vendorCards').show();
    if ($(this).hasClass('btn-danger')) {
        $('#catReset').removeClass('btn-danger').addClass('btn-primary');
    } else {
    }
});

$(document).on('change', '#stateSelect,#lobSelect', function (event) {
    var selectedState = $("#stateSelect").val();
    var selectedLob = $("#lobSelect").val();
    $('#carrierSelect').empty();
    $.ajax({
        url: 'functions/qr_functions.php',
        type: "POST",
        data: 'selected_state=' + selectedState + '&selected_lob=' + selectedLob,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#carrierSelect').append("<option value=''>Please Select Carrier</option>" + data.data);
                $('#carrierSelect').prop('disabled', false);
                $('#carrierSelect').attr('disabled', false);
            }
            if (data && data.status !== "Got Data") {

            }
        }
    });
});
$(document).on('click', '#availableUsers li a', function (e) {
    var val = $(this).attr('value');
    $("#availableUsers li a").removeClass("highlight");
    $("#availableUsers li a").css("background", "none");

    $(this).addClass("highlight");
    $(this).css("background", "#ededed");
})

$(document).on('click', '#selectedCarrierUser li a', function (e) {
    var val = $(this).attr('value');
    $("#selectedCarrierUser li a").removeClass("highlight");
    $("#selectedCarrierUser li a").css("background", "none");
    $(this).addClass("highlight");
    $(this).css("background", "#ededed");
})

$(document).on('click', '.addUser', function (e) {
    var val = $('#availableUsers li a').filter('.highlight').html();
    if (val) {
        $("#selectedCarrierUser").append('<li><a value="' + val + '" name="selected_user_list[]" class="newUserDropdown dropdown-item multi-btn-group">' + val + '</a></li>');
        $("#availableUsers li a.highlight").parent().remove();
    }
})

$(document).on('click', '.remUser', function (e) {
    var val = $('#selectedCarrierUser li a').filter('.highlight').html();
    if (val) {
        $("#availableUsers").append('<li><a value="' + val + '" class="newUserDropdown dropdown-item multi-btn-group">' + val + '</a></li>');
        $("#selectedCarrierUser li a.highlight").parent().remove();
    }
})

$(document).on('click', '.testCarrierLogin', function (e) {
    e.preventDefault();

    const maxSeconds = 30;
    let remaining = maxSeconds;

    // Show initial loader message
    qrShowLoader(`Working on testing these credentials, please wait! (${remaining} seconds remaining)`);

    // Start countdown interval
    const countdownId = setInterval(() => {
        remaining--;
        if (remaining > 0) {
            qrShowLoader(`Working on testing these credentials, please wait! (${remaining} seconds remaining)`);
        }
    }, 1000);

    const loginUrl = $('#carrierSelect option:selected').data('prod-url');
    const username = $('input[name="login_name"]').val();
    const password = $('input[name="carrier_pass"]').val();
    const thirdCred = $('#carrier_agency_id').val();

    if (!loginUrl || !username || !password) {
        alert('Please enter all required fields before testing the login.');
        qrHideLoader();
        clearInterval(countdownId);
        return false;
    }

    const btn = $(this);
    btn.prop('disabled', true).text('Testing...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), maxSeconds * 1000);

    fetch('test-login.php', {
        method: 'POST', body: new URLSearchParams({
            loginUrl: loginUrl, username: username, password: password, thirdCred: thirdCred
        }), signal: controller.signal
    })
        .then(response => response.json())
        .then(data => {
            clearTimeout(timeoutId);
            clearInterval(countdownId);
            btn.prop('disabled', false).text('Test Login');

            if (data.screenshot) {
                $('#resultScreenshot').attr('src', 'data:image/png;base64,' + data.screenshot).show();
            }
            qrHideLoader();
            if (data.message) {
                qrDisplayAlert(data.message, "message");
            }
        })
        .catch(err => {
            clearTimeout(timeoutId);
            clearInterval(countdownId);
            btn.prop('disabled', false).text('Test Login');
            qrHideLoader();
            if (err.name === 'AbortError') {
                qrDisplayAlert('Request timed out after 30 seconds.', "error");
            } else {
                qrDisplayAlert('An error occurred: ' + err.message, "error");
            }
        });

    return false;
});


$(document).off('click', '.saveCarrierLogin');

$(document).on('click', '.saveCarrierLogin', function (e) {
    e.preventDefault();

    e.stopImmediatePropagation();

    const form = $(this).closest('form#QRCarrierManage');

    const individual = form.find('input[name="individual-login"]').prop('checked');

    qrShowLoader();

    if (individual) {
        form.find('[name="login_name"], [name="carrier_pass"], [name="carrier_confrm_pass"]')
            .prop('required', false);
    }

    if (!individual && !form[0].checkValidity()) {
        qrDisplayAlert("Please fill all of the required fields", "error");
        qrHideLoader();
        return false;
    }

    const selectedUsers = [];
    form.find('#selectedCarrierUser li').each(function () {
        selectedUsers.push($.trim($(this).text()));
    });

    const updateUsers = $('#idToBeUpdated').val();

    form.find('#stateSelect, #carrierSelect, #lobSelect').prop('disabled', false);

    const payload = form.serializeArray();
    if (individual) payload.push({ name: 'individual-login', value: 'on' });
    payload.push({ name: 'save_carrier', value: selectedUsers.join(',') }, { name: 'update_carrier', value: updateUsers });

    $.ajax({
        type: "POST", url: "functions/qr_functions.php", dataType: "json", data: $.param(payload), timeout: 30000,
    })
        .done(function (data) {
            const { status, mode, created } = data || {};

            if (status === "save") {
                if (mode === "individual") {
                    qrDisplayAlert(`Created ${created} individual login(s).`, "success");
                } else {
                    qrDisplayAlert("Carrier entry has been saved successfully.", "success");
                }
            } else if (status === "updated") {
                qrDisplayAlert("Carrier entry has been updated successfully.", "success");
            } else {

                qrDisplayAlert("Saved, but response was unexpected.", "warning");
                console.warn('Unexpected response:', data);
            }

            form.find('input[name="individual-login"]').prop('checked', false);
            $('#individualLoginWrap').addClass('d-none').css('display', '');

            emptyOffCanvasPanelQR();
            $.post("functions/qr_functions.php", "qr-admin-carrier=true", function (d) {
                launchOffCanvasPanel(d, 'Agency Carrier Manager');
                const email = $("#userLoggedIn").val();
                $('#selectUser').val(email).trigger("change");
                if ($('#isCarrierAdmin').length > 0) {
                    $(".addNewEntry, .editEntry").attr('disabled', false);
                    $("#selectUser").attr('disabled', false);
                }
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Save failed:', textStatus, errorThrown, jqXHR.responseText);
            const msg = textStatus === 'parsererror' ? 'Server returned malformed JSON.' : (textStatus === 'timeout' ? 'Request timed out.' : 'Network/server error.');
            qrDisplayAlert(`Something went wrong saving the carrier login. ${msg}`, "error");
        })
        .always(function () {
            qrHideLoader();
        });

    form.addClass('was-validated');
    return false;
});


$(document).on('click', '.exitCarrierLogin', function (e) {
    e.preventDefault();
    emptyOffCanvasPanelQR();
    $.post("functions/qr_functions.php", "qr-admin-carrier= true", function (data) {
        launchOffCanvasPanel(data, 'Agency Carrier Manager');
        var email = $("#userLoggedIn").val();
        $('#selectUser').val(email).trigger('change');
        if ($('#isCarrierAdmin').length > 0) {
            $(".addNewEntry").attr('disabled', false);
            $(".editEntry").attr('disabled', false);
            $("#selectUser").attr('disabled', false);
        }
    });
    return false;
})

$(document).on('click', '.delCarrierLogin', function (e) {
    const form = $("#QRCarrierManage");
    e.preventDefault();
    Swal.fire({
        title: 'Are you  sure?',
        text: "Delete this Carrier Info.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.value) {
            qrShowLoader("Please wait while we remove this Carrier Login.");
            const selectedUsers = [];
            $('#selectedCarrierUser li').each(function () {
                selectedUsers.push($(this).text());
            });

            const updateUsers = $("#idToBeUpdated").val();
            $('#stateSelect').prop('disabled', false);
            $('#carrierSelect').prop('disabled', false);
            $('#lobSelect').prop('disabled', false);

            $.ajax({
                type: "POST",
                url: "functions/qr_functions.php",
                data: $("#QRCarrierManage").serialize() + "&save_carrier=" + selectedUsers + "&update_carrier=" + updateUsers + "&removeCarrierLogin=true",
                success: function (data, result) {
                    const { status } = JSON.parse(data);

                    qrHideLoader();

                    if (status == "updated") {
                        qrDisplayAlert("Carrier entry removed successfully.", "success");
                        $.post("functions/qr_functions.php", "qr-admin-carrier=true", function (d) {
                            launchOffCanvasPanel(d, 'Agency Carrier Manager');
                            const email = $("#userLoggedIn").val();
                            $('#selectUser').val(email).trigger("change");
                            if ($('#isCarrierAdmin').length > 0) {
                                $(".addNewEntry").attr('disabled', false);
                                $(".editEntry").attr('disabled', false);
                                $("#selectUser").attr('disabled', false);
                            }
                        });
                    } else {
                        qrDisplayAlert("There was a problem removing that Carrier entry, please try again or contact Support for assistance.", "error");
                    }
                },
                error: function (e) {
                    qrHideLoader();
                    qrDisplayAlert("There was a problem removing that Carrier entry, please try again or contact Support for assistance.", "error");
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
        return false; //for good measure
    });

    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#view-web-credentials', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST", url: 'functions/qr_functions.php', data: "viewWebCreds=true", success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#qtpanelLabel').html('Web Credentials');
                $('#qtpanel .offcanvas-body').html(data.creds)
            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    icon: 'error',
                    title: 'Contact Support',
                    html: 'We were unable to retrieve your credentials.<br><br>Please contact QuoteRUSH Support - <a href="tel:8006013541">800-601-3541</a> to get your credentials.'
                });
            }
        }
    });
    return false;
})

$(document).on('click', '#carrierList .gridjs-tbody .gridjs-tr', function (e) {
    var text = $(".showPassFields").html();
    $("#carrierList .gridjs-tbody .gridjs-tr").css("border", "none");
    $("#carrierList .gridjs-tbody .gridjs-tr").children('td').css("background", "");
    $(this).css("border", "2px solid #3b76e1");
    $(this).children('td').css("background", "#fff");
    var updateId = $(this).find('a').attr('value');
    $("#idToBeUpdated").val(updateId);
    if (text == "Click Here to enter the admin mode") {
        var emails = $(this).find("[data-column-id=accessType] a").html();
        var str2 = "*";
        var str3 = $('#selectUser').val();
        if (emails.indexOf(str2) != -1) {
            $(".editEntry").attr('disabled', true);
        } else if (emails.indexOf(str3) != -1) {
            $(".editEntry").attr('disabled', false);
        } else {
            $(".editEntry").attr('disabled', true);
        }
    }
})


$(document).on('click', '.qr_lead_info', function (event) {
    var val = $(this).attr('data-value');
    var name = $(this).html();
    if ($(this).hasClass('qrLeadNotificationReminder')) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
            }, buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you have any notes to add?",
            input: 'textarea',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Dismiss and Load Lead',
            cancelButtonText: 'No, just load the lead!',
            reverseButtons: false
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                event.preventDefault();
                var val = $(this).attr('data-value');
                window.location = 'qr-lead.php?Lead=' + val;
                return false; //for good measure
            } else {
                if (result.value.trim() == "") {
                    textToAdd = ""
                } else {
                    textToAdd = result.value.trim();
                }
                var count = $('.notificationCounterBadge')[0].innerText;
                count--;
                $('.notificationCounterBadge')[0].innerText = count;
                var task = $(this).attr('data-task');
                $.ajax({
                    url: 'functions/qr_functions.php',
                    type: "POST",
                    data: 'dismiss-reminder=' + task + '&dismiss-reminder-notes=' + textToAdd,
                    success: function (data, result, row) {
                        if (data && data.status === "Got Data") {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Reminder Dismissed. Refreshing page, please wait.',
                                icon: 'success',
                                confirmButtonText: 'Ok!'
                            });
                            setTimeout(location.reload.bind(location), 3000);
                        }
                        if (data && data.status !== "Got Data") {
                            Swal.fire({
                                title: 'Whoops!',
                                text: 'There was a problem dismissing that reminder. Please try again.',
                                icon: 'error',
                                confirmButtonText: 'Ok!'
                            });
                        }
                    }
                })
            }
        })
    } else {
        event.preventDefault();
        var val = $(this).attr('data-value');
        window.location = 'qr-lead.php?Lead=' + val;
        return false; //for good measure
    }
});

function leadBackBtnclick() {
    // Check if the opened div is for lead edit or lead details
    var editDivExists = $("#qr-lead-info-row #qr-lead-edit-div").length > 0;

    if (editDivExists) {
        // lead edit
        location.reload();
    } else {
        // lead detail
        window.history.back();
    }
}

function duplicateContactModal(tableData) {
    let html = "<h5 class='text-center'>Clicking on the Lead Id in the table below will open that Lead in a new tab/window</h5><div class='row mb-2' id='duplicateTableRow'></div><div class='btn-group' id='duplicateQRLeadButtonGroup'><button class='btn btn-primary' id='continueQRLeadCreation'>Add Lead Anyway</button><button class='btn btn-danger' id='cancelQRLeadCreation'>Do Not Create New Lead</button></div>";
    let table = document.createElement('table');
    table.id = 'duplicateLeadsTable'; // Set the ID for the table
    table.className = 'table align-middle table-nowrap mb-0 dataTable no-footer'; // Set a class for the table

    // Create table header
    let thead = table.createTHead();
    let headerRow = thead.insertRow();
    let headers = ['Lead Id', 'Applicant', 'CoApplicant', 'Property Quotes', 'Auto Quotes', 'Flood Quotes', 'Last Modified On'];
    headers.forEach(headerText => {
        let headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Create table body
    let tbody = table.createTBody();

    tableData.forEach(item => {
        let row = tbody.insertRow();

        // LeadId cell with HTML content
        let leadIdCell = row.insertCell();
        leadIdCell.innerHTML = `<a href="#" target="_blank" class="qr_lead_info" data-value="${item.LeadId}"><u>${item.LeadId}</u></u></a>`; // Custom HTML for LeadId

        // Applicant cell
        let applicantCell = row.insertCell();
        applicantCell.textContent = item.Applicant;

        // CoApplicant cell
        let coApplicantCell = row.insertCell();
        coApplicantCell.textContent = item.CoApplicant;

        let pqCell = row.insertCell();
        pqCell.textContent = item.PropertyQuotes;

        let aqCell = row.insertCell();
        aqCell.textContent = item.AutoQuotes;

        let fqCell = row.insertCell();
        fqCell.textContent = item.FloodQuotes;

        // LastModified cell
        let lastModifiedCell = row.insertCell();
        lastModifiedCell.textContent = item.LastModified;
    });

    $('#qtpanel').offcanvas('hide');

    if (!$('#centeredModal .modal-dialog').hasClass('modal-xl')) {
        $('#centeredModal .modal-dialog').addClass('modal-xl');
    }

    launchCenteredModalQR(html, 'Potential Duplicate Lead(s) Found');
    $('#duplicateTableRow').append(table);
    $('#duplicateLeadsTable').DataTable();
}

$(document).on('click', '#nextBtn', function (e) {
    e.preventDefault();

    if (document.getElementById('nextBtn').innerHTML != 'Submit') return;

    if (!document.getElementById('nextBtn').classList.contains('submitNewQRLead')) {
        document.getElementById('nextBtn').classList.add('submitNewQRLead');
        return;
    }

    let form = $("#new-qr-lead-form");
    if (form[0].checkValidity() === false) {
        e.stopPropagation();
        qrDisplayAlert("Please fill all the required fields.", "error");
        return;
    }

    const url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, timeout: 30000, data: $("#new-qr-lead-form").serialize(), beforeSend: function () {
            qrShowLoader();
        }, success: function (data, result) {
            const { status, data: tableData, lead } = data;
            qrHideLoader();

            switch (status) {
                case "Got Data":
                    qrDisplayAlert("Lead added Successfully, loading your lead. Please wait.", "success")
                    setTimeout(window.location = 'qr-lead.php?Lead=' + lead + '&action=editLead', 3000);
                    break;
                case "Failed":
                    qrDisplayAlert("Whoops! There was a problem adding your contact. Please try again.", "error");
                    break;
                case "Found Duplicates":
                    duplicateContactModal(tableData);
                    break;
                default:
                    qrDisplayAlert("Whoops! There was a problem adding your lead. Please try again.", "error");
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            qrHideLoader();
            qrDisplayAlert("Whoops! There was a problem adding your lead. Please try again.", "error");
        }, complete: function (jqXHR, textStatus) {
            qrHideLoader();
        }
    });
    form.addClass('was-validated');
});

$(document).on('click', '#cancelQRLeadCreation', function (e) {
    e.preventDefault();
    $('#new-qr-lead-form')[0].reset();
    $('#centeredModalButton').trigger('click');
    $('#duplicateLeadsTable').DataTable().destroy();
    $('#duplicateQRLeadButtonGroup').remove();
    var duplicatesHtml = $('#centeredModalBody').html()
    var modal_qtpanel = $('#qtpanel');
    modal_qtpanel.find('.offcanvas-header>h5').text("Duplicate Leads");
    modal_qtpanel.find('.offcanvas-body').html(duplicatesHtml);
    $('#qtpanel').offcanvas('show');
    $('select').select2({
        theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
    });
    $('#qtpanel').css('width', '70vw');
    $('#qtpanel').offcanvas('show');
    $('#duplicateLeadsTable').DataTable();
});

$(document).on('click', '#continueQRLeadCreation', function (e) {
    e.preventDefault();
    $('#new-qr-lead-form').append('<input type="hidden" name="ignoreDuplicates" value="true" />');
    $('#centeredModalButton').trigger('click');
    $('#qtpanel').offcanvas('show');
    $('#nextBtn').trigger('click');
});

$(document).on('click', '#prevBtn', function (e) {
    if (document.getElementById('nextBtn').innerHTML == 'Next' && document.getElementById('nextBtn').classList.contains('submitNewQRLead')) {
        document.getElementById('nextBtn').classList.remove('submitNewQRLead');
    } else {

    }
});

// Overview notes
$(document).on('focusout', '.qrOverviewNotes', function (event) {
    event.preventDefault();
    qrShowLoader();

    const val = $(this).attr('data-value');
    const msg = $(this).val(); // raw text; jQuery will encode

    $.ajax({
        url: 'functions/qr_functions.php', type: 'POST', dataType: 'json', data: {
            'save-qr-overview-notes': val, 'overview-notes': msg
        }, success: function (data) {
            if (data && data.status === 'Got Data') {
                alertify.success('Overview Notes Saved');
            } else if (data && data.status === 'No Changes') {
                alertify.info('No changes detected.');
            } else {
                alertify.error('Please try editing your notes, they did not save correctly.');
            }
        }, error: function () {
            alertify.error('Network or server error while saving overview notes.');
        }, complete: function () {
            qrHideLoader();
        }
    });

    return false;
});

// Lead notes
$(document).on('focusout', '.qrLeadNotes', function (event) {
    event.preventDefault();
    qrShowLoader();

    const val = $(this).attr('data-value');
    const msg = $(this).val(); // raw text; jQuery will encode

    $.ajax({
        url: 'functions/qr_functions.php', type: 'POST', dataType: 'json', data: {
            'save-qr-lead-notes': val, 'lead-notes': msg
        }, success: function (data) {
            if (data && data.status === 'Got Data') {
                alertify.success('Lead Notes Saved');
            } else if (data && data.status === 'No Changes') {
                alertify.info('No changes detected.');
            } else {
                alertify.error('Please try editing your notes, they did not save correctly.');
            }
        }, error: function () {
            alertify.error('Network or server error while saving lead notes.');
        }, complete: function () {
            qrHideLoader();
        }
    });

    return false;
});


$(document).on('change', '#newLeadLengthOfStay', function (event) {
    event.preventDefault();
    var val = $(this).val();
    if (val == '6-12' || val == '12+' || val == '') {
        $("#qrPreviousAddress").hide();
        $('#qrPreviousAddress').find('input').val('');
    } else {
        $("#qrPreviousAddress").show();
    }
    return false; //for good measure
});

$(document).on('click', '.manageQuoteRushUsers', function (event) {
    $.ajax({
        type: "POST", url: 'functions/qr_functions.php', data: "checkQRUserPermissions=true", success: function (data) {
            if (data.QR_CanManageQuoteRushUsers === 0) {
                if (this.checked) {
                    qrDisplayAlert("enter admin password to set this permission", "error")
                    $(".passwordFiledUser").show();
                    $("#manageQuoteRushUsers").prop('checked', false);
                } else {
                    $('input:checkbox').prop('disabled', true);
                    $('.delUserQR').prop('disabled', true);
                    $("#manageQuoteRushUsers").prop('disabled', false);
                    $(".passwordFiledUser").hide();
                    $("#userMngBtn").hide();

                }
            }
        }
    });
});

$(document).on('click', '#applyUserDefaults', function (event) {
    new swal({
        title: 'Apply Defaults', html: `<h5>Which Lines(s) of Business?</h5>
        <div class="d-flex py-3 flex-wrap gap-3">
            <div class="form-check col">
                <input class="form-check-input apply-def" data-lob="0" type="checkbox" value="" id="home-defaults">
                <label class="form-check-label" for="home-defaults">
                    Home
                </label>
            </div>
            <div class="form-check col">
                <input class="form-check-input apply-def" data-lob="2" type="checkbox" value="" id="auto-defaults">
                <label class="form-check-label" for="auto-defaults">
                    Auto
                </label>
            </div>
            <div class="form-check col">
                <input class="form-check-input apply-def" data-lob="1" type="checkbox" value="" id="flood-defaults">
                <label class="form-check-label" for="flood-defaults">
                    Flood
                </label>
            </div>
            </div>
    `, focusConfirm: false, preConfirm: () => {
            if (document.getElementById('home-defaults').checked == true || document.getElementById('auto-defaults').checked == true || document.getElementById('flood-defaults').checked == true) {
                if (document.getElementById('home-defaults').checked == true && $('#apply-home-defaults').length < 1) {
                    $('#updLead').append(`<input type="hidden" name="apply-default-lobs[]" id="apply-home-defaults" value="Home"/>`);
                }
                if (document.getElementById('auto-defaults').checked == true && $('#apply-auto-defaults').length < 1) {
                    $('#updLead').append(`<input type="hidden" name="apply-default-lobs[]" id="apply-auto-defaults" value="Auto"/>`);
                }
                if (document.getElementById('flood-defaults').checked == true && $('#apply-flood-defaults').length < 1) {
                    $('#updLead').append(`<input type="hidden" name="apply-default-lobs[]" id="apply-flood-defaults" value="Flood"/>`);
                }
                if ($('#save-apply-defaults').length < 1) {
                    $('#updLead').append(`<input type="hidden" name="save-apply-defaults" id="save-apply-defaults" value="true"/>`);
                }
                checkboxes = document.getElementsByClassName("apply-def");
                selectedCheckboxes = [];
                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked) {
                        selectedCheckboxes.push(checkbox.dataset.lob);
                    }
                });
                $.ajax({
                    url: "functions/qr_functions.php",
                    dataType: "json",
                    type: "GET",
                    data: { "apply_default_settings": "apply_default_settings", "lob": selectedCheckboxes },
                    success: function (data, result) {
                        if (data.data) {
                            qrShowLoader();
                            var allData = data.data;
                            $.each(data.data, function (fKey, fVal) {
                                if ($("#" + fKey).length > 0) {
                                    if ($("#" + fKey).is(":checkbox")) {
                                        // handle checkbox value
                                        $("#" + fKey).prop("checked", fVal);
                                    } else if ($("#" + fKey).is("select")) {
                                        if (fKey == '7aa383d6-46df-11ea-ac96-000d3a7ae61a') {
                                        } else {
                                            $("#" + fKey).select2('destroy');
                                            $("#" + fKey)
                                                .find("option")
                                                .each(function () {
                                                    var option = $(this);

                                                    // Step 4: Check if the option text matches the desired text
                                                    if (option.text() === fVal || option.val() === fKey) {
                                                        option.prop("selected", true);
                                                    } else {
                                                    }
                                                });
                                            $("#" + fKey).select2({
                                                theme: "bootstrap-5", width: '100%'
                                            });
                                        }
                                    } else {
                                        $("#" + fKey).val(fVal);
                                    }
                                    $("#" + fKey).trigger("change");
                                    if (fKey == '75959cb3-46df-11ea-ac96-000d3a7ae61a' || fKey == '7441fb75-46fc-11ea-a01e-000d3a7ae61a') {
                                        setTimeout(function () {
                                            if (allData["7aa383d6-46df-11ea-ac96-000d3a7ae61a"] != "") {
                                                setTimeout(function () {
                                                    sFkey = "7aa383d6-46df-11ea-ac96-000d3a7ae61a";
                                                    sFval = allData["7aa383d6-46df-11ea-ac96-000d3a7ae61a"];
                                                    $("#" + sFkey).select2('destroy');
                                                    $('#' + sFkey + ' option').filter(function () {
                                                        return $(this).text().toLowerCase() === sFval.toLowerCase();
                                                    }).prop('selected', true);
                                                    $("#" + sFkey).select2({
                                                        theme: "bootstrap-5", width: '100%'
                                                    });
                                                    $("#" + sFkey).trigger("change");
                                                }, 2000);
                                            }
                                        }, 2000);
                                    }
                                }
                            });
                            qrHideLoader();
                            qrDisplayAlert("Default settings applied", "success");
                        } else {
                            var errMsg = "Something went wrong. Please try again later";
                            if (data["error"]) {
                                errMsg = data["error"];
                            }
                            qrDisplayAlert(errMsg, "error");
                        }
                    },
                    error: function (xhr, status) {
                        var errMsg = "Opps! there was an error while applying default settings. Please try again later";
                        qrDisplayAlert(errMsg, "error");
                    },
                });

                // $('#saveLeadInfo').trigger('click');
            } else {
                if ($('#apply-home-defaults').length > 0) {
                    $('#apply-home-defaults').remove();
                }
                if ($('#apply-auto-defaults').length > 0) {
                    $('#apply-auto-defaults').remove();
                }
                if ($('#apply-flood-defaults').length > 0) {
                    $('#apply-flood-defaults').remove();
                }
                if ($('#save-apply-defaults').length > 0) {
                    $('#save-apply-defaults').remove();
                }
                Swal.fire('Okay!', "No defaults were seleted to get applied. Please try again if you meant to apply defaults.", 'info')
            }
        }
    });
});

$(document).on('click', '#resetPasswordQR', function (e) {
    e.preventDefault();
    $("#signIn").prop("disabled", true);
    qrShowLoader();
    var url = "functions/qr_functions.php";
    var user = $('#login-email').val();
    var agency = $('#AgencyId').val();
    $.ajax({
        type: "POST", url: url, data: 'check-user=' + user, dataType: 'JSON', success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (data.multiple == 'Yes') {
                    var agency = data.agencies;
                    var agencylist = JSON.parse(agency);
                    Swal.fire({
                        title: 'Select Agency to Login To',
                        input: 'select',
                        inputOptions: agencylist,
                        inputPlaceholder: 'Please Select Agency',
                        showCancelButton: true,
                        inputValidator: function (value) {
                            return new Promise(function (resolve, reject) {
                                if (value !== '') {
                                    resolve();
                                } else {
                                    resolve('You need to select an Agency');
                                }
                            });
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            $('#AgencyId').val(result.value);
                            var agency = $('#AgencyId').val();
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: 'reset-qr-email=' + user + '&reset-AgencyId=' + agency,
                                dataType: 'JSON',
                                success: function (data, result) {
                                    if (data && data.status === "Got Data") {
                                        Swal.fire({
                                            type: 'info',
                                            title: 'Request Received',
                                            html: 'We have received your request to reset your password. If it matches a valid account you will receive an email with a temporary password. Please check your Spam / Junk folder if you do not see it in the next few minutes.'
                                        });
                                    }
                                    if (data && data.status !== "Got Data") {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Uh oh!',
                                            html: 'There was a problem with your request. Please contact Support if this persists.'
                                        });
                                    }
                                    $("#resetPasswordQR").prop("disabled", false);
                                    $("#signIn").prop("disabled", false);
                                }
                            });
                        }
                    });

                } else {
                    $('#AgencyId').val(data.agency);
                    var agency = $('#AgencyId').val();
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: 'reset-qr-email=' + user + '&reset-AgencyId=' + agency,
                        dataType: 'JSON',
                        success: function (data, result) {
                            if (data && data.status === "Got Data") {
                                Swal.fire({
                                    type: 'info',
                                    title: 'Request Received',
                                    html: 'We have received your request to reset your password. If it matches a valid account you will receive an email with a temporary password. Please check your Spam / Junk folder if you do not see it in the next few minutes.'
                                });
                            }
                            if (data && data.status !== "Got Data") {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Uh oh!',
                                    html: 'There was a problem with your request. Please contact Support if this persists.'
                                });
                            }
                            $("#resetPasswordQR").prop("disabled", false);
                            $("#signIn").prop("disabled", false);
                        }
                    });
                }
                qrHideLoader();
            }
            if (data && data.status !== "Got Data") {
                qrDisplayAlert("There was a problem with your email / password. Please try again, or contact support.", "error")
                qrHideLoader();
            }
        }
    });

    $("#resetPasswordQR").prop("disabled", false);
    $("#signIn").prop("disabled", false);
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#mSameAsPropAdd', function () {
    if ($(this).is(':checked')) {
        var mAdd = $('#f3e38f9a-46f8-11ea-a01e-000d3a7ae61a').val();
        var mAdd2 = $('#fd41d3b9-46f8-11ea-a01e-000d3a7ae61a').val();
        var mCity = $('#08e125a4-46f9-11ea-a01e-000d3a7ae61a').val();
        var mStateVal = $('#18005ee9-46f9-11ea-a01e-000d3a7ae61a').val();
        var mState = $("#18005ee9-46f9-11ea-a01e-000d3a7ae61a > option[value='" + mStateVal + "']").text();
        var mZip = $('#02b12493-46f9-11ea-a01e-000d3a7ae61a').val();
        $('#911de265-4758-11ea-a01e-000d3a7ae61a').val(mAdd);
        $('#99f5a70e-4758-11ea-a01e-000d3a7ae61a').val(mAdd2);
        $('#9f99f8b8-4758-11ea-a01e-000d3a7ae61a').val(mZip);
        $('#a37eb604-4758-11ea-a01e-000d3a7ae61a').val(mCity);
        $('#b219896b-4758-11ea-a01e-000d3a7ae61a').select2('destroy');
        $("#b219896b-4758-11ea-a01e-000d3a7ae61a > option").each(function () {
            if ($(this).attr('selected')) {
                $(this).removeAttr("selected");
            }
        });
        $("#b219896b-4758-11ea-a01e-000d3a7ae61a > option").each(function () {
            if ($(this).text() == mState) {
                var newVal = $(this).val();
                $("#b219896b-4758-11ea-a01e-000d3a7ae61a").val(newVal).change();
            }
        });
        $('#b219896b-4758-11ea-a01e-000d3a7ae61a').select2({
            theme: "bootstrap-5", width: '100%'
        });
        $('#getPropertyData').trigger('click');
    } else {

    }
});

$(document).on('click', '.setPermission', function (event) {
    var pass = $(".adminUserPass").val();
    if (pass == "Qu0teRUSHROX!") {
        $("#manageQuoteRushUsers").prop('checked', true);
        $('input:checkbox').prop('disabled', false);
        //$("#manageQuoteRushUsers").prop('disabled', false);
        $(".passwordFiledUser").hide();
        $('.delUserQR').prop('disabled', false);
        $("#userMngBtn").show();
    } else {
        qrDisplayAlert("Invalid Password", "error");
        $(".passwordFiledUser").hide();
    }
});

$(document).on("click", '.passwordReveal, .endpointKeyReveal', function () {
    var e = $(this).data("value");
    var el = $('#' + e);
    if (el.attr('type') === "password") {
        el.attr('type', "text");
    } else {
        el.attr('type', "password");
    }
});

$(document).on("click", '.updateQRAdminPassword, .updateQRWebIdPassword', function () {
    var pwUpdate = `<div class="row mt-2 mb-2"><div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">` + `<label for="upd_privileged_pw" class="form-label">Password</label>` + `<input type="password" class="form-control" placeholder="Enter Password" id="upd_privileged_pw" name="upd_privileged_pw">` + `<div class="invalid-feedback">Please enter a valid passwrord</div>` + `<div class="valid-feedback">Looks good!</div>` + `<span id='confirmMessage' class='confirmMessage'></span>` + `</div>` + `<div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">` + `<label for="upd_privileged_pw_conf" class="form-label">Confirm Password</label>` + `<input type="password" class="form-control" placeholder="Confirm Password" id="upd_privileged_pw_conf" name="upd_privileged_pw_conf">` + `<div class="invalid-feedback">Please enter a valid passwrord</div>` + `<div class="valid-feedback">Looks good!</div>` + `</div></div>`;
    if ($(this).hasClass('updateQRAdminPassword')) {
        pwUpdate += `<div class="row mt-2 mb-2">` + `<div class="btn-group">` + `<button class="btn btn-primary" id="updateQRAdminPasswordButton">Update Admin Password</button>` + `<button class="btn btn-danger" id="cancelUpdateQRAdminPasswordButton">Cancel</button>` + `</div></div>`;
        launchCenteredModalQR(pwUpdate, "Update Admin Password");
    } else if ($(this).hasClass('updateQRWebIdPassword')) {
        pwUpdate += `<div class="row mt-2 mb-2">` + `<div class="btn-group">` + `<button class="btn btn-primary" id="updateQRWebIdPasswordButton">Update WebId Password</button>` + `<button class="btn btn-danger" id="cancelUpdateQRWebIdPasswordButton">Cancel</button>` + `</div></div>`;
        launchCenteredModalQR(pwUpdate, "Update WebId Password");
    } else {

    }
});
$(document).on("click", '#cancelUpdateQRWebIdPasswordButton, #cancelUpdateQRAdminPasswordButton', function () {
    emptyAndCloseCenteredModalQR();
});

$(document).on("click", '#updateQRWebIdPasswordButton, #updateQRAdminPasswordButton, #rotateEndpointKeyButton', function () {
    var pwType = "";
    var postData = "";
    if ($(this).attr('id') === 'updateQRWebIdPasswordButton') {
        pwType = "WebId";
        postData = "QRWebIdPWUpdate";
    } else if ($(this).attr('id') === 'updateQRAdminPasswordButton') {
        pwType = "Admin";
        postData = "QRAdminPWUpdate";
    } else if ($(this).attr('id') === 'rotateEndpointKeyButton') {
        pwType = "EndpointKey";
        postData = "QREndpointKeyRotate";
    }
    var swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-primary", cancelButton: "btn btn-danger me-3",
        }, buttonsStyling: false,
    });
    swalWithBootstrapButtons
        .fire({
            title: "Are you sure, you want to update/rotate your " + pwType + " Password/Key?",
            text: "Clicking Yes will notify the Admin(s) on this account of the change.",
            icon: "warning",
            confirmButtonText: "Yes",
            cancelButtonText: "No, cancel!",
            showCancelButton: true,
            reverseButtons: false,
            focusConfirm: false,
        }).then((result) => {
            if (result.value) {
                if (pwType === 'EndpointKey') {
                    $.ajax({
                        url: "functions/qr_functions.php",
                        type: "POST",
                        data: `${postData}=true&qrPrivilegedPWUpdate=tue`,
                        beforeSend: function () {
                            qrShowLoader();
                        },
                        success: function (data, result) {
                            qrHideLoader();
                            if (data && data.status === "Got Data") {
                                emptyAndCloseCenteredModalQR();
                                qrHideLoader();
                                qrDisplayAlert(pwType + " updated successfully.", "success");
                            } else {
                                emptyAndCloseCenteredModalQR();
                                qrHideLoader();
                                Swal.fire('Error!', "There was a problem trying to update your " + pwType + ". Please try again or contact Support for assistance", 'error')
                            }
                        },
                    });
                } else {
                    if (checkPrivilegedPass()) {
                        var pwVal = $('#upd_privileged_pw').val();
                        $.ajax({
                            url: "functions/qr_functions.php",
                            type: "POST",
                            data: `${postData}=true&qrPrivilegedPWUpdate=${pwVal}`,
                            beforeSend: function () {
                                qrShowLoader();
                            },
                            success: function (data, result) {
                                qrHideLoader();
                                if (data && data.status === "Got Data") {
                                    emptyAndCloseCenteredModalQR();
                                    qrHideLoader();
                                    qrDisplayAlert(pwType + " password updated successfully.", "success");
                                } else {
                                    emptyAndCloseCenteredModalQR();
                                    qrHideLoader();
                                    Swal.fire('Error!', "There was a problem trying to update your " + pwType + ". Please try again or contact Support for assistance", 'error')
                                }
                            },
                        });
                    } else {
                        Swal.fire('Error!', "There was a problem trying to update your " + pwType + ". Please try again or contact Support for assistance", 'error')
                    }
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
            return false; //for good measure
        });
});

$(document).on('keyup', "#upd_privileged_pw, #upd_privileged_pw_conf", function () {
    if ($('#upd_privileged_pw').val() != '' && $('#upd_privileged_pw_conf').val() != '') {
        checkPrivilegedPass();
    }
})

function checkPrivilegedPass() {
    var pass1Element = document.getElementById("upd_privileged_pw");
    var pass2Element = document.getElementById("upd_privileged_pw_conf");
    var message = document.getElementById("confirmMessage");
    var goodColor = "#66cc66";
    var badColor = "#ff6666";

    var pass1 = pass1Element.value;
    var pass2 = pass2Element.value;

    // Regular expressions for checking password complexity
    var hasUpperCase = /[A-Z]/.test(pass1);
    var hasLowerCase = /[a-z]/.test(pass1);
    var hasNumbers = /\d/.test(pass1);
    var hasSpecialChar = /[!#@_]/.test(pass1);
    var isLengthValid = pass1.length >= 12;

    if (pass1 !== pass2) {
        pass2Element.style.borderColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords do not match!";
        if ($('#updateQRWebIdPasswordButton').length > 0) {
            $('#updateQRWebIdPasswordButton').attr('disabled', true);
        } else if ($('#updateQRAdminPasswordButton').length > 0) {
            $('#updateQRAdminPasswordButton').attr('disabled', true);
        }
        return false;
    } else if (!isLengthValid || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        pass2Element.style.borderColor = badColor;
        message.style.color = badColor;
        // Construct feedback message based on missing criteria
        var feedback = "Password must be at least 12 characters long, include upper and lower case letters, numbers, and at least one special character (!, #, @, _).";
        if (!isLengthValid) {
            feedback += "<br>- At least 12 characters.";
        }
        if (!hasUpperCase) {
            feedback += "<br>- Include an uppercase letter.";
        }
        if (!hasLowerCase) {
            feedback += "<br>- Include a lowercase letter.";
        }
        if (!hasNumbers) {
            feedback += "<br>- Include a number.";
        }
        if (!hasSpecialChar) {
            feedback += "<br>- Include one of the special characters: !, #, @, _.";
        }
        message.innerHTML = feedback;
        if ($('#updateQRWebIdPasswordButton').length > 0) {
            $('#updateQRWebIdPasswordButton').attr('disabled', true);
        } else if ($('#updateQRAdminPasswordButton').length > 0) {
            $('#updateQRAdminPasswordButton').attr('disabled', true);
        }
        return false;
    } else {
        pass2Element.style.borderColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords match!";
        if ($('#updateQRWebIdPasswordButton').length > 0) {
            $('#updateQRWebIdPasswordButton').attr('disabled', false);
        } else if ($('#updateQRAdminPasswordButton').length > 0) {
            $('#updateQRAdminPasswordButton').attr('disabled', false);
        }
        return true;
    }
}

if (!window.hasNotificationListener) {
    window.hasNotificationListener = true;
    document.addEventListener('DOMContentLoaded', function () {
        if (!("Notification" in window)) {
            console.log('Desktop notifications are not available in your browser. Try Chromium.');
            return;
        }

        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted');

                } else {
                    console.log('Notification permission denied');
                }
            }).catch(error => {
                console.log('Error requesting notification permission:');
            });
        }
    });
}

function showMFADesktopNotification(siteName, lead) {
    let baseUrl = window.location.protocol + '//' + window.location.hostname;
    if (Notification.permission === "granted") {
        var notification = new Notification("MFA Request", {
            body: `You requested a quote from ${siteName} for Lead: ${lead}. Please switch to the QuoteRUSH Web tab and provide the MFA code.`,
            icon: `${baseUrl}/assets/images/qr-logo-light-sm.png` // Replace with your logo URL
        });
    } else {
    }
}

function showDesktopNotification(title, msg) {
    let baseUrl = window.location.protocol + '//' + window.location.hostname;
    if (Notification.permission === "granted") {
        var notification = new Notification(title, {
            body: `${msg}`, icon: `${baseUrl}/assets/images/qr-logo-light-sm.png` // Replace with your logo URL
        });
    } else {
    }
}

$(document).on('click', '.downloadQRDOCXTemplate', function (e) {
    e.preventDefault();
    var docId = $(this).attr('data-value');
    $.ajax({
        url: 'functions/print_summary_functions.php', type: 'POST', data: { downloadQRDOCXTemplate: docId }, xhrFields: {
            responseType: 'blob'  // Important for handling binary data
        }, success: function (response, status, xhr) {
            // Try to get filename from the content-disposition header
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
            }

            filename = filename || "QuoteSummaryTemplate.docx"; // Default filename if not set

            // Create a new Blob object using the response data
            var blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

            // Create a link element, use it to download the blob, and remove it
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, error: function (xhr, status, error) {
            console.log("Error downloading the file: " + error);
        }
    });
});

$(document).on('click', '#Quote-settings', function (e) {

    var summaryType = $('input[name="settings"]:checked').val()
    var urlval = document.querySelector('#Url').checked
    var disclaimer = document.querySelector('#disclaimer').checked
    var disclaimerText = $("#DiscalimerText").val();
    var introText = $("#intro").val();
    var primaryColor = $("#primarycolor").val();
    var logo_height = $("#logo_height").val();
    var logo_Width = $("#logo_Width").val();
    var showCurrentPremium = document.querySelector('#showCurrentPremium').checked
    var showDescription = document.querySelector('#showDescription').checked
    var hideEndorsements = document.querySelector('#hideEndorsements').checked
    var useOldInfoLayout = document.querySelector('#useOldInfoLayout').checked
    var url = "functions/print_summary_functions.php";
    if (logo_Width > 500) {
        $('#logo-err').css('display', 'block');
        return false;

    } else {
        $('#logo-err').css('display', 'none');
    }
    if (logo_height > 500) {
        $('#logo-err').css('display', 'block');
        return false;

    } else {
        $('#logo-err').css('display', 'none');
    }


    var form_data = new FormData();
    form_data.append("summaryType", summaryType);
    form_data.append("url", urlval);
    form_data.append("disclaimer", disclaimer);
    form_data.append("showCurrentPremium", showCurrentPremium);
    form_data.append("showDescription", showDescription);
    form_data.append("hideEndorsements", hideEndorsements);
    form_data.append("useOldInfoLayout", useOldInfoLayout);
    form_data.append("disclaimerText", disclaimerText);
    form_data.append("introText", introText);
    form_data.append("logo_height", logo_height);
    form_data.append("primaryColor", primaryColor);
    form_data.append("logo_Width", logo_Width);
    form_data.append("image", document.getElementById('myFile').files[0]);
    form_data.append("docxtemplate", document.getElementById('myTemplate').files[0]);
    form_data.append("summarysettings", "true");
    if ($('#myFile').val() != "") {
        var name = document.getElementById('myFile').files[0].name;
        var ext = name.split('.').pop().toLowerCase();
        if (jQuery.inArray(ext, ['png', 'jpg', 'jpeg']) == -1) {
            qrDisplayAlert("Invalid Image File.Only,png,jpg and jpeg file format supported", "error");
            return false;
        }
        var f = document.getElementById("myFile").files[0];
        var fsize = f.size || f.fileSize;
        var normal_size = Math.round((fsize / 1024));
        if (normal_size >= 5120) {
            qrDisplayAlert("Image File Size is very big.Please upload less than 5 Mb only", "error");
            return false;
        }
    }

    if ($('#myTemplate').val() != "") {
        var name = document.getElementById('myTemplate').files[0].name;
        var ext = name.split('.').pop().toLowerCase();
        if (jQuery.inArray(ext, ['docx', 'dotx']) == -1) {
            qrDisplayAlert("Invalid Template File. Only docx file format supported", "error");
            return false;
        }
    }

    $.ajax({
        type: "POST",
        url: url,
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data, result) {
            if (result == "success") {
                setTimeout(location.reload.bind(location), 3000);
                Swal.fire('Success!', "Settings updated, refreshing to show your changes.", 'success')
            }
        }
    });


});

$(document).on('input', '.yearvalidate', function (e) {
    $(this).attr('maxlength', '4');
    if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '');
    $yearvalidate = true;
    var len = $(this).val().length;
    if (len == 4 || len == 0) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        $yearvalidate = true;
    } else {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().fadeIn();
        $(this).next().text('Please enter valid year');
        $("#updateCustomQuesions").prop('disabled', true);
        $yearvalidate = false;
    }
    if (!$yearvalidate) return false;
});

$(document).on('input', '.zipcode', function (e) {
    $(".zipcode").attr('maxlength', '5');
    if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '');
    if (this.value.length === 5 || this.value.length === 0) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
    } else {
        $("#updateCustomQuesions").prop('disabled', true);
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().text('Zip with 5 digits allowed');
        $(this).next().fadeIn();
    }
});

$(document).on('input', '.phonenumber', function (e) {
    $(this).attr('maxlength', '12');
    var phone = $(this).val();
    if (phone.indexOf('1') == 0) {
        $(this).val('');
    }
    var val = this.value.replace(/\D/g, '');
    var newVal = '';
    for (i = 0; i < 2; i++) {
        if (val.length > 3) {
            newVal += val.substr(0, 3) + '-';
            val = val.substr(3);
        }
    }
    newVal += val;
    this.value = newVal;
});

$(document).on('input', '.daysvacant', function (e) {
    $(this).attr('maxlength', '3');
    if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '');
});
$(document).on('input', '.squarefeet', function (e) {
    $(this).attr('maxlength', '7');
    if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 0 && this.value.length < 3) {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().css('color', 'red');
        $(this).next().fadeIn();
        $(this).next().text('Please enter Square Feet value with minimum 3 characters');
        $("#updateCustomQuesions").prop('disabled', true);
    } else if (this.value.length == 0 && this.value.length == 7) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    } else {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    }
});
$(document).on('input', '.dwellingamount', function (e) {
    $(this).attr('maxlength', '10');
    if (this.value.length > 0 && this.value.length < 4) {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().css('color', 'red');
        $(this).next().fadeIn();
        $(this).next().text('Please enter Dwelling Amount with minimum 4 characters');
        $("#updateCustomQuesions").prop('disabled', true);
    } else if (this.value.length == 0) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    } else {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    }
    if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '');
});
$(document).on('input', '.screenedenclosure', function (e) {
    $(this).attr('maxlength', '6');
    if (this.value.length > 0 && this.value.length < 2) {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().css('color', 'red');
        $(this).next().fadeIn();
        $(this).next().text('Please enter Screened Enclosure(sf) with minimum 2 characters');
        $("#updateCustomQuesions").prop('disabled', true);
    } else if (this.value.length == 0 && this.value.length == 6) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    } else {
        $(this).css({
            border: ''
        });
        // $(this).next().css('color', 'green');
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).next().fadeOut();
    }
});
$(document).on('input', '.otherstructures', function (e) {
    $(this).attr('maxlength', '9');
    if (this.value.length > 0 && this.value.length < 3) {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().css('color', 'red');
        $(this).next().fadeIn();
        $(this).next().text('Please enter Other Structures with minimum 3 characters');
        $("#updateCustomQuesions").prop('disabled', true);
    } else if (this.value.length == 0) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    } else {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    }
});

$(document).on('click', '.addQRIntegration', function (event) {
    qrShowLoader();
    var val = $(this).attr('data-value');
    if (val != '') {
        qrDisplayAlert('Please wait.....', "info");
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST",
            url: url,
            data: 'addQRIntegration=' + val,
            dataType: 'JSON',
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    qrHideLoader();
                    Swal.fire({
                        type: 'info',
                        title: 'Please Wait!',
                        html: 'We are going to redirect you to the vendors site to authorize the integration, in a few seconds, please wait!'
                    });
                    setTimeout(function () {
                        window.location = data.data;
                    }, 3000);
                }
                if (data && data.status !== "Got Data") {
                    qrDisplayAlert("There was a problem trying to add that integration. Please try again, or contact support.", "error")
                    qrHideLoader();
                }
            }
        });
    } else {
        qrDisplayAlert("There was a problem trying to add that integration. Please try again, or contact support.", "error")
    }
});

$(document).on('click', '.learnMoreMP', function (event) {
    event.preventDefault();
    qrShowLoader();
    var val = $(this).attr('data-value');
    if (val != '') {
        qrDisplayAlert('Please wait.....', "info");
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: 'trackLearnMore=' + val, dataType: 'JSON', success: function (data, result) {
                if (data && data.status === "Got Data") {
                    qrHideLoader();
                    Swal.fire({
                        type: 'info',
                        title: 'Please Wait!',
                        html: 'We are going to redirect you to the vendors site, in a few seconds, please wait!'
                    });
                    setTimeout(function () {
                        window.location = data.data;
                    }, 3000);
                }
                if (data && data.status !== "Got Data") {
                    qrDisplayAlert("There was a problem trying to go to that site. Please try again, or contact support.", "error")
                    qrHideLoader();
                }
            }
        });
    } else {
        qrDisplayAlert("There was a problem trying to go to that site. Please try again, or contact support.", "error")
    }
    return false;
});

$(document).on('click', '.viewEstimatorWidgetCode, .deleteEstimatorWidget', function (event) {
    event.preventDefault();
    let table = $('#active-widgets-table').DataTable();
    let ewid = $(this).attr('data-value');
    let keyName = $(this).hasClass('viewEstimatorWidgetCode') ? 'getWidgetConfig' : 'deleteWidgetConfig';
    $.ajax({
        type: "POST",
        url: 'functions/qr_functions.php',
        data: 'checkIfQRAdmin=true',
        dataType: 'JSON',
        success: function (data) {
            if ((!data || data.status !== "Got Data") && keyName === 'deleteWidgetConfig') {
                Swal.fire({
                    type: 'error',
                    title: "Access Denied",
                    html: "This action is only available to Account Admin(s). Please contact your QuoteRUSH Account Admin to create an Estimator Widget."
                });
                return false;
            }
        },
        error: function () {
            return false;
        }
    });
    $.ajax({
        type: "POST",
        url: 'functions/qr_functions.php',
        data: `${keyName}=true&EstimatorWidgetId=` + ewid,
        dataType: 'JSON',
        success: function (data) {
            if (data && data.status === "Got Data") {
                if (keyName == 'deleteWidgetConfig') {
                    qrDisplayAlert('Widget deleted successfully, and billing updated. Refreshing table.', 'success');
                    table.draw();
                } else if (keyName == 'getWidgetConfig') {
                    launchCenteredModal(data.data, 'Widget Embed Code');
                } else {
                    qrDisplayAlert('Unable to complete that action, please try again or contact Support for assistance.', 'error');
                }
            }
        },
        complete: function () {
            qrHideLoader();
        },
        error: function () {
            qrHideLoader();
        }
    });
    return false;
});


$(document).on('click', '.addEstimatorWidget', function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: 'functions/qr_functions.php',
        data: 'checkIfQRAdmin=true',
        dataType: 'JSON',
        success: function (data) {
            if (!data || data.status !== "Got Data") {
                Swal.fire({
                    type: 'error',
                    title: "Access Denied",
                    html: "This action is only available to Account Admin(s). Please contact your QuoteRUSH Account Admin to create an Estimator Widget."
                });
                return false;
            }
        },
        error: function () {
            return false;
        }
    });
    qrShowLoader('Please wait.....');
    qrDisplayAlert('Please wait.....', "info");
    $.ajax({
        type: "POST",
        url: 'functions/qr_billing_functions.php',
        data: { 'get-billing-info': 'QuickFetch' },
        dataType: 'JSON',
        success: function (data) {
            if (data && data.status === "Got Data") {
                let lastBill = new Date(data.data.BillingInfo.CalculatedLastBilledDate);
                let widgetCost = 25.00;
                let proratedAmount;
                try {
                    const today = new Date();
                    const currentYear = today.getFullYear();
                    const billYear = lastBill.getFullYear();
                    if (billYear !== currentYear) {
                        proratedAmount = new Intl.NumberFormat('en-US', {
                            style: 'currency', currency: 'USD'
                        }).format(widgetCost);

                    } else {
                        const year = currentYear;
                        const month = lastBill.getMonth();
                        const day = lastBill.getDate();
                        let nextBill = new Date(year, month + 1, day, lastBill.getHours(), lastBill.getMinutes(), lastBill.getSeconds());
                        if (nextBill.getDate() !== day) {
                            nextBill = new Date(year, month + 2, 1);
                            nextBill.setDate(0);
                        }
                        today.setHours(0, 0, 0, 0);
                        const msPerDay = 1000 * 60 * 60 * 24;
                        const diffMs = nextBill - today;
                        if (isNaN(diffMs) || diffMs <= 0) {
                            throw new Error("Next billing date is in the past or invalid");
                        }
                        const daysRemaining = Math.ceil(diffMs / msPerDay);
                        const periodStart = new Date(year, month, day);
                        const periodMs = nextBill - periodStart;
                        const daysInMonth = Math.round(periodMs / msPerDay);
                        if (daysInMonth <= 0) {
                            throw new Error("Invalid billing period length");
                        }
                        const dailyRate = widgetCost / daysInMonth;
                        const prorate = dailyRate * daysRemaining;
                        proratedAmount = new Intl.NumberFormat('en-US', {
                            style: 'currency', currency: 'USD'
                        }).format(prorate);
                    }
                } catch (e) {
                    qrHideLoader();
                    return qrDisplayAlert("Unable to calculate your prorated charge. Please contact Support for assistance.", "error");
                }

                let divHtml = `
        <h5>
          Creating this Widget will automatically add 
          <strong id="widgetCost">$25.00/month</strong> to your QuoteRUSH bill, 
          as well as a <strong id="widgetProratedCost">${proratedAmount}</strong> one-time charge today.
        </h5>
        <span class="text-muted">
          Admin(s) and Billing Contact(s) will be notified of the charges on creation
        </span>
        <form action="function/qr_functions.php" method="post" id="new-estimator-widget-config" role="form" novalidate>
          <div class="row mb-4">
            
            <div class="col-sm-8 col-xs-12">
              <label for="new-widget-domain" class="col-sm-8 col-xs-12 col-form-label">Domain</label>
              <input type="text" class="form-control" 
                     placeholder="Enter Website Domain: Example - quoterush.com" 
                     id="new-widget-domain" name="new-widget-domain" required>
              <span class="text-muted">
                Each Widget is restricted to one domain, and will only work for pages using that domain
              </span>
            </div>
            <div class="col-sm-4 col-xs-12">
              <label for="new-widget-friendlyname" class="col-sm-12 col-xs-12 col-form-label">Widget Friendly Name</label>
              <input type="text" class="form-control" 
                     placeholder="Enter Friendly Name for Widget" 
                     id="new-widget-friendlyname" name="new-widget-friendlyname" required>
            </div>
          </div>
          <input type="hidden" name="proratedWidgetAmount" value="${proratedAmount}">
          <div class="row justify-content-end">
            <button type="submit" class="btn btn-primary w-md">
            Create Widget
            </button>
          </div>
        </form>
      `;

                launchCenteredModalQR(divHtml, 'New Estimator Widget Form', 'modal-xl');
            } else {
                qrDisplayAlert("There was a problem trying to add that integration. Please try again, or contact support.", "error");
            }
        },
        complete: function () {
            qrHideLoader();
        },
        error: function () {
            qrHideLoader();
        }
    });
    return false;
});

$(document).on('submit', '#new-estimator-widget-config', function (e) {
    e.preventDefault();
    hideCenteredModalQR();
    qrShowLoader('Creating your Widget....please wait!');
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: $("#new-estimator-widget-config").serialize(), success: function (data, result) {
            if (data && data.status == 'Got Data') {
                qrHideLoader();
                launchCenteredModal(data.data, 'Widget Embed Code');
            } else {
                qrHideLoader();
                showCenteredModalQR();
                qrDisplayAlert("Whoops! There was a problem adding this widget. Please try again, or contact Support.", "error");
            }
        }
    });
    return false;
});


$(document).on('submit', '#qr-reshop-bot-settings', function (e) {
    e.preventDefault();
    qrShowLoader('Updating Reshop Settings.......');
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: $("#qr-reshop-bot-settings").serialize(), success: function (data, result) {
            if (data && data.status == 'Got Data') {
                qrHideLoader();
                qrDisplayAlert("Reshop Bot Settings updated successfully.", "success");
            } else if (data && data.status == 'No Change') {
                qrHideLoader();
                qrDisplayAlert("No changes found. Please try again, or contact Support for assistance", "message");
            } else {
                qrHideLoader();
                qrDisplayAlert("There was a problem trying to update Reshop Bot Settings. Please try again, or contact Support for assistance.", "error");
            }
        }, error: function () {
            qrHideLoader();
            qrDisplayAlert("There was a problem trying to update Reshop Bot Settings. Please try again, or contact Support for assistance.", "error");
        }
    });
    return false;
});

$(document).on('input', '.personalproperty', function (e) {
    $(this).attr('maxlength', '9');
    if (this.value.length > 0 && this.value.length < 3) {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().css('color', 'red');
        $(this).next().fadeIn();
        $(this).next().text('Please enter Personal Property with minimum 3 characters');
        $("#updateCustomQuesions").prop('disabled', true);
    } else if (this.value.length == 0) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    } else {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    }
});
$(document).on('input', '.lossofuse', function (e) {
    $(this).attr('maxlength', '9');
    if (this.value.length > 0 && this.value.length < 3) {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().css('color', 'red');
        $(this).next().fadeIn();
        $(this).next().text('Please enter Loss of Use with minimum 3 characters');
        $("#updateCustomQuesions").prop('disabled', true);
    } else if (this.value.length == 0) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    } else {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    }
});
$(document).on('input', '.purchaseprice', function (e) {
    $(this).attr('minlength', '4');
    if (this.value.length > 0 && this.value.length < 4) {
        $(this).css({
            border: '3px solid red'
        });
        $(this).next().css('color', 'red');
        $(this).next().fadeIn();
        $(this).next().text('Please enter Purchase Price with minimum 4 characters');
        $("#updateCustomQuesions").prop('disabled', true);

    } else if (this.value.length == 0) {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    } else {
        $("#updateCustomQuesions").prop('disabled', false);
        $(this).css({
            border: ''
        });
        $(this).next().fadeOut();
        // $(this).next().css('color', 'green');
    }
    if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '');
});

$(document).on('change', '.req-industry, .inc-industry', function (e) {
    var Icheck = $('.inc-industry, .req-industry').is(':checked');
    if (!Icheck) {
        $('.inc-occupation').prop('checked', false);
        $('.rec-occupation').prop('checked', false);
    }
});

$(document).on('change', '.rec-occupation, .inc-occupation', function (e) {
    var Icheck = $('.inc-industry, .req-industry').is(':checked');
    if (!Icheck) {
        $('.inc-occupation').prop('checked', false);
        $('.rec-occupation').prop('checked', false);
    }
});

$(document).on('input', '.currentannualpremium', function (e) {
    if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g, '');

});

$(document).on('click', '.requiredButton', function (e) {
    if ($(this).is(':checked')) {
        var fid = $(this).attr('data-value');
        if (!$('#include__' + fid).is(':checked')) {
            $('#include__' + fid).trigger('click');
        }
    }
});
$(document).on('click', '.includeButton', function (e) {
    if (!$(this).is(':checked')) {
        var fid = $(this).attr('data-value');
        if ($('#required__' + fid).is(':checked')) {
            $('#required__' + fid).trigger('click');
        }
    }
});

// THIS CODE IS TO CHANGE OCCUPATION LIST ON INDUSTRY CHANGE UNDER APPLICANT INFO//
$(document).on('change', '#defaultValue__75959cb3-46df-11ea-ac96-000d3a7ae61a', function (e) {
    const selectedIndustry = $(this).val();
    const occupFieldId = 'defaultValue__7aa383d6-46df-11ea-ac96-000d3a7ae61a';
    updateOccupationListByIndustry(selectedIndustry, occupFieldId);
});

$(document).on('change', '#defaultValue__7441fb75-46fc-11ea-a01e-000d3a7ae61a', function (e) {
    const selectedIndustry = $(this).val();
    const occupFieldId = 'defaultValue__793e18f4-46fc-11ea-a01e-000d3a7ae61a';
    updateOccupationListByIndustry(selectedIndustry, occupFieldId);
});

$(document).on('change', '#defaultValue__75959cb3-46df-11ea-ac96-000d3a7ae61a', function (e) {
    const selectedIndustry = $('#defaultValue__75959cb3-46df-11ea-ac96-000d3a7ae61a option:selected').attr('value');
    const occupFieldId = 'defaultValue__7aa383d6-46df-11ea-ac96-000d3a7ae61a';
    updateOccupationListByIndustry(selectedIndustry, occupFieldId);
});

function updateOccupationListByIndustry(selectedIndustry, occupFieldId, selectedOccupation = '') {
    var occupField = $("#" + occupFieldId);
    var feature = "";
    if (occupFieldId.indexOf("defaultValue__") !== -1) {
        occupFieldId = occupFieldId.replace("defaultValue__", "");
        feature = "webform";
    } else {
        feature = "home-settings";
    }


    if (selectedIndustry == '') {
        occupField.empty();
        occupField.append('<option value="">Select an Occupation</option>');

    } else {
        $.ajax({
            type: "POST",
            url: "functions/qr_webform_functions.php",
            dataType: "json",
            data: 'action=get-occupations&selectedIndustry=' + selectedIndustry + '&occupationFieldId=' + occupFieldId,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    occupField.empty();
                    occupField.append('<option value="">Select an Occupation</option>');
                    var options = "";
                    $.each(data.data, function (opt_index, opt_data) {
                        var selected = "";
                        if (selectedOccupation == opt_data.OptionId) {
                            selected = "selected";
                        }
                        if (feature == "webform") {
                            options += '<option value="' + opt_data.OptionId + '" ' + selected + '>' + opt_data.OptionValue + '</option>';
                        } else if (feature == "home-settings") {
                            options += '<option id="' + opt_data.OptionId + '" value="' + opt_data.OptionValue + '" ' + selected + '>' + opt_data.OptionValue + '</option>';

                        }
                    });

                    occupField.append(options);
                    occupField.prop('disabled', false);
                    occupField.trigger('change');
                }
            },
            error: function (xhr, status, error) {
                qrDisplayAlert("Whoops! There was a problem getting the related Occupation list. Please try again.", "error");
                occupField.empty();
                occupField.append('<option value="">Select an Occupation</option>');
            },
        });
    }
}

$(document).on('click', '#includeStarterForm', function (e) {
    if ($(this).is(':checked')) {
        $('.estimate-subsequent-options').show();
    } else {
        $('.estimate-subsequent-options').hide();
    }
});

$(document).on('click', '.genQRProposal', function (event) {
    var val = $(this).attr('data-value');
    window.location.href = 'qr-proposal-generator.php?Contact=' + val;
});

function showHideIncludeEstimateWizOpts(selectedLob) {
    if (selectedLob == 'Home') {
        $('#includeEstimatesWizard').show();
    } else {
        $('#includeEstimatesWizard').hide();
        $('.estimate-subsequent-options').hide();
    }
}

function qr_setCookie(name, value, exp_days) {
    var d = new Date();
    d.setTime(d.getTime() + (exp_days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

$(document).on('change', '#64ec3f94-4759-11ea-a01e-000d3a7ae61a', function (e) {
    const current_stories = $('#733a95dd-4759-11ea-a01e-000d3a7ae61a').val();
    if (['0ff61bef-475f-11ea-a01e-000d3a7ae61a', '11fdeacc-475f-11ea-a01e-000d3a7ae61a'].includes($('#64ec3f94-4759-11ea-a01e-000d3a7ae61a').val())) {
        updateFloorOptions(true, current_stories); // Condo or Apartment, update with 1-70 floors
        $('label[for="733a95dd-4759-11ea-a01e-000d3a7ae61a"]').text('Stories (Bldg)');
        $('#724c4172-302f-11f0-a5a3-000d3ae5ae41-div').show();
    } else {
        updateFloorOptions(false, current_stories); // Neither Condo nor Apartment, update with predefined stories
        $('label[for="733a95dd-4759-11ea-a01e-000d3a7ae61a"]').text('Stories');
        $('#724c4172-302f-11f0-a5a3-000d3ae5ae41-div').hide();
    }

    const structures_with_units_in_building_number = ['11fdeacc-475f-11ea-a01e-000d3a7ae61a', '0ff61bef-475f-11ea-a01e-000d3a7ae61a', 'fe77fde9-475e-11ea-a01e-000d3a7ae61a', 'f9c3abc0-475e-11ea-a01e-000d3a7ae61a', 'f118befb-475e-11ea-a01e-000d3a7ae61a', 'edeaa2bd-475e-11ea-a01e-000d3a7ae61a'];
    if (structures_with_units_in_building_number.includes($('#64ec3f94-4759-11ea-a01e-000d3a7ae61a').val())) {
        $('#84bea54d-4759-11ea-a01e-000d3a7ae61a-div').show();
    } else {
        $('#84bea54d-4759-11ea-a01e-000d3a7ae61a-div').hide();
        $('#84bea54d-4759-11ea-a01e-000d3a7ae61a').val(0);
    }
});

function qr_getCookie(name) {
    var cname = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function qr_deleteCookie(name) {
    var d = new Date();
    d.setTime(d.getTime() - (60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=;" + expires + ";path=/";
}


// Save Default Auto settings
const saveAutoBtn = document.getElementById("save_auto_defaults");

$(document).on("click", "#save_auto_defaults", function (e) {
    const saveAutoBtn = document.getElementById("save_auto_defaults");
    const originalText = saveAutoBtn.innerHTML;
    // Replace the button text with the spinner icon markup
    saveAutoBtn.innerHTML = '<i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Saving...';

    var $form = $("#user_defaults_auto_form");
    var formValues = $form.serialize();
    $.ajax({
        url: "functions/qr_functions.php",
        type: "POST",
        dataType: "json",
        data: formValues + "&save_auto_defaults",
        success: function (data, response) {
            if (response == 'success') {
                qrDisplayAlert("Auto Default changes saved successfully", "success");
            } else {
                qrDisplayAlert("Opps! there was an error while saving Auto Default changes. Please try again later", "error");
            }
        },
        error: function (xhr, status, error) {
            qrDisplayAlert("Opps! there was an error while saving Auto Default changes. Please try again later", "error");
        }

    });
    // After the data loads, hide the spinner icon
    saveAutoBtn.innerHTML = originalText;
});

// Save Default Home settings
$(document).on("click", "#save_home_defaults", function (e) {
    const saveHomeBtn = document.getElementById("save_home_defaults");
    const originalText = saveHomeBtn.innerHTML;
    saveHomeBtn.innerHTML = '<i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Saving...';

    var $form = $("#user_defaults_home_form");
    var formValues = $form.serialize();
    $.ajax({
        url: "functions/qr_functions.php",
        type: "POST",
        dataType: "json",
        data: formValues + "&save_home_defaults",
        success: function (data, response) {
            if (response == 'success') {
                qrDisplayAlert("Home Default changes saved successfully", "success");
            } else {
                qrDisplayAlert("Opps! there was an error while saving Home Default changes. Please try again later", "error");
            }
        },
        error: function (xhr, status, error) {
            qrDisplayAlert("Opps! there was an error while saving Home Default changes. Please try again later", "error");
        }

    });
    saveHomeBtn.innerHTML = originalText;
});

$(document).on('submit', '#addWidgetMapping', function (e) {

    var form = $("#addWidgetMapping");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        qrDisplayAlert("Please fill the all required fields", "error");
    } else {
        e.preventDefault();
        $('input.canopyWidgetMappingSelect').each(function () {
            var inputValue = $(this).val().trim(); // Trim to remove any leading/trailing whitespace

            // Check if the input is blank
            if (inputValue === '') {
                // Remove the input element if it's blank
                $(this).remove();
            } else {
                var dataTeam = $(this).data('team'); // Retrieve the data-team value
                var dataUrl = $(this).data('url'); // Retrieve the data-url value
                var modifiedValue = dataTeam + '|' + dataUrl + '|' + inputValue; // Construct the new value

                // Update the input value with the modified value
                $(this).val(modifiedValue);
            }
        });
        var url = 'functions/qr_functions.php';
        $.ajax({
            type: "POST", url: url, data: $('#addWidgetMapping').serialize(), dataType: 'JSON',

            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    Swal.fire({
                        type: 'success',
                        title: "Integration completed!",
                        html: "Re-directing you to your dashboard in 10 seconds, please wait."
                    });
                    setTimeout(function () {
                        window.location.replace(window.location.origin + '/qr-index.php');
                    }, 10000);
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'We were unable to update that info! Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Ok!'
                    });
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});

$(document).on("focusout", ".qrFormatPhoneNumber", function (e) {
    if ($(this).val() != '') {
        var phoneElement = $(this);
        var phoneNumber = $(this).val();
        $.ajax({
            url: "functions/qr_functions.php",
            type: "POST",
            dataType: "json",
            data: "qr-format-phone=" + phoneNumber,
            success: function (data, response) {
                if (data && data.status == 'Got Data' && data.formattedPhone != '') {
                    phoneElement.val(data.formattedPhone);
                } else {
                }
            },
            error: function (xhr, status, error) {
                qrDisplayAlert("Opps! there was an error while saving Home Default changes. Please try again later", "error");
            }

        });
    } else {
        return false;
    }
});

$(document).on("focusout", ".qrProposalLogo", function (e) {
    if ($(this).val() != '') {
        $('#qr-client-proposal-logo').attr('src', $(this).val());
    } else {
        return false;
    }
});

$(document).on('change', '.canopyWidgetMappingSelect', function (event) {
    // Check if the selected option's value is 'OtherMapping'
    if ($(this).val() === 'OtherMapping') {
        var selectName = $(this).attr('name'); // Get the name of the select
        var selectClass = $(this).attr('class'); // Get the class of the select
        var dataTeam = $(this).data('team'); // Get the data-team attribute
        var dataUrl = $(this).data('url'); // Get the data-url attribute

        // Create a new input element with the same name, class, and make it required
        var input = $('<input>', {
            type: 'text', // Set input type to text
            name: selectName, // Use the same name as the select
            class: selectClass, 'data-team': dataTeam, // Set the data-team attribute
            'data-url': dataUrl, // Set the data-url attribute
            required: true // Make the input required
        });

        // Replace the select element with the new input element
        $(this).replaceWith(input);
    }
});

$(document).on("click", "#save_wind_mitigation", function (e) {
    const saveWindMitigationBtn = document.getElementById("save_wind_mitigation");

    const originalText = saveWindMitigationBtn.innerHTML;
    saveWindMitigationBtn.innerHTML = '<i class="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> Saving...';

    var $form = $("#user_defaults_wind_form");
    var formValues = $form.serialize();
    $.ajax({
        url: "functions/qr_functions.php",
        type: "POST",
        dataType: "json",
        data: formValues + "&save_home_defaults",
        success: function (data, response) {
            if (response == 'success') {
                qrDisplayAlert("Wind Mitigation changes saved successfully", "success");
            } else {
                qrDisplayAlert("Opps! there was an error while saving Home Default changes. Please try again later", "error");
            }
        },
        error: function (xhr, status, error) {
            qrDisplayAlert("Opps! there was an error while saving Home Default changes. Please try again later", "error");
        }

    });
    $('#close_wind_mitigation_btn').trigger('click');
    saveWindMitigationBtn.innerHTML = originalText;
});

$(document).on('click', '#qr-change-log-toggle-v', function (event) {
    var link = $(this).data('link');
    window.open(link, '_blank');
});


$(document).on('click', '#deactivateSubAgency', function (event) {
    event.preventDefault();
    qrShowLoader();
    var deactivateAgency = $(this).attr('data-value');
    $.ajax({
        url: "functions/qr_functions.php",
        type: "POST",
        dataType: "json",
        data: "get-qr-deactivation-info=" + deactivateAgency,
        success: function (data, response) {
            if (data && data.status == 'Got Data') {
                qrHideLoader();
                if (data.DeactivationDate != '') {
                    Swal.fire({
                        title: 'Are you sure?',
                        html: data.Agency + ' will lose all access to our products on ' + data.DeactivationDate + '.',
                        icon: 'warning',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: "deactivate-qr-agency=" + deactivateAgency,
                                success: function (data, result) {
                                    if (data && data.status == 'Got Data') {
                                        $('#sub-agency-editor-row').html(``);
                                        $('#sub-agency-editor-row').hide();
                                        $('#qr-enterprise-manager-row').show();
                                        qrHideLoader();
                                        Swal.fire({
                                            title: 'Done!',
                                            html: '<p>The De-Activation request was received successfully. For more information, or if you need to cancel this, please reach out to <a href="mailto:billing@quoterush.com">Billing</a></p>',
                                            icon: 'info',
                                            confirmButtonText: 'Ok!'
                                        });
                                    } else {
                                        qrHideLoader();
                                        qrDisplayAlert("Oops! there was a problem processing the deactivation for this Agency. Please try again later", "error");
                                    }
                                },
                                error: function (xhr, status, error) {
                                    qrHideLoader();
                                    qrDisplayAlert("Oops! there was a problem processing the deactivation for this Agency. Please try again later", "error");
                                }
                            });
                        } else if (result.dismiss === Swal.DismissReason.cancel) {

                        }
                    })
                } else {
                    Swal.fire({
                        title: 'Are you sure?',
                        html: data.Agency + ' will lose all access to our products at the end of your current billing cycle.',
                        icon: 'warning',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'No',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            qrShowLoader();
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: "deactivate-qr-agency=" + deactivateAgency,
                                success: function (data, result) {
                                    if (data && data.status == 'Got Data') {
                                        $('#sub-agency-editor-row').html(``);
                                        $('#sub-agency-editor-row').hide();
                                        $('#qr-enterprise-manager-row').show();
                                        qrHideLoader();
                                        Swal.fire({
                                            title: 'Done!',
                                            html: '<p>The De-Activation request was received successfully. For more information, or if you need to cancel this, please reach out to <a href="mailto:billing@quoterush.com">Billing</a></p>',
                                            icon: 'info',
                                            confirmButtonText: 'Ok!'
                                        });
                                    } else {
                                        qrHideLoader();
                                        qrDisplayAlert("Oops! there was a problem processing the deactivation for this Agency. Please try again later", "error");
                                    }
                                },
                                error: function (xhr, status, error) {
                                    qrHideLoader();
                                    qrDisplayAlert("Oops! there was a problem processing the deactivation for this Agency. Please try again later", "error");
                                }
                            });
                        } else if (result.dismiss === Swal.DismissReason.cancel) {

                        }
                    })
                }
            } else {
                qrHideLoader();
                qrDisplayAlert("Oops! there was a problem getting the information we needed to De-Activate this Agency. Please try again later", "error");
            }
        },
        error: function (xhr, status, error) {
            qrHideLoader();
            qrDisplayAlert("Oops! there was a problem getting the information we needed to De-Activate this Agency. Please try again later", "error");
        }

    });
    qrHideLoader();
    return false;
});


$(document).on('click', '#getSubAgencyInfo', function (event) {
    event.preventDefault();
    qrShowLoader();
    var dataAgency = $(this).attr('data-value');
    $.ajax({
        type: "POST", url: url, data: "Sub-QR-Agency-Id=" + dataAgency, success: function (data, result) {
            if (data && data.status == 'Got Data') {
                $('#sub-agency-editor-row').html(`<h5>Edit Sub-Agency</h5>` + data.data);
                $('#sub-agency-editor-row').show();
                $('#qr-enterprise-manager-row').hide();
                const subAgencyId = $('#updSubQRAgencyInfo #Sub-QR-Agency-Id').val();
                $.ajax({
                    type: "POST", url: url, data: 'get-qr-sub-agency-user-settings=true&sub-user-qr-agency-id=' + subAgencyId, success: function (data, result) {
                        if (data && data.status == 'Got Data') {
                            $.fn.dataTable.moment('MM/DD/YY h:mm a');
                            $('#qr-sub-agency-user-settings-row').html(data.data);
                            $('#qr-sub-agency-user-settings-row').show();
                            if ($('#sub-agency-active-users-table').length > 0) {
                                $("#sub-agency-active-users-table").DataTable({
                                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }],
                                    "order": [[0, "asc"]],
                                    "pageLength": 10
                                });
                            }
                            if ($('#sub-agency-active-pcs-table').length > 0) {
                                $("#sub-agency-active-pcs-table").DataTable({
                                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                                        'type': 'date', 'targets': [2]
                                    }], "order": [[0, "asc"]], "pageLength": 10
                                });
                            }
                            if ($('#sub-agency-deleted-users-table').length > 0) {
                                $("#sub-agency-deleted-users-table").DataTable({
                                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                                        'type': 'date', 'targets': [3]
                                    }], "order": [[0, "asc"]], "pageLength": 10
                                });
                            }
                            if ($('#sub-agency-blocked-pcs-table').length > 0) {
                                $("#sub-agency-blocked-pcs-table").DataTable({
                                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                                        'type': 'date', 'targets': [2]
                                    }], "order": [[0, "asc"]], "pageLength": 10
                                });
                            }
                            HideLoader();
                        } else {
                            $('#qr-sub-angency-info-row').html("<h3>Unable to retrieve Sub Agency User Settings, please try again");
                            HideLoader();
                        }
                    }
                });
                qrHideLoader();
            } else {
                qrHideLoader();
                qrDisplayAlert("Oops! there was a problem getting the information we needed for this Agency. Please try again later", "error");
            }
        }, error: function (xhr, status, error) {
            qrHideLoader();
            qrDisplayAlert("Oops! there was a problem getting the information we needed for this Agency. Please try again later", "error");
        }
    });
    qrHideLoader();
    return false;
});

$(document).on('click', '.editQRQuote, .addQRQuote', function (event) {
    event.preventDefault();
    if ($(this).hasClass('addQRQuote')) {
        var lead = GetQRURLParameter('Lead');
        lob = $(this).data('lob');
        if (lob == 'Home') {
            var param = 'edit-qr-quote-property';
        } else if (lob == 'Flood') {
            var param = 'edit-qr-quote-property';
        } else if (lob == 'Auto') {
            var param = 'edit-qr-quote-autopolicy';
        }
        qidentifier = $(this).data('qidentifier');
        var url = "functions/qr_functions.php";
        $.ajax({
            url: url,
            type: 'POST',
            data: 'edit-qr-quote=0&edit-qr-quote-line=' + lob + '&edit-qr-quote-lead=' + lead + `&${param}=` + qidentifier,
            dataType: 'json',
            timeout: 5000,
            beforeSend: function (xhr) {
                qrShowLoader();
            },
            success: function (data, textStatus, xhr) {
                if (data && data.status == 'Got Data') {
                    var qr_edit_quote_modal = $('#centeredModal');
                    $('#centeredModalBody').html(data.data);
                    $('#centeredModalTitle').html('Add ' + lob + ' Quote');
                    $('#centeredModalBody select').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModalBody")
                    });
                    qrHideLoader();
                    $('#centeredModalButton').trigger('click');
                }
                if (data && data.status != 'Got Data') {
                    qrDisplayAlert("We were unable to pull the details for that quote. Please refresh and try again.", "error");
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                qrHideLoader();
            },
            complete: function (xhr, textStatus) {

            }
        });
    } else {
        val = $(this).attr('data-value');
        lob = $(this).data('lob');
        var url = "functions/qr_functions.php";
        $.ajax({
            url: url,
            type: 'POST',
            data: 'edit-qr-quote=' + val + '&edit-qr-quote-line=' + lob,
            dataType: 'json',
            timeout: 5000,
            beforeSend: function (xhr) {
                qrShowLoader();
            },
            success: function (data, textStatus, xhr) {
                if (data && data.status == 'Got Data') {
                    var qr_edit_quote_modal = $('#centeredModal');
                    $('#centeredModalBody').html(data.data);
                    $('#centeredModalTitle').html('Edit ' + lob + ' Quote');
                    $('#centeredModalBody select').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModalBody")
                    });
                    qrHideLoader();
                    $('#centeredModalButton').trigger('click');
                }
                if (data && data.status != 'Got Data') {
                    qrDisplayAlert("We were unable to pull the details for that quote. Please refresh and try again.", "error");
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                qrHideLoader();
            },
            complete: function (xhr, textStatus) {

            }
        });
    }


});

$(document).on('submit', '#updQRAgencyInfo', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        contentType: false,
        processData: false,
        success: function (data, result) {
            if (data && data.status == 'Got Data') {
                qrDisplayAlert("Agency Profile Updated Successfully!", "message");
            } else {
                qrDisplayAlert("Agency Profile Update Failed! Please try again.", "error");
            }
        }
    });
    return false;
});

$(document).on('submit', '#updSubQRAgencyInfo', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        contentType: false,
        processData: false,
        success: function (data, result) {
            if (data && data.status == 'Got Data') {
                qrDisplayAlert("Agency Profile Updated Successfully!", "message");
                $('#updSubQRAgencyInfo').remove();
                $('#sub-agency-editor-row').hide();
                $('#qr-enterprise-manager-row').show();
            } else {
                qrDisplayAlert("Agency Profile Update Failed! Please try again.", "error");
            }
        }
    });
    return false;
});


$(document).on('click', '#addSubQRAgencyButton', function (e) {
    e.preventDefault();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: 'add-qr-sub-agency=true', success: function (data, result) {
            if (data && data.status == 'Got Data') {
                $('#sub-agency-editor-row').html(data.data);
                $('#sub-agency-editor-row').show();
                $('#qr-enterprise-manager-row').hide();
            } else {
                qrDisplayAlert("Unable to add a new Agency! Please try again.", "error");
            }
        }
    });
    return false;
});

$(document).on('click', '#cancelAddSubAgency', function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        html: 'Any changes you have made will be lost.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $('#addSubQRAgency').remove();
            $('#sub-agency-editor-row').hide();
            $('#qr-enterprise-manager-row').show();
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
    })
    return false;
});

$(document).on('click', '.clearRQSeries', function (event) {
    event.preventDefault();
    var seriesId = $(this).attr('data-value');
    var url = "functions/qr_functions.php";
    const tr = $(this).closest('tr');
    Swal.fire({
        title: 'Are you sure?',
        html: 'This will delete any Quote requests that have not started, and is not reversible.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'clear-rq-series=' + seriesId, success: function (data, result) {
                    if (data && data.status == 'Got Data') {
                        tr.remove();
                        qrHideLoader();
                        qrDisplayAlert("Quote Request(s) Deleted Successfully!", "message");
                    } else {
                        qrHideLoader();
                        qrDisplayAlert("We were unable to delete these Quote request(s)! Please try again, or contact Support for assistance.", "error");
                    }
                }, error: function (xhr, status, error) {
                    // Handle errors
                    qrHideLoader();
                    qrDisplayAlert("We were unable to delete these Quote request(s)! Please try again, or contact Support for assistance.", "error");
                }, complete: function () {
                    qrHideLoader();
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    return false;
});

$(document).on('click', '.requeueRQSeries', function (event) {
    event.preventDefault();
    var seriesId = $(this).attr('data-value');
    var url = "functions/qr_functions.php";
    Swal.fire({
        title: 'Are you sure?',
        html: 'This will requeue all Quote request(s) for this Lead that have not started.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'requeue-rq-series=' + seriesId, success: function (data, result) {
                    if (data && data.status == 'Got Data') {
                        qrHideLoader();
                        qrDisplayAlert("Quote request(s) requeued successfully!", "message");
                    } else {
                        qrHideLoader();
                        qrDisplayAlert("We were unable to requeue these Quote request(s)! Please try again, or contact Support for assistance.", "error");
                    }
                }, error: function (xhr, status, error) {
                    // Handle errors
                    qrHideLoader();
                    qrDisplayAlert("We were unable to requeue these Quote request(s)! Please try again, or contact Support for assistance.", "error");
                }, complete: function () {
                    qrHideLoader();
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    return false;
});

$(document).on('click', '.clearSiteFromRQ', function (event) {
    event.preventDefault();
    const tr = $(this).closest('tr');
    var seriesId = $(this).attr('data-value');
    var url = "functions/qr_functions.php";
    Swal.fire({
        title: 'Are you sure?',
        html: 'This will delete the Quote request for this Lead/Carrier, and is not reversible.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'clear-rq-site-for-lead=' + seriesId, success: function (data, result) {
                    if (data && data.status == 'Got Data') {
                        tr.remove();
                        qrHideLoader();
                        qrDisplayAlert("Quote Request Deleted Successfully!", "message");
                    } else {
                        qrHideLoader();
                        qrDisplayAlert("We were unable to delete this Quote request! Please try again, or contact Support for assistance.", "error");
                    }
                }, error: function (xhr, status, error) {
                    // Handle errors
                    qrHideLoader();
                    qrDisplayAlert("We were unable to delete this Quote request! Please try again, or contact Support for assistance.", "error");
                }, complete: function () {
                    qrHideLoader();
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    return false;
});

$(document).on('click', '.requeueSiteFromRQ', function (event) {
    event.preventDefault();
    var seriesId = $(this).attr('data-value');
    var url = "functions/qr_functions.php";
    Swal.fire({
        title: 'Are you sure?',
        html: 'This will requeue the Quote request for this Lead/Carrier.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST", url: url, data: 'requeue-rq-site-for-lead=' + seriesId, success: function (data, result) {
                    if (data && data.status == 'Got Data') {
                        qrHideLoader();
                        qrDisplayAlert("Quote request requeued successfully!", "message");
                    } else {
                        qrHideLoader();
                        qrDisplayAlert("We were unable to requeue this Quote request! Please try again, or contact Support for assistance.", "error");
                    }
                }, error: function (xhr, status, error) {
                    // Handle errors
                    qrHideLoader();
                    qrDisplayAlert("We were unable to requeue this Quote request! Please try again, or contact Support for assistance.", "error");
                }, complete: function () {
                    qrHideLoader();
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    return false;
});

$(document).on('submit', '#addSubQRAgency', function (e) {
    e.preventDefault();
    $('#completeAddSubAgency').attr('disabled', true);
    qrShowLoader();
    var url = "functions/qr_functions.php";
    var formData = new FormData(this);
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        contentType: false,
        processData: false,
        success: function (data, result) {
            if (data && data.status == 'Got Data') {
                qrHideLoader();
                qrDisplayAlert("Agency Added Successfully!", "message");
                $('#addSubQRAgency').remove();
                $('#sub-agency-editor-row').hide();
                $('#qr-enterprise-manager-row').show();
                $('#qr-enterprise-manager-href').trigger('click');
            } else {
                qrHideLoader();
                $('#completeAddSubAgency').attr('disabled', false);
                qrDisplayAlert("We were unable to add that new Location! Please try again, or contact Support for assistance.", "error");
            }
        },
        error: function (xhr, status, error) {
            // Handle errors
            qrHideLoader();
            $('#completeAddSubAgency').attr('disabled', false);
            qrDisplayAlert("We were unable to add that new Location! Please try again, or contact Support for assistance.", "error");
        },
        complete: function () {
            qrHideLoader();
        }
    });
    return false;
});

$(document).on('click', '.deleteQRAccountAdmin, .deleteQRAccountBillingContact', function (event) {
    event.preventDefault();
    var AAId = $(this).attr('data-value');
    var tRow = $(this).closest('tr');
    if ($(this).hasClass('deleteQRAccountAdmin')) {
        var utype = 'Admin';
        var param = 'delete-account-admin';
    } else if ($(this).hasClass('deleteQRAccountBillingContact')) {
        var utype = 'Billing Contact';
        var param = 'delete-account-billing-contact';
    }
    Swal.fire({
        title: 'Are you sure?',
        html: 'Are you sure you want to delete this ' + utype + '?<p>This will remove all privileges associated and will require them to be added again to regain those privileges</p>',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            var url = "functions/qr_functions.php";
            $.ajax({
                type: "POST", url: url, data: param + '=' + AAId, success: function (data, result) {
                    if (data && data.status == 'Got Data') {
                        qrDisplayAlert(utype + " deleted Successfully!", "message");
                        tRow.remove();
                    } else {
                        qrDisplayAlert("Deleting this " + utype + " failed! Please try again.", "error");
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    })
    return false;
});

$(document).on('click', '.addQRAccountAdmin, .editQRAccountAdmin, .addQRAccountBillingContact, .editQRAccountBillingContact', function (event) {
    event.preventDefault();
    if ($(this).hasClass('addQRAccountAdmin')) {
        var param = 'add-qr-account-admin';
        var paramVal = '';
    } else if ($(this).hasClass('editQRAccountAdmin')) {
        var param = 'edit-qr-account-admin';
        var paramVal = $(this).attr('data-value');
    } else if ($(this).hasClass('addQRAccountBillingContact')) {
        var param = 'add-qr-account-billing-contact';
        var paramVal = '';
    } else if ($(this).hasClass('editQRAccountBillingContact')) {
        var param = 'edit-qr-account-billing-contact';
        var paramVal = $(this).attr('data-value');
    }
    var url = "functions/qr_functions.php";
    if ($('#Sub-QR-Agency-Id').length > 0) {
        var subQR = $('#Sub-QR-Agency-Id').val();
        $.ajax({
            type: "POST",
            url: url,
            data: param + '=' + paramVal + '&subQRAID=' + subQR,
            success: function (data, result) {
                if (data && data.status == 'Got Data') {
                    launchCenteredModalQR(data.data, data.modalTitle);
                } else {
                    qrDisplayAlert("Well, that did not work! Please try again.", "error");
                }
            }
        });
    } else {
        $.ajax({
            type: "POST", url: url, data: param + '=' + paramVal, success: function (data, result) {
                if (data && data.status == 'Got Data') {
                    launchCenteredModalQR(data.data, data.modalTitle);
                } else {
                    qrDisplayAlert("Well, that did not work! Please try again.", "error");
                }
            }
        });
    }

    return false;
});

$(document).on('click', '#qr-sub-agency-user-settings-href', function (event) {
    event.preventDefault();
    var url = "functions/qr_functions.php";
    const subAgencyId = $('#updSubQRAgencyInfo #Sub-QR-Agency-Id').val();
    $.ajax({
        type: "POST", url: url, data: 'get-qr-sub-agency-user-settings=true&sub-user-qr-agency-id=' + subAgencyId, success: function (data, result) {
            if (data && data.status == 'Got Data') {
                $.fn.dataTable.moment('MM/DD/YY h:mm a');
                $('#qr-sub-agency-user-settings-row').html(data.data);
                $('#qr-sub-agency-user-settings-row').show();
                if ($('#sub-agency-active-users-table').length > 0) {
                    $("#sub-agency-active-users-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }],
                        "order": [[0, "asc"]],
                        "pageLength": 10
                    });
                }
                if ($('#sub-agency-active-pcs-table').length > 0) {
                    $("#sub-agency-active-pcs-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                            'type': 'date', 'targets': [2]
                        }], "order": [[0, "asc"]], "pageLength": 10
                    });
                }
                if ($('#sub-agency-deleted-users-table').length > 0) {
                    $("#sub-agency-deleted-users-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                            'type': 'date', 'targets': [3]
                        }], "order": [[0, "asc"]], "pageLength": 10
                    });
                }
                if ($('#sub-agency-blocked-pcs-table').length > 0) {
                    $("#sub-agency-blocked-pcs-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                            'type': 'date', 'targets': [2]
                        }], "order": [[0, "asc"]], "pageLength": 10
                    });
                }
                HideLoader();
            } else {
                $('#qr-sub-angency-info-row').html("<h3>Unable to retrieve Sub Agency User Settings, please try again");
                HideLoader();
            }
        }
    });

    return false;
});

$(document).on('click', '#qr-user-settings-href', function (event) {
    event.preventDefault();
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: 'get-qr-agency-user-settings=true', success: function (data, result) {
            if (data && data.status == 'Got Data') {
                $.fn.dataTable.moment('MM/DD/YY h:mm a');
                $('#qr-agency-user-settings-row').html(data.data);
                $('#qr-agency-user-settings-row').show();
                if ($('#agency-active-users-table').length > 0) {
                    $("#agency-active-users-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }],
                        "order": [[0, "asc"]],
                        "pageLength": 10
                    });
                }
                if ($('#agency-active-pcs-table').length > 0) {
                    $("#agency-active-pcs-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                            'type': 'date', 'targets': [2]
                        }], "order": [[0, "asc"]], "pageLength": 10
                    });
                }
                if ($('#agency-deleted-users-table').length > 0) {
                    $("#agency-deleted-users-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                            'type': 'date', 'targets': [3]
                        }], "order": [[0, "asc"]], "pageLength": 10
                    });
                }
                if ($('#agency-blocked-pcs-table').length > 0) {
                    $("#agency-blocked-pcs-table").DataTable({
                        "columnDefs": [{ "className": "dt-center", "targets": "_all" }, {
                            'type': 'date', 'targets': [2]
                        }], "order": [[0, "asc"]], "pageLength": 10
                    });
                }
                HideLoader();
            } else {
                $('#qr-angency-info-row').html("<h3>Unable to retrieve Agency User Settings, please try again");
                HideLoader();
            }
        }
    });

    return false;
});

$(document).on('click', '#qr-billing-settings-href', function (event) {
    event.preventDefault();

    const val = $(this).attr('data-value'); // declare it

    if (val === undefined || val === null || String(val).trim() === '') {
        qrDisplayAlert("Unable to retrieve billing info. Please try again or contact Support.", "error");
        return false;
    }

    $.ajax({
        type: "POST", url: "functions/qr_billing_functions.php", dataType: "json",                      // expect JSON
        data: {                                // let jQuery encode properly
            "get-billing-info": val, loadBillingTab: true
        }, beforeSend: function () {
            qrShowLoader();
        }, success: function (data) {
            if (data && data.status === "Got Data") {
                $('#qr-agency-billing-settings-row').html(data.data).show();

                // Previous transactions table
                if ($("#previous-transactions-table").length) {
                    if ($.fn.dataTable.isDataTable("#previous-transactions-table")) {
                        $("#previous-transactions-table").DataTable().destroy();
                    }
                    $("#previous-transactions-table").DataTable({
                        order: [[0, "desc"]], columnDefs: [{ type: 'date', targets: 0 }], pageLength: 10
                    });
                }

                // Current products table
                if ($("#current-products-table").length) {
                    if ($.fn.dataTable.isDataTable("#current-products-table")) {
                        $("#current-products-table").DataTable().destroy();
                    }

                    $("#current-products-table").DataTable({
                        pageLength: 10, ordering: true, order: [[1, 'desc'], [0, 'asc']], columnDefs: [{
                            targets: 3, // Sub-Total
                            render: function (data, type) {
                                // For sorting/type detection, return a numeric value
                                if (type === 'sort' || type === 'type') {
                                    return parseFloat(String(data).replace(/[^0-9.-]/g, '')) || 0;
                                }
                                return data; // display unchanged
                            }
                        }], footerCallback: function () {
                            const api = this.api();

                            const toNum = (i) => {
                                if (typeof i === 'number') return i;
                                return parseFloat(String(i).replace(/[^0-9.-]/g, '')) || 0;
                            };

                            let total = api.column(3).data().reduce((a, b) => toNum(a) + toNum(b), 0);
                            let pageTotal = api.column(3, { page: 'current' }).data().reduce((a, b) => toNum(a) + toNum(b), 0);

                            const formatted = total.toLocaleString('en-US', {
                                style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2
                            }) + ' (Account Total)';

                            $(api.column(3).footer()).html(formatted);
                            // If you want to show pageTotal too, add another cell or update text here.
                        }
                    });
                }


                // Available products table
                if ($("#available-products-table").length) {
                    if ($.fn.dataTable.isDataTable("#available-products-table")) {
                        $("#available-products-table").DataTable().destroy();
                    }
                    $("#available-products-table").DataTable({
                        pageLength: 10, ordering: true, order: [[1, 'desc'], [0, 'asc']], columnDefs: [{
                            targets: 1, render: function (data, type) {
                                // For sorting/type detection, return a numeric value
                                if (type === 'sort' || type === 'type') {
                                    return parseFloat(String(data).replace(/[^0-9.-]/g, '')) || 0;
                                }
                                return data; // display unchanged
                            }
                        }],
                    });
                }

                // Client invoices table
                if ($("#client-invoices-table").length) {
                    if ($.fn.dataTable.isDataTable("#client-invoices-table")) {
                        $("#client-invoices-table").DataTable().destroy();
                    }
                    $("#client-invoices-table").DataTable({
                        order: [[0, "desc"]], columnDefs: [{ type: 'date', targets: 0 }], pageLength: 10
                    });
                }

                if ($("#forte-customer-payment-type").length) {
                    $('#forte-customer-payment-type').select2();
                }

                $('.nav-tabs').css('margin-bottom', '40px');
            } else {
                // server responded but without expected status
                // optionally show an alert here
            }
        }, error: function (xhr) {
            qrDisplayAlert("Error loading billing info. Please try again.", "error");
            // console.error(xhr.responseText);
        }, complete: function () {
            qrHideLoader();
        }
    });

    return false;
});


$(document).on('change', '#qr-account-admin-select, #qr-account-billing-contact-select', function (event) {
    event.preventDefault();
    var selectedOption = $(this).find('option:selected');
    if ($(this).val() != '') {
        var aId = selectedOption.val();
        var aName = selectedOption.data('ename');
        var aPhone = selectedOption.data('ephone');
        var aEmail = selectedOption.data('eemail');
        if ($(this).attr('id') == 'qr-account-admin-select' && $(this).val() != '') {
            $('#qr-account-admin-name').val(aName);
            $('#qr-account-admin-phone').val(aPhone);
            $('#qr-account-admin-email').val(aEmail);
            if ($('#qr-account-admin-userid').length > 0) {
                $('#qr-account-admin-userid').val(aId);
            } else {
                $('#qrAccountAdminForm').append("<input type='hidden' id='qr-account-admin-userid' name='qr-account-admin-userid' value='" + aId + "' />");
            }
        } else if ($(this).attr('id') == 'qr-account-billing-contact-select' && $(this).val() != '') {
            $('#qr-account-billing-contact-name').val(aName);
            $('#qr-account-billing-contact-phone').val(aPhone);
            $('#qr-account-billing-contact-email').val(aEmail);
            if ($('#qr-account-billing-contact-userid').length > 0) {
                $('#qr-account-billing-contact-userid').val(aId);
            } else {
                $('#qrAccountBillingContactForm').append("<input type='hidden' id='qr-account-billing-contact-userid' name='qr-account-billing-contact-userid' value='" + aId + "' />");
            }
        }
    }
});

$(document).on('submit', '#qrAccountBillingContactForm, #qrAccountAdminForm', function (event) {
    event.preventDefault();
    var url = "functions/qr_functions.php";
    $.ajax({
        url: url, type: 'POST', data: $(this).serialize(), dataType: 'json', timeout: 5000, beforeSend: function (xhr) {
            qrShowLoader();
        }, success: function (data, textStatus, xhr) {
            if (data && data.status == 'Got Data') {
                qrHideLoader();
                $('#centeredModalButton').trigger('click');
                qrDisplayAlert("Success, reloading the page to reflect the changes.");
                setTimeout(location.reload.bind(location), 3000);
            } else if (data && data.status != 'Got Data') {
                qrHideLoader();
                qrDisplayAlert("Well, that did not work! Please try again.", "error");
            }

        }, error: function (xhr, textStatus, errorThrown) {
            qrHideLoader();
            qrDisplayAlert("Well, that did not work! Please try again.", "error");
        }, complete: function (xhr, textStatus) {

        }
    });
});

$(document).on('change', '.quoteCoverageDropdown', function (e) {
    if ($(this).val() == 'Other') {
        $(this).select2('destroy');
        var newInput = $('<input/>', {
            type: 'text',
            id: $(this).attr('id'),
            name: $(this).attr('name'),
            class: $(this).attr('class'),
            placeholder: 'Please enter a value'
        });
        $(this).replaceWith(newInput);
    }
});

$(document).on('submit', '#editQuoteForm', function (event) {
    event.preventDefault();
    var url = "functions/qr_functions.php";
    $.ajax({
        url: url,
        type: 'POST',
        data: $('#editQuoteForm').serialize(),
        dataType: 'json',
        timeout: 5000,
        beforeSend: function (xhr) {
            qrShowLoader();
        },
        success: function (data, textStatus, xhr) {
            if (data && data.status == 'Got Data') {
                $('#daysprint').trigger('change');
                $('#centeredModalBody').html('');
                $('#centeredModalTitle').html('');
                $('#centeredModalButton').trigger('click');
                qrHideLoader();
                qrDisplayAlert("Updated quote successfully. Reloading your quotes.");
            } else if (data && data.status != 'Got Data') {
                qrHideLoader();
                qrDisplayAlert("We were unable to update that quote. Please refresh and try again.", "error");
            } else if (data && data.status != 'No Changes') {
                qrHideLoader();
                qrDisplayAlert("No changes were made. Please try again if you did attempt a change.", "info");
            } else {
                qrHideLoader();
                qrDisplayAlert("We were unable to update that quote. Please refresh and try again.", "error");
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            qrDisplayAlert("We were unable to update that quote. Please refresh and try again.", "error");
            qrHideLoader();
        },
        complete: function (xhr, textStatus) {

        }
    });
});

function addApplyDefaultVehicleBtn() {
    removeApplyDefaultBtn('driver');
    addApplyDefaultBtn('vehicle');
}

function addApplyDefaultDriverBtn() {
    removeApplyDefaultBtn('vehicle');
    addApplyDefaultBtn('driver');
}

function removeApplyDefaultBtn(remBtnName) {
    if ($('#applyUserDefaults-' + remBtnName).length > 0) {
        $('#applyUserDefaults-' + remBtnName).remove();
    }
}

function addApplyDefaultBtn(addBtnName) {
    if ($('#applyUserDefaults-' + addBtnName).length < 1) {
        const modal_hdr_lbl = $('#qtpanelLabel');
        const applyDefault = '<button id="applyUserDefaults-' + addBtnName + '" onclick = "applyUserDefaultSettings(\'' + addBtnName + '\')" class="btn btn-primary" role="button"><i class="fa-sharp fa-regular fa-ballot-check"></i> Apply Defaults</button>';
        modal_hdr_lbl.after(applyDefault);
    }
}

function applyUserDefaultSettings(entityName) {
    qrShowLoader();
    var data = "";
    if (entityName == 'driver') {
        data = "apply_default_driver_settings";
    } else if (entityName == 'vehicle') {
        data = "apply_default_vehicle_settings";
    }
    $.ajax({
        url: "functions/qr_functions.php", dataType: "json", type: "GET", data: data, success: function (data, result) {
            if (data.data) {
                $.each(data.data, function (fKey, fVal) {
                    if ($("#" + fKey).length > 0) {
                        if ($('#' + fKey).is(':checkbox')) {
                            // handle checkbox value
                            $("#" + fKey).prop("checked", fVal);

                        } else if ($('#' + fKey).is('select')) {
                            // handle select box value
                            $('#' + fKey).find('option').each(function () {
                                var option = $(this);

                                // Step 4: Check if the option text matches the desired text
                                if (option.text() === fVal) {
                                    // Select the option
                                    option.prop('selected', true);
                                } else {
                                    // Unselect other options
                                    option.prop('selected', false);
                                }
                            });
                        } else {
                            $("#" + fKey).val(fVal);
                        }
                        // Trigger the change event to update Select2 UI
                        $('#' + fKey).trigger('change');
                    }
                });
                qrDisplayAlert("Default settings applied", "success");

            } else {
                var errMsg = "Something went wrong. Please try again later";
                if (data['error']) {
                    errMsg = data['error'];
                }
                qrDisplayAlert(errMsg, "error");
            }
        }, error: function (xhr, status) {
            var errMsg = "Opps! there was an error while applying default settings. Please try again later";
            qrDisplayAlert(errMsg, "error");
        }
    });
    qrHideLoader();
}

$(document).on('click', '#cancelAddPaymentMethod', function (e) {
    e.preventDefault();
    $('#new-payment-method-row').hide();
    $('#forte-customer-payment-type').val('').trigger('change');
    $('#addPaymentMethodForm').remove();
});

$(document).on('click', '#addPaymentMethod', function (e) {
    e.preventDefault();
    $('#new-payment-method-row').show();
    return false;
});

$(document).on('change', '#forte-customer-payment-type', function (e) {
    e.preventDefault();
    var url = "functions/qr_billing_functions.php";
    var lid = $(this).val();
    $.ajax({
        type: "POST", url: url, data: "get-payment-form=" + lid, success: function (data) {
            if (data && data.status === "Got Data") {
                var QRId = $('#QRId').val();
                var cust_token = $('#custoken').val();
                var pt = $('#forte-customer-payment-type').val();
                var html = "<form class='form-horizontal' id='addPaymentMethodForm' action='functions/new-functions.php' method='post' enctype='multipart/form-data' role='form'><input type='hidden' name='pf-QRId' value='" + QRId + "' /><input type='hidden' name='cust_token' value='" + cust_token + "' /><input type='hidden' name='pf-forte-customer-payment-type' value='" + pt + "' />" + data.data + "<div class='row mt-2 mb-2'><div class='btn-group'><button class='btn btn-primary' id='addPaymentMethodButton'>Add Payment Method</button><button class='btn btn-danger' id='cancelAddPaymentMethod'>Cancel</button></div></div>";
                notE = "<p>Please Note: Adding a new payment method will update any existing recurring payments to use this new payment method.</p>";
                $('#payment-method-div').html(notE + html);
                $('#payment-method-div').show();
                $('#payment-method-div select').select2();
            } else if (data && data.status !== "Got Data") {
            } else {

            }
        }
    });
    return false;
});

$(document).on('click', '.delPaymentMethod', function (event) {
    event.preventDefault();
    $('.delPaymentMethod').attr('disabled', true);
    val = $(this).attr('data-value');
    def = $(this).data('default');
    if (def == 'true' || def == true) {
        $('.delPaymentMethod').attr('disabled', false);
        Swal.fire({
            title: 'Wait!',
            html: '<p>You cannot delete this payment method without first adding another payment method.</p>',
            icon: 'error',
            confirmButtonText: 'Ok!'
        });
    } else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger',
            }, buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "This is not recoverable, and the entry will be permanently deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                qrShowLoader();
                $.ajax({
                    url: 'functions/qr_billing_functions.php',
                    type: "POST",
                    data: 'delete-payment-method=' + val,
                    dataType: "json",
                    success: function (data) {
                        if (data && data.status === "Got Data") {
                            qrHideLoader();
                            displayAlert("Payment Method deleted.", "success");
                            if ($('#qr-billing-settings-href').length > 0) {
                                $('#qr-billing-settings-href').trigger('click');
                            } else {
                                $('#cd-billing-settings-href').trigger('click');
                            }
                        }
                        if (data && data.status !== "Got Data") {
                            qrHideLoader();
                            $('.delPaymentMethod').attr('disabled', false);
                            displayAlert("Whoops! There was a problem deleting that Payment Method. Please try again.", "error");
                        }
                    }
                })
            } else {
                qrHideLoader();
                $('.delPaymentMethod').attr('disabled', false);
                result.dismiss === Swal.DismissReason.cancel
            }
        })
    }
    return false;
});

$(document).on('submit', '#addPaymentMethodForm', function (e) {
    e.preventDefault();
    $('#addPaymentMethodButton').attr('disabled', true);
    qrShowLoader();
    var url = "functions/qr_billing_functions.php";
    $.ajax({
        type: "POST", url: url, data: $("#addPaymentMethodForm").serialize(), success: function (data) {
            qrHideLoader();
            if (data && data.status === "Got Data") {
                if (data.hasFailedTransactions) {
                    var failedTransactions = data.failedTransactions;
                    var failedTransactionsHtml = '<ul>';
                    failedTransactions.forEach(function (transaction) {
                        failedTransactionsHtml += '<li>Ticket: ' + transaction.Ticket + ', Amount: ' + transaction.Amount + ', Date: ' + transaction.Date + '</li>';
                    });
                    failedTransactionsHtml += '</ul>';

                    Swal.fire({
                        title: 'Failed Transactions Found',
                        html: 'The following failed transactions will be processed against the new payment method provided: ' + failedTransactionsHtml,
                        icon: 'info',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $.ajax({
                                type: "POST", url: url, data: {
                                    processFailedTransactions: true,
                                    failedTransactions: JSON.stringify(failedTransactions)
                                }, success: function (response) {
                                    Swal.fire({
                                        title: 'Wooohooo!',
                                        html: 'Payment method added successfully and failed transactions processed. Please wait while the billing tab is refreshed.',
                                        icon: 'success',
                                        confirmButtonText: 'Ok!'
                                    }).then(() => {
                                        if ($('#qr-billing-settings-href').length > 0) {
                                            $('#qr-billing-settings-href').trigger('click');
                                        } else {
                                            $('#cd-billing-settings-href').trigger('click');
                                        }
                                    });
                                }, error: function () {
                                    Swal.fire({
                                        title: 'Whoops!',
                                        html: 'Failed to process failed transactions. Please try again later.',
                                        icon: 'error',
                                        confirmButtonText: 'Ok!'
                                    });
                                }
                            });
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Wooohooo!',
                        html: 'Payment method added successfully. Please wait while the billing tab is refreshed.',
                        icon: 'success',
                        confirmButtonText: 'Ok!'
                    }).then(() => {
                        if ($('#qr-billing-settings-href').length > 0) {
                            $('#qr-billing-settings-href').trigger('click');
                        } else {
                            $('#cd-billing-settings-href').trigger('click');
                        }
                    });
                }
            } else {
                $('#addPaymentMethodButton').attr('disabled', false);
                Swal.fire({
                    title: 'Whoops!',
                    html: 'That did not work. Verify your information and try again.',
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                });
            }
        }, error: function () {
            qrHideLoader();
            $('#addPaymentMethodButton').attr('disabled', false);
            Swal.fire({
                title: 'Error',
                html: 'An error occurred while processing your request. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Ok!'
            });
        }
    });
    return false;
});

$(document).on('click', '.generateClientInvoice', function (e) {
    e.preventDefault();
    var inv = $(this).attr('data-value');
    var url = 'functions/qr_billing_functions.php';
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data: 'generateInvoice=true' + '&get-billing-info=' + inv,
        success: function (data) {
            if (data.invoice != '') {
                var url = 'functions/qr_billing_functions.php';
                var genInv = data.invoice;
                $.ajax({
                    type: "POST",
                    url: url,
                    processData: false,
                    data: 'viewClientInvoice=' + genInv,
                    success: function (data) {
                        if (data && data.status == 'Got Data') {
                            var title = "Client Invoice";
                            var myWindow = window.open("", title, "width=1080,height=1920");
                            myWindow.document.write(data.data);
                        } else {
                            displayAlert("Unable to get that Invoice. Please try again.", "warn");
                        }
                    }
                });
            } else {
                displayAlert("Unable to get that Invoice. Please try again.", "warn");
            }
        }
    });
});


$(document).on('click', '.viewInvoice', function (e) {
    e.preventDefault();
    var inv = $(this).attr('data-value');
    var url = 'functions/qr_billing_functions.php';
    $.ajax({
        type: "POST", url: url, processData: false, data: 'viewClientInvoice=' + inv, success: function (data) {
            if (data && data.status == 'Got Data') {
                var title = "Client Invoice";
                var myWindow = window.open("", title, "width=1080,height=1920");
                myWindow.document.write(data.data);
            } else {
                displayAlert("Unable to get that Invoice. Please try again.", "warn");
            }
        }
    });
});


$(document).on('click', '.trainingWebinar', function (e) {

    var training = $(this).attr('data-value');
    if ($('#description').length > 0) {
        $('#description').val(training);
    } else {
        $('#trainingModalForm').append('<input type="hidden" id="description" name="trainingDescription" value="' + training + '" />');
    }
    if ($('#meetingId').length > 0) {
        $('#meetingId').remove();
    }
    if ($('#specificDate').length > 0) {
        $('#specificDate').remove();
    }
    $('#trainingModal').modal('show');
});


$(document).on('click', '#cancelSubAgencyUpdate', function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        html: 'Any changes you have made will be lost.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $('#updSubQRAgencyInfo').remove();
            $('#sub-agency-editor-row').hide();
            $('#qr-enterprise-manager-row').show();
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
    })
    return false;
});

$(document).on('submit', '#trainingModalForm', function (e) {
    e.preventDefault();
    var url = "create-invite.php";
    $.ajax({
        type: "POST", url: url, data: $("#trainingModalForm").serialize(), success: function (data, result) {
            if (data && data.status === "Got Data") {
                Swal.fire({
                    icon: 'success',
                    title: 'Thank You!',
                    html: '<p>Please check your email for the invite in the next few minutes! If you do not receive it, please contact <a href="mailto:support@quoterush.com">Support</a> to get an invite.</p>'
                })
                $('#traineeName').val('');
                $('#traineeEmail').val('');
                if ($('#description').length > 0) {
                    $('#description').remove();
                }
                if ($('#meetingId').length > 0) {
                    $('#meetingId').remove();
                }
                if ($('#specificDate').length > 0) {
                    $('#specificDate').remove();
                }
                $('#trainingModal').modal('hide');

            }
            if (data && data.status !== "Got Data") {
                Swal.fire({
                    icon: 'error',
                    title: 'Well this is awkward.....',
                    text: 'Something went wrong trying to submit your request. Please make sure you have filled out all of the contact details and try again.'
                })
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

function copyUpdateLinkToClipboard(elementId) {
    var copyText = document.getElementById(elementId).value;

    // Create a temporary textarea
    var textarea = document.createElement("textarea");
    textarea.value = copyText;
    document.body.appendChild(textarea);

    // Focus and select the text
    textarea.focus();
    textarea.select();

    try {
        // Copy the text
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);

        // Alert the copied text
        Swal.fire({
            title: 'Copied!', text: copyText + ' has been copied to clipboard.', icon: 'success', timer: 1500
        });
    } catch (err) {
        console.error('Error copying text: ', err);
    }

    // Remove the temporary textarea
    document.body.removeChild(textarea);
}

$(document).on('click', '.sendQRInfoUpdateRequest', function (event) {
    event.preventDefault();
    var hasEmail = false;
    if ($('#d133260f-46f8-11ea-a01e-000d3a7ae61a').length > 0) {
        if ($('#d133260f-46f8-11ea-a01e-000d3a7ae61a').val() != '') {
            hasEmail = true;
        } else if ($('#332050bd-651b-11ed-af25-000d3a7ae61a').val() != '') {
            hasEmail = true;
        }
    }
    if ($('.overviewSendEmail').length > 0) {
        if ($('.overviewSendEmail').data('value') != '') {
            hasEmail = true;
        }
    }
    if (hasEmail) {
        var val = $(this).attr('data-value');
        var url = 'functions/qr_webform_functions.php';
        $.ajax({
            type: "POST", url: url, data: 'action=getWebFORMUpdateList', success: function (data, result) {
                if (data && data.status === "Got Data") {
                    var forms = data.data;
                    var selectHTML = '<label class="swal2-label">Please select the WebFORM to Use</label><select id="updateWebFORM" class="swal2-input"><option value="">Please Select a WebFORM</option>';
                    forms.forEach(function (item) {
                        var value = item[0]; // First value of each sub-array
                        var text = item[1] + " - " + item[2]; // Second and third values
                        selectHTML += '<option value="' + value + '">' + text + '</option>';
                    });
                    selectHTML += '</select>';
                    Swal.fire({
                        title: 'Additional information needed.',
                        html: selectHTML,
                        icon: 'info',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancel',
                        confirmButtonText: 'Generate Link',
                        didOpen: () => {
                            $('#updateWebFORM').select2({
                                theme: "bootstrap-5", width: '100%', dropdownParent: $(".swal2-container")
                            });
                        },
                        preConfirm: () => {
                            return document.getElementById('updateWebFORM').value;
                        }
                    }).then((result) => {
                        if (result.value) {
                            var form_data = new FormData();
                            form_data.append("action", "generateQRInfoUpdateRequest");
                            form_data.append("qrUpdateWebformId", result.value);
                            form_data.append("qrUpdateWebformLeadId", val);
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: form_data,
                                processData: false,
                                contentType: false,
                                success: function (data, result) {
                                    if (data && data.status === "Got Data") {
                                        var longUrl = data.longUrl;
                                        var shortUrl = data.shortUrl;
                                        Swal.fire({
                                            title: 'WebFORM Update Request URLs', html: `
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div class="row mb-2 mt-2 d-flex flex-wrap">
                                                    <div class="col-md-6 col-sm-12 col-xs-12">    
                                                        <label class="control-label" for="longUrl">Long URL:</label>
                                                        <input type="text" id="longUrl" class="form-control" value="${longUrl}" readonly>
                                                        <button class="btn btn-primary btn-sm" onClick="copyUpdateLinkToClipboard('longUrl')" id="copyLongUrl" ><i class="fa-regular fa-copy"></i></button>
                                                    </div>
                                                    <div class="col-md-6 col-sm-12 col-xs-12">
                                                        <label class="control-label" for="shortUrl">Short URL:</label>
                                                        <input type="text" id="shortUrl" class="form-control" value="${shortUrl}" readonly>
                                                        <button class="btn btn-primary btn-sm" id="copyShortUrl" onClick="copyUpdateLinkToClipboard('shortUrl')" class="btn btn-primary btn-sm"><i class="fa-regular fa-copy"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        `, showConfirmButton: false
                                        });
                                    }
                                    if (data && data.status !== "Got Data") {
                                        Swal.fire({
                                            title: 'Whoops!',
                                            text: 'We were unable to generate a link! Please try again, or contact support if the problem persists.',
                                            icon: 'error',
                                            confirmButtonText: 'Try again!'
                                        });
                                    }
                                }
                            });

                        } else if (result.dismiss === Swal.DismissReason.cancel) {


                        }


                    })
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire({
                        title: 'Whoops!',
                        text: 'Please make sure you have a WebFORM created prior to using this feature. Please try again, or contact support if the problem persists.',
                        icon: 'error',
                        confirmButtonText: 'Try again!'
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: 'Whoops!',
            text: 'To create a link for this Lead, either the Applicant or Co-Applicant must have a saved Email Address. That E-Mail address will be used to allow them to open the WebFORM.',
            icon: 'error',
            confirmButtonText: 'Try again!'
        });
    }
});

function getQRReminderCounters() {
    $.ajax({
        type: "POST", url: url, data: "getQRReminderCounters=true", success: function (data, result) {
            qrHideLoader();
            if (data && data.status === "Got Data") {
                Object.keys(data).forEach(function (key) {
                    if (key.startsWith("num")) {
                        var classSelector = '.' + key + 'Badge';
                        if ($(classSelector).length > 0) {
                            $(classSelector).html(data[key]);
                        }
                    }
                });
            } else {
            }
        }, error: function (xhr, textStatus, errorThrown) {
            qrHideLoader();
        }
    });
}


function getQRRemindersTables(requester) {
    if (requester == 'Pending' || requester == 'Overdue' || requester == 'Complete' || requester == 'Total') {
        if (requester == 'Pending') {
            tableId = 'pending-reminders';
            rStatus = 'Pending';
        }
        if (requester == 'Overdue') {
            tableId = 'overdue-reminders';
            rStatus = 'Overdue';
        }
        if (requester == 'Complete') {
            tableId = 'complete-reminders';
            rStatus = 'Complete';
        }
        if (requester == 'Total') {
            tableId = 'total-reminders';
            rStatus = 'Total';
        }
        if (requester == 'Pending' || requester == 'Overdue') {
            $('#' + tableId + '-table').DataTable({
                "destroy": true, "processing": true, "serverSide": true, "ajax": {
                    "url": "qr-reminder-grid-data.php", "type": "GET", "data": {
                        "ReminderStatus": rStatus
                    }
                }, 'order': [[0, 'asc']], columnDefs: [{
                    'type': 'date', 'targets': [0]
                }]
            });
        } else {
            $('#' + tableId + '-table').DataTable({
                "destroy": true, "processing": true, "serverSide": true, "ajax": {
                    "url": "qr-reminder-grid-data.php", "type": "GET", "data": {
                        "ReminderStatus": rStatus
                    }
                }, 'order': [[0, 'desc']], columnDefs: [{
                    'type': 'date', 'targets': [0]
                }]
            });
        }
    }
}


$(document).on('blur', '.QRSMSPhone', function (event) {
    var phone = $(this).val();
    var ele = $(this);
    var validateFor = '';
    var url = "functions/qr_functions.php";
    $.ajax({
        type: "POST", url: url, data: 'validate-phone=' + phone, success: function (data, result) {
            if (data && data.status === "Got Data") {
                ele.val(data.formatted);
            }

            if (data && data.status !== "Got Data") {
                Swal.fire({
                    icon: 'info',
                    title: 'Quick Note!',
                    text: 'The number you entered is not a mobile number and cannot be used for SMS which is what that field was intended for. Removing this phone number as it is designated for SMS enabled phone numbers only.'
                });
                ele.val('');
            }
        }
    });
});

$(document).on('click', '.reminderTab', function (event) {
    var rStatus = $(this).attr('data-value');
    getQRRemindersTables(rStatus);
});

$(document).on('click', '#misInternational', function () {
    if ($(this).is(':checked')) {
        $('#18005ee9-46f9-11ea-a01e-000d3a7ae61a').select2('destroy');
        $('#18005ee9-46f9-11ea-a01e-000d3a7ae61a-div').hide();
        $('#1c8baa79-46f9-11ea-a01e-000d3a7ae61a-div').hide();
        $('#mProvince-div').show();
        $('#mCountry-div').show();
    } else {
        $('#mProvince-div').hide();
        $('#mCountry-div').hide();
        $('#18005ee9-46f9-11ea-a01e-000d3a7ae61a-div').show();
        $('#18005ee9-46f9-11ea-a01e-000d3a7ae61a').select2();
        $('#1c8baa79-46f9-11ea-a01e-000d3a7ae61a-div').show();
    }
});

function updateRequiredLeadFields() {
    var ftype = $('#FormType').val();
    if (ftype === '') {
        return false;
    }
    if (qrRequiredFields === null) {
        var url = "functions/qr_functions.php"; // the script where you handle the form input.
        $.ajax({
            type: "POST", url: url, dataType: 'JSON', data: "getRequiredFieldsByFormType=" + ftype, // serializes the form's elements.
            success: function (data, result) {
                if (data.status === "Got Data") {
                    qrRequiredFields = data.reqFields;
                }
            }, error: function (xhr, status, error) {
            }, complete: function () {
            }
        });
    }
    if (qrRequiredFields !== null) {
        var form = $("#updLead");
        var missingTabs = [];
        var missingTopLevelTabs = [];
        var missingTopLevelTabCounts = [];
        var missingTabCounts = [];
        var requiredFields = qrRequiredFields;
        $('#updLead .missingInfo').removeClass('missingInfo');
        $('#updLead .is-valid').removeClass('is-valid');
        requiredFields.forEach(function (fieldId) {
            var field = $("#" + fieldId);
            if (field.length && !field.val()) {
                var closestTabPane = field.closest(".tab-pane");
                var fieldTabId = closestTabPane.attr("aria-labelledby");
                var parentTabPaneId = closestTabPane.parent().closest(".tab-pane").attr("id");
                var parentTabPane = $('a[aria-controls="' + parentTabPaneId + '"]').attr("id");
                if (!missingTopLevelTabCounts[parentTabPane]) {
                    missingTopLevelTabCounts[parentTabPane] = 1;
                } else {
                    missingTopLevelTabCounts[parentTabPane]++;
                }
                if (!missingTabCounts[fieldTabId]) {
                    missingTabCounts[fieldTabId] = 1;
                } else {
                    missingTabCounts[fieldTabId]++;
                }
                if (fieldTabId && !missingTabs.includes(fieldTabId)) {
                    missingTabs.push(fieldTabId);
                }
                if (parentTabPane && !missingTopLevelTabs.includes(parentTabPane)) {
                    missingTopLevelTabs.push(parentTabPane);
                }
                var $label = findLabel(field);
                $label.addClass('missingInfo');
                field.addClass('missingInfo');
                field.closest('.form-group, .mb-3').addClass('missingInfo');
            }
        });

        let totalCount;
        missingTabs.forEach(function (tabId) {
            totalCount = $('#' + tabId).find('.missingInfoCount').length;
            $('#' + tabId).addClass('missingInfo');
            if (missingTabCounts[tabId]) {
            }

        });

        missingTopLevelTabs.forEach(function (tabsId) {
            $('#' + tabsId).closest('.nav-item').addClass('missingInfo');
            if (missingTopLevelTabCounts[tabsId]) {
            }
        });
    }
}

function swapValues(id1, id2, isSelect2) {
    const first_element = $(`#${id1}`);
    const second_element = $(`#${id2}`);

    if (isSelect2) {
        const first_selected_value = first_element.select2('data')[0].text;
        const second_selected_value = second_element.select2('data')[0].text;

        first_element.select2('destroy');
        first_element.find('option').attr('selected', false);
        first_element.find('option').filter(function () {
            return $(this).text() === second_selected_value;
        }).prop('selected', true);
        first_element.select2();

        second_element.select2('destroy');
        second_element.find('option').attr('selected', false);
        second_element.find('option').filter(function () {
            return $(this).text() === first_selected_value;
        }).prop('selected', true);
        second_element.select2();
        return;
    }

    const temp = first_element.val();
    first_element.val(second_element.val());
    second_element.val(temp);
}

$(document).on('click', '.swapApplicantsButton', async function () {
    const { value: proceed } = await Swal.fire({
        title: 'Before swapping applicant and co-applicant information, please be aware of the following...',
        html: '1.) This will change how the lead is saved. Please keep in mind any changes to names, phone numbers, and email when repoening in the future. <br> 2.) Credit Permission and Assumed Credit Score will need to be reanswered.',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Proceed',
        denyButtonText: 'Nevermind',
    });

    if (!proceed) return;

    // Reset Credit Permission
    const credit_permission_element = $('#816b8c0a-46df-11ea-ac96-000d3a7ae61a');
    credit_permission_element.select2('destroy');
    credit_permission_element.find('option').prop('selected', false);
    credit_permission_element.find('option[value=""]').prop('selected', true);
    credit_permission_element.select2();

    // Reset assumed credit score
    const assumed_credit_score_element = $('#89120fcf-46df-11ea-ac96-000d3a7ae61a');
    assumed_credit_score_element.select2('destroy');
    assumed_credit_score_element.find('option').prop('selected', false);
    assumed_credit_score_element.find('option[value=""]').prop('selected', true);
    assumed_credit_score_element.select2();

    // first name swap:
    swapValues('80d2d433-46fb-11ea-a01e-000d3a7ae61a', '5171ff30-46df-11ea-ac96-000d3a7ae61a', false);

    // middle name swap:
    swapValues('545de4fa-46df-11ea-ac96-000d3a7ae61a', '89fbef52-46fb-11ea-a01e-000d3a7ae61a', false);

    // last name swap:
    swapValues('5951a671-46df-11ea-ac96-000d3a7ae61a', 'bbb6d2f1-46fb-11ea-a01e-000d3a7ae61a', false);

    // phone
    swapValues('ad280a51-46f8-11ea-a01e-000d3a7ae61a', '3d08777d-651b-11ed-af25-000d3a7ae61a', false);

    // email
    swapValues('d133260f-46f8-11ea-a01e-000d3a7ae61a', '332050bd-651b-11ed-af25-000d3a7ae61a', false);

    // Prefix
    swapValues('4f128e56-46df-11ea-ac96-000d3a7ae61a', '59564e8d-46fa-11ea-a01e-000d3a7ae61a', true);

    // suffix
    swapValues('5ea31c18-46df-11ea-ac96-000d3a7ae61a', '28b42dcf-46fc-11ea-a01e-000d3a7ae61a', true);

    // gender
    swapValues('6a2a1c50-46df-11ea-ac96-000d3a7ae61a', '6057b45f-46fc-11ea-a01e-000d3a7ae61a', true);

    // Marital status
    swapValues('6f38cd5e-46df-11ea-ac96-000d3a7ae61a', '687420ee-46fc-11ea-a01e-000d3a7ae61a', true);

    // Industry
    swapValues('75959cb3-46df-11ea-ac96-000d3a7ae61a', '7441fb75-46fc-11ea-a01e-000d3a7ae61a', true);

    // Occupation
    swapValues('7aa383d6-46df-11ea-ac96-000d3a7ae61a', '793e18f4-46fc-11ea-a01e-000d3a7ae61a', true);

    // Relationship to Insured - Needs custom logic.
    const relationship_to_insured_element = $('#4b08ecf6-46fc-11ea-a01e-000d3a7ae61a');
    const relationship_to_insured = relationship_to_insured_element.select2('data')[0].text;
    relationship_to_insured_element.select2('destroy');
    relationship_to_insured_element.find('option').prop('selected', false);

    let relationship_to_insured_new;
    switch (relationship_to_insured) {
        case "Parent":
            relationship_to_insured_new = "Child";
            break;
        case "Child":
            relationship_to_insured_new = "Parent";
            break;
        case "Grandparent":
            relationship_to_insured_new = "Grandchild";
            break;
        case "Grandchild":
            relationship_to_insured_new = "Grandparent";
            break;
        default:
            //Roommate of a roommate is a roommate, same for spouse and other relative.
            relationship_to_insured_new = relationship_to_insured;
    }

    relationship_to_insured_element.find('option').filter(function () {
        return $(this).text() === relationship_to_insured_new;
    }).prop('selected', true);
    relationship_to_insured_element.select2();

    // Military discount
    const applicant_military_discount = $('518a837d-1f9e-4761-ae8a-2ae90b9b50ce').prop('checked');
    const coapplicant_military_discount = $('92e17c19-057d-47a6-8f7c-c51d51759bb8').prop('checked');

    $('518a837d-1f9e-4761-ae8a-2ae90b9b50ce').prop('checked', applicant_military_discount);
    $('92e17c19-057d-47a6-8f7c-c51d51759bb8').prop('checked', coapplicant_military_discount);

    // Date of Birth
    swapValues('658ad114-46df-11ea-ac96-000d3a7ae61a', '53a73023-46fc-11ea-a01e-000d3a7ae61a', false);
});

