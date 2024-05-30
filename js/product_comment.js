
var _filelist_upload = new Array();
$(function(){
    try{
        initialize();
    }catch(e){
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
    try{

        $(document).on('click', '.send-img', function () {
            try {
                $("#hdFileRatingUpload").trigger("click");
            } catch (e) {
                alert('#btn-back: ' + e.message);
            }
        });

        $(document).on('click', '.icondetail-sltstar', function () {
            try {
                var point =  $(this).attr("point") * 1;
                $("#hdfStar").val(point);
                for (let index = 1; index < 6; index++) {
                    if(index <= point ){
                        $(".point_" + index).addClass("active");
                    }else{
                        $(".point_" + index).removeClass("active");
                    }
                    
                    
                }

            } catch (e) {
                alert('#btn-back: ' + e.message);
            }
        });

        
        // loadCommentProduct();
        $(document).on('click', '#send_comment', function () {
            try {
                if(_validate()){
                    saveComment();
                }
            } catch (e) {
                alert('#send_comment: ' + e.message);
            }
        });

        $(document).on('change','#hdFileRatingUpload',function () {
            try{
                $(".resRtImg").removeClass("hide");
                var input = document.getElementById('hdFileRatingUpload');
                var extensions =  ["png", "jpg", "jfif", "heic", "jpge"];
                for (var i = 0; i < input.files.length; ++i) {
                    _filelist_upload.push( input.files.item(i));
                    
                    
                    var file_name = input.files.item(i).name ;
                    var row = $(".resRtImg_copy li").clone();
                    
                    readURL(input.files.item(i) , row);
                    $('.resRtImg').append(row);
                }
            } catch(e){
                console.log('btn_import_file_f003_multi: ' + e.message);
            }

        });

        
        $(document).on('click', '.fbDelImg', function () {
            try {
                $(this).closest("li").remove();
            } catch (e) {
                alert('#btn-back: ' + e.message);
            }
        });
    }catch(e){
        console.log('initialize: ' + e.message);
    }
};

function loadCommentProduct(){
    try {
        var product_id = $("#product_id").val();
        var data = {};
        data.product_id = product_id;
        $.ajax({
            type: 'POST',
            url:  '/product/loadcomment',
            dataType: 'html',
            loading: false,
            data: data,
            success: function (res) {
                $(".list_product_comment").html(res);
            },
            // Ajax error
            error: function (res) {

            }
        });
    } catch (e) {
        alert('addToCart:' + e.message);
    }
}





function readURL(input  , elm) {
    var src = "";
    var reader = new FileReader();
    reader.onload = function (e) {
        elm.find(".file_nm_view").attr("src" ,e.target.result)
    };
    reader.readAsDataURL(input);
    return src;
}

function countTxtRating(){
    var description = $("#description").val().length;
    $(".mintext").html(description +"  ký tự (tối thiểu 80)")    
}


function saveComment(){
    try {
        var formData = new FormData();
        var input = document.getElementById('fileInput_mlti');
        for (var i = 0; i < _filelist_upload.length; ++i) {
            formData.append("file_uploads[]", _filelist_upload[i]);
        }

        let data = {};
        var product_id  = $("#product_id").val();
        var hdfStar     = $("#hdfStar").val();
        var description = $("#description").val();
        var user_name   = $("#user_name").val();
        var phone       = $("#phone").val();
        var email       = $("#email").val();
        formData.append("product_id", product_id);
        formData.append("hdfStar", hdfStar);
        formData.append("description", description);
        formData.append("user_name", user_name);
        formData.append("phone", phone);
        formData.append("email", email);

        $.ajax({
            type: 'POST',
            url: '/product_comment/customer_create_comment',
            dataType: 'json',
            loadding: true,
            data: formData,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            success: function (res) {
                switch (res['status']){
                    // success
                    case 200:
                        showMessageSuccess( "Cảm ơn bạn đã gửi đánh giá. Chúng tôi sẽ kiểm duyệt đánh giá của bạn để đảm bảo đánh giá đúng nội dung." ,'center' , function(){
                            _filelist_upload =new Array();
                            location.reload();
                        })
                        break;
                    // error
                    case 201:
                        showMessageError(  "Có lỗi phát sinh trong quá trình đánh giá." , function(){
                        })
                        break;
                    // Exception
                    case EX:
                        break;
                    default:
                        break;
                }
            }
        });

    }catch(e){
        console.log('initialize: ' + e.message);
    }
};