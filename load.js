function Load(){
	this.src = "";
	this.idx = 0;
}
Load.prototype = {
	getOutline : function(data){
		this.src = data;
		this.idx = 0;
		
		var c_size = this._read();
		$.log(c_size)
		var outlines = [];
		for(var i=0;i<c_size;i++){
			outlines.push(this._getEachOutline());
		}
		return outlines;
	},
	_getEachOutline : function(){
		this._min_x = this._min_y = 99999;

		var out ={
			width : this._read(),
			height : this._read(),
			polys : []
		};
		
		var p_size = this._read();
		for(var i=0;i<p_size;i++){
			out.polys.push(this._getEachPoly());
		}
		/*
		 * 对点阵座标进行调整以适应坐标系。+2 和 +4是为了给左右和上下各加2px的padding
		 */
		for(var i=0;i<p_size;i++){
			var p = out.polys[i];
			p.start.x -= this._min_x - 2;
			p.start.y = out.height - p.start.y + this._min_y + 2;
			for(var j=0;j<p.lines.length;j++){
				var l = p.lines[j];
				for(var u=0;u<l.points.length;u++){
					l.points[u].x -= this._min_x - 2;
					l.points[u].y = out.height - l.points[u].y + this._min_y + 2;
				}
			}
		}
		out.width+=4;
		out.height+=4;
		return out;
	},
	_getEachPoly : function(){
		var poly = {
			start : {
				x : this._readX(),
				y : this._readY()
			},
			lines : []
		};
		var line_size = this._read();
		for(var i=0;i<line_size;i++){
			poly.lines.push(this._getEachLine());
		}
		return poly;
	},
	_getEachLine : function(){
		var t = this._read(), point_size = this._read();
		var line = {
			type : t===1 ? 'line' : 'bezier',
			points : []
		};
		for(var i=0;i<point_size;i++){
			line.points.push({
				x : this._readX(),
				y : this._readY()
			})
		}
		return line;
	},
	_read : function(){
		return this.src.charCodeAt(this.idx++);
	},
	_readX : function(){
		var x = this._readF();
		if(x<this._min_x)
			this._min_x = x;
		return x;
	},
	_readY : function(){
		var y = this._readF();
		if(y<this._min_y)
			this._min_y = y;
		return y;
	},
	_readF : function(){
		var v = this.src.charCodeAt(this.idx++), f = this.src.charCodeAt(this.idx++);
		return ((v & 0x8000)===0?v:(v-0x10000)) + f/0xffff;
	}
}
