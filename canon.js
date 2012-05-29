(function(){

function _createArray_1(low, delta, high) {
	var size = Math.floor((high - low) / delta) + 1, arr = new Float32Array(size);
	for(var i = 0; i < size; i++) {
		arr[i] = low + i * delta;
	}
	return arr;
}

function _createArray_2(low, high, size) {
	var delta = (high - low) / (size - 1), arr = new Float32Array(size);
	for(var i = 0; i < size; i++) {
		arr[i] = low + i * delta;
	}
	return arr;
}

function _mul(arr, val, size) {
	for(var i = 0; i < size; i++) {
		arr[i] *= val;
	}
}

function _div(arr, val, size) {
	for(var i = 0; i < size; i++) {
		arr[i] /= val;
	}
}

function _sin(arr, size) {
	for(var i = 0; i < size; i++) {
		arr[i] = Math.sin(arr[i]);
	}
}

function _cos(arr, size) {
	for(var i = 0; i < size; i++) {
		arr[i] = Math.cos(arr[i]);
	}
}

function _dotMul(a1, a2, size) {
	if(a1.length !== size || a2.length !== size) {
		throw "dot Mul !";
	}
	for(var i = 0; i < size; i++) {
		a1[i] *= a2[i];
	}
}

function _createMod(t) {
	var size = t.length, arr = new Float32Array(t);
	_mul(arr, Math.PI / arr[size - 1], size);
	_sin(arr, size);
	return arr;
}

function _createNote(m, idx, t) {
	var arr = new Float32Array(t), size = t.length;
	_mul(arr, _st[idx-1], size);
	_cos(arr, size);
	_dotMul(arr, m, size);
	return arr;
}

function _zeros(low, up) {
	return new Float32Array(up - low + 1);
}

function _linkArray(a1, a2/*,a3...*/) {
	var len = arguments.length, size = 0;
	for(var i = 0; i < len; i++) {
		size += arguments[i].length;
	}
	var arr = new Float32Array(size), off = 0;
	for(var i = 0; i < len; i++) {
		arr.set(arguments[i], off);
		off += arguments[i].length;
	}
	return arr;
}

function _createS(c1,v1,v2,v3){
	var m_size = Math.min(c1.length,v1.length,v2.length,v3.length);
    if(typeof webkitAudioContext !== 'undefined'){
        ab = context.createBuffer(1, m_size, fs),
        buf = ab.getChannelData(0);
    }else{
        _audio.mozSetup(1, fs);
        buf = new Float32Array(m_size);
    }
	
	var max_s = 0;
	
	for(var i=0;i<m_size;i++){
		var s = c1[i]+v1[i]+v2[i]+v3[i];
		if(s>max_s)
			max_s = s;
		buf[i] = s;
 	}
	
	_div(buf, max_s, m_size);
	
	if(typeof webkitAudioContext !== 'undefined'){
        var source = context.createBufferSource();
        source.buffer = ab;
        source.connect(context.destination);
        source.noteOn(0);
    }else{
        setTimeout(mozWrite, 0);
    }
}
var tp = 0;

function mozWrite() {
    var w;
    w = _audio.mozWriteAudio(buf.subarray(tp));
    tp += w;
    if(tp < buf.length) {
        setTimeout(mozWrite, 100);
    }
}


if(typeof webkitAudioContext !== 'undefined'){
    var context = new webkitAudioContext(), ab = null, buf = null;
}else{
    var _audio = new Audio();
    if(_audio == null || typeof _audio.mozSetup === 'undefined'){
        alert("ÇëÊ¹ÓÃFireFox»òChromeä¯ÀÀÆ÷");
        return;
    }
}
var fs = 44100, dt = 1 / fs, T16 = 0.125;

var t16 = _createArray_1(0, dt, T16), k = t16.length;

var t4 = _createArray_2(0, 4 * T16, 4 * k), i = t4.length;

var t8 = _createArray_2(0, 2 * T16, 2 * k), j = t8.length;

var mod4 = _createMod(t4),
mod8 = _createMod(t8),
mod16 = _createMod(t16);

//$.log("%d,%d,%d,%d,%d,%d", k,i,j, mod4.length, mod8.length, mod16.length);
var f0 = 2 * 146.8;

var _st = new Float32Array([2 / 3, 3 / 4, 5 / 6, 15 / 16, 1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 9 / 5, 15 / 8, 2, 9 / 4, 5 / 2, 8 / 3, 3, 10 / 3, 15 / 4, 4, 1 / 2, 9 / 16, 5 / 8]);


for(var x = 0; x < _st.length; x++) {
	_st[x] *= (Math.PI * 2 * f0);
}

var do0f = _createNote(mod4, 21, t4),
re0f = _createNote(mod4, 22, t4),
mi0f = _createNote(mod4, 23, t4),

fa0f = _createNote(mod4, 1, t4),
so0f = _createNote(mod4, 2, t4),
la0f = _createNote(mod4, 3, t4),
ti0f = _createNote(mod4, 4, t4),
do1f = _createNote(mod4, 5, t4),
re1f = _createNote(mod4, 6, t4),
mi1f = _createNote(mod4, 7, t4),
fa1f = _createNote(mod4, 8, t4),
so1f = _createNote(mod4, 9, t4),
la1f = _createNote(mod4, 10, t4),
tb1f = _createNote(mod4, 11, t4),
ti1f = _createNote(mod4, 12, t4),
do2f = _createNote(mod4, 13, t4),
re2f = _createNote(mod4, 14, t4),
mi2f = _createNote(mod4, 15, t4),
fa2f = _createNote(mod4, 16, t4),
so2f = _createNote(mod4, 17, t4),
la2f = _createNote(mod4, 18, t4),
ti2f = _createNote(mod4, 19, t4),
do3f = _createNote(mod4, 20, t4),
blkf = _zeros(1, i);

// 1/8 notes
var fa0e = _createNote(mod8, 1, t8),
so0e = _createNote(mod8, 2, t8),
la0e = _createNote(mod8, 3, t8),
ti0e = _createNote(mod8, 4, t8),
do1e = _createNote(mod8, 5, t8),
re1e = _createNote(mod8, 6, t8),
mi1e = _createNote(mod8, 7, t8),
fa1e = _createNote(mod8, 8, t8),
so1e = _createNote(mod8, 9, t8),
la1e = _createNote(mod8, 10, t8),
tb1e = _createNote(mod8, 11, t8),
ti1e = _createNote(mod8, 12, t8),
do2e = _createNote(mod8, 13, t8),
re2e = _createNote(mod8, 14, t8),
mi2e = _createNote(mod8, 15, t8),
fa2e = _createNote(mod8, 16, t8),
so2e = _createNote(mod8, 17, t8),
la2e = _createNote(mod8, 18, t8),
ti2e = _createNote(mod8, 19, t8),
do3e = _createNote(mod8, 20, t8),
blke = _zeros(1, j);

// 1/16 notes
var fa0s = _createNote(mod16, 1, t16),
so0s = _createNote(mod16, 2, t16),
la0s = _createNote(mod16, 3, t16),
ti0s = _createNote(mod16, 4, t16),
do1s = _createNote(mod16, 5, t16),
re1s = _createNote(mod16, 6, t16),
mi1s = _createNote(mod16, 7, t16),
fa1s = _createNote(mod16, 8, t16),
so1s = _createNote(mod16, 9, t16),
la1s = _createNote(mod16, 10, t16),
tb1s = _createNote(mod16, 11, t16),
ti1s = _createNote(mod16, 12, t16),
do2s = _createNote(mod16, 13, t16),
re2s = _createNote(mod16, 14, t16),
mi2s = _createNote(mod16, 15, t16),
fa2s = _createNote(mod16, 16, t16),
so2s = _createNote(mod16, 17, t16),
la2s = _createNote(mod16, 18, t16),
ti2s = _createNote(mod16, 19, t16),
do3s = _createNote(mod16, 20, t16),
blks = _zeros(1, k);

// Blank Block
var blkblock = _linkArray(blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf, blkf);
//Base Melody
var cello = _linkArray(do1f, do1f, so0f, so0f, la0f, la0f, mi0f, mi0f, fa0f, fa0f, do0f, do0f, fa0f, fa0f, so0f, so0f);
// So-FUCKING-Long Melody
var violin = _linkArray(mi2f, mi2f, re2f, re2f, do2f, do2f, ti1f, ti1f, la1f, la1f, so1f, so1f, la1f, la1f, ti1f, ti1f, do2f, do2f, ti1f, ti1f, la1f, la1f, so1f, so1f, fa1f, fa1f, mi1f, mi1f, fa1f, fa1f, re1f, re1f, do1f, mi1f, so1f, fa1f, mi1f, do1f, mi1f, re1f, do1f, la0f, do1f, so1f, fa1f, la1f, so1f, fa1f, mi1f, do1f, re1f, ti1f, do2f, mi2f, so2f, so1f, la1f, fa1f, so1f, mi1f, do1f, do2f, blkf, blke, ti1e, do2e, ti1e, do2e, do1e, ti0e, so1e, re1e, mi1e, do1e, do2e, ti1e, la1e, ti1e, mi2e, so2e, la2e, fa2e, mi2e, re2e, fa2e, mi2e, re2e, do2e, ti1e, la1e, so1e, fa1e, mi1e, re1e, fa1e, mi1e, re1e, do1e, re1e, mi1e, fa1e, so1e, re1e, so1e, fa1e, mi1e, la1e, so1e, fa1e, so1e, fa1e, mi1e, re1e, do1e, la0e, la1e, ti1e, do2e, ti1e, la1e, so1e, fa1e, mi1e, re1e, la1e, so1e, la1e, so1e, fa1e, mi1f, mi2e, blke, re2f, re2f, blkf, do1f, mi2f, mi2f, la2f, la2f, so2f, so2f, la2f, la2f, ti2f, ti2f, do3e, blke, do2e, blke, ti1f, ti1f, blkf, la1f, do2f, do2f, do2f, do2f, do2f, do2f, do2f, fa2f, re2f, so2f, so2e, mi2s, fa2s, so2e, mi2s, fa2s, so2s, so1s, la1s, ti1s, do2s, re2s, mi2s, fa2s, mi2e, do2s, re2s, mi2e, mi1s, fa1s, so1s, la1s, so1s, fa1s, so1s, mi1s, fa1s, so1s, fa1e, la1s, so1s, fa1e, mi1s, re1s, mi1s, re1s, do1s, re1s, mi1s, fa1s, so1s, la1s, fa2e, la1s, so1s, la1e, ti1s, do2s, so1s, la1s, ti1s, do2s, re2s, mi2s, fa2s, so2s, mi2e, do2s, re2s, mi2e, re2s, do2s, re2s, ti1s, do2s, re2s, mi2s, re2s, do2s, ti1s, do2e, la1s, ti1s, do2e, do1s, re1s, mi1s, fa1s, mi1s, re1s, mi1s, do2s, ti1s, do2s, la1e, do2s, ti1s, la1e, so1s, fa1s, so1s, fa1s, mi1s, fa1s, so1s, la1s, ti1s, do2s, la2e, do2s, ti1s, do2e, ti1s, la1s, ti1s, do2s, re2s, do2s, ti1s, do1s, la1s, ti1s, do2e, blke, blkf, ti1e, blke, blkf, la1e, blke, blkf, do2e, blke, blkf, do1e, blke, blkf, do1e, blke, blkf, do1e, blke, blkf, do1e, blke, blkf, blkf, so1e, blke, blkf, so1e, blke, blkf, mi1e, blke, blkf, so1e, blke, blkf, fa1e, blke, blkf, mi1e, blke, blkf, fa1e, blke, blkf, re2e, blke, mi2e, mi1e, fa1e, mi1e, re1e, re2e, mi2e, re2e, do2e, mi1e, do1e, do2e, ti1e, so0e, fa0e, so0e, la0e, la1e, so1e, la1e, so1e, so0e, fa0e, so0e, do1e, la1e, so1e, la1e, ti1e, ti0e, la0e, ti0e, do1e, do2e, re2e, do2e, ti1e, ti0e, do1e, ti0e, la0e, la1e, so1e, la1e, ti1e, ti0e, mi1e, re1e, do1e, do2e, re2e, fa2e, mi2e, mi1e, so1e, mi2e, do2e, fa2e, mi2e, fa2e, re2e, so1e, fa1e, so1e, mi1e, so1e, so1e, so1e, so1e, so1e, so1e, so1e, mi1e, mi1e, mi1e, mi1e, mi1e, mi1e, so1e, so1e, fa1e, fa1e, fa1e, do2e, do2e, do2e, do2e, do2e, do2e, do2e, la1e, la1e, so1e, so1e, re2e, ti1e, so1e, mi2e, mi2e, mi2e, re2e, re2e, re2e, re2e, do2e, do2e, do2e, do2e, so2e, so2e, so2e, so2e, la2e, la2e, la2e, la2e, so2e, so2e, so2e, so2e, la2e, la2e, la2e, la2e, ti2e, ti1e, ti1e, ti1e, do2e, do1s, re1s, mi1e, do1e, ti0e, ti1s, do2s, re2e, ti1e, la1e, la0s, ti0s, do1e, la0e, ti0e, so1s, fa1s, mi1e, re1e, do1e, mi1s, re1s, do1e, fa1e, mi1e, do1s, re1s, mi1e, so1e, fa1e, la1s, so1s, fa1e, mi1e, re1e, so1s, fa1s, mi1e, re1e, mi1e, do2s, ti1s, do2e, mi1e, so1e, so1s, la1s, ti1e, so1e, mi1e, do2s, re2s, mi2e, do2e, mi2e, mi2s, re2s, do2e, ti1e, la1e, la1s, so1s, la1e, ti1e, do2e, mi2s, re2s, do2e, mi2e, fa2e, do2s, ti1s, la1e, la1e, so1e, re1e, so1e, so1e, so1f, so1f, so1f, so1f, do1f, do1f, do1f, so1f, fa1f, fa1f, so1f, so1f, fa1f, do1f, do1f, do1e, ti0e, do1f, do2f, ti1f, ti1f, la1f, la1f, so1f, so1f, do1f, do1e, re1e, mi1f, mi1f, do2f, do2f, ti1f, ti1f, do2f);

// cello
var c1 = _linkArray(cello,cello,cello,cello,cello,
      cello,cello,cello,cello,cello,
      cello,cello,cello,cello,cello,
      cello,cello,cello,cello,cello,
      cello,cello,cello,blkf);
// violin1
var v1 = _linkArray(blkblock,violin,blkblock,blkblock);
// violin2
var v2 = _linkArray(blkblock,blkblock,violin,blkblock);
// violin3
var v3 = _linkArray(blkblock,blkblock,blkblock,violin);

// Get dirty
_createS(c1,v1,v2,v3);

})();