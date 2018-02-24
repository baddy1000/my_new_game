class material{
	constructor(gl, vs, fs){
		this.gl = gl;
		
		let vShader = this.getShader(vs, gl.VERTEX_SHADER);
		let fShader = this.getShader(fs, gl.FRAGMENT_SHADER);
		
		if (vShader && fShader){
			this.program = gl.createProgram();
			gl.attachShader(this.program, vShader)
			gl.attachShader(this.program, fShader)
			gl.linkProgram(this.program)
			
			if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)){
				console.error("Cant load dat shader \n"+gl.getProgramInfoLog(this.program))
				return null;
			}
			
			gl.detachShader(this.program, vShader);
			gl.detachShader(this.program, fShader);
			gl.deleteShader(vShader);
			gl.deleteShader(fShader);
			
			gl.useProgram(null);
		}
	}
	
	getShader(script, type){
		let gl = this.gl;
		var output = gl.createShader(type);
		gl.shaderSource(output, script);
		gl.compileShader(output);
		
		if(!gl.getShaderParameter(output, gl.COMPILE_STATUS)){
			console.error("Shader dun goofed: \n:" + gl.getShaderInfoLog(output));
			return null;
		}
		
		return output;
	}
}

class sprite{
	constructor(gl, img_url, vs, fs){
		this.gl = gl;
		//tracks stage of image
		this.isLoaded = false;
		this.material = new material(gl, vs, fs);
		
		//links the image source
		this.image= new Image();
		this.image.src = img_url;
		this.image.sprite_ref = this;
		this.image.onload = function(){
			this.sprite_ref.setup();
		}
	}
	static createRectArray(x=0, y=0, w=1, h=1){
		return new Float32Array([
			//first triangle
			x, y,
			x+w, y,
			x, y+h,
			//second triangle
			x, y+h,
			x+w, y,
			x+w, y+h
			//forms a rectangle
		]);
	}
	setup(){
		let gl = this.gl;
		gl.useProgram(this.material.program);
		//we create the texture
		this.gl_tex = gl.createTexture();
		
		gl.bindTexture(gl.TEXTURE_2D, this.gl_tex);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
		gl.bindTexture(gl.TEXTURE_2D, null);
		
		this.tex_buff = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
		gl.bufferData(gl.ARRAY_BUFFER, sprite.createRectArray(), gl.STATIC_DRAW);
		
		this.geo_buff = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
		gl.bufferData(gl.ARRAY_BUFFER, sprite.createRectArray(), gl.STATIC_DRAW);
		
		this.aPositionLoc = gl.getAttribLocation(this.material.program, "a_position");
		this.aTexCoordLoc = gl.getAttribLocation(this.material.program, "a_texCoord");
		this.iImageLoc = gl.getUniformLocation(this.material.program, "u_image");
		
		gl.useProgram(null);
		this.isLoaded = true;
		
	}
	render(){
		if(this.isLoaded){
			let gl = this.gl;
			gl.useProgram(this.material.program);
			
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.gl_tex);
			gl.uniform1i(this.uImageLoc, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
			gl.enableVertexAttribArray(this.aTexCoordLoc);
			gl.vertexAttribPointer(this.aTexCoordLoc, 2, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
			gl.enableVertexAttribArray(this.aPositionLoc);
			gl.vertexAttribPointer(this.aPositionLoc, 2, gl.FLOAT, false, 0, 0);
			
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
			
			
			gl.useProgram(null);
			
		}
	}
}
