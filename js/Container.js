Container = function( parent, width, height )
{
	this.width = width;
	this.height = height;
	this.element = $( '<div class="container"></div>' );
	this.parentElement = $( parent );
	this.element.width( width );
	this.element.height( height );
	this.parentElement.append( this.element );
};

