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

// email obfuscation
function decode(encoded) {
  var address = atob(encoded);
  window.location.href = "mailto:" + address + "?subject=GreenCity Enquiry";
}
