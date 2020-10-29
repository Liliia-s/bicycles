(function (window) {
  var ua = navigator.userAgent;

  if (window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45)) {
    addEventListener("resize", (function () {
      var timer;

      var dummySrc = document.createElement("source");

      var fixRespimg = function (img) {
        var source, sizes;
        var picture = img.parentNode;

        if (picture.nodeName.toUpperCase() === "PICTURE") {
          source = dummySrc.cloneNode();

          picture.insertBefore(source, picture.firstElementChild);
          setTimeout(function () {
            picture.removeChild(source);
          });
        } else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
          img._pfLastSize = img.offsetWidth;
          sizes = img.sizes;
          img.sizes += ",100vw";
          setTimeout(function () {
            img.sizes = sizes;
          });
        }
      };

      var findPictureImgs = function () {
        var i;
        var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
        for (i = 0; i < imgs.length; i++) {
          fixRespimg(imgs[i]);
        }
      };
      var onResize = function () {
        clearTimeout(timer);
        timer = setTimeout(findPictureImgs, 99);
      };
      var mq = window.matchMedia && matchMedia("(orientation: landscape)");
      var init = function () {
        onResize();

        if (mq && mq.addListener) {
          mq.addListener(onResize);
        }
      };

      dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

      if (/^[c|i]|d$/.test(document.readyState || "")) {
        init();
      } else {
        document.addEventListener("DOMContentLoaded", init);
      }

      return onResize;
    })());
  }
})(window);


