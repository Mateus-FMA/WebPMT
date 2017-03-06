(function(){
  "use strict";

  angular.
    module("boyerMoore").
    service("boyerMoore", BoyerMooreStringMatcher);

  function BoyerMooreStringMatcher() {
    this.findMatches = findMatches;

    function findMatches(pattern, text) {
      var goodSuffix = computeGoodSuffixTable(pattern);
      var badChar = computeBadCharacterTable(pattern);

      var i = 0;
      var matches = [];

      while (i <= text.length - pattern.length) {
        var j = pattern.length - 1;

        while (j >= 0 && pattern.charAt(j) == text.charAt(i + j)) {
          --j;
        }

        if (j < 0) {
          matches.push(i);
          i += goodSuffix[0];
        } else {
          var bcKey = text.charAt(i + j);

          var gsShift = goodSuffix[j + 1];
          var bcShift = badChar.hasOwnProperty(bcKey) ? j - badChar[bcKey] : j + 1;
          i += gsShift > bcShift ? gsShift : bcShift;
        }
      }

      return matches;
    }

    function computeBadCharacterTable(pattern) {
      var badChar = {};

      for (var i = 0; i < pattern.length; ++i) {
        badChar[pattern.charAt(i)] = i;
      }

      return badChar;
    }

    function computeGoodSuffixTable(pattern) {
      var patternR = pattern.split("").reverse().join();
      var bordR = computeBorderTable(patternR);
      var goodSuffix = [];

      for (var i = 0; i <= pattern.length; ++i) {
        goodSuffix.push(pattern.length);
      }

      for (var l = 1; l < pattern.length; ++l) {
        var j = pattern.length - bordR[l];
        var s = l - bordR[l];

        if (goodSuffix[j] > s) {
          goodSuffix[j] = s;
        }
      }    

      return goodSuffix;
    }

    function computeBorderTable(pattern) {
      var bord = [-1];

      for (var i = 0; i < pattern.length; ++i) {
        var t = bord[i];
        while (t >= 0 && pattern.charAt(t) != pattern.charAt(i)) {
          t = bord[t];
        }

        bord.push(t + 1);
      }

      return bord;
    }
  }

 
})();