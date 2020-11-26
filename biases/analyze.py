from python_data_science_helpers.helpers import *
import json

def find(x, arr):
  return filter(lambda val: x.lower() in val.lower(), arr)[0]

timeFinished = "Time Finished (UTC)"
biases = pd.read_csv("biases.csv")
data = pd.read_csv("data.csv", parse_dates=[timeFinished])
data = data.loc[where(data[timeFinished] >= pd.to_datetime("November 17, 2020"))[0]]
final = data["final"].dropna().reset_index(drop=True)
final = final.apply(lambda s: json.loads(s)).values
out = {}
maxLength = 0

for i in range(0, len(final)):
  obj = final[i]

  for key in obj.keys():
    val = obj[key]

    if key not in out:
      out[key] = [val]
    else:
      out[key].append(val)

    if len(out[key]) > maxLength:
      maxLength = len(out[key])

for key in out.keys():
  while len(out[key]) < maxLength:
    out[key].append(None)

out = DF(out)
out.to_csv("summary.csv", index=False)