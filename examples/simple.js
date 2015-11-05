$( document ).ready(function() {
	var typer = $('.typeahead');

	var genders = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: 'https://raw.githubusercontent.com/anne-decusatis/genderamender/buckets_for_genders/genders.json',
			transform: function transform(response) {
				return Object.keys(response);
			}
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
