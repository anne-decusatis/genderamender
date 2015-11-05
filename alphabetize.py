import json

def alphabetize(filepath="./genders.json"):
	genders = {}
	sorted_genders = {}
	with open(filepath, "r") as f:
		genders = json.load(f)
	with open(filepath, "w") as f:
		for g in g.keys():
			sorted_genders[g] = genders[g]
		f.write(json.dumps(sorted_genders, indent = 2, ensure_ascii=False) + "\n")
		

if __name__ == "__main__":
    alphabetize()
