webpackJsonp([4],{"55vv":function(t,e){},"T+/8":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"login",metaInfo:{title:"登录"},data:function(){return{username:"testB",password:"test"}},methods:{handleLogin:function(){var t=this;console.log("login"),this.$store.dispatch("main/LoginByUsername",{username:this.username,password:this.password}).then(function(){t.loading=!1,t.$router.push({path:"/"})}).catch(function(){t.loading=!1})}}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("mt-header",{attrs:{title:"登录"}},[n("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[n("mt-button",{attrs:{icon:"back"}},[t._v("返回")])],1)],1),t._v(" "),n("div",{staticStyle:{padding:"15px"}},[n("mt-field",{attrs:{label:"用户名",placeholder:"请输入用户名"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),n("mt-field",{attrs:{label:"密码",placeholder:"请输入密码",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("mt-button",{attrs:{size:"large",type:"primary"},nativeOn:{click:function(e){return t.handleLogin(e)}}},[t._v("登录")]),t._v(" "),t._m(0)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticStyle:{"text-align":"center",color:"#999"}},[this._v("\n      testB 可以查看个人个人业绩/团队业绩/培训奖励\n      "),e("br"),this._v("\n      testC 可以查看个人个人业绩/团队业绩\n    ")])}]};var r=n("VU/8")(a,s,!1,function(t){n("55vv")},"data-v-1cb7f148",null);e.default=r.exports}});
//# sourceMappingURL=4.05460dcb5da86bec4675.js.map