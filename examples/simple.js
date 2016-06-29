var genderDataLocation = 'https://raw.githubusercontent.com/anne-decusatis/genderamender/master/genders/en-US.json';
// vars for input #s
var DECLINE = -1, NONGENDERED = 0, FEMALE = 1, MALE = 2, NONBINARY = 3;
// additional vars needed for rendering
var UNSURE = -2;

// for display of rendered info TODO break out into separate file
var renderStringsEnglish = {
	UNSURE: "we can't say what gender you are",
	DECLINE: "you don't want to tell us what gender you are",
	NONGENDERED: "you haven't chosen any gendered descriptors",
	FEMALE: "we think you've chosen female words",
	MALE: "we think you've chosen male words",
	NONBINARY: "we think you've chosen gendered words which aren't male or female"
}

// the things you've selected
var choices = [];

$( document ).ready(function() {
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
		showDeterminedGender(choices, genderDataLocation);
	});

}

function showDeterminedGender(keys, sourcefile) {
	var result = "UNSURE";
	$.getJSON(sourcefile).done(function(object) {
		var female = false;
		var male = false;
		var nonbinary = false;
		var decline = false;
		var nongendered = false;
		
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var value = object[key];
			if(value == FEMALE) {
				female = true;
			}
			if(value == MALE) {
				male = true;
			}
			if(value == NONBINARY) {
				nonbinary = true;
			}
			if(value == DECLINE) {
				decline = true;
			}
			if(value == NONGENDERED) {
				nongendered = true;
			}
		}
	
		if(decline) {
			result = "DECLINE";
		}
		if(female && !male && !nonbinary) {
			result = "FEMALE";
		}
		if(male && !female && !nonbinary) {
			result = "MALE";
		}
		if(nonbinary && !male && !female) {
			result = "NONBINARY";
		}
		if(!nonbinary && !female && !male && !decline && nongendered) {
			result = "NONGENDERED";
		}
		
		$('#user-result').html(renderStringsEnglish[result]);
	}).fail(function() {
		$('#user-result').html(renderStringsEnglish["UNSURE"]); // this shouldn't happen
	});
}
