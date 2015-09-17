function $id(id){ return document.getElementById(id);}
function $c(tagName){ return document.createElement(tagName);}
window.onload = function(){
imageLoad( {
url:function(v){
		v = [
		"images/index_main.png",
		"images/index_share.png",
		"images/index_start.png",
		"images/r1.png",
		"images/r2.png",
		"images/r3.png",
		"images/ready1.png",
		"images/ready2.png",
		"images/ready3.png",
		"images/readygo.png",
		"images/i1.png",
		"images/i2.png",
		"images/i3.png",
		"images/i4.png",
		"images/i5.png",
		"images/i6.png",
		"images/i7.png",
		"images/i8.png",
		"images/play_again.png",
		"images/play_together.png",
		"images/restart.png",
		"images/share.png",
		"images/timer_ico.png",
		"images/win_bg.png",
		];
		var xxxxxxx=""
		for(var qq=0;qq<v.length;qq++){
			xxxxxxx=xxxxxxx+'<img src="'+v[qq]+'" style="width:1px;height:1px"/>';
		}
		$("#hid").html(xxxxxxx);
		return v;
		},
		oncomplete: function(s){
			$("#loadnum").html((s.complete/s.total*100).toFixed(0)+"%");
		},
		complete:function(){
			setTimeout(function(){$("#loadimg").fadeOut(300,function(){
				try{loadgame();}catch(e){}
			});},500);
		}
	});
};
function imageLoad( s ){
    var urlset = [], undefined, toString = Object.prototype.toString;
    switch( toString.apply(s.url) ){
        case '[object String]': urlset[urlset.length] = s.url; break;
        case '[object Array]': if(!s.url.length){ return false; } urlset = s.url; break;
        case '[object Function]': s.url = s.url(); return imageLoad( s );
        default: return false;
    }
    var imgset =[], r ={ total:urlset.length, load:0, error:0, abort:0, complete:0, currentIndex:0 }, timer,
        _defaults = {
            url:'',
            onload: 'function',
            onerror: 'function',
            oncomplete: 'function',
            ready: 'function',
            complete: 'function',
            timeout: 15
        };
    for( var v in _defaults){
        s[v] = s[v]===undefined? _defaults[v]: s[v];
    }
    s.timeout = parseInt( s.timeout ) || _defaults.timeout;
    timer = setTimeout( _callback, s.timeout*1000);
    for( var i=0,l=urlset.length,img; i<l; i++){
        img         = new Image();
        img.loaded    = false;
        imgset[imgset.length] = img;
    }    for( i=0,l=imgset.length; i<l; i++){
        imgset[i].onload     = function(){ _imageHandle.call(this, 'load', i ); };
        imgset[i].onerror     = function(){ _imageHandle.call(this, 'error', i ); };
        imgset[i].onabort     = function(){ _imageHandle.call(this, 'abort', i ); };
        imgset[i].src         = ''+urlset[i];
    }
    if( _isFn(s.ready) ){ s.ready.call({}, imgset, r); }
    function _imageHandle( handle, index ){
        r.currentIndex = index;
        switch( handle ){
            case 'load':
                this.onload = null; this.loaded = true; r.load++;
                if( _isFn(s.onload) ){ s.onload.call(this, r); }
                break;case 'error': r.error++;
                if( _isFn(s.onerror) ){ s.onerror.call(this, r); }
                break;
            case 'abort': r.abort++; break;
        }
        r.complete++;
        if( _isFn(s.oncomplete) ){ s.oncomplete.call(this, r); }
        if( r.complete===imgset.length ){ _callback(); }
    }
    function _callback(){
        clearTimeout( timer );
        if( _isFn(s.complete) ){ s.complete.call({}, imgset, r); }
    }
    function _isFn(fn){ return toString.apply(fn)==='[object Function]'; }
    return true;
}
