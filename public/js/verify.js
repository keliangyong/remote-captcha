var errConfig = {
	"getCaptchaFail": "获取验证码失败",
	"noCaptcha": "请输入验证码",
	"loginFail": "验证失败"
},
	liepinSrc = './liepin/liepin.html',
	zhilianSrc = './zhilian/zhilian.html'

var loginForm = new Vue({
	el: "#main",
	data: {
		channel: getParas('channel'),
		captcha: "",
		captchaSrc: "",
		captType: "",
		errInfo: "",
		islogining: false
	},
	created: function () {
		switch (this.channel) {
			case 'zhilian':
				this.captType = 'image';
				this.captchaSrc = zhilianSrc;
				break;
			case 'job51':
				this.captType = 'simple';
				this.getCaptcha()
				break;
			case 'liepin':
				this.captType = 'image';
				this.captchaSrc = liepinSrc;
				break;
			default:
				break;
		};
	},
	methods: {
		getCaptcha: function () {
			var self = this
			axios.get(`/getCaptcha?type=${this.channel}`)
				.then(function (response) {
					self.captchaSrc = response.data
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		validated: function () {
			if (this.captType == 'simple' && !this.captcha) {
				this.errInfo = errConfig.noCaptcha
			} else if (this.captType == 'image' && this.getCapStatus()) {
				this.errInfo = errConfig.noCaptcha
			} else {
				this.errInfo = ""
				this.verify()
			}
		},
		verify: function () {
			var self = this
			if (this.channel == 'zhilian' && this.captType == 'image') {
				$("#capIframe").contents().find("#captcha-submitCode")[0].click();
			} else if (this.channel == 'job51' && this.captType == 'image') {
				$("#capIframe").contents().find("#btnValidate")[0].click();
			} else if (this.channel == 'liepin') {
				$("#capIframe").contents().find("#verify-submit")[0].click();
			} else {
				axios.get(`/submit?type=${this.channel}&captcha=${this.captcha}`)
					.then(function (res) {
						if(res.data.errorcode==0){
							self.errInfo = "验证成功 请关闭页面"
						}else{
							self.errInfo = "验证失败 请重新输入"
							self.captcha = ""
							self.getCaptcha()
						}
					})
					.catch(function (error) {
						self.errInfo = "服务器异常"
					});
			}
		},
		getCapStatus: function () {
			var zhilianCap = $("#capIframe").contents().find("#captcha-submitCode").hasClass("btn-disabled");
			// var liepinCap = $("#capIframe").contents().find("#verify-submit").hasClass("btn-disabled");
			var job51Cap = !$("#capIframe").contents().find("#btnValidate").hasClass("on");
			return (this.channel == 'zhilian') ? zhilianCap : job51Cap
		}
	}
})

function getParas(name, str) {
	var o = {};
	(str || location.search.slice(1)).replace(/([^&=]+)=([^&=]+)/g, function () {
		o[arguments[1]] = decodeURIComponent(arguments[2])
	});
	if (name) {
		return o[name] || ''
	} else {
		return o
	}
}
