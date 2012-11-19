MandelBrotSetVisualiser = function( eCanvas )
{
	this.context = eCanvas.getContext("2d");
	this.width = eCanvas.width;
	this.height = eCanvas.height;
	this.left = 0;
	this.top = 0;
	this.zoom = 1;
	this.maxIterations = 1000;
	var pColorStops =
	[
		[ 0,    0,  0,    160,    255 ],
		[ 0.03,  255,  255,  255,    255 ],
		[ 0.1,  200,  200,    0,    255 ],
		[ 0.2,  0,  200,    255,    255 ],
		[ 1,    0,    0,    0,  255 ]
	];
	this.gradient = new Gradient( pColorStops );
};


/**
* @param FLOAT left 0 to 1
* @param FLOAT topy 0 to 1
* @param FLOAT width 0 to 1
* @param FLOAT height 0 to 1
*/
MandelBrotSetVisualiser.prototype.draw = function( left, top, zoom )
{
	this.left = left;
	this.top = top;
	this.zoom = zoom;
	console.log( "drawing with " + this.maxIterations );

	var mData = this.context.getImageData(0, 0, this.width, this.height );
	var x0, y0, yAbs, x, y, j, _x, r, g, b;

	for( var i = 0; i < mData.data.length; i += 4 )
	{
		// x0 = -2.5 + 3.5 * ( ( (i / 4) % mData.width) / mData.width );
		// y0 = -1 + 2 * ( Math.floor( i / 4 / mData.width ) / mData.height );

		x0 = ( -2.5 + 3.5 * left ) + ( 3.5 * zoom ) * ( ( (i / 4) % mData.width) / mData.width );
		y0 = ( -1 + 2 * top ) + ( 2 * zoom ) * ( Math.floor( i / 4 / mData.width ) / mData.height );

		x = 0;
		y = 0;

		j = 0;

		while(x * x + y * y < 4 && j < this.maxIterations)
		{
			_x = x * x - y * y + x0;
			y = 2 * x * y + y0;
			x = _x;
			j++;
		}

		var pColor = this.gradient.getColor( j / this.maxIterations );

		mData.data[i] = pColor[ 0 ];
		mData.data[i + 1] = pColor[ 1 ];
		mData.data[i + 2] = pColor[ 2 ];
		mData.data[i + 3] = pColor[ 3 ];

		// mData.data[i] = Math.floor(255 * (j / this.maxIterations ) ); //red
		// mData.data[i + 1] = Math.floor(255 * (j / this.maxIterations ) ); //green
		// mData.data[i + 2] = Math.floor(255 * (j / this.maxIterations ) ); //blue
		// mData.data[i + 3] = 255;
	}

	this.context.putImageData(mData, 0, 0);
};

	
