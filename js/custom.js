// collapsable panel scroll
$("#privacy").on("shown.bs.collapse", function () {
  $("html, body").animate(
    {
      scrollTop: $("#privacy").offset().top,
    },
    100
  );
});

$("#disclaimer").on("shown.bs.collapse", function () {
  $("html, body").animate(
    {
      scrollTop: $("#disclaimer").offset().top,
    },
    100
  );
});

$("#copyright").on("shown.bs.collapse", function () {
  $("html, body").animate(
    {
      scrollTop: $("#copyright").offset().top,
    },
    100
  );
});
