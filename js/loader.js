function loaderDialog() {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      toggleLoader();
    }
  };
}

async function toggleLoader() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  var x = document.getElementsByClassName("spinner")[0];
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
