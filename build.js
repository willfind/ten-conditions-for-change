(async function(){
	let fs = require("fs")
	let MarkdownIt = require("markdown-it")
	let JSDOM = require("jsdom").JSDOM
	let csv = require("csvtojson")
	let gt = require("gt-helpers")
	let utils = require("./res/js/src/utils.js")
	let makeKey = utils.makeKey
	let lunr = require("lunr")

	let md = new MarkdownIt({
		html: true,
		xhtmlOut: true,
	}).disable(["code", "fence"])

	// ======================= //
	// SET UP HELPER FUNCTIONS //
	// ======================= //

	String.prototype.replaceAll = function(a, b){
		let out = this.substring(0, this.length)

		while (out.includes(a)){
			out = out.replace(a, b)
		}

		return out
	}

	function stripLeadingNewlines(text){
		while (text[0] === "\n") text = text.substring(1, text.length)
		return text
	}

	function unindent(text){
		text = stripLeadingNewlines(text)
		let index = 0

		while (text[index] === "\t" || text[index] === "\n"){
			index++
		}

		let lines = text.split("\n")

		lines.forEach(function(line, i){
			lines[i] = line.substring(index, line.length)
		})

		return lines.join("\n").trim()
	}

	function markUpExample(example){
		let parts = example.split("...")
		let intro = parts[0]
		let other = parts.slice(1, parts.length).join("...")
		return `<span class="is-light breaks-line-on-desktop">${intro}...</span>${other}`
	}

	function markUpTitleAndExamples(substep){
		let titleParts = substep.title.split(" ")
		let boldPart = titleParts.slice(0, 2).join(" ")
		let otherPart = titleParts.slice(2, titleParts.length).join(" ")
		substep.title = `<b>${boldPart}</b> <span class="is-light">${otherPart}</span>`

		substep.example1 = markUpExample(substep.example1)
		substep.example2 = markUpExample(substep.example2)
		substep.example3 = markUpExample(substep.example3)

		return substep
	}

	function fetchAndParse(path, interventions, biases){
		let out = require(path)

		if (out.content){
			out.content = unindent(out.content)
			out.content = md.render(out.content)
			out.content = out.content.replaceAll(" - ", "—")
			out.content = out.content.replaceAll("---", "—")

			let linkPattern = /<a href=['|"](.*?)['|"]>(.*?)<\/a>/g
			let links = out["content"].match(linkPattern)

			if (links){
				links.forEach(function(link){
					let newLink = (new JSDOM(link)).window.document.getElementsByTagName("a")[0]
					newLink.target = "_blank"
					out.content = out.content.replaceAll(link, newLink.outerHTML)
				})
			}
		}

		if (out.question){
			out.question = md.renderInline(out.question)
		}

		if (out.interventions){
			out.interventions = getInterventions(out.interventions, interventions)
		}

		if (out.shortTitle && biases){
			out.biases = biases[out.shortTitle]
		}

		out.id = makeKey(32)
		return out
	}

	function fetchAndParseStep(path, interventions, biases){
		let step = fetchAndParse(path, interventions)
		step.substeps = []

		for (let i=0; i<step.steps.length; i++){
			let filename = step.steps[i]
			let sub = fetchAndParse("./docs/" + filename, interventions, biases)
			sub = markUpTitleAndExamples(sub)

			sub.examples = [
				{icon: sub.example1Icon, description: sub.example1},
				{icon: sub.example2Icon, description: sub.example2},
				{icon: sub.example3Icon, description: sub.example3},
			]

			step.substeps.push(sub)
		}

		step.id = makeKey(32)
		return step
	}

	function sortByYear(a, b){
		if (a.year < b.year) return -1
		if (a.year > b.year) return 1
		return 0
	}

	function getInterventions(condition, interventions){
		return interventions[condition.toUpperCase()]
	}

	function getSearchStuff(data){
		let interventions = []
		let biases = []

    let colors = {
      "considers": "orange",
      "desires": "orange",
      "intends": "orange",
      "remembers": "green",
      "believes": "green",
      "chooses": "green",
      "knows": "green",
      "has": "green",
      "embodies": "green",
      "maintains": "purple",
    }

    data.steps.forEach(function(step){
      step.substeps.forEach(function(substep){
        let categories = Object.keys(substep.interventions)
				let biasesContainerID = makeKey(32)

        categories.forEach(function(category){
          let subinterventions = substep.interventions[category].interventions

          interventions = interventions.concat(subinterventions.map(function(intervention){
            intervention.substep = substep.shortTitle.toLowerCase()
            intervention.substepid = substep.id
            intervention.subcategoryid = substep.interventions[category].id
            intervention.color = colors[intervention.substep]
            return intervention
          }))
        })

				if (substep.biases && substep.biases.length > 0){
					substep.biases.forEach(function(bias){
						bias.substepid = substep.id
						bias.biasesContainerID = biasesContainerID
					})
				}

				biases = biases.concat(substep.biases || [])
      })
    })

    interventions = interventions.map(function(intervention){
      let out = {}

      Object.keys(intervention).forEach(function(key){
        out[gt.string.toCamelCase(key)] = intervention[key]
      })

      out.title = out.methodName
      out.resultType = "intervention"
      return out
    })

    let frameworks = data.frameworks.items

    frameworks = frameworks.map(function(framework){
      let out = {}

      Object.keys(framework).forEach(function(key){
        out[gt.string.toCamelCase(key)] = framework[key]
      })

      out.resultType = "framework"
      return out
    })

		biases = biases.map(function(bias){
			bias.title = bias.name
			bias.resultType = "bias"
			bias.color = colors[bias.condition.toLowerCase()]
			bias.id = makeKey(32)
			return bias
		})

    let pool = interventions.concat(frameworks).concat(biases)
    let fields = Object.keys(interventions[0]).concat(Object.keys(frameworks[0])).concat(Object.keys(biases[0]))

    pool.forEach(function(item){
      fields.forEach(function(field){
        if (!item[field]) item[field] = ""
      })
    })

    let index = lunr(function(){
      let self = this
      self.ref("title")

      fields.forEach(function(field){
        self.field(field)
      })

      pool.forEach(function(doc){
        self.add(doc)
      })
    })

		index = JSON.stringify(index)
		return {pool, index}
	}

	// =================================== //
	// LOAD DATA FILES, PARSE, AND COMPILE //
	// =================================== //

	// We start by loading, parsing, and compiling the interventions. Each of the ten conditions has corresponding interventions, which are grouped into subcategories within that condition. The first document, interventions.csv, contains the actual interventions themselves, including information about which condition and subcategory each intervention falls into. The second document, interventions-subcategories.csv, contains the descriptions of each subcategory. The purpose of this step in the build process is to combine all of that information.

	// load the interventions data
	let interventions = await csv().fromFile("./docs/interventions.csv")
	let subcategories = await csv().fromFile("./docs/interventions-subcategories.csv")
	let biases = await csv().fromFile("./docs/biases.csv")
	let biasesKeywords = JSON.parse(fs.readFileSync("./docs/biases-keywords.json", "utf8"))

	// compile the subcategory data from individual objects (each representing a line from the CSV file) into one big object
	let tempSubcategories = {}

	subcategories.forEach(function(item){
		let category = item["CONDITION"].toUpperCase()
		let subcategory = item["SUB-CATEGORY"].toUpperCase()
		let description = item["DESCRIPTION"]

		if (!tempSubcategories[category]) tempSubcategories[category] = {}
		if (!tempSubcategories[category][subcategory]) tempSubcategories[category][subcategory] = description
	})

	subcategories = tempSubcategories

	// clean the interventions and compile them into one big object, keeping only those interventions that have been assigned to one of the ten conditions (since there are extras)
	let tempInterventions = {}

	interventions.forEach(function(intervention){
		let category = intervention["TEN CONDITIONS FOR CHANGE"]
		if (!category || category.length === 0) return
		category = category.toUpperCase().trim().split(" ")[1]

		let subcategory = intervention["TEN CONDITIONS FOR CHANGE SUB-CATEGORY"]
		if (!subcategory || subcategory.length === 0) return
		subcategory = subcategory.toUpperCase().trim()

		if (!tempInterventions[category]){
			tempInterventions[category] = {}
		}

		if (!tempInterventions[category][subcategory]){
			let description = subcategories[category][subcategory] || null

			tempInterventions[category][subcategory] = {
				description: description,
				id: makeKey(32),
				interventions: []
			}
		}

		intervention.id = makeKey(32)
		tempInterventions[category][subcategory].interventions.push(intervention)
	})

	interventions = tempInterventions

	// add the cognitive biases; note that:
	// - they will no longer be included with the interventions
	// - they will still need to be added to the search index
	temp = {}

	biases.filter(bias => bias["Should use?"].trim() !== "no").forEach(function(bias){
		try {
			let condition = bias["Ten Conditions for Change"].split(",")[0].trim().split(".")[1].trim()
			if (!temp[condition]) temp[condition] = []

			let out = {}
			out.id = makeKey(32)
			out.condition = condition

			Object.keys(bias).forEach(function(key){
				out[gt.string.toCamelCase(key)] = bias[key]
			})

			out.content = md.render([out.description, out.experimentalEvidence, out.examples, out.benevolentHelper].join("\n"))

			temp[condition].push(out)
		} catch(e){}
	})

	biases = temp

	// define the document structure for the entire page, and then fetch, parse, and render individual documents
	let data = {
		intro: [
			fetchAndParse("./docs/intro.js", interventions),
			fetchAndParse("./docs/overview.js", interventions),
			fetchAndParse("./docs/how-to-use-this-framework.js", interventions),
		],
		preface: fetchAndParse("./docs/preface.js", interventions),
		steps: [
			fetchAndParseStep("./docs/decision.js", interventions, biases),
			fetchAndParseStep("./docs/action.js", interventions, biases),
			fetchAndParseStep("./docs/continuation.js", interventions, biases),
		],
		frameworks: {
			main: fetchAndParse("./docs/other-frameworks.js", interventions),
			items: [
				fetchAndParse("./docs/other-frameworks-01.js", interventions),
				fetchAndParse("./docs/other-frameworks-02.js", interventions),
				fetchAndParse("./docs/other-frameworks-03.js", interventions),
				fetchAndParse("./docs/other-frameworks-04.js", interventions),
				fetchAndParse("./docs/other-frameworks-05.js", interventions),
				fetchAndParse("./docs/other-frameworks-06.js", interventions),
				fetchAndParse("./docs/other-frameworks-07.js", interventions),
				fetchAndParse("./docs/other-frameworks-08.js", interventions),
				fetchAndParse("./docs/other-frameworks-09.js", interventions),
				fetchAndParse("./docs/other-frameworks-10.js", interventions),
				fetchAndParse("./docs/other-frameworks-11.js", interventions),
				fetchAndParse("./docs/other-frameworks-12.js", interventions),
				fetchAndParse("./docs/other-frameworks-13.js", interventions),
				fetchAndParse("./docs/other-frameworks-14.js", interventions),
				fetchAndParse("./docs/other-frameworks-15.js", interventions),
				fetchAndParse("./docs/other-frameworks-16.js", interventions),
				fetchAndParse("./docs/other-frameworks-17.js", interventions),
			].sort(sortByYear),
		},
	}

	// save the compiled data
	let searchStuff = getSearchStuff(data)
	fs.writeFileSync("search-stuff.json", JSON.stringify(searchStuff), "utf8")
	fs.writeFileSync("data.json", JSON.stringify(data), "utf8")
})()
