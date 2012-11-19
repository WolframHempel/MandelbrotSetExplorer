MandelbrotSetComponent = function( oContainer, mConfig )
{
	this.m_eCanvas = document.createElement( "canvas" );
	this.m_eCanvas.width = oContainer.width;
	this.m_eCanvas.height = oContainer.height;
	oContainer.element.append( this.m_eCanvas );

	this.m_oMBS = new MandelBrotSetVisualiser( this.m_eCanvas );
	this.m_oAreaSelector = new AreaSelector( oContainer.element );
	this.m_oControlModel = new ControlModel( this.m_oMBS, this.m_oAreaSelector, this.m_eCanvas );
	ko.applyBindings( this.m_oControlModel, $('.controls')[0] );
	this.m_oMBS.draw( 0, 0, 1 );
};



 




