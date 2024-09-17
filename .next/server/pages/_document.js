"use strict";
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./node_modules/next/dist/client/head-manager.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/head-manager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = initHeadManager;
exports.DOMAttributeNames = void 0;
const DOMAttributeNames = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule'
};
exports.DOMAttributeNames = DOMAttributeNames;

function reactElementToDOM({
  type,
  props
}) {
  const el = document.createElement(type);

  for (const p in props) {
    if (!props.hasOwnProperty(p)) continue;
    if (p === 'children' || p === 'dangerouslySetInnerHTML') continue; // we don't render undefined props to the DOM

    if (props[p] === undefined) continue;
    const attr = DOMAttributeNames[p] || p.toLowerCase();

    if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
      el[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  const {
    children,
    dangerouslySetInnerHTML
  } = props;

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  }

  return el;
}

function updateElements(type, components) {
  const headEl = document.getElementsByTagName('head')[0];
  const headCountEl = headEl.querySelector('meta[name=next-head-count]');

  if (true) {
    if (!headCountEl) {
      console.error('Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing');
      return;
    }
  }

  const headCount = Number(headCountEl.content);
  const oldTags = [];

  for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = j.previousElementSibling) {
    if (j.tagName.toLowerCase() === type) {
      oldTags.push(j);
    }
  }

  const newTags = components.map(reactElementToDOM).filter(newTag => {
    for (let k = 0, len = oldTags.length; k < len; k++) {
      const oldTag = oldTags[k];

      if (oldTag.isEqualNode(newTag)) {
        oldTags.splice(k, 1);
        return false;
      }
    }

    return true;
  });
  oldTags.forEach(t => t.parentNode.removeChild(t));
  newTags.forEach(t => headEl.insertBefore(t, headCountEl));
  headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}

function initHeadManager() {
  let updatePromise = null;
  return {
    mountedInstances: new Set(),
    updateHead: head => {
      const promise = updatePromise = Promise.resolve().then(() => {
        if (promise !== updatePromise) return;
        updatePromise = null;
        const tags = {};
        head.forEach(h => {
          if ( // If the font tag is loaded only on client navigation
          // it won't be inlined. In this case revert to the original behavior
          h.type === 'link' && h.props['data-optimized-fonts'] && !document.querySelector(`style[data-href="${h.props['data-href']}"]`)) {
            h.props.href = h.props['data-href'];
            h.props['data-href'] = undefined;
          }

          const components = tags[h.type] || [];
          components.push(h);
          tags[h.type] = components;
        });
        const titleComponent = tags.title ? tags.title[0] : null;
        let title = '';

        if (titleComponent) {
          const {
            children
          } = titleComponent.props;
          title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        }

        if (title !== document.title) document.title = title;
        ['meta', 'base', 'link', 'style', 'script'].forEach(type => {
          updateElements(type, tags[type] || []);
        });
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.requestIdleCallback = exports.cancelIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/script.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/script.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.initScriptLoader = initScriptLoader;
exports.default = void 0;

var _react = __webpack_require__(/*! react */ "react");

var _headManagerContext = __webpack_require__(/*! ../shared/lib/head-manager-context */ "../shared/lib/head-manager-context");

var _headManager = __webpack_require__(/*! ./head-manager */ "./node_modules/next/dist/client/head-manager.js");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const ScriptCache = new Map();
const LoadCache = new Set();
const ignoreProps = ['onLoad', 'dangerouslySetInnerHTML', 'children', 'onError', 'strategy'];

const loadScript = props => {
  const {
    src,
    id,
    onLoad = () => {},
    dangerouslySetInnerHTML,
    children = '',
    onError
  } = props;
  const cacheKey = id || src; // Script has already loaded

  if (cacheKey && LoadCache.has(cacheKey)) {
    return;
  } // Contents of this script are already loading/loaded


  if (ScriptCache.has(src)) {
    LoadCache.add(cacheKey); // Execute onLoad since the script loading has begun

    ScriptCache.get(src).then(onLoad, onError);
    return;
  }

  const el = document.createElement('script');
  const loadPromise = new Promise((resolve, reject) => {
    el.addEventListener('load', function (e) {
      resolve();

      if (onLoad) {
        onLoad.call(this, e);
      }
    });
    el.addEventListener('error', function (e) {
      reject(e);
    });
  }).catch(function (e) {
    if (onError) {
      onError(e);
    }
  });

  if (src) {
    ScriptCache.set(src, loadPromise);
  }

  LoadCache.add(cacheKey);

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  } else if (src) {
    el.src = src;
  }

  for (const [k, value] of Object.entries(props)) {
    if (value === undefined || ignoreProps.includes(k)) {
      continue;
    }

    const attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
    el.setAttribute(attr, value);
  }

  document.body.appendChild(el);
};

function handleClientScriptLoad(props) {
  const {
    strategy = 'afterInteractive'
  } = props;

  if (strategy === 'afterInteractive') {
    loadScript(props);
  } else if (strategy === 'lazyOnload') {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
    });
  }
}

function loadLazyScript(props) {
  if (document.readyState === 'complete') {
    (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
  } else {
    window.addEventListener('load', () => {
      (0, _requestIdleCallback).requestIdleCallback(() => loadScript(props));
    });
  }
}

function initScriptLoader(scriptLoaderItems) {
  scriptLoaderItems.forEach(handleClientScriptLoad);
}

function Script(props) {
  const {
    src = '',
    onLoad = () => {},
    dangerouslySetInnerHTML,
    strategy = 'afterInteractive',
    onError
  } = props,
        restProps = _objectWithoutProperties(props, ["src", "onLoad", "dangerouslySetInnerHTML", "strategy", "onError"]); // Context is available only during SSR


  const {
    updateScripts,
    scripts
  } = (0, _react).useContext(_headManagerContext.HeadManagerContext);
  (0, _react).useEffect(() => {
    if (strategy === 'afterInteractive') {
      loadScript(props);
    } else if (strategy === 'lazyOnload') {
      loadLazyScript(props);
    }
  }, [props, strategy]);

  if (strategy === 'beforeInteractive') {
    if (updateScripts) {
      scripts.beforeInteractive = (scripts.beforeInteractive || []).concat([_objectSpread({
        src,
        onLoad,
        onError
      }, restProps)]);
      updateScripts(scripts);
    } else {
      loadScript(props);
    }
  }

  return null;
}

var _default = Script;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/pages/_document.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/pages/_document.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "DocumentContext", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentContext;
  }
}));
Object.defineProperty(exports, "DocumentInitialProps", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentInitialProps;
  }
}));
Object.defineProperty(exports, "DocumentProps", ({
  enumerable: true,
  get: function () {
    return _utils.DocumentProps;
  }
}));
exports.Html = Html;
exports.Main = Main;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../shared/lib/constants */ "../shared/lib/constants");

var _documentContext = __webpack_require__(/*! ../shared/lib/document-context */ "../shared/lib/document-context");

var _utils = __webpack_require__(/*! ../shared/lib/utils */ "../shared/lib/utils");

var _getPageFiles = __webpack_require__(/*! ../server/get-page-files */ "../server/get-page-files");

var _utils1 = __webpack_require__(/*! ../server/utils */ "../server/utils");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "../server/htmlescape");

var _script = _interopRequireDefault(__webpack_require__(/*! ../client/script */ "./node_modules/next/dist/client/script.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function getDocumentFiles(buildManifest, pathname, inAmpMode) {
  const sharedFiles = (0, _getPageFiles).getPageFiles(buildManifest, '/_app');
  const pageFiles = inAmpMode ? [] : (0, _getPageFiles).getPageFiles(buildManifest, pathname);
  return {
    sharedFiles,
    pageFiles,
    allFiles: [...new Set([...sharedFiles, ...pageFiles])]
  };
}

function getPolyfillScripts(context, props) {
  // polyfills.js has to be rendered as nomodule without async
  // It also has to be the first script to load
  const {
    assetPrefix,
    buildManifest,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return buildManifest.polyfillFiles.filter(polyfill => polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')).map(polyfill => /*#__PURE__*/_react.default.createElement("script", {
    key: polyfill,
    defer: !disableOptimizedLoading,
    nonce: props.nonce,
    crossOrigin: props.crossOrigin || undefined,
    noModule: true,
    src: `${assetPrefix}/_next/${polyfill}${devOnlyCacheBusterQueryString}`
  }));
}

function getPreNextScripts(context, props) {
  const {
    scriptLoader,
    disableOptimizedLoading
  } = context;
  return (scriptLoader.beforeInteractive || []).map((file, index) => {
    const {
      strategy
    } = file,
          scriptProps = _objectWithoutProperties(file, ["strategy"]);

    return /*#__PURE__*/_react.default.createElement("script", Object.assign({}, scriptProps, {
      key: scriptProps.src || index,
      defer: !disableOptimizedLoading,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    }));
  });
}

