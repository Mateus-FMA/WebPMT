(function() {
  "use strict";

  angular.
    module("kmp").
    service("kmp", KMPStringMatcher);
  
  function KMPStringMatcher() {
    this.findMatches = findMatches;

    function findMatches(pattern, text) {
      var sBord = computeStrictBorderTable(pattern);
      var matches = [];
      var i = 0, j = 0;

      while (i <= text.length - pattern.length) {
        while (j < pattern.length && text.charAt(i + j) == pattern.charAt(j)) {
          ++j;
        }

        if (j == pattern.length) {
          matches.push(i);
        }

        i += j - sBord[j];
        j = sBord[j] > 0 ? sBord[j] : 0;
      }

      return matches;
    }

    function computeStrictBorderTable(pattern) {
      var sBord = [];
      for (var i = 0; i <= pattern.length; ++i) {
        sBord.push(-1);
      }

      var t = -1;

      for (var j = 0; j < pattern.length; ++j) {
        while (t >= 0 && pattern.charAt(t) != pattern.charAt(j)) {
          t = sBord[t];
        }

        ++t;
        if (j == pattern.length - 1 || pattern.charAt(t + 1) != pattern.charAt(j + 1)) {
          sBord[j + 1] = t;
        } else {
          sBord[j + 1] = sBord[t];
        }
      }

      return sBord;
    }
  }  
})();