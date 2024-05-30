var OK = 200; // OK
var NG = 201; // Not good
var EX = 202; // Exception
var EPT = 203; // Empty
var PE = 999; // Not permission
var thisPageIndex = 0;
jQuery.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    beforeSend: function () {
        // window.addEventListener("keydown", preventKeydown, false);
        if (this.loadding) {
            OpenLoading();
        }
    },
    complete: function (res) {
        CloseLoading();

        var message_cd = "";
        try {

            // end add by viettd 2016/06/24
            if (typeof res.status !== undefined && res.status == 403) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: 'Cố lỗi xẩy ra' + res.status,
                    footer: ''
                })
                return;
            } else if (res.status == 422) {
                // Validate Error
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: 'Cố lỗi xẩy ra' + res.status,
                    footer: ''
                })
                return;
            } else if (res.status == 419) {
                // Validate Error
                location.reload();
                return;
            } else if (res.status == 501) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: 'Cố lỗi xẩy ra' + res.status,
                    footer: ''
                })
                return;
            } else if (res.status == 599) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: 'Cố lỗi xẩy ra' + res.status,
                    footer: ''
                })
                return;
            } else if (res.status == 503) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: 'Cố lỗi xẩy ra' + res.status,
                    footer: ''
                })
                return;
            } else if (res.status == 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi...',
                    text: 'Cố lỗi xẩy ra' + res.status,
                    footer: ''
                })
                return;
            }
        } catch (e) {
            alert('ajaxSetup: ' + e.message);
        }


    }
});


$(document).ready(function () {
    try {
        $('.input').attr("autocomplete", "off");
        $('#password').attr("autocomplete", "new-password");

        if ($("select.select2").length > 0) {
            $('select.select2').select2({ width: '100%' });
        }
        setActiveMenu();


        if ($(".format-price").length > 0) {
            $(".format-price").priceFormat({
                limit: 13,
                prefix: '',
                centsLimit: 0
            });
        }



        $(document).on('click', '.open_loading', function (event) {
            try {
                OpenLoading();
            } catch (e) {
                alert('minicart-item-remove:' + e.message);
            }
        });

        $(document).on('click', '.goto', function (event) {
            try {
                OpenLoading();
                var href = $(this).attr("href");
                location.href = href
            } catch (e) {
                alert('minicart-item-remove:' + e.message);
            }
        });

        $(document).on('click', '.remove-files-upload', function () {

            var target = $(this).closest(".div_image_upload").find(".upload_div_fm");
            $(this).parents(".image_view_multi_upload").remove();
            target.removeClass("hidden");
        });

        $(document).on('click', '.open-image', function (e) {
            e.preventDefault();
            $(this).ekkoLightbox();
        });

        $(document).on('click', '.btn_submit', function (e) {
            OpenLoading();
        });

        $(document).on('click', '[name="sale_rules"]', function () {
            var shipping_method = $('input[name=sale_rules]:checked').val();
            $("#coupon_code").val(shipping_method);

        });


        $(document).on('change', '.change_status_table', function (e) {
            var table = $(this).attr("table");
            var table_column = $(this).attr("table_column");
            var table_id = $(this).attr("table_id");

            var table_value = 0;
            if ($(this).is(':checked')) {
                table_value = 1
            }

            var data = {};
            data['table'] = table;
            data['table_column'] = table_column;
            data['table_id'] = table_id;
            data['table_value'] = table_value;

            $.ajax({
                url: "/common/update_attr",
                method: "POST",
                loadding: true,
                data: data,
                success: function (res) {
                    switch (res['status']) {
                        // success
                        case 200:
                            showMiniMessage(res['message'])
                            break;
                        case 201:
                            showMessageError(res.message)
                            break;
                        default:

                            showMessageError(res.message)
                            break;
                    }
                },
                error: function () {
                    // location.reload();
                }
            });

        });







        $(document).on("click", ".btn_delete", function () {
            let url = $(this).data("url");
            let method = $(this).data("method");
            if (method == undefined || method == '') {
                method = "DELETE"
            }
            let item_id =  $(this).data("item_id");
            let data = {};
            data['item_id'] = item_id;

            var tr = $(this).parents("tr");
            Swal.fire({
                title: "Bạn có chắc chắn xóa?",
                text: "Dữ liệu bị xóa sẽ không thể khôi phục được!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Xóa!",
                cancelButtonText: "Hủy",
                reverseButtons: true,
            })
                .then((result) => {
                    if (result.isConfirmed) {

                        $.ajax({
                            url: url,
                            method: method,
                            data: data,
                            loadding: true,
                            success: function (res) {
                                switch (res['status']) {
                                    // success
                                    case 200:
                                        showMiniMessage("Xóa thành công")
                                        tr.remove();
                                        break;
                                    case 201:
                                        showMessageError(res.message)
                                        break;
                                    default: showMessageError(res.message)
                                        break;
                                }
                            },
                            error: function () {
                                // location.reload();
                            }
                        });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        return 0;
                    }
                });
        });



        $(document).on("click", ".goto_category", function () {
        });


        $(document).on("click", ".btn_clear_cache", function () {
            $.ajax({
                url: "/common/clear_cache",
                method: "POST",
                loadding: true,
                success: function (res) {
                    switch (res['status']) {
                        // success
                        case 200:
                            showMiniMessage("Xóa thành công")
                            break;
                        case 201:
                            showMessageError(res.message)
                            break;
                        default:

                            break;
                    }
                },
                error: function () {
                    // location.reload();
                }
            });
        });

        $(document).on("click", ".btn_admin_doi_soat", function () {
            $.ajax({
                url: "/common/doi_soat_tien",
                method: "POST",
                loadding: true,
                success: function (res) {
                    switch (res['status']) {
                        // success
                        case 200:
                            showMiniMessage("Đối xoát thành công")
                            break;
                        case 201:
                            showMessageError(res.message)
                            break;
                        default:

                            break;
                    }
                },
                error: function () {
                    // location.reload();
                }
            });
        });

        $(document).on("click", "#menu-div-ipad", function () {
            $('#menu-ipad-air').show(); //class selector for the div to show
        });
        $(document).on("click", ".close_button", function () {
            $('#menu-ipad-air').hide(); //class selector for the div to show
        });




    } catch (e) {
        console.log('ready:' + e.message);
    }
});

