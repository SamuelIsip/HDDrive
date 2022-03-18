function loaderDialog() {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      toggleLoader();
    }
  };
}

function toggleLoader() {
  var x = document.getElementsByClassName("spinner")[0];
  if ((<HTMLElement>x).style.display === "none") {
    (<HTMLElement>x).style.display = "block";
  } else {
    (<HTMLElement>x).style.display = "none";
  }
}
