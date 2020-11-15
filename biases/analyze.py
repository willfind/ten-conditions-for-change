from python_data_science_helpers.helpers import *
import json

def findString(x, arr):
  return filter(lambda val: x.lower() in val.lower(), arr)[0]

biases = pd.read_csv("biases.csv")
data = pd.read_csv("data.csv")
timeFinished = findString("time finished", data.columns)
minutesSpent = findString("minutes spent", data.columns)
data = data.loc[data[timeFinished].dropna().index]

final = data["final"].apply(lambda obj: json.loads(obj))
finalCols = sorted(list(final[0].keys()))
df = DF()

for col in finalCols:
  df = df.assign(**{col: final.apply(lambda obj: obj[col])})

randomNumbers = list(data["previousRandomNumbers"].apply(lambda s: json.loads(s)))
biases = DF(map(lambda numbers: map(lambda n: biases.iloc[n, :]["name"], numbers), randomNumbers))
biases.columns = list("bias" + str(i) for i in [1, 2, 3])
biases.index = df.index
df = df.join(biases)
df = df[sorted(df.columns)]
df.to_csv("cleaned.csv", index=False)

plot.hist(data[minutesSpent])
plot.title("distribution of minutes spent")
plot.savefig("/home/josh/Desktop/minutes-spent.png")
# plot.show()
plot.clf()