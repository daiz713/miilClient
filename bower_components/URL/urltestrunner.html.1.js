
function fetchTests() {
  var request = new XMLHttpRequest()
  request.open("GET", "urltests.txt")
  request.send()
  request.responseType = "text"
  request.onload = function() { runTests(request.response) }
}

function setBase(base) {
  document.getElementById("base").href = base
}

function bURL(url, base) {
  base = base || "about:blank"
  setBase(base)
  var a = document.createElement("a")
  a.setAttribute("href", url)
  return a
}

function runTests(raw) {
  var tests = URLTestParser(raw)
  for(var i = 0, l = tests.length; i < l; i++) {
    var test = tests[i],
        url = new URL(test.input, new URL(test.base))
    if(url.protocol != test.protocol ||
       url.hostname != test.host ||
       url.port != test.port ||
       url.pathname != test.path ||
       url.search != test.search ||
       url.hash != test.hash ||
       url.href != test.href) {
      document.querySelector("pre").appendChild(document.createTextNode("Got: " + url.protocol + "," + url.hostname + "," + url.port + "," + url.pathname + "," + url.search + "," + url.hash + ", expected: " + test.href + ", for input:" + test.input + "\n"))
    }

    /*
    url = bURL(test.input, test.base)
    if(url.protocol != test.protocol ||
       url.hostname != test.host ||
       url.port != test.port ||
       url.pathname != test.path ||
       url.search != test.search ||
       url.hash != test.hash ||
       url.href != test.href) {
      document.querySelector("pre").appendChild(document.createTextNode("BROWSER Got: " + url.protocol + "," + url.hostname + "," + url.port + "," + url.pathname + "," + url.search + "," + url.hash + ", expected: " + test.href + ", for input:" + test.input + "\n"))
    }
    */
  }
  document.querySelector("pre").appendChild(document.createTextNode("DONE"))
}

window.onload = fetchTests
