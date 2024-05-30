var _search_key = "";
$(document).ready(function () {
    try {
        $(document).on('click', '.text_search', function () {
            try {
                let text_search = $(this).text();
                $(".input_search_product").val(text_search);
                getDefaultSearchContent();
            } catch (e) {
                alert('#btn-back: ' + e.message);
            }
        });

    } catch (e) {
        console.log('ready:' + e.message);
    }
});
function hideCartIcon() {
    var cartIcon = document.getElementById('cart-icon');
    var cartInput = document.getElementById('input-icon');
    cartIcon.style.display = 'none';
    cartInput.style.borderRadius = '0 5px 5px 0';
    cartInput.style.boxShadow = 'none';
    var content = document.getElementById('content');
    content.style.display = 'block';
    getDefaultSearchContent();

}

function showCartIcon() {
    var cartIcon = document.getElementById('cart-icon');
    var cartInput = document.getElementById('input-icon');
    cartIcon.style.display = 'inline-block';
    cartInput.style.borderRadius = '0 0px 0px 0';
    var content = document.getElementById('content');

    // Add event listener to the document
    document.addEventListener('click', function (event) {
        var isClickedInsideInput = cartInput.contains(event.target);
        var isClickedInsideContent = content.contains(event.target);

        if (isClickedInsideInput) {
            content.style.display = 'block';
        } else if (!isClickedInsideContent) {
            content.style.display = 'none';
        }
    });
}


function getDefaultSearchContent() {
    let search_key = $(".input_search_product").val();
    if (_search_key == search_key) {
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/get_default_search',
        dataType: 'html',
        loadding: true,
        data: {
            search_key: search_key
        },
        success: function (res) {
            _search_key = search_key;
            $(".content_search").html(res);
        },
        // Ajax error
        error: function (res) { }
    });

}
