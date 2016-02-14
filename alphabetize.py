import json

def alphabetize(filepath="./genders.json"):
	genders = {}
	with open(filepath, "r") as f:
		genders = json.load(f)
	with open(filepath, "w") as f:
		f.write(json.dumps(genders, indent = 2, ensure_ascii=False, sort_keys=True) + "\n")
		

if __name__ == "__main__":
    alphabetize()
