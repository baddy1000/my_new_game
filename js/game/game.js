function loop(){
	window.game.update();
	requestAnimationFrame(loop);
}

class game{
	
	constructor(){
		//Get canvas reference and set it up for GL
		this.canvas = document.getElementById("glCanvas");
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
		
		this.gl = this.canvas.getContext("webgl2");
		//let's color the canvas
		this.gl.clearColor(0.05,0.05,0.05,1.0)
		
		
		//Grab dat vertex shader boii
		let vs = document.getElementById("vs_01").innerHTML;
		//And dat fragment shader too boii
		let fs = document.getElementById("fs_01").innerHTML;
		
		this.m_sprite = new sprite(this.gl, "img/blob_red.png", vs, fs);
	}
	
	update(){
		this.gl.viewport(0,0, this.canvas.width, this.canvas.height);
		//clear canvas to render new shit
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		
		this.gl.enable(this.gl.BLEND);
		//Let's tell noob-gl how to blend alpha
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		
		this.m_sprite.render();
		
		this.gl.flush();
	}
}