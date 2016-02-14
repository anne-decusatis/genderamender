# see https://stackoverflow.com/questions/36932/how-can-i-represent-an-enum-in-python 
# i don't want to commit to pypi or to python 3.4 right now
def enum(**enums):
    return type('Enum', (), enums)


class RenderGenders(): 
    RENDERED_GENDERS = enum(UNSURE = -2, # we can't render their choices with certainty
                            DECLINE = -1, # they don't want us to know their gender info
                            NONGENDERED = 0, # placeholder, right now if only nongendered words chosen, we return "unsure"
                            FEMALE = 1, # they've chosen only words w/no and female info
                            MALE = 2, # they've chosen only words w/no and male info
                            NONBINARY = 3) # they've chosen only words w/no and non-male-or-female (but still gendered) info

    POTENTIAL_INPUTS = enum(DECLINE = -1, NONGENDERED = 0, FEMALE = 1, MALE = 2, NONBINARY = 3)

    # all_gender_options should be a dict of all option strings -> numbers
    # chosen_gender_options should be a set of option strings
    # returns an element from RENDERED_GENDERS
    def render_genders(self, all_gender_options, chosen_gender_options):
        relevant_numbers = [all_gender_options.get(x) for x in chosen_gender_options]
        return self.render_genders_from_numbers(relevant_numbers)
        
    # chosen_numbers should be a list of numbers that correspond, as in genders.json, to:
    # -1 = decline, 0 = nongendered, 1 = female, 2 = male, 3 = nonbinary
    # returns an element from RENDERED_GENDERS
    def render_genders_from_numbers(self, chosen_numbers):
        RENDERED_GENDERS = self.RENDERED_GENDERS
        POTENTIAL_INPUTS = self.POTENTIAL_INPUTS
        if not chosen_numbers:
            return RENDERED_GENDERS.UNSURE
        # first off, if they picked a decline-to-provide word, ignore everything else
        if POTENTIAL_INPUTS.DECLINE in chosen_numbers:
            return RENDERED_GENDERS.DECLINE
        
        female_words = POTENTIAL_INPUTS.FEMALE in chosen_numbers
        male_words = POTENTIAL_INPUTS.MALE in chosen_numbers
        nb_words = POTENTIAL_INPUTS.NONBINARY in chosen_numbers
        
        if female_words and not male_words and not nb_words:
            return RENDERED_GENDERS.FEMALE
        elif male_words and not female_words and not nb_words:
            return RENDERED_GENDERS.MALE
        elif nb_words and not male_words and not female_words:
            return RENDERED_GENDERS.NONBINARY
        else:
            return RENDERED_GENDERS.UNSURE
