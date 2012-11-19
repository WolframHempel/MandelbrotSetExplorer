DragListener = function(eElement, nButtonCode)
{
	EventEmitter.call(this);

	this.m_eElement = $(eElement);
	this.m_oDocument = $(document);
	this.m_nButtonCode = nButtonCode || 0;

	this.m_nX = 0;
	this.m_nY = 0;

	this.m_nOriginalX = 0;
	this.m_nOriginalY = 0;

	this.m_oMoveEvent = null;

	this.m_eElement.on('touchstart', this.onMouseDown.bind(this));
	this.m_eElement.mousedown(this.onMouseDown.bind(this));
};

DragListener.prototype.onMouseDown = function(oEvent)
{
	oEvent.preventDefault();

	this.m_nOriginalX = this._get(oEvent, 'X');
	this.m_nOriginalY = this._get(oEvent, 'Y');

	this.m_oDocument.on('mousemove', this.onMouseMove.bind(this));
	this.m_oDocument.one('mouseup', this.onMouseUp.bind(this));

	this.m_oDocument.on('touchmove', this.onMouseMove.bind(this));
	this.m_oDocument.one('touchend', this.onMouseUp.bind(this));

	this.emit("dragStart", this.m_nOriginalX, this.m_nOriginalY);
};

DragListener.prototype.onMouseMove = function(oEvent)
{
	oEvent.preventDefault();

	this.m_nX = this._get(oEvent, 'X') - this.m_nOriginalX;
	this.m_nY = this._get(oEvent, 'Y') - this.m_nOriginalY;
	
	this.m_oMoveEvent = oEvent;

	this.emit("drag", this.m_nX, this.m_nY);
};

DragListener.prototype.onMouseUp = function(oEvent)
{
	this.m_oDocument.unbind(this.m_oMoveEvent);

	this.emit("dragStop", oEvent, this.m_nOriginalX + this.m_nX);
};

DragListener.prototype._get = function(oEvent, sCoordinate)
{
	if (oEvent.originalEvent.touches) {
		return oEvent.originalEvent.touches[0]['page' + sCoordinate];
	} else {
		return oEvent['client' + sCoordinate];
	}
};
