$(() => {
  const image = ["tree.jpg","calibri.webp","pff.jpg","duck.jfif","fantasy.jpg","girl.jpeg","plant.png","puppy.webp","sky.png",];
  const slider = $("#slider");
  const path = "../img";
  let x = 0;
  let chanceimgsec=3000;
  slider
    .css({
      position: "relative",
      width: "100%",
      height: "50vh",
      overflow: "hidden",
    })
    .append('<div id="slide"></div>')
    .click((e) => {
      change(e.pageX > $(window).width() / 2 ? 1 : -1);
    });

  $("#slide").css({
    position: "absolute",
    width: "100%",
    height: "100%",
  });

  let timer = setTimeout(change, 0, 0);

  function change(dir) {
    clearTimeout(timer);
    x += dir;
    if (x < 0) x = image.length - 1;
    if (x > image.length - 1) x = 0;

    const circleContainer = $("#circles");
    circleContainer.empty(); 

    const progressBar=$("#progress-Bar");
    progressBar.stop().width(0); 
    progressBar.animate({ width: "100%" }, chanceimgsec, "linear");

    for (let i = 0; i < image.length; i++) {
        const circle = $("<div></div>")
        .addClass("circle")
        .on("click", () => change(i - x))
        .appendTo(circleContainer);

      if (i === x) {
        circle.addClass("active");
      }
    }

    $("#slide")
      .css({
        left: dir * slider.width() + "px",
        background: `url('${path}/${image[x]}') center/cover`,
      })
      .animate({ left: 0 }, () => {
        slider.css({ background: `url('${path}/${image[x]}') center/cover` });
      });

    timer = setTimeout(change, chanceimgsec, 1);
  }
});
