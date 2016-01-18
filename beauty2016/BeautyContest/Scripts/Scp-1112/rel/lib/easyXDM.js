(function(window,document,location,setTimeout,decodeURIComponent,encodeURIComponent){var global=this;var channelId=Math.floor(Math.random()*10000);var emptyFn=Function.prototype;var reURI=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var reParent=/[\-\w]+\/\.\.\//;var reDoubleSlash=/([^:])\/\//g;var namespace="";var easyXDM={};var _easyXDM=window.easyXDM;var IFRAME_PREFIX="easyXDM_";var HAS_NAME_PROPERTY_BUG;var useHash=false;var flashVersion;var HAS_FLASH_THROTTLED_BUG;function isHostMethod(object,property){var t=typeof object[property];return t=='function'||(!!(t=='object'&&object[property]))||t=='unknown';}
function isHostObject(object,property){return!!(typeof(object[property])=='object'&&object[property]);}
function isArray(o){return Object.prototype.toString.call(o)==='[object Array]';}
function hasFlash(){var name="Shockwave Flash",mimeType="application/x-shockwave-flash";if(!undef(navigator.plugins)&&typeof navigator.plugins[name]=="object"){var description=navigator.plugins[name].description;if(description&&!undef(navigator.mimeTypes)&&navigator.mimeTypes[mimeType]&&navigator.mimeTypes[mimeType].enabledPlugin){flashVersion=description.match(/\d+/g);}}
if(!flashVersion){var flash;try{flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");flashVersion=Array.prototype.slice.call(flash.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);flash=null;}
catch(notSupportedException){}}
if(!flashVersion){return false;}
var major=parseInt(flashVersion[0],10),minor=parseInt(flashVersion[1],10);HAS_FLASH_THROTTLED_BUG=major>9&&minor>0;return true;}
var on,un;if(isHostMethod(window,"addEventListener")){on=function(target,type,listener){target.addEventListener(type,listener,false);};un=function(target,type,listener){target.removeEventListener(type,listener,false);};}
else if(isHostMethod(window,"attachEvent")){on=function(object,sEvent,fpNotify){object.attachEvent("on"+sEvent,fpNotify);};un=function(object,sEvent,fpNotify){object.detachEvent("on"+sEvent,fpNotify);};}
else{throw new Error("Browser not supported");}
var domIsReady=false,domReadyQueue=[],readyState;if("readyState"in document){readyState=document.readyState;domIsReady=readyState=="complete"||(~navigator.userAgent.indexOf('AppleWebKit/')&&(readyState=="loaded"||readyState=="interactive"));}
else{domIsReady=!!document.body;}
function dom_onReady(){if(domIsReady){return;}
domIsReady=true;for(var i=0;i<domReadyQueue.length;i++){domReadyQueue[i]();}
domReadyQueue.length=0;}
if(!domIsReady){if(isHostMethod(window,"addEventListener")){on(document,"DOMContentLoaded",dom_onReady);}
else{on(document,"readystatechange",function(){if(document.readyState=="complete"){dom_onReady();}});if(document.documentElement.doScroll&&window===top){var doScrollCheck=function(){if(domIsReady){return;}
try{document.documentElement.doScroll("left");}
catch(e){setTimeout(doScrollCheck,1);return;}
dom_onReady();};doScrollCheck();}}
on(window,"load",dom_onReady);}
function whenReady(fn,scope){if(domIsReady){fn.call(scope);return;}
domReadyQueue.push(function(){fn.call(scope);});}
function getParentObject(){var obj=parent;if(namespace!==""){for(var i=0,ii=namespace.split(".");i<ii.length;i++){obj=obj[ii[i]];}}
return obj.easyXDM;}
function noConflict(ns){window.easyXDM=_easyXDM;namespace=ns;if(namespace){IFRAME_PREFIX="easyXDM_"+namespace.replace(".","_")+"_";}
return easyXDM;}
function getDomainName(url){return url.match(reURI)[3];}
function getPort(url){return url.match(reURI)[4]||"";}
function getLocation(url){var m=url.toLowerCase().match(reURI);var proto=m[2],domain=m[3],port=m[4]||"";if((proto=="http:"&&port==":80")||(proto=="https:"&&port==":443")){port="";}
return proto+"//"+domain+port;}
function resolveUrl(url){url=url.replace(reDoubleSlash,"$1/");if(!url.match(/^(http||https):\/\//)){var path=(url.substring(0,1)==="/")?"":location.pathname;if(path.substring(path.length-1)!=="/"){path=path.substring(0,path.lastIndexOf("/")+1);}
url=location.protocol+"//"+location.host+path+url;}
while(reParent.test(url)){url=url.replace(reParent,"");}
return url;}
function appendQueryParameters(url,parameters){var hash="",indexOf=url.indexOf("#");if(indexOf!==-1){hash=url.substring(indexOf);url=url.substring(0,indexOf);}
var q=[];for(var key in parameters){if(parameters.hasOwnProperty(key)){q.push(key+"="+encodeURIComponent(parameters[key]));}}
return url+(useHash?"#":(url.indexOf("?")==-1?"?":"&"))+q.join("&")+hash;}
var query=(function(input){input=input.substring(1).split("&");var data={},pair,i=input.length;while(i--){pair=input[i].split("=");data[pair[0]]=decodeURIComponent(pair[1]);}
return data;}(/xdm_e=/.test(location.search)?location.search:location.hash));function undef(v){return typeof v==="undefined";}
var getJSON=function(){var cached={};var obj={a:[1,2,3]},json="{\"a\":[1,2,3]}";if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(obj).replace((/\s/g),"")===json){return JSON;}
if(Object.toJSON){if(Object.toJSON(obj).replace((/\s/g),"")===json){cached.stringify=Object.toJSON;}}
if(typeof String.prototype.evalJSON==="function"){obj=json.evalJSON();if(obj.a&&obj.a.length===3&&obj.a[2]===3){cached.parse=function(str){return str.evalJSON();};}}
if(cached.stringify&&cached.parse){getJSON=function(){return cached;};return cached;}
return null;};function apply(destination,source,noOverwrite){var member;for(var prop in source){if(source.hasOwnProperty(prop)){if(prop in destination){member=source[prop];if(typeof member==="object"){apply(destination[prop],member,noOverwrite);}
else if(!noOverwrite){destination[prop]=source[prop];}}
else{destination[prop]=source[prop];}}}
return destination;}
function testForNamePropertyBug(){var form=document.body.appendChild(document.createElement("form")),input=form.appendChild(document.createElement("input"));input.name=IFRAME_PREFIX+"TEST"+channelId;HAS_NAME_PROPERTY_BUG=input!==form.elements[input.name];document.body.removeChild(form);}
function createFrame(config){if(undef(HAS_NAME_PROPERTY_BUG)){testForNamePropertyBug();}
var frame;if(HAS_NAME_PROPERTY_BUG){frame=document.createElement("<iframe name=\""+config.props.name+"\"/>");}
else{frame=document.createElement("IFRAME");frame.name=config.props.name;}
frame.id=frame.name=config.props.name;delete config.props.name;if(typeof config.container=="string"){config.container=document.getElementById(config.container);}
if(!config.container){apply(frame.style,{position:"absolute",top:"-2000px",left:"0px"});config.container=document.body;}
var src=config.props.src;config.props.src="javascript:false";apply(frame,config.props);frame.border=frame.frameBorder=0;frame.allowTransparency=true;config.container.appendChild(frame);if(config.onLoad){on(frame,"load",config.onLoad);}
if(config.usePost){var form=config.container.appendChild(document.createElement('form')),input;form.target=frame.name;form.action=src;form.method='POST';if(typeof(config.usePost)==='object'){for(var i in config.usePost){if(config.usePost.hasOwnProperty(i)){if(HAS_NAME_PROPERTY_BUG){input=document.createElement('<input name="'+i+'"/>');}else{input=document.createElement("INPUT");input.name=i;}
input.value=config.usePost[i];form.appendChild(input);}}}
form.submit();form.parentNode.removeChild(form);}else{frame.src=src;}
config.props.src=src;return frame;}
function checkAcl(acl,domain){if(typeof acl=="string"){acl=[acl];}
var re,i=acl.length;while(i--){re=acl[i];re=new RegExp(re.substr(0,1)=="^"?re:("^"+re.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(re.test(domain)){return true;}}
return false;}
function prepareTransportStack(config){var protocol=config.protocol,stackEls;config.isHost=config.isHost||undef(query.xdm_p);useHash=config.hash||false;if(!config.props){config.props={};}
if(!config.isHost){config.channel=query.xdm_c.replace(/["'<>\\]/g,"");config.secret=query.xdm_s;config.remote=query.xdm_e.replace(/["'<>\\]/g,"");;protocol=query.xdm_p;if(config.acl&&!checkAcl(config.acl,config.remote)){throw new Error("Access denied for "+config.remote);}}
else{config.remote=resolveUrl(config.remote);config.channel=config.channel||"default"+channelId++;config.secret=Math.random().toString(16).substring(2);if(undef(protocol)){if(getLocation(location.href)==getLocation(config.remote)){protocol="4";}
else if(isHostMethod(window,"postMessage")||isHostMethod(document,"postMessage")){protocol="1";}
else if(config.swf&&isHostMethod(window,"ActiveXObject")&&hasFlash()){protocol="6";}
else if(navigator.product==="Gecko"&&"frameElement"in window&&navigator.userAgent.indexOf('WebKit')==-1){protocol="5";}
else if(config.remoteHelper){protocol="2";}
else{protocol="0";}}}
config.protocol=protocol;switch(protocol){case"0":apply(config,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(config.isHost){if(!config.local){var domain=location.protocol+"//"+location.host,images=document.body.getElementsByTagName("img"),image;var i=images.length;while(i--){image=images[i];if(image.src.substring(0,domain.length)===domain){config.local=image.src;break;}}
if(!config.local){config.local=window;}}
var parameters={xdm_c:config.channel,xdm_p:0};if(config.local===window){config.usePolling=true;config.useParent=true;config.local=location.protocol+"//"+location.host+location.pathname+location.search;parameters.xdm_e=config.local;parameters.xdm_pa=1;}
else{parameters.xdm_e=resolveUrl(config.local);}
if(config.container){config.useResize=false;parameters.xdm_po=1;}
config.remote=appendQueryParameters(config.remote,parameters);}
else{apply(config,{channel:query.xdm_c,remote:query.xdm_e,useParent:!undef(query.xdm_pa),usePolling:!undef(query.xdm_po),useResize:config.useParent?false:config.useResize});}
stackEls=[new easyXDM.stack.HashTransport(config),new easyXDM.stack.ReliableBehavior({}),new easyXDM.stack.QueueBehavior({encode:true,maxLength:4000-config.remote.length}),new easyXDM.stack.VerifyBehavior({initiate:config.isHost})];break;case"1":stackEls=[new easyXDM.stack.PostMessageTransport(config)];break;case"2":if(config.isHost){config.remoteHelper=resolveUrl(config.remoteHelper);}
stackEls=[new easyXDM.stack.NameTransport(config),new easyXDM.stack.QueueBehavior(),new easyXDM.stack.VerifyBehavior({initiate:config.isHost})];break;case"3":stackEls=[new easyXDM.stack.NixTransport(config)];break;case"4":stackEls=[new easyXDM.stack.SameOriginTransport(config)];break;case"5":stackEls=[new easyXDM.stack.FrameElementTransport(config)];break;case"6":if(!flashVersion){hasFlash();}
stackEls=[new easyXDM.stack.FlashTransport(config)];break;}
stackEls.push(new easyXDM.stack.QueueBehavior({lazy:config.lazy,remove:true}));return stackEls;}
function chainStack(stackElements){var stackEl,defaults={incoming:function(message,origin){this.up.incoming(message,origin);},outgoing:function(message,recipient){this.down.outgoing(message,recipient);},callback:function(success){this.up.callback(success);},init:function(){this.down.init();},destroy:function(){this.down.destroy();}};for(var i=0,len=stackElements.length;i<len;i++){stackEl=stackElements[i];apply(stackEl,defaults,true);if(i!==0){stackEl.down=stackElements[i-1];}
if(i!==len-1){stackEl.up=stackElements[i+1];}}
return stackEl;}
function removeFromStack(element){element.up.down=element.down;element.down.up=element.up;element.up=element.down=null;}
apply(easyXDM,{version:"2.4.19.3",query:query,stack:{},apply:apply,getJSONObject:getJSON,whenReady:whenReady,noConflict:noConflict});easyXDM.DomHelper={on:on,un:un,requiresJSON:function(path){if(!isHostObject(window,"JSON")){document.write('<'+'script type="text/javascript" src="'+path+'"><'+'/script>');}}};(function(){var _map={};easyXDM.Fn={set:function(name,fn){_map[name]=fn;},get:function(name,del){if(!_map.hasOwnProperty(name)){return;}
var fn=_map[name];if(del){delete _map[name];}
return fn;}};}());easyXDM.Socket=function(config){var stack=chainStack(prepareTransportStack(config).concat([{incoming:function(message,origin){config.onMessage(message,origin);},callback:function(success){if(config.onReady){config.onReady(success);}}}])),recipient=getLocation(config.remote);this.origin=getLocation(config.remote);this.destroy=function(){stack.destroy();};this.postMessage=function(message){stack.outgoing(message,recipient);};stack.init();};easyXDM.Rpc=function(config,jsonRpcConfig){if(jsonRpcConfig.local){for(var method in jsonRpcConfig.local){if(jsonRpcConfig.local.hasOwnProperty(method)){var member=jsonRpcConfig.local[method];if(typeof member==="function"){jsonRpcConfig.local[method]={method:member};}}}}
var stack=chainStack(prepareTransportStack(config).concat([new easyXDM.stack.RpcBehavior(this,jsonRpcConfig),{callback:function(success){if(config.onReady){config.onReady(success);}}}]));this.origin=getLocation(config.remote);this.destroy=function(){stack.destroy();};stack.init();};easyXDM.stack.SameOriginTransport=function(config){var pub,frame,send,targetOrigin;return(pub={outgoing:function(message,domain,fn){send(message);if(fn){fn();}},destroy:function(){if(frame){frame.parentNode.removeChild(frame);frame=null;}},onDOMReady:function(){targetOrigin=getLocation(config.remote);if(config.isHost){apply(config.props,{src:appendQueryParameters(config.remote,{xdm_e:location.protocol+"//"+location.host+location.pathname,xdm_c:config.channel,xdm_p:4}),name:IFRAME_PREFIX+config.channel+"_provider"});frame=createFrame(config);easyXDM.Fn.set(config.channel,function(sendFn){send=sendFn;setTimeout(function(){pub.up.callback(true);},0);return function(msg){pub.up.incoming(msg,targetOrigin);};});}
else{send=getParentObject().Fn.get(config.channel,true)(function(msg){pub.up.incoming(msg,targetOrigin);});setTimeout(function(){pub.up.callback(true);},0);}},init:function(){whenReady(pub.onDOMReady,pub);}});};easyXDM.stack.FlashTransport=function(config){var pub,frame,send,targetOrigin,swf,swfContainer;function onMessage(message,origin){setTimeout(function(){pub.up.incoming(message,targetOrigin);},0);}
function addSwf(domain){var url=config.swf+"?host="+config.isHost;var id="easyXDM_swf_"+Math.floor(Math.random()*10000);easyXDM.Fn.set("flash_loaded"+domain.replace(/[\-.]/g,"_"),function(){easyXDM.stack.FlashTransport[domain].swf=swf=swfContainer.firstChild;var queue=easyXDM.stack.FlashTransport[domain].queue;for(var i=0;i<queue.length;i++){queue[i]();}
queue.length=0;});if(config.swfContainer){swfContainer=(typeof config.swfContainer=="string")?document.getElementById(config.swfContainer):config.swfContainer;}
else{swfContainer=document.createElement('div');apply(swfContainer.style,HAS_FLASH_THROTTLED_BUG&&config.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});document.body.appendChild(swfContainer);}
var flashVars="callback=flash_loaded"+encodeURIComponent(domain.replace(/[\-.]/g,"_"))
+"&proto="+global.location.protocol
+"&domain="+encodeURIComponent(getDomainName(global.location.href))
+"&port="+encodeURIComponent(getPort(global.location.href))
+"&ns="+encodeURIComponent(namespace);swfContainer.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+id+"' data='"+url+"'>"+"<param name='allowScriptAccess' value='always'></param>"+"<param name='wmode' value='transparent'>"+"<param name='movie' value='"+
url+"'></param>"+"<param name='flashvars' value='"+
flashVars+"'></param>"+"<embed type='application/x-shockwave-flash' FlashVars='"+
flashVars+"' allowScriptAccess='always' wmode='transparent' src='"+
url+"' height='1' width='1'></embed>"+"</object>";}
return(pub={outgoing:function(message,domain,fn){swf.postMessage(config.channel,message.toString());if(fn){fn();}},destroy:function(){try{swf.destroyChannel(config.channel);}
catch(e){}
swf=null;if(frame){frame.parentNode.removeChild(frame);frame=null;}},onDOMReady:function(){targetOrigin=config.remote;easyXDM.Fn.set("flash_"+config.channel+"_init",function(){setTimeout(function(){pub.up.callback(true);});});easyXDM.Fn.set("flash_"+config.channel+"_onMessage",onMessage);config.swf=resolveUrl(config.swf);var swfdomain=getDomainName(config.swf);var fn=function(){easyXDM.stack.FlashTransport[swfdomain].init=true;swf=easyXDM.stack.FlashTransport[swfdomain].swf;swf.createChannel(config.channel,config.secret,getLocation(config.remote),config.isHost);if(config.isHost){if(HAS_FLASH_THROTTLED_BUG&&config.swfNoThrottle){apply(config.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"});}
apply(config.props,{src:appendQueryParameters(config.remote,{xdm_e:getLocation(location.href),xdm_c:config.channel,xdm_p:6,xdm_s:config.secret}),name:IFRAME_PREFIX+config.channel+"_provider"});frame=createFrame(config);}};if(easyXDM.stack.FlashTransport[swfdomain]&&easyXDM.stack.FlashTransport[swfdomain].init){fn();}
else{if(!easyXDM.stack.FlashTransport[swfdomain]){easyXDM.stack.FlashTransport[swfdomain]={queue:[fn]};addSwf(swfdomain);}
else{easyXDM.stack.FlashTransport[swfdomain].queue.push(fn);}}},init:function(){whenReady(pub.onDOMReady,pub);}});};easyXDM.stack.PostMessageTransport=function(config){var pub,frame,callerWindow,targetOrigin;function _getOrigin(event){if(event.origin){return getLocation(event.origin);}
if(event.uri){return getLocation(event.uri);}
if(event.domain){return location.protocol+"//"+event.domain;}
throw"Unable to retrieve the origin of the event";}
function _window_onMessage(event){var origin=_getOrigin(event);if(origin==targetOrigin&&event.data.substring(0,config.channel.length+1)==config.channel+" "){pub.up.incoming(event.data.substring(config.channel.length+1),origin);}}
return(pub={outgoing:function(message,domain,fn){callerWindow.postMessage(config.channel+" "+message,domain||targetOrigin);if(fn){fn();}},destroy:function(){un(window,"message",_window_onMessage);if(frame){callerWindow=null;frame.parentNode.removeChild(frame);frame=null;}},onDOMReady:function(){targetOrigin=getLocation(config.remote);if(config.isHost){var waitForReady=function(event){if(event.data==config.channel+"-ready"){callerWindow=("postMessage"in frame.contentWindow)?frame.contentWindow:frame.contentWindow.document;un(window,"message",waitForReady);on(window,"message",_window_onMessage);setTimeout(function(){pub.up.callback(true);},0);}};on(window,"message",waitForReady);apply(config.props,{src:appendQueryParameters(config.remote,{xdm_e:getLocation(location.href),xdm_c:config.channel,xdm_p:1}),name:IFRAME_PREFIX+config.channel+"_provider"});frame=createFrame(config);}
else{on(window,"message",_window_onMessage);callerWindow=("postMessage"in window.parent)?window.parent:window.parent.document;callerWindow.postMessage(config.channel+"-ready",targetOrigin);setTimeout(function(){pub.up.callback(true);},0);}},init:function(){whenReady(pub.onDOMReady,pub);}});};easyXDM.stack.FrameElementTransport=function(config){var pub,frame,send,targetOrigin;return(pub={outgoing:function(message,domain,fn){send.call(this,message);if(fn){fn();}},destroy:function(){if(frame){frame.parentNode.removeChild(frame);frame=null;}},onDOMReady:function(){targetOrigin=getLocation(config.remote);if(config.isHost){apply(config.props,{src:appendQueryParameters(config.remote,{xdm_e:getLocation(location.href),xdm_c:config.channel,xdm_p:5}),name:IFRAME_PREFIX+config.channel+"_provider"});frame=createFrame(config);frame.fn=function(sendFn){delete frame.fn;send=sendFn;setTimeout(function(){pub.up.callback(true);},0);return function(msg){pub.up.incoming(msg,targetOrigin);};};}
else{if(document.referrer&&getLocation(document.referrer)!=query.xdm_e){window.top.location=query.xdm_e;}
send=window.frameElement.fn(function(msg){pub.up.incoming(msg,targetOrigin);});pub.up.callback(true);}},init:function(){whenReady(pub.onDOMReady,pub);}});};easyXDM.stack.NameTransport=function(config){var pub;var isHost,callerWindow,remoteWindow,readyCount,callback,remoteOrigin,remoteUrl;function _sendMessage(message){var url=config.remoteHelper+(isHost?"#_3":"#_2")+config.channel;callerWindow.contentWindow.sendMessage(message,url);}
function _onReady(){if(isHost){if(++readyCount===2||!isHost){pub.up.callback(true);}}
else{_sendMessage("ready");pub.up.callback(true);}}
function _onMessage(message){pub.up.incoming(message,remoteOrigin);}
function _onLoad(){if(callback){setTimeout(function(){callback(true);},0);}}
return(pub={outgoing:function(message,domain,fn){callback=fn;_sendMessage(message);},destroy:function(){callerWindow.parentNode.removeChild(callerWindow);callerWindow=null;if(isHost){remoteWindow.parentNode.removeChild(remoteWindow);remoteWindow=null;}},onDOMReady:function(){isHost=config.isHost;readyCount=0;remoteOrigin=getLocation(config.remote);config.local=resolveUrl(config.local);if(isHost){easyXDM.Fn.set(config.channel,function(message){if(isHost&&message==="ready"){easyXDM.Fn.set(config.channel,_onMessage);_onReady();}});remoteUrl=appendQueryParameters(config.remote,{xdm_e:config.local,xdm_c:config.channel,xdm_p:2});apply(config.props,{src:remoteUrl+'#'+config.channel,name:IFRAME_PREFIX+config.channel+"_provider"});remoteWindow=createFrame(config);}
else{config.remoteHelper=config.remote;easyXDM.Fn.set(config.channel,_onMessage);}
var onLoad=function(){var w=callerWindow||this;un(w,"load",onLoad);easyXDM.Fn.set(config.channel+"_load",_onLoad);(function test(){if(typeof w.contentWindow.sendMessage=="function"){_onReady();}
else{setTimeout(test,50);}}());};callerWindow=createFrame({props:{src:config.local+"#_4"+config.channel},onLoad:onLoad});},init:function(){whenReady(pub.onDOMReady,pub);}});};easyXDM.stack.HashTransport=function(config){var pub;var me=this,isHost,_timer,pollInterval,_lastMsg,_msgNr,_listenerWindow,_callerWindow;var useParent,_remoteOrigin;function _sendMessage(message){if(!_callerWindow){return;}
var url=config.remote+"#"+(_msgNr++)+"_"+message;((isHost||!useParent)?_callerWindow.contentWindow:_callerWindow).location=url;}
function _handleHash(hash){_lastMsg=hash;pub.up.incoming(_lastMsg.substring(_lastMsg.indexOf("_")+1),_remoteOrigin);}
function _pollHash(){if(!_listenerWindow){return;}
var href=_listenerWindow.location.href,hash="",indexOf=href.indexOf("#");if(indexOf!=-1){hash=href.substring(indexOf);}
if(hash&&hash!=_lastMsg){_handleHash(hash);}}
function _attachListeners(){_timer=setInterval(_pollHash,pollInterval);}
return(pub={outgoing:function(message,domain){_sendMessage(message);},destroy:function(){window.clearInterval(_timer);if(isHost||!useParent){_callerWindow.parentNode.removeChild(_callerWindow);}
_callerWindow=null;},onDOMReady:function(){isHost=config.isHost;pollInterval=config.interval;_lastMsg="#"+config.channel;_msgNr=0;useParent=config.useParent;_remoteOrigin=getLocation(config.remote);if(isHost){apply(config.props,{src:config.remote,name:IFRAME_PREFIX+config.channel+"_provider"});if(useParent){config.onLoad=function(){_listenerWindow=window;_attachListeners();pub.up.callback(true);};}
else{var tries=0,max=config.delay/50;(function getRef(){if(++tries>max){throw new Error("Unable to reference listenerwindow");}
try{_listenerWindow=_callerWindow.contentWindow.frames[IFRAME_PREFIX+config.channel+"_consumer"];}
catch(ex){}
if(_listenerWindow){_attachListeners();pub.up.callback(true);}
else{setTimeout(getRef,50);}}());}
_callerWindow=createFrame(config);}
else{_listenerWindow=window;_attachListeners();if(useParent){_callerWindow=parent;pub.up.callback(true);}
else{apply(config,{props:{src:config.remote+"#"+config.channel+new Date(),name:IFRAME_PREFIX+config.channel+"_consumer"},onLoad:function(){pub.up.callback(true);}});_callerWindow=createFrame(config);}}},init:function(){whenReady(pub.onDOMReady,pub);}});};easyXDM.stack.ReliableBehavior=function(config){var pub,callback;var idOut=0,idIn=0,currentMessage="";return(pub={incoming:function(message,origin){var indexOf=message.indexOf("_"),ack=message.substring(0,indexOf).split(",");message=message.substring(indexOf+1);if(ack[0]==idOut){currentMessage="";if(callback){callback(true);}}
if(message.length>0){pub.down.outgoing(ack[1]+","+idOut+"_"+currentMessage,origin);if(idIn!=ack[1]){idIn=ack[1];pub.up.incoming(message,origin);}}},outgoing:function(message,origin,fn){currentMessage=message;callback=fn;pub.down.outgoing(idIn+","+(++idOut)+"_"+message,origin);}});};easyXDM.stack.QueueBehavior=function(config){var pub,queue=[],waiting=true,incoming="",destroying,maxLength=0,lazy=false,doFragment=false;function dispatch(){if(config.remove&&queue.length===0){removeFromStack(pub);return;}
if(waiting||queue.length===0||destroying){return;}
waiting=true;var message=queue.shift();pub.down.outgoing(message.data,message.origin,function(success){waiting=false;if(message.callback){setTimeout(function(){message.callback(success);},0);}
dispatch();});}
return(pub={init:function(){if(undef(config)){config={};}
if(config.maxLength){maxLength=config.maxLength;doFragment=true;}
if(config.lazy){lazy=true;}
else{pub.down.init();}},callback:function(success){waiting=false;var up=pub.up;dispatch();up.callback(success);},incoming:function(message,origin){if(doFragment){var indexOf=message.indexOf("_"),seq=parseInt(message.substring(0,indexOf),10);incoming+=message.substring(indexOf+1);if(seq===0){if(config.encode){incoming=decodeURIComponent(incoming);}
pub.up.incoming(incoming,origin);incoming="";}}
else{pub.up.incoming(message,origin);}},outgoing:function(message,origin,fn){if(config.encode){message=encodeURIComponent(message);}
var fragments=[],fragment;if(doFragment){while(message.length!==0){fragment=message.substring(0,maxLength);message=message.substring(fragment.length);fragments.push(fragment);}
while((fragment=fragments.shift())){queue.push({data:fragments.length+"_"+fragment,origin:origin,callback:fragments.length===0?fn:null});}}
else{queue.push({data:message,origin:origin,callback:fn});}
if(lazy){pub.down.init();}
else{dispatch();}},destroy:function(){destroying=true;pub.down.destroy();}});};easyXDM.stack.VerifyBehavior=function(config){var pub,mySecret,theirSecret,verified=false;function startVerification(){mySecret=Math.random().toString(16).substring(2);pub.down.outgoing(mySecret);}
return(pub={incoming:function(message,origin){var indexOf=message.indexOf("_");if(indexOf===-1){if(message===mySecret){pub.up.callback(true);}
else if(!theirSecret){theirSecret=message;if(!config.initiate){startVerification();}
pub.down.outgoing(message);}}
else{if(message.substring(0,indexOf)===theirSecret){pub.up.incoming(message.substring(indexOf+1),origin);}}},outgoing:function(message,origin,fn){pub.down.outgoing(mySecret+"_"+message,origin,fn);},callback:function(success){if(config.initiate){startVerification();}}});};easyXDM.stack.RpcBehavior=function(proxy,config){var pub,serializer=config.serializer||getJSON();var _callbackCounter=0,_callbacks={};function _send(data){data.jsonrpc="2.0";pub.down.outgoing(serializer.stringify(data));}
function _createMethod(definition,method){var slice=Array.prototype.slice;return function(){var l=arguments.length,callback,message={method:method};if(l>0&&typeof arguments[l-1]==="function"){if(l>1&&typeof arguments[l-2]==="function"){callback={success:arguments[l-2],error:arguments[l-1]};message.params=slice.call(arguments,0,l-2);}
else{callback={success:arguments[l-1]};message.params=slice.call(arguments,0,l-1);}
_callbacks[""+(++_callbackCounter)]=callback;message.id=_callbackCounter;}
else{message.params=slice.call(arguments,0);}
if(definition.namedParams&&message.params.length===1){message.params=message.params[0];}
_send(message);};}
function _executeMethod(method,id,fn,params){if(!fn){if(id){_send({id:id,error:{code:-32601,message:"Procedure not found."}});}
return;}
var success,error;if(id){success=function(result){success=emptyFn;_send({id:id,result:result});};error=function(message,data){error=emptyFn;var msg={id:id,error:{code:-32099,message:message}};if(data){msg.error.data=data;}
_send(msg);};}
else{success=error=emptyFn;}
if(!isArray(params)){params=[params];}
try{var result=fn.method.apply(fn.scope,params.concat([success,error]));if(!undef(result)){success(result);}}
catch(ex1){error(ex1.message);}}
return(pub={incoming:function(message,origin){var data=serializer.parse(message);if(data.method){if(config.handle){config.handle(data,_send);}
else{_executeMethod(data.method,data.id,config.local[data.method],data.params);}}
else{var callback=_callbacks[data.id];if(data.error){if(callback.error){callback.error(data.error);}}
else if(callback.success){callback.success(data.result);}
delete _callbacks[data.id];}},init:function(){if(config.remote){for(var method in config.remote){if(config.remote.hasOwnProperty(method)){proxy[method]=_createMethod(config.remote[method],method);}}}
pub.down.init();},destroy:function(){for(var method in config.remote){if(config.remote.hasOwnProperty(method)&&proxy.hasOwnProperty(method)){delete proxy[method];}}
pub.down.destroy();}});};global.easyXDM=easyXDM;})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);