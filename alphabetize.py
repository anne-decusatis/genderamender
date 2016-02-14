import json
import os

def alphabetize(rootdir="./genders/"):
    for root, dirs, files in os.walk(rootdir):
        for name in files:
            filepath = os.path.join(root, name)
            genders = {}
            with open(filepath, "r") as f:
                genders = json.load(f)
            with open(filepath, "w") as f:
                f.write(json.dumps(genders, indent = 2, ensure_ascii=False, sort_keys=True) + "\n")
                # json.dumps won't be ICU localized but it will be self-consistent and that's enough

if __name__ == "__main__":
    alphabetize()
