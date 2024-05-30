
$(function () {
    try {
        initialize();
    } catch (e) {
        console.log('initialize: ' + e.message);
    }
});

/*
* initEvents
* @author    : baonc – baonc@ans-asia.com - create
* @author    :
* @return    : null
* @access    : public
* @see       : init
*/
function initialize() {
    try {

        getDiscount();

        $('.choose_product').each(function () {
            var checked_all = true;
            if (!$(this).is(':checked')) {
                checked_all = false;
            }

            $(".checkbox_all").prop("checked", checked_all);
        });


        $(document).on('click', '.coupon_choose', function (e) {
            e.preventDefault();
            try {
                if ($(".coupon_choose").hasClass("active")) {
                    $(".coupon_choose").removeClass("active");
                    $(".applycode").removeClass("active");
                } else {
                    $(".coupon_choose").addClass("active");
                    $(".applycode").addClass("active");
                }

            } catch (ex) {
                alert('#delete_product: ' + ex.message);
            }
        });

        $(document).on('click', '.submitorder', function (e) {
            e.preventDefault();
            try {
                var count = 0;
                $('.choose_product').each(function () {
                    if ($(this).is(':checked')) {
                        count = count + 1;
                    }
                });
                if (count > 0) {
                    location.href = "/checkout/confirm"
                } else {
                    showMessage("info", "Cảnh báo", "Hãy  chọn một sản phẩm nhé...")
                }

            } catch (ex) {
                alert('#delete_product: ' + ex.message);
            }
        });

        $(document).on('click', '.delete_product', function (e) {
            e.preventDefault();
            try {
                var item_id = $(this).attr("item_id");
                deleteProductCart(item_id)
            } catch (ex) {
                alert('#delete_product: ' + ex.message);
            }
        });



        $(document).on('click', '.choose_product', function (e) {
            try {
                var item_id = $(this).attr("item_id");
                if ($(this).is(':checked')) {
                    updateStatusItem(item_id, 1);
                } else {
                    updateStatusItem(item_id, 0);
                }

            } catch (ex) {
                alert('#choose_product: ' + ex.message);
            }
        });



        $(document).on('click', '.btn_change_address_detail', function (e) {
            e.preventDefault();
            try {

                var address_id = $(this).attr("address_id");
                var address_name = $(this).attr("address_name");
                var address_phone = $(this).attr("address_phone");
                var address_user = $(this).attr("address_user");

                $("#address_id").val(address_id);
                $(".address_name").html(address_name);
                $(".address_phone").html(address_phone);
                $(".address_user").html(address_user);
                // $('#change_address_modal').hide();
                // $(document.body).removeClass('modal-open');


            } catch (ex) {
                alert('#btn-back: ' + ex.message);
            }
        });

        $(document).on('click', '.minus', function(e) {
            e.preventDefault();
            try {

                var item_id = $(this).attr("item_id");
                var input = $(this).closest('.product-item').find('.number_qty');
                var value = input.val() * 1;
                if (value > 1) {
                    value = value - 1;
                   // $("#number_qty").val(number_qty).trigger("change");
                    input.val(value).trigger("change");
                }

            } catch (ex) {
                alert('#btn-back: ' + ex.message);
            }
        });
        $(document).on('click', '.plus', function(e) {
            e.preventDefault();
            try {
                var item_id = $(this).attr("item_id");
                var input = $(this).closest('.product-item').find('.number_qty');
                var value = input.val() * 1;
                value = value + 1;
                input.val(value).trigger("change");
              //  $("#number_qty").val(number_qty).trigger("change");

            } catch (ex) {
                alert('#btn-back: ' + ex.message);
            }
        });
        $(document).on('change', '#number_qty', function(e) {
            e.preventDefault();
            try {
                var item_id = $(this).attr("item_id");
                var number_qty = $(this).val() * 1;
                changeQtyCart(item_id, number_qty);
            } catch (ex) {
                alert('#btn-back: ' + ex.message);
            }
        });

        $(document).on('click', '.checkbox_all', function (e) {
            try {
                if ($(this).is(':checked')) {
                    $(".choose_product").prop("checked", true);
                } else {
                    $(".choose_product").prop("checked", false);
                }


                $('.choose_product').each(function () {
                    var item_id = $(this).attr("item_id");

                    if ($(this).is(':checked')) {
                        updateStatusItem(item_id, 1);
                    } else {
                        updateStatusItem(item_id, 0);
                    }
                });




                // $(".choose_product").trigger("click");


            } catch (ex) {
                alert('#btn-back: ' + ex.message);
            }
        });

        $('#province').change(function () {
            if (this.value) {
                $.ajax({
                    url: "{{ url('checkout/getcities') }}/" + this.value,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {

                        $("#district").empty();
                        $("#district").append('<option value="">Chọn quận huyện</option>');
                        $.each(data, function (key, value) {
                            $("#district").append('<option value="' + key + '">' +
                                value + '</option>');
                        });
                    }
                });
            }
        });

        if ($("input[name='address_id']").length > 0 && $("input[name='address_id']").val() != '') {

            var ship = $('input[name=shipping_method]:checked').val();

            $.ajax({
                url: "{{ url('checkout/shippingfee') }}",
                type: "POST",
                data: {
                    address_id: $("input[name='address_id']").val(),
                    shipping: ship
                },
                dataType: "json",
                success: function (data) {
                    $('#' + ship + '_amount').html(data['total_fee']);
                    $('#shipping_fee').show();
                    $('#shipping_fee_amonut').html(data['total_fee']);
                    $('#grand_total').html(data['grand_total']);

                }
            });
        }

        $('#district').change(function () {

            if (this.value) {

                $.ajax({
                    url: "{{ url('checkout/getdistricts') }}/" + this.value,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {

                        $("#ward").empty();
                        $("#ward").append('<option value="">Chọn phường xã</option>');
                        $.each(data, function (key, value) {
                            $("#ward").append('<option value="' + key + '">' +
                                value + '</option>');
                        });
                    }
                });
            }

        });

        $('#ward').change(function () {

            if (this.value) {

                var ship = $('input[name=shipping_method]:checked').val();
                $.ajax({
                    url: "{{ url('checkout/shippingfee') }}",
                    type: "POST",
                    data: {
                        province_id: $('#province').val(),
                        city_id: $('#district').val(),
                        ward_id: this.value,
                        shipping: ship
                    },
                    dataType: "json",
                    success: function (data) {
                        $('#' + ship + '_amount').html(data['total_fee']);
                        $('#shipping_fee').show();
                        $('#shipping_fee_amonut').html(data['total_fee']);
                        $('#grand_total').html(data['grand_total']);

                    }
                });
            }
        });

        $('#insert_address').click(function () {
            $('#fullname_error').html('');
            $('#telephone_error').html('');
            $('#address_error').html('');
            $('#province_error').html('');
            $('#district_error').html('');
            $('#ward_error').html('');

            var formData = {};
            formData['fullname'] = $("#fullname").val();
            formData['telephone'] = $("#telephone").val();
            formData['province'] = $("#province").val();
            formData['district'] = $("#district").val();
            formData['ward'] = $("#ward").val();
            formData['address'] = $("#address").val();
            formData['default_address'] = $("#default_address").val();
            $.ajax({
                url: "{{ route('customer.storeaddress') }}",
                type: 'POST',
                data: formData,
                success: function (data) {

                    if (data.errors) {

                        if (data.errors.fullname) {
                            $('#fullname_error').html(data.errors.fullname[0]);
                        }
                        if (data.errors.telephone) {
                            $('#telephone_error').html(data.errors.telephone[0]);
                        }


                        if (data.errors.province) {
                            $('#province_error').html(data.errors.province[0]);
                        }

                        if (data.errors.district) {
                            $('#district_error').html(data.errors.district[0]);
                        }

                        if (data.errors.ward) {
                            $('#ward_error').html(data.errors.ward[0]);
                        }

                        if (data.errors.address) {
                            $('#address_error').html(data.errors.address[0]);
                        }
                    }
                    if (data.success) {
                        // window.location = "{{ route('checkout.index') }}";
                        location.reload();
                    }
                }
            });
        });

        $(document).on('click', '#apply_coupon', function () {
            try {
                var data = {};
                coupon_code = $("#coupon_code").val();
                data['coupon_code'] = coupon_code;
                $.ajax({
                    url: "/checkout/coupon",
                    type: 'POST',
                    data: data,
                    loadding: true,
                    success: function (data) {

                        if (data.errors) {
                            if (data.errors.coupon_code) {
                                $('#coupon_error').removeClass("d-none").html(data.message);
                                $('#coupon_code').val(coupon_code);
                            }
                        }

                        if (data.success) {

                            $('#apply_coupon').hide();
                            $('#remove_coupon').show();
                            $('#coupon_error').removeClass("d-none").html(data['message']);
                            $("#summary__coupon .btn-close").click()

                            getTotal()
                        } else {
                        }
                    },
                });
            } catch (e) {
                alert('#apply_coupon: ' + e.message);
            }
        });



        $('#remove_coupon').click(function () {

            $.ajax({
                url: "{{ route('checkout.removecoupon') }}",
                type: 'POST',
                data: {
                    'coupon_code': $('#coupon_code').val()
                },
                success: function (data) {
                    if (data.errors) {
                        if (data.errors.coupon_code) {
                            $('#coupon_error').html(data.errors.coupon_code[0]);
                            $('#coupon_code').val('');
                        }
                    }

                    if (data.success) {

                        $('#apply_coupon').show();
                        $('#remove_coupon').hide();
                        $('#coupon_error').html('');
                        $('#coupon_code').val('');
                        getTotal()
                    }
                }
            });
        });

        $('#placeorder').click(function () {

            var eventForm = $("#placeorder_form");

            var formData = eventForm.serialize();

            $('#address_id_error').html('');
            $('#shipping_error').html('');
            $('#payment_error').html('');

            $.ajax({
                url: "{{ route('checkout.placeorder') }}",
                type: 'POST',
                data: formData,
                success: function (data) {

                    if (data.errors) {
                        if (data.errors.address_id) {
                            $('#address_id_error').html(data.errors.address_id[0]);
                            $("#shipping_address").show();
                        }
                        if (data.errors.shipping_method) {
                            $('#shipping_error').html(data.errors.shipping_method[0]);
                        }
                        if (data.errors.payment_method) {
                            $('#payment_error').html(data.errors.payment_method[0]);
                        }

                        if (data.errors.fullname) {
                            $('#fullname_error').html(data.errors.fullname[0]);
                        }

                        if (data.errors.telephone) {
                            $('#telephone_error').html(data.errors.telephone[0]);
                        }


                        if (data.errors.province) {
                            $('#province_error').html(data.errors.province[0]);
                        }

                        if (data.errors.district) {
                            $('#district_error').html(data.errors.district[0]);
                        }

                        if (data.errors.ward) {
                            $('#ward_error').html(data.errors.ward[0]);
                        }

                        if (data.errors.street) {
                            $('#address_error').html(data.errors.street[0]);
                        }

                        //console.log(data[0].items);

                        if (data[0].items) {

                            data[0].items.forEach((id) => {

                                $('#item_error_' + id).show();

                            });
                        }

                    }

                    if (data.redirect) {

                        window.location = data.url;
                    }
                    if (data.success) {

                        window.location = "{{ route('checkout.success') }}" +
                            "?increment_id=" + data.sale_id;

                    }
                },
            });



        });
        $('#wallet_choose').click(function () {

            $.ajax({
                url: "{{ route('sales.get_wallet') }}",
                type: 'POST',
                data: {
                    data: ''
                },
                success: function (data) {
                    if (data.status != 200) {

                        if (data.message) {
                            $('#wallet_error').html(data.message);
                        }
                    }

                    if (data.status == 200) {
                        $('#point').html('(' + data.data.point.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }) + ')');
                    }
                },
            });

        });

        $('#wallet_apply').click(function () {
            var wallet_value = $("input[name='wallet_value']").val();
            if (!_validate($("#summary__wallet"))) {
                return;
            }
            $.ajax({
                url: "{{ route('sales.apply_wallet') }}",
                type: 'POST',
                data: {
                    wallet_value: wallet_value,
                    grand_total: $("#grand_total").text(),
                },
                success: function (data) {
                    if (data.status != 200) {
                        if (data.message) {
                            $('#wallet_error').html(data.message);
                        }
                    }
                    if (data.status == 200) {
                        getTotal()
                    } else if (data.status == 202) {
                        $('#wallet_error').html(data.message);
                    }
                },
            });
        });
    } catch (e) {
        console.log('initialize: ' + e.message);
    }
};


