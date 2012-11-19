AreaSelector = function( eContainer )
{
	EventEmitter.call( this );

	this.m_eContainer = $( eContainer );
	this.m_nWidth = parseInt( this.m_eContainer.width(), 10 );
	this.m_nHeight = parseInt( this.m_eContainer.height(), 10 );
	this.m_nWidthToLength = this.m_nHeight / this.m_nWidth;

	this.m_eHandle =  $("<div class='handle'><div></div></div>");
	eContainer.append( this.m_eHandle );

	this.m_oHandleMoveListener = new DragListener( this.m_eHandle );
	this.m_oHandleMoveListener.bind( "drag", this._onHandleMove, this );
	this.m_oHandleMoveListener.bind( "dragStop", this._onHandleMoveStop, this );
	this.m_oHandleMoveListener.bind( "dragStop", this._emitUpdate, this );

	this.m_nHandleX = 10;
	this.m_nHandleY = 10;
	this.m_nHandleLeft = 10;
	this.m_nHandleTop = 10;
	this.m_nHandleWidth = 100;
	this.m_nHandleHeight = this.m_nHandleWidth * this.m_nWidthToLength;

	this.m_eHandle.width( this.m_nHandleWidth );
	this.m_eHandle.height( this.m_nHandleHeight );
	
	this.m_eResizer = this.m_eHandle.find( "div" );
	this.m_eResizer.bind( "mousedown mousemove", function( e ){ e.stopPropagation(); });

	this.m_oResizerMoveListener = new DragListener( this.m_eResizer );
	this.m_oResizerMoveListener.bind( "dragStart", this._onResizerMoveStart, this );
	this.m_oResizerMoveListener.bind( "drag", this._onResizerMove, this );
	this.m_oResizerMoveListener.bind( "dragStop", this._emitUpdate, this );

	this.m_nHandleStartWidth = this.m_nHandleHeight;
	this.m_nHandleStartHeight = this.m_nHandleHeight;
};

AreaSelector.prototype.getPosition = function()
{
	var mData =
	{
		x: this.m_nHandleLeft,
		y: this.m_nHandleTop,
		width: this.m_nHandleWidth,
		height: this.m_nHandleHeight
	};

	return mData;
};

AreaSelector.prototype._onHandleMoveStop = function( nX, nY )
{
	this.m_nHandleX = this.m_nHandleLeft;
	this.m_nHandleY = this.m_nHandleTop;
};

AreaSelector.prototype._onHandleMove = function( nX, nY )
{
	var nLeft = this.m_nHandleX + nX;
	var nTop = this.m_nHandleY + nY;

	if( nLeft > 0 && nLeft < this.m_nWidth - this.m_nHandleWidth )
	{
		this.m_eHandle.css({ "left": nLeft });
		this.m_nHandleLeft = nLeft;
		
	}

	if( nTop > 0 && nTop < this.m_nHeight - this.m_nHandleHeight )
	{
		this.m_eHandle.css({ "top": nTop });
		this.m_nHandleTop = nTop;
	}
};

AreaSelector.prototype._onResizerMoveStart = function( nX, nY )
{
	this.m_nHandleStartWidth = this.m_nHandleWidth;
	this.m_nHandleStartHeight  = this.m_nHandleHeight;
};

AreaSelector.prototype._onResizerMove = function( nX, nY )
{
	var nNewWidth = this.m_nHandleStartWidth + nX;
	var nNewHeight = this.m_nHandleStartHeight + nY;

	if( this.m_nWidthToLength !== null )
	{
		nNewHeight = nNewWidth * this.m_nWidthToLength;
	}

	if( nNewWidth + this.m_nHandleLeft < this.m_nWidth && nNewHeight + this.m_nHandleTop < this.m_nHeight )
	{
		this.m_nHandleWidth = nNewWidth;
		this.m_eHandle.width( this.m_nHandleWidth );

		this.m_nHandleHeight = nNewHeight;
		this.m_eHandle.height( this.m_nHandleHeight );
	}
};

AreaSelector.prototype._emitUpdate = function()
{
	this.emit( "update", this.m_nHandleLeft, this.m_nHandleTop, this.m_nHandleWidth, this.m_nHandleHeight );
};