function getDynamicChunks(context, props, files) {
  const {
    dynamicImports,
    assetPrefix,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  return dynamicImports.map(file => {
    if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
    return /*#__PURE__*/_react.default.createElement("script", {
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

function getScripts(context, props, files) {
  var ref;
  const {
    assetPrefix,
    buildManifest,
    isDevelopment,
    devOnlyCacheBusterQueryString,
    disableOptimizedLoading
  } = context;
  const normalScripts = files.allFiles.filter(file => file.endsWith('.js'));
  const lowPriorityScripts = (ref = buildManifest.lowPriorityFiles) === null || ref === void 0 ? void 0 : ref.filter(file => file.endsWith('.js'));
  return [...normalScripts, ...lowPriorityScripts].map(file => {
    return /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: props.nonce,
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

class Document1 extends _react.Component {
  /**
  * `getInitialProps` hook returns the context object with the addition of `renderPage`.
  * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
  */
  static async getInitialProps(ctx) {
    const enhanceApp = App => {
      return props => /*#__PURE__*/_react.default.createElement(App, Object.assign({}, props));
    };

    const {
      html,
      head
    } = await ctx.renderPage({
      enhanceApp
    });
    const styles = [...(0, _server).default()];
    return {
      html,
      head,
      styles
    };
  }

  static renderDocument(DocumentComponent, props) {
    return /*#__PURE__*/_react.default.createElement(_documentContext.DocumentContext.Provider, {
      value: props
    }, /*#__PURE__*/_react.default.createElement(DocumentComponent, Object.assign({}, props)));
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(Html, null, /*#__PURE__*/_react.default.createElement(Head, null), /*#__PURE__*/_react.default.createElement("body", null, /*#__PURE__*/_react.default.createElement(Main, null), /*#__PURE__*/_react.default.createElement(NextScript, null)));
  }

}

exports.default = Document1;

function Html(props) {
  const {
    inAmpMode,
    docComponentsRendered,
    locale
  } = (0, _react).useContext(_documentContext.DocumentContext);
  docComponentsRendered.Html = true;
  return /*#__PURE__*/_react.default.createElement("html", Object.assign({}, props, {
    lang: props.lang || locale || undefined,
    amp: inAmpMode ? '' : undefined,
    "data-ampdevmode": inAmpMode && true ? '' : undefined
  }));
}

class Head extends _react.Component {
  getCssLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports
    } = this.context;
    const cssFiles = files.allFiles.filter(f => f.endsWith('.css'));
    const sharedFiles = new Set(files.sharedFiles); // Unmanaged files are CSS files that will be handled directly by the
    // webpack runtime (`mini-css-extract-plugin`).

    let unmangedFiles = new Set([]);
    let dynamicCssFiles = Array.from(new Set(dynamicImports.filter(file => file.endsWith('.css'))));

    if (dynamicCssFiles.length) {
      const existing = new Set(cssFiles);
      dynamicCssFiles = dynamicCssFiles.filter(f => !(existing.has(f) || sharedFiles.has(f)));
      unmangedFiles = new Set(dynamicCssFiles);
      cssFiles.push(...dynamicCssFiles);
    }

    let cssLinkElements = [];
    cssFiles.forEach(file => {
      const isSharedFile = sharedFiles.has(file);

      if (true) {
        cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
          key: `${file}-preload`,
          nonce: this.props.nonce,
          rel: "preload",
          href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
          as: "style",
          crossOrigin: this.props.crossOrigin || undefined
        }));
      }

      const isUnmanagedFile = unmangedFiles.has(file);
      cssLinkElements.push( /*#__PURE__*/_react.default.createElement("link", {
        key: file,
        nonce: this.props.nonce,
        rel: "stylesheet",
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
        "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
      }));
    });

    if (false) {}

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadDynamicChunks() {
    const {
      dynamicImports,
      assetPrefix,
      devOnlyCacheBusterQueryString
    } = this.context;
    return dynamicImports.map(file => {
      if (!file.endsWith('.js')) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("link", {
        rel: "preload",
        key: file,
        href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
        as: "script",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined
      });
    }) // Filter out nulled scripts
    .filter(Boolean);
  }

  getPreloadMainLinks(files) {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      scriptLoader
    } = this.context;
    const preloadFiles = files.allFiles.filter(file => {
      return file.endsWith('.js');
    });
    return [...(scriptLoader.beforeInteractive || []).map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file.src,
      nonce: this.props.nonce,
      rel: "preload",
      href: file.src,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    })), ...preloadFiles.map(file => /*#__PURE__*/_react.default.createElement("link", {
      key: file,
      nonce: this.props.nonce,
      rel: "preload",
      href: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      as: "script",
      crossOrigin: this.props.crossOrigin || undefined
    }))];
  }

  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  handleDocumentScriptLoaderItems(children) {
    const {
      scriptLoader
    } = this.context;
    const scriptLoaderItems = [];
    const filteredChildren = [];

    _react.default.Children.forEach(children, child => {
      if (child.type === _script.default) {
        if (child.props.strategy === 'beforeInteractive') {
          scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([_objectSpread({}, child.props)]);
          return;
        } else if (['lazyOnload', 'afterInteractive'].includes(child.props.strategy)) {
          scriptLoaderItems.push(child.props);
          return;
        }
      }

      filteredChildren.push(child);
    });

    this.context.__NEXT_DATA__.scriptLoader = scriptLoaderItems;
    return filteredChildren;
  }

  makeStylesheetInert(node) {
    return _react.default.Children.map(node, c => {
      if (c.type === 'link' && c.props['href'] && _constants.OPTIMIZED_FONT_PROVIDERS.some(({
        url
      }) => c.props['href'].startsWith(url))) {
        const newProps = _objectSpread({}, c.props || {});

        newProps['data-href'] = newProps['href'];
        newProps['href'] = undefined;
        return /*#__PURE__*/_react.default.cloneElement(c, newProps);
      } else if (c.props && c.props['children']) {
        c.props['children'] = this.makeStylesheetInert(c.props['children']);
      }

      return c;
    });
  }

  render() {
    const {
      styles,
      ampPath,
      inAmpMode,
      hybridAmp,
      canonicalBase,
      __NEXT_DATA__,
      dangerousAsPath,
      headTags,
      unstable_runtimeJS,
      unstable_JsPreload,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    const disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
    this.context.docComponentsRendered.Head = true;
    let {
      head
    } = this.context;
    let cssPreloads = [];
    let otherHeadElements = [];

    if (head) {
      head.forEach(c => {
        if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
          cssPreloads.push(c);
        } else {
          c && otherHeadElements.push(c);
        }
      });
      head = cssPreloads.concat(otherHeadElements);
    }

    let children = _react.default.Children.toArray(this.props.children).filter(Boolean); // show a warning if Head contains <title> (only in development)


    if (true) {
      children = _react.default.Children.map(children, child => {
        var ref;
        const isReactHelmet = child === null || child === void 0 ? void 0 : (ref = child.props) === null || ref === void 0 ? void 0 : ref['data-react-helmet'];

        if (!isReactHelmet) {
          var ref1;

          if ((child === null || child === void 0 ? void 0 : child.type) === 'title') {
            console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");
          } else if ((child === null || child === void 0 ? void 0 : child.type) === 'meta' && (child === null || child === void 0 ? void 0 : (ref1 = child.props) === null || ref1 === void 0 ? void 0 : ref1.name) === 'viewport') {
            console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta");
          }
        }

        return child;
      });
      if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    if (false) {}

    children = this.handleDocumentScriptLoaderItems(children);
    let hasAmphtmlRel = false;
    let hasCanonicalRel = false; // show warning and remove conflicting amp head tags

    head = _react.default.Children.map(head || [], child => {
      if (!child) return child;
      const {
        type,
        props
      } = child;

      if (inAmpMode) {
        let badProp = '';

        if (type === 'meta' && props.name === 'viewport') {
          badProp = 'name="viewport"';
        } else if (type === 'link' && props.rel === 'canonical') {
          hasCanonicalRel = true;
        } else if (type === 'script') {
          // only block if
          // 1. it has a src and isn't pointing to ampproject's CDN
          // 2. it is using dangerouslySetInnerHTML without a type or
          // a type of text/javascript
          if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
            badProp = '<script';
            Object.keys(props).forEach(prop => {
              badProp += ` ${prop}="${props[prop]}"`;
            });
            badProp += '/>';
          }
        }

        if (badProp) {
          console.warn(`Found conflicting amp tag "${child.type}" with conflicting prop ${badProp} in ${__NEXT_DATA__.page}. https://nextjs.org/docs/messages/conflicting-amp-tag`);
          return null;
        }
      } else {
        // non-amp mode
        if (type === 'link' && props.rel === 'amphtml') {
          hasAmphtmlRel = true;
        }
      }

      return child;
    }); // try to parse styles from fragment for backwards compat

    const curStyles = Array.isArray(styles) ? styles : [];

    if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
    styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
    Array.isArray(styles.props.children)) {
      const hasStyles = el => {
        var ref2, ref3;
        return el === null || el === void 0 ? void 0 : (ref2 = el.props) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.dangerouslySetInnerHTML) === null || ref3 === void 0 ? void 0 : ref3.__html;
      }; // @ts-ignore Property 'props' does not exist on type ReactElement


      styles.props.children.forEach(child => {
        if (Array.isArray(child)) {
          child.forEach(el => hasStyles(el) && curStyles.push(el));
        } else if (hasStyles(child)) {
          curStyles.push(child);
        }
      });
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);

    var _nonce, _nonce1;

    return /*#__PURE__*/_react.default.createElement("head", Object.assign({}, this.props), this.context.isDevelopment && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("style", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined,
      dangerouslySetInnerHTML: {
        __html: `body{display:none}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", {
      "data-next-hide-fouc": true,
      "data-ampdevmode": inAmpMode ? 'true' : undefined
    }, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: `body{display:block}`
      }
    }))), children,  false && /*#__PURE__*/0, head, /*#__PURE__*/_react.default.createElement("meta", {
      name: "next-head-count",
      content: _react.default.Children.count(head || []).toString()
    }), inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,minimum-scale=1,initial-scale=1"
    }), !hasCanonicalRel && /*#__PURE__*/_react.default.createElement("link", {
      rel: "canonical",
      href: canonicalBase + (0, _utils1).cleanAmpPath(dangerousAsPath)
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "preload",
      as: "script",
      href: "https://cdn.ampproject.org/v0.js"
    }), styles && /*#__PURE__*/_react.default.createElement("style", {
      "amp-custom": "",
      dangerouslySetInnerHTML: {
        __html: curStyles.map(style => style.props.dangerouslySetInnerHTML.__html).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
      }
    }), /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`
      }
    }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("style", {
      "amp-boilerplate": "",
      dangerouslySetInnerHTML: {
        __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`
      }
    })), /*#__PURE__*/_react.default.createElement("script", {
      async: true,
      src: "https://cdn.ampproject.org/v0.js"
    })), !inAmpMode && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/_react.default.createElement("link", {
      rel: "amphtml",
      href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
    }),  true && this.getCssLinks(files),  true && /*#__PURE__*/_react.default.createElement("noscript", {
      "data-n-css": (_nonce = this.props.nonce) !== null && _nonce !== void 0 ? _nonce : ''
    }),  false && /*#__PURE__*/0, !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files),  false && 0,  false && /*#__PURE__*/0, this.context.isDevelopment && // this element is used to mount development styles so the
    // ordering matches production
    // (by default, style-loader injects at the bottom of <head />)

    /*#__PURE__*/
    _react.default.createElement("noscript", {
      id: "__next_css__DO_NOT_USE__"
    }), styles || null), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {}, ...(headTags || [])));
  }

}

exports.Head = Head;
Head.contextType = _documentContext.DocumentContext;

function Main() {
  const {
    inAmpMode,
    html,
    docComponentsRendered
  } = (0, _react).useContext(_documentContext.DocumentContext);
  docComponentsRendered.Main = true;
  if (inAmpMode) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _constants.AMP_RENDER_TARGET);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "__next",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}

class NextScript extends _react.Component {
  getDynamicChunks(files) {
    return getDynamicChunks(this.context, this.props, files);
  }

  getPreNextScripts() {
    return getPreNextScripts(this.context, this.props);
  }

  getScripts(files) {
    return getScripts(this.context, this.props, files);
  }

  getPolyfillScripts() {
    return getPolyfillScripts(this.context, this.props);
  }

  static getInlineScriptSource(documentProps) {
    const {
      __NEXT_DATA__
    } = documentProps;

    try {
      const data = JSON.stringify(__NEXT_DATA__);
      return (0, _htmlescape).htmlEscapeJsonString(data);
    } catch (err) {
      if (err.message.indexOf('circular structure')) {
        throw new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://nextjs.org/docs/messages/circular-structure`);
      }

      throw err;
    }
  }

  render() {
    const {
      assetPrefix,
      inAmpMode,
      buildManifest,
      unstable_runtimeJS,
      docComponentsRendered,
      devOnlyCacheBusterQueryString,
      disableOptimizedLoading
    } = this.context;
    const disableRuntimeJS = unstable_runtimeJS === false;
    docComponentsRendered.NextScript = true;

    if (inAmpMode) {
      if (false) {}

      const ampDevFiles = [...buildManifest.devFiles, ...buildManifest.polyfillFiles, ...buildManifest.ampDevFiles];
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context)
        },
        "data-ampdevmode": true
      }), ampDevFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
        key: file,
        src: `${assetPrefix}/_next/${file}${devOnlyCacheBusterQueryString}`,
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        "data-ampdevmode": true
      })));
    }

    if (true) {
      if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
    }

    const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map(file => /*#__PURE__*/_react.default.createElement("script", {
      key: file,
      src: `${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`,
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined
    })) : null, disableRuntimeJS ? null : /*#__PURE__*/_react.default.createElement("script", {
      id: "__NEXT_DATA__",
      type: "application/json",
      nonce: this.props.nonce,
      crossOrigin: this.props.crossOrigin || undefined,
      dangerouslySetInnerHTML: {
        __html: NextScript.getInlineScriptSource(this.context)
      }
    }), disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files));
  }

}

exports.NextScript = NextScript;
NextScript.contextType = _documentContext.DocumentContext;
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath || `${asPath}${asPath.includes('?') ? '&' : '?'}amp=1`;
}

/***/ }),

/***/ "../server/get-page-files":
/*!*****************************************************!*\
  !*** external "next/dist/server/get-page-files.js" ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ "../server/htmlescape":
/*!*************************************************!*\
  !*** external "next/dist/server/htmlescape.js" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ "../server/utils":
/*!********************************************!*\
  !*** external "next/dist/server/utils.js" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ "../shared/lib/constants":
/*!****************************************************!*\
  !*** external "next/dist/shared/lib/constants.js" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ "../shared/lib/document-context":
/*!***********************************************************!*\
  !*** external "next/dist/shared/lib/document-context.js" ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/document-context.js");

/***/ }),

