$( document ).ready(function() {
	var typer = $('.typeahead');
	var genders = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: 'https://raw.githubusercontent.com/anne-decusatis/genderamender/master/genders.json',
        sorter: function(a, b) {
            var i = typer.val().toLowerCase();

            // If there's a complete match it wins.
            if(i == a) { return -1; }
            else if (i == b) { return  1; }

            // Otherwise just sort it naturally.
            else if (a < b) { return -1; }
            else if (a > b) { return  1; }
            else return 0;
        }
	});

	typer.typeahead({
		hint: true,
		highlight: true,
		minLength: 1

	},
	{
		name: 'genders',
		source: genders
	});

	typer.bind('typeahead:select', function(ev, suggestion) {
		var choices = $('#user-genders');
	    choices.html( choices.html() + "<li>" + suggestion + "&nbsp; </li>" ); //FIXME: i'm 100% certain there's a better way for this
	});
});
