export  function switchDisplayContainer(containerId) {
    var element = document.getElementsByClassName("container");
    for (var i = 0; i < element.length; i++) {
        element[i].style.display = "none";
    }

    document.getElementById(containerId).style.display = 'block';
}