(function (window, document, undefined) {
  "use strict";

  document.createElement("picture");

  var warn, eminpx, alwaysCheckWDescriptor, evalId;
  var pf = {};
  var isSupportTestReady = false;
  var noop = function () { };
  var image = document.createElement("img");
  var getImgAttr = image.getAttribute;
  var setImgAttr = image.setAttribute;
  var removeImgAttr = image.removeAttribute;
  var docElem = document.documentElement;
  var types = {};
  var cfg = {
    algorithm: ""
  };
  var srcAttr = "data-pfsrc";
  var srcsetAttr = srcAttr + "set";
  var ua = navigator.userAgent;
  var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35);
  var curSrcProp = "currentSrc";
  var regWDesc = /\s+\+?\d+(e\d+)?w/;
  var regSize = /(\([^)]+\))?\s*(.+)/;
  var setOptions = window.picturefillCFG;
  var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
  var fsCss = "font-size:100%!important;";
  var isVwDirty = true;

  var cssCache = {};
  var sizeLengthCache = {};
  var DPR = window.devicePixelRatio;
  var units = {
    px: 1,
    "in": 96
  };
  var anchor = document.createElement("a");
  var alreadyRun = false;


  var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
    regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
    regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
    regexTrailingCommas = /[,]+$/,
    regexNonNegativeInteger = /^\d+$/,

    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

  var on = function (obj, evt, fn, capture) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, capture || false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  };


  var memoize = function (fn) {
    var cache = {};
    return function (input) {
      if (!(input in cache)) {
        cache[input] = fn(input);
      }
      return cache[input];
    };
  };


  function isSpace(c) {
    return (c === "\u0020" || 
      c === "\u0009" || 
      c === "\u000A" || 
      c === "\u000C" || 
      c === "\u000D");  
  }

  var evalCSS = (function () {

    var regLength = /^([\d\.]+)(em|vw|px)$/;
    var replace = function () {
      var args = arguments, index = 0, string = args[0];
      while (++index in args) {
        string = string.replace(args[index], args[++index]);
      }
      return string;
    };

    var buildStr = memoize(function (css) {

      return "return " + replace((css || "").toLowerCase(),
        /\band\b/g, "&&",

        /,/g, "||",

        /min-([a-z-\s]+):/g, "e.$1>=",

        /max-([a-z-\s]+):/g, "e.$1<=",

        /calc([^)]+)/g, "($1)",

        /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
        /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
      ) + ";";
    });

    return function (css, length) {
      var parsedLength;
      if (!(css in cssCache)) {
        cssCache[css] = false;
        if (length && (parsedLength = css.match(regLength))) {
          cssCache[css] = parsedLength[1] * units[parsedLength[2]];
        } else {
          try {
            cssCache[css] = new Function("e", buildStr(css))(units);
          } catch (e) { }
        }
      }
      return cssCache[css];
    };
  })();

  var setResolution = function (candidate, sizesattr) {
    if (candidate.w) { 
      candidate.cWidth = pf.calcListLength(sizesattr || "100vw");
      candidate.res = candidate.w / candidate.cWidth;
    } else {
      candidate.res = candidate.d;
    }
    return candidate;
  };

  var picturefill = function (opt) {

    if (!isSupportTestReady) { return; }

    var elements, i, plen;

    var options = opt || {};

    if (options.elements && options.elements.nodeType === 1) {
      if (options.elements.nodeName.toUpperCase() === "IMG") {
        options.elements = [options.elements];
      } else {
        options.context = options.elements;
        options.elements = null;
      }
    }

    elements = options.elements || pf.qsa((options.context || document), (options.reevaluate || options.reselect) ? pf.sel : pf.selShort);

    if ((plen = elements.length)) {

      pf.setupRun(options);
      alreadyRun = true;

      for (i = 0; i < plen; i++) {
        pf.fillImg(elements[i], options);
      }

      pf.teardownRun(options);
    }
  };

  warn = (window.console && console.warn) ?
    function (message) {
      console.warn(message);
    } :
    noop
    ;

  if (!(curSrcProp in image)) {
    curSrcProp = "src";
  }

  types["image/jpeg"] = true;
  types["image/gif"] = true;
  types["image/png"] = true;

  function detectTypeSupport(type, typeUri) {
    var image = new window.Image();
    image.onerror = function () {
      types[type] = false;
      picturefill();
    };
    image.onload = function () {
      types[type] = image.width === 1;
      picturefill();
    };
    image.src = typeUri;
    return "pending";
  }

  types["image/svg+xml"] = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");

  function updateMetrics() {

    isVwDirty = false;
    DPR = window.devicePixelRatio;
    cssCache = {};
    sizeLengthCache = {};

    pf.DPR = DPR || 1;

    units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
    units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);

    units.vw = units.width / 100;
    units.vh = units.height / 100;

    evalId = [units.height, units.width, DPR].join("-");

    units.em = pf.getEmValue();
    units.rem = units.em;
  }

  function chooseLowRes(lowerValue, higherValue, dprValue, isCached) {
    var bonusFactor, tooMuch, bonus, meanDensity;

    if (cfg.algorithm === "saveData") {
      if (lowerValue > 2.7) {
        meanDensity = dprValue + 1;
      } else {
        tooMuch = higherValue - dprValue;
        bonusFactor = Math.pow(lowerValue - 0.6, 1.5);

        bonus = tooMuch * bonusFactor;

        if (isCached) {
          bonus += 0.1 * bonusFactor;
        }

        meanDensity = lowerValue + bonus;
      }
    } else {
      meanDensity = (dprValue > 1) ?
        Math.sqrt(lowerValue * higherValue) :
        lowerValue;
    }

    return meanDensity > dprValue;
  }

  function applyBestCandidate(img) {
    var srcSetCandidates;
    var matchingSet = pf.getSet(img);
    var evaluated = false;
    if (matchingSet !== "pending") {
      evaluated = evalId;
      if (matchingSet) {
        srcSetCandidates = pf.setRes(matchingSet);
        pf.applySetCandidate(srcSetCandidates, img);
      }
    }
    img[pf.ns].evaled = evaluated;
  }

  function ascendingSort(a, b) {
    return a.res - b.res;
  }

  function setSrcToCur(img, src, set) {
    var candidate;
    if (!set && src) {
      set = img[pf.ns].sets;
      set = set && set[set.length - 1];
    }

    candidate = getCandidateForSrc(src, set);

    if (candidate) {
      src = pf.makeUrl(src);
      img[pf.ns].curSrc = src;
      img[pf.ns].curCan = candidate;

      if (!candidate.res) {
        setResolution(candidate, candidate.set.sizes);
      }
    }
    return candidate;
  }

  function getCandidateForSrc(src, set) {
    var i, candidate, candidates;
    if (src && set) {
      candidates = pf.parseSet(set);
      src = pf.makeUrl(src);
      for (i = 0; i < candidates.length; i++) {
        if (src === pf.makeUrl(candidates[i].url)) {
          candidate = candidates[i];
          break;
        }
      }
    }
    return candidate;
  }

  function getAllSourceElements(picture, candidates) {
    var i, len, source, srcset;

    var sources = picture.getElementsByTagName("source");

    for (i = 0, len = sources.length; i < len; i++) {
      source = sources[i];
      source[pf.ns] = true;
      srcset = source.getAttribute("srcset");

      if (srcset) {
        candidates.push({
          srcset: srcset,
          media: source.getAttribute("media"),
          type: source.getAttribute("type"),
          sizes: source.getAttribute("sizes")
        });
      }
    }
  }


  function parseSrcset(input, set) {

    function collectCharacters(regEx) {
      var chars,
        match = regEx.exec(input.substring(pos));
      if (match) {
        chars = match[0];
        pos += chars.length;
        return chars;
      }
    }

    var inputLength = input.length,
      url,
      descriptors,
      currentDescriptor,
      state,
      c,

      pos = 0,

      candidates = [];

    function parseDescriptors() {

      var pError = false,

        w, d, h, i,
        candidate = {},
        desc, lastChar, value, intVal, floatVal;

      for (i = 0; i < descriptors.length; i++) {
        desc = descriptors[i];

        lastChar = desc[desc.length - 1];
        value = desc.substring(0, desc.length - 1);
        intVal = parseInt(value, 10);
        floatVal = parseFloat(value);

        if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

          if (w || d) { pError = true; }

          if (intVal === 0) { pError = true; } else { w = intVal; }

        } else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

          if (w || d || h) { pError = true; }

          if (floatVal < 0) { pError = true; } else { d = floatVal; }

        } else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

          if (h || d) { pError = true; }

          if (intVal === 0) { pError = true; } else { h = intVal; }

        } else { pError = true; }
      } 

      if (!pError) {
        candidate.url = url;

        if (w) { candidate.w = w; }
        if (d) { candidate.d = d; }
        if (h) { candidate.h = h; }
        if (!h && !d && !w) { candidate.d = 1; }
        if (candidate.d === 1) { set.has1x = true; }
        candidate.set = set;

        candidates.push(candidate);
      }
    } 

    function tokenize() {

      collectCharacters(regexLeadingSpaces);

      currentDescriptor = "";

      state = "in descriptor";

      while (true) {

        c = input.charAt(pos);


        if (state === "in descriptor") {

          if (isSpace(c)) {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
              currentDescriptor = "";
              state = "after descriptor";
            }

          } else if (c === ",") {
            pos += 1;
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }
            parseDescriptors();
            return;

          } else if (c === "\u0028") {
            currentDescriptor = currentDescriptor + c;
            state = "in parens";

          } else if (c === "") {
            if (currentDescriptor) {
              descriptors.push(currentDescriptor);
            }
            parseDescriptors();
            return;

          } else {
            currentDescriptor = currentDescriptor + c;
          }

        } else if (state === "in parens") {

          if (c === ")") {
            currentDescriptor = currentDescriptor + c;
            state = "in descriptor";

          } else if (c === "") {
            descriptors.push(currentDescriptor);
            parseDescriptors();
            return;

          } else {
            currentDescriptor = currentDescriptor + c;
          }

        } else if (state === "after descriptor") {

          if (isSpace(c)) {

          } else if (c === "") {
            parseDescriptors();
            return;

          } else {
            state = "in descriptor";
            pos -= 1;

          }
        }

        pos += 1;

      } 
    }

    while (true) {
      collectCharacters(regexLeadingCommasOrSpaces);

      if (pos >= inputLength) {
        return candidates; 
      }

      url = collectCharacters(regexLeadingNotSpaces);

      descriptors = [];

      if (url.slice(-1) === ",") {
        url = url.replace(regexTrailingCommas, "");
        parseDescriptors();

      } else {
        tokenize();
      } 

    } 
  }


  function parseSizes(strValue) {

    var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;

    var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;

    var i;
    var unparsedSizesList;
    var unparsedSizesListLength;
    var unparsedSize;
    var lastComponentValue;
    var size;


    function parseComponentValues(str) {
      var chrctr;
      var component = "";
      var componentArray = [];
      var listArray = [];
      var parenDepth = 0;
      var pos = 0;
      var inComment = false;

      function pushComponent() {
        if (component) {
          componentArray.push(component);
          component = "";
        }
      }

      function pushComponentArray() {
        if (componentArray[0]) {
          listArray.push(componentArray);
          componentArray = [];
        }
      }

      while (true) {
        chrctr = str.charAt(pos);

        if (chrctr === "") { 
          pushComponent();
          pushComponentArray();
          return listArray;
        } else if (inComment) {
          if ((chrctr === "*") && (str[pos + 1] === "/")) { 
            inComment = false;
            pos += 2;
            pushComponent();
            continue;
          } else {
            pos += 1; 
            continue;
          }
        } else if (isSpace(chrctr)) {
          if ((str.charAt(pos - 1) && isSpace(str.charAt(pos - 1))) || !component) {
            pos += 1;
            continue;
          } else if (parenDepth === 0) {
            pushComponent();
            pos += 1;
            continue;
          } else {
            chrctr = " ";
          }
        } else if (chrctr === "(") {
          parenDepth += 1;
        } else if (chrctr === ")") {
          parenDepth -= 1;
        } else if (chrctr === ",") {
          pushComponent();
          pushComponentArray();
          pos += 1;
          continue;
        } else if ((chrctr === "/") && (str.charAt(pos + 1) === "*")) {
          inComment = true;
          pos += 2;
          continue;
        }

        component = component + chrctr;
        pos += 1;
      }
    }

    function isValidNonNegativeSourceSizeValue(s) {
      if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) { return true; }
      if (regexCssCalc.test(s)) { return true; }
      if ((s === "0") || (s === "-0") || (s === "+0")) { return true; }
      return false;
    }


    unparsedSizesList = parseComponentValues(strValue);
    unparsedSizesListLength = unparsedSizesList.length;

    for (i = 0; i < unparsedSizesListLength; i++) {
      unparsedSize = unparsedSizesList[i];



      lastComponentValue = unparsedSize[unparsedSize.length - 1];

      if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
        size = lastComponentValue;
        unparsedSize.pop();
      } else {
        continue;
      }

      if (unparsedSize.length === 0) {
        return size;
      }

      unparsedSize = unparsedSize.join(" ");
      if (!(pf.matchesMedia(unparsedSize))) {
        continue;
      }

      return size;
    }

    return "100vw";
  }

  pf.ns = ("pf" + new Date().getTime()).substr(0, 9);

  pf.supSrcset = "srcset" in image;
  pf.supSizes = "sizes" in image;
  pf.supPicture = !!window.HTMLPictureElement;

  if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
    (function (image2) {
      image.srcset = "data:,a";
      image2.src = "data:,a";
      pf.supSrcset = image.complete === image2.complete;
      pf.supPicture = pf.supSrcset && pf.supPicture;
    })(document.createElement("img"));
  }

  if (pf.supSrcset && !pf.supSizes) {

    (function () {
      var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
      var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      var img = document.createElement("img");
      var test = function () {
        var width = img.width;

        if (width === 2) {
          pf.supSizes = true;
        }

        alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;

        isSupportTestReady = true;
        setTimeout(picturefill);
      };

      img.onload = test;
      img.onerror = test;
      img.setAttribute("sizes", "9px");

      img.srcset = width1 + " 1w," + width2 + " 9w";
      img.src = width1;
    })();

  } else {
    isSupportTestReady = true;
  }

  pf.selShort = "picture>img,img[srcset]";
  pf.sel = pf.selShort;
  pf.cfg = cfg;

  pf.DPR = (DPR || 1);
  pf.u = units;

  pf.types = types;

  pf.setSize = noop;


  pf.makeUrl = memoize(function (src) {
    anchor.href = src;
    return anchor.href;
  });

  pf.qsa = function (context, sel) {
    return ("querySelector" in context) ? context.querySelectorAll(sel) : [];
  };

  pf.matchesMedia = function () {
    if (window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches) {
      pf.matchesMedia = function (media) {
        return !media || (matchMedia(media).matches);
      };
    } else {
      pf.matchesMedia = pf.mMQ;
    }

    return pf.matchesMedia.apply(this, arguments);
  };

  pf.mMQ = function (media) {
    return media ? evalCSS(media) : true;
  };

  pf.calcLength = function (sourceSizeValue) {

    var value = evalCSS(sourceSizeValue, true) || false;
    if (value < 0) {
      value = false;
    }

    return value;
  };


  pf.supportsType = function (type) {
    return (type) ? types[type] : true;
  };

  pf.parseSize = memoize(function (sourceSizeStr) {
    var match = (sourceSizeStr || "").match(regSize);
    return {
      media: match && match[1],
      length: match && match[2]
    };
  });

  pf.parseSet = function (set) {
    if (!set.cands) {
      set.cands = parseSrcset(set.srcset, set);
    }
    return set.cands;
  };

  pf.getEmValue = function () {
    var body;
    if (!eminpx && (body = document.body)) {
      var div = document.createElement("div"),
        originalHTMLCSS = docElem.style.cssText,
        originalBodyCSS = body.style.cssText;

      div.style.cssText = baseStyle;

      docElem.style.cssText = fsCss;
      body.style.cssText = fsCss;

      body.appendChild(div);
      eminpx = div.offsetWidth;
      body.removeChild(div);

      eminpx = parseFloat(eminpx, 10);

      docElem.style.cssText = originalHTMLCSS;
      body.style.cssText = originalBodyCSS;

    }
    return eminpx || 16;
  };

  pf.calcListLength = function (sourceSizeListStr) {
    if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
      var winningLength = pf.calcLength(parseSizes(sourceSizeListStr));

      sizeLengthCache[sourceSizeListStr] = !winningLength ? units.width : winningLength;
    }

    return sizeLengthCache[sourceSizeListStr];
  };

  pf.setRes = function (set) {
    var candidates;
    if (set) {

      candidates = pf.parseSet(set);

      for (var i = 0, len = candidates.length; i < len; i++) {
        setResolution(candidates[i], set.sizes);
      }
    }
    return candidates;
  };

  pf.setRes.res = setResolution;

  pf.applySetCandidate = function (candidates, img) {
    if (!candidates.length) { return; }
    var candidate,
      i,
      j,
      length,
      bestCandidate,
      curSrc,
      curCan,
      candidateSrc,
      abortCurSrc;

    var imageData = img[pf.ns];
    var dpr = pf.DPR;

    curSrc = imageData.curSrc || img[curSrcProp];

    curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);

    if (curCan && curCan.set === candidates[0].set) {

      abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);

      if (!abortCurSrc) {
        curCan.cached = true;

        if (curCan.res >= dpr) {
          bestCandidate = curCan;
        }
      }
    }

    if (!bestCandidate) {

      candidates.sort(ascendingSort);

      length = candidates.length;
      bestCandidate = candidates[length - 1];

      for (i = 0; i < length; i++) {
        candidate = candidates[i];
        if (candidate.res >= dpr) {
          j = i - 1;

          if (candidates[j] &&
            (abortCurSrc || curSrc !== pf.makeUrl(candidate.url)) &&
            chooseLowRes(candidates[j].res, candidate.res, dpr, candidates[j].cached)) {

            bestCandidate = candidates[j];

          } else {
            bestCandidate = candidate;
          }
          break;
        }
      }
    }

    if (bestCandidate) {

      candidateSrc = pf.makeUrl(bestCandidate.url);

      imageData.curSrc = candidateSrc;
      imageData.curCan = bestCandidate;

      if (candidateSrc !== curSrc) {
        pf.setSrc(img, bestCandidate);
      }
      pf.setSize(img);
    }
  };

  pf.setSrc = function (img, bestCandidate) {
    var origWidth;
    img.src = bestCandidate.url;

    if (bestCandidate.set.type === "image/svg+xml") {
      origWidth = img.style.width;
      img.style.width = (img.offsetWidth + 1) + "px";

      if (img.offsetWidth + 1) {
        img.style.width = origWidth;
      }
    }
  };

  pf.getSet = function (img) {
    var i, set, supportsType;
    var match = false;
    var sets = img[pf.ns].sets;

    for (i = 0; i < sets.length && !match; i++) {
      set = sets[i];

      if (!set.srcset || !pf.matchesMedia(set.media) || !(supportsType = pf.supportsType(set.type))) {
        continue;
      }

      if (supportsType === "pending") {
        set = supportsType;
      }

      match = set;
      break;
    }

    return match;
  };

  pf.parseSets = function (element, parent, options) {
    var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;

    var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
    var imageData = element[pf.ns];

    if (imageData.src === undefined || options.src) {
      imageData.src = getImgAttr.call(element, "src");
      if (imageData.src) {
        setImgAttr.call(element, srcAttr, imageData.src);
      } else {
        removeImgAttr.call(element, srcAttr);
      }
    }

    if (imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset) {
      srcsetAttribute = getImgAttr.call(element, "srcset");
      imageData.srcset = srcsetAttribute;
      srcsetParsed = true;
    }

    imageData.sets = [];

    if (hasPicture) {
      imageData.pic = true;
      getAllSourceElements(parent, imageData.sets);
    }

    if (imageData.srcset) {
      imageSet = {
        srcset: imageData.srcset,
        sizes: getImgAttr.call(element, "sizes")
      };

      imageData.sets.push(imageSet);

      isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");

      if (!isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x) {
        imageSet.srcset += ", " + imageData.src;
        imageSet.cands.push({
          url: imageData.src,
          d: 1,
          set: imageSet
        });
      }

    } else if (imageData.src) {
      imageData.sets.push({
        srcset: imageData.src,
        sizes: null
      });
    }

    imageData.curCan = null;
    imageData.curSrc = undefined;

    imageData.supported = !(hasPicture || (imageSet && !pf.supSrcset) || (isWDescripor && !pf.supSizes));

    if (srcsetParsed && pf.supSrcset && !imageData.supported) {
      if (srcsetAttribute) {
        setImgAttr.call(element, srcsetAttr, srcsetAttribute);
        element.srcset = "";
      } else {
        removeImgAttr.call(element, srcsetAttr);
      }
    }

    if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) || element.src !== pf.makeUrl(imageData.src))) {
      if (imageData.src === null) {
        element.removeAttribute("src");
      } else {
        element.src = imageData.src;
      }
    }

    imageData.parsed = true;
  };

  pf.fillImg = function (element, options) {
    var imageData;
    var extreme = options.reselect || options.reevaluate;

    if (!element[pf.ns]) {
      element[pf.ns] = {};
    }

    imageData = element[pf.ns];

    if (!extreme && imageData.evaled === evalId) {
      return;
    }

    if (!imageData.parsed || options.reevaluate) {
      pf.parseSets(element, element.parentNode, options);
    }

    if (!imageData.supported) {
      applyBestCandidate(element);
    } else {
      imageData.evaled = evalId;
    }
  };

  pf.setupRun = function () {
    if (!alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio)) {
      updateMetrics();
    }
  };

  if (pf.supPicture) {
    picturefill = noop;
    pf.fillImg = noop;
  } else {

    (function () {
      var isDomReady;
      var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

      var run = function () {
        var readyState = document.readyState || "";

        timerId = setTimeout(run, readyState === "loading" ? 200 : 999);
        if (document.body) {
          pf.fillImgs();
          isDomReady = isDomReady || regReady.test(readyState);
          if (isDomReady) {
            clearTimeout(timerId);
          }

        }
      };

      var timerId = setTimeout(run, document.body ? 9 : 99);

      var debounce = function (func, wait) {
        var timeout, timestamp;
        var later = function () {
          var last = (new Date()) - timestamp;

          if (last < wait) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            func();
          }
        };

        return function () {
          timestamp = new Date();

          if (!timeout) {
            timeout = setTimeout(later, wait);
          }
        };
      };
      var lastClientWidth = docElem.clientHeight;
      var onResize = function () {
        isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
        lastClientWidth = docElem.clientHeight;
        if (isVwDirty) {
          pf.fillImgs();
        }
      };

      on(window, "resize", debounce(onResize, 99));
      on(document, "readystatechange", run);
    })();
  }

  pf.picturefill = picturefill;
  pf.fillImgs = picturefill;
  pf.teardownRun = noop;

  picturefill._ = pf;

  window.picturefillCFG = {
    pf: pf,
    push: function (args) {
      var name = args.shift();
      if (typeof pf[name] === "function") {
        pf[name].apply(pf, args);
      } else {
        cfg[name] = args[0];
        if (alreadyRun) {
          pf.fillImgs({ reselect: true });
        }
      }
    }
  };

  while (setOptions && setOptions.length) {
    window.picturefillCFG.push(setOptions.shift());
  }

  window.picturefill = picturefill;

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = picturefill;
  } else if (typeof define === "function" && define.amd) {
    define("picturefill", function () { return picturefill; });
  }

  if (!pf.supPicture) {
    types["image/webp"] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==");
  }

})(window, document);
