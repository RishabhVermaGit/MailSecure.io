const getData = async ()=>{
    const value = document.getElementById("floatingEmail").value
    const url = `https://api.eva.pingutil.com/email?email=${value}`
    const p = await fetch(url)
    const response = await p.json()
    return response
}

const mainFunc = async ()=>{
    document.getElementById("results").style.display = "none"
    document.getElementById("alertCont").innerHTML = ""
    document.getElementById("results").style.display = "block"
    document.getElementsByClassName("resultsCont")[0].innerHTML = `<div class="spinner-border mx-auto" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`
    const data = await getData()
    console.log(data)
    document.getElementsByClassName("resultsCont")[0].innerHTML = ""
    for(let keys of Object.keys(data.data)){
        document.getElementsByClassName("resultsCont")[0].innerHTML += `<div>${keys} : ${data.data[keys]}</div>`
    }
    if(data.data.valid_syntax === true && data.data.webmail === true && data.data.deliverable === true && data.data.gibberish === false && data.data.spam === false && data.data.disposable == false) document.getElementById("alertCont").innerHTML = `<div class="alert alert-success" role="alert">Your email address is valid!</div>`
    else document.getElementById("alertCont").innerHTML = `<div class="alert alert-danger" role="alert">Your email address is invalid!</div>`
}

document.getElementById("button-addon2").addEventListener("click",mainFunc)