function getTotal() {
    $.ajax({
        url: "/checkout/gettotal",
        type: 'POST',
        success: function (data) {
            if (data['discount'] > 0) {
                $('#discount').show();
                $('.discount_mobile').removeClass("d-none");

                $('#discount_amount').html(data['discount_amount']);
                $('#discount_amount_web').html(data['discount_amount']);
                $('.coupon_code_view').html("Mã giảm giá(" + data['coupon_code'] + ")");
            } else {
                $('#discount').hide();
                $('.discount_mobile').addClass("d-none");
            }

            if (data['wallet_value'] > 0) {
                $('#li_wallet_value').show();
                $('.wallet_value_mobile').removeClass("d-none");
                $('#wallet_value_view').html(data['wallet_value_view']);

                $('#checkout_custom_popup').hide();
            } else {
                $('#li_wallet_value').hide();
                $('.wallet_value_mobile').addClass("d-none");
            }
            $("#summary__wallet .btn-close").click();
            $('#grand_total').html(data['grand_total']);
            $('.grand_total_total_view').html(data['grand_total']);
        }
    });
}



function getDiscount() {
    $.ajax({
        url: "/checkout/get_discount",
        type: 'POST',
        success: function (data) {
            if (data.status == 200) {
                $(".list_giam_gia").html(data.body)
            }
        }
    });
}

