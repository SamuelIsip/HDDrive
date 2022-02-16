function loaderDialog() {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      toggleLoader();
    }
  };
}

function toggleLoader() {
  setTimeout(dummyFunction, 2000);
  var x = document.getElementsByClassName("spinner")[0];
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function dummyFunction() {}