function setActiveMenu() {
    try {
        var url = window.location.href;
        if (url.includes("category/")) {
            $(".menu_category").addClass("active");
        } else if (url.includes("customer/")) {
            $(".menu_customer").addClass("active");
        } else {
            $(".menu_home").addClass("active");
        }

        // Load or create a history array
        _pageHistory_test = JSON.parse(sessionStorage.pageHistory_Back || '[]');

        // Find this page in history
        thisPageIndex = _pageHistory_test.indexOf(window.location.pathname);

        // If this page was not in the history, add it to the top of the stack
        if (thisPageIndex < 0) {
            _pageHistory_test.push(window.location.pathname);
            thisPageIndex = _pageHistory_test.length - 1;

            // Wipe the forward history
        } else if (thisPageIndex < _pageHistory_test.length - 1) {
            for (; thisPageIndex < _pageHistory_test.length - 1;)
                _pageHistory_test.pop();
        }

        // Store history array   
        sessionStorage.pageHistory_Back = JSON.stringify(_pageHistory_test);


    } catch (e) {
        console.log('setActiveMenu:' + e.message);
    }

}

function goBack() {
    // OpenLoading(); 

    if (thisPageIndex > 0) {
        window.location.href = _pageHistory_test[thisPageIndex - 1];
        return;
    }


    var history_url = localStorage.getItem('history_url');
    console.log(history_url);
    if (history_url) {
    } else {
        history_url = "/";
    }
    location.href = "/";


    // window.location.replace(document.referrer);
}



