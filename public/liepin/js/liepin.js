var resumeHost = 
$.cookie = {
    get: function(a) {
        var b = a + '=';
        var d = document.cookie.split(';');
        for (var i = 0; i < d.length; i++) {
            var c = d[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(b) == 0) {
                var f;
                try {
                    f = decodeURIComponent(c.substring(b.length, c.length))
                } catch (e) {
                    f = unescape(c.substring(b.length, c.length))
                }
                return f
            }
        }
        return null
    },
    set: function(a, b, c, d, e, f) {
        var g;
        if (typeof c === 'number') {
            var h = new Date();
            h.setTime(h.getTime() + (c * 24 * 60 * 60 * 1000));
            g = h.toGMTString()
        } else if (typeof c === 'string') {
            g = c
        } else {
            g = false
        }
        document.cookie = a + '=' + encodeURIComponent(b) + (g ? (';expires=' + g) : '') + (d ? (';path=' + d) : '') + (e ? (';domain=' + e) : '') + (f ? ';secure' : '')
    },
    remove: function(a, b, c, d) {
        this.set(a, '', -1, b, c, d)
    }
};
function LTNC() {
    function toSourceFun() {
        try {
            throw "e";
        } catch (e) {
            try {
                e.toSource();
                return true
            } catch (eOfErr) {
                return false
            }
        }
    }
    ;function LTPlugins() {
        var h = Array.prototype.forEach;
        var j = Array.prototype.map;
        this.each = function(a, b, c) {
            if (a === null ) {
                return
            }
            if (h && a.forEach === h) {
                a.forEach(b, c)
            } else if (a.length === +a.length) {
                for (var i = 0, l = a.length; i < l; i++) {
                    if (b.call(c, a[i], i, a) === {})
                        return
                }
            } else {
                for (var d in a) {
                    if (a.hasOwnProperty(d)) {
                        if (b.call(c, a[d], d, a) === {})
                            return
                    }
                }
            }
        }
        ;
        this.map = function(d, e, f) {
            var g = [];
            if (d == null )
                return g;
            if (j && d.map === j)
                return d.map(e, f);
            this.each(d, function(a, b, c) {
                var r = e.call(f, a, b, c);
                r && (g[g.length] = r)
            });
            return g
        }
    }
    LTPlugins.prototype = {
        isIE: function() {
            if (navigator.appName === 'Microsoft Internet Explorer') {
                return true
            } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) {
                return true
            }
            return false
        },
        getPlugins: function() {
            if (this.isIE()) {
                return this.getIEPlugins()
            } else {
                return this.getRegularPlugins()
            }
        },
        getRegularPlugins: function() {
            return this.map(navigator.plugins, function(p) {
                var b = this.map(p, function(a) {
                    return [a.type, a.suffixes].join('~')
                }).join(',');
                return [p.name, p.description, b].join('::')
            }, this)
        },
        getIEPlugins: function() {
            if ((window.ActiveXObject) || (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject"in window)) {
                var b = ['ShockwaveFlash.ShockwaveFlash', 'AcroPDF.PDF', 'PDF.PdfCtrl', 'QuickTime.QuickTime', 'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'RealPlayer', 'SWCtl.SWCtl', 'WMPlayer.OCX', 'AgControl.AgControl', 'Skype.Detection'];
                return this.map(b, function(a) {
                    try {
                        new ActiveXObject(a);
                        return a
                    } catch (e) {
                        return false
                    }
                })
            } else {
                return []
            }
        }
    };
    function getPluginSize() {
        try {
            return new LTPlugins().getPlugins().length
        } catch (e) {
            return null
        }
    }
    ;var k = {};
    if (navigator.productSub)
        k.productSub = navigator.productSub;
    if (eval && eval.toString) {
        k.evalSize = eval.toString().length
    }
    k.toSource = toSourceFun();
    k.plugins = getPluginSize();
    k.resolution = window.screen ? [window.screen.width, window.screen.height] : [0, 0];
    return k
}
var verify = new function() {
    var g = '', wordCount = 6, _this = this, collectData = {}, cache = {}, now;
    var h = $('#verify-img-sprites')
      , $verify = $('#verify')
      , $verifyBody = $('#verify-body')
      , $reload = $('#verify-reload')
      , $info = $('#verify-info')
      , $submit = $('#verify-submit')
      , verifyLeft = $verify.offset().left
      , verifyTop = $verify.offset().top
      , spritesLeft = h.offset().left
      , spritesTop = h.offset().top
      , spritesWidth = h.width()
      , spritesHeight = h.height();
    var j = new Messenger('verifyIframe');
    j.addTarget(window.parent, 'verifyParent');
    j.listen(function(a) {
        if (a) {
            a = a.split('::');
            if (a[0] === 'pos')
                try {
                    cache.pos = JSON.parse(a[1]);
                    collectData.triggerData = cache.pos;
                    collectData.triggerButton = cache.pos;
                    collectData.mouseLeftClickData[0] = cache.pos
                } catch (e) {
                    cache.pos = {}
                }
        }
    });
    function getSequence() {
        var e = [6, 1, 5, 3, 0, 7, 2, 4];
        var f = [], a, b, c, d, i = 0, l = e.length;
        while (i < l) {
            a = e[i];
            b = a + l;
            c = a + (l << 1);
            d = b + (l << 1);
            f[i++] = a;
            f[l * 2 - i] = b;
            f[l * 3 - i] = c;
            f[l * 4 - i] = d
        }
        return f
    }
    function getCss(a) {
        return {
            left: $(a).offset().left - verifyLeft,
            top: $(a).offset().top - verifyTop,
            width: $(a).width(),
            height: $(a).height()
        }
    }
    now = Date.now || function() {
        return +new Date()
    }
    ;
    var k = now();
    this.dataInit = function() {
        k = now();
        collectData = {
            triggerData: cache.pos,
            triggerButton: cache.pos,
            refreshCount: 0,
            refreshButton: getCss($reload),
            submitButton: getCss($submit),
            mousemoveData: [],
            mouseLeftClickData: [],
            mouseLeftDownData: [],
            mouseLeftUpData: [],
            mouseRightClickData: [],
            mouseRightDownData: [],
            mouseRightUpData: [],
            valuableClickData: [],
            mouseClickMaxCount: 20,
            mouseClickCount: 0,
            validateCount: 0,
            startTime: k,
            keydownData: [],
            captchaImage: {
                top: spritesTop,
                left: spritesLeft,
                width: spritesWidth,
                height: spritesHeight
            }
        }
    }
    ;
    this.dataRefrush = function() {
        k = now();
        collectData = {
            triggerData: cache.pos,
            triggerButton: cache.pos,
            refreshCount: collectData.refreshCount + 1,
            refreshButton: getCss($reload),
            submitButton: getCss($submit),
            mousemoveData: [],
            mouseLeftClickData: [],
            mouseLeftDownData: [],
            mouseLeftUpData: [],
            mouseRightClickData: [],
            mouseRightDownData: [],
            mouseRightUpData: [],
            valuableClickData: [],
            mouseClickMaxCount: 20,
            mouseClickCount: 0,
            validateCount: 0,
            startTime: k,
            keydownData: [],
            captchaImage: {
                top: spritesTop,
                left: spritesLeft,
                width: spritesWidth,
                height: spritesHeight
            }
        }
    }
    ;
    var k = now();
    this.dataVerifyError = function() {
        k = now();
        collectData = {
            triggerData: cache.pos,
            triggerButton: cache.pos,
            refreshCount: 0,
            refreshButton: getCss($reload),
            submitButton: getCss($submit),
            mousemoveData: [],
            mouseLeftClickData: [cache.submit],
            mouseLeftDownData: [],
            mouseLeftUpData: [],
            mouseRightClickData: [],
            mouseRightDownData: [],
            mouseRightUpData: [],
            valuableClickData: [],
            mouseClickMaxCount: 20,
            mouseClickCount: 0,
            validateCount: collectData.validateCount + 1,
            startTime: k,
            keydownData: [],
            captchaImage: {
                top: spritesTop,
                left: spritesLeft,
                width: spritesWidth,
                height: spritesHeight
            }
        }
    }
    ;
    this.getImg = function() {
        if ($.cookie.get('challenge')) {
            g = $.cookie.get('challenge');
            $.cookie.remove('challenge', '/', 'liepin.com')
        }
        var session = $.cookie.get('sc_edaice_session');
        $.ajax({
        	url: common.ajax.appendServerUrl('captcha'),
        	type: 'POST',
        	data: {
            	channel:5,
                session:session
            }
        })
        .done(function(data) {
        	$.cookie.remove('challenge', '/', 'test.com')
            $.cookie.set('challenge', data.data.captParams.challenge);
        	$.cookie.set('relatedId', data.data.userId);
        	_this.sprites('data:image/gif;base64,'+data.data.captcha)
        })
        .fail(function() {
        	console.log("error");
        })
    }
    ;
    this.sprites = function(a) {
        var b = getSequence();
        var c = '<div class="verify-group">'
          , x = 16
          , y = 100
          , col = 16;
        for (var i = 0, len = b.length; i < len; i++) {
            var d = i >= col ? 1 : 0;
            c += '<i data-num=' + i + ' style="background: url(' + a + ') -' + (b[i] % col) * x + 'px -' + d * y + 'px; top:' + d * y + 'px; left:' + (i % col * x) + 'px;"></i>'
        }
        c += '</div>';
        $('#verify-img-sprites').html(c);
        $('#verify-sm-img').html(c)
    }
    ;
    var m = 20
      , coordH = 24
      , space = 20
      , validate = false;
    this.submitEnable = function() {
        $submit.removeClass('btn-disabled');
        validate = true
    }
    ;
    this.submitDisable = function() {
        $submit.addClass('btn-disabled');
        validate = false
    }
    ;
    this.cleanCoordinate = function() {
        $('.verify-coordinate').remove()
    }
    ;
    this.infoDefault = function() {
        $info.html('点击刷新图片')
    }
    ;
    this.infoChoice = function() {
        $info.html('点击图标重选')
    }
    ;
    this.infoError = function() {
        $info.html('<b class="verify-error">验证失败</b>')
    }
    ;
    this.collectEvents = function() {
        $verify.bind('contextmenu', function(e) {
            if (collectData.mouseRightClickData.length < collectData.mouseClickMaxCount) {
                collectData.mouseRightClickData.push({
                    t: now(),
                    x: e.pageX,
                    y: e.pageY
                })
            }
        });
        h.bind('click', function(e) {
            if (!g) {
                g = $.cookie.get('challenge');
                $.cookie.remove('challenge', '/', 'liepin.com');
                collectData.challenge = g
            }
            var x = e.pageX - verifyLeft
              , y = e.pageY - verifyTop
              , t = now()
              , n = collectData.valuableClickData.length + 1;
            collectData.mouseClickCount += 1;
            if (collectData.mouseLeftClickData.length < collectData.mouseClickMaxCount + 1) {
                collectData.mouseLeftClickData.push({
                    t: t,
                    x: x,
                    y: y
                })
            }
            if (collectData.valuableClickData.length >= wordCount) {
                return false
            }
            for (var i = 0, len = collectData.valuableClickData.length; i < len; i++) {
                var b = collectData.valuableClickData[i];
                if (Math.abs(b.x - x) < space && Math.abs(b.y - y) < space) {
                    return false
                }
            }
            _this.infoChoice();
            $('<b class="verify-coordinate">' + n + '</b>').css({
                left: x - spritesLeft - m * 0.5,
                top: y - spritesTop - coordH * 0.5
            }).bind('click', function(e) {
                e.stopPropagation();
                var a = $(this).html() - 1;
                $('.verify-coordinate').slice(a).remove();
                collectData.valuableClickData = collectData.valuableClickData.slice(0, a);
                if (a === 0) {
                    _this.infoDefault();
                    _this.submitDisable()
                }
                return false
            }).appendTo($verifyBody);
            collectData.valuableClickData.push({
                t: t,
                x: x,
                y: y
            });
            if (collectData.valuableClickData.length > 0) {
                _this.submitEnable()
            }
        }).bind('mousedown', function(e) {
            if (collectData.mouseLeftDownData.length < collectData.mouseClickMaxCount) {
                var x = e.pageX - verifyLeft
                  , y = e.pageY - verifyTop
                  , t = now();
                collectData.mouseLeftDownData.push({
                    t: t,
                    x: x,
                    y: y
                })
            }
        }).bind('mouseup', function(e) {
            if (collectData.mouseLeftUpData.length < collectData.mouseClickMaxCount) {
                var x = e.pageX - verifyLeft
                  , y = e.pageY - verifyTop
                  , t = now();
                collectData.mouseLeftUpData.push({
                    t: t,
                    x: x,
                    y: y
                })
            }
        }).bind('mousemove', function(e) {
            if (collectData.mousemoveData.length < collectData.mouseClickMaxCount && now() - k >= 1000) {
                var x = e.pageX - verifyLeft
                  , y = e.pageY - verifyTop
                  , t = now();
                k = t;
                collectData.mousemoveData.push({
                    t: t,
                    x: x,
                    y: y
                })
            }
        });
        $(document).bind('keyup', function(e) {
            if (collectData.keydownData.length < collectData.mouseClickMaxCount) {
                collectData.keydownData.push({
                    t: now(),
                    k: e.keyCode
                })
            }
        });
        $reload.bind('click', function(e) {
            var x = 19
              , y = 235
              , t = now();
            _this.reload();
            collectData.mouseLeftClickData.push({
                t: t,
                x: x,
                y: y
            })
        });
        $submit.bind('click', function(e) {//e.pageY - verifyTop
            var x = 197 
              , y = 243
              , t = now();
            collectData.mouseClickCount += 1;
            cache.submit = {
                t: t,
                x: x,
                y: y
            };
            if (collectData.mouseLeftUpData.length < collectData.mouseClickMaxCount) {
                collectData.mouseLeftDownData.push({
                    t: t,
                    x: x,
                    y: y
                });
                collectData.mouseLeftUpData.push({
                    t: t,
                    x: x,
                    y: y
                })
            }
            if (collectData.mouseLeftClickData.length < collectData.mouseClickMaxCount + 1) {
                collectData.mouseLeftClickData.push({
                    t: t,
                    x: x,
                    y: y
                })
            }
            _this.submit()
        })
    }
    ;
    this.init = function() {
        $('body').bind('click', function() {
            return false
        });
        $(window).bind('beforeunload', function() {
            $.cookie.remove('challenge', '/', 'liepin.com')
        });
        this.infoDefault();
        this.getImg();
        this.dataInit();
        this.collectEvents();
        j.targets['verifyParent'].send('init');
        collectData.mouseLeftClickData[0] = {
            height: 54,
            left: 1110,
            t: collectData.startTime-1288,
            top: 252,
            width: 282,
            x: 1246,
            y: 267
        };
    }
    ;
    this.reload = function() {
        this.infoDefault();
        this.submitDisable();
        this.cleanCoordinate();
        this.dataRefrush();
        this.getImg()
    }
    ;
    this.error = function() {
        this.infoError();
        this.submitDisable();
        this.cleanCoordinate();
        this.dataVerifyError();
        this.getImg()
    }
    ;
    this.submit = function() {
        if (!validate) {
            return false
        }
        _this.submitDisable();
        if ($.cookie.get('challenge')) {
            g = $.cookie.get('challenge');
            $.cookie.remove('challenge')
        };
        relatedId = $.cookie.get('relatedId');
        $.cookie.remove('relatedId')
        try {
            var b = LTNC();
            collectData.challenge = g;
            collectData.plugins = b.plugins;
            collectData.productSub = b.productSub || '';
            collectData.evalSize = b.evalSize || 0;
            collectData.toSource = b.toSource;
            collectData.resolution = b.resolution;
            collectData.triggerData = {
	        	height: 54,
				left: 1110,
				t: collectData.startTime-1288,
				top: 252,
				width: 282,
				x: 1246,
				y: 267
	        };
	       	collectData.triggerButton = {
	        	height: 54,
				left: 1110,
				t: collectData.startTime-1288,
				top: 252,
				width: 282,
				x: 1246,
				y: 267
	        };
        } catch (e) {}

        var c = CryptoJS.enc.Utf8.parse(g.slice(0, 16));
        var d = CryptoJS.AES.encrypt(JSON.stringify(collectData), c, {
            iv: c,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        var f = []
          , data = collectData.valuableClickData;
        for (var i = 0, len = data.length; i < len; i++) {
            f.push(data[i].x + ',' + data[i].y)
        }
        captcha = JSON.stringify({
            		challenge: g,
	                collectibles: d.toString().replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '*'),
	                p: f.join(';'),
	                time: collectData.startTime
            	});
        account = $('#username', parent.document).val() + "";
        password = $('#password', parent.document).val() + "";
        accoinfo = JSON.stringify({'username': account, 'pwd': password});
        var session = $.cookie.get('sc_edaice_session');
        $.ajax({
        	url: common.ajax.appendServerUrl('verifyaccount'),
        	type: 'POST',
        	dataType: 'json',
        	data: {
                session:session,
            	channel:5,
            	accoinfo:accoinfo,
                captcha: captcha,
                relateid: relatedId
            }
        })
        .done(function(data) {
            if (data.errorcode == '0'){
                window.top.loginSucCallBack()
            }else{
                if(data.errorcode == '27'){
                    window.parent.infoData.errInfo = "登录失败，账号信息错误，请重新输入"
                }else if(data.errorcode == '28'){
                    window.parent.infoData.errInfo = "登录失败，验证码错误，请重新输入"
                }else{
                    window.parent.infoData.errInfo = "登录失败，其他异常"
                }
				window.parent.infoData.isSubmitting = false
                $("#verify-reload").click()
            }
        });
    }
};
verify.init();