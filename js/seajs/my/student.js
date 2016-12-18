/**
 * Created by 邹士杰 on 2015/12/22.
 */
define(function(require, exports, module){
    require("jQuery");
    require("commonFun");
    var student = {
        init: function(){
            // $(function() {
            //     var frame = window.parent.document.getElementById("pageframe");
            //     // $(frame).height($('body').height() + 30);
            //     $(frame).height($('body').height());
            // });
            //2015-12-28 19:31:07控制iframe高度的函数
            $(function() {
                // var frame = window.parent.document.getElementById("pageframe");
                // $(frame).height($("body").height() + 30);
                var url = getRequestParamValue("url");
                console.log(url);
                if (url != "") {
                    $(".dldxa").attr("href", ("http://svr.forclass.net:8026/Files/" + url));
                    url = "http://officeweb365.com/o/?i=6715&furl=http://svr.forclass.net:8026/Files/" + url;
                    $("#wordframe").attr("src", url);
                } else {
                    $("#wordframe").attr("src", "http://officeweb365.com/o/?i=6715&furl=http://svr.forclass.net:8026/Files/导学案-初中化学.doc");
                }
            });
            function getRequestParamValue(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                var ret = regex.exec(location.search);
                return ret == null ? "" : decodeURIComponent(ret[1].replace(/\+/g, " "));
            }
            
            $(".toolvs_btn").on("mousedown touchstart", function() {
                $(this).addClass("toolvs_btn_down");
            });

            $(".toolvs_btn").on("mouseup mouseleave mouseout touchend touchcancel", function() {
                $(this).removeClass("toolvs_btn_down");
            });

            $(".toolvs_btn").on("click", function() {
                var no = $("#toolvs_code").val();

                if (isValidToolCode(no)) {
                    onShowVideoDlgBtnClick(no, $("#dlgVideo"), openVideoPage, false);
                }
                else {
                    showInvalidateCodeInfo();
                }
            });

            $("#toolvs_code").on("focus", function(e) {
                var no = $(this).val();
                if (isValid(no) && isValid(no.match(/X{4}(-X{4}){2}/g))) {
                    var elem = $(this)[0];
                    if (isValid(elem)) {
                        if (elem.createTextRange) {
                            var range = elem.createTextRange();
                            range.move("character", 0);
                            range.select();
                        }
                        else if (elem.selectionStart) {
                            elem.focus();
                            elem.setSelectionRange(0, 0);
                        }
                        else
                            elem.focus();
                        e.preventDefault();
                    }
                }
            });

            var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            $("#toolvs_code").on("keydown", function(e) {
                if (mobile) {
                    sinfo = "mobile";
                    $("#toolvs_code").css("ime-mode", "normal");
                }

                var start = $(this)[0].selectionStart;
                var end = $(this)[0].selectionEnd;

                if (!isValidInt(start, -1))
                    start = no.length;
                if (!isValidInt(end, -1))
                    end = start;
                var no = $(this).val();
                var repl = "";
                var step = 1;
                var keyin = e.keyCode || e.which;
                if (isValid(no) && ((keyin >= 48 && keyin <= 57) || (keyin >= 96 && keyin <= 105))) {
                    if (start >= 14) {
                        e.preventDefault();
                        return;
                    }
                    if (mobile)
                        return;
                    if (start == 4 || start == 9) {
                        start = start + 1;
                        end = start + 1;
                    }
                    else if (end == start && end < no.length) {
                        end = start + 1;
                    }
                    if (keyin >= 96) {
                        keyin -= 48;
                    }
                    if (!mobile) {
                        repl = String.fromCharCode(keyin);
                        if (end - start > 1) {
                            var i = start + 1;
                            for (i = start + 1; i < end; i++) {
                                if (i == 4 || i == 9)
                                    repl += "-";
                                else
                                    repl += "X";
                            }
                        }
                    }
                }
                else if (keyin == 37 || keyin == 39
                    || keyin == 35 || keyin == 36) // direction
                {
                    return;
                }
                else if (keyin == 13) {
                    $(".toolvs_btn").trigger("click");
                    return;
                }
                else if (keyin == 46 || keyin == 8) // del & backspace
                {
                    if (mobile)
                        return;
                    else {
                        if (keyin == 8 && start > 0 && end == start) {
                            start -= 1;
                        }
                        if (keyin == 46 && end == start && end < no.length) {
                            end = start + 1;
                        }
                        step = 0;
                        for (var i = start; i < end; i++) {
                            if (i == 4 || i == 9)
                                repl += "-";
                            else
                                repl += "X";
                        }
                    }
                }
                else if ((keyin == 173 || keyin == 189) && mobile) {
                    return;
                }
                else {
                    //$("#toolvs_info").text("key=" + keyin);
                }

                if (repl.length > 0) {
                    var temp = "";
                    if (start > 0) {
                        temp = no.substring(0, start);
                    }
                    temp += repl;
                    temp += no.substring(end, no.length);
                    no = temp;

                    $(this).val(no);
                    $(this)[0].selectionStart = start + step;
                    $(this)[0].selectionEnd = start + step;
                }

                e.preventDefault();
            });

            if (mobile)
                $("#toolvs_code").attr("placeholder", "XXXX-XXXX-XXXX");
            else
                $("#toolvs_code").val("XXXX-XXXX-XXXX");

            function showInvalidateCodeInfo() {
                var $info = $("#toolvs_info");
                if (!$info.hasClass("toolvs_info_error")) {
                    $info.addClass("toolvs_info_error");
                }

                $info.text("ÇëÕýÈ·ÌîÐ´Êý×Ö´®Âë£¡");
            }

            function openVideoPage(result, target) {
                if (!setVideoPage(result, target)) {
                    showInvalidateCodeInfo();
                }
            }

            $("#video_close").on("click touchstart", function(evt) {
                evt.preventDefault();
                $.unblockUI();
            });

            $(".modal_title_bar").on("mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel"
                , mouseOnTitleBar);
            var g_dlgmoving = false;
            var g_dlgresizing = false;
            var g_dlgoffset = {};
            var g_dlg = null;
            function mouseOnTitleBar(evt) {
                switch (evt.type) {
                    case 'mousedown':
                    case 'touchstart':
                        g_dlgmoving = true;
                        g_dlg = $(".blockUI").find("div:first");
                        var dlgoff = g_dlg.offset();

                        var e = evt.originalEvent;
                        if (isValidArray(e.touches))
                            e = e.touches;

                        g_dlgoffset.x = e.clientX - dlgoff.left;
                        g_dlgoffset.y = e.clientY - dlgoff.top;
                        break;
                    case 'mouseup':
                    case 'mouseout':
                    case 'mouseleave':
                    case 'touchend':
                    case 'touchcancel':
                        g_dlgmoving = false;
                        break;
                }
                if (g_dlgmoving) {
                    evt.preventDefault();
                    var sl = $(window).scrollLeft();
                    var st = $(window).scrollTop();
                    var l = evt.clientX - g_dlgoffset.x - sl;
                    if (l < 0)
                        l = 0;
                    else if (l + g_dlg.width() > $(window).width()
                        && g_dlg.width() < $(window).width()) {
                        l = $(window).width() - g_dlg.width();
                    }

                    var t = evt.clientY - g_dlgoffset.y - st;
                    if (t < 0)
                        t = 0;
                    else if (t + g_dlg.height() > $(window).height()
                        && g_dlg.height() < $(window).height()) {
                        t = $(window).height() - g_dlg.height();
                    }
                    g_dlg.css({ "position": "fixed"
                        , "left": l
                        , "top": t
                    });
                }
            }
        },
        navigation: function(){
        }
    };
    student.init();
    student.navigation();
})