function _validate(element) {
    if (!element) {
        element = $('body');
    }
    var error = 0;
    try {
        _clearErrors();
        // validate required
        var message = "yêu cầu nhập";
        element.find('.required:enabled').each(function () {
            if ($(this).is(':visible') || typeof $(this).parents('.w-result-tabs').html() != 'undefined') {
                if (($(this).is("input") || $(this).is("textarea")) && $.trim($(this).val()) == '') {
                    $(this).addClass("textbox-error");
                    error++;
                } else if ($(this).is("select") && ($(this).val() == '' || $(this).val() == undefined)) {
                    $(this).addClass("textbox-error");
                    error++;
                }
            }
        });


        if (error > 0) {
            _focusErrorItem();
            return false;
        } else {
            return true;
        }
    } catch (e) {
        alert('_validate: ' + e.toString());
    }
}




function _addError(element, messsage) {
    if (element == "") {
        return;
    }
    var error = 0;
    try {
        _clearErrors();
        $(element).addClass("textbox-error");
        $(element + "_error").removeClass("d-none").html(messsage);
        error++;

        if (error > 0) {
            _focusErrorItem();
            return false;
        } else {
            return true;
        }
    } catch (e) {
        alert('_addError: ' + e.toString());
    }
}


/**
 * Find first error item and focus it
 */
function _focusErrorItem() {
    try {
        $('.textbox-error:first').focus();
        $('.boder-error:first').focus();
        $('.boder-error:first').closest('.num-length').find(".textbox-error").removeClass("hide");
    } catch (e) {
        alert('_focusErrorItem: ' + e.message);
    }
}

/**
 * Clear all red items. Call when no error detected.
 */
function _clearErrors() {
    try {

        $('.small_error').html("").addClass("d-none");
        $('.textbox-error').removeClass("textbox-error");
        $('input,select,textarea').removeClass('boder-error');

        $(".boder-error").removeClass("boder-error");
        $(".text-danger").addClass("Hidden")

    } catch (e) {
        alert('_clearErrors' + e.message);
    }
}




function changeToSlug(value) {

    var title, slug;
    title = value;
    slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
}



function OpenLoading() {
    $('.loadding').show();
}

function CloseLoading() {
    $('.loadding').hide();
}


// warning, error, success, info, and question
function showMessage(icon = "error", title = "Lỗi", text = "Lỗi hệ thống") {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    }).then((e) => {
        if (callback) {
            callback();
        }
    });

}

function showMessageError(text = "Lỗi hệ thống", callback) {
    Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: text,
    }).then((e) => {
        if (callback) {
            callback();
        }
    });
}

// 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'.
function showMessageSuccess(text = "Thành công", position = "center", callback) {
    Swal.fire({
        position: position,
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 2500
    }).then((e) => {
        if (callback) {
            callback();
        }
    });
}



function jConfirm($text = 'Bạn có chắc xóa thông tin đơn hàng', callback) {
    Swal.fire({
        title: 'Bạn có chắc?',
        text: $text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chấp nhận',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            if (callback) {
                callback();
            }
        }
    })
}

function showMiniMessage(title = "Thành công", icon = "success", position = "top-end") {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: title
    })

}




