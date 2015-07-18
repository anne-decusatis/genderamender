var gendermap = [
"male",
"female",
"trans",
"genderqueer",
"agender",
"cis"
];

$( document ).ready(function() {
	var genders = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		//prefetch: '../genders.json',
		local: gendermap
	});
	$('#gender-input .typeahead').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'genders',
		source: genders
	});
	
	$('.typeahead').bind('typeahead:open', function(ev, suggestion) {
	  console.log('opened');
	});
});