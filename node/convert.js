(function(){
	var fs = require("fs"), FN = "export";
	
	var d = fs.readFileSync(FN+".txt").toString(), src = d.split(","), idx = 0, dst = "";
	
	for(var i=0;i<src.length;i++){
		var s = src[i].split(".");
		//console.log(parseInt(s[0]))
		dst += String.fromCharCode(parseInt(s[0]));
		if(s.length===2){
			dst += String.fromCharCode(parseInt(s[1]));
		}
	}
	
	fs.writeFileSync(FN+".out.txt", dst);
	
	console.log("finish");
})();
