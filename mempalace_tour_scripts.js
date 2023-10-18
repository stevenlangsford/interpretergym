//my_palace is defined in resources/my_palace.js, loaded by index.html.

//toUberdiv is a helper in mempalace_scripts

let tourIndex = 0;

function nextTour(){
    tourIndex = tourIndex + 1;
    if(tourIndex < my_palace.length){
	viewTour();
    } else{
	location.reload();
    }
}

function restartTour(){
    tourIndex = 0;
    viewTour();
}

function viewTour(){
    loci = "<p>You are at: <h1>"+ my_palace[tourIndex]+"</h1>"
    options = "<p><button onClick=nextTour()>Next location</button></p><p><button onClick=location.reload()>Main menu</button></p>"

    toUberdiv(loci+options);
    
}