/***/ "../shared/lib/head-manager-context":
/*!***************************************************************!*\
  !*** external "next/dist/shared/lib/head-manager-context.js" ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("styled-jsx/server");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./node_modules/next/dist/pages/_document.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksQ0FBQ3FGLGdCQUE1QixJQUFnRCxLQUFLekYsa0JBQUwsRUFkL0IsRUFjMERJLHVCQUF1QixJQUFJLENBQUNxRixnQkFBNUIsSUFBZ0QsS0FBSzNFLGlCQUFMLEVBZDFHLEVBY29JVix1QkFBdUIsSUFBSSxDQUFDcUYsZ0JBQTVCLElBQWdELEtBQUtyRSxnQkFBTCxDQUFzQkMsS0FBdEIsQ0FkcEwsRUFja05qQix1QkFBdUIsSUFBSSxDQUFDcUYsZ0JBQTVCLElBQWdELEtBQUsvRCxVQUFMLENBQWdCTCxLQUFoQixDQWRsUSxDQUFyQjtBQWVIOztBQTNFcUM7O0FBNkUxQy9NLGtCQUFBLEdBQXFCdU8sVUFBckI7QUFDQUEsVUFBVSxDQUFDdUUsV0FBWCxHQUF5QnBJLGdCQUFnQixDQUFDVCxlQUExQztBQUNBc0UsVUFBVSxDQUFDb0YsaUJBQVgsR0FBK0IsMFRBQS9COztBQUNBLFNBQVNmLFVBQVQsQ0FBb0JoQyxPQUFwQixFQUE2QmdELE1BQTdCLEVBQXFDO0FBQ2pDLFNBQU9oRCxPQUFPLElBQUssR0FBRWdELE1BQU8sR0FBRUEsTUFBTSxDQUFDN0ssUUFBUCxDQUFnQixHQUFoQixJQUF1QixHQUF2QixHQUE2QixHQUFJLE9BQS9EO0FBQ0g7Ozs7Ozs7Ozs7QUMxa0JEOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9oZWFkLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcmlzZS1hbmQtZmFtZS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3JlcXVlc3QtaWRsZS1jYWxsYmFjay5qcyIsIndlYnBhY2s6Ly9yaXNlLWFuZC1mYW1lLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvc2NyaXB0LmpzIiwid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9yaXNlLWFuZC1mYW1lL2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci9nZXQtcGFnZS1maWxlcy5qc1wiIiwid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2VydmVyL2h0bWxlc2NhcGUuanNcIiIsIndlYnBhY2s6Ly9yaXNlLWFuZC1mYW1lL2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci91dGlscy5qc1wiIiwid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9jb25zdGFudHMuanNcIiIsIndlYnBhY2s6Ly9yaXNlLWFuZC1mYW1lL2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvZG9jdW1lbnQtY29udGV4dC5qc1wiIiwid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9oZWFkLW1hbmFnZXItY29udGV4dC5qc1wiIiwid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL3Jpc2UtYW5kLWZhbWUvZXh0ZXJuYWwgXCJzdHlsZWQtanN4L3NlcnZlclwiIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcclxuICAgIHZhbHVlOiB0cnVlXHJcbn0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBpbml0SGVhZE1hbmFnZXI7XHJcbmV4cG9ydHMuRE9NQXR0cmlidXRlTmFtZXMgPSB2b2lkIDA7XHJcbmNvbnN0IERPTUF0dHJpYnV0ZU5hbWVzID0ge1xyXG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcclxuICAgIGNsYXNzTmFtZTogJ2NsYXNzJyxcclxuICAgIGh0bWxGb3I6ICdmb3InLFxyXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdicsXHJcbiAgICBub01vZHVsZTogJ25vTW9kdWxlJ1xyXG59O1xyXG5leHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzID0gRE9NQXR0cmlidXRlTmFtZXM7XHJcbmZ1bmN0aW9uIHJlYWN0RWxlbWVudFRvRE9NKHsgdHlwZSAsIHByb3BzICB9KSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcbiAgICBmb3IoY29uc3QgcCBpbiBwcm9wcyl7XHJcbiAgICAgICAgaWYgKCFwcm9wcy5oYXNPd25Qcm9wZXJ0eShwKSkgY29udGludWU7XHJcbiAgICAgICAgaWYgKHAgPT09ICdjaGlsZHJlbicgfHwgcCA9PT0gJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJykgY29udGludWU7XHJcbiAgICAgICAgLy8gd2UgZG9uJ3QgcmVuZGVyIHVuZGVmaW5lZCBwcm9wcyB0byB0aGUgRE9NXHJcbiAgICAgICAgaWYgKHByb3BzW3BdID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgIGNvbnN0IGF0dHIgPSBET01BdHRyaWJ1dGVOYW1lc1twXSB8fCBwLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzY3JpcHQnICYmIChhdHRyID09PSAnYXN5bmMnIHx8IGF0dHIgPT09ICdkZWZlcicgfHwgYXR0ciA9PT0gJ25vTW9kdWxlJykpIHtcclxuICAgICAgICAgICAgZWxbYXR0cl0gPSAhIXByb3BzW3BdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLCBwcm9wc1twXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgeyBjaGlsZHJlbiAsIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICB9ID0gcHJvcHM7XHJcbiAgICBpZiAoZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpIHtcclxuICAgICAgICBlbC5pbm5lckhUTUwgPSBkYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWwgfHwgJyc7XHJcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnID8gY2hpbGRyZW4gOiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuLmpvaW4oJycpIDogJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWw7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlRWxlbWVudHModHlwZSwgY29tcG9uZW50cykge1xyXG4gICAgY29uc3QgaGVhZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgIGNvbnN0IGhlYWRDb3VudEVsID0gaGVhZEVsLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1uZXh0LWhlYWQtY291bnRdJyk7XHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgIGlmICghaGVhZENvdW50RWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignV2FybmluZzogbmV4dC1oZWFkLWNvdW50IGlzIG1pc3NpbmcuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaGVhZC1jb3VudC1taXNzaW5nJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBoZWFkQ291bnQgPSBOdW1iZXIoaGVhZENvdW50RWwuY29udGVudCk7XHJcbiAgICBjb25zdCBvbGRUYWdzID0gW107XHJcbiAgICBmb3IobGV0IGkgPSAwLCBqID0gaGVhZENvdW50RWwucHJldmlvdXNFbGVtZW50U2libGluZzsgaSA8IGhlYWRDb3VudDsgaSsrLCBqID0gai5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKXtcclxuICAgICAgICBpZiAoai50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgb2xkVGFncy5wdXNoKGopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IG5ld1RhZ3MgPSBjb21wb25lbnRzLm1hcChyZWFjdEVsZW1lbnRUb0RPTSkuZmlsdGVyKChuZXdUYWcpPT57XHJcbiAgICAgICAgZm9yKGxldCBrID0gMCwgbGVuID0gb2xkVGFncy5sZW5ndGg7IGsgPCBsZW47IGsrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZFRhZyA9IG9sZFRhZ3Nba107XHJcbiAgICAgICAgICAgIGlmIChvbGRUYWcuaXNFcXVhbE5vZGUobmV3VGFnKSkge1xyXG4gICAgICAgICAgICAgICAgb2xkVGFncy5zcGxpY2UoaywgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICAgIG9sZFRhZ3MuZm9yRWFjaCgodCk9PnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KVxyXG4gICAgKTtcclxuICAgIG5ld1RhZ3MuZm9yRWFjaCgodCk9PmhlYWRFbC5pbnNlcnRCZWZvcmUodCwgaGVhZENvdW50RWwpXHJcbiAgICApO1xyXG4gICAgaGVhZENvdW50RWwuY29udGVudCA9IChoZWFkQ291bnQgLSBvbGRUYWdzLmxlbmd0aCArIG5ld1RhZ3MubGVuZ3RoKS50b1N0cmluZygpO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRIZWFkTWFuYWdlcigpIHtcclxuICAgIGxldCB1cGRhdGVQcm9taXNlID0gbnVsbDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW91bnRlZEluc3RhbmNlczogbmV3IFNldCgpLFxyXG4gICAgICAgIHVwZGF0ZUhlYWQ6IChoZWFkKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdXBkYXRlUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1cGRhdGVQcm9taXNlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9taXNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSB7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaGVhZC5mb3JFYWNoKChoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgvLyBJZiB0aGUgZm9udCB0YWcgaXMgbG9hZGVkIG9ubHkgb24gY2xpZW50IG5hdmlnYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAvLyBpdCB3b24ndCBiZSBpbmxpbmVkLiBJbiB0aGlzIGNhc2UgcmV2ZXJ0IHRvIHRoZSBvcmlnaW5hbCBiZWhhdmlvclxyXG4gICAgICAgICAgICAgICAgICAgIGgudHlwZSA9PT0gJ2xpbmsnICYmIGgucHJvcHNbJ2RhdGEtb3B0aW1pemVkLWZvbnRzJ10gJiYgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHN0eWxlW2RhdGEtaHJlZj1cIiR7aC5wcm9wc1snZGF0YS1ocmVmJ119XCJdYCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaC5wcm9wcy5ocmVmID0gaC5wcm9wc1snZGF0YS1ocmVmJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGgucHJvcHNbJ2RhdGEtaHJlZiddID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gdGFnc1toLnR5cGVdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChoKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWdzW2gudHlwZV0gPSBjb21wb25lbnRzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZUNvbXBvbmVudCA9IHRhZ3MudGl0bGUgPyB0YWdzLnRpdGxlWzBdIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGxldCB0aXRsZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBjaGlsZHJlbiAgfSA9IHRpdGxlQ29tcG9uZW50LnByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gdHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJyA/IGNoaWxkcmVuIDogQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbi5qb2luKCcnKSA6ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlICE9PSBkb2N1bWVudC50aXRsZSkgZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAnbWV0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Jhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsaW5rJyxcclxuICAgICAgICAgICAgICAgICAgICAnc3R5bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdzY3JpcHQnXHJcbiAgICAgICAgICAgICAgICBdLmZvckVhY2goKHR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRWxlbWVudHModHlwZSwgdGFnc1t0eXBlXSB8fCBbXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVhZC1tYW5hZ2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcclxuICAgIHZhbHVlOiB0cnVlXHJcbn0pO1xyXG5leHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSBleHBvcnRzLmNhbmNlbElkbGVDYWxsYmFjayA9IHZvaWQgMDtcclxuY29uc3QgcmVxdWVzdElkbGVDYWxsYmFjayA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihjYikge1xyXG4gICAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNiKHtcclxuICAgICAgICAgICAgZGlkVGltZW91dDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpbWVSZW1haW5pbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIDUwIC0gKERhdGUubm93KCkgLSBzdGFydCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCAxKTtcclxufTtcclxuZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjaztcclxuY29uc3QgY2FuY2VsSWRsZUNhbGxiYWNrID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrLmJpbmQod2luZG93KSB8fCBmdW5jdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XHJcbn07XHJcbmV4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrID0gY2FuY2VsSWRsZUNhbGxiYWNrO1xyXG5cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVxdWVzdC1pZGxlLWNhbGxiYWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcclxuICAgIHZhbHVlOiB0cnVlXHJcbn0pO1xyXG5leHBvcnRzLmluaXRTY3JpcHRMb2FkZXIgPSBpbml0U2NyaXB0TG9hZGVyO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XHJcbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciBfaGVhZE1hbmFnZXJDb250ZXh0ID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHRcIik7XHJcbnZhciBfaGVhZE1hbmFnZXIgPSByZXF1aXJlKFwiLi9oZWFkLW1hbmFnZXJcIik7XHJcbnZhciBfcmVxdWVzdElkbGVDYWxsYmFjayA9IHJlcXVpcmUoXCIuL3JlcXVlc3QtaWRsZS1jYWxsYmFja1wiKTtcclxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKGtleSBpbiBvYmopIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XHJcbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24oc3ltKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufVxyXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xyXG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge1xyXG4gICAgfTtcclxuICAgIHZhciB0YXJnZXQgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcclxuICAgIHZhciBrZXksIGk7XHJcbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xyXG4gICAgICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn1cclxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xyXG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge1xyXG4gICAgfTtcclxuICAgIHZhciB0YXJnZXQgPSB7XHJcbiAgICB9O1xyXG4gICAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xyXG4gICAgdmFyIGtleSwgaTtcclxuICAgIGZvcihpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGtleSA9IHNvdXJjZUtleXNbaV07XHJcbiAgICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcclxuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufVxyXG5jb25zdCBTY3JpcHRDYWNoZSA9IG5ldyBNYXAoKTtcclxuY29uc3QgTG9hZENhY2hlID0gbmV3IFNldCgpO1xyXG5jb25zdCBpZ25vcmVQcm9wcyA9IFtcclxuICAgICdvbkxvYWQnLFxyXG4gICAgJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyxcclxuICAgICdjaGlsZHJlbicsXHJcbiAgICAnb25FcnJvcicsXHJcbiAgICAnc3RyYXRlZ3knLCBcclxuXTtcclxuY29uc3QgbG9hZFNjcmlwdCA9IChwcm9wcyk9PntcclxuICAgIGNvbnN0IHsgc3JjICwgaWQgLCBvbkxvYWQgPSgpPT57XHJcbiAgICB9ICwgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgLCBjaGlsZHJlbiA9JycgLCBvbkVycm9yICwgIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGNhY2hlS2V5ID0gaWQgfHwgc3JjO1xyXG4gICAgLy8gU2NyaXB0IGhhcyBhbHJlYWR5IGxvYWRlZFxyXG4gICAgaWYgKGNhY2hlS2V5ICYmIExvYWRDYWNoZS5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gQ29udGVudHMgb2YgdGhpcyBzY3JpcHQgYXJlIGFscmVhZHkgbG9hZGluZy9sb2FkZWRcclxuICAgIGlmIChTY3JpcHRDYWNoZS5oYXMoc3JjKSkge1xyXG4gICAgICAgIExvYWRDYWNoZS5hZGQoY2FjaGVLZXkpO1xyXG4gICAgICAgIC8vIEV4ZWN1dGUgb25Mb2FkIHNpbmNlIHRoZSBzY3JpcHQgbG9hZGluZyBoYXMgYmVndW5cclxuICAgICAgICBTY3JpcHRDYWNoZS5nZXQoc3JjKS50aGVuKG9uTG9hZCwgb25FcnJvcik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIGNvbnN0IGxvYWRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIGlmIChvbkxvYWQpIHtcclxuICAgICAgICAgICAgICAgIG9uTG9hZC5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAob25FcnJvcikge1xyXG4gICAgICAgICAgICBvbkVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHNyYykge1xyXG4gICAgICAgIFNjcmlwdENhY2hlLnNldChzcmMsIGxvYWRQcm9taXNlKTtcclxuICAgIH1cclxuICAgIExvYWRDYWNoZS5hZGQoY2FjaGVLZXkpO1xyXG4gICAgaWYgKGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKSB7XHJcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sIHx8ICcnO1xyXG4gICAgfSBlbHNlIGlmIChjaGlsZHJlbikge1xyXG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJyA/IGNoaWxkcmVuIDogQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbi5qb2luKCcnKSA6ICcnO1xyXG4gICAgfSBlbHNlIGlmIChzcmMpIHtcclxuICAgICAgICBlbC5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IFtrLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKXtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpZ25vcmVQcm9wcy5pbmNsdWRlcyhrKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYXR0ciA9IF9oZWFkTWFuYWdlci5ET01BdHRyaWJ1dGVOYW1lc1trXSB8fCBrLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xyXG59O1xyXG5mdW5jdGlvbiBoYW5kbGVDbGllbnRTY3JpcHRMb2FkKHByb3BzKSB7XHJcbiAgICBjb25zdCB7IHN0cmF0ZWd5ID0nYWZ0ZXJJbnRlcmFjdGl2ZScgIH0gPSBwcm9wcztcclxuICAgIGlmIChzdHJhdGVneSA9PT0gJ2FmdGVySW50ZXJhY3RpdmUnKSB7XHJcbiAgICAgICAgbG9hZFNjcmlwdChwcm9wcyk7XHJcbiAgICB9IGVsc2UgaWYgKHN0cmF0ZWd5ID09PSAnbGF6eU9ubG9hZCcpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpPT57XHJcbiAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+bG9hZFNjcmlwdChwcm9wcylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBsb2FkTGF6eVNjcmlwdChwcm9wcykge1xyXG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuICAgICAgICAoMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCk9PmxvYWRTY3JpcHQocHJvcHMpXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKT0+e1xyXG4gICAgICAgICAgICAoMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCk9PmxvYWRTY3JpcHQocHJvcHMpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5pdFNjcmlwdExvYWRlcihzY3JpcHRMb2FkZXJJdGVtcykge1xyXG4gICAgc2NyaXB0TG9hZGVySXRlbXMuZm9yRWFjaChoYW5kbGVDbGllbnRTY3JpcHRMb2FkKTtcclxufVxyXG5mdW5jdGlvbiBTY3JpcHQocHJvcHMpIHtcclxuICAgIGNvbnN0IHsgc3JjID0nJyAsIG9uTG9hZCA9KCk9PntcclxuICAgIH0gLCBkYW5nZXJvdXNseVNldElubmVySFRNTCAsIHN0cmF0ZWd5ID0nYWZ0ZXJJbnRlcmFjdGl2ZScgLCBvbkVycm9yICB9ID0gcHJvcHMsIHJlc3RQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgW1wic3JjXCIsIFwib25Mb2FkXCIsIFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiwgXCJzdHJhdGVneVwiLCBcIm9uRXJyb3JcIl0pO1xyXG4gICAgLy8gQ29udGV4dCBpcyBhdmFpbGFibGUgb25seSBkdXJpbmcgU1NSXHJcbiAgICBjb25zdCB7IHVwZGF0ZVNjcmlwdHMgLCBzY3JpcHRzICB9ID0gKDAsIF9yZWFjdCkudXNlQ29udGV4dChfaGVhZE1hbmFnZXJDb250ZXh0LkhlYWRNYW5hZ2VyQ29udGV4dCk7XHJcbiAgICAoMCwgX3JlYWN0KS51c2VFZmZlY3QoKCk9PntcclxuICAgICAgICBpZiAoc3RyYXRlZ3kgPT09ICdhZnRlckludGVyYWN0aXZlJykge1xyXG4gICAgICAgICAgICBsb2FkU2NyaXB0KHByb3BzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0cmF0ZWd5ID09PSAnbGF6eU9ubG9hZCcpIHtcclxuICAgICAgICAgICAgbG9hZExhenlTY3JpcHQocHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtcclxuICAgICAgICBwcm9wcyxcclxuICAgICAgICBzdHJhdGVneVxyXG4gICAgXSk7XHJcbiAgICBpZiAoc3RyYXRlZ3kgPT09ICdiZWZvcmVJbnRlcmFjdGl2ZScpIHtcclxuICAgICAgICBpZiAodXBkYXRlU2NyaXB0cykge1xyXG4gICAgICAgICAgICBzY3JpcHRzLmJlZm9yZUludGVyYWN0aXZlID0gKHNjcmlwdHMuYmVmb3JlSW50ZXJhY3RpdmUgfHwgW10pLmNvbmNhdChbXHJcbiAgICAgICAgICAgICAgICBfb2JqZWN0U3ByZWFkKHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Mb2FkLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3JcclxuICAgICAgICAgICAgICAgIH0sIHJlc3RQcm9wcyksIFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgdXBkYXRlU2NyaXB0cyhzY3JpcHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2FkU2NyaXB0KHByb3BzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG52YXIgX2RlZmF1bHQgPSBTY3JpcHQ7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xyXG5cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NyaXB0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcclxuICAgIHZhbHVlOiB0cnVlXHJcbn0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEb2N1bWVudENvbnRleHRcIiwge1xyXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIF91dGlscy5Eb2N1bWVudENvbnRleHQ7XHJcbiAgICB9XHJcbn0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEb2N1bWVudEluaXRpYWxQcm9wc1wiLCB7XHJcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX3V0aWxzLkRvY3VtZW50SW5pdGlhbFByb3BzO1xyXG4gICAgfVxyXG59KTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRG9jdW1lbnRQcm9wc1wiLCB7XHJcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX3V0aWxzLkRvY3VtZW50UHJvcHM7XHJcbiAgICB9XHJcbn0pO1xyXG5leHBvcnRzLkh0bWwgPSBIdG1sO1xyXG5leHBvcnRzLk1haW4gPSBNYWluO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XHJcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwicmVhY3RcIikpO1xyXG52YXIgX3NlcnZlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInN0eWxlZC1qc3gvc2VydmVyXCIpKTtcclxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9jb25zdGFudHNcIik7XHJcbnZhciBfZG9jdW1lbnRDb250ZXh0ID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvZG9jdW1lbnQtY29udGV4dFwiKTtcclxudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3V0aWxzXCIpO1xyXG52YXIgX2dldFBhZ2VGaWxlcyA9IHJlcXVpcmUoXCIuLi9zZXJ2ZXIvZ2V0LXBhZ2UtZmlsZXNcIik7XHJcbnZhciBfdXRpbHMxID0gcmVxdWlyZShcIi4uL3NlcnZlci91dGlsc1wiKTtcclxudmFyIF9odG1sZXNjYXBlID0gcmVxdWlyZShcIi4uL3NlcnZlci9odG1sZXNjYXBlXCIpO1xyXG52YXIgX3NjcmlwdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL2NsaWVudC9zY3JpcHRcIikpO1xyXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xyXG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcclxuICAgICAgICBkZWZhdWx0OiBvYmpcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7XHJcbiAgICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG5ld09iaiA9IHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChvYmogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBvYmope1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdPYmouZGVmYXVsdCA9IG9iajtcclxuICAgICAgICByZXR1cm4gbmV3T2JqO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldERvY3VtZW50RmlsZXMoYnVpbGRNYW5pZmVzdCwgcGF0aG5hbWUsIGluQW1wTW9kZSkge1xyXG4gICAgY29uc3Qgc2hhcmVkRmlsZXMgPSAoMCwgX2dldFBhZ2VGaWxlcykuZ2V0UGFnZUZpbGVzKGJ1aWxkTWFuaWZlc3QsICcvX2FwcCcpO1xyXG4gICAgY29uc3QgcGFnZUZpbGVzID0gaW5BbXBNb2RlID8gW10gOiAoMCwgX2dldFBhZ2VGaWxlcykuZ2V0UGFnZUZpbGVzKGJ1aWxkTWFuaWZlc3QsIHBhdGhuYW1lKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2hhcmVkRmlsZXMsXHJcbiAgICAgICAgcGFnZUZpbGVzLFxyXG4gICAgICAgIGFsbEZpbGVzOiBbXHJcbiAgICAgICAgICAgIC4uLm5ldyBTZXQoW1xyXG4gICAgICAgICAgICAgICAgLi4uc2hhcmVkRmlsZXMsXHJcbiAgICAgICAgICAgICAgICAuLi5wYWdlRmlsZXNcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGdldFBvbHlmaWxsU2NyaXB0cyhjb250ZXh0LCBwcm9wcykge1xyXG4gICAgLy8gcG9seWZpbGxzLmpzIGhhcyB0byBiZSByZW5kZXJlZCBhcyBub21vZHVsZSB3aXRob3V0IGFzeW5jXHJcbiAgICAvLyBJdCBhbHNvIGhhcyB0byBiZSB0aGUgZmlyc3Qgc2NyaXB0IHRvIGxvYWRcclxuICAgIGNvbnN0IHsgYXNzZXRQcmVmaXggLCBidWlsZE1hbmlmZXN0ICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gY29udGV4dDtcclxuICAgIHJldHVybiBidWlsZE1hbmlmZXN0LnBvbHlmaWxsRmlsZXMuZmlsdGVyKChwb2x5ZmlsbCk9PnBvbHlmaWxsLmVuZHNXaXRoKCcuanMnKSAmJiAhcG9seWZpbGwuZW5kc1dpdGgoJy5tb2R1bGUuanMnKVxyXG4gICAgKS5tYXAoKHBvbHlmaWxsKT0+LyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHtcclxuICAgICAgICAgICAga2V5OiBwb2x5ZmlsbCxcclxuICAgICAgICAgICAgZGVmZXI6ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxcclxuICAgICAgICAgICAgbm9uY2U6IHByb3BzLm5vbmNlLFxyXG4gICAgICAgICAgICBjcm9zc09yaWdpbjogcHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixcclxuICAgICAgICAgICAgbm9Nb2R1bGU6IHRydWUsXHJcbiAgICAgICAgICAgIHNyYzogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7cG9seWZpbGx9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gXHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UHJlTmV4dFNjcmlwdHMoY29udGV4dCwgcHJvcHMpIHtcclxuICAgIGNvbnN0IHsgc2NyaXB0TG9hZGVyICwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgIH0gPSBjb250ZXh0O1xyXG4gICAgcmV0dXJuIChzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmUgfHwgW10pLm1hcCgoZmlsZSwgaW5kZXgpPT57XHJcbiAgICAgICAgY29uc3QgeyBzdHJhdGVneSAsIC4uLnNjcmlwdFByb3BzIH0gPSBmaWxlO1xyXG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgfSwgc2NyaXB0UHJvcHMsIHtcclxuICAgICAgICAgICAga2V5OiBzY3JpcHRQcm9wcy5zcmMgfHwgaW5kZXgsXHJcbiAgICAgICAgICAgIGRlZmVyOiAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcsXHJcbiAgICAgICAgICAgIG5vbmNlOiBwcm9wcy5ub25jZSxcclxuICAgICAgICAgICAgY3Jvc3NPcmlnaW46IHByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cclxuICAgICAgICB9KSkpO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RHluYW1pY0NodW5rcyhjb250ZXh0LCBwcm9wcywgZmlsZXMpIHtcclxuICAgIGNvbnN0IHsgZHluYW1pY0ltcG9ydHMgLCBhc3NldFByZWZpeCAsIGlzRGV2ZWxvcG1lbnQgLCBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyAsIGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nICwgIH0gPSBjb250ZXh0O1xyXG4gICAgcmV0dXJuIGR5bmFtaWNJbXBvcnRzLm1hcCgoZmlsZSk9PntcclxuICAgICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoJy5qcycpIHx8IGZpbGVzLmFsbEZpbGVzLmluY2x1ZGVzKGZpbGUpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHtcclxuICAgICAgICAgICAgYXN5bmM6ICFpc0RldmVsb3BtZW50ICYmIGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLFxyXG4gICAgICAgICAgICBkZWZlcjogIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLFxyXG4gICAgICAgICAgICBrZXk6IGZpbGUsXHJcbiAgICAgICAgICAgIHNyYzogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcclxuICAgICAgICAgICAgbm9uY2U6IHByb3BzLm5vbmNlLFxyXG4gICAgICAgICAgICBjcm9zc09yaWdpbjogcHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTlxyXG4gICAgICAgIH0pKTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGdldFNjcmlwdHMoY29udGV4dCwgcHJvcHMsIGZpbGVzKSB7XHJcbiAgICB2YXIgcmVmO1xyXG4gICAgY29uc3QgeyBhc3NldFByZWZpeCAsIGJ1aWxkTWFuaWZlc3QgLCBpc0RldmVsb3BtZW50ICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gY29udGV4dDtcclxuICAgIGNvbnN0IG5vcm1hbFNjcmlwdHMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGZpbGUpPT5maWxlLmVuZHNXaXRoKCcuanMnKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IGxvd1ByaW9yaXR5U2NyaXB0cyA9IChyZWYgPSBidWlsZE1hbmlmZXN0Lmxvd1ByaW9yaXR5RmlsZXMpID09PSBudWxsIHx8IHJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmLmZpbHRlcigoZmlsZSk9PmZpbGUuZW5kc1dpdGgoJy5qcycpXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICAuLi5ub3JtYWxTY3JpcHRzLFxyXG4gICAgICAgIC4uLmxvd1ByaW9yaXR5U2NyaXB0c1xyXG4gICAgXS5tYXAoKGZpbGUpPT57XHJcbiAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XHJcbiAgICAgICAgICAgIGtleTogZmlsZSxcclxuICAgICAgICAgICAgc3JjOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxyXG4gICAgICAgICAgICBub25jZTogcHJvcHMubm9uY2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiAhaXNEZXZlbG9wbWVudCAmJiBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxcclxuICAgICAgICAgICAgZGVmZXI6ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyxcclxuICAgICAgICAgICAgY3Jvc3NPcmlnaW46IHByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cclxuICAgICAgICB9KSk7XHJcbiAgICB9KTtcclxufVxyXG5jbGFzcyBEb2N1bWVudDEgZXh0ZW5kcyBfcmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8qKlxyXG4gICAqIGBnZXRJbml0aWFsUHJvcHNgIGhvb2sgcmV0dXJucyB0aGUgY29udGV4dCBvYmplY3Qgd2l0aCB0aGUgYWRkaXRpb24gb2YgYHJlbmRlclBhZ2VgLlxyXG4gICAqIGByZW5kZXJQYWdlYCBjYWxsYmFjayBleGVjdXRlcyBgUmVhY3RgIHJlbmRlcmluZyBsb2dpYyBzeW5jaHJvbm91c2x5IHRvIHN1cHBvcnQgc2VydmVyLXJlbmRlcmluZyB3cmFwcGVyc1xyXG4gICAqLyBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eCkge1xyXG4gICAgICAgIGNvbnN0IGVuaGFuY2VBcHAgPSAoQXBwKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gKHByb3BzKT0+LyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEFwcCwgT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgICAgICB9LCBwcm9wcykpXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHsgaHRtbCAsIGhlYWQgIH0gPSBhd2FpdCBjdHgucmVuZGVyUGFnZSh7XHJcbiAgICAgICAgICAgIGVuaGFuY2VBcHBcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzdHlsZXMgPSBbXHJcbiAgICAgICAgICAgIC4uLigwLCBfc2VydmVyKS5kZWZhdWx0KClcclxuICAgICAgICBdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGh0bWwsXHJcbiAgICAgICAgICAgIGhlYWQsXHJcbiAgICAgICAgICAgIHN0eWxlc1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgcmVuZGVyRG9jdW1lbnQoRG9jdW1lbnRDb21wb25lbnQsIHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dC5Qcm92aWRlciwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHNcclxuICAgICAgICB9LCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRG9jdW1lbnRDb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIH0sIHByb3BzKSkpKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEh0bWwsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChIZWFkLCBudWxsKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYm9keVwiLCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWFpbiwgbnVsbCksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChOZXh0U2NyaXB0LCBudWxsKSkpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBEb2N1bWVudDE7XHJcbmZ1bmN0aW9uIEh0bWwocHJvcHMpIHtcclxuICAgIGNvbnN0IHsgaW5BbXBNb2RlICwgZG9jQ29tcG9uZW50c1JlbmRlcmVkICwgbG9jYWxlICB9ID0gKDAsIF9yZWFjdCkudXNlQ29udGV4dChfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dCk7XHJcbiAgICBkb2NDb21wb25lbnRzUmVuZGVyZWQuSHRtbCA9IHRydWU7XHJcbiAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaHRtbFwiLCBPYmplY3QuYXNzaWduKHtcclxuICAgIH0sIHByb3BzLCB7XHJcbiAgICAgICAgbGFuZzogcHJvcHMubGFuZyB8fCBsb2NhbGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGFtcDogaW5BbXBNb2RlID8gJycgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgXCJkYXRhLWFtcGRldm1vZGVcIjogaW5BbXBNb2RlICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAnJyA6IHVuZGVmaW5lZFxyXG4gICAgfSkpKTtcclxufVxyXG5jbGFzcyBIZWFkIGV4dGVuZHMgX3JlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBnZXRDc3NMaW5rcyhmaWxlcykge1xyXG4gICAgICAgIGNvbnN0IHsgYXNzZXRQcmVmaXggLCBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyAsIGR5bmFtaWNJbXBvcnRzICwgIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY29uc3QgY3NzRmlsZXMgPSBmaWxlcy5hbGxGaWxlcy5maWx0ZXIoKGYpPT5mLmVuZHNXaXRoKCcuY3NzJylcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHNoYXJlZEZpbGVzID0gbmV3IFNldChmaWxlcy5zaGFyZWRGaWxlcyk7XHJcbiAgICAgICAgLy8gVW5tYW5hZ2VkIGZpbGVzIGFyZSBDU1MgZmlsZXMgdGhhdCB3aWxsIGJlIGhhbmRsZWQgZGlyZWN0bHkgYnkgdGhlXHJcbiAgICAgICAgLy8gd2VicGFjayBydW50aW1lIChgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5gKS5cclxuICAgICAgICBsZXQgdW5tYW5nZWRGaWxlcyA9IG5ldyBTZXQoW10pO1xyXG4gICAgICAgIGxldCBkeW5hbWljQ3NzRmlsZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZHluYW1pY0ltcG9ydHMuZmlsdGVyKChmaWxlKT0+ZmlsZS5lbmRzV2l0aCgnLmNzcycpXHJcbiAgICAgICAgKSkpO1xyXG4gICAgICAgIGlmIChkeW5hbWljQ3NzRmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3IFNldChjc3NGaWxlcyk7XHJcbiAgICAgICAgICAgIGR5bmFtaWNDc3NGaWxlcyA9IGR5bmFtaWNDc3NGaWxlcy5maWx0ZXIoKGYpPT4hKGV4aXN0aW5nLmhhcyhmKSB8fCBzaGFyZWRGaWxlcy5oYXMoZikpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHVubWFuZ2VkRmlsZXMgPSBuZXcgU2V0KGR5bmFtaWNDc3NGaWxlcyk7XHJcbiAgICAgICAgICAgIGNzc0ZpbGVzLnB1c2goLi4uZHluYW1pY0Nzc0ZpbGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNzc0xpbmtFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIGNzc0ZpbGVzLmZvckVhY2goKGZpbGUpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2hhcmVkRmlsZSA9IHNoYXJlZEZpbGVzLmhhcyhmaWxlKTtcclxuICAgICAgICAgICAgaWYgKCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTKSB7XHJcbiAgICAgICAgICAgICAgICBjc3NMaW5rRWxlbWVudHMucHVzaCgvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGAke2ZpbGV9LXByZWxvYWRgLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbDogXCJwcmVsb2FkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcclxuICAgICAgICAgICAgICAgICAgICBhczogXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpc1VubWFuYWdlZEZpbGUgPSB1bm1hbmdlZEZpbGVzLmhhcyhmaWxlKTtcclxuICAgICAgICAgICAgY3NzTGlua0VsZW1lbnRzLnB1c2goLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7XHJcbiAgICAgICAgICAgICAgICBrZXk6IGZpbGUsXHJcbiAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcclxuICAgICAgICAgICAgICAgIHJlbDogXCJzdHlsZXNoZWV0XCIsXHJcbiAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxyXG4gICAgICAgICAgICAgICAgY3Jvc3NPcmlnaW46IHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixcclxuICAgICAgICAgICAgICAgIFwiZGF0YS1uLWdcIjogaXNVbm1hbmFnZWRGaWxlID8gdW5kZWZpbmVkIDogaXNTaGFyZWRGaWxlID8gJycgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBcImRhdGEtbi1wXCI6IGlzVW5tYW5hZ2VkRmlsZSA/IHVuZGVmaW5lZCA6IGlzU2hhcmVkRmlsZSA/IHVuZGVmaW5lZCA6ICcnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgJiYgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTKSB7XHJcbiAgICAgICAgICAgIGNzc0xpbmtFbGVtZW50cyA9IHRoaXMubWFrZVN0eWxlc2hlZXRJbmVydChjc3NMaW5rRWxlbWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3NzTGlua0VsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBjc3NMaW5rRWxlbWVudHM7XHJcbiAgICB9XHJcbiAgICBnZXRQcmVsb2FkRHluYW1pY0NodW5rcygpIHtcclxuICAgICAgICBjb25zdCB7IGR5bmFtaWNJbXBvcnRzICwgYXNzZXRQcmVmaXggLCBkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyAsICB9ID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgIHJldHVybiBkeW5hbWljSW1wb3J0cy5tYXAoKGZpbGUpPT57XHJcbiAgICAgICAgICAgIGlmICghZmlsZS5lbmRzV2l0aCgnLmpzJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcclxuICAgICAgICAgICAgICAgIHJlbDogXCJwcmVsb2FkXCIsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGZpbGUsXHJcbiAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxyXG4gICAgICAgICAgICAgICAgYXM6IFwic2NyaXB0XCIsXHJcbiAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcclxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pLy8gRmlsdGVyIG91dCBudWxsZWQgc2NyaXB0c1xyXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XHJcbiAgICB9XHJcbiAgICBnZXRQcmVsb2FkTWFpbkxpbmtzKGZpbGVzKSB7XHJcbiAgICAgICAgY29uc3QgeyBhc3NldFByZWZpeCAsIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nICwgc2NyaXB0TG9hZGVyICwgIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY29uc3QgcHJlbG9hZEZpbGVzID0gZmlsZXMuYWxsRmlsZXMuZmlsdGVyKChmaWxlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsZS5lbmRzV2l0aCgnLmpzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgLi4uKHNjcmlwdExvYWRlci5iZWZvcmVJbnRlcmFjdGl2ZSB8fCBbXSkubWFwKChmaWxlKT0+LyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBmaWxlLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcclxuICAgICAgICAgICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IGZpbGUuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzOiBcInNjcmlwdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIC4uLnByZWxvYWRGaWxlcy5tYXAoKGZpbGUpPT4vKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9uY2U6IHRoaXMucHJvcHMubm9uY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsOiBcInByZWxvYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBocmVmOiBgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzOiBcInNjcmlwdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICksIFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBnZXREeW5hbWljQ2h1bmtzKGZpbGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzLCBmaWxlcyk7XHJcbiAgICB9XHJcbiAgICBnZXRQcmVOZXh0U2NyaXB0cygpIHtcclxuICAgICAgICByZXR1cm4gZ2V0UHJlTmV4dFNjcmlwdHModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzKTtcclxuICAgIH1cclxuICAgIGdldFNjcmlwdHMoZmlsZXMpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U2NyaXB0cyh0aGlzLmNvbnRleHQsIHRoaXMucHJvcHMsIGZpbGVzKTtcclxuICAgIH1cclxuICAgIGdldFBvbHlmaWxsU2NyaXB0cygpIHtcclxuICAgICAgICByZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCwgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVEb2N1bWVudFNjcmlwdExvYWRlckl0ZW1zKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgY29uc3QgeyBzY3JpcHRMb2FkZXIgIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0TG9hZGVySXRlbXMgPSBbXTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJlZENoaWxkcmVuID0gW107XHJcbiAgICAgICAgX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGNoaWxkKT0+e1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gX3NjcmlwdC5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQucHJvcHMuc3RyYXRlZ3kgPT09ICdiZWZvcmVJbnRlcmFjdGl2ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmUgPSAoc2NyaXB0TG9hZGVyLmJlZm9yZUludGVyYWN0aXZlIHx8IFtdKS5jb25jYXQoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jaGlsZC5wcm9wc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFtcclxuICAgICAgICAgICAgICAgICAgICAnbGF6eU9ubG9hZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FmdGVySW50ZXJhY3RpdmUnXHJcbiAgICAgICAgICAgICAgICBdLmluY2x1ZGVzKGNoaWxkLnByb3BzLnN0cmF0ZWd5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdExvYWRlckl0ZW1zLnB1c2goY2hpbGQucHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaWx0ZXJlZENoaWxkcmVuLnB1c2goY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnNjcmlwdExvYWRlciA9IHNjcmlwdExvYWRlckl0ZW1zO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZENoaWxkcmVuO1xyXG4gICAgfVxyXG4gICAgbWFrZVN0eWxlc2hlZXRJbmVydChub2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChub2RlLCAoYyk9PntcclxuICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gJ2xpbmsnICYmIGMucHJvcHNbJ2hyZWYnXSAmJiBfY29uc3RhbnRzLk9QVElNSVpFRF9GT05UX1BST1ZJREVSUy5zb21lKCh7IHVybCAgfSk9PmMucHJvcHNbJ2hyZWYnXS5zdGFydHNXaXRoKHVybClcclxuICAgICAgICAgICAgKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uYy5wcm9wcyB8fCB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG5ld1Byb3BzWydkYXRhLWhyZWYnXSA9IG5ld1Byb3BzWydocmVmJ107XHJcbiAgICAgICAgICAgICAgICBuZXdQcm9wc1snaHJlZiddID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY2xvbmVFbGVtZW50KGMsIG5ld1Byb3BzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYy5wcm9wcyAmJiBjLnByb3BzWydjaGlsZHJlbiddKSB7XHJcbiAgICAgICAgICAgICAgICBjLnByb3BzWydjaGlsZHJlbiddID0gdGhpcy5tYWtlU3R5bGVzaGVldEluZXJ0KGMucHJvcHNbJ2NoaWxkcmVuJ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgc3R5bGVzICwgYW1wUGF0aCAsIGluQW1wTW9kZSAsIGh5YnJpZEFtcCAsIGNhbm9uaWNhbEJhc2UgLCBfX05FWFRfREFUQV9fICwgZGFuZ2Vyb3VzQXNQYXRoICwgaGVhZFRhZ3MgLCB1bnN0YWJsZV9ydW50aW1lSlMgLCB1bnN0YWJsZV9Kc1ByZWxvYWQgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgIGNvbnN0IGRpc2FibGVSdW50aW1lSlMgPSB1bnN0YWJsZV9ydW50aW1lSlMgPT09IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGRpc2FibGVKc1ByZWxvYWQgPSB1bnN0YWJsZV9Kc1ByZWxvYWQgPT09IGZhbHNlIHx8ICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZztcclxuICAgICAgICB0aGlzLmNvbnRleHQuZG9jQ29tcG9uZW50c1JlbmRlcmVkLkhlYWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCB7IGhlYWQgIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgbGV0IGNzc1ByZWxvYWRzID0gW107XHJcbiAgICAgICAgbGV0IG90aGVySGVhZEVsZW1lbnRzID0gW107XHJcbiAgICAgICAgaWYgKGhlYWQpIHtcclxuICAgICAgICAgICAgaGVhZC5mb3JFYWNoKChjKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKGMgJiYgYy50eXBlID09PSAnbGluaycgJiYgYy5wcm9wc1sncmVsJ10gPT09ICdwcmVsb2FkJyAmJiBjLnByb3BzWydhcyddID09PSAnc3R5bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzUHJlbG9hZHMucHVzaChjKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYyAmJiBvdGhlckhlYWRFbGVtZW50cy5wdXNoKGMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaGVhZCA9IGNzc1ByZWxvYWRzLmNvbmNhdChvdGhlckhlYWRFbGVtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgICAgIC8vIHNob3cgYSB3YXJuaW5nIGlmIEhlYWQgY29udGFpbnMgPHRpdGxlPiAob25seSBpbiBkZXZlbG9wbWVudClcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKT0+e1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUmVhY3RIZWxtZXQgPSBjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogKHJlZiA9IGNoaWxkLnByb3BzKSA9PT0gbnVsbCB8fCByZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZlsnZGF0YS1yZWFjdC1oZWxtZXQnXTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNSZWFjdEhlbG1ldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkLnR5cGUpID09PSAndGl0bGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IDx0aXRsZT4gc2hvdWxkIG5vdCBiZSB1c2VkIGluIF9kb2N1bWVudC5qcydzIDxIZWFkPi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbm8tZG9jdW1lbnQtdGl0bGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNoaWxkLnR5cGUpID09PSAnbWV0YScgJiYgKGNoaWxkID09PSBudWxsIHx8IGNoaWxkID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMSA9IGNoaWxkLnByb3BzKSA9PT0gbnVsbCB8fCByZWYxID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZWYxLm5hbWUpID09PSAndmlld3BvcnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IHZpZXdwb3J0IG1ldGEgdGFncyBzaG91bGQgbm90IGJlIHVzZWQgaW4gX2RvY3VtZW50LmpzJ3MgPEhlYWQ+LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uby1kb2N1bWVudC12aWV3cG9ydC1tZXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNyb3NzT3JpZ2luKSBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IGBIZWFkYCBhdHRyaWJ1dGUgYGNyb3NzT3JpZ2luYCBpcyBkZXByZWNhdGVkLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9kb2MtY3Jvc3NvcmlnaW4tZGVwcmVjYXRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcgJiYgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTICYmICFpbkFtcE1vZGUpIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4gPSB0aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGlsZHJlbiA9IHRoaXMuaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyhjaGlsZHJlbik7XHJcbiAgICAgICAgbGV0IGhhc0FtcGh0bWxSZWwgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaGFzQ2Fub25pY2FsUmVsID0gZmFsc2U7XHJcbiAgICAgICAgLy8gc2hvdyB3YXJuaW5nIGFuZCByZW1vdmUgY29uZmxpY3RpbmcgYW1wIGhlYWQgdGFnc1xyXG4gICAgICAgIGhlYWQgPSBfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5tYXAoaGVhZCB8fCBbXSwgKGNoaWxkKT0+e1xyXG4gICAgICAgICAgICBpZiAoIWNoaWxkKSByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSAsIHByb3BzICB9ID0gY2hpbGQ7XHJcbiAgICAgICAgICAgIGlmIChpbkFtcE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBiYWRQcm9wID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ21ldGEnICYmIHByb3BzLm5hbWUgPT09ICd2aWV3cG9ydCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWRQcm9wID0gJ25hbWU9XCJ2aWV3cG9ydFwiJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2xpbmsnICYmIHByb3BzLnJlbCA9PT0gJ2Nhbm9uaWNhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNDYW5vbmljYWxSZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc2NyaXB0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgYmxvY2sgaWZcclxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBpdCBoYXMgYSBzcmMgYW5kIGlzbid0IHBvaW50aW5nIHRvIGFtcHByb2plY3QncyBDRE5cclxuICAgICAgICAgICAgICAgICAgICAvLyAyLiBpdCBpcyB1c2luZyBkYW5nZXJvdXNseVNldElubmVySFRNTCB3aXRob3V0IGEgdHlwZSBvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGEgdHlwZSBvZiB0ZXh0L2phdmFzY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMuc3JjICYmIHByb3BzLnNyYy5pbmRleE9mKCdhbXBwcm9qZWN0JykgPCAtMSB8fCBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAmJiAoIXByb3BzLnR5cGUgfHwgcHJvcHMudHlwZSA9PT0gJ3RleHQvamF2YXNjcmlwdCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhZFByb3AgPSAnPHNjcmlwdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKChwcm9wKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFkUHJvcCArPSBgICR7cHJvcH09XCIke3Byb3BzW3Byb3BdfVwiYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhZFByb3AgKz0gJy8+JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFkUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRm91bmQgY29uZmxpY3RpbmcgYW1wIHRhZyBcIiR7Y2hpbGQudHlwZX1cIiB3aXRoIGNvbmZsaWN0aW5nIHByb3AgJHtiYWRQcm9wfSBpbiAke19fTkVYVF9EQVRBX18ucGFnZX0uIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2NvbmZsaWN0aW5nLWFtcC10YWdgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG5vbi1hbXAgbW9kZVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdsaW5rJyAmJiBwcm9wcy5yZWwgPT09ICdhbXBodG1sJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0FtcGh0bWxSZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0cnkgdG8gcGFyc2Ugc3R5bGVzIGZyb20gZnJhZ21lbnQgZm9yIGJhY2t3YXJkcyBjb21wYXRcclxuICAgICAgICBjb25zdCBjdXJTdHlsZXMgPSBBcnJheS5pc0FycmF5KHN0eWxlcykgPyBzdHlsZXMgOiBbXTtcclxuICAgICAgICBpZiAoaW5BbXBNb2RlICYmIHN0eWxlcyAmJiAvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcclxuICAgICAgICBzdHlsZXMucHJvcHMgJiYgLy8gQHRzLWlnbm9yZSBQcm9wZXJ0eSAncHJvcHMnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgUmVhY3RFbGVtZW50XHJcbiAgICAgICAgQXJyYXkuaXNBcnJheShzdHlsZXMucHJvcHMuY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc1N0eWxlcyA9IChlbCk9PntcclxuICAgICAgICAgICAgICAgIHZhciByZWYyLCByZWYzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsID09PSBudWxsIHx8IGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMiA9IGVsLnByb3BzKSA9PT0gbnVsbCB8fCByZWYyID09PSB2b2lkIDAgPyB2b2lkIDAgOiAocmVmMyA9IHJlZjIuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpID09PSBudWxsIHx8IHJlZjMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZjMuX19odG1sO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcclxuICAgICAgICAgICAgc3R5bGVzLnByb3BzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZm9yRWFjaCgoZWwpPT5oYXNTdHlsZXMoZWwpICYmIGN1clN0eWxlcy5wdXNoKGVsKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc1N0eWxlcyhjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJTdHlsZXMucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmaWxlcyA9IGdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsIGluQW1wTW9kZSk7XHJcbiAgICAgICAgdmFyIF9ub25jZSwgX25vbmNlMTtcclxuICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaGVhZFwiLCBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICB9LCB0aGlzLnByb3BzKSwgdGhpcy5jb250ZXh0LmlzRGV2ZWxvcG1lbnQgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLCB7XHJcbiAgICAgICAgICAgIFwiZGF0YS1uZXh0LWhpZGUtZm91Y1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImRhdGEtYW1wZGV2bW9kZVwiOiBpbkFtcE1vZGUgPyAndHJ1ZScgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XHJcbiAgICAgICAgICAgICAgICBfX2h0bWw6IGBib2R5e2Rpc3BsYXk6bm9uZX1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xyXG4gICAgICAgICAgICBcImRhdGEtbmV4dC1oaWRlLWZvdWNcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkYXRhLWFtcGRldm1vZGVcIjogaW5BbXBNb2RlID8gJ3RydWUnIDogdW5kZWZpbmVkXHJcbiAgICAgICAgfSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIiwge1xyXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xyXG4gICAgICAgICAgICAgICAgX19odG1sOiBgYm9keXtkaXNwbGF5OmJsb2NrfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKSksIGNoaWxkcmVuLCBwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfRk9OVFMgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLCB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwibmV4dC1mb250LXByZWNvbm5lY3RcIlxyXG4gICAgICAgIH0pLCBoZWFkLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHtcclxuICAgICAgICAgICAgbmFtZTogXCJuZXh0LWhlYWQtY291bnRcIixcclxuICAgICAgICAgICAgY29udGVudDogX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4uY291bnQoaGVhZCB8fCBbXSkudG9TdHJpbmcoKVxyXG4gICAgICAgIH0pLCBpbkFtcE1vZGUgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LCBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHtcclxuICAgICAgICAgICAgbmFtZTogXCJ2aWV3cG9ydFwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIndpZHRoPWRldmljZS13aWR0aCxtaW5pbXVtLXNjYWxlPTEsaW5pdGlhbC1zY2FsZT0xXCJcclxuICAgICAgICB9KSwgIWhhc0Nhbm9uaWNhbFJlbCAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcclxuICAgICAgICAgICAgcmVsOiBcImNhbm9uaWNhbFwiLFxyXG4gICAgICAgICAgICBocmVmOiBjYW5vbmljYWxCYXNlICsgKDAsIF91dGlsczEpLmNsZWFuQW1wUGF0aChkYW5nZXJvdXNBc1BhdGgpXHJcbiAgICAgICAgfSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIiwge1xyXG4gICAgICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxyXG4gICAgICAgICAgICBhczogXCJzY3JpcHRcIixcclxuICAgICAgICAgICAgaHJlZjogXCJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC5qc1wiXHJcbiAgICAgICAgfSksIHN0eWxlcyAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLCB7XHJcbiAgICAgICAgICAgIFwiYW1wLWN1c3RvbVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xyXG4gICAgICAgICAgICAgICAgX19odG1sOiBjdXJTdHlsZXMubWFwKChzdHlsZSk9PnN0eWxlLnByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLl9faHRtbFxyXG4gICAgICAgICAgICAgICAgKS5qb2luKCcnKS5yZXBsYWNlKC9cXC9cXCojIHNvdXJjZU1hcHBpbmdVUkw9LipcXCpcXC8vZywgJycpLnJlcGxhY2UoL1xcL1xcKkAgc291cmNlVVJMPS4qP1xcKlxcLy9nLCAnJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLCB7XHJcbiAgICAgICAgICAgIFwiYW1wLWJvaWxlcnBsYXRlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XHJcbiAgICAgICAgICAgICAgICBfX2h0bWw6IGBib2R5ey13ZWJraXQtYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1vei1hbmltYXRpb246LWFtcC1zdGFydCA4cyBzdGVwcygxLGVuZCkgMHMgMSBub3JtYWwgYm90aDstbXMtYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7YW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGh9QC13ZWJraXQta2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fUAtbW96LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1zLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW8ta2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fUBrZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIsIHtcclxuICAgICAgICAgICAgXCJhbXAtYm9pbGVycGxhdGVcIjogXCJcIixcclxuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcclxuICAgICAgICAgICAgICAgIF9faHRtbDogYGJvZHl7LXdlYmtpdC1hbmltYXRpb246bm9uZTstbW96LWFuaW1hdGlvbjpub25lOy1tcy1hbmltYXRpb246bm9uZTthbmltYXRpb246bm9uZX1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzcmM6IFwiaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanNcIlxyXG4gICAgICAgIH0pKSwgIWluQW1wTW9kZSAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsICFoYXNBbXBodG1sUmVsICYmIGh5YnJpZEFtcCAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIsIHtcclxuICAgICAgICAgICAgcmVsOiBcImFtcGh0bWxcIixcclxuICAgICAgICAgICAgaHJlZjogY2Fub25pY2FsQmFzZSArIGdldEFtcFBhdGgoYW1wUGF0aCwgZGFuZ2Vyb3VzQXNQYXRoKVxyXG4gICAgICAgIH0pLCAhcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0NTUyAmJiB0aGlzLmdldENzc0xpbmtzKGZpbGVzKSwgIXByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xyXG4gICAgICAgICAgICBcImRhdGEtbi1jc3NcIjogKF9ub25jZSA9IHRoaXMucHJvcHMubm9uY2UpICE9PSBudWxsICYmIF9ub25jZSAhPT0gdm9pZCAwID8gX25vbmNlIDogJydcclxuICAgICAgICB9KSwgcHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0lNQUdFUyAmJiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHtcclxuICAgICAgICAgICAgbmFtZTogXCJuZXh0LWltYWdlLXByZWxvYWRcIlxyXG4gICAgICAgIH0pLCAhZGlzYWJsZVJ1bnRpbWVKUyAmJiAhZGlzYWJsZUpzUHJlbG9hZCAmJiB0aGlzLmdldFByZWxvYWREeW5hbWljQ2h1bmtzKCksICFkaXNhYmxlUnVudGltZUpTICYmICFkaXNhYmxlSnNQcmVsb2FkICYmIHRoaXMuZ2V0UHJlbG9hZE1haW5MaW5rcyhmaWxlcyksICFkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldFBvbHlmaWxsU2NyaXB0cygpLCAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLCAhZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXREeW5hbWljQ2h1bmtzKGZpbGVzKSwgIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nICYmICFkaXNhYmxlUnVudGltZUpTICYmIHRoaXMuZ2V0U2NyaXB0cyhmaWxlcyksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgdGhpcy5nZXRDc3NMaW5rcyhmaWxlcyksIHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MgJiYgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwge1xyXG4gICAgICAgICAgICBcImRhdGEtbi1jc3NcIjogKF9ub25jZTEgPSB0aGlzLnByb3BzLm5vbmNlKSAhPT0gbnVsbCAmJiBfbm9uY2UxICE9PSB2b2lkIDAgPyBfbm9uY2UxIDogJydcclxuICAgICAgICB9KSwgdGhpcy5jb250ZXh0LmlzRGV2ZWxvcG1lbnQgJiYgLy8gdGhpcyBlbGVtZW50IGlzIHVzZWQgdG8gbW91bnQgZGV2ZWxvcG1lbnQgc3R5bGVzIHNvIHRoZVxyXG4gICAgICAgIC8vIG9yZGVyaW5nIG1hdGNoZXMgcHJvZHVjdGlvblxyXG4gICAgICAgIC8vIChieSBkZWZhdWx0LCBzdHlsZS1sb2FkZXIgaW5qZWN0cyBhdCB0aGUgYm90dG9tIG9mIDxoZWFkIC8+KVxyXG4gICAgICAgIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIsIHtcclxuICAgICAgICAgICAgaWQ6IFwiX19uZXh0X2Nzc19fRE9fTk9UX1VTRV9fXCJcclxuICAgICAgICB9KSwgc3R5bGVzIHx8IG51bGwpLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsIHtcclxuICAgICAgICB9LCAuLi5oZWFkVGFncyB8fCBbXSkpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkhlYWQgPSBIZWFkO1xyXG5IZWFkLmNvbnRleHRUeXBlID0gX2RvY3VtZW50Q29udGV4dC5Eb2N1bWVudENvbnRleHQ7XHJcbmZ1bmN0aW9uIE1haW4oKSB7XHJcbiAgICBjb25zdCB7IGluQW1wTW9kZSAsIGh0bWwgLCBkb2NDb21wb25lbnRzUmVuZGVyZWQgIH0gPSAoMCwgX3JlYWN0KS51c2VDb250ZXh0KF9kb2N1bWVudENvbnRleHQuRG9jdW1lbnRDb250ZXh0KTtcclxuICAgIGRvY0NvbXBvbmVudHNSZW5kZXJlZC5NYWluID0gdHJ1ZTtcclxuICAgIGlmIChpbkFtcE1vZGUpIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsIF9jb25zdGFudHMuQU1QX1JFTkRFUl9UQVJHRVQpKTtcclxuICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xyXG4gICAgICAgIGlkOiBcIl9fbmV4dFwiLFxyXG4gICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XHJcbiAgICAgICAgICAgIF9faHRtbDogaHRtbFxyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxufVxyXG5jbGFzcyBOZXh0U2NyaXB0IGV4dGVuZHMgX3JlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBnZXREeW5hbWljQ2h1bmtzKGZpbGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzLCBmaWxlcyk7XHJcbiAgICB9XHJcbiAgICBnZXRQcmVOZXh0U2NyaXB0cygpIHtcclxuICAgICAgICByZXR1cm4gZ2V0UHJlTmV4dFNjcmlwdHModGhpcy5jb250ZXh0LCB0aGlzLnByb3BzKTtcclxuICAgIH1cclxuICAgIGdldFNjcmlwdHMoZmlsZXMpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U2NyaXB0cyh0aGlzLmNvbnRleHQsIHRoaXMucHJvcHMsIGZpbGVzKTtcclxuICAgIH1cclxuICAgIGdldFBvbHlmaWxsU2NyaXB0cygpIHtcclxuICAgICAgICByZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCwgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0SW5saW5lU2NyaXB0U291cmNlKGRvY3VtZW50UHJvcHMpIHtcclxuICAgICAgICBjb25zdCB7IF9fTkVYVF9EQVRBX18gIH0gPSBkb2N1bWVudFByb3BzO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShfX05FWFRfREFUQV9fKTtcclxuICAgICAgICAgICAgcmV0dXJuICgwLCBfaHRtbGVzY2FwZSkuaHRtbEVzY2FwZUpzb25TdHJpbmcoZGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIubWVzc2FnZS5pbmRleE9mKCdjaXJjdWxhciBzdHJ1Y3R1cmUnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaXJjdWxhciBzdHJ1Y3R1cmUgaW4gXCJnZXRJbml0aWFsUHJvcHNcIiByZXN1bHQgb2YgcGFnZSBcIiR7X19ORVhUX0RBVEFfXy5wYWdlfVwiLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9jaXJjdWxhci1zdHJ1Y3R1cmVgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYXNzZXRQcmVmaXggLCBpbkFtcE1vZGUgLCBidWlsZE1hbmlmZXN0ICwgdW5zdGFibGVfcnVudGltZUpTICwgZG9jQ29tcG9uZW50c1JlbmRlcmVkICwgZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcgLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAsICB9ID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgIGNvbnN0IGRpc2FibGVSdW50aW1lSlMgPSB1bnN0YWJsZV9ydW50aW1lSlMgPT09IGZhbHNlO1xyXG4gICAgICAgIGRvY0NvbXBvbmVudHNSZW5kZXJlZC5OZXh0U2NyaXB0ID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaW5BbXBNb2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBhbXBEZXZGaWxlcyA9IFtcclxuICAgICAgICAgICAgICAgIC4uLmJ1aWxkTWFuaWZlc3QuZGV2RmlsZXMsXHJcbiAgICAgICAgICAgICAgICAuLi5idWlsZE1hbmlmZXN0LnBvbHlmaWxsRmlsZXMsXHJcbiAgICAgICAgICAgICAgICAuLi5idWlsZE1hbmlmZXN0LmFtcERldkZpbGVzLCBcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgZGlzYWJsZVJ1bnRpbWVKUyA/IG51bGwgOiAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiX19ORVhUX0RBVEFfX1wiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBub25jZTogdGhpcy5wcm9wcy5ub25jZSxcclxuICAgICAgICAgICAgICAgIGNyb3NzT3JpZ2luOiB0aGlzLnByb3BzLmNyb3NzT3JpZ2luIHx8IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4sXHJcbiAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xyXG4gICAgICAgICAgICAgICAgICAgIF9faHRtbDogTmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZGF0YS1hbXBkZXZtb2RlXCI6IHRydWVcclxuICAgICAgICAgICAgfSksIGFtcERldkZpbGVzLm1hcCgoZmlsZSk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBmaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZmlsZX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9uY2U6IHRoaXMucHJvcHMubm9uY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Jvc3NPcmlnaW46IHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGEtYW1wZGV2bW9kZVwiOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNyb3NzT3JpZ2luKSBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IGBOZXh0U2NyaXB0YCBhdHRyaWJ1dGUgYGNyb3NzT3JpZ2luYCBpcyBkZXByZWNhdGVkLiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9kb2MtY3Jvc3NvcmlnaW4tZGVwcmVjYXRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmaWxlcyA9IGdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsIHRoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnBhZ2UsIGluQW1wTW9kZSk7XHJcbiAgICAgICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCwgbnVsbCwgIWRpc2FibGVSdW50aW1lSlMgJiYgYnVpbGRNYW5pZmVzdC5kZXZGaWxlcyA/IGJ1aWxkTWFuaWZlc3QuZGV2RmlsZXMubWFwKChmaWxlKT0+LyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHtcclxuICAgICAgICAgICAgICAgIGtleTogZmlsZSxcclxuICAgICAgICAgICAgICAgIHNyYzogYCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxcclxuICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxyXG4gICAgICAgICAgICAgICAgY3Jvc3NPcmlnaW46IHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4gfHwgcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkgOiBudWxsLCBkaXNhYmxlUnVudGltZUpTID8gbnVsbCA6IC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7XHJcbiAgICAgICAgICAgIGlkOiBcIl9fTkVYVF9EQVRBX19cIixcclxuICAgICAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIG5vbmNlOiB0aGlzLnByb3BzLm5vbmNlLFxyXG4gICAgICAgICAgICBjcm9zc09yaWdpbjogdGhpcy5wcm9wcy5jcm9zc09yaWdpbiB8fCBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLFxyXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xyXG4gICAgICAgICAgICAgICAgX19odG1sOiBOZXh0U2NyaXB0LmdldElubGluZVNjcmlwdFNvdXJjZSh0aGlzLmNvbnRleHQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQb2x5ZmlsbFNjcmlwdHMoKSwgZGlzYWJsZU9wdGltaXplZExvYWRpbmcgJiYgIWRpc2FibGVSdW50aW1lSlMgJiYgdGhpcy5nZXRQcmVOZXh0U2NyaXB0cygpLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldER5bmFtaWNDaHVua3MoZmlsZXMpLCBkaXNhYmxlT3B0aW1pemVkTG9hZGluZyAmJiAhZGlzYWJsZVJ1bnRpbWVKUyAmJiB0aGlzLmdldFNjcmlwdHMoZmlsZXMpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5OZXh0U2NyaXB0ID0gTmV4dFNjcmlwdDtcclxuTmV4dFNjcmlwdC5jb250ZXh0VHlwZSA9IF9kb2N1bWVudENvbnRleHQuRG9jdW1lbnRDb250ZXh0O1xyXG5OZXh0U2NyaXB0LnNhZmFyaU5vbW9kdWxlRml4ID0gJyFmdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LHQ9ZS5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2lmKCEoXCJub01vZHVsZVwiaW4gdCkmJlwib25iZWZvcmVsb2FkXCJpbiB0KXt2YXIgbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmVsb2FkXCIsZnVuY3Rpb24oZSl7aWYoZS50YXJnZXQ9PT10KW49ITA7ZWxzZSBpZighZS50YXJnZXQuaGFzQXR0cmlidXRlKFwibm9tb2R1bGVcIil8fCFuKXJldHVybjtlLnByZXZlbnREZWZhdWx0KCl9LCEwKSx0LnR5cGU9XCJtb2R1bGVcIix0LnNyYz1cIi5cIixlLmhlYWQuYXBwZW5kQ2hpbGQodCksdC5yZW1vdmUoKX19KCk7JztcclxuZnVuY3Rpb24gZ2V0QW1wUGF0aChhbXBQYXRoLCBhc1BhdGgpIHtcclxuICAgIHJldHVybiBhbXBQYXRoIHx8IGAke2FzUGF0aH0ke2FzUGF0aC5pbmNsdWRlcygnPycpID8gJyYnIDogJz8nfWFtcD0xYDtcclxufVxyXG5cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9X2RvY3VtZW50LmpzLm1hcCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zZXJ2ZXIvZ2V0LXBhZ2UtZmlsZXMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NlcnZlci9odG1sZXNjYXBlLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zZXJ2ZXIvdXRpbHMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvY29uc3RhbnRzLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL2RvY3VtZW50LWNvbnRleHQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvdXRpbHMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWpzeC9zZXJ2ZXJcIik7Il0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdCIsImluaXRIZWFkTWFuYWdlciIsIkRPTUF0dHJpYnV0ZU5hbWVzIiwiYWNjZXB0Q2hhcnNldCIsImNsYXNzTmFtZSIsImh0bWxGb3IiLCJodHRwRXF1aXYiLCJub01vZHVsZSIsInJlYWN0RWxlbWVudFRvRE9NIiwidHlwZSIsInByb3BzIiwiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJhdHRyIiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJjaGlsZHJlbiIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiaW5uZXJIVE1MIiwiX19odG1sIiwidGV4dENvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJqb2luIiwidXBkYXRlRWxlbWVudHMiLCJjb21wb25lbnRzIiwiaGVhZEVsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJoZWFkQ291bnRFbCIsInF1ZXJ5U2VsZWN0b3IiLCJjb25zb2xlIiwiZXJyb3IiLCJoZWFkQ291bnQiLCJOdW1iZXIiLCJjb250ZW50Iiwib2xkVGFncyIsImkiLCJqIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInRhZ05hbWUiLCJwdXNoIiwibmV3VGFncyIsIm1hcCIsImZpbHRlciIsIm5ld1RhZyIsImsiLCJsZW4iLCJsZW5ndGgiLCJvbGRUYWciLCJpc0VxdWFsTm9kZSIsInNwbGljZSIsImZvckVhY2giLCJ0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW5zZXJ0QmVmb3JlIiwidG9TdHJpbmciLCJ1cGRhdGVQcm9taXNlIiwibW91bnRlZEluc3RhbmNlcyIsIlNldCIsInVwZGF0ZUhlYWQiLCJoZWFkIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsInRhZ3MiLCJoIiwiaHJlZiIsInRpdGxlQ29tcG9uZW50IiwidGl0bGUiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwiY2FuY2VsSWRsZUNhbGxiYWNrIiwic2VsZiIsImJpbmQiLCJ3aW5kb3ciLCJjYiIsInN0YXJ0IiwiRGF0ZSIsIm5vdyIsInNldFRpbWVvdXQiLCJkaWRUaW1lb3V0IiwidGltZVJlbWFpbmluZyIsIk1hdGgiLCJtYXgiLCJpZCIsImNsZWFyVGltZW91dCIsImluaXRTY3JpcHRMb2FkZXIiLCJfcmVhY3QiLCJyZXF1aXJlIiwiX2hlYWRNYW5hZ2VyQ29udGV4dCIsIl9oZWFkTWFuYWdlciIsIl9yZXF1ZXN0SWRsZUNhbGxiYWNrIiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImFyZ3VtZW50cyIsInNvdXJjZSIsIm93bktleXMiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiY29uY2F0Iiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiZXhjbHVkZWQiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsInNvdXJjZVN5bWJvbEtleXMiLCJpbmRleE9mIiwicHJvdG90eXBlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJjYWxsIiwic291cmNlS2V5cyIsIlNjcmlwdENhY2hlIiwiTWFwIiwiTG9hZENhY2hlIiwiaWdub3JlUHJvcHMiLCJsb2FkU2NyaXB0Iiwic3JjIiwib25Mb2FkIiwib25FcnJvciIsImNhY2hlS2V5IiwiaGFzIiwiYWRkIiwiZ2V0IiwibG9hZFByb21pc2UiLCJyZWplY3QiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNhdGNoIiwic2V0IiwiZW50cmllcyIsImluY2x1ZGVzIiwiYm9keSIsImFwcGVuZENoaWxkIiwiaGFuZGxlQ2xpZW50U2NyaXB0TG9hZCIsInN0cmF0ZWd5IiwibG9hZExhenlTY3JpcHQiLCJyZWFkeVN0YXRlIiwic2NyaXB0TG9hZGVySXRlbXMiLCJTY3JpcHQiLCJyZXN0UHJvcHMiLCJ1cGRhdGVTY3JpcHRzIiwic2NyaXB0cyIsInVzZUNvbnRleHQiLCJIZWFkTWFuYWdlckNvbnRleHQiLCJ1c2VFZmZlY3QiLCJiZWZvcmVJbnRlcmFjdGl2ZSIsIl9kZWZhdWx0IiwiX3V0aWxzIiwiRG9jdW1lbnRDb250ZXh0IiwiRG9jdW1lbnRJbml0aWFsUHJvcHMiLCJEb2N1bWVudFByb3BzIiwiSHRtbCIsIk1haW4iLCJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsIl9zZXJ2ZXIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX2NvbnN0YW50cyIsIl9kb2N1bWVudENvbnRleHQiLCJfZ2V0UGFnZUZpbGVzIiwiX3V0aWxzMSIsIl9odG1sZXNjYXBlIiwiX3NjcmlwdCIsIl9fZXNNb2R1bGUiLCJuZXdPYmoiLCJkZXNjIiwiZ2V0RG9jdW1lbnRGaWxlcyIsImJ1aWxkTWFuaWZlc3QiLCJwYXRobmFtZSIsImluQW1wTW9kZSIsInNoYXJlZEZpbGVzIiwiZ2V0UGFnZUZpbGVzIiwicGFnZUZpbGVzIiwiYWxsRmlsZXMiLCJnZXRQb2x5ZmlsbFNjcmlwdHMiLCJjb250ZXh0IiwiYXNzZXRQcmVmaXgiLCJkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyIsImRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nIiwicG9seWZpbGxGaWxlcyIsInBvbHlmaWxsIiwiZW5kc1dpdGgiLCJkZWZlciIsIm5vbmNlIiwiY3Jvc3NPcmlnaW4iLCJwcm9jZXNzIiwiZW52IiwiX19ORVhUX0NST1NTX09SSUdJTiIsImdldFByZU5leHRTY3JpcHRzIiwic2NyaXB0TG9hZGVyIiwiZmlsZSIsImluZGV4Iiwic2NyaXB0UHJvcHMiLCJhc3NpZ24iLCJnZXREeW5hbWljQ2h1bmtzIiwiZmlsZXMiLCJkeW5hbWljSW1wb3J0cyIsImlzRGV2ZWxvcG1lbnQiLCJhc3luYyIsImVuY29kZVVSSSIsImdldFNjcmlwdHMiLCJyZWYiLCJub3JtYWxTY3JpcHRzIiwibG93UHJpb3JpdHlTY3JpcHRzIiwibG93UHJpb3JpdHlGaWxlcyIsIkRvY3VtZW50MSIsIkNvbXBvbmVudCIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsImVuaGFuY2VBcHAiLCJBcHAiLCJodG1sIiwicmVuZGVyUGFnZSIsInN0eWxlcyIsInJlbmRlckRvY3VtZW50IiwiRG9jdW1lbnRDb21wb25lbnQiLCJQcm92aWRlciIsInJlbmRlciIsIkhlYWQiLCJOZXh0U2NyaXB0IiwiZG9jQ29tcG9uZW50c1JlbmRlcmVkIiwibG9jYWxlIiwibGFuZyIsImFtcCIsImdldENzc0xpbmtzIiwiY3NzRmlsZXMiLCJmIiwidW5tYW5nZWRGaWxlcyIsImR5bmFtaWNDc3NGaWxlcyIsImZyb20iLCJleGlzdGluZyIsImNzc0xpbmtFbGVtZW50cyIsImlzU2hhcmVkRmlsZSIsIl9fTkVYVF9PUFRJTUlaRV9DU1MiLCJyZWwiLCJhcyIsImlzVW5tYW5hZ2VkRmlsZSIsIl9fTkVYVF9PUFRJTUlaRV9GT05UUyIsIm1ha2VTdHlsZXNoZWV0SW5lcnQiLCJnZXRQcmVsb2FkRHluYW1pY0NodW5rcyIsIkJvb2xlYW4iLCJnZXRQcmVsb2FkTWFpbkxpbmtzIiwicHJlbG9hZEZpbGVzIiwiaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyIsImZpbHRlcmVkQ2hpbGRyZW4iLCJDaGlsZHJlbiIsImNoaWxkIiwiX19ORVhUX0RBVEFfXyIsIm5vZGUiLCJjIiwiT1BUSU1JWkVEX0ZPTlRfUFJPVklERVJTIiwic29tZSIsInVybCIsInN0YXJ0c1dpdGgiLCJuZXdQcm9wcyIsImNsb25lRWxlbWVudCIsImFtcFBhdGgiLCJoeWJyaWRBbXAiLCJjYW5vbmljYWxCYXNlIiwiZGFuZ2Vyb3VzQXNQYXRoIiwiaGVhZFRhZ3MiLCJ1bnN0YWJsZV9ydW50aW1lSlMiLCJ1bnN0YWJsZV9Kc1ByZWxvYWQiLCJkaXNhYmxlUnVudGltZUpTIiwiZGlzYWJsZUpzUHJlbG9hZCIsImNzc1ByZWxvYWRzIiwib3RoZXJIZWFkRWxlbWVudHMiLCJ0b0FycmF5IiwiaXNSZWFjdEhlbG1ldCIsInJlZjEiLCJ3YXJuIiwibmFtZSIsImhhc0FtcGh0bWxSZWwiLCJoYXNDYW5vbmljYWxSZWwiLCJiYWRQcm9wIiwicHJvcCIsInBhZ2UiLCJjdXJTdHlsZXMiLCJoYXNTdHlsZXMiLCJyZWYyIiwicmVmMyIsIl9ub25jZSIsIl9ub25jZTEiLCJGcmFnbWVudCIsImNvdW50IiwiY2xlYW5BbXBQYXRoIiwic3R5bGUiLCJyZXBsYWNlIiwiZ2V0QW1wUGF0aCIsIl9fTkVYVF9PUFRJTUlaRV9JTUFHRVMiLCJjb250ZXh0VHlwZSIsIkFNUF9SRU5ERVJfVEFSR0VUIiwiZ2V0SW5saW5lU2NyaXB0U291cmNlIiwiZG9jdW1lbnRQcm9wcyIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiaHRtbEVzY2FwZUpzb25TdHJpbmciLCJlcnIiLCJtZXNzYWdlIiwiRXJyb3IiLCJhbXBEZXZGaWxlcyIsImRldkZpbGVzIiwic2FmYXJpTm9tb2R1bGVGaXgiLCJhc1BhdGgiXSwic291cmNlUm9vdCI6IiJ9