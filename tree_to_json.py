import json

filenames = []
titles = []

with open("tree.txt", encoding="cp932") as f:
    for line in f:
        line = line.strip()
        if line.endswith(".zip"):
            filenames.append(line)
            titles.append(line[:-4])  # .zip を削除

data = {
    "filename": filenames,
    "title": titles
}

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("output.json を作成した")
