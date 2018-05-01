/**
 * Created by TS on 2016/7/27.
 */
$('#ihkbutton').click(function() {
    var ihkData = {
        name: '',
        email: '',
        requires: '',
        phone: '',
        time: new Date(),
        complete: 0
    };
    //customer, project, progress, time, work, internalstake, externalstake, inputperson, feedback, feedbackperson, remarks
    if (!$("#name2").val()) {
        $("#name2").parent(".form-group").addClass("has-error");
        alert("姓名或公司名称为必填项，请填写！");
    } else {
        ihkData.name = $("#name2").val();
    }
    if (!$("#email2").val()) {
        $("#email2").parent(".form-group").addClass("has-error");
        alert("您的邮箱为必填项，请填写！");
    } else {
        ihkData.email = $("#email2").val();
    }
    if (!$("#message2").val()) {
        $("#message2").parent(".form-group").addClass("has-error");
        alert("拍摄要求为必填项，请填写！");
    } else {
        ihkData.requires = $("#message2").val();
    }
    if (!$("#phone2").val()) {
        $("#phone2").parent(".form-group").addClass("has-error");
        alert("联系电话为必填项，请填写！");
    } else {
        ihkData.phone = $("#phone2").val();
    }
    if ($("#name2").val() && $("#email2").val() && $("#message2").val() && $("#phone2").val()) {
        $.ajax({
            url: 'http://115.159.35.142:3001/ihkCreateAdd',// 跳转到 action
            data: ihkData,
            type: 'get',
            cache: false,
            dataType: 'jsonp',
            success: function (data) {
                if (data.msg == "true") {
                    alert("添加成功，稍后将有专人联系您！");
                    window.location.reload();
                } else {
                    alert("添加失败，请重新填写！");
                }
            },
            error: function () {
                alert("异常！");
            }
        });
    }
});
$('#qrcode a').hover(function(){
    $('#qrcode img').css("display","block");
},function(){
    $('#qrcode img').css("display","none");
});

$(function(){
    $('#vedioModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var title = button.data('title');
        var vediosrc = button.data('vediosrc');
        var modal = $(this);
        modal.find('.modal-title').text(title);
        modal.find('.modal-body iframe').attr('src',vediosrc);
    });

    var i=0;
    var $btn = $('.section-btn li'),
        $wrap = $('.section-wrap'),
        $arrow = $('.arrow');

    /*当前页面赋值*/
    function up(){i++;if(i==$btn.length){i=0};}
    function down(){i--;if(i<0){i=$btn.length-1};}

    /*页面滑动*/
    function run(){
        $btn.eq(i).addClass('on').siblings().removeClass('on');
        $wrap.attr("class","section-wrap").addClass(function() { return "put-section-"+i; }).find('.section').eq(i).find('.title').addClass('active');
        if (i > 0) {
            $('.menu-button').addClass('nf');
        } else {
            $('.menu-button').removeClass('nf');
        }
    };

    /*右侧按钮点击*/
    $btn.each(function(index) {
        $(this).click(function(){
            i=index;
            run();
        })
    });

    /*翻页按钮点击*/
    $arrow.one('click',go);
    function go(){
        up();run();
        setTimeout(function(){$arrow.one('click',go)},1000)
    };

    /*响应鼠标*/
    $wrap.one('mousewheel',mouse_);
    function mouse_(event){
        if(event.deltaY<0) {up()}
        else{down()}
        run();
        setTimeout(function(){$wrap.one('mousewheel',mouse_)},1000)
    };

    /*手触屏*/
   // $wrap.on('touchmove',touch_);
    $wrap.swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
            //$(this).text("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " );
            if(direction == 'up') {
                up()
            }else if(direction == 'down'){
                down()
            }
            run();
            setTimeout(function(){$wrap.one('touchmove',touch_)},1000)
        }
    });
   /* $wrap.addEventListener('touchmove', touch_, false);
    function touch_(event){
        alert('touch');
        if(event.pageY<10) {
            up()
        }else if(event.pageY<-10){
            down()
        }
        run();
        setTimeout(function(){$wrap.one('touchmove',touch_)},1000)
    };*/

    /*响应键盘上下键*/
    $(document).one('keydown',k);
    function k(event){
        var e=event||window.event;
        var key=e.keyCode||e.which||e.charCode;
        switch(key)	{
            case 38: down();run();
                break;
            case 40: up();run();
                break;
        };
        setTimeout(function(){$(document).one('keydown',k)},1000);
    }
});