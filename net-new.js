function HideLoader() {
    $('.loader').hide();
}

function ShowLoader(message = null) {
    $('.loader').show();
    if (message !== null) {
        $('#loader-message').html(message);
    } else {
        $('#loader-message').html('');
    }
    setTimeout(HideLoader(), 60000);
}

function HideSearchLoader() {
    $('.loading-search-overlay').hide();
}

function ShowSearchLoader() {
    $('.loading-search-overlay').show();

}

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-js';

function loadGoogleMapsApi(callback) {
    if (window.google && google.maps && google.maps.places) {
        callback?.();
        return;
    }

    const existing = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
    if (existing) {
        existing.addEventListener('load', () => callback?.(), {once: true});
        return;
    }

    // Start loading.
    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIbmVPVO_NHe0TuRbcn4dw74B4j4L5cYY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => callback?.();
    script.onerror = () => console.error('Google Maps failed to load.');
    document.head.appendChild(script);
}


function initializeAutocomplete(formId, elementId) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`Form with ID "${formId}" not found.`);
        return;
    }

    const addressInput = document.getElementById(elementId);
    if (!addressInput || !form.contains(addressInput)) {
        console.error(`Element with ID "${elementId}" not found inside form "${formId}".`);
        return;
    }

    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
        types: ['address'], componentRestrictions: {country: 'us'},
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const components = place.address_components || [];

        let addressData = {
            AddressLine1: '', AddressLine2: '', City: '', State: '', Zip: '',
        };

        components.forEach((component) => {
            const types = component.types;
            if (types.includes('street_number')) {
                addressData.AddressLine1 += component.long_name + ' ';
            } else if (types.includes('route')) {
                addressData.AddressLine1 += component.long_name;
            } else if (types.includes('locality')) {
                addressData.City = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
                addressData.State = component.short_name;
            } else if (types.includes('postal_code')) {
                addressData.Zip = component.long_name;
            }
        });

        // Use scoped selectors to update only fields inside the target form
        const setVal = (id, val) => {
            const el = form.querySelector(`#${id}`);
            if (el) $(el).val(val).trigger('change');
        };

        if (elementId === 'addr') {
            setVal('addr', addressData.AddressLine1);
            setVal('city', addressData.City);
            setVal('state', addressData.State);
            setVal('zip', addressData.Zip);
        } else if (elementId === 'mailing_addr') {
            setVal('mailing_addr', addressData.AddressLine1);
            setVal('mailing_city', addressData.City);
            setVal('mailing_state', addressData.State);
            setVal('mailing_zip', addressData.Zip);
        } else if (elementId === 'newLeadAddress') {
            setVal('newLeadAddress', addressData.AddressLine1);
            setVal('newLeadCity', addressData.City);
            setVal('newLeadState', addressData.State);
            setVal('newLeadZip', addressData.Zip);
        } else if (elementId === 'newLeadPreviousAddress') {
            setVal('newLeadPreviousAddress', addressData.AddressLine1);
            setVal('newLeadPreviousCity', addressData.City);
            setVal('newLeadPreviousState', addressData.State);
            setVal('newLeadPreviousZip', addressData.Zip);
        } else if (elementId === '6605ccec-d22a-11ec-a789-000d3a7ae61a') {
            setVal('6605ccec-d22a-11ec-a789-000d3a7ae61a', addressData.AddressLine1);
            setVal('6605d197-d22a-11ec-a789-000d3a7ae61a', addressData.City);
            setVal('6605d5c0-d22a-11ec-a789-000d3a7ae61a', addressData.State);
            setVal('6605d6ad-d22a-11ec-a789-000d3a7ae61a', addressData.Zip);
        } else if (elementId === 'f3e38f9a-46f8-11ea-a01e-000d3a7ae61a') {
            setVal('f3e38f9a-46f8-11ea-a01e-000d3a7ae61a', addressData.AddressLine1);
            setVal('08e125a4-46f9-11ea-a01e-000d3a7ae61a', addressData.City);
            setVal('18005ee9-46f9-11ea-a01e-000d3a7ae61a', addressData.State);
            setVal('02b12493-46f9-11ea-a01e-000d3a7ae61a', addressData.Zip);
        } else if (elementId === '911de265-4758-11ea-a01e-000d3a7ae61a') {
            setVal('911de265-4758-11ea-a01e-000d3a7ae61a', addressData.AddressLine1);
            setVal('a37eb604-4758-11ea-a01e-000d3a7ae61a', addressData.City);
            setVal('b219896b-4758-11ea-a01e-000d3a7ae61a', addressData.State);
            setVal('9f99f8b8-4758-11ea-a01e-000d3a7ae61a', addressData.Zip);
        }
    });
}


function emptyOffCanvasPanel() {
    const modal_qtpanel = $('#qtpanel');
    modal_qtpanel.find('.offcanvas-header').removeClass('d-flex flex-wrap');
    modal_qtpanel.find('.offcanvas-header').html('<h5 id="qtpanelLabel"></h5><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>');
    modal_qtpanel.find('.offcanvas-body').html('');
}

function emptyAndCloseOffCanvasPanel() {
    const modal_qtpanel = $('#qtpanel');
    modal_qtpanel.find('.offcanvas-header').removeClass('d-flex flex-wrap');
    modal_qtpanel.find('.offcanvas-header').html('<h5 id="qtpanelLabel"></h5><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>');
    modal_qtpanel.find('.offcanvas-body').html('');
    modal_qtpanel.offcanvas('hide');
    return true;
}

function launchOffCanvasPanel(data, header) {
    emptyOffCanvasPanel();
    const modal_qtpanel = $('#qtpanel');
    modal_qtpanel.find('.offcanvas-header>h5').html(header);
    modal_qtpanel.find('.offcanvas-body').html(data);
    modal_qtpanel.offcanvas('show');
    $('select').each(function () {
        if (!$(this).hasClass('choiceSelect')) {
            $(this).select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
            });
        }
    })
}


function emptyCenteredModal() {
    $('#centeredModalTitle').html('');
    $('#centeredModalBody').html('');
}

function emptyFullScreenModal() {
    $('#fullscreenModalTitle').html('');
    $('#fullscreenModalBody').html('');
}

function emptyAndCloseCenteredModal() {
    $('#centeredModalTitle').html('');
    $('#centeredModalBody').html('');
    $('#centeredModal').modal('hide');
}

function launchCenteredModal(data, header, size) {
    emptyCenteredModal();
    if (size) { // Check if size parameter is provided
        if ($('#centeredModal .modal-dialog').hasClass(size)) {
        } else {
            $('#centeredModal .modal-dialog').addClass(size);
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


function launchFullScreenModal(data, header) {
    emptyFullScreenModal();
    $('#fullscreenModalTitle').html(header);
    $('#fullscreenModalBody').html(data);
    $('#fullscreenModal').modal('show');
}

function checkEmailCreds(prov, uname, pwd) {
    return new Promise(function (resolve, reject) {
        if (prov !== '' && uname !== '' && pwd !== '') {
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'checkEmailCreds=true&prov=' + encodeURIComponent(prov) + '&emUName=' + encodeURIComponent(uname) + '&emPwd=' + encodeURIComponent(pwd),
                success: function (data) {
                    if (data?.data === "Got Data") {
                        resolve(data?.data);
                    } else {
                        reject(data?.data);
                    }
                }
            });
        } else {
            reject('Please set the Provider, Email and Password to set default email credentials');
        }
    });
}

function quotesdetails(quote1, client, lob, numOpt) {
    const isHome = String(lob || '').toLowerCase() === 'home';
    if (!isHome) {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(function (L) {
            $('#current_coverage' + L).closest('tr').remove();
        });
    }

    let coverageA = 0.0, coverageB = 0.0, coverageC = 0.0, coverageD = 0.0, coverageE = 0.0, coverageF = 0.0,
        Premium = 0.0, desc = "";

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        data: 'get-lead-aqr-info=' + client,
        type: 'POST',
        async: true,
        beforeSend: function () {
            ShowLoader();
        },
        dataType: "json",
        success: function (data) {
            if (Array.isArray(data) && data.length > 0 && data[0]) {
                if (data[0].Premium && data[0].Premium !== "Not Found") {
                    Premium = data[0].Premium;
                }
                if (isHome) {
                    if (data[0].CoverageA && data[0].CoverageA !== "Not Found") coverageA = data[0].CoverageA;
                    if (data[0].CoverageB && data[0].CoverageB !== "Not Found") coverageB = data[0].CoverageB;
                    if (data[0].CoverageC && data[0].CoverageC !== "Not Found") coverageC = data[0].CoverageC;
                    if (data[0].CoverageD && data[0].CoverageD !== "Not Found") coverageD = data[0].CoverageD;
                    if (data[0].CoverageE && data[0].CoverageE !== "Not Found") coverageE = data[0].CoverageE;
                    if (data[0].CoverageF && data[0].CoverageF !== "Not Found") coverageF = data[0].CoverageF;
                }
                if (data[0].Description && data[0].Description !== "Not Found") {
                    desc = data[0].Description;
                }
                $(quote1 + '_carrier').html(data[0].Site || '');
                $(quote1 + '_description').html(desc);
                reShopProposal(lob, data[0].QTId, numOpt);
                getPercentageChange(Premium, "premium", quote1);
                if (isHome) {
                    getPercentageChange(coverageA, "coverageA", quote1);
                    getPercentageChange(coverageB, "coverageB", quote1);
                    getPercentageChange(coverageC, "coverageC", quote1);
                    getPercentageChange(coverageD, "coverageD", quote1);
                    getPercentageChange(coverageE, "coverageE", quote1);
                    getPercentageChange(coverageF, "coverageF", quote1);
                }
            } else {
                displayAlert("Whoops! There was a problem pulling the quotes for this lead. Please contact support if this persists.", "error");
                return false;
            }
        },
        complete: function () {
            HideLoader();
        },
        error: function () {
            displayAlert("Whoops! There was a problem pulling the quotes for this lead. Please contact support if this persists.", "error");
        }
    });
}

function getPercentageChange(newNumber, search, quote1) {
    const destSel = `${quote1}_${search}`;

    const parseMoney = (v) => {
        const n = parseFloat(String(v).replace(/[$,]/g, '').replace(/,/g, '').trim());
        return Number.isFinite(n) ? n : NaN;
    };

    const oldNumber = parseMoney($('#current_' + search).html());
    const newNum = parseMoney(newNumber);

    if (!Number.isFinite(oldNumber) || !Number.isFinite(newNum)) {
        $(destSel).html('�'); // couldn't parse
        return;
    }
    const formattedNew = '$' + newNum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (oldNumber === 0) {
        $(destSel).html(`${formattedNew}<span class="positive-pre"> (Unknown) </span>`);
        return;
    }

    const pct = ((newNum - oldNumber) / oldNumber) * 100;
    const change = Math.round(pct);

    if (change < 0) {
        $(destSel).html(`${formattedNew}<span class="negative-pre"> (${change}%) </span>`);
    } else if (change > 0) {
        $(destSel).html(`${formattedNew}<span class="positive-pre"> (+${change}%) </span>`);
    } else {
        $(destSel).html(`${formattedNew}<span class="neutral-pre"> (0%) </span>`);
    }
}


function generateHeader(data) {
    const spp = 0.0;
    const fpp = 0.0;
    if (data.CurrentYear.PolicyInfo.PolicyNumber !== 'Not found') {
        var cPn = data.CurrentYear.PolicyInfo.PolicyNumber;
        var cps = data.CurrentYear.PolicyInfo.policy_status;
        var cpp = data.CurrentYear.PolicyInfo.base_premium;
        var cexp = data.CurrentYear.PolicyInfo.exp_date;
        var ccarrier = data.CurrentYear.PolicyInfo.carrier;
    } else {
        var cPn = '';
        var cps = '';
        var cpp = 0.0;
        var cexp = '';
        var ccarrier = '';
    }
    let option = '<option value="empty" disabled selected>Select Quote</option>';
    $.each(data.Sites_names, function (key, val) {
        option += '<option value=' + key + '>' + val + '</option>';
    });
    let PreviousYearPolicy = '<option value="empty" disabled selected>Select Policy Number</option>';
    $.each(data.PreviousYear, function (key, val) {
        PreviousYearPolicy += '<option value=' + key + '>' + val + '</option>';
    });
    let header = '<tr><th></th><th scope="col" id="second_year_header"><h5>Policy No</h5><div class="form-group custom-reshop">';
    header += '<select class="form-select" id="second_year_policy" >' + PreviousYearPolicy + '</select></div><h5><span id="second_year_exp_date">Expiry Date:</span><br><span id="second_year_status">Status:</span></h5></th>';
    header += '<th scope="col" id="first_year_header"><h5>Policy No</h5><div class="form-group custom-reshop">';
    header += '<select class="form-select" id="first_year_policy">' + PreviousYearPolicy + '</select></div><h5><span id="first_year_exp_date">Exp. Date:</span><br><span id="first_year_status">Status:</span></h5></th>';
    header += '<th scope="col"><h5 class="h5 m-0"><span>Current Policy No: ' + cPn + '</span><br><span>Exp. Date: ' + cexp + '</span><br><span>Status: ' + cps + '</span></h5></th>';
    header += '<th scope="col" id="quote1_options"><h5 class="h5">Quote 1</h5><div class="form-group custom-reshop">';
    header += '<select class="form-select reshopQuoteSelector" id="quote1">' + option + '</select></div></th>';
    header += '<th scope="col" id="quote2_options"><h5 class="h5">Quote 2</h5><div class="form-group custom-reshop">';
    header += '<select class="form-select reshopQuoteSelector" id="quote2">' + option + '</select></div></th>';
    header += '<th scope="col" id="quote3_options"><h5 class="h5">Quote 3</h5> <div class="form-group custom-reshop">';
    header += '<select class="form-select reshopQuoteSelector" id="quote3">' + option + '</select></div></th></tr>';
    $('.reshop-data >thead').append(header);
    let body = '';
    body += '<tr><th scope="row"><h5 class="h5 m-0">Carrier</h5></th><td id="second_carrier"></td><td id="first_carrier"></td><td>' + ccarrier + '</td><td id="quote1_carrier"></td><td id="quote2_carrier"></td><td id="quote3_carrier"></td>';
    body += '</tr>';
    body += '<tr><th scope="row"><h5 class="h5 m-0">Premium</h5></th><td id="second_premium">$' + spp + '</td><td id="first_premium">$' + fpp + '</td><td id="current_premium">$' + cpp + '</td><td id="quote1_premium"></td><td id="quote2_premium"></td><td id="quote3_premium"></td>';
    body += '</tr>';
    $('.reshop-data >tbody').append(body);
}

function generateCoverage(data, lob) {
    const isHome = String(lob || '').toLowerCase() === 'home';
    const $tbody = $('.reshop-data >tbody');

    // Remove any existing Coverage A�F rows and Description row to prevent duplicates
    $tbody
        .find('#current_coverageA,#current_coverageB,#current_coverageC,#current_coverageD,#current_coverageE,#current_coverageF,#current_description')
        .closest('tr')
        .remove();

    let body = '';

    if (isHome) {
        let ccova = 0.0, ccovb = 0.0, ccovc = 0.0, ccovd = 0.0, ccove = 0.0, ccovf = 0.0;

        $.each(data.CurrentYear.CoverageInfo, function (key, val) {
            if (val === '' || val == null) return;
            if (key === "CoverageA") ccova = val;
            if (key === "CoverageB") ccovb = val;
            if (key === "CoverageC") ccovc = val;
            if (key === "CoverageD") ccovd = val;
            if (key === "CoverageE") ccove = val;
            if (key === "CoverageF") ccovf = val;
        });

        body += '<tr><th scope="row"><h5 class="h5 m-0">Coverage A</h5></th><td id="second_coverageA">$0.0</td><td id="first_coverageA">$0.0</td><td id="current_coverageA">$' + ccova + '</td><td id="quote1_coverageA">$0.0</td><td id="quote2_coverageA">$0.0</td><td id="quote3_coverageA">$0.0</td></tr>';
        body += '<tr><th scope="row"><h5 class="h5 m-0">Coverage B</h5></th><td id="second_coverageB">$0.0</td><td id="first_coverageB">$0.0</td><td id="current_coverageB">$' + ccovb + '</td><td id="quote1_coverageB">$0.0</td><td id="quote2_coverageB">$0.0</td><td id="quote3_coverageB">$0.0</td></tr>';
        body += '<tr><th scope="row"><h5 class="h5 m-0">Coverage C</h5></th><td id="second_coverageC">$0.0</td><td id="first_coverageC">$0.0</td><td id="current_coverageC">$' + ccovc + '</td><td id="quote1_coverageC">$0.0</td><td id="quote2_coverageC">$0.0</td><td id="quote3_coverageC">$0.0</td></tr>';
        body += '<tr><th scope="row"><h5 class="h5 m-0">Coverage D</h5></th><td id="second_coverageD">$0.0</td><td id="first_coverageD">$0.0</td><td id="current_coverageD">$' + ccovd + '</td><td id="quote1_coverageD">$0.0</td><td id="quote2_coverageD">$0.0</td><td id="quote3_coverageD">$0.0</td></tr>';
        body += '<tr><th scope="row"><h5 class="h5 m-0">Coverage E</h5></th><td id="second_coverageE">$0.0</td><td id="first_coverageE">$0.0</td><td id="current_coverageE">$' + ccove + '</td><td id="quote1_coverageE">$0.0</td><td id="quote2_coverageE">$0.0</td><td id="quote3_coverageE">$0.0</td></tr>';
        body += '<tr><th scope="row"><h5 class="h5 m-0">Coverage F</h5></th><td id="second_coverageF">$0.0</td><td id="first_coverageF">$0.0</td><td id="current_coverageF">$' + ccovf + '</td><td id="quote1_coverageF">$0.0</td><td id="quote2_coverageF">$0.0</td><td id="quote3_coverageF">$0.0</td></tr>';
    } else {
        // Not Home: ensure any previously-added A�F rows are gone (handled by the remove above)
        // No A�F rows will be appended.
    }

    // Always append Description row
    body += '<tr><th scope="row"><h5 class="h5 m-0">Description</h5></th><td id="second_description">$0.0</td><td id="first_description"></td><td id="current_description"></td><td id="quote1_description"></td><td id="quote2_description"></td><td id="quote3_description"></td></tr>';

    $tbody.append(body);
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

function showMFADesktopNotificationCD(siteName, lead) {
    let baseUrl = window.location.protocol + '//' + window.location.hostname;
    if (Notification.permission === "granted") {
        const notification = new Notification("MFA Request", {
            body: `You requested a quote from ${siteName} for Lead: ${lead}. Please switch to the QuoteRUSH Web tab and provide the MFA code.`,
            icon: `${baseUrl}/assets/images/qr-logo-light-sm.png` // Replace with your logo URL
        });
    } else {
    }
}

function showDesktopNotificationCD(title, msg) {
    // Check if permission is already granted
    let baseUrl = window.location.protocol + '//' + window.location.hostname;
    if (Notification.permission === "granted") {
        const notification = new Notification(title, {
            body: `${msg}`, icon: `${baseUrl}/assets/images/logo-sm.png` // Replace with your logo URL
        });
    } else {
    }
}

function showCarrierData(data) {

    const yesterday = data.Carrier_Info.yesterday;
    const last7day = data.Carrier_Info.last7day;
    const lastmonth = data.Carrier_Info.lastmonth;
    $('.reshop-stat-yesterday').html(yesterday);
    $('.reshop-stat-last7').html(last7day);
    $('.reshop-stat-month').html(lastmonth);
}

function getPolicyInfo() {
    const pid = GetURLParameter('pid');
    const cid = GetURLParameter('cid');
    const lob = GetURLParameter('lob');
    const policyData = pid + "|" + cid + "|" + lob;
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: 'POST',
        data: 'reshop-compare-info=' + policyData,
        async: false,
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data) {
            HideLoader();
            generateHeader(data);
            generateCoverage(data, lob);
            showCarrierData(data, lob);
            if (data.CurrentYear.PolicyInfo.qrLeadId !== '' && data.CurrentYear.PolicyInfo.qrLeadId !== '0') {
                $('#createReShopQuoteSummary').attr('data-qr-lead', data.CurrentYear.PolicyInfo.qrLeadId);
                $('#createReShopQuoteSummary').attr('data-qr-lob', lob);
            }
        },
        complete: function (response) {
            PreviousYear(pid, cid, lob);
            ShowHideQuotes();
            displayAlert("Please Select Quotes For Comparison", "success");
            HideLoader();

        }
    });

}

$(document).on('click', '#createReShopQuoteSummary', function (e) {
    e.preventDefault();
    const qrLead = $(this).attr('data-qr-lead');
    const lob = $(this).attr('data-qr-lob');
    const url = 'functions/print_summary_functions.php';
    if (!qrLead || qrLead === '0') {
        return false;
    }
    $.ajax({
        timeout: 10000,
        type: 'POST',
        url: url,
        async: true,
        dataType: "json",
        beforeSend: function () {
            ShowLoader();
        },
        data: `download_print_summary=true&lead_id=${qrLead}&lob=${lob}&columnSorted=Premium&columnSortedDir=ASC`,
        success: function (data) {
            if (data.preview !== undefined && data.preview !== 'undefined' && data.url !== '') {
                const popup = window.open(data.url, "_blank");
                HideLoader();
                if (!popup || popup.closed || typeof popup.closed === 'undefined') {
                    Swal.fire({
                        title: "Pop-Up Blocked",
                        text: "Please allow pop-ups for this site to load your Print Summary",
                        icon: "error"
                    });
                } else {
                    popup.trigger('focus');
                }
                const link = document.createElement("a");
                link.href = data.url;
                link.download = data.fileName || "summary.pdf"; // optional: set from server
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                HideLoader();
                DisplayAlert("Whoops! There was a problem generating your summary. Please try again. 4", "error");
            }
        },
        error: function () {
            HideLoader();
            DisplayAlert("Whoops! There was a problem generating your summary. Please try again. 4", "error");
        }
    });
});

$(document).on('click', '.viewCDInvoice', function (e) {
    e.preventDefault();
    const inv = $(this).attr('data-value');
    const url = 'functions/cd_billing_functions.php';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'viewClientInvoice=' + inv,
        success: function (data) {
            if (data && data.status === 'Got Data') {
                const title = "Client Invoice";
                const myWindow = window.open("", title, "width=1080,height=1920");
                myWindow.document.write(data.data);
            } else {
                displayAlert("Unable to get that Invoice. Please try again.", "warn");
            }
        }
    });
});

function seachpolicy(client, search_id) {

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        data: 'get-specific-policy=' + client,
        type: 'POST',
        async: true,
        dataType: "json",
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data, result) {
            HideLoader();
            if (data === "Not found" || data.PolicyInfo.PolicyNumber === "Not found") {
                displayAlert("Whoops! There was a problem getting policy info. Please try again.", "error");
            } else {
                let cova = 0.0;
                let covb = 0.0;
                let covc = 0.0;
                let covd = 0.0;
                let cove = 0.0;
                let covf = 0.0;
                let Premium = 0.0;
                const fPn = data.PolicyInfo.PolicyNumber;
                const fps = data.PolicyInfo.policy_status;
                const fy = data.PolicyInfo.exp_date;
                const fcarrier = data.PolicyInfo.carrier;
                if (data.PolicyInfo.base_premium !== "Not Found" || data.PolicyInfo.base_premium !== "") {
                    Premium = data.PolicyInfo.base_premium;
                }
                $(search_id + "_year_exp_date").html('Expiry Date:' + fy);
                $(search_id + "_year_status").html('Status:' + fps);
                $.each(data.CoverageInfo, function (key, val) {
                    if (key === "CoverageA" && val !== '') {
                        cova = val;
                    }
                    if (key === "CoverageB" && val !== '') {
                        covb = val;
                    }
                    if (key === "CoverageC" && val !== '') {
                        covc = val;
                    }
                    if (key === "CoverageD" && val !== '') {
                        covd = val;
                    }
                    if (key === "CoverageE" && val !== '') {
                        cove = val;
                    }
                    if (key === "CoverageF" && val !== '') {
                        covf = val;
                    }
                });
                $(search_id + "_premium").html('$' + Premium);
                $(search_id + "_carrier").html(fcarrier);
                $(search_id + "_coverageA").html('$' + cova);
                $(search_id + "_coverageB").html('$' + covb);
                $(search_id + "_coverageC").html('$' + covc);
                $(search_id + "_coverageD").html('$' + covd);
                $(search_id + "_coverageE").html('$' + cove);
                $(search_id + "_coverageF").html('$' + covf);

            }

        },
        error: function () {
            HideLoader();
        }
    });
}

function PreviousYear(pid, cid, lob) {
    const PreviousPolicy = $('#first_year_policy > option').length;

    if (PreviousPolicy === 2) {
        $('th:nth-child(2), tr td:nth-child(2)').hide();
        var policy_options = $('#first_year_policy option:nth-child(2)').val();
        $('#first_year_policy').val(policy_options).trigger('change');
        var client = lob + "|" + cid + "|" + policy_options;
        seachpolicy(client, '#first');
    } else if (PreviousPolicy >= 3) {
        var policy_options = $('#first_year_policy option:nth-child(2)').val();
        var client = lob + "|" + cid + "|" + policy_options;
        $('#first_year_policy').val(policy_options).trigger('change');
        seachpolicy(client, '#first');
        const second_options = $('#first_year_policy option:nth-child(3)').val();
        $('#second_year_policy').val(second_options).trigger('change');
        var client = lob + "|" + cid + "|" + second_options;
        seachpolicy(client, '#second');
    } else {
        $('th:nth-child(2), tr td:nth-child(2)').hide();
        $('th:nth-child(3), tr td:nth-child(3)').hide();
    }
}

function ShowHideQuotes() {
    const options = $('#quote1 > option').length;
    if (options === 2) {
        $('th:nth-child(6), tr td:nth-child(6)').hide();
        $('th:nth-child(7), tr td:nth-child(7)').hide();
    } else if (options === 3) {
        $('th:nth-child(7), tr td:nth-child(7)').hide();
    } else if (options > 3) {

    } else {
        $('th:nth-child(5), tr td:nth-child(5)').hide();
        $('th:nth-child(6), tr td:nth-child(6)').hide();
        $('th:nth-child(7), tr td:nth-child(7)').hide();
        displayAlert("Whoops! Quotes Not found. Please try again.", "error");
    }
}

function GetURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        const sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}


$(document).on('click', '.highlightNote', function (e) {
    e.preventDefault();
    // Get the ID of the textarea from the data-value attribute
    const textareaId = $(this).attr('data-value');
    const textarea = $('#' + textareaId);

    // Get the selected text in the textarea
    const selectedText = getSelectedText(textarea);

    if (selectedText) {
        // Replace the selected text with the same text wrapped in <mark></mark>
        const textareaContent = textarea.val();
        const highlightedText = '<mark>' + selectedText + '</mark>';
        textarea.val(textareaContent.replace(selectedText, highlightedText));
    } else {
        Swal.fire({
            title: 'Oops!',
            text: 'You need to select the text you want highlighted before clicking this button.',
            icon: 'warning',
            confirmButtonText: 'Ok!'
        });
    }
    return false;
});

function getSelectedText(textarea) {
    const textareaElement = textarea.get(0);
    const startPos = textareaElement.selectionStart;
    const endPos = textareaElement.selectionEnd;
    const selectedText = textareaElement.value.substring(startPos, endPos);

    return selectedText;
}

function activateTabCD(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}


$(document).on('keypress change input paste', '#merge_contact_assoc', function (event) {
    if (event.which === '13') {
        event.preventDefault();
    } else {
        const old = $('#old_contact_id').val();
        const searchStats = $('body').data('search-stats');
        $('#merge_contact_assoc').catcomplete({
            hint: true, highlight: true, minLength: 3, delay: 1500, timeout: 10000, source: function (query, result) {

                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php?source=MergeContacts&MergeContactExc=" + old,
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term + '&searchStats=' + searchStats,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        result(data);
                        HideSearchLoader();
                        $("#merge_contact_assoc").trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#merge_contact_assoc').val(item.value);
            }
        });

    }
});


$(document).on('click', '.associateIvansToContact', function () {
    const selectedValue = $(this).attr('data-value');
    const inputGroupHtml = '' + '<div class="input-group" id="' + selectedValue + '_inputGroup">' + '<input class="form-control associateIvansTraffic" ' + 'id="' + selectedValue + '" ' + 'placeholder="Search for Contact...">' + '<button type="button" data-value="' + selectedValue + '" ' + 'class="btn btn-primary btn-block associateIvansTrafficButton">' + 'Process' + '</button>' + '</div>';
    launchCenteredModal(inputGroupHtml, 'Associate Ivans Transaction to Contact');
});

$(document).on('click', '.associateIvansTrafficButton', function (e) {
    e.preventDefault();
    const transactionId = $(this).attr('data-value');
    const nContactId = $('#' + transactionId).val();
    const url = 'functions/functions.php';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'associateIvansTransaction=' + transactionId + '&associateIvansTransactionContact=' + nContactId,
        success: function (data) {
            if (data && data.status === 'Got Data') {
                emptyAndCloseCenteredModal();
                displayAlert("Processing started, please check back in a few minutes.", "success");
            } else {
                displayAlert("Unable to associate this Ivans Transaction. Please try again.", "error");
            }
        }
    });
});

$(document).on('click', '.removeIvansTransaction', function (event) {
    event.preventDefault();
    const transactionId = $(this).attr('data-value');
    const tRow = $(this).closest('tr');
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will remove this entry and you will have to re-send from IVANS Exchange if it needs to be processed.",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes, Remove It',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'removeIvansTransaction=' + transactionId,
                success: function (data) {
                    if (data && data.status === 'Got Data') {
                        displayAlert("Transaction Removed.", "success");
                        tRow.remove();
                    } else {
                        displayAlert("Unable to remove this Ivans Transaction. Please try again.", "error");
                    }
                }
            })
        }
    })
    return false;
});

$(document).on('keypress change input paste', '#sms_contact_assoc, #call_contact_assoc, .associateIvansTraffic', function (event) {

    if (event.which === '13') {
        event.preventDefault();
    } else {
        const eleId = $(this).attr('id');
        const searchStats = $('body').data('search-stats');
        $("#" + eleId).catcomplete({
            hint: true, highlight: true, minLength: 2, delay: 1500, timeout: 10000, source: function (query, result) {

                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term + '&searchStats=' + searchStats,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        result(data);
                        HideSearchLoader();
                        $("#" + eleId).trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $("#" + eleId).val(item.value);
            }
        });
    }
});


$(document).on('keypress change input paste', '#new_carrier_name, #new-carrier-naic, #upd-cd-carrier-name, #upd-carrier-naic', function (event) {
    var eleId = $(this).attr('id');
    if (event.which === '13') {
        event.preventDefault();
    } else {
        var eleId = $(this).attr('id');
        $("#" + eleId).catcomplete({
            hint: true, highlight: true, minLength: 2, delay: 1500, timeout: 10000, source: function (query, result) {
                $.ajax({
                    timeout: 10000,
                    url: "search-auto-naic-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {
                        result(data);
                        if (eleId === 'new_carrier_name' || eleId === 'new-carrier-naic') {
                            $("#new-carrier-naic").prop("readonly", false);
                        } else {
                        }
                        HideSearchLoader();
                        $("#" + eleId).trigger('focus');
                    },
                    error: function (request, status, err) {
                        // In case of an error, ensure NAIC field remains editable.
                        $("#new-carrier-naic").prop("readonly", false);
                        displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                // If no valid selection was made, ensure the NAIC field is not readonly.
                if ($("#new-carrier-naic").val() === '') {
                    $("#new-carrier-naic").prop("readonly", false);
                }
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label;
            }, select: function (event, ui) {
                event.preventDefault();
                if (eleId === 'new_carrier_name' || eleId === 'new-carrier-naic') {
                    $("#new_carrier_name").val(ui.item.CompanyName);
                    $("#new-carrier-naic").val(ui.item.CompanyID).prop("readonly", true);
                    $("#new-carrier-address").val(ui.item.Address);
                    $("#new-carrier-city").val(ui.item.City);
                    $("#new-carrier-state").val(ui.item.State);
                    $("#new-carrier-zip").val(ui.item.Zip);
                    $("#new-carrier-phone").val(ui.item.Phone);
                    $("#new-carrier-website").val(ui.item.WebSite);
                } else {
                    $("#upd-cd-carrier-name").val(ui.item.CompanyName);
                    $("#upd-carrier-naic").val(ui.item.CompanyID).prop("readonly", true);
                    $("#upd-carrier-address").val(ui.item.Address);
                    $("#upd-carrier-city").val(ui.item.City);
                    $("#upd-carrier-state").val(ui.item.State);
                    $("#upd-carrier-zip").val(ui.item.Zip);
                    $("#upd-carrier-phone").val(ui.item.Phone);
                    $("#upd-carrier-website").val(ui.item.WebSite);
                }
            }
        });
    }
});

$(document).on('click', '.generateCDClientInvoice', function (e) {
    e.preventDefault();
    ShowLoader();
    const inv = $(this).attr('data-value');
    const url = 'functions/cd_billing_functions.php';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        dataType: 'json',
        data: 'generateInvoice=true' + '&get-billing-info=' + inv,
        success: function (data) {
            if (data.invoice !== '') {
                const url = 'functions/cd_billing_functions.php';
                const genInv = data.invoice;
                $.ajax({
                    type: "POST",
                    url: url,
                    processData: false,
                    data: 'viewClientInvoice=' + genInv,
                    success: function (data) {
                        if (data && data.status === 'Got Data') {
                            HideLoader();
                            const title = "Client Invoice";
                            const myWindow = window.open("", title, "width=1080,height=1920");
                            myWindow.document.write(data.data);
                        } else {
                            HideLoader();
                            displayAlert("Unable to get that Invoice. Please try again.", "warn");
                        }
                    },
                    error: function (e) {
                        HideLoader();
                        displayAlert("Unable to generate an Invoice. Please try again.", "warn");
                    },
                    complete: function (e) {
                        HideLoader();
                    }
                });
            } else {
                displayAlert("Unable to generate an Invoice. Please try again.", "warn");
            }
        },
        error: function (e) {
            HideLoader();
            displayAlert("Unable to generate an Invoice. Please try again.", "warn");
        },
        complete: function (e) {
            HideLoader();
        }
    });
});

$(document).on('click', '#cd-billing-settings-href', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    if (val === '' || val === undefined || val === 'undefined') {
        displayAlert("Unable to retrieve billing info. Please try again or contact Support.", "error");
    } else {
        const url = "functions/cd_billing_functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'get-billing-info=' + val + '&loadBillingTab=true',
            beforeSend: function () {
                ShowLoader();
            },
            success: function (data) {
                if (data && data.status === "Got Data") {
                    $('#cd-agency-billing-settings-row').html(data.data);
                    $('#cd-agency-billing-settings-row').show();
                    HideLoader();
                    if ($("#previous-transactions-table").length > 0) {
                        if ($.fn.dataTable.isDataTable("#previous-transactions-table")) {
                            $("#previous-transactions-table").DataTable().destroy();
                        }
                        $("#previous-transactions-table").DataTable({
                            "order": [[0, "desc"]], 'columnDefs': [{'type': 'date', 'targets': 0}], "pageLength": 10
                        });
                    }
                    if ($("#current-products-table").length > 0) {
                        if ($.fn.dataTable.isDataTable("#current-products-table")) {
                            $("#current-products-table").DataTable().destroy();
                        }
                        $("#current-products-table").DataTable({
                            "pageLength": 10,
                            "ordering": false,
                            footerCallback: function (row, data, start, end, display) {
                                let api = this.api();

                                // Remove the formatting to get integer data for summation
                                let intVal = function (i) {
                                    return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
                                };

                                // Total over all pages
                                total = api
                                    .column(3)
                                    .data()
                                    .reduce((a, b) => intVal(a) + intVal(b), 0);

                                // Total over this page
                                pageTotal = api
                                    .column(3, {page: 'current'})
                                    .data()
                                    .reduce((a, b) => intVal(a) + intVal(b), 0);

                                // Update footer
                                api.column(3).footer().innerHTML = total.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                                +' (Account Total)';
                            }
                        });
                    }
                    if ($("#client-invoices-table").length > 0) {
                        if ($.fn.dataTable.isDataTable("#client-invoices-table")) {
                            $("#client-invoices-table").DataTable().destroy();
                        }
                        $("#client-invoices-table").DataTable({
                            "order": [[0, "desc"]], 'columnDefs': [{'type': 'date', 'targets': 0}], "pageLength": 10
                        });
                    }
                    $('#forte-customer-payment-type').select2();
                    $('.nav-tabs').css('margin-bottom', '40px');
                }
                if (data && data.status !== "Got Data") {
                    HideLoader();
                }
            },
            complete: function () {
                HideLoader();
            }
        });
    }
    return false;
});


$(document).on('keypress change input paste', '#task_contact_assoc_quick', function (event) {

    if (event.which === '13') {
        event.preventDefault();
    } else {
        const searchStats = $('body').data('search-stats');
        $('#task_contact_assoc_quick').catcomplete({
            hint: true, highlight: true, minLength: 2, delay: 1500, timeout: 10000, source: function (query, result) {

                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term + '&searchStats=' + searchStats,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        result(data);
                        HideSearchLoader();
                        $("#task_contact_assoc_quick").trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#task_contact_assoc_quick').val(item.value);
            }
        });
    }
});

$(document).on('keypress change input paste', '#account_contact_assoc', function (event) {

    if (event.which === '13') {
        event.preventDefault();
    } else {
        const searchStats = $('body').data('search-stats');
        $('#account_contact_assoc').catcomplete({
            hint: true, highlight: true, minLength: 2, delay: 1500, timeout: 10000, source: function (query, result) {
                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term + '&searchStats=' + searchStats,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {
                        result(data);
                        HideSearchLoader();
                        $("#account_contact_assoc").trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#account_contact_assoc').val(item.value);
            }
        });
    }
});


$(document).on('click', '#detailed-list li a', function (event) {
    const activee = $(this).text();
    const status_id = $(this).attr('href');
    $(status_id).addClass('active').siblings().removeClass('active');
    $("#selected-tab-link small").html("");
    $("#selected-tab-link small").html(activee);
});


$(document).on('click', '.multi-btn-group', function (event) {
    $('.multi-btn-group').removeClass('active');
    $(this).addClass('active');
    var activeText = $('.active span.selected-tabs-link').text();
    const status_id = $(this).attr('href');
    var activeText = $('.active span.selected-tabs-link').text();
    $(status_id).addClass('active');
    $("#selected-tab").html("");
    if ($(this).attr('href') === '#contact-info') {
        if (activeText === '') {
            activeText = 'Contact Info';
        }
        $("#selected-tab").html(activeText);
    } else {
        $("#selected-tab").html('<ul class="breadcrumb m-0 p-0"><li class="breadcrumb-item text-success" data-id="0"><a class="multi-btn-group" data-bs-toggle="tab" href="#contact-info" role="tab" aria-selected="true" aria-expanded="true"><i class="fas fa-home" aria-hidden="false"></i></a></li><li class="breadcrumb-item text-muted">' + activeText + '</li></ul>');
    }
});

$(function () {

    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        const ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
        //ul.outerWidth('40%');
    }

    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        }, _renderMenu: function (ul, items) {
            const that = this;
            let currentCategory = "";
            $.each(items, function (index, item) {
                let li;
                if (item.category !== currentCategory) {
                    ul.append("<li class='ui-autocomplete-category pt-3 pb-3 border-bottom border-top sticky text-center'><h5>" + item.category + "</h5></li>");
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                }
            });
        }, _renderItem: function (ul, item) {
            // var searchMask = this.element.val();
            // var regEx = new RegExp(searchMask, "ig");
            // var replaceMask = "<b>$&</b>";
            // var html = item.label.replace(regEx, replaceMask);
            const html = item.label;

            return $("<li></li>")
                .data("item.autocomplete", item)
                .append($("<a></a>").attr({href: '#'}).html(html))
                .appendTo(ul);
        }
    });
    // Single Select
});

$(function () {
    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        const ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    };

    // Define the custom widget
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        }, _renderMenu: function (ul, items) {
            const that = this;
            let currentCategory = "";
            $.each(items, function (index, item) {
                let li;
                if (item.category !== currentCategory) {
                    ul.append("<li class='ui-autocomplete-category pt-3 pb-3 border-bottom border-top sticky text-center'><h5>" + item.category + "</h5></li>");
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                }
            });
        }, _renderItem: function (ul, item) {
            const element = this.element;  // Access the autocomplete element
            const html = item.label;
            const search_stats = $("input[name=search-stats]:checked").val();
            if ((!element.hasClass('qs-search-contact') && !element.hasClass('qs-search-contact-horiz')) || ((element.hasClass('qs-search-contact') || element.hasClass('qs-search-contact-horiz')) && search_stats === 'disable')) {
                // Default rendering for non qs-search-contact elements
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append($("<a></a>").attr({href: '#'}).html(html))
                    .appendTo(ul);
            } else {
                if (search_stats === 'enable') {
                    if (item.category === 'Contacts') {
                        return $("<li>")
                            .append("<div class='autocomplete-result'>" + "<div class='label'>" + item.label + "</div>" + "<div class='counts'>" + "<div class='count-item'><i class='fa-regular fa-file-alt'></i><span>" + (item.integrationId || "Not Synced") + "</span><div class='count-label'><span>Integration Id</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-file-alt'></i><span>" + (item.policies || 0) + "</span><div class='count-label'><span>Policies</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-folder'></i><span>" + (item.files || 0) + "</span><div class='count-label'><span>Contact Files</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-sticky-note'></i><span>" + (item.notes || 0) + "</span><div class='count-label'><span>Notes</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-home'></i><span>" + (item.properties || 0) + "</span><div class='count-label'><span>Properties</span></div></div>" + "</div>" + "</div>")
                            .appendTo(ul);
                    } else if (item.category === 'Policies') {
                        return $("<li>")
                            .append("<div class='autocomplete-result'>" + "<div class='label'>" + item.label + "</div>" + "<div class='counts'>" + "<div class='count-item'><i class='fa-regular fa-folder'></i><span>" + (item.files || 0) + "</span><div class='count-label'><span>Files</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-sticky-note'></i><span>" + (item.notes || 0) + "</span><div class='count-label'><span>Notes</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-home'></i><span>" + (item.properties || 0) + "</span><div class='count-label'><span>Properties</span></div></div>" + "</div>" + "</div>")
                            .appendTo(ul);
                    } else {
                        return $("<li>")
                            .append("<div class='autocomplete-result'>" + "<div class='label'>" + item.label + "</div>" + "<div class='counts'>" + "<div class='count-item'><i class='fa-regular fa-folder'></i><span>" + (item.files || 0) + "</span><div class='count-label'><span>Files</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-sticky-note'></i><span>" + (item.notes || 0) + "</span><div class='count-label'><span>Notes</span></div></div>" + "<div class='count-item'><i class='fa-regular fa-home'></i><span>" + (item.properties || 0) + "</span><div class='count-label'><span>Properties</span></div></div>" + "</div>" + "</div>")
                            .appendTo(ul);
                    }
                } else {
                    if (item.category === 'Contacts') {
                        return $("<li>")
                            .append("<div class='autocomplete-result'>" + "<div class='label'>" + item.label + "</div>" + "<div class='counts'>" + "<div class='count-item'><span>" + (item.integrationId || "Not Synced") + "</span><div class='count-label'><span>Integration Id</span></div></div>" + "<div class='count-item'><span>" + (item.policies || 0) + "</span><div class='count-label'><span>Policies</span></div></div>" + "<div class='count-item'><span>" + (item.files || 0) + "</span><div class='count-label'><span>Contact Files</span></div></div>" + "<div class='count-item'><span>" + (item.notes || 0) + "</span><div class='count-label'><span>Notes</span></div></div>" + "<div class='count-item'><span>" + (item.properties || 0) + "</span><div class='count-label'><span>Properties</span></div></div>" + "</div>" + "</div>")
                            .appendTo(ul);
                    } else if (item.category === 'Policies') {
                        return $("<li>")
                            .append("<div class='autocomplete-result'>" + "<div class='label'>" + item.label + "</div>" + "<div class='counts'>" + "<div class='count-item'><span>" + (item.files || 0) + "</span><div class='count-label'><span>Files</span></div></div>" + "<div class='count-item'><span>" + (item.notes || 0) + "</span><div class='count-label'><span>Notes</span></div></div>" + "<div class='count-item'><span>" + (item.properties || 0) + "</span><div class='count-label'><span>Properties</span></div></div>" + "</div>" + "</div>")
                            .appendTo(ul);
                    } else {
                        return $("<li>")
                            .append("<div class='autocomplete-result'>" + "<div class='label'>" + item.label + "</div>" + "<div class='counts'>" + "<div class='count-item'><span>" + (item.files || 0) + "</span><div class='count-label'><span>Files</span></div></div>" + "<div class='count-item'><span>" + (item.notes || 0) + "</span><div class='count-label'><span>Notes</span></div></div>" + "<div class='count-item'><span>" + (item.properties || 0) + "</span><div class='count-label'><span>Properties</span></div></div>" + "</div>" + "</div>")
                            .appendTo(ul);
                    }
                }
            }
        }
    });

    $(document).on('keydown change input paste', '.qs-search-contact, .qs-search-contact-horiz', function (event) {
        if (event.key === 'Enter') {
            let searchTerm = $(this).val();
            event.preventDefault();
            $.ajax({
                timeout: 10000, url: "search-auto-comp.php", type: 'post', dataType: "json", data: {
                    search: searchTerm, searchStats: "enable", fullSearchResult: true
                }, beforeSend: function () {
                    ShowLoader("Working on that search, depending on criteria it may take longer to generate the result(s).");
                }, success: function (data) {
                    if (data) {
                        let contactsData = data?.contacts || [];
                        let policiesData = data?.policies || [];
                        let numContacts = contactsData?.length || 0; // number of contacts
                        let numPolicies = policiesData?.length || 0; // number of policies
                        if (numContacts > 0 || numPolicies > 0) {
                            let resultsHtml = `<div class="row">
    <div class="col-md-2">
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link mb-2 active numContactsResults" id="v-pills-contacts-tab" data-bs-toggle="pill" href="#v-pills-contacts" role="tab" aria-controls="v-pills-contacts" aria-selected="true"></a>
        <a class="nav-link mb-2 numPolicyResults" id="v-pills-policies-tab" data-bs-toggle="pill" href="#v-pills-policies" role="tab" aria-controls="v-pills-policies" aria-selected="false" tabindex="-1"></a>
        <!--<a class="nav-link mb-2" id="v-pills-tasks-tab" data-bs-toggle="pill" href="#v-pills-tasks" role="tab" aria-controls="v-pills-tasks" aria-selected="false" tabindex="-1">Messages</a>
        <a class="nav-link" id="v-pills-pipelines-tab" data-bs-toggle="pill" href="#v-pills-pipelines" role="tab" aria-controls="v-pills-pipelines" aria-selected="false" tabindex="-1">Settings</a> -->
        </div>
    </div>
    <div class="col-md-10">
        <div class="tab-content text-muted mt-4 mt-md-0" id="v-pills-tabContent">
            <div class="tab-pane fade active show" id="v-pills-contacts" role="tabpanel" aria-labelledby="v-pills-contacts-tab">
                <div class="row">
                    <table id="search-contacts-table" class="table compact table-striped table-hover" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Policies</th>
                                <th>Properties</th>
                                <th>Files</th>
                                <th>Notes</th>
                                <th>Integration Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane fade" id="v-pills-policies" role="tabpanel" aria-labelledby="v-pills-policies-tab">
                <div class="row">
                    <table id="search-policies-table" class="table compact table-striped table-hover" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Policy Number</th>
                                <th>Policy Status</th>
                                <th>Effective</th>
                                <th>Expires</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Files</th>
                                <th>Notes</th>
                                <th>Integration Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <!--
            <div class="tab-pane fade" id="v-pills-tasks" role="tabpanel" aria-labelledby="v-pills-tasks-tab">
            </div>
            <div class="tab-pane fade" id="v-pills-pipelines" role="tabpanel" aria-labelledby="v-pills-pipelines-tab">
            </div>
            -->
        </div>
    </div>
</div>`;

                            let contactsHtml = contactsData.map(contact => `
            <tr>
                <td>${contact.name}${contact.bname ? " | " + contact.bname : ""}</td>
                <td>${contact.address || "Not Found"}</td>
                <td>${contact.email || "Not Found"}</td>
                <td>${contact.phone || "Not Found"}</td>
                <td>${contact.policies}</td>
                <td>${contact.properties}</td>
                <td>${contact.files}</td>
                <td>${contact.notes}</td>
                <td>${contact.integrationId || "Not Found"}</td>
                <td><button type="button" class="btn btn-sm btn-primary contactInfo" data-value="${contact.ContactId}" title="Open Contact: ${contact.name}${contact.bname ? " | " + contact.bname : ""}"><i class="fa-regular fa-arrow-up-right-from-square" aria-hidden="true"></i></button></td>
            </tr>
        `).join('');
                            let policiesHtml = policiesData.map(policy => `
            <tr>
                <td>${policy.named_insured || "Not Found"}</td>
                <td>${policy.policy_number || "Not Found"}</td>
                <td>${policy.policy_status || "Not Found"}</td>
                <td>${policy.effective_date || "Not Found"}</td>
                <td>${policy.exp_date || "Not Found"}</td>
                <td>${policy.email || "Not Found"}</td>
                <td>${policy.phone || "Not Found"}</td>
                <td>${policy.files}</td>
                <td>${policy.notes}</td>
                <td>${policy.integrationId || "Not Found"}</td>
                <td><button type="button" class="btn btn-sm btn-primary policyInfo" data-value="${policy.PolicyId}" title="Open Policy: ${policy.policy_number}"><i class="fa-regular fa-arrow-up-right-from-square" aria-hidden="true"></i></button></td>
            </tr>
        `).join('');
                            launchFullScreenModal(resultsHtml, "Search Result(s) for: " + searchTerm);
                            $('.numContactsResults').text(`Contacts - ` + numContacts + ` result(s)`);
                            $('.numPolicyResults').text(`Policies - ` + numPolicies + ` result(s)`);
                            $('#search-contacts-table tbody').html(contactsHtml);
                            $('#search-policies-table tbody').html(policiesHtml);

                            $('#search-contacts-table').DataTable({
                                destroy: true, retrieve: true
                            });
                            $('#search-policies-table').DataTable({
                                destroy: true, retrieve: true
                            });
                        } else {
                            Swal.fire({
                                title: 'Whoops!',
                                text: 'No results were found for: ' + searchTerm,
                                icon: 'info',
                                confirmButtonText: 'Ok!'
                            });
                        }
                    }
                    HideLoader();
                }, error: function (request, status, err) {
                    if (status === "timeout") {
                        displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        HideLoader();
                    } else {
                        displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        HideLoader();
                    }
                }
            });
        } else {
            const searchStats = $('body').data('search-stats');
            $(this).catcomplete({
                hint: true,
                highlight: true,
                minLength: 3,
                delay: 1000,
                timeout: 10000,
                source: function (request, response) {
                    ShowSearchLoader();
                    $.ajax({
                        timeout: 10000, url: "search-auto-comp.php", type: 'post', dataType: "json", data: {
                            search: request.term, searchStats: searchStats
                        }, beforeSend: function () {
                            ShowSearchLoader();
                        }, success: function (data) {
                            response(data);
                            HideSearchLoader();
                        }, error: function (request, status, err) {
                            if (status === "timeout") {
                                displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                            } else {
                                displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                            }
                        }
                    });
                },
                open: function (event, ui) {
                    $("html, body").css({overflow: 'hidden'});
                },
                close: function () {
                    $("html, body").css({overflow: 'inherit'});
                },
                select: function (event, ui) {
                    event.preventDefault();
                    $(this).val(ui.item.label);
                    const string = ui.item.value;

                    var sub = "Account";
                    if (string.indexOf(sub) !== -1) {
                        const account_split = string.split("|");
                        const account_id = account_split[1];
                        window.location = "accounts.php?AccountId=" + account_id
                        $(this).val("");
                    }

                    var sub = "Policy";
                    if (string.indexOf(sub) !== -1) {
                        const policy_split = string.split("|");
                        const policy_id = policy_split[1];

                        $(this).val("");
                        window.location = "policy.php?Policy=" + policy_id;
                        $('select').select2({width: '100%'});
                    }

                    const sub2 = "Contact";
                    if (string.indexOf(sub2) !== -1) {
                        const contact_split = string.split("|");
                        const contact_id = contact_split[1];
                        const contact_name = contact_split[0];
                        const contact_n = contact_split[2];
                        $(this).val("");
                        window.location = "contact.php?Contact=" + contact_id;
                    }
                }
            });
        }
    });
});


$(document).on('input', '.qr-search-contact', function (event) {
    if (event.which === '13') {
        event.preventDefault();
    } else {
        $('.qr-search-contact').catcomplete({
            hint: true, highlight: true, minLength: 3, delay: 1500, source: function (query, result) {
                ShowSearchLoader();
                $.ajax({
                    timeout: 10000,
                    url: "search-qr-auto-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        HideSearchLoader();
                        result(data);
                        $(".qr-search-contact").trigger('focus');
                    }
                });
            },

            open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, select: function (event, ui) {
                event.preventDefault();
                $(".qr-search-contact").val(ui.item.label);
                const string = ui.item.value;
                const cat = ui.item.category;

                if (cat === 'Leads' || cat === 'Co-Applicants') {
                    const lead_split = string.split("|");
                    const lead_id = lead_split[1];
                    window.location = "qr-lead.php?Lead=" + lead_id
                    $(".qr-search-contact").val("");

                }
            }

        });


    }
});

function getLineDefaults(caller) {
    const contactId = encodeURIComponent($("input[name=policy_contact_assoc]").val());
    let line;
    let subline = false;

    if (caller === 'policy_lob') {
        line = encodeURIComponent($('#policy_lob').val());
    } else if (caller === 'policy_lob_subtype') {
        line = encodeURIComponent($('#policy_lob').val()) + '|' + encodeURIComponent($('#policy_lob_subtype').val());
        subline = true;
    } else {
        return; // Exit if caller is not recognized
    }

    $.ajax({
        timeout: 20000,
        type: "POST",
        url: "functions/functions.php",
        data: "get_line_defaults=" + line + "&contactID=" + contactId,
        dataType: "json",
        beforeSend: function () {
            ShowLoader("Retrieving Carriers, please wait......");
        },
        success: function (response) {
            HideLoader();
            if (response && typeof response === 'object') {
                $('#line_select').empty().html(response['0']);
                $('#policy_types').empty().html(response['1']);
                $('#policy_info_section').empty().html(response['2']);
                if (response['4'] !== '') {
                    let cFieldsHtml = `<h5 class='text-center my-3 p-3 border-top border-bottom'>Custom Fields</h5></div><div class='row'>` + response['4'] + `</div>`; 
                    $('#customFieldsPolicySection').empty().html(cFieldsHtml);
                    $('#customFieldsPolicySection').show();
                } else {
                    $('#customFieldsPolicySection').hide();
                }

                if (!subline) {
                    $('#policy_lob_subtype').empty().append('<option value="" selected disabled>Please Select</option>' + response['3']);
                }

                const policyLob = $('#policy_lob').val();
                if (policyLob === 'Auto') {
                    $("#policy_term").val("6 Months").trigger('change');
                } else if (policyLob === 'Home') {
                    $("#policy_term").val("12 Months").trigger('change');
                } else {
                    $("#policy_term").val("12 Months").trigger('change');
                }

                if (!subline) {
                    $('#term-Div').insertBefore('#policyDates');
                }

                $('.form-select').select2({
                    theme: "bootstrap-5", width: '100%'
                });

                $('#line_select input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
                $('#policy_types input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
                $('#policy_info_section input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            } else {
                displayAlert("Whoops! We were unable to pull information for that Line. Please try again.", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            HideLoader();
            displayAlert("Whoops! We were unable to pull information for that Line. Please try again.", "error");
        }
    });
}

$(document).on('change', '#policy_term', () => {
    const term = $('#policy_term').val();
    const effDate = $("#policy_eff_date").val();
    if (term && effDate && effDate !== '0000-00-00' && effDate !== '0001-01-01') {
        const numMonths = parseInt(term);
        const expireDate = addMonthsToDate(effDate, numMonths);
        $('#policy_exp_date').val(expireDate);
    }
});

$(document).on('change', '#policy_eff_date', () => {
    const term = $('#policy_term').val();
    const effDate = $("#policy_eff_date").val();
    if (term && effDate && effDate !== '0000-00-00' && effDate !== '0001-01-01') {
        const numMonths = parseInt(term);
        const expireDate = addMonthsToDate(effDate, numMonths);
        $('#policy_exp_date').val(expireDate);
    }
});


$(document).on('change', '#upd_eff', () => {
    const term = $('#upd_term').val();
    const effDate = $("#upd_eff").val();
    if (term && effDate && effDate !== '0000-00-00' && effDate !== '0001-01-01') {
        const numMonths = parseInt(term);
        const expireDate = addMonthsToDate(effDate, numMonths);
        $('#upd_exp').val(expireDate);
    }
});

$(document).on('click', '#failed-ivans-traffic-tab', function (e) {
    $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
    $('#ivans-grid-data-failed').DataTable({
        "destroy": true, "processing": true, "serverSide": true, "ajax": {
            "url": "ivans-portal-grid-data-failed.php"
        }, 'order': [[4, 'desc']], columnDefs: [{
            'type': 'datetime', 'targets': [4]
        }, {
            'orderable': false, 'targets': [5]
        }]
    });
});

$(document).on('click', '#ivans-traffic-tab', function (e) {
    $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
    $('#ivans-grid-data').DataTable({
        "destroy": true, "processing": true, "serverSide": true, "ajax": {
            "url": "ivans-portal-grid-data.php"
        }, 'order': [[4, 'desc']], columnDefs: [{
            'type': 'datetime', 'targets': [4]
        }, {
            'orderable': false, 'targets': [6]
        }]
    });
    HideLoader();
});

$(document).on('click', '#getVinInfo', function (event) {
    event.preventDefault();
    if ($('#add_vehicle_year').length > 0) {
        val = $('#add_vehicle_identification').val();
    } else if ($('#edit_vehicle_year').length > 0) {
        val = $('#edit_vehicle_identification').val();
    } else {
        displayAlert("Whoops! There was a problem finding information on that VIN Reason - " + response[1], "error");
        return false;
    }
    ShowLoader();
    $.ajax({
        timeout: 10000,
        url: 'functions/vehicle_lookup_functions.php',
        type: "POST",
        data: 'VehicleVIN=' + val,
        success: function (response, result) {
            HideLoader();
            if (response[0] !== "Failed") {
                if ($('#add_vehicle_year').length > 0) {
                    $('#add_vehicle_year').val(response[1]);
                    $('#add_vehicle_make').val(response[2]);
                    $('#add_vehicle_model').val(response[3]);
                    $('#add_vehicle_trim').val(response[4]);
                } else if ($('#edit_vehicle_year').length > 0) {
                    $('#edit_vehicle_year').val(response[1]);
                    $('#edit_vehicle_make').val(response[2]);
                    $('#edit_vehicle_model').val(response[3]);
                    $('#edit_vehicle_trim').val(response[4]);
                }

            }
            if (response[0] === "Failed") {
                displayAlert("Whoops! There was a problem finding information on that VIN Reason - " + response[1], "error");
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.dismissAllNotifications', function (event) {
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will dismiss ALL of your current notifications.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Dismiss All',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'notification_dismiss=AllReminders',
                success: function (response) {
                    Swal.fire({
                        title: 'Success!', text: 'Reminders Dismissed.', icon: 'success', confirmButtonText: 'Ok!'
                    });
                    $('.notificationCounterBadge')[0].innerText = 0;
                    $('#notificationsBar .simplebar-content').html("<a href='#!' class='text-reset notification-item text-center'><div class='d-flex'><div class='flex-grow-1'><h6 class='mb-1'>No Reminders</h6><div class='font-size-13 text-muted'><p class='mb-1'>All caught up!</p></div></div></div></a>");
                }
            })
        }
    })
    return false; //for good measure
});


$(document).on('click', '.removeIvans', function (event) {
    event.preventDefault();
    const mbox = $('#ivans-mbox').val();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will remove your Ivans account and stop any future Downloads.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Remove It',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'removeIvans=true&removeMailbox=' + mbox,
                success: function (response) {
                    Swal.fire({
                        title: 'Success!', text: 'Ivans account removed.', icon: 'success', confirmButtonText: 'Ok!'
                    });
                }
            })
        }
    })
    return false; //for good measure
});

$(document).on('click', '.notification_dismiss', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    let count = $('.notificationCounterBadge')[0].innerText;
    count--;
    $('.notificationCounterBadge')[0].innerText = count;
    $.ajax({
        timeout: 10000,
        type: 'POST',
        url: 'functions/functions.php',
        data: 'notification_dismiss=' + val,
        success: function (response) {
            displayAlert('Notification dismissed successfully', 'success');

            setTimeout(location.reload.bind(location), 3000);
        }
    })
    return false; //for good measure
});

$(document).on('click', 'a#notification_dismiss', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    let count = $('.notificationCounterBadge')[0].innerText;
    count--;
    $('.notificationCounterBadge')[0].innerText = count;
    $.ajax({
        timeout: 10000,
        type: 'POST',
        url: 'functions/functions.php',
        data: 'notification_dismiss=' + val,
        success: function (response) {
            displayAlert('Notification dismissed successfully', 'success');

            setTimeout(location.reload.bind(location), 3000);
        }
    })
    return false; //for good measure
});

$(document).on('click', '#sms_dismiss', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    let count = parseInt($('.smsNotificationCounterBadge')[0].innerText, 10);
    if (count > 0) {
        count--;
        $('.smsNotificationCounterBadge')[0].innerText = count;
        $.ajax({
            timeout: 10000,
            type: 'POST',
            url: 'functions/functions.php',
            data: 'sms_dismiss=' + val,
            success: function (response) {
                displayAlert("SMS - " + val + " dismissed successfully", "success");
            }
        })
    } else {
    }
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'getMessageCount=true', success: function (data, result) {
            if (data && data.status === 'Got Data' && data.msgCount !== '') {
                const count = parseInt(data.msgCount);
                if (count > 0) {
                    var newClass = 'badge-soft-danger';
                    var oldClass = 'badge-soft-success';
                } else {
                    var oldClass = 'badge-soft-danger';
                    var newClass = 'badge-soft-success';
                }
                if ($('.smsNotificationMenuCounter').hasClass(oldClass)) {
                    $('.smsNotificationMenuCounter').removeClass(oldClass).addClass(newClass);
                }
                $('.smsNotificationMenuCounter').html(count);
            }
        }
    });
    return false; //for good measure
});


$(document).on('click', 'a#task_comp', function (event) {
    val = $(this).attr('data-value');
    if ($("#single-task-modal").hasClass("in")) {
        $("#single-task-modal").modal("hide");
    }

    $('#get-chartData').modal('hide');

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
        confirmButtonText: 'Yes, dismiss it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            if (result.value.trim() === "") {
                textToAdd = ""
            } else {
                textToAdd = result.value.trim();
            }

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'task_dismiss=' + val + '&dismiss_notes=' + textToAdd,
                success: function (response) {
                    displayAlert("Task ID - " + val + " dismissed successfully. Refreshing Page in a moment", "success");
                    setTimeout(location.reload.bind(location), 1000);
                }
            });
        }
    })

});

$(document).on('click', '.showPassFields', function (event) {
    $(".passFields").show();
});


$(document).on('click', 'a#task_info,a#tasks_info', function (event) {

    val = $(this).attr('data-value');
    event.preventDefault();
    $.ajax({
        timeout: 10000,
        url: "functions/functions.php",
        type: "POST",
        dataType: "json",
        data: "get-single-tasks=true" + "&eventId=" + val,
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data) {
            HideLoader();
            const view_task_modal = $('#task_modal');
            view_task_modal.find('.modal-body').html(data);
            view_task_modal.find('.modal-header>h5').text('Task Timeline');
            $("#get-chartData").modal('hide');
            view_task_modal.modal('show');
            $(".fc-popover").remove();
            $('.tasks_info_details').addClass('disabled');
            $('.tasks_info_details').hide();


        }
    });
});

// subtask modal to view their parent


$(document).on('click', 'a#sub_task_parent_info,a#sub_task_parent_info', function (event) {

    val = $(this).attr('data-value');
    event.preventDefault();
    const taskinfo = getTaskInfo(val);
    let outputHtml = '';

    outputHtml += `<b><p>Priority:</b> ${taskinfo['Priority']}</p>`;
    outputHtml += `<b><p>Due date:</b> ${taskinfo['due_date']}</p>`;
    outputHtml += `<b><p>Description:</b> ${taskinfo['description']}</p>`;
    outputHtml += `<b><p>Assigned to:</b> ${taskinfo['user_name']}</p>`;
    outputHtml += `<b><p>Assigned by:</b> ${taskinfo['assigned_by']}</p>`;
    outputHtml += `<b><p>Associate Contact:</b> ${taskinfo['contact_name']}</p>`;

    HideLoader();
    const view_task_modal = $('#task_modal');
    view_task_modal.find('.modal-body').html(outputHtml);
    view_task_modal.find('.modal-header>h5').text("Sub-Task: Parent Information");
    $("#get-chartData").modal('hide');
    view_task_modal.modal('show');
    $(".fc-popover").remove();
    $('.tasks_info_details').addClass('disabled');
    $('.tasks_info_details').hide();
});


$("#task_modal").on('hide.bs.modal', function () {
    $('.tasks_info_details').removeClass('disabled');
    $('.tasks_info_details').show();

});

$(document).on('click', '.policyLink', function (event) {
    val = $(this).attr('data-value');
    window.location = "policy.php?Policy=" + val;
});

$(document).on('click', 'a#add-task-tv', function (event) {
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "add-task=true", beforeSend: function () {
            ShowLoader();
        }, success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Add Task');

                $('input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            }
            if (data && data.status !== "Got Data") {
                alertify.set('notifier', 'position', 'top-center');
                alertify.error("Whoops! There was a problem generating your form. Please try again.");
            }
        }

    });
});

$(document).on('click', 'a#add-task', function (event) {
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "add-task=true", beforeSend: function () {
            ShowLoader();
        }, success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Add Task');
                $('input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            } else {
                displayAlert("Whoops! There was a problem generating your form. Please try again or contact support.", "error");
            }
        }, error: function (xhr, status, error) {
            HideLoader();
            displayAlert("Whoops! There was a problem generating your form. Please try again or contact support.", "error");
        }
    });
});

$(document).on('click', 'a#add-claim', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-claim=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add Claim');
        flatpickr("#claim_date", {
            enableTime: !0,
            altInput: true,
            altFormat: "m/d/Y",
            dateFormat: "Y-m-d",
            allowInput: true,
            disableMobile: true
        });
        $('input[required]:not([pattern]), textarea[required]').attr('pattern', '.*\\S+.*');
    });
});

function myFunctiontohtmlcalender() {

    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    // Set the minimum value of the input to today's date
    $('#dateInput').attr('min', today);
    // Disable dates before today
    // $('#dateInput').on('change', function() {
    $(document).on('change', '#dateInput', function () {

        const selectedDate = $(this).val();
        if (selectedDate < today) {
            $(this).val(today);
        }
    });
}

myFunctiontohtmlcalender();

$(document).on('click', 'a#add-invoice', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-invoice=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Create Invoice');

        // flatpickr("#invoice_date", { altInput: true, altFormat: "m/d/Y", dateFormat: "Y-m-d", minDate: "today", allowInput: true, disableMobile: true });
    });
});

$(document).on('click', '#new_invoice_form #add_field_button', function (e) {
    e.preventDefault();

    const max_fields = 10; //maximum input boxes allowed
    const inputbox_count = $('#new_invoice_form #charges_div .row').length;
    const divToAppend = $('#charges_div .charges-child-section:first-child').clone();

    if (inputbox_count < max_fields) {
        $('#charges_div').append(divToAppend);
        $('#charges_div .charges-child-section:last input').val("");

        $('#new_invoice_form').find('#remove_field_button').show();
    }
});

$(document).on('click', '#new_invoice_form #remove_field_button', function (e) {
    e.preventDefault();

    const inputbox_count = $('#new_invoice_form #charges_div .charges-child-section').length;

    if (inputbox_count > 1) {
        $('#new_invoice_form .charges-child-section:last').remove();

        if (inputbox_count === 2) {
            $('#new_invoice_form').find('#remove_field_button').hide();
        }
    } else {
        $('#new_invoice_form').find('#remove_field_button').hide();
    }

});

$('#invoice_contact_assoc').on('change', function () {
    const val = $('#invoice_contact_assoc').val();
    $.post('functions/functions.php', 'get-contact-policies=' + encodeURIComponent(val), function (data) {
        $('#policy_selector_div').html('<b>' + data + '</b>');
    });
});

$(document).on('click', '#add-zip-mapping', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-zip-map=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add Zipcode Mapping');
        showZipCodeMappings();

    });
});

function showZipCodeMappings() {
    ShowLoader();

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        method: 'post',
        data: {'agency_zipcode_mappings': 1},
        dataType: 'json',
        async: false,
        success: function (data, result) {
            HideLoader();

            const {
                Grid, html, h
            } = gridjs;
            const lobsGrid = new Grid({
                columns: [{
                    name: "ZipCode or Mapping Range", formatter: (_, row) => gridjs.html(`${row.cells[0].data}`)
                }, {
                    name: "Mapped Agency",
                    formatter: (_, row) => gridjs.html(`${row.cells[1].data}` !== 'null' ? `${row.cells[1].data}` : '')
                }], pagination: {
                    limit: 5
                }, sort: !0, search: !0, data: data
            }).render(document.getElementById("zipcode-range-div"));
        }

    });
}

$(document).on('click', '#quickContactTask', function (event) {
    const contact = $(this).attr('data-value');
    $.post("functions/functions.php", "quick-add-task=" + contact, function (data) {

        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Quick Add Task");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $("#get-chartData").modal('hide');

        $('#qtpanel').offcanvas('show');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
    });
});


$(document).on('click', '#add-user', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-user=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add User');
    });
});

$(document).on('click', '#add-sg', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-sg=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add SendGrid Info');
    });
});

$(document).on('click', '#add-tw', function () {
    ShowLoader();
    $.post("functions/functions.php", "add-tw=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add / Edit Twilio Credentials');
    });
});

$(document).on('change', '#twilioType', function () {
    ShowLoader();
    $.post("functions/marketing_functions.php", {'twilioType': $(this).val(), 'getTwilioInfo': true}, function (data) {
        HideLoader();
        if (data === false) {
            $('#accountSID').val("");
            $('#accountToken').val("");
            $('#twilioNumber').val("");
            $('#updTwButton').text("Add / Edit Twilio Info");
        } else {
            $('#accountSID').val(data.AccountSID);
            $('#accountToken').val(data.AccountToken);
            $('#twilioNumber').val(data.twilio_number);
            $('#updTwButton').text("Update Twilio Info");
        }
    });
});

$(document).on('click', '#updTwButton', function (e) {
    e.preventDefault();

    const form = $("#upd_tw_form");
    if (form[0].checkValidity() === false) {
        form.addClass("was-validated");
    } else {
        ShowLoader();

        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#upd_tw_form").serialize() + '&updateTwilioInfo=true',
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "success") {
                    displayAlert(data.message, "success");
                    setTimeout(location.reload.bind(location), 500);
                } else {
                    displayAlert(data.message, "error");
                }
            }
        });
    }
});

$(document).on('click', '#add-group', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-group=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add Group');
    });
});

$(document).on('click', '#add-contact, .addCDContact', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-contact=true", function (data) {

        HideLoader();
        launchOffCanvasPanel(data, 'Add Contact');
        $('#new_contact_form input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
        loadGoogleMapsApi(() => {
            initializeAutocomplete('new_contact_form', 'addr');
            initializeAutocomplete('new_contact_form', 'mailing_addr');
        });
    });
});

$(document).on('change', '#numberOflanes', function () {
    let numberOfLanes = parseInt($(this).val()) || 0;
    let container = $('#laneRowDiv');

    // If container isn't empty, confirm before clearing
    if (container.children().length > 0) {
        let confirmed = confirm('Changing the number of lanes will remove existing lane entries. Continue?');
        if (!confirmed) {
            // Reset the select/input back to previous value if needed
            $(this).val(container.children('.row').length);
            return;
        }
        container.empty();
    }

    // Generate lanes dynamically
    for (let i = 1; i <= numberOfLanes; i++) {
        let laneRow = `
        <div class="row mb-2">
            <div class="col-md-6 mb-3">
                <label for="pipelineLaneName${i}" id="pipelineLaneName${i}-label">Lane Name</label>
                <input class="form-control newPipelineName" data-original-label="pipelineLaneName${i}" id="pipelineLaneName${i}" name="pipelineLaneName${i}" type="text" required />
            </div>

            <div class="col-md-4 mb-3"> 
                <label for="pipelineLaneColor${i}">Lane Background Color</label>
                <input class="form-control" id="pipelineLaneColor${i}" name="pipelineLaneColor${i}" type="color" value="#ffffff" required />
            </div>

            <div class="col-md-2 mb-3"> 
                <label for="pipelineLaneOrder${i}">Lane Order</label>
                <input class="form-control" id="pipelineLaneOrder${i}" name="pipelineLaneOrder${i}" type="number" value="${i}" required />
            </div>
            <div class="col-md-12 mb-3">
                <label for="pipelineLaneStages${i}">Stages</label>
                <select class="form-control" id="pipelineLaneStages${i}" name="pipelineLaneStages${i}[]" multiple="multiple" required>
                    <option value="">Type Stage Name and Press Enter</option>
                </select>
            </div>
        </div>`;

        container.append(laneRow);
        $(`#pipelineLaneStages${i}`).select2({
            tags: true,
            placeholder: "Type Stage Name and Press Enter (Stages will be in the order you add them)"
        });
        $(`#pipelineLaneStages${i}`).on('select2:select', function (e) {
            let data = e.params.data;
            let values = $(this).val();
            let unique = [...new Set(values)];
            $(this).val(unique).trigger('change');
        });
    }
});

$(document).on('focusout blur paste', '.newPipelineName', function (event) {
    const originalLabel = $(this).data('original-label');
    const labelElementIdString = $(this).attr('id') + '-label';
    const labelElement = $('#' + labelElementIdString);
    if ($(this).val().trim() !== '') {
        labelElement.html($(this).val().trim());
    } else {
        labelElement.html(originalLabel);
    }
});

$(document).on('click', '#add-stage-element', function (event) {

    ShowLoader();
    val = $(this).attr('data-value');
    userId = $(this).data('userid');
    const newStage = $('#add-stage-element').closest('.stage-grid').parent().attr('data-stage');
    $.post("functions/functions.php", "add-stage-element=" + newStage + "&stage_pipeline=" + userId, function (data) {

        HideLoader();
        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Stage Element");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $('#qtpanel').offcanvas('show');

        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel"), tags: true
        });


    });
});

$(document).on('click', '#add-element', function (event) {

    ShowLoader();
    val = $(this).attr('data-value');
    const pipeline = $(this).data('pipeline');
    $.post("functions/functions.php", "add-element=" + val + "&pipelineName=" + pipeline, function (data) {

        HideLoader();
        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Stage Element");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $('#qtpanel').offcanvas('show');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
    });
});

$(document).on('submit', '#new_task_form_quickTool', function (e) {
    const form = $("#new_task_form_quickTool");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();
        $('#addTaskButton').prop('disabled', true);
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000, type: "POST", url: url, data: $("#new_task_form_quickTool").serialize(),

            beforeSend: function () {

                ShowLoader();
            }, success: function (data, result) {
                HideLoader();
                if (data && data.status === "Success") {
                    displayAlert(data.message, "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert(data.message, "error");
                } else {
                    displayAlert(data.message, "error");
                    setTimeout(location.reload.bind(location), 3000);

                }
            }
        });
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.

});

$(document).on('submit', '#zip_map_add', function (e) {
    const form = $("#zip_map_add");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        ShowLoader();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#zip_map_add").serialize() + '&add_zipcode_mapping=1',
            success: function (data, result) {
                if (data && data.status === "Mapping updated.") {
                    $('#add_mapping').prop('disabled', true);
                    displayAlert("Zip Code added succesfully.", "success")
                    $('#add_mapping').prop('disabled', false);
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Format") {
                    displayAlert("Please enter valid zip code (either single 5-digit zip or multiple zipcodes separed by comma or two zipcodes separated by hyphen)", "error");
                    HideLoader();
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all the required fields", "error");
                    HideLoader();
                } else {
                    displayAlert("Zipcode mapping failed.", "error");
                    HideLoader();
                    setTimeout(location.reload.bind(location), 1000);
                }
            }
        });

    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.
});

//flatpickr("#new_task_form #task_date", { enableTime: false, dateFormat: "Y-m-d H:i", minDate: 'today', allowInput: true, disableMobile: true });
$(document).on('click', '#new_task_form .btn-primary', function (e) {
    e.preventDefault();
    const form = $("#new_task_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        ShowLoader();
        $('#addTaskButton').prop('disabled', true);
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_task_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Success") {
                    displayAlert(data.message, "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else {
                    displayAlert(data.message, "error");
                    setTimeout(location.reload.bind(location), 3000);
                }
            },
        });
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.

});

$(document).on('click', '#edit_task_form .btn-primary', function (e) {

    e.preventDefault();
    const form = $("#edit_task_form");
    const formDataArray = $("#edit_task_form").serializeArray();
    let pipelineSelConValue = "";
    let stageSelValue = "";

    $.each(formDataArray, function (index, field) {
        if (field.name === "pipelineSelCon") {
            pipelineSelConValue = field.value;
        } else if (field.name === "stageSel") {
            stageSelValue = field.value;
        }
    });

    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        if ((pipelineSelConValue !== "" && stageSelValue !== "") || (pipelineSelConValue === "" && stageSelValue === "")) {
            e.preventDefault();
            ShowLoader();
            $('#edit_task_form .btn-primary').prop('disabled', true);
            const url = "functions/functions.php";
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: $("#edit_task_form").serialize(),
                success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "Success") {
                        displayAlert(data.message, "success");
                        setTimeout(location.reload.bind(location), 1000);
                    } else {
                        displayAlert(data.message, "error");
                        setTimeout(location.reload.bind(location), 1000);
                    }
                },
            });
        } else if (pipelineSelConValue !== "" && stageSelValue === "") {
            displayAlert("Please fill Stage", "error");
        }
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#new_invoice_form', function (e) {

    const form = $("#new_invoice_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_invoice_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Success") {

                    $('#new_invoice_form #addInvoiceButton').attr("disabled", "disabled").css("pointer-events", "none");
                    displayAlert("Invoice - " + data.data + " added Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status !== "Success") {
                    displayAlert(data.message, "error");
                }
            }
        });
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.
});
$(document).on('click', '.maxPanel', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'contactNotesMaxPanel') {
        $(this).parent().closest('div').eq(0).parent().parent().removeClass('col-md-6 col-sm-12').addClass('col-md-12 col-sm-12');
        $(this).parent().parent().parent().parent().children('.card-body').removeClass('height').css('height', '50hv');
        $(this).removeClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxPanel').addClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center minPanel');
        $(this).parent().parent().parent().parent().children('.card-body').animate({
            scrollTop: ($('#contactNotesMaxPanel').offset().top - 300)
        }, 2000);
    } else {
        $(this).parent().closest('div').eq(0).parent().parent().removeClass('col-md-6 col-sm-12').addClass('col-md-12 col-sm-12');
        $(this).removeClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxPanel').addClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center minPanel');
    }
});

$(document).on('click', '.minPanel', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'contactNotesMaxPanel') {
        $(this).closest('#contact_info_tab').removeClass('col-md-12 col-sm-12').addClass('col-md-4 col-sm-12');
        $(this).parent().closest('div').eq(0).parent().parent().removeClass('col-md-12 col-sm-12').addClass('col-md-6 col-sm-12');
        $(this).parent().parent().parent().parent().children('.card-body').removeClass('height').css('height', '300px');
        $(this).removeClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center minPanel').addClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxPanel');
        $(this).parent().parent().parent().parent().children('.card-body').animate({
            scrollTop: ($('#contactNotesMaxPanel').offset().top - 100)
        }, 2000);
    } else {
        $(this).parent().closest('div').eq(0).parent().parent().removeClass('col-md-12 col-sm-12').addClass('col-md-6 col-sm-12');
        $(this).removeClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center minPanel').addClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxPanel');
        $(this).closest('#contact_info_tab').removeClass('col-md-12 col-sm-12').addClass('col-md-4 col-sm-12');
    }
});

$(document).on('click', '.info_maxPanel', function (e) {
    e.preventDefault();

    $('#contact_info_tab').removeClass('col-md-4 col-sm-12').addClass('col-md-12 col-sm-12');
    $(this).parent().parent().parent().parent().children('.card-body').removeClass('height').css('height', '50hv');
    $(this).removeClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center info_maxPanel').addClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center info_minPanel');
    $(this).parent().parent().parent().parent().children('.card-body').animate({
        scrollTop: ($('#contactNotesMaxPanel').offset().top - 300)
    }, 2000);

});

$(document).on('click', '.info_minPanel', function (e) {
    e.preventDefault();

    $('#contact_info_tab').removeClass('col-md-12 col-sm-12').addClass('col-md-4 col-sm-12');
    $(this).removeClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center info_minPanel').addClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center info_maxPanel');
    $(this).parent().parent().parent().parent().children('.card-body').animate({
        scrollTop: ($('#contactNotesMaxPanel').offset().top - 100)
    }, 2000);

});

$(document).on('submit', '#new_user_form', function (e) {

    const form = $("#new_user_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        ShowLoader();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_user_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "User Added") {
                    displayAlert("User added Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === 'You do not have any available user licenses, please purchase additional licenses to add this user.') {
                    val = 'db17ccf3-a785-11ea-991f-000d3a7cbc3c';
                    $.ajax({
                        url: 'functions/functions.php',
                        type: "POST",
                        data: 'update-product=' + val,
                        dataType: "json",
                        success: function (data, result) {
                            if (data && data.status === "Got Data") {
                                $('#new_user_form').hide();
                                $('#new_user_form').before(`<h5 id="needAdditionalLicenses">You need to add an additional license to add this user</h5>` + data.data);
                            }
                            if (data && data.status !== "Got Data") {
                                displayAlert("Whoops! There was a problem generating that product information. Please try again, or contact Support.", "error")
                            }
                        }
                    })
                } else {
                    displayAlert(data.status, "error");
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#carrier_specific_fee', function () {
    if ($(this).is(':checked')) {
        $('#carrierSpecificSelect').show();
    } else {
        $('#carrierSpecificSelect').hide();
    }
});


$(document).on('change', '#new_user_form #non-system-user', function () {
    if ($(this).is(':checked')) {
        $('#new_user_form #new_user_pwd, #new_user_form #new_user_pwd_conf').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "none");
        $('#new_user_form #addUserButton').removeAttr("disabled");
    } else {
        $('#new_user_form #new_user_pwd, #new_user_form #new_user_pwd_conf').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
        if ($('#new_user_form #new_user_pwd').val() !== '' && $('#new_user_form #new_user_pwd_conf').val() !== '') {
            $('#new_user_form #addUserButton').removeAttr("disabled");
        } else {
            $('#new_user_form #addUserButton').attr("disabled", "disabled");
        }
    }
});

$(document).on('change', '#new_aqr_timing_waitForRenewal', function () {
    if ($(this).is(':checked')) {
        $('#maxWaitDiv').show();
        $('#new_aqr_timing_maxWaitUntil').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
    } else {
        $('#new_aqr_timing_maxWaitUntil').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "none")
        $('#new_aqr_timing_maxWaitUntil').val('');
        $('#maxWaitDiv').hide();
    }
});


$(document).on('change', '#cur-aqr-timing-iur', function () {
    if ($(this).is(':checked')) {
        $('#iurDIV').show();
        $('#cur-aqr-upd-webform').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
        $('#cur-aqr-timing-iur-st').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
        $('#cur-aqr-timing-iur-lt').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
    } else {
        $('#cur-aqr-upd-webform').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "");
        $('#cur-aqr-timing-iur-st').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "");
        $('#cur-aqr-timing-iur-lt').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "");
        $('#cur-aqr-timing-iur-lt').val('');
        $('#iurDIV').hide();
    }
});


$(document).on('change', '#cur-aqr-timing-waitForRenewal', function () {
    if ($(this).is(':checked')) {
        $('#maxWaitDiv').show();
        $('#cur-aqr-timing-maxWaitUntil').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
    } else {
        $('#cur-aqr-timing-maxWaitUntil').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "none")
        $('#cur-aqr-timing-maxWaitUntil').val('');
        $('#maxWaitDiv').hide();
    }
});

$(document).on('submit', '#new_contact_form', function (e) {
    const form = $("#new_contact_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {

        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000, type: "POST", url: url, data: $("#new_contact_form").serialize(), beforeSend: function () {

                ShowLoader();
            }, success: function (data, result) {
                HideLoader();
                if (data && data.status === "Contact Added Successfully, this page will refresh in a few seconds.") {
                    $('#new_contact_form  button').attr("disabled", "disabled").css("pointer-events", "none");
                    if (data.ContactId !== undefined && data.ContactId !== '' && data.ContactId !== 'undefined') {
                        window.location.href = "contact.php?Contact=" + data.ContactId;
                    } else {
                        displayAlert("Contact added Successfully, refreshing page in a moment.", "success");
                        setTimeout(location.reload.bind(location), 3000);
                    }


                } else if (data && data.status === "required") {
                    displayAlert("Please fill the required fields in their proper format.", "error");
                } else {
                    displayAlert("Whoops! There was a problem adding your contact, refreshing page. Please try again.", "error");
                    setTimeout(location.reload.bind(location), 3000);
                }
            }
        });
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', "#policy_billing_type, #policy_business_type, #add_vehicle_identification, #license_number ", function (e) {
    $(this).css('border', '');
});

$(document).on('submit', '#new_policy_form', function (e) {
    $('#add_policy').prop('disabled', true);
    $('#add_policy').hide();
    ShowLoader('Working on saving this Policy, please wait......');
    const form = $("#new_policy_form");
    let vinFlag;
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        $('#add_policy').prop('disabled', false);
        $('#add_policy').show();
        HideLoader();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        vinFlag = '';
        const name = $("#policy_named_ins").val().trim();
        const numb = $("#policy_number").val().trim();
        const lob = $("#policy_lob").val().trim();
        const eff = $("#policy_eff_date").val().trim();
        const exp = $("#policy_exp_date").val();
        const business = $("#policy_business_type").val();
        const billing = $("#policy_billing_type").val();
        const vin = $("#add_vehicle_identification").val();
        const license_number = $("#license_number").val();
        const prem = $("#policy_base_prem").val().trim();
        if (!billing) {
            $('#policy_billing_type').css('border', '1px solid red');
        } else {
            $('#policy_billing_type').css('border', '');
        }
        const effective_date = Date.parse(eff);
        const expire_date = Date.parse(exp);
        if (expire_date <= effective_date) {
            displayAlert("Expire date should be greater than effective date", "error");
            $('#add_policy').prop('disabled', true);
            $('#add_policy').show();
            $('#policy_exp_date').css('border', '1px solid red');
            return false;
        } else if (effective_date >= expire_date) {
            displayAlert("Effective date should be less than expiration date", "error");
            $('#add_policy').prop('disabled', true);
            $('#add_policy').show();
            $('#policy_eff_date').css('border', '1px solid red');
            return false;
        } else {
            $('#policy_exp_date').css('border', '');
            $('#policy_eff_date').css('border', '');
            $('#add_policy').hide();
            $('#add_policy').prop('disabled', true);
        }
        if (!business) {
            $('#policy_business_type').css('border', '1px solid red');
            $('#add_policy').show();
        } else {
            $('#policy_business_type').css('border', '');
            $('#add_policy').hide();
        }
        if (!numb || !name || !lob || !eff || !prem || !exp || !business || !billing || vinFlag === 'empty') {

            displayAlert("Please fill all required fields to continue.", "error")
            $('#add_policy').prop('disabled', false);
            $('#add_policy').show();
            return false;
        }

        const ContactId = GetURLParameter('Contact');
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'checkForPolicyDuplicate=true&num=' + numb + '&eff=' + eff + '&exp=' + exp + '&checkForPolicyDuplicateContact=' + ContactId,
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: $("#new_policy_form").serialize(),
                        success: function (data, result) {
                            HideLoader();
                            if (data && data.status === "Policy Added Successfully, this page will refresh in a few seconds.") {
                                displayAlert("Policy added Successfully, refreshing page in a moment.", "success")
                                setTimeout(location.reload.bind(location), 3000);
                            } else if (data && data.status === "Required") {
                                displayAlert("Please fill all the required fields", "error");
                                $('#add_policy').show();
                                $('#add_policy').prop('disabled', false);
                            } else {

                                displayAlert("Whoops! There was a problem adding your policy. Please try again.", "error");
                                $('#add_policy').show();
                                $('#add_policy').prop('disabled', false);

                            }
                        },
                        error: function () {
                            HideLoader();
                            displayAlert("Whoops! There was a problem adding your policy. Please try again.", "error");
                        }
                    });
                } else if (data && data.status === "Duplicate") {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
                        }, buttonsStyling: false
                    });

                    swalWithBootstrapButtons.fire({
                        title: 'Are you sure?',
                        text: "It looks like there is already a Policy with this information. Would you like to continue adding this Policy?",
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'Cancel',
                        reverseButtons: false
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.cancel) {
                            $('#add_policy').show();
                            $('#add_policy').prop('disabled', false);
                        } else {
                            $.ajax({
                                timeout: 10000,
                                type: "POST",
                                url: url,
                                data: $("#new_policy_form").serialize(),
                                success: function (data, result) {

                                    if (data && data.status === "Policy Added Successfully, this page will refresh in a few seconds.") {

                                        displayAlert("Policy added Successfully, refreshing page in a moment.", "success")

                                        setTimeout(location.reload.bind(location), 3000);
                                    } else if (data && data.status === "Required") {
                                        displayAlert("Please fill all the required fields", "error");
                                        $('#add_policy').show();
                                        $('#add_policy').prop('disabled', false);
                                    } else {

                                        displayAlert("Whoops! There was a problem adding your policy. Please try again.", "error")
                                        $('#add_policy').show();
                                        $('#add_policy').prop('disabled', false);

                                    }
                                }
                            });
                        }
                    });
                } else if (data && data.status === "Duplicate Not Owner") {
                    Swal.fire('Uh oh!', "This policy already exists in the system but is not showing your agency as the owner. Please contact your agency Admin to have this policy moved over.", 'info')
                }
            },
            error: function () {
                HideLoader();
                displayAlert("Whoops! There was a problem adding your policy. Please try again.", "error");
            }
        });

        // avoid to execute the actual submit of the form.
    }

    form.addClass('was-validated');


    return false; //for good measure
});

$(document).on('click', '.contactInfo', function (event) {
    event.preventDefault();
    if ($(this).hasClass('taskNotification')) {
        let count = $('.notificationCounterBadge')[0].innerText;
        count--;
        $('.notificationCounterBadge')[0].innerText = count;
        const task = $(this).attr('data-task');
        $.ajax({
            timeout: 10000,
            type: 'POST',
            url: 'functions/functions.php',
            data: 'notification_dismiss=' + task,
            success: function (response) {
                displayAlert("Task ID - " + task + " dismissed successfully", "success")
            }
        });
        val = $(this).attr('data-value');
        window.location = "contact.php?Contact=" + val;
    } else if ($(this).hasClass('potentialCallerMatch')) {
        val = $(this).attr('data-value');
        callId = $(this).attr('data-call-id');
        if (val !== '' && callId !== '') {
            const url = "functions/phone_functions.php";
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: 'associateCallToContact=' + val + '&associateCallId=' + callId,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        window.location = "contact.php?Contact=" + val;
                    }
                    if (data && data.status !== "Got Data") {
                        window.location = "contact.php?Contact=" + val;
                    }
                }
            });
        } else {
            if (val !== '') {
                window.location = "contact.php?Contact=" + val;
            } else {
                displayAlert("Contact not exist. Please Re-Associate policy with contact", "error");
            }
        }
    } else {
        val = $(this).attr('data-value');
        const currentPage = window.location.pathname.split("/").pop();
        if (val !== '') {
            if (currentPage === "re-shop.php" || currentPage === "ivans-portal.php") {
                window.open("contact.php?Contact=" + val, "_blank");
            } else {
                window.location = "contact.php?Contact=" + val;
            }
        } else {
            displayAlert("Contact not exist. Please Re-Associate policy with contact", "error");
        }
    }
    HideLoader();
    return false;
});


$(document).on('click', '.policyInfo', function (event) {
    event.preventDefault();
    ShowLoader("Please wait, redirecting you to that Policy");
    const val = $(this).attr('data-value');
    const url = "policy.php?Policy=" + val;
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "re-shop.php" || currentPage === "ivans-portal.php") {
        window.open(url, "_blank");
    } else {
        window.location = url;
    }
    HideLoader();
    return false;
});


$(document).on('click', '.requeueReshop', function (event) {
    val = $(this).attr('data-value');
    agency = $(this).data('agency');
    $.ajax({
        timeout: 10000,
        type: 'POST',
        url: 'functions/functions.php',
        data: 'reQueueReshop=' + val + '&reQueueReshop_agency=' + agency,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                Swal.fire('Ok!', "This policy will go back into the queue to be re-shopped with tomorrow's daily process. Please wait while we refresh the page.", 'success')
                setTimeout(function () {
                    location.reload();
                }, 3000);
            } else {
                Swal.fire('Whoops!', "That did not work, please try again or contact support for assistance.", 'error')
            }
        }
    });

});


$(document).on('click', '#createReShopProposal', function (e) {
    $('#reshop-row-div').hide();
    $('#proposal-row-div').show();
    $(this).attr('id', 'cancelCreateReShopProposal');
    $(this).html('Cancel Proposal Creation');
    $(this).addClass('btn-danger').removeClass('btn-primary');
});

$(document).on('click', '#cancelCreateReShopProposal', function (e) {
    $('#proposal-row-div').hide();
    $('#reshop-row-div').show();
    $(this).attr('id', 'createReShopProposal');
    $(this).html('Create Proposal');
    $(this).addClass('btn-primary').removeClass('btn-danger');
});

$(document).on('change', '.reshopQuoteSelector', function () {
    let any = false;
    $('.reshopQuoteSelector').each(function () {
        const v = $(this).val();
        if (Array.isArray(v)) {
            for (let i = 0; i < v.length; i++) {
                if (v[i] && String(v[i]).trim() !== '') {
                    any = true;
                    break;
                }
            }
        } else if (v && String(v).trim() !== '') {
            any = true;
        }
        if (any) return false; // break .each
    });
    $('#createReShopProposal').prop('disabled', !any);
    $('#createReShopQuoteSummary').prop('disabled', !any);

    const $h5 = $(this).closest('th').find('h5').first();
    if (!$h5.length) return;

    const val = $(this).val();
    const hasValue = Array.isArray(val) ? val.some(function (x) {
        return x && String(x).trim() !== '';
    }) : (val && String(val).trim() !== '');

    if (hasValue) {
        const text = $(this).find('option:selected').first().text().trim();
        const parts = text.split(' - ');
        const carrier = $.trim(parts[0] || text);
        $h5.text(carrier);
    } else {
        const id = this.id || '';
        const m = id.match(/^([A-Za-z]+)(\d+)$/);
        let label;
        if (m) {
            label = m[1].charAt(0).toUpperCase() + m[1].slice(1) + ' ' + m[2];
        } else {
            label = id.replace(/[_-]+/g, ' ');
            if (label) label = label.charAt(0).toUpperCase() + label.slice(1);
        }
        $h5.text(label || '');
    }
});


$(document).on('click', '#savePolicyToolBar', function (e) {
    $('#upd_policy_form').trigger('submit');
});

$(document).on('submit', '#upd_policy_form', function (e) {
    const form = $("#upd_policy_form");

    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        const name = $("#upd_named").val();
        const numb = $("#upd_policy_num").val();
        const lob = $("#upd_lob").val();
        //var bind = $("#upd_bind").val();
        const eff = $("#upd_eff").val();
        const exp = $("#upd_exp").val();
        const prem = $("#upd_base_prem").val();
        const business = $("#upd_business_type").val();
        const billing = $("#upd_billing_type").val();
        const effective_date = Date.parse(eff);
        const expire_date = Date.parse(exp);
        if (expire_date <= effective_date) {
            displayAlert("Expire date should be greater than effective date", "error");
            $('.updPolicy').prop('disabled', true);
            $('#upd_exp').css('border', '1px solid red');
            return false;
        } else if (effective_date >= expire_date) {
            displayAlert("Effective date should be less than expiration date", "error");
            $('.updPolicy').prop('disabled', true);
            $('#upd_eff').css('border', '1px solid red');
            return false;
        } else {
            $('#upd_exp').css('border', '');
            $('#upd_eff').css('border', '');
            $('.updPolicy').prop('disabled', true);
        }
        if (!billing) {
            $('#upd_billing_type').css('border', '1px solid red');
        } else {
            $('#upd_billing_type').css('border', '');
        }
        if (!business) {
            $('#upd_business_type').css('border', '1px solid red');
        } else {
            $('#upd_business_type').css('border', '');
        }
        if (!numb || !name || !lob || !eff || !prem || !exp || !billing || !business) {
            displayAlert("Please fill all required fields to continue.", "error")

            return false;
        }
        $(this).find("input.addNI").each(function () {
            const niid = $(this).data('niid');
            if (niid !== undefined) {
                const currentValue = $(this).val();
                $(this).val(currentValue + '|' + niid);
            }
        });
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
            }, buttonsStyling: false
        });
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#upd_policy_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Policy Updated") {
                    displayAlert("Policy Updated Successfully. Refreshing Page in a moment", "success")

                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);

                } else if (data.status === "Duplicate") {
                    const PolicyId = data?.duplicatePolicy ?? undefined;
                    if (PolicyId !== '' && PolicyId !== undefined) {
                        swalWithBootstrapButtons.fire({
                            title: 'Duplicate Entry Found',
                            text: "We are unable to process your request. There is already a Policy in the system with this information.",
                            icon: 'error',
                            showCancelButton: true,
                            confirmButtonText: 'Open Policy Found',
                            cancelButtonText: 'Cancel',
                            reverseButtons: false
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.cancel) {
                            } else {
                                window.location.href = `policy.php?Policy=${PolicyId}`;
                            }
                        })
                    } else {
                        swalWithBootstrapButtons.fire({
                            title: 'Duplicate Entry Found',
                            text: "We are unable to process your request. There is already a Policy in the system with this information.",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ok',
                            reverseButtons: false
                        });
                    }
                    return false;
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all the required fields", "error");
                } else {
                    displayAlert("Whoops! There was a problem updating your policy. Please try again.", "error")

                }
            },
            error: function (xhr, status, error) {
                displayAlert("There was a problem while saving the changes. Please try again, or contact Support.", "error");
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.updUser', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "upd_user=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Update User');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating that user. Please try again.", "error")

            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.listView', function (event) {
    $(".listContacts").show();
    $(".gridContacts").hide();
    $(".deletedContactList").show();
    $(".hiddenContactGrid").hide();
    $(".hiddenContactList").show();
    $(".deletedContactGrid").hide();
    $(".listView").addClass('active');
    $(".gridView").removeClass('active');
    const dataToStore = "listView";
    localStorage.setItem("contactListView", dataToStore);
});

$(document).on('click', '.gridView', function (event) {
    $(".listContacts").hide();
    $(".gridContacts").show();
    $(".deletedContactList").hide();
    $(".deletedContactGrid").show();
    $(".hiddenContactList").hide();
    $(".hiddenContactGrid").show();
    $(".gridView").addClass('active');
    $(".listView").removeClass('active');
    const dataToStore = "gridView";
    localStorage.setItem("contactListView", dataToStore);
});

$(document).on('click', '#edit_policy', function (event) {
    ShowLoader();
    event.preventDefault();
    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'edit_policy=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#policyData-div').html(data.data);
                $('#upd_policy_form input').attr('readonly', true);
                $('#upd_policy_form select').prop('disabled', true);
                $('#upd_policy_form textarea').attr('readonly', true);
                $("#upd_policy_form select").prop('disabled', true);
                if ($('#upd_policy_form .stageSel').val() === '') {
                    $('#upd_policy_form .stageSel').prop('disabled', true);
                }
                HideLoader();
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating your policy. Please try again.", "error");
                HideLoader();
            }
        }
    })
    return false; //for good measure
});
$(document).on('click', '#viewContactButton', function (event) {
    $('#upd_contact_form input').attr('readonly', true);
    $('#upd_contact_form select').prop('disabled', true);
    $('#upd_contact_form textarea').attr('readonly', true);
    $('#contactEditPanel').show();
    $('#editContactButton').show();
    $('.contactPanel').hide();
});
$(document).on('click', '#editPolicy', function (event) {
    $('#upd_policy_form input').not('#carrier_fees, #total_premium').attr('readonly', false);
    $('#upd_policy_form select').prop('disabled', false);
    $('.updPolicy').prop('disabled', false);
    $('#addVehicle').prop('disabled', false);
    $('#addDriver1').prop('disabled', false);
    $('.updPolicy').prop('disabled', false);
    $('#upd_policy_form textarea').attr('readonly', false);
    $('.custom-select2 select,.form-select').select2({
        theme: "bootstrap-5", width: '100%', placeholder: "Please Select"

    });
    $('#upd_policy_form input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
    $('#upd_c_assoc').prop('disabled', true);
    if ($('#upd_policy_form .stageSel').val() === '') {
        $('#upd_policy_form .stageSel').prop('disabled', true);
    }
    if ($('#upd_policy_status').val() === "Active" || $('#upd_policy_status').val() === "Renewed") {
        $('.pipelineSelCon').prop('disabled', false);

    } else {
        $('.pipelineSelCon').val('Please Select').trigger('change');
        $('.pipelineSelCon').prop('disabled', true);
    }
    $('#carrier_fees, #total_premium').attr('readonly', true);
    $('.addCarrierFee').attr('disabled', false);
    $('.addEndorsement').attr('disabled', false);
    $('#carrier_fees, #total_premium').attr('readonly', true);
    $('#upd_policy_form input').not('#carrier_fees, #total_premium').attr('readonly', false);
    $('#upd_policy_form select').attr('readonly', false);
    $('#upd_policy_form textarea').attr('readonly', false);
    $('.removeNamedIns').removeAttr('disabled');
    $('.addNamedIns').removeAttr('disabled');
    $('.addCarrierFee').attr('disabled', false);
    $('.addEndorsement').attr('disabled', false);
    $(this).attr('id', 'savePolicyToolBar');  // Updates the id attribute
    $(this).attr('data-bs-original-title', 'Save Policy');
    $(this).attr('aria-label', 'Save Policy');
    $(this).html(`<i class="mdi mdi-content-save font-size-16"></i>`);     // Updates the inner HTML of the button


});
$(document).on('click', '#overviewContactButton', function (event) {
    $('#contactEditPanel').hide();
    $('#sendqbot-div').hide();
    $('.contactPanel').show();
});

$(document).on('click', '.addPolicy', function (event) {
    val = $(this).attr('data-value');
    $.post("functions/functions.php", "add-policy=true&ContactId=" + val, function (data) {

        if (data !== "fail") {
            $('#add_policy_panel').html(data);
            $('#add_policy_panel').show();
            $('#contactEditPanel').hide();
            $('.contactPanel').hide();
            $('.form-select').select2({
                theme: "bootstrap-5", width: '100%'
            });
            $('input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            $("#add_policy").removeClass('disabled');
        } else {
            displayAlert("Policy cannot be added for deleted/hidden contact", "error");
        }
    });

});

$(document).ready(function () {
    $('.form-select').select2({
        theme: "bootstrap-5", width: '100%'
    });
    $(".topLink").on('click', function (event) {
        event.preventDefault();
        const e = $(this);
        const t = $("div[data-target='" + e.attr('data-target') + "']"); //same as above

        if (e.attr('data-target') === 't1') {
            if (e.hasClass('active')) {

            } else {

                var dataTable = $('#quick-task-grid-quoted').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-quoted.php", // json datasource

                });

                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }
        if (e.attr('data-target') === 't2') {
            if (e.hasClass('active')) {
            } else {
                // Setup - add a text input to each footer cell
                var dataTable = $('#quick-task-grid-verified').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-verified.php", // json datasource

                });
                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }
        if (e.attr('data-target') === 't3') {
            if (e.hasClass('active')) {
            } else {
                // Setup - add a text input to each footer cell
                var dataTable = $('#quick-task-grid-new').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-new.php", // json datasource


                });

                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }

        if (e.attr('data-target') === 't4') {
            if (e.hasClass('active')) {
            } else {
                var dataTable = $('#quick-task-grid-clients').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-clients.php", // json datasource

                });
                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }
        if (e.attr('data-target') === 't1-sales') {
            if (e.hasClass('active')) {

            } else {
                var dataTable = $('#quick-task-grid-quoted').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-quoted.php", // json datasource

                });

                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }
        if (e.attr('data-target') === 't2') {
            if (e.hasClass('active')) {
            } else {
                // Setup - add a text input to each footer cell
                var dataTable = $('#quick-task-grid-verified').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-verified.php", // json datasource

                });
                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }
        if (e.attr('data-target') === 't3-sales') {
            if (e.hasClass('active')) {
            } else {
                // Setup - add a text input to each footer cell
                var dataTable = $('#quick-task-grid-new').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-new.php", // json datasource


                });

                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }

        if (e.attr('data-target') === 't4-sales') {
            if (e.hasClass('active')) {
            } else {
                var dataTable = $('#quick-task-grid-clients').DataTable({
                    responsive: {
                        details: {
                            renderer: function (api, rowIdx) {
                                const data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
                                    const header = $(api.column(cell.column).header());
                                    return '<p style="color:#00A">' + header.text() + ' : ' + api.cell(cell).data() + '</p>';
                                }).toArray().join('');

                                return data ? $('<table/>').append(data) : false;
                            }
                        }
                    },
                    processing: true,
                    bDeferRender: true,
                    bDestroy: true,
                    serverSide: true,
                    autowidth: false,
                    errMode: 'none',
                    "sDom": "Rlrtip",
                    searchDelay: 700,
                    ajax: "quick-task-grid-data-clients.php", // json datasource

                });
                yadcf.init(dataTable, [{
                    column_number: 0,
                    filter_type: "auto_complete",
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }, {
                    column_number: 1,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new"
                }, {
                    column_number: 2,
                    style_class: "form-control",
                    reset_button_style_class: "btn btn-primary btn-xs btn-new",
                    sort_as: "alpha",
                    sort_order: "asc"
                }]);
            }
        }
        if (e.hasClass('active')) {
            //remove from this
            e.removeClass("active");
            //close box    
            t.slideUp("slow");
        } else { //toggle menu when clicking on some other link
            //remove from everywhere
            $(".topLink").removeClass('active');
            //slide every box up
            $('.toggles').slideUp("slow");
            //add to this only
            e.addClass('active');
            //slide associated box down
            t.slideDown("slow");
        }
    });
});

$(document).ready(function () {
    $(".topLink-right").on('click', function (event) {
        event.preventDefault();
        const e = $(this);
        t = $("div[data-target='tqt']"); //same as above
        if (e.hasClass('active')) {
            //remove from this
            e.removeClass("active");
            //close box
            t.slideUp("slow");
        } else { //toggle menu when clicking on some other link
            //remove from everywhere
            $(".topLink").removeClass('active');
            //slide every box up
            $('.toggles').slideUp("slow");
            //add to this only
            e.addClass('active');
            //slide associated box down
            t.slideDown("slow");
        }
    });
});


$(document).on('submit', '.quick_task_form', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: $(this).serialize(), success: function (data, result) {
            if (data && data.status === "Task Added Successfully, this page will refresh in a few seconds.") {
                displayAlert("Task Added Successfully, this page will refresh in a few seconds.", "success")
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Task Added Successfully, this page will refresh in a few seconds.") {
                displayAlert("Whoops! There was a problem adding your task, refreshing page. Please try again.", "error")
                setTimeout(location.reload.bind(location), 3000);
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.notesText', function (event) {
    event.preventDefault();
    const fullNote = $(this).attr('data-bs-original-title');
    const regex = /<br\s*[\/]?>/gi;
    $('body').append('<textarea id="clipBoardTemp" style="display:none;">' + fullNote + '</textarea>');
    const fN = document.getElementById('clipBoardTemp');
    fN.select();
    fN.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(fN.value.replace(regex, "\n")).then(() => {
        $('#clipBoardTemp').remove();
        $('#noteTextTempBody').html(fullNote);
    }).catch(err => {
    });

    displayAlert("Note Text has been copied to your clipboard.", "success");
});

$(document).on('click', '.copyNote', function (event) {
    event.preventDefault();
    const fullNote = $(this).attr('data-value');
    const regex = /<br\s*[\/]?>/gi;
    $('body').append('<textarea id="clipBoardTemp" style="display:none;">' + fullNote + '</textarea>');
    const fN = document.getElementById('clipBoardTemp');
    fN.select();
    fN.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(fN.value.replace(regex, "\n")).then(() => {
        $('#clipBoardTemp').remove();
        $('#noteTextTempBody').html(fullNote);
    }).catch(err => {
    })

    displayAlert("Note Text has been copied to your clipboard.", "success");
});


$(document).on('click', '.viewAllDes', function (event) {
    $(this).parent('.conTasksDes').hide();
    $(this).parent().siblings(".conTasksDesMore").show();
});
$(document).on('click', '.viewLessDes', function (event) {
    $(this).parent('.conTasksDesMore').hide();
    $(this).parent().siblings(".conTasksDes").show();
});

$(document).on('click', '.contactNotesLess', function (event) {
    $(this).parent('.contactNotesMoreDiv').hide();
    $(this).parent().siblings(".contactNotesLessDiv").show();
});
$(document).on('click', '.contactNotesMore', function (event) {
    $(this).parent('.contactNotesLessDiv').hide();
    $(this).parent().siblings(".contactNotesMoreDiv").show();
});


$(document).on('click', '.quotedHome', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'quoted_home=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Saved quoting information.", "success")
                $('#qHome').html('Home: ' + data.data);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating your contact. Please try again.", "error")
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.quotedHealth', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'quoted_health=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Saved quoting information.", "success")
                $('#qHealth').html('Health: ' + data.data);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating your contact. Please try again.", "error")
            }
        }
    })
    return false; //for good measure
});


$(document).on('click', '.quotedLife', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'quoted_life=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Saved quoting information.", "success")
                $('#qLife').html('Life: ' + data.data);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating your contact. Please try again.", "error")
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.quotedAuto', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'quoted_auto=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Saved quoting information.", "success");
                $('#qAuto').html('Auto: ' + data.data);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating your policy. Please try again.", "error");
            }
        }
    })
    return false; //for good measure
});
$(document).on('submit', '#global_filters', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#global_filters").serialize(),
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Filters applied, please wait while we reload the page.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem setting that filter. Please try again.", "error");
            }
        }
    })
    return false; //for good measure
});

$(document).on('submit', '#new_group_form', function (e) {
    const form = $("#new_group_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_group_form").serialize(),
            success: function (data, result) {
                HideLoader();

                if (data && data.status === "Group Added") {
                    displayAlert("Group added Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill the required fields", "error");
                } else {
                    displayAlert("Whoops! Adding that Group failed, please try again.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

const checkVehEdit = (type, id) => {
    return (type > 0) ? "<div role='group' class='custom-btn-group text-nowrap'><button  data-value='" + type + "|" + id + "' class='btn btn-sm btn-primary editQRVehicle' type='submit' ><i class='far fa-edit'></i></button><button class='btn btn-sm btn-danger delVehicle' data-value='" + id + "' type='submit'><i class='far fa-trash-alt'></i></button></div>" : " ";
}
const checkDriverEdit = (type, id) => {
    return (type > 0) ? "<div role='group' class='custom-btn-group text-nowrap'><button  data-value='" + type + "|" + id + "' class='btn btn-sm btn-primary editQRDriver' type='submit' ><i class='far fa-edit'></i></button><button class='btn btn-sm btn-danger delDriver' data-value='" + id + "' type='submit'><i class='far fa-trash-alt'></i></button></div>" : " ";
}
const checkMemberType = (type, id) => {
    return (type > 0) ? "<div class='form-check form-switch'><input type='checkbox' class='  form-check-input' name='grp_member[]' data-tp='" + type + "'  value='" + id + "' checked></div>" : "<div class='form-check form-switch'><input type = 'checkbox' class = 'form-check-input' name = 'grp_member[]'  data-tp='" + type + "' value = '" + id + "'></div>";
}
const checkPermType = (type, id) => {
    return (type < 1) ? "<div class='form-check form-switch'><input type='checkbox' class='  form-check-input' name='permUpd[]' data-tp='" + type + "'  value='" + id + "' ></div>" : "<div class='form-check form-switch'><input type = 'checkbox' class = 'form-check-input' name = 'permUpd[]'  data-tp='" + type + "' value = '" + id + "' checked></div>";
}
const checkId = (type, id) => {
    return (type > 0) ? "<a value = '" + type + "'>" + id + "</div>" : "<div></div>";
}

let permTable = null;
let groupUsersTable = null;
$(document).on('click', '.editGroup', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'edit_group=' + val,
        dataType: "json",
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Update Group');
                permTable = $('#permGrid-table table').dataTable({
                    preDrawCallback: function (settings, json) {
                        addClassToDatatable();
                    }
                });
                groupUsersTable = $('#usersGrid-table table').dataTable({
                    preDrawCallback: function (settings, json) {
                        addClassToDatatable();
                    },
                });
            } else {
                displayAlert("Whoops! There was some problem retrieving your group information. Please try again or contact support.", "error")
            }
        },
        error: function (xhr, status, error) {
            HideLoader();
            displayAlert("There was some problem retrieving Group Information. Please try again or contact support.", "error");
        },
        complete: function () {
            HideLoader();
        }
    })
    return false; //for good measure
});

$('#flush-collapseTwo').on('shown.bs.collapse', function () {
    $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
});

$(document).on('click', '.delGroup', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    row = $(this).closest('tr');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'del_group=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Group Deleted Successfully.", "success");
                row.remove();
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem deleting your group. Please try again.", "error");
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '#updateGroupPermissions', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const groupId = $('#upd_group_perms_form input[name="group_id"]').val();
    // grab only the permUpd[] inputs inside your datatable
    const permData = $('input[name="permUpd[]"]').serialize();

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: permData + '&group_id=' + encodeURIComponent(groupId),
        beforeSend: ShowLoader,
        success: function (data) {
            if (data?.status === "success") {
                displayAlert("Permissions Updated Successfully.", "success");
                emptyAndCloseOffCanvasPanel();
            } else if (data?.status === "not_fully_updated") {
                displayAlert("Whoops! Some records didn't get updated. Please try again or contact support.", "error");
            } else {
                displayAlert("Whoops! There was a problem updating group permissions. Please try again or contact support.", "error");
            }
        },
        error: function () {
            displayAlert("There was some problem updating Group permissions. Please try again or contact support.", "error");
        },
        complete: HideLoader
    });

    return false;
});

$(document).on('submit', '#updMembers', function (e) {
    e.preventDefault();
    const url = "functions/functions.php",
        groupId = $('#updMembers input[name="group_id"]').val(), // grab only the grp_member[] inputs
        memberData = $('input[name="grp_member[]"]').serialize();

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: memberData + '&group_id=' + encodeURIComponent(groupId) + '&action=updateGroupMembers',
        beforeSend: ShowLoader,
        success: function (data) {
            if (data?.status === "success") {
                displayAlert("Members Updated Successfully.", "success");
                emptyAndCloseOffCanvasPanel();
            } else {
                displayAlert("Whoops! There was a problem updating members of this group. Please try again or contact support.", "error");
            }
        },
        error: function () {
            displayAlert("Oops! There was an error while updating members of the group. Please try again later or contact support.", "error");
        },
        complete: HideLoader
    });

    return false;
});


$(document).on('submit', '#upd_group_info_form', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#upd_group_info_form").serialize(),
        success: function (data, result) {
            if (data && data.status === "Group Info Updated") {
                displayAlert("Group Information Updated Successfully.", "success")
                emptyAndCloseOffCanvasPanel();
            }
            if (data && data.status !== "Group Info Updated") {
                displayAlert("Whoops! Updating the group information failed, please try again.", "error");
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});
$(document).on('click', '#updUserButton', function (e) {
    const form = $("#upd_user_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        $('#deleteUserButton').attr('disabled', true);
        $('#reActivateUserButton').attr('disabled', true);
        $('#updUserButton').attr('disabled', true);
        const url = "functions/functions.php";
        const checker = checkUserPass();
        if (checker === true) {

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: $("#upd_user_form").serialize(),
                success: function (data, result) {
                    if (data && data.status === "User Updated") {
                        displayAlert("User Updated Successfully.", "success")
                        emptyAndCloseOffCanvasPanel();
                    }
                    if (data && data.status !== "User Updated") {
                        displayAlert("Whoops! There was a problem updating this user. Please try again.", "error");
                        $('#deleteUserButton').attr('disabled', false);
                        $('#reActivateUserButton').attr('disabled', false);
                        $('#updUserButton').attr('disabled', false);
                    }
                }
            });
            $('#deleteUserButton').attr('disabled', false);
            $('#reActivateUserButton').attr('disabled', false);
            $('#updUserButton').attr('disabled', false);
        } else {
            Swal.fire('Uh Oh!', "Your passwords must match to update them. Please try again!", 'error')
            $('#deleteUserButton').attr('disabled', false);
            $('#reActivateUserButton').attr('disabled', false);
            $('#updUserButton').attr('disabled', false);

        }
    }
    form.addClass('was-validated');
    $('#deleteUserButton').attr('disabled', false);
    $('#reActivateUserButton').attr('disabled', false);
    $('#updUserButton').attr('disabled', false);
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#deleteUserButton', function (event) {
    event.preventDefault();
    $('#deleteUserButton').attr('disabled', true);
    $('#reActivateUserButton').attr('disabled', true);
    $('#updUserButton').attr('disabled', true);
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete this user?',
        icon: 'warning',
        html: '<div class="form-check"><input class="form-check-input" type="checkbox" id="updUserLicenseCount" checked/><label class="form-check-label" for="updUserLicenseCount">Update User License Count</label></div>',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {
            var result = {
                value: $("#updUserLicenseCount").val()
            }
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'del_user=' + val + '&updUserLicenseCount=' + result.value,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("User deleted successfully.", "success");
                        emptyAndCloseOffCanvasPanel();
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem deleting that user. Please try again.", "error");
                        $('#deleteUserButton').attr('disabled', false);
                        $('#reActivateUserButton').attr('disabled', false);
                        $('#updUserButton').attr('disabled', false);
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {
            $('#deleteUserButton').attr('disabled', false);
            $('#reActivateUserButton').attr('disabled', false);
            $('#updUserButton').attr('disabled', false);
        }
    })
});

$(document).on('click', '#nsuUserButton', function (event) {
    event.preventDefault();
    $('#deleteUserButton').attr('disabled', true);
    $('#reActivateUserButton').attr('disabled', true);
    $('#updUserButton').attr('disabled', true);
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to mark this user as a Non-System User?',
        icon: 'warning',
        html: '<div class="form-check"><input class="form-check-input" type="checkbox" id="updUserLicenseCount" checked/><label class="form-check-label" for="updUserLicenseCount">Update User License Count</label></div>',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {
            var result = {
                value: $("#updUserLicenseCount").val()
            }
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'nsu_user=' + val + '&updUserLicenseCount=' + result.value,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("User updated successfully. Refreshing page.", "success");
                        emptyAndCloseOffCanvasPanel();
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem updating that user. Please try again.", "error");
                        $('#deleteUserButton').attr('disabled', false);
                        $('#reActivateUserButton').attr('disabled', false);
                        $('#updUserButton').attr('disabled', false);
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {
            $('#deleteUserButton').attr('disabled', false);
            $('#reActivateUserButton').attr('disabled', false);
            $('#updUserButton').attr('disabled', false);
        }
    })
});

$(document).on('click', '#undeleteUserButton', function (event) {
    event.preventDefault();
    $('#deleteUserButton').attr('disabled', true);
    $('#reActivateUserButton').attr('disabled', true);
    $('#updUserButton').attr('disabled', true);
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to re-activate this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, re-activate it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'undelete_user=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("User re-activated successfully. Refreshing page.", "success");
                        window.location = "agency-profile.php";
                        // setTimeout(location.reload.bind(location), 3000);
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem re-activating that user. " + data.status, "error");
                        $('#deleteUserButton').attr('disabled', false);
                        $('#reActivateUserButton').attr('disabled', false);
                        $('#updUserButton').attr('disabled', false);
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {
            $('#deleteUserButton').attr('disabled', false);
            $('#reActivateUserButton').attr('disabled', false);
            $('#updUserButton').attr('disabled', false);
        }
    })
});

$(document).on('click', '#reActivateUserButton', function (event) {
    event.preventDefault();
    $('#deleteUserButton').attr('disabled', true);
    $('#reActivateUserButton').attr('disabled', true);
    $('#updUserButton').attr('disabled', true);
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to re-activate this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, re-activate it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'reactivate_user=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("User re-activated successfully. Refreshing page.", "success");
                        window.location = "agency-profile.php";
                    } else if (data && data.status === 'You do not have any available user licenses, please purchase additional licenses to add this user.') {
                        val = 'db17ccf3-a785-11ea-991f-000d3a7cbc3c';
                        $.ajax({
                            url: 'functions/functions.php',
                            type: "POST",
                            data: 'update-product=' + val,
                            dataType: "json",
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {
                                    $('#upd_user_form').hide();
                                    $('#upd_user_form').before(`<h5 id="needAdditionalLicenses">You need to add an additional license to add this user</h5>` + data.data);
                                }
                                if (data && data.status !== "Got Data") {
                                    displayAlert("Whoops! There was a problem generating that product information. Please try again, or contact Support.", "error")
                                }
                            }
                        })
                    } else {
                        displayAlert("Whoops! There was a problem re-activating that user. " + data.status, "error");
                        $('#deleteUserButton').attr('disabled', false);
                        $('#reActivateUserButton').attr('disabled', false);
                        $('#updUserButton').attr('disabled', false);
                    }
                }
            })

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            $('#deleteUserButton').attr('disabled', false);
            $('#reActivateUserButton').attr('disabled', false);
            $('#updUserButton').attr('disabled', false);
        }
    })
});

$(document).on('click', '#saveTemp', function (event) {
    event.preventDefault();
    camp_type = $('#email_campaign_select').val();
    camp = $('#email_campaign_template_select').val();
    temp_text = $('#template_text').val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'save_temp=true&campaign=' + camp_type + '&template_text=' + temp_text,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#policy_info_panel').html(data.data);
                $('#side-panel-title').html('Add New Template');
                $('#side-panel-toggle').trigger('click');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was adding your template. Please try again.", "error");
            }
        }
    })
    return false; //for good measure
});
$(document).on('submit', '#addTemp', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: $("#addTemp").serialize(), success: function (data, result) {
            if (data && data.status === "Template Added Successfully, this page will refresh in a few seconds.") {
                displayAlert("Template added Successfully, refreshing page in a moment.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Template Added Successfully, this page will refresh in a few seconds.") {
                displayAlert("Whoops! There was a problem adding your template, refreshing page. Please try again.", "error");
                setTimeout(location.reload.bind(location), 3000);
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#contact_support_form', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#contact_support_form").serialize(),
        success: function (data, result) {
            if (data && data.status === "Successful") {
                displayAlert("Support Ticket Submitted Successfully. Ticket ID- " + data.data + ", this page will refresh in a few seconds.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Successful") {
                displayAlert("Whoops! There was a problem submitting your support ticket, refreshing page. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', 'a#ticket_info', function (event) {
    val = $(this).attr('data-value');
    $.post("functions/functions.php", "upd_ticket_id=" + val, function (data) {
        if (data && data.status === "Got Data") {
            $('#policy_info_panel').html(data.data);
            $('#side-panel-title').html('Update Ticket');
            $('#side-panel-toggle').trigger('click');
            $("#policy_info_panel input[placeholder]").placeholderLabel({
                labelColor: "##497cb1", inInput: true, labelSize: "8px"
            });
            const acc = document.getElementsByClassName("accordion");
            let i;

            for (i = 0; i < acc.length; i++) {
                acc[i].onclick = function () {
                    this.classList.toggle("active");
                    this.nextElementSibling.classList.toggle("show");
                }
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem fetching your support ticket, refreshing page. Please try again.", "error");
            }
        }
    });
});

$(document).on('submit', '#upd_contact_support_form', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#upd_contact_support_form").serialize(),
        success: function (data, result) {
            if (data && data.status === "Successful") {
                displayAlert("Support Ticket Updated Successfully. This page will refresh in a few seconds.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Successful") {
                displayAlert("Whoops! There was a problem updating your support ticket, refreshing page. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#new_integration_form select[name="int_type"], #new_integration_form select[name="int_comp"]', function () {
    ShowLoader();
    if ($(this).attr('id') === 'int_type') {
        $('#intCompanyDiv').html('');
        $('#intCompanyDiv').hide();
    }
    const integration_type = $('#new_integration_form select[name="int_type"]').val();
    const integration_company = $('#new_integration_form select[name="int_comp"]').val();
    if (integration_company !== '' && integration_company !== 'undefined' && integration_company !== undefined) {
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: "functions/functions.php",
            dataType: "json",
            data: {
                'integration_type': integration_type,
                'integration_company': integration_company,
                'get_integration_info': true
            },
            success: function (data, result) {
                HideLoader();

                if (data && data.status === "No Integration") {
                    $('#new_integration_form input[name="ip_id"]').val("");
                    $('#new_integration_form input[name="ip_secret"]').val("");
                    $('#addIntegrationButton').text("Add Integration");
                    if ($('select[name=int_comp]').val() === '1') {
                        if ($('#qrAdminPasswordDiv').length > 0) {

                        } else {
                            $('#addIntegrationButton').parent().before('<div class="col-md-12 col-sm-12 col-xs-12 intCredentials" style="display:none;" id="qrAdminPasswordDiv"><label class="control-label">QuoteRUSH Admin Password</label><input name="qr-adminPassword" class="form-control" type="password" required /></div>');
                        }
                    }
                    $('.intCredentials').show();
                } else if (data && data.status === 'Has Integration') {
                    if (data.data && data.data !== '') {
                        $('#intCompanyDiv').hide();
                        $('#new_integration_form input[name="ip_id"]').val(data.data.ip_id);
                        $('#new_integration_form input[name="ip_secret"]').val(data.data.ip_secret);
                        $('#addIntegrationButton').text("Update Integration");
                        if ($('select[name=int_comp]').val() === '1') {
                            if ($('#qrAdminPasswordDiv').length > 0) {

                            } else {
                                $('#addIntegrationButton').parent().before('<div class="col-md-12 col-sm-12 col-xs-12 intCredentials" style="display:none;" id="qrAdminPasswordDiv"><label class="control-label">QuoteRUSH Admin Password</label><input name="qr-adminPassword" class="form-control" type="password" required /></div>');
                            }
                        }
                        $('.intCredentials').show();
                    } else {
                        $('#intCompanyDiv').html("<p>There was a problem pulling the Integration Info, please try again.</p>");
                    }
                } else {
                    if ($('#qrAdminPasswordDiv').length > 0) {
                        $('#qrAdminPasswordDiv').remove();
                    }
                    $('#new_integration_form input[name="ip_id"]').val("");
                    $('#new_integration_form input[name="ip_secret"]').val("");
                    $('#intCompanyDiv').hide();
                    $('.intCredentials').hide();
                }
            }
        });
    } else {
        if ($('#qrAdminPasswordDiv').length > 0) {
            $('#qrAdminPasswordDiv').remove();
        }
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: "functions/functions.php",
            dataType: "json",
            data: {'integration_type': integration_type, 'get_integration_info': true},
            success: function (data, result) {
                HideLoader();

                if (data && data.status === "No Integration") {
                    if (data.data && data.data !== '') {
                        $('#new_integration_form input[name="ip_id"]').val("");
                        $('#new_integration_form input[name="ip_secret"]').val("");
                        $('#addIntegrationButton').text("Add Integration");
                        $('#intCompanyDiv').html(data.data);
                        $('#intCompanyDiv').show();
                        $('#int_comp').select2({
                            theme: "bootstrap-5", width: '100%'
                        });
                        $('#int_comp').select2('destroy');
                        $('#int_comp').select2({
                            theme: "bootstrap-5", width: '100%'
                        });
                        if ($('select[name=int_comp]').val() === '1') {
                            if ($('#qrAdminPasswordDiv').length > 0) {

                            } else {
                                $('#addIntegrationButton').parent().before('<div class="col-md-12 col-sm-12 col-xs-12 intCredentials" style="display:none;" id="qrAdminPasswordDiv"><label class="control-label">QuoteRUSH Admin Password</label><input name="qr-adminPassword" class="form-control" type="password" required /></div>');
                            }
                        }
                        $('.intCredentials').show();
                    } else {
                        $('#intCompanyDiv').html("<p>There was a problem pulling the Integration Info, please try again.</p>");
                    }
                } else if (data && data.status === 'Has Integration') {
                    if (data.data && data.data !== '') {
                        $('#intCompanyDiv').hide();
                        $('#new_integration_form input[name="ip_id"]').val(data.data.ip_id);
                        $('#new_integration_form input[name="ip_secret"]').val(data.data.ip_secret);
                        $('#addIntegrationButton').text("Update Integration");
                        if ($('select[name=int_comp]').val() === '1') {
                            if ($('#qrAdminPasswordDiv').length > 0) {

                            } else {
                                $('#addIntegrationButton').parent().before('<div class="col-md-12 col-sm-12 col-xs-12 intCredentials" style="display:none;" id="qrAdminPasswordDiv"><label class="control-label">QuoteRUSH Admin Password</label><input name="qr-adminPassword" class="form-control" type="password" required /></div>');
                            }
                        }
                        $('.intCredentials').show();
                    } else {
                        $('#intCompanyDiv').html("<p>There was a problem pulling the Integration Info, please try again.</p>");
                    }
                } else {
                    $('#new_integration_form input[name="ip_id"]').val("");
                    $('#new_integration_form input[name="ip_secret"]').val("");
                    $('#intCompanyDiv').hide();
                    $('.intCredentials').hide();
                }
            }
        });
    }
});

$(document).on('click', '#add-custom-field-section', function (event) {
    event.preventDefault();
    ShowLoader();

    $.post("functions/functions.php", {"add-custom-field-section": true}, function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add Custom Field Section');

        // Generic non-empty pattern on required inputs
        $('#new_field_section_form input[required]:not([pattern])')
            .attr('pattern', '.*\\S+.*');
    }, 'html');
});

$(document).on('click', '#edit-custom-field-section', function (event) {
    event.preventDefault();
    ShowLoader();

    $.post("functions/functions.php", {"edit-custom-field-section-selector": true}, function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Edit Custom Field Section');

        const $sel = $('#edit_field_section_select');
        if ($sel.length) {
            $sel.select2({
                width: '100%',
                placeholder: "Select a Section to Edit"
            });
        }
    }, 'html');
});

$(document).on('change', '#edit_field_section_select', function () {
    const sectionId = $(this).val();
    if (!sectionId) return;

    ShowLoader();

    $.post("functions/functions.php", {
        "load-custom-field-section-edit": true,
        "SectionId": sectionId
    }, function (data) {
        HideLoader();

        // Replace offcanvas content with the edit form
        launchOffCanvasPanel(data, 'Edit Custom Field Section');

        $('#new_field_section_form input[required]:not([pattern])')
            .attr('pattern', '.*\\S+.*');

        const $sectionForSelect = $('#new_field_section_table');
        if ($sectionForSelect.length && $sectionForSelect.val()) {
            // Kick off field + LOB mapping load
            $sectionForSelect.trigger('change');
        }
    }, 'html');
});

$(document).on('change', '#new_field_section_table', function (event) {
    event.preventDefault();

    const sectionFor = $(this).val();
    const url = "functions/functions.php";
    const $mappingDiv = $('#custom-field-section-mapping-div');
    const $lobDiv = $('#new-section-lob-div');

    if (sectionFor === 'policies') {
        $lobDiv.show();
    } else {
        $lobDiv.hide().empty();
    }

    $mappingDiv.empty().hide();
    if (!sectionFor) return;

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        dataType: "json",
        data: {"getCustomFieldsForSection": sectionFor},
        success: function (data) {
            if (data && data.status !== "Failed" && Array.isArray(data.fields)) {

                let existing = $mappingDiv.data('existing-fields');
                let selectedValues = [];

                if (Array.isArray(existing)) {
                    selectedValues = existing;
                } else if (typeof existing === 'string' && existing.trim() !== '') {
                    try {
                        selectedValues = JSON.parse(existing);
                    } catch (e) {
                        selectedValues = [];
                    }
                }

                let html = "<label for='customFieldSectionMapping'>Fields in this Section</label>";
                html += "<select id='customFieldSectionMapping' name='customFieldSectionMapping[]' class='form-control' multiple='multiple'>";

                data.fields.forEach(function (fieldObj) {
                    const customFieldName = fieldObj['value'];
                    const fieldLabel = fieldObj['text'];
                    if (!customFieldName || customFieldName.length < 1) return;

                    let isSelected = false;
                    for (const sv of selectedValues) {
                        if (sv[fieldLabel]) {
                            isSelected = true;
                            break;
                        }
                    }

                    const selectedAttr = isSelected ? " selected" : "";
                    const safeValue = customFieldName.replace(/'/g, "&#39;");

                    html += "<option value='" + fieldLabel + "'" + selectedAttr + ">" +
                        safeValue +
                        "</option>";
                });

                html += "</select>";

                $mappingDiv.html(html).show();

                $('#customFieldSectionMapping').select2({
                    tags: true,
                    width: '100%',
                    placeholder: "Select or type fields for this section"
                });

                if (sectionFor === 'policies') {

                    let existingLobs = $lobDiv.data('existing-lobs');
                    let selectedLobs = [];

                    if (Array.isArray(existingLobs)) {
                        selectedLobs = existingLobs;
                    } else if (typeof existingLobs === 'string' && existingLobs.trim() !== '') {
                        try {
                            selectedLobs = JSON.parse(existingLobs);
                        } catch (e) {
                            selectedLobs = [];
                        }
                    }

                    const lobOptions = Array.isArray(data.linesOfBusinessFields)
                        ? data.linesOfBusinessFields
                        : [];

                    let lobHtml = "<label for='section_lob_mapping'>Lines of Business (optional)</label>";
                    lobHtml += "<select id='section_lob_mapping' name='section_lob_mapping[]' class='form-control' multiple='multiple'>";

                    lobOptions.forEach(function (lob) {
                        const value = lob.value;
                        const text = lob.text || lob.value;
                        if (!value) return;

                        const isSelected = selectedLobs.indexOf(value) !== -1;
                        const selectedAttr = isSelected ? " selected" : "";
                        const safeVal = String(value).replace(/'/g, "&#39;");
                        const safeText = String(text);

                        lobHtml += "<option value='" + safeVal + "'" + selectedAttr + ">" +
                            safeText +
                            "</option>";
                    });

                    selectedLobs.forEach(function (lobId) {
                        if (!lobOptions.some(o => o.value === lobId)) {
                            const safeVal = String(lobId).replace(/'/g, "&#39;");
                            lobHtml += "<option value='" + safeVal + "' selected>" + safeVal + "</option>";
                        }
                    });

                    lobHtml += "</select>";
                    $lobDiv.html(lobHtml);

                    $('#section_lob_mapping').select2({
                        tags: true,
                        width: '100%',
                        placeholder: "Select or type LOB IDs for this section"
                    });
                }

            } else {
                displayAlert(
                    "Whoops! There was a problem getting custom fields for that section, you can still add the Section but you cannot associate fields. Please try again.",
                    "error"
                );
                $mappingDiv.hide().empty();
            }
        },
        error: function () {
            displayAlert(
                "Whoops! There was a problem getting custom fields for that section, you can still add the Section but you cannot associate fields. Please try again.",
                "error"
            );
            $mappingDiv.hide().empty();
        }
    });
});


$(document).on('click', '#add-integration', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-integration=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add Integration');

        $('#new_integration_form input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
    });
});

$(document).on('submit', '#new_integration_form', function (e) {
    const form = $("#new_integration_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        ShowLoader();
        if ($('select[name=int_comp]').val() === '1') {
            HideLoader();
            const inp = $("input[name='qr-adminPassword']").val();
            const qrid = $("input[name='ip_id']").val();
            const secret = $("input[name='ip_secret']").val();
            $.ajax({
                timeout: 10000,
                type: "post",
                url: "functions/functions.php",
                data: 'qr-adminPassword=' + inp + '&qr-QRId=' + qrid + '&qr-Secret=' + secret,
            }).done(function (response) {
                if (response.status === 'Got Data') {
                    const agencyName = response.agency;
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
                        }, buttonsStyling: false
                    })

                    swalWithBootstrapButtons.fire({
                        title: 'Are you sure?',
                        html: 'This will add ALL leads FROM <b>' + agencyName + '</b> to this Client Dynamics customer?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, add it!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: false
                    }).then((result) => {
                        if (result.value) {
                            swalWithBootstrapButtons.fire({
                                title: 'Super sure?',
                                html: 'I know you said you were sure, but this is your chance, ALL leads from <b>' + agencyName + '</b> will be added!!!!',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes, ADD it!',
                                cancelButtonText: 'No, cancel!',
                                reverseButtons: false
                            }).then((result) => {
                                if (result.value) {
                                    $('#qrAdminPasswordDiv').remove();
                                    ShowLoader();
                                    const url = "functions/functions.php";
                                    $.ajax({
                                        timeout: 10000,
                                        type: "POST",
                                        url: url,
                                        data: form.serialize() + '&add_new_integration=1',
                                        success: function (data, result) {
                                            HideLoader();
                                            if (data && data.status === "success") {
                                                displayAlert("Integration Point added Successfully, data may take a while to populate as we pull it from the endpoint, this page will refresh in a few seconds.", "success");
                                                setTimeout(location.reload.bind(location), 3000);
                                            } else if (data && data.status === "Required") {
                                                displayAlert("Please fill all the required fields", "error");
                                            } else {
                                                displayAlert("Whoops! There was a problem adding your Integration Point, refreshing page. Please try again.", "error");
                                                //setTimeout(location.reload.bind(location), 3000);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    HideLoader();
                    Swal.fire({
                        type: 'error',
                        title: 'Authentication Failed',
                        html: 'You have input the incorrect password. Please contact support for assistance.'
                    });
                }
            })
        } else {
            var url = "functions/functions.php";

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: form.serialize() + '&add_new_integration=1',
                success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "success") {
                        displayAlert("Integration Point added Successfully, data may take a while to populate as we pull it from the endpoint, this page will refresh in a few seconds.", "success");
                        setTimeout(location.reload.bind(location), 3000);
                    } else if (data && data.status === "Required") {
                        displayAlert("Please fill all the required fields", "error");
                    } else {
                        displayAlert("Whoops! There was a problem adding your Integration Point, refreshing page. Please try again.", "error");
                        //setTimeout(location.reload.bind(location), 3000);
                    }
                }
            });
        }
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

function getVendorStats() {
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/functions.php",
        data: "get-vendor-stats=" + $('#get-vendor-stats').val(),
        dataType: "json",
        async: false,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#vendor-stats').html(data.data);
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
}

function getVendorStatsDetails() {
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/functions.php",
        data: "get-vendor-stats=" + $('#get-vendor-stats').val() + "&get-vendor-stats-details=" + $('#get-vendor-stats-details').val(),
        dataType: "json",
        async: false,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#vendor-stats').html(data.data);
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
}

$(document).on('click', 'a#import-leads-button', function (event) {
    val = $(this).attr('data-value');
    ShowLoader();
    $.post("functions/functions.php", "import_leads=true", function (data) {
        if (data && data.status === "Got Data") {
            launchOffCanvasPanel(data.data, 'Import Leads');
        }
        if (data && data.status !== "Got Data") {
            displayAlert("Whoops! There was a problem. Please try again.", "error")
        }
        HideLoader();
    });
});

$(document).on('click', 'a#import-policies-button', function (event) {
    val = $(this).attr('data-value');
    ShowLoader();
    $.post("functions/functions.php", "import_policies=true", function (data) {
        if (data && data.status === "Got Data") {
            launchOffCanvasPanel(data.data, 'Import Policies');
        }
        if (data && data.status !== "Got Data") {
            displayAlert("Whoops! There was a problem. Please try again.", "error")
        }
        HideLoader();
    });
});

$(document).on('click', '#make_payment', function (event) {
    const val = $(this).attr('data-value');
    $.post("functions/functions.php", "make_payment=" + val, function (data) {
        $('#charges-summary').html(data.data[1]);
        $('#payment-row').show();
        $('#payment-row').trigger('focus');
        setTimeout(function () {
            $('#charge-grid').DataTable()
        }, 2000);

    });
});

$(document).on('click', '#print_invoice', function (event) {
    const val = $(this).attr('data-value');
    $.post("functions/functions.php", "trans_id=" + val, function (data) {
        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Invoice");
        modal_qtpanel.find('.offcanvas-body').html(data.data);
        $('#qtpanel').offcanvas('show');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
    });
});
$(document).on('click', '#print_client_invoice', function (event) {
    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        type: "POST",
        dataType: "json",
        url: "functions/functions.php",
        data: "print_inv_num=" + val,
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data, result) {
            if (data.preview !== undefined && data.preview !== 'undefined' && data.url !== '') {
                window.open(data.url, "_blank");
                HideLoader();
            } else {
                HideLoader();
                displayAlert("Whoops! There was a problem generating your summary. Please try again.", "error");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            HideLoader();
            displayAlert("Whoops! There was a problem generating your summary. Please try again.", "error");
        },
        complete: function (jqXHR, textStatus) {
            HideLoader();
        }
    });
});

$(document).on('click', '#add-custom-field', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-custom-field=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add Custom Field');
        $('#new_field_form input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
    });
});

$(document).on('click', '#edit-custom-field', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "edit-custom-field=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Edit Custom Field');
        $('#new_field_form input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
    });
});

$(document).on('click', '#deleteCustomFieldSection', function (event) {
    event.preventDefault();
    $('#qtpanel').offcanvas('hide');
    const SectionId = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to remove this Section?',
        text: 'This action is not reversible and any mapping(s) will be lost.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {
            ShowLoader();
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'deleteCustomFieldSection=' + SectionId,
                dataType: "json",
                success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "Got Data") {
                        displayAlert("Section removed successfully.", "success");
                        emptyAndCloseOffCanvasPanel();
                    } else {
                        displayAlert("Whoops! There was a problem removing that Section. Please try again.", "error");
                        $('#qtpanel').offcanvas('show');
                    }
                },
                error: function () {
                    displayAlert("Whoops! There was a problem removing that Section. Please try again.", "error");
                    $('#qtpanel').offcanvas('show');
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {
            $('#qtpanel').offcanvas('show');
        }
    })
});

$(document).on('click', '#updateCustomFieldButton', function (event) {
    event.preventDefault();
    $('#updateCustomFieldButton').attr('disabled', true);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to update this field?',
        text: 'This action is not reversible and any data stored in these fields not compatible with the new type (if changed) will be lost.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {
            ShowLoader();
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: $("#edit_custom_field").serialize(),
                dataType: "json",
                success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "Got Data") {
                        displayAlert("Field updated successfully. Refreshing page.", "success");
                        setTimeout(location.reload.bind(location), 1000);
                    } else if (data && data.status === "Duplicate") {
                        displayAlert("Custom Field already exists. Please try differnt name.", "error");
                    } else if (data && data.status === "No Changes") {
                        displayAlert("Whoops! There were no changes detected. Please try again.", "error");
                        $('#updateCustomFieldButton').attr('disabled', false);
                    } else {
                        displayAlert("Whoops! There was a problem updating that field. Please try again.", "error");
                        $('#updateCustomFieldButton').attr('disabled', false);
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {
            $('#updateCustomFieldButton').attr('disabled', false);
        }
    })
});

$(document).on('click', '#add-file-category', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-file-category=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Add File Category');
    });
});


$(document).on('click', '#rem-custom-fields', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "rem-custom-fields=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Remove Custom Fields');
    });
});


$(document).on('click', '#rem-file-category', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "rem-file-category=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Remove File Category');
    });
});
$(document).on('click', '#add-attach-flag', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "add-attach-flag=true", function (data) {
        HideLoader();
        launchOffCanvasPanel(data, 'Manage Label');
    });
});
$(document).on('click', '.edit-attach-flag', function (event) {

    const label_id = $(this).attr('data-value');
    const old_name = $(this).attr('data-id');
    const labelHtml = `<form class="label-form m-3">
            <div class="col-group">
                <input type="text" class="form-control" id="edit_label_name" placeholder="Enter Label Name" maxlength="20" value="` + old_name + `" required />
                <div class="invalid-feedback">Please enter valid label name</div>
                <div class="valid-feedback">Looks Good!</div>
            </div>
        </form>`;
    const box = bootbox.dialog({
        title: 'Edit Label Name', size: "small", message: labelHtml, buttons: {
            cancel: {
                label: 'Cancel', className: 'btn-danger'
            }, ok: {
                callback: function (result) {
                    const label_name = $('#edit_label_name').val();
                    if (label_name !== null && label_name !== '' && label_id !== '') {
                        $.ajax({
                            timeout: 10000,
                            url: "functions/functions.php",
                            type: "POST",
                            dataType: "json",
                            data: 'edit_label_name=true&new_label_name=' + label_name + '&label_id=' + label_id,
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {
                                    displayAlert("Label edit Successfully, refreshing page in a moment.", "success");
                                    setTimeout(location.reload.bind(location), 3000);
                                } else if (data && data.status === "Required") {
                                    displayAlert("Please fill the required field", "error");
                                } else if (data && data.status === "exist") {
                                    displayAlert("This Label name is already exist.Please enter unique name.", "error");
                                } else {
                                    displayAlert("Whoops! There was a problem adding your label, refreshing page. Please try again.", "error");
                                    setTimeout(location.reload.bind(location), 3000);
                                }
                            }
                        });
                    } else if (label_name === '') {
                        $('.label-form').addClass("was-validated");
                        return false;
                    } else {
                        bootbox.hideAll();
                    }
                }
            }
        },

    });

});

$(document).on('change', '#new-aqr-upd-webform-selection, #cur-aqr-upd-webform-selection', function (e) {
    const val = $(this).val();
    if ($(this).attr('id') === 'new-aqr-upd-webform-selection') {
        if (val === 'QuoteRUSH') {
            $('#qrWebFormDiv').show();
            $('#ccWebFormDiv').hide();
            $('#new-aqr-upd-cc-link').select2('destroy');
            $('#new-aqr-upd-cc-link').val('');
            $('#new-aqr-upd-cc-link').trigger('change');
            $('#new-aqr-upd-cc-link').select2({
                theme: "bootstrap-5", width: '100%'
            });
        } else if (val === 'CanopyConnect') {
            $('#ccWebFormDiv').show();
            $('#qrWebFormDiv').hide();
            $('#new-aqr-upd-webform').select2('destroy');
            $('#new-aqr-upd-webform').val('');
            $('#new-aqr-upd-webform').trigger('change');
            $('#new-aqr-upd-webform').select2({
                theme: "bootstrap-5", width: '100%'
            });
        }
    } else if ($(this).attr('id') === 'cur-aqr-upd-webform-selection') {
        if (val === 'QuoteRUSH') {
            $('#qrWebFormDiv').show();
            $('#ccWebFormDiv').hide();
            $('#cur-aqr-upd-cc-link').select2('destroy');
            $('#cur-aqr-upd-cc-link').val('');
            $('#cur-aqr-upd-cc-link').trigger('change');
            $('#cur-aqr-upd-cc-link').select2({
                theme: "bootstrap-5", width: '100%'
            });
        } else if (val === 'CanopyConnect') {
            $('#ccWebFormDiv').show();
            $('#qrWebFormDiv').hide();
            $('#cur-aqr-upd-webform').select2('destroy');
            $('#cur-aqr-upd-webform').val('');
            $('#cur-aqr-upd-webform').trigger('change');
            $('#cur-aqr-upd-webform').select2({
                theme: "bootstrap-5", width: '100%'
            });
        }
    }
});
$(document).on('click', '.remove-attach-flag', function (event) {
    const val = $(this).attr('data-value');
    const swalLabelText = `If you delete this label, it will be automatically removed from all files/folders.`;
    Swal.fire({
        title: 'Are you  sure?',
        text: swalLabelText,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.value) {
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: "remove_attached_flag=" + val,
                success: function (data, result) {

                    if (data && data.status === "Label removed") {
                        displayAlert("Label removed successfully, refreshing page in a moment.", "success");
                        setTimeout(location.reload.bind(location), 3000);
                    }
                    if (data && data.status !== "Label removed") {
                        displayAlert("Whoops! There was a problem removing this label, refreshing page. Please try again.", "error");
                        setTimeout(location.reload.bind(location), 3000);
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
        return false; //for good measure
    });
});

$(document).on('click', '#add-carrier-fee', function (event) {

    ShowLoader();
    $.post("functions/functions.php", "add-carrier-fee=true", function (data) {
        HideLoader();
        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Add Carrier Fee");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $('#qtpanel').offcanvas('show');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
    });
});

$(document).on('click', '#rem-carrier-fee', function (event) {
    ShowLoader();
    $.post("functions/functions.php", "rem-carrier-fee=true", function (data) {
        HideLoader();
        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Remove Carrier Fee");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $('#qtpanel').offcanvas('show');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
    });
});

$(document).on('click', '#add-new-carrier', function (event) {
    ShowLoader();
    const data = $('#add-carrier-modal').html();
    launchOffCanvasPanel(data, 'Add New Carrier');
    existingCarriers();
    HideLoader();
});

$(document).on('click', '#exp-contacts', function (event) {
    event.preventDefault();
    const url = 'functions/functions.php';
    ShowLoader();
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        dataType: "json",
        data: "export_contacts=true",
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {

                window.location.href = "functions/export_contacts.csv";

            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting that data. Please try again.", "error");
            }
        }
    });
});


$(document).on('click', '#exp-policies', function (event) {
    event.preventDefault();
    ShowLoader();

    const url = 'functions/functions.php';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        dataType: "json",
        data: "export_policies=true",
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {

                window.location.href = "functions/export_policies.csv";
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting that data. Please try again.", "error")
            }
        }
    });
});

$(document).on('submit', '#new_field_section_form', function (e) {


    const form = $("#new_field_section_form");
    $('#addFieldButton').attr('disabled', true);
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
        $('#addFieldButton').attr('disabled', false);

    } else {
        ShowLoader();
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_field_section_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert("Field Section added Successfully, refreshing page in a moment.", "success");
                    emptyAndCloseOffCanvasPanel();
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill the required fields", "error");
                } else {
                    displayAlert(data['message'], "error");
                }
            }
        });
    }
    form.addClass('was-validated');
    return false;
});

$(document).on('submit', '#new_field_form', function (e) {


    const form = $("#new_field_form");
    $('#addFieldButton').attr('disabled', true);
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
        $('#addFieldButton').attr('disabled', false);

    } else {
        ShowLoader();
        e.preventDefault();

        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_field_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    table_name = $('select[name="new_field_table"]').find(":selected").val();
                    displayAlert("Field added Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill the required fields", "error");
                    $('#addFieldButton').attr('disabled', false);
                } else {
                    displayAlert(data['message'], "error");
                    $('#addFieldButton').attr('disabled', false);
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('submit', '#add_label_form', function (e) {
    const form = $("#add_label_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#add_label_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Label added Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill the required field", "error");
                } else if (data && data.status === "exist") {
                    displayAlert("This Label name is already exist.Please enter unique name.", "error");
                } else {
                    displayAlert("Whoops! There was a problem adding your label, refreshing page. Please try again.", "error");
                    setTimeout(location.reload.bind(location), 3000);
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('submit', '#new_file_category_form', function (e) {
    const form = $("#new_file_category_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_file_category_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Category added Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill the required field", "error");
                } else {
                    displayAlert("Whoops! There was a problem adding your category, refreshing page. Please try again.", "error");
                    setTimeout(location.reload.bind(location), 3000);
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('submit', '#rem_field_form', function (e) {
    const form = $("#rem_field_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        ShowLoader();

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#rem_field_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    $('#rem_field_form #remFieldButton').attr("disabled", "disabled");
                    displayAlert("Field removed Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 1000);
                } else {
                    displayAlert("Whoops! There was a problem removing selected field, refreshing page in a moment. Please try again.", "error");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                displayAlert("Whoops! Some internal problem occured. Please try again.", "error");
                HideLoader();
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('change', '#edit_custom_field_table', function (e) {
    const form = $("#edit_custom_field");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        ShowLoader();
        e.preventDefault();
        const val = $(this).val();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'get-custom-fields-for-section=' + val,
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    $('#editCustomFieldInfoDiv').html(data.data);
                    $('#edit-custom-field-select').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $('#edit_custom_field')
                    });
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! No custom fields exist. Please create a custom field to edit.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#update_custom_field_type', function (e) {
    e.preventDefault();
    const val = $(this).val();
    const orig = $('#orig-field-type').val();
    if (orig === 'date' && val !== 'text') {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
            }, buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to change this field to a ' + val + '?',
            text: 'Changing a date column to any type other than a text field will result in all data of that field being removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                $('#update_custom_field_type').val(val);
            } else if (/* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                $('#update_custom_field_type').val(orig);
            } else {
                $('#update_custom_field_type').val(orig);
            }
        })
    }

    if ((orig !== 'lookup' && orig !== 'number') && val === 'lookup') {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
            }, buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to change this field to a ' + val + '?',
            text: 'Changing any column to a lookup field will result in all data of that field being removed, UNLESS the original field type was number.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                $('#update_custom_field_type').val(val);
            } else if (/* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                $('#update_custom_field_type').val(orig);
            } else {
                $('#update_custom_field_type').val(orig);
            }
        })
    }

    if ((orig === 'money' || orig === 'number') && val !== 'text') {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
            }, buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to change this field to a ' + val + '?',
            text: 'Changing any money or number column to a field type other than text will result in all data of that field being removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                $('#update_custom_field_type').val(val);
            } else if (/* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                $('#update_custom_field_type').val(orig);
            } else {
                $('#update_custom_field_type').val(orig);
            }
        })
    }

    if (orig === 'text' && (val === 'money' || val === 'number')) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
            }, buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to change this field to a ' + val + '?',
            text: 'Changing any text field to a field type of money or number column will result in all data of that field being removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                $('#update_custom_field_type').val(val);
            } else if (/* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                $('#update_custom_field_type').val(orig);
            } else {
                $('#update_custom_field_type').val(orig);
            }
        })
    }

    if (orig !== 'list' && val === 'list') {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
            }, buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure you want to change this field to a ' + val + '?',
            text: 'Changing any field to a field type of list column could result in data loss. We will pull a list of current values to try and prevent that, but it cannot be guaranteed',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                const cval = $('#edit-custom-field-select').val();
                const url = "functions/functions.php";

                $.ajax({
                    timeout: 10000,
                    type: "POST",
                    url: url,
                    data: 'get-custom-field-potential-list-options=' + cval,
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            $('#update_custom_field_type').val(val);
                            $('#updateCustomFieldTypeDiv').after(data.data);
                        }
                        if (data && data.status !== "Got Data") {
                            $('#update_custom_field_type').val(orig);
                            displayAlert("Whoops! No custom field options exist.", "error")
                        }
                    }
                });
            } else if (/* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel) {
                $('#update_custom_field_type').val(orig);
            } else {
                $('#update_custom_field_type').val(orig);
            }
        })
    }

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#edit-custom-field-select', function (e) {
    const form = $("#edit_custom_field");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        ShowLoader();
        e.preventDefault();
        const val = $(this).val();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'get-custom-field-options=' + val,
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    $('#editCustomFieldEditDiv').html(data.data);

                    $('#update_custom_field_type').select2({
                        theme: "bootstrap-5", width: '100%', dropdownParent: $('#edit_custom_field')
                    })
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! No custom fields exist. Please create a custom field to edit.", "error")
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#rem_file_category_form', function (e) {

    const form = $("#rem_file_category_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#rem_file_category_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Category removed Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem removing your category, refreshing page. Please try again.", "error");
                    setTimeout(location.reload.bind(location), 3000);
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#new_carrier_form', function (e) {
    e.preventDefault();

    const form = $("#new_carrier_form");
    if (form[0].checkValidity() === false) {
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        ShowLoader();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_carrier_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert("Carrier added Successfully.", "success");
                    existingCarriers(); // update the new carrier in the list below
                    form.removeClass('was-validated');
                    $("#new_carrier_name").val('');
                    $("#new-carrier-naic").val('').prop("readonly", false);
                    $("#new-carrier-address").val('');
                    $("#new-carrier-city").val('');
                    $("#new-carrier-state").val('');
                    $("#new-carrier-zip").val('');
                    $("#new-carrier-phone").val('');
                    $("#new-carrier-website").val('');
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all required fields.", "error");
                } else if (data && data.status === "Exists") {
                    displayAlert("Carrier Already exists.", "error");
                } else {
                    displayAlert("There was a problem while adding that Carrier. Please contact your support team.", "error");
                }
            },
            error: function (xhr, status, error) {
                HideLoader();
                displayAlert("There was a problem while adding that Carrier. Please try again, or contact Support.", "error");
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#new_lob_form', function (e) {

    const form = $("#new_lob_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all the required field.", "error");
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000, type: "POST", url: url, data: $("#new_lob_form").serialize(), beforeSend: function () {
                ShowLoader();
            }, success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert("Line of Business added Successfully, refreshing page in a moment.", "success");
                    $('#newLOBButton').attr("disabled", "disabled");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all the required field.", "error");
                } else if (data && data.status === "exists") {
                    displayAlert("It is already exists", "error");
                } else {
                    displayAlert("Whoops! There was a problem adding that line of business, refreshing page. Please try again.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#del_contact', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    const ContactId = val;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete this contact?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'del_contact_id=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {

                        displayAlert("Contact deleted successfully. Refreshing page", "success")

                        window.location.href = "contact.php?Contact=" + ContactId;
                    }
                    if (data && data.status !== "Got Data") {

                        displayAlert("Whoops! There was a problem deleting your contact. Please try again.", "error")

                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});


$(document).on('click', '.deleteContact', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');
    const ele = $(this);
    const closestRow = $(this).closest("tr");
    const currentText = closestRow.find('td:eq(2)').text(); // Assuming the third column
    const prevRow = closestRow.prev();
    const nextRow = closestRow.next();
    const tableId = $(this).closest('table').attr('id'); // Get the ID of the closest table
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete this contact?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'del_contact_id=' + val + '&delete-ContactId=true',
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {

                        displayAlert("Contact deleted successfully. Refreshing page", "success")

                        // Check and remove the previous row if it matches
                        if (prevRow.length && prevRow.find('td:eq(2)').text() === currentText) {
                            prevRowMatches = true;
                        } else {
                            prevRowMatches = false;
                        }

                        // Check and remove the next row if it matches
                        if (nextRow.length && nextRow.find('td:eq(2)').text() === currentText) {
                            nextRowMatches = true
                        } else {
                            nextRowMatches = false;
                        }

                        if (prevRowMatches === true && nextRowMatches === true) {

                        } else if (prevRowMatches === true && nextRowMatches === false) {
                            const prevPrevRow = prevRow.next();

                            if (prevPrevRow.length && prevPrevRow.find('td:eq(2)').text() === currentText) {

                            } else {
                                prevRow.remove();
                            }

                        } else if (prevRowMatches === false && nextRowMatches === true) {
                            const nextNextRow = nextRow.next();

                            if (nextNextRow.length && nextNextRow.find('td:eq(2)').text() === currentText) {

                            } else {
                                nextRow.remove();
                            }

                        }

                        closestRow.remove();
                        $('#' + tableId).DataTable().draw(); // Redraw the specific table
                    }
                    if (data && data.status !== "Got Data") {

                        displayAlert("Whoops! There was a problem deleting your contact. Please try again.", "error")

                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});

$(document).on('click', '#del_policy', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete this policy?' + val,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'del_policy_id=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Policy deleted successfully. Refreshing page.", "success")
                        // setTimeout(location.reload.bind(location), 3000);
                        // window.location = "/policies.php";
                        window.history.back();

                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem deleting your policy. Please try again.", "error")
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })


});

$(document).on('click', '.deleteProperty', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete this property?' + val,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'delete-property=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Property deleted successfully", "success")
                        PropertyInfoTableV2('All');
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem deleting that property. Please try again.", "error")
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});

$(document).on('click', '.restoreProperty', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to restore this property?' + val,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, restore it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'restore-property=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Property restored successfully", "success");
                        PropertyInfoTableV2('All');
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem restoring that property. Please try again.", "error")
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});


$(document).on('submit', '#subQBOptions', function (e) {
    const form = $("#subQBOptions");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        const lob = $('#lobtype').val();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#subQBOptions").serialize() + '&lob=' + lob,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Submitted " + data.data + " quote requests to VirtualBOT. The results will appear in the top right hand corner under a cash icon.", "success")
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem submitting your quotes. Please try again.", "error")

                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});
$(document).on('click', '#delVeh', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const val = $(this).attr('data-value');

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'rem_veh=' + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Vehicle Removed Successfully. Please re-open the policy.", "success")
            }
            if (data && data.status !== "Got Data") {
                displayAlert("There was a problem removing that vehicle, please refresh and try again.", "error")
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#reAssocContact', function (e) {

    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "reassociate_policy=" + uid, success: function (data, result) {

            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Change Policy Association');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating that user. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.reAssignSMS', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "reassociate_sms=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Change SMS Association');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating that association. Please try again.", "error")
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.reAssignCall', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "reassociate_call=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Change SMS Association');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating that association. Please try again.", "error")
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#re_assoc_policy', function (e) {


    const form = $("#re_assoc_policy");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#re_assoc_policy").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Policy Re-Associated Successfully Successfully, refreshing page in a moment.", "success")

                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill the required fields in their valid format", "error");
                } else {
                    displayAlert("Whoops! There was a problem re-associating your policy. Please try again.", "error")


                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('submit', '#re_assoc_sms', function (e) {
    const form = $("#re_assoc_sms");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#re_assoc_sms").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("SMS Re-Associated Successfully Successfully, refreshing page in a moment.", "success")
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem re-associating your sms. Please try again.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});

$(document).on('submit', '#re_assoc_call', function (e) {
    const form = $("#re_assoc_call");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#re_assoc_call").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Call Re-Associated Successfully Successfully, refreshing page in a moment.", "success")
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem re-associating your Call. Please try again.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});

$(document).on('click', '.updSGInfo', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "upd_sg=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#side-panel-title').html('Update SendGrid Info');
                $('#policy_info_panel').html(data.data);
                $('#side-panel-toggle').trigger('click');
                $("#policy_info_panel input[placeholder]").placeholderLabel({
                    labelColor: "##497cb1", inInput: true, labelSize: "8px"
                });
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating the info for SendGrid. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#upd_sg_form', function (e) {
    e.preventDefault();

    if ($('#upd_sg_form')[0].checkValidity() === false) {
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
        $('#upd_sg_form').addClass("was-validated");
    } else {
        const url = "functions/functions.php";

        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#upd_sg_form").serialize(),
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Success") {
                    displayAlert("SendGrid Information Updated Successfully.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Same") {
                    displayAlert("No Change is made.", "success");
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all the required fields", "error");

                } else {
                    displayAlert("Whoops! There was a problem updating this info. Please try again.", "error");
                }
            }
        });
    }

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#add_sg_form', function (e) {
    const form = $("#add_sg_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();

        const url = "functions/functions.php";
        ShowLoader();
        $.ajax({
            type: "POST", url: url, data: $("#add_sg_form").serialize(), success: function (data, result) {

                HideLoader();
                if (data && data.status === "Success") {
                    displayAlert("Added SendGrid Info Successfully.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all the required fields", "error");
                } else {
                    displayAlert("Whoops! There was a problem adding your SendGrid Info. Please try again.", "error");
                }
            }, timeout: 500000
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#upd_campaign', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        type: "POST", url: url, data: $("#upd_campaign").serialize(), success: function (data, result) {
            if (data && data.status === "Success") {
                displayAlert("Campaign updated successfully. Reloading the page, please wait.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Success") {
                displayAlert("Whoops! There was a problem updating your campaign. Please try again.", "error");
            }
        }, timeout: 500000
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#sendTestCamp', function (event) {
    event.preventDefault();
    camp_id = $('#campaign_id').val();
    to_email = $('#test_camp_email').val();
    $.ajax({
        timeout: 10000,
        type: 'POST',
        url: 'functions/functions.php',
        data: 'send_test_camp=' + camp_id + '&test_camp_email=' + to_email,
        success: function (data, result) {
            if (data && data.status === "Success") {
                displayAlert("Test Email sent successfully.", "success");
            }
            if (data && data.status !== "Success") {
                displayAlert("Whoops! There was a problem sending your test email. Please try again.", "error");
            }
        }
    })
    return false; //for good measure
});

$(document).on('submit', '#new_carrier_fee_form', function (e) {
    e.preventDefault();
    const form = $("#new_carrier_fee_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_carrier_fee_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Fee added Successfully, refreshing page in a moment.", "success");
                    emptyAndCloseOffCanvasPanel();
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill the required fields", "error");
                } else {
                    displayAlert("Whoops! There was a problem adding your fee, refreshing page. Please try again.", "error");
                }
            }
        });
        return false; // avoid to execute the actual submit of the form.
    }
    form.addClass('was-validated');
});

$(document).on('submit', '#rem_carrier_fee_form', function (e) {

    const form = $("#rem_carrier_fee_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#rem_carrier_fee_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Fee removed Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem removing that fee, refreshing page. Please try again.", "error");
                    setTimeout(location.reload.bind(location), 3000);
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '#add_pref_carrier', function (event) {
    $.post("functions/functions.php", "add-pref-carrier=true", function (data) {
        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Add Preferred Carrier");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $('#qtpanel').offcanvas('show');
        $('.offcanvas-body').removeClass('row');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
    });
});


$(document).on('click', '#completeAddNewPrefCarrier', function (e) {
    const form = $("#new_pref_carrier_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        if ($('.newPrefCarrierClass') !== '' && $('.newPrefCarrierClass').length > 0) {
            const url = "functions/functions.php";
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: $("#new_pref_carrier_form").serialize(),
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Carrier(s) added Successfully, refreshing page in a moment.", "success");
                        setTimeout(window.location = "agency-profile.php?Section=aqr-settings", 3000);
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem adding your carrier, refreshing page. Please try again.", "error");
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'error', title: 'Uh Oh!', text: 'Please select a valid carrier.'
            })
        }
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.remAQRTiming', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');
    const cRow = $(this).closest('tr');
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "rem_aqr_timing=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Timing Removed", "success")
                cRow.remove();
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem removing that timing. Please try again.", "error")
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.editAQRTiming', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "edit_aqr_timing=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchCenteredModal(data.data, 'Edit AQR Timing', 'modal-xl');
                $('#centeredModalBody select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModal")
                });
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting the information. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '#add_aqr_timing', function (event) {
    event.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "add-aqr-timing=true", success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchCenteredModal(data.data, 'Add AQR Timing', 'modal-xl');
                $('#centeredModalBody select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModal")
                });
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting the information. Please try again.", "error");
            }
        }
    });
});


$(document).on('change', '#new-aqr-timing-iur', function () {
    if ($(this).is(':checked')) {
        $('#iurDIV').show();
        $('#new-aqr-timing-iur-st').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
        $('#new-aqr-timing-iur-lt').removeAttr("readonly").attr("required", "required").css("pointer-events", "");
    } else {
        $('#new-aqr-timing-iur-st').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "");
        $('#new-aqr-timing-iur-lt').removeAttr("required").attr("readonly", "readonly").css("pointer-events", "");
        $('#new-aqr-timing-iur-lt').val('');
        $('#iurDIV').hide();
    }
});


$(document).on('submit', '#new_aqr_timing_form', function (e) {
    const form = $("#new_aqr_timing_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_aqr_timing_form").serialize(),
            success: function (data) {
                if (data && data.status === "Success") {
                    displayAlert("Timing added Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else {
                    displayAlert("Whoops! There was a problem adding new timing settings. Please try again.", "error");
                }
            },
            error: function (xhr, status) {
                displayAlert("Whoops! There was a problem adding new timing settings. Please try again.", "error");
            }
        });
    }
    form.addClass('was-validated');
    return false;
});


$(document).on('submit', '#update_aqr_timing_form', function (e) {

    const form = $("#update_aqr_timing_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#update_aqr_timing_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Timing updated Successfully, refreshing page in a moment.", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "No Changes") {
                    displayAlert("No changes were made, please try again if you had updates.", "error");
                } else if (data && data.status === "Error") {
                    displayAlert("Whoops! There was a problem updating your timing, refreshing page. Please try again.", "error");
                }
            },
            error: function (xhr, status) {
                displayAlert("Whoops! There was a problem updating your timing, refreshing page. Please try again.", "error");
            }
        });
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', 'a#aqr_info', function (event) {

    val = $(this).attr('data-value');
    window.location = "contact.php?Contact=" + val;

});

$(document).on('click', '.remPropDefOpt', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "rem_prop_def_opt=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Default Option Removed", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem removing that default. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '#add_prop_def_opt', function (event) {
    $.post("functions/functions.php", "add-prop-def-opt=true", function (data) {
        $('#policy_info_panel').html(data);
        $('#side-panel-title').html('Add Default Option for Additional Coverage');
        $('#side-panel-toggle').trigger('click');
        $("#policy_info_panel input[placeholder]").placeholderLabel({
            labelColor: "##497cb1", inInput: true, labelSize: "8px"
        });
    });
});


$(document).on('submit', '#new_prop_def_opt_form', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#new_prop_def_opt_form").serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Default added Successfully, refreshing page in a moment.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem adding your default, refreshing page. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '[data-add=rule]', function (event) {

    $('[data-delete=rule]').hide();
});


$(document).on('click', '.remDefCov', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "rem_def_cov_opt=" + uid, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Default Coverage Removed", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem removing that default. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$('#enable_aq').on('switchChange.bootstrapSwitch', function (event, state) {
    const url = "functions/functions.php";
    const val = $(this).val();
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'enable_aq=' + state, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Automated Quoting Settings Updated.", "success");
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating your Automated Quoting Settings. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$('#enable_aqr').on('switchChange.bootstrapSwitch', function (event, state) {
    const url = "functions/functions.php";
    const val = $(this).val();
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'enable_aqr=' + state, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Automated Renewal Quoting Settings Updated.", "success");
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating your Automated Renewal Quoting Settings. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.highlightText', function (event) {
    event.preventDefault();
    var input = document.getElementById(window.getSelection().anchorNode.childNodes[0].id);
    const oldstr = window.getSelection().toString();
    const newstr = input.value.replace(oldstr, "<span style='background-color: #FFFF00'>" + oldstr + "</span>");
    var input = document.getElementById(window.getSelection().anchorNode.childNodes[0].id).value = newstr

});


$(document).on('change', '#acord_form_selection', function (event) {
    $('#acord_form_lob').hide();
    $('#mapping_for').val("");
    $('#mapping_for option[value=""]').trigger('change');
    $('#acord_policy_div').hide();
});

$(document).on('change', '#misc_form_selection', function (event) {
    $("select option:contains('Please Select the Form to Fill')").attr("disabled", "disabled");
    const url = "functions/functions.php";
    const val = $('#misc_form_selection').val();
    const contact = $('#upd_contact_id').val();
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'misc_form_mapping=' + val + '&misc_form_contact=' + contact,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#misc_form_div').html(data.data);
                $('#misc_form_selection').hide();
                $('#miscFormReset').hide();
                $("#policy_info_panel input[placeholder]").placeholderLabel({
                    labelColor: "##497cb1", inInput: true, labelSize: "8px"
                });

            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting info for that form. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.sendSMS', function (e) {
    let sendingTo = '';
    const formId = $(this).closest("form").attr("id");
    const origTo = $("#" + formId + " .to_sms").val();
    const origToCoApp = $("#" + formId + " .to_sms_coapp").val();
    const origToBoth = $("#" + formId + " .to_sms_both").val();
    if ($(this).data('attr') === 'Applicant') {
        sendingTo = 'Applicant';
        var to = $("#" + formId + " .to_sms").val();
    }
    if ($(this).data('attr') === 'Co-Applicant') {
        sendingTo = 'Co-Applicant';
        var to = $("#" + formId + " .to_sms_coapp").val();
    }
    if ($(this).data('attr') === 'Both') {
        sendingTo = 'Both';
        var to = $("#" + formId + " .to_sms_both").val();
    }
    const form = $("#" + formId);
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        form.addClass('was-validated');
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        if (to.trim() === '' || to.trim() === '|') {
            if (sendingTo === 'Both') {
                displayAlert("Please add a Phone Number for both the Applicant and Co-Applicant to send them a message.", "error");
            } else {
                displayAlert("Please add a Phone Number for the " + sendingTo + " to send them a message.", "error");
            }

            return false;
        }
        const textareaObj = $('#' + formId + ' textarea[required]');
        if (checkTextareaValidity(textareaObj) === false) {
            return false;
        }
        const TempjsonData = localStorage.getItem("ContactTemp");
        let TempId = '';
        let TempType = '';
        let TemplatedContent = '';
        if (TempjsonData) {
            const jsonData = JSON.parse(TempjsonData);
            TempId = jsonData.TemplateId;
            TempType = jsonData.TemplateType;
            TemplatedContent = jsonData.TemplatedContent;
        }
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'check-sms-permissions=' + to,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    if (sendingTo === 'Applicant') {
                        $("#" + formId + " .to_sms_coapp").remove();
                        $("#" + formId + " .to_sms_both").remove();
                    }
                    if (sendingTo === 'Co-Applicant') {
                        $("#" + formId + " .to_sms").remove();
                        $("#" + formId + " .to_sms_both").remove();
                    }
                    if (sendingTo === 'Both') {
                        $("#" + formId + " .to_sms_coapp").remove();
                        $("#" + formId + " .to_sms").remove();
                    }
                    var formData = $("#" + formId).serializeArray();
                    formData.push({"name": "TempId", "value": TempId});
                    formData.push({"name": "TempType", "value": TempType});
                    formData.push({"name": "TemplatedContent", "value": TemplatedContent});
                    $.ajax({
                        timeout: 10000, type: "POST", url: url, data: formData, success: function (data, result) {
                            if (data && data.status === "Got Data") {
                                if (sendingTo === 'Both') {
                                    displayAlert("Messages Sent Successfully to both the Applicant and Co-Applicant. Refreshing the page in a moment.", "success");
                                } else {
                                    displayAlert("Message Sent Successfully. Refreshing the page in a moment.", "success");
                                }
                                localStorage.removeItem("ContactTemp");
                                setTimeout(location.reload.bind(location), 1000);
                            } else if (data && data.status === "numberRequired") {
                                if (sendingTo === 'Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                }
                                if (sendingTo === 'Co-Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                }
                                if (sendingTo === 'Both') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                }
                                if (sendingTo === 'Both') {
                                    displayAlert("Please add a Phone Number for both the Applicant and Co-Applicant to send them a message.", "error");
                                } else {
                                    displayAlert("Please add a Phone Number for the " + sendingTo + " to send them a message.", "error");
                                }
                            } else if (data && data.status === "Required") {
                                if (sendingTo === 'Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                }
                                if (sendingTo === 'Co-Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                }
                                if (sendingTo === 'Both') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                }
                                displayAlert("Please fill/select the required fields", "error");
                            } else if (data && data.status === "Inactive") {
                                if (sendingTo === 'Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                }
                                if (sendingTo === 'Co-Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                }
                                if (sendingTo === 'Both') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                }
                                displayAlert("SMS is disabled for Deleted/Inactive Contacts", "error");
                            } else {
                                if (sendingTo === 'Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                    Swal.fire('OOPS!', 'SMS Failed - ' + data.status, 'error')
                                }
                                if (sendingTo === 'Co-Applicant') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                    Swal.fire('OOPS!', 'SMS Failed - ' + data.status, 'error')
                                }
                                if (sendingTo === 'Both') {
                                    $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                    $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                    if (data.ApplicantResponse === 'Success' && data.CoApplicantResponse === 'Failed') {
                                        Swal.fire('OOPS!', 'SMS Failed - to the Co-Applicant, but the message was sent to the Applicant.', 'error')
                                    } else if (data.ApplicantResponse === 'Failed' && data.CoApplicantResponse === 'Success') {
                                        Swal.fire('OOPS!', 'SMS Failed - to the Applicant, but the message was sent to the Co-Applicant.', 'error')
                                    } else if (data.ApplicantResponse === 'Failed' && data.CoApplicantResponse === 'Failed') {
                                        Swal.fire('OOPS!', 'SMS Failed - to the Applicant, and Co-Applicant.', 'error')
                                    } else {
                                        Swal.fire('OOPS!', 'SMS Failed - ' + data.status, 'error')
                                    }
                                }
                            }
                        }
                    });
                } else {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success', cancelButton: 'btn btn-primary1',
                        }, buttonsStyling: false
                    })

                    swalWithBootstrapButtons.fire({
                        title: 'TCPA Compliance Check?',
                        text: "Have you received permissions from the client to text them?",
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, I have permission',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.value) {
                            if (sendingTo === 'Applicant') {
                                sendingTo = 'Applicant';
                                $("#" + formId + " .to_sms_coapp").remove();
                                $("#" + formId + " .to_sms_both").remove();
                            }
                            if (sendingTo === 'Co-Applicant') {
                                $("#" + formId + " .to_sms").remove();
                                $("#" + formId + " .to_sms_both").remove();
                            }
                            if (sendingTo === 'Both') {
                                $("#" + formId + " .to_sms_coapp").remove();
                                $("#" + formId + " .to_sms").remove();
                            }
                            $('#' + formId).append("<input type='hidden' name='hasSMSPermission' value='true' />");
                            const formData = $("#" + formId).serializeArray();
                            formData.push({"name": "TempId", "value": TempId});
                            formData.push({"name": "TempType", "value": TempType});
                            formData.push({"name": "TemplatedContent", "value": TemplatedContent});
                            $.ajax({
                                timeout: 10000,
                                type: "POST",
                                url: url,
                                data: formData,
                                success: function (data, result) {
                                    if (data && data.status === "Got Data") {
                                        if (sendingTo === 'Both') {
                                            displayAlert("Messages Sent Successfully to both the Applicant and Co-Applicant. Refreshing the page in a moment.", "success");
                                        } else {
                                            displayAlert("Message Sent Successfully. Refreshing the page in a moment.", "success");
                                        }
                                        localStorage.removeItem("ContactTemp");
                                        setTimeout(location.reload.bind(location), 1000);
                                    } else if (data && data.status === "numberRequired") {
                                        if (sendingTo === 'Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                        }
                                        if (sendingTo === 'Co-Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                        }
                                        if (sendingTo === 'Both') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                        }
                                        if (sendingTo === 'Both') {
                                            displayAlert("Please add a Phone Number for both the Applicant and Co-Applicant to send them a message.", "error");
                                        } else {
                                            displayAlert("Please add a Phone Number for the " + sendingTo + " to send them a message.", "error");
                                        }
                                    } else if (data && data.status === "Required") {
                                        if (sendingTo === 'Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                        }
                                        if (sendingTo === 'Co-Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                        }
                                        if (sendingTo === 'Both') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                        }
                                        displayAlert("Please fill/select the required fields", "error");
                                    } else if (data && data.status === "Inactive") {
                                        if (sendingTo === 'Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                        }
                                        if (sendingTo === 'Co-Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                        }
                                        if (sendingTo === 'Both') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                        }
                                        displayAlert("SMS is disabled for Deleted/Inactive Contacts", "error");
                                    } else {
                                        if (sendingTo === 'Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                            Swal.fire('OOPS!', 'SMS Failed - ' + data.status, 'error')
                                        }
                                        if (sendingTo === 'Co-Applicant') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_both' class='to_sms_both' value='" + origToBoth + "' />");
                                            Swal.fire('OOPS!', 'SMS Failed - ' + data.status, 'error')
                                        }
                                        if (sendingTo === 'Both') {
                                            $('#' + formId).append("<input type='hidden' name='to_sms' class='to_sms' value='" + origTo + "' />");
                                            $('#' + formId).append("<input type='hidden' name='to_sms_coapp' class='to_sms_coapp' value='" + origToCoApp + "' />");
                                            if (data.ApplicantResponse === 'Success' && data.CoApplicantResponse === 'Failed') {
                                                Swal.fire('OOPS!', 'SMS Failed - to the Co-Applicant, but the message was sent to the Applicant.', 'error')
                                            } else if (data.ApplicantResponse === 'Failed' && data.CoApplicantResponse === 'Success') {
                                                Swal.fire('OOPS!', 'SMS Failed - to the Applicant, but the message was sent to the Co-Applicant.', 'error')
                                            } else if (data.ApplicantResponse === 'Failed' && data.CoApplicantResponse === 'Failed') {
                                                Swal.fire('OOPS!', 'SMS Failed - to the Applicant, and Co-Applicant.', 'error')
                                            } else {
                                                Swal.fire('OOPS!', 'SMS Failed - ' + data.status, 'error')
                                            }
                                        }
                                    }
                                }
                            });
                        } else if (result.value === '') {
                            displayAlert("You must have permission to text the client.", "info");

                        } else if (/* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.cancel) {

                        }
                    });
                }
            }
        });
    }
    return false; // avoid to execute the actual submit of the form.
});

function renderView() {
    return 768 <= window.innerWidth && window.innerWidth < 1200 ? "timeGridWeek" : window.innerWidth <= 768 ? "listMonth" : "dayGridMonth"
}

$(document).on('click', '#v-pills-home-tab', function (e) {
    if ($('#calendar').hasClass('fc')) {

    } else {
        setTimeout(() => {
            const url = "functions/functions.php";
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: 'getWebinarsForCalendar=true',
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        const calendarEl = document.getElementById('calendar');
                        y = new FullCalendar.Calendar(calendarEl, {
                            editable: !1,
                            droppable: !1,
                            selectable: !0,
                            initialView: renderView(),
                            weekends: false,
                            hiddenDays: [1, 5],
                            themeSystem: "bootstrap",
                            views: {
                                dayGridMonth: {
                                    dayHeaderFormat: {weekday: 'long'}
                                }
                            },
                            slotDuration: {
                                days: 1
                            },
                            slotLabelInterval: {
                                days: 1
                            },
                            headerToolbar: {
                                left: "prev,next today", center: "title", right: "dayGridMonth"
                            },
                            displayEventEnd: true,
                            windowResize: function (e) {
                                const t = renderView();
                                y.changeView(t)
                            },
                            eventDidMount: function (e) {
                                let t;
                                "done" === e.event.extendedProps.status && (e.el.style.backgroundColor = "red", (t = e.el.getElementsByClassName("fc-event-dot")[0]) && (t.style.backgroundColor = "white"))
                            },
                            eventClick: function (e) {
                                const eventId = e.event.id;
                                const eventSubject = e.event.title;
                                const specificDate = e.event.startStr;
                                if ($('#description').length > 0) {
                                    $('#description').val(eventSubject);
                                } else {
                                    $('#trainingModalForm').append('<input type="hidden" id="description" name="trainingDescription" value="' + eventSubject + '" />');
                                }
                                if ($('#meetingId').length > 0) {
                                    $('#meetingId').val(eventId);
                                } else {
                                    $('#trainingModalForm').append('<input type="hidden" id="meetingId" name="meetingId" value="' + eventId + '" />');
                                }
                                if ($('#specificDate').length > 0) {
                                    $('#specificDate').val(specificDate);
                                } else {
                                    $('#trainingModalForm').append('<input type="hidden" id="specificDate" name="specificDate" value="' + specificDate + '" />');
                                }
                                $('#trainingModal').modal('show');
                            },
                            eventContent: function (arg) {
                                // Get the time zone abbreviation dynamically
                                const date = new Date(arg.event.start); // Event start date
                                const options = {timeZoneName: 'short'};
                                const formatter = new Intl.DateTimeFormat('en-US', options);
                                const parts = formatter.formatToParts(date);
                                const timeZoneAbbreviation = parts.find(part => part.type === 'timeZoneName').value;
                                const formatterDay = new Intl.DateTimeFormat('en-US', {weekday: 'short'});
                                const shortDayName = formatterDay.format(date);
                                const registrationLink = arg?.event?.registrationLink || "";
                                // Custom event rendering with time zone
                                let customHtml = `
                <div class="fc-event-time" data-value="${registrationLink}">
                    <i class="fa-regular fa-clock" data-value="${registrationLink}"></i> ${shortDayName} ${arg.timeText} (${timeZoneAbbreviation})
                </div>
                <div class="fc-event-title" data-value="${registrationLink}">${arg.event.title}</div>
            `;
                                return {html: customHtml};
                            },
                            events: data.events
                        });
                        y.render();

                    }
                }
            });
        }, 1000);
    }
});

$(document).on('click', '.dismissHistory', function (event) {
    const elem = $(this);
    elem.attr('disabled', true);
    const url = "functions/functions.php";
    const val = $(this).attr('data-value');
    const count = $('.historyNotificationCounterBadge').html(); // Get the HTML content
    let countAsInteger = parseInt(count, 10); // Convert to integer
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'dismissHistory=' + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Success! Marked as Dismissed.", "message");
                countAsInteger -= 1; // Subtract 1
                if (countAsInteger >= 0) {
                    $('.historyNotificationCounterBadge').html(`${countAsInteger}`);
                } else {
                    $('.historyNotificationCounterBadge').html(`0`);
                }
                elem.remove();
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! That did not work, try again or contact Support for assistance.", "error");
                elem.attr('disabled', false);
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.markMessageRead, .markMessageUnRead', function (event) {
    let param = '';
    const closestRow = $(this).closest('tr');
    const tableId = closestRow.closest('table').attr('id');
    if ($(this).hasClass('markMessageRead')) {
        param = 'markMessageRead';
    } else {
        param = 'markMessageUnRead';
    }
    const elem = $(this);
    const url = "functions/functions.php";
    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: param + '=' + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (param === 'markMessageRead') {
                    displayAlert("Success! Message marked as Read.", "success");
                    if (tableId === 'unread-messages-table') {
                        closestRow.remove();
                    }
                    elem.removeClass('fa-regular fa-eye').addClass('fa-regular fa-eye-slash');
                } else {
                    displayAlert("Success! Message marked as Un-Read.", "success");
                    if (tableId === 'read-messages-table') {
                        closestRow.remove();
                    }
                    elem.removeClass('fa-regular fa-eye-slash').addClass('fa-regular fa-eye');
                }
            }
            if (data && data.status !== "Got Data") {
                if (param === 'markMessageRead') {
                    displayAlert("Whoops! There was a problem marking that message as read. Please try again.", "error");
                } else {
                    displayAlert("Whoops! There was a problem marking that message as un-read. Please try again.", "error");
                }
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', 'a#messages-info-tab', function (event) {
    const contact = $(this).attr('data-value');
    $.post("functions/functions.php", "mark-messages-read=" + contact, function (data) {
    });
});

$(document).on('submit', '#sendEmail', function (e) {
    const form = $("#sendEmail");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        const parameter = new URLSearchParams(window.location.search);
        const contactID = parameter.get('Contact');
        const formData = $("#sendEmail").serializeArray();
        const TempjsonData = localStorage.getItem("ContactTemp");
        let TempId = '';
        let TempType = '';
        let TemplatedContent = '';
        if (TempjsonData) {
            const jsonData = JSON.parse(TempjsonData);
            TempId = jsonData.TemplateId;
            TempType = jsonData.TemplateType;
            TemplatedContent = jsonData.TemplatedContent;
        }
        formData.push({"name": "TempId", "value": TempId});
        formData.push({"name": "TempType", "value": TempType});
        formData.push({"name": "TemplatedContent", "value": TemplatedContent});
        formData.push({"name": "contactId", "value": contactID});

        const vendor = $('#sendEmail #to_vendor').val();
        const to_email = $('#sendEmail #to_email').val();
        if (to_email === '') {
            displayAlert("Email To can't be empty. Please edit the contact and fill the valid email address, try again!", "error");
            return false;
        }
        $.ajax({
            timeout: 10000, type: "POST", url: url, data: formData, beforeSend: function () {
                ShowLoader();
            }, success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert(data.message, "success");

                    $('#sendEmail #email-content-contact, #sendEmail #to-sub-contact, #sendEmail #to_email_cc, #sendEmail #to_email_bcc').val('');
                    $('#sendEmail #attachment,#sendEmail #attached-template-content').val('').trigger('change');
                    $("#sendEmail #attachment").val([]).trigger('change');
                    $('#sendEmail #confirm-template-attach1').val('0').trigger('change');
                    $('#sendEmail #to_email').val(to_email);
                    setTimeout(() => {
                        $('#sendEmail').attr('class', "needs-validation row")
                    }, 1);
                    localStorage.removeItem("ContactTemp");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "RequiredNdFormat") {
                    displayAlert(data.message, "error");
                } else {
                    displayAlert("Whoops! There was a problem sending your Email. Due to " + data.message, "error");
                }
            }
        });
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.
});
$(document).on('submit', '#send_email', function (e) {

    const form = $("#send_email");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        event.preventDefault();
        const url = "functions/functions.php";
        const parameter = new URLSearchParams(window.location.search);
        const contactID = parameter.get('Contact');
        const TempjsonData = localStorage.getItem("ContactTemp");
        let TempId = '';
        let TempType = '';
        let TemplatedContent = '';
        if (TempjsonData) {
            const jsonData = JSON.parse(TempjsonData);
            TempId = jsonData.TemplateId;
            TempType = jsonData.TemplateType;
            TemplatedContent = jsonData.TemplatedContent;
        }
        const formData = $("#send_email").serializeArray();

        formData.push({"name": "contactId", "value": contactID});
        formData.push({"name": "TempId", "value": TempId});
        formData.push({"name": "TempType", "value": TempType});
        formData.push({"name": "TemplatedContent", "value": TemplatedContent});

        const vendor = $('#send_email #to_vendor').val();
        const to_email = $('#send_email #to_email').val();
        $.ajax({
            timeout: 10000, type: "POST", url: url, data: formData, beforeSend: function () {
                ShowLoader();
            }, success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert("Email Sent Successfully.", "success");

                    $('#send_email #email-content-contact, #send_email #to-sub-contact').val('');
                    $('#send_email #attachment,#send_email #attached-template-content').val('').trigger('change');
                    $("#send_email #attachment").val([]).trigger('change');
                    $('#send_email #confirm-template-attach').val('0').trigger('change');
                    $('#send_email #to_email').val(to_email);
                    localStorage.removeItem("ContactTemp");
                    //setTimeout(location.reload.bind(location), 1000);
                    setTimeout(() => {
                        $('#send_email').attr('class', "needs-validation row")
                    }, 1);

                } else if (data && data.status === "RequiredNdFormat") {
                    displayAlert(data.message, "error");
                } else {
                    displayAlert("Whoops! There was a problem sending your message. Due to " + data.message, "error");
                }
            }
        });

    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.commission-edit', function (event) {
    event.preventDefault();
    const carrierid = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'edit-commission=' + carrierid,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#policy_info_panel').html(data.data);
                $('#side-panel-title').html('Update Carrier Commissions');
                $('#side-panel-toggle').trigger('click');
                $("#policy_info_panel input[placeholder]").placeholderLabel({
                    labelColor: "##497cb1", inInput: true, labelSize: "8px"
                });

            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting commissions for that carrier. Please try again.", "error");
            }
        }
    })
    return false; //for good measure
});

$(document).on('submit', '#updCarrierCommission', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#updCarrierCommission").serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Commissions Updated Successfully. Refreshing the page, please wait", "success");
                $('#policy_info_panel').html('');
                $('#side-panel-toggle').trigger('click');
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating commissions for that carrier. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '#getCarrierStatsButton', function (event) {
    const days = $('#stats-history-selector').val();
    $('#loader-wrapper-1').show();
    $('#search-div').hide();
    $('#reset-div').show();
    const url = "functions/functions.php";
    $('#stats-div').html('');

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        dataType: "json",
        data: 'get-carrier-stats-history=' + days,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#stats-div').html(data.data);
                $('#carrier-selected-table').DataTable({
                    'order': [[1, 'desc']]
                });
                $('#loader-wrapper-1').hide();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });


    return false; //for good measure
});

$(document).on('click', '#resetCarrierStatsButton', function (event) {
    $('#search-div').show();
    $('#reset-div').hide();
    $('#loader-wrapper-1').hide();
    $('#stats-div').html('');
    return false; //for good measure
});

$(document).on('click', '#mapChartTab', function (event) {
    if ($("#mapdiv").length) {
    } else {

        const fromzip = $('#from-zip-carrier').val();
        const tozip = $('#to-zip-carrier').val();
        const carrier = $('#carrier-stats-selector').val();
        $('#loader-map-1').show();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            processData: false,
            data: 'get-carrier-stats-map=' + carrier + '&mapfromzip=' + fromzip + '&maptozip=' + tozip,
            success: function (data, result) {
                $('#loader-map-1').hide();
                $('#map-5').html(data);

            }
        });

    }
    return false; //for good measure
});

$(document).on('click', '#hideContact', function (event) {
    const contact_id = $(this).attr('data-value');
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'hide-contact=' + contact_id,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Contact is Hidden Successfully. Refreshing the page, please wait.", "success")

                $('#policy_info_panel').html('');
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem hiding this contact. Please try again.", "error")

            }
        }
    });

    return false; //for good measure
});
$(document).on('click', '#undel_contact, .restoreContact', function (event) {
    const contact_id = $(this).attr('data-value');
    const url = "functions/functions.php";
    const ele = $(this);
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'un-delete-contact=' + contact_id,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Contact Restored Successfully. Refreshing the page, please wait", "success")
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem restoring this contact. Please try again.", "error")
            }
        }
    });
    return false; //for good measure
});

$(document).on('click', '#unhide_contact', function (event) {
    const contact_id = $(this).attr('data-value');
    const url = "functions/functions.php";
    const ele = $(this);
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'un-hide-contact=' + contact_id,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Contact is unhidden Successfully. Refreshing the page, please wait", "success")
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem making this contact unhidden. Please try again.", "error")

            }
        }
    });

    return false; //for good measure
});

$(document).on('click', '.restorePolicy', function (event) {
    const policy_id = $(this).attr('data-value');
    const url = "functions/functions.php";
    const ele = $(this);
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'un-delete-policy=' + policy_id,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Policy Normal Successfully. Refreshing the page, please wait", "success")

                setTimeout(location.reload.bind(location), 3000);
                ele.html('DELETE POLICY');

            } else if (data && data.status === "Duplicate") {
                const duplicatePolicy = data?.duplicatePolicyId || "";
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
                    }, buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Duplicate Policy Detected',
                    text: "We detected another policy with the same Policy Number, Effective Date and Expiration Date. We cannot restore this policy without marking the other deleted. Please select an option below.",
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Open Policy Found',
                    cancelButtonText: 'Delete Policy Found & Restore',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        window.location = `policy.php?Policy=${duplicatePolicy}`
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        $.ajax({
                            timeout: 10000,
                            url: 'functions/functions.php',
                            type: "POST",
                            data: 'del_policy_id=' + duplicatePolicy,
                            dataType: "json",
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {
                                    displayAlert("Policy deleted successfully. Restoring this Policy.", "success");
                                    $.ajax({
                                        timeout: 10000,
                                        type: "POST",
                                        url: url,
                                        processData: false,
                                        data: 'un-delete-policy=' + policy_id,
                                        success: function (data, result) {
                                            if (data && data.status === "Got Data") {
                                                displayAlert("Policy Normal Successfully. Refreshing the page, please wait", "success")

                                                setTimeout(location.reload.bind(location), 3000);
                                                ele.html('DELETE POLICY');

                                            } else {
                                                displayAlert("Whoops! There was a problem restoring this policy. Please try again.", "error")

                                            }
                                        }
                                    });

                                }
                                if (data && data.status !== "Got Data") {
                                    displayAlert("Whoops! There was a problem deleting your policy. Please try again.", "error")
                                }
                            }
                        })
                    }
                })
            } else {
                displayAlert("Whoops! There was a problem restoring this policy. Please try again.", "error")
            }
        }
    });

    return false; //for good measure
});

$(document).on('click', '#unhideContact', function (event) {
    const contact_id = $(this).attr('data-value');
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'un-hide-contact=' + contact_id,
        success: function (data, result) {
            if (data && data.status === "Got Data") {

                displayAlert("Contact Un-Hidden Successfully. Refreshing the page, please wait", "success")

                $('#policy_info_panel').html('');

                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {

                displayAlert("Whoops! There was a problem hiding this contact. Please try again.", "error")

            }
        }
    });

    return false; //for good measure
});


$(document).on('submit', '#new_claim_form', function (e) {

    const form = $("#new_claim_form");

    const textareaObj = $('#new_claim_form textarea[required]');

    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();

        if (checkTextareaValidity(textareaObj) === false) {
            return false;
        }

        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000, type: "POST", url: url, data: $("#new_claim_form").serialize(), beforeSend: function () {

                ShowLoader();
            }, success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert("Claim added Successfully, refreshing page in a moment.", "success")
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === 'Required') {
                    displayAlert("Please fill the required fields in their proper format", "error");
                } else {
                    displayAlert("Whoops! There was a problem adding your claim. Please try again.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('keyup', '#new_claim_form textarea[required]', function () {
    const textareaObj = $('#new_claim_form textarea[required]');

    checkTextareaValidity(textareaObj);
});

$(document).on('keyup', '#sendSMS textarea[required]', function () {
    const textareaObj = $('#sendSMS textarea[required]');
    checkTextareaValidity(textareaObj);
});

$(document).on('keyup', '#send_sms textarea[required]', function () {
    const textareaObj = $('#send_sms textarea[required]');
    checkTextareaValidity(textareaObj);
});

$(document).on('keyup', '#stickynotes textarea[required]', function () {
    const textareaObj = $('#stickynotes textarea[required]');
    checkTextareaValidity(textareaObj);
});

$(document).on('keyup', '#addQuickNote textarea[required]', function () {
    const textareaObj = $('#addQuickNote textarea[required]');
    checkTextareaValidity(textareaObj);
});

function checkTextareaValidity(textareaObj) {
    const re = /^.*\S+.*$/;

    if (textareaObj.closest('form').hasClass('was-validated')) {
        if ((re).test(textareaObj.val().trim())) {
            textareaObj[0].setCustomValidity("");
            return true;
        } else {
            if (textareaObj.val().trim() === '') {
                textareaObj[0].setCustomValidity("invalid");
                return false;
            } else {
                textareaObj[0].setCustomValidity("");
                return true;
            }
        }
    }
}

$(document).on('click', '.claimPaidButton', function (event) {
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "When was the claim paid?",
        input: 'text',
        inputPlaceholder: 'Enter date in MM-DD-YYYY format',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Mark Paid!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'mark-claim-paid=' + val + '&claim-paid-date=' + result.value,
                success: function (response) {
                    displayAlert("Claim - " + val + " marked paid successfully", "success",);
                    setTimeout(location.reload.bind(location), 3000);
                }
            })

        } else if (result.value === '') {
            alert('You have to enter a date to mark this claim paid.');

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })

});

$(document).on('submit', '#newMsgTemplate', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#newMsgTemplate").serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Template added successfully.", "success");
                $("#new-msg-temp-content").val('');
                $("#new-msg-temp-name").val('');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem adding your template. Please try again. ERROR: " + data.status_msg, "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '.module-task-select', function (event) {
    const url = "functions/functions.php";
    const curr_num = $('.module-task-select').length;
    const val = $(this).val();
    if (curr_num === 1) {
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'check-msg-templates=' + val,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    const curr_num = $('.module-task-select').length;
                    if (curr_num === 1) {
                        $('#template_div').html(data.data);
                    }
                    if (curr_num > 1) {
                        $('#template_div').append(data.data);
                    }
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem getting templates for that task type. Please try again.", "error");
                }
            }
        });
    }


    if (curr_num > 1) {
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'check-msg-templates=' + val + '&additional-wf-task=true&task-counter=' + curr_num,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    const curr_num = $('.module-task-select').length;
                    if (curr_num === 1) {
                        $('#template_div').html(data.data);
                    }
                    if (curr_num > 1) {
                        $('#template_div').append(data.data);
                    }
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem getting templates for that task type. Please try again!", "error");
                }
            }
        });
    }

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('change', '.module-trigger-select', function (event) {


});


$(document).on('click', '.module-task-select-add', function (event) {
    const url = "functions/functions.php";
    const val = $('#check-msg-templates').val();
    const curr_num = $('.module-task-select').length;
    const mod = $('#module-select').val();
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'check-msg-templates=' + val + '&check-msg-templates-count=' + curr_num + '&get-more-awf-tasks=' + mod,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#template_div').append(data.data);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting templates for that task type. Please try again!", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.module-task-select-rem', function (event) {
    const val = $(this).attr('data-value');
    $('.task-' + val).remove();
    $('#module-task-select-add-' + val).remove();
    $('#module-task-select-rem-' + val).remove();
    displayAlert("Task: " + val + " removed.", "success");
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.editProperty', function (event) {

    val = $(this).attr('data-value');
    $.post("functions/functions.php", "edit-property=" + val, function (data) {
        launchCenteredModal(data.data, "Edit Property");
    });
});

$(document).on('click', '.remove_linked_contact', function (event) {
    const contact_id = $(this).attr('data-value');

    const mcid = $("input[name='main-linked-contact-assoc']").val();

    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'remove-linked-contact=' + contact_id + '&main-contact=' + mcid,
        success: function (data, result) {
            if (data && data.status === "Got Data") {

                displayAlert("Contact Link Removed Successfully. Refreshing the page, please wait", "success")

                setTimeout(location.reload.bind(location), 3000);
            } else if (data && data.status === "Inactive") {
                displayAlert("Operation couldn't be performed for Deleted/Hidden Contact", "error");
            } else {

                displayAlert("Whoops! There was a problem removing the link for this contact. Please try again.", "error")

            }
        }
    });
    return false; //for good measure
});

$(document).on('submit', '.addLinkedContact', function (e) {

    const form = $(".addLinkedContact");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $(".addLinkedContact").serialize() + '&link_contact_de=1',
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Linked Contact Successfully. Refreshing the page, please wait.", "success")
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all the required fields", "error");
                    HideLoader();
                } else if (data && data.status === "Exist") {
                    displayAlert("This Relationship already exists.", "error");
                    HideLoader();
                } else if (data && data.status === "Inactive") {
                    displayAlert("Deleted/Inactive contact cannot be linked", "error");
                    HideLoader();
                } else {
                    displayAlert("Whoops! There was a problem linking these contacts. Please try again.", "error")
                    HideLoader();
                }
            }
        });
    }

    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#addLinkedContact_main', function (e) {

    const form = $("#addLinkedContact_main");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#addLinkedContact_main").serialize() + '&link_contact=1',
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Linked Contact Successfully. Refreshing the page, please wait.", "success")
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Required") {
                    displayAlert("Please fill all the required fields", "error");
                    HideLoader();
                } else if (data && data.status === "Exist") {
                    displayAlert("This Relationship already exists.", "error");
                    HideLoader();
                } else if (data && data.status === "Inactive") {
                    displayAlert("Deleted/Hidden Contact cannot be linked.", "error");
                    HideLoader();
                } else {
                    displayAlert("Whoops! There was a problem linking these contacts. Please try again.", "error");
                    HideLoader();
                }
            }
        });
    }

    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('submit', '#edit_property_form', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#edit_property_form").serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Property Updated Successfully, refreshing page in a moment.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating that property. Please try again.", "error");
                setTimeout(location.reload.bind(location), 3000);
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#misc_form_fill', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#misc_form_fill").serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Please see below for your generated form.", "Success");

                $('#generatedForm').html(data.data);
                $('#misc_form_fill').hide();
                $('#miscFormReset').show();
            }
            if (data && data.status !== "Got Data") {

                displayAlert("Whoops! There was a problem generating your form. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

function displayAlert(message, type) {
    switch (type) {
        case "success":
            alertify.set("notifier", "position", "top-center");
            alertify.success(message);
            break;
        case "error":
            alertify.set("notifier", "position", "top-center");
            alertify.error(message);
            break;
        case "message":
            alertify.set("notifier", "position", "top-center");
            alertify.message(message);
            break;
        case "info":
            alertify.set("notifier", "position", "top-center");
            alertify.message(message);
            break;
        default:
            return true;
    }
}

$(document).on('submit', '#addQuickNote', function (e) {
    const form = $("#addQuickNote");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        $('#addQuickNote').addClass('was-validated');
        return false;
    } else {
        e.preventDefault();

        const textareaObj = $('#addQuickNote textarea[required]');
        if (checkTextareaValidity(textareaObj) === false) {
            return false;
        }

        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#addQuickNote").serialize(),
            success: function (data, result) {
                if (data && data.status === "Success") {
                    displayAlert(data.message, "success");
                    $('#quickNote').val("");
                    form.removeClass('was-validated');
                    ContactNotesTableV2('All');
                } else {
                    displayAlert(data.message, "error")
                }
            }
        });
    }

    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#addQuickPolicyNote', function (e) {
    const form = $("#addQuickPolicyNote");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        $('#addQuickPolicyNote').addClass('was-validated');
        return false;
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#addQuickPolicyNote").serialize(),
            success: function (data, result) {
                if (data && data.status === "Success") {
                    displayAlert(data.message, "success")
                    setTimeout(location.reload.bind(location), 3000);
                } else {
                    displayAlert(data.message, "error")

                }
            }
        });

    }

    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#formReset', function (event) {
    $('#generatedForm').html('');
    $('#misc_form_fill').show();
    $('#miscFormReset').hide();
    $('#misc_form_selection').show();
});

async function addContactNote() {
    const url = "functions/functions.php";
    const {value} = await Swal.fire({
        input: "textarea",
        inputLabel: "Contact Note",
        inputPlaceholder: "Type your contact note here...",
        inputAttributes: {
            "aria-label": "Type your contact note here..."
        },
        showCancelButton: true,
        preConfirm: () => {
            const cn = document.getElementById("swal2-textarea").value;

            if (cn.trim().length > 0) return {quickNote: cn};

            Swal.showValidationMessage("Please enter a non-empty contact note or cancel.");
        }
    });

    if (!value?.quickNote) return;

    const contact_note_obj = {
        "quickNote": value.quickNote, "quickNoteCID": $("#quickNoteCID").val()
    };

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: (new URLSearchParams(contact_note_obj)).toString(),
        success: function (data, result) {
            if (data && data.status === "Success") {
                displayAlert(data.message, "success");
                ContactNotesTableV2('All');
                getContactTabCounters();
            } else {
                displayAlert(data.message, "error")
            }
        }
    });
}

async function addPolicyNote() {
    const url = "functions/functions.php";
    const data = JSON.parse(await $.ajax({
        timeout: 10000, type: "POST", url: url, data: {
            "action": "getpolicylist", "contact": GetURLParameter("Contact")
        }
    }));

    if (!data) {
        Swal.fire({
            icon: "error",
            title: "No Policy",
            text: "This Contact does not have a Policy that a Note can be added to. Please create a Policy before trying to add a Policy Note."
        });
        return;
    }

    let html = `
        <label for="swal2-select">Policy #: </label>
        <select id="swal2-select" class="swal2-select mx-2">
        <option value="" ${data.length > 1 ? "selected" : ""} disabled="">Select a Policy</option>`;

    data.forEach(({PolicyId, policy_number}, index) => {
        html += `<option value="${PolicyId}" id="${policy_number}" ${(index === 0 && (data.length === 1)) ? "selected" : ""}>${policy_number}</option>`;
    });

    html += `</select><textarea id="swal2-textarea1" class="swal2-textarea1" style="width: 350px; height: 200px;"></textarea>`;

    const {value} = await Swal.fire({
        title: "Create Note for Policy", html: html, showCancelButton: true, focusConfirm: false, preConfirm: () => {
            const select = document.getElementById("swal2-select");
            const pid = select.options[select.selectedIndex].value;
            const pn = document.getElementById("swal2-textarea1").value;

            if (pid.length !== 0 && pn.trim().length !== 0) return {
                PolicyId: pid, policy_note: pn
            };

            if (pid.length === 0) Swal.showValidationMessage("Please select a policy #"); else Swal.showValidationMessage("Please enter a non-empty policy note or cancel.");
        }
    });

    if (!value) return;

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: {
            quickNotePID: value.PolicyId, quickNotePCID: GetURLParameter("Contact"), quickPolicyNote: value.policy_note
        }, success: function (data, result) {
            if (data && data.status === "Success") {
                displayAlert("Policy Note Added!", "success");
                PolicyNotesTableV2('All');
                getContactTabCounters();
            } else {
                displayAlert(data.message, "error")
            }
        }
    });
}

$(document).on('click', '.addNoteGeneral', async (event) => {
    const {value: note_type} = await Swal.fire({
        input: "select", inputOptions: {
            "Contact Note": "Contact Note", "Policy Note": "Policy Note"
        }, inputPlaceholder: "Select a Note Type", showCancelButton: true
    });

    switch (note_type) {
        case "Contact Note":
            addContactNote();
            break;
        case "Policy Note":
            addPolicyNote();
            break;
    }
});

$(document).on('click', '.appendContactNote', function (event) {
    val = $(this).attr('data-value');
    const curnote = $(this).closest('td').prev('td').html();
    const item = $(this).closest('td').prev('td');
    const contactId = $('#quickNoteCID').val();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
        title: 'Note to Add',
        input: 'textarea',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, add them!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value === "") {
            displayAlert("You did not enter anything so there was nothing to add!", "error");
            return false;
        } else {
            if (result.value) {
                if (result.value.trim() === "") {
                    displayAlert("Please add some notes", "error");
                    return false;
                }

                $.ajax({
                    timeout: 10000,
                    type: "POST",
                    url: 'functions/functions.php',
                    data: 'appendContactNote=' + val + '&appendContactNotes=' + result.value + '&ContactId=' + contactId,
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            displayAlert("Note appended successfully.", "success")
                            ContactNotesTableV2('All');
                        } else if (data && data.status === "Inactive") {
                            displayAlert("Note cannot be appended for Deleted/Hidden Contact", "error");
                        } else {
                            displayAlert("Whoops! There was a problem adding to that note. Please try again.", "error");
                        }
                    }
                });
            }
        }
    });
});

$(document).on('click', '.deleteContactNote', function(event) {
    val = $(this).attr('data-value');
    event.preventDefault();
    var url = "functions/functions.php"; // the script where you handle the form input.
    var tr = $(this).closest('tr');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This is not recoverable, the note entry will be permanently deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'delete-contact-note=' + val,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Entry removed.", "success");
                        tr.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("There was an issue removing that note, please try again or contact Support for assistance.", "error");
                    }
                },
                error: function (xhr, status, error) {
                    displayAlert("There was an issue removing that note, please try again or contact Support for assistance.", "error");
                }
            });

        } else {
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        }
    })



    return false; // avoid to execute the actual submit of the form.

});

$(document).on('click', '.appendPolicyNote', function (event) {

    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Note to Add',
        input: 'textarea',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, add them!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'appendPolicyNote=' + val + '&appendPolicyNotes=' + result.value,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Note appended successfully. Refreshing the page, please wait", "success");
                        setTimeout(location.reload.bind(location), 3000);

                    } else {
                        displayAlert("Whoops! There was a problem adding to that note. Please try again.", "error");
                    }
                }

            })

        } else if (result.value === '') {

            displayAlert("You did not enter anything so there was nothing to add!", "info");
        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })


});

$(document).on('click', '.deletePolicyNote', function(event) {
    val = $(this).attr('data-value');
    event.preventDefault();
    var url = "functions/functions.php"; // the script where you handle the form input.
    var tr = $(this).closest('tr');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This is not recoverable, the note entry will be permanently deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'delete-policy-note=' + val,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Entry removed.", "success");
                        tr.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("There was an issue removing that note, please try again or contact Support for assistance.", "error");
                    }
                },
                error: function (xhr, status, error) {
                    displayAlert("There was an issue removing that note, please try again or contact Support for assistance.", "error");
                }
            });

        } else {
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        }
    })



    return false; // avoid to execute the actual submit of the form.

});

$(document).on('click', '.appendTaskNote', function (event) {

    val = $(this).attr('data-value');

    $('#get-chartData').modal('hide');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var contactId = urlParams.get('Contact');

    if (contactId === null || typeof contactId === 'undefined') {
        var contactId = $(this).parents('td[data-column-id="addToNotes"]').siblings('td[data-column-id="contact"]').find('a').attr('data-value');
    }
    if (contactId === null || typeof contactId === 'undefined') {
        var contactId = $(this).attr('data-id');
    }

    if (contactId === null || contactId === 'undefined' || contactId === '' || typeof contactId === 'undefined') {
        displayAlert("Whoops! There was a problem adding that note. Please try again.", "error");
    } else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
            }, buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Note to Add',
            input: 'textarea',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, add them!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {

                if (result.value.trim() === "") {
                    displayAlert("Please add some notes", "error");
                    return false;
                }

                $.ajax({
                    timeout: 10000,
                    type: "POST",
                    url: 'functions/functions.php',
                    data: 'appendTaskNote=' + val + '&appendTaskNotes=' + result.value + '&ContactId=' + contactId,
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            displayAlert("Note appended successfully. Refreshing the page in a moment.", "success")
                            setTimeout(location.reload.bind(location), 3000);
                        } else if (data && data.status === "Inactive") {
                            displayAlert("This operation couldn't be performed for Deleted/Hidden Contact.", "error");
                        } else {
                            displayAlert("Whoops! There was a problem adding to that note. Please try again.", "error")
                        }
                    }
                });

            } else if (result.value && data === '') {
                displayAlert("You did not enter anything so there was nothing to add!", "error");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            } else {
                displayAlert("You did not enter anything so there was nothing to add!", "error");
            }
        })
    }

});

$(document).on('click', '.deleteTaskNote', function(event) {
    val = $(this).attr('data-value');
    event.preventDefault();
    var url = "functions/functions.php"; // the script where you handle the form input.
    var tr = $(this).closest('tr');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This is not recoverable, the note entry will be permanently deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'delete-task-note=' + val,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Entry removed.", "success");
                        tr.remove();
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("There was an issue removing that note, please try again or contact Support for assistance.", "error");
                    }
                },
                error: function (xhr, status, error) {
                    displayAlert("There was an issue removing that note, please try again or contact Support for assistance.", "error");
                }
            });

        } else {
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        }
    })



    return false; // avoid to execute the actual submit of the form.

});


// Add event listener for opening and closing details
$('#dashboard-task-table').on('click', 'td.details-control', function () {
    const tr = $(this).closest('tr');
    const row = vbot_table.row(tr);
    const client = tr.attr('data-value');

    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    } else {
        displayAlert("Working on it, please wait!", "info");
        // Open this row
        format(row.child, client);
        tr.addClass('shown');
    }
});

function format(callback, client) {
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        data: 'get_sub_tasks=' + client,
        type: 'POST',
        dataType: "json",
        complete: function (response) {
            const data = JSON.parse(response.responseText);
            let thead = '', tbody = '';
            for (let key in data[0]) {
                thead += '<th>' + key + '</th>';
            }
            $.each(data, function (i, d) {
                tbody += '<tr><td>' + d.Owner + '</td><td>' + d.Status + '</td><td>' + d.Description + '</td><td>' + d.Due + '</td><td>' + d.Priority + '</td></tr>';
            });
            callback($('<table class="table table-sorting dataTable no-footer">' + thead + tbody + '</table>')).show();
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        }
    });
}

$(document).on('click', 'a#task_edit, .taskEdit', function (event) {

    val = $(this).attr('data-value');
    event.preventDefault();
    const url = "functions/functions.php";
    const taskinfo = getTaskInfo(val);

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'edit-task-task=' + val + '&ContactId=' + taskinfo.ContactId,
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data, result) {
            HideLoader();
            const edit_task_modal = $('#task_modal');
            edit_task_modal.find('.modal-body').html(data.data);
            edit_task_modal.find('.modal-header>h5').text('Edit Task');
            let task_status = taskinfo.task_status;
            if (task_status === "Completed") {
                task_status = "Complete";
            }
            if (task_status === "Not Completed") {
                task_status = "Not Complete";
            }
            $('select[name="task_assigned"]').val(taskinfo.user_id).trigger('change');
            $('select[name="task_priority"]').val(taskinfo.Priority).trigger('change');
            $('select[name="task_status"]').val(task_status).trigger('change');
            if (taskinfo.stage_name !== '') {
                $('select[name="pipelineSelCon"]').val(taskinfo.pipeline_name).trigger('change.select2');
                $('select[name="stageSel"]').val(taskinfo.stage_name).trigger('change.select2');
                $('select[name="stageSel"]').prop('disabled', false);
            }

            $('#edit_task_form #task_desc').val(taskinfo.description);
            $('.task_desc').val(taskinfo.description);
            $('.task_date_picker').val(taskinfo.due_date);
            $('#edit_task_form select').select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $("#task_modal")
            });

            $("#get-chartData").modal('hide');
            $('#edit_task_form input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            edit_task_modal.modal('show');
        }


    });

    return false; // avoid to execute the actual submit of the form.

});

function getTaskInfo(eventId) {
    let myrequest = '';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/functions.php",
        async: false,
        data: "get-task=" + eventId,
        success: function (data, result) {
            myrequest = data;
        }
    });
    return myrequest;

}

$(document).on('click', '.check_view', function (event) {
    const get_text = $.trim($(this).text());
    if (get_text === "Calendar View") {
        $('.sorting_task').show();
    } else {
        $('.sorting_task').hide();
    }

});


$(document).on('click', '.tasksTab', function (event) {
    const tStatus = $(this).attr('data-value');
    const tId = $(this).data('tablename');
    $('.exportTasksButtons').hide();
    $('#download' + tStatus).show();
    task_defTable(tStatus, tId, "first_time", 'all');
});


$(document).on('click', '#downloadNotComplete', function () {
    downloadTasks('NotComplete');
});

$(document).on('click', '#downloadComplete', function () {
    downloadTasks('Complete');
});

$(document).on('click', '#downloadDue', function () {
    downloadTasks('Due');
});

$(document).on('click', '#downloadTotal', function () {
    downloadTasks('Total');
});

function downloadTasks(status) {
    $.ajax({
        timeout: 10000, url: 'functions/functions.php', type: 'POST', data: {exportTasksByStatus: status}, xhrFields: {
            responseType: 'blob'
        }, success: function (response) {
            const a = document.createElement('a');
            const url = window.URL.createObjectURL(response);
            a.href = url;
            a.download = 'tasks_' + status + '.xls';
            document.body.append(a);
            a.trigger('click');
            a.remove();
            window.URL.revokeObjectURL(url);
        }, error: function (xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
}

function restrictOldDateInhtmlcalender() {
    const now = new Date();
    const formattedDateTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/New_York',
        hour12: false // Use 24-hour format
    }).format(now);
    const today = formattedDateTime
        .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})/, '$3-$1-$2T$4:$5');
    $('#task_date').attr('min', today);
    $(document).on('change', '#task_date', function () {
        const selectedDate = $(this).val();
        if (selectedDate < today) {
            $(this).val(today);
        }
    });
}

$(document).ready(function () {
    restrictOldDateInhtmlcalender();
});


$(document).on('click', 'a#sub_task', function (event) {
    val = $(this).attr('data-value');
    event.preventDefault();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'add-sub-task=' + val, beforeSend: function () {
            alertify.set('notifier', 'position', 'top-center');
            alertify.message("Getting info. Please wait.....");
        }, success: function (data, result) {

            if (data && data.status === "Got Data") {
                const subtask_modal = $('#task_modal');
                subtask_modal.find('.modal-body').html(data.data);
                subtask_modal.find('.modal-header>h5').text('Add Sub Task');
                $('select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#task_modal")
                });
                //flatpickr("#task_date", { enableTime: !0, dateFormat: "m/d/Y H:i", minDate: "today", allowInput: true, disableMobile: true });

                $("#get-chartData").modal('hide');
                subtask_modal.modal('show');
            }
            if (data && data.status !== "Got Data") {
                alertify.set('notifier', 'position', 'top-center');
                alertify.error("Whoops! There was a problem generating your form. Please try again.");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.

});

$(document).on('click', '.sub_task', function (event) {
    val = $(this).attr('data-value');
    event.preventDefault();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'add-sub-task=' + val, beforeSend: function () {
            displayAlert("Getting info. Please wait.....", "message");
        }, success: function (data, result) {
            if (data && data.status === "Got Data") {
                const subtask_modal = $('#task_modal');
                subtask_modal.find('.modal-body').html(data.data);
                subtask_modal.find('.modal-header>h5').text('Add Sub Task');
                $('#new_sub_task_form select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#task_modal")
                });

                $("#get-chartData").modal('hide');
                subtask_modal.modal('show');
            } else {
                displayAlert("Whoops! There was a problem adding a sub-task. Please try again later.", "error");
            }
        }, error: function (xhr, status) {
            errMsg = "Opps! there was an error while adding a sub-task. Please try again later.";
            displayAlert(errMsg, "error");
        },
    });

    return false; // avoid to execute the actual submit of the form.

});


$(document).on('submit', '#new_sub_task_form', function (e) {

    const form = $("#new_sub_task_form");

    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_sub_task_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $("#button-subtask-save").prop("disabled", true);
                    displayAlert("Sub-Task added successfully.Refresh a page in moment....", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "Inactive") {
                    displayAlert("Sub-task cannot be added for Inactive/Deleted Contact", "error");
                    $("#button-subtask-save").prop("disabled", false);
                } else {
                    displayAlert("Whoops! There was a problem adding your sub-task. Please try again.", "error");
                    $("#button-subtask-save").prop("disabled", false);
                }
            }
        });

    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.deleteFile', function (event) {
    val = $(this).attr('data-value');
    if ($('#contactFilesLink').hasClass('active')) {
        var fid = $('#add-folderC').attr('data-parent');
    } else {
        var fid = $('#add-folderP').attr('data-parent');
    }
    if ($('#policyFilesLink').hasClass('active')) contactId = $("input[name='filep_contactId']").val(); else contactId = $("input[name='file_ContactId']").val();

    event.preventDefault();
    const url = "functions/functions.php";
    const tr = $(this).closest('tr');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This is not recoverable, the file and entry will be permanently deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'delete-file=true&fid=' + val + '&ContactId=' + contactId,
                success: function (response) {
                    response = JSON.parse(response);
                    if (response['status'] === 'Inactive') {
                        displayAlert("Operation couldn't be performed for Deleted/Hidden Contact.", "error");
                    } else {
                        displayAlert("File deleted successfully. You will need to refresh the page.", "success")

                        if ($('#contactFilesLink').hasClass('active')) {
                            requestFolderData(fid, contactId);
                        } else {
                            $('#ftable-cfile').DataTable().row(tr).remove().draw(false);
                            requestFolderData(fid, contactId);
                        }
                    }
                }
            })

        } else {
            /* Read more about handling dismissals bel ow */
            result.dismiss === Swal.DismissReason.cancel
        }
    })


    return false; // avoid to execute the actual submit of the form.

});

$(document).on('change', '.fileMultiSelect', function (event) {
    if ($('.fileMultiSelect').is(':checked')) {
        $('.deleteMultipleFilese').show();
    } else {
        $('.deleteMultipleFilese').hide();
    }
    if ($('.deleteFoldersMultiple').is(':checked')) {
        var val = $(this).attr('data-value');
        if ($(this).is(':checked')) {
            var val = $('.deleteFoldersMultiple').attr('data-value');
            if ($('.deleteMultipleFilesForm').find('input[name="delete_folder[]"][value="' + val + '"]').length > 0) {
            } else {
                $('.deleteMultipleFilesForm').append("<input type='hidden' class='fileToDelete' name='delete_folder[]' value='" + val + "' />");
            }
        } else {
            var val = $(this).attr('data-value');
            $('.deleteMultipleFilesForm').find('input[name="delete_folder[]"][value="' + val + '"]').remove();
        }
    }
    const total = $('.fileMultiSelect').length;
    const checkedTotal = $('input.fileMultiSelect:checked').length;
    if (checkedTotal < total && $('.selectAllFiles').is(':checked')) {
        $('.selectAllFiles').prop('checked', false);
    } else {
        $('.selectAllFiles').prop('checked', true);
    }
});
$(document).on('change', '.selectAllFiles', function (event) {
    if ($(this).is(':checked')) {
        $('.fileToDelete').remove();
        $('.fileMultiSelect').prop('checked', true).trigger('change');
        $(".fileMultiSelect").each(function () {
            $(this).prop('checked', true).trigger('change');
            const val = $(this).attr('data-value');
            if ($('#reAssociateMultiplePoliciesForm').find('input[value="' + val + '"]').length > 0) {
            } else {
                $('#reAssociateMultiplePoliciesForm').append("<input type='hidden' class='fileToDelete' name='delete_file[]' value='" + val + "' />");
            }
        });
    } else {
        $('.fileMultiSelect').prop('checked', false).trigger('change');
        $('.fileToDelete').remove();
    }
});

$(document).on('click', '#reAssociateMultiplePolicies', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    const uid = $(this).attr('data-value');

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#reAssociateMultiplePoliciesForm").serialize(),
        success: function (data, result) {
            //console.log(data);
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Change Policy Association');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating that user. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#hideMultipleContacts', function (event) {
    event.preventDefault();

    // Collect selected ContactIds from the checkboxes
    const ids = $('.contactMultiSelect:checked').map(function () {
        return $(this).attr('data-value');
    }).get();

    if (!ids.length) {
        displayAlert("Please select at least one contact to hide.", "error");
        return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: ids.length === 1
            ? 'Are you sure you want to hide this contact?'
            : `Are you sure you want to hide these ${ids.length} contacts?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, hide',
        cancelButtonText: 'No, cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {
            $.ajax({
                timeout: 180000,
                type: "POST",
                url: "functions/functions.php",
                dataType: "json",
                data: {
                    'hide-contact': ids  // will be sent as hide-contact[]=id1&hide-contact[]=id2...
                },
                beforeSend: function () {
                    ShowLoader('Hiding the selected Contact(s), please wait....');
                },
                success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "Got Data") {
                        displayAlert("Contact(s) were hidden successfully.", "success");
                        // Easiest + safest: reload so all tables + UI are in sync
                        setTimeout(function () {
                            location.reload();
                        }, 800);
                    } else {
                        displayAlert("Whoops! There was a problem hiding these contact(s). Please try again.", "error");
                    }
                },
                error: function () {
                    HideLoader();
                    displayAlert("Whoops! There was a problem hiding these contact(s). Please try again.", "error");
                }
            });
        }
    });
});


$(document).on('click', '#deleteMultipleContacts', function (event) {
    event.preventDefault();
    // Collect all selected contact IDs from the checkboxes
    const ids = $('.contactMultiSelect:checked').map(function () {
        return $(this).attr('data-value');
    }).get();

    if (!ids.length) {
        displayAlert("Please select at least one contact to delete.", "error");
        return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: ids.length === 1
            ? 'Are you sure you want to delete this contact?'
            : `Are you sure you want to delete these ${ids.length} contacts?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 180000,
                url: 'functions/functions.php',
                type: "POST",
                dataType: "json",
                // jQuery will encode this as del_contact_id[]=id1&del_contact_id[]=id2...
                data: {
                    'del_contact_id': ids,
                    'delete-ContactId': true
                },
                beforeSend: function () {
                    ShowLoader('Deleting the selected Contact(s), please wait....');
                },
                success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "Got Data") {
                        displayAlert("Contact(s) deleted successfully. Refreshing page", "success");

                        // Easiest, cleanest: just reload so all tables refresh correctly
                        setTimeout(function () {
                            location.reload();
                        }, 800);
                    } else {
                        displayAlert("Whoops! There was a problem deleting your contact(s). Please try again.", "error");
                    }
                },
                error: function () {
                    HideLoader();
                    displayAlert("Whoops! There was a problem deleting your contact(s). Please try again.", "error");
                }
            });
        }
    });
});


$(document).on('click', '#mergeMultipleContacts', function (event) {
    event.preventDefault();

    const url = "functions/functions.php";

    $.ajax({
        timeout: 180000,
        type: "POST",
        url: url,
        data: $('#mergeMultipleContactsForm').serialize(),
        beforeSend: function () {
            ShowLoader('Merging the selected Contact(s), please wait....');
        },
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Merge Contact');
                $('#merge_contact_assoc').focus();
            } else {
                displayAlert("Whoops! There was a problem retrieving these contacts. Please try again.", "error");
            }
        },
        error: function () {
            HideLoader();
            displayAlert("Whoops! There was a problem retrieving these contacts. Please try again.", "error");
        }
    });

    return false;
});

$(document).on('click', '.duplicateFinderNavLink', function (e) {
    $('#mergeMultipleContactsForm').empty();
    $('.contactMultiSelect:checked').prop('checked', false);
});

$(document).on('change', '.contactMultiSelect', function (event) {
    if ($('.contactMultiSelect').is(':checked')) {
        $('#multipleContactMergeActionButtons').show();
    } else {
        $('#multipleContactMergeActionButtons').hide();
    }
    if ($(this).is(':checked')) {
        var val = $(this).attr('data-value');
        if ($('#mergeMultipleContactsForm').find('input[value="' + val + '"]').length > 0) {
        } else {
            $('#mergeMultipleContactsForm').append("<input type='hidden' class='contactToMerge' name='merge-ContactId[]' value='" + val + "' />");
        }
    } else {
        var val = $(this).attr('data-value');
        $('#mergeMultipleContactsForm').find('input[value="' + val + '"]').remove();
    }
});

$(document).on('change', '.policyMultiSelect', function (event) {
    if ($('.policyMultiSelect').is(':checked')) {
        $('#multiplePolicyActionButtons').show();
    } else {
        $('#multiplePolicyActionButtons').hide();
    }
    if ($(this).is(':checked')) {
        var val = $(this).attr('data-value');
        if ($('#reAssociateMultiplePoliciesForm').find('input[value="' + val + '"]').length > 0) {
        } else {
            $('#reAssociateMultiplePoliciesForm').append("<input type='hidden' class='policyToReAssociate' name='reassociate_policy[]' value='" + val + "' />");
        }
    } else {
        var val = $(this).attr('data-value');
        $('#reAssociateMultiplePoliciesForm').find('input[value="' + val + '"]').remove();
    }
    const total = $('.policyMultiSelect').length;
    const checkedTotal = $('input.policyMultiSelect:checked').length;
    if (checkedTotal < total && $('.selectAllPolicies').is(':checked')) {
        $('.selectAllPolicies').prop('checked', false);
    } else {
        $('.selectAllPolicies').prop('checked', true);
    }
});

function checkValue(str, max) {
    if (str.charAt(0) !== '0' || str === '00') {
        let num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
    }

    return str;
}

function searchNormalContact() {

    const searchValue = $(".searchNormalContact").val().trim();
    if (searchValue !== '') {
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            async: true,
            data: 'search_term=' + searchValue,
            beforeSend: function () {
                $('.searchNormalContact').prop('disabled', true);
                $('.searching').prop('disabled', true);
                ShowLoader();

            },
            success: function (data, result) {
                HideLoader();
                $('.searchNormalContact').prop('disabled', false);
                $('.searching').prop('disabled', false);
                if (data && data.status === "Got Data") {
                    $(".paginationNormal").hide();
                    $(".contactGridData").empty();
                    $(".contactGridData").html(data.data);
                }
                if (data && data.status === "No Data") {
                    $(".paginationNormal").hide();
                    $(".contactGridData").empty();
                    $(".contactGridData").html(data.data);
                }
                const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl, {
                        container: 'body', trigger: 'hover'
                    });
                });
            }

        });
    } else {
        setTimeout(location.reload.bind(location), 1000);
    }

    return false;
}

function searchDeleteContact() {

    const searchValue = $(".searchDeletedContact").val().trim();
    if (searchValue !== '') {
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            async: true,
            data: 'delete_search_term=' + searchValue,
            beforeSend: function () {
                $('.searchDeletedContact').prop('disabled', true);
                $('.delete_searching').prop('disabled', true);
                ShowLoader();

            },
            success: function (data, result) {
                HideLoader();
                $('.searchDeletedContact').prop('disabled', false);
                $('.delete_searching').prop('disabled', false);
                if (data && data.status === "Got Data") {
                    $(".paginationDelete").hide();
                    $(".contactDeleted").empty();
                    $(".contactDeleted").html(data.data);
                }
                if (data && data.status === "No Data") {
                    $(".paginationDelete").hide();
                    $(".contactDeleted").empty();
                    $(".contactDeleted").html(data.data);
                }
                const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl, {
                        container: 'body', trigger: 'hover'
                    });
                });
            }

        });
    } else {
        setTimeout(location.reload.bind(location), 1000);
    }

    return false;
}

function searchHiddenContact() {

    const searchValue = $(".searchHiddenContact").val().trim();
    if (searchValue !== '') {
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            async: true,
            data: 'hidden_search_term=' + searchValue,
            beforeSend: function () {
                $('.searchHiddenContact').prop('disabled', true);
                $('.hidden_searching').prop('disabled', true);
                ShowLoader();

            },
            success: function (data, result) {
                HideLoader();
                $('.searchHiddenContact').prop('disabled', false);
                $('.hidden_searching').prop('disabled', false);
                if (data && data.status === "Got Data") {
                    $(".paginationHide").hide();
                    $(".contactHidden").empty();
                    $(".contactHidden").html(data.data);
                }
                if (data && data.status === "No Data") {
                    $(".paginationHide").hide();
                    $(".contactHidden").empty();
                    $(".contactHidden").html(data.data);
                }
                const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl, {
                        container: 'body', trigger: 'hover'
                    });
                });
            }

        });
    } else {
        setTimeout(location.reload.bind(location), 1000);
    }

    return false;
}


$(document).on('keyup', '.formatDate', function (event) {
    this.type = 'text';
    let input = this.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    const values = input.split('/').map(function (v) {
        return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    const output = values.map(function (v, i) {
        return v.length === 2 && i < 2 ? v + '/' : v;
    });
    this.value = output.join('').substr(0, 14);
});

$(document).on('keyup', '.formatMoney', function (event) {
    const val = this.value;
    if (!parseFloat(val) || val.match(/[^\d]$/)) { // invalid character input
        if (val.length > 0) { // delete invalid char
            this.value = val.substring(0, val.length - 1)
        }
    } else { // valid char input for the key stroke
        if (val.match(/\./)) { // already added "."
            const idx = val.indexOf(".");
            let front = val.substring(0, idx); // before "."
            let back = val.substring(idx + 1, val.length); // after "."
            front += back.charAt(0) // move "." back 1 char
            if (parseInt(front) === 0) {
                front = front.replace(/^0/, "")
            } // delete leading "0"
            else {
                front = front.replace(/^0+/, "")
            }
            back = back.substring(1, back.length)
            this.value = front + "." + back
        } else {
            this.value = "0.0" + val
        }
    }
});

$(document).on('keyup', '#new_field_name, #update_custom_field_name', function (event) {
    if (this.value.match(/[^a-zA-Z0-9\s]/g)) {
        this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
});

$(document).on('change', '.fileCategory', function (event) {
    const url = "functions/functions.php";
    const val = $(this).val();
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'upd-file-category=' + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Category update successfully.", "success");

            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating the category for that file. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '.fileDescription', function (event) {
    const url = "functions/functions.php";
    const val = $(this).val();
    const fid = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'upd-file-desc=' + val + '&upd-file-desc-id=' + fid,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Description update successfully.", "success");
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem updating the description for that file. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('focusout', '.datepicker', function (event) {
    const element = $(this);
    var value = $(this).val();
    var value = value.replace(/-/g, "/");
    const url = 'functions/functions.php';
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'convert-date=' + value, success: function (data, result) {
            if (data && data.status === "Got Data") {
                element.val(data.data);
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

$(document).on('keyup', '.datepicker2', function (event) {
    this.type = 'text';
    let input = this.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    const values = input.split('/').map(function (v) {
        return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    const output = values.map(function (v, i) {
        return v.length === 2 && i < 2 ? v + '/' : v;
    });
    this.value = output.join('').substr(0, 14);
});

$(document).on('click', '.modalToggle', function (event) {
    const tar = $(this).attr('data-target');
    $('.popoverDT').DataTable();
    $('#' + tar).modal();
});


$(document).on('change', '.marketingFilterOptions', function (event) {
    const val = $(this).val();
    const type = $(this).find(':selected').attr('data-value');
    let dfilters = $('.dateReportFilter').length;
    let next = dfilters++;
    if (type.includes('varchar')) {
        $('#dynamicFields').append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" id="' + val + '"><input type="text" placeholder="Please enter filter value for ' + val + '" name="' + val + '" class="form-control" /><button type="button" name="remove" id="' + val + '" class="btn btn-danger btn_remove">X</button></div>');
    }
    if (type.includes('date')) {
        $('#dynamicFields').append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" id="' + val + '"><select class="form-select dateReportFilter" name="' + val + '" id="' + val + '-' + next + '"><option value="">Please Select Date Range</option><option value="Future">Greater than or Equal to Today</option><option value="Next1">Next Day</option><option value="Next7">Next Week</option><option value="Next30">Next Month</option><option value="Next60">Next 60 Days</option><option value="Next90">Next 90 Days</option><option value="Next365">Next Year</option><option value="Past">Less than or Equal to Today</option><option value="Last1">Last Day</option><option value="Last7">Last Week</option><option value="Last30">Last Month</option><option value="Last60">Last 60 Days</option><option value="Last90">Last 90 Days</option><option value="Last365">Last Year</option><option value="January">January</option><option value="February">February</option><option value="March">March</option><option value="April">April</option><option value="May">May</option><option value="June">June</option><option value="July">July</option><option value="August">August</option><option value="September">September</option><option value="October">October</option><option value="November">November</option><option value="December">December</option><option value="Custom">Custom Range</option></select><button type="button" name="remove" id="' + val + '" class="btn btn-danger btn_remove">X</button></div>');
    }
    if (type.includes('timestamp')) {
        $('#dynamicFields').append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" id="' + val + '"><select class="form-select dateReportFilter" name="' + val + '" id="' + val + '-' + next + '"><option value="">Please Select Date Range</option><option value="Future">Greater than or Equal to Today</option><option value="Next1">Next Day</option><option value="Next7">Next Week</option><option value="Next30">Next Month</option><option value="Next60">Next 60 Days</option><option value="Next90">Next 90 Days</option><option value="Next365">Next Year</option><option value="Past">Less than or Equal to Today</option><option value="Last1">Last Day</option><option value="Last7">Last Week</option><option value="Last30">Last Month</option><option value="Last60">Last 60 Days</option><option value="Last90">Last 90 Days</option><option value="Last365">Last Year</option><option value="January">January</option><option value="February">February</option><option value="March">March</option><option value="April">April</option><option value="May">May</option><option value="June">June</option><option value="July">July</option><option value="August">August</option><option value="September">September</option><option value="October">October</option><option value="November">November</option><option value="December">December</option><option value="Custom">Custom Range</option></select><button type="button" name="remove" id="' + val + '" class="btn btn-danger btn_remove">X</button></div>');
    }

    return false; // avoid it to execute the actual submit of the form.
});


/*  $(document).on('click', '.btn_remove', function(){
       var button_id = $(this).attr("id");
       $('#'+button_id+'').remove();
  });*/

$(document).on('click', '#marketingFilterListButton', function (e) {
    e.preventDefault();
    const clicked = $(this).attr('id');
    const url = "functions/functions.php";
    $('#marketingFilterListButton').attr('disabled', true);
    $('#dynamicFields').append($('#marketingCols'));

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#marketingFilterForm").serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (clicked !== 'exportMarketingList') {
                    $('#data').html(data.data);
                    const expl = $('#exportMarketingList').length;
                    if (expl < 1) {
                        $('<button>').attr({
                            type: 'submit',
                            id: 'exportMarketingList',
                            name: 'exportMarketingList',
                            class: 'btn btn-primary',
                            value: 'Export List'
                        }).appendTo('#marketingFilterForm');
                    }
                    $('#exportMarketingList').html('Export List');
                    const info_table = $('#table-data').DataTable({
                        'order': [[0, 'asc']]
                    });
                    $('#marketingFilterListButton').attr('disabled', false);
                } else {
                    $('#data').html(data.data);
                }
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem searching with those filters. Please try again.", "error");
                $('#marketingFilterListButton').attr('disabled', false);
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '#exportMarketingList', function (e) {
    e.preventDefault();
    const clicked = $(this).attr('id');
    $('#marketingFilterFormSubmit').remove();
    $('#marketingFilterForm').append("<input name='exportMarketingList' value='true' type='hidden' />");
    const url = "functions/functions.php";
    $('#filterListButton').attr('disabled', true);
    $('#dynamicFields').append($('#marketingCols'));

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#marketingFilterForm").serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (clicked !== 'exportMarketingList') {
                    $('#data').html(data.data);
                    const expl = $('#exportMarketingList').length;
                    if (expl < 1) {
                        $('<button>').attr({
                            type: 'submit',
                            id: 'exportMarketingList',
                            name: 'exportMarketingList',
                            class: 'btn btn-primary',
                            value: 'Export List'
                        }).appendTo('#marketingFilterForm');
                    }
                    $('#exportMarketingList').html('Export List');
                    const info_table = $('#table-data').DataTable({
                        'order': [[0, 'asc']]
                    });
                    $('#marketingFilterListButton').attr('disabled', false);
                } else {
                    $('#marketingFilterRow').html(data.data);
                }
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem searching with those filters. Please try again.", "error");
                $('#marketingFilterListButton').attr('disabled', false);
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});


function ValidateEmailWithRegex(email) {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function validateEmails(string) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const result = string.replace(/\s/g, "").split(/,|;/);
    for (let i = 0; i < result.length; i++) {
        if (!regex.test(result[i])) {
            return false;
        }
    }
    return true;
}

function getemailprovider() {
    let allemail = '';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/workflow_functions.php",
        async: false,
        data: "allemailprovider=condtion",
        success: function (data, result) {
            data = JSON.parse(data);
            if (data.response !== "No data") {
                allemail = data;


            } else {
                allemail = false;
            }

        }
    });

    return allemail;
}

$(document).on('click', '#showSales', function (event) {
    if ($('#sales-stats').is(':visible')) {
        $('#showSales').html('Show Info');
        $('#sales-stats').hide();
    } else {
        $('#showSales').html('Hide Info');
        $('#sales-stats').show();
    }
});

function checkValue(str, max) {
    if (str.charAt(0) !== '0' || str === '00') {
        let num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
    }

    return str;
}

$(document).on('keyup keydown keypress', '.dateField', function (event) {
    this.type = 'text';
    let input = this.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    const values = input.split('/').map(function (v) {
        return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    const output = values.map(function (v, i) {
        return v.length === 2 && i < 2 ? v + '/' : v;
    });
    this.value = output.join('').substr(0, 14);
});


// });


$(document).on('click', '.updateProduct', function (event) {

    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'update-product=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Update Product');
                $('#updateProductButton').attr('disabled', true);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem generating that product information. Please try again.", "error")
            }
        }
    })
    return false; //for good measure
});

$(document).on('keyup change', '#newQuantity', function (event) {
    const nqty = $(this).val();
    const cqty = $('#currentQuantity').val();
    const cprice = $('#productPrice').val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'calcProductChange=true&currentQty=' + cqty + '&newQty=' + nqty + '&price=' + cprice,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#newMonthlyTotal').val(data.monthly);
                $('#proRatedCharges').val(data.prorate);
                if (parseFloat(data.prorate > 0)) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning!',
                        confirmButtonText: "I Understand",
                        showCancelButton: true,
                        cancelButtonText: "No, do not charge me!",
                        text: 'The license change you are about to perform will result in an immediate charge to the billing account we have on file. Once you click Update Product the charge will occur. If you have any questions please contact Billing prior to making this change.'
                    }).then((result) => {
                        if (result.value) {
                            $('#updateProductButton').attr('disabled', false);
                        } else if (/* Read more about handling dismissals below */
                            result.dismiss === Swal.DismissReason.cancel) {
                            $('#newQuantity').val('');
                            $('#newMonthlyTotal').val('0');
                            $('#proRatedCharges').val('0.00');
                        }
                    });
                } else {
                    $('#updateProductButton').attr('disabled', false);
                }
                $('#productAddInfo').html(data.addinfo);
                $('#productAddInfo').show();
            } else if (data && data.status === "Negative Quantity") {
                displayAlert("Whoops! You cannot enter a negative number.", "error");
                $('#newQuantity').val('');
                $('#newMonthlyTotal').val('0');
                $('#proRatedCharges').val('0.00');
                $('#productAddInfo').hide();
            } else {
                displayAlert("Whoops! There was a problem generating that product information. Please try again.", "error");
                $('#newQuantity').val('');
                $('#newMonthlyTotal').val('0');
                $('#proRatedCharges').val('0.00');
                $('#productAddInfo').hide();
            }
        }
    })

});


$(document).on('submit', '#updateProduct', function (e) {
    const form = $("#updateProduct");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#updateProduct").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data" || data.status === "No Charges Due") {
                    if ($('#new_user_form').length > 0 || $('#upd_user_form').length > 0) {
                        displayAlert("Product Updated Successully! You can continue adding the user.", "success");
                        $('#needAdditionalLicenses').remove();
                        $('#updateProduct').remove();
                        if ($('#new_user_form').length > 0) {
                            $('#new_user_form').show();
                        }
                        if ($('#upd_user_form').length > 0) {
                            $('#upd_user_form').show();
                        }
                    } else {
                        displayAlert("Product Updated Successully! Refreshing page.", "success");
                        $('#policy_info_panel').html('');
                        $('#side-panel-title').html('');
                        if ($("#side-panel-toggle").hasClass('panel-show')) {
                            $('#side-panel-toggle').trigger('click');
                        }
                        setTimeout(location.reload.bind(location), 3000);
                    }


                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem updating this product. Please try again.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('blur', '.SMSPhone', function (event) {
    const phone = $(this).val();
    let validateFor = '';
    const contact = $('#ContactId').val();
    const url = "functions/functions.php";
    if ($(this).attr("name").indexOf("coapp") !== -1) {
        validateFor = 'Co-Applicant';
    } else {
        validateFor = 'Applicant';
    }
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'validate-phone=' + phone + '&validate-contact=' + contact + '&validate-for=' + validateFor,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (validateFor === 'Applicant') {
                    $('#phone').val(data.formatted);
                    var app = $('#phone').val();
                    var coApp = $('#coappphone').val();
                    $(".to_sms").val(app);
                    $(".to_sms_coapp").val(coApp);
                    $(".to_sms_both").val(app + '|' + coApp);
                } else {
                    $('#coappphone').val(data.formatted);
                    var app = $('#phone').val();
                    var coApp = $('#coappphone').val();
                    $(".to_sms").val(app);
                    $(".to_sms_coapp").val(coApp);
                    $(".to_sms_both").val(app + '|' + coApp);
                }
            }
            //if (phone != '') {

            if (data && data.status !== "Got Data") {
                if (validateFor === 'Applicant') {
                    $('#phone').val(phone);
                } else {
                    $('#coappphone').val(phone);
                }
                Swal.fire({
                    icon: 'info',
                    title: 'Quick Note!',
                    text: 'The number you entered is could not be validated as a mobile number and cannot be used for SMS which is what that field was intended for. This message is meant to be informational only, no action is required unless you would like to be able to SMS message with this client.'
                })

            }
            //}
        }
    });
});

$(document).on('click', '.cancelCampaign', function (event) {
    const rem = $(this).attr('data-value');
    event.preventDefault();
    const url = "functions/marketing_functions.php";

    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'cancel-campaign=' + rem, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Campaign cancelled.", "success");
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem cancelling that campaign. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#SGList', function () {
    if (!$('span#contacts-link').text()) {
        $('span#contacts-link').append("view contacts");
    }
});

$(document).on('change', '#new_pref_carrier_lob', function (event) {
    ShowLoader();
    const val = $(this).val();
    $('#pref-carrier-div').hide();
    $('#waitMessage').html('Please wait while we retrieve your carriers from QuoteRUSH');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'preferred-lob=' + val,
        dataType: "json",
        success: function (data, result) {
            const {status} = data;

            if (status !== "Got Data") {
                $('#waitMessage').html('We were unable to retrieve carriers for that Line of Business. Please make sure you have these carriers setup in QuoteRUSH to use this feature.');
                $('#pref-carrier-div').show();
                HideLoader();
                return;
            }

            $('#waitMessage').html('');
            $('#pref-carrier-div').html(data.data + `<button type="submit" class="btn btn-primary mt-4" id="addPreferredCarrierButton" disabled>Add Carrier to List</button><button type="submit" class="btn btn-primary mt-4" id="addAllCarriersButton" style="float: right;">Add ALL Carriers (with the chosen LOB) to List</button>`);
            $('#pref-carrier-div').show();
            $('#new_pref_carrier').select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
            });
            $('#selected-carriers').show();

            const carriers_to_disable = [];
            $('#addPrefCarrierTable tbody tr').find(`td:contains("${val}")`).prev().each(function () {
                carriers_to_disable.push($(this).text());
            });

            $('#new_pref_carrier option').each(function () {
                if (carriers_to_disable.includes($(this).text())) {
                    $(this).attr("disabled", true);
                }
            });

            HideLoader();
        }
    });
});

$(document).on('change', '#new_pref_carrier', function (event) {
    const val = $(this).val();
    if (val === '') {
        Swal.fire({
            icon: 'error', title: 'Uh Oh!', text: 'Please select a valid carrier.'
        })
        $('#addPreferredCarrierButton').attr('disabled', true);
    } else {
        $('#addPreferredCarrierButton').attr('disabled', false);
    }
});

$(document).on('click', '#addAllCarriersButton', function (event) {
    const curLength = parseInt($('.newPrefCarrierClass').length);
    const lob = $('#new_pref_carrier_lob').val();
    const carriers = [];
    $('#new_pref_carrier').find('option').each(function () {
        if (!$(this).is(':disabled') && $(this).text() !== "Please Select Carrier") {
            carriers.push($(this).text());
            $(this).attr("disabled", true);
        }
    });

    if (carriers.length === 0) return;

    let start = 0;
    if ($('#addPrefCarrierTable tbody tr:last').length === 0) {
        $('#addPrefCarrierTable tbody').html(`<tr><td>${carriers[start]}<td>${lob}</td><td><a href="#" class="text-danger remAddPrefCarrier" data-id="${lob + curLength + start}" data-value="${carriers[start]}|${lob}"><i class="mdi mdi-delete font-size-18"></i></a></td></tr>`);
        $('#new_pref_carrier_form').append(`<input class="newPrefCarrierClass" type="hidden" id="${lob + curLength + start}" name="newPrefCarrier[]" value="${carriers[start]}|${lob}" />`);
        start++;
    }

    for (let i = start; i < carriers.length; i++) {
        $('#addPrefCarrierTable tbody tr:last').after(`<tr><td>${carriers[i]}<td>${lob}</td><td><a href="#" class="text-danger remAddPrefCarrier" data-id="${lob + curLength + i}" data-value="${carriers[i]}|${lob}"><i class="mdi mdi-delete font-size-18"></i></a></td></tr>`);
        $('#new_pref_carrier_form').append(`<input class="newPrefCarrierClass" type="hidden" id="${lob + curLength + i}" name="newPrefCarrier[]" value="${carriers[i]}|${lob}" />`);
    }

    if ($('#completeAddNewPrefCarrier').length === 0) {
        $('#addPrefCarrierTable').after("<button type='submit' class='btn btn-primary mt-4' id='completeAddNewPrefCarrier'>Finished Adding Carriers</button>");
    }
});

$(document).on('click', '#addPreferredCarrierButton', function (event) {
    event.preventDefault();
    const curLength = parseInt($('.newPrefCarrierClass').length);
    const selectedCarrier = $('#new_pref_carrier').val();
    const lob = $('#new_pref_carrier_lob').val();
    const newId = lob + (curLength + 1);

    if ($('#addPrefCarrierTable tbody tr:last').length === 0) {
        $('#addPrefCarrierTable tbody').html(`<tr><td>${selectedCarrier}<td>${lob}</td><td><a href="#" class="text-danger remAddPrefCarrier" data-id="${newId}" data-value="${selectedCarrier}|${lob}"><i class="mdi mdi-delete font-size-18"></i></a></td></tr>`);
    } else {
        $('#addPrefCarrierTable tbody tr:last').after(`<tr><td>${selectedCarrier}<td>${lob}</td><td><a href="#" class="text-danger remAddPrefCarrier" data-id="${newId}" data-value="${selectedCarrier}|${lob}"><i class="mdi mdi-delete font-size-18"></i></a></td></tr>`);
    }

    $('#new_pref_carrier_form').append(`<input class="newPrefCarrierClass" type="hidden" id="${newId}" name="newPrefCarrier[]" value="${selectedCarrier}|${lob}" />`);

    $('#new_pref_carrier option').each(function () {
        if ($(this).text() === selectedCarrier) {
            $(this).attr('disabled', true);
            $('#addPreferredCarrierButton').attr('disabled', true);
            return false; // Break out of the .each
        }
    });

    // There is no need to handle removing the completeAddNewPrefCarrier button in here, as remAddPrefCarrier handles that case.
    if ($('#completeAddNewPrefCarrier').length === 0) {
        $('#addPrefCarrierTable').after("<button type='submit' class='btn btn-primary mt-4' id='completeAddNewPrefCarrier'>Finished Adding Carriers</button>");
    }
});

$(document).on('click', '.remPrefCarrier', function (e) {
    e.preventDefault();
    const uid = $(this).attr('data-value');
    const clickedNode = $(this);

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/functions.php",
        data: "rem_pref_carrier=" + uid,
        success: function (data, result) {
            const {status} = data;

            if (status !== "Got Data") {
                displayAlert("Whoops! There was a problem removing that preferred carrier. Please try again.", "error");
                return;
            }

            displayAlert("Preferred Carrier Removed", "success")
            $(clickedNode).closest('tr').remove();
        }
    });

    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.remAddPrefCarrier', function (event) {
    event.preventDefault();
    const remId = $(this).attr('data-id');
    $(this).closest('tr').remove();
    $(`[id="${remId}"]`).remove();
    if ($('.newPrefCarrierClass').length > 0) {
        if ($('#completeAddNewPrefCarrier').length === 0) {
            $('#addPrefCarrierTable').after("<button type='submit' class='btn btn-primary mt-4' id='completeAddNewPrefCarrier'>Finished Adding Carriers</button>");
        }
    } else if ($('#completeAddNewPrefCarrier').length > 0) {
        $('#completeAddNewPrefCarrier').remove();
    }

    const carrier_text = $(this).attr('data-value').split('|')[0];
    $('#new_pref_carrier option').each(function () {
        if ($(this).text() === carrier_text) {
            $(this).attr('disabled', false);
            return false; // Break out of the .each
        }
    });
});

$(document).on('click', '.importCsv', function (event) {
    event.preventDefault();
    // var val = GetURLParameter('Contact');
    // var str = $(this).attr("id");
    //var spl = str.split("-");
    const csv_file_name = "importCsv .csv";
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'csv_file_name=' + csv_file_name, // dataType: "json",
        success: function (data, result) {
            // if (data && data.status === "Got Data") {
            //     $('#quote-selection').html(data.data);
            //     $('#qs-row').show();
            // }
            // if (data && data.status !== "Got Data") {}
        }
    });
});

$(document).on('click', '.addHomeQuote', function (event) {
    event.preventDefault();
    ShowLoader();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const hid = spl[1];
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-home-quotes=' + val + '&get-home-quotes-option=' + hid,
        dataType: "json",
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (data.data !== '' && data.data != null) {
                    $('#quote-selection').html("<div class='table-responsive' id='recent-quotes-table'></div>");

                    $('#recent-quotes-table').html("");
                    HomeSource = new gridjs.Grid({
                        columns: [{
                            name: "Carrier", formatter: (_, row) => gridjs.html(`${row.cells[0].data}`)
                        }, {
                            name: "Quote Date", formatter: (_, row) => gridjs.html(`${row.cells[1].data}`)
                        }, {
                            name: "Premium", formatter: (_, row) => gridjs.html(`${row.cells[2].data}`)
                        }, {
                            name: "Coverage A", formatter: (_, row) => gridjs.html(`${row.cells[3].data}`)
                        }, {
                            name: "Coverage B", formatter: (_, row) => gridjs.html(`${row.cells[4].data}`)
                        }, {
                            name: "Coverage C", formatter: (_, row) => gridjs.html(`${row.cells[5].data}`)
                        }, {
                            name: "Coverage D", formatter: (_, row) => gridjs.html(`${row.cells[6].data}`)
                        }, {
                            name: "Coverage E", formatter: (_, row) => gridjs.html(`${row.cells[7].data}`)
                        }, {
                            name: "Coverage F", formatter: (_, row) => gridjs.html(`${row.cells[8].data}`)
                        }, {
                            name: "Hurricane Deductible", formatter: (_, row) => gridjs.html(`${row.cells[9].data}`)
                        }, {
                            name: "AOP Deductible", formatter: (_, row) => gridjs.html(`${row.cells[10].data}`)
                        }, {
                            name: "Wind/Hail Deductible", formatter: (_, row) => gridjs.html(`${row.cells[11].data}`)
                        }, {
                            name: "Select", formatter: (_, row) => gridjs.html(`${row.cells[12].data}`)
                        }], pagination: {
                            limit: 5
                        }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.data
                    }).render(document.getElementById("recent-quotes-table"));
                    $('#qs-row').show();
                    $('html, body').animate({
                        scrollTop: $('#recent-quotes-table').offset().top
                    }, 'slow');
                    HideLoader();
                } else {
                    HideLoader();
                    Swal.fire('Whoops!', "We were not able to find any valid Home quotes for this Lead.", 'error')
                }
            }
            if (data && data.status !== "Got Data") {
                HideLoader();
                displayAlert("Whoops! There was a problem fetching the home quotes. Please try again", "error");
            }
        }
    });
    HideLoader();
    return false;
});


$(document).on('click', '.addGeneral-LiabilityQuote', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const len = spl.length - 1;
    const hid = spl[len];
    const sublob_id = $(this).attr('data-val');

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-generalLiability-quotes=' + val + '&get-generalLiability-quotes-option=' + hid + '&lob_sub_id=' + sublob_id,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#quote-selection').html(data.data);
                $('#qs-row').show();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// End General Liability


/* Property Info */

$(document).on('click', '.addPropertyQuote', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const len = spl.length - 1;
    const hid = spl[len];
    const sublob_id = $(this).attr('data-val');

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-PropertyInfo-quotes=' + val + '&get-propertyInfo-quotes-option=' + hid + '&lob_sub_id=' + sublob_id,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#quote-selection').html(data.data);
                $('#qs-row').show();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// End Property


/*  Employeement Practise */

$(document).on('click', '.addEmployment-Practices-LiabilityQuote', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const len = spl.length - 1;
    const hid = spl[len];
    const sublob_id = $(this).attr('data-val');

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-EmployeementPractices-quotes=' + val + '&get-EmployeementInfo-quotes-option=' + hid + '&lob_sub_id=' + sublob_id,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#quote-selection').html(data.data);
                $('#qs-row').show();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// Employeement Practise


/* Inland Marine Option */

$(document).on('click', '.addInland-MarineQuote', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const len = spl.length - 1;
    const hid = spl[len];
    const sublob_id = $(this).attr('data-val');

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-InlandMarine-quotes=' + val + '&get-InlandMarine-quotes-option=' + hid + '&lob_sub_id=' + sublob_id,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#quote-selection').html(data.data);
                $('#qs-row').show();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// End Inland Marine Option


/* Wind Option */

$(document).on('click', '.addWindQuote', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const len = spl.length - 1;
    const hid = spl[len];
    const sublob_id = $(this).attr('data-val');

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-Wind-quotes=' + val + '&get-Wind-quotes-option=' + hid + '&lob_sub_id=' + sublob_id,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#quote-selection').html(data.data);
                $('#qs-row').show();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// End Wind Marine Option

/* Worker Compensation Option */

$(document).on('click', '.addWorkers-CompensationQuote', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const len = spl.length - 1;
    const hid = spl[len];
    const sublob_id = $(this).attr('data-val');

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-WorkerCompensation-quotes=' + val + '&get-WorkerCompensation-quotes-option=' + hid + '&lob_sub_id=' + sublob_id,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#quote-selection').html(data.data);
                $('#qs-row').show();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// End Worker Compensation Option


/* Commercial Option */

$(document).on('click', '.addCommercial-AutoQuote', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const len = spl.length - 1;
    const hid = spl[len];
    const sublob_id = $(this).attr('data-val');

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-CommericalAuto-quotes=' + val + '&get-CommercialAuto-quotes-option=' + hid + '&lob_sub_id=' + sublob_id,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#quote-selection').html(data.data);
                $('#qs-row').show();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// End Commercial Auto

$(document).on('click', '.addAutoQuote', function (event) {
    event.preventDefault();
    ShowLoader();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const hid = spl[1];
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-auto-quotes=' + val + '&get-auto-quotes-option=' + hid,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (data.data !== '' && data.data != null) {
                    $('#quote-selection').html("<div class='table-responsive' id='recent-quotes-table'>");
                    $('#recent-quotes-table').html('');
                    AutoSource = new gridjs.Grid({
                        columns: [{
                            name: "Carrier", formatter: (_, row) => gridjs.html(`${row.cells[0].data}`)
                        }, {
                            name: "Quote Date", formatter: (_, row) => gridjs.html(`${row.cells[1].data}`)
                        }, {
                            name: "Premium", formatter: (_, row) => gridjs.html(`${row.cells[2].data}`)
                        }, {
                            name: "Drivers", formatter: (_, row) => gridjs.html(`${row.cells[3].data}`)
                        }, {
                            name: "Vehicles", formatter: (_, row) => gridjs.html(`${row.cells[4].data}`)
                        }, {
                            name: "Select", formatter: (_, row) => gridjs.html(`${row.cells[5].data}`)
                        }

                        ], pagination: {
                            limit: 5
                        }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.data
                    }).render(document.getElementById("recent-quotes-table"));
                    $('#qs-row').show();
                    $('html, body').animate({
                        scrollTop: $('#recent-quotes-table').offset().top
                    }, 'slow');
                    HideLoader();
                } else {
                    Swal.fire('Whoops!', "We were not able to find any valid Auto quotes for this Lead.", 'error')
                    HideLoader();
                }
            }
            if (data && data.status !== "Got Data") {
                HideLoader();
                displayAlert("Whoops! There was a problem fetching the auto quotes. Please try again", "error");

            }
        }
    });
});

$(document).on('click', '.addFloodQuote', function (event) {
    event.preventDefault();
    ShowLoader();
    const val = GetURLParameter('Contact');
    const str = $(this).attr("id");
    const spl = str.split("-");
    const hid = spl[1];
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-flood-quotes=' + val + '&get-flood-quotes-option=' + hid,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                if (data.data !== '' && data.data != null) {
                    $('#quote-selection').html("<div class='table-responsive' id='recent-quotes-table'>");
                    $('#recent-quotes-table').html('');
                    FloodSource = new gridjs.Grid({
                        columns: [{
                            name: "Carrier", formatter: (_, row) => gridjs.html(`${row.cells[0].data}`)
                        }, {
                            name: "Quote Date", formatter: (_, row) => gridjs.html(`${row.cells[1].data}`)
                        }, {
                            name: "Premium", formatter: (_, row) => gridjs.html(`${row.cells[2].data}`)
                        }, {
                            name: "Select", formatter: (_, row) => gridjs.html(`${row.cells[3].data}`)
                        }

                        ], pagination: {
                            limit: 5
                        }, sort: !0, search: !0, resizable: true, fixedHeader: !0, data: data.data
                    }).render(document.getElementById("recent-quotes-table"));
                    $('#qs-row').show();
                    $('html, body').animate({
                        scrollTop: $('#recent-quotes-table').offset().top
                    }, 'slow');
                    HideLoader();
                } else {
                    Swal.fire('Whoops!', "We were not able to find any valid Flood quotes for this Lead.", 'error')
                    HideLoader();
                }
            }
            if (data && data.status !== "Got Data") {
                HideLoader();
                displayAlert("Whoops! There was a problem fetching the flood quotes. Please try again", "error");

            }
        }
    });
});

$(document).on('click', '.addPPOption', function (event) {
    const lob = $(this).attr('data-value');
    const qSel = $(this).attr('data-quote');
    const opt = $(this).val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-proposal-payment-plan-options=true&payment-plan-lob=' + lob + '&payment-plan-quote-id=' + qSel + '&payment-plan-option=' + opt,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchCenteredModal(data.data, 'Add Payment Plan Options');
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });

});

$(document).on('click', '.addPaymentPlanOptionToQuote', function (event) {
    const quoteId = $(this).data('quote');
    const opt = $(this).data('option');
    const lob = $(this).data('lob');
    let shortLOB = '';
    if (lob === 'Home') {
        shortLOB = 'hq';
    } else if (lob === 'Auto') {
        shortLOB = 'aq';
    } else if (lob === 'Flood') {
        shortLOB = 'fq';
    }
    var planId = $('#payment-plan-option').val();
    const planInfoText = $('#payment-plan-option option:selected').text();
    var planAmount = $('#payment-plan-amount').val();
    const planAmountFormatted = formatMoney(planAmount);
    let divExists = true;
    let randomId = '';
    while (divExists === true) {
        randomId = generateRandomID();
        if ($('#' + shortLOB + '-payment-plan-display-' + randomId).length > 0) {

        } else {
            divExists = false;
        }
    }
    $('#' + shortLOB + '-payment-plans-row-' + opt).append('<div class="col-md-6 col-sm-12 col-xs-12" id="' + shortLOB + '-payment-plan-display-' + randomId + '">' + `<input type="hidden" name="` + shortLOB + `-paymentPlan-` + opt + `-` + quoteId + `-plan[]" value="` + planId + `" />` + `<input type="hidden" name="` + shortLOB + `-paymentPlan-` + opt + `-` + quoteId + `-plan-amount[]" value="` + planAmount + `" />` + '<h5>Plan: ' + planInfoText + ' <button class="btn btn-danger btn-sm removePaymentPlanOption" data-value="' + shortLOB + '-payment-plan-display-' + randomId + '" title="Remove Payment Plan Option"><i class="fa-regular fa-trash"></i></button></h5><p>Payment Amount: ' + planAmountFormatted + '</p></div>');

    var planId = $('#payment-plan-option').val('').trigger('change');
    var planAmount = $('#payment-plan-amount').val('');

});

$(document).on('click', '.cancelAddingPaymentPlanOptions', function (event) {
    event.preventDefault();
    const quoteId = $(this).data('quote');
    const opt = $(this).data('option');
    const lob = $(this).data('lob');
    const planId = $('#payment-plan-option').val();
    const planInfoText = $('#payment-plan-option option:selected').text();
    const planAmount = $('#payment-plan-amount').val();
    const planAmountFormatted = formatMoney(planAmount);
    let divExists = true;
    let randomId = '';
    if (lob === 'Home') {
        shortLOB = 'hq';
    } else if (lob === 'Auto') {
        shortLOB = 'aq';
    } else if (lob === 'Flood') {
        shortLOB = 'fq';
    }
    while (divExists === true) {
        randomId = generateRandomID();
        if ($('#' + shortLOB + '-payment-plan-display-' + randomId).length > 0) {

        } else {
            divExists = false;
        }
    }
    if (planId !== '') {
        $('#' + shortLOB + '-payment-plans-row-' + opt).append('<div class="col-md-6 col-sm-12 col-xs-12" id="' + shortLOB + '-payment-plan-display-' + randomId + '">' + `<input type="hidden" name="` + shortLOB + `-paymentPlan-` + opt + `-` + quoteId + `-plan[]" value="` + planId + `" />` + `<input type="hidden" name="` + shortLOB + `-paymentPlan-` + opt + `-` + quoteId + `-plan-amount[]" value="` + planAmount + `" />` + '<h5>Plan: ' + planInfoText + ' <button class="btn btn-danger btn-sm removePaymentPlanOption" data-value="' + shortLOB + '-payment-plan-display-' + randomId + '" title="Remove Payment Plan Option"><i class="fa-regular fa-trash"></i></button></h5><p>Payment Amount: ' + planAmountFormatted + '</p></div>');
    }
    emptyCenteredModal();
    $("#centeredModalButton").trigger("click");
    return false;
});

$(document).on('click', '.removePaymentPlanOption', function (event) {
    event.preventDefault();
    const rem = $(this).attr('data-value');
    $('#' + rem).remove();
});

$(document).on('click', '.genProposal', function (event) {
    const val = $(this).attr('data-value');

    $.post("functions/functions.php", "checkContactActiveStatus=" + val, function (data) {
        if (data === 1 || data === "1") {
            window.location.href = 'proposal_generator.php?Contact=' + val;
        } else {
            displayAlert("Proposal cannot be generated for Deleted/Hidden Contact.", "error");
        }
    });
});

$(document).on('click', '.addDeal', function (event) {
    displayAlert("This module is no longer available.", "error");
});


function getQuickAccess() {
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        data: 'get-quick-access=true',
        type: 'POST',
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#recent-list').html(data.data);

            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
    setTimeout(getQuickAccess, 10000); // you could choose not to continue on failure...
}

$(document).on('change', '#upd_lob', function (event) {
    const lob = $(this).val();
    if (lob === 'Auto') {
        $(".vehiclee").hide();
        $(".vehicls").show();
        // vehicls
    } else {
        $(".vehiclee").hide();
        $(".vehicls").hide();
    }
    // return false; // avoid to execute the actual submit of the form.
});
$(document).on('change', '#upd_lob', function (event) {
    $('#upd_lob_st').empty();
    const val = $(this).val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-lob-st=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#upd_lob_st').append(data.data);
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

// Inland Marine options
$(document).on('click', '.imSelection', function (event) {
    const form = $("#Inland_Marine-");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        event.preventDefault();
        const val = GetURLParameter('Contact');
        let qid = $(this).attr("data-value");
        if (qid === 0) {
            qid = '';
        }
        const opt = $(this).val();
        const formid = '#Inland_Marine-' + qid;

        if ($(formid).valid()) {
            var formdata = $('#Inland_Marine-' + qid);

            formdata.find('input[type="checkbox"]').each(function () {
                const checkbox_this = $(this);


                if (checkbox_this.is(":checked") === true) {
                    checkbox_this.attr('value', 'on');
                } else {
                    checkbox_this.prop('checked', true);
                    //DONT' ITS JUST CHECK THE CHECKBOX TO SUBMIT FORM DATA
                    checkbox_this.attr('value', 'off');
                }
            });

            var formdata = $('#Inland_Marine-' + qid).serialize() + "&opt=" + opt;


            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: formdata,
                success: function (data, result) {

                    if (data && data.status === "Success") {
                        $('#option-' + opt + '-Inland-Marine-info').append(data.data);
                        $('#addInland-MarineQuote-' + opt).hide();
                        $('#CommercialQuoteId-' + opt).val(data.quoteId);

                        $('#qs-row').hide();
                    }
                    if (data && data.status !== "Success") {
                    }
                }
            });
        } else {
            $('.quote-selection').animate({
                scrollTop: ($('.error').offset().top - 300)
            }, 2000);

            return false;
        }
    }
    form.addClass('was-validated');

});
// End Inland Marine Add options


// Employeement Practices Option
$(document).on('click', '.epSelection', function (event) {
    const form = $("#Employeement_Practices-");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {

        event.preventDefault();
        const val = GetURLParameter('Contact');
        let qid = $(this).attr("data-value");
        if (qid === 0) {
            qid = '';
        }
        const opt = $(this).val();
        const formid = '#Employeement_Practices-' + qid;
        if ($(formid).valid()) {
            var formdata = $('#Employeement_Practices-' + qid);

            formdata.find('input[type="checkbox"]').each(function () {
                const checkbox_this = $(this);
                if (checkbox_this.is(":checked") === true) {
                    checkbox_this.attr('value', 'on');
                } else {
                    checkbox_this.prop('checked', true);
                    //DONT' ITS JUST CHECK THE CHECKBOX TO SUBMIT FORM DATA
                    checkbox_this.attr('value', 'off');
                }
            });

            var formdata = $('#Employeement_Practices-' + qid).serialize() + "&opt=" + opt;


            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: formdata,
                success: function (data, result) {

                    if (data && data.status === "Success") {
                        $('#option-' + opt + '-Employment-Practices-Liability-info').append(data.data);
                        $('#addInland-MarineQuote-' + opt).hide();
                        $('#CommercialQuoteId-' + opt).val(data.quoteId);

                        $('#qs-row').hide();
                    }
                    if (data && data.status !== "Success") {
                    }
                }
            });
        } else {
            $('.quote-selection').animate({
                scrollTop: ($('.error').offset().top - 300)
            }, 2000);

            return false;
        }
    }
    form.addClass('was-validated');

});
// End Employeement Practices


// Commercial Auto Option
$(document).on('click', '.caSelection', function (event) {
    const form = $("#Commercial_Auto-");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        event.preventDefault();

        const val = GetURLParameter('Contact');
        let qid = $(this).attr("data-value");
        if (qid === 0) {
            qid = '';
        }
        const opt = $(this).val();
        const formid = '#Commercial_Auto-' + qid;

        if ($(formid).valid()) {
            var formdata = $('#Commercial_Auto-' + qid);

            formdata.find('input[type="checkbox"]').each(function () {
                const checkbox_this = $(this);


                if (checkbox_this.is(":checked") === true) {
                    checkbox_this.attr('value', 'on');
                } else {
                    checkbox_this.prop('checked', true);
                    //DONT' ITS JUST CHECK THE CHECKBOX TO SUBMIT FORM DATA
                    checkbox_this.attr('value', 'off');
                }
            });

            var formdata = $('#Commercial_Auto-' + qid).serialize() + "&opt=" + opt;


            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: formdata,
                success: function (data, result) {

                    if (data && data.status === "Success") {
                        $('#option-' + opt + '-Commercial-Auto-info').append(data.data);
                        $('#addCommercial-AutoQuote-' + opt).hide();
                        $('#CommercialQuoteId-' + opt).val(data.quoteId);

                        $('#qs-row').hide();
                    }
                    if (data && data.status !== "Success") {
                    }
                }
            });
        } else {
            $('.quote-selection').animate({
                scrollTop: ($('.error').offset().top - 300)
            }, 2000);

            return false;
        }
    }
    form.addClass('was-validated');

});
// End Commercial Auto


// WorkerCompensation Option
$(document).on('click', '.wcSelection', function (event) {
    const form = $("#Worker_Compensation-");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        event.preventDefault();

        const val = GetURLParameter('Contact');
        let qid = $(this).attr("data-value");
        if (qid === 0) {
            qid = '';
        }
        const opt = $(this).val();
        const formid = '#Worker_Compensation-' + qid;

        if ($(formid).valid()) {
            var formdata = $('#Worker_Compensation-' + qid);

            formdata.find('input[type="checkbox"]').each(function () {
                const checkbox_this = $(this);


                if (checkbox_this.is(":checked") === true) {
                    checkbox_this.attr('value', 'on');
                } else {
                    checkbox_this.prop('checked', true);
                    //DONT' ITS JUST CHECK THE CHECKBOX TO SUBMIT FORM DATA
                    checkbox_this.attr('value', 'off');
                }
            });

            var formdata = $('#Worker_Compensation-' + qid).serialize() + "&opt=" + opt;


            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: formdata,
                success: function (data, result) {

                    if (data && data.status === "Success") {
                        $('#option-' + opt + '-Workers-Compensation-info').append(data.data);
                        $('#addWorkers-CompensationQuote-' + opt).hide();
                        $('#CommercialQuoteId-' + opt).val(data.quoteId);

                        $('#qs-row').hide();
                    }
                    if (data && data.status !== "Success") {
                    }
                }
            });
        } else {
            $('.quote-selection').animate({
                scrollTop: ($('.error').offset().top - 300)
            }, 2000);

            return false;
        }
    }
    form.addClass('was-validated');
});
// End WorkerCompensation


// WInd Option
$(document).on('click', '.wiSelection', function (event) {
    const form = $("#Wind_Commerical-");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        event.preventDefault();

        const val = GetURLParameter('Contact');
        let qid = $(this).attr("data-value");
        if (qid === 0) {
            qid = '';
        }
        const opt = $(this).val();
        const formid = '#Wind_Commerical-' + qid;

        if ($(formid).valid()) {
            var formdata = $('#Wind_Commerical-' + qid);

            formdata.find('input[type="checkbox"]').each(function () {
                const checkbox_this = $(this);


                if (checkbox_this.is(":checked") === true) {
                    checkbox_this.attr('value', 'on');
                } else {
                    checkbox_this.prop('checked', true);
                    //DONT' ITS JUST CHECK THE CHECKBOX TO SUBMIT FORM DATA
                    checkbox_this.attr('value', 'off');
                }
            });

            var formdata = $('#Wind_Commerical-' + qid).serialize() + "&opt=" + opt;


            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: formdata,
                success: function (data, result) {

                    if (data && data.status === "Success") {
                        $('#option-' + opt + '-Wind-info').append(data.data);
                        $('#addWindQuote--' + opt).hide();
                        $('#CommercialQuoteId-' + opt).val(data.quoteId);

                        $('#qs-row').hide();
                    }
                    if (data && data.status !== "Success") {
                    }
                }
            });
        } else {
            $('.quote-selection').animate({
                scrollTop: ($('.error').offset().top - 300)
            }, 2000);

            return false;
        }
    }
    form.addClass('was-validated');

});
// End Wind


$(document).on('click', '.removewcSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    const id = $(this).attr('id');
    $('#option-' + opt + '-Workers-Compensation-info > p').html("");
    $('#addWorkers-CompensationQuote-' + opt).show();
    $('#' + id).hide();
    $('#CommercialQuoteId-' + opt).val('');

});
$(document).on('click', '.removewiSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    const id = $(this).attr('id');
    $('#option-' + opt + '-Wind-info > p').html("");
    $('#addWindQuote-' + opt).show();
    $('#' + id).hide();
    $('#CommercialQuoteId-' + opt).val('');

});

$(document).on('click', '.removecaSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    const id = $(this).attr('id');
    $('#option-' + opt + '-Commercial-Auto-info > p').html("");
    $('#addCommercial-AutoQuote-' + opt).show();
    $('#' + id).hide();
    $('#CommercialQuoteId-' + opt).val('');

});
$(document).on('click', '.removeimSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    const id = $(this).attr('id');
    $('#option-' + opt + '-Inland-Marine-info > p').html("");
    $('#addInland-MarineQuote-' + opt).show();
    $('#' + id).hide();
    $('#CommercialQuoteId-' + opt).val('');

});
$(document).on('click', '.removeepSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    const id = $(this).attr('id');
    $('#option-' + opt + '-Employment-Practices-Liability-info > p').html("");
    $('#addEmployment-Practices-LiabilityQuote-' + opt).show();
    $('#' + id).hide();
    $('#CommercialQuoteId-' + opt).val('');

});
$(document).on('click', '.poSelection', function (event) {

    const form = $("#Property_Option-");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        event.preventDefault();

        const val = GetURLParameter('Contact');
        let qid = $(this).attr("data-value");
        if (qid === 0) {
            qid = '';
        }
        const opt = $(this).val();
        const formid = '#Property_Option-' + qid;

        if ($(formid).valid()) {
            var formdata = $('#Property_Option-' + qid);

            formdata.find('input[type="checkbox"]').each(function () {
                const checkbox_this = $(this);


                if (checkbox_this.is(":checked") === true) {
                    checkbox_this.attr('value', 'on');
                } else {
                    checkbox_this.prop('checked', true);
                    //DONT' ITS JUST CHECK THE CHECKBOX TO SUBMIT FORM DATA
                    checkbox_this.attr('value', 'off');
                }
            });

            var formdata = $('#Property_Option-' + qid).serialize() + "&opt=" + opt;


            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: formdata,
                success: function (data, result) {

                    if (data && data.status === "Success") {
                        $('#option-' + opt + '-Property-info').append(data.data);
                        $('#addPropertyQuote-' + opt).hide();
                        $('#CommercialQuoteId-' + opt).val(data.quoteId);

                        $('#qs-row').hide();
                    }
                    if (data && data.status !== "Success") {
                    }
                }
            });
        } else {
            $('.quote-selection').animate({
                scrollTop: ($('.error').offset().top - 300)
            }, 2000);

            return false;
        }
    }
    form.addClass('was-validated');

});

$(document).on('click', '.removepoSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    const id = $(this).attr('id');
    $('#option-' + opt + '-Property-info > p').html("");
    $('#addPropertyQuote-' + opt).show();
    $('#' + id).hide();
    $('#CommercialQuoteId-' + opt).val('');

});


// End Property
$(document).on('click', '.glSelection', function (event) {
    const form = $("#General_Liabilties-");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        event.preventDefault();

        const val = GetURLParameter('Contact');
        let qid = $(this).attr("data-value");
        if (qid === 0) {
            qid = '';
        }
        const opt = $(this).val();
        const formid = '#General_Liabilties-' + qid;

        if ($(formid).valid()) {
            var formdata = $('#General_Liabilties-' + qid);

            formdata.find('input[type="checkbox"]').each(function () {
                const checkbox_this = $(this);


                if (checkbox_this.is(":checked") === true) {
                    checkbox_this.attr('value', 'on');
                } else {
                    checkbox_this.prop('checked', true);
                    //DONT' ITS JUST CHECK THE CHECKBOX TO SUBMIT FORM DATA
                    checkbox_this.attr('value', 'off');
                }
            });
            var formdata = $('#General_Liabilties-' + qid).serialize() + "&opt=" + opt;

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: formdata,
                success: function (data, result) {

                    if (data && data.status === "Success") {
                        $('#option-' + opt + '-General-Liability-info').append(data.data);
                        $('#addGeneral-LiabilityQuote-' + opt).hide();
                        $('#CommercialQuoteId-' + opt).val(data.quoteId);

                        $('#qs-row').hide();
                    }
                    if (data && data.status !== "Success") {
                    }
                }
            });
        } else {
            $('.quote-selection').animate({
                scrollTop: ($('.error').offset().top - 300)
            }, 2000);

            return false;
        }
    }
    form.addClass('was-validated');

});

$(document).on('click', '.removeglSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    const id = $(this).attr('id');
    $('#option-' + opt + '-General-Liability-info > p').html("");
    $('#addGeneral-LiabilityQuote-' + opt).show();
    $('#' + id).hide();
    $('#CommercialQuoteId-' + opt).val('');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: "deleteQuote=" + id,
        success: function (data, result) {

            if (data && data.status === "Success") {
                $('#' + id).hide();
                $('#CommercialQuoteId-' + opt).val('');
            }
            if (data.status !== "Success") {
            }
        }
    });
});

function reShopProposal(lob, qid, opt) {
    const val = GetURLParameter('cid');
    if (lob === "Home") {
        const site = $('#home-site-' + qid).val();
        const qdate = $('#home-qdate-' + qid).val();
        const cova = $('#home-cova-' + qid).val();
        const covb = $('#home-covb-' + qid).val();
        const covc = $('#home-covc-' + qid).val();
        const covd = $('#home-covd-' + qid).val();
        const cove = $('#home-cove-' + qid).val();
        const covf = $('#home-covf-' + qid).val();
        const prem = $('#home-prem-' + qid).val();
        const hd = $('#home-hd-' + qid).val();
        const aop = $('#home-aop-' + qid).val();
        const wh = $('#home-wh-' + qid).val();
        $.ajax({
            timeout: 10000,
            url: 'functions/functions.php',
            type: "POST",
            data: 'get-home-quote-detail=' + qid + '&hq-option=' + opt + '&hq-cova=' + cova + '&hq-covb=' + covb + '&hq-covc=' + covc + '&hq-covd=' + covd + '&hq-cove=' + cove + '&hq-covf=' + covf + '&hq-hd=' + hd + '&hq-aop=' + aop + '&hq-wh=' + wh + '&hq-prem=' + prem + '&hq-site=' + site + '&hq-qdate=' + qdate + '&hq-qContact=' + val,
            dataType: "json",
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#option-' + opt + '-home-info').html(data.data);
                    $('#qs-row').hide();
                }
                if (data && data.status !== "Got Data") {
                }
            }
        });
    } else if (lob === "Auto") {
        $.ajax({
            timeout: 10000,
            url: 'functions/functions.php',
            type: "POST",
            data: 'get-auto-quote-detail=' + qid + '&auto-option=' + opt + '&aq-qContact=' + val,
            dataType: "json",
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#option-' + opt + '-auto-info').html(data.data);
                    $('#qs-row').hide();
                }
                if (data && data.status !== "Got Data") {
                }
            }
        });
    } else if (lob === "Flood") {
        $.ajax({
            timeout: 10000,
            url: 'functions/functions.php',
            type: "POST",
            data: 'get-flood-quote-detail=' + qid + '&flood-option=' + opt + '&fq-qContact=' + val,
            dataType: "json",
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#option-' + opt + '-flood-info').html(data.data);
                    $('#qs-row').hide();
                }
                if (data && data.status !== "Got Data") {
                }
            }
        });
    } else {
        return false;
    }
}


$(document).on('click', '.hqSelection', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const qid = $(this).attr("data-value");
    const opt = $(this).val();
    const site = $('#home-site-' + qid).val();
    const qdate = $('#home-qdate-' + qid).val();
    const cova = $('#home-cova-' + qid).val();
    const covb = $('#home-covb-' + qid).val();
    const covc = $('#home-covc-' + qid).val();
    const covd = $('#home-covd-' + qid).val();
    const cove = $('#home-cove-' + qid).val();
    const covf = $('#home-covf-' + qid).val();
    const prem = $('#home-prem-' + qid).val();
    const hd = $('#home-hd-' + qid).val();
    const aop = $('#home-aop-' + qid).val();
    const wh = $('#home-wh-' + qid).val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-home-quote-detail=' + qid + '&hq-option=' + opt + '&hq-cova=' + cova + '&hq-covb=' + covb + '&hq-covc=' + covc + '&hq-covd=' + covd + '&hq-cove=' + cove + '&hq-covf=' + covf + '&hq-hd=' + hd + '&hq-aop=' + aop + '&hq-wh=' + wh + '&hq-prem=' + prem + '&hq-site=' + site + '&hq-qdate=' + qdate + '&hq-qContact=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#option-' + opt + '-home-info').html(data.data);
                $('#qs-row').hide();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

$(document).on('click', '.autoSelection', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const qid = $(this).attr("data-value");
    const opt = $(this).val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-auto-quote-detail=' + qid + '&auto-option=' + opt + '&aq-qContact=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#option-' + opt + '-auto-info').html(data.data);
                $('#qs-row').hide();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

$(document).on('click', '.floodSelection', function (event) {
    event.preventDefault();
    const val = GetURLParameter('Contact');
    const qid = $(this).attr("data-value");
    const opt = $(this).val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-flood-quote-detail=' + qid + '&flood-option=' + opt + '&fq-qContact=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#option-' + opt + '-flood-info').html(data.data);
                $('#qs-row').hide();
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });
});

$(document).on('click', '.removeHqSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    $('#option-' + opt + '-home-info').html('');
    const html = '<button class="btn btn-primary btn-sm bg-gradient addHomeQuote" id="addHomeQuote-' + opt + '">Add Home Option</button>';
    $('#option-' + opt + '-home-info').html(html);
});

$(document).on('click', '.removeAutoSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    $('#option-' + opt + '-auto-info').html('');
    const html = '<button class="btn btn-primary btn-sm bg-gradient addAutoQuote" id="addAutoQuote-' + opt + '">Add Auto Option</button>';
    $('#option-' + opt + '-auto-info').html(html);
});

$(document).on('click', '.removeFloodSelection', function (event) {
    event.preventDefault();
    const opt = $(this).val();
    $('#option-' + opt + '-flood-info').html('');
    const html = '<button class="btn btn-primary btn-sm bg-gradient addFloodQuote" id="addFloodQuote-' + opt + '">Add Flood Option</button>';
    $('#option-' + opt + '-flood-info').html(html);
});

$(document).on('click', '.addProposalOption', function (event) {
    event.preventDefault();
    var optc = $('.proposalOption').length;
    const addoptionfor = $('#option-' + optc).find('#swap-commercial').hasClass("active-swap");
    if (addoptionfor === true) {
        var optc = $('.proposalOption').length;
    } else {
        var optc = $('.proposalOption').length;
    }
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'get-proposal-option-div=' + optc + '&addCommercial=' + addoptionfor,
        dataType: "json",
        success: function (data, result) {

            if (data && data.status === "Got Data") {
                $('#option-row').append(data.data);
            }
            if (data && data.status !== "Got Data") {
            }
        }
    });


});

$(document).on('click', '.removeOption', function (event) {
    event.preventDefault();
    const opt = $(this).attr('data-value');
    $('#option-' + opt).remove();
});

$(document).on('click', '.generateProposal', function (event) {

    const form = $('#proposal-form');

    event.preventDefault();
    let deletedDiv = '';
    let msg = 'No Quote Selected for options ';
    const values = [];
    if ($("#flip-02").is(":visible")) {
        deletedDiv = 'flip-01';
        $("input[name='optionCommericial[]']").each(function () {
            const optionsId = $(this).val();
            const quoteId = $('#CommercialQuoteId-' + optionsId).val();
            if (quoteId !== '') {
                values.push('true');
            } else {
                values.push('false');
                msg += optionsId + ',';
            }
        });


    } else {
        deletedDiv = 'flip-02';

        const home = $('.removeHqSelection').val();
        const auto = $('.removeAutoSelection').val();
        const flood = $('.removeFloodSelection').val();
        if (typeof (home) == "undefined" && typeof (auto) == "undefined" && typeof (flood) == "undefined") {
            values.push('false');
        } else {
            values.push('true');
        }
    }
    const status = findValueInArray('false', values);

    if (status === "Exist") {
        msg = msg.replace(/,\s*$/, "");
        displayAlert(msg + " Please try again.", "error")


        return false;
    } else {
        $('#' + deletedDiv).remove();
        if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            displayAlert("Please fill all required fields to continue.", "error")
        } else {
            ShowLoader("Generating your Proposal, please wait...");
            const url = "functions/functions.php";
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: $("#proposal-form").serialize(),
                success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "Got Data") {
                        const url = data.data;
                        const email = data.email;
                        const html = "<div class='proposalActionsAfterGeneration'><div class='btn-group'><a class='btn btn-primary' style='color:#fff;' href='" + url + "' target='_blank'>View Proposal</a><a class='btn btn-primary' style='color:#fff;' href='mailto:" + email + "?Subject=Your Proposal Is Ready!&body=Click Here To View It - " + url + "' target='_blank'>Email Proposal</a></div></div>";
                        //html+=data.json;
                        $('#main-container').html(html);
                    }
                    if (data && data.status !== "Got Data") {
                        Swal.fire('Whoops!', "There was a problem creating that proposal. Please try again.", 'error')
                    }
                },
                error: function () {
                    Swal.fire('Whoops!', "There was a problem creating that proposal. Please try again.", 'error')
                }
            });
        }
        form.addClass('was-validated');
        return false; // avoid to execute the actual submit of the form.
    }
});

function findValueInArray(value, arr) {
    let result = "Doesn't exist";

    for (let i = 0; i < arr.length; i++) {
        const name = arr[i];
        if (name === value) {
            result = 'Exist';
            break;
        }
    }

    return result;
}

$(document).on('click', '.hideContact', function (event) {
    const contact_id = $(this).attr('data-value');
    const ele = $(this);
    const tableId = $(this).closest('table').attr('id'); // Get the ID of the closest table
    const closestRow = $(this).closest("tr");
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'hide-contact=' + contact_id,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('[data-bs-toggle="tooltip"]').tooltip('dispose');
                $('[data-bs-toggle="tooltip"]').tooltip({
                    trigger: "hover"
                });
                alertify.set('notifier', 'position', 'top-center');
                alertify.success("Contact was Hidden Successfully.");
                ele.addClass('unhideContact').removeClass('hideContact');
                ele.html('<i class="mdi mdi-eye-off font-size-18"></i>');
                ele.attr('title', 'Unhide Contact');
                ele.attr('data-bs-original-title', 'Unhide Contact').tooltip('show');
                closestRow.remove();

                $('#' + tableId).DataTable().draw(); // Redraw the specific table
            }
            if (data && data.status !== "Got Data") {
                alertify.set('notifier', 'position', 'top-center');
                alertify.error("Whoops! There was a problem hiding this contact. Please try again.");
            }
        }
    });

    return false; //for good measure
});


$(document).on('click', '.unhideContact', function (event) {
    const contact_id = $(this).attr('data-value');
    const url = "functions/functions.php";
    const ele = $(this);
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'un-hide-contact=' + contact_id,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('[data-bs-toggle="tooltip"]').tooltip('dispose');
                $('[data-bs-toggle="tooltip"]').tooltip({
                    trigger: "hover"
                })
                alertify.set('notifier', 'position', 'top-center');
                alertify.success("Contact Un-Hidden Successfully. Refreshing the page, please wait");
                ele.addClass('hideContact').removeClass('unhideContact');
                ele.html('<i class="mdi mdi-eye font-size-18"></i>');
                ele.attr('title', 'Hide Contact');
                ele.attr('data-bs-original-title', 'Hide Contact').tooltip('show');
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                alertify.set('notifier', 'position', 'top-center');
                alertify.error("Whoops! There was a problem Un-Hidden this contact. Please try again.");
            }
        }
    });

    return false; //for good measure
});
let mergeContactRow = '';
let mergeTableId = '';
$(document).on('click', '.mergeContact', function (event) {
    const contact_id = $(this).attr('data-value');
    mergeContactRow = $(this).closest('tr');
    mergeTableId = $(this).closest('table').attr('id'); // Get the ID of the closest table
    contactName = $(this).closest('.contactInfo').data('bs-original-title');
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'merge-ContactId=' + contact_id,
        beforeSend: function () {
            alertify.set('notifier', 'position', 'top-center');
            alertify.message("Getting info. Please wait.....");
        },
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Merge Contact');
                $('#merge_contact_assoc').val(contactName).focus().trigger('input');
            }
            if (data && data.status !== "Got Data") {
                alertify.set('notifier', 'position', 'top-center');
                alertify.error("Whoops! There was a problem retrieving this contact. Please try again.");
            }
        }
    });

    return false; //for good measure
});


$(document).on('submit', '#merge_contact_form', function (e) {
    ShowLoader();
    $('#invalidMergeMessageRow').hide();
    const form = $("#merge_contact_form");
    const inputVal = $('#merge_contact_assoc').val();
    const isValid = /^.+\|.+$/.test(inputVal);

    if (!isValid) {
        e.preventDefault(); // Prevent the form from submitting
        HideLoader();
        $('#invalidMergeMessageRow').show();
        return false;
    }
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        HideLoader();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            processData: false,
            data: $('#merge_contact_form').serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    HideLoader();
                    alertify.set('notifier', 'position', 'top-center');
                    alertify.success("Your contacts have been merged and the old one has been hidden");
                    const modal_qtpanel = $('#qtpanel');
                    modal_qtpanel.find('.offcanvas-header>h5').text("");
                    modal_qtpanel.find('.offcanvas-body').html("");
                    $('#qtpanel').offcanvas('hide');
                    if (mergeContactRow && mergeContactRow.length > 0) {
                        mergeContactRow.remove();
                    }
                    $('#' + mergeTableId).DataTable().draw(); // Redraw the specific table
                } else if (data && data.status !== "Invalid") {
                    HideLoader();
                    $('#invalidMergeMessageRow').show();
                    alertify.set('notifier', 'position', 'top-center');
                    alertify.error("Whoops! Please make sure to use the Contact Merge To field to search for, and select the Contact you want to merge to.");
                } else {
                    HideLoader();
                    alertify.set('notifier', 'position', 'top-center');
                    alertify.error("Whoops! There was a problem merging your contacts to the list. Please try again.");
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; //for good measure
});

$(document).on('focusout', '.FormatCurrency', function (event) {
    const val = $(this).val();
    if (val !== '') {
        var nval = parseFloat(val).toFixed(2);
    } else {
        var nval = parseFloat("0").toFixed(2);
    }

    $(this).val(nval);
});


$(document).on('click', '.addProduct', function (event) {
    const product = $(this).attr('data-value');
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'add-product=' + product,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Product request submitted. You will be contacted shortly.", "success");
                setTimeout(location.reload.bind(location), 3000);

            }
            if (data && data.status !== "Got Data") {
                displayAlert("Unable to add that product to your account. Please contact support.", "error");
            }
        }
    });

    return false; //for good measure
});

$(document).on('click', '.removeProduct', function (event) {
    const product = $(this).attr('data-value');
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'remove-product=' + product,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Product removal request submitted. You will be contacted shortly.", "success");
                setTimeout(location.reload.bind(location), 3000);

            }
            if (data && data.status !== "Got Data") {
                displayAlert("Unable to remove that product from your account. Please contact support.", "error");
            }
        }
    });

    return false; //for good measure
});
$(document).on('change', '#new_field_type', function (event) {
    const t = $(this).val();
    if (t === 'list') {
        $('#custom-field-options').append("<label class='control-label' for='new_field_options'>Please add Options (1 per line)</label><textarea class='form-control' name='new_field_options' id='new_field_options' placeholder='One option per line' required></textarea> <div class='invalid-feedback'>Please enter a valid list</div> <div class='valid-feedback'>Looks good!</div>");
    } else {
        $('#custom-field-options').html('');
    }
});

$(document).on('click', '#add-account', function (event) {
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'create-new-account=true',
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#policy_info_panel').html(data.data);
                $('#side-panel-title').html('New Account');
                if ($("#side-panel-toggle").hasClass('panel-hide')) {
                    $('#side-panel-toggle').trigger('click');
                }
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem adding a new account. Please try again.", "error");
            }
        }
    });

    return false; //for good measure
});

$(document).on('click', '.addContactToAccount', function (event) {
    const url = "functions/functions.php";
    const acct = $(this).attr('data-value');
    ShowLoader();
    $.post("functions/functions.php", "add-contact-to-account=" + acct, function (data) {
        HideLoader();
        const modal_qtpanel = $('#qtpanel');
        modal_qtpanel.find('.offcanvas-header>h5').text("Add Contact");
        modal_qtpanel.find('.offcanvas-body').html(data);
        $('#qtpanel').offcanvas('show');
        $('select').select2({
            theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
        });
        // flatpickr(".contact_datepicker", { enableTime: 0, dateFormat: "Y-m-d", allowInput: true, disableMobile: true });
        $('#addContactToAccountForm input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
    });


    return false; //for good measure
});

$(document).on('submit', '#new_account_form', function (event) {
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: $('#new_account_form').serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Account created successfully.", "success");
                $('#policy_info_panel').html('');
                $('#side-panel-title').html('');
                if ($("#side-panel-toggle").hasClass('panel-show')) {
                    $('#side-panel-toggle').trigger('click');
                }
                const account = data.account;
                setTimeout(function () {
                    //Redirect with JavaScript
                    window.location.href = 'accounts.php?AccountId=' + account;
                }, 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem adding that account.. Please try again.", "error");
            }
        }
    });


    return false; //for good measure
});

$(document).on('submit', '#addContactToAccountForm', function (event) {
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: $('#addContactToAccountForm').serialize(),
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Contact associated to the account successfully.", "success");
                $('#policy_info_panel').html('');
                $('#side-panel-title').html('');
                if ($("#side-panel-toggle").hasClass('panel-show')) {
                    $('#side-panel-toggle').trigger('click');
                }
            }
            if (data && data.status !== "Got Data") {
                if (data && data.status === 'Duplicate') {
                    displayAlert("Whoops! That contact is already associated. Please choose a different contact.", "error");
                }
                if (data && data.status === 'Error') {
                    displayAlert("Whoops! There was a problem adding that contact. Please try again.", "error");
                }
            }
        }
    });


    return false; //for good measure
});

$(document).on('keypress change input paste', '#link_contact_assoc', function (event) {
    if (event.which === '13') {
        event.preventDefault();
    } else {
        const searchStats = $('body').data('search-stats');
        $('#link_contact_assoc').catcomplete({
            hint: true, highlight: true, minLength: 3, delay: 1500, timeout: 10000, source: function (query, result) {
                ShowSearchLoader();
                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term + '&searchStats=' + searchStats,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        HideSearchLoader();
                        result(data);
                        $("#link_contact_assoc").trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#link_contact_assoc').val(item.value);
            }
        });


    }
});

$(document).on('keypress change input paste', '#links_contact_assoc', function (event) {

    if (event.which === '13') {
        event.preventDefault();
    } else {
        const searchStats = $('body').data('search-stats');
        $('#links_contact_assoc').catcomplete({
            hint: true, highlight: true, minLength: 3, delay: 1500, timeout: 10000, source: function (query, result) {
                ShowSearchLoader();
                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term + '&searchStats=' + searchStats,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        HideSearchLoader();
                        result(data);
                        $("#links_contact_assoc").trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#links_contact_assoc').val(item.value);
            }
        });


    }
});

$(document).on('keypress change input paste', '#policy_contact_assoc', function (event) {

    if (event.which === '13') {
        event.preventDefault();
    } else {
        const searchStats = $('body').data('search-stats');
        $('#policy_contact_assoc').catcomplete({
            hint: true, highlight: true, minLength: 3, delay: 1500, timeout: 10000, source: function (query, result) {
                ShowSearchLoader();
                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + query.term + '&conAssoc=conAssoc' + '&searchStats=' + searchStats,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        HideSearchLoader();
                        result(data);
                        $("#policy_contact_assoc").trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#policy_contact_assoc').val(item.value);
            }
        });

    }
});

$(document).on('click', '.lead2Leads', function (event) {
    event.preventDefault();
    const url = "functions/functions.php";
    val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        processData: false,
        data: 'get_lead_to_leads=' + val,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#map-table').html(data.data);
                $('#map').html(data.map);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem generating leads from this lead. Please try again.", "error");
            }
        }
    });
    return false; //for good measure
});
$(document).on('click', '#deleteSubOption', function (event) {
    const deleted = $('#deletedmodule').val();
    const optionFor = $('#deletedmodule').val();
    const parentId = $('#deleteId').val();

    for (i = 2; i <= deleted; i++) {
        $('#option-' + i).remove();
    }
    addActive(optionFor, parentId);
    $('#error_message').modal('hide');

});
$(document).on('click', '.swap-field', function (event) {
    event.preventDefault();
    const parent_Id = $(this).parent().parent().parent().parent().parent().attr('id');
    const optionfor = $(this).attr('id');
    if (optionfor === 'swap-commercial') {
        var optc = $('.addHomeQuote').length; // get Personal options
        if (optc > 1) {
            //show model for delete the sub personal options
            var modal2 = $('#error_message');
            modal2.find('.modal-header > h5').text("Are you sure want to delete the Sub Personal Options").end();
            $('#deletedmodule').val(optc);
            $('#deleteOption').val(optionfor);
            $('#deleteId').val(parent_Id);
            $('#error_message').modal('show');

        } else {
            addActive(optionfor, parent_Id);
        }

    } else {
        // personal active
        var optc = $('.addPackageQuote').length; // getCommercial OPTIONS
        if (optc > 1) {
            //show model for delete the sub commericial options
            var modal2 = $('#error_message');
            modal2.find('.modal-header > h5').text("Are you sure want to delete the Sub Commercial Options").end();
            $('#deletedmodule').val(optc);
            $('#deleteOption').val(optionfor);
            $('#deleteId').val(parent_Id);
            $('#error_message').modal('show');

        } else {
            addActive(optionfor, parent_Id);
        }
    }


});

function addActive(optionfor, parent_Id) {
    if (optionfor === "swap-personal") {
        $('#' + parent_Id).find('#flip-01').css('display', "inline-block");


        $('#' + parent_Id).find('#flip-02').css('display', 'none');

        $('#' + parent_Id).find('#swap-personal').addClass('active-swap');
        $('#' + parent_Id).find('#swap-commercial').removeClass('active-swap');
    } else {
        $('#' + parent_Id).find('#flip-02').css('display', "inline-block")

        $('#' + parent_Id).find('#flip-01').css('display', 'none');

        $('#' + parent_Id).find('#swap-commercial').addClass('active-swap');
        $('#' + parent_Id).find('#swap-personal').removeClass('active-swap');
    }
}

$(document).on("click", "#importLeadsBtn", function (event) {
    event.preventDefault();

    const $btn = $(this);
    const $form = $("#import_leads_form");
    const formEl = $form[0];

    if (formEl.checkValidity() === false) {
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        const data = new FormData(formEl);

        $.ajax({
            timeout: 120000, // give imports room to breathe
            type: "POST",
            url: "functions/functions.php",
            data: data,
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                ShowLoader();
                $btn.prop("disabled", true);
            },
            success: function (data) {
                if (data[0] === 1) {
                    displayAlert(data[1], "success");

                    // only reset on success
                    formEl.reset();

                    setTimeout(function () {
                        window.location = "import-history.php";
                    }, 2000);
                } else {
                    displayAlert(data[1], "error");
                    $(".notifyjs-bootstrap-base").css("white-space", "normal");
                    // don't reset here; let the user fix and re-submit if needed
                }
            },
            error: function (request, status, error) {
                displayAlert(
                    request.responseText || "An error occurred while importing leads.",
                    "error"
                );
            },
            complete: function () {
                HideLoader();
                $btn.prop("disabled", false);
            }
        });
    }

    $form.addClass("was-validated");
});


$(document).on("click", "#importPoliciesBtn", function (event) {

    const form = $("#import_policies_form");

    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        event.preventDefault();
        data = new FormData($("#import_policies_form")[0]);

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: 'functions/functions.php',
            data: data,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {

                ShowLoader();
            },
            success: function (data) {
                HideLoader();
                launchOffCanvasPanel('<p>Your import request has been received, and will continue to run in the background.</p><p>To view the results, once complete, you click click the Quick Actions (same place you found Import Policies) and click on Import History</p>', "Import Result");
            },
            error: function (request, status, error) {
                HideLoader();
                displayAlert("That did not work, please try again", "error");

            }
        });
    }
    form.addClass('was-validated');
});

$(document).on('click', '#deleteImportedContacts', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete the leads from this import?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete them!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'delete-imported-leads=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Leads deleted successfully. Refreshing page.", 'success');
                        setTimeout(location.reload.bind(location), 3000);

                        // setTimeout(location.reload.bind(location), 3000);
                    } else if (data && data.status === "DeletedPerm") {
                        displayAlert("There were no leads. So, record is deleted permanently. Refreshing page.", 'success');
                        setTimeout(location.reload.bind(location), 3000);
                    } else {
                        displayAlert("Whoops! There was a problem deleting those leads. Please try again.", 'error');
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});


$(document).on('click', '#restoreImportedContacts', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn theme-btn1',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to restore the leads from this import?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, restore them!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'restore-imported-leads=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Leads restored successfully. Refreshing page.", 'success');
                        setTimeout(location.reload.bind(location), 3000);

                        // setTimeout(location.reload.bind(location), 3000);
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem restoring those leads. Please try again.", 'error');
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});

$(document).on('click', '.subQB', function (event) {
    event.preventDefault();

    let contactId = GetURLParameter('Contact');

    if (contactId === '' || typeof contactId === "undefined") {
        contactId = $(this).attr('data-contact-id');
    }


    $.post("functions/functions.php", "checkContactActiveStatus=" + contactId, function (data) {
        if (data === 1 || data === "1") {
            val = $(this).attr('data-value');
            const selectbox = '<div class="d-flex card-header align-items-center"><div class="flex-shrink-0 me-3" role="group"><button class="btn btn-primary waves-effect waves-light rounded-circle" id="overviewContactButton" ><i class="fas fa-arrow-left fa-lg"></i></button></div><div class="flex-grow-1"><h3 class="h5 m-0">VirtualBOT</h3></div></div><div class="modal-body"><div class="row m-0"><div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3" id="lobdata"><label for="sel1">Please select the LOB Type:</label> <select class="form-select" id="lobtype"> <option selected>Select the Lob</option> <option value="Home">Home</option> <option value="Auto">Auto</option> <option value="Flood">Flood</option></select></div>';

            // $('#policy_info_panel').html(selectbox);
            if ($("#sendqbot-div").length > 0) {
                $("#sendqbot-div").html(selectbox);
                $("#sendqbot-div").show();
                $("#get-chartData").modal('hide');
                $(".contactPanel").hide();
                $("#contactEditPanel").hide();
                $('.form-select').select2({
                    theme: "bootstrap-5", width: '100%'
                });
            } else {
                window.location = "contact.php?Contact=" + contactId;
            }

        } else {
            displayAlert("This operation couldn't be performed for Deleted/Hidden Contact.", "error");
        }
    });
});


$(document).on('click', '.gridjs-table .subQB', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');

    contactId = $(this).attr('data-contact-id');

    $.post("functions/functions.php", "checkContactActiveStatus=" + contactId, function (data) {
        if (data === 1) {
            const selectbox = '<div class="col-sm-12"><div class="row"><div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3" id="lobdata"><label for="sel1">Please select the LOB Type:</label> <select class="form-select" id="lobtype"> <option selected>Select the Lob</option> <option value="Home">Home</option> <option value="Auto">Auto</option> <option value="Flood">Flood</option></select></div></div></div>';
            const modal_qtpanel = $('#qtpanel');
            modal_qtpanel.find('.offcanvas-header>h5').text("VirtualBot");
            modal_qtpanel.find('.offcanvas-body').html(selectbox);
            $('#qtpanel').offcanvas('show');
            $('select').select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
            });
        } else {
            displayAlert("This operation couldn't be performed for Deleted/Hidden Contact.", "error");
        }
    });
});

$(document).on('change', '#qtpanel #lobtype', function (e) {
    e.preventDefault();
    ShowLoader();
    const lob = this.value;
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'sub_qb_dashboard=' + val + '&lob=' + lob,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                const modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-body').empty();
                modal_qtpanel.find('.offcanvas-body').html(data.data);
                //$('#sendqbot-div').empty();
                // $('#sendqbot-div').html(data.data);
                $('#qtpanel #lobtype').val(lob);
                HideLoader();

                $('#qtpanel #lobtype, #qtpanel #qb_sites').select2({
                    theme: 'bootstrap-5', width: '100%'

                });
            }
            if (data && data.status !== "Got Data") {
                HideLoader();
                displayAlert("Whoops! There was a problem getting carrier for this lob. Please try again.", "success");
            }
        }
    })
    return false; //for good measure
});

$(document).on('change', '#sendqbot-div #lobtype', function (e) {
    e.preventDefault();
    ShowLoader();
    const lob = this.value;
    const val = $('#ContactId').val();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'sub_qb=' + val + '&lob=' + lob,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {

                $('#sendqbot-div').empty();
                $('#sendqbot-div').html(data.data);
                $('#lobtype').val(lob);
                HideLoader();

                $('#lobtype,#qb_sites').select2({
                    theme: 'bootstrap-5', width: '100%'

                });
            }
            if (data && data.status !== "Got Data") {
                HideLoader();
                displayAlert("Whoops! There was a problem getting carrier for this lob. Please try again.", "error");
                Swal.fire('Carrier Retrieval Failed', "This generally happens when you attempt to quote a Contact with invalid and/or incomplete information in QuoteRUSH. Please reload the Contact and click the Go to QuoteRUSH Lead button in the top right hand corner to verify the information.", 'error');

            }
        }
    })
    return false; //for good measure
});
$(document).on('click', '.custom-panel-title > a', function (event) {
    $(this).find('i').toggleClass('fa-plus fa-minus').closest('panel').siblings('panel').find('i').removeClass('fa-minus').addClass('fa-plus');
});


$(document).on('click', '.callContact', function (event) {
    const val = $(this).attr('data-value');
    window.open('tel:' + val);
});

$(document).on('click', '.smsContact', function (event) {
    const val = $(this).attr('data-value');
    window.open('tel:' + val);
});

$(document).on('click', '.emailContact', function (event) {
    const val = $(this).attr('data-value');
    window.open('mailto:' + val);
});

$(document).on('click', '.task_comp', function (event) {
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Do you have any notes to add?",
        html: '<textarea class="swal2-textarea" id="task-compClass" style="display: flex;resize: vertical;"></textarea>',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, dismiss it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            var result = {
                value: $("#task-compClass").val(),
            }
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'task_dismiss=' + val + '&dismiss_notes=' + result.value,
                success: function (response) {
                    displayAlert("Task ID - " + val + " dismissed successfully. You will need to refresh the page for the entry to disappear.", "success");
                }
            })

        } else if (result.value === '') {
            const text = '';
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: 'functions/functions.php',
                data: 'task_dismiss=' + val + '&dismiss_notes=' + text,
                success: function (response) {
                    displayAlert("Task ID - " + val + " dismissed successfully. You will need to refresh the page for the entry to disappear.", "success");
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })

});
$(document).on('click', '.addProperty', function (event) {
    if ($("#home_info").is(":visible")) {
        $("#home_info").hide();
    } else {
        $("#home_info").show();
    }
});

$(document).on('change', '#upd_lob', function (event) {
    const lob = $(this).val();
    if (lob === 'Auto') {
        $(".vehiclee").hide();
        $(".vehicls").show();
        //   vehicls
    } else {
        $(".vehiclee").hide();
        $(".vehicls").hide();
    }
    // return false; // avoid to execute the actual submit of the form.
});
// $(document).on('change', '#upd_lob', function(event) {
//     var lob = $(this).val();
//     if (lob != 'Commercial' && lob != 'Home') {
//         $(".formsTable").hide();
//         $(".formTable").hide();

//     } else {
//         $(".formsTable").show();
//         $(".formTable").hide();
//     }
//     // return false; // avoid to execute the actual submit of the form.
// });


$(document).on('click', '.addProperty', function (event) {
    if ($("#homePrp").is(":visible")) {
        $("#homePrp").hide();
    } else {
        $("#homePrp").show();
    }
    // return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '.addVehicle', function (event) {
    event.preventDefault();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'add_vehicle=true',
        dataType: "json",
        success: function (response, result) {
            if (response[0] !== "") {

                htmlOfVeh = '<div class="row p-0 m-0 veh-group">' + response[0] + '</div>';
                $('.vehicle_info').append(htmlOfVeh);

                $('.form-select').select2({
                    theme: "bootstrap-5", width: '100%'

                });

                $('.vehicle_info input[required]:not([pattern])').attr('pattern', '.*\\S+.*');

            }
            if (response[0] === "") {
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.removeVehicle', function (event) {

    if ($('.vehicle_info .veh-group').length > 0) {
        $(".vehicle_info").find(".veh-group:last").remove();
    }

    if ($('.vehicle_info .veh-group').length === 0) {
        $('.removeVehicle').hide();
    }
});

$(document).on('click', '.addDriver', function (event) {
    event.preventDefault();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'add_driver=true',
        dataType: "json",
        success: function (response, result) {
            if (response[0] !== "") {
                $('.driver_info').append(response[0]);
                $('.form-select').select2({
                    theme: "bootstrap-5", width: '100%'

                });
                $('#driver_info input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            }
            if (response[0] === "") {
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.addNewProperty', function (event) {
    event.preventDefault();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'add_property=true',
        dataType: "json",
        success: function (response, result) {
            if (response[0] !== "") {
                $('.newPropertyDIV').append(response[0]);
                if ($(".newPropertyDIV").is(":visible")) {
                } else {
                    $(".newPropertyDIV").show();
                }
            }
            if (response[0] === "") {
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.cancelAddNewProperty', function (event) {
    $(this).closest('.newPropertyDIV').remove();
});

$(document).on('click', '.removeDriver', function (event) {
    $(this).closest(".driver_info_div").remove();
});

$(document).on('click', '.addDriver1', function (event) {
    event.preventDefault();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'add_driver1=true',
        dataType: "json",
        success: function (response, result) {
            if (response[0] !== "") {
                $('.driver_info1').append(response[0]);

                $('.form-select').select2({
                    theme: "bootstrap-5", width: '100%'

                });
                flatpickr(".driver_issue_date", {
                    enableTime: 0,
                    altInput: true,
                    altFormat: "m/d/Y",
                    dateFormat: "Y-m-d",
                    maxDate: new Date(),
                    allowInput: true,
                    disableMobile: true
                });
                flatpickr(".add_driver_Birthdate", {
                    enableTime: 0,
                    altInput: true,
                    altFormat: "m/d/Y",
                    dateFormat: "Y-m-d",
                    maxDate: new Date(),
                    allowInput: true,
                    disableMobile: true
                });
                $('.driver_info1 input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            }

            if (response[0] === "") {
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.removeDriver1', function (event) {

    if ($('.driver_info1 .driver_info_div').length > 0) {
        $(".driver_info1").find(".driver_info_div:last").remove();
    }

    if ($('.driver_info1 .driver_info_div').length === 0) {
        $('.removeDriver1').hide();
    }
});

$(document).on('click', '.adddVehicle', function (event) {
    event.preventDefault();

    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'add_vehiclee=true',
        dataType: "json",
        success: function (response, result) {
            if (response[0] !== "") {
                htmlOfVeh = '<div class="row p-0 m-0 veh-group">' + response[0] + '</div>';
                $('#vehiicle_info').append(htmlOfVeh);

                $('.form-select').select2({
                    theme: "bootstrap-5", width: '100%'

                });
                flatpickr(".add_sub_policy_date", {
                    enableTime: 0,
                    altInput: true,
                    altFormat: "m/d/Y",
                    dateFormat: "Y-m-d",
                    minDate: 'today',
                    allowInput: true,
                    disableMobile: true
                });

                $('#vehiicle_info input[required]:not([pattern])').attr('pattern', '.*\\S+.*');

            }
            if (response[0] === "") {
            }
        }
    })
    return false; //for good measure
});

$(document).on('click', '.removeVehicle1', function (event) {
    $(this).closest('.veh-group').remove();
});

$(document).on('click', '#addToQR', function (event) {
    event.preventDefault();
    ShowLoader();
    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'send-to-qr=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === 'Got Data') {
                HideLoader();
                Swal.fire('Success!', "Lead synced! Refreshing page.", 'success')
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== 'Got Data') {
                HideLoader();
                Swal.fire('Well, this is awkward...', "We were unable to sync that lead over to QuoteRUSH. Please try again.", 'error');
            }
            HideLoader();
        }
    })
    return false; //for good measure
});
//script to add the email and sms template on sending at lead level
$(document).on('change', '#send_email #confirm-template-attach', function () {
    const isTemplateAttached = $(this).val();
    if (isTemplateAttached === "1") {
        $("#send_email #attached-template-content").prop("required", true);
        $('#send_email #to-sub-contact').prop("required", false);
        $('#send_email #email-content-contact').prop("required", false);
        $("#send_email #attach-template-div").show();
        $("#send_email #toSubjectDiv").hide();
        $("#send_email #emailContent-div").hide();
    } else {
        $("#send_email #to-sub-contact").prop("required", true);
        $("#send_email #email-content-contact").prop("required", true);
        $("#send_email #attached-template-content").prop("required", false);
        $("#send_email #attach-template-div").hide();
        $("#send_email #toSubjectDiv").show();
        $("#send_email #emailContent-div").show();
    }
});

$(document).on('change', '#sendEmail #confirm-template-attach1', function () {
    const isTemplateAttached = $(this).val();
    if (isTemplateAttached === "1") {
        $("#sendEmail #attached-template-content").prop("required", true);
        $('#sendEmail #to-sub-contact').prop("required", false);
        $('#sendEmail #email-content-contact').prop("required", false);
        $("#sendEmail #attach-template-div").show();
        $("#sendEmail #toSubjectDiv").hide();
        $("#sendEmail #emailContent-div").hide();
    } else {
        $("#sendEmail #to-sub-contact").prop("required", true);
        $("#sendEmail #email-content-contact").prop("required", true);
        $("#sendEmail #attached-template-content").prop("required", false);
        $("#sendEmail #attach-template-div").hide();
        $("#sendEmail #toSubjectDiv").show();
        $("#sendEmail #emailContent-div").show();
    }
});

$(document).on('change', '#sendSMS #attach-SMS-template1, #sendSMS #attach-SMS-template1', function () {
    const isTemplateAttached = $(this).val();
    if (isTemplateAttached === "1") {
        $("#sendSMS #attached-SMS-content1").prop("required", true);
        $("#sendSMS #sms-content-contact").prop("required", false);
        $("#sendSMS #sms-content-contact1").prop("required", false);
        $("#sendSMS #attachedSMSTempDiv").show();
        $("#sendSMS #sms-text-area").hide();
    } else {
        $("#sendSMS #sms-content-contact").prop("required", true);
        $("#sendSMS #sms-content-contact1").prop("required", true);
        $("#sendSMS #attached-SMS-content1").prop("required", false);
        $("#sendSMS #attachedSMSTempDiv").hide();
        $("#sendSMS #sms-text-area").show();
    }
});

$(document).on('change', '#send_sms #attach-SMS-template', function () {
    const isTemplateAttached = $(this).val();
    if (isTemplateAttached === "1") {
        $("#send_sms #attached-SMS-content").prop("required", true);
        $("#send_sms #attachedSMSTempDiv").show();
        $("#send_sms #sms-text-area").hide();
    } else {
        $("#send_sms #sms-content-contact").prop("required", true);
        $("#send_sms #attachedSMSTempDiv").hide();
        $("#send_sms #sms-text-area").show();
    }
});

$(document).on('change', '#ProducerReports', function () {
    const reportname = $(this).val();
    if (reportname === "Performance Report") {
        getProducerPerformanceReport();
    }
    if (reportname === "Closing Report") {
        getProducerClosingReport();
    }
    if (reportname === "Cross Selling") {
        getProducerCrossSellReport();
    }

});

$(document).on('change', '#mindate,#maxdate', function (event) {
    event.preventDefault();
    const min = $('#mindate').val();
    const max = $('#maxdate').val();
    const report_id = $('#ProducerReports').val();
    if (min === '') {
        displayAlert("Whoops! From Date can't be empty. Please try again.", "error");
        return false;
    } else if (max === '') {
        displayAlert("Whoops! To Date can't be empty. Please try again.", "error");
        return false;
    } else if (min > max) {
        displayAlert("Whoops! From Date can't be greater than To Date. Please try again.", "error");
        return false;
    } else {
        if (report_id === "Performance Report") {

            getProducerPerformanceReport(min, max);
        }
        if (report_id === "Closing Report") {
            getProducerClosingReport(min, max);
        }
        if (report_id === "Cross Selling") {
            getProducerCrossSellReport();
        }

    }
});
$(document).on('click', '#export-producer', function (event) {

    ExportToExcel('xlsx');
});
$(document).on('change', '.feeSelect', function (event) {
    const selectedOption = $(this).find('option:selected');
    const feeAmount = selectedOption.data('fee-amount');
    $(this).closest('.feeRow').find('input.carrierFeeAmount').val(feeAmount);
});

$(document).on('click', '.removeNewCarrierFee', function (event) {
    $(this).closest('.feeRow').remove();
});


$(document).on('click', '.removePolicyFeeMapping', function (event) {
    event.preventDefault();
    ShowLoader();
    const mappingId = $(this).attr('data-value');
    const PolicyId = GetURLParameter('Policy');
    const row = $(this).closest('tr');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: 'POST',
        dataType: 'json',
        data: 'removePolicyFee=' + mappingId + '&removePolicyFeePolicy=' + PolicyId,
        success: function (response) {
            if (response.status === 'success') {
                HideLoader();
                displayAlert('Fee removed successfully', "success");
                if ($('#carrier_fees').length > 0) {
                    $('#carrier_fees').val(response.feesTotal);
                }
                if ($('.totalPremiumHeader').length > 0) {
                    $('.totalPremiumHeader').val(response.formattedPremiumTotal);
                }
                if ($('#total_premium').length > 0) {
                    $('#total_premium').val(response.premiumTotal);
                }
                row.remove();
            } else {
                HideLoader();
                displayAlert('Unable to remove this Fee. Please try again or contact Support for assistance', "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader();
            displayAlert('Unable to remove this Fee. Please try again or contact Support for assistance', "error");
        }
    });

    return false; // Prevent default form submission behavior
});

$(document).on('click', '.finalizePolicyFees', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    ShowLoader();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: 'POST',
        dataType: 'json',
        data: $('#carrierFeesForm').serialize(),
        success: function (response) {
            if (response.status === 'success') {
                emptyAndCloseCenteredModal();
                if($('#carrierFeeTable').is(':visible')) {
                    CarrierFeesTable('carrierFeeTable');
                }
                HideLoader();
                displayAlert('Fees added successfully', "success");
                if ($('#carrier_fees').length > 0) {
                    $('#carrier_fees').val(response.feesTotal);
                }
                if ($('.totalPremiumHeader').length > 0) {
                    $('.totalPremiumHeader').val(response.formattedPremiumTotal);
                }
                if ($('#total_premium').length > 0) {
                    $('#total_premium').val(response.premiumTotal);
                }
            } else {
                HideLoader();
                displayAlert('Unable to add these Fee(s). Please try again or contact Support for assistance', "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader();
            displayAlert('Unable to add these Fee(s). Please try again or contact Support for assistance', "error");
        }
    });

    return false; // Prevent default form submission behavior
});

$(document).on('click', '.addCarrierFee', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    ShowLoader(); // Show loader before AJAX call
    const PolicyId = GetURLParameter('Policy');
    $.ajax({
        url: 'functions/functions.php',
        type: 'POST',
        dataType: 'json',
        data: 'addCarrierFee=true&CarrierFeePolicy=' + PolicyId, // Use an object for data
        timeout: 10000, // 10 seconds timeout
        success: function (data) {
            HideLoader(); // Hide loader after AJAX call
            if (data && data.status === 'Got Data') {
                launchCenteredModal(data.data, 'Add Carrier Fee(s)', 'modal-xl');
                $('.feeSelect').select2({
                    theme: "bootstrap-5", width: '100%',
                });
                CarrierFeesTable('carrierFeeFormTable');
                $("#addFeeRow").on("click", function () {
                    const feeRow = `<div class="row mb-2 feeRow"><hr>
                        <div class="col-md-6 col-sm-12 col-xs-12"><label class="control-label">Select Fee</label>${data.feeDropdown}</div>
                        <div class="col-md-6 col-sm-12 col-xs-12"><label class="control-label">Fee Amount</label>
                            <div class="input-group">
                                <input type="number" step="0.01" class="form-control carrierFeeAmount" name="feeAmount[]">
                                <a class="btn btn-sm btn-danger removeNewCarrierFee"><i class="fa-regular fa-trash"></i></a>
                            </div>
                        </div>
                      </div>`;
                    $("#feesContainer").append(feeRow);
                    $('.feeSelect').not('.select2-hidden-accessible').select2({
                        theme: "bootstrap-5", width: '100%'
                    });
                });
            } else {
                displayAlert("Whoops! There was a problem fetching the details for Carrier Fees. Please ensure you have added Carrier Fees or contact support if this persists.", "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader(); // Hide loader after AJAX call
            displayAlert("Whoops! There was a problem fetching the details for Carrier Fees. Please ensure you have added Carrier Fees or contact support if this persists.", "error");
        }
    });

    return false; // Prevent default form submission behavior
});


$(document).on('click', '.removeNewEndorsement', function (event) {
    $(this).closest('.endorsementRow').remove();
});


$(document).on('click', '.removeEndorsementMapping', function (event) {
    event.preventDefault();
    ShowLoader();
    const mappingId = $(this).attr('data-value');
    const PolicyId = GetURLParameter('Policy');
    const row = $(this).closest('tr');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: 'POST',
        dataType: 'json',
        data: 'removeEndorsement=' + mappingId + '&removeEndorsementPolicy=' + PolicyId,
        success: function (response) {
            if (response.status === 'success') {
                HideLoader();
                displayAlert('Endorsement removed successfully', "success");
                if ($('#endorsements').length > 0) {
                    $('#endorsements').val(response.endorsementTotal);
                }
                if ($('.totalPremiumHeader').length > 0) {
                    $('.totalPremiumHeader').val(response.formattedPremiumTotal);
                }
                if ($('#total_premium').length > 0) {
                    $('#total_premium').val(response.premiumTotal);
                }
                row.remove();
            } else {
                HideLoader();
                displayAlert('Unable to remove this Endorsement. Please try again or contact Support for assistance', "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader();
            displayAlert('Unable to remove this Endorsement. Please try again or contact Support for assistance', "error");
        }
    });

    return false; // Prevent default form submission behavior
});

$(document).on('click', '.finalizePolicyEndorsements', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    ShowLoader();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: 'POST',
        dataType: 'json',
        data: $('#endorsementsForm').serialize(),
        success: function (response) {
            if (response.status === 'success') {
                emptyAndCloseCenteredModal();
                HideLoader();
                displayAlert('Endorsement(s) added successfully', "success");
                if ($('#endorsements').length > 0) {
                    $('#endorsements').val(response.endorsementTotal);
                }
                if ($('.totalPremiumHeader').length > 0) {
                    $('.totalPremiumHeader').val(response.formattedPremiumTotal);
                }
                if ($('#total_premium').length > 0) {
                    $('#total_premium').val(response.premiumTotal);
                }
            } else if (response.status === 'no change') {
                HideLoader();
                displayAlert('No change(s) to Endorsements found.', "message");
            } else {
                HideLoader();
                displayAlert('Unable to add these Endorsement(s). Please try again or contact Support for assistance', "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader();
            displayAlert('Unable to add these Endorsement(s). Please try again or contact Support for assistance', "error");
        }
    });

    return false; // Prevent default form submission behavior
});

$(document).on('click', '.addEndorsement', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    ShowLoader(); // Show loader before AJAX call
    const PolicyId = GetURLParameter('Policy');
    $.ajax({
        url: 'functions/functions.php',
        type: 'POST',
        dataType: 'json',
        data: 'addEndorsement=true&EndorsementsPolicy=' + PolicyId, // Use an object for data
        timeout: 10000, // 10 seconds timeout
        success: function (data) {
            HideLoader(); // Hide loader after AJAX call
            if (data && data.status === 'Got Data') {
                launchCenteredModal(data.data, 'Add Endorsement(s)', 'modal-xl');
                $('.endorsementSelect').select2({
                    theme: "bootstrap-5", width: '100%',
                });
                $('.endorsementStatus').select2({
                    theme: "bootstrap-5", width: '100%',
                });
                $("#addEndorsementRow").on("click", function () {
                    const feeRow = `<div class="row mb-2 endorsementRow"><hr>
                        <div class="col-md-5 col-sm-12 col-xs-12">
						    <label class="control-label">Select Endorsement</label>${data.endorsementsDropdown}
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12">
						    <label class="control-label">Endorsement Status</label>
                            <select class="form-control endorsementStatus" name="endorsementStatus[]">
                                <option value="">Please Select Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                            </select>
					    </div>
                        <div class="col-md-3 col-sm-12 col-xs-12"><label class="control-label">Endorsement Amount</label>
                            <div class="input-group">
                                <input type="number" step="0.01" class="form-control endorsementAmount" name="endorsementAmount[]">
                                <a class="btn btn-sm btn-danger removeNewEndorsement"><i class="fa-regular fa-trash"></i></a>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12">
						    <label class="control-label">Endorsement Notes</label><textarea rows="3" class="form-control" name="endorsementNotes[]"></textarea>
					    </div>
                      </div>`;
                    $("#endorsementsContainer").append(feeRow);
                    $('.endorsementSelect').not('.select2-hidden-accessible').select2({
                        theme: "bootstrap-5", width: '100%'
                    });
                    $('.endorsementStatus').not('.select2-hidden-accessible').select2({
                        theme: "bootstrap-5", width: '100%'
                    });
                });
            } else {
                displayAlert("Whoops! There was a problem fetching the details for Endorsements with this Line of Business. Please contact Support if this persists.", "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader(); // Hide loader after AJAX call
            displayAlert("Whoops! There was a problem fetching the details for Endorsements with this Line of Business. Please contact Support if this persists.", "error");
        }
    });

    return false; // Prevent default form submission behavior
});


$(document).on('click', '.approveEndorsementMapping', function (event) {
    event.preventDefault();
    ShowLoader();
    const mappingId = $(this).attr('data-value');
    const PolicyId = GetURLParameter('Policy');
    const row = $(this).closest('tr');
    const button = $(this);
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: 'POST',
        dataType: 'json',
        data: 'approveEndorsement=' + mappingId + '&approveEndorsementPolicy=' + PolicyId,
        success: function (response) {
            if (response.status === 'success') {
                HideLoader();
                displayAlert('Endorsement approved successfully', "success");
                if ($('#endorsements').length > 0) {
                    $('#endorsements').val(response.endorsementTotal);
                }
                if ($('.totalPremiumHeader').length > 0) {
                    $('.totalPremiumHeader').val(response.formattedPremiumTotal);
                }
                if ($('#total_premium').length > 0) {
                    $('#total_premium').val(response.premiumTotal);
                }
                button.remove();
            } else {
                HideLoader();
                displayAlert('Unable to approve this Endorsement. Please try again or contact Support for assistance', "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader();
            displayAlert('Unable to approve this Endorsement. Please try again or contact Support for assistance', "error");
        }
    });

    return false; // Prevent default form submission behavior
});


function ExportToExcel(type, fn, dl) {
    const min = $('#mindate').val();
    const max = $('#maxdate').val();
    const report_name = $("#ProducerReports option:selected").text();
    const elt = document.getElementById('all-producer-performance');
    const wb = XLSX.utils.table_to_book(elt, {sheet: "sheet1"});
    return dl ?

        XLSX.write(wb, {
            bookType: type,
            bookSST: true,
            type: 'base64'
        }) : XLSX.writeFile(wb, fn || (report_name + '(' + min + '-' + max + ').' + (type || 'xlsx')));
}

function getProducerCrossSellReport(min = null, max = null) {
    if (min === "" || min == null) {
        const current = new Date();
        const numberOfDaysToSubstract = 90;
        const prior = new Date().setDate(current.getDate() - numberOfDaysToSubstract);
        var date = new Date(prior);
        var min = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    }
    if (max === "" || max == null) {
        var date = new Date();
        var max = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    }
    $.ajax({
        timeout: 10000,
        url: "functions/dashboard_functions.php",
        type: "POST",
        dataType: "json",
        data: "ProducePerformancereport=CrossSell Report&minperform=" + min + "&maxperform=" + max,
        beforeSend: function () {
            $(".loader-div").fadeIn();
        },
        success: function (data) {
            $(".loader-div").fadeOut();

        }
    });
}

function getProducerClosingReport(min = null, max = null) {
    if (min === "" || min == null) {
        const current = new Date();
        const numberOfDaysToSubstract = 90;
        const prior = new Date().setDate(current.getDate() - numberOfDaysToSubstract);
        var date = new Date(prior);
        var min = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    }
    if (max === "" || max == null) {
        var date = new Date();
        var max = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    }
    $.ajax({
        timeout: 10000,
        url: "functions/dashboard_functions.php",
        type: "POST",
        dataType: "json",
        data: "ProducePerformancereport=Closing Report&minperform=" + min + "&maxperform=" + max,
        beforeSend: function () {
            $(".loader-div").fadeIn();
        },
        success: function (data) {
            $(".loader-div").fadeOut();

            if (data.response === "No data") {
                displayAlert("Whoops! No data found. Please try again.", "error");
            } else {
                if ($.fn.DataTable.isDataTable('#all-producer-performance')) {
                    $('#all-producer-performance').DataTable().destroy();
                }

                $('#all-producer-performance').html(data.tabledata);
                $('#all-producer-performance').DataTable({

                    'order': [[0, 'desc']]
                });

                const chartype = {
                    type: 'pie'
                };
                const chartitle = {
                    text: 'Producer Report Average closing day'
                };
                const chartooltip = {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
                };
                const chartplotoptions = {
                    series: {
                        dataLabels: {
                            enabled: true, format: '{point.name}: {point.y:.1f}'
                        }
                    },

                };
                const accessibility = {
                    announceNewData: {
                        enabled: true
                    }, point: {
                        valueSuffix: ''
                    }
                };
                const chartseries = [{
                    name: 'Average Days to close', colorByPoint: true, data: data.series,

                }];
                const chartdrilldown = {
                    series: data.drilldown
                };
                const credits = {
                    enabled: false
                };
                $('#chart-container').highcharts({
                    chart: chartype,
                    title: chartitle,
                    tooltip: chartooltip,
                    plotOptions: chartplotoptions,
                    series: chartseries,
                    drilldown: chartdrilldown,
                    accessibility: accessibility,
                    credits: credits
                });

            }
        },
        error: function (jqXHR, exception) {

        }
    });
}

function getProducerPerformanceReport(min = null, max = null) {

    if (min === "" || min == null) {
        const current = new Date();
        //This return the curren number of the day

        // it returns a timestamp
        const numberOfDaysToSubstract = 90;
        const prior = new Date().setDate(current.getDate() - numberOfDaysToSubstract);
        var date = new Date(prior);
        var min = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    }
    if (max === "" || max == null) {
        var date = new Date();
        var max = (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    }
    $.ajax({
        timeout: 10000,
        url: "functions/dashboard_functions.php",
        type: "POST",
        dataType: "json",
        data: "ProducePerformancereport=Performance Report&minperform=" + min + "&maxperform=" + max,
        beforeSend: function () {
            $(".loader-div").fadeIn();
        },
        success: function (data) {
            $(".loader-div").fadeOut();

            if (data.response === "No data") {
                displayAlert("Whoops! No data found. Please try again.", "error");
            } else {
                if ($.fn.DataTable.isDataTable('#all-producer-performance')) {
                    $('#all-producer-performance').DataTable().destroy();
                }

                $('#all-producer-performance').html(data.tabledata);
                $('#all-producer-performance').DataTable({

                    'order': [[0, 'desc']]
                });
                const barchartdata = data.series;
                var data = {
                    table: 'all-producer-performance'
                };

                const chart = {
                    type: 'column'
                };
                const title = {
                    text: 'Producers Performance Report'
                };
                const xAxis = {
                    categories: ['No. of Active Policies', 'Active Policies Premium Total in $', 'Lost Policy Count', 'Lost Premium Total in $', 'Highest Premium Selling LOB', 'Overall Premium Percentage']
                };
                const credits = {
                    enabled: false
                };
                const yAxis = {
                    min: 0, title: {
                        text: '', align: 'high'
                    }, labels: {
                        overflow: 'justify',
                    },

                };
                const tooltip = {
                    valueSuffix: ''
                };
                const plotOptions = {
                    column: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                };
                const series = barchartdata;

                const json = {};
                json.chart = chart;
                json.title = title;

                json.tooltip = tooltip;
                json.xAxis = xAxis;
                json.yAxis = yAxis;
                json.series = series;
                json.plotOptions = plotOptions;
                // json.legend = legend;
                json.credits = credits;

                $('#chart-container').highcharts(json);
            }
        },
        error: function (jqXHR, exception) {

        }
    });
}


$(document).on('click', '#add_monitored_mailbox', function (event) {
    event.preventDefault();
    ShowLoader();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'add-monitored-mailbox=true',
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#addMailboxDiv').empty();
                $('#addMailboxDiv').html(data.data);
                HideLoader();
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was adding your template. Please try again.", "error")
                HideLoader();
            }
        }
    })
    HideLoader();
    return false; //for good measure
});

$(document).on('submit', '#duplicatePolicyForm', function (event) {
    const form = $("#duplicatePolicyForm");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
        return false;
    } else {
        event.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
            }, buttonsStyling: false
        });
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            processData: false,
            data: $('#duplicatePolicyForm').serialize(),
            success: function (data, result) {
                if (data.status === "Got Data" && data.Policy) {
                    $('#duplicatePolicyModal').modal('hide');
                    Swal.fire('Success!', "Policy Duplicated successfully, please wait while we take you to that Policy.", 'success');
                    setTimeout(function () {
                        window.location.href = `policy.php?Policy=${data.Policy}`;
                    }, 5000);
                } else if (data.status === "Duplicate") {
                    const PolicyId = data?.duplicatePolicy ?? undefined;
                    if (PolicyId !== '' && PolicyId !== undefined) {
                        swalWithBootstrapButtons.fire({
                            title: 'Duplicate Entry Found',
                            text: "We are unable to process your request. There is already a Policy in the system with that information.",
                            icon: 'error',
                            showCancelButton: true,
                            confirmButtonText: 'Open Policy Found',
                            cancelButtonText: 'Cancel',
                            reverseButtons: false
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.cancel) {
                            } else {
                                window.location.href = `policy.php?Policy=${PolicyId}`;
                            }
                        })
                    } else {
                        swalWithBootstrapButtons.fire({
                            title: 'Duplicate Entry Found',
                            text: "We are unable to process your request. There is already a Policy in the system with that information.",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ok',
                            reverseButtons: false
                        });
                    }
                } else {
                    displayAlert("Whoops! There was a problem processing your request. Please try again.", "error");
                    return false;
                }
            },
            error: function (result) {
                displayAlert("Whoops! There was a problem duplicating that policy. Please try again.", "error")
            }
        });
    }
    form.addClass('was-validated');
    return false;
});

$(document).on('click', '#testMailbox', function (event) {
    event.preventDefault();
    ShowLoader();
    $('#addMonitoredMailbox').append('<input type="hidden" name="test-mailbox" id="test-mailbox" value="true" />');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: $("#addMonitoredMailbox").serialize(),
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#test-mailbox').remove();
                $.ajax({
                    url: 'functions/functions.php',
                    type: "POST",
                    data: $("#addMonitoredMailbox").serialize(),
                    dataType: "json",
                    success: function (data, result) {
                        if (data && data.status === "Got Data") {
                            Swal.fire('Thank you!', "Mailbox added successfully! Refreshing page.", 'success')
                            $('#addMonitoredMailbox').remove();
                            setTimeout(location.reload.bind(location), 3000);
                        }
                        if (data && data.status !== "Got Data") {
                            Swal.fire('Whoops!', "We were unable to add that mailbox. If the problem persists, please contact support.", 'error')
                            $('#test-mailbox').remove();
                            HideLoader();
                        }
                    }
                })
            }
            if (data && data.status !== "Got Data") {
                Swal.fire('Whoops!', "We tried to authenticate with the information you provided and it did not work. Please verify you have the right information and try again.", 'error')
                $('#test-mailbox').remove();
                HideLoader();
            }
        }
    })
    HideLoader();
    return false; //for good measure
});

$(document).on('click', '.deleteMailbox', function (event) {
    event.preventDefault();
    val = $(this).attr('data-value');

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to delete this mailbox?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'delete-mailbox=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Mailbox deleted successfully. Refreshing page.", "success")
                        setTimeout(location.reload.bind(location), 3000);

                        // setTimeout(location.reload.bind(location), 3000);
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem deleting that mailbox. Please try again.", "error")
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});

$(document).on('click', '.updateQRLeadId', function (event) {
    const val = $(this).attr('data-value');
    const url = 'functions/functions.php';
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "update-qr-lead-id=" + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchOffCanvasPanel(data.data, 'Update QuoteRUSH Lead Id');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("This operation couldn't be performed for Deleted/Hidden Contact", "error");
            }
        }
    });
});

$(document).on('submit', '#updateQRLeadIdForm', function (e) {
    const form = $("#updateQRLeadIdForm");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#updateQRLeadIdForm").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    $('#offcanvasBottomBody').html('');
                    $('#offcanvasBottomLabel').html('');
                    alertify.success("QuoteRUSH Lead Id updated successfully, this page will refresh in a few seconds.");
                    setTimeout(location.reload.bind(location), 3000);
                }
                if (data && data.status !== "Got Data") {
                    Swal.fire('Whoops!', "We were unable to update the QuoteRUSH Lead Id for this contact. Please try again. If the problem persists, please contact support.", 'error')
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.addToQR', function (event) {
    event.preventDefault();
    ShowLoader();
    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'send-to-qr=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === 'Got Data') {
                HideLoader();
                Swal.fire('Success!', "Lead synced! Refreshing page.", 'success')
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== 'Got Data') {
                HideLoader();
                Swal.fire('Well, this is awkward...', "We were unable to sync that lead over to QuoteRUSH. Please try again.", 'error')
            }
            HideLoader();
        }
    })
    return false; //for good measure
});


$(document).on('click', '#editContact-template, #editContact-SMStemplate', function () {
    const ids = $(this).attr("data-value");

    if ($('.messages-info-tab').hasClass('active')) {
        var EmailTempId = $("#attached-SMS-content" + ids).val();
        var typeofTempl = "SMS";
    } else {
        var EmailTempId = $("#attached-template-content" + ids).val();
        var typeofTempl = "Email";
    }
    if (EmailTempId === '' || EmailTempId == null) {

        displayAlert("Please select the template", "error")
    } else {
        $.ajax({
            timeout: 10000, url: "functions/marketing_functions.php", type: "POST", data: {
                EditTemplateContact: EmailTempId,
            }, beforeSend: function () {
                $(".loader-div").fadeIn();
            }, success: function (data, result) {
                $(".loader-div").fadeOut();
                if (data.response === "No data") {

                    displayAlert("No Data Found!", "error")

                } else {

                    $('#edit_contact_temp').find('.modal-body').html(data.form_data);
                    const selected_type = data.type_summer;
                    $("#hiddenTemplateType").text(data.type_summer);
                    $("#HiddenEditTemplateId").val(EmailTempId);
                    (function () {
                        url = "functions/marketing_functions.php";
                        dataId = EmailTempId;
                        $.ajax({
                            type: "POST",
                            url: url,
                            dataType: "json",
                            data: "get-temp-content=true" + "&tempId=" + dataId,
                            success: function (data, result) {
                                if (selected_type === 'Email') {
                                    const cleanedBackendData = cleanText(data.data);
                                    $('#summernote').summernote({
                                        height: 300, // Adjust the height as needed
                                        callbacks: {
                                            onPaste: function (e) {
                                                e.preventDefault();

                                                // Get pasted content
                                                const clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                                                const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');

                                                // Sanitize and clean the pasted content
                                                const cleanContent = sanitizeAndCleanHtml(pastedData);

                                                // Insert the clean content into Summernote
                                                $(this).summernote('pasteHTML', cleanContent);
                                            }
                                        }
                                    });
                                    $("#summernote").summernote("code", cleanedBackendData);
                                    $("#type1").css("display", "block");
                                    $("#type2").css("display", "none");
                                } else {
                                    $("#editor2").val(data.data);
                                    $("#type1").css("display", "none");
                                    $("#type2").css("display", "block");
                                }
                            },
                        });
                    })();
                    dataForMerge = localStorage.getItem('emailData');
                    Editors_Data();
                    $('#edit_contact_temp').modal('show');
                }
            }
        });
    }

});

$(document).on('click', '#viewContact-template, #viewContact-SMStemplate', function () {

    const ids = $(this).attr("data-value");
    if ($('.messages-info-tab').hasClass('active')) {
        var EmailTempId = $("#attached-SMS-content" + ids).val();
    } else {
        var EmailTempId = $("#attached-template-content" + ids).val();
    }
    if (EmailTempId === '' || EmailTempId == null) {
        displayAlert("Please select the template", "error")
    } else {
        $.ajax({
            timeout: 10000, url: "functions/marketing_functions.php", type: "POST", data: {
                EmailTempId: EmailTempId,
            }, beforeSend: function () {
                $(".loader-div").fadeIn();
            }, success: function (data, result) {
                $(".loader-div").fadeOut();
                if (data.response === "No data") {

                    displayAlert("No Data Found!", "error")

                } else {
                    const TempjsonData = localStorage.getItem("ContactTemp");
                    let Content = data.content;
                    if (TempjsonData) {
                        const jsonData = JSON.parse(TempjsonData);

                        Content = jsonData.TemplatedContent;

                    }
                    const w = window.open();
                    $(w.document.body).html('<h5><b>Template Name:</b> <span>' + data.title + '</span> </h5>' + Content);

                }
            },
        });
    }
});

function ShowLinkedSearchLoader() {
    $('.loadding-search-overlay').show();
}

function HideLinkedSearchLoader() {
    $('.loadding-search-overlay').hide();
}

$(document).ready(function () {
    $('#add-carrier-modal').hide();
    $(document).on('input', "input[name='edit-property-zip'],input[name='upd_agency_zip'],input[name='upd_zip'],#contact_zip, #upd_property_zip", function (e) {
        $(this).attr('maxlength', '5');
    });


    $(document).on('keypress', "input[name='edit-property-zip'],input[name='upd_zip'],input[name='upd_agency_zip'], #contact_zip, #upd_property_zip", function (e) {

        const charCode = (e.which) ? e.which : event.keyCode;

        if (String.fromCharCode(charCode).match(/[^0-9]/g))

            return false;

    });

    $(document).on('keypress', "input[name='upd_fax'], #upd_phone,#contact_phone,#new_user_phone", function (e) {
        const charCode = (e.which) ? e.which : event.keyCode;
        if (String.fromCharCode(charCode).match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g)) return false;
    });

    $(document).on('input', "#upd_phone, #contact_phone, #new_user_phone", function (e) {
        $(this).attr('maxlength', '15');
    });
    $(document).on('keypress', "#license_number", function (e) {
        const ch = String.fromCharCode(event.keyCode);
        const filter = /[a-zA-Z0-9]/;
        if (!filter.test(ch)) {
            event.returnValue = false;
        }
    });
    $(document).on('keypress', "#add_home_state,  input[name='edit-property-state'],  #issue_state, #upd_state,  #contact_state, #upd_property_state", function (e) {

        const ch = String.fromCharCode(event.keyCode);
        const filter = /[a-zA-Z]/;
        if (!filter.test(ch)) {
            event.returnValue = false;
        }

    });
    $(document).on('keypress', "input[name='edit-property-city'], #upd_property_city,  #add_home_city,  #upd_city,  #contact_city", function (e) {

        const ch = String.fromCharCode(event.keyCode);
        const filter = /[a-zA-Z ]/;
        if (!filter.test(ch)) {
            event.returnValue = false;
        }

    });

    $(document).on('click', '#viewContactButton', function (event) {
        $('#upd_contact_form input').attr('readonly', true);
        $('#upd_contact_form select').attr('readonly', true);
        $('#upd_contact_form textarea').attr('readonly', true);
        $('#contactEditPanel').show();
        $('#editContactButton').show();
        $('.contactPanel').hide();
        $('a[href^=\"#collapseOne-1-2\"]').trigger('click');

    });
    $(document).on('click', '#overviewContactButton', function (event) {

        $('#contactEditPanel').hide();
        $('#sendqbot-div').hide();
        $('.contactPanel').show();
    });
    $(document).on('click', '#overviewContactButton', function (event) {
        $('a[href^=\"#collapseOne-1-2\"]').trigger('click');
    });

    $(document).on('click', '#editContactButton', function (event) {
        $('#upd_contact_form input').attr('readonly', false);
        $('#upd_contact_form select').attr('readonly', false);
        $('#upd_contact_form select').prop('disabled', false);
        $('#upd_contact_form textarea').attr('readonly', false);
        $('#upd_contact_form input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
        $('#updateContactButton').attr('disabled', false);
        if ($('#upd_contact_form #stageSel').val() === '') {
            $('#upd_contact_form #stageSel').prop('disabled', true);
        }
        loadGoogleMapsApi(() => {
            initializeAutocomplete('upd_contact_form', 'addr');
            initializeAutocomplete('upd_contact_form', 'mailing_addr');
        });
        $(this).attr('id', 'saveContactToolBar');  // Updates the id attribute
        $(this).attr('data-bs-original-title', 'Save Contact');
        $(this).attr('aria-label', 'Save Contact');
        $(this).html(`<i class="mdi mdi-content-save font-size-16"></i>`);     // Updates the inner HTML of the button
    });

    $(document).on('click', '.noti-icon', function (event) {
        const visibility = $('#qtpanel').css('visibility');
        if (visibility === 'hidden') {
            const modal_qtpanel = $('#qtpanel');
            modal_qtpanel.find('.offcanvas-header>h5').text("");
            modal_qtpanel.find('.offcanvas-body').text("");
        }
    });
    $(document).ready(function () {
        const ShowHideMoreFile = $('.filess');
        ShowHideMoreFile.each(function () {
            const times = $(this).children('.showMoreFiles');
            if (times.length > 3) {
                ShowHideMoreFile.children(':nth-of-type(n+5)').addClass('moreShown').hide();
                $('.filemessage').addClass('more-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
            }
        });

        const ShowHideMoreFold = $('.folders');
        ShowHideMoreFold.each(function () {
            const times = $(this).children('.showMoreFolders');
            if (times.length > 3) {
                ShowHideMoreFold.children(':nth-of-type(n+5)').addClass('moreShown').hide();
                $('.folmessage').addClass('more-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
            }
        });

        const ShowHideMorePFile = $('.policyfiless');
        ShowHideMorePFile.each(function () {
            const times = $(this).children('.showMoreFiles');
            if (times.length > 3) {
                ShowHideMorePFile.children(':nth-of-type(n+5)').addClass('moreShown').hide();
                $('.filePmessage').addClass('more-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
            }
        });

        const ShowHideMorePFol = $('.policyfolders');
        ShowHideMorePFol.each(function () {
            const times = $(this).children('.showMoreFolders');
            if (times.length > 3) {
                ShowHideMorePFol.children(':nth-of-type(n+5)').addClass('moreShown').hide();
                $('.folPmessage').addClass('more-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
            }
        });
    });

    $(document).on('click', '.filemessage', function () {

        const that = $(this);
        const thisParent = $('.filess');

        if (that.hasClass('more-times')) {

            thisParent.find('.moreShown').show();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-danger waves-effect waves-light">View Less</a>');
        } else {
            thisParent.find('.moreShown').hide();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
        }
    });
    $(document).on('click', '.filePmessage', function () {

        const that = $(this);
        const thisParent = $('.policyfiless');
        if (that.hasClass('more-times')) {
            thisParent.find('.moreShown').show();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-danger waves-effect waves-light">View Less</a>');
        } else {
            thisParent.find('.moreShown').hide();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
        }
    });

    $(document).on('click', '.folmessage', function () {
        const that = $(this);
        const thisParent = $('.folders');
        if (that.hasClass('more-times')) {
            thisParent.find('.moreShown').show();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-danger waves-effect waves-light">View Less</a>');
        } else {
            thisParent.find('.moreShown').hide();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
        }
    });

    $(document).on('click', '.folPmessage', function () {
        const that = $(this);
        const thisParent = $('.policyfolders');

        if (that.hasClass('more-times')) {
            thisParent.find('.moreShown').show();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-danger waves-effect waves-light">View Less</a>');
        } else {
            thisParent.find('.moreShown').hide();
            that.toggleClass('more-times', 'less-times').html('<a href="javascript: void(0);" class="fw-medium link-primary waves-effect waves-light">View More</a>');
        }
    });


})

$(document).on('click', '.ivansInfo', function (event) {
    val = $(this).attr('data-value');
    event.preventDefault();
    ShowLoader("Pulling IVANs transaction details, please wait....");
    $.ajax({
        type: "POST",
        url: 'functions/functions.php',
        data: 'get-ivans-transaction-info=' + val,
        timeout: 10000,
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                const modal_ivans = $('#ivans_details');
                modal_ivans.find('.modal-body').html(data.data);
                modal_ivans.modal('show');
            }
            if (data && data.status !== "Got Data") {
                displayAlert("There was a problem pulling the details for this IVANs transaction. Please try again or contact Support for assistance.", "error");
            }
        },
        error: function () {
            HideLoader();
            displayAlert("There was a problem pulling the details for this IVANs transaction. Please try again or contact Support for assistance.", "error");
        }
    });
    return false; // avoid to execute the actual submit of the form.
});


function removeQueryParamAndUpdateURL(parameterName) {
    let url = window.location.href;
    const urlParts = url.split("?");
    if (urlParts.length >= 2) {
        const prefix = encodeURIComponent(parameterName) + "=";
        const queryParams = urlParts[1].split("&");

        for (let i = queryParams.length - 1; i >= 0; i--) {
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


$(document).on('submit', '#sso-cd-login-new', function (e) {
    e.preventDefault();
    const url = "functions/functions.php";
    $("#signIn").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: url,
        timeout: 10000,
        data: $("#sso-cd-login-new").serialize(),
        success: function (data, result) {
            if (data && data.status === 'Success') {
                const urlLocation = GetURLParameter('location');
                if (urlLocation === '' || urlLocation === undefined || urlLocation === 'undefined') {
                    window.location.href = 'index.php';
                } else {
                    window.location.href = decodeURIComponent(urlLocation).replace(/^\/+/, '');
                }
            } else {
                window.location.href = 'logout.php';
            }
        }
    });
    return false;
});

$(document).on('click', '#checkUserLogin', function (event) {
    const form = $("#user_login");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        event.preventDefault();
        url = "functions/functions.php";
        $.ajax({
            type: "POST",
            url: url,
            timeout: 10000,
            data: $("#user_login").serialize(),
            success: function (data, result) {
                if (data && data.status !== "Failed") {
                    var urlLocation = GetURLParameter('location');
                    if (urlLocation === '' || urlLocation === undefined || urlLocation === 'undefined') {
                        window.location.href = 'index.php';
                    } else {
                        window.location.href = decodeURIComponent(urlLocation).replace(/^\/+/, '');
                    }
                } else {
                    var urlLocation = "logout.php?invalid_session=true";
                    displayAlert(data.message, "error");
                    setTimeout(window.location.href = urlLocation, 3000);
                }
            }
        });
    }

    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#remProfileLogo', function (event) {

    event.preventDefault();
    const val = $(this).attr("data-value");

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to Remove the Profile Logo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                url: 'functions/functions.php',
                type: "POST",
                timeout: 10000,
                data: 'rem_profile_logo=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {

                        displayAlert("Profile logo removed successfully.", "success")
                        $('#img01').hide();
                        $('#remProfileLogo').hide();
                        $('#drop_zone_user').show();
                        // window.location = "/profile.php";
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem removing your profile logo. Please try again.", "error")
                        window.location = "/profile.php";
                    }
                }
            })
        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});

$(document).on('click', '#del-logo-img', function (event) {
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to Remove the Logo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'functions/print_summary_functions.php',
                type: "POST",
                timeout: 10000,
                data: 'rem_logo=' + true,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        setTimeout(location.reload.bind(location), 3000);
                        Swal.fire('Success!', "Settings updated, refreshing to show your changes.", 'success')
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem removing your profile logo. Please try again.", "error")
                        // window.location = "/profile.php";
                    }
                }
            })
        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});
$(document).on('click', '#remAgencyLogo', function (event) {

    event.preventDefault();
    const val = $(this).attr("data-value");

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to Remove the Agency Logo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
    }).then((result) => {
        if (result.value) {

            $.ajax({
                url: 'functions/functions.php',
                type: "POST",
                timeout: 10000,
                data: 'rem_agency_logo=' + val,
                dataType: "json",
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        displayAlert("Agency logo removed successfully", "success")
                        $('#img01').hide();
                        $('#remAgencyLogo').hide();
                        $('#drop_zone_ag').show();
                    }
                    if (data && data.status !== "Got Data") {
                        displayAlert("Whoops! There was a problem removing your agency logo. Please try again.", "error")
                        window.location = "/agency-profile.php";
                    }
                }
            })

        } else if (/* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel) {

        }
    })
});


$(document).on('change', '#to_vendor', function (event) {
    event.preventDefault();
    const val = $(this).val();

    if (val === "Sendgrid") {
        $.ajax({
            url: "functions/functions.php",
            type: "POST",
            data: "check-for-sg-int-workflow=true",
            dataType: "json",
            async: "false",
            timeout: 10000,
            beforeSend: function () {
                $(".loader-div").fadeIn();
            },
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    HideLoader();
                    if (data.hasOwnProperty("sg_error")) {
                        if (data.sg_error === "exist") {
                            displayAlert("You have the SendGrid Module enabled but your SendGrid account information has not been added. Place add it through Quick Tools in the top right", "error");
                            $('#contact_email_send').prop('disabled', true);
                        }
                        if (data.sg_error === "not exist") {
                            displayAlert("You will need to add the SendGrid Module to your account to leverage Email", "error");
                            $('#contact_email_send').prop('disabled', true);
                        }
                    } else {

                        if (data.sender_ids.isGot === "Failed") {


                            displayAlert("You dont have any Sender in the SendGrid. Please add First.", "error");
                            $('#contact_email_send').prop('disabled', true);
                        }
                        if (data.sender_ids.isGot === "Got Data") {
                            $("#email_from").empty().append('<option value="" selected disabled>Please Select</option>' + data.sender_ids.data);
                            $('#email_username').css('display', 'none');
                            $('#email_password').css('display', 'none');
                            $('#from_uname').prop('required', false);
                            $('#from_pwd').prop('required', false);
                            $('#email_from_div').css('display', 'block');
                            $('#email_from').select2({
                                theme: "bootstrap-5", width: '100%',
                            });
                            $('#contact_email_send').prop('disabled', false);
                            $('#email_from').prop('required', true);
                        }

                    }
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem looking for your SendGrid Account Information. Please try again.", "error");
                    $('#contact_email_send').prop('disabled', true);
                    HideLoader();
                }
            }
        });
    } else {
        $('#email_from_div').css('display', 'none');
        $('#email_username').css('display', 'block');
        $('#email_password').css('display', 'block');
        $('#contact_email_send').prop('disabled', false);
        $('#from_uname').prop('required', true);
        $('#from_pwd').prop('required', true);
        $('#email_from').prop('required', false);
    }
});

$(document).on('click', '#sample_csv_download', function (e) {
    ShowLoader();
    e.preventDefault();
    $('#sample_csv')[0].trigger('click');
    HideLoader();
});


$(document).on('keypress', '#claim_contact_assoc', function (event) {
    if (event.which === '13') {
        event.preventDefault();
    } else {
        $('#claim_contact_assoc').catcomplete({
            hint: true, highlight: true, minLength: 3, delay: 1500, source: function (query, result) {
                ShowSearchLoader();
                $.ajax({
                    url: "search_claim.php",
                    type: 'post',
                    timeout: 10000,
                    dataType: "json",
                    data: 'search=' + query.term,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        result(data);
                        HideSearchLoader();
                        $("#claim_contact_assoc").trigger('focus');
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#claim_contact_assoc').val(item.value);
            }
        });

    }
});


$(document).on('click', '.showEmailCreds', function (e) {
    if ($(this).hasClass('fa-eye-slash')) {
        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
        $('.emailCreds').show();
    } else {
        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
        $('.emailCreds').hide();
    }
});

$(document).on('change', '#claim_paid', function (e) {

    if ($("#claim_paid").prop('checked') === true) {


        $("#claim_paid_date").show();
        $("#paid-date-label").show();
        flatpickr("#claim_paid_date", {
            enableTime: 0,
            altInput: true,
            altFormat: "m/d/Y",
            dateFormat: "Y-m-d",
            minDate: "today",
            allowInput: true,
            disableMobile: true
        });
        $('#claim_paid_date').prop("required", true);
    } else {
        $("#claim_paid_date").val("");
        $('#claim_paid_date').prop("required", false);
        $("#claim_paid_date").hide();
        $("#paid-date-label").hide();
    }

});

$(document).on('click', '.markProposalSent, .markProposalDeleted', function (event) {
    event.preventDefault();
    ShowLoader();
    const $row = $(this).closest('tr');
    const val = $(this).attr('data-value');
    const button = $(this).parent();
    if ($(this).hasClass('markProposalSent')) {
        var pstatus = 'markProposalSent';
    }
    if ($(this).hasClass('markProposalDeleted')) {
        var pstatus = 'markProposalDeleted';
    }
    if (pstatus !== '') {
        $.ajax({
            url: 'functions/functions.php',
            type: "POST",
            timeout: 10000,
            data: 'editProposalStatus=' + pstatus + '&statusProposal=' + val,
            dataType: "json",
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    HideLoader();
                    displayAlert("Proposal Updated", "success");
                    if (pstatus === 'markProposalSent') {
                        const $statusCell = $row.find('td[data-field="Status"]');
                        button.remove();
                        $statusCell.text('');
                        $statusCell.text('Sent to Customer');
                    } else if (pstatus === 'markProposalDeleted') {
                        const {Grid, html, h} = gridjs;
                        const Contact = GetURLParameter('Contact');
                        $('#proposal-table').html('');
                        $.ajax({
                            url: 'functions/functions.php',
                            type: "POST",
                            timeout: 10000,
                            data: 'refreshProposalTable=' + Contact,
                            dataType: "json",
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {

                                    const proposalgrid = new Grid({

                                        columns: ["Description", {
                                            name: "Status", attributes: {
                                                'data-field': 'Status'
                                            }
                                        }, "Created", {
                                            name: 'Submitter',
                                            formatter: (_, row) => gridjs.html(`${row.cells[3].data}`)

                                        }, {
                                            name: 'Actions',
                                            formatter: (_, row) => gridjs.html(`${row.cells[4].data}`),
                                            sort: false

                                        },

                                        ], pagination: {
                                            limit: 5
                                        }, sort: !0, search: true, resizable: true, fixedHeader: !0, data: data.data
                                    }).render(document.getElementById("proposal-table"));
                                }
                                if (data && data.status !== 'Got Data') {
                                    displayAlert("We need to reload the page, please wait!", "info");
                                    setTimeout(location.reload.bind(location), 3000);
                                }
                            }
                        });
                    } else {

                    }
                }
                if (data && data.status !== "Got Data") {
                    displayAlert("Whoops! There was a problem updating this Proposal. Please try again.", "error");

                    HideLoader();
                }
            }
        })
    } else {
        displayAlert("Whoops! There was a problem updating this Proposal. Please try again.", "error");
    }
    HideLoader();
    return false; //for good measure
});

$(document).on('click', '#mark_inv_paid', function (event) {
    event.preventDefault();
    ShowLoader();
    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'mark-invoice-paid=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                HideLoader();
                displayAlert("Invoice marked as paid, refreshing page.", "success");

                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem marking that invoice as paid. Please try again.", "error");

                HideLoader();
            }
        }
    })
    HideLoader();
    return false; //for good measure
});

$(document).on('click', '#mark_inv_unpaid', function (event) {
    event.preventDefault();
    ShowLoader();
    const val = $(this).attr('data-value');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        type: "POST",
        data: 'mark-invoice-unpaid=' + val,
        dataType: "json",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                HideLoader();
                displayAlert("Invoice marked as unpaid, refreshing contact.", "success");
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem marking that invoice as unpaid. Please try again.", "error");
                HideLoader();
            }
        }
    })
    HideLoader();
    return false; //for good measure
});

$(document).on('click', '#topNavSearchButton', function (event) {
    if ($(this).hasClass('show')) {
        if ($('.qs-search-contact').length > 0) {
            $('.qs-search-contact').trigger('focus');
        } else {
            $('.qr-search-contact').trigger('focus');
        }
    }
});


$(document).on('click', '#topNavSearchButton-horiz', function (event) {
    if ($(this).hasClass('show')) {
        if ($('.qs-search-contact-horiz').length > 0) {
            $('.qs-search-contact-horiz').trigger('focus');
        } else {
            $('.qr-search-contact-horiz').trigger('focus');
        }
    }
});

$(document).on("click", "#contact_lead_src_details,#upd_lead_src_details", function (event) {
    if (event.which === "13") {
        event.preventDefault();
    } else {
        $("#contact_lead_src_details,#upd_lead_src_details").catcomplete({
            hint: true, highlight: true, delay: 1500, source: function (query, result) {

                $.ajax({
                    timeout: 10000,
                    url: "functions/functions.php",
                    type: "post",
                    dataType: "json",
                    data: "search_quicktool=" + query.term,
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {
                        HideSearchLoader();
                        result(data);
                        $("#contact_lead_src_details,#upd_lead_src_details").trigger('focus');
                    }
                });
            }, open: function (event, ui) {
                // $("html, body").css({ overflow: 'hidden' });
                $('.ui-autocomplete').css({'max-height': '200px', 'overflow-y': 'auto', 'overflow-x': 'hidden'})
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $("#contact_lead_src_details,#upd_lead_src_details").val(item.value);
            }
        });


    }
});

$(document).on('keypress change input paste', '#invoice_contact_assoc', function (event) {
    if (event.which === '13') {
        event.preventDefault();
    } else {
        const searchTerm = $(this).val();
        const searchStats = $('body').data('search-stats');
        $('#invoice_contact_assoc').catcomplete({
            hint: true, highlight: true, minLength: 3, delay: 1500, timeout: 10000, source: function (query, result) {

                $.ajax({
                    timeout: 10000,
                    url: "search-auto-comp.php?source=Invoices",
                    type: 'post',
                    dataType: "json",
                    data: 'search=' + searchTerm + '&searchStats=disable' + '&for=Contacts',
                    beforeSend: function () {
                        ShowSearchLoader();
                    },
                    success: function (data) {

                        result(data);
                        HideSearchLoader();
                        $("#invoice_contact_assoc").trigger('focus');
                    },
                    error: function (request, status, err) {
                        if (status === "timeout") {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        } else {
                            displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                        }
                    }
                });
            }, open: function (event, ui) {
                $("html, body").css({overflow: 'hidden'});
            }, close: function () {
                $("html, body").css({overflow: 'inherit'});
            }, displayText: function (item) {
                return item.label
            }, afterSelect: function (item) {
                $('#invoice_contact_assoc').val(item.value);
            }
        });

    }
});

$(document).on('click', '.viewTaskNotes', function (e) {
    e.preventDefault();
    const notesId = $(this).attr('data-value');

    const contactId = $(this).attr('data-id');

    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'get-task-notes=' + notesId + '&ContactId=' + contactId,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#task_modal .modal-title').html('Task Notes');
                $('#task_modal .modal-body').html(data.data);
                $('.modal').modal('hide');
                $('#task_modal').modal('show');
                $('#task_append_notes input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            } else {
                Swal.fire('Whoops!', "We were unable to retrieve notes for that task. Please try again. If the problem persists, please contact support.", 'error')
            }
        }
    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#addTaskNoteButton', function (e) {
    const form = $("#task_append_notes");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const notesId = $('#taskNoteId').val();
        const notes = $('#addTaskNotes').val().trim();
        if (notes === '') {
            displayAlert("Please fill all required fields to continue.", "error");
            return false;
        }
        const contactId = $('#task_modal').find('#taskContactId').val();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'appendTaskNote=' + notesId + '&appendTaskNotes=' + notes + '&ContactId=' + contactId,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Note added successfully!", "success");
                    $('#task_modal .modal-title').html('');
                    $('#task_modal .modal-body').html('');
                    $('.modal').modal('hide');
                    $('#task_modal').modal('hide');
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: 'get-task-notes=' + notesId + '&ContactId=' + contactId,
                        success: function (data, result) {
                            if (data && data.status === "Got Data") {
                                $('#task_modal .modal-title').html('Task Notes');
                                $('#task_modal .modal-body').html(data.data);
                                $('.modal').modal('hide');
                                $('#task_modal').modal('show');

                            } else {
                                Swal.fire('Whoops!', "We were unable to retrieve notes for that task. Please try again. If the problem persists, please contact support.", 'error')
                            }
                        }
                    });

                } else if (data && data.status === 'Inactive') {
                    Swal.fire('Whoops!', "Notes cannot be added for Deleted/Hidden Contact.", 'error')
                } else {
                    Swal.fire('Whoops!', "We were unable to add that note. Please try again. If the problem persists, please contact support.", 'error')
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('submit', '#upd_ivans', function (e) {
    e.preventDefault();
    const url = "test-ivans.php";
    const mbox = $('#ivans-mbox').val();
    const mboxid = $('#ivans-mbox-id').val();
    const mboxpwd = $('#ivans-mbox-pwd').val();
    $.ajax({
        type: "POST",
        url: url,
        timeout: 10000,
        data: "mbox=" + mbox + "&mboxid=" + mboxid + "&mboxpwd=" + mboxpwd,
        beforeSend: function () {
            ShowLoader("Testing your IVANs credentials, please wait.....");
        },
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                const url = "functions/functions.php";
                $.ajax({
                    timeout: 10000, type: "POST", url: url, data: $("#upd_ivans").serialize(), beforeSend: function () {
                        if ($('#new-ivans-entry').length > 0) {
                            ShowLoader("Updating your IVANS Account info, and checking for file(s) please wait.....");
                        } else {
                            ShowLoader("Updating your IVANS Account info please wait.....");
                        }
                    }, success: function (data, result) {
                        HideLoader();
                        if (data && data.status === "Got Data") {
                            if ($('#new-ivans-entry').length > 0 && data.count) {
                                if (data.count > 0) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'IVANS Account Info Updated',
                                        html: `<p>We are currently retrieving the ${data.count} files we found available.</p><p>Please check the <a href="ivans-portal.php" target="_blank">IVANs Portal</a> for additional information.</p>`
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'IVANS Account Info Updated',
                                        html: '<p>There were no files currently available.</p><p>If this is a new mailbox, please make sure you request IVANs downloads from each Carrier you are appointed with.</p>'
                                    });
                                }
                            } else {
                                Swal.fire('Success!', "IVANS Account Info has been updated", 'success')
                            }
                        }
                        if (data && data.status !== "Got Data") {
                            Swal.fire('Whoops!', "We were unable to update your IVANS Account Info. Please try again. If the problem persists, please contact support.", 'error')
                        }
                    }, error: function () {
                        Swal.fire('Whoops!', "We were unable to update your IVANS Account Info. Please try again. If the problem persists, please contact support.", 'error')
                    }
                });
            }
            if (data && data.status !== "Got Data") {
                Swal.fire('Whoops!', "We the info you entered is not allowing access to IVANS. Please confirm you have entered the information correctly.", 'error')
            }
        }
    });


    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#forgotPassword', function (e) {
    Swal.fire({
        title: 'Please Enter Your Email Address', input: 'text', inputAttributes: {
            autocapitalize: 'off'
        }, showCancelButton: true, confirmButtonText: 'Reset', showLoaderOnConfirm: true, preConfirm: (email) => {
            const validCheck = ValidateEmailWithRegex(email);
            if (!validCheck) {
                Swal.showValidationMessage(`Please Enter a Valid Email Address`);
                return false; // Prevent the dialog from being dismissed
            } else {
                return $.ajax({
                    timeout: 10000, url: 'functions/functions.php', type: 'POST', data: {
                        'reset-email': email
                    }, success: function (response) {
                        // Handle response here if necessary
                    }, error: function () {
                        Swal.showValidationMessage(`Error sending email. Please try again.`);
                    }
                });
            }
        }, allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            Swal.fire({
                title: `Please check your email for instructions on resetting your password.`
            });
        }
    });
});

function emailaddress(e, inside = null) {
    if (inside != null || inside != null) {

        $('#viewContactButton').trigger('click');
        $('#editContactButton').trigger('click');
        $('#upd_email').trigger('focus');
    } else {

        localStorage.setItem("swtichtab", "emailaddress");
        const t = (e = $(e)).closest(".card-body");
        n = t.find(".contactInfo").trigger('click');

    }

}

function linkedPhone(e) {
    localStorage.setItem("swtichtab", "phonenumber");
    const t = (e = $(e)).closest("#linkedContactData"), n = t.find(".contactInfo").trigger('click');
}

function linkedemailaddress(e) {
    localStorage.setItem("swtichtab", "emailaddress");
    const t = (e = $(e)).closest("#linkedContactData"), n = t.find(".contactInfo").trigger('click');
}

function addphone(e, inside = null) {
    if (inside != null || inside != null) {
        $('#viewContactButton').trigger('click');
        $('#editContactButton').trigger('click');
        $('#upd_phone').trigger('focus');

    } else {
        localStorage.setItem("swtichtab", "phonenumber");
        const t = (e = $(e)).closest(".card-body"), n = t.find(".contactInfo").trigger('click');
    }

}

function linkedaddaddress(e) {
    localStorage.setItem("swtichtab", "addaddress");
    const t = (e = $(e)).closest("#linkedContactData"), n = t.find(".contactInfo").trigger('click');
}

function addaddress(e, inside = null) {
    if (inside != null || inside != null) {

        $('#viewContactButton').trigger('click');
        $('#editContactButton').trigger('click');
        $('#upd_address').trigger('focus');

    } else {
        localStorage.setItem("swtichtab", "addaddress");
        const t = (e = $(e)).closest(".card-body"), n = t.find(".contactInfo").trigger('click');
    }

}

$(document).on('click', '#renew-policy, #duplicate-policy', function (e) {
    if ($(this).attr('id') === 'renew-policy') {
        $('#dupRenewButton').text('Renew Policy');
        $('#dupRenewButton').val('Renew Policy');
    } else {
        $('#dupRenewButton').text('Duplicate Policy');
        $('#dupRenewButton').val('Duplicate Policy');
    }
});

$('#duplicatePolicyModal').on('shown.bs.modal', function (e) {

    $('#duplicatePolicyModal select').select2({
        dropdownParent: $('#duplicatePolicyModal'), theme: "bootstrap-5", width: '100%'
    });
});

$("#sub_task,#task_info,#task_edit,#quickContactTask,.subQB").click(function () {

    $("#get-chartData").modal('hide');

});


function ReportDuplicate() {

    const form = $("#duplicate_report_form");
    if (form[0].checkValidity() === false) {
    } else {
        $('#generate_duplicate').prop('disabled', true);
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#duplicate_report_form").serialize(),
            beforeSend: function () {

                ShowLoader();
            },
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Success") {
                    displayAlert("Duplicate Report Successfully Created. Refresh a page in moment....", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else {
                    displayAlert("Whoops! There was a problem while creating the duplicate report. Please try again later!", "error");
                    setTimeout(location.reload.bind(location), 3000);

                }
            }
        });
    }
    form.addClass('was-validated');


    return false; // avoid to execute the actual submit of the form.

}


function checkUserPass() {
    //Store the password field objects into variables ...
    const pass1 = document.getElementById('upd_user_pwd');
    const pass2 = document.getElementById('upd_user_pwd_conf');
    //Store the Confimation Message Object ...
    const message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    const goodColor = '#66cc66';
    const badColor = '#ff6666';
    //Compare the values in the password field
    //and the confirmation field
    if (pass1.value === pass2.value) {
        return true;
    } else {
        return false;
    }
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover"
    })
});

$(document).on('select2:open', (e) => {
    const selectId = e.target.id
    $(".select2-search__field[aria-controls='select2-" + selectId + "-results']").each(function (key, value,) {
        value.focus();
    })
});

$(document).on('click', '.maxPanel', function (e) {
    e.preventDefault();
    $(this).parent().closest('div').eq(0).parent().parent().removeClass('col-md-6').addClass('col-md-12');
    $(this).removeClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxPanel').addClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center minPanel');
});

$(document).on('click', '.minPanel', function (e) {
    e.preventDefault();
    $(this).parent().closest('div').eq(0).parent().parent().removeClass('col-md-12').addClass('col-md-6');
    $(this).removeClass('fa-sharp fa-solid fa-down-left-and-up-right-to-center minPanel').addClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxPanel');
});

$(document).on('click', '.maxDashPanel, .minDashPanel', function (e) {
    e.preventDefault();
    const regex = /(col-(?:md|xl|xxl)-)(\d+)/;
    const classes = $(this).parent().closest('div').eq(0).parent().parent().parent().attr('class');
    const match = classes.match(regex);
    if (match) {
        const currentClass = match[0];
        const prefix = match[1];
        const size = parseInt(match[2]);
        console.log(size);
        if (!$(this).data('original-size')) {
            $(this).data('original-size', size);
        }
        const newSize = size === 12 ? $(this).data('original-size') : 12;
        $(this).parent().closest('div').eq(0).parent().parent().parent().removeClass(currentClass).attr('class', prefix + newSize + ' ' + $(this).parent().closest('div').eq(0).parent().parent().parent().attr('class'));
        if (newSize === 12) {
            $(this).removeClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxDashPanel').addClass('fa-solid fa-down-left-and-up-right-to-center minDashPanel');
        } else {
            $(this).removeClass('fa-solid fa-down-left-and-up-right-to-center minDashPanel').addClass('fa-sharp fa-solid fa-up-right-and-down-left-from-center maxDashPanel');
        }
    }
});

$(document).on('click', '.maxPipelineCard, .minPipelineCard', function (e) {
    e.preventDefault();

    const $this = $(this); // The clicked <a> tag
    const $icon = $this.find('i'); // The <i> inside the clicked <a> tag
    const $stageGrid = $this.closest('.stage-grid'); // The closest .stage-grid (card) to the clicked button
    const $listGroup = $stageGrid.find('.list-group'); // The .list-group within the same .stage-grid

    if ($this.hasClass('maxPipelineCard')) {
        // If the clicked button has .maxPipelineCard class:
        $listGroup.stop(true, true).slideDown(300); // Slowly slide down the closest .list-group (300ms duration)
        $icon.removeClass('fa-up-right-and-down-left-from-center') // Remove old icon class
            .addClass('fa-down-left-and-up-right-to-center'); // Add new icon class
        $this.removeClass('maxPipelineCard') // Remove .maxPipelineCard class
            .addClass('minPipelineCard'); // Add .minPipelineCard class
    } else if ($this.hasClass('minPipelineCard')) {
        // If the clicked button has .minPipelineCard class:
        $listGroup.stop(true, true).slideUp(300); // Slowly slide up the closest .list-group (300ms duration)
        $icon.removeClass('fa-down-left-and-up-right-to-center') // Remove the swapped icon class
            .addClass('fa-up-right-and-down-left-from-center'); // Revert to original icon class
        $this.removeClass('minPipelineCard') // Remove .minPipelineCard class
            .addClass('maxPipelineCard'); // Add .maxPipelineCard class
    }
});


$(document).on('input', "input[type='email']", function (e) {
    $(this).attr('maxlength', '64');
});
$(document).on('input', "input[type='password']", function (e) {
    $(this).attr('maxlength', '45');
});

function checkInput() {
    const value = document.getElementById("addTaskNotes").value.trim();
    const input = document.querySelector("#addTaskNotes");
    if (value === '') {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }
}

$('#modal_duplicate_rule,#modal_duplicate_report').on('hidden.bs.modal', function (e) {
    $(this)
        .find("input,textarea,select")
        .val('')
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
})

$(document).on('click', '.addQuickTask', function (e) {
    e.preventDefault();

    const taskContact = GetURLParameter('Contact');
    if (!taskContact) {
        displayAlert("There was a problem, please refresh and try again.");
        return false;
    }
    ShowLoader();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'newTaskContactId=' + taskContact,
        dataType: "json",
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                launchCenteredModal(data.taskForm, "Add New Task", "modal-xl");
                $('#new_task_form select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModal")
                });
            } else {
                displayAlert("There was a problem, please refresh and try again.");
                return false;
            }
        },
        error: function () {
            displayAlert("There was a problem, please refresh and try again.");
            return false;
        }
    });
});


$('body').on('click', '[data-bs-toggle="tooltip"]', function () {
    $(this).tooltip('hide');
});

$("#qtpanel").on('hidden.bs.offcanvas', function () {


    $('select').select2({
        theme: "bootstrap-5", width: '100%',

    });

    flatpickr(".flatpickr-input", {});
});

$(document).on('click', '.updateStage', function (e) {
    e.preventDefault();

    const form = $("#add_stage_ele");
    if (form[0].checkValidity() === false) {
        form.addClass("was-validated");
    } else {
        ShowLoader();

        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#add_stage_ele").serialize() + '&updateStageInfo=true',
            dataType: "json",

            success: function (data, result) {
                HideLoader();
                if (data && data.status === "success") {
                    displayAlert("Stage element added successfully", "success");
                    setTimeout(location.reload.bind(location), 500);
                } else {
                    displayAlert("Not able to create stage element", "error");
                }
            }
        });
    }
});
$(document).on('click', '#add_new_pipeline', function (event) {
    const module_id = $("#moduleSel").children(":selected").attr("data-id");
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: 'functions/functions.php',
        data: "moduleId=" + module_id + "&create_pipeline=true",
        dataType: "json",
        success: function (data, result) {
            HideLoader();
            launchOffCanvasPanel(data.data, 'Add New Pipeline');
            $("select").select2({
                tags: true
            });
        }
    })
});

$(document).on('click', '.addNewStage', function () {
    $('.stagesPipeline').append("<input type='text' class='form-control' name='stagesPipeline[]'  placeholder='stage name' maxlength='125' />");
});

$(document).on('click', '.add_new_stage', function (event) {
    event.preventDefault();
    val = $("#pipelineSel").val();
    const module_id = $("#moduleSel").children(":selected").attr("data-id");
    const data = '<form class="col-12" id="add_stage_form" action="functions/functions.php" method="post" enctype="multipart/form-data"   role="form" novalidate><div class="row"><input type="hidden" name="pipeline_name_stage" value="' + val + '"><input type="hidden" name="pipeline_name_module" value="' + module_id + '"><div class="col-md-7 m-auto my-3"><input type="text" maxlength="25" name="stage_name_add" class="form-control stage_name_add" placeholder="Add Stage Name" required > <div class="invalid-feedback">Stage name is required, and must be valid.</div><div class="valid-feedback">Looks good!</div></div><div class="col-12 py-3 text-center"><button id="add_new_stage_confirm" type="submit" class="btn btn-success add_new_stage_confirm">Add Stage</button></div></div></form>';
    const add_new_stage_modal = $('#add_new_stage_modal');
    add_new_stage_modal.find('.modal-body').html(data);
    add_new_stage_modal.find('.modal-header>h5').text('Add New Stage to this pipeline');
    add_new_stage_modal.modal('show');
    $('input[required]').attr('pattern', '[ ]*[A-Za-z0-9_\\-]+[A-Za-z0-9 _\\-]*');
});
$(document).on('submit', '#add_stage_form', function (e) {
    const form = $("#add_stage_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")

    } else {
        e.preventDefault();

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: 'functions/functions.php', //  data: 'pipeline=' + val + '&newStageName=' + result.value,
            data: $("#add_stage_form").serialize() + '&newStageName=true',
            beforeSend: function () {
                ShowLoader();
            },
            success: function (response, result) {
                HideLoader();
                if (response.status === 'success') {
                    displayAlert("New Stage added successfully. Refreshing Page in a moment", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (response.status === 'already') {
                    displayAlert("Stage name already exists in this pipeline", "error");
                    setTimeout(location.reload.bind(location), 3000);
                } else {
                    displayAlert("Please try again. Refreshing Page in a moment", "error");
                    setTimeout(location.reload.bind(location), 3000);
                }
            }
        })
    }
    form.addClass('was-validated');
    return false;
})


$(document).on('submit', '#new_pipeline_form', function (e) {
    const form = $("#new_pipeline_form");
    const pipeline_name = $('#pipeline_name').val();
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#new_pipeline_form").serialize() + '&updatePipeline=true',
            beforeSend: function () {
                ShowLoader();
            },
            dataType: "json",
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "success") {
                    setCookie("pipeline_selected", pipeline_name, 1);
                    displayAlert("Pipeline created successfully", "success");
                    setTimeout(location.reload.bind(location), 3000);
                } else if (data && data.status === "already") {
                    displayAlert("Pipeline already exist", "error");
                }
            },
            error: function (jqXHR, exception) {
                HideLoader();
                let msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status === 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status === 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
            },
        });
    }
    form.addClass('was-validated');
    return false;
});

$(document).on('change', '#pipelineSel', function () {
    let curPipeline = getCookie('pipeline_selected');
    curPipeline = decodeURIComponent(curPipeline);
    const pipeline_name = $(this).val();
    if (curPipeline !== pipeline_name) {
        getDataPipeline(pipeline_name);
        $('#defaultPipeLineViewDIV').show();
    } else {
        $('#defaultPipeLineViewDIV').hide();
    }
});


$(document).on('click', '.removeFromPipeline ', function () {
    const clickedElement = $(this);
    const id = clickedElement.data('userid');
    const parent = clickedElement.parents('.ui-sortable-handle');
    const wrapper = parent.parent();
    const parent_script = parent.next();
    const module = clickedElement.data('module');
    const guid = clickedElement.siblings().eq(0).data('value');
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will remove this contact from this Pipeline completely.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Remove It!',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            $.ajax({
                timeout: 10000,
                url: "functions/functions.php",
                type: "POST",
                dataType: "json",
                data: {removeFromPipeline: true, guid: guid, module: module, id: id},
                success: function (data) {
                    const {status} = data;

                    if (status === 'Updated') {
                        parent.remove();
                        parent_script.remove();

                        if (wrapper.children().length < 1) {
                            wrapper.html('<span class="emptyDiv" draggable="false">This stage is empty</span>');
                        }
                    }
                },
                beforeSend: function () {
                    ShowLoader();
                },
                complete: function () {
                    HideLoader();
                }
            });
        }
    });
});


$(document).on('click', '.moveRight', function () {
    const id = $(this).closest('.stage-grid').parent().attr('id');
    const moduleId = $("#moduleSel").children(":selected").attr("data-id");
    const moduleName = $("#moduleSel").val();
    const appendId = parseInt(id) + 1;
    if ($('#' + appendId).length) {
        $(this).closest('.stage-grid').appendTo("#" + appendId);
        const progress = $('#' + appendId).attr("data-progress");
        const stage = $('#' + appendId).attr("data-stage");
        const userId = $(this).closest('.stage-grid').attr('id');
        $("#" + appendId).find('.emptyDiv').empty();
        $("#" + userId).find('.timeLane').html('<div id="timeSpent"></div><div id="currentTime" style="display:none"></div>');
        const getTimeInterval = getCookie(userId);
        if (getTimeInterval) {
            clearInterval(getTimeInterval);
            deleteCookie(getTimeInterval);
        }
        clockUpdate(userId, '');
        const pipeline_timelane = $("#" + userId).find('.pipeline_time').find('#currentElapsedTime').text();
        if (pipeline_time_interval) {
            clearInterval(pipeline_time_interval);
        }
        $("#" + userId).find('.pipeline_time').html('<div id="timeElapsed"></div><div id="currentElapsedTime" style="display: none;"></div>');
        PipelineClock(userId, pipeline_timelane);
        $("#" + userId).find('.progress-bar').css("width", +progress + "%");
        $("#" + userId).find('.progressRate').text(progress + "%");
        $(".connected-sortable").each(function () {
            if ($(this).find('.stage-grid').length === 0) {
                if ($(this).find('.emptyDiv').length === 0) {
                    $(this).append('<span  class="emptyDiv">This stage is empty</span>')
                } else {
                    $(this).find('.emptyDiv').html("This stage is empty")
                }
            }
        })
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: 'functions/functions.php',
            data: 'updatePipeStage=' + userId + '&newStage=' + stage + '&moduleId=' + moduleId + '&moduleName=' + moduleName,
            dataType: "json",
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "success") {
                } else {
                }
            }
        });
    }
});

$(document).on('click', '.moveLeft', function () {
    const id = $(this).closest('.stage-grid').parent().attr('id');
    const moduleId = $("#moduleSel").children(":selected").attr("data-id");
    const moduleName = $("#moduleSel").val();
    const appendId = parseInt(id) - 1;
    if ($('#' + appendId).length) {
        $("#" + appendId).find('.emptyDiv').empty();
        $(this).closest('.stage-grid').appendTo("#" + appendId);
        const progress = $('#' + appendId).attr("data-progress");
        const stage = $('#' + appendId).attr("data-stage");
        const userId = $(this).closest('.stage-grid').attr('id');
        $("#" + userId).find('.timeLane').html('<div id="timeSpent"></div><div id="currentTime" style="display:none"></div>');

        const getTimeInterval = getCookie(userId);
        if (getTimeInterval) {
            clearInterval(getTimeInterval);
            deleteCookie(getTimeInterval);
        }

        const pipeline_timelane = $("#" + userId).find('.pipeline_time').find('#currentElapsedTime').text();
        if (pipeline_time_interval) {
            clearInterval(pipeline_time_interval);
        }
        $("#" + userId).find('.pipeline_time').html('<div id="timeElapsed"></div><div id="currentElapsedTime" style="display: none;"></div>');
        PipelineClock(userId, pipeline_timelane);
        clockUpdate(userId, '');

        $("#" + userId).find('.progress-bar').css("width", +progress + "%");
        $("#" + userId).find('.progressRate').text(progress + "%");
        $(".connected-sortable").each(function () {
            if ($(this).find('.stage-grid').length === 0) {
                if ($(this).find('.emptyDiv').length === 0) {
                    $(this).append('<span  class="emptyDiv">This stage is empty</span>')
                } else {
                    $(this).find('.emptyDiv').html("This stage is empty")
                }
            }
        })
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: 'functions/functions.php',
            data: 'updatePipeStage=' + userId + '&newStage=' + stage + '&moduleId=' + moduleId + '&moduleName=' + moduleName,
            dataType: "json",
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "success") {
                } else {
                }
            }
        });
    }
});

$(document).on('change', '.pipelineSelCon', function (event) {
    event.preventDefault();
    const pipelineName = $(this).val();
    const moduleId = $(this).attr('data-moduleId');
    $('.stageSel').prop('disabled', true);
    if (pipelineName === "") {
        const pleaseSelOptOnly = "<option val='' selected='selected'> Please Select </option>";
        $('.stageSel').empty().append(pleaseSelOptOnly);
    } else {
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: 'functions/functions.php',
            data: 'getStagesData=' + pipelineName + '&moduleId=' + moduleId,
            dataType: "json",
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    $('.stageSel').empty().append(`<option value="">Please Select</option>` + data.data);
                    $('.stageSel').prop('disabled', false);
                } else {
                }
            }
        });
    }
})


$(document).on('click', '.removeStage', function (event) {
    event.preventDefault();
    stage = $(this).attr('data-stageremove');
    pipeline = $(this).attr('data-pipeline');
    const modId = $("#moduleSel").children(":selected").attr("data-id");
    const modName = $("#moduleSel").val();
    $.ajax({
        timeout: 10000,
        url: "functions/functions.php",
        type: "POST",
        dataType: "json",
        data: 'remove-stage=' + stage + '&pipeline=' + pipeline + '&remove-stage-mod=' + modId + '&remove-stage-modName=' + modName,
        beforeSend: function () {
            ShowLoader();
        },
        success: function (data) {
            HideLoader();
            const del_stage_modal = $('#del_stage_modal');
            del_stage_modal.find('.modal-body').html(data.data);
            del_stage_modal.find('.modal-header>h5').text('Remove Stage from Pipeline');
            del_stage_modal.modal('show');
            $('.form-select').select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $('#del_stage_modal')
            });
        }
    });
});
$(document).on('click', '#setAsDefaultPipelineView', function () {
    const defaultModule = $('#moduleSel option:selected').val();
    const defaultModuleText = $('#moduleSel option:selected').text();
    const defaultPipeline = $('#pipelineSel option:selected').val();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'updateDefaultPipeline=' + defaultPipeline + '&defaultPipelineModule=' + defaultModule,
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                setCookie('pipeline_module', defaultModuleText, 1);
                setCookie('pipeline_selected', defaultPipeline, 1);
                $('#setAsDefaultPipelineView').hide();
            }
        }
    });
});

$(document).on('click', '#delStage', function (e) {
    e.preventDefault();

    const form = $("#del_stage_form");
    if (form[0].checkValidity() === false) {
        form.addClass("was-validated");
    } else {
        ShowLoader();

        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#del_stage_form").serialize() + '&delete-stage=true',
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "removed") {
                    displayAlert("Stage removed successfully ", "success");
                    setTimeout(location.reload.bind(location), 500);
                }
            }
        });
    }
});

$(document).on('click', '#customFieldsForCard', function (e) {
    ShowLoader();
    e.preventDefault();
    val = $("#pipelineSel").val();
    if (val === 'Select Pipeline' || val === '') {
        val = 'Lead';
    }
    const modId = $("#moduleSel").children(":selected").attr("data-id");
    const modName = $("#moduleSel").val();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'showAgencyColumns=' + val + '&showModColumns=' + modName + '&showModColumnsId=' + modId,
        success: function (data, result) {
            HideLoader();
            launchOffCanvasPanel(data.data, 'Displayed Fields')
        }
    });
});
$(document).on('click', '#saveCardFields', function (e) {
    ShowLoader();
    e.preventDefault();
    val = $("#pipelineSel").val();
    if (val === 'Select Pipeline' || val === '') {
        val = 'Lead';
    }
    const modId = $("#moduleSel").children(":selected").attr("data-id");
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: $("#cards_fields").serialize() + '&saveCustomCardFields=' + val + '&modId=' + modId,
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "save") {
                displayAlert("Fields Updated Successfully ", "success");
                setTimeout(location.reload.bind(location), 500);
            }
        }
    });
});
$(document).on('click', '.fieldsCheck', function (e) {
    const totalChecked = $(".fieldsCheck:checked").length;
    if (totalChecked > 6) {
        $(this).prop('checked', false);
        displayAlert("You cannot select more than 6 fields", "error");
    }
});


$(document).on("change", "#mapping_for", function () {
    $('#form_div').html("");
    $('#acord_form_lob').find('option').not(':first').remove();
    $('#acord_policy_div').hide();

    if ($(this).val() !== '') {
        if ($(this).val() === 'CD') {
            showPolicies();
            $('.generateAcordFORM').show();
        } else if ($(this).val() === 'QR') {
            AcordFormMapping();
        }
    }
});


$(document).on('change', '#acord_form_lob', function () {
    $(this).select2('close');
    $('#acordInfo').trigger('focus');
    //AcordFormMapping();
});

$(document).on('click', '.generateAcordFORM', function () {
    AcordFormMapping();
});


function showPolicies() {
    const contact = GetURLParameter('Contact');
    const line_of_business = $('#acord_form_selection option:selected').attr('data-lob');

    $('#acord_form_lob').find('option').remove();
    $('#acord_policy_div').hide();
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        data: 'contact=' + contact + '&lob=' + line_of_business + '&action=getpolicylist',
        type: 'POST',
        async: false,
        beforeSend: function () {
            ShowLoader();
        },
        dataType: "json",
        success: function (data) {
            if (data !== false) {
                $('#acord_form_lob').select2('destroy');
                const attr = $('#acord_form_lob').attr('multiple');

                // Check if the 'multiple' attribute is not present or is set to false.
                if (typeof attr === 'undefined' || attr === false) {
                    $('#acord_form_lob').attr('multiple', 'multiple');
                    $('#acord_form_lob').attr('name', 'acord_form_lob[]');
                }
                $.each(data, function (index, val) {
                    $('#acord_form_lob').append('<option value="' + val.PolicyId + '">' + val.policy_number + '</option>');
                });

                $('#acord_form_lob').show();
                $('#acord_policy_div').show();
                $('#acord_form_lob').select2({
                    theme: "bootstrap-5", width: '100%'
                });
                $('.generateAcordFORM').show();
            } else {
                displayAlert("No policy exists for the selected line of business, but you can still generate without one.", "message");
                $('.generateAcordFORM').show();
            }
        },
        complete: function (response) {
            HideLoader();
        },
        error: function (jqXhr, textStatus, errorMessage) {
        }
    });
}

function AcordFormMapping() {
    if ($('#mapping_for').val() === '') {

    } else {
        const url = "functions/functions.php";
        const val = $('#acord_form_selection').val();
        const fname = $('#acord_form_selection').html();

        const mappingFor = $('#mapping_for').val();

        if (mappingFor === 'CD') {
            var contact = GetURLParameter('Contact');
            policy_id = $('#acord_form_lob').val();
        } else {
            var contact = $('#upd_contact_id').val();
            var policy_id = null;
        }

        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'form_mapping=' + val + '&form_contact=' + contact + '&mapping_for=' + mappingFor + '+&policy=' + policy_id,
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    $('#form_div').html(data.data);
                } else {
                    data = JSON.parse(data); //error message
                    displayAlert(data.message, "error");
                }
            }
        });
    }
    return false; // avoid to execute the actual submit of the form.
}

$(document).on('click', '#delPipeline', function (event) {
    event.preventDefault();
    val = $("#pipelineSel").val();
    const modId = $("#moduleSel").children(":selected").attr("data-id");
    const modName = $("#moduleSel").val();
    if (val === "Standard Pipeline") {
        displayAlert("Not allowed to delete the Standard Pipeline", "error");

    } else {
        $.ajax({
            timeout: 10000,
            url: "functions/functions.php",
            type: "POST",
            dataType: "json",
            data: 'remove-pipeline=' + val + '&modID=' + modId + '&modName=' + modName,
            beforeSend: function () {
                ShowLoader();
            },
            success: function (data) {
                HideLoader();
                const del_pipeline_modal = $('#del_pipeline_modal');
                del_pipeline_modal.find('.modal-body').html(data.data);
                del_pipeline_modal.find('.modal-header>h5').text('Remove Pipeline');
                del_pipeline_modal.modal('show');
                $('.form-select').select2({
                    theme: "bootstrap-5", width: '100%'
                });
            }
        });
    }
});
$(document).on('click', '.delPipeline', function (e) {
    e.preventDefault();
    const form = $("#del_pipeline_form");
    if (form[0].checkValidity() === false) {
        form.addClass("was-validated");
    } else {
        ShowLoader();
        const url = "functions/functions.php";
        const pipeline_name = $('.newpipelineName').val();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#del_pipeline_form").serialize() + '&delete-pipeline=true',
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "removed") {
                    setCookie("pipeline_selected", pipeline_name, 1);
                    displayAlert("Pipeline removed successfully ", "success");
                    setTimeout(location.reload.bind(location), 500);
                }
            }
        });
    }
});
$("#moduleSel").change(function () {
    const module_id = $(this).children(":selected").attr("data-id");
    const module_name = $(this).children(":selected").text();
    const url = "functions/functions.php";
    const curModule = getCookie("pipeline_module");
    if (module_id !== curModule) {
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: 'module_idModuleSel=' + module_id,
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    $('#pipelineSel').empty().append(data.data);
                    getDataPipeline();
                    createmenuPipeline();

                }
            }
        });
    }
});

$(document).on('click', '.mmsLink', function (e) {
    e.preventDefault();
    const mid = $(this).attr('data-value');
    ShowLoader();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'getTwilioMedia=true&' + 'MessageId=' + mid,
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                window.open(data.mediaUrl, '_blank');
            } else if (data && data.status === "Failed") {
                displayAlert("We were unable to retrieve that media. Please try again, or contact Support if this persists.", "error");
            } else {
                displayAlert("We were unable to retrieve that media. Please try again, or contact Support if this persists.", "error");
            }
        }
    });
});


$(document).on('click', '.viewEmailInNewWindow', function (e) {
    e.preventDefault();
    const mid = $(this).attr('data-value');
    ShowLoader();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: 'getEmailContent=true&' + 'EmailMessageId=' + mid,
        success: function (data, result) {
            HideLoader();
            if (data && data.status === "Got Data") {
                window.open(data.data, '_blank');
            } else if (data && data.status === "Failed") {
                displayAlert("We were unable to retrieve that email. Please try again, or contact Support if this persists.", "error");
            } else {
                displayAlert("We were unable to retrieve that email. Please try again, or contact Support if this persists.", "error");
            }
        }
    });
});

$(document).on('click', '#edit-stage-name', function (event) {
    event.preventDefault();
    val = $("#pipelineSel").val();
    const module_id = $("#moduleSel").children(":selected").attr("data-id");
    const stageToBeEdit = $(this).attr("data-name");
    const modName = $("#moduleSel").val();
    const data = '<form class="col-12" id="edit-stage-name_form" action="functions/functions.php" method="post" enctype="multipart/form-data"   role="form" novalidate><div class="row"><input type="hidden" name="pipeline_name_stage" value="' + val + '"><input type="hidden" name="pipeline_name_module_id" value="' + module_id + '"><input type="hidden" name="pipeline_name_module" value="' + modName + '"><input type="hidden" name="old_stage_name" value="' + stageToBeEdit + '"><div class="col-md-7 m-auto my-3"><input type="text" maxlength="25" name="stage_name_edit" id="stage_name_edit" class="form-control stage_name_edit" placeholder="New Stage Name" value="' + stageToBeEdit + '" required> <div class="invalid-feedback">Stage name is required, and must be valid.</div><div class="valid-feedback">Looks good!</div></div><div class="col-12 py-3 text-center"><button id="edit_stage_confirm" type="submit" class="btn btn-success edit_stage_confirm">Update Stage Name</button></div></div></form>';
    const edit_stage_modal = $('#edit-stage-name-modal');
    edit_stage_modal.find('.modal-header>h5').text('Edit Stage Name');
    edit_stage_modal.find('.modal-body').html(data);
    edit_stage_modal.modal('show');
    $('input[required]').attr('pattern', '.*\\S+.*');
    //     }	
    // });	
});
$(document).on('click', '#editPipelineName', function (event) {
    event.preventDefault();
    val = $("#pipelineSel").val();
    const module_id = $("#moduleSel").children(":selected").attr("data-id");
    if (val === "Standard Pipeline") {
        displayAlert("Not allowed to edit the name of the Standard Pipeline", "error");
    } else {
        // var stageToBeEdit = $(this).attr("data-name");	
        const modName = $("#moduleSel").val();
        const data = '<form class="col-12" id="edit-pipeline-name_form" action="functions/functions.php" method="post" enctype="multipart/form-data"   role="form" novalidate><div class="row"><input type="hidden" name="pipeline_name_stage" value="' + val + '"><input type="hidden" name="pipeline_name_module_id" value="' + module_id + '"><input type="hidden" name="pipeline_name_module" value="' + modName + '"><div class="col-md-7 m-auto my-3"><input type="text" maxlength="25" name="pipeline_name_edit" id="pipeline_name_edit" class="form-control pipeline_name_edit" placeholder="New pipeline Name" value="' + val + '" required > <div class="invalid-feedback">Pipeline name is required</div><div class="valid-feedback">Looks good!</div></div><div class="col-12 py-3 text-center"><button id="edit_pipeline_confirm" type="submit" class="btn btn-success edit_pipeline_confirm">Update Pipeline Name</button></div></div></form>';
        const edit_stage_modal = $('#edit-stage-name-modal');
        edit_stage_modal.find('.modal-header>h5').text('Edit pipeline Name');
        edit_stage_modal.find('.modal-body').html(data);
        edit_stage_modal.modal('show');
        $('input[required]').attr('pattern', '.*\\S+.*');
    }
    //     }	
    // });	
});


$(document).on('click', '#edit_stage_confirm', function (e) {
    e.preventDefault();
    const form = $("#edit-stage-name_form");
    if (form[0].checkValidity() === false) {
        form.addClass("was-validated");
    } else {
        ShowLoader();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#edit-stage-name_form").serialize() + '&edit-name-stage=true',
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "updated") {
                    displayAlert("Stage name updated successfully ", "success");
                    setTimeout(location.reload.bind(location), 500);
                } else if (data && data.status === "already") {
                    displayAlert("Stage name already exist  ", "error");
                    // /setTimeout(location.reload.bind(location), 500);	
                } else {
                    displayAlert("Error while updating Stage name ", "error");
                    setTimeout(location.reload.bind(location), 500);
                }
            }
        });
    }
});
$(document).on('click', '#edit_pipeline_confirm', function (e) {
    e.preventDefault();
    const form = $("#edit-pipeline-name_form");
    const pipeline_name = $('#pipeline_name_edit').val();
    if (form[0].checkValidity() === false) {
        form.addClass("was-validated");
    } else {
        ShowLoader();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#edit-pipeline-name_form").serialize() + '&edit-name-pipeline=true',
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "updated") {
                    setCookie("pipeline_selected", pipeline_name, 1);
                    displayAlert("Pipeline name updated successfully ", "success");
                    setTimeout(location.reload.bind(location), 500);
                } else if (data && data.status === "already") {
                    displayAlert("Pipeline already exist  ", "error");
                } else {
                    displayAlert("Error while updating Pipeline name ", "error");
                    setTimeout(location.reload.bind(location), 500);
                }
            }
        });
    }
});

function checkPhoneInt() {
    const url = "functions/phone_functions.php"; //the script where you handle the form input.
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: 'check-for-phone=true', //serializes the form's elements.
        success: function (data, result) {
            if (data && data.status === "Opted out" || data.status === 'No Integration' || data.status === 'Authorized') {
                if (data && data.status === 'Authorized') {
                    const intFile = data.intFile;
                    const vendorId = data.vendor_id;
                    const auth = data.auth;
                    const config = data.config;
                    const phoneId = data.phoneId;
                    const phoneOrg = data.phoneId;
                    let calls = new Array();
                    var url = "functions/integrations/" + data.intFile;
                    $.ajax({
                        type: "POST", url: url, data: 'startSession=' + config, //serializes the form's elements.
                        success: function (data, result) {
                            HideLoader();
                            if (data && data.status === "Got Data") {
                                if (data.wss !== '') {
                                    if (typeof websocket !== 'undefined' && typeof websocket !== undefined) {
                                        if (websocket.readyState !== WebSocket.CLOSED) {
                                            websocket.onmessage = function (event) {
                                                const Data = JSON.parse(event.data);
                                                processMessage(Data);
                                            };

                                            websocket.onerror = function (event) {

                                            };
                                            websocket.onclose = function (event) {

                                            };
                                        } else {
                                            var websocket = new WebSocket(data.wss);
                                            websocket.onopen = function (event) {
                                                const url = "functions/integrations/" + intFile;
                                                $.ajax({
                                                    type: "POST",
                                                    url: url,
                                                    data: 'startSubscription=' + data.subscription + '&phoneId=' + phoneId + '&orgId=' + phoneOrg + '&configId=' + config + '&websocket=Defined', //serializes the form's elements.
                                                    success: function (data, result) {
                                                        if (data && data.status === "Subscribed") {

                                                        } else {
                                                        }
                                                    }
                                                });
                                            }
                                            websocket.onmessage = function (event) {
                                                const Data = JSON.parse(event.data);
                                                processMessage(Data);
                                            };

                                            websocket.onerror = function (event) {

                                            };
                                            websocket.onclose = function (event) {

                                            };
                                        }
                                    } else {
                                        var websocket = new WebSocket(data.wss);
                                        websocket.onopen = function (event) {
                                            const url = "functions/integrations/" + intFile;
                                            $.ajax({
                                                timeout: 10000,
                                                type: "POST",
                                                url: url,
                                                data: 'startSubscription=' + data.subscription + '&phoneId=' + phoneId + '&orgId=' + phoneOrg + '&configId=' + config + '&websocket=Undefined', //serializes the form's elements.
                                                success: function (data, result) {
                                                    if (data && data.status === "Subscribed") {

                                                    } else {
                                                    }
                                                }
                                            });
                                        }
                                        websocket.onmessage = function (event) {
                                            const Data = JSON.parse(event.data);
                                            processMessage(Data);
                                        };

                                        websocket.onerror = function (event) {

                                        };
                                        websocket.onclose = function (event) {

                                        };
                                    }
                                }

                                function processMessage(Data) {
                                    if (Data.type !== 'keepalive') {
                                        if (Data.type === 'announce') {
                                            //LETS CHECK FOR THE SECOND ANNOUNCEMENT
                                            if (sessionStorage.getItem("entityId") === null) {
                                                sessionStorage.setItem("entityId", "");
                                            } else {
                                                sessionStorage.setItem("entityId", Data.entityId);
                                            }
                                        }
                                        if (Data.data.caller.number.length >= 10) {
                                            if (Data.type === 'replace' && sessionStorage.getItem("entityId") === Data.newId) {
                                                if (Data.data.state === 'RINGING') {
                                                    displayAlert("Incoming call from - " + Data.data.caller.name + ' (' + Data.data.caller.number + ')', "message");
                                                    sessionStorage.setItem("callState", "RINGING");
                                                    const url = 'functions/phone_functions.php';
                                                    $.ajax({
                                                        timeout: 10000,
                                                        type: "POST",
                                                        url: url,
                                                        data: 'getCallerMatches=true' + '&callerNumber=' + Data.data.caller.number + '&callerName=' + Data.data.caller.name,
                                                        success: function (data, result) {
                                                            HideLoader();
                                                            if (data && data.status === "Matches") {
                                                                const matches = JSON.stringify(data.matches);
                                                                sessionStorage.setItem("potentialMatches", matches);
                                                            } else if (data && data.status === "No Matches") {
                                                                sessionStorage.setItem("potentialMatches", "None");
                                                            } else {

                                                            }
                                                        }
                                                    });
                                                    logCall(Data.data.originatorId, Data.data.caller.name, Data.data.caller.number, Data.data.callee.name, Data.data.callee.number, 'INCOMING');
                                                }
                                                if (Data.data.state === 'ANSWERED') {
                                                    sessionStorage.setItem("callState", "ANSWERED");
                                                    if (sessionStorage.getItem("potentialMatches") === null) {

                                                    } else if (sessionStorage.getItem("potentialMatches") === "None") {

                                                    }
                                                    if (sessionStorage.getItem("potentialMatches") === "") {

                                                    } else {
                                                        var matches = JSON.parse(sessionStorage.getItem("potentialMatches"));
                                                        $('#offcanvasBottomLabel').html('Potential Caller Matches');
                                                        $('#toggleBottomOffCanvas').trigger('click');
                                                        $('#offcanvasBottomBody').html("<div id='potentialCallerTable'></div>");
                                                        const {
                                                            Grid, html, h
                                                        } = gridjs;
                                                        new Grid({
                                                            pagination: true,
                                                            search: true,
                                                            resizable: true,
                                                            sort: true,
                                                            fixedHeader: true,
                                                            columns: [{
                                                                name: 'ContactId', hidden: true
                                                            }, {
                                                                name: 'Name',
                                                                formatter: (_, row) => html(`<a href="#" class="contactInfo potentialCallerMatch" data-value="${row.cells[0].data}" data-call-id="${Data.data.originatorId}" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="${row.cells[1].data}">${row.cells[1].data}</a>`)
                                                            }, {
                                                                name: 'Business Name',
                                                                formatter: (_, row) => html(`<a href="#" class="contactInfo potentialCallerMatch" data-value="${row.cells[0].data}" data-call-id="${Data.data.originatorId}" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="${row.cells[2].data}">${row.cells[2].data}</a>`)
                                                            }, {
                                                                name: 'Address'
                                                            }, {
                                                                name: 'Active Policies'
                                                            }, {
                                                                name: 'Inactive Policies'
                                                            }],
                                                            data: matches
                                                        }).render(document.getElementById("potentialCallerTable"));
                                                    }
                                                }
                                                if (Data.data.state === 'BRIDGED' && sessionStorage.getItem("callState") === 'ANSWERED') {
                                                    displayAlert("Answered call from - " + Data.data.caller.name + ' (' + Data.data.caller.number + ')', "message");
                                                    logCall(Data.data.originatorId, Data.data.caller.name, Data.data.caller.number, Data.data.callee.name, Data.data.callee.number, 'ANSWERED');
                                                }
                                            }
                                            if (Data.type === 'withdraw' && sessionStorage.getItem("entityId") === Data.entityId && (sessionStorage.getItem("callState") === null || sessionStorage.getItem("callState") !== 'ANSWERED')) {
                                                if (Data.data.state === 'HUNGUP') {
                                                    displayAlert("Missed call from - " + Data.data.caller.name + ' (' + Data.data.caller.number + ')', "message");
                                                    logCall(Data.data.originatorId, Data.data.caller.name, Data.data.caller.number, Data.data.callee.name, Data.data.callee.number, 'MISSED');
                                                    sessionStorage.removeItem("entityId");
                                                    if (sessionStorage.getItem("callState") === null) {
                                                    } else {
                                                        sessionStorage.removeItem("callState");
                                                    }
                                                    if (sessionStorage.getItem("potentialMatches") === null) {
                                                    } else {
                                                        sessionStorage.removeItem("potentialMatches");
                                                    }
                                                }
                                            }
                                            if (Data.type === 'withdraw' && sessionStorage.getItem("entityId") === Data.entityId && (sessionStorage.getItem("callState") !== null && sessionStorage.getItem("callState") === 'ANSWERED')) {
                                                if (Data.data.state === 'HUNGUP') {
                                                    displayAlert("Call ended with - " + Data.data.caller.name + ' (' + Data.data.caller.number + ')', "message");
                                                    logCall(Data.data.originatorId, Data.data.caller.name, Data.data.caller.number, Data.data.callee.name, Data.data.callee.number, 'ENDED');
                                                    sessionStorage.removeItem("entityId");
                                                    if (sessionStorage.getItem("callState") === null) {
                                                    } else {
                                                        sessionStorage.removeItem("callState");
                                                    }
                                                    if (sessionStorage.getItem("potentialMatches") === null) {
                                                    } else {
                                                        sessionStorage.removeItem("potentialMatches");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (data && data.status === "Failed") {
                            } else {
                            }
                        }
                    });
                }
            } else if (data && data.status === "No User Config" || data.status === 'Not Authorized') {
                const intFile = data.intFile;
                const vendorId = data.vendor_id;
                const auth = data.auth;
                const config = data.config;
                Swal.fire({
                    title: 'Phone Integration Detected',
                    text: 'Would you like to add your phone?',
                    input: 'checkbox',
                    inputPlaceholder: 'Do not ask again',
                    showDenyButton: true,
                    denyButtonText: 'No',
                    confirmButtonText: 'Yes!',
                    returnInputValueOnDeny: true,
                }).then(function (result) {
                    if (result.isConfirmed) {
                        if (result.value === 1) {
                            Swal.fire({
                                icon: 'error',
                                text: 'You said yes but checked do not ask again, either click Yes or check the box and click No'
                            });
                        } else if (result.value === 0) {
                            const url = "functions/integrations/" + data.intFile;
                            $.ajax({
                                timeout: 10000,
                                type: "POST",
                                url: url,
                                data: 'vendor=' + vendorId + '&auth=' + auth,
                                success: function (data, result) {
                                    HideLoader();
                                    if (data && data.status === "Got Data") {
                                        Swal.fire({
                                            icon: 'info',
                                            text: 'Please wait, in a few moments you will be redirected to your phone vendor to grant permission. Once done, you will be re-directed here.'
                                        });
                                        setTimeout(window.location = data.authUrl, 7000);
                                    } else if (data && data.status === "Failed") {
                                        displayAlert("We had a problem. Please contact support if this persists.", "error");
                                    } else {
                                        displayAlert("We had a problem. Please contact support if this persists.", "error");
                                    }
                                }
                            });
                        }
                    } else {
                        if (result.value === 1) {
                            $.ajax({
                                timeout: 10000,
                                type: "POST",
                                url: "functions/phone_functions.php",
                                data: "donotaskagain=true",
                                success: function (data, result) {
                                    if (data && data.status === "Got Data") {
                                        displayAlert("Got it, we wont ask again!", "success");
                                    }
                                    if (data && data.status !== "Got Data") {
                                        displayAlert("Sorry! That did not work, please contact support if this persists.", "success");
                                    }
                                }
                            })
                        } else if (result.value === 0) {

                        }
                    }
                });
            } else {

            }
        }
    });
}

const saveFirstItem = function (first_item, timeInLane) {
    startFirstItem = first_item;
    timeInLane = timeInLane;
};
let time_interval = '';
var pipeline_time_interval = '';

function getDataPipeline(new_pipeline = null) {
    ShowLoader();
    const pipeline_selected = getCookie("pipeline_selected");
    let module_name = getCookie("pipeline_module");
    let selectedModule = $('#moduleSel').val();
    if (module_name !== selectedModule) {
        module_name = selectedModule;
        setCookie("pipeline_module", module_name, 1);
    }
    if (module_name !== '') {
        module_name = decodeURIComponent(module_name);
    }
    const latest_moudle_name = $("#moduleSel").val();

    if (pipeline_selected && (new_pipeline == null || new_pipeline === "") && (latest_moudle_name === module_name)) {

        var pipeline = pipeline_selected;
        $('#pipelineSel').val(pipeline).trigger('change.select2');
    } else {
        var pipeline = $("#pipelineSel").val();
        $('#pipelineSel').val(pipeline).trigger('change.select2');
        setCookie("pipeline_selected", pipeline, 1);
    }
    if (pipeline == null || pipeline === '') {
        setCookie("pipeline_selected", 'Standard Pipeline', 1);
    }
    if (latest_moudle_name == null || latest_moudle_name === '') {
        setCookie("pipeline_module", 'Agency Contacts', 1);
    }
    const moduleId = $("#moduleSel").children(":selected").attr("data-id");
    const moduleName = $("#moduleSel").val();
    if (pipeline == null) {
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: 'functions/functions.php',
            data: 'addStandardPipeline=true',
            dataType: "json",
            success: function (data, result) {
                if (data && data.status === "got data") {
                    if (pipeline == null || pipeline === '') {
                        setCookie("pipeline_selected", 'Standard Pipeline', 1);
                    }
                    if (latest_moudle_name == null || latest_moudle_name === '') {
                        setCookie("pipeline_module", 'Agency Contacts', 1);
                    }
                    setTimeout(location.reload.bind(location), 500);
                }
            }
        })
    } else {
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: 'functions/functions.php',
            data: 'selected_pipeline=' + pipeline + '&selected_moduleId=' + moduleId + '&selected_moduleName=' + moduleName,
            dataType: "json",
            success: function (data, result) {
                if (data && data.status === "got data") {
                    $('#pipelinestages').empty().append(data.data);

                    HideLoader();
                    if (pipeline === 'Lead') {
                        $('#delPipeline').prop('disabled', true);
                    } else {
                        $('#delPipeline').prop('disabled', false);
                    }
                    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl, {
                            trigger: "hover"
                        })
                    });
                    $('#editPipeline').attr('data-pipelineid', data.PipelineId);
                } else {
                    HideLoader();
                    displayAlert(" not able to fetched data. Refreshing Page in a moment", "success");
                }
                $(".droppable-area").sortable({
                    connectWith: ['.droppable-area'],
                    cursor: "move",
                    helper: "clone",
                    appendTo: "body",
                    forceHelperSize: true,
                    forcePlaceholderSize: true,
                    tolerance: 'pointer',
                    cursor: 'move',
                    refreshPositions: true,
                    scrollSensitivity: 80,
                    start: function (event, ui) {
                        const $items = ui.item;
                        const uId = $items[0].id;
                        if (uId) {
                            const timelane = $("#" + uId).find('.timeLane').find('#currentTime').text();
                            const oldday = $items.parent().attr("data-stage");
                            saveFirstItem(oldday, timelane);
                        }


                    },
                    stop: function (event, ui) {

                        const $item = ui.item;
                        const eventLabel = $item.text();
                        const newDay = $item.parent().attr("data-stage");
                        const progress = $item.parent().attr("data-progress");
                        const idd = $item.parent().attr("id");
                        $item.parent().find('.emptyDiv').empty();
                        const updateId = $item[0].id;
                        const stageNew = newDay;
                        if (updateId) {

                            if (startFirstItem === newDay) {


                                const timelane = $("#" + updateId).find('.timeLane').find('#currentTime').text();
                                var getTimeInterval = getCookie(updateId);

                                if (getTimeInterval) {
                                    clearInterval(getTimeInterval);
                                    deleteCookie(getTimeInterval);
                                }
                                $("#" + updateId).find('.timeLane').html('<div id="timeSpent"></div><div id="currentTime" style="display:none"></div>');

                                clockUpdate(updateId, timelane);

                            } else {

                                $("#" + updateId).find('.timeLane').html('<div id="timeSpent"></div><div id="currentTime" style="display:none"></div>');
                                var getTimeInterval = getCookie(updateId);

                                if (getTimeInterval) {
                                    clearInterval(getTimeInterval);
                                    deleteCookie(getTimeInterval);
                                }
                                if (pipeline_time_interval) {
                                    clearInterval(pipeline_time_interval);
                                }

                                clockUpdate(updateId, '');
                            }
                            const pipeline_timelane = $("#" + updateId).find('.pipeline_time').find('#currentElapsedTime').text();
                            if (pipeline_time_interval) {
                                clearInterval(pipeline_time_interval);
                            }
                            $("#" + updateId).find('.pipeline_time').html('<div id="timeElapsed"></div><div id="currentElapsedTime" style="display: none;"></div>');
                            PipelineClock(updateId, pipeline_timelane);

                            $("#" + updateId).find('.progress-bar').css("width", +progress + "%");
                            $("#" + updateId).find('.progressRate').text(progress + "%");
                        }
                        $(".connected-sortable").each(function () {
                            if ($(this).find('.stage-grid').length === 0) {

                                const div_id = $(this).attr('id');
                                if ($('#' + div_id).find('.emptyDiv').length === 0) {
                                    $('#' + div_id).append('<span  class="emptyDiv" draggable="false">This stage is empty</span>');
                                } else {
                                    $('#' + div_id).html('<span  class="emptyDiv" draggable="false">This stage is empty</span>');
                                }
                            }
                        })
                        $.ajax({
                            timeout: 10000,
                            type: "POST",
                            url: 'functions/functions.php',
                            data: 'updatePipeStage=' + updateId + '&newStage=' + stageNew + '&moduleId=' + moduleId + '&moduleName=' + moduleName,
                            dataType: "json",
                            success: function (data, result) {
                                HideLoader();
                                if (data && data.status === "success") {

                                } else {
                                }
                            }
                        });
                    }
                }).disableSelection();


            }
        })
    }
}

/* Pipeline go to latest after refresh*/

function setCookie(name, value, exp_days) {
    const d = new Date();
    d.setTime(d.getTime() + (exp_days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    const d = new Date();
    d.setTime(d.getTime() - (60 * 60 * 1000));
    const expires = "expires=" + d.toGMTString();
    document.cookie = name + "=;" + expires + ";path=/";
}

/*End of pipeline*/

/* Remove policy from pipeline in case of inactive */


function PolicyStatus(e) {
    const val = $(e).val();
    if (val === 'Active' || val === 'Renewed') {

        $('.pipelineSelCon,.stageSel').prop('disabled', false);
    } else {

        $('.pipelineSelCon,.stageSel').val('').trigger('change');
        $('.pipelineSelCon,.stageSel').prop('disabled', true);
    }
}

/* End */


function PipelineClock(updateId, startTime) {

    if (updateId) {
        moment.tz.setDefault("America/New_York");
        if (startTime === '') {
            var startTime = moment().format();

        } else {
            var startTime = moment(startTime).format();
        }

        $("#" + updateId).find('.pipeline_time').find('#currentElapsedTime').html(startTime);
        startTime = moment(startTime);
        pipeline_time_interval = setInterval(function () {
            let currentTime = moment().format();
            currentTime = moment(currentTime);
            const duration = moment.duration(currentTime.diff(startTime));
            const days = Math.floor(duration.asDays());
            const hours = Math.floor(duration.asHours()) % 24;
            const minutes = Math.floor(duration.asMinutes()) % 60;
            const seconds = Math.floor(duration.asSeconds()) % 60;
            $("#" + updateId).find('.pipeline_time').find('#timeElapsed').html(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's');

        }, 1000); // Update every second
    }
}


function clockUpdate(updateId, startTime) {


    if (updateId) {

        moment.tz.setDefault("America/New_York");
        if (startTime === '') {
            var startTime = moment().format();

        } else {
            var startTime = moment(startTime).format();

        }

        $("#" + updateId).find('.timeLane').find('#currentTime').html(startTime);
        startTime = moment(startTime);

        time_interval = setInterval(function () {
            let currentTime = moment().format();
            currentTime = moment(currentTime);
            const duration = moment.duration(currentTime.diff(startTime));
            const days = Math.floor(duration.asDays());
            const hours = Math.floor(duration.asHours()) % 24;
            const minutes = Math.floor(duration.asMinutes()) % 60;
            const seconds = Math.floor(duration.asSeconds()) % 60;
            // Display the time spent
            $("#" + updateId).find('.timeLane').find('#timeSpent').html('<b>Time in Lane:</b>' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's');


        }, 1000); // Update every second
        setCookie(updateId, time_interval, 1);
    }
}

/* Add Contact/task/Policy direct to the pipeline  */


$(document).on('click', '#update-pipeline-contact', function (event) {
    event.preventDefault();
    getPipeline_form("Update Existing Contact");

    $('#cpt-form').css('display', "inline-block");
    $('#pipeline_contact_assoc,.pipelineSelCon,.stageSel').prop('required', true);
    return false;
});

function getPipeline_form(textfor) {

    ShowLoader();
    const url = "functions/functions.php";
    const module_name = $('#moduleSel').val();
    const pipeline_name = $('#pipelineSel').val();
    const stage_name = $('.stageName').val();
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        async: false,
        data: "get_pipeline_adding_form=" + module_name,
        success: function (data, result) {

            if (data && data.status === "Got Data") {
                const modal_qtpanel = $('#qtpanel');
                modal_qtpanel.find('.offcanvas-header>h5').text(textfor);
                modal_qtpanel.find('.offcanvas-body').html(data.data);
                $('#qtpanel').offcanvas('show');
                $('select').select2({
                    theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
                });
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem loading the data. Please try again.", "error");
            }
            HideLoader();
        }
    });

}

$(document).on('click', '#update-pipeline-policy', function (event) {
    getPipeline_form("Update Existing Policy");
    $('#policy_cpt-form').css('display', "none");
    $('#cpt-form').css('display', "inline-block");
    $('#pipeline_policy_assoc,.pipelineSelCon,.stageSel').prop('required', true);
    $('#pipeline_contact_assoc').prop('required', false);
    $('#show_message_pipeline_update').html("<h4>Note: Only Active/Renewal Policies will be added/updated in this pipeline.</h4>")
});
$(document).on('click', '#update-pipeline-task', function (event) {
    getPipeline_form("Update Existing Task");
    $('#cpt-form').css('display', "inline-block");
    $('.searchtask,.pipelineSelCon,.stageSel').prop('required', true);


});

$(document).on('keypress change input paste', '#pipeline_contact_assoc', function (event) {
    if (event.which === '13') {
        event.preventDefault();
        return;
    }

    const searchStats = $('body').data('search-stats');
    $('#pipeline_contact_assoc').catcomplete({
        hint: true, highlight: true, minLength: 2, delay: 1500, timeout: 10000, source: function (query, result) {
            $.ajax({
                timeout: 10000,
                url: "search-auto-comp.php",
                type: 'post',
                dataType: "json",
                data: 'search=' + query.term + '&for=Contacts' + '&searchStats=' + searchStats,
                beforeSend: function () {
                    ShowSearchLoader();
                },
                success: function (data) {
                    result(data);
                    HideSearchLoader();
                    $("#pipeline_contact_assoc").trigger('focus');
                },
                error: function (request, status, err) {
                    if (status === "timeout") {
                        displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                    } else {
                        displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                    }
                }
            });
        }, open: function (event, ui) {
            $("html, body").css({overflow: 'hidden'});
        }, close: function () {
            $("html, body").css({overflow: 'inherit'});
        }, displayText: function (item) {
            return item.label
        }, afterSelect: function (item) {
            $('#pipeline_contact_assoc').val(item.value);
        }
    });
});

$(document).on('keypress change input paste', '#pipeline_policy_assoc', function (event) {
    if (event.which === '13') {
        event.preventDefault();
        return;
    }

    const searchStats = $('body').data('search-stats');
    $('#pipeline_policy_assoc').catcomplete({
        hint: true, highlight: true, minLength: 2, delay: 1500, timeout: 10000, source: function (query, result) {
            $.ajax({
                timeout: 10000,
                url: "search-auto-comp.php",
                type: 'post',
                dataType: "json",
                data: 'search=' + query.term + '&for=Policy' + '&searchStats=' + searchStats,
                beforeSend: function () {
                    ShowSearchLoader();
                },
                success: function (data) {
                    result(data);
                    HideSearchLoader();
                    $("#pipeline_policy_assoc").trigger('focus');
                },
                error: function (request, status, err) {
                    displayAlert("Whoops! We were unable to pull information for that search. Please try again.", "error");
                }
            });
        }, open: function (event, ui) {
            $("html, body").css({overflow: 'hidden'});
        }, close: function () {
            $("html, body").css({overflow: 'inherit'});
        }, displayText: function (item) {
            return item.label
        }, afterSelect: function (item) {
            $('#pipeline_policy_assoc').val(item.value);
        }
    });

});

$(document).on('submit', '#pipeline_contact_update', function (e) {
    const form = $("#pipeline_contact_update");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all the required fields in their valid format.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#pipeline_contact_update").serialize(),
            success: function (data, result) {
                if (data && data.status === "This Contact already added in this pipeline and stage.Please choose different pipeline or stage name.") {
                    displayAlert(data.status, "error");
                } else if (data && data.status === "Contact Added Successfully, this page will refresh in a few seconds.") {
                    displayAlert("Contact Added Successfully, this page will refresh in a few seconds.", "success")

                    setTimeout(function () {
                        location.reload();
                    }, 3000);

                    $('#side-panel-toggle').trigger('click');
                } else if (data && data.status === 'Required') {
                    displayAlert("Please fill all the required fields in their valid format", "error");
                } else {
                    displayAlert("Please try again with valid Contact name", "error")
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});

$(document).on('submit', '#pipeline_policy_update', function (e) {
    const form = $("#pipeline_policy_update");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all the required fields in their valid format.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";

        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#pipeline_policy_update").serialize(),
            success: function (data, result) {

                if (data && data.status === "This Policy already added in this pipeline and stage.Please choose different pipeline or stage name.") {
                    displayAlert(data.status, "error");

                } else if (data && data.status === "Policy Added Successfully, this page will refresh in a few seconds.") {
                    displayAlert("Policy Added Successfully, this page will refresh in a few seconds.", "success")

                    setTimeout(function () {
                        location.reload();
                    }, 3000);

                    $('#side-panel-toggle').trigger('click');
                } else if (data && data.status === 'Only Active/Renewed Policies will be added in the Pipeline') {
                    displayAlert(data.status, "error");
                } else if (data && data.status === 'Required') {
                    displayAlert("Please fill all the required fields in their valid format", "error");
                } else {

                    displayAlert("Whoops! There was a problem adding your policy, refreshing page. Please try again..", "error")

                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});

function handlePipelineChanges(pipelineFormId, pipelineSubmitButtonId, pipelineType) {
    const form_array = $(`#${pipelineFormId}`).serializeArray();

    if (!form_array[2]?.value) return;

    const searchtask = form_array[0].value;
    const item_id = searchtask.split("|")[1];
    const pipeline = form_array[1].value;
    const stage = form_array[2]?.value;

    $.ajax({
        timeout: 10000, type: "POST", url: "functions/functions.php", data: {
            item_id: item_id, pipeline: pipeline, stage: stage, check_if_item_already_on_stage: pipelineType
        }, success: function (data, result) {
            /* 
                No need to do data && data.on_stage, as if data is not defined, then data?.on_stage will
                be null, and data?.on_stage === "true" will be null === "true" which will evalute to false.
 
                In that scenario, all of the logic below will simply put the submit button in its default state.
            */

            const on_stage = data?.on_stage === "true";
            const btn_element = $(`#${pipelineSubmitButtonId}`);

            btn_element.attr("disabled", on_stage);
            btn_element.addClass(`btn-${on_stage ? "danger" : "primary"}`);
            btn_element.removeClass(`btn-${on_stage ? "primary" : "danger"}`);
            btn_element.html(on_stage ? "Contact Already on Selected Stage" : "Update");
        }
    });
}

$(document).on('change', '#pipeline_policy_update, #pipeline_contact_update, #pipeline_task_update', function (e) {
    const pipelineFormId = this.id;
    let type = pipelineFormId.split('_')[1];
    type = type.charAt(0).toUpperCase() + type.slice(1); // Set first character to Uppercase to match the elements formatting
    const pipelineSubmitButtonId = 'Update*Pipeline';
    let pipelineType = '';

    switch (type) {
        case "Policy":
            pipelineType = 'policies';
            break;
        case "Contact":
            type += 's'; // UpdateContactsPipeline
            pipelineType = 'agency_contacts';
            break;
        case "Task":
            type += 's'; // UpdateTasksPipeline
            pipelineType = 'tasks';
            break;
        default:
            return; // If none of the above, don't call handlePipelineChanges
    }

    handlePipelineChanges(pipelineFormId, pipelineSubmitButtonId.replace('*', type), pipelineType);
});

$(document).on('submit', '#pipeline_task_update', function (e) {
    let form = $("#pipeline_task_update")
    e.preventDefault();
    if (form[0].checkValidity() === false) {
        e.stopPropagation();
        displayAlert("Please fill all the required fields in their valid format.", "error");
        return false;
    }

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/functions.php",
        data: $("#pipeline_task_update").serialize(),
        success: function (data, result) {
            if (data.status === "This Task already added in this pipeline and stage. Please choose different pipeline or stage name.") displayAlert(data.status, "error"); else if (data.status === "Task Added Successfully, this page will refresh in a few seconds.") {
                displayAlert("Task Added Successfully, this page will refresh in a few seconds.", "success")

                setTimeout(() => location.reload(), 3000);

                $('#side-panel-toggle').trigger('click');
            } else if (data.status === 'Required') displayAlert("Please fill all the required fields in their valid format", "error"); else displayAlert("Whoops! There was a problem adding your task, refreshing page. Please try again..", "error")
        }
    });

    form.addClass('was-validated');
    return false; // avoid executing the actual submit of the form.
});

$(document).on('submit', '#submitSupportRequest', function (e) {
    const form = $("#submitSupportRequest")
    e.preventDefault();

    if (form[0].checkValidity() === false) {
        e.stopPropagation();
        displayAlert("Please fill all the required fields in their valid format.", "error");
        return;
    }

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/functions.php",
        data: form.serialize(),
        success: function (data, result) {
            const {status, ticket} = data;

            if (status !== "Got Data") {
                const {message} = data;
                if ("Unable to add that ticket, it already exists." === JSON.parse(message)?.status) {
                    displayAlert("A ticket for this issue was already created within the past minute.", "error");
                } else {
                    displayAlert("Whoops! There was a problem submitting your request. Please try again...", "error");
                }
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Thank you!',
                text: `Your request has been submitted. You can reference Ticket ${ticket} if you need to reach out to our Support Team on this request.`
            });

            document.getElementById("submitSupportRequest").reset();
            $('#toggleBottomOffCanvasClose').trigger('click');
        }
    });


    form.addClass('was-validated');
    return false;
});

$(document).on('click', '#toggleBottomOffCanvasClose', function (event) {
    $('#offcanvasBottomBody').html('');
    $('#offcanvasBottomLabel').html('');

});

$(document).on('click', '.scribeLink', function (e) {
    e.preventDefault();
    const embedLink = $(this).data('link');
    const header = $(this).data('header');
    const embedCode = `<iframe src="` + embedLink + `" width="100%" height="640" allowfullscreen frameborder="0"></iframe>`;
    launchOffCanvasPanel(embedCode, header);
    $('.wt-overlay').trigger('click');
});

$(document).on('click', '.tutorialLink', function (e) {
    e.preventDefault();
    qrShowLoader();
    const embedLink = $(this).data('link');
    const headerSelector = $(this).attr('href');

    // Remove any existing iframes to avoid duplication
    $(headerSelector).find('iframe').remove();

    const iframe = document.createElement('iframe');
    iframe.src = embedLink;
    iframe.width = '100%';
    iframe.height = '640';
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';
    iframe.style.display = 'none';

    let iframeLoaded = false;

    // Set the onload event to detect when the iframe loads successfully
    iframe.onload = function () {
        iframeLoaded = true;
        iframe.style.display = 'block'; // Show iframe if it's loaded successfully
        qrHideLoader();
    };

    // Append the iframe to the header
    $(headerSelector).html(iframe);

    // Timeout to check if the iframe is blocked
    setTimeout(function () {
        if (!iframeLoaded) {
            qrHideLoader();
            window.open(embedLink, '_blank');
        }
    }, 5000); // Adjust the timeout value if needed

    $('html, body').animate({
        scrollTop: $('#v-pills-tutorialLink-tabContent').offset().top - 250
    }, 'slow');
});

$(document).on('keyup', '#tutorialSearch', function () {
    const searchText = $(this).val().toLowerCase();

    // Check if the search text is less than 2 characters
    if (searchText.length < 2) {
        $('.tutorialLink').show(); // Show all links
    } else {
        $('.tutorialLink').each(function () {
            if ($(this).text().toLowerCase().includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
});

$(document).on('click', '#add-pipeline_policy', function (event) {
    event.preventDefault();
    getPipeline_form("Add New Policy");
    $('#cpt-form').css('display', "none");
    $('#policy_cpt-form').css('display', "inline-block");
    $('#pipeline_contact_assoc').prop('required', true);
    $('#pipeline_policy_assoc,.pipelineSelCon,.stageSel').prop('required', false);
    $('#show_message_pipeline').html("<h4>Note: Only Active/Renewal Policies will be added/updated in this pipeline.</h4>")
});

$(document).on('submit', '#pipeline_policy_add', function (e) {
    const form = $("#pipeline_policy_add");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all the required fields in their valid format.", "error")
    } else {
        e.preventDefault();
        let contactId = $('#pipeline_contact_assoc').val();
        contactId = contactId.replace("Contact|", "");
        $('#add-policy-pipeline').attr('data-value', contactId);
        $('#add-policy-pipeline').trigger('click');

    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#help-toggle-v', function (event) {
    $('#offcanvasBottomBody').html('');
    Swal.fire({
        title: 'Support',
        icon: 'info',
        html: 'How would you like to contact us?',
        showCloseButton: true,
        showCancelButton: true,
        showDenyButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa-solid fa-clipboard-list-check"></i> Ticket',
        cancelButtonText: '<i class="fa-light fa-phone"></i> Phone',
        denyButtonText: '<i class="fa-regular fa-comments"></i> Chat',
        denyButtonColor: '#5C86C4',
        cancelButtonColor: '#5C86C4',
        confirmButtonColor: '#5C86C4',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = "functions/functions.php";
            $.ajax({
                timeout: 10000,
                type: "POST",
                url: url,
                data: 'get-support-form=true',
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        $('#offcanvasBottomLabel').html('Support Request');
                        $('#offcanvasBottomBody').html(data.data);
                        $('#toggleBottomOffCanvas').trigger('click');
                    } else {
                        event.preventDefault();
                    }
                }
            });
        } else if (result.isDenied) {
            $('#offcanvasActivityLabel').html('Support Chat Request');
            $('#toggleEndOffCanvas').trigger('click');
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            Tawk_API.embedded = 'tawk_5854a1f67bb7bf7f52426b13';
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            Tawk_API.embedded = 'tawk_5854a1f67bb7bf7f52426b13';
            (function () {
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/5854a1f67bb7bf7f52426b13/1faj73tcm';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
            })();
        } else if (result.isCanceled) {
            if ($('#supportHiddenTelLink').length > 0) {
                $('#supportHiddenTelLink').trigger('click');
            } else {
                window.open('tel:8006013541');
            }
        }
    })

});

$(document).on('click', '#add-policy-pipeline', function (event) {
    val = $(this).attr('data-value');
    $.post("functions/functions.php", "add-policy=true&ContactId=" + val, function (data) {

        if (data !== "fail") {


            const modal_qtpanel = $('#qtpanel');
            modal_qtpanel.find('.offcanvas-header>h5').text("Add Policy");
            modal_qtpanel.find('.offcanvas-body').html(data);
            $('#qtpanel').offcanvas('show');
            $('.form-select').select2({
                theme: "bootstrap-5", width: '100%', dropdownParent: $("#qtpanel")
            });
            $('input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            $('#qtpanel').find('.card-header').attr('style', 'display:none !important');
            $("#add_policy").removeClass('disabled');

        } else {
            displayAlert("Policy cannot be added for deleted/hidden contact", "error");
        }
    });

});

function createmenuPipeline() {
    let url = "functions/functions.php";
    let module_name = $('#moduleSel option:selected').val();
    let pipeline_name = $('#pipelineSel option:selected').val();
    let stage_name = $('.stageName option:selected').val();

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: "get_pipeline_menu=" + module_name,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#appending_dropdown_pipeline').empty().html(data.data);
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem loading the data. Please try again.", "error");
            }
        }
    });

    return false; // avoid to execute the actual submit of the form.
}

function logCall(callId, callerName, callerNumber, calleeName, calleeNumber, status) {
    const url = "functions/phone_functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: "logCall=true" + '&callId=' + callId + '&callerName=' + callerName + '&callerNumber=' + callerNumber + '&calleeName=' + calleeName + '&calleeNumber=' + calleeNumber + '&callStatus=' + status,
        success: function (data, result) {
            if (data && data.status === "Got Data") {

            }
            if (data && data.status !== "Got Data") {

            }
        }
    });
}

$(document).on('change', '.massDelTasks', function (event) {
    const array = [];
    if ($(this).is(':checked')) {
        var id = $(this).closest('.table-responsive').attr('id');
        $("." + id).show();
        $("#" + id + " .massDel").each(function () {
            $(this).prop('checked', true).trigger('change');
            const val = $(this).attr('data-value');
            array.push(val)
        });
    } else {
        var id = $(this).closest('.table-responsive').attr('id');
        $('.massDel').prop('checked', false).trigger('change');
        $("." + id).hide();
    }
});

$(document).on('click', '.delMassTaskBtn', function (event) {
    const array = [];
    $(" .massDel").each(function () {
        if ($(this).is(':checked')) {
            const val = $(this).attr('data-value');
            array.push(val)
        }
    });
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "delMassTasks=" + array, success: function (data, result) {
            if (data && data.status === "deleted") {
                displayAlert('Deleted successfully', 'success');
                setTimeout(location.reload.bind(location), 3000);
            }
            if (data && data.status !== "deleted") {
                displayAlert("Whoops! There was a problem while deleting the data. Please try again.", "error");
            }
        }
    });
})

$(document).on('change', '.massDel', function (event) {
    if ($(this).is(':checked')) {
        var id = $(this).closest('.table-responsive').attr('id');
        $("." + id).show();
    } else {
        var id = $(this).closest('.table-responsive').attr('id');
        $("." + id).hide();
    }
    if ($('.massDel').is(':checked')) {
        var id = $(this).closest('.table-responsive').attr('id');
        $("." + id).show();
    }
    const idd = $(this).closest('.table-responsive').attr('id');
    if ($('#' + idd + ' .gridjs-tbody tr .massDel:checked').length === $('#' + idd + ' .gridjs-tbody tr .massDel').length) {
        $('.massDelTasks').prop('checked', true);
    } else {
        $('.massDelTasks').prop('checked', false);
    }
})
$(document).on('click', '#convertIntoPolicy', function (event) {
    const id = $(this).attr('data-value');
    const lob = $(this).data('lob');
    const contactId = $('.addPolicy').data('value');
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: "convertIntoPolicy=" + id + "&lob=" + lob + "&contactId=" + contactId,
        success: function (data, result) {
            if (data && data.status === "success") {
                launchOffCanvasPanel(data.data, 'Convert Quote To Policy');
                $('input[required]:not([pattern])').attr('pattern', '.*\\S+.*');
            }

        }
    });
})

$(document).on('click', '#button-cd-agency-carrier-settings', function (e) {
    ShowLoader();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: "getCDAgencyCarrierSettings=true",
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                $('#cd-agency-carrier-settings').html(data.data);
                if ($('#cd-carrier-grid').length > 0) {
                    $('#cd-carrier-grid').dataTable({
                        responsive: true, destroy: true, "order": [[0, "asc"]]
                    });
                }
                HideLoader()
            }

        }
    });
    HideLoader();
});

$(document).on('click', '.editCDCarrier', function (e) {
    const carrierId = $(this).attr('data-value');
    ShowLoader();
    const url = "functions/functions.php";
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: "getCDCarrierInfo=" + carrierId,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchCenteredModal(data.data, 'Edit Carrier', 'modal-xl');
                HideLoader()
            }
            if (data && data.status !== "Got Data") {
                displayAlert("Whoops! There was a problem getting the data for that Carrier. Please try again.", "error");
                HideLoader();
            }
        }
    });
    HideLoader();
});

$(document).on('click', '.deleteCDCarrier', function (e) {
    const carrierId = $(this).attr('data-value');
    let cRow = $(this).closest('tr');
    ShowLoader();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });
    HideLoader();
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This is not recoverable and will permanently remove this Carrier as a selection.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            $.ajax({
                timeout: 10000,
                url: 'functions/functions.php',
                type: "POST",
                data: 'getCDCarrierDeleteInfo=' + carrierId,
                success: function (data, result) {
                    if (data && data.status === "Got Data") {
                        $.ajax({
                            url: 'functions/functions.php',
                            type: "POST",
                            data: 'deleteCDCarrier=' + carrierId,
                            success: function (data, result) {
                                if (data && data.status === "Got Data") {
                                    displayAlert("Carrier Deleted. Refreshing the page.", "success");
                                    cRow.remove();
                                } else {
                                    displayAlert("There was a problem trying to delete this Carrier. Please try again or contact Support.", "error");
                                }
                            }
                        })
                    } else if (data && data.status === "Policy Issue") {
                        HideLoader();
                        launchCenteredModal(data.data, 'Re-Associate Policies with New Carrier');
                        $('#reAssociateDeletedCarrierPolicies select').select2({
                            theme: "bootstrap-5", width: '100%', dropdownParent: $("#centeredModalBody")
                        });
                    } else if (data && data.status === "No Valid Carriers") {
                        HideLoader();
                        Swal.fire('Uh oh!', "You first need to add other Carrier(s) before you can delete this one. This Carrier is already associated to policies so we need a replacement.", 'info')
                    } else {
                        displayAlert("Whoops! There was a problem deleting that Carrier. Please try again.", "error");
                        HideLoader();
                    }
                }
            })
        }
    })
    return false; //for good measure
    HideLoader();
});

$(document).on('click', '#cancelCDCarrierUpdate', function (e) {
    e.preventDefault();
    emptyCenteredModal();
    $("#centeredModalButton").trigger("click");

})

$(document).on('submit', '#reAssociateDeletedCarrierPolicies', function (e) {
    e.preventDefault();
    const form = $("#reAssociateDeletedCarrierPolicies");
    let carrierId = $('#reassoc-cd-carrier-id').val();
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#reAssociateDeletedCarrierPolicies").serialize(),
            beforeSend: function () {
                ShowLoader();
            },
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert("Policies Re-Associated, and the Carrier has been removed.", "success");
                    $("button.deleteCDCarrier[data-value='" + carrierId + "']")
                        .closest("tr")
                        .remove();
                    emptyAndCloseCenteredModal();
                } else {
                    displayAlert("There was a problem trying to re-associate those policies. Please try again or contact Support.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});


$(document).on('submit', '#updateCDCarrierForm', function (e) {
    e.preventDefault();
    const form = $("#updateCDCarrierForm");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#updateCDCarrierForm").serialize(),
            beforeSend: function () {

                ShowLoader();
            },
            success: function (data, result) {
                HideLoader();
                if (data && data.status === "Got Data") {
                    displayAlert("Carrier Updated Successfully. Refreshing the page.", "success");
                    emptyAndCloseCenteredModal();
                } else {
                    displayAlert("There was a problem trying to updating that Carrier. Please try again or contact Support.", "error");
                }
            }
        });
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.

});


$(document).on('click', '.aqrStepsInfo', function (event) {
    const hasPolicies = $(this).data('policies');
    const hasQuoteTimeing = $(this).data('timing');
    const hasPreferredCarriers = $(this).data('prefcarriers');
    let htmlBody = "<p>In order for Automated Quotes to function the following steps must be completed. Without each of them the workflow will be unable to evaluate any Policies to be automatically quoted via QuoteRUSH</p><hr><ul>";
    if (parseInt(hasPolicies) > 0) {
        htmlBody += "<li><i class='fa-regular fa-circle-check text-success'></i> - Policy Data (Complete)</li>";
    } else {
        htmlBody += "<li><i class='fa-regular fa-circle-x text-danger'></i> - Policy Data (Incomplete)</li>";
    }
    if (parseInt(hasQuoteTimeing) > 0) {
        htmlBody += "<li><i class='fa-regular fa-circle-check text-success'></i> - Quote Timing Setup for at least one Line of Business (Complete)</li>";
    } else {
        htmlBody += "<li><i class='fa-regular fa-circle-x text-danger'></i> - Quote Timing Setup for at least one Line of Business (Incomplete)</li>";
    }
    if (parseInt(hasPreferredCarriers) > 0) {
        htmlBody += "<li><i class='fa-regular fa-circle-check text-success'></i> - Preferred Carrier(s) Setup for at least one Line of Business (Complete)</li>";
    } else {
        htmlBody += "<li><i class='fa-regular fa-circle-x text-danger'></i> - Preferred Carrier(s) Setup for at least one Line of Business (Incomplete)</li>";
    }

    htmlBody += "</ul>";
    const aqrTitle = "Steps to Complete Automated Renewal Quoting Setup";
    launchCenteredModal(htmlBody, aqrTitle);
});

$(document).on('submit', '#conversionQuotesForm', function (e) {
    const form = $("#conversionQuotesForm");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all the required fields in their valid format.", "error")
    } else {
        e.preventDefault();

        const eff = $("#quote_policy_eff_date").val();
        const exp = $("#quote_policy_exp_date").val();

        const effective_date = Date.parse(eff);
        const expire_date = Date.parse(exp);
        if (expire_date <= effective_date) {
            displayAlert("Expire date should be greater than effective date", "error");
            $('.convertQuote').prop('disabled', true);
            $('#quote_policy_exp_date').css('border', '1px solid red');
            return false;
        } else if (effective_date >= expire_date) {
            displayAlert("Effective date should be less than expiration date", "error");
            $('.convertQuote').prop('disabled', true);
            $('#quote_policy_eff_date').css('border', '1px solid red');
            return false;
        } else {
            $('#quote_policy_exp_date').css('border', '');
            $('#quote_policy_eff_date').css('border', '');
            $('.convertQuote').prop('disabled', true);
        }

        const name = $("#quote_policy_named_ins").val();
        const policyNumber = $("#quote_policy_number").val();
        if (name.trim() === "" || policyNumber.trim() === "") {

            displayAlert("Please fill all required fields to continue.", "error")
            $('.convertQuote').prop('disabled', false);
            //    $('#add_policy').show();
            return false;
        }
        const url = "functions/functions.php";
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#conversionQuotesForm").serialize() + '&convertQuotesToPolicy=true',
            success: function (data, result) {
                if (data && data.status === "success") {
                    const policyId = data.policyId;
                    window.location = "policy.php?Policy=" + policyId;
                    displayAlert("Quotes converted to policy successfully", "success");
                } else {
                    displayAlert("Problem in the Quotes conversion. Please try again", "error");
                }
            }
        })
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('change', '#quote_term', function (event) {
    if ($("#quote_term").val() !== '' && $("#quote_policy_eff_date").val() !== '' && $("quote_policy_eff_date").val() !== '0000-00-00' && $("#quote_policy_eff_date").val() !== '0001-01-01') {
        const inputDateStr = $("#quote_policy_eff_date").val();
        const parts = inputDateStr.split('-');
        const inputDate = new Date(parts[0], parts[1] - 1, parts[2]);
        var term = $('#quote_term').val();
        const terms = term.split(' ');
        var term = terms[0];
        var term = parseInt(term);
        inputDate.setMonth(inputDate.getMonth() + term);
        const resultDateStr = inputDate.toISOString().slice(0, 10);
        $('#quote_policy_exp_date').val(resultDateStr);
    }
});

/**
 *  Calculate the Expiry date for both cases i.e.
 *  CASE 1: when user convert deal to policy.
 *  CASE 2: when user update Policy data which is already created.
 */
function addMonthsToDate(dateStr, monthsToAdd) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const futureDate = new Date(year, month - 1 + monthsToAdd, day);
    return futureDate.toISOString().slice(0, 10);
}

/**
 *  Parent function, it is called when user select the effective
 *  date and select the Term, then this function calculate
 *  the expiry date.
 *  CASE: when user update the Policy data which are already
 *  created.
 */
$(document).on('change', '#upd_term', function (event) {

    const term = $('#upd_term').val();
    const effDate = $("#upd_eff").val();

    if (term && effDate && effDate !== '0000-00-00' && effDate !== '0001-01-01') {
        const numMonths = parseInt(term);
        const expireDate = addMonthsToDate(effDate, numMonths);
        $('#upd_exp').val(expireDate);
    }
});
$(document).on('focusout', '#quote_policy_eff_date', function (event) {
    if ($("#quote_term").val() !== '' && $("#quote_policy_eff_date").val() !== '' && $("#quote_policy_eff_date").val() !== '0000-00-00' && $("#quote_policy_eff_date").val() !== '0001-01-01') {
        const inputDateStr = $("#quote_policy_eff_date").val();
        const parts = inputDateStr.split('-');
        const inputDate = new Date(parts[0], parts[1] - 1, parts[2]);
        var term = $('#quote_term').val();
        const terms = term.split(' ');
        var term = terms[0];
        var term = parseInt(term);
        inputDate.setMonth(inputDate.getMonth() + term);
        const resultDateStr = inputDate.toISOString().slice(0, 10);
        $('#quote_policy_exp_date').val(resultDateStr);
    }
});

function existingCarriers() {
    ShowLoader();
    $("#existingCarrier_list_table tbody").html('');
    $.ajax({
        timeout: 10000,
        url: 'functions/functions.php',
        data: {'existing_carriers': 1},
        type: 'post',
        dataType: 'json',
        async: false,
        success: function (data, result) {
            HideLoader();
            if (data && data.status === 'success') {
                $(function () {
                    $('#existingCarrier_list_table').DataTable({
                        data: data.data,
                        scrollCollapse: true,
                        destroy: true,
                        preDrawCallback: function (settings, json) {
                            addClassToDatatable();
                        }
                    });
                });
            } else {
                displayAlert("There was a problem retrieving your existing carriers list. Please try again, or contact support", "error");
            }
        },
        error: function (xhr, status, error) {
            HideLoader();
            displayAlert("There was a problem retrieving your existing carriers list. Please try again, or contact support", "error");
        }
    });
}

$(document).on('click', '#saveContact-template', function (e) {
    const typeSelected = $("#hiddenTemplateType").text();
    if (typeSelected === "SMS") {
        $('#editor2').prop('required', true);
        $('#summernote').prop('required', false);

    } else {
        $('#editor2').prop('required', false);
        $('#summernote').prop('required', true);

    }
    const form = $("#marketingEmailTemplateForm");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error");
    } else {
        e.preventDefault();
        if ($(".note-editor").hasClass("codeview")) {
            $(".btn-codeview").trigger('click');
        }
        const editorFullData = $("#summernote").summernote("isEmpty") ? "" : $("#summernote").summernote("code");
        if (editorFullData) {
            var ajaxData = editorFullData;
        } else {
            ajaxData = smsEditorData;
        }

        if ($("#HiddenEditTemplateId").val()) {
            const updateTemplateId = $("#HiddenEditTemplateId").val();
            $.ajax({
                timeout: 10000, url: "functions/marketing_functions.php", type: "POST", data: {
                    updateContactTemplate: 'true',
                    updateTemplateIdContactPage: updateTemplateId,
                    typeContact: typeSelected,
                    contentContact: ajaxData,
                }, beforeSend: function () {
                    ShowLoader();
                }, success: function (data, result) {
                    HideLoader();
                    if (data && data.status === "Success") {

                        displayMessage("Your Design Template was updated successfully.Refreshing, page in a moment!", "success");
                        setTimeout(location.reload.bind(location), 3000);

                    } else if (data && data.status === "Failed") {
                        displayMessage("Your Design Template was not updated successfully. Please try again, or contact Support.", "error");
                    } else {
                        Swal.fire({
                            title: "No, changes were found. Please try again!",
                            icon: "error",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#f34e4e",
                            cancelButtonText: "OK, got it!",
                            reverseButtons: false,
                        });
                    }
                },
            });
        }
    }
    form.addClass('was-validated');
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
    $(this).closest(".select2-container").siblings('select:enabled').select2('open');
});

// steal focus during close - only capture once and stop propogation
$('select.select2').on('select2:closing', function (e) {
    $(e.target).data("select2").$selection.one('focus focusin', function (e) {
        e.stopPropagation();
    });
});

function formatMoney(string) {
    // Remove non-numeric characters except the decimal point
    const number = parseFloat(string.replace(/[^0-9.]/g, ''));

    // Format the number as US currency
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(number);
}

function generateRandomID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 for compactness
    const randomPart = Math.random().toString(36).substring(2, 15); // Generate a random string

    return timestamp + randomPart;
}

function addClassToDatatable() {
    $('.dataTables_wrapper select, .dataTables_wrapper input').addClass('rounded-pill');
}

$(document).on('click', '.editVehicle', function (e) {
    const val = $(this).attr('data-value');
    e.preventDefault();
    const url = "functions/functions.php";
    ShowLoader();
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "editVehicle=" + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                launchCenteredModal(data.data, "Edit Vehicle", "modal-xl");
                $("#edit_vehicle_form select").select2({
                    theme: "bootstrap-5", width: '100%'
                });
            } else {
                displayAlert("There was a problem while getting the data for this Vehicle. Please try again, or contact Support.", "error");
                HideLoader();
            }
        }, error: function (xhr, status, error) {
            // Handle errors
            HideLoader();
            displayAlert("There was a problem while getting the data for this Vehicle. Please try again, or contact Support.", "error");
        }, complete: function () {
            HideLoader();
        }
    });
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('submit', '#edit_vehicle_form', function (e) {

    const form = $("#edit_vehicle_form");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        displayAlert("Please fill all required fields to continue.", "error")
    } else {
        e.preventDefault();
        const url = "functions/functions.php";
        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: $("#edit_vehicle_form").serialize(),
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    displayAlert("Vehicle Updated Successfully.", "success");
                    emptyAndCloseCenteredModal();
                    VehicleTable();
                } else if (data && data.status === "No Changes") {
                    displayAlert("No changes found. Please try again, or contact Support for assistance.", "info")
                    HideLoader();
                } else {
                    displayAlert("Whoops! There was a problem updating that vehicle. Please try again, or contact Support for assistance.", "error")
                    HideLoader();
                }
            },
            error: function (xhr, status, error) {
                // Handle errors
                HideLoader();
                displayAlert("There was a problem while updating this Vehicle. Please try again, or contact Support.", "error");
            },
            complete: function () {
                HideLoader();
            }
        });
    }

    form.addClass('was-validated');

    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.deleteVehicle', function (e) {
    e.preventDefault();
    const val = $(this).attr('data-value');
    const row = $(this).closest('tr');
    const url = "functions/functions.php";
    ShowLoader();
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "deleteVehicle=" + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Success! Vehicle removed successfully.", "success");
                row.remove();
                VehicleTable();
                HideLoader();
            } else if (data && data.status === "No Changes") {
                displayAlert("No changes found. Please try again, or contact Support for assistance.", "info")
                HideLoader();
            } else {
                displayAlert("Whoops! There was a problem deleting that vehicle. Please try again, or contact Support for assistance.", "error")
                HideLoader();
            }
        }, error: function (xhr, status, error) {
            // Handle errors
            HideLoader();
            displayAlert("There was a problem while deleting this Vehicle. Please try again, or contact Support.", "error");
        }, complete: function () {
            HideLoader();
        }
    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#notes-info-tab, #contactNotesTab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'contactNotesTab') {
        ContactNotesTableV2('Overview');
    } else if ($(this).attr('id') === 'notes-info-tab') {
        ContactNotesTableV2('Details');
    } else {
        return false;
    }

});


$(document).on('click', '.addNamedIns', function (e) {
    e.preventDefault();
    const lastNiDiv = $(".niDiv").last();
    const newElement = $("<div class='col-lg-3 col-md-6 col-sm-12 mb-3 niDiv'><label for='upd_status'>Additional Named Insured</label><input type='text' name='additionalNamedInsured[]' value='' class='form-control addNI' data-niid='' placeholder='Additional Named Insured' /><div class='invalid-feedback'>Please enter a valid additional named insured</div><div class='valid-feedback'>Looks good!</div></div>");
    lastNiDiv.after(newElement);
});

$(document).on('click', '.removeNamedIns', function (e) {
    e.preventDefault();
    const val = $(this).attr('data-value');
    const row = $(this).closest('.niDiv');
    const url = "functions/functions.php";
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger',
        }, buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "This will remove the Named Insured from this Policy permanently.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        reverseButtons: false
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
        } else {
            ShowLoader();
            $.ajax({
                timeout: 10000, url: url, type: "POST", data: 'deleteNamedInsured=' + val, success: function (data) {
                    if (data && data.status === "Got Data") {
                        HideLoader();
                        displayAlert("Success! Named Insured removed successfully.", "success");
                        row.remove();
                    } else if (data && data.status === "No Changes") {
                        HideLoader();
                        displayAlert("No changes found. Please try again, or contact Support for assistance.", "info");
                    } else {
                        HideLoader();
                        displayAlert("Whoops! There was a problem deleting that Named Insured. Please try again, or contact Support for assistance.", "error");
                    }
                }
            })
        }
    })
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#propertiesTab, #propertiesDetailsTab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'propertiesTab') {
        PropertyInfoTableV2('Overview');
    } else if ($(this).attr('id') === 'propertiesDetailsTab') {
        PropertyInfoTableV2('Details');
    } else {
        return false;
    }

});

$(document).on('click', '#notesTab, #policy-notes-info-tab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'notesTab') {
        PolicyNotesTableV2('Overview');
    } else if ($(this).attr('id') === 'policy-notes-info-tab') {
        PolicyNotesTableV2('Details');
    } else {
        return false;
    }

});


$(document).on('click', '#renewalsInfoData, #renewalsInfoDetailsData', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'renewalsInfoData') {
        PolicyRenewalsTableV2('Overview');
    } else if ($(this).attr('id') === 'renewalsInfoDetailsData') {
        PolicyRenewalsTableV2('Details');
    } else {
        return false;
    }

});

$(document).on('click', '#notesInfoData, #v-pills-notes-info-tab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'notesInfoData') {
        PolicyPageNotesTableV2('Overview');
    } else if ($(this).attr('id') === 'v-pills-notes-info-tab') {
        PolicyPageNotesTableV2('Details');
    } else {
        return false;
    }
});


$(document).on('click', '#policyInfoData, #deletedPoliciesTab, #detailsPoliciesTab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'policyInfoData') {
        PolicyInfoTable('Active');
    } else if ($(this).attr('id') === 'deletedPoliciesTab') {
        PolicyInfoTable('Deleted');
    } else if ($(this).attr('id') === 'detailsPoliciesTab') {
        PolicyInfoTable('Details');
    } else {
        return false;
    }

});


$(document).on('click', '#proposalInfoDataLarge, #proposalInfoDataSmall, #proposal-info-tab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'proposalInfoDataLarge' || $(this).attr('id') === 'proposalInfoDataSmall') {
        ProposalsTableV2('Overview');
    } else if ($(this).attr('id') === 'proposal-info-tab') {
        ProposalsTableV2('Details');
    } else {
        return false;
    }

});

$(document).on('click', '#invoiceInfoDataSmall, #invoiceInfoData', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'invoiceInfoData' || $(this).attr('id') === 'invoiceInfoDataSmall') {
        InvoicesTableV2('Overview');
    } else if ($(this).attr('id') === 'proposal-info-tab') {
        InvoicesTableV2('Details');
    } else {
        return false;
    }
});


$(document).on('click', '#taskTab, #taskDetailsTab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'taskTab') {
        TasksTableV2('Overview');
    } else if ($(this).attr('id') === 'taskDetailsTab') {
        TasksTableV2('Details');
    } else {
        return false;
    }
});


$(document).on('click', '#activeContactsTab, #delContactsTab, #hiddenContactsTab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'activeContactsTab') {
        ContactsTableV2('Active');
    } else if ($(this).attr('id') === 'delContactsTab') {
        ContactsTableV2('Deleted');
    } else if ($(this).attr('id') === 'hiddenContactsTab') {
        ContactsTableV2('Hidden');
    } else {
        return false;
    }
});


$(document).on('click', '#ptaskTab', function (e) {
    e.preventDefault();
    if ($(this).attr('id') === 'ptaskTab') {
        pTasksTableV2('Overview');
    } else {
        return false;
    }
});


$(document).on('change', '.apMakeDashboardDefaultForAdmins', function (e) {
    e.preventDefault();
    const val = $(this).attr('data-value');
    const valSelected = $(this).val();
    if (valSelected !== '') {
        const url = "functions/functions.php";
        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: "apMakeDashboardDefaultForAdmins=" + val + '&DashboardDefaultForAdminsSelection=' + valSelected,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    HideLoader();
                    displayAlert("Success! Dashboard settings updated.", "success");
                } else if (data && data.status === "No Changes") {
                    HideLoader();
                    displayAlert("No changes found. Please try again, or contact Support for assistance.", "info")
                } else {
                    displayAlert("Whoops! There was a problem updating the settings for that Dashboard. Please try again, or contact Support for assistance.", "error")
                    HideLoader();
                }
            },
            error: function (xhr, status, error) {
                // Handle errors
                HideLoader();
                displayAlert("Whoops! There was a problem updating the settings for that Dashboard. Please try again, or contact Support for assistance.", "error")
            },
            complete: function () {
                HideLoader();
            }
        });
    } else {
        displayAlert("No changes found. Please try again, or contact Support for assistance.", "info");
    }
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('change', '.apMakeDashboardDefaultForUserOrGroup', function (e) {
    e.preventDefault();
    const val = $(this).attr('data-value');
    const valSelected = $(this).val();
    if (valSelected !== '') {
        const url = "functions/functions.php";
        ShowLoader();
        $.ajax({
            timeout: 10000,
            type: "POST",
            url: url,
            data: "apMakeDashboardDefaultForUserOrGroup=" + val + '&DashboardDefaultForUserOrGroupSelection=' + valSelected,
            success: function (data, result) {
                if (data && data.status === "Got Data") {
                    HideLoader();
                    displayAlert("Success! Dashboard settings updated.", "success");
                } else if (data && data.status === "No Changes") {
                    HideLoader();
                    displayAlert("No changes found. Please try again, or contact Support for assistance.", "info")
                } else {
                    displayAlert("Whoops! There was a problem updating the settings for that Dashboard. Please try again, or contact Support for assistance.", "error")
                    HideLoader();
                }
            },
            error: function (xhr, status, error) {
                // Handle errors
                HideLoader();
                displayAlert("Whoops! There was a problem updating the settings for that Dashboard. Please try again, or contact Support for assistance.", "error")
            },
            complete: function () {
                HideLoader();
            }
        });
    } else {
        displayAlert("No changes found. Please try again, or contact Support for assistance.", "info");
    }
    return false; // avoid to execute the actual submit of the form.
});


$(document).on('click', '.restoreVehicle', function (e) {
    e.preventDefault();
    const val = $(this).attr('data-value');
    const row = $(this).closest('tr');
    const url = "functions/functions.php";
    ShowLoader();
    $.ajax({
        timeout: 10000, type: "POST", url: url, data: "restoreVehicle=" + val, success: function (data, result) {
            if (data && data.status === "Got Data") {
                displayAlert("Success! Vehicle restored successfully.", "success");
                row.remove();
                VehicleTable();
                HideLoader();
            } else if (data && data.status === "No Changes") {
                displayAlert("No changes found. Please try again, or contact Support for assistance.", "info")
                HideLoader();
            } else {
                displayAlert("Whoops! There was a problem restoring that vehicle. Please try again, or contact Support for assistance.", "error")
                HideLoader();
            }
        }, error: function (xhr, status, error) {
            // Handle errors
            HideLoader();
            displayAlert("There was a problem while restoring this Vehicle. Please try again, or contact Support.", "error");
        }, complete: function () {
            HideLoader();
        }
    });
    return false; // avoid to execute the actual submit of the form.
});

$(document).on('click', '#v-pills-commission-info-tab', function (e) {
    const Policy = GetURLParameter('Policy');
    $('#recent-commission-transactions-table').DataTable({
        "destroy": true, "processing": true, "serverSide": true, "ajax": {
            "url": "commission-transactions-grid-data.php", "type": "GET", "data": {
                "Policy": Policy
            }, "dataSrc": function (json) {
                return json.data;
            }
        }, 'order': [[6, 'desc'], [0, 'asc']], columnDefs: [{
            orderable: false, targets: 6
        }, {
            'type': 'date', 'targets': 1
        }], "preDrawCallback": function (settings) {
            ShowLoader(); // Show the loader before the table starts drawing
        }, "drawCallback": function (settings) {
            HideLoader(); // Hide the loader after the table has been drawn
        }
    });
});

$(document).on('click', '#v-pills-coverage-info-tab', function (e) {
    e.preventDefault();
    PVehicleTable();
    PDriverTable();
    PropertyInfoTableV2('PDetails');
    return false; // avoid to execute the actual submit of the form.
});

function DriverTable() {
    ContactId = GetURLParameter("Contact");
    $('#driverTableDiv').DataTable({
        "destroy": true, // Allows re-initialization
        "processing": true, "serverSide": true, "ajax": {
            "url": "auto-grid-data.php", "type": "GET", "data": {
                "Contact": ContactId, "Data": "Drivers"
            }
        }, 'order': [[0, 'asc']], columnDefs: [{orderable: false, targets: [6]}]
    });
}

function VehicleTable() {
    ContactId = GetURLParameter("Contact");
    $('#vehicleTableDiv').DataTable({
        "destroy": true, // Allows re-initialization
        "processing": true, "serverSide": true, "ajax": {
            "url": "auto-grid-data.php", "type": "GET", "data": {
                "Contact": ContactId, "Data": "Vehicles"
            }
        }, 'order': [[4, 'asc'], [0, 'desc'],], columnDefs: [{orderable: false, targets: 5}]
    });
}

function PDriverTable() {
    if ($('#driverTableDiv').length > 0) {
        PolicyId = GetURLParameter("Policy");
        $('#driverTableDiv').DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "auto-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Drivers"
                }
            }, 'order': [[0, 'asc']], columnDefs: [{orderable: false, targets: [6]}]
        });
    }
}

function PVehicleTable() {
    PolicyId = GetURLParameter("Policy");
    if ($('#vehicleTableDiv').length > 0) {
        $('#vehicleTableDiv').DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "auto-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Vehicles"
                }
            }, 'order': [[4, 'asc'], [0, 'desc'],], columnDefs: [{orderable: false, targets: 5}]
        });
    }
}


function OPDriverTable() {
    if ($('#ov-policy-drivers-table').length > 0) {
        PolicyId = GetURLParameter("Policy");
        $('#ov-policy-drivers-table').DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "auto-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Drivers"
                }
            }, 'order': [[0, 'asc']], columnDefs: [{orderable: false, targets: [6]}]
        });
    }
}

function OPVehicleTable() {
    PolicyId = GetURLParameter("Policy");
    if ($('#ov-policy-vehicles-table').length > 0) {
        $('#ov-policy-vehicles-table').DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "auto-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Vehicles"
                }
            }, 'order': [[4, 'asc'], [0, 'desc'],], columnDefs: [{orderable: false, targets: 5}]
        });
    }
}


function ContactNotesTableV2(requester) {
    ContactId = GetURLParameter("Contact");
    if (requester === 'Overview' || requester === 'Details') {
        if (requester === 'Overview') {
            tableId = 'contactOVNotesTable';
        }
        if (requester === 'Details') {
            tableId = 'contactDetailsNotesTable';
        }
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "notes-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Contact"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                orderable: false, targets: 3
            }, {
                'type': 'datetime', 'targets': 1
            }, {
                "width": "65%", "targets": 2
            }

            ]
        });
    } else if (requester === 'All') {
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        tableId = 'contactOVNotesTable';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "notes-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Contact"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                orderable: false, targets: 3
            }, {
                'type': 'datetime', 'targets': 1
            }, {
                "width": "65%", "targets": 2
            }

            ]
        });
        tableId = 'contactDetailsNotesTable';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "notes-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Contact"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                orderable: false, targets: 3
            }, {
                'type': 'datetime', 'targets': 1
            }, {
                "width": "65%", "targets": 2
            }

            ]
        });
    }
}


$(document).on('click', '.cdCommissionSelector', function (e) {
    e.preventDefault();
    var range = $(this).attr('data-value');
    if (range === 'Custom') {
        $('.cdCommissionSelector').removeAttr('checked');
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
                displayAlert("Please hold, loading the requested data.", "message");
                ShowLoader();
                const range = result.value;
                const dates = range.split('|');
                const formattedRange = `${dates[0]} - ${dates[1]}`;
                $('#currentFilter').val(range);
                $.fn.dataTable.moment('MM/DD/YYYY');
                $('#recent-commission-transactions-table').DataTable({
                    "destroy": true, // Allows re-initialization
                    "processing": true, "serverSide": true, "ajax": {
                        "url": "commission-transactions-grid-data.php", "type": "GET", "data": {
                            "Data": range
                        }, "dataSrc": function (json) {
                            const totalTransactions = json.totalTransactions;
                            const totalCommissions = json.totalCommissions;
                            const totalLostCommissions = json.totalLostCommissions;
                            $('#dataset').html(labelText + ': ' + json.dataFilter);
                            $('#total-commission-transactions-stat').html(totalTransactions);
                            $('#total-commissions-stat').html(totalCommissions);
                            $('#total-lost-commissions-stat').html(totalLostCommissions);
                            return json.data;
                        }
                    }, 'order': [[6, 'desc'], [0, 'asc']], columnDefs: [{
                        orderable: false, targets: 10
                    }, {
                        'type': 'date', 'targets': 1
                    }], "preDrawCallback": function (settings) {
                        ShowLoader(); // Show the loader before the table starts drawing
                    }, "drawCallback": function (settings) {
                        HideLoader(); // Hide the loader after the table has been drawn
                    }
                });
            }
        });
    } else {
        displayAlert("Please hold, loading the requested data.", "message");
        ShowLoader();
        $('.cdCommissionSelector').removeAttr('checked');
        $(this).attr('checked', true);
        const idOfSelected = $(this).attr('id');
        var range = $(this).attr('data-value');
        $.fn.dataTable.moment('MM/DD/YYYY');
        $('#currentFilter').val(range);
        var labelText = $('label[for="' + idOfSelected + '"]').text();
        $('#dataset').html(labelText);
        $('#recent-commission-transactions-table').DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "commission-transactions-grid-data.php", "type": "GET", "data": {
                    "Data": range
                }, "dataSrc": function (json) {
                    const totalTransactions = json.totalTransactions;
                    const totalCommissions = json.totalCommissions;
                    const totalLostCommissions = json.totalLostCommissions;
                    $('#dataset').html(labelText + ': ' + json.dataFilter);
                    $('#total-commission-transactions-stat').html(totalTransactions);
                    $('#total-commissions-stat').html(totalCommissions);
                    $('#total-lost-commissions-stat').html(totalLostCommissions);
                    return json.data;
                }
            }, 'order': [[6, 'desc'], [0, 'asc']], columnDefs: [{
                orderable: false, targets: 10
            }, {
                'type': 'date', 'targets': 1
            }], "preDrawCallback": function (settings) {
                ShowLoader(); // Show the loader before the table starts drawing
            }, "drawCallback": function (settings) {
                HideLoader(); // Hide the loader after the table has been drawn
            }
        });
    }
    return false; // avoid to execute the actual submit of the form.
});

function CallsInfoTable(requester) {
    ContactId = GetURLParameter("Contact");
    $.fn.dataTable.moment('MM/DD/YYYY'); // Optional for sorting if dates are formatted in this way
    if (requester === 'Overview') {
        tableId = 'ov-calls';
    } else if (requester === 'Details') {
        tableId = 'details-calls';
    } else {
        tableId = 'calls-page-table';
    }
    $('#' + tableId).DataTable({
        "destroy": true, // Allows re-initialization
        "processing": true, "serverSide": true, "ajax": {
            "url": "calls-grid-data.php", "type": "GET", "data": {
                "Contact": ContactId, "Caller": tableId
            }
        }, 'order': [[0, 'desc']], columnDefs: [{
            orderable: false, targets: 0
        }, {
            'type': 'datetime', 'targets': [0]
        }, {
            // Use a custom render function to format UTC to local time
            targets: [0], // Adjust the target index based on your date column
            render: function (data, type, row) {
                // Use Moment.js to format the date
                if (type === 'display' || type === 'filter') {
                    return moment.utc(data).local().format('MM/DD/YYYY hh:mm:ss A');
                }
                return data; // Raw data for other types like ordering
            }
        }]
    });
}

$(document).on('click', '#v-pills-fees-info-tab', function(){
    CarrierFeesTable('carrierFeeTable');
});

function CarrierFeesTable(tableId) {
    PolicyId = GetURLParameter("Policy");
    $.fn.dataTable.moment('MM/DD/YYYY'); // Optional for sorting if dates are formatted in this way
    $('#' + tableId).DataTable({
        "destroy": true,
        "searching": false,
        "processing": true, "serverSide": true, "ajax": {
            "url": "carrier-fees-grid-data.php", "type": "GET", "data": {
                "Policy": PolicyId
            }
        }, 'order': [[2, 'desc']], columnDefs: [{
            orderable: false, targets: [4]
        }]
    });
}


function PolicyInfoTable(requester) {
    ContactId = GetURLParameter("Contact");
    if (requester === 'Active' || requester === 'Deleted') {
        if (requester === 'Active') {
            tableId = 'ov-policies';
            $('#' + tableId).DataTable({
                "destroy": true, // Allows re-initialization
                "processing": true, "serverSide": true, "searchDelay": 1500, "ajax": {
                    "url": "policy-grid-data.php", "type": "GET", "data": {
                        "Contact": ContactId, "Data": "Policy", "PolicyStatus": 0
                    }
                }, 'order': [[10, 'desc']], columnDefs: [{
                    orderable: false, targets: 0
                }, {
                    'type': 'date', 'targets': [9, 10]
                }

                ]
            });
        }
        if (requester === 'Deleted') {
            tableId = 'ov-deleted-policies';
            $('#' + tableId).DataTable({
                "destroy": true, // Allows re-initialization
                "processing": true, "serverSide": true, "searchDelay": 1500, "ajax": {
                    "url": "policy-grid-data.php", "type": "GET", "data": {
                        "Contact": ContactId, "Data": "Policy", "PolicyStatus": 1
                    }
                }, 'order': [[10, 'desc']], columnDefs: [{
                    orderable: false, targets: 0
                }, {
                    'type': 'date', 'targets': [9, 10]
                }

                ]
            });
        }
    } else if (requester === 'Details') {
        tableId = 'details-policies';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "searchDelay": 1500, "ajax": {
                "url": "policy-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Policy", "PolicyStatus": 3
                }
            }, 'order': [[10, 'desc']], columnDefs: [{
                orderable: false, targets: 0
            }, {
                'type': 'date', 'targets': [9, 10]
            }

            ]
        });
    } else if (requester === 'All') {
        tableId = 'ov-policies';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "searchDelay": 1500, "ajax": {
                "url": "policy-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Policy", "PolicyStatus": 0
                }
            }, 'order': [[10, 'desc']], columnDefs: [{
                orderable: false, targets: 0
            }, {
                'type': 'date', 'targets': [9, 10]
            }

            ]
        });
        tableId = 'ov-deleted-policies';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "searchDelay": 1500, "ajax": {
                "url": "policy-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Policy", "PolicyStatus": 1
                }
            }, 'order': [[10, 'desc']], columnDefs: [{
                orderable: false, targets: 0
            }, {
                'type': 'date', 'targets': [9, 10]
            }

            ]
        });
        tableId = 'details-policies';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "searchDelay": 1500, "ajax": {
                "url": "policy-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Policy", "PolicyStatus": 3
                }
            }, 'order': [[10, 'desc']], columnDefs: [{
                orderable: false, targets: 0
            }, {
                'type': 'date', 'targets': [9, 10]
            }

            ]
        });
    }
}

function PolicyNotesTableV2(requester) {
    const ContactId = GetURLParameter("Contact");
    $.fn.dataTable.moment('MM/DD/YYYY h:mm a');

    if (requester === 'Overview' || requester === 'Details') {

        if (requester === 'Overview') {
            tableId = 'policyContactOVNotesTable';
        }

        if (requester === 'Details') {
            tableId = 'policyContactDetailsNotesTable';
        }

        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "notes-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Policy"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                orderable: false, targets: 3
            }, {
                'type': 'datetime', 'targets': 1
            }, {
                "width": "50%", "targets": 2
            }

            ]
        });
    } else if (requester === 'All') {
        tableId = 'policyContactOVNotesTable';
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "notes-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Policy"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                orderable: false, targets: 3
            }, {
                'type': 'datetime', 'targets': 1
            }, {
                "width": "50%", "targets": 2
            }

            ]
        });
        tableId = 'policyContactDetailsNotesTable';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "notes-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Policy"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                orderable: false, targets: 3
            }, {
                'type': 'datetime', 'targets': 1
            }, {
                "width": "50%", "targets": 2
            }

            ]
        });
    }
}

function PolicyRenewalsTableV2(requester) {
    PolicyId = GetURLParameter("Policy");
    $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
    if (requester === 'Overview' || requester === 'Details') {
        if (requester === 'Overview') {
            tableId = 'policyRenewalsOVTable';
        }
        if (requester === 'Details') {
            tableId = 'policyRenewalsDetailsTable';
        }
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "policy-renewals-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Policy"
                }
            }, 'order': [[0, 'desc']], columnDefs: [{
                'type': 'datetime', 'targets': 0
            }]
        });
    }
}


function PolicyPageNotesTableV2(requester) {
    PolicyId = GetURLParameter("Policy");
    $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
    if (requester === 'Overview' || requester === 'Details') {
        if (requester === 'Overview') {
            tableId = 'policyContactOVNotesTable';
        }
        if (requester === 'Details') {
            tableId = 'policyContactDetailsNotesTable';
        }
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "policy-page-notes-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Policy"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                'type': 'datetime', 'targets': 1
            }, {
                "width": "50%", "targets": 2
            }

            ]
        });
    } else if (requester === 'All') {
        tableId = 'policyContactOVNotesTable';
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "policy-page-notes-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Policy"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                'type': 'datetime', 'targets': 1
            }, {
                "width": "50%", "targets": 2
            }

            ]
        });
        tableId = 'policyContactDetailsNotesTable';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "policy-page-notes-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Policy"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                'type': 'datetime', 'targets': 1
            }, {
                "width": "50%", "targets": 2
            }

            ]
        });
    } else {

    }
}

function InvoicesTableV2(requester) {

    ContactId = GetURLParameter("Contact");
    if (requester === 'Overview' || requester === 'Details') {
        if (requester === 'Overview') {
            tableId = 'invoicesContactOVTable';
        }
        if (requester === 'Details') {
            tableId = 'invoicesContactDetailsTable';
        }
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "invoice-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Invoice"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                'type': 'date', 'targets': 1
            }]
        });
    } else if (requester === 'All') {
        tableId = 'invoicesContactOVTable';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "invoice-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Invoice"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                'type': 'date', 'targets': 1
            }]
        });
        tableId = 'invoicesContactDetailsTable';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "invoice-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Invoice"
                }
            }, 'order': [[1, 'desc']], columnDefs: [{
                'type': 'date', 'targets': 1
            }]
        });
    } else {

    }
}

function ProposalsTableV2(requester) {

    ContactId = GetURLParameter("Contact");
    if (requester === 'Overview' || requester === 'Details') {
        if (requester === 'Overview') {
            tableId = 'proposalsContactOVTable';
        }
        if (requester === 'Details') {
            tableId = 'proposalInfoDetails';
        }
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "proposal-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Proposal"
                }
            }, 'order': [[2, 'desc']], columnDefs: [{
                orderable: false, targets: 4
            }, {
                'type': 'date', 'targets': 2
            }]
        });
    } else if (requester === 'All') {
        tableId = 'proposalsContactOVTable';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "proposal-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Proposal"
                }
            }, 'order': [[2, 'desc']], columnDefs: [{
                orderable: false, targets: 4
            }, {
                'type': 'date', 'targets': 2
            }]
        });
        tableId = 'proposalInfoDetails';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "proposal-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Proposal"
                }
            }, 'order': [[2, 'desc']], columnDefs: [{
                orderable: false, targets: 4
            }, {
                'type': 'date', 'targets': 2
            }]
        });
    } else {

    }
}


function TasksTableV2(requester) {

    ContactId = GetURLParameter("Contact");
    if (requester === 'Overview' || requester === 'Details') {
        if (requester === 'Overview') {
            tableId = 'ov-tasks-table';
        }
        if (requester === 'Details') {
            tableId = 'details-tasks-table';
        }
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "tasks-grid-data-v2.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Tasks"
                }
            }, 'order': [[1, 'desc'], [0, 'asc']], columnDefs: [{
                orderable: false, targets: 7
            }, {
                'type': 'datetime', 'targets': 1
            }]
        });
    } else if (requester === 'All') {
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        tableId = 'ov-tasks-table';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "tasks-grid-data-v2.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Tasks"
                }
            }, 'order': [[1, 'desc'], [0, 'asc']], columnDefs: [{
                orderable: false, targets: 7
            }, {
                'type': 'datetime', 'targets': 1
            }]
        });
        tableId = 'details-tasks-table';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "tasks-grid-data-v2.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Tasks"
                }
            }, 'order': [[1, 'desc'], [0, 'asc']], columnDefs: [{
                orderable: false, targets: 7
            }, {
                'type': 'datetime', 'targets': 1
            }]
        });
    } else {

    }
}


function ContactsTableV2(requester) {

    if (requester === 'Active') {
        tableId = 'active-contacts-table';
    } else if (requester === 'Deleted') {
        tableId = 'deleted-contacts-table';
    } else if (requester === 'Hidden') {
        tableId = 'hidden-contacts-table';
    } else {
        return false;
    }

    $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
    $('#' + tableId).DataTable({
        destroy: true, // Allows re-initialization
        processing: true, serverSide: true, searchDelay: 1500, "ajax": {
            "url": "contacts-grid-data-v2.php", "type": "GET", "data": {
                "Status": requester, "Data": "Contacts"
            }
        }, 'order': [[0, 'asc']], columnDefs: [{
            orderable: false, targets: 7
        }]
    });
}


function pTasksTableV2(requester) {

    PolicyId = GetURLParameter("Policy");
    if (requester === 'Overview' || requester === 'Details') {
        if (requester === 'Overview') {
            tableId = 'ov-tasks-table';
        }
        if (requester === 'Details') {
            tableId = 'details-tasks-table';
        }
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "tasks-grid-data-v2.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Tasks"
                }
            }, 'order': [[1, 'desc'], [0, 'asc']], columnDefs: [{
                orderable: false, targets: 7
            }, {
                'type': 'datetime', 'targets': 1
            }]
        });
    } else if (requester === 'All') {
        $.fn.dataTable.moment('MM/DD/YYYY h:mm a');
        tableId = 'ov-tasks-table';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "tasks-grid-data-v2.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Tasks"
                }
            }, 'order': [[1, 'desc'], [0, 'asc']], columnDefs: [{
                orderable: false, targets: 7
            }, {
                'type': 'datetime', 'targets': 1
            }]
        });
        tableId = 'details-tasks-table';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "tasks-grid-data-v2.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Tasks"
                }
            }, 'order': [[1, 'desc'], [0, 'asc']], columnDefs: [{
                orderable: false, targets: 7
            }, {
                'type': 'datetime', 'targets': 1
            }]
        });
    } else {

    }
}

function PropertyInfoTableV2(requester) {

    if (requester === 'Overview' || requester === 'Details') {
        ContactId = GetURLParameter("Contact");
        if (requester === 'Overview') {
            tableId = 'ov-properties-table';
        }
        if (requester === 'Details') {
            tableId = 'details-properties-table';
        }
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "properties-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Properties"
                }
            }, 'order': [[0, 'asc']], columnDefs: [{
                orderable: false, targets: 3
            }]
        });
    } else if (requester === 'All') {
        ContactId = GetURLParameter("Contact");
        tableId = 'ov-properties-table';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "properties-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Properties"
                }
            }, 'order': [[0, 'asc']], columnDefs: [{
                orderable: false, targets: 3
            }]
        });
        tableId = 'details-properties-table';
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "properties-grid-data.php", "type": "GET", "data": {
                    "Contact": ContactId, "Data": "Properties"
                }
            }, 'order': [[0, 'asc']], columnDefs: [{
                orderable: false, targets: 3
            }]
        });
    } else if (requester === 'POverview' || requester === 'PDetails') {
        PolicyId = GetURLParameter("Policy");
        if (requester === 'POverview') {
            tableId = 'ov-properties-table';
        }
        if (requester === 'PDetails') {
            tableId = 'details-properties-table';
        }
        $('#' + tableId).DataTable({
            "destroy": true, // Allows re-initialization
            "processing": true, "serverSide": true, "ajax": {
                "url": "properties-grid-data.php", "type": "GET", "data": {
                    "Policy": PolicyId, "Data": "Properties"
                }
            }, 'order': [[0, 'asc']], columnDefs: [{
                orderable: false, targets: 3
            }]
        });
    } else {

    }
}

function getContactTabCounters() {
    ContactId = GetURLParameter("Contact");
    url = 'functions/functions.php';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: "getContactTabCounters=" + ContactId,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                Object.keys(data).forEach(function (key) {
                    if (key.startsWith("num")) {
                        const classSelector = '.' + key + 'Badge';
                        if ($(classSelector).length > 0) {
                            $(classSelector).html(data[key]);
                        }
                    }
                });
            }
            if (data && data.status !== "Got Data") {
                $('.numProposalsBadge').html('0');
                $('.numInvoicesBadge').html('0');
                $('.numPropertiesBadge').html('0');
                $('.numDriversBadge').html('0');
                $('.numVehiclesBadge').html('0');
                $('.numLinkedContactsBadge').html('0');
            }
        },
        error: function (xhr, status, error) {
        },
        complete: function () {
        }
    });
}

function getPolicyTabCounters() {
    PolicyId = GetURLParameter("Policy");
    url = 'functions/functions.php';
    $.ajax({
        timeout: 10000,
        type: "POST",
        url: url,
        data: "getPolicyTabCounters=" + PolicyId,
        success: function (data, result) {
            if (data && data.status === "Got Data") {
                Object.keys(data).forEach(function (key) {
                    if (key.startsWith("num")) {
                        const classSelector = '.' + key + 'Badge';
                        if ($(classSelector).length > 0) {
                            $(classSelector).html(data[key]);
                        }
                    }
                });
            }
            if (data && data.status !== "Got Data") {
                $('.numProposalsBadge').html('0');
                $('.numInvoicesBadge').html('0');
                $('.numPropertiesBadge').html('0');
                $('.numDriversBadge').html('0');
                $('.numVehiclesBadge').html('0');
                $('.numLinkedContactsBadge').html('0');
                $('.numPolicyRenewalsBadge').html('0');
                $('.numPolicyTasksBadge').html('0');
            }
        },
        error: function (xhr, status, error) {
        },
        complete: function () {
        }
    });
}

function cleanText(text) {
    return text
        .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // Single quotes
        .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"') // Double quotes

        // Dashes
        .replace(/[\u2013\u2014\u2015]/g, '-') // En dash, Em dash, Horizontal bar

        // Bullet points and similar symbols
        .replace(/[\u2022\u2023\u25E6\u2043\u2219\u2027\u00B7\u25D8\u25E6\u2219\u25AA]/g, '*') // Various bullet styles

        // Spaces
        .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ') // Various space characters

        // Ellipsis
        .replace(/[\u2026]/g, '...') // Ellipsis

        // Tilde
        .replace(/[\u02DC\u223C\u301C\uFF5E]/g, '~') // Tilde

        // Apostrophe
        .replace(/[\u02BC\u2019]/g, "'") // Apostrophe

        // Miscellaneous symbols that can be safely replaced with ASCII equivalents
        .replace(/[\u00A9]/g, '(c)') // Copyright
        .replace(/[\u00AE]/g, '(r)') // Registered trademark
        .replace(/[\u2122]/g, 'TM') // Trademark
        .replace(/[\u00B0]/g, ' degrees ') // Degree symbol
        .replace(/[\u00B1]/g, '+/-') // Plus-minus
        .replace(/[\u2126]/g, 'Ohm') // Ohm symbol
        .replace(/[\u00BC]/g, '1/4') // Fraction 1/4
        .replace(/[\u00BD]/g, '1/2') // Fraction 1/2
        .replace(/[\u00BE]/g, '3/4') // Fraction 3/4
        .replace(/[\u2153]/g, '1/3') // Fraction 1/3
        .replace(/[\u2154]/g, '2/3') // Fraction 2/3
        .replace(/[\u215B]/g, '1/8') // Fraction 1/8

        // Remove characters without a close ASCII approximation
        // Consider whether this is appropriate for your use case
        // .replace(/[^\x00-\x7F]/g, '') // Removes non-ASCII characters

        // Additional replacements can be added here based on specific needs
        ;
}

function sanitizeAndCleanHtml(html) {
    // Sanitize the HTML with DOMPurify
    const cleanConfig = {
        ALLOWED_TAGS: ['b', 'i', 'u', 'ul', 'ol', 'li', 'p', 'br', 'h1', 'h2', 'h3', 'strong', 'em', 'a'], // Allow basic formatting and hyperlink tags
        FORBID_TAGS: ['style', 'script', 'iframe'], // Explicitly forbid potentially harmful tags
        ALLOWED_ATTR: ['href', 'target', 'rel'], // Allow attributes necessary for links
        FORBID_ATTR: ['style'], // Forbid inline styles to prevent layout issues in emails
        KEEP_CONTENT: true // Keep the content of forbidden tags if they are removed
    };

    let sanitizedHtml = DOMPurify.sanitize(html, cleanConfig);

    // Create a temporary container to manipulate the HTML
    let container = document.createElement('div');
    container.innerHTML = sanitizedHtml;

    // Function to process each element
    function processElement(element) {
        // Example: Remove 'style' attribute to simplify style processing for email
        // Consider preserving or adjusting specific styles if needed
        element.removeAttribute('style');
    }

    // Recursively process each node in the container
    function walkAndProcess(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            processElement(node);
        } else if (node.nodeType === Node.TEXT_NODE) {
            // Clean the text node's value
            node.nodeValue = cleanText(node.nodeValue);
        }
        node.childNodes.forEach(walkAndProcess);
    }

    walkAndProcess(container);

    // Return the processed HTML as a string
    return container.innerHTML;
}

$(document).on('change', '.pCoverageSelect', function () {
    const selectedValue = $(this).val();

    if (selectedValue === 'Manual') {
        const selectElement = $(this);
        const selectId = selectElement.attr('id');
        const selectName = selectElement.attr('name');
        $(this).select2('destroy');

        // Create an input element with the same id and name, and add the placeholder
        const inputElement = $('<input>', {
            type: 'text', id: selectId, name: selectName, class: 'form-control', // Add any additional classes if needed
            placeholder: 'Please enter Custom Value' // Add the placeholder attribute
        });

        // Replace the select element with the input element
        selectElement.replaceWith(inputElement);
    }
});

$(document).on('click', '#back-to-contact', function () {
    $('#add_policy_panel').hide();
    $('#sendqbot-div').hide();
    $('#editproperty-div').hide();
    $('#editvehicle-div').hide();
    $('#editdriver-div').hide();
    $('#contactViewPanel').show();
    $('.contactPanel').show();
});

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function initDT(selector, columns, data, extraOpts = {}) {
    if ($.fn.DataTable.isDataTable(selector)) {
        $(selector).DataTable().clear().destroy();
        $(selector).empty();
    }

    return $(selector).DataTable({
        data: data,
        columns: columns,
        pageLength: 10,
        ordering: true,
        searching: true,
        fixedHeader: true,
        autoWidth: false,
        scrollX: true,
        ...extraOpts,
        drawCallback: function () {
            if (window.bootstrap?.Tooltip) {
                document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
                    if (!bootstrap.Tooltip.getInstance(el)) new bootstrap.Tooltip(el);
                });
            }
        }
    });
}