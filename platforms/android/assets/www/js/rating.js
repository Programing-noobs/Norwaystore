$( '#restaurant' ).live( 'pageinit',function(event)
        {
		var SelectedOptionClass = $('option:selected').attr('class');
		$('div.ui-select').addClass(SelectedOptionClass);
		
		$('#rating').live('change', function()
                {	 
			$('div.ui-select').removeClass(SelectedOptionClass);
			
			SelectedOptionClass = $('option:selected').attr('class');
			$('div.ui-select').addClass(SelectedOptionClass);		
			
		 });
		
	  
	});