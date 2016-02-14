import json
import RenderGenders

def render(chosen_options=[], filepath="../../genders/en-US.json"):
    renderer = RenderGenders.RenderGenders()
    all_gender_options = {}
    with open(filepath, "r") as f:
        all_gender_options = json.load(f)
    return renderer.render_genders(all_gender_options, chosen_options)
    
if __name__ == "__main__":
    chosen_options = [x.strip() for x in raw_input("A comma separated list of genders you identify with").split(",")]
    print # newline
    print render(chosen_options)
