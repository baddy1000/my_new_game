function loop(){
	window.game.update();
	requestAnimationFrame(loop);
}

class game{
	
	constructor(){
		//Get canvas reference and set it up for GL
		this.canvas = document.getElementById("glCanvas");
		this.canvas.width = 5;
		this.canvas.height = 5;
		
		this.worldSpaceMatrix = new m3x3();
		
		this.gl = this.canvas.getContext("webgl2");
		//let's color the canvas
		this.gl.clearColor(0.25,0.25,0.25,1.0)
		
		
		//Grab dat vertex shader boii
		let vs = document.getElementById("vs_01").innerHTML;
		//And dat fragment shader too boii
		let fs = document.getElementById("fs_01").innerHTML;
		
		this.sprite1 = new sprite(this.gl, "img/blob_green_idle.png", vs, fs, {width: 16, height:16});
		
		this.sprite1Pos = new point();
		
		this.sprite1Frame = new point();
	}
	
	resize(){
	let x = this.canvas.clientWidth;
	let y =	this.canvas.clientHeight;
	
	this.canvas.width = x;
	this.canvas.height = y;
	
	let hFac = 120;
	let wRatio = x / (y/hFac);
	this.worldSpaceMatrix = new m3x3().transition(-1, 1).scale(1/wRatio, -1/hFac);
}

update(){
	this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	//clear canvas to render new shit
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	
	this.gl.enable(this.gl.BLEND);
	//Let's tell noob-gl how to blend alpha
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	
	this.sprite1Frame.x= (new Date() * 0.003) % 4;
	this.sprite1Frame.y=(new Date() * 0.003) % 1;
	
	this.sprite1Pos.x = (this.sprite1Pos.x + 0.5) % 50;
	
	this.sprite1.render(this.sprite1Pos, this.sprite1Frame);
	
	this.gl.flush();
}


}

