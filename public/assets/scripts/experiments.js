/* eslint-disable func-names */
(function () {
  function init(experiments, el) {
    console.log(experiments, el);
  }

  const experiments = window.experiments;
  const el = document.findElementById('experiments');

  init(experiments, el);
}());
