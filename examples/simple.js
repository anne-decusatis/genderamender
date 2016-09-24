var genderDataLocation = 'https://raw.githubusercontent.com/anne-decusatis/genderamender/master/genders/en-US.json';
var genderData = {}; // populated in document.ready
var genderInputSchemaLocation = 'https://raw.githubusercontent.com/anne-decusatis/genderamender/master/gender_input_schema.json';
var genderInputSchema = {}; // populated in document.ready
var genderOutputSchemaLocation = 'https://raw.githubusercontent.com/anne-decusatis/genderamender/master/gender_output_schema.json';
var genderOutputSchema = {}; // populated in document.ready

// for display of rendered info 
var renderStringsEnglishLocation = 'https://raw.githubusercontent.com/anne-decusatis/genderamender/master/examples/strings/en-US.json'
var renderStringsEnglish = {} // populated in document.ready

// the things you've selected
var choices = [];

$( document ).ready(function() {
	$.getJSON(genderInputSchemaLocation).done(function(object) {
		genderInputSchema = object;
	}).fail(function() {
		alert("something went wrong getting gender input info :(");
	});
	
	$.getJSON(genderOutputSchemaLocation).done(function(object) {
		genderOutputSchema = object;
	}).fail(function() {
		alert("something went wrong getting gender output info :(");
	});
	
	$.getJSON(genderDataLocation).done(function(object) {
		genderData = object;
	}).fail(function() {
		alert("something went wrong getting internal gender info :(");
	});
	
	$.getJSON(renderStringsEnglishLocation).done(function(object) {
		renderStringsEnglish = object;
	}).fail(function() {
		alert("something went wrong getting English string output info :(");
	});
	
	setUpBloodhoundSearch();
});

function setUpBloodhoundSearch() {
	var typer = $('.typeahead');
	var genders = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: genderDataLocation,
			transform: function transform(response) {
				return Object.keys(response);
			}
		},
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

	// set up display of chosen results from search
	typer.bind('typeahead:select', function(ev, suggestion) {
		choices.push(suggestion);
		var choicesElement = $('#user-genders');
		choicesElement.append("<li>" + suggestion + " </li>");
		showDeterminedGender(choices, genderData, genderInputSchema, genderOutputSchema);
	});

}

function getIsInKeys(keys, mappingKeysToGenderInts, genderIntToCheck) {	
	for(var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var value = mappingKeysToGenderInts[key];
		if(value == genderIntToCheck) {
			return true;
		}
	}
	return false;
}

function showDeterminedGender(keys, source, inputSchema, outputSchema) {
	var result = "UNSURE";
	
	// determine what's in user choices
	var female = getIsInKeys(keys, source, inputSchema.FEMALE);
	var male = getIsInKeys(keys, source, inputSchema.MALE);
	var nonbinary = getIsInKeys(keys, source, inputSchema.NONBINARY);
	var decline = getIsInKeys(keys, source, inputSchema.DECLINE);
	var nongendered = getIsInKeys(keys, source, inputSchema.NONGENDERED);
	
	// then determine result based on user choices
	if(decline) {
		result = "DECLINE";
		$('#user-result').html(renderStringsEnglish[result]);
		return;
	}
	if(female && !male && !nonbinary) {
		result = "FEMALE";
		$('#user-result').html(renderStringsEnglish[result]);
		return;
	}
	if(male && !female && !nonbinary) {
		result = "MALE";
		$('#user-result').html(renderStringsEnglish[result]);
		return;
	}
	if(nonbinary && !male && !female) {
		result = "NONBINARY";
		$('#user-result').html(renderStringsEnglish[result]);
		return;
	}
	if(!nonbinary && !female && !male && !decline && nongendered) {
		result = "NONGENDERED";
		$('#user-result').html(renderStringsEnglish[result]);
		return;
	}
	$('#user-result').html(renderStringsEnglish[result]);
}
