/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


function EmpOrJob(that) {
    if (that.value == "employer") {
        document.getElementById("ifEmployerCName").style.display = "block";
        document.getElementById("ifEmployerCPerson").style.display = "block";
    }
    else {
        document.getElementById("ifEmployerCName").style.display = "none";
        document.getElementById("ifEmployerCPerson").style.display = "none";
    }
    if (that.value == "jobseeker") {
        document.getElementById("ifJobSeekerFName").style.display = "block";
        document.getElementById("ifJobSeekerLName").style.display = "block";
    }
    else {
        document.getElementById("ifJobSeekerFName").style.display = "none";
        document.getElementById("ifJobSeekerLName").style.display = "none";
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}