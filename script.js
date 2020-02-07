//Fetch data from google sheets when site loads


document.addEventListener("DOMContentLoaded", getJson);

//Make function run parallel with rest of website 
async function getJson(){
    
    //Make a constant that fetches data from google sheet json file
    const response = await fetch("https://spreadsheets.google.com/feeds/list/1XWWbfWszD7f4jHqp51V_oT3pkHuR-ceEUw4YtrvK7F0/od6/public/values?alt=json");
    
    //Convert constant response to json objects
    const data = await response.json();
    
    //Log all json objects
    console.log(data.feed.entry);
    
    //Make variable with data from google sheet with lists of objects
    let persons = data.feed.entry; 
    
    //Make loop so you can clone template for each person and their data
    
    persons.forEach(person => {
        
        //Make a clone of template        
        let clone = document.querySelector("template").cloneNode(true).content;
        
        //Insert first and last name in h2 of clone template        
        clone.querySelector("h2").textContent = (person.gsx$navn.$t + " " + person.gsx$efternavn.$t);
        
        //Insert picture source in .billede of clone template
        clone.querySelector(".billede").src = person.gsx$billede.$t;
        
        //Insert religion in .religion of clone template        
        clone.querySelector(".religion").textContent = person.gsx$religion.$t;
        
        //Insert the now cloned template to section data_container´s children
        document.querySelector(".data_container").appendChild(clone);
        
    })
}


