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
			this.matrix[m3x3.m00] * m.matrix[m3x3.m00] + this.matrix[m3x3.m01] * m.matrix[m3x3.m10] + this.matrix[m3x3.m02] * m.matrix[m3x3.m20],
			this.matrix[m3x3.m00] * m.matrix[m3x3.m01] + this.matrix[m3x3.m01] * m.matrix[m3x3.m11] + this.matrix[m3x3.m02] * m.matrix[m3x3.m21],
			this.matrix[m3x3.m00] * m.matrix[m3x3.m02] + this.matrix[m3x3.m01] * m.matrix[m3x3.m12] + this.matrix[m3x3.m02] * m.matrix[m3x3.m22],
			
			this.matrix[m3x3.m10] * m.matrix[m3x3.m00] + this.matrix[m3x3.m11] * m.matrix[m3x3.m10] + this.matrix[m3x3.m12] * m.matrix[m3x3.m20],
			this.matrix[m3x3.m10] * m.matrix[m3x3.m01] + this.matrix[m3x3.m11] * m.matrix[m3x3.m11] + this.matrix[m3x3.m12] * m.matrix[m3x3.m21],
			this.matrix[m3x3.m10] * m.matrix[m3x3.m02] + this.matrix[m3x3.m11] * m.matrix[m3x3.m12] + this.matrix[m3x3.m12] * m.matrix[m3x3.m22],
			
			this.matrix[m3x3.m20] * m.matrix[m3x3.m00] + this.matrix[m3x3.m21] * m.matrix[m3x3.m10] + this.matrix[m3x3.m22] * m.matrix[m3x3.m20],
			this.matrix[m3x3.m20] * m.matrix[m3x3.m01] + this.matrix[m3x3.m21] * m.matrix[m3x3.m11] + this.matrix[m3x3.m22] * m.matrix[m3x3.m21],
			this.matrix[m3x3.m20] * m.matrix[m3x3.m02] + this.matrix[m3x3.m21] * m.matrix[m3x3.m12] + this.matrix[m3x3.m22] * m.matrix[m3x3.m22]
		];
		return output;
	}	
	transition(x, y){
		var output = new m3x3();
		output.matrix = [
			this.matrix[m3x3.m00],
			this.matrix[m3x3.m01],
			x * this.matrix[m3x3.m00] + y * this.matrix[m3x3.m01] + this.matrix[m3x3.m02],
			
			this.matrix[m3x3.m10],
			this.matrix[m3x3.m11],
			x * this.matrix[m3x3.m10] + y * this.matrix[m3x3.m11] + this.matrix[m3x3.m12],
			
			this.matrix[m3x3.m20],
			this.matrix[m3x3.m21],
			x * this.matrix[m3x3.m20] + y * this.matrix[m3x3.m21] + this.matrix[m3x3.m22]
		];
		return output;
	}	
	scale(x, y){
		var output = new m3x3();
		output.matrix = [
			this.matrix[m3x3.m00] * x,
			this.matrix[m3x3.m01] * y,
			this.matrix[m3x3.m02],
			
			this.matrix[m3x3.m10] * x,
			this.matrix[m3x3.m11] * y,
			this.matrix[m3x3.m12],
			
			this.matrix[m3x3.m20] * x,
			this.matrix[m3x3.m21] * y,
			this.matrix[m3x3.m22]
		];
		return output;
	}
	
	getFloatArray(){
		return new Float32Array(this.matrix);
	}
}

//Set an identifier for the matrix cell and column where m01( 0=row and 1=column )

m3x3.m00 = 0;
m3x3.m01 = 1;
m3x3.m02 = 2;
m3x3.m10 = 3;
m3x3.m11 = 4;
m3x3.m12 = 5;
m3x3.m20 = 6;
m3x3.m21 = 7;
m3x3.m22 = 8;

//	m00	m01	m02
//	m10	m11	m12
//	m20	m21	m22