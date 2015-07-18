// constructs the suggestion engine
var genders = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../genders.txt'
});
 
$('#gender-input .typeahead').typeahead(null,
{
  name: 'genders',
  source: genders
});
