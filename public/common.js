(function () {
  /*
   *HTML
   *原来的尺寸                            1800
   *要变成的尺寸（以开发正常样式的尺寸为基准）1920
   *比例                                  1800/1920
   */
  var curWidth = window.screen.width; //现在的电脑设备为1800px
  var targetWidth = 1920;
  var scale = curWidth / targetWidth;
  var meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content =
    "initial-scale=" +
    scale +
    ",minimum-scale=" +
    scale +
    ",maximum-scale=" +
    scale +
    "";
  document.head.appendChild(meta);
})();
