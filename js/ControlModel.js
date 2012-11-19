ControlModel = function( oMandelBrotSetVisualiser, oAreaSelector, eCanvas )
{
	this.m_oMBSV = oMandelBrotSetVisualiser;
	this.m_oAreaSelector = oAreaSelector;
	this.m_eCanvas = eCanvas;

	this.m_oAreaSelector.bind( "update", this._updateAreaSelectorPosition, this );

	var mPos = this.m_oAreaSelector.getPosition();

	this.AreaSelectorX = ko.observable( mPos.x );
	this.AreaSelectorY = ko.observable( mPos.y );
	this.AreaSelectorWidth = ko.observable( mPos.width );
	this.AreaSelectorHeight = ko.observable( mPos.height );

	this.relX = ko.observable( 0 );
	this.relY = ko.observable( 0 );
	this.zoom = ko.observable( 1 );

	this.maxIterations = ko.observable( this.m_oMBSV.maxIterations );
	this.maxIterations.subscribe( this._setMaxIterations.bind( this ) ); 
};

ControlModel.prototype.reset = function()
{
	this.relX( 0 );
	this.relY( 0 );
	this.zoom( 1 );
	this.redraw();
};

 ControlModel.prototype.redraw = function()
{
	this.m_oMBSV.draw( this.relX(), this.relY(), this.zoom() );
};

ControlModel.prototype.zoomIntoMandelbrotSet = function()
{
	var mPos = this.m_oAreaSelector.getPosition();
	this.relX( this.m_oMBSV.left + this.m_oMBSV.zoom * ( this.AreaSelectorX() / this.m_eCanvas.width ) );
	this.relY( this.m_oMBSV.top + this.m_oMBSV.zoom * ( this.AreaSelectorY() / this.m_eCanvas.height ) );
	this.zoom( this.m_oMBSV.zoom * ( this.AreaSelectorWidth() / this.m_eCanvas.width ) );
	
	this.redraw();
};

ControlModel.prototype._setMaxIterations = function()
{
	this.m_oMBSV.maxIterations = this.maxIterations();
};

ControlModel.prototype._updateAreaSelectorPosition = function( x, y, width, height )
{
	this.AreaSelectorX( x );
	this.AreaSelectorY( y );
	this.AreaSelectorWidth( width );
	this.AreaSelectorHeight( height );
};

