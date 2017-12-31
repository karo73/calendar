'use strict';

function Datepicker( id, year, month ){
	
	this.init( id, year, month );
	
}

Datepicker.prototype.drawDays = function(){
	
	this.view += '</tr><tr>';
	
	var day = 1;
	
	for ( var i = 0; i < this.columnCount; i++ ) {
		
		if ( i < this.firstWeekDayOfMonth-1 || day > this.getMonthCount ) {
		
			this.view += '<td class="datepicker-day datepicker-day-empty"></td>';
		
		} else {
			
			this.view += '<td class="datepicker-day' + ( this.thisYear === this.currentYear && this.thisMonth === this.currentMonth && this.thisDay === day ? ' datepicker-today' : '' ) + '">' + ( day++ ) + '</td>';

		}
		
		if ( i % this.rowCount === this.rowCount-1 && i !== this.columnCount-1 ) {
			this.view += '</tr><tr>';
		}
		
	}
		
	this.view += '</tr></table></div>';
	
};

Datepicker.prototype.drawWeeks = function(){

	this.view += '<table class="datepicker-table"><tr>';
	
	for ( var i = 0; i < this.rowCount; i++ ) {
		
		this.view += '<th class="datepicker-week">' + this.weekNames[i] + '</th>';
		
	}
	
};

Datepicker.prototype.drawYearMonth = function(){
	
	this.view += '<div class="datepicker-year-month">' + this.monthNames[this.currentMonth] + ' ' + this.currentYear + '</div>';
	
};

Datepicker.prototype.changeMonthYear = function( mode ){
	
	if ( mode === 'prev' ) {
		
		this.currentMonth--;
		
		if ( this.currentMonth == 0 ) {
			this.currentMonth = 12;
			this.currentYear--;
		}
	
	} else {
		
		if ( this.currentMonth > 12 ) {
			this.currentMonth = 1;
			this.currentYear++;
		}
		
		this.currentMonth++;
		
	}
	
	this.init( this.element, this.currentYear, this.currentMonth );
	
};

Datepicker.prototype.drawButtons = function(){
	
	this.view += '<button class="datepicker-prev" type="button" title="Նախորդ"><</button>'+
				 '<button class="datepicker-next" type="button" title="Հաջորդ">></button>';
	
};

Datepicker.prototype.buttonEvents = function(){
	
	var self = this,
		elem = document.getElementById( self.element );
	
	elem.getElementsByClassName('datepicker-prev')[0].onclick = function(){
		self.changeMonthYear( 'prev' );
	};
	
	elem.getElementsByClassName('datepicker-next')[0].onclick = function(){
		self.changeMonthYear( 'next' );
	};
	
};

Datepicker.prototype.createCalendar = function(){
	
	// Draw buttons
	this.drawButtons();
	
	// Draw weeks
	this.drawYearMonth();
	
	// Draw weeks
	this.drawWeeks();
	
	// Draw days
	this.drawDays();
	
	return this.view;
	
};

Datepicker.prototype.init = function( id, year, month ){

	this.newDate = new Date();
	
	if ( year && month ) {
		this.newDate = new Date( year, month );
	}
	
	this.element             = id;
	this.date                = this.newDate;
	this.now                 = new Date();
	this.thisDay             = this.now.getDate(); // return 1-31
	this.thisMonth           = this.now.getMonth();
	this.thisYear            = this.now.getFullYear();
	this.currentMonth        = this.date.getMonth();
	this.currentYear         = this.date.getFullYear();
	this.firstWeekDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay() || 7;  // return 0-6 __ 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
	this.getMonthCount  	 = new Date(this.currentYear, this.currentMonth+1, 0).getDate();
	this.weekNames      	 = ['Երկ', 'Երք', 'Չրք', 'Հնգ', 'ՈՒրբ', 'Շբթ', 'Կիր'];
	this.monthNames      	 = ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'];
	this.columnCount    	 = ( this.getMonthCount + this.firstWeekDayOfMonth > 36 ) ? 42 : 35;
	this.rowCount       	 = 7;
	this.view                = '<div class="datepicker-box">';
	
	document.getElementById( this.element ).innerHTML = this.createCalendar();
	
	this.buttonEvents();
	
};


