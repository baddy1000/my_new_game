class point{
	constructor(x=0.0, y=0.0){
		this.x = x;
		this.y = y;
	}
}

class m3x3{
	constructor(){
		this.matrix = [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1 
		];
	}
	multiply(m){
		var output = new m3x3();
		output.matrix = [
			this.matrix[m3x3.M00] * m.matrix[m3x3.M00] + this.matrix[m3x3.M10] * m.matrix[m3x3.M01] + this.matrix[m3x3.M20] * m.matrix[m3x3.M02],
			this.matrix[m3x3.M01] * m.matrix[m3x3.M00] + this.matrix[m3x3.M11] * m.matrix[m3x3.M01] + this.matrix[m3x3.M21] * m.matrix[m3x3.M02],
			this.matrix[m3x3.M02] * m.matrix[m3x3.M00] + this.matrix[m3x3.M12] * m.matrix[m3x3.M01] + this.matrix[m3x3.M22] * m.matrix[m3x3.M02],
			
			this.matrix[m3x3.M00] * m.matrix[m3x3.M10] + this.matrix[m3x3.M10] * m.matrix[m3x3.M11] + this.matrix[m3x3.M20] * m.matrix[m3x3.M12],
			this.matrix[m3x3.M01] * m.matrix[m3x3.M10] + this.matrix[m3x3.M11] * m.matrix[m3x3.M11] + this.matrix[m3x3.M21] * m.matrix[m3x3.M12],
			this.matrix[m3x3.M02] * m.matrix[m3x3.M10] + this.matrix[m3x3.M12] * m.matrix[m3x3.M11] + this.matrix[m3x3.M22] * m.matrix[m3x3.M12],
			
			this.matrix[m3x3.M00] * m.matrix[m3x3.M20] + this.matrix[m3x3.M10] * m.matrix[m3x3.M21] + this.matrix[m3x3.M20] * m.matrix[m3x3.M22],
			this.matrix[m3x3.M01] * m.matrix[m3x3.M20] + this.matrix[m3x3.M11] * m.matrix[m3x3.M21] + this.matrix[m3x3.M21] * m.matrix[m3x3.M22],
			this.matrix[m3x3.M02] * m.matrix[m3x3.M20] + this.matrix[m3x3.M12] * m.matrix[m3x3.M21] + this.matrix[m3x3.M22] * m.matrix[m3x3.M22]
		];
		return output;
	}
	transition(x, y){
		var output = new m3x3();
		output.matrix = [
			this.matrix[m3x3.M00],
			this.matrix[m3x3.M01],
			this.matrix[m3x3.M02],
			
			this.matrix[m3x3.M10],
			this.matrix[m3x3.M11],
			this.matrix[m3x3.M12],
			
			x * this.matrix[m3x3.M00] + y * this.matrix[m3x3.M10] + this.matrix[m3x3.M20],
			x * this.matrix[m3x3.M01] + y * this.matrix[m3x3.M11] + this.matrix[m3x3.M21],
			x * this.matrix[m3x3.M02] + y * this.matrix[m3x3.M12] + this.matrix[m3x3.M22]
		];
		return output;
	}
	scale(x, y){
		var output = new m3x3();
		output.matrix = [
			this.matrix[m3x3.M00] * x,
			this.matrix[m3x3.M01] * x,
			this.matrix[m3x3.M02] * x,
			
			this.matrix[m3x3.M10] * y,
			this.matrix[m3x3.M11] * y,
			this.matrix[m3x3.M12] * y,
			
			this.matrix[m3x3.M20],
			this.matrix[m3x3.M21],
			this.matrix[m3x3.M22]
		];
		return output;
	}
	getFloatArray(){
		return new Float32Array(this.matrix);
	}
}
m3x3.M00 = 0;
m3x3.M01 = 1;
m3x3.M02 = 2;
m3x3.M10 = 3;
m3x3.M11 = 4;
m3x3.M12 = 5;
m3x3.M20 = 6;
m3x3.M21 = 7;
m3x3.M22 = 8;