function addClassByID(classToAdd, elementID) {
    var element = document.getElementById(elementID);
    element.classList.add(classToAdd);
}

function removeClassByID(classToAdd, elementID) {
    var element = document.getElementById(elementID);
    element.classList.remove(classToAdd);
}
