let activeElement = undefined;
let activeNav = undefined;
let elementTransitioning = false;
let getVisible = GetURLParameter("visible") ? GetURLParameter("visible") : "me";

const navMe = document.getElementById("navMe");
const navSkills = document.getElementById("navSkills");
const navProjects = document.getElementById("navProjects");
const navContact = document.getElementById("navContact");

setActive(getVisible);
loadNewSection(getVisible);

function reloadContent() {
    getVisible = GetURLParameter("visible") ? GetURLParameter("visible") : "me";
    setActive(getVisible);
    loadNewSection(getVisible);
    return false;
}

function setActive(sectionName) {
    if (activeNav) {
        activeNav.classList.remove("active");
    }
    switch (sectionName) {
        case "me": {
            navMe.classList.add("active");
            activeNav = navMe;
            break;
        }
        case "skills": {
            navSkills.classList.add("active");
            activeNav = navSkills;
            break;
        }
        case "projects": {
            navProjects.classList.add("active");
            activeNav = navProjects;
            break;
        }
        case "contact": {
            navContact.classList.add("active");
            activeNav = navContact;
            break;
        }
    }
}

navMe.addEventListener("click", function (event) {
    event.preventDefault();
    if (GetURLParameter("visible") === "me"
        || elementTransitioning == true) {
        return false;
    }
    SetURLParameter("visible", "me");
    return reloadContent();
});
navSkills.addEventListener("click", function (event) {
    event.preventDefault();
    if (GetURLParameter("visible") === "skills"
        || elementTransitioning == true) {
        return false;
    }
    SetURLParameter("visible", "skills");
    return reloadContent();
});
navProjects.addEventListener("click", function (event) {
    event.preventDefault();
    if (GetURLParameter("visible") === "projects"
        || elementTransitioning == true) {
        return false;
    }
    SetURLParameter("visible", "projects");
    return reloadContent();
});
navContact.addEventListener("click", function (event) {
    event.preventDefault();
    if (GetURLParameter("visible") === "contact"
        || elementTransitioning == true) {
        return false;
    }
    SetURLParameter("visible", "contact");
    return reloadContent();
});

function SetURLParameter(sParam, sValue) {
    window.history.replaceState(
        {},
        document.title,
        `?${sParam}=${sValue}`
    );
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return undefined;
}

async function loadNewSection(sectionName) {
    const sectionToLoad = document.getElementById(sectionName);
    const sectionToUnload = activeElement;

    if (sectionToUnload) {
        await fadeOut(sectionToUnload);
        sectionToUnload.classList.replace("visible", "hidden");
    }
    if (sectionToLoad) {
        sectionToLoad.classList.replace("hidden", "visible");
        await fadeIn(sectionToLoad);
        activeElement = sectionToLoad;
    }
}

function fadeOut(section) {
    return new Promise(resolve => {
        elementTransitioning = true;
        section.classList.add("fadeOut");
        setTimeout(() => {
            section.classList.remove("fadeOut");
            elementTransitioning = false;
            resolve();
        }, 1000);
    });
}

function fadeIn(section) {
    return new Promise(resolve => {
        elementTransitioning = true;
        section.classList.add("fadeIn");
        setTimeout(() => {
            section.classList.remove("fadeIn");
            elementTransitioning = false;
            resolve();
        }, 1000);
    });
}