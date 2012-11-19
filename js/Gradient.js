/**
* @param Array pColorStops Array of arrays with 
*
* nStop ( between 0 and 1 )
* nRed ( between 0 and 255 )
* nGreen ( between 0 and 255 )
* nBlue ( between 0 and 255 )
* nAlpha ( between 0 and 255 )
*
* ordered by nStop e.g.:
*
* [
* 	[ 0, 100, 120, 130, 255 ],
* 	[ 1, 200, 200, 120, 255 ]
* ]
*/
Gradient = function( pColorStops )
{
	this.m_pColorStops = pColorStops;
};

/**
* @param FLOAT nValue between 0 and 1
*/
Gradient.prototype.getColor = function( nValue )
{
	var pStart, pEnd, pColor = [], nF;

	for( var i = 0; i < this.m_pColorStops.length; i++ )
	{
		if( nValue <= this.m_pColorStops[ i + 1 ][ 0 ] )
		{
			pStart = this.m_pColorStops[ i ];
			pEnd = this.m_pColorStops[ i + 1 ];
			break;
		}
	}
	
	nF = ( nValue - pStart[ 0 ] ) / ( pEnd[ 0 ] - pStart[ 0 ] );
	pColor[ 0 ] = Math.floor( pStart[ 1 ] + ( pEnd[ 1 ] - pStart[ 1 ] ) * nF );
	pColor[ 1 ] = Math.floor( pStart[ 2 ] + ( pEnd[ 2 ] - pStart[ 2 ] ) * nF );
	pColor[ 2 ] = Math.floor( pStart[ 3 ] + ( pEnd[ 3 ] - pStart[ 3 ] ) * nF );
	pColor[ 3 ] = Math.floor( pStart[ 4 ] + ( pEnd[ 4 ] - pStart[ 4 ] ) * nF );

	return pColor;
};