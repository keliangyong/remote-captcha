var EHRValidate = function(a) {
    var b = {
        mode: "",
        isEn: ""
    };
    $.extend(b, a);
    var c = "divVImage";
    var d = "divVPhrase";
    var e = "divVStep";
    var f = 0;
    var g = "";
    var h = new Array();
    this.succValidate = 0;
    this.clickSourceID = "";
    var i;
    var j = true;
    var k = "";
    this.Refresh = function() {
        ;var src;
        j = false;
        k = GetGuid(20, 16);
        $("#hidVGuid").val(k);
        $("#divLoading").show();
        var session = $.cookie('sc_edaice_session');
        $.ajax({
            url: common.ajax.appendServerUrl('getCaptcha', '8003'),
            type: 'GET',
            data: {
                session:session,
                channel:3
            }
        })
        .done(function(data) {
            src = data.data.img;
            $.cookie('guid', data.data.guid);
            $("#errCheckCodeCN,#errOther").hide()
            ;$("#" + d + " i,#" + c + " i").css("backgroundImage", "none");
            var m = $("#" + d).html();
            $("#" + d).html(m);
            m = $("#" + c).html();
            $("#" + c).html(m);
            $("#" + d + " i,#" + c + " i").css("backgroundImage", "url(" + src + ")");
            $("#divLoading").hide();
            $("#" + e + " span").hide();
            f = 0;
            j = true;
            h = new Array();
            $("#btnVRefresh").show();
            $("#btnVRefresh").next("span").hide();
            $("#btnValidate").removeClass("on");
            if (typeof (i) != "undefined") {
                clearTimeout(i)
            }
        })
        .fail(function() {
            console.log("error");
        })
    }
    ;
    var GetGuid = function(l, m) {
        var n = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var o = [], p;
        m = m || n.length;
        if (l) {
            for (p = 0; p < l; p++)
                o[p] = n[0 | Math.random() * m]
        } else {
            var q;
            o[8] = o[13] = o[18] = o[23] = '-';
            o[14] = '4';
            for (p = 0; p < 36; p++) {
                if (!o[p]) {
                    q = 0 | Math.random() * 16;
                    o[p] = n[(p == 19) ? (q & 0x3) | 0x8 : q]
                }
            }
        }
        ;return o.join('')
    };
    var ShowButton = function() {
        if (f == 4) {
            $("#btnValidate").addClass("on").attr("href", "javascript:void(0)")
        } else {
            $("#btnValidate").removeClass("on").removeAttr("href")
        }
    };
    this.Init = function() {
        $("#" + c).on("click", 'span', function(l) {
            ;var m = parseInt($(this).attr("class").replace("yz-step", ""));
            for (var n = m; n <= f; n++) {
                h.pop()
            }
            ;$(this).nextAll("span").hide();
            $(this).hide();
            f = m - 1;
            ShowButton()
        });
        $("#" + c).click(function(l) {
            if (!j) {
                return
            }
            ;var m = window.event ? window.event : l;
            var n = m.srcElement ? m.srcElement : m.target;
            if (f < 4 && n.className.toString().indexOf("yz-step") == -1) {
                var o = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop || document.body.scrollTop;
                var p = parseInt(m.clientX - parseInt($(this).offset().left));
                var q = parseInt(m.clientY + o - parseInt($(this).offset().top));
                if (p < 10) {
                    p = 10
                } else if (p > 320) {
                    p = 320
                }
                ;if (q < 10) {
                    q = 10
                } else if (q > 106) {
                    q = 106
                }
                ;var r = true;
                for (var s = 0; s < h.length; s++) {
                    var t = h[s].split(',');
                    if (Math.pow(Math.abs(parseInt(t[0]) - p), 2) + Math.pow(Math.abs(parseInt(t[1]) - q), 2) < 400) {
                        r = false;
                        break
                    }
                }
                ;if (r) {
                    f++;
                    $("#" + e + " .yz-step" + f).show().css({
                        "left": p - 10,
                        "top": q - 10
                    });
                    h.push(p + "," + q);
                    ShowButton()
                }
            }
        });
        if (b.isEn == "0") {
            $("body").click(function(l) {
                if (b.mode == "1") {
                    if (ehr.succValidate == 0) {
                        var m = l.srcElement ? l.srcElement : l.target;
                        if ($(m).parents("#CheckCodeCNdiv").length > 0 || $(m).attr("id") == "Login_btnLoginCN") {
                            return
                        }
                        ;$("#btnBeginValidate").html("点击完成验证");
                        $("#divValidateHtml").hide()
                    }
                }
            })
        }
        ;if (b.isEn == "1") {
            CodeEnLoad();
            $("#imgCheckCodeEN").click(function() {
                CodeEnLoad()
            })
        }
    }
    ;
    var CodeEnLoad = function() {
        k = GetGuid(20, 16);
        $("#hidVGuid").val(k);
        $("#imgCheckCodeEN").attr("src", "./CommonPage/RandomNumber.aspx?type=login&guid=" + k)
    };
    this.ValidateResult = function() {
        if (f != 4) {
            return
        };
        var guid = $.cookie('guid');
        vipname = $('#vipname', parent.document).val() + "";
        account = $('#username', parent.document).val() + "";
        password = $('#password', parent.document).val() + "";
        accoinfo = JSON.stringify({'vipname': vipname, 'username': account, 'pwd': password});
        captcha = JSON.stringify({
            g: g,
            p: h.join(";"),
            guid: guid
        });
        var session = $.cookie('sc_edaice_session');
        window.parent.infoData.islogining = true
        $.ajax({
            url: common.ajax.appendServerUrl('vertifyCaptcha', '8003'),
            type: 'GET',
            dataType: 'json',
            data: {
                session:session,
                channel:3,
                accoinfo:accoinfo,
                captcha:captcha,
                guid:guid
            }
        })
        .done(function(data) {
            if(data.errorcode == '28'){
                window.parent.infoData.errInfo = "登录失败，验证码错误，请重新输入"
                window.parent.infoData.islogining = false
                $("#btnVRefresh").click()
            }else if(data.errorcode == '35'){
                ehr.timer = setTimeout(function(){
                    ehr.polling({
                        session:session,
                        channel:3,
                        accoinfo:accoinfo,
                        captcha:captcha,
                        guid:guid
                    })
                }, 2000)
            }
        })
    };
    this.reSubmit = function(apiData){
        $.ajax({
            url: common.ajax.appendServerUrl('vertifyCaptcha', '8003'),
            type: 'GET',
            dataType: 'json',
            data: apiData
        })
        .done(function(data) {
            if(data.errorcode == '28'){
                window.parent.infoData.errInfo = "登录失败，验证码错误，请重新输入"
                window.parent.infoData.islogining = false
                $("#btnVRefresh").click()
            }else if(data.errorcode == '35'){
                ehr.timer = setTimeout(function(){
                    ehr.polling(apiData)
                }, 2000)
            }
        })
    };
    this.polling = function (apiData) {
        $.ajax({
            url: common.ajax.appendServerUrl('queryCaptcha', '8003'),
            type: 'GET',
            dataType: 'json',
            data: apiData
        })
        .done(function(data) {
            var session = $.cookie('sc_edaice_session');
            if (data.errorcode == '0'){
                ehr.updateaccount(apiData, data.data.agentChannel)
                window.parent.infoData.isloginSuc = true
                window.parent.infoData.islogining = false
                setTimeout("window.top.loginSucCallBack()",1500);
            }else if(data.errorcode == '27'){
                window.parent.infoData.islogining = false
                window.parent.infoData.errInfo = "登录失败，账号信息错误，请重新输入"
                $("#btnVRefresh").click()
            }else if(data.errorcode == '35'){
                ehr.timer = setTimeout(function(){
                    ehr.polling(apiData)
                }, 2000)
            }else if(data.errorcode == '36'){
                ehr.reSubmit(apiData)
            }
        })
    };
    this.updateaccount = function(apiData, agentChannel){
        apiData.agentChannel = agentChannel
        $.ajax({
            url: common.ajax.appendServerUrl('updateaccount', '8001'),
            type: 'GET',
            dataType: 'json',
            data: apiData
        })
    };
};
$(function() {
    ehr = new EHRValidate
    ehr.Init();
    ehr.Refresh();
    $("#btnBeginValidate").click(function() {
        ehr.Refresh();
        $("#divValidateHtml").show();
        $(this).text("正在验证")
    });
    $("#btnValidate").click(function() {
        ehr.ValidateResult()
    });
    $("#btnVRefresh").click(function() {
        ehr.Refresh()
    })
});
