function fetchData() {
    const API_ENDPOINT = "https://disease.sh/v3/covid-19/all";
    fetch(API_ENDPOINT)
        .then(function(response) {
           // console.log(response)
           const jsonData = response.json();
           // console.log(jsonData)
           return jsonData;
        })
        .then(function(jsonData){
            displayData(jsonData)
        })

        const API_ENDPOINT1 = "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=30&fullData=false";
        fetch(API_ENDPOINT1)
            .then(function(response) {
               // console.log(response)
               const jsonData = response.json();
               // console.log(jsonData)
               return jsonData;
            })
            .then(function(jsonData){
                //console.log(jsonData);
                display_vaccinated(jsonData)
            })  
}

function f(num) {
    const formattedNum = new Intl.NumberFormat("en-IN").format(num);
    return formattedNum;
}

function displayData(data) {
    
    const stats = document.querySelectorAll(".statistics");
    // active
    stats[0].children[2].textContent = f(data.active);
    stats[0].children[3].textContent = f(data.todayCases);
    // recovered
    stats[1].children[2].textContent = f(data.recovered);
    stats[1].children[3].textContent = f(data.todayRecovered);
    // deaths
    stats[3].children[2].textContent = f(data.deaths);
    stats[3].children[3].textContent = f(data.todayDeaths);
    const header=document.getElementById("span");
    header.textContent=f(data.cases);
}

function display_vaccinated(data){
   
    //console.log(json_data);
    const vaccine_counts=Object.values(data);
    const today_count=vaccine_counts.pop();
   
    const previouscount=vaccine_counts.pop();
    const diff=(today_count-previouscount);


    const stats=document.querySelectorAll(".statistics");
    stats[2].children[2].textContent=f(today_count);
    stats[2].children[4].textContent=f(diff);
}

window.onload = function() {
    fetchData();
}
