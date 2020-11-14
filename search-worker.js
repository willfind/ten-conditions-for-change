importScripts("res/js/lib/lunr.min.js")

let index
let pool

onmessage = async function(event){
  let data = event.data

  if (data.message === "load"){
    let results = await fetch("search-stuff.json")
    let searchStuff = await results.json()
    pool = searchStuff.pool
    index = lunr.Index.load(JSON.parse(searchStuff.index))
    postMessage({message: "ready"})
  }

  else if (data.message === "search"){
    let results = index.search(data.query).slice(0, 30)

    let out = results.map(function(result){
      return pool.filter(item => item.title === result.ref)[0]
    })

    postMessage({message: "results", results: out})
  }
}
