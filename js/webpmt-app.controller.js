(function() {
  "use strict";

  angular.
    module("webpmtApp").
    controller("WebPMTController", WebPMTController);

  WebPMTController.$inject = ["kmp", "boyerMoore"];
  
  function WebPMTController(kmp, boyerMoore) {
    /* jshint validthis: true */
    var vm = this;
    
    vm.algorithm = "";
    vm.findMatches = findMatches;
    vm.occurrences = [];
    vm.readFile = readFile;
    vm.setAlgorithm = setAlgorithm;
    vm.pattern = "";
    vm.text = "";

    function findMatches() {
      onload(); 

      if (vm.algorithm === "kmp") {
        vm.occurrences = kmp.findMatches(vm.pattern, vm.text);
      } else if (vm.algorithm === "boyer-moore") {
        vm.occurrences = boyerMoore.findMatches(vm.pattern, vm.text);
      } else {
        alert("Choose a valid algorithm implemented by this tool.");
        return;
      }

      // Style occurrences of this pattern.
      // TODO: Implement this.
      alert("There are " + vm.occurrences.length + " occurrences of the pattern on text.");

      // Display the benchmark info on the content bar.
      // TODO: Implement this.
    }

    function readFile(file, event) {
      if (!file) {
        console.log("Invalid file.");
        return;
      }

      var reader = new FileReader();
      reader.onload = function(event) {
        var contents = event.target.result;
        var contentArea = document.getElementById("content-wrapper");
        var newContent = "";
        var lineEnd = contents.indexOf("\n");

        while (lineEnd !== -1) {
          newContent += contents.substring(0, lineEnd) + "<br>";
          contents = contents.substring(lineEnd + 1, contents.length);
          lineEnd = contents.indexOf("\n");
        }

        contentArea.innerHTML = newContent;
        vm.text = event.target.result;
      };
      reader.readAsText(file);
    }

    function setAlgorithm(algorithm) {
      vm.algorithm = algorithm;
    }
    
    function onload() {
      vm.pattern = document.getElementById("pattern-input").value;
    }
  }
})();
