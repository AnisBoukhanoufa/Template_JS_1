//backgroun image change every 10s
//background image number local storage
let imgCounter;
if (window.localStorage.getItem("imgNum") === null) {
  imgCounter = 1;
} else {
  imgCounter = parseInt(window.localStorage.getItem("imgNum")) - 1;
}

let backgroundInterval;

if (window.localStorage.getItem("randomBackground") === null) {
  window.localStorage.setItem("randomBackground", "yes");
}

if (window.localStorage.getItem("randomBackground") === "yes") {
  backgroundInterval = setInterval(() => {
    if (imgCounter < 6) {
      document.getElementsByClassName(
        "landing-page"
      )[0].style.backgroundImage = `url(images/0${imgCounter}.jpg)`;
      ++imgCounter;
      window.localStorage.setItem("imgNum", imgCounter);
    } else imgCounter = 1;
  }, 5000);
} else {
  document.getElementsByClassName(
    "landing-page"
  )[0].style.backgroundImage = `url(images/0${imgCounter}.jpg)`;
}

//setting box

let divs = document.querySelectorAll(".setting .content .contain>div");

divs.forEach((element) => {
  element.addEventListener("click", () => {
    divs.forEach((e) => {
      e.removeAttribute("class");
    });
    element.className = "active";
  });
});

let settingButton = document.getElementsByClassName("gear-contain")[0];

settingButton.addEventListener("click", () => {
  let setBox = document.getElementsByClassName("setting")[0];

  setBox.classList.toggle("open");
  let gear = document.querySelector(".setting .gear-contain i");
  gear.classList.toggle("fa-spin");
});

const colorsDivs = document.querySelectorAll(
  ".setting .content .color .contain>div"
);
colorsDivs.forEach((e) => {
  e.onclick = function () {
    // console.log(e.dataset.color);
    document.documentElement.style.setProperty("--main-color", e.dataset.color);
    window.localStorage.setItem("mainColor", e.dataset.color);
  };
});

//local storage main color
if (window.localStorage.getItem("mainColor") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("mainColor")
  );

  colorsDivs.forEach((e) => {
    e.classList.remove("active");
  });

  colorsDivs.forEach((e) => {
    if (e.dataset.color === window.localStorage.getItem("mainColor")) {
      e.classList.toggle("active");
    }
  });
}

//bakcground button yes no

let yesNo = document.querySelectorAll(".background .choice>div");

yesNo.forEach((e) => {
  e.addEventListener("click", (event) => {
    yesNo.forEach((element) => {
      element.classList.remove("active");
    });
    event.target.classList.add("active");
    window.localStorage.setItem("randomBackground", event.target.dataset.value);
    if (event.target.dataset.value === "no") {
      window.clearInterval(backgroundInterval);
    } else {
      backgroundInterval = setInterval(() => {
        if (imgCounter < 6) {
          document.getElementsByClassName(
            "landing-page"
          )[0].style.backgroundImage = `url(images/0${imgCounter}.jpg)`;
          ++imgCounter;
          window.localStorage.setItem("imgNum", imgCounter);
        } else imgCounter = 1;
      }, 5000);
    }
  });
});

//background yes no local storage

if (window.localStorage.getItem("randomBackground") === "yes") {
  yesNo.forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.value === "yes") {
      e.classList.add("active");
    }
  });
} else {
  yesNo.forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.value === "no") {
      e.classList.add("active");
    }
  });
}

let ourSkillsSection = document.querySelector(".our-skills");
let ourSkills = document.querySelectorAll(
  ".our-skills .container .skill-box .content span"
);

window.onscroll = function () {
  if (window.scrollY >= ourSkillsSection.offsetTop - 400) {
    //    console.log( ourSkillsSection.offsetHeight)
    //    console.log(this.innerHeight)
    // console.log(ourSkillsSection.offsetTop)
    ourSkills.forEach((element) => {
      element.style.width = `${element.dataset.percent}%`;
    });
  }
};

//gallery section

let galleryImgs = document.querySelectorAll(".gallery .container .box");

galleryImgs.forEach((element) => {
  element.onclick = function (e) {
    createPopUp(e.target.src, e.target.alt);
  };
});

function createPopUp(targ, title) {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  let div = document.createElement("div");

  let img = document.createElement("img");
  let quit = document.createElement("i");
  quit.id = "quitButt";
  quit.className = "fa-solid fa-x";
  div.classList.add("popup");
  img.src = targ;

  if (title !== "") {
    let header = document.createElement("p");
    let titl = document.createTextNode(title);
    header.appendChild(titl);
    div.appendChild(header);
  }
  div.appendChild(quit);
  div.appendChild(img);
  document.body.appendChild(div);

  //   let quitButton = document.querySelector(".popup i");
  //   quitButton.onclick = function () {
  //     document.querySelector(".overlay").remove();
  //     document.querySelector(".popup").remove();
  //     console.log("outfunction");
  //   };
}

document.addEventListener("click", (e) => {
  if (e.target.id === "quitButt") {
    e.target.parentNode.remove();
    document.querySelector(".overlay").remove();
  }
});
// *********************************************
// bullets

let bulletsbuttons = document.querySelectorAll(".bullets .choice>div");

if (
  window.localStorage.getItem("bulletsDispay") === null ||
  window.localStorage.getItem("bulletsDispay") === "flex"
) {
  window.localStorage.setItem("bulletsDispay", "flex");
  bulletsbuttons.forEach((element) => {
    if (element.dataset.value === "yes") {
      bulletsbuttons.forEach((e) => {
        e.classList.remove("active");
      });
      element.classList.add("active");
    }
  });
} else {
  bulletsbuttons.forEach((element) => {
    document.querySelector(".bullets-div").style.display = "none";
    if (element.dataset.value === "no") {
      bulletsbuttons.forEach((e) => {
        e.classList.remove("active");
      });
      element.classList.add("active");
    }
  });
}

bulletsbuttons.forEach((element) => {
  element.addEventListener("click", (event) => {
    bulletsbuttons.forEach((e) => {
      e.classList.remove("active");
    });
    event.target.classList.add("active");
    if (event.target.dataset.value === "no") {
      document.querySelector(".bullets-div").style.display = "none";
      window.localStorage.setItem("bulletsDispay", "none");
    } else {
      document.querySelector(".bullets-div").style.display = "flex";
      window.localStorage.setItem("bulletsDispay", "flex");
    }
  });
});
// ***************************
// reset
let resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", (event) => {
  window.localStorage.clear();
  location.reload();
});

// **********************
// links
document.querySelectorAll("a").forEach((element) => {
  element.onclick = function (e) {
    e.preventDefault();
  };
});

function scrolling(elements) {
  elements.forEach((e) => {
    e.addEventListener("click", (event) => {
      // console.log(event.target)
      document
        .querySelector(event.target.dataset.scroll)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
scrolling(document.querySelectorAll(".bullets-div a"));
scrolling(document.querySelectorAll(".landing-page a"));

let linksButton = document.querySelector(".landing-page .links i");
linksButton.onclick = function (event) {
    event.stopPropagation();
    // console.log(event.target)
  document.querySelector(".landing-page ul").classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if(e.target !== linksButton && e.target!==document.querySelector(".landing-page ul"))
  {
    document.querySelector(".landing-page ul").classList.remove("open");
  }
});
document.querySelector(".landing-page ul").onclick=function (event){
    event.stopPropagation()
}