function slugify(str) {
    str = String(str).toString();
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();

    const swaps = {
        '0': ['°', '₀', '۰', '０'],
        '1': ['¹', '₁', '۱', '１'],
        '2': ['²', '₂', '۲', '２'],
        '3': ['³', '₃', '۳', '３'],
        '4': ['⁴', '₄', '۴', '٤', '４'],
        '5': ['⁵', '₅', '۵', '٥', '５'],
        '6': ['⁶', '₆', '۶', '٦', '６'],
        '7': ['⁷', '₇', '۷', '７'],
        '8': ['⁸', '₈', '۸', '８'],
        '9': ['⁹', '₉', '۹', '９'],
        'a': ['à', 'á', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ā', 'ą', 'å', 'α', 'ά', 'ἀ', 'ἁ', 'ἂ', 'ἃ', 'ἄ', 'ἅ', 'ἆ', 'ἇ', 'ᾀ', 'ᾁ', 'ᾂ', 'ᾃ', 'ᾄ', 'ᾅ', 'ᾆ', 'ᾇ', 'ὰ', 'ά', 'ᾰ', 'ᾱ', 'ᾲ', 'ᾳ', 'ᾴ', 'ᾶ', 'ᾷ', 'а', 'أ', 'အ', 'ာ', 'ါ', 'ǻ', 'ǎ', 'ª', 'ა', 'अ', 'ا', 'ａ', 'ä'],
        'b': ['б', 'β', 'ب', 'ဗ', 'ბ', 'ｂ'],
        'c': ['ç', 'ć', 'č', 'ĉ', 'ċ', 'ｃ'],
        'd': ['ď', 'ð', 'đ', 'ƌ', 'ȡ', 'ɖ', 'ɗ', 'ᵭ', 'ᶁ', 'ᶑ', 'д', 'δ', 'د', 'ض', 'ဍ', 'ဒ', 'დ', 'ｄ'],
        'e': ['é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'ë', 'ē', 'ę', 'ě', 'ĕ', 'ė', 'ε', 'έ', 'ἐ', 'ἑ', 'ἒ', 'ἓ', 'ἔ', 'ἕ', 'ὲ', 'έ', 'е', 'ё', 'э', 'є', 'ə', 'ဧ', 'ေ', 'ဲ', 'ე', 'ए', 'إ', 'ئ', 'ｅ'],
        'f': ['ф', 'φ', 'ف', 'ƒ', 'ფ', 'ｆ'],
        'g': ['ĝ', 'ğ', 'ġ', 'ģ', 'г', 'ґ', 'γ', 'ဂ', 'გ', 'گ', 'ｇ'],
        'h': ['ĥ', 'ħ', 'η', 'ή', 'ح', 'ه', 'ဟ', 'ှ', 'ჰ', 'ｈ'],
        'i': ['í', 'ì', 'ỉ', 'ĩ', 'ị', 'î', 'ï', 'ī', 'ĭ', 'į', 'ı', 'ι', 'ί', 'ϊ', 'ΐ', 'ἰ', 'ἱ', 'ἲ', 'ἳ', 'ἴ', 'ἵ', 'ἶ', 'ἷ', 'ὶ', 'ί', 'ῐ', 'ῑ', 'ῒ', 'ΐ', 'ῖ', 'ῗ', 'і', 'ї', 'и', 'ဣ', 'ိ', 'ီ', 'ည်', 'ǐ', 'ი', 'इ', 'ی', 'ｉ'],
        'j': ['ĵ', 'ј', 'Ј', 'ჯ', 'ج', 'ｊ'],
        'k': ['ķ', 'ĸ', 'к', 'κ', 'Ķ', 'ق', 'ك', 'က', 'კ', 'ქ', 'ک', 'ｋ'],
        'l': ['ł', 'ľ', 'ĺ', 'ļ', 'ŀ', 'л', 'λ', 'ل', 'လ', 'ლ', 'ｌ'],
        'm': ['м', 'μ', 'م', 'မ', 'მ', 'ｍ'],
        'n': ['ñ', 'ń', 'ň', 'ņ', 'ŉ', 'ŋ', 'ν', 'н', 'ن', 'န', 'ნ', 'ｎ'],
        'o': ['ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ø', 'ō', 'ő', 'ŏ', 'ο', 'ὀ', 'ὁ', 'ὂ', 'ὃ', 'ὄ', 'ὅ', 'ὸ', 'ό', 'о', 'و', 'θ', 'ို', 'ǒ', 'ǿ', 'º', 'ო', 'ओ', 'ｏ', 'ö'],
        'p': ['п', 'π', 'ပ', 'პ', 'پ', 'ｐ'],
        'q': ['ყ', 'ｑ'],
        'r': ['ŕ', 'ř', 'ŗ', 'р', 'ρ', 'ر', 'რ', 'ｒ'],
        's': ['ś', 'š', 'ş', 'с', 'σ', 'ș', 'ς', 'س', 'ص', 'စ', 'ſ', 'ს', 'ｓ'],
        't': ['ť', 'ţ', 'т', 'τ', 'ț', 'ت', 'ط', 'ဋ', 'တ', 'ŧ', 'თ', 'ტ', 'ｔ'],
        'u': ['ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'û', 'ū', 'ů', 'ű', 'ŭ', 'ų', 'µ', 'у', 'ဉ', 'ု', 'ူ', 'ǔ', 'ǖ', 'ǘ', 'ǚ', 'ǜ', 'უ', 'उ', 'ｕ', 'ў', 'ü'],
        'v': ['в', 'ვ', 'ϐ', 'ｖ'],
        'w': ['ŵ', 'ω', 'ώ', 'ဝ', 'ွ', 'ｗ'],
        'x': ['χ', 'ξ', 'ｘ'],
        'y': ['ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ', 'ÿ', 'ŷ', 'й', 'ы', 'υ', 'ϋ', 'ύ', 'ΰ', 'ي', 'ယ', 'ｙ'],
        'z': ['ź', 'ž', 'ż', 'з', 'ζ', 'ز', 'ဇ', 'ზ', 'ｚ'],
        'aa': ['ع', 'आ', 'آ'],
        'ae': ['æ', 'ǽ'],
        'ai': ['ऐ'],
        'ch': ['ч', 'ჩ', 'ჭ', 'چ'],
        'dj': ['ђ', 'đ'],
        'dz': ['џ', 'ძ'],
        'ei': ['ऍ'],
        'gh': ['غ', 'ღ'],
        'ii': ['ई'],
        'ij': ['ĳ'],
        'kh': ['х', 'خ', 'ხ'],
        'lj': ['љ'],
        'nj': ['њ'],
        'oe': ['ö', 'œ', 'ؤ'],
        'oi': ['ऑ'],
        'oii': ['ऒ'],
        'ps': ['ψ'],
        'sh': ['ш', 'შ', 'ش'],
        'shch': ['щ'],
        'ss': ['ß'],
        'sx': ['ŝ'],
        'th': ['þ', 'ϑ', 'ث', 'ذ', 'ظ'],
        'ts': ['ц', 'ც', 'წ'],
        'ue': ['ü'],
        'uu': ['ऊ'],
        'ya': ['я'],
        'yu': ['ю'],
        'zh': ['ж', 'ჟ', 'ژ'],
        '(c)': ['©'],
        'A': ['Á', 'À', 'Ả', 'Ã', 'Ạ', 'Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'Å', 'Ā', 'Ą', 'Α', 'Ά', 'Ἀ', 'Ἁ', 'Ἂ', 'Ἃ', 'Ἄ', 'Ἅ', 'Ἆ', 'Ἇ', 'ᾈ', 'ᾉ', 'ᾊ', 'ᾋ', 'ᾌ', 'ᾍ', 'ᾎ', 'ᾏ', 'Ᾰ', 'Ᾱ', 'Ὰ', 'Ά', 'ᾼ', 'А', 'Ǻ', 'Ǎ', 'Ａ', 'Ä'],
        'B': ['Б', 'Β', 'ब', 'Ｂ'],
        'C': ['Ç', 'Ć', 'Č', 'Ĉ', 'Ċ', 'Ｃ'],
        'D': ['Ď', 'Ð', 'Đ', 'Ɖ', 'Ɗ', 'Ƌ', 'ᴅ', 'ᴆ', 'Д', 'Δ', 'Ｄ'],
        'E': ['É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ', 'Ë', 'Ē', 'Ę', 'Ě', 'Ĕ', 'Ė', 'Ε', 'Έ', 'Ἐ', 'Ἑ', 'Ἒ', 'Ἓ', 'Ἔ', 'Ἕ', 'Έ', 'Ὲ', 'Е', 'Ё', 'Э', 'Є', 'Ə', 'Ｅ'],
        'F': ['Ф', 'Φ', 'Ｆ'],
        'G': ['Ğ', 'Ġ', 'Ģ', 'Г', 'Ґ', 'Γ', 'Ｇ'],
        'H': ['Η', 'Ή', 'Ħ', 'Ｈ'],
        'I': ['Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị', 'Î', 'Ï', 'Ī', 'Ĭ', 'Į', 'İ', 'Ι', 'Ί', 'Ϊ', 'Ἰ', 'Ἱ', 'Ἳ', 'Ἴ', 'Ἵ', 'Ἶ', 'Ἷ', 'Ῐ', 'Ῑ', 'Ὶ', 'Ί', 'И', 'І', 'Ї', 'Ǐ', 'ϒ', 'Ｉ'],
        'J': ['Ｊ'],
        'K': ['К', 'Κ', 'Ｋ'],
        'L': ['Ĺ', 'Ł', 'Л', 'Λ', 'Ļ', 'Ľ', 'Ŀ', 'ल', 'Ｌ'],
        'M': ['М', 'Μ', 'Ｍ'],
        'N': ['Ń', 'Ñ', 'Ň', 'Ņ', 'Ŋ', 'Н', 'Ν', 'Ｎ'],
        'O': ['Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'Ø', 'Ō', 'Ő', 'Ŏ', 'Ο', 'Ό', 'Ὀ', 'Ὁ', 'Ὂ', 'Ὃ', 'Ὄ', 'Ὅ', 'Ὸ', 'Ό', 'О', 'Θ', 'Ө', 'Ǒ', 'Ǿ', 'Ｏ', 'Ö'],
        'P': ['П', 'Π', 'Ｐ'],
        'Q': ['Ｑ'],
        'R': ['Ř', 'Ŕ', 'Р', 'Ρ', 'Ŗ', 'Ｒ'],
        'S': ['Ş', 'Ŝ', 'Ș', 'Š', 'Ś', 'С', 'Σ', 'Ｓ'],
        'T': ['Ť', 'Ţ', 'Ŧ', 'Ț', 'Т', 'Τ', 'Ｔ'],
        'U': ['Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'Û', 'Ū', 'Ů', 'Ű', 'Ŭ', 'Ų', 'У', 'Ǔ', 'Ǖ', 'Ǘ', 'Ǚ', 'Ǜ', 'Ｕ', 'Ў', 'Ü'],
        'V': ['В', 'Ｖ'],
        'W': ['Ω', 'Ώ', 'Ŵ', 'Ｗ'],
        'X': ['Χ', 'Ξ', 'Ｘ'],
        'Y': ['Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ', 'Ÿ', 'Ῠ', 'Ῡ', 'Ὺ', 'Ύ', 'Ы', 'Й', 'Υ', 'Ϋ', 'Ŷ', 'Ｙ'],
        'Z': ['Ź', 'Ž', 'Ż', 'З', 'Ζ', 'Ｚ'],
        'AE': ['Æ', 'Ǽ'],
        'Ch': ['Ч'],
        'Dj': ['Ђ'],
        'Dz': ['Џ'],
        'Gx': ['Ĝ'],
        'Hx': ['Ĥ'],
        'Ij': ['Ĳ'],
        'Jx': ['Ĵ'],
        'Kh': ['Х'],
        'Lj': ['Љ'],
        'Nj': ['Њ'],
        'Oe': ['Œ'],
        'Ps': ['Ψ'],
        'Sh': ['Ш'],
        'Shch': ['Щ'],
        'Ss': ['ẞ'],
        'Th': ['Þ'],
        'Ts': ['Ц'],
        'Ya': ['Я'],
        'Yu': ['Ю'],
        'Zh': ['Ж'],
    };

    Object.keys(swaps).forEach((swap) => {
        swaps[swap].forEach(s => {
            str = str.replace(new RegExp(s, "g"), swap);
        })
    });
    return str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-") // collapse dashes
        .replace(/^-+/, "") // trim - from start of text
        .replace(/-+$/, "");
}

function formatFileSize(size) {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

function convertDate(dateString) {
    try {

        var p = dateString.split(/\D/g)
        return [p[2], p[1], p[0]].join("-")
    } catch (error) {

    }
}
