var gendermap = [
"male",
"female",
"trans",
"genderqueer",
"agender",
"cis"
];


$( document ).ready(function() {
	var typer = $('.typeahead');

	var genders = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		//prefetch: '../genders.json',
		local: gendermap
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
		choices.html( choices.html() + "<li>" + suggestion + "</li>" ); //FIXME: i'm 100% certain there's a better way for this
	});
});
