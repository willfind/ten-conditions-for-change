let gt = require("gt-helpers")
let fs = require("fs")
let csv = require("csvtojson")
let lodash = require("lodash")

String.prototype.replaceAll = function(a, b){
	let out = this.slice()
	while (out.match(a)) out = out.replace(a, b)
	return out
}

csv().fromFile("biases.csv").then(biases => {
	biases = biases.slice(0, 3)

	let data = {
		biases: biases.map((bias, i) => {
			bias.name = bias.name.replaceAll('"', "&quot;").replaceAll(/\t|\r|\n/, " ")
			bias.groupName = bias.name[0] + gt.string.toCamelCase(bias.name.substring(1, bias.name.length))
			bias.content = `<div class='text' style='font-size: 16.8px;'>${bias.content.replaceAll("\n", "<br>").replaceAll(/\t|\r/, " ").replaceAll("  ", " ").replaceAll('"', "&quot;")}</div><br>`
			bias.source = bias.source.split(/\s|\n|\r|\t/)[0]
			bias.gtObject = gt.object.toAssociation(bias)

			if (bias.source.substring(0, 4) !== "http"){
				bias.source = "http://www.google.com/search?q=" + bias.name.replaceAll(" ", "+")
			}

			return bias
		})
	}

	let template = fs.readFileSync("template.gt", "utf8")
	
	gt.template.liquidBuild(template, data).then(out => {
		fs.writeFileSync("final.gt", out, "utf8")
	})
})