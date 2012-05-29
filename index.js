function drawOutline(out, ctx) {
	ctx.strokeStyle = "blue";
	ctx.fillStyle = "blue";
	ctx.save();
	ctx.globalCompositeOperation = 'xor';
	//ctx.rotate(Math.PI);
	for(var i = 0; i < out.polys.length; i++) {
		drawPoly(out.polys[i], ctx);
	}
	ctx.restore();
}

function drawPoly(p, ctx) {
	var s = p.start;
	ctx.beginPath();
	ctx.moveTo(s.x, s.y);
	for(var i = 0; i < p.lines.length; i++) {
		s = drawLine(s, p.lines[i], ctx);
	}
	ctx.moveTo(s.x, s.y);
	ctx.closePath();
	ctx.fill();
	
}

function drawLine(s, line, ctx) {
	var points = line.points, len = points.length;
	if(line.type === 'line') {
		for(var i = 0; i < len; i++) {
			ctx.lineTo(points[i].x, points[i].y);
		}
	} else {
		for(var i = 0; i < len - 1; i++) {
			var pb = points[i], pc = {x:0,y:0};
			if(i<len-2){
				pc.x = (pb.x + points[i+1].x) / 2;
				pc.y = (pb.y + points[i+1].y) / 2;
			} else {
				pc = points[i+1];
			}
			ctx.quadraticCurveTo(pb.x, pb.y, pc.x, pc.y);
		}	
	}
	return points[len-1];
}

function getMiddlePoint(p1, p2) {
	return {
		x : (p1.x + p2.x) / 2,
		y : (p1.y + p2.y) / 2
	}
}