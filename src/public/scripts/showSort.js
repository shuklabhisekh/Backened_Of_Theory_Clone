let sort_header = document.querySelector(".sorting_header");
let sort_div = document.querySelector(".sorting_div");
let show = true;

function hideShow() {
  if (show) {
    sort_div.style.display = "block";
  } else {
    sort_div.style.display = "none";
  }
  show = !show;
}

//sort by price
let p = document.querySelectorAll(".sortPrice");
for (let i = 0; i < p.length; i++) {
  p[i].addEventListener("click", function () {
    sort_div.style.display = "none";
    if (this.id == "Low" || this.id == "High") {
      sort_header.innerHTML = `Sort (Price ${this.id})`;
    } else {
      sort_header.innerHTML = `Sort (${this.id})`;
    }

    show = !show;
    sortByprice(this.id);
  });
}