function changeQtyCart(item_id, qty_product_cart) {
    $.ajax({
        url: "/cart/qtychange",
        type: "post",
        dataType: "json",
        data: {
            item_id: item_id,
            qty: qty_product_cart,
        },
        success: function (res) {
            $(".total_data").html(res.data_detail_cart);
            $(".grand_total_total_view").html(res.grand_total);
            $(".temp-total-money").html(res.grand_total);
            $(".subtotal_view").html(res.subtotal);
            $(".discount_amount_web").html(res.discount_amount);


            getDiscount();
        }
    });
}

function deleteProductCart(item_id) {
    $.ajax({
        url: "/cart/removeitem",
        type: "post",
        dataType: "json",
        data: {
            item_id: item_id,
        },
        success: function (res) {
            if (res.status == 200) {
                $(".product_item_" + item_id).remove();

                $(".grand_total_total_view").html(res.grand_total);
                $(".temp-total-money").html(res.grand_total);
                $(".subtotal_view").html(res.subtotal);
                $(".discount_amount_web").html(res.discount_amount);

                getDiscount();
            }
            if (res.status == 205) {
                location.reload();
            }

        }
    });
}

function updateStatusItem(item_id, status_item) {
    $.ajax({
        url: "/cart/update_status",
        type: "post",
        dataType: "json",
        data: {
            item_id: item_id,
            status_item: status_item,
        },
        success: function (res) {
            if (res.status == 200) {
                $(".grand_total_total_view").html(res.grand_total);
                $(".temp-total-money").html(res.grand_total);
                $(".subtotal_view").html(res.subtotal);
                $(".discount_amount_web").html(res.discount_amount);
                getDiscount();

            }
        }
    });
}
