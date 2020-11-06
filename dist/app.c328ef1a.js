// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/multipleFiles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = 'Justin';
exports.default = _default;
},{}],"../node_modules/lit-html/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */

exports.isCEPolyfill = isCEPolyfill;

const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */


exports.reparentNodes = reparentNodes;

const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

exports.removeNodes = removeNodes;
},{}],"../node_modules/lit-html/lib/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

exports.markerRegex = markerRegex;
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */

exports.boundAttributeSuffix = boundAttributeSuffix;

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(element.content, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false); // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.

    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: {
        length
      }
    } = result;

    while (partIndex < length) {
      const node = walker.nextNode();

      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }

      index++;

      if (node.nodeType === 1
      /* Node.ELEMENT_NODE */
      ) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const {
              length
            } = attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.

            let count = 0;

            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex]; // Find the attribute name

              const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: 'attribute',
                index,
                name,
                strings: statics
              });
              partIndex += statics.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          const data = node.data;

          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];

              if (s === '') {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);

                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }

                insert = document.createTextNode(s);
              }

              parent.insertBefore(insert, node);
              this.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
      /* Node.COMMENT_NODE */
      ) {
          if (node.data === marker) {
            const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;
            this.parts.push({
              type: 'node',
              index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.

            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            let i = -1;

            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({
                type: 'node',
                index: -1
              });
              partIndex++;
            }
          }
        }
    } // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

exports.Template = Template;

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.


exports.isTemplatePartActive = isTemplatePartActive;

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */


exports.createMarker = createMarker;
const lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;
},{}],"../node_modules/lit-html/lib/modify-template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodesFromTemplate = removeNodesFromTemplate;
exports.insertNodeIntoTemplate = insertNodeIntoTemplate;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if ((0, _template.isTemplatePartActive)(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}
},{"./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = exports.directive = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};

exports.directive = directive;

const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

exports.isDirective = isDirective;
},{}],"../node_modules/lit-html/lib/part.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nothing = exports.noChange = void 0;

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

exports.noChange = noChange;
const nothing = {};
exports.nothing = nothing;
},{}],"../node_modules/lit-html/lib/template-instance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstance = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari does not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(fragment, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode(); // Loop through all the nodes and parts of a template

    while (partIndex < parts.length) {
      part = parts[partIndex];

      if (!(0, _template.isTemplatePartActive)(part)) {
        this.__parts.push(undefined);

        partIndex++;
        continue;
      } // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.


      while (nodeIndex < part.index) {
        nodeIndex++;

        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }

        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      } // We've arrived at our part's node.


      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);

        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }

      partIndex++;
    }

    if (_dom.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

exports.TemplateInstance = TemplateInstance;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/template-result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGTemplateResult = exports.TemplateResult = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
  createHTML: s => s
});
const commentMarker = ` ${_template.marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment position.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.

      const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.

      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.

      const attributeMatch = _template.lastAttributeNameRegex.exec(s);

      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? commentMarker : _template.nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + _template.boundAttributeSuffix + attributeMatch[3] + _template.marker;
      }
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    let value = this.getHTML();

    if (policy !== undefined) {
      // this is secure because `this.strings` is a TemplateStringsArray.
      // TODO: validate this when
      // https://github.com/tc39/proposal-array-is-template-object is
      // implemented.
      value = policy.createHTML(value);
    }

    template.innerHTML = value;
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


exports.TemplateResult = TemplateResult;

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    (0, _dom.reparentNodes)(content, svgElement.firstChild);
    return template;
  }

}

exports.SVGTemplateResult = SVGTemplateResult;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/parts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

var _directive = require("./directive.js");

var _dom = require("./dom.js");

var _part = require("./part.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};

exports.isPrimitive = isPrimitive;

const isIterable = value => {
  return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */


exports.isIterable = isIterable;

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts; // If we're assigning an attribute via syntax like:
    //    attr="${foo}"  or  attr=${foo}
    // but not
    //    attr="${foo} ${bar}" or attr="${foo} baz"
    // then we don't want to coerce the attribute value into one long
    // string. Instead we want to just return the value itself directly,
    // so that sanitizeDOMValue can get the actual value rather than
    // String(value)
    // The exception is if v is an array, in which case we do want to smash
    // it together into a string without calling String() on the array.
    //
    // This also allows trusted values (when using TrustedTypes) being
    // assigned to DOM sinks without being stringified in the process.

    if (l === 1 && strings[0] === '' && strings[1] === '') {
      const v = parts[0].value;

      if (typeof v === 'symbol') {
        return String(v);
      }

      if (typeof v === 'string' || !isIterable(v)) {
        return v;
      }
    }

    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
/**
 * A Part that controls all or part of an attribute value.
 */


exports.AttributeCommitter = AttributeCommitter;

class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }

  setValue(value) {
    if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!(0, _directive.isDirective)(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while ((0, _directive.isDirective)(this.value)) {
      const directive = this.value;
      this.value = _part.noChange;
      directive(this);
    }

    if (this.value === _part.noChange) {
      return;
    }

    this.committer.commit();
  }

}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */


exports.AttributePart = AttributePart;

class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild((0, _template.createMarker)());
    this.endNode = container.appendChild((0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part.__insert(this.startNode = (0, _template.createMarker)());

    part.__insert(this.endNode = (0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref.__insert(this.startNode = (0, _template.createMarker)());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }

    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    const value = this.__pendingValue;

    if (value === _part.noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof _templateResult.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === _part.nothing) {
      this.value = _part.nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }

  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  __commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this.__insert(value);

    this.value = value;
  }

  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
    // it can't be implicitly converted - i.e. it's a symbol.

    const valueAsString = typeof value === 'string' ? value : String(value);

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = valueAsString;
      } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }

    this.value = value;
  }

  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof _templateInstance.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this.__commitNode(fragment);

      this.value = instance;
    }
  }

  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


exports.NodePart = NodePart;

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const value = !!this.__pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }

      this.value = value;
    }

    this.__pendingValue = _part.noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


exports.BooleanAttributePart = BooleanAttributePart;

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

      this.element[this.name] = this._getValue();
    }
  }

}

exports.PropertyCommitter = PropertyCommitter;

class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module

(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.removeEventListener('test', options, options);
  } catch (_e) {// event options not supported
  }
})();

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this.__boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    this.value = newListener;
    this.__pendingValue = _part.noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


exports.EventPart = EventPart;

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);
},{"./directive.js":"../node_modules/lit-html/lib/directive.js","./dom.js":"../node_modules/lit-html/lib/dom.js","./part.js":"../node_modules/lit-html/lib/part.js","./template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./template-result.js":"../node_modules/lit-html/lib/template-result.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/template-factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFactory = templateFactory;
exports.templateCaches = void 0;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(_template.marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new _template.Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}

const templateCaches = new Map();
exports.templateCaches = templateCaches;
},{"./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = void 0;

var _dom = require("./dom.js");

var _parts = require("./parts.js");

var _templateFactory = require("./template-factory.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

exports.parts = parts;

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({
      templateFactory: _templateFactory.templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

exports.render = render;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./parts.js":"../node_modules/lit-html/lib/parts.js","./template-factory.js":"../node_modules/lit-html/lib/template-factory.js"}],"../node_modules/lit-html/lib/default-template-processor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

var _parts = require("./parts.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const committer = new _parts.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }

    if (prefix === '@') {
      return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
    }

    const committer = new _parts.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new _parts.NodePart(options);
  }

}

exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;
},{"./parts.js":"../node_modules/lit-html/lib/parts.js"}],"../node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "defaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.TemplateResult;
  }
});
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function () {
    return _directive.isDirective;
  }
});
Object.defineProperty(exports, "removeNodes", {
  enumerable: true,
  get: function () {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, "reparentNodes", {
  enumerable: true,
  get: function () {
    return _dom.reparentNodes;
  }
});
Object.defineProperty(exports, "noChange", {
  enumerable: true,
  get: function () {
    return _part.noChange;
  }
});
Object.defineProperty(exports, "nothing", {
  enumerable: true,
  get: function () {
    return _part.nothing;
  }
});
Object.defineProperty(exports, "AttributeCommitter", {
  enumerable: true,
  get: function () {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, "AttributePart", {
  enumerable: true,
  get: function () {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, "BooleanAttributePart", {
  enumerable: true,
  get: function () {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, "EventPart", {
  enumerable: true,
  get: function () {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, "isIterable", {
  enumerable: true,
  get: function () {
    return _parts.isIterable;
  }
});
Object.defineProperty(exports, "isPrimitive", {
  enumerable: true,
  get: function () {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, "NodePart", {
  enumerable: true,
  get: function () {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, "PropertyCommitter", {
  enumerable: true,
  get: function () {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, "PropertyPart", {
  enumerable: true,
  get: function () {
    return _parts.PropertyPart;
  }
});
Object.defineProperty(exports, "parts", {
  enumerable: true,
  get: function () {
    return _render.parts;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "templateCaches", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, "templateFactory", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateFactory;
  }
});
Object.defineProperty(exports, "TemplateInstance", {
  enumerable: true,
  get: function () {
    return _templateInstance.TemplateInstance;
  }
});
Object.defineProperty(exports, "createMarker", {
  enumerable: true,
  get: function () {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, "isTemplatePartActive", {
  enumerable: true,
  get: function () {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});
exports.svg = exports.html = void 0;

var _defaultTemplateProcessor = require("./lib/default-template-processor.js");

var _templateResult = require("./lib/template-result.js");

var _directive = require("./lib/directive.js");

var _dom = require("./lib/dom.js");

var _part = require("./lib/part.js");

var _parts = require("./lib/parts.js");

var _render = require("./lib/render.js");

var _templateFactory = require("./lib/template-factory.js");

var _templateInstance = require("./lib/template-instance.js");

var _template = require("./lib/template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @packageDocumentation
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// TODO(justinfagnani): remove line when we get NodePart moving methods
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */


const html = (strings, ...values) => new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */


exports.html = html;

const svg = (strings, ...values) => new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);

exports.svg = svg;
},{"./lib/default-template-processor.js":"../node_modules/lit-html/lib/default-template-processor.js","./lib/template-result.js":"../node_modules/lit-html/lib/template-result.js","./lib/directive.js":"../node_modules/lit-html/lib/directive.js","./lib/dom.js":"../node_modules/lit-html/lib/dom.js","./lib/part.js":"../node_modules/lit-html/lib/part.js","./lib/parts.js":"../node_modules/lit-html/lib/parts.js","./lib/render.js":"../node_modules/lit-html/lib/render.js","./lib/template-factory.js":"../node_modules/lit-html/lib/template-factory.js","./lib/template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./lib/template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/shady-render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.TemplateResult;
  }
});
exports.render = exports.shadyTemplateFactory = void 0;

var _dom = require("./dom.js");

var _modifyTemplate = require("./modify-template.js");

var _render = require("./render.js");

var _templateFactory = require("./template-factory.js");

var _templateInstance = require("./template-instance.js");

var _template = require("./template.js");

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @packageDocumentation
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected. ` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);

  let templateCache = _templateFactory.templateCaches.get(cacheKey);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };

    _templateFactory.templateCaches.set(cacheKey, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  }

  const key = result.strings.join(_template.marker);
  template = templateCache.keyString.get(key);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new _template.Template(result, element);
    templateCache.keyString.set(key, template);
  }

  templateCache.stringsArray.set(result.strings, template);
  return template;
};

exports.shadyTemplateFactory = shadyTemplateFactory;
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = _templateFactory.templateCaches.get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.keyString.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        (0, _modifyTemplate.removeNodesFromTemplate)(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName); // If `renderedDOM` is stamped from a Template, then we need to edit that
  // Template's underlying template element. Otherwise, we create one here
  // to give to ShadyCSS, which still requires one while scoping.

  const templateElement = !!template ? template.element : document.createElement('template'); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style');
  const {
    length
  } = styles; // If there are no styles, skip unnecessary work

  if (length === 0) {
    // Ensure prepareTemplateStyles is called to support adding
    // styles via `prepareAdoptedCssText` since that requires that
    // `prepareTemplateStyles` is called.
    //
    // ShadyCSS will only update styles containing @apply in the template
    // given to `prepareTemplateStyles`. If no lit Template was given,
    // ShadyCSS will not be able to update uses of @apply in any relevant
    // template. However, this is not a problem because we only create the
    // template for the purpose of supporting `prepareAdoptedCssText`,
    // which doesn't support @apply at all.
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  const content = templateElement.content;

  if (!!template) {
    (0, _modifyTemplate.insertNodeIntoTemplate)(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  } // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).


  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style = content.querySelector('style');

  if (window.ShadyCSS.nativeShadow && style !== null) {
    // When in native Shadow DOM, ensure the style created by ShadyCSS is
    // included in initially rendered output (`renderedDOM`).
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    // When no style is left in the template, parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // There can be no style in the template in 2 cases (1) when Shady DOM
    // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
    // is in use ShadyCSS removes the style if it contains no content.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    (0, _modifyTemplate.removeNodesFromTemplate)(template, removes);
  }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */


const render = (result, container, options) => {
  if (!options || typeof options !== 'object' || !options.scopeName) {
    throw new Error('The `scopeName` option is required.');
  }

  const scopeName = options.scopeName;

  const hasRendered = _render.parts.has(container);

  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  && !!container.host; // Handle first render to a scope specially...

  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
  // fragment that is reused since nested renders can occur synchronously.

  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  (0, _render.render)(result, renderContainer, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When performing first scope render,
  // (1) We've rendered into a fragment so that there's a chance to
  // `prepareTemplateStyles` before sub-elements hit the DOM
  // (which might cause them to render based on a common pattern of
  // rendering in a custom element's `connectedCallback`);
  // (2) Scope the template with ShadyCSS one time only for this scope.
  // (3) Render the fragment into the container and make sure the
  // container knows its `part` is the one we just rendered. This ensures
  // DOM will be re-used on subsequent renders.

  if (firstScopeRender) {
    const part = _render.parts.get(renderContainer);

    _render.parts.delete(renderContainer); // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
    // that should apply to `renderContainer` even if the rendered value is
    // not a TemplateInstance. However, it will only insert scoped styles
    // into the document if `prepareTemplateStyles` has already been called
    // for the given scope name.


    const template = part.value instanceof _templateInstance.TemplateInstance ? part.value.template : undefined;
    prepareTemplateStyles(scopeName, renderContainer, template);
    (0, _dom.removeNodes)(container, container.firstChild);
    container.appendChild(renderContainer);

    _render.parts.set(container, part);
  } // After elements have hit the DOM, update styling if this is the
  // initial render to this container.
  // This is needed whenever dynamic changes are made so it would be
  // safest to do every render; however, this would regress performance
  // so we leave it up to the user to call `ShadyCSS.styleElement`
  // for dynamic changes.


  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

exports.render = render;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./modify-template.js":"../node_modules/lit-html/lib/modify-template.js","./render.js":"../node_modules/lit-html/lib/render.js","./template-factory.js":"../node_modules/lit-html/lib/template-factory.js","./template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./template.js":"../node_modules/lit-html/lib/template.js","../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit-element/lib/updating-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */

/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */


window.JSCompiler_renameProperty = (prop, _obj) => prop;

const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? '' : null;

      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        return value == null ? value : JSON.stringify(value);
    }

    return value;
  },

  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;

      case Number:
        return value === null ? null : Number(value);

      case Object:
      case Array:
        return JSON.parse(value);
    }

    return value;
  }

};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */

exports.defaultConverter = defaultConverter;

const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};

exports.notEqual = notEqual;
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */

const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're finalized.
    this.finalize();
    const attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays

    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    });

    return attributes;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */

  /** @nocollapse */


  static _ensureClassProperties() {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a PropertyDeclaration for the property with the given options.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   *
   * @nocollapse
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // Note, since this can be called by the `@property` decorator which
    // is called before `finalize`, we ensure storage exists for property
    // metadata.
    this._ensureClassProperties();

    this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
    // it would be lost otherwise and that would never be the user's intention;
    // Instead, we expect users to call `requestUpdate` themselves from
    // user-defined accessors. Note that if the super has an accessor we will
    // still overwrite it


    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }

    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);

    if (descriptor !== undefined) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   *   class MyElement extends LitElement {
   *     static getPropertyDescriptor(name, key, options) {
   *       const defaultDescriptor =
   *           super.getPropertyDescriptor(name, key, options);
   *       const setter = defaultDescriptor.set;
   *       return {
   *         get: defaultDescriptor.get,
   *         set(value) {
   *           setter.call(this, value);
   *           // custom action.
   *         },
   *         configurable: true,
   *         enumerable: true
   *       }
   *     }
   *   }
   *
   * @nocollapse
   */


  static getPropertyDescriptor(name, key, options) {
    return {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[key];
      },

      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },

      configurable: true,
      enumerable: true
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a PropertyDeclaration via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override `createProperty`.
   *
   * @nocollapse
   * @final
   */


  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */


  static finalize() {
    // finalize any superclasses
    const superCtor = Object.getPrototypeOf(this);

    if (!superCtor.hasOwnProperty(finalized)) {
      superCtor.finalize();
    }

    this[finalized] = true;

    this._ensureClassProperties(); // initialize Map populated in observedAttributes


    this._attributeToPropertyMap = new Map(); // make any properties
    // Note, only process "own" properties since this element will inherit
    // any properties defined on the superClass, and finalization ensures
    // the entire prototype chain is finalized.

    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])]; // This for/of is ok because propKeys is an array

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        // tslint:disable-next-line:no-any no symbol in index
        this.createProperty(p, props[p]);
      }
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */


  static _propertyValueToAttribute(value, options) {
    if (options.reflect === undefined) {
      return;
    }

    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise(res => this._enableUpdatingResolver = res);
    this._changedProperties = new Map();

    this._saveInstanceProperties(); // ensures first update will be caught by an early access of
    // `updateComplete`


    this.requestUpdateInternal();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    });
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    // tslint:disable-next-line:no-any
    this._instanceProperties.forEach((v, p) => this[p] = v);

    this._instanceProperties = undefined;
  }

  connectedCallback() {
    // Ensure first connection completes an update. Updates cannot complete
    // before connection.
    this.enableUpdating();
  }

  enableUpdating() {
    if (this._enableUpdatingResolver !== undefined) {
      this._enableUpdatingResolver();

      this._enableUpdatingResolver = undefined;
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attr = ctor._attributeNameForProperty(name, options);

    if (attr !== undefined) {
      const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


      if (attrValue === undefined) {
        return;
      } // Track if the property is being reflected to avoid
      // setting the property again via `attributeChangedCallback`. Note:
      // 1. this takes advantage of the fact that the callback is synchronous.
      // 2. will behave incorrectly if multiple attributes are in the reaction
      // stack at time of calling. However, since we process attributes
      // in `update` this should not be possible (or an extreme corner case
      // that we'd like to discover).
      // mark state reflecting


      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      } // mark state not reflecting


      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }

    const ctor = this.constructor; // Note, hint this as an `AttributeMap` so closure clearly understands
    // the type; it has issues with tracking types through statics
    // tslint:disable-next-line:no-unnecessary-type-assertion

    const propName = ctor._attributeToPropertyMap.get(name);

    if (propName !== undefined) {
      const options = ctor.getPropertyOptions(propName); // mark state reflecting

      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = // tslint:disable-next-line:no-any
      ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  /**
   * This protected version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */


  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true; // If we have a property key, perform property update steps.

    if (name !== undefined) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);

      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        } // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `_reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.


        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === undefined) {
            this._reflectingProperties = new Map();
          }

          this._reflectingProperties.set(name, options);
        }
      } else {
        // Abort the request if the property should not be considered changed.
        shouldRequestUpdate = false;
      }
    }

    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */


  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;

    try {
      // Ensure any previous update has resolved before updating.
      // This `await` also ensures that property changes are batched.
      await this._updatePromise;
    } catch (e) {// Ignore any previous errors. We only care that the previous cycle is
      // done. Any error should have been handled in the previous update.
    }

    const result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
    // enable coordinating updates with a scheduler. Note, the result is
    // checked to avoid delaying an additional microtask unless we need to.

    if (result != null) {
      await result;
    }

    return !this._hasRequestedUpdate;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }

  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */


  performUpdate() {
    // Abort any update if one is not pending when this is called.
    // This can happen if `performUpdate` is called early to "flush"
    // the update.
    if (!this._hasRequestedUpdate) {
      return;
    } // Mixin instance properties once, if they exist.


    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    let shouldUpdate = false;
    const changedProperties = this._changedProperties;

    try {
      shouldUpdate = this.shouldUpdate(changedProperties);

      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e) {
      // Prevent `firstUpdated` and `updated` from running when there's an
      // update exception.
      shouldUpdate = false; // Ensure element can accept additional updates after an exception.

      this._markUpdated();

      throw e;
    }

    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `_getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super._getUpdateComplete()`, then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   *   class MyElement extends LitElement {
   *     async _getUpdateComplete() {
   *       await super._getUpdateComplete();
   *       await this._myChild.updateComplete;
   *     }
   *   }
   */


  _getUpdateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      // Use forEach so this works even if for/of loops are compiled to for
      // loops expecting arrays
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));

      this._reflectingProperties = undefined;
    }

    this._markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}

exports.UpdatingElement = UpdatingElement;
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */

UpdatingElement[_a] = true;
},{}],"../node_modules/lit-element/lib/decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = property;
exports.internalProperty = internalProperty;
exports.query = query;
exports.queryAsync = queryAsync;
exports.queryAll = queryAll;
exports.eventOptions = eventOptions;
exports.queryAssignedNodes = queryAssignedNodes;
exports.customElement = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz); // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // tslint:disable-next-line:no-any

  return clazz;
};

const standardCustomElement = (tagName, descriptor) => {
  const {
    kind,
    elements
  } = descriptor;
  return {
    kind,
    elements,

    // This callback is called once the class is otherwise fully defined
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }

  };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */


const customElement = tagName => classOrDescriptor => typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);

exports.customElement = customElement;

const standardProperty = (options, element) => {
  // When decorating an accessor, pass it through and add property metadata.
  // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
  // stomp over the user's accessor.
  if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
    return Object.assign(Object.assign({}, element), {
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    });
  } else {
    // createProperty() takes care of defining the property, but we still
    // must return some kind of descriptor, so return a descriptor for an
    // unused prototype field. The finisher calls createProperty().
    return {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},

      // When @babel/plugin-proposal-decorators implements initializers,
      // do this instead of the initializer below. See:
      // https://github.com/babel/babel/issues/9260 extras: [
      //   {
      //     kind: 'initializer',
      //     placement: 'own',
      //     initializer: descriptor.initializer,
      //   }
      // ],
      initializer() {
        if (typeof element.initializer === 'function') {
          this[element.key] = element.initializer.call(this);
        }
      },

      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    };
  }
};

const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */


function property(options) {
  // tslint:disable-next-line:no-any decorator
  return (protoOrDescriptor, name) => name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
/**
 * Declares a private or protected property that still triggers updates to the
 * element when it changes.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like closure compiler.
 * @category Decorator
 */


function internalProperty(options) {
  return property({
    attribute: false,
    hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged
  });
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 * once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */


function query(selector, cache) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },

      enumerable: true,
      configurable: true
    };

    if (cache) {
      const key = typeof name === 'symbol' ? Symbol() : `__${name}`;

      descriptor.get = function () {
        if (this[key] === undefined) {
          this[key] = this.renderRoot.querySelector(selector);
        }

        return this[key];
      };
    }

    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
} // Note, in the future, we may extend this decorator to support the use case
// where the queried element may need to do work to become ready to interact
// with (e.g. load some implementation code). If so, we might elect to
// add a second argument defining a function that can be run to make the
// queried element loaded/updated/ready.

/**
 * A property decorator that converts a class property into a getter that
 * returns a promise that resolves to the result of a querySelector on the
 * element's renderRoot done after the element's `updateComplete` promise
 * resolves. When the queried property may change with element state, this
 * decorator can be used instead of requiring users to await the
 * `updateComplete` before accessing the property.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAsync('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 *
 * // external usage
 * async doSomethingWithFirst() {
 *  (await aMyElement.first).doSomething();
 * }
 * ```
 * @category Decorator
 */


function queryAsync(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      async get() {
        await this.updateComplete;
        return this.renderRoot.querySelector(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAll('div')
 *   divs;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */


function queryAll(selector) {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelectorAll(selector);
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}

const legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};

const standardQuery = (descriptor, element) => ({
  kind: 'method',
  placement: 'prototype',
  key: element.key,
  descriptor
});

const standardEventOptions = (options, element) => {
  return Object.assign(Object.assign({}, element), {
    finisher(clazz) {
      Object.assign(clazz.prototype[element.key], options);
    }

  });
};

const legacyEventOptions = // tslint:disable-next-line:no-any legacy decorator
(options, proto, name) => {
  Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}`>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */


function eventOptions(options) {
  // Return value typed as any to prevent TypeScript from complaining that
  // standard decorator function signature does not match TypeScript decorator
  // signature
  // TODO(kschaaf): unclear why it was only failing on this decorator and not
  // the others
  return (protoOrDescriptor, name) => name !== undefined ? legacyEventOptions(options, protoOrDescriptor, name) : standardEventOptions(options, protoOrDescriptor);
} // x-browser support for matches
// tslint:disable-next-line:no-any


const ElementProto = Element.prototype;
const legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;
/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedNodes` of the given named `slot`. Note, the type of
 * this property should be annotated as `NodeListOf<HTMLElement>`.
 *
 * @param slotName A string name of the slot.
 * @param flatten A boolean which when true flattens the assigned nodes,
 * meaning any assigned nodes that are slot elements are replaced with their
 * assigned nodes.
 * @param selector A string which filters the results to elements that match
 * the given css selector.
 *
 * * @example
 * ```ts
 * class MyElement {
 *   @queryAssignedNodes('list', true, '.item')
 *   listItems;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */

function queryAssignedNodes(slotName = '', flatten = false, selector = '') {
  return (protoOrDescriptor, // tslint:disable-next-line:no-any decorator
  name) => {
    const descriptor = {
      get() {
        const slotSelector = `slot${slotName ? `[name=${slotName}]` : ':not([name])'}`;
        const slot = this.renderRoot.querySelector(slotSelector);
        let nodes = slot && slot.assignedNodes({
          flatten
        });

        if (nodes && selector) {
          nodes = nodes.filter(node => node.nodeType === Node.ELEMENT_NODE && node.matches ? node.matches(selector) : legacyMatches.call(node, selector));
        }

        return nodes;
      },

      enumerable: true,
      configurable: true
    };
    return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
},{}],"../node_modules/lit-element/lib/css-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.unsafeCSS = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
exports.supportsAdoptingStyleSheets = supportsAdoptingStyleSheets;
const constructionToken = Symbol();

class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }

    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  get styleSheet() {
    if (this._styleSheet === undefined) {
      // Note, if `supportsAdoptingStyleSheets` is true then we assume
      // CSSStyleSheet is constructable.
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();

        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }

    return this._styleSheet;
  }

  toString() {
    return this.cssText;
  }

}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */


exports.CSSResult = CSSResult;

const unsafeCSS = value => {
  return new CSSResult(String(value), constructionToken);
};

exports.unsafeCSS = unsafeCSS;

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === 'number') {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */


const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};

exports.css = css;
},{}],"../node_modules/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  html: true,
  svg: true,
  TemplateResult: true,
  SVGTemplateResult: true
};
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.TemplateResult;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _litHtml.SVGTemplateResult;
  }
});
exports.LitElement = void 0;

var _shadyRender = require("lit-html/lib/shady-render.js");

var _updatingElement = require("./lib/updating-element.js");

Object.keys(_updatingElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _updatingElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _updatingElement[key];
    }
  });
});

var _decorators = require("./lib/decorators.js");

Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _decorators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorators[key];
    }
  });
});

var _litHtml = require("lit-html/lit-html.js");

var _cssTag = require("./lib/css-tag.js");

Object.keys(_cssTag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cssTag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cssTag[key];
    }
  });
});

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The main LitElement module, which defines the [[`LitElement`]] base class and
 * related APIs.
 *
 *  LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 *  Import [[`LitElement`]] and [[`html`]] from this module to create a
 * component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends [[`UpdatingElement`]] and adds lit-html templating.
 * The `UpdatingElement` class is provided for users that want to build
 * their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.4.0');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */

const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */

class LitElement extends _updatingElement.UpdatingElement {
  /**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */
  static getStyles() {
    return this.styles;
  }
  /** @nocollapse */


  static _getUniqueStyles() {
    // Only gather styles once per class
    if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
      return;
    } // Take care not to call `this.getStyles()` multiple times since this
    // generates new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any
    // shared styles will generate new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable
    // stylesheets.


    const userStyles = this.getStyles();

    if (Array.isArray(userStyles)) {
      // De-duplicate styles preserving the _last_ instance in the set.
      // This is a performance optimization to avoid duplicated styles that can
      // occur especially when composing via subclassing.
      // The last item is kept to try to preserve the cascade order with the
      // assumption that it's most important that last added styles override
      // previous styles.
      const addStyles = (styles, set) => styles.reduceRight((set, s) => // Note: On IE set.add() does not return the set
      Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set); // Array.from does not work on Set in IE, otherwise return
      // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()


      const set = addStyles(userStyles, new Set());
      const styles = [];
      set.forEach(v => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === undefined ? [] : [userStyles];
    } // Ensure that there are no invalid CSSStyleSheet instances here. They are
    // invalid in two conditions.
    // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
    //     this is impossible to check except via .replaceSync or use
    // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
    //     false)


    this._styles = this._styles.map(s => {
      if (s instanceof CSSStyleSheet && !_cssTag.supportsAdoptingStyleSheets) {
        // Flatten the cssText from the passed constructible stylesheet (or
        // undetectable non-constructible stylesheet). The user might have
        // expected to update their stylesheets over time, but the alternative
        // is a crash.
        const cssText = Array.prototype.slice.call(s.cssRules).reduce((css, rule) => css + rule.cssText, '');
        return (0, _cssTag.unsafeCSS)(cssText);
      }

      return s;
    });
  }
  /**
   * Performs element initialization. By default this calls
   * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
   * captures any pre-set values for registered properties.
   */


  initialize() {
    super.initialize();

    this.constructor._getUniqueStyles();

    this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
    // element's getRootNode(). While this could be done, we're choosing not to
    // support this now since it would require different logic around de-duping.

    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow({
      mode: 'open'
    });
  }
  /**
   * Applies styling to the element shadowRoot using the [[`styles`]]
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */


  adoptStyles() {
    const styles = this.constructor._styles;

    if (styles.length === 0) {
      return;
    } // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering


    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
    } else if (_cssTag.supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
      // This must be done after rendering so the actual style insertion is done
      // in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  connectedCallback() {
    super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
    // connected after first update.

    if (this.hasUpdated && window.ShadyCSS !== undefined) {
      window.ShadyCSS.styleElement(this);
    }
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param _changedProperties Map of changed properties with old values
   */


  update(changedProperties) {
    // Setting properties in `render` should not trigger an update. Since
    // updates are allowed after super.update, it's important to call `render`
    // before that.
    const templateResult = this.render();
    super.update(changedProperties); // If render is not implemented by the component, don't call lit-html render

    if (templateResult !== renderNotImplemented) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    } // When native Shadow DOM is used but adoptedStyles are not supported,
    // insert styling after rendering to ensure adoptedStyles have highest
    // priority.


    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;

      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `NodePart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   */


  render() {
    return renderNotImplemented;
  }

}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */


exports.LitElement = LitElement;
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */

LitElement.render = _shadyRender.render;
},{"lit-html/lib/shady-render.js":"../node_modules/lit-html/lib/shady-render.js","./lib/updating-element.js":"../node_modules/lit-element/lib/updating-element.js","./lib/decorators.js":"../node_modules/lit-element/lib/decorators.js","lit-html/lit-html.js":"../node_modules/lit-html/lit-html.js","./lib/css-tag.js":"../node_modules/lit-element/lib/css-tag.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lumo = void 0;

class Lumo extends HTMLElement {
  static get version() {
    return '1.6.1';
  }

}

exports.Lumo = Lumo;
customElements.define('vaadin-lumo-styles', Lumo);
},{}],"../node_modules/@webcomponents/shadycss/src/document-wait.js":[function(require,module,exports) {
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';
/** @type {Promise<void>} */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentWait;
let readyPromise = null;
/** @type {?function(?function())} */

let whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;
/** @type {function()} */

let resolveFn;
/**
 * @param {?function()} callback
 */

function documentWait(callback) {
  requestAnimationFrame(function () {
    if (whenReady) {
      whenReady(callback);
    } else {
      if (!readyPromise) {
        readyPromise = new Promise(resolve => {
          resolveFn = resolve;
        });

        if (document.readyState === 'complete') {
          resolveFn();
        } else {
          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
              resolveFn();
            }
          });
        }
      }

      readyPromise.then(function () {
        callback && callback();
      });
    }
  });
}
},{}],"../node_modules/@webcomponents/shadycss/src/custom-style-interface.js":[function(require,module,exports) {
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomStyleInterfaceInterface = exports.default = exports.CustomStyleProvider = void 0;

var _documentWait = _interopRequireDefault(require("./document-wait.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {HTMLStyleElement | {getStyle: function():HTMLStyleElement}}
 */
let CustomStyleProvider;
exports.CustomStyleProvider = CustomStyleProvider;
const SEEN_MARKER = '__seenByShadyCSS';
const CACHED_STYLE = '__shadyCSSCachedStyle';
/** @type {?function(!HTMLStyleElement)} */

let transformFn = null;
/** @type {?function()} */

let validateFn = null;
/**
This interface is provided to add document-level <style> elements to ShadyCSS for processing.
These styles must be processed by ShadyCSS to simulate ShadowRoot upper-bound encapsulation from outside styles
In addition, these styles may also need to be processed for @apply rules and CSS Custom Properties

To add document-level styles to ShadyCSS, one can call `ShadyCSS.addDocumentStyle(styleElement)` or `ShadyCSS.addDocumentStyle({getStyle: () => styleElement})`

In addition, if the process used to discover document-level styles can be synchronously flushed, one should set `ShadyCSS.documentStyleFlush`.
This function will be called when calculating styles.

An example usage of the document-level styling api can be found in `examples/document-style-lib.js`

@unrestricted
*/

class CustomStyleInterface {
  constructor() {
    /** @type {!Array<!CustomStyleProvider>} */
    this['customStyles'] = [];
    this['enqueued'] = false; // NOTE(dfreedm): use quotes here to prevent closure inlining to `function(){}`;

    (0, _documentWait.default)(() => {
      if (window['ShadyCSS']['flushCustomStyles']) {
        window['ShadyCSS']['flushCustomStyles']();
      }
    });
  }
  /**
   * Queue a validation for new custom styles to batch style recalculations
   */


  enqueueDocumentValidation() {
    if (this['enqueued'] || !validateFn) {
      return;
    }

    this['enqueued'] = true;
    (0, _documentWait.default)(validateFn);
  }
  /**
   * @param {!HTMLStyleElement} style
   */


  addCustomStyle(style) {
    if (!style[SEEN_MARKER]) {
      style[SEEN_MARKER] = true;
      this['customStyles'].push(style);
      this.enqueueDocumentValidation();
    }
  }
  /**
   * @param {!CustomStyleProvider} customStyle
   * @return {HTMLStyleElement}
   */


  getStyleForCustomStyle(customStyle) {
    if (customStyle[CACHED_STYLE]) {
      return customStyle[CACHED_STYLE];
    }

    let style;

    if (customStyle['getStyle']) {
      style = customStyle['getStyle']();
    } else {
      style = customStyle;
    }

    return style;
  }
  /**
   * @return {!Array<!CustomStyleProvider>}
   */


  processStyles() {
    const cs = this['customStyles'];

    for (let i = 0; i < cs.length; i++) {
      const customStyle = cs[i];

      if (customStyle[CACHED_STYLE]) {
        continue;
      }

      const style = this.getStyleForCustomStyle(customStyle);

      if (style) {
        // HTMLImports polyfill may have cloned the style into the main document,
        // which is referenced with __appliedElement.
        const styleToTransform =
        /** @type {!HTMLStyleElement} */
        style['__appliedElement'] || style;

        if (transformFn) {
          transformFn(styleToTransform);
        }

        customStyle[CACHED_STYLE] = styleToTransform;
      }
    }

    return cs;
  }

}
/* eslint-disable no-self-assign */


exports.default = CustomStyleInterface;
CustomStyleInterface.prototype['addCustomStyle'] = CustomStyleInterface.prototype.addCustomStyle;
CustomStyleInterface.prototype['getStyleForCustomStyle'] = CustomStyleInterface.prototype.getStyleForCustomStyle;
CustomStyleInterface.prototype['processStyles'] = CustomStyleInterface.prototype.processStyles;
/* eslint-enable no-self-assign */

Object.defineProperties(CustomStyleInterface.prototype, {
  'transformCallback': {
    /** @return {?function(!HTMLStyleElement)} */
    get() {
      return transformFn;
    },

    /** @param {?function(!HTMLStyleElement)} fn */
    set(fn) {
      transformFn = fn;
    }

  },
  'validateCallback': {
    /** @return {?function()} */
    get() {
      return validateFn;
    },

    /**
     * @param {?function()} fn
     * @this {CustomStyleInterface}
     */
    set(fn) {
      let needsEnqueue = false;

      if (!validateFn) {
        needsEnqueue = true;
      }

      validateFn = fn;

      if (needsEnqueue) {
        this.enqueueDocumentValidation();
      }
    }

  }
});
/** @typedef {{
 * customStyles: !Array<!CustomStyleProvider>,
 * addCustomStyle: function(!CustomStyleProvider),
 * getStyleForCustomStyle: function(!CustomStyleProvider): HTMLStyleElement,
 * findStyles: function(),
 * transformCallback: ?function(!HTMLStyleElement),
 * validateCallback: ?function()
 * }}
 */

const CustomStyleInterfaceInterface = {};
exports.CustomStyleInterfaceInterface = CustomStyleInterfaceInterface;
},{"./document-wait.js":"../node_modules/@webcomponents/shadycss/src/document-wait.js"}],"../node_modules/@webcomponents/shadycss/src/common-regex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HOST_SUFFIX = exports.HOST_PREFIX = exports.BRACKETED = exports.IS_VAR = exports.MEDIA_MATCH = exports.ANIMATION_MATCH = exports.VAR_CONSUMED = exports.MIXIN_MATCH = exports.VAR_ASSIGN = void 0;

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
exports.VAR_ASSIGN = VAR_ASSIGN;
const MIXIN_MATCH = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
exports.MIXIN_MATCH = MIXIN_MATCH;
const VAR_CONSUMED = /(--[\w-]+)\s*([:,;)]|$)/gi;
exports.VAR_CONSUMED = VAR_CONSUMED;
const ANIMATION_MATCH = /(animation\s*:)|(animation-name\s*:)/;
exports.ANIMATION_MATCH = ANIMATION_MATCH;
const MEDIA_MATCH = /@media\s(.*)/;
exports.MEDIA_MATCH = MEDIA_MATCH;
const IS_VAR = /^--/;
exports.IS_VAR = IS_VAR;
const BRACKETED = /\{[^}]*\}/g;
exports.BRACKETED = BRACKETED;
const HOST_PREFIX = '(?:^|[^.#[:])';
exports.HOST_PREFIX = HOST_PREFIX;
const HOST_SUFFIX = '($|[.:[\\s>+~])';
exports.HOST_SUFFIX = HOST_SUFFIX;
},{}],"../node_modules/@webcomponents/shadycss/src/common-utils.js":[function(require,module,exports) {
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNativeProperties = updateNativeProperties;
exports.getComputedStyleValue = getComputedStyleValue;
exports.detectMixin = detectMixin;

var _commonRegex = require("./common-regex.js");

/**
 * @param {Element} element
 * @param {Object=} properties
 */
function updateNativeProperties(element, properties) {
  // remove previous properties
  for (let p in properties) {
    // NOTE: for bc with shim, don't apply null values.
    if (p === null) {
      element.style.removeProperty(p);
    } else {
      element.style.setProperty(p, properties[p]);
    }
  }
}
/**
 * @param {Element} element
 * @param {string} property
 * @return {string}
 */


function getComputedStyleValue(element, property) {
  /**
   * @const {string}
   */
  const value = window.getComputedStyle(element).getPropertyValue(property);

  if (!value) {
    return '';
  } else {
    return value.trim();
  }
}
/**
 * return true if `cssText` contains a mixin definition or consumption
 * @param {string} cssText
 * @return {boolean}
 */


function detectMixin(cssText) {
  const has = _commonRegex.MIXIN_MATCH.test(cssText) || _commonRegex.VAR_ASSIGN.test(cssText); // reset state of the regexes


  _commonRegex.MIXIN_MATCH.lastIndex = 0;
  _commonRegex.VAR_ASSIGN.lastIndex = 0;
  return has;
}
},{"./common-regex.js":"../node_modules/@webcomponents/shadycss/src/common-regex.js"}],"../node_modules/@webcomponents/shadycss/src/style-settings.js":[function(require,module,exports) {
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nativeCssVariables = exports.disableRuntime = exports.cssBuild = exports.nativeShadow = void 0;
const nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
exports.nativeShadow = nativeShadow;
let nativeCssVariables_;
/**
 * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
 */

function calcCssVariables(settings) {
  if (settings && settings['shimcssproperties']) {
    nativeCssVariables_ = false;
  } else {
    // chrome 49 has semi-working css vars, check if box-shadow works
    // safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
    // However, shim css custom properties are only supported with ShadyDOM enabled,
    // so fall back on native if we do not detect ShadyDOM
    // Edge 15: custom properties used in ::before and ::after will also be used in the parent element
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
    nativeCssVariables_ = nativeShadow || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));
  }
}
/** @type {string | undefined} */


let cssBuild;
exports.cssBuild = cssBuild;

if (window.ShadyCSS && window.ShadyCSS.cssBuild !== undefined) {
  exports.cssBuild = cssBuild = window.ShadyCSS.cssBuild;
}
/** @type {boolean} */


const disableRuntime = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);
exports.disableRuntime = disableRuntime;

if (window.ShadyCSS && window.ShadyCSS.nativeCss !== undefined) {
  nativeCssVariables_ = window.ShadyCSS.nativeCss;
} else if (window.ShadyCSS) {
  calcCssVariables(window.ShadyCSS); // reset window variable to let ShadyCSS API take its place

  window.ShadyCSS = undefined;
} else {
  calcCssVariables(window['WebComponents'] && window['WebComponents']['flags']);
} // Hack for type error under new type inference which doesn't like that
// nativeCssVariables is updated in a function and assigns the type
// `function(): ?` instead of `boolean`.


const nativeCssVariables =
/** @type {boolean} */
nativeCssVariables_;
exports.nativeCssVariables = nativeCssVariables;
},{}],"../node_modules/@webcomponents/shadycss/entrypoints/custom-style-interface.js":[function(require,module,exports) {
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

var _customStyleInterface = _interopRequireDefault(require("../src/custom-style-interface.js"));

var _commonUtils = require("../src/common-utils.js");

var _styleSettings = require("../src/style-settings.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customStyleInterface = new _customStyleInterface.default();

if (!window.ShadyCSS) {
  window.ShadyCSS = {
    /**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */
    prepareTemplate(template, elementName, elementExtends) {},

    // eslint-disable-line no-unused-vars

    /**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     */
    prepareTemplateDom(template, elementName) {},

    // eslint-disable-line no-unused-vars

    /**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */
    prepareTemplateStyles(template, elementName, elementExtends) {},

    // eslint-disable-line no-unused-vars

    /**
     * @param {Element} element
     * @param {Object=} properties
     */
    styleSubtree(element, properties) {
      customStyleInterface.processStyles();
      (0, _commonUtils.updateNativeProperties)(element, properties);
    },

    /**
     * @param {Element} element
     */
    styleElement(element) {
      // eslint-disable-line no-unused-vars
      customStyleInterface.processStyles();
    },

    /**
     * @param {Object=} properties
     */
    styleDocument(properties) {
      customStyleInterface.processStyles();
      (0, _commonUtils.updateNativeProperties)(document.body, properties);
    },

    /**
     * @param {Element} element
     * @param {string} property
     * @return {string}
     */
    getComputedStyleValue(element, property) {
      return (0, _commonUtils.getComputedStyleValue)(element, property);
    },

    flushCustomStyles() {},

    nativeCss: _styleSettings.nativeCssVariables,
    nativeShadow: _styleSettings.nativeShadow,
    cssBuild: _styleSettings.cssBuild,
    disableRuntime: _styleSettings.disableRuntime
  };
}

window.ShadyCSS.CustomStyleInterface = customStyleInterface;
},{"../src/custom-style-interface.js":"../node_modules/@webcomponents/shadycss/src/custom-style-interface.js","../src/common-utils.js":"../node_modules/@webcomponents/shadycss/src/common-utils.js","../src/style-settings.js":"../node_modules/@webcomponents/shadycss/src/style-settings.js"}],"../node_modules/@polymer/polymer/lib/utils/boot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* eslint-disable no-unused-vars */

/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
 * We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
 *
 * @param {?} prop Property name
 * @param {*} obj Reference object
 * @return {string} Potentially renamed property name
 */
window.JSCompiler_renameProperty = function (prop, obj) {
  return prop;
};
/* eslint-enable */
},{}],"../node_modules/@polymer/polymer/lib/utils/resolve-url.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveUrl = resolveUrl;
exports.resolveCss = resolveCss;
exports.pathFromUrl = pathFromUrl;

require("./boot.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let CSS_URL_RX = /(url\()([^)]*)(\))/g;
let ABS_URL = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/;
let workingURL;
let resolveDoc;
/**
 * Resolves the given URL against the provided `baseUri'.
 *
 * Note that this function performs no resolution for URLs that start
 * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
 * URL resolution, use `window.URL`.
 *
 * @param {string} url Input URL to resolve
 * @param {?string=} baseURI Base URI to resolve the URL against
 * @return {string} resolved URL
 */

function resolveUrl(url, baseURI) {
  if (url && ABS_URL.test(url)) {
    return url;
  }

  if (url === '//') {
    return url;
  } // Lazy feature detection.


  if (workingURL === undefined) {
    workingURL = false;

    try {
      const u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      workingURL = u.href === 'http://a/c%20d';
    } catch (e) {// silently fail
    }
  }

  if (!baseURI) {
    baseURI = document.baseURI || window.location.href;
  }

  if (workingURL) {
    try {
      return new URL(url, baseURI).href;
    } catch (e) {
      // Bad url or baseURI structure. Do not attempt to resolve.
      return url;
    }
  } // Fallback to creating an anchor into a disconnected document.


  if (!resolveDoc) {
    resolveDoc = document.implementation.createHTMLDocument('temp');
    resolveDoc.base = resolveDoc.createElement('base');
    resolveDoc.head.appendChild(resolveDoc.base);
    resolveDoc.anchor = resolveDoc.createElement('a');
    resolveDoc.body.appendChild(resolveDoc.anchor);
  }

  resolveDoc.base.href = baseURI;
  resolveDoc.anchor.href = url;
  return resolveDoc.anchor.href || url;
}
/**
 * Resolves any relative URL's in the given CSS text against the provided
 * `ownerDocument`'s `baseURI`.
 *
 * @param {string} cssText CSS text to process
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Processed CSS text with resolved URL's
 */


function resolveCss(cssText, baseURI) {
  return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
    return pre + '\'' + resolveUrl(url.replace(/["']/g, ''), baseURI) + '\'' + post;
  });
}
/**
 * Returns a path from a given `url`. The path includes the trailing
 * `/` from the url.
 *
 * @param {string} url Input URL to transform
 * @return {string} resolved path
 */


function pathFromUrl(url) {
  return url.substring(0, url.lastIndexOf('/') + 1);
}
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js"}],"../node_modules/@polymer/polymer/lib/utils/settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUseAdoptedStyleSheetsWithBuiltCSS = exports.useAdoptedStyleSheetsWithBuiltCSS = exports.setLegacyNoObservedAttributes = exports.legacyNoObservedAttributes = exports.setSuppressTemplateNotifications = exports.suppressTemplateNotifications = exports.setFastDomIf = exports.fastDomIf = exports.setRemoveNestedTemplates = exports.removeNestedTemplates = exports.setCancelSyntheticClickEvents = exports.cancelSyntheticClickEvents = exports.setOrderedComputed = exports.orderedComputed = exports.setLegacyUndefined = exports.legacyUndefined = exports.setSyncInitialRender = exports.syncInitialRender = exports.setLegacyWarnings = exports.legacyWarnings = exports.setLegacyOptimizations = exports.legacyOptimizations = exports.setAllowTemplateFromDomModule = exports.allowTemplateFromDomModule = exports.setStrictTemplatePolicy = exports.strictTemplatePolicy = exports.setPassiveTouchGestures = exports.passiveTouchGestures = exports.getSanitizeDOMValue = exports.setSanitizeDOMValue = exports.sanitizeDOMValue = exports.setRootPath = exports.rootPath = exports.supportsAdoptingStyleSheets = exports.useNativeCustomElements = exports.useNativeCSSProperties = exports.useShadow = void 0;

require("./boot.js");

var _resolveUrl = require("./resolve-url.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const useShadow = !window.ShadyDOM || !window.ShadyDOM.inUse;
exports.useShadow = useShadow;
const useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
exports.useNativeCSSProperties = useNativeCSSProperties;
const useNativeCustomElements = !window.customElements.polyfillWrapFlushCallback;
exports.useNativeCustomElements = useNativeCustomElements;

const supportsAdoptingStyleSheets = useShadow && 'adoptedStyleSheets' in Document.prototype && 'replaceSync' in CSSStyleSheet.prototype && // Since spec may change, feature detect exact API we need
(() => {
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync('');
    const host = document.createElement('div');
    host.attachShadow({
      mode: 'open'
    });
    host.shadowRoot.adoptedStyleSheets = [sheet];
    return host.shadowRoot.adoptedStyleSheets[0] === sheet;
  } catch (e) {
    return false;
  }
})();
/**
 * Globally settable property that is automatically assigned to
 * `ElementMixin` instances, useful for binding in templates to
 * make URL's relative to an application's root.  Defaults to the main
 * document URL, but can be overridden by users.  It may be useful to set
 * `rootPath` to provide a stable application mount path when
 * using client side routing.
 */


exports.supportsAdoptingStyleSheets = supportsAdoptingStyleSheets;
let rootPath = window.Polymer && window.Polymer.rootPath || (0, _resolveUrl.pathFromUrl)(document.baseURI || window.location.href);
/**
 * Sets the global rootPath property used by `ElementMixin` and
 * available via `rootPath`.
 *
 * @param {string} path The new root path
 * @return {void}
 */

exports.rootPath = rootPath;

const setRootPath = function (path) {
  exports.rootPath = rootPath = path;
};
/**
 * A global callback used to sanitize any value before inserting it into the DOM.
 * The callback signature is:
 *
 *  function sanitizeDOMValue(value, name, type, node) { ... }
 *
 * Where:
 *
 * `value` is the value to sanitize.
 * `name` is the name of an attribute or property (for example, href).
 * `type` indicates where the value is being inserted: one of property, attribute, or text.
 * `node` is the node where the value is being inserted.
 *
 * @type {(function(*,string,string,?Node):*)|undefined}
 */


exports.setRootPath = setRootPath;
let sanitizeDOMValue = window.Polymer && window.Polymer.sanitizeDOMValue || undefined;
/**
 * Sets the global sanitizeDOMValue available via this module's exported
 * `sanitizeDOMValue` variable.
 *
 * @param {(function(*,string,string,?Node):*)|undefined} newSanitizeDOMValue the global sanitizeDOMValue callback
 * @return {void}
 */

exports.sanitizeDOMValue = sanitizeDOMValue;

const setSanitizeDOMValue = function (newSanitizeDOMValue) {
  exports.sanitizeDOMValue = sanitizeDOMValue = newSanitizeDOMValue;
};
/**
 * Gets sanitizeDOMValue, for environments that don't well support `export let`.
 *
 * @return {(function(*,string,string,?Node):*)|undefined} sanitizeDOMValue
 */


exports.setSanitizeDOMValue = setSanitizeDOMValue;

const getSanitizeDOMValue = function () {
  return sanitizeDOMValue;
};
/**
 * Globally settable property to make Polymer Gestures use passive TouchEvent listeners when recognizing gestures.
 * When set to `true`, gestures made from touch will not be able to prevent scrolling, allowing for smoother
 * scrolling performance.
 * Defaults to `false` for backwards compatibility.
 */


exports.getSanitizeDOMValue = getSanitizeDOMValue;
let passiveTouchGestures = window.Polymer && window.Polymer.setPassiveTouchGestures || false;
/**
 * Sets `passiveTouchGestures` globally for all elements using Polymer Gestures.
 *
 * @param {boolean} usePassive enable or disable passive touch gestures globally
 * @return {void}
 */

exports.passiveTouchGestures = passiveTouchGestures;

const setPassiveTouchGestures = function (usePassive) {
  exports.passiveTouchGestures = passiveTouchGestures = usePassive;
};
/**
 * Setting to ensure Polymer template evaluation only occurs based on tempates
 * defined in trusted script.  When true, `<dom-module>` re-registration is
 * disallowed, `<dom-bind>` is disabled, and `<dom-if>`/`<dom-repeat>`
 * templates will only evaluate in the context of a trusted element template.
 */


exports.setPassiveTouchGestures = setPassiveTouchGestures;
let strictTemplatePolicy = window.Polymer && window.Polymer.strictTemplatePolicy || false;
/**
 * Sets `strictTemplatePolicy` globally for all elements
 *
 * @param {boolean} useStrictPolicy enable or disable strict template policy
 *   globally
 * @return {void}
 */

exports.strictTemplatePolicy = strictTemplatePolicy;

const setStrictTemplatePolicy = function (useStrictPolicy) {
  exports.strictTemplatePolicy = strictTemplatePolicy = useStrictPolicy;
};
/**
 * Setting to enable dom-module lookup from Polymer.Element.  By default,
 * templates must be defined in script using the `static get template()`
 * getter and the `html` tag function.  To enable legacy loading of templates
 * via dom-module, set this flag to true.
 */


exports.setStrictTemplatePolicy = setStrictTemplatePolicy;
let allowTemplateFromDomModule = window.Polymer && window.Polymer.allowTemplateFromDomModule || false;
/**
 * Sets `lookupTemplateFromDomModule` globally for all elements
 *
 * @param {boolean} allowDomModule enable or disable template lookup
 *   globally
 * @return {void}
 */

exports.allowTemplateFromDomModule = allowTemplateFromDomModule;

const setAllowTemplateFromDomModule = function (allowDomModule) {
  exports.allowTemplateFromDomModule = allowTemplateFromDomModule = allowDomModule;
};
/**
 * Setting to skip processing style includes and re-writing urls in css styles.
 * Normally "included" styles are pulled into the element and all urls in styles
 * are re-written to be relative to the containing script url.
 * If no includes or relative urls are used in styles, these steps can be
 * skipped as an optimization.
 */


exports.setAllowTemplateFromDomModule = setAllowTemplateFromDomModule;
let legacyOptimizations = window.Polymer && window.Polymer.legacyOptimizations || false;
/**
 * Sets `legacyOptimizations` globally for all elements to enable optimizations
 * when only legacy based elements are used.
 *
 * @param {boolean} useLegacyOptimizations enable or disable legacy optimizations
 * includes and url rewriting
 * @return {void}
 */

exports.legacyOptimizations = legacyOptimizations;

const setLegacyOptimizations = function (useLegacyOptimizations) {
  exports.legacyOptimizations = legacyOptimizations = useLegacyOptimizations;
};
/**
 * Setting to add warnings useful when migrating from Polymer 1.x to 2.x.
 */


exports.setLegacyOptimizations = setLegacyOptimizations;
let legacyWarnings = window.Polymer && window.Polymer.legacyWarnings || false;
/**
 * Sets `legacyWarnings` globally for all elements to migration warnings.
 *
 * @param {boolean} useLegacyWarnings enable or disable warnings
 * @return {void}
 */

exports.legacyWarnings = legacyWarnings;

const setLegacyWarnings = function (useLegacyWarnings) {
  exports.legacyWarnings = legacyWarnings = useLegacyWarnings;
};
/**
 * Setting to perform initial rendering synchronously when running under ShadyDOM.
 * This matches the behavior of Polymer 1.
 */


exports.setLegacyWarnings = setLegacyWarnings;
let syncInitialRender = window.Polymer && window.Polymer.syncInitialRender || false;
/**
 * Sets `syncInitialRender` globally for all elements to enable synchronous
 * initial rendering.
 *
 * @param {boolean} useSyncInitialRender enable or disable synchronous initial
 * rendering globally.
 * @return {void}
 */

exports.syncInitialRender = syncInitialRender;

const setSyncInitialRender = function (useSyncInitialRender) {
  exports.syncInitialRender = syncInitialRender = useSyncInitialRender;
};
/**
 * Setting to retain the legacy Polymer 1 behavior for multi-property
 * observers around undefined values. Observers and computed property methods
 * are not called until no argument is undefined.
 */


exports.setSyncInitialRender = setSyncInitialRender;
let legacyUndefined = window.Polymer && window.Polymer.legacyUndefined || false;
/**
 * Sets `legacyUndefined` globally for all elements to enable legacy
 * multi-property behavior for undefined values.
 *
 * @param {boolean} useLegacyUndefined enable or disable legacy
 * multi-property behavior for undefined.
 * @return {void}
 */

exports.legacyUndefined = legacyUndefined;

const setLegacyUndefined = function (useLegacyUndefined) {
  exports.legacyUndefined = legacyUndefined = useLegacyUndefined;
};
/**
 * Setting to ensure computed properties are computed in order to ensure
 * re-computation never occurs in a given turn.
 */


exports.setLegacyUndefined = setLegacyUndefined;
let orderedComputed = window.Polymer && window.Polymer.orderedComputed || false;
/**
 * Sets `orderedComputed` globally for all elements to enable ordered computed
 * property computation.
 *
 * @param {boolean} useOrderedComputed enable or disable ordered computed effects
 * @return {void}
 */

exports.orderedComputed = orderedComputed;

const setOrderedComputed = function (useOrderedComputed) {
  exports.orderedComputed = orderedComputed = useOrderedComputed;
};
/**
 * Setting to cancel synthetic click events fired by older mobile browsers. Modern browsers
 * no longer fire synthetic click events, and the cancellation behavior can interfere
 * when programmatically clicking on elements.
 */


exports.setOrderedComputed = setOrderedComputed;
let cancelSyntheticClickEvents = true;
/**
 * Sets `setCancelSyntheticEvents` globally for all elements to cancel synthetic click events.
 *
 * @param {boolean} useCancelSyntheticClickEvents enable or disable cancelling synthetic
 * events
 * @return {void}
 */

exports.cancelSyntheticClickEvents = cancelSyntheticClickEvents;

const setCancelSyntheticClickEvents = function (useCancelSyntheticClickEvents) {
  exports.cancelSyntheticClickEvents = cancelSyntheticClickEvents = useCancelSyntheticClickEvents;
};
/**
 * Setting to remove nested templates inside `dom-if` and `dom-repeat` as
 * part of element template parsing.  This is a performance optimization that
 * eliminates most of the tax of needing two elements due to the loss of
 * type-extended templates as a result of the V1 specification changes.
 */


exports.setCancelSyntheticClickEvents = setCancelSyntheticClickEvents;
let removeNestedTemplates = window.Polymer && window.Polymer.removeNestedTemplates || false;
/**
 * Sets `removeNestedTemplates` globally, to eliminate nested templates
 * inside `dom-if` and `dom-repeat` as part of template parsing.
 *
 * @param {boolean} useRemoveNestedTemplates enable or disable removing nested
 *   templates during parsing
 * @return {void}
 */

exports.removeNestedTemplates = removeNestedTemplates;

const setRemoveNestedTemplates = function (useRemoveNestedTemplates) {
  exports.removeNestedTemplates = removeNestedTemplates = useRemoveNestedTemplates;
};
/**
 * Setting to place `dom-if` elements in a performance-optimized mode that takes
 * advantage of lighter-weight host runtime template stamping to eliminate the
 * need for an intermediate Templatizer `TemplateInstance` to mange the nodes
 * stamped by `dom-if`.  Under this setting, any Templatizer-provided API's
 * such as `modelForElement` will not be available for nodes stamped by
 * `dom-if`.
 */


exports.setRemoveNestedTemplates = setRemoveNestedTemplates;
let fastDomIf = window.Polymer && window.Polymer.fastDomIf || false;
/**
 * Sets `fastDomIf` globally, to put `dom-if` in a performance-optimized mode.
 *
 * @param {boolean} useFastDomIf enable or disable `dom-if` fast-mode
 * @return {void}
 */

exports.fastDomIf = fastDomIf;

const setFastDomIf = function (useFastDomIf) {
  exports.fastDomIf = fastDomIf = useFastDomIf;
};
/**
 * Setting to disable `dom-change` and `rendered-item-count` events from
 * `dom-if` and `dom-repeat`. Users can opt back into `dom-change` events by
 * setting the `notify-dom-change` attribute (`notifyDomChange: true` property)
 * to `dom-if`/`don-repeat` instances.
 */


exports.setFastDomIf = setFastDomIf;
let suppressTemplateNotifications = window.Polymer && window.Polymer.suppressTemplateNotifications || false;
/**
 * Sets `suppressTemplateNotifications` globally, to disable `dom-change` and
 * `rendered-item-count` events from `dom-if` and `dom-repeat`.
 *
 * @param {boolean} suppress enable or disable `suppressTemplateNotifications`
 * @return {void}
 */

exports.suppressTemplateNotifications = suppressTemplateNotifications;

const setSuppressTemplateNotifications = function (suppress) {
  exports.suppressTemplateNotifications = suppressTemplateNotifications = suppress;
};
/**
 * Setting to disable use of dynamic attributes. This is an optimization
 * to avoid setting `observedAttributes`. Instead attributes are read
 * once at create time and set/removeAttribute are patched.
 */


exports.setSuppressTemplateNotifications = setSuppressTemplateNotifications;
let legacyNoObservedAttributes = window.Polymer && window.Polymer.legacyNoObservedAttributes || false;
/**
 * Sets `legacyNoObservedAttributes` globally, to disable `observedAttributes`.
 *
 * @param {boolean} noObservedAttributes enable or disable `legacyNoObservedAttributes`
 * @return {void}
 */

exports.legacyNoObservedAttributes = legacyNoObservedAttributes;

const setLegacyNoObservedAttributes = function (noObservedAttributes) {
  exports.legacyNoObservedAttributes = legacyNoObservedAttributes = noObservedAttributes;
};
/**
 * Setting to enable use of `adoptedStyleSheets` for sharing style sheets
 * between component instances' shadow roots, if the app uses built Shady CSS
 * styles.
 */


exports.setLegacyNoObservedAttributes = setLegacyNoObservedAttributes;
let useAdoptedStyleSheetsWithBuiltCSS = window.Polymer && window.Polymer.useAdoptedStyleSheetsWithBuiltCSS || false;
/**
 * Sets `useAdoptedStyleSheetsWithBuiltCSS` globally.
 *
 * @param {boolean} value enable or disable `useAdoptedStyleSheetsWithBuiltCSS`
 * @return {void}
 */

exports.useAdoptedStyleSheetsWithBuiltCSS = useAdoptedStyleSheetsWithBuiltCSS;

const setUseAdoptedStyleSheetsWithBuiltCSS = function (value) {
  exports.useAdoptedStyleSheetsWithBuiltCSS = useAdoptedStyleSheetsWithBuiltCSS = value;
};

exports.setUseAdoptedStyleSheetsWithBuiltCSS = setUseAdoptedStyleSheetsWithBuiltCSS;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","./resolve-url.js":"../node_modules/@polymer/polymer/lib/utils/resolve-url.js"}],"../node_modules/@polymer/polymer/lib/elements/dom-module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomModule = void 0;

require("../utils/boot.js");

var _resolveUrl = require("../utils/resolve-url.js");

var _settings = require("../utils/settings.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let modules = {};
let lcModules = {};
/**
 * Sets a dom-module into the global registry by id.
 *
 * @param {string} id dom-module id
 * @param {DomModule} module dom-module instance
 * @return {void}
 */

function setModule(id, module) {
  // store id separate from lowercased id so that
  // in all cases mixedCase id will stored distinctly
  // and lowercase version is a fallback
  modules[id] = lcModules[id.toLowerCase()] = module;
}
/**
 * Retrieves a dom-module from the global registry by id.
 *
 * @param {string} id dom-module id
 * @return {DomModule!} dom-module instance
 */


function findModule(id) {
  return modules[id] || lcModules[id.toLowerCase()];
}

function styleOutsideTemplateCheck(inst) {
  if (inst.querySelector('style')) {
    console.warn('dom-module %s has style outside template', inst.id);
  }
}
/**
 * The `dom-module` element registers the dom it contains to the name given
 * by the module's id attribute. It provides a unified database of dom
 * accessible via its static `import` API.
 *
 * A key use case of `dom-module` is for providing custom element `<template>`s
 * via HTML imports that are parsed by the native HTML parser, that can be
 * relocated during a bundling pass and still looked up by `id`.
 *
 * Example:
 *
 *     <dom-module id="foo">
 *       <img src="stuff.png">
 *     </dom-module>
 *
 * Then in code in some other location that cannot access the dom-module above
 *
 *     let img = customElements.get('dom-module').import('foo', 'img');
 *
 * @customElement
 * @extends HTMLElement
 * @summary Custom element that provides a registry of relocatable DOM content
 *   by `id` that is agnostic to bundling.
 * @unrestricted
 */


class DomModule extends HTMLElement {
  /** @override */
  static get observedAttributes() {
    return ['id'];
  }
  /**
   * Retrieves the element specified by the css `selector` in the module
   * registered by `id`. For example, this.import('foo', 'img');
   * @param {string} id The id of the dom-module in which to search.
   * @param {string=} selector The css selector by which to find the element.
   * @return {Element} Returns the element which matches `selector` in the
   * module registered at the specified `id`.
   *
   * @export
   * @nocollapse Referred to indirectly in style-gather.js
   */


  static import(id, selector) {
    if (id) {
      let m = findModule(id);

      if (m && selector) {
        return m.querySelector(selector);
      }

      return m;
    }

    return null;
  }
  /* eslint-disable no-unused-vars */

  /**
   * @param {string} name Name of attribute.
   * @param {?string} old Old value of attribute.
   * @param {?string} value Current value of attribute.
   * @param {?string} namespace Attribute namespace.
   * @return {void}
   * @override
   */


  attributeChangedCallback(name, old, value, namespace) {
    if (old !== value) {
      this.register();
    }
  }
  /* eslint-enable no-unused-args */

  /**
   * The absolute URL of the original location of this `dom-module`.
   *
   * This value will differ from this element's `ownerDocument` in the
   * following ways:
   * - Takes into account any `assetpath` attribute added during bundling
   *   to indicate the original location relative to the bundled location
   * - Uses the HTMLImports polyfill's `importForElement` API to ensure
   *   the path is relative to the import document's location since
   *   `ownerDocument` is not currently polyfilled
   */


  get assetpath() {
    // Don't override existing assetpath.
    if (!this.__assetpath) {
      // note: assetpath set via an attribute must be relative to this
      // element's location; accomodate polyfilled HTMLImports
      const owner = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument;
      const url = (0, _resolveUrl.resolveUrl)(this.getAttribute('assetpath') || '', owner.baseURI);
      this.__assetpath = (0, _resolveUrl.pathFromUrl)(url);
    }

    return this.__assetpath;
  }
  /**
   * Registers the dom-module at a given id. This method should only be called
   * when a dom-module is imperatively created. For
   * example, `document.createElement('dom-module').register('foo')`.
   * @param {string=} id The id at which to register the dom-module.
   * @return {void}
   */


  register(id) {
    id = id || this.id;

    if (id) {
      // Under strictTemplatePolicy, reject and null out any re-registered
      // dom-module since it is ambiguous whether first-in or last-in is trusted
      if (_settings.strictTemplatePolicy && findModule(id) !== undefined) {
        setModule(id, null);
        throw new Error(`strictTemplatePolicy: dom-module ${id} re-registered`);
      }

      this.id = id;
      setModule(id, this);
      styleOutsideTemplateCheck(this);
    }
  }

}

exports.DomModule = DomModule;
DomModule.prototype['modules'] = modules;
customElements.define('dom-module', DomModule);
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/resolve-url.js":"../node_modules/@polymer/polymer/lib/utils/resolve-url.js","../utils/settings.js":"../node_modules/@polymer/polymer/lib/utils/settings.js"}],"../node_modules/@polymer/polymer/lib/utils/style-gather.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stylesFromModules = stylesFromModules;
exports.stylesFromModule = stylesFromModule;
exports.stylesFromTemplate = stylesFromTemplate;
exports.stylesFromModuleImports = stylesFromModuleImports;
exports.cssFromModules = cssFromModules;
exports.cssFromModule = cssFromModule;
exports.cssFromTemplate = cssFromTemplate;
exports.cssFromModuleImports = cssFromModuleImports;

var _domModule = require("../elements/dom-module.js");

var _resolveUrl = require("./resolve-url.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Module with utilities for collection CSS text from `<templates>`, external
 * stylesheets, and `dom-module`s.
 *
 * @summary Module with utilities for collection CSS text from various sources.
 */
const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
const INCLUDE_ATTR = 'include';
const SHADY_UNSCOPED_ATTR = 'shady-unscoped';
/**
 * @param {string} moduleId .
 * @return {?DomModule} .
 */

function importModule(moduleId) {
  return (
    /** @type {?DomModule} */
    _domModule.DomModule.import(moduleId)
  );
}

function styleForImport(importDoc) {
  // NOTE: polyfill affordance.
  // under the HTMLImports polyfill, there will be no 'body',
  // but the import pseudo-doc can be used directly.
  let container = importDoc.body ? importDoc.body : importDoc;
  const importCss = (0, _resolveUrl.resolveCss)(container.textContent, importDoc.baseURI);
  const style = document.createElement('style');
  style.textContent = importCss;
  return style;
}
/** @typedef {{assetpath: string}} */


let templateWithAssetPath; // eslint-disable-line no-unused-vars

/**
 * Returns a list of <style> elements in a space-separated list of `dom-module`s.
 *
 * @function
 * @param {string} moduleIds List of dom-module id's within which to
 * search for css.
 * @return {!Array<!HTMLStyleElement>} Array of contained <style> elements
 */

function stylesFromModules(moduleIds) {
  const modules = moduleIds.trim().split(/\s+/);
  const styles = [];

  for (let i = 0; i < modules.length; i++) {
    styles.push(...stylesFromModule(modules[i]));
  }

  return styles;
}
/**
 * Returns a list of <style> elements in a given `dom-module`.
 * Styles in a `dom-module` can come either from `<style>`s within the
 * first `<template>`, or else from one or more
 * `<link rel="import" type="css">` links outside the template.
 *
 * @param {string} moduleId dom-module id to gather styles from
 * @return {!Array<!HTMLStyleElement>} Array of contained styles.
 */


function stylesFromModule(moduleId) {
  const m = importModule(moduleId);

  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
    return [];
  }

  if (m._styles === undefined) {
    const styles = []; // module imports: <link rel="import" type="css">

    styles.push(..._stylesFromModuleImports(m)); // include css from the first template in the module

    const template =
    /** @type {?HTMLTemplateElement} */
    m.querySelector('template');

    if (template) {
      styles.push(...stylesFromTemplate(template,
      /** @type {templateWithAssetPath} */
      m.assetpath));
    }

    m._styles = styles;
  }

  return m._styles;
}
/**
 * Returns the `<style>` elements within a given template.
 *
 * @param {!HTMLTemplateElement} template Template to gather styles from
 * @param {string=} baseURI baseURI for style content
 * @return {!Array<!HTMLStyleElement>} Array of styles
 */


function stylesFromTemplate(template, baseURI) {
  if (!template._styles) {
    const styles = []; // if element is a template, get content from its .content

    const e$ = template.content.querySelectorAll('style');

    for (let i = 0; i < e$.length; i++) {
      let e = e$[i]; // support style sharing by allowing styles to "include"
      // other dom-modules that contain styling

      let include = e.getAttribute(INCLUDE_ATTR);

      if (include) {
        styles.push(...stylesFromModules(include).filter(function (item, index, self) {
          return self.indexOf(item) === index;
        }));
      }

      if (baseURI) {
        e.textContent = (0, _resolveUrl.resolveCss)(e.textContent,
        /** @type {string} */
        baseURI);
      }

      styles.push(e);
    }

    template._styles = styles;
  }

  return template._styles;
}
/**
 * Returns a list of <style> elements  from stylesheets loaded via `<link rel="import" type="css">` links within the specified `dom-module`.
 *
 * @param {string} moduleId Id of `dom-module` to gather CSS from
 * @return {!Array<!HTMLStyleElement>} Array of contained styles.
 */


function stylesFromModuleImports(moduleId) {
  let m = importModule(moduleId);
  return m ? _stylesFromModuleImports(m) : [];
}
/**
 * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
 * @return {!Array<!HTMLStyleElement>} Array of contained styles
 */


function _stylesFromModuleImports(module) {
  const styles = [];
  const p$ = module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);

  for (let i = 0; i < p$.length; i++) {
    let p = p$[i];

    if (p.import) {
      const importDoc = p.import;
      const unscoped = p.hasAttribute(SHADY_UNSCOPED_ATTR);

      if (unscoped && !importDoc._unscopedStyle) {
        const style = styleForImport(importDoc);
        style.setAttribute(SHADY_UNSCOPED_ATTR, '');
        importDoc._unscopedStyle = style;
      } else if (!importDoc._style) {
        importDoc._style = styleForImport(importDoc);
      }

      styles.push(unscoped ? importDoc._unscopedStyle : importDoc._style);
    }
  }

  return styles;
}
/**
 *
 * Returns CSS text of styles in a space-separated list of `dom-module`s.
 * Note: This method is deprecated, use `stylesFromModules` instead.
 *
 * @deprecated
 * @param {string} moduleIds List of dom-module id's within which to
 * search for css.
 * @return {string} Concatenated CSS content from specified `dom-module`s
 */


function cssFromModules(moduleIds) {
  let modules = moduleIds.trim().split(/\s+/);
  let cssText = '';

  for (let i = 0; i < modules.length; i++) {
    cssText += cssFromModule(modules[i]);
  }

  return cssText;
}
/**
 * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
 * can come either from `<style>`s within the first `<template>`, or else
 * from one or more `<link rel="import" type="css">` links outside the
 * template.
 *
 * Any `<styles>` processed are removed from their original location.
 * Note: This method is deprecated, use `styleFromModule` instead.
 *
 * @deprecated
 * @param {string} moduleId dom-module id to gather styles from
 * @return {string} Concatenated CSS content from specified `dom-module`
 */


function cssFromModule(moduleId) {
  let m = importModule(moduleId);

  if (m && m._cssText === undefined) {
    // module imports: <link rel="import" type="css">
    let cssText = _cssFromModuleImports(m); // include css from the first template in the module


    let t =
    /** @type {?HTMLTemplateElement} */
    m.querySelector('template');

    if (t) {
      cssText += cssFromTemplate(t,
      /** @type {templateWithAssetPath} */
      m.assetpath);
    }

    m._cssText = cssText || null;
  }

  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
  }

  return m && m._cssText || '';
}
/**
 * Returns CSS text of `<styles>` within a given template.
 *
 * Any `<styles>` processed are removed from their original location.
 * Note: This method is deprecated, use `styleFromTemplate` instead.
 *
 * @deprecated
 * @param {!HTMLTemplateElement} template Template to gather styles from
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Concatenated CSS content from specified template
 */


function cssFromTemplate(template, baseURI) {
  let cssText = '';
  const e$ = stylesFromTemplate(template, baseURI); // if element is a template, get content from its .content

  for (let i = 0; i < e$.length; i++) {
    let e = e$[i];

    if (e.parentNode) {
      e.parentNode.removeChild(e);
    }

    cssText += e.textContent;
  }

  return cssText;
}
/**
 * Returns CSS text from stylesheets loaded via `<link rel="import" type="css">`
 * links within the specified `dom-module`.
 *
 * Note: This method is deprecated, use `stylesFromModuleImports` instead.
 *
 * @deprecated
 *
 * @param {string} moduleId Id of `dom-module` to gather CSS from
 * @return {string} Concatenated CSS content from links in specified `dom-module`
 */


function cssFromModuleImports(moduleId) {
  let m = importModule(moduleId);
  return m ? _cssFromModuleImports(m) : '';
}
/**
 * @deprecated
 * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
 * @return {string} Concatenated CSS content from links in the dom-module
 */


function _cssFromModuleImports(module) {
  let cssText = '';

  let styles = _stylesFromModuleImports(module);

  for (let i = 0; i < styles.length; i++) {
    cssText += styles[i].textContent;
  }

  return cssText;
}
},{"../elements/dom-module.js":"../node_modules/@polymer/polymer/lib/elements/dom-module.js","./resolve-url.js":"../node_modules/@polymer/polymer/lib/utils/resolve-url.js"}],"../node_modules/@polymer/polymer/lib/elements/custom-style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomStyle = void 0;

require("@webcomponents/shadycss/entrypoints/custom-style-interface.js");

var _styleGather = require("../utils/style-gather.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const attr = 'include';
const CustomStyleInterface = window.ShadyCSS.CustomStyleInterface;
/**
 * Custom element for defining styles in the main document that can take
 * advantage of [shady DOM](https://github.com/webcomponents/shadycss) shims
 * for style encapsulation, custom properties, and custom mixins.
 *
 * - Document styles defined in a `<custom-style>` are shimmed to ensure they
 *   do not leak into local DOM when running on browsers without native
 *   Shadow DOM.
 * - Custom properties can be defined in a `<custom-style>`. Use the `html` selector
 *   to define custom properties that apply to all custom elements.
 * - Custom mixins can be defined in a `<custom-style>`, if you import the optional
 *   [apply shim](https://github.com/webcomponents/shadycss#about-applyshim)
 *   (`shadycss/apply-shim.html`).
 *
 * To use:
 *
 * - Import `custom-style.html`.
 * - Place a `<custom-style>` element in the main document, wrapping an inline `<style>` tag that
 *   contains the CSS rules you want to shim.
 *
 * For example:
 *
 * ```html
 * <!-- import apply shim--only required if using mixins -->
 * <link rel="import" href="bower_components/shadycss/apply-shim.html">
 * <!-- import custom-style element -->
 * <link rel="import" href="bower_components/polymer/lib/elements/custom-style.html">
 *
 * <custom-style>
 *   <style>
 *     html {
 *       --custom-color: blue;
 *       --custom-mixin: {
 *         font-weight: bold;
 *         color: red;
 *       };
 *     }
 *   </style>
 * </custom-style>
 * ```
 *
 * @customElement
 * @extends HTMLElement
 * @summary Custom element for defining styles in the main document that can
 *   take advantage of Polymer's style scoping and custom properties shims.
 */

class CustomStyle extends HTMLElement {
  constructor() {
    super();
    this._style = null;
    CustomStyleInterface.addCustomStyle(this);
  }
  /**
   * Returns the light-DOM `<style>` child this element wraps.  Upon first
   * call any style modules referenced via the `include` attribute will be
   * concatenated to this element's `<style>`.
   *
   * @export
   * @return {HTMLStyleElement} This element's light-DOM `<style>`
   */


  getStyle() {
    if (this._style) {
      return this._style;
    }

    const style =
    /** @type {HTMLStyleElement} */
    this.querySelector('style');

    if (!style) {
      return null;
    }

    this._style = style;
    const include = style.getAttribute(attr);

    if (include) {
      style.removeAttribute(attr);
      /** @suppress {deprecated} */

      style.textContent = (0, _styleGather.cssFromModules)(include) + style.textContent;
    }
    /*
    HTML Imports styling the main document are deprecated in Chrome
    https://crbug.com/523952
     If this element is not in the main document, then it must be in an HTML Import document.
    In that case, move the custom style to the main document.
     The ordering of `<custom-style>` should stay the same as when loaded by HTML Imports, but there may be odd
    cases of ordering w.r.t the main document styles.
    */


    if (this.ownerDocument !== window.document) {
      window.document.head.appendChild(this);
    }

    return this._style;
  }

}

exports.CustomStyle = CustomStyle;
window.customElements.define('custom-style', CustomStyle);
},{"@webcomponents/shadycss/entrypoints/custom-style-interface.js":"../node_modules/@webcomponents/shadycss/entrypoints/custom-style-interface.js","../utils/style-gather.js":"../node_modules/@polymer/polymer/lib/utils/style-gather.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/color.js":[function(require,module,exports) {
"use strict";

require("./version.js");

require("@polymer/polymer/lib/elements/custom-style.js");

require("@polymer/polymer/lib/elements/dom-module.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
      /* Base (background) */
      --lumo-base-color: #FFF;

      /* Tint */
      --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
      --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
      --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
      --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
      --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
      --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
      --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
      --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
      --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
      --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
      --lumo-tint: #FFF;

      /* Shade */
      --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
      --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
      --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
      --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
      --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
      --lumo-shade-50pct: hsla(214, 45%, 20%, 0.5);
      --lumo-shade-60pct: hsla(214, 43%, 19%, 0.61);
      --lumo-shade-70pct: hsla(214, 42%, 18%, 0.72);
      --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
      --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
      --lumo-shade: hsl(214, 35%, 15%);

      /* Contrast */
      --lumo-contrast-5pct: var(--lumo-shade-5pct);
      --lumo-contrast-10pct: var(--lumo-shade-10pct);
      --lumo-contrast-20pct: var(--lumo-shade-20pct);
      --lumo-contrast-30pct: var(--lumo-shade-30pct);
      --lumo-contrast-40pct: var(--lumo-shade-40pct);
      --lumo-contrast-50pct: var(--lumo-shade-50pct);
      --lumo-contrast-60pct: var(--lumo-shade-60pct);
      --lumo-contrast-70pct: var(--lumo-shade-70pct);
      --lumo-contrast-80pct: var(--lumo-shade-80pct);
      --lumo-contrast-90pct: var(--lumo-shade-90pct);
      --lumo-contrast: var(--lumo-shade);

      /* Text */
      --lumo-header-text-color: var(--lumo-contrast);
      --lumo-body-text-color: var(--lumo-contrast-90pct);
      --lumo-secondary-text-color: var(--lumo-contrast-70pct);
      --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
      --lumo-disabled-text-color: var(--lumo-contrast-30pct);

      /* Primary */
      --lumo-primary-color: hsl(214, 90%, 52%);
      --lumo-primary-color-50pct: hsla(214, 90%, 52%, 0.5);
      --lumo-primary-color-10pct: hsla(214, 90%, 52%, 0.1);
      --lumo-primary-text-color: var(--lumo-primary-color);
      --lumo-primary-contrast-color: #FFF;

      /* Error */
      --lumo-error-color: hsl(3, 100%, 61%);
      --lumo-error-color-50pct: hsla(3, 100%, 60%, 0.5);
      --lumo-error-color-10pct: hsla(3, 100%, 60%, 0.1);
      --lumo-error-text-color: hsl(3, 92%, 53%);
      --lumo-error-contrast-color: #FFF;

      /* Success */
      --lumo-success-color: hsl(145, 80%, 42%); /* hsl(144,82%,37%); */
      --lumo-success-color-50pct: hsla(145, 76%, 44%, 0.55);
      --lumo-success-color-10pct: hsla(145, 76%, 44%, 0.12);
      --lumo-success-text-color: hsl(145, 100%, 32%);
      --lumo-success-contrast-color: #FFF;
    }
  </style>
</custom-style><dom-module id="lumo-color">
  <template>
    <style>
      [theme~="dark"] {
        /* Base (background) */
        --lumo-base-color: hsl(214, 35%, 21%);

        /* Tint */
        --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
        --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
        --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
        --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
        --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
        --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
        --lumo-tint-60pct: hsla(214, 82%, 90%, 0.6);
        --lumo-tint-70pct: hsla(214, 87%, 92%, 0.7);
        --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
        --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
        --lumo-tint: hsl(214, 100%, 98%);

        /* Shade */
        --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
        --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
        --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
        --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
        --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
        --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
        --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
        --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
        --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
        --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
        --lumo-shade: hsl(214, 33%, 13%);

        /* Contrast */
        --lumo-contrast-5pct: var(--lumo-tint-5pct);
        --lumo-contrast-10pct: var(--lumo-tint-10pct);
        --lumo-contrast-20pct: var(--lumo-tint-20pct);
        --lumo-contrast-30pct: var(--lumo-tint-30pct);
        --lumo-contrast-40pct: var(--lumo-tint-40pct);
        --lumo-contrast-50pct: var(--lumo-tint-50pct);
        --lumo-contrast-60pct: var(--lumo-tint-60pct);
        --lumo-contrast-70pct: var(--lumo-tint-70pct);
        --lumo-contrast-80pct: var(--lumo-tint-80pct);
        --lumo-contrast-90pct: var(--lumo-tint-90pct);
        --lumo-contrast: var(--lumo-tint);

        /* Text */
        --lumo-header-text-color: var(--lumo-contrast);
        --lumo-body-text-color: var(--lumo-contrast-90pct);
        --lumo-secondary-text-color: var(--lumo-contrast-70pct);
        --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
        --lumo-disabled-text-color: var(--lumo-contrast-30pct);

        /* Primary */
        --lumo-primary-color: hsl(214, 86%, 55%);
        --lumo-primary-color-50pct: hsla(214, 86%, 55%, 0.5);
        --lumo-primary-color-10pct: hsla(214, 90%, 63%, 0.1);
        --lumo-primary-text-color: hsl(214, 100%, 70%);
        --lumo-primary-contrast-color: #FFF;

        /* Error */
        --lumo-error-color: hsl(3, 90%, 63%);
        --lumo-error-color-50pct: hsla(3, 90%, 63%, 0.5);
        --lumo-error-color-10pct: hsla(3, 90%, 63%, 0.1);
        --lumo-error-text-color: hsl(3, 100%, 67%);

        /* Success */
        --lumo-success-color: hsl(145, 65%, 42%);
        --lumo-success-color-50pct: hsla(145, 65%, 42%, 0.5);
        --lumo-success-color-10pct: hsla(145, 65%, 42%, 0.1);
        --lumo-success-text-color: hsl(145, 85%, 47%);
      }

      html {
        color: var(--lumo-body-text-color);
        background-color: var(--lumo-base-color);
      }

      [theme~="dark"] {
        color: var(--lumo-body-text-color);
        background-color: var(--lumo-base-color);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--lumo-header-text-color);
      }

      a {
        color: var(--lumo-primary-text-color);
      }

      blockquote {
        color: var(--lumo-secondary-text-color);
      }

      code,
      pre {
        background-color: var(--lumo-contrast-10pct);
        border-radius: var(--lumo-border-radius-m);
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-color-legacy">
  <template>
    <style include="lumo-color">
      :host {
        color: var(--lumo-body-text-color) !important;
        background-color: var(--lumo-base-color) !important;
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
/* Only needed for IE11 when you want to use the dark palette inside the light palette */

/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

;
},{"./version.js":"../node_modules/@vaadin/vaadin-lumo-styles/version.js","@polymer/polymer/lib/elements/custom-style.js":"../node_modules/@polymer/polymer/lib/elements/custom-style.js","@polymer/polymer/lib/elements/dom-module.js":"../node_modules/@polymer/polymer/lib/elements/dom-module.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/sizing.js":[function(require,module,exports) {
"use strict";

require("./version.js");

require("@polymer/polymer/lib/elements/custom-style.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
      --lumo-size-xs: 1.625rem;
      --lumo-size-s: 1.875rem;
      --lumo-size-m: 2.25rem;
      --lumo-size-l: 2.75rem;
      --lumo-size-xl: 3.5rem;

      /* Icons */
      --lumo-icon-size-s: 1.25em;
      --lumo-icon-size-m: 1.5em;
      --lumo-icon-size-l: 2.25em;
      /* For backwards compatibility */
      --lumo-icon-size: var(--lumo-icon-size-m);
    }
  </style>
</custom-style>`;
document.head.appendChild($_documentContainer.content);
},{"./version.js":"../node_modules/@vaadin/vaadin-lumo-styles/version.js","@polymer/polymer/lib/elements/custom-style.js":"../node_modules/@polymer/polymer/lib/elements/custom-style.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/spacing.js":[function(require,module,exports) {
"use strict";

require("./version.js");

require("@polymer/polymer/lib/elements/custom-style.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
      /* Square */
      --lumo-space-xs: 0.25rem;
      --lumo-space-s: 0.5rem;
      --lumo-space-m: 1rem;
      --lumo-space-l: 1.5rem;
      --lumo-space-xl: 2.5rem;

      /* Wide */
      --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
      --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
      --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
      --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
      --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

      /* Tall */
      --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
      --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
      --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
      --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
      --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
    }
  </style>
</custom-style>`;
document.head.appendChild($_documentContainer.content);
},{"./version.js":"../node_modules/@vaadin/vaadin-lumo-styles/version.js","@polymer/polymer/lib/elements/custom-style.js":"../node_modules/@polymer/polymer/lib/elements/custom-style.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/style.js":[function(require,module,exports) {
"use strict";

require("./version.js");

require("@polymer/polymer/lib/elements/custom-style.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
      /* Border radius */
      --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
      --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
      --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */
      --lumo-border-radius: 0.25em; /* Deprecated */

      /* Shadow */
      --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
      --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
      --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
      --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
      --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

      /* Clickable element cursor */
      --lumo-clickable-cursor: default;
    }
  </style>
</custom-style>`;
document.head.appendChild($_documentContainer.content);
},{"./version.js":"../node_modules/@vaadin/vaadin-lumo-styles/version.js","@polymer/polymer/lib/elements/custom-style.js":"../node_modules/@polymer/polymer/lib/elements/custom-style.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/typography.js":[function(require,module,exports) {
"use strict";

require("./version.js");

require("@polymer/polymer/lib/elements/custom-style.js");

require("@polymer/polymer/lib/elements/dom-module.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
      /* Font families */
      --lumo-font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

      /* Font sizes */
      --lumo-font-size-xxs: .75rem;
      --lumo-font-size-xs: .8125rem;
      --lumo-font-size-s: .875rem;
      --lumo-font-size-m: 1rem;
      --lumo-font-size-l: 1.125rem;
      --lumo-font-size-xl: 1.375rem;
      --lumo-font-size-xxl: 1.75rem;
      --lumo-font-size-xxxl: 2.5rem;

      /* Line heights */
      --lumo-line-height-xs: 1.25;
      --lumo-line-height-s: 1.375;
      --lumo-line-height-m: 1.625;
    }

  </style>
</custom-style><dom-module id="lumo-typography">
  <template>
    <style>
      html {
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size, var(--lumo-font-size-m));
        line-height: var(--lumo-line-height-m);
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Can’t combine with the above selector because that doesn’t work in browsers without native shadow dom */
      :host {
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size, var(--lumo-font-size-m));
        line-height: var(--lumo-line-height-m);
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      small,
      [theme~="font-size-s"] {
        font-size: var(--lumo-font-size-s);
        line-height: var(--lumo-line-height-s);
      }

      [theme~="font-size-xs"] {
        font-size: var(--lumo-font-size-xs);
        line-height: var(--lumo-line-height-xs);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 600;
        line-height: var(--lumo-line-height-xs);
        margin-top: 1.25em;
      }

      h1 {
        font-size: var(--lumo-font-size-xxxl);
        margin-bottom: 0.75em;
      }

      h2 {
        font-size: var(--lumo-font-size-xxl);
        margin-bottom: 0.5em;
      }

      h3 {
        font-size: var(--lumo-font-size-xl);
        margin-bottom: 0.5em;
      }

      h4 {
        font-size: var(--lumo-font-size-l);
        margin-bottom: 0.5em;
      }

      h5 {
        font-size: var(--lumo-font-size-m);
        margin-bottom: 0.25em;
      }

      h6 {
        font-size: var(--lumo-font-size-xs);
        margin-bottom: 0;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      p,
      blockquote {
        margin-top: 0.5em;
        margin-bottom: 0.75em;
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      hr {
        display: block;
        align-self: stretch;
        height: 1px;
        border: 0;
        padding: 0;
        margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
        background-color: var(--lumo-contrast-10pct);
      }

      blockquote {
        border-left: 2px solid var(--lumo-contrast-30pct);
      }

      b,
      strong {
        font-weight: 600;
      }

      /* RTL specific styles */

      blockquote[dir="rtl"] {
        border-left: none;
        border-right: 2px solid var(--lumo-contrast-30pct);
      }

    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
},{"./version.js":"../node_modules/@vaadin/vaadin-lumo-styles/version.js","@polymer/polymer/lib/elements/custom-style.js":"../node_modules/@polymer/polymer/lib/elements/custom-style.js","@polymer/polymer/lib/elements/dom-module.js":"../node_modules/@polymer/polymer/lib/elements/dom-module.js"}],"../node_modules/@polymer/polymer/lib/utils/html-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlLiteral = exports.html = void 0;

require("./boot.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Class representing a static string value which can be used to filter
 * strings by asseting that they have been created via this class. The
 * `value` property returns the string passed to the constructor.
 */
class LiteralString {
  constructor(string) {
    /** @type {string} */
    this.value = string.toString();
  }
  /**
   * @return {string} LiteralString string value
   * @override
   */


  toString() {
    return this.value;
  }

}
/**
 * @param {*} value Object to stringify into HTML
 * @return {string} HTML stringified form of `obj`
 */


function literalValue(value) {
  if (value instanceof LiteralString) {
    return (
      /** @type {!LiteralString} */
      value.value
    );
  } else {
    throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${value}`);
  }
}
/**
 * @param {*} value Object to stringify into HTML
 * @return {string} HTML stringified form of `obj`
 */


function htmlValue(value) {
  if (value instanceof HTMLTemplateElement) {
    return (
      /** @type {!HTMLTemplateElement } */
      value.innerHTML
    );
  } else if (value instanceof LiteralString) {
    return literalValue(value);
  } else {
    throw new Error(`non-template value passed to Polymer's html function: ${value}`);
  }
}
/**
 * A template literal tag that creates an HTML <template> element from the
 * contents of the string.
 *
 * This allows you to write a Polymer Template in JavaScript.
 *
 * Templates can be composed by interpolating `HTMLTemplateElement`s in
 * expressions in the JavaScript template literal. The nested template's
 * `innerHTML` is included in the containing template.  The only other
 * values allowed in expressions are those returned from `htmlLiteral`
 * which ensures only literal values from JS source ever reach the HTML, to
 * guard against XSS risks.
 *
 * All other values are disallowed in expressions to help prevent XSS
 * attacks; however, `htmlLiteral` can be used to compose static
 * string values into templates. This is useful to compose strings into
 * places that do not accept html, like the css text of a `style`
 * element.
 *
 * Example:
 *
 *     static get template() {
 *       return html`
 *         <style>:host{ content:"..." }</style>
 *         <div class="shadowed">${this.partialTemplate}</div>
 *         ${super.template}
 *       `;
 *     }
 *     static get partialTemplate() { return html`<span>Partial!</span>`; }
 *
 * @param {!ITemplateArray} strings Constant parts of tagged template literal
 * @param {...*} values Variable parts of tagged template literal
 * @return {!HTMLTemplateElement} Constructed HTMLTemplateElement
 */


const html = function html(strings, ...values) {
  const template =
  /** @type {!HTMLTemplateElement} */
  document.createElement('template');
  template.innerHTML = values.reduce((acc, v, idx) => acc + htmlValue(v) + strings[idx + 1], strings[0]);
  return template;
};
/**
 * An html literal tag that can be used with `html` to compose.
 * a literal string.
 *
 * Example:
 *
 *     static get template() {
 *       return html`
 *         <style>
 *           :host { display: block; }
 *           ${this.styleTemplate()}
 *         </style>
 *         <div class="shadowed">${staticValue}</div>
 *         ${super.template}
 *       `;
 *     }
 *     static get styleTemplate() {
 *        return htmlLiteral`.shadowed { background: gray; }`;
 *     }
 *
 * @param {!ITemplateArray} strings Constant parts of tagged template literal
 * @param {...*} values Variable parts of tagged template literal
 * @return {!LiteralString} Constructed literal string
 */


exports.html = html;

const htmlLiteral = function (strings, ...values) {
  return new LiteralString(values.reduce((acc, v, idx) => acc + literalValue(v) + strings[idx + 1], strings[0]));
};

exports.htmlLiteral = htmlLiteral;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js"}],"../node_modules/@vaadin/vaadin-button/theme/lumo/vaadin-button-styles.js":[function(require,module,exports) {
"use strict";

require("@vaadin/vaadin-lumo-styles/color.js");

require("@vaadin/vaadin-lumo-styles/sizing.js");

require("@vaadin/vaadin-lumo-styles/spacing.js");

require("@vaadin/vaadin-lumo-styles/style.js");

require("@vaadin/vaadin-lumo-styles/typography.js");

var _htmlTag = require("@polymer/polymer/lib/utils/html-tag.js");

const $_documentContainer = (0, _htmlTag.html)`<dom-module id="lumo-button" theme-for="vaadin-button">
  <template>
    <style>
      :host {
        /* Sizing */
        --lumo-button-size: var(--lumo-size-m);
        min-width: calc(var(--lumo-button-size) * 2);
        height: var(--lumo-button-size);
        padding: 0 calc(var(--lumo-button-size) / 3 + var(--lumo-border-radius) / 2);
        margin: var(--lumo-space-xs) 0;
        box-sizing: border-box;
        /* Style */
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-m);
        font-weight: 500;
        color: var(--_lumo-button-color, var(--lumo-primary-text-color));
        background-color: var(--_lumo-button-background-color, var(--lumo-contrast-5pct));
        border-radius: var(--lumo-border-radius);
        cursor: default;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Set only for the internal parts so we don’t affect the host vertical alignment */
      [part="label"],
      [part="prefix"],
      [part="suffix"] {
        line-height: var(--lumo-line-height-xs);
      }

      [part="label"] {
        padding: calc(var(--lumo-button-size) / 6) 0;
      }

      :host([theme~="small"]) {
        font-size: var(--lumo-font-size-s);
        --lumo-button-size: var(--lumo-size-s);
      }

      :host([theme~="large"]) {
        font-size: var(--lumo-font-size-l);
        --lumo-button-size: var(--lumo-size-l);
      }

      /* This needs to be the last selector for it to take priority */
      :host([disabled][disabled]) {
        pointer-events: none;
        color: var(--lumo-disabled-text-color);
        background-color: var(--lumo-contrast-5pct);
      }

      /* For interaction states */
      :host::before,
      :host::after {
        content: "";
        /* We rely on the host always being relative */
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
      }

      /* Hover */

      :host(:hover)::before {
        opacity: 0.05;
      }

      /* Disable hover for touch devices */
      @media (pointer: coarse) {
        :host(:not([active]):hover)::before {
          opacity: 0;
        }
      }

      /* Active */

      :host::after {
        transition: opacity 1.4s, transform 0.1s;
        filter: blur(8px);
      }

      :host([active])::before {
        opacity: 0.1;
        transition-duration: 0s;
      }

      :host([active])::after {
        opacity: 0.1;
        transition-duration: 0s, 0s;
        transform: scale(0);
      }

      /* Keyboard focus */

      :host([focus-ring]) {
        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      /* Types (primary, tertiary, tertiary-inline */

      :host([theme~="tertiary"]),
      :host([theme~="tertiary-inline"]) {
        background-color: transparent !important;
        transition: opacity 0.2s;
        min-width: 0;
      }

      :host([theme~="tertiary"])::before,
      :host([theme~="tertiary-inline"])::before {
        display: none;
      }

      :host([theme~="tertiary"]) {
        padding: 0 calc(var(--lumo-button-size) / 6);
      }

      @media (hover: hover) {
        :host([theme*="tertiary"]:not([active]):hover) {
          opacity: 0.8;
        }
      }

      :host([theme~="tertiary"][active]),
      :host([theme~="tertiary-inline"][active]) {
        opacity: 0.5;
        transition-duration: 0s;
      }

      :host([theme~="tertiary-inline"]) {
        margin: 0;
        height: auto;
        padding: 0;
        line-height: inherit;
        font-size: inherit;
      }

      :host([theme~="tertiary-inline"]) [part="label"] {
        padding: 0;
        overflow: visible;
        line-height: inherit;
      }

      :host([theme~="primary"]) {
        background-color: var(--_lumo-button-primary-background-color, var(--lumo-primary-color));
        color: var(--_lumo-button-primary-color, var(--lumo-primary-contrast-color));
        font-weight: 600;
        min-width: calc(var(--lumo-button-size) * 2.5);
      }

      :host([theme~="primary"][disabled]) {
        background-color: var(--lumo-primary-color-50pct);
        color: var(--lumo-primary-contrast-color);
      }

      :host([theme~="primary"]:hover)::before {
        opacity: 0.1;
      }

      :host([theme~="primary"][active])::before {
        background-color: var(--lumo-shade-20pct);
      }

      @media (pointer: coarse) {
        :host([theme~="primary"][active])::before {
          background-color: var(--lumo-shade-60pct);
        }

        :host([theme~="primary"]:not([active]):hover)::before {
          opacity: 0;
        }
      }

      :host([theme~="primary"][active])::after {
        opacity: 0.2;
      }

      /* Colors (success, error, contrast) */

      :host([theme~="success"]) {
        color: var(--lumo-success-text-color);
      }

      :host([theme~="success"][theme~="primary"]) {
        background-color: var(--lumo-success-color);
        color: var(--lumo-success-contrast-color);
      }

      :host([theme~="success"][theme~="primary"][disabled]) {
        background-color: var(--lumo-success-color-50pct);
      }

      :host([theme~="error"]) {
        color: var(--lumo-error-text-color);
      }

      :host([theme~="error"][theme~="primary"]) {
        background-color: var(--lumo-error-color);
        color: var(--lumo-error-contrast-color);
      }

      :host([theme~="error"][theme~="primary"][disabled]) {
        background-color: var(--lumo-error-color-50pct);
      }

      :host([theme~="contrast"]) {
        color: var(--lumo-contrast);
      }

      :host([theme~="contrast"][theme~="primary"]) {
        background-color: var(--lumo-contrast);
        color: var(--lumo-base-color);
      }

      :host([theme~="contrast"][theme~="primary"][disabled]) {
        background-color: var(--lumo-contrast-50pct);
      }

      /* Icons */

      [part] ::slotted(iron-icon) {
        display: inline-block;
        width: var(--lumo-icon-size-m);
        height: var(--lumo-icon-size-m);
      }

      /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
      [part] ::slotted(iron-icon[icon^="vaadin:"]) {
        padding: 0.25em;
        box-sizing: border-box !important;
      }

      [part="prefix"] {
        margin-left: -0.25em;
        margin-right: 0.25em;
      }

      [part="suffix"] {
        margin-left: 0.25em;
        margin-right: -0.25em;
      }

      /* Icon-only */

      :host([theme~="icon"]:not([theme~="tertiary-inline"])) {
        min-width: var(--lumo-button-size);
        padding-left: calc(var(--lumo-button-size) / 4);
        padding-right: calc(var(--lumo-button-size) / 4);
      }

      :host([theme~="icon"]) [part="prefix"],
      :host([theme~="icon"]) [part="suffix"] {
        margin-left: 0;
        margin-right: 0;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="prefix"] {
        margin-left: 0.25em;
        margin-right: -0.25em;
      }

      :host([dir="rtl"]) [part="suffix"] {
        margin-left: -0.25em;
        margin-right: 0.25em;
      }

      :host([dir="rtl"][theme~="icon"]) [part="prefix"],
      :host([dir="rtl"][theme~="icon"]) [part="suffix"] {
        margin-left: 0;
        margin-right: 0;
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
},{"@vaadin/vaadin-lumo-styles/color.js":"../node_modules/@vaadin/vaadin-lumo-styles/color.js","@vaadin/vaadin-lumo-styles/sizing.js":"../node_modules/@vaadin/vaadin-lumo-styles/sizing.js","@vaadin/vaadin-lumo-styles/spacing.js":"../node_modules/@vaadin/vaadin-lumo-styles/spacing.js","@vaadin/vaadin-lumo-styles/style.js":"../node_modules/@vaadin/vaadin-lumo-styles/style.js","@vaadin/vaadin-lumo-styles/typography.js":"../node_modules/@vaadin/vaadin-lumo-styles/typography.js","@polymer/polymer/lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js"}],"../node_modules/@polymer/polymer/lib/utils/mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedupingMixin = void 0;

require("./boot.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// unique global id for deduping mixins.
let dedupeId = 0;
/**
 * @constructor
 * @extends {Function}
 * @private
 */

function MixinFunction() {}
/** @type {(WeakMap | undefined)} */


MixinFunction.prototype.__mixinApplications;
/** @type {(Object | undefined)} */

MixinFunction.prototype.__mixinSet;
/* eslint-disable valid-jsdoc */

/**
 * Wraps an ES6 class expression mixin such that the mixin is only applied
 * if it has not already been applied its base argument. Also memoizes mixin
 * applications.
 *
 * @template T
 * @param {T} mixin ES6 class expression mixin to wrap
 * @return {T}
 * @suppress {invalidCasts}
 */

const dedupingMixin = function (mixin) {
  let mixinApplications =
  /** @type {!MixinFunction} */
  mixin.__mixinApplications;

  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    /** @type {!MixinFunction} */

    mixin.__mixinApplications = mixinApplications;
  } // maintain a unique id for each mixin


  let mixinDedupeId = dedupeId++;

  function dedupingMixin(base) {
    let baseSet =
    /** @type {!MixinFunction} */
    base.__mixinSet;

    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }

    let map = mixinApplications;
    let extended = map.get(base);

    if (!extended) {
      extended =
      /** @type {!Function} */
      mixin(base);
      map.set(base, extended); // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.

      let mixinSet = Object.create(
      /** @type {!MixinFunction} */
      extended.__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */

      extended.__mixinSet = mixinSet;
    }

    return extended;
  }

  return dedupingMixin;
};
/* eslint-enable valid-jsdoc */


exports.dedupingMixin = dedupingMixin;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js"}],"../node_modules/@polymer/polymer/lib/utils/wrap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = void 0;

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* eslint-disable valid-jsdoc */

/**
 * Node wrapper to ensure ShadowDOM safe operation regardless of polyfill
 * presence or mode. Note that with the introduction of `ShadyDOM.noPatch`,
 * a node wrapper must be used to access ShadowDOM API.
 * This is similar to using `Polymer.dom` but relies exclusively
 * on the presence of the ShadyDOM polyfill rather than requiring the loading
 * of legacy (Polymer.dom) API.
 * @type {function(Node):Node}
 */
const wrap = window['ShadyDOM'] && window['ShadyDOM']['noPatch'] && window['ShadyDOM']['wrap'] ? window['ShadyDOM']['wrap'] : window['ShadyDOM'] ? n => ShadyDOM['patch'](n) : n => n;
exports.wrap = wrap;
},{}],"../node_modules/@polymer/polymer/lib/utils/path.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPath = isPath;
exports.root = root;
exports.isAncestor = isAncestor;
exports.isDescendant = isDescendant;
exports.translate = translate;
exports.matches = matches;
exports.normalize = normalize;
exports.split = split;
exports.get = get;
exports.set = set;
exports.isDeep = void 0;

require("./boot.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Module with utilities for manipulating structured data path strings.
 *
 * @summary Module with utilities for manipulating structured data path strings.
 */

/**
 * Returns true if the given string is a structured data path (has dots).
 *
 * Example:
 *
 * ```
 * isPath('foo.bar.baz') // true
 * isPath('foo')         // false
 * ```
 *
 * @param {string} path Path string
 * @return {boolean} True if the string contained one or more dots
 */
function isPath(path) {
  return path.indexOf('.') >= 0;
}
/**
 * Returns the root property name for the given path.
 *
 * Example:
 *
 * ```
 * root('foo.bar.baz') // 'foo'
 * root('foo')         // 'foo'
 * ```
 *
 * @param {string} path Path string
 * @return {string} Root property name
 */


function root(path) {
  let dotIndex = path.indexOf('.');

  if (dotIndex === -1) {
    return path;
  }

  return path.slice(0, dotIndex);
}
/**
 * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
 * Returns true if the given path is an ancestor of the base path.
 *
 * Example:
 *
 * ```
 * isAncestor('foo.bar', 'foo')         // true
 * isAncestor('foo.bar', 'foo.bar')     // false
 * isAncestor('foo.bar', 'foo.bar.baz') // false
 * ```
 *
 * @param {string} base Path string to test against.
 * @param {string} path Path string to test.
 * @return {boolean} True if `path` is an ancestor of `base`.
 */


function isAncestor(base, path) {
  //     base.startsWith(path + '.');
  return base.indexOf(path + '.') === 0;
}
/**
 * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
 *
 * Example:
 *
 * ```
 * isDescendant('foo.bar', 'foo.bar.baz') // true
 * isDescendant('foo.bar', 'foo.bar')     // false
 * isDescendant('foo.bar', 'foo')         // false
 * ```
 *
 * @param {string} base Path string to test against.
 * @param {string} path Path string to test.
 * @return {boolean} True if `path` is a descendant of `base`.
 */


function isDescendant(base, path) {
  //     path.startsWith(base + '.');
  return path.indexOf(base + '.') === 0;
}
/**
 * Replaces a previous base path with a new base path, preserving the
 * remainder of the path.
 *
 * User must ensure `path` has a prefix of `base`.
 *
 * Example:
 *
 * ```
 * translate('foo.bar', 'zot', 'foo.bar.baz') // 'zot.baz'
 * ```
 *
 * @param {string} base Current base string to remove
 * @param {string} newBase New base string to replace with
 * @param {string} path Path to translate
 * @return {string} Translated string
 */


function translate(base, newBase, path) {
  return newBase + path.slice(base.length);
}
/**
 * @param {string} base Path string to test against
 * @param {string} path Path string to test
 * @return {boolean} True if `path` is equal to `base`
 */


function matches(base, path) {
  return base === path || isAncestor(base, path) || isDescendant(base, path);
}
/**
 * Converts array-based paths to flattened path.  String-based paths
 * are returned as-is.
 *
 * Example:
 *
 * ```
 * normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
 * normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
 * ```
 *
 * @param {string | !Array<string|number>} path Input path
 * @return {string} Flattened path
 */


function normalize(path) {
  if (Array.isArray(path)) {
    let parts = [];

    for (let i = 0; i < path.length; i++) {
      let args = path[i].toString().split('.');

      for (let j = 0; j < args.length; j++) {
        parts.push(args[j]);
      }
    }

    return parts.join('.');
  } else {
    return path;
  }
}
/**
 * Splits a path into an array of property names. Accepts either arrays
 * of path parts or strings.
 *
 * Example:
 *
 * ```
 * split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
 * split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
 * ```
 *
 * @param {string | !Array<string|number>} path Input path
 * @return {!Array<string>} Array of path parts
 * @suppress {checkTypes}
 */


function split(path) {
  if (Array.isArray(path)) {
    return normalize(path).split('.');
  }

  return path.toString().split('.');
}
/**
 * Reads a value from a path.  If any sub-property in the path is `undefined`,
 * this method returns `undefined` (will never throw.
 *
 * @param {Object} root Object from which to dereference path from
 * @param {string | !Array<string|number>} path Path to read
 * @param {Object=} info If an object is provided to `info`, the normalized
 *  (flattened) path will be set to `info.path`.
 * @return {*} Value at path, or `undefined` if the path could not be
 *  fully dereferenced.
 */


function get(root, path, info) {
  let prop = root;
  let parts = split(path); // Loop over path parts[0..n-1] and dereference

  for (let i = 0; i < parts.length; i++) {
    if (!prop) {
      return;
    }

    let part = parts[i];
    prop = prop[part];
  }

  if (info) {
    info.path = parts.join('.');
  }

  return prop;
}
/**
 * Sets a value to a path.  If any sub-property in the path is `undefined`,
 * this method will no-op.
 *
 * @param {Object} root Object from which to dereference path from
 * @param {string | !Array<string|number>} path Path to set
 * @param {*} value Value to set to path
 * @return {string | undefined} The normalized version of the input path
 */


function set(root, path, value) {
  let prop = root;
  let parts = split(path);
  let last = parts[parts.length - 1];

  if (parts.length > 1) {
    // Loop over path parts[0..n-2] and dereference
    for (let i = 0; i < parts.length - 1; i++) {
      let part = parts[i];
      prop = prop[part];

      if (!prop) {
        return;
      }
    } // Set value to object at end of path


    prop[last] = value;
  } else {
    // Simple property set
    prop[path] = value;
  }

  return parts.join('.');
}
/**
 * Returns true if the given string is a structured data path (has dots).
 *
 * This function is deprecated.  Use `isPath` instead.
 *
 * Example:
 *
 * ```
 * isDeep('foo.bar.baz') // true
 * isDeep('foo')         // false
 * ```
 *
 * @deprecated
 * @param {string} path Path string
 * @return {boolean} True if the string contained one or more dots
 */


const isDeep = isPath;
exports.isDeep = isDeep;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js"}],"../node_modules/@polymer/polymer/lib/utils/case-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashToCamelCase = dashToCamelCase;
exports.camelToDashCase = camelToDashCase;

require("./boot.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const caseMap = {};
const DASH_TO_CAMEL = /-[a-z]/g;
const CAMEL_TO_DASH = /([A-Z])/g;
/**
 * @fileoverview Module with utilities for converting between "dash-case" and
 * "camelCase" identifiers.
 */

/**
 * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
 * (e.g. `fooBarBaz`).
 *
 * @param {string} dash Dash-case identifier
 * @return {string} Camel-case representation of the identifier
 */

function dashToCamelCase(dash) {
  return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, m => m[1].toUpperCase()));
}
/**
 * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
 * (e.g. `foo-bar-baz`).
 *
 * @param {string} camel Camel-case identifier
 * @return {string} Dash-case representation of the identifier
 */


function camelToDashCase(camel) {
  return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
}
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js"}],"../node_modules/@polymer/polymer/lib/utils/async.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.microTask = exports.idlePeriod = exports.animationFrame = exports.timeOut = void 0;

require("./boot.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * @fileoverview
 *
 * This module provides a number of strategies for enqueuing asynchronous
 * tasks. Each sub-module provides a standard `run(fn)` interface that returns a
 * handle, and a `cancel(handle)` interface for canceling async tasks before
 * they run.
 *
 * @summary Module that provides a number of strategies for enqueuing
 * asynchronous tasks.
 */
// Microtask implemented using Mutation Observer
let microtaskCurrHandle = 0;
let microtaskLastHandle = 0;
let microtaskCallbacks = [];
let microtaskNodeContent = 0;
let microtaskScheduled = false;
let microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, {
  characterData: true
});

function microtaskFlush() {
  microtaskScheduled = false;
  const len = microtaskCallbacks.length;

  for (let i = 0; i < len; i++) {
    let cb = microtaskCallbacks[i];

    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(() => {
          throw e;
        });
      }
    }
  }

  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}
/**
 * Async interface wrapper around `setTimeout`.
 *
 * @namespace
 * @summary Async interface wrapper around `setTimeout`.
 */


const timeOut = {
  /**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof timeOut
   * @param {number=} delay Time to wait before calling callbacks in ms
   * @return {!AsyncInterface} An async timeout interface
   */
  after(delay) {
    return {
      run(fn) {
        return window.setTimeout(fn, delay);
      },

      cancel(handle) {
        window.clearTimeout(handle);
      }

    };
  },

  /**
   * Enqueues a function called in the next task.
   *
   * @memberof timeOut
   * @param {!Function} fn Callback to run
   * @param {number=} delay Delay in milliseconds
   * @return {number} Handle used for canceling task
   */
  run(fn, delay) {
    return window.setTimeout(fn, delay);
  },

  /**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    window.clearTimeout(handle);
  }

};
exports.timeOut = timeOut;

/**
 * Async interface wrapper around `requestAnimationFrame`.
 *
 * @namespace
 * @summary Async interface wrapper around `requestAnimationFrame`.
 */
const animationFrame = {
  /**
   * Enqueues a function called at `requestAnimationFrame` timing.
   *
   * @memberof animationFrame
   * @param {function(number):void} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestAnimationFrame(fn);
  },

  /**
   * Cancels a previously enqueued `animationFrame` callback.
   *
   * @memberof animationFrame
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    window.cancelAnimationFrame(handle);
  }

};
exports.animationFrame = animationFrame;

/**
 * Async interface wrapper around `requestIdleCallback`.  Falls back to
 * `setTimeout` on browsers that do not support `requestIdleCallback`.
 *
 * @namespace
 * @summary Async interface wrapper around `requestIdleCallback`.
 */
const idlePeriod = {
  /**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof idlePeriod
   * @param {function(!IdleDeadline):void} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestIdleCallback ? window.requestIdleCallback(fn) : window.setTimeout(fn, 16);
  },

  /**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    window.cancelIdleCallback ? window.cancelIdleCallback(handle) : window.clearTimeout(handle);
  }

};
exports.idlePeriod = idlePeriod;

/**
 * Async interface for enqueuing callbacks that run at microtask timing.
 *
 * Note that microtask timing is achieved via a single `MutationObserver`,
 * and thus callbacks enqueued with this API will all run in a single
 * batch, and not interleaved with other microtasks such as promises.
 * Promises are avoided as an implementation choice for the time being
 * due to Safari bugs that cause Promises to lack microtask guarantees.
 *
 * @namespace
 * @summary Async interface for enqueuing callbacks that run at microtask
 *   timing.
 */
const microTask = {
  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(callback) {
    if (!microtaskScheduled) {
      microtaskScheduled = true;
      microtaskNode.textContent = microtaskNodeContent++;
    }

    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },

  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    const idx = handle - microtaskLastHandle;

    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }

      microtaskCallbacks[idx] = null;
    }
  }

};
exports.microTask = microTask;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js"}],"../node_modules/@polymer/polymer/lib/mixins/properties-changed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertiesChanged = void 0;

require("../utils/boot.js");

var _mixin = require("../utils/mixin.js");

var _async = require("../utils/async.js");

var _wrap = require("../utils/wrap.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/** @const {!AsyncInterface} */
const microtask = _async.microTask;
/**
 * Element class mixin that provides basic meta-programming for creating one
 * or more property accessors (getter/setter pair) that enqueue an async
 * (batched) `_propertiesChanged` callback.
 *
 * For basic usage of this mixin, call `MyClass.createProperties(props)`
 * once at class definition time to create property accessors for properties
 * named in props, implement `_propertiesChanged` to react as desired to
 * property changes, and implement `static get observedAttributes()` and
 * include lowercase versions of any property names that should be set from
 * attributes. Last, call `this._enableProperties()` in the element's
 * `connectedCallback` to enable the accessors.
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin for reacting to property changes from
 *   generated property accessors.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */

const PropertiesChanged = (0, _mixin.dedupingMixin)(
/**
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
superClass => {
  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   */
  class PropertiesChanged extends superClass {
    /**
     * Creates property accessors for the given property names.
     * @param {!Object} props Object whose keys are names of accessors.
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createProperties(props) {
      const proto = this.prototype;

      for (let prop in props) {
        // don't stomp an existing accessor
        if (!(prop in proto)) {
          proto._createPropertyAccessor(prop);
        }
      }
    }
    /**
     * Returns an attribute name that corresponds to the given property.
     * The attribute name is the lowercased property name. Override to
     * customize this mapping.
     * @param {string} property Property to convert
     * @return {string} Attribute name corresponding to the given property.
     *
     * @protected
     * @nocollapse
     */


    static attributeNameForProperty(property) {
      return property.toLowerCase();
    }
    /**
     * Override point to provide a type to which to deserialize a value to
     * a given property.
     * @param {string} name Name of property
     *
     * @protected
     * @nocollapse
     */


    static typeForProperty(name) {} //eslint-disable-line no-unused-vars

    /**
     * Creates a setter/getter pair for the named property with its own
     * local storage.  The getter returns the value in the local storage,
     * and the setter calls `_setProperty`, which updates the local storage
     * for the property and enqueues a `_propertiesChanged` callback.
     *
     * This method may be called on a prototype or an instance.  Calling
     * this method may overwrite a property value that already exists on
     * the prototype/instance by creating the accessor.
     *
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created; the
     *   protected `_setProperty` function must be used to set the property
     * @return {void}
     * @protected
     * @override
     */


    _createPropertyAccessor(property, readOnly) {
      this._addPropertyToAttributeMap(property);

      if (!this.hasOwnProperty(JSCompiler_renameProperty('__dataHasAccessor', this))) {
        this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
      }

      if (!this.__dataHasAccessor[property]) {
        this.__dataHasAccessor[property] = true;

        this._definePropertyAccessor(property, readOnly);
      }
    }
    /**
     * Adds the given `property` to a map matching attribute names
     * to property names, using `attributeNameForProperty`. This map is
     * used when deserializing attribute values to properties.
     *
     * @param {string} property Name of the property
     * @override
     */


    _addPropertyToAttributeMap(property) {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('__dataAttributes', this))) {
        this.__dataAttributes = Object.assign({}, this.__dataAttributes);
      } // This check is technically not correct; it's an optimization that
      // assumes that if a _property_ name is already in the map (note this is
      // an attr->property map), the property mapped directly to the attribute
      // and it has already been mapped.  This would fail if
      // `attributeNameForProperty` were overridden such that this was not the
      // case.


      let attr = this.__dataAttributes[property];

      if (!attr) {
        attr = this.constructor.attributeNameForProperty(property);
        this.__dataAttributes[attr] = property;
      }

      return attr;
    }
    /**
     * Defines a property accessor for the given property.
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created
     * @return {void}
     * @override
     */


    _definePropertyAccessor(property, readOnly) {
      Object.defineProperty(this, property, {
        /* eslint-disable valid-jsdoc */

        /** @this {PropertiesChanged} */
        get() {
          // Inline for perf instead of using `_getProperty`
          return this.__data[property];
        },

        /** @this {PropertiesChanged} */
        set: readOnly ? function () {} : function (value) {
          // Inline for perf instead of using `_setProperty`
          if (this._setPendingProperty(property, value, true)) {
            this._invalidateProperties();
          }
        }
        /* eslint-enable */

      });
    }

    constructor() {
      super();
      /** @type {boolean} */

      this.__dataEnabled = false;
      this.__dataReady = false;
      this.__dataInvalid = false;
      this.__data = {};
      this.__dataPending = null;
      this.__dataOld = null;
      this.__dataInstanceProps = null;
      /** @type {number} */
      // NOTE: used to track re-entrant calls to `_flushProperties`

      this.__dataCounter = 0;
      this.__serializing = false;

      this._initializeProperties();
    }
    /**
     * Lifecycle callback called when properties are enabled via
     * `_enableProperties`.
     *
     * Users may override this function to implement behavior that is
     * dependent on the element having its property data initialized, e.g.
     * from defaults (initialized from `constructor`, `_initializeProperties`),
     * `attributeChangedCallback`, or values propagated from host e.g. via
     * bindings.  `super.ready()` must be called to ensure the data system
     * becomes enabled.
     *
     * @return {void}
     * @public
     * @override
     */


    ready() {
      this.__dataReady = true;

      this._flushProperties();
    }
    /**
     * Initializes the local storage for property accessors.
     *
     * Provided as an override point for performing any setup work prior
     * to initializing the property accessor system.
     *
     * @return {void}
     * @protected
     * @override
     */


    _initializeProperties() {
      // Capture instance properties; these will be set into accessors
      // during first flush. Don't set them here, since we want
      // these to overwrite defaults/constructor assignments
      for (let p in this.__dataHasAccessor) {
        if (this.hasOwnProperty(p)) {
          this.__dataInstanceProps = this.__dataInstanceProps || {};
          this.__dataInstanceProps[p] = this[p];
          delete this[p];
        }
      }
    }
    /**
     * Called at ready time with bag of instance properties that overwrote
     * accessors when the element upgraded.
     *
     * The default implementation sets these properties back into the
     * setter at ready time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @return {void}
     * @protected
     * @override
     */


    _initializeInstanceProperties(props) {
      Object.assign(this, props);
    }
    /**
     * Updates the local storage for a property (via `_setPendingProperty`)
     * and enqueues a `_proeprtiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {void}
     * @protected
     * @override
     */


    _setProperty(property, value) {
      if (this._setPendingProperty(property, value)) {
        this._invalidateProperties();
      }
    }
    /**
     * Returns the value for the given property.
     * @param {string} property Name of property
     * @return {*} Value for the given property
     * @protected
     * @override
     */


    _getProperty(property) {
      return this.__data[property];
    }
    /* eslint-disable no-unused-vars */

    /**
     * Updates the local storage for a property, records the previous value,
     * and adds it to the set of "pending changes" that will be passed to the
     * `_propertiesChanged` callback.  This method does not enqueue the
     * `_propertiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} ext Not used here; affordance for closure
     * @return {boolean} Returns true if the property changed
     * @protected
     * @override
     */


    _setPendingProperty(property, value, ext) {
      let old = this.__data[property];

      let changed = this._shouldPropertyChange(property, value, old);

      if (changed) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        } // Ensure old is captured from the last turn


        if (this.__dataOld && !(property in this.__dataOld)) {
          this.__dataOld[property] = old;
        }

        this.__data[property] = value;
        this.__dataPending[property] = value;
      }

      return changed;
    }
    /* eslint-enable */

    /**
     * @param {string} property Name of the property
     * @return {boolean} Returns true if the property is pending.
     */


    _isPropertyPending(property) {
      return !!(this.__dataPending && this.__dataPending.hasOwnProperty(property));
    }
    /**
     * Marks the properties as invalid, and enqueues an async
     * `_propertiesChanged` callback.
     *
     * @return {void}
     * @protected
     * @override
     */


    _invalidateProperties() {
      if (!this.__dataInvalid && this.__dataReady) {
        this.__dataInvalid = true;
        microtask.run(() => {
          if (this.__dataInvalid) {
            this.__dataInvalid = false;

            this._flushProperties();
          }
        });
      }
    }
    /**
     * Call to enable property accessor processing. Before this method is
     * called accessor values will be set but side effects are
     * queued. When called, any pending side effects occur immediately.
     * For elements, generally `connectedCallback` is a normal spot to do so.
     * It is safe to call this method multiple times as it only turns on
     * property accessors once.
     *
     * @return {void}
     * @protected
     * @override
     */


    _enableProperties() {
      if (!this.__dataEnabled) {
        this.__dataEnabled = true;

        if (this.__dataInstanceProps) {
          this._initializeInstanceProperties(this.__dataInstanceProps);

          this.__dataInstanceProps = null;
        }

        this.ready();
      }
    }
    /**
     * Calls the `_propertiesChanged` callback with the current set of
     * pending changes (and old values recorded when pending changes were
     * set), and resets the pending set of changes. Generally, this method
     * should not be called in user code.
     *
     * @return {void}
     * @protected
     * @override
     */


    _flushProperties() {
      this.__dataCounter++;
      const props = this.__data;
      const changedProps = this.__dataPending;
      const old = this.__dataOld;

      if (this._shouldPropertiesChange(props, changedProps, old)) {
        this.__dataPending = null;
        this.__dataOld = null;

        this._propertiesChanged(props, changedProps, old);
      }

      this.__dataCounter--;
    }
    /**
     * Called in `_flushProperties` to determine if `_propertiesChanged`
     * should be called. The default implementation returns true if
     * properties are pending. Override to customize when
     * `_propertiesChanged` is called.
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {?Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {?Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @return {boolean} true if changedProps is truthy
     * @override
     */


    _shouldPropertiesChange(currentProps, changedProps, oldProps) {
      // eslint-disable-line no-unused-vars
      return Boolean(changedProps);
    }
    /**
     * Callback called when any properties with accessors created via
     * `_createPropertyAccessor` have been set.
     *
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {?Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {?Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @return {void}
     * @protected
     * @override
     */


    _propertiesChanged(currentProps, changedProps, oldProps) {// eslint-disable-line no-unused-vars
    }
    /**
     * Method called to determine whether a property value should be
     * considered as a change and cause the `_propertiesChanged` callback
     * to be enqueued.
     *
     * The default implementation returns `true` if a strict equality
     * check fails. The method always returns false for `NaN`.
     *
     * Override this method to e.g. provide stricter checking for
     * Objects/Arrays when using immutable patterns.
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     *   and enqueue a `_proeprtiesChanged` callback
     * @protected
     * @override
     */


    _shouldPropertyChange(property, value, old) {
      return (// Strict equality check
        old !== value && ( // This ensures (old==NaN, value==NaN) always returns false
        old === old || value === value)
      );
    }
    /**
     * Implements native Custom Elements `attributeChangedCallback` to
     * set an attribute value to a property via `_attributeToProperty`.
     *
     * @param {string} name Name of attribute that changed
     * @param {?string} old Old attribute value
     * @param {?string} value New attribute value
     * @param {?string} namespace Attribute namespace.
     * @return {void}
     * @suppress {missingProperties} Super may or may not implement the callback
     * @override
     */


    attributeChangedCallback(name, old, value, namespace) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }

      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(name, old, value, namespace);
      }
    }
    /**
     * Deserializes an attribute to its associated property.
     *
     * This method calls the `_deserializeValue` method to convert the string to
     * a typed value.
     *
     * @param {string} attribute Name of attribute to deserialize.
     * @param {?string} value of the attribute.
     * @param {*=} type type to deserialize to, defaults to the value
     * returned from `typeForProperty`
     * @return {void}
     * @override
     */


    _attributeToProperty(attribute, value, type) {
      if (!this.__serializing) {
        const map = this.__dataAttributes;
        const property = map && map[attribute] || attribute;
        this[property] = this._deserializeValue(value, type || this.constructor.typeForProperty(property));
      }
    }
    /**
     * Serializes a property to its associated attribute.
     *
     * @suppress {invalidCasts} Closure can't figure out `this` is an element.
     *
     * @param {string} property Property name to reflect.
     * @param {string=} attribute Attribute name to reflect to.
     * @param {*=} value Property value to refect.
     * @return {void}
     * @override
     */


    _propertyToAttribute(property, attribute, value) {
      this.__serializing = true;
      value = arguments.length < 3 ? this[property] : value;

      this._valueToNodeAttribute(
      /** @type {!HTMLElement} */
      this, value, attribute || this.constructor.attributeNameForProperty(property));

      this.__serializing = false;
    }
    /**
     * Sets a typed value to an HTML attribute on a node.
     *
     * This method calls the `_serializeValue` method to convert the typed
     * value to a string.  If the `_serializeValue` method returns `undefined`,
     * the attribute will be removed (this is the default for boolean
     * type `false`).
     *
     * @param {Element} node Element to set attribute to.
     * @param {*} value Value to serialize.
     * @param {string} attribute Attribute name to serialize to.
     * @return {void}
     * @override
     */


    _valueToNodeAttribute(node, value, attribute) {
      const str = this._serializeValue(value);

      if (attribute === 'class' || attribute === 'name' || attribute === 'slot') {
        node =
        /** @type {?Element} */
        (0, _wrap.wrap)(node);
      }

      if (str === undefined) {
        node.removeAttribute(attribute);
      } else {
        node.setAttribute(attribute, str);
      }
    }
    /**
     * Converts a typed JavaScript value to a string.
     *
     * This method is called when setting JS property values to
     * HTML attributes.  Users may override this method to provide
     * serialization for custom types.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided
     * property  value.
     * @override
     */


    _serializeValue(value) {
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        default:
          return value != null ? value.toString() : undefined;
      }
    }
    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called when reading HTML attribute values to
     * JS properties.  Users may override this method to provide
     * deserialization for custom `type`s. Types for `Boolean`, `String`,
     * and `Number` convert attributes to the expected types.
     *
     * @param {?string} value Value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     * @override
     */


    _deserializeValue(value, type) {
      switch (type) {
        case Boolean:
          return value !== null;

        case Number:
          return Number(value);

        default:
          return value;
      }
    }

  }

  return PropertiesChanged;
});
exports.PropertiesChanged = PropertiesChanged;
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js","../utils/async.js":"../node_modules/@polymer/polymer/lib/utils/async.js","../utils/wrap.js":"../node_modules/@polymer/polymer/lib/utils/wrap.js"}],"../node_modules/@polymer/polymer/lib/mixins/property-accessors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertyAccessors = void 0;

require("../utils/boot.js");

var _mixin = require("../utils/mixin.js");

var _caseMap = require("../utils/case-map.js");

var _propertiesChanged = require("./properties-changed.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
const nativeProperties = {};
let proto = HTMLElement.prototype;

while (proto) {
  let props = Object.getOwnPropertyNames(proto);

  for (let i = 0; i < props.length; i++) {
    nativeProperties[props[i]] = true;
  }

  proto = Object.getPrototypeOf(proto);
}
/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @return {void}
 * @private
 */


function saveAccessorValue(model, property) {
  // Don't read/store value for any native properties since they could throw
  if (!nativeProperties[property]) {
    let value = model[property];

    if (value !== undefined) {
      if (model.__data) {
        // Adding accessor to instance; update the property
        // It is the user's responsibility to call _flushProperties
        model._setPendingProperty(property, value);
      } else {
        // Adding accessor to proto; save proto's value for instance-time use
        if (!model.__dataProto) {
          model.__dataProto = {};
        } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
          model.__dataProto = Object.create(model.__dataProto);
        }

        model.__dataProto[property] = value;
      }
    }
  }
}
/**
 * Element class mixin that provides basic meta-programming for creating one
 * or more property accessors (getter/setter pair) that enqueue an async
 * (batched) `_propertiesChanged` callback.
 *
 * For basic usage of this mixin:
 *
 * -   Declare attributes to observe via the standard `static get
 *     observedAttributes()`. Use `dash-case` attribute names to represent
 *     `camelCase` property names.
 * -   Implement the `_propertiesChanged` callback on the class.
 * -   Call `MyClass.createPropertiesForAttributes()` **once** on the class to
 *     generate property accessors for each observed attribute. This must be
 *     called before the first instance is created, for example, by calling it
 *     before calling `customElements.define`. It can also be called lazily from
 *     the element's `constructor`, as long as it's guarded so that the call is
 *     only made once, when the first instance is created.
 * -   Call `this._enableProperties()` in the element's `connectedCallback` to
 *     enable the accessors.
 *
 * Any `observedAttributes` will automatically be
 * deserialized via `attributeChangedCallback` and set to the associated
 * property using `dash-case`-to-`camelCase` convention.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertiesChanged
 * @summary Element class mixin for reacting to property changes from
 *   generated property accessors.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */


const PropertyAccessors = (0, _mixin.dedupingMixin)(superClass => {
  /**
   * @constructor
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   * @private
   */
  const base = (0, _propertiesChanged.PropertiesChanged)(superClass);
  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyAccessors}
   * @extends {base}
   * @unrestricted
   */

  class PropertyAccessors extends base {
    /**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     * @return {void}
     * @nocollapse
     */
    static createPropertiesForAttributes() {
      let a$ =
      /** @type {?} */
      this.observedAttributes;

      for (let i = 0; i < a$.length; i++) {
        this.prototype._createPropertyAccessor((0, _caseMap.dashToCamelCase)(a$[i]));
      }
    }
    /**
     * Returns an attribute name that corresponds to the given property.
     * By default, converts camel to dash case, e.g. `fooBar` to `foo-bar`.
     * @param {string} property Property to convert
     * @return {string} Attribute name corresponding to the given property.
     *
     * @protected
     * @nocollapse
     */


    static attributeNameForProperty(property) {
      return (0, _caseMap.camelToDashCase)(property);
    }
    /**
     * Overrides PropertiesChanged implementation to initialize values for
     * accessors created for values that already existed on the element
     * prototype.
     *
     * @return {void}
     * @protected
     * @override
     */


    _initializeProperties() {
      if (this.__dataProto) {
        this._initializeProtoProperties(this.__dataProto);

        this.__dataProto = null;
      }

      super._initializeProperties();
    }
    /**
     * Called at instance time with bag of properties that were overwritten
     * by accessors on the prototype when accessors were created.
     *
     * The default implementation sets these properties back into the
     * setter at instance time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @return {void}
     * @protected
     * @override
     */


    _initializeProtoProperties(props) {
      for (let p in props) {
        this._setProperty(p, props[p]);
      }
    }
    /**
     * Ensures the element has the given attribute. If it does not,
     * assigns the given value to the attribute.
     *
     * @suppress {invalidCasts} Closure can't figure out `this` is infact an
     *     element
     *
     * @param {string} attribute Name of attribute to ensure is set.
     * @param {string} value of the attribute.
     * @return {void}
     * @override
     */


    _ensureAttribute(attribute, value) {
      const el =
      /** @type {!HTMLElement} */
      this;

      if (!el.hasAttribute(attribute)) {
        this._valueToNodeAttribute(el, value, attribute);
      }
    }
    /**
     * Overrides PropertiesChanged implemention to serialize objects as JSON.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided property
     *     value.
     * @override
     */


    _serializeValue(value) {
      /* eslint-disable no-fallthrough */
      switch (typeof value) {
        case 'object':
          if (value instanceof Date) {
            return value.toString();
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch (x) {
              return '';
            }
          }

        default:
          return super._serializeValue(value);
      }
    }
    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called by Polymer when reading HTML attribute values to
     * JS properties.  Users may override this method on Polymer element
     * prototypes to provide deserialization for custom `type`s.  Note,
     * the `type` argument is the value of the `type` field provided in the
     * `properties` configuration object for a given property, and is
     * by convention the constructor for the type to deserialize.
     *
     *
     * @param {?string} value Attribute value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     * @override
     */


    _deserializeValue(value, type) {
      /**
       * @type {*}
       */
      let outValue;

      switch (type) {
        case Object:
          try {
            outValue = JSON.parse(
            /** @type {string} */
            value);
          } catch (x) {
            // allow non-JSON literals like Strings and Numbers
            outValue = value;
          }

          break;

        case Array:
          try {
            outValue = JSON.parse(
            /** @type {string} */
            value);
          } catch (x) {
            outValue = null;
            console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
          }

          break;

        case Date:
          outValue = isNaN(value) ? String(value) : Number(value);
          outValue = new Date(outValue);
          break;

        default:
          outValue = super._deserializeValue(value, type);
          break;
      }

      return outValue;
    }
    /* eslint-enable no-fallthrough */

    /**
     * Overrides PropertiesChanged implementation to save existing prototype
     * property value so that it can be reset.
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created
     *
     * When calling on a prototype, any overwritten values are saved in
     * `__dataProto`, and it is up to the subclasser to decide how/when
     * to set those properties back into the accessor.  When calling on an
     * instance, the overwritten value is set via `_setPendingProperty`,
     * and the user should call `_invalidateProperties` or `_flushProperties`
     * for the values to take effect.
     * @protected
     * @return {void}
     * @override
     */


    _definePropertyAccessor(property, readOnly) {
      saveAccessorValue(this, property);

      super._definePropertyAccessor(property, readOnly);
    }
    /**
     * Returns true if this library created an accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if an accessor was created
     * @override
     */


    _hasAccessor(property) {
      return this.__dataHasAccessor && this.__dataHasAccessor[property];
    }
    /**
     * Returns true if the specified property has a pending change.
     *
     * @param {string} prop Property name
     * @return {boolean} True if property has a pending change
     * @protected
     * @override
     */


    _isPropertyPending(prop) {
      return Boolean(this.__dataPending && prop in this.__dataPending);
    }

  }

  return PropertyAccessors;
});
exports.PropertyAccessors = PropertyAccessors;
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js","../utils/case-map.js":"../node_modules/@polymer/polymer/lib/utils/case-map.js","./properties-changed.js":"../node_modules/@polymer/polymer/lib/mixins/properties-changed.js"}],"../node_modules/@polymer/polymer/lib/mixins/template-stamp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateStamp = void 0;

require("../utils/boot.js");

var _mixin = require("../utils/mixin.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// 1.x backwards-compatible auto-wrapper for template type extensions
// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
const templateExtensions = {
  'dom-if': true,
  'dom-repeat': true
};
let placeholderBugDetect = false;
let placeholderBug = false;

function hasPlaceholderBug() {
  if (!placeholderBugDetect) {
    placeholderBugDetect = true;
    const t = document.createElement('textarea');
    t.placeholder = 'a';
    placeholderBug = t.placeholder === t.textContent;
  }

  return placeholderBug;
}
/**
 * Some browsers have a bug with textarea, where placeholder text is copied as
 * a textnode child of the textarea.
 *
 * If the placeholder is a binding, this can break template stamping in two
 * ways.
 *
 * One issue is that when the `placeholder` attribute is removed when the
 * binding is processed, the textnode child of the textarea is deleted, and the
 * template info tries to bind into that node.
 *
 * With `legacyOptimizations` in use, when the template is stamped and the
 * `textarea.textContent` binding is processed, no corresponding node is found
 * because it was removed during parsing. An exception is generated when this
 * binding is updated.
 *
 * With `legacyOptimizations` not in use, the template is cloned before
 * processing and this changes the above behavior. The cloned template also has
 * a value property set to the placeholder and textContent. This prevents the
 * removal of the textContent when the placeholder attribute is removed.
 * Therefore the exception does not occur. However, there is an extra
 * unnecessary binding.
 *
 * @param {!Node} node Check node for placeholder bug
 * @return {void}
 */


function fixPlaceholder(node) {
  if (hasPlaceholderBug() && node.localName === 'textarea' && node.placeholder && node.placeholder === node.textContent) {
    node.textContent = null;
  }
}

function wrapTemplateExtension(node) {
  let is = node.getAttribute('is');

  if (is && templateExtensions[is]) {
    let t = node;
    t.removeAttribute('is');
    node = t.ownerDocument.createElement(is);
    t.parentNode.replaceChild(node, t);
    node.appendChild(t);

    while (t.attributes.length) {
      node.setAttribute(t.attributes[0].name, t.attributes[0].value);
      t.removeAttribute(t.attributes[0].name);
    }
  }

  return node;
}

function findTemplateNode(root, nodeInfo) {
  // recursively ascend tree until we hit root
  let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo); // unwind the stack, returning the indexed node at each level

  if (parent) {
    // note: marginally faster than indexing via childNodes
    // (http://jsperf.com/childnodes-lookup)
    for (let n = parent.firstChild, i = 0; n; n = n.nextSibling) {
      if (nodeInfo.parentIndex === i++) {
        return n;
      }
    }
  } else {
    return root;
  }
} // construct `$` map (from id annotations)


function applyIdToMap(inst, map, node, nodeInfo) {
  if (nodeInfo.id) {
    map[nodeInfo.id] = node;
  }
} // install event listeners (from event annotations)


function applyEventListener(inst, node, nodeInfo) {
  if (nodeInfo.events && nodeInfo.events.length) {
    for (let j = 0, e$ = nodeInfo.events, e; j < e$.length && (e = e$[j]); j++) {
      inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
    }
  }
} // push configuration references at configure time


function applyTemplateInfo(inst, node, nodeInfo, parentTemplateInfo) {
  if (nodeInfo.templateInfo) {
    // Give the node an instance of this templateInfo and set its parent
    node._templateInfo = nodeInfo.templateInfo;
    node._parentTemplateInfo = parentTemplateInfo;
  }
}

function createNodeEventHandler(context, eventName, methodName) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  context = context._methodHost || context;

  let handler = function (e) {
    if (context[methodName]) {
      context[methodName](e, e.detail);
    } else {
      console.warn('listener method `' + methodName + '` not defined');
    }
  };

  return handler;
}
/**
 * Element mixin that provides basic template parsing and stamping, including
 * the following template-related features for stamped templates:
 *
 * - Declarative event listeners (`on-eventname="listener"`)
 * - Map of node id's to stamped node instances (`this.$.id`)
 * - Nested template content caching/removal and re-installation (performance
 *   optimization)
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin that provides basic template parsing and stamping
 */


const TemplateStamp = (0, _mixin.dedupingMixin)(
/**
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
superClass => {
  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_TemplateStamp}
   */
  class TemplateStamp extends superClass {
    /**
     * Scans a template to produce template metadata.
     *
     * Template-specific metadata are stored in the object returned, and node-
     * specific metadata are stored in objects in its flattened `nodeInfoList`
     * array.  Only nodes in the template that were parsed as nodes of
     * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
     * contains an `index` (`childNodes` index in parent) and optionally
     * `parent`, which points to node info of its parent (including its index).
     *
     * The template metadata object returned from this method has the following
     * structure (many fields optional):
     *
     * ```js
     *   {
     *     // Flattened list of node metadata (for nodes that generated metadata)
     *     nodeInfoList: [
     *       {
     *         // `id` attribute for any nodes with id's for generating `$` map
     *         id: {string},
     *         // `on-event="handler"` metadata
     *         events: [
     *           {
     *             name: {string},   // event name
     *             value: {string},  // handler method name
     *           }, ...
     *         ],
     *         // Notes when the template contained a `<slot>` for shady DOM
     *         // optimization purposes
     *         hasInsertionPoint: {boolean},
     *         // For nested `<template>`` nodes, nested template metadata
     *         templateInfo: {object}, // nested template metadata
     *         // Metadata to allow efficient retrieval of instanced node
     *         // corresponding to this metadata
     *         parentInfo: {number},   // reference to parent nodeInfo>
     *         parentIndex: {number},  // index in parent's `childNodes` collection
     *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
     *       },
     *       ...
     *     ],
     *     // When true, the template had the `strip-whitespace` attribute
     *     // or was nested in a template with that setting
     *     stripWhitespace: {boolean},
     *     // For nested templates, nested template content is moved into
     *     // a document fragment stored here; this is an optimization to
     *     // avoid the cost of nested template cloning
     *     content: {DocumentFragment}
     *   }
     * ```
     *
     * This method kicks off a recursive treewalk as follows:
     *
     * ```
     *    _parseTemplate <---------------------+
     *      _parseTemplateContent              |
     *        _parseTemplateNode  <------------|--+
     *          _parseTemplateNestedTemplate --+  |
     *          _parseTemplateChildNodes ---------+
     *          _parseTemplateNodeAttributes
     *            _parseTemplateNodeAttribute
     *
     * ```
     *
     * These methods may be overridden to add custom metadata about templates
     * to either `templateInfo` or `nodeInfo`.
     *
     * Note that this method may be destructive to the template, in that
     * e.g. event annotations may be removed after being noted in the
     * template metadata.
     *
     * @param {!HTMLTemplateElement} template Template to parse
     * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
     *   template, for parsing nested templates
     * @return {!TemplateInfo} Parsed template metadata
     * @nocollapse
     */
    static _parseTemplate(template, outerTemplateInfo) {
      // since a template may be re-used, memo-ize metadata
      if (!template._templateInfo) {
        // TODO(rictic): fix typing
        let
        /** ? */
        templateInfo = template._templateInfo = {};
        templateInfo.nodeInfoList = [];
        templateInfo.nestedTemplate = Boolean(outerTemplateInfo);
        templateInfo.stripWhiteSpace = outerTemplateInfo && outerTemplateInfo.stripWhiteSpace || template.hasAttribute('strip-whitespace'); // TODO(rictic): fix typing

        this._parseTemplateContent(template, templateInfo,
        /** @type {?} */
        {
          parent: null
        });
      }

      return template._templateInfo;
    }
    /**
     * See docs for _parseTemplateNode.
     *
     * @param {!HTMLTemplateElement} template .
     * @param {!TemplateInfo} templateInfo .
     * @param {!NodeInfo} nodeInfo .
     * @return {boolean} .
     * @nocollapse
     */


    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
    }
    /**
     * Parses template node and adds template and node metadata based on
     * the current node, and its `childNodes` and `attributes`.
     *
     * This method may be overridden to add custom node or template specific
     * metadata based on this node.
     *
     * @param {Node} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @nocollapse
     */


    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted = false;
      let element =
      /** @type {!HTMLTemplateElement} */
      node;

      if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
        noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
      } else if (element.localName === 'slot') {
        // For ShadyDom optimization, indicating there is an insertion point
        templateInfo.hasInsertionPoint = true;
      }

      fixPlaceholder(element);

      if (element.firstChild) {
        this._parseTemplateChildNodes(element, templateInfo, nodeInfo);
      }

      if (element.hasAttributes && element.hasAttributes()) {
        noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
      } // Checking `nodeInfo.noted` allows a child node of this node (who gets
      // access to `parentInfo`) to cause the parent to be noted, which
      // otherwise has no return path via `_parseTemplateChildNodes` (used by
      // some optimizations)


      return noted || nodeInfo.noted;
    }
    /**
     * Parses template child nodes for the given root node.
     *
     * This method also wraps whitelisted legacy template extensions
     * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
     * wrappers, collapses text nodes, and strips whitespace from the template
     * if the `templateInfo.stripWhitespace` setting was provided.
     *
     * @param {Node} root Root node whose `childNodes` will be parsed
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {void}
     */


    static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
      if (root.localName === 'script' || root.localName === 'style') {
        return;
      }

      for (let node = root.firstChild, parentIndex = 0, next; node; node = next) {
        // Wrap templates
        if (node.localName == 'template') {
          node = wrapTemplateExtension(node);
        } // collapse adjacent textNodes: fixes an IE issue that can cause
        // text nodes to be inexplicably split =(
        // note that root.normalize() should work but does not so we do this
        // manually.


        next = node.nextSibling;

        if (node.nodeType === Node.TEXT_NODE) {
          let
          /** Node */
          n = next;

          while (n && n.nodeType === Node.TEXT_NODE) {
            node.textContent += n.textContent;
            next = n.nextSibling;
            root.removeChild(n);
            n = next;
          } // optionally strip whitespace


          if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
            root.removeChild(node);
            continue;
          }
        }

        let childInfo =
        /** @type {!NodeInfo} */
        {
          parentIndex,
          parentInfo: nodeInfo
        };

        if (this._parseTemplateNode(node, templateInfo, childInfo)) {
          childInfo.infoIndex = templateInfo.nodeInfoList.push(childInfo) - 1;
        } // Increment if not removed


        if (node.parentNode) {
          parentIndex++;
        }
      }
    }
    /**
     * Parses template content for the given nested `<template>`.
     *
     * Nested template info is stored as `templateInfo` in the current node's
     * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
     * It will then be the responsibility of the host to set it back to the
     * template and for users stamping nested templates to use the
     * `_contentForTemplate` method to retrieve the content for this template
     * (an optimization to avoid the cost of cloning nested template content).
     *
     * @param {HTMLTemplateElement} node Node to parse (a <template>)
     * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
     *   that includes the template `node`
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @nocollapse
     */


    static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
      // TODO(rictic): the type of node should be non-null
      let element =
      /** @type {!HTMLTemplateElement} */
      node;

      let templateInfo = this._parseTemplate(element, outerTemplateInfo);

      let content = templateInfo.content = element.content.ownerDocument.createDocumentFragment();
      content.appendChild(element.content);
      nodeInfo.templateInfo = templateInfo;
      return true;
    }
    /**
     * Parses template node attributes and adds node metadata to `nodeInfo`
     * for nodes of interest.
     *
     * @param {Element} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current
     *     template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @nocollapse
     */


    static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
      // Make copy of original attribute list, since the order may change
      // as attributes are added and removed
      let noted = false;
      let attrs = Array.from(node.attributes);

      for (let i = attrs.length - 1, a; a = attrs[i]; i--) {
        noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
      }

      return noted;
    }
    /**
     * Parses a single template node attribute and adds node metadata to
     * `nodeInfo` for attributes of interest.
     *
     * This implementation adds metadata for `on-event="handler"` attributes
     * and `id` attributes.
     *
     * @param {Element} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @nocollapse
     */


    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      // events (on-*)
      if (name.slice(0, 3) === 'on-') {
        node.removeAttribute(name);
        nodeInfo.events = nodeInfo.events || [];
        nodeInfo.events.push({
          name: name.slice(3),
          value
        });
        return true;
      } // static id
      else if (name === 'id') {
          nodeInfo.id = value;
          return true;
        }

      return false;
    }
    /**
     * Returns the `content` document fragment for a given template.
     *
     * For nested templates, Polymer performs an optimization to cache nested
     * template content to avoid the cost of cloning deeply nested templates.
     * This method retrieves the cached content for a given template.
     *
     * @param {HTMLTemplateElement} template Template to retrieve `content` for
     * @return {DocumentFragment} Content fragment
     * @nocollapse
     */


    static _contentForTemplate(template) {
      let templateInfo =
      /** @type {HTMLTemplateElementWithInfo} */
      template._templateInfo;
      return templateInfo && templateInfo.content || template.content;
    }
    /**
     * Clones the provided template content and returns a document fragment
     * containing the cloned dom.
     *
     * The template is parsed (once and memoized) using this library's
     * template parsing features, and provides the following value-added
     * features:
     * * Adds declarative event listeners for `on-event="handler"` attributes
     * * Generates an "id map" for all nodes with id's under `$` on returned
     *   document fragment
     * * Passes template info including `content` back to templates as
     *   `_templateInfo` (a performance optimization to avoid deep template
     *   cloning)
     *
     * Note that the memoized template parsing process is destructive to the
     * template: attributes for bindings and declarative event listeners are
     * removed after being noted in notes, and any nested `<template>.content`
     * is removed and stored in notes as well.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @param {TemplateInfo=} templateInfo Optional template info associated
     *   with the template to be stamped; if omitted the template will be
     *   automatically parsed.
     * @return {!StampedTemplate} Cloned template content
     * @override
     */


    _stampTemplate(template, templateInfo) {
      // Polyfill support: bootstrap the template if it has not already been
      if (template && !template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(template);
      } // Accepting the `templateInfo` via an argument allows for creating
      // instances of the `templateInfo` by the caller, useful for adding
      // instance-time information to the prototypical data


      templateInfo = templateInfo || this.constructor._parseTemplate(template);
      let nodeInfo = templateInfo.nodeInfoList;
      let content = templateInfo.content || template.content;
      let dom =
      /** @type {DocumentFragment} */
      document.importNode(content, true); // NOTE: ShadyDom optimization indicating there is an insertion point

      dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
      let nodes = dom.nodeList = new Array(nodeInfo.length);
      dom.$ = {};

      for (let i = 0, l = nodeInfo.length, info; i < l && (info = nodeInfo[i]); i++) {
        let node = nodes[i] = findTemplateNode(dom, info);
        applyIdToMap(this, dom.$, node, info);
        applyTemplateInfo(this, node, info, templateInfo);
        applyEventListener(this, node, info);
      }

      dom =
      /** @type {!StampedTemplate} */
      dom; // eslint-disable-line no-self-assign

      return dom;
    }
    /**
     * Adds an event listener by method name for the event provided.
     *
     * This method generates a handler function that looks up the method
     * name at handling time.
     *
     * @param {!EventTarget} node Node to add listener on
     * @param {string} eventName Name of event
     * @param {string} methodName Name of method
     * @param {*=} context Context the method will be called on (defaults
     *   to `node`)
     * @return {Function} Generated handler function
     * @override
     */


    _addMethodEventListenerToNode(node, eventName, methodName, context) {
      context = context || node;
      let handler = createNodeEventHandler(context, eventName, methodName);

      this._addEventListenerToNode(node, eventName, handler);

      return handler;
    }
    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {!EventTarget} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to add
     * @return {void}
     * @override
     */


    _addEventListenerToNode(node, eventName, handler) {
      node.addEventListener(eventName, handler);
    }
    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {!EventTarget} node Node to remove event listener from
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to remove
     * @return {void}
     * @override
     */


    _removeEventListenerFromNode(node, eventName, handler) {
      node.removeEventListener(eventName, handler);
    }

  }

  return TemplateStamp;
});
exports.TemplateStamp = TemplateStamp;
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js"}],"../node_modules/@polymer/polymer/lib/mixins/property-effects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertyEffects = void 0;

require("../utils/boot.js");

var _wrap = require("../utils/wrap.js");

var _mixin = require("../utils/mixin.js");

var _path = require("../utils/path.js");

var _caseMap = require("../utils/case-map.js");

var _propertyAccessors = require("./property-accessors.js");

var _templateStamp = require("./template-stamp.js");

var _settings = require("../utils/settings.js");

/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* for notify, reflect */

/* for annotated effects */
// Monotonically increasing unique ID used for de-duping effects triggered
// from multiple properties in the same turn
let dedupeId = 0;
const NOOP = [];
/**
 * Property effect types; effects are stored on the prototype using these keys
 * @enum {string}
 */

const TYPES = {
  COMPUTE: '__computeEffects',
  REFLECT: '__reflectEffects',
  NOTIFY: '__notifyEffects',
  PROPAGATE: '__propagateEffects',
  OBSERVE: '__observeEffects',
  READ_ONLY: '__readOnly'
};
const COMPUTE_INFO = '__computeInfo';
/** @const {!RegExp} */

const capitalAttributeRegex = /[A-Z]/;
/**
 * @typedef {{
 * name: (string | undefined),
 * structured: (boolean | undefined),
 * wildcard: (boolean | undefined)
 * }}
 */

let DataTrigger; //eslint-disable-line no-unused-vars

/**
 * @typedef {{
 * info: ?,
 * trigger: (!DataTrigger | undefined),
 * fn: (!Function | undefined)
 * }}
 */

let DataEffect; //eslint-disable-line no-unused-vars

/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @param {boolean=} cloneArrays Clone any arrays assigned to the map when
 *   extending a superclass map onto this subclass
 * @return {Object} The own-property map of effects for the given type
 * @private
 */

function ensureOwnEffectMap(model, type, cloneArrays) {
  let effects = model[type];

  if (!effects) {
    effects = model[type] = {};
  } else if (!model.hasOwnProperty(type)) {
    effects = model[type] = Object.create(model[type]);

    if (cloneArrays) {
      for (let p in effects) {
        let protoFx = effects[p]; // Perf optimization over Array.slice

        let instFx = effects[p] = Array(protoFx.length);

        for (let i = 0; i < protoFx.length; i++) {
          instFx[i] = protoFx[i];
        }
      }
    }
  }

  return effects;
} // -- effects ----------------------------------------------

/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!Polymer_PropertyEffects} inst The instance with effects to run
 * @param {?Object} effects Object map of property-to-Array of effects
 * @param {?Object} props Bag of current property changes
 * @param {?Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */


function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
  if (effects) {
    let ran = false;
    const id = dedupeId++;

    for (let prop in props) {
      // Inline `runEffectsForProperty` for perf.
      let rootProperty = hasPaths ? (0, _path.root)(prop) : prop;
      let fxs = effects[rootProperty];

      if (fxs) {
        for (let i = 0, l = fxs.length, fx; i < l && (fx = fxs[i]); i++) {
          if ((!fx.info || fx.info.lastRun !== id) && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
            if (fx.info) {
              fx.info.lastRun = id;
            }

            fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
            ran = true;
          }
        }
      }
    }

    return ran;
  }

  return false;
}
/**
 * Runs a list of effects for a given property.
 *
 * @param {!Polymer_PropertyEffects} inst The instance with effects to run
 * @param {!Object} effects Object map of property-to-Array of effects
 * @param {number} dedupeId Counter used for de-duping effects
 * @param {string} prop Name of changed property
 * @param {*} props Changed properties
 * @param {*} oldProps Old properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */


function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
  let ran = false;
  let rootProperty = hasPaths ? (0, _path.root)(prop) : prop;
  let fxs = effects[rootProperty];

  if (fxs) {
    for (let i = 0, l = fxs.length, fx; i < l && (fx = fxs[i]); i++) {
      if ((!fx.info || fx.info.lastRun !== dedupeId) && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
        if (fx.info) {
          fx.info.lastRun = dedupeId;
        }

        fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
        ran = true;
      }
    }
  }

  return ran;
}
/**
 * Determines whether a property/path that has changed matches the trigger
 * criteria for an effect.  A trigger is a descriptor with the following
 * structure, which matches the descriptors returned from `parseArg`.
 * e.g. for `foo.bar.*`:
 * ```
 * trigger: {
 *   name: 'a.b',
 *   structured: true,
 *   wildcard: true
 * }
 * ```
 * If no trigger is given, the path is deemed to match.
 *
 * @param {string} path Path or property that changed
 * @param {?DataTrigger} trigger Descriptor
 * @return {boolean} Whether the path matched the trigger
 */


function pathMatchesTrigger(path, trigger) {
  if (trigger) {
    let triggerPath =
    /** @type {string} */
    trigger.name;
    return triggerPath == path || !!(trigger.structured && (0, _path.isAncestor)(triggerPath, path)) || !!(trigger.wildcard && (0, _path.isDescendant)(triggerPath, path));
  } else {
    return true;
  }
}
/**
 * Implements the "observer" effect.
 *
 * Calls the method with `info.methodName` on the instance, passing the
 * new and old values.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */


function runObserverEffect(inst, property, props, oldProps, info) {
  let fn = typeof info.method === "string" ? inst[info.method] : info.method;
  let changedProp = info.property;

  if (fn) {
    fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
  } else if (!info.dynamicFn) {
    console.warn('observer method `' + info.method + '` not defined');
  }
}
/**
 * Runs "notify" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * will dispatch path notification events in the case that the property
 * changed was a path and the root property for that path didn't have a
 * "notify" effect.  This is to maintain 1.0 behavior that did not require
 * `notify: true` to ensure object sub-property notifications were
 * sent.
 *
 * @param {!Polymer_PropertyEffects} inst The instance with effects to run
 * @param {Object} notifyProps Bag of properties to notify
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */


function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
  // Notify
  let fxs = inst[TYPES.NOTIFY];
  let notified;
  let id = dedupeId++; // Try normal notify effects; if none, fall back to try path notification

  for (let prop in notifyProps) {
    if (notifyProps[prop]) {
      if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
        notified = true;
      } else if (hasPaths && notifyPath(inst, prop, props)) {
        notified = true;
      }
    }
  } // Flush host if we actually notified and host was batching
  // And the host has already initialized clients; this prevents
  // an issue with a host observing data changes before clients are ready.


  let host;

  if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
    host._invalidateProperties();
  }
}
/**
 * Dispatches {property}-changed events with path information in the detail
 * object to indicate a sub-path of the property was changed.
 *
 * @param {!Polymer_PropertyEffects} inst The element from which to fire the
 *     event
 * @param {string} path The path that was changed
 * @param {Object} props Bag of current property changes
 * @return {boolean} Returns true if the path was notified
 * @private
 */


function notifyPath(inst, path, props) {
  let rootProperty = (0, _path.root)(path);

  if (rootProperty !== path) {
    let eventName = (0, _caseMap.camelToDashCase)(rootProperty) + '-changed';
    dispatchNotifyEvent(inst, eventName, props[path], path);
    return true;
  }

  return false;
}
/**
 * Dispatches {property}-changed events to indicate a property (or path)
 * changed.
 *
 * @param {!Polymer_PropertyEffects} inst The element from which to fire the
 *     event
 * @param {string} eventName The name of the event to send
 *     ('{property}-changed')
 * @param {*} value The value of the changed property
 * @param {string | null | undefined} path If a sub-path of this property
 *     changed, the path that changed (optional).
 * @return {void}
 * @private
 * @suppress {invalidCasts}
 */


function dispatchNotifyEvent(inst, eventName, value, path) {
  let detail = {
    value: value,
    queueProperty: true
  };

  if (path) {
    detail.path = path;
  } // As a performance optimization, we could elide the wrap here since notifying
  // events are non-bubbling and shouldn't need retargeting. However, a very
  // small number of internal tests failed in obscure ways, which may indicate
  // user code relied on timing differences resulting from ShadyDOM flushing
  // as a result of the wrapped `dispatchEvent`.


  (0, _wrap.wrap)(
  /** @type {!HTMLElement} */
  inst).dispatchEvent(new CustomEvent(eventName, {
    detail
  }));
}
/**
 * Implements the "notify" effect.
 *
 * Dispatches a non-bubbling event named `info.eventName` on the instance
 * with a detail object containing the new `value`.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */


function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
  let rootProperty = hasPaths ? (0, _path.root)(property) : property;
  let path = rootProperty != property ? property : null;
  let value = path ? (0, _path.get)(inst, path) : inst.__data[property];

  if (path && value === undefined) {
    value = props[property]; // specifically for .splices
  }

  dispatchNotifyEvent(inst, info.eventName, value, path);
}
/**
 * Handler function for 2-way notification events. Receives context
 * information captured in the `addNotifyListener` closure from the
 * `__notifyListeners` metadata.
 *
 * Sets the value of the notified property to the host property or path.  If
 * the event contained path information, translate that path to the host
 * scope's name for that path first.
 *
 * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
 * @param {!Polymer_PropertyEffects} inst Host element instance handling the
 *     notification event
 * @param {string} fromProp Child element property that was bound
 * @param {string} toPath Host property/path that was bound
 * @param {boolean} negate Whether the binding was negated
 * @return {void}
 * @private
 */


function handleNotification(event, inst, fromProp, toPath, negate) {
  let value;
  let detail =
  /** @type {Object} */
  event.detail;
  let fromPath = detail && detail.path;

  if (fromPath) {
    toPath = (0, _path.translate)(fromProp, toPath, fromPath);
    value = detail && detail.value;
  } else {
    value = event.currentTarget[fromProp];
  }

  value = negate ? !value : value;

  if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
    if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath)) && (!detail || !detail.queueProperty)) {
      inst._invalidateProperties();
    }
  }
}
/**
 * Implements the "reflect" effect.
 *
 * Sets the attribute named `info.attrName` to the given property value.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */


function runReflectEffect(inst, property, props, oldProps, info) {
  let value = inst.__data[property];

  if (_settings.sanitizeDOMValue) {
    value = (0, _settings.sanitizeDOMValue)(value, info.attrName, 'attribute',
    /** @type {Node} */
    inst);
  }

  inst._propertyToAttribute(property, info.attrName, value);
}
/**
 * Runs "computed" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * continues to run computed effects based on the output of each pass until
 * there are no more newly computed properties.  This ensures that all
 * properties that will be computed by the initial set of changes are
 * computed before other effects (binding propagation, observers, and notify)
 * run.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {?Object} changedProps Bag of changed properties
 * @param {?Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */


function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
  let computeEffects = inst[TYPES.COMPUTE];

  if (computeEffects) {
    if (_settings.orderedComputed) {
      // Runs computed effects in efficient order by keeping a topologically-
      // sorted queue of compute effects to run, and inserting subsequently
      // invalidated effects as they are run
      dedupeId++;
      const order = getComputedOrder(inst);
      const queue = [];

      for (let p in changedProps) {
        enqueueEffectsFor(p, computeEffects, queue, order, hasPaths);
      }

      let info;

      while (info = queue.shift()) {
        if (runComputedEffect(inst, '', changedProps, oldProps, info)) {
          enqueueEffectsFor(info.methodInfo, computeEffects, queue, order, hasPaths);
        }
      }

      Object.assign(
      /** @type {!Object} */
      oldProps, inst.__dataOld);
      Object.assign(
      /** @type {!Object} */
      changedProps, inst.__dataPending);
      inst.__dataPending = null;
    } else {
      // Original Polymer 2.x computed effects order, which continues running
      // effects until no further computed properties have been invalidated
      let inputProps = changedProps;

      while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
        Object.assign(
        /** @type {!Object} */
        oldProps, inst.__dataOld);
        Object.assign(
        /** @type {!Object} */
        changedProps, inst.__dataPending);
        inputProps = inst.__dataPending;
        inst.__dataPending = null;
      }
    }
  }
}
/**
 * Inserts a computed effect into a queue, given the specified order. Performs
 * the insert using a binary search.
 *
 * Used by `orderedComputed: true` computed property algorithm.
 *
 * @param {Object} info Property effects metadata
 * @param {Array<Object>} queue Ordered queue of effects
 * @param {Map<string,number>} order Map of computed property name->topological
 *   sort order
 */


const insertEffect = (info, queue, order) => {
  let start = 0;
  let end = queue.length - 1;
  let idx = -1;

  while (start <= end) {
    const mid = start + end >> 1; // Note `methodInfo` is where the computed property name is stored in
    // the effect metadata

    const cmp = order.get(queue[mid].methodInfo) - order.get(info.methodInfo);

    if (cmp < 0) {
      start = mid + 1;
    } else if (cmp > 0) {
      end = mid - 1;
    } else {
      idx = mid;
      break;
    }
  }

  if (idx < 0) {
    idx = end + 1;
  }

  queue.splice(idx, 0, info);
};
/**
 * Inserts all downstream computed effects invalidated by the specified property
 * into the topologically-sorted queue of effects to be run.
 *
 * Used by `orderedComputed: true` computed property algorithm.
 *
 * @param {string} prop Property name
 * @param {Object} computeEffects Computed effects for this element
 * @param {Array<Object>} queue Topologically-sorted queue of computed effects
 *   to be run
 * @param {Map<string,number>} order Map of computed property name->topological
 *   sort order
 * @param {boolean} hasPaths True with `changedProps` contains one or more paths
 */


const enqueueEffectsFor = (prop, computeEffects, queue, order, hasPaths) => {
  const rootProperty = hasPaths ? (0, _path.root)(prop) : prop;
  const fxs = computeEffects[rootProperty];

  if (fxs) {
    for (let i = 0; i < fxs.length; i++) {
      const fx = fxs[i];

      if (fx.info.lastRun !== dedupeId && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
        fx.info.lastRun = dedupeId;
        insertEffect(fx.info, queue, order);
      }
    }
  }
};
/**
 * Generates and retrieves a memoized map of computed property name to its
 * topologically-sorted order.
 *
 * The map is generated by first assigning a "dependency count" to each property
 * (defined as number properties it depends on, including its method for
 * "dynamic functions"). Any properties that have no dependencies are added to
 * the `ready` queue, which are properties whose order can be added to the final
 * order map. Properties are popped off the `ready` queue one by one and a.) added as
 * the next property in the order map, and b.) each property that it is a
 * dependency for has its dep count decremented (and if that property's dep
 * count goes to zero, it is added to the `ready` queue), until all properties
 * have been visited and ordered.
 *
 * Used by `orderedComputed: true` computed property algorithm.
 *
 * @param {!Polymer_PropertyEffects} inst The instance to retrieve the computed
 *   effect order for.
 * @return {Map<string,number>} Map of computed property name->topological sort
 *   order
 */


function getComputedOrder(inst) {
  let ordered = inst.constructor.__orderedComputedDeps;

  if (!ordered) {
    ordered = new Map();
    const effects = inst[TYPES.COMPUTE];
    let {
      counts,
      ready,
      total
    } = dependencyCounts(inst);
    let curr;

    while (curr = ready.shift()) {
      ordered.set(curr, ordered.size);
      const computedByCurr = effects[curr];

      if (computedByCurr) {
        computedByCurr.forEach(fx => {
          // Note `methodInfo` is where the computed property name is stored
          const computedProp = fx.info.methodInfo;
          --total;

          if (--counts[computedProp] === 0) {
            ready.push(computedProp);
          }
        });
      }
    }

    if (total !== 0) {
      const el =
      /** @type {HTMLElement} */
      inst;
      console.warn(`Computed graph for ${el.localName} incomplete; circular?`);
    }

    inst.constructor.__orderedComputedDeps = ordered;
  }

  return ordered;
}
/**
 * Generates a map of property-to-dependency count (`counts`, where "dependency
 * count" is the number of dependencies a given property has assuming it is a
 * computed property, otherwise 0).  It also returns a pre-populated list of
 * `ready` properties that have no dependencies and a `total` count, which is
 * used for error-checking the graph.
 *
 * Used by `orderedComputed: true` computed property algorithm.
 *
 * @param {!Polymer_PropertyEffects} inst The instance to generate dependency
 *   counts for.
 * @return {!Object} Object containing `counts` map (property-to-dependency
 *   count) and pre-populated `ready` array of properties that had zero
 *   dependencies.
 */


function dependencyCounts(inst) {
  const infoForComputed = inst[COMPUTE_INFO];
  const counts = {};
  const computedDeps = inst[TYPES.COMPUTE];
  const ready = [];
  let total = 0; // Count dependencies for each computed property

  for (let p in infoForComputed) {
    const info = infoForComputed[p]; // Be sure to add the method name itself in case of "dynamic functions"

    total += counts[p] = info.args.filter(a => !a.literal).length + (info.dynamicFn ? 1 : 0);
  } // Build list of ready properties (that aren't themselves computed)


  for (let p in computedDeps) {
    if (!infoForComputed[p]) {
      ready.push(p);
    }
  }

  return {
    counts,
    ready,
    total
  };
}
/**
 * Implements the "computed property" effect by running the method with the
 * values of the arguments specified in the `info` object and setting the
 * return value to the computed property specified.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {?Object} changedProps Bag of current property changes
 * @param {?Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {boolean} True when the property being computed changed
 * @private
 */


function runComputedEffect(inst, property, changedProps, oldProps, info) {
  // Dirty check dependencies and run if any invalid
  let result = runMethodEffect(inst, property, changedProps, oldProps, info); // Abort if method returns a no-op result

  if (result === NOOP) {
    return false;
  }

  let computedProp = info.methodInfo;

  if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
    return inst._setPendingProperty(computedProp, result, true);
  } else {
    inst[computedProp] = result;
    return false;
  }
}
/**
 * Computes path changes based on path links set up using the `linkPaths`
 * API.
 *
 * @param {!Polymer_PropertyEffects} inst The instance whose props are changing
 * @param {string} path Path that has changed
 * @param {*} value Value of changed path
 * @return {void}
 * @private
 */


function computeLinkedPaths(inst, path, value) {
  let links = inst.__dataLinkedPaths;

  if (links) {
    let link;

    for (let a in links) {
      let b = links[a];

      if ((0, _path.isDescendant)(a, path)) {
        link = (0, _path.translate)(a, b, path);

        inst._setPendingPropertyOrPath(link, value, true, true);
      } else if ((0, _path.isDescendant)(b, path)) {
        link = (0, _path.translate)(b, a, path);

        inst._setPendingPropertyOrPath(link, value, true, true);
      }
    }
  }
} // -- bindings ----------------------------------------------

/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @return {void}
 * @private
 */


function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
  // Create binding metadata and add to nodeInfo
  nodeInfo.bindings = nodeInfo.bindings || [];
  let
  /** Binding */
  binding = {
    kind,
    target,
    parts,
    literal,
    isCompound: parts.length !== 1
  };
  nodeInfo.bindings.push(binding); // Add listener info to binding metadata

  if (shouldAddListener(binding)) {
    let {
      event,
      negate
    } = binding.parts[0];
    binding.listenerEvent = event || (0, _caseMap.camelToDashCase)(target) + '-changed';
    binding.listenerNegate = negate;
  } // Add "propagate" property effects to templateInfo


  let index = templateInfo.nodeInfoList.length;

  for (let i = 0; i < binding.parts.length; i++) {
    let part = binding.parts[i];
    part.compoundIndex = i;
    addEffectForBindingPart(constructor, templateInfo, binding, part, index);
  }
}
/**
 * Adds property effects to the given `templateInfo` for the given binding
 * part.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {number} index Index into `nodeInfoList` for this node
 * @return {void}
 */


function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
  if (!part.literal) {
    if (binding.kind === 'attribute' && binding.target[0] === '-') {
      console.warn('Cannot set attribute ' + binding.target + ' because "-" is not a valid attribute starting character');
    } else {
      let dependencies = part.dependencies;
      let info = {
        index,
        binding,
        part,
        evaluator: constructor
      };

      for (let j = 0; j < dependencies.length; j++) {
        let trigger = dependencies[j];

        if (typeof trigger == 'string') {
          trigger = parseArg(trigger);
          trigger.wildcard = true;
        }

        constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
          fn: runBindingEffect,
          info,
          trigger
        });
      }
    }
  }
}
/**
 * Implements the "binding" (property/path binding) effect.
 *
 * Note that binding syntax is overridable via `_parseBindings` and
 * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
 * non-literal parts returned from `_parseBindings`.  However,
 * there is no support for _path_ bindings via custom binding parts,
 * as this is specific to Polymer's path binding syntax.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} path Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
 *   metadata
 * @return {void}
 * @private
 */


function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
  let node = nodeList[info.index];
  let binding = info.binding;
  let part = info.part; // Subpath notification: transform path and set to client
  // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop

  if (hasPaths && part.source && path.length > part.source.length && binding.kind == 'property' && !binding.isCompound && node.__isPropertyEffectsClient && node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
    let value = props[path];
    path = (0, _path.translate)(part.source, binding.target, path);

    if (node._setPendingPropertyOrPath(path, value, false, true)) {
      inst._enqueueClient(node);
    }
  } else {
    let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths); // Propagate value to child
    // Abort if value is a no-op result


    if (value !== NOOP) {
      applyBindingValue(inst, node, binding, part, value);
    }
  }
}
/**
 * Sets the value for an "binding" (binding) effect to a node,
 * either as a property or attribute.
 *
 * @param {!Polymer_PropertyEffects} inst The instance owning the binding effect
 * @param {Node} node Target node for binding
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {*} value Value to set
 * @return {void}
 * @private
 */


function applyBindingValue(inst, node, binding, part, value) {
  value = computeBindingValue(node, value, binding, part);

  if (_settings.sanitizeDOMValue) {
    value = (0, _settings.sanitizeDOMValue)(value, binding.target, binding.kind, node);
  }

  if (binding.kind == 'attribute') {
    // Attribute binding
    inst._valueToNodeAttribute(
    /** @type {Element} */
    node, value, binding.target);
  } else {
    // Property binding
    let prop = binding.target;

    if (node.__isPropertyEffectsClient && node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
      if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
        if (node._setPendingProperty(prop, value)) {
          inst._enqueueClient(node);
        }
      }
    } else {
      // In legacy no-batching mode, bindings applied before dataReady are
      // equivalent to the "apply config" phase, which only set managed props
      inst._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
}
/**
 * Transforms an "binding" effect value based on compound & negation
 * effect metadata, as well as handling for special-case properties
 *
 * @param {Node} node Node the value will be set to
 * @param {*} value Value to set
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @return {*} Transformed value to set
 * @private
 */


function computeBindingValue(node, value, binding, part) {
  if (binding.isCompound) {
    let storage = node.__dataCompoundStorage[binding.target];
    storage[part.compoundIndex] = value;
    value = storage.join('');
  }

  if (binding.kind !== 'attribute') {
    // Some browsers serialize `undefined` to `"undefined"`
    if (binding.target === 'textContent' || binding.target === 'value' && (node.localName === 'input' || node.localName === 'textarea')) {
      value = value == undefined ? '' : value;
    }
  }

  return value;
}
/**
 * Returns true if a binding's metadata meets all the requirements to allow
 * 2-way binding, and therefore a `<property>-changed` event listener should be
 * added:
 * - used curly braces
 * - is a property (not attribute) binding
 * - is not a textContent binding
 * - is not compound
 *
 * @param {!Binding} binding Binding metadata
 * @return {boolean} True if 2-way listener should be added
 * @private
 */


function shouldAddListener(binding) {
  return Boolean(binding.target) && binding.kind != 'attribute' && binding.kind != 'text' && !binding.isCompound && binding.parts[0].mode === '{';
}
/**
 * Setup compound binding storage structures, notify listeners, and dataHost
 * references onto the bound nodeList.
 *
 * @param {!Polymer_PropertyEffects} inst Instance that bas been previously
 *     bound
 * @param {TemplateInfo} templateInfo Template metadata
 * @return {void}
 * @private
 */


function setupBindings(inst, templateInfo) {
  // Setup compound storage, dataHost, and notify listeners
  let {
    nodeList,
    nodeInfoList
  } = templateInfo;

  if (nodeInfoList.length) {
    for (let i = 0; i < nodeInfoList.length; i++) {
      let info = nodeInfoList[i];
      let node = nodeList[i];
      let bindings = info.bindings;

      if (bindings) {
        for (let i = 0; i < bindings.length; i++) {
          let binding = bindings[i];
          setupCompoundStorage(node, binding);
          addNotifyListener(node, inst, binding);
        }
      } // This ensures all bound elements have a host set, regardless
      // of whether they upgrade synchronous to creation


      node.__dataHost = inst;
    }
  }
}
/**
 * Initializes `__dataCompoundStorage` local storage on a bound node with
 * initial literal data for compound bindings, and sets the joined
 * literal parts to the bound property.
 *
 * When changes to compound parts occur, they are first set into the compound
 * storage array for that property, and then the array is joined to result in
 * the final value set to the property/attribute.
 *
 * @param {Node} node Bound node to initialize
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */


function setupCompoundStorage(node, binding) {
  if (binding.isCompound) {
    // Create compound storage map
    let storage = node.__dataCompoundStorage || (node.__dataCompoundStorage = {});
    let parts = binding.parts; // Copy literals from parts into storage for this binding

    let literals = new Array(parts.length);

    for (let j = 0; j < parts.length; j++) {
      literals[j] = parts[j].literal;
    }

    let target = binding.target;
    storage[target] = literals; // Configure properties with their literal parts

    if (binding.literal && binding.kind == 'property') {
      // Note, className needs style scoping so this needs wrapping.
      // We may also want to consider doing this for `textContent` and
      // `innerHTML`.
      if (target === 'className') {
        node = (0, _wrap.wrap)(node);
      }

      node[target] = binding.literal;
    }
  }
}
/**
 * Adds a 2-way binding notification event listener to the node specified
 *
 * @param {Object} node Child element to add listener to
 * @param {!Polymer_PropertyEffects} inst Host element instance to handle
 *     notification event
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */


function addNotifyListener(node, inst, binding) {
  if (binding.listenerEvent) {
    let part = binding.parts[0];
    node.addEventListener(binding.listenerEvent, function (e) {
      handleNotification(e, inst, binding.target, part.source, part.negate);
    });
  }
} // -- for method-based effects (complexObserver & computed) --------------

/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @return {!Object} Effect metadata for this method effect
 * @private
 */


function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
  dynamicFn = sig.static || dynamicFn && (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]);
  let info = {
    methodName: sig.methodName,
    args: sig.args,
    methodInfo,
    dynamicFn
  };

  for (let i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
    if (!arg.literal) {
      model._addPropertyEffect(arg.rootProperty, type, {
        fn: effectFn,
        info: info,
        trigger: arg
      });
    }
  }

  if (dynamicFn) {
    model._addPropertyEffect(sig.methodName, type, {
      fn: effectFn,
      info: info
    });
  }

  return info;
}
/**
 * Calls a method with arguments marshaled from properties on the instance
 * based on the method signature contained in the effect metadata.
 *
 * Multi-property observers, computed properties, and inline computing
 * functions call this function to invoke the method, then use the return
 * value accordingly.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {*} Returns the return value from the method invocation
 * @private
 */


function runMethodEffect(inst, property, props, oldProps, info) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  let context = inst._methodHost || inst;
  let fn = context[info.methodName];

  if (fn) {
    let args = inst._marshalArgs(info.args, property, props);

    return args === NOOP ? NOOP : fn.apply(context, args);
  } else if (!info.dynamicFn) {
    console.warn('method `' + info.methodName + '` not defined');
  }
}

const emptyArray = []; // Regular expressions used for binding

const IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' + STRING + ')\\s*' + ')';
const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
const ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3

const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
const CLOSE_BRACKET = '(?:]]|}})';
const NEGATE = '(?:(!)\\s*)?'; // Group 2

const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
const bindingRegex = new RegExp(EXPRESSION, "g");
/**
 * Create a string from binding parts of all the literal parts
 *
 * @param {!Array<BindingPart>} parts All parts to stringify
 * @return {string} String made from the literal parts
 */

function literalFromParts(parts) {
  let s = '';

  for (let i = 0; i < parts.length; i++) {
    let literal = parts[i].literal;
    s += literal || '';
  }

  return s;
}
/**
 * Parses an expression string for a method signature, and returns a metadata
 * describing the method in terms of `methodName`, `static` (whether all the
 * arguments are literals), and an array of `args`
 *
 * @param {string} expression The expression to parse
 * @return {?MethodSignature} The method metadata object if a method expression was
 *   found, otherwise `undefined`
 * @private
 */


function parseMethod(expression) {
  // tries to match valid javascript property names
  let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);

  if (m) {
    let methodName = m[1];
    let sig = {
      methodName,
      static: true,
      args: emptyArray
    };

    if (m[2].trim()) {
      // replace escaped commas with comma entity, split on un-escaped commas
      let args = m[2].replace(/\\,/g, '&comma;').split(',');
      return parseArgs(args, sig);
    } else {
      return sig;
    }
  }

  return null;
}
/**
 * Parses an array of arguments and sets the `args` property of the supplied
 * signature metadata object. Sets the `static` property to false if any
 * argument is a non-literal.
 *
 * @param {!Array<string>} argList Array of argument names
 * @param {!MethodSignature} sig Method signature metadata object
 * @return {!MethodSignature} The updated signature metadata object
 * @private
 */


function parseArgs(argList, sig) {
  sig.args = argList.map(function (rawArg) {
    let arg = parseArg(rawArg);

    if (!arg.literal) {
      sig.static = false;
    }

    return arg;
  }, this);
  return sig;
}
/**
 * Parses an individual argument, and returns an argument metadata object
 * with the following fields:
 *
 *   {
 *     value: 'prop',        // property/path or literal value
 *     literal: false,       // whether argument is a literal
 *     structured: false,    // whether the property is a path
 *     rootProperty: 'prop', // the root property of the path
 *     wildcard: false       // whether the argument was a wildcard '.*' path
 *   }
 *
 * @param {string} rawArg The string value of the argument
 * @return {!MethodArg} Argument metadata object
 * @private
 */


function parseArg(rawArg) {
  // clean up whitespace
  let arg = rawArg.trim() // replace comma entity with comma
  .replace(/&comma;/g, ',') // repair extra escape sequences; note only commas strictly need
  // escaping, but we allow any other char to be escaped since its
  // likely users will do this
  .replace(/\\(.)/g, '\$1'); // basic argument descriptor

  let a = {
    name: arg,
    value: '',
    literal: false
  }; // detect literal value (must be String or Number)

  let fc = arg[0];

  if (fc === '-') {
    fc = arg[1];
  }

  if (fc >= '0' && fc <= '9') {
    fc = '#';
  }

  switch (fc) {
    case "'":
    case '"':
      a.value = arg.slice(1, -1);
      a.literal = true;
      break;

    case '#':
      a.value = Number(arg);
      a.literal = true;
      break;
  } // if not literal, look for structured path


  if (!a.literal) {
    a.rootProperty = (0, _path.root)(arg); // detect structured path (has dots)

    a.structured = (0, _path.isPath)(arg);

    if (a.structured) {
      a.wildcard = arg.slice(-2) == '.*';

      if (a.wildcard) {
        a.name = arg.slice(0, -2);
      }
    }
  }

  return a;
}

function getArgValue(data, props, path) {
  let value = (0, _path.get)(data, path); // when data is not stored e.g. `splices`, get the value from changedProps
  // TODO(kschaaf): Note, this can cause a rare issue where the wildcard
  // info.value could pull a stale value out of changedProps during a reentrant
  // change that sets the value back to undefined.
  // https://github.com/Polymer/polymer/issues/5479

  if (value === undefined) {
    value = props[path];
  }

  return value;
} // data api

/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!Polymer_PropertyEffects} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @return {void}
 * @private
 */


function notifySplices(inst, array, path, splices) {
  const splicesData = {
    indexSplices: splices
  }; // Legacy behavior stored splices in `__data__` so it was *not* ephemeral.
  // To match this behavior, we store splices directly on the array.

  if (_settings.legacyUndefined && !inst._overrideLegacyUndefined) {
    array.splices = splicesData;
  }

  inst.notifyPath(path + '.splices', splicesData);
  inst.notifyPath(path + '.length', array.length); // Clear splice data only when it's stored on the array.

  if (_settings.legacyUndefined && !inst._overrideLegacyUndefined) {
    splicesData.indexSplices = [];
  }
}
/**
 * Creates a splice record and sends an array splice notification for
 * the described mutation
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!Polymer_PropertyEffects} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {number} index Index at which the array mutation occurred
 * @param {number} addedCount Number of added items
 * @param {Array} removed Array of removed items
 * @return {void}
 * @private
 */


function notifySplice(inst, array, path, index, addedCount, removed) {
  notifySplices(inst, array, path, [{
    index: index,
    addedCount: addedCount,
    removed: removed,
    object: array,
    type: 'splice'
  }]);
}
/**
 * Returns an upper-cased version of the string.
 *
 * @param {string} name String to uppercase
 * @return {string} Uppercased string
 * @private
 */


function upper(name) {
  return name[0].toUpperCase() + name.substring(1);
}
/**
 * Element class mixin that provides meta-programming for Polymer's template
 * binding and data observation (collectively, "property effects") system.
 *
 * This mixin uses provides the following key static methods for adding
 * property effects to an element class:
 * - `addPropertyEffect`
 * - `createPropertyObserver`
 * - `createMethodObserver`
 * - `createNotifyingProperty`
 * - `createReadOnlyProperty`
 * - `createReflectedProperty`
 * - `createComputedProperty`
 * - `bindTemplate`
 *
 * Each method creates one or more property accessors, along with metadata
 * used by this mixin's implementation of `_propertiesChanged` to perform
 * the property effects.
 *
 * Underscored versions of the above methods also exist on the element
 * prototype for adding property effects on instances at runtime.
 *
 * Note that this mixin overrides several `PropertyAccessors` methods, in
 * many cases to maintain guarantees provided by the Polymer 1.x features;
 * notably it changes property accessors to be synchronous by default
 * whereas the default when using `PropertyAccessors` standalone is to be
 * async by default.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin TemplateStamp
 * @appliesMixin PropertyAccessors
 * @summary Element class mixin that provides meta-programming for Polymer's
 * template binding and data observation system.
 */


const PropertyEffects = (0, _mixin.dedupingMixin)(superClass => {
  /**
   * @constructor
   * @implements {Polymer_PropertyAccessors}
   * @implements {Polymer_TemplateStamp}
   * @unrestricted
   * @private
   */
  const propertyEffectsBase = (0, _templateStamp.TemplateStamp)((0, _propertyAccessors.PropertyAccessors)(superClass));
  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyEffects}
   * @extends {propertyEffectsBase}
   * @unrestricted
   */

  class PropertyEffects extends propertyEffectsBase {
    constructor() {
      super();
      /** @type {boolean} */
      // Used to identify users of this mixin, ala instanceof

      this.__isPropertyEffectsClient = true;
      /** @type {boolean} */

      this.__dataClientsReady;
      /** @type {Array} */

      this.__dataPendingClients;
      /** @type {Object} */

      this.__dataToNotify;
      /** @type {Object} */

      this.__dataLinkedPaths;
      /** @type {boolean} */

      this.__dataHasPaths;
      /** @type {Object} */

      this.__dataCompoundStorage;
      /** @type {Polymer_PropertyEffects} */

      this.__dataHost;
      /** @type {!Object} */

      this.__dataTemp;
      /** @type {boolean} */

      this.__dataClientsInitialized;
      /** @type {!Object} */

      this.__data;
      /** @type {!Object|null} */

      this.__dataPending;
      /** @type {!Object} */

      this.__dataOld;
      /** @type {Object} */

      this.__computeEffects;
      /** @type {Object} */

      this.__computeInfo;
      /** @type {Object} */

      this.__reflectEffects;
      /** @type {Object} */

      this.__notifyEffects;
      /** @type {Object} */

      this.__propagateEffects;
      /** @type {Object} */

      this.__observeEffects;
      /** @type {Object} */

      this.__readOnly;
      /** @type {!TemplateInfo} */

      this.__templateInfo;
      /** @type {boolean} */

      this._overrideLegacyUndefined;
    }

    get PROPERTY_EFFECT_TYPES() {
      return TYPES;
    }
    /**
     * @override
     * @return {void}
     */


    _initializeProperties() {
      super._initializeProperties();

      this._registerHost();

      this.__dataClientsReady = false;
      this.__dataPendingClients = null;
      this.__dataToNotify = null;
      this.__dataLinkedPaths = null;
      this.__dataHasPaths = false; // May be set on instance prior to upgrade

      this.__dataCompoundStorage = this.__dataCompoundStorage || null;
      this.__dataHost = this.__dataHost || null;
      this.__dataTemp = {};
      this.__dataClientsInitialized = false;
    }

    _registerHost() {
      if (hostStack.length) {
        let host = hostStack[hostStack.length - 1];

        host._enqueueClient(this); // This ensures even non-bound elements have a host set, as
        // long as they upgrade synchronously


        this.__dataHost = host;
      }
    }
    /**
     * Overrides `PropertyAccessors` implementation to provide a
     * more efficient implementation of initializing properties from
     * the prototype on the instance.
     *
     * @override
     * @param {Object} props Properties to initialize on the prototype
     * @return {void}
     */


    _initializeProtoProperties(props) {
      this.__data = Object.create(props);
      this.__dataPending = Object.create(props);
      this.__dataOld = {};
    }
    /**
     * Overrides `PropertyAccessors` implementation to avoid setting
     * `_setProperty`'s `shouldNotify: true`.
     *
     * @override
     * @param {Object} props Properties to initialize on the instance
     * @return {void}
     */


    _initializeInstanceProperties(props) {
      let readOnly = this[TYPES.READ_ONLY];

      for (let prop in props) {
        if (!readOnly || !readOnly[prop]) {
          this.__dataPending = this.__dataPending || {};
          this.__dataOld = this.__dataOld || {};
          this.__data[prop] = this.__dataPending[prop] = props[prop];
        }
      }
    } // Prototype setup ----------------------------------------

    /**
     * Equivalent to static `addPropertyEffect` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     */


    _addPropertyEffect(property, type, effect) {
      this._createPropertyAccessor(property, type == TYPES.READ_ONLY); // effects are accumulated into arrays per property based on type


      let effects = ensureOwnEffectMap(this, type, true)[property];

      if (!effects) {
        effects = this[type][property] = [];
      }

      effects.push(effect);
    }
    /**
     * Removes the given property effect.
     *
     * @override
     * @param {string} property Property the effect was associated with
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object to remove
     * @return {void}
     */


    _removePropertyEffect(property, type, effect) {
      let effects = ensureOwnEffectMap(this, type, true)[property];
      let idx = effects.indexOf(effect);

      if (idx >= 0) {
        effects.splice(idx, 1);
      }
    }
    /**
     * Returns whether the current prototype/instance has a property effect
     * of a certain type.
     *
     * @override
     * @param {string} property Property name
     * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */


    _hasPropertyEffect(property, type) {
      let effects = this[type];
      return Boolean(effects && effects[property]);
    }
    /**
     * Returns whether the current prototype/instance has a "read only"
     * accessor for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */


    _hasReadOnlyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.READ_ONLY);
    }
    /**
     * Returns whether the current prototype/instance has a "notify"
     * property effect for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */


    _hasNotifyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.NOTIFY);
    }
    /**
     * Returns whether the current prototype/instance has a "reflect to
     * attribute" property effect for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */


    _hasReflectEffect(property) {
      return this._hasPropertyEffect(property, TYPES.REFLECT);
    }
    /**
     * Returns whether the current prototype/instance has a "computed"
     * property effect for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */


    _hasComputedEffect(property) {
      return this._hasPropertyEffect(property, TYPES.COMPUTE);
    } // Runtime ----------------------------------------

    /**
     * Sets a pending property or path.  If the root property of the path in
     * question had no accessor, the path is set, otherwise it is enqueued
     * via `_setPendingProperty`.
     *
     * This function isolates relatively expensive functionality necessary
     * for the public API (`set`, `setProperties`, `notifyPath`, and property
     * change listeners via {{...}} bindings), such that it is only done
     * when paths enter the system, and not at every propagation step.  It
     * also sets a `__dataHasPaths` flag on the instance which is used to
     * fast-path slower path-matching code in the property effects host paths.
     *
     * `path` can be a path string or array of path parts as accepted by the
     * public API.
     *
     * @override
     * @param {string | !Array<number|string>} path Path to set
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify Set to true if this change should
     *  cause a property notification event dispatch
     * @param {boolean=} isPathNotification If the path being set is a path
     *   notification of an already changed value, as opposed to a request
     *   to set and notify the change.  In the latter `false` case, a dirty
     *   check is performed and then the value is set to the path before
     *   enqueuing the pending property change.
     * @return {boolean} Returns true if the property/path was enqueued in
     *   the pending changes bag.
     * @protected
     */


    _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
      if (isPathNotification || (0, _path.root)(Array.isArray(path) ? path[0] : path) !== path) {
        // Dirty check changes being set to a path against the actual object,
        // since this is the entry point for paths into the system; from here
        // the only dirty checks are against the `__dataTemp` cache to prevent
        // duplicate work in the same turn only. Note, if this was a notification
        // of a change already set to a path (isPathNotification: true),
        // we always let the change through and skip the `set` since it was
        // already dirty checked at the point of entry and the underlying
        // object has already been updated
        if (!isPathNotification) {
          let old = (0, _path.get)(this, path);
          path =
          /** @type {string} */
          (0, _path.set)(this, path, value); // Use property-accessor's simpler dirty check

          if (!path || !super._shouldPropertyChange(path, value, old)) {
            return false;
          }
        }

        this.__dataHasPaths = true;

        if (this._setPendingProperty(
        /**@type{string}*/
        path, value, shouldNotify)) {
          computeLinkedPaths(this,
          /**@type{string}*/
          path, value);
          return true;
        }
      } else {
        if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
          return this._setPendingProperty(
          /**@type{string}*/
          path, value, shouldNotify);
        } else {
          this[path] = value;
        }
      }

      return false;
    }
    /**
     * Applies a value to a non-Polymer element/node's property.
     *
     * The implementation makes a best-effort at binding interop:
     * Some native element properties have side-effects when
     * re-setting the same value (e.g. setting `<input>.value` resets the
     * cursor position), so we do a dirty-check before setting the value.
     * However, for better interop with non-Polymer custom elements that
     * accept objects, we explicitly re-set object changes coming from the
     * Polymer world (which may include deep object changes without the
     * top reference changing), erring on the side of providing more
     * information.
     *
     * Users may override this method to provide alternate approaches.
     *
     * @override
     * @param {!Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @return {void}
     * @protected
     */


    _setUnmanagedPropertyToNode(node, prop, value) {
      // It is a judgment call that resetting primitives is
      // "bad" and resettings objects is also "good"; alternatively we could
      // implement a whitelist of tag & property values that should never
      // be reset (e.g. <input>.value && <select>.value)
      if (value !== node[prop] || typeof value == 'object') {
        // Note, className needs style scoping so this needs wrapping.
        if (prop === 'className') {
          node =
          /** @type {!Node} */
          (0, _wrap.wrap)(node);
        }

        node[prop] = value;
      }
    }
    /**
     * Overrides the `PropertiesChanged` implementation to introduce special
     * dirty check logic depending on the property & value being set:
     *
     * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
     *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
     * 2. Object set to simple property (e.g. 'prop': {...})
     *    Stored in `__dataTemp` and `__data`, dirty checked against
     *    `__dataTemp` by default implementation of `_shouldPropertyChange`
     * 3. Primitive value set to simple property (e.g. 'prop': 42)
     *    Stored in `__data`, dirty checked against `__data`
     *
     * The dirty-check is important to prevent cycles due to two-way
     * notification, but paths and objects are only dirty checked against any
     * previous value set during this turn via a "temporary cache" that is
     * cleared when the last `_propertiesChanged` exits. This is so:
     * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
     *    due to array mutations like shift/unshift/splice; this is fine
     *    since path changes are dirty-checked at user entry points like `set`
     * b. dirty-checking for objects only lasts one turn to allow the user
     *    to mutate the object in-place and re-set it with the same identity
     *    and have all sub-properties re-propagated in a subsequent turn.
     *
     * The temp cache is not necessarily sufficient to prevent invalid array
     * paths, since a splice can happen during the same turn (with pathological
     * user code); we could introduce a "fixup" for temporarily cached array
     * paths if needed: https://github.com/Polymer/polymer/issues/4227
     *
     * @override
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify True if property should fire notification
     *   event (applies only for `notify: true` properties)
     * @return {boolean} Returns true if the property changed
     */


    _setPendingProperty(property, value, shouldNotify) {
      let propIsPath = this.__dataHasPaths && (0, _path.isPath)(property);
      let prevProps = propIsPath ? this.__dataTemp : this.__data;

      if (this._shouldPropertyChange(property, value, prevProps[property])) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        } // Ensure old is captured from the last turn


        if (!(property in this.__dataOld)) {
          this.__dataOld[property] = this.__data[property];
        } // Paths are stored in temporary cache (cleared at end of turn),
        // which is used for dirty-checking, all others stored in __data


        if (propIsPath) {
          this.__dataTemp[property] = value;
        } else {
          this.__data[property] = value;
        } // All changes go into pending property bag, passed to _propertiesChanged


        this.__dataPending[property] = value; // Track properties that should notify separately

        if (propIsPath || this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property]) {
          this.__dataToNotify = this.__dataToNotify || {};
          this.__dataToNotify[property] = shouldNotify;
        }

        return true;
      }

      return false;
    }
    /**
     * Overrides base implementation to ensure all accessors set `shouldNotify`
     * to true, for per-property notification tracking.
     *
     * @override
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {void}
     */


    _setProperty(property, value) {
      if (this._setPendingProperty(property, value, true)) {
        this._invalidateProperties();
      }
    }
    /**
     * Overrides `PropertyAccessor`'s default async queuing of
     * `_propertiesChanged`: if `__dataReady` is false (has not yet been
     * manually flushed), the function no-ops; otherwise flushes
     * `_propertiesChanged` synchronously.
     *
     * @override
     * @return {void}
     */


    _invalidateProperties() {
      if (this.__dataReady) {
        this._flushProperties();
      }
    }
    /**
     * Enqueues the given client on a list of pending clients, whose
     * pending property changes can later be flushed via a call to
     * `_flushClients`.
     *
     * @override
     * @param {Object} client PropertyEffects client to enqueue
     * @return {void}
     * @protected
     */


    _enqueueClient(client) {
      this.__dataPendingClients = this.__dataPendingClients || [];

      if (client !== this) {
        this.__dataPendingClients.push(client);
      }
    }
    /**
     * Flushes any clients previously enqueued via `_enqueueClient`, causing
     * their `_flushProperties` method to run.
     *
     * @override
     * @return {void}
     * @protected
     */


    _flushClients() {
      if (!this.__dataClientsReady) {
        this.__dataClientsReady = true;

        this._readyClients(); // Override point where accessors are turned on; importantly,
        // this is after clients have fully readied, providing a guarantee
        // that any property effects occur only after all clients are ready.


        this.__dataReady = true;
      } else {
        this.__enableOrFlushClients();
      }
    } // NOTE: We ensure clients either enable or flush as appropriate. This
    // handles two corner cases:
    // (1) clients flush properly when connected/enabled before the host
    // enables; e.g.
    //   (a) Templatize stamps with no properties and does not flush and
    //   (b) the instance is inserted into dom and
    //   (c) then the instance flushes.
    // (2) clients enable properly when not connected/enabled when the host
    // flushes; e.g.
    //   (a) a template is runtime stamped and not yet connected/enabled
    //   (b) a host sets a property, causing stamped dom to flush
    //   (c) the stamped dom enables.


    __enableOrFlushClients() {
      let clients = this.__dataPendingClients;

      if (clients) {
        this.__dataPendingClients = null;

        for (let i = 0; i < clients.length; i++) {
          let client = clients[i];

          if (!client.__dataEnabled) {
            client._enableProperties();
          } else if (client.__dataPending) {
            client._flushProperties();
          }
        }
      }
    }
    /**
     * Perform any initial setup on client dom. Called before the first
     * `_flushProperties` call on client dom and before any element
     * observers are called.
     *
     * @override
     * @return {void}
     * @protected
     */


    _readyClients() {
      this.__enableOrFlushClients();
    }
    /**
     * Sets a bag of property changes to this instance, and
     * synchronously processes all effects of the properties as a batch.
     *
     * Property names must be simple properties, not paths.  Batched
     * path propagation is not supported.
     *
     * @override
     * @param {Object} props Bag of one or more key-value pairs whose key is
     *   a property and value is the new value to set for that property.
     * @param {boolean=} setReadOnly When true, any private values set in
     *   `props` will be set. By default, `setProperties` will not set
     *   `readOnly: true` root properties.
     * @return {void}
     * @public
     */


    setProperties(props, setReadOnly) {
      for (let path in props) {
        if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
          //TODO(kschaaf): explicitly disallow paths in setProperty?
          // wildcard observers currently only pass the first changed path
          // in the `info` object, and you could do some odd things batching
          // paths, e.g. {'foo.bar': {...}, 'foo': null}
          this._setPendingPropertyOrPath(path, props[path], true);
        }
      }

      this._invalidateProperties();
    }
    /**
     * Overrides `PropertyAccessors` so that property accessor
     * side effects are not enabled until after client dom is fully ready.
     * Also calls `_flushClients` callback to ensure client dom is enabled
     * that was not enabled as a result of flushing properties.
     *
     * @override
     * @return {void}
     */


    ready() {
      // It is important that `super.ready()` is not called here as it
      // immediately turns on accessors. Instead, we wait until `readyClients`
      // to enable accessors to provide a guarantee that clients are ready
      // before processing any accessors side effects.
      this._flushProperties(); // If no data was pending, `_flushProperties` will not `flushClients`
      // so ensure this is done.


      if (!this.__dataClientsReady) {
        this._flushClients();
      } // Before ready, client notifications do not trigger _flushProperties.
      // Therefore a flush is necessary here if data has been set.


      if (this.__dataPending) {
        this._flushProperties();
      }
    }
    /**
     * Implements `PropertyAccessors`'s properties changed callback.
     *
     * Runs each class of effects for the batch of changed properties in
     * a specific order (compute, propagate, reflect, observe, notify).
     *
     * @override
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {?Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {?Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @return {void}
     */


    _propertiesChanged(currentProps, changedProps, oldProps) {
      // ----------------------------
      // let c = Object.getOwnPropertyNames(changedProps || {});
      // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
      // if (window.debug) { debugger; }
      // ----------------------------
      let hasPaths = this.__dataHasPaths;
      this.__dataHasPaths = false;
      let notifyProps; // Compute properties

      runComputedEffects(this, changedProps, oldProps, hasPaths); // Clear notify properties prior to possible reentry (propagate, observe),
      // but after computing effects have a chance to add to them

      notifyProps = this.__dataToNotify;
      this.__dataToNotify = null; // Propagate properties to clients

      this._propagatePropertyChanges(changedProps, oldProps, hasPaths); // Flush clients


      this._flushClients(); // Reflect properties


      runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths); // Observe properties

      runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths); // Notify properties to host

      if (notifyProps) {
        runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
      } // Clear temporary cache at end of turn


      if (this.__dataCounter == 1) {
        this.__dataTemp = {};
      } // ----------------------------
      // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
      // ----------------------------

    }
    /**
     * Called to propagate any property changes to stamped template nodes
     * managed by this element.
     *
     * @override
     * @param {Object} changedProps Bag of changed properties
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {void}
     * @protected
     */


    _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
      if (this[TYPES.PROPAGATE]) {
        runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
      }

      if (this.__templateInfo) {
        this._runEffectsForTemplate(this.__templateInfo, changedProps, oldProps, hasPaths);
      }
    }

    _runEffectsForTemplate(templateInfo, changedProps, oldProps, hasPaths) {
      const baseRunEffects = (changedProps, hasPaths) => {
        runEffects(this, templateInfo.propertyEffects, changedProps, oldProps, hasPaths, templateInfo.nodeList);

        for (let info = templateInfo.firstChild; info; info = info.nextSibling) {
          this._runEffectsForTemplate(info, changedProps, oldProps, hasPaths);
        }
      };

      if (templateInfo.runEffects) {
        templateInfo.runEffects(baseRunEffects, changedProps, hasPaths);
      } else {
        baseRunEffects(changedProps, hasPaths);
      }
    }
    /**
     * Aliases one data path as another, such that path notifications from one
     * are routed to the other.
     *
     * @override
     * @param {string | !Array<string|number>} to Target path to link.
     * @param {string | !Array<string|number>} from Source path to link.
     * @return {void}
     * @public
     */


    linkPaths(to, from) {
      to = (0, _path.normalize)(to);
      from = (0, _path.normalize)(from);
      this.__dataLinkedPaths = this.__dataLinkedPaths || {};
      this.__dataLinkedPaths[to] = from;
    }
    /**
     * Removes a data path alias previously established with `_linkPaths`.
     *
     * Note, the path to unlink should be the target (`to`) used when
     * linking the paths.
     *
     * @override
     * @param {string | !Array<string|number>} path Target path to unlink.
     * @return {void}
     * @public
     */


    unlinkPaths(path) {
      path = (0, _path.normalize)(path);

      if (this.__dataLinkedPaths) {
        delete this.__dataLinkedPaths[path];
      }
    }
    /**
     * Notify that an array has changed.
     *
     * Example:
     *
     *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
     *     ...
     *     this.items.splice(1, 1, {name: 'Sam'});
     *     this.items.push({name: 'Bob'});
     *     this.notifySplices('items', [
     *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1,
     *         object: this.items, type: 'splice' },
     *       { index: 3, removed: [], addedCount: 1,
     *         object: this.items, type: 'splice'}
     *     ]);
     *
     * @param {string} path Path that should be notified.
     * @param {Array} splices Array of splice records indicating ordered
     *   changes that occurred to the array. Each record should have the
     *   following fields:
     *    * index: index at which the change occurred
     *    * removed: array of items that were removed from this index
     *    * addedCount: number of new items added at this index
     *    * object: a reference to the array in question
     *    * type: the string literal 'splice'
     *
     *   Note that splice records _must_ be normalized such that they are
     *   reported in index order (raw results from `Object.observe` are not
     *   ordered and must be normalized/merged before notifying).
     *
     * @override
     * @return {void}
     * @public
     */


    notifySplices(path, splices) {
      let info = {
        path: ''
      };
      let array =
      /** @type {Array} */
      (0, _path.get)(this, path, info);
      notifySplices(this, array, info.path, splices);
    }
    /**
     * Convenience method for reading a value from a path.
     *
     * Note, if any part in the path is undefined, this method returns
     * `undefined` (this method does not throw when dereferencing undefined
     * paths).
     *
     * @override
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `users.12.name` or `['users', 12, 'name']`).
     * @param {Object=} root Root object from which the path is evaluated.
     * @return {*} Value at the path, or `undefined` if any part of the path
     *   is undefined.
     * @public
     */


    get(path, root) {
      return (0, _path.get)(root || this, path);
    }
    /**
     * Convenience method for setting a value to a path and notifying any
     * elements bound to the same path.
     *
     * Note, if any part in the path except for the last is undefined,
     * this method does nothing (this method does not throw when
     * dereferencing undefined paths).
     *
     * @override
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
     * @param {*} value Value to set at the specified path.
     * @param {Object=} root Root object from which the path is evaluated.
     *   When specified, no notification will occur.
     * @return {void}
     * @public
     */


    set(path, value, root) {
      if (root) {
        (0, _path.set)(root, path, value);
      } else {
        if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][
        /** @type {string} */
        path]) {
          if (this._setPendingPropertyOrPath(path, value, true)) {
            this._invalidateProperties();
          }
        }
      }
    }
    /**
     * Adds items onto the end of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to push onto array
     * @return {number} New length of the array.
     * @public
     */


    push(path, ...items) {
      let info = {
        path: ''
      };
      let array =
      /** @type {Array}*/
      (0, _path.get)(this, path, info);
      let len = array.length;
      let ret = array.push(...items);

      if (items.length) {
        notifySplice(this, array, info.path, len, items.length, []);
      }

      return ret;
    }
    /**
     * Removes an item from the end of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */


    pop(path) {
      let info = {
        path: ''
      };
      let array =
      /** @type {Array} */
      (0, _path.get)(this, path, info);
      let hadLength = Boolean(array.length);
      let ret = array.pop();

      if (hadLength) {
        notifySplice(this, array, info.path, array.length, 0, [ret]);
      }

      return ret;
    }
    /**
     * Starting from the start index specified, removes 0 or more items
     * from the array and inserts 0 or more new items in their place.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.splice`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @param {number} start Index from which to start removing/inserting.
     * @param {number=} deleteCount Number of items to remove.
     * @param {...*} items Items to insert into array.
     * @return {!Array} Array of removed items.
     * @public
     */


    splice(path, start, deleteCount, ...items) {
      let info = {
        path: ''
      };
      let array =
      /** @type {Array} */
      (0, _path.get)(this, path, info); // Normalize fancy native splice handling of crazy start values

      if (start < 0) {
        start = array.length - Math.floor(-start);
      } else if (start) {
        start = Math.floor(start);
      } // array.splice does different things based on the number of arguments
      // you pass in. Therefore, array.splice(0) and array.splice(0, undefined)
      // do different things. In the former, the whole array is cleared. In the
      // latter, no items are removed.
      // This means that we need to detect whether 1. one of the arguments
      // is actually passed in and then 2. determine how many arguments
      // we should pass on to the native array.splice
      //


      let ret; // Omit any additional arguments if they were not passed in

      if (arguments.length === 2) {
        ret = array.splice(start); // Either start was undefined and the others were defined, but in this
        // case we can safely pass on all arguments
        //
        // Note: this includes the case where none of the arguments were passed in,
        // e.g. this.splice('array'). However, if both start and deleteCount
        // are undefined, array.splice will not modify the array (as expected)
      } else {
        ret = array.splice(start, deleteCount, ...items);
      } // At the end, check whether any items were passed in (e.g. insertions)
      // or if the return array contains items (e.g. deletions).
      // Only notify if items were added or deleted.


      if (items.length || ret.length) {
        notifySplice(this, array, info.path, start, items.length, ret);
      }

      return ret;
    }
    /**
     * Removes an item from the beginning of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */


    shift(path) {
      let info = {
        path: ''
      };
      let array =
      /** @type {Array} */
      (0, _path.get)(this, path, info);
      let hadLength = Boolean(array.length);
      let ret = array.shift();

      if (hadLength) {
        notifySplice(this, array, info.path, 0, 0, [ret]);
      }

      return ret;
    }
    /**
     * Adds items onto the beginning of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to insert info array
     * @return {number} New length of the array.
     * @public
     */


    unshift(path, ...items) {
      let info = {
        path: ''
      };
      let array =
      /** @type {Array} */
      (0, _path.get)(this, path, info);
      let ret = array.unshift(...items);

      if (items.length) {
        notifySplice(this, array, info.path, 0, items.length, []);
      }

      return ret;
    }
    /**
     * Notify that a path has changed.
     *
     * Example:
     *
     *     this.item.user.name = 'Bob';
     *     this.notifyPath('item.user.name');
     *
     * @override
     * @param {string} path Path that should be notified.
     * @param {*=} value Value at the path (optional).
     * @return {void}
     * @public
     */


    notifyPath(path, value) {
      /** @type {string} */
      let propPath;

      if (arguments.length == 1) {
        // Get value if not supplied
        let info = {
          path: ''
        };
        value = (0, _path.get)(this, path, info);
        propPath = info.path;
      } else if (Array.isArray(path)) {
        // Normalize path if needed
        propPath = (0, _path.normalize)(path);
      } else {
        propPath =
        /** @type{string} */
        path;
      }

      if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
        this._invalidateProperties();
      }
    }
    /**
     * Equivalent to static `createReadOnlyProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @return {void}
     * @protected
     */


    _createReadOnlyProperty(property, protectedSetter) {
      this._addPropertyEffect(property, TYPES.READ_ONLY);

      if (protectedSetter) {
        this['_set' + upper(property)] =
        /** @this {PropertyEffects} */
        function (value) {
          this._setProperty(property, value);
        };
      }
    }
    /**
     * Equivalent to static `createPropertyObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @param {string|function(*,*)} method Function or name of observer method
     *     to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @return {void}
     * @protected
     */


    _createPropertyObserver(property, method, dynamicFn) {
      let info = {
        property,
        method,
        dynamicFn: Boolean(dynamicFn)
      };

      this._addPropertyEffect(property, TYPES.OBSERVE, {
        fn: runObserverEffect,
        info,
        trigger: {
          name: property
        }
      });

      if (dynamicFn) {
        this._addPropertyEffect(
        /** @type {string} */
        method, TYPES.OBSERVE, {
          fn: runObserverEffect,
          info,
          trigger: {
            name: method
          }
        });
      }
    }
    /**
     * Equivalent to static `createMethodObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     */


    _createMethodObserver(expression, dynamicFn) {
      let sig = parseMethod(expression);

      if (!sig) {
        throw new Error("Malformed observer expression '" + expression + "'");
      }

      createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
    }
    /**
     * Equivalent to static `createNotifyingProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @return {void}
     * @protected
     */


    _createNotifyingProperty(property) {
      this._addPropertyEffect(property, TYPES.NOTIFY, {
        fn: runNotifyEffect,
        info: {
          eventName: (0, _caseMap.camelToDashCase)(property) + '-changed',
          property: property
        }
      });
    }
    /**
     * Equivalent to static `createReflectedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @return {void}
     * @protected
     * @suppress {missingProperties} go/missingfnprops
     */


    _createReflectedProperty(property) {
      let attr = this.constructor.attributeNameForProperty(property);

      if (attr[0] === '-') {
        console.warn('Property ' + property + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.');
      } else {
        this._addPropertyEffect(property, TYPES.REFLECT, {
          fn: runReflectEffect,
          info: {
            attrName: attr
          }
        });
      }
    }
    /**
     * Equivalent to static `createComputedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     */


    _createComputedProperty(property, expression, dynamicFn) {
      let sig = parseMethod(expression);

      if (!sig) {
        throw new Error("Malformed computed expression '" + expression + "'");
      }

      const info = createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn); // Effects are normally stored as map of dependency->effect, but for
      // ordered computation, we also need tree of computedProp->dependencies

      ensureOwnEffectMap(this, COMPUTE_INFO)[property] = info;
    }
    /**
     * Gather the argument values for a method specified in the provided array
     * of argument metadata.
     *
     * The `path` and `value` arguments are used to fill in wildcard descriptor
     * when the method is being called as a result of a path notification.
     *
     * @param {!Array<!MethodArg>} args Array of argument metadata
     * @param {string} path Property/path name that triggered the method effect
     * @param {Object} props Bag of current property changes
     * @return {!Array<*>} Array of argument values
     * @private
     */


    _marshalArgs(args, path, props) {
      const data = this.__data;
      const values = [];

      for (let i = 0, l = args.length; i < l; i++) {
        let {
          name,
          structured,
          wildcard,
          value,
          literal
        } = args[i];

        if (!literal) {
          if (wildcard) {
            const matches = (0, _path.isDescendant)(name, path);
            const pathValue = getArgValue(data, props, matches ? path : name);
            value = {
              path: matches ? path : name,
              value: pathValue,
              base: matches ? (0, _path.get)(data, name) : pathValue
            };
          } else {
            value = structured ? getArgValue(data, props, name) : data[name];
          }
        } // When the `legacyUndefined` flag is enabled, pass a no-op value
        // so that the observer, computed property, or compound binding is aborted.


        if (_settings.legacyUndefined && !this._overrideLegacyUndefined && value === undefined && args.length > 1) {
          return NOOP;
        }

        values[i] = value;
      }

      return values;
    } // -- static class methods ------------

    /**
     * Ensures an accessor exists for the specified property, and adds
     * to a list of "property effects" that will run when the accessor for
     * the specified property is set.  Effects are grouped by "type", which
     * roughly corresponds to a phase in effect processing.  The effect
     * metadata should be in the following form:
     *
     *     {
     *       fn: effectFunction, // Reference to function to call to perform effect
     *       info: { ... }       // Effect metadata passed to function
     *       trigger: {          // Optional triggering metadata; if not provided
     *         name: string      // the property is treated as a wildcard
     *         structured: boolean
     *         wildcard: boolean
     *       }
     *     }
     *
     * Effects are called from `_propertiesChanged` in the following order by
     * type:
     *
     * 1. COMPUTE
     * 2. PROPAGATE
     * 3. REFLECT
     * 4. OBSERVE
     * 5. NOTIFY
     *
     * Effect functions are called with the following signature:
     *
     *     effectFunction(inst, path, props, oldProps, info, hasPaths)
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     * @nocollapse
     */


    static addPropertyEffect(property, type, effect) {
      this.prototype._addPropertyEffect(property, type, effect);
    }
    /**
     * Creates a single-property observer for the given property.
     *
     * @param {string} property Property name
     * @param {string|function(*,*)} method Function or name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @return {void}
     * @protected
     * @nocollapse
     */


    static createPropertyObserver(property, method, dynamicFn) {
      this.prototype._createPropertyObserver(property, method, dynamicFn);
    }
    /**
     * Creates a multi-property "method observer" based on the provided
     * expression, which should be a string in the form of a normal JavaScript
     * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
     * should correspond to a property or path in the context of this
     * prototype (or instance), or may be a literal string or number.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     * @return {void}
     *   whether method names should be included as a dependency to the effect.
     * @protected
     * @nocollapse
     */


    static createMethodObserver(expression, dynamicFn) {
      this.prototype._createMethodObserver(expression, dynamicFn);
    }
    /**
     * Causes the setter for the given property to dispatch `<property>-changed`
     * events to notify of changes to the property.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     * @nocollapse
     */


    static createNotifyingProperty(property) {
      this.prototype._createNotifyingProperty(property);
    }
    /**
     * Creates a read-only accessor for the given property.
     *
     * To set the property, use the protected `_setProperty` API.
     * To create a custom protected setter (e.g. `_setMyProp()` for
     * property `myProp`), pass `true` for `protectedSetter`.
     *
     * Note, if the property will have other property effects, this method
     * should be called first, before adding other effects.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @return {void}
     * @protected
     * @nocollapse
     */


    static createReadOnlyProperty(property, protectedSetter) {
      this.prototype._createReadOnlyProperty(property, protectedSetter);
    }
    /**
     * Causes the setter for the given property to reflect the property value
     * to a (dash-cased) attribute of the same name.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     * @nocollapse
     */


    static createReflectedProperty(property) {
      this.prototype._createReflectedProperty(property);
    }
    /**
     * Creates a computed property whose value is set to the result of the
     * method described by the given `expression` each time one or more
     * arguments to the method changes.  The expression should be a string
     * in the form of a normal JavaScript function signature:
     * `'methodName(arg1, [..., argn])'`
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
     *   method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     * @nocollapse
     */


    static createComputedProperty(property, expression, dynamicFn) {
      this.prototype._createComputedProperty(property, expression, dynamicFn);
    }
    /**
     * Parses the provided template to ensure binding effects are created
     * for them, and then ensures property accessors are created for any
     * dependent properties in the template.  Binding effects for bound
     * templates are stored in a linked list on the instance so that
     * templates can be efficiently stamped and unstamped.
     *
     * @param {!HTMLTemplateElement} template Template containing binding
     *   bindings
     * @return {!TemplateInfo} Template metadata object
     * @protected
     * @nocollapse
     */


    static bindTemplate(template) {
      return this.prototype._bindTemplate(template);
    } // -- binding ----------------------------------------------

    /*
     * Overview of binding flow:
     *
     * During finalization (`instanceBinding==false`, `wasPreBound==false`):
     *  `_bindTemplate(t, false)` called directly during finalization - parses
     *  the template (for the first time), and then assigns that _prototypical_
     *  template info to `__preboundTemplateInfo` _on the prototype_; note in
     *  this case `wasPreBound` is false; this is the first time we're binding
     *  it, thus we create accessors.
     *
     * During first stamping (`instanceBinding==true`, `wasPreBound==true`):
     *   `_stampTemplate` calls `_bindTemplate(t, true)`: the `templateInfo`
     *   returned matches the prebound one, and so this is `wasPreBound == true`
     *   state; thus we _skip_ creating accessors, but _do_ create an instance
     *   of the template info to serve as the start of our linked list (needs to
     *   be an instance, not the prototypical one, so that we can add `nodeList`
     *   to it to contain the `nodeInfo`-ordered list of instance nodes for
     *   bindings, and so we can chain runtime-stamped template infos off of
     *   it). At this point, the call to `_stampTemplate` calls
     *   `applyTemplateInfo` for each nested `<template>` found during parsing
     *   to hand prototypical `_templateInfo` to them; we also pass the _parent_
     *   `templateInfo` to the `<template>` so that we have the instance-time
     *   parent to link the `templateInfo` under in the case it was
     *   runtime-stamped.
     *
     * During subsequent runtime stamping (`instanceBinding==true`,
     *   `wasPreBound==false`): `_stampTemplate` calls `_bindTemplate(t, true)`
     *   - here `templateInfo` is guaranteed to _not_ match the prebound one,
     *   because it was either a different template altogether, or even if it
     *   was the same template, the step above created a instance of the info;
     *   in this case `wasPreBound == false`, so we _do_ create accessors, _and_
     *   link a instance into the linked list.
     */

    /**
     * Equivalent to static `bindTemplate` API but can be called on an instance
     * to add effects at runtime.  See that method for full API docs.
     *
     * This method may be called on the prototype (for prototypical template
     * binding, to avoid creating accessors every instance) once per prototype,
     * and will be called with `runtimeBinding: true` by `_stampTemplate` to
     * create and link an instance of the template metadata associated with a
     * particular stamping.
     *
     * @override
     * @param {!HTMLTemplateElement} template Template containing binding
     * bindings
     * @param {boolean=} instanceBinding When false (default), performs
     * "prototypical" binding of the template and overwrites any previously
     * bound template for the class. When true (as passed from
     * `_stampTemplate`), the template info is instanced and linked into the
     * list of bound templates.
     * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
     * this is an instance of the prototypical template info
     * @protected
     * @suppress {missingProperties} go/missingfnprops
     */


    _bindTemplate(template, instanceBinding) {
      let templateInfo = this.constructor._parseTemplate(template);

      let wasPreBound = this.__preBoundTemplateInfo == templateInfo; // Optimization: since this is called twice for proto-bound templates,
      // don't attempt to recreate accessors if this template was pre-bound

      if (!wasPreBound) {
        for (let prop in templateInfo.propertyEffects) {
          this._createPropertyAccessor(prop);
        }
      }

      if (instanceBinding) {
        // For instance-time binding, create instance of template metadata
        // and link into tree of templates if necessary
        templateInfo =
        /** @type {!TemplateInfo} */
        Object.create(templateInfo);
        templateInfo.wasPreBound = wasPreBound;

        if (!this.__templateInfo) {
          // Set the info to the root of the tree
          this.__templateInfo = templateInfo;
        } else {
          // Append this template info onto the end of its parent template's
          // list, which will determine the tree structure via which property
          // effects are run; if this template was not nested in another
          // template, use the root template (the first stamped one) as the
          // parent. Note, `parent` is the `templateInfo` instance for this
          // template's parent (containing) template, which was set up in
          // `applyTemplateInfo`.  While a given template's `parent` is set
          // apriori, it is only added to the parent's child list at the point
          // that it is being bound, since a template may or may not ever be
          // stamped, and may be stamped more than once (in which case instances
          // of the template info will be in the tree under its parent more than
          // once).
          const parent = template._parentTemplateInfo || this.__templateInfo;
          const previous = parent.lastChild;
          templateInfo.parent = parent;
          parent.lastChild = templateInfo;
          templateInfo.previousSibling = previous;

          if (previous) {
            previous.nextSibling = templateInfo;
          } else {
            parent.firstChild = templateInfo;
          }
        }
      } else {
        this.__preBoundTemplateInfo = templateInfo;
      }

      return templateInfo;
    }
    /**
     * Adds a property effect to the given template metadata, which is run
     * at the "propagate" stage of `_propertiesChanged` when the template
     * has been bound to the element via `_bindTemplate`.
     *
     * The `effect` object should match the format in `_addPropertyEffect`.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     * @nocollapse
     */


    static _addTemplatePropertyEffect(templateInfo, prop, effect) {
      let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
      hostProps[prop] = true;
      let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
      let propEffects = effects[prop] = effects[prop] || [];
      propEffects.push(effect);
    }
    /**
     * Stamps the provided template and performs instance-time setup for
     * Polymer template features, including data bindings, declarative event
     * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
     * is returned containing the stamped DOM, ready for insertion into the
     * DOM.
     *
     * This method may be called more than once; however note that due to
     * `shadycss` polyfill limitations, only styles from templates prepared
     * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
     * to the shadow root and support CSS custom properties), and note that
     * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
     * any styles required by in runtime-stamped templates must be included
     * in the main element template.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @param {TemplateInfo=} templateInfo Optional bound template info associated
     *   with the template to be stamped; if omitted the template will be
     *   automatically bound.
     * @return {!StampedTemplate} Cloned template content
     * @override
     * @protected
     */


    _stampTemplate(template, templateInfo) {
      templateInfo = templateInfo ||
      /** @type {!TemplateInfo} */
      this._bindTemplate(template, true); // Ensures that created dom is `_enqueueClient`'d to this element so
      // that it can be flushed on next call to `_flushProperties`

      hostStack.push(this);

      let dom = super._stampTemplate(template, templateInfo);

      hostStack.pop(); // Add template-instance-specific data to instanced templateInfo

      templateInfo.nodeList = dom.nodeList; // Capture child nodes to allow unstamping of non-prototypical templates

      if (!templateInfo.wasPreBound) {
        let nodes = templateInfo.childNodes = [];

        for (let n = dom.firstChild; n; n = n.nextSibling) {
          nodes.push(n);
        }
      }

      dom.templateInfo = templateInfo; // Setup compound storage, 2-way listeners, and dataHost for bindings

      setupBindings(this, templateInfo); // Flush properties into template nodes; the check on `__dataClientsReady`
      // ensures we don't needlessly run effects for an element's initial
      // prototypical template stamping since they will happen as a part of the
      // first call to `_propertiesChanged`. This flag is set to true
      // after running the initial propagate effects, and immediately before
      // flushing clients. Since downstream clients could cause stamping on
      // this host (e.g. a fastDomIf `dom-if` being forced to render
      // synchronously), this flag ensures effects for runtime-stamped templates
      // are run at this point during the initial element boot-up.

      if (this.__dataClientsReady) {
        this._runEffectsForTemplate(templateInfo, this.__data, null, false);

        this._flushClients();
      }

      return dom;
    }
    /**
     * Removes and unbinds the nodes previously contained in the provided
     * DocumentFragment returned from `_stampTemplate`.
     *
     * @override
     * @param {!StampedTemplate} dom DocumentFragment previously returned
     *   from `_stampTemplate` associated with the nodes to be removed
     * @return {void}
     * @protected
     */


    _removeBoundDom(dom) {
      // Unlink template info; Note that while the child is unlinked from its
      // parent list, a template's `parent` reference is never removed, since
      // this is is determined by the tree structure and applied at
      // `applyTemplateInfo` time.
      const templateInfo = dom.templateInfo;
      const {
        previousSibling,
        nextSibling,
        parent
      } = templateInfo;

      if (previousSibling) {
        previousSibling.nextSibling = nextSibling;
      } else if (parent) {
        parent.firstChild = nextSibling;
      }

      if (nextSibling) {
        nextSibling.previousSibling = previousSibling;
      } else if (parent) {
        parent.lastChild = previousSibling;
      }

      templateInfo.nextSibling = templateInfo.previousSibling = null; // Remove stamped nodes

      let nodes = templateInfo.childNodes;

      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        (0, _wrap.wrap)((0, _wrap.wrap)(node).parentNode).removeChild(node);
      }
    }
    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */


    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      // TODO(https://github.com/google/closure-compiler/issues/3240):
      //     Change back to just super.methodCall()
      let noted = propertyEffectsBase._parseTemplateNode.call(this, node, templateInfo, nodeInfo);

      if (node.nodeType === Node.TEXT_NODE) {
        let parts = this._parseBindings(node.textContent, templateInfo);

        if (parts) {
          // Initialize the textContent with any literal parts
          // NOTE: default to a space here so the textNode remains; some browsers
          // (IE) omit an empty textNode following cloneNode/importNode.
          node.textContent = literalFromParts(parts) || ' ';
          addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
          noted = true;
        }
      }

      return noted;
    }
    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from attributes.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */


    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      let parts = this._parseBindings(value, templateInfo);

      if (parts) {
        // Attribute or property
        let origName = name;
        let kind = 'property'; // The only way we see a capital letter here is if the attr has
        // a capital letter in it per spec. In this case, to make sure
        // this binding works, we go ahead and make the binding to the attribute.

        if (capitalAttributeRegex.test(name)) {
          kind = 'attribute';
        } else if (name[name.length - 1] == '$') {
          name = name.slice(0, -1);
          kind = 'attribute';
        } // Initialize attribute bindings with any literal parts


        let literal = literalFromParts(parts);

        if (literal && kind == 'attribute') {
          // Ensure a ShadyCSS template scoped style is not removed
          // when a class$ binding's initial literal value is set.
          if (name == 'class' && node.hasAttribute('class')) {
            literal += ' ' + node.getAttribute(name);
          }

          node.setAttribute(name, literal);
        } // support disable-upgrade


        if (kind == 'attribute' && origName == 'disable-upgrade$') {
          node.setAttribute(name, '');
        } // Clear attribute before removing, since IE won't allow removing
        // `value` attribute if it previously had a value (can't
        // unconditionally set '' before removing since attributes with `$`
        // can't be set using setAttribute)


        if (node.localName === 'input' && origName === 'value') {
          node.setAttribute(origName, '');
        } // Remove annotation


        node.removeAttribute(origName); // Case hackery: attributes are lower-case, but bind targets
        // (properties) are case sensitive. Gambit is to map dash-case to
        // camel-case: `foo-bar` becomes `fooBar`.
        // Attribute bindings are excepted.

        if (kind === 'property') {
          name = (0, _caseMap.dashToCamelCase)(name);
        }

        addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
        return true;
      } else {
        // TODO(https://github.com/google/closure-compiler/issues/3240):
        //     Change back to just super.methodCall()
        return propertyEffectsBase._parseTemplateNodeAttribute.call(this, node, templateInfo, nodeInfo, name, value);
      }
    }
    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * binding the properties that a nested template depends on to the template
     * as `_host_<property>`.
     *
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */


    static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
      // TODO(https://github.com/google/closure-compiler/issues/3240):
      //     Change back to just super.methodCall()
      let noted = propertyEffectsBase._parseTemplateNestedTemplate.call(this, node, templateInfo, nodeInfo);

      const parent = node.parentNode;
      const nestedTemplateInfo = nodeInfo.templateInfo;
      const isDomIf = parent.localName === 'dom-if';
      const isDomRepeat = parent.localName === 'dom-repeat'; // Remove nested template and redirect its host bindings & templateInfo
      // onto the parent (dom-if/repeat element)'s nodeInfo

      if (_settings.removeNestedTemplates && (isDomIf || isDomRepeat)) {
        parent.removeChild(node); // Use the parent's nodeInfo (for the dom-if/repeat) to record the
        // templateInfo, and use that for any host property bindings below

        nodeInfo = nodeInfo.parentInfo;
        nodeInfo.templateInfo = nestedTemplateInfo; // Ensure the parent dom-if/repeat is noted since it now may have host
        // bindings; it may not have been if it did not have its own bindings

        nodeInfo.noted = true;
        noted = false;
      } // Merge host props into outer template and add bindings


      let hostProps = nestedTemplateInfo.hostProps;

      if (_settings.fastDomIf && isDomIf) {
        // `fastDomIf` mode uses runtime-template stamping to add accessors/
        // effects to properties used in its template; as such we don't need to
        // tax the host element with `_host_` bindings for the `dom-if`.
        // However, in the event it is nested in a `dom-repeat`, it is still
        // important that its host properties are added to the
        // TemplateInstance's `hostProps` so that they are forwarded to the
        // TemplateInstance.
        if (hostProps) {
          templateInfo.hostProps = Object.assign(templateInfo.hostProps || {}, hostProps); // Ensure the dom-if is noted so that it has a __dataHost, since
          // `fastDomIf` uses the host for runtime template stamping; note this
          // was already ensured above in the `removeNestedTemplates` case

          if (!_settings.removeNestedTemplates) {
            nodeInfo.parentInfo.noted = true;
          }
        }
      } else {
        let mode = '{';

        for (let source in hostProps) {
          let parts = [{
            mode,
            source,
            dependencies: [source],
            hostProp: true
          }];
          addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
        }
      }

      return noted;
    }
    /**
     * Called to parse text in a template (either attribute values or
     * textContent) into binding metadata.
     *
     * Any overrides of this method should return an array of binding part
     * metadata  representing one or more bindings found in the provided text
     * and any "literal" text in between.  Any non-literal parts will be passed
     * to `_evaluateBinding` when any dependencies change.  The only required
     * fields of each "part" in the returned array are as follows:
     *
     * - `dependencies` - Array containing trigger metadata for each property
     *   that should trigger the binding to update
     * - `literal` - String containing text if the part represents a literal;
     *   in this case no `dependencies` are needed
     *
     * Additional metadata for use by `_evaluateBinding` may be provided in
     * each part object as needed.
     *
     * The default implementation handles the following types of bindings
     * (one or more may be intermixed with literal strings):
     * - Property binding: `[[prop]]`
     * - Path binding: `[[object.prop]]`
     * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
     * - Two-way property or path bindings (supports negation):
     *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
     * - Inline computed method (supports negation):
     *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
     *
     * The default implementation uses a regular expression for best
     * performance. However, the regular expression uses a white-list of
     * allowed characters in a data-binding, which causes problems for
     * data-bindings that do use characters not in this white-list.
     *
     * Instead of updating the white-list with all allowed characters,
     * there is a StrictBindingParser (see lib/mixins/strict-binding-parser)
     * that uses a state machine instead. This state machine is able to handle
     * all characters. However, it is slightly less performant, therefore we
     * extracted it into a separate optional mixin.
     *
     * @param {string} text Text to parse from attribute or textContent
     * @param {Object} templateInfo Current template metadata
     * @return {Array<!BindingPart>} Array of binding part metadata
     * @protected
     * @nocollapse
     */


    static _parseBindings(text, templateInfo) {
      let parts = [];
      let lastIndex = 0;
      let m; // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
      // Regex matches:
      //        Iteration 1:  Iteration 2:
      // m[1]: '{{'          '[['
      // m[2]: ''            '!'
      // m[3]: 'prop'        'compute(foo,bar)'

      while ((m = bindingRegex.exec(text)) !== null) {
        // Add literal part
        if (m.index > lastIndex) {
          parts.push({
            literal: text.slice(lastIndex, m.index)
          });
        } // Add binding part


        let mode = m[1][0];
        let negate = Boolean(m[2]);
        let source = m[3].trim();
        let customEvent = false,
            notifyEvent = '',
            colon = -1;

        if (mode == '{' && (colon = source.indexOf('::')) > 0) {
          notifyEvent = source.substring(colon + 2);
          source = source.substring(0, colon);
          customEvent = true;
        }

        let signature = parseMethod(source);
        let dependencies = [];

        if (signature) {
          // Inline computed function
          let {
            args,
            methodName
          } = signature;

          for (let i = 0; i < args.length; i++) {
            let arg = args[i];

            if (!arg.literal) {
              dependencies.push(arg);
            }
          }

          let dynamicFns = templateInfo.dynamicFns;

          if (dynamicFns && dynamicFns[methodName] || signature.static) {
            dependencies.push(methodName);
            signature.dynamicFn = true;
          }
        } else {
          // Property or path
          dependencies.push(source);
        }

        parts.push({
          source,
          mode,
          negate,
          customEvent,
          signature,
          dependencies,
          event: notifyEvent
        });
        lastIndex = bindingRegex.lastIndex;
      } // Add a final literal part


      if (lastIndex && lastIndex < text.length) {
        let literal = text.substring(lastIndex);

        if (literal) {
          parts.push({
            literal: literal
          });
        }
      }

      if (parts.length) {
        return parts;
      } else {
        return null;
      }
    }
    /**
     * Called to evaluate a previously parsed binding part based on a set of
     * one or more changed dependencies.
     *
     * @param {!Polymer_PropertyEffects} inst Element that should be used as
     *     scope for binding dependencies
     * @param {BindingPart} part Binding part metadata
     * @param {string} path Property/path that triggered this effect
     * @param {Object} props Bag of current property changes
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {*} Value the binding part evaluated to
     * @protected
     * @nocollapse
     */


    static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
      let value;

      if (part.signature) {
        value = runMethodEffect(inst, path, props, oldProps, part.signature);
      } else if (path != part.source) {
        value = (0, _path.get)(inst, part.source);
      } else {
        if (hasPaths && (0, _path.isPath)(path)) {
          value = (0, _path.get)(inst, path);
        } else {
          value = inst.__data[path];
        }
      }

      if (part.negate) {
        value = !value;
      }

      return value;
    }

  }

  return PropertyEffects;
});
/**
 * Stack for enqueuing client dom created by a host element.
 *
 * By default elements are flushed via `_flushProperties` when
 * `connectedCallback` is called. Elements attach their client dom to
 * themselves at `ready` time which results from this first flush.
 * This provides an ordering guarantee that the client dom an element
 * creates is flushed before the element itself (i.e. client `ready`
 * fires before host `ready`).
 *
 * However, if `_flushProperties` is called *before* an element is connected,
 * as for example `Templatize` does, this ordering guarantee cannot be
 * satisfied because no elements are connected. (Note: Bound elements that
 * receive data do become enqueued clients and are properly ordered but
 * unbound elements are not.)
 *
 * To maintain the desired "client before host" ordering guarantee for this
 * case we rely on the "host stack. Client nodes registers themselves with
 * the creating host element when created. This ensures that all client dom
 * is readied in the proper order, maintaining the desired guarantee.
 *
 * @private
 */

exports.PropertyEffects = PropertyEffects;
const hostStack = [];
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/wrap.js":"../node_modules/@polymer/polymer/lib/utils/wrap.js","../utils/mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js","../utils/path.js":"../node_modules/@polymer/polymer/lib/utils/path.js","../utils/case-map.js":"../node_modules/@polymer/polymer/lib/utils/case-map.js","./property-accessors.js":"../node_modules/@polymer/polymer/lib/mixins/property-accessors.js","./template-stamp.js":"../node_modules/@polymer/polymer/lib/mixins/template-stamp.js","../utils/settings.js":"../node_modules/@polymer/polymer/lib/utils/settings.js"}],"../node_modules/@polymer/polymer/lib/utils/telemetry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incrementInstanceCount = incrementInstanceCount;
exports.register = register;
exports.dumpRegistrations = dumpRegistrations;
exports.registrations = exports.instanceCount = void 0;

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Total number of Polymer element instances created.
 * @type {number}
 */
let instanceCount = 0;
exports.instanceCount = instanceCount;

function incrementInstanceCount() {
  exports.instanceCount = instanceCount = instanceCount + 1;
}
/**
 * Array of Polymer element classes that have been finalized.
 * @type {!Array<!PolymerElementConstructor>}
 */


const registrations = [];
/**
 * @param {!PolymerElementConstructor} prototype Element prototype to log
 * @private
 */

exports.registrations = registrations;

function _regLog(prototype) {
  console.log('[' +
  /** @type {?} */
  prototype.is + ']: registered');
}
/**
 * Registers a class prototype for telemetry purposes.
 * @param {!PolymerElementConstructor} prototype Element prototype to register
 * @protected
 */


function register(prototype) {
  registrations.push(prototype);
}
/**
 * Logs all elements registered with an `is` to the console.
 * @public
 */


function dumpRegistrations() {
  registrations.forEach(_regLog);
}
},{}],"../node_modules/@polymer/polymer/lib/mixins/properties-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertiesMixin = void 0;

require("../utils/boot.js");

var _mixin = require("../utils/mixin.js");

var _telemetry = require("../utils/telemetry.js");

var _propertiesChanged = require("./properties-changed.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Creates a copy of `props` with each property normalized such that
 * upgraded it is an object with at least a type property { type: Type}.
 *
 * @param {!Object} props Properties to normalize
 * @return {!Object} Copy of input `props` with normalized properties that
 * are in the form {type: Type}
 * @private
 */
function normalizeProperties(props) {
  const output = {};

  for (let p in props) {
    const o = props[p];
    output[p] = typeof o === 'function' ? {
      type: o
    } : o;
  }

  return output;
}
/**
 * Mixin that provides a minimal starting point to using the PropertiesChanged
 * mixin by providing a mechanism to declare properties in a static
 * getter (e.g. static get properties() { return { foo: String } }). Changes
 * are reported via the `_propertiesChanged` method.
 *
 * This mixin provides no specific support for rendering. Users are expected
 * to create a ShadowRoot and put content into it and update it in whatever
 * way makes sense. This can be done in reaction to properties changing by
 * implementing `_propertiesChanged`.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertiesChanged
 * @summary Mixin that provides a minimal starting point for using
 * the PropertiesChanged mixin by providing a declarative `properties` object.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */


const PropertiesMixin = (0, _mixin.dedupingMixin)(superClass => {
  /**
   * @constructor
   * @implements {Polymer_PropertiesChanged}
   * @private
   */
  const base = (0, _propertiesChanged.PropertiesChanged)(superClass);
  /**
   * Returns the super class constructor for the given class, if it is an
   * instance of the PropertiesMixin.
   *
   * @param {!PropertiesMixinConstructor} constructor PropertiesMixin constructor
   * @return {?PropertiesMixinConstructor} Super class constructor
   */

  function superPropertiesClass(constructor) {
    const superCtor = Object.getPrototypeOf(constructor); // Note, the `PropertiesMixin` class below only refers to the class
    // generated by this call to the mixin; the instanceof test only works
    // because the mixin is deduped and guaranteed only to apply once, hence
    // all constructors in a proto chain will see the same `PropertiesMixin`

    return superCtor.prototype instanceof PropertiesMixin ?
    /** @type {!PropertiesMixinConstructor} */
    superCtor : null;
  }
  /**
   * Returns a memoized version of the `properties` object for the
   * given class. Properties not in object format are converted to at
   * least {type}.
   *
   * @param {PropertiesMixinConstructor} constructor PropertiesMixin constructor
   * @return {Object} Memoized properties object
   */


  function ownProperties(constructor) {
    if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', constructor))) {
      let props = null;

      if (constructor.hasOwnProperty(JSCompiler_renameProperty('properties', constructor))) {
        const properties = constructor.properties;

        if (properties) {
          props = normalizeProperties(properties);
        }
      }

      constructor.__ownProperties = props;
    }

    return constructor.__ownProperties;
  }
  /**
   * @polymer
   * @mixinClass
   * @extends {base}
   * @implements {Polymer_PropertiesMixin}
   * @unrestricted
   */


  class PropertiesMixin extends base {
    /**
     * Implements standard custom elements getter to observes the attributes
     * listed in `properties`.
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static get observedAttributes() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
        (0, _telemetry.register)(this.prototype);
        const props = this._properties;
        this.__observedAttributes = props ? Object.keys(props).map(p => this.prototype._addPropertyToAttributeMap(p)) : [];
      }

      return this.__observedAttributes;
    }
    /**
     * Finalizes an element definition, including ensuring any super classes
     * are also finalized. This includes ensuring property
     * accessors exist on the element prototype. This method calls
     * `_finalizeClass` to finalize each constructor in the prototype chain.
     * @return {void}
     * @nocollapse
     */


    static finalize() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))) {
        const superCtor = superPropertiesClass(
        /** @type {!PropertiesMixinConstructor} */
        this);

        if (superCtor) {
          superCtor.finalize();
        }

        this.__finalized = true;

        this._finalizeClass();
      }
    }
    /**
     * Finalize an element class. This includes ensuring property
     * accessors exist on the element prototype. This method is called by
     * `finalize` and finalizes the class constructor.
     *
     * @protected
     * @nocollapse
     */


    static _finalizeClass() {
      const props = ownProperties(
      /** @type {!PropertiesMixinConstructor} */
      this);

      if (props) {
        /** @type {?} */
        this.createProperties(props);
      }
    }
    /**
     * Returns a memoized version of all properties, including those inherited
     * from super classes. Properties not in object format are converted to
     * at least {type}.
     *
     * @return {Object} Object containing properties for this class
     * @protected
     * @nocollapse
     */


    static get _properties() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))) {
        const superCtor = superPropertiesClass(
        /** @type {!PropertiesMixinConstructor} */
        this);
        this.__properties = Object.assign({}, superCtor && superCtor._properties, ownProperties(
        /** @type {PropertiesMixinConstructor} */
        this));
      }

      return this.__properties;
    }
    /**
     * Overrides `PropertiesChanged` method to return type specified in the
     * static `properties` object for the given property.
     * @param {string} name Name of property
     * @return {*} Type to which to deserialize attribute
     *
     * @protected
     * @nocollapse
     */


    static typeForProperty(name) {
      const info = this._properties[name];
      return info && info.type;
    }
    /**
     * Overrides `PropertiesChanged` method and adds a call to
     * `finalize` which lazily configures the element's property accessors.
     * @override
     * @return {void}
     */


    _initializeProperties() {
      (0, _telemetry.incrementInstanceCount)();
      this.constructor.finalize();

      super._initializeProperties();
    }
    /**
     * Called when the element is added to a document.
     * Calls `_enableProperties` to turn on property system from
     * `PropertiesChanged`.
     * @suppress {missingProperties} Super may or may not implement the callback
     * @return {void}
     * @override
     */


    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this._enableProperties();
    }
    /**
     * Called when the element is removed from a document
     * @suppress {missingProperties} Super may or may not implement the callback
     * @return {void}
     * @override
     */


    disconnectedCallback() {
      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

  }

  return PropertiesMixin;
});
exports.PropertiesMixin = PropertiesMixin;
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js","../utils/telemetry.js":"../node_modules/@polymer/polymer/lib/utils/telemetry.js","./properties-changed.js":"../node_modules/@polymer/polymer/lib/mixins/properties-changed.js"}],"../node_modules/@polymer/polymer/lib/mixins/element-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStyles = exports.ElementMixin = exports.builtCSS = exports.version = void 0;

require("../utils/boot.js");

var _settings = require("../utils/settings.js");

var _mixin = require("../utils/mixin.js");

var _styleGather = require("../utils/style-gather.js");

var _resolveUrl = require("../utils/resolve-url.js");

var _domModule = require("../elements/dom-module.js");

var _propertyEffects = require("./property-effects.js");

var _propertiesMixin = require("./properties-mixin.js");

var _wrap = require("../utils/wrap.js");

/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * Current Polymer version in Semver notation.
 * @type {string} Semver notation of the current version of Polymer.
 */
const version = '3.4.1';
exports.version = version;
const builtCSS = window.ShadyCSS && window.ShadyCSS['cssBuild'];
/**
 * Element class mixin that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * Subclassers may provide the following static getters to return metadata
 * used to configure Polymer's features for the class:
 *
 * - `static get is()`: When the template is provided via a `dom-module`,
 *   users should return the `dom-module` id from a static `is` getter.  If
 *   no template is needed or the template is provided directly via the
 *   `template` getter, there is no need to define `is` for the element.
 *
 * - `static get template()`: Users may provide the template directly (as
 *   opposed to via `dom-module`) by implementing a static `template` getter.
 *   The getter must return an `HTMLTemplateElement`.
 *
 * - `static get properties()`: Should return an object describing
 *   property-related metadata used by Polymer features (key: property name
 *   value: object containing property metadata). Valid keys in per-property
 *   metadata include:
 *   - `type` (String|Number|Object|Array|...): Used by
 *     `attributeChangedCallback` to determine how string-based attributes
 *     are deserialized to JavaScript property values.
 *   - `notify` (boolean): Causes a change in the property to fire a
 *     non-bubbling event called `<property>-changed`. Elements that have
 *     enabled two-way binding to the property use this event to observe changes.
 *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
 *     To set a read-only property, use the private setter method
 *     `_setProperty(property, value)`.
 *   - `observer` (string): Observer method name that will be called when
 *     the property changes. The arguments of the method are
 *     `(value, previousValue)`.
 *   - `computed` (string): String describing method and dependent properties
 *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
 *     Computed properties are read-only by default and can only be changed
 *     via the return value of the computing method.
 *
 * - `static get observers()`: Array of strings describing multi-property
 *   observer methods and their dependent properties (e.g.
 *   `'observeABC(a, b, c)'`).
 *
 * The base class provides default implementations for the following standard
 * custom element lifecycle callbacks; users may override these, but should
 * call the super method to ensure
 * - `constructor`: Run when the element is created or upgraded
 * - `connectedCallback`: Run each time the element is connected to the
 *   document
 * - `disconnectedCallback`: Run each time the element is disconnected from
 *   the document
 * - `attributeChangedCallback`: Run each time an attribute in
 *   `observedAttributes` is set or removed (note: this element's default
 *   `observedAttributes` implementation will automatically return an array
 *   of dash-cased attributes based on `properties`)
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertyEffects
 * @appliesMixin PropertiesMixin
 * @property rootPath {string} Set to the value of `rootPath`,
 *   which defaults to the main document path
 * @property importPath {string} Set to the value of the class's static
 *   `importPath` property, which defaults to the path of this element's
 *   `dom-module` (when `is` is used), but can be overridden for other
 *   import strategies.
 * @summary Element class mixin that provides the core API for Polymer's
 * meta-programming features.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */

exports.builtCSS = builtCSS;
const ElementMixin = (0, _mixin.dedupingMixin)(base => {
  /**
   * @constructor
   * @implements {Polymer_PropertyEffects}
   * @implements {Polymer_PropertiesMixin}
   * @extends {HTMLElement}
   * @private
   */
  const polymerElementBase = (0, _propertiesMixin.PropertiesMixin)((0, _propertyEffects.PropertyEffects)(base));
  /**
   * Returns a list of properties with default values.
   * This list is created as an optimization since it is a subset of
   * the list returned from `_properties`.
   * This list is used in `_initializeProperties` to set property defaults.
   *
   * @param {PolymerElementConstructor} constructor Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   *   that have default values
   * @private
   */

  function propertyDefaults(constructor) {
    if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__propertyDefaults', constructor))) {
      constructor.__propertyDefaults = null;
      let props = constructor._properties;

      for (let p in props) {
        let info = props[p];

        if ('value' in info) {
          constructor.__propertyDefaults = constructor.__propertyDefaults || {};
          constructor.__propertyDefaults[p] = info;
        }
      }
    }

    return constructor.__propertyDefaults;
  }
  /**
   * Returns a memoized version of the `observers` array.
   * @param {PolymerElementConstructor} constructor Element class
   * @return {Array} Array containing own observers for the given class
   * @protected
   */


  function ownObservers(constructor) {
    if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownObservers', constructor))) {
      constructor.__ownObservers = constructor.hasOwnProperty(JSCompiler_renameProperty('observers', constructor)) ?
      /** @type {PolymerElementConstructor} */
      constructor.observers : null;
    }

    return constructor.__ownObservers;
  }
  /**
   * Creates effects for a property.
   *
   * Note, once a property has been set to
   * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
   * these values may not be changed. For example, a subclass cannot
   * alter these settings. However, additional `observers` may be added
   * by subclasses.
   *
   * The info object should contain property metadata as follows:
   *
   * * `type`: {function} type to which an attribute matching the property
   * is deserialized. Note the property is camel-cased from a dash-cased
   * attribute. For example, 'foo-bar' attribute is deserialized to a
   * property named 'fooBar'.
   *
   * * `readOnly`: {boolean} creates a readOnly property and
   * makes a private setter for the private of the form '_setFoo' for a
   * property 'foo',
   *
   * * `computed`: {string} creates a computed property. A computed property
   * is also automatically set to `readOnly: true`. The value is calculated
   * by running a method and arguments parsed from the given string. For
   * example 'compute(foo)' will compute a given property when the
   * 'foo' property changes by executing the 'compute' method. This method
   * must return the computed value.
   *
   * * `reflectToAttribute`: {boolean} If true, the property value is reflected
   * to an attribute of the same name. Note, the attribute is dash-cased
   * so a property named 'fooBar' is reflected as 'foo-bar'.
   *
   * * `notify`: {boolean} sends a non-bubbling notification event when
   * the property changes. For example, a property named 'foo' sends an
   * event named 'foo-changed' with `event.detail` set to the value of
   * the property.
   *
   * * observer: {string} name of a method that runs when the property
   * changes. The arguments of the method are (value, previousValue).
   *
   * Note: Users may want control over modifying property
   * effects via subclassing. For example, a user might want to make a
   * reflectToAttribute property not do so in a subclass. We've chosen to
   * disable this because it leads to additional complication.
   * For example, a readOnly effect generates a special setter. If a subclass
   * disables the effect, the setter would fail unexpectedly.
   * Based on feedback, we may want to try to make effects more malleable
   * and/or provide an advanced api for manipulating them.
   *
   * @param {!PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {string} name Name of the property.
   * @param {Object} info Info object from which to create property effects.
   * Supported keys:
   * @param {Object} allProps Flattened map of all properties defined in this
   *   element (including inherited properties)
   * @return {void}
   * @private
   */


  function createPropertyFromConfig(proto, name, info, allProps) {
    // computed forces readOnly...
    if (info.computed) {
      info.readOnly = true;
    } // Note, since all computed properties are readOnly, this prevents
    // adding additional computed property effects (which leads to a confusing
    // setup where multiple triggers for setting a property)
    // While we do have `hasComputedEffect` this is set on the property's
    // dependencies rather than itself.


    if (info.computed) {
      if (proto._hasReadOnlyEffect(name)) {
        console.warn(`Cannot redefine computed property '${name}'.`);
      } else {
        proto._createComputedProperty(name, info.computed, allProps);
      }
    }

    if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
      proto._createReadOnlyProperty(name, !info.computed);
    } else if (info.readOnly === false && proto._hasReadOnlyEffect(name)) {
      console.warn(`Cannot make readOnly property '${name}' non-readOnly.`);
    }

    if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
      proto._createReflectedProperty(name);
    } else if (info.reflectToAttribute === false && proto._hasReflectEffect(name)) {
      console.warn(`Cannot make reflected property '${name}' non-reflected.`);
    }

    if (info.notify && !proto._hasNotifyEffect(name)) {
      proto._createNotifyingProperty(name);
    } else if (info.notify === false && proto._hasNotifyEffect(name)) {
      console.warn(`Cannot make notify property '${name}' non-notify.`);
    } // always add observer


    if (info.observer) {
      proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
    } // always create the mapping from attribute back to property for deserialization.


    proto._addPropertyToAttributeMap(name);
  }
  /**
   * Process all style elements in the element template. Styles with the
   * `include` attribute are processed such that any styles in
   * the associated "style modules" are included in the element template.
   * @param {PolymerElementConstructor} klass Element class
   * @param {!HTMLTemplateElement} template Template to process
   * @param {string} is Name of element
   * @param {string} baseURI Base URI for element
   * @private
   */


  function processElementStyles(klass, template, is, baseURI) {
    if (!builtCSS) {
      const templateStyles = template.content.querySelectorAll('style');
      const stylesWithImports = (0, _styleGather.stylesFromTemplate)(template); // insert styles from <link rel="import" type="css"> at the top of the template

      const linkedStyles = (0, _styleGather.stylesFromModuleImports)(is);
      const firstTemplateChild = template.content.firstElementChild;

      for (let idx = 0; idx < linkedStyles.length; idx++) {
        let s = linkedStyles[idx];
        s.textContent = klass._processStyleText(s.textContent, baseURI);
        template.content.insertBefore(s, firstTemplateChild);
      } // keep track of the last "concrete" style in the template we have encountered


      let templateStyleIndex = 0; // ensure all gathered styles are actually in this template.

      for (let i = 0; i < stylesWithImports.length; i++) {
        let s = stylesWithImports[i];
        let templateStyle = templateStyles[templateStyleIndex]; // if the style is not in this template, it's been "included" and
        // we put a clone of it in the template before the style that included it

        if (templateStyle !== s) {
          s = s.cloneNode(true);
          templateStyle.parentNode.insertBefore(s, templateStyle);
        } else {
          templateStyleIndex++;
        }

        s.textContent = klass._processStyleText(s.textContent, baseURI);
      }
    }

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, is);
    } // Support for `adoptedStylesheets` relies on using native Shadow DOM
    // and built CSS. Built CSS is required because runtime transformation of
    // `@apply` is not supported. This is because ShadyCSS relies on being able
    // to update a `style` element in the element template and this is
    // removed when using `adoptedStyleSheets`.
    // Note, it would be more efficient to allow style includes to become
    // separate stylesheets; however, because of `@apply` these are
    // potentially not shareable and sharing the ones that could be shared
    // would require some coordination. To keep it simple, all the includes
    // and styles are collapsed into a single shareable stylesheet.


    if (_settings.useAdoptedStyleSheetsWithBuiltCSS && builtCSS && _settings.supportsAdoptingStyleSheets) {
      // Remove styles in template and make a shareable stylesheet
      const styles = template.content.querySelectorAll('style');

      if (styles) {
        let css = '';
        Array.from(styles).forEach(s => {
          css += s.textContent;
          s.parentNode.removeChild(s);
        });
        klass._styleSheet = new CSSStyleSheet();

        klass._styleSheet.replaceSync(css);
      }
    }
  }
  /**
   * Look up template from dom-module for element
   *
   * @param {string} is Element name to look up
   * @return {?HTMLTemplateElement|undefined} Template found in dom module, or
   *   undefined if not found
   * @protected
   */


  function getTemplateFromDomModule(is) {
    let template = null; // Under strictTemplatePolicy in 3.x+, dom-module lookup is only allowed
    // when opted-in via allowTemplateFromDomModule

    if (is && (!_settings.strictTemplatePolicy || _settings.allowTemplateFromDomModule)) {
      template =
      /** @type {?HTMLTemplateElement} */
      _domModule.DomModule.import(is, 'template'); // Under strictTemplatePolicy, require any element with an `is`
      // specified to have a dom-module

      if (_settings.strictTemplatePolicy && !template) {
        throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${is}`);
      }
    }

    return template;
  }
  /**
   * @polymer
   * @mixinClass
   * @unrestricted
   * @implements {Polymer_ElementMixin}
   * @extends {polymerElementBase}
   */


  class PolymerElement extends polymerElementBase {
    /**
     * Current Polymer version in Semver notation.
     * @type {string} Semver notation of the current version of Polymer.
     * @nocollapse
     */
    static get polymerElementVersion() {
      return version;
    }
    /**
     * Override of PropertiesMixin _finalizeClass to create observers and
     * find the template.
     * @return {void}
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */


    static _finalizeClass() {
      // TODO(https://github.com/google/closure-compiler/issues/3240):
      //     Change back to just super.methodCall()
      polymerElementBase._finalizeClass.call(this);

      const observers = ownObservers(this);

      if (observers) {
        this.createObservers(observers, this._properties);
      }

      this._prepareTemplate();
    }
    /** @nocollapse */


    static _prepareTemplate() {
      // note: create "working" template that is finalized at instance time
      let template =
      /** @type {PolymerElementConstructor} */
      this.template;

      if (template) {
        if (typeof template === 'string') {
          console.error('template getter must return HTMLTemplateElement');
          template = null;
        } else if (!_settings.legacyOptimizations) {
          template = template.cloneNode(true);
        }
      }
      /** @override */


      this.prototype._template = template;
    }
    /**
     * Override of PropertiesChanged createProperties to create accessors
     * and property effects for all of the properties.
     * @param {!Object} props .
     * @return {void}
     * @protected
     * @nocollapse
     */


    static createProperties(props) {
      for (let p in props) {
        createPropertyFromConfig(
        /** @type {?} */
        this.prototype, p, props[p], props);
      }
    }
    /**
     * Creates observers for the given `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {Object} observers Array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @return {void}
     * @protected
     * @nocollapse
     */


    static createObservers(observers, dynamicFns) {
      const proto = this.prototype;

      for (let i = 0; i < observers.length; i++) {
        proto._createMethodObserver(observers[i], dynamicFns);
      }
    }
    /**
     * Returns the template that will be stamped into this element's shadow root.
     *
     * If a `static get is()` getter is defined, the default implementation will
     * return the first `<template>` in a `dom-module` whose `id` matches this
     * element's `is` (note that a `_template` property on the class prototype
     * takes precedence over the `dom-module` template, to maintain legacy
     * element semantics; a subclass will subsequently fall back to its super
     * class template if neither a `prototype._template` or a `dom-module` for
     * the class's `is` was found).
     *
     * Users may override this getter to return an arbitrary template
     * (in which case the `is` getter is unnecessary). The template returned
     * must be an `HTMLTemplateElement`.
     *
     * Note that when subclassing, if the super class overrode the default
     * implementation and the subclass would like to provide an alternate
     * template via a `dom-module`, it should override this getter and
     * return `DomModule.import(this.is, 'template')`.
     *
     * If a subclass would like to modify the super class template, it should
     * clone it rather than modify it in place.  If the getter does expensive
     * work such as cloning/modifying a template, it should memoize the
     * template for maximum performance:
     *
     *   let memoizedTemplate;
     *   class MySubClass extends MySuperClass {
     *     static get template() {
     *       if (!memoizedTemplate) {
     *         memoizedTemplate = super.template.cloneNode(true);
     *         let subContent = document.createElement('div');
     *         subContent.textContent = 'This came from MySubClass';
     *         memoizedTemplate.content.appendChild(subContent);
     *       }
     *       return memoizedTemplate;
     *     }
     *   }
     *
     * @return {!HTMLTemplateElement|string} Template to be stamped
     * @nocollapse
     */


    static get template() {
      // Explanation of template-related properties:
      // - constructor.template (this getter): the template for the class.
      //     This can come from the prototype (for legacy elements), from a
      //     dom-module, or from the super class's template (or can be overridden
      //     altogether by the user)
      // - constructor._template: memoized version of constructor.template
      // - prototype._template: working template for the element, which will be
      //     parsed and modified in place. It is a cloned version of
      //     constructor.template, saved in _finalizeClass(). Note that before
      //     this getter is called, for legacy elements this could be from a
      //     _template field on the info object passed to Polymer(), a behavior,
      //     or set in registered(); once the static getter runs, a clone of it
      //     will overwrite it on the prototype as the working template.
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
        const protoTemplate = this.prototype.hasOwnProperty(JSCompiler_renameProperty('_template', this.prototype)) ? this.prototype._template : undefined;
        this._template = // If user has put template on prototype (e.g. in legacy via registered
        // callback or info object), prefer that first. Note that `null` is
        // used as a sentinel to indicate "no template" and can be used to
        // override a super template, whereas `undefined` is used as a
        // sentinel to mean "fall-back to default template lookup" via
        // dom-module and/or super.template.
        protoTemplate !== undefined ? protoTemplate : // Look in dom-module associated with this element's is
        this.hasOwnProperty(JSCompiler_renameProperty('is', this)) && getTemplateFromDomModule(
        /** @type {PolymerElementConstructor}*/
        this.is) || // Next look for superclass template (call the super impl this
        // way so that `this` points to the superclass)
        Object.getPrototypeOf(
        /** @type {PolymerElementConstructor}*/
        this.prototype).constructor.template;
      }

      return this._template;
    }
    /**
     * Set the template.
     *
     * @param {!HTMLTemplateElement|string} value Template to set.
     * @nocollapse
     */


    static set template(value) {
      this._template = value;
    }
    /**
     * Path matching the url from which the element was imported.
     *
     * This path is used to resolve url's in template style cssText.
     * The `importPath` property is also set on element instances and can be
     * used to create bindings relative to the import path.
     *
     * For elements defined in ES modules, users should implement
     * `static get importMeta() { return import.meta; }`, and the default
     * implementation of `importPath` will  return `import.meta.url`'s path.
     * For elements defined in HTML imports, this getter will return the path
     * to the document containing a `dom-module` element matching this
     * element's static `is` property.
     *
     * Note, this path should contain a trailing `/`.
     *
     * @return {string} The import path for this element class
     * @suppress {missingProperties}
     * @nocollapse
     */


    static get importPath() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
        const meta = this.importMeta;

        if (meta) {
          this._importPath = (0, _resolveUrl.pathFromUrl)(meta.url);
        } else {
          const module = _domModule.DomModule.import(
          /** @type {PolymerElementConstructor} */
          this.is);

          this._importPath = module && module.assetpath || Object.getPrototypeOf(
          /** @type {PolymerElementConstructor}*/
          this.prototype).constructor.importPath;
        }
      }

      return this._importPath;
    }

    constructor() {
      super();
      /** @type {HTMLTemplateElement} */

      this._template;
      /** @type {string} */

      this._importPath;
      /** @type {string} */

      this.rootPath;
      /** @type {string} */

      this.importPath;
      /** @type {StampedTemplate | HTMLElement | ShadowRoot} */

      this.root;
      /** @type {!Object<string, !Element>} */

      this.$;
    }
    /**
     * Overrides the default `PropertyAccessors` to ensure class
     * metaprogramming related to property accessors and effects has
     * completed (calls `finalize`).
     *
     * It also initializes any property defaults provided via `value` in
     * `properties` metadata.
     *
     * @return {void}
     * @override
     * @suppress {invalidCasts,missingProperties} go/missingfnprops
     */


    _initializeProperties() {
      this.constructor.finalize(); // note: finalize template when we have access to `localName` to
      // avoid dependence on `is` for polyfilling styling.

      this.constructor._finalizeTemplate(
      /** @type {!HTMLElement} */
      this.localName);

      super._initializeProperties(); // set path defaults


      this.rootPath = _settings.rootPath;
      this.importPath = this.constructor.importPath; // apply property defaults...

      let p$ = propertyDefaults(this.constructor);

      if (!p$) {
        return;
      }

      for (let p in p$) {
        let info = p$[p];

        if (this._canApplyPropertyDefault(p)) {
          let value = typeof info.value == 'function' ? info.value.call(this) : info.value; // Set via `_setProperty` if there is an accessor, to enable
          // initializing readOnly property defaults

          if (this._hasAccessor(p)) {
            this._setPendingProperty(p, value, true);
          } else {
            this[p] = value;
          }
        }
      }
    }
    /**
     * Determines if a property dfeault can be applied. For example, this
     * prevents a default from being applied when a property that has no
     * accessor is overridden by its host before upgrade (e.g. via a binding).
     * @override
     * @param {string} property Name of the property
     * @return {boolean} Returns true if the property default can be applied.
     */


    _canApplyPropertyDefault(property) {
      return !this.hasOwnProperty(property);
    }
    /**
     * Gather style text for a style element in the template.
     *
     * @param {string} cssText Text containing styling to process
     * @param {string} baseURI Base URI to rebase CSS paths against
     * @return {string} The processed CSS text
     * @protected
     * @nocollapse
     */


    static _processStyleText(cssText, baseURI) {
      return (0, _resolveUrl.resolveCss)(cssText, baseURI);
    }
    /**
    * Configures an element `proto` to function with a given `template`.
    * The element name `is` and extends `ext` must be specified for ShadyCSS
    * style scoping.
    *
    * @param {string} is Tag name (or type extension name) for this element
    * @return {void}
    * @protected
    * @nocollapse
    */


    static _finalizeTemplate(is) {
      /** @const {HTMLTemplateElement} */
      const template = this.prototype._template;

      if (template && !template.__polymerFinalized) {
        template.__polymerFinalized = true;
        const importPath = this.importPath;
        const baseURI = importPath ? (0, _resolveUrl.resolveUrl)(importPath) : ''; // e.g. support `include="module-name"`, and ShadyCSS

        processElementStyles(this, template, is, baseURI);

        this.prototype._bindTemplate(template);
      }
    }
    /**
     * Provides a default implementation of the standard Custom Elements
     * `connectedCallback`.
     *
     * The default implementation enables the property effects system and
     * flushes any pending properties, and updates shimmed CSS properties
     * when using the ShadyCSS scoping/custom properties polyfill.
     *
     * @override
     * @suppress {missingProperties, invalidCasts} Super may or may not
     *     implement the callback
     * @return {void}
     */


    connectedCallback() {
      if (window.ShadyCSS && this._template) {
        window.ShadyCSS.styleElement(
        /** @type {!HTMLElement} */
        this);
      }

      super.connectedCallback();
    }
    /**
     * Stamps the element template.
     *
     * @return {void}
     * @override
     */


    ready() {
      if (this._template) {
        this.root = this._stampTemplate(this._template);
        this.$ = this.root.$;
      }

      super.ready();
    }
    /**
     * Implements `PropertyEffects`'s `_readyClients` call. Attaches
     * element dom by calling `_attachDom` with the dom stamped from the
     * element's template via `_stampTemplate`. Note that this allows
     * client dom to be attached to the element prior to any observers
     * running.
     *
     * @return {void}
     * @override
     */


    _readyClients() {
      if (this._template) {
        this.root = this._attachDom(
        /** @type {StampedTemplate} */
        this.root);
      } // The super._readyClients here sets the clients initialized flag.
      // We must wait to do this until after client dom is created/attached
      // so that this flag can be checked to prevent notifications fired
      // during this process from being handled before clients are ready.


      super._readyClients();
    }
    /**
     * Attaches an element's stamped dom to itself. By default,
     * this method creates a `shadowRoot` and adds the dom to it.
     * However, this method may be overridden to allow an element
     * to put its dom in another location.
     *
     * @override
     * @throws {Error}
     * @suppress {missingReturn}
     * @param {StampedTemplate} dom to attach to the element.
     * @return {ShadowRoot} node to which the dom has been attached.
     */


    _attachDom(dom) {
      const n = (0, _wrap.wrap)(this);

      if (n.attachShadow) {
        if (dom) {
          if (!n.shadowRoot) {
            n.attachShadow({
              mode: 'open',
              shadyUpgradeFragment: dom
            });
            n.shadowRoot.appendChild(dom); // When `adoptedStyleSheets` is supported a stylesheet is made
            // available on the element constructor.

            if (this.constructor._styleSheet) {
              n.shadowRoot.adoptedStyleSheets = [this.constructor._styleSheet];
            }
          }

          if (_settings.syncInitialRender && window.ShadyDOM) {
            window.ShadyDOM.flushInitial(n.shadowRoot);
          }

          return n.shadowRoot;
        }

        return null;
      } else {
        throw new Error('ShadowDOM not available. ' + // TODO(sorvell): move to compile-time conditional when supported
        'PolymerElement can create dom as children instead of in ' + 'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
      }
    }
    /**
     * When using the ShadyCSS scoping and custom property shim, causes all
     * shimmed styles in this element (and its subtree) to be updated
     * based on current custom property values.
     *
     * The optional parameter overrides inline custom property styles with an
     * object of properties where the keys are CSS properties, and the values
     * are strings.
     *
     * Example: `this.updateStyles({'--color': 'blue'})`
     *
     * These properties are retained unless a value of `null` is set.
     *
     * Note: This function does not support updating CSS mixins.
     * You can not dynamically change the value of an `@apply`.
     *
     * @override
     * @param {Object=} properties Bag of custom property key/values to
     *   apply to this element.
     * @return {void}
     * @suppress {invalidCasts}
     */


    updateStyles(properties) {
      if (window.ShadyCSS) {
        window.ShadyCSS.styleSubtree(
        /** @type {!HTMLElement} */
        this, properties);
      }
    }
    /**
     * Rewrites a given URL relative to a base URL. The base URL defaults to
     * the original location of the document containing the `dom-module` for
     * this element. This method will return the same URL before and after
     * bundling.
     *
     * Note that this function performs no resolution for URLs that start
     * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
     * URL resolution, use `window.URL`.
     *
     * @override
     * @param {string} url URL to resolve.
     * @param {string=} base Optional base URL to resolve against, defaults
     * to the element's `importPath`
     * @return {string} Rewritten URL relative to base
     */


    resolveUrl(url, base) {
      if (!base && this.importPath) {
        base = (0, _resolveUrl.resolveUrl)(this.importPath);
      }

      return (0, _resolveUrl.resolveUrl)(url, base);
    }
    /**
     * Overrides `PropertyEffects` to add map of dynamic functions on
     * template info, for consumption by `PropertyEffects` template binding
     * code. This map determines which method templates should have accessors
     * created for them.
     *
     * @param {!HTMLTemplateElement} template Template
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} .
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */


    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      templateInfo.dynamicFns = templateInfo.dynamicFns || this._properties; // TODO(https://github.com/google/closure-compiler/issues/3240):
      //     Change back to just super.methodCall()

      return polymerElementBase._parseTemplateContent.call(this, template, templateInfo, nodeInfo);
    }
    /**
     * Overrides `PropertyEffects` to warn on use of undeclared properties in
     * template.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */


    static _addTemplatePropertyEffect(templateInfo, prop, effect) {
      // Warn if properties are used in template without being declared.
      // Properties must be listed in `properties` to be included in
      // `observedAttributes` since CE V1 reads that at registration time, and
      // since we want to keep template parsing lazy, we can't automatically
      // add undeclared properties used in templates to `observedAttributes`.
      // The warning is only enabled in `legacyOptimizations` mode, since
      // we don't want to spam existing users who might have adopted the
      // shorthand when attribute deserialization is not important.
      if (_settings.legacyWarnings && !(prop in this._properties) && // Methods used in templates with no dependencies (or only literal
      // dependencies) become accessors with template effects; ignore these
      !(effect.info.part.signature && effect.info.part.signature.static) && // Warnings for bindings added to nested templates are handled by
      // templatizer so ignore both the host-to-template bindings
      // (`hostProp`) and TemplateInstance-to-child bindings
      // (`nestedTemplate`)
      !effect.info.part.hostProp && !templateInfo.nestedTemplate) {
        console.warn(`Property '${prop}' used in template but not declared in 'properties'; ` + `attribute will not be observed.`);
      } // TODO(https://github.com/google/closure-compiler/issues/3240):
      //     Change back to just super.methodCall()


      return polymerElementBase._addTemplatePropertyEffect.call(this, templateInfo, prop, effect);
    }

  }

  return PolymerElement;
});
/**
 * When using the ShadyCSS scoping and custom property shim, causes all
 * shimmed `styles` (via `custom-style`) in the document (and its subtree)
 * to be updated based on current custom property values.
 *
 * The optional parameter overrides inline custom property styles with an
 * object of properties where the keys are CSS properties, and the values
 * are strings.
 *
 * Example: `updateStyles({'--color': 'blue'})`
 *
 * These properties are retained unless a value of `null` is set.
 *
 * @param {Object=} props Bag of custom property key/values to
 *   apply to the document.
 * @return {void}
 */

exports.ElementMixin = ElementMixin;

const updateStyles = function (props) {
  if (window.ShadyCSS) {
    window.ShadyCSS.styleDocument(props);
  }
};

exports.updateStyles = updateStyles;
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/settings.js":"../node_modules/@polymer/polymer/lib/utils/settings.js","../utils/mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js","../utils/style-gather.js":"../node_modules/@polymer/polymer/lib/utils/style-gather.js","../utils/resolve-url.js":"../node_modules/@polymer/polymer/lib/utils/resolve-url.js","../elements/dom-module.js":"../node_modules/@polymer/polymer/lib/elements/dom-module.js","./property-effects.js":"../node_modules/@polymer/polymer/lib/mixins/property-effects.js","./properties-mixin.js":"../node_modules/@polymer/polymer/lib/mixins/properties-mixin.js","../utils/wrap.js":"../node_modules/@polymer/polymer/lib/utils/wrap.js"}],"../node_modules/@polymer/polymer/polymer-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _elementMixin.version;
  }
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _htmlTag.html;
  }
});
exports.PolymerElement = void 0;

var _elementMixin = require("./lib/mixins/element-mixin.js");

var _htmlTag = require("./lib/utils/html-tag.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Base class that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * @customElement
 * @polymer
 * @constructor
 * @implements {Polymer_ElementMixin}
 * @extends HTMLElement
 * @appliesMixin ElementMixin
 * @summary Custom element base class that provides the core API for Polymer's
 *   key meta-programming features including template stamping, data-binding,
 *   attribute deserialization, and property change observation
 */
const PolymerElement = (0, _elementMixin.ElementMixin)(HTMLElement);
exports.PolymerElement = PolymerElement;
},{"./lib/mixins/element-mixin.js":"../node_modules/@polymer/polymer/lib/mixins/element-mixin.js","./lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js"}],"../node_modules/@polymer/polymer/lib/utils/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushDebouncers = exports.enqueueDebouncer = exports.Debouncer = void 0;

require("./boot.js");

require("./mixin.js");

require("./async.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * @summary Collapse multiple callbacks into one invocation after a timer.
 */
class Debouncer {
  constructor() {
    this._asyncModule = null;
    this._callback = null;
    this._timer = null;
  }
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncInterface} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   * @return {void}
   */


  setConfig(asyncModule, callback) {
    this._asyncModule = asyncModule;
    this._callback = callback;
    this._timer = this._asyncModule.run(() => {
      this._timer = null;
      debouncerQueue.delete(this);

      this._callback();
    });
  }
  /**
   * Cancels an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */


  cancel() {
    if (this.isActive()) {
      this._cancelAsync(); // Canceling a debouncer removes its spot from the flush queue,
      // so if a debouncer is manually canceled and re-debounced, it
      // will reset its flush order (this is a very minor difference from 1.x)
      // Re-debouncing via the `debounce` API retains the 1.x FIFO flush order


      debouncerQueue.delete(this);
    }
  }
  /**
   * Cancels a debouncer's async callback.
   *
   * @return {void}
   */


  _cancelAsync() {
    if (this.isActive()) {
      this._asyncModule.cancel(
      /** @type {number} */
      this._timer);

      this._timer = null;
    }
  }
  /**
   * Flushes an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */


  flush() {
    if (this.isActive()) {
      this.cancel();

      this._callback();
    }
  }
  /**
   * Returns true if the debouncer is active.
   *
   * @return {boolean} True if active.
   */


  isActive() {
    return this._timer != null;
  }
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * ```js
   * import {microTask} from '@polymer/polymer/lib/utils/async.js';
   * import {Debouncer} from '@polymer/polymer/lib/utils/debounce.js';
   * // ...
   *
   * _debounceWork() {
   *   this._debounceJob = Debouncer.debounce(this._debounceJob,
   *       microTask, () => this._doWork());
   * }
   * ```
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `enqueueDebouncer` and
   * `flush`. For example, extend the above example by adding
   * `enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncInterface} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */


  static debounce(debouncer, asyncModule, callback) {
    if (debouncer instanceof Debouncer) {
      // Cancel the async callback, but leave in debouncerQueue if it was
      // enqueued, to maintain 1.x flush order
      debouncer._cancelAsync();
    } else {
      debouncer = new Debouncer();
    }

    debouncer.setConfig(asyncModule, callback);
    return debouncer;
  }

}

exports.Debouncer = Debouncer;
let debouncerQueue = new Set();
/**
 * Adds a `Debouncer` to a list of globally flushable tasks.
 *
 * @param {!Debouncer} debouncer Debouncer to enqueue
 * @return {void}
 */

const enqueueDebouncer = function (debouncer) {
  debouncerQueue.add(debouncer);
};
/**
 * Flushes any enqueued debouncers
 *
 * @return {boolean} Returns whether any debouncers were flushed
 */


exports.enqueueDebouncer = enqueueDebouncer;

const flushDebouncers = function () {
  const didFlush = Boolean(debouncerQueue.size); // If new debouncers are added while flushing, Set.forEach will ensure
  // newly added ones are also flushed

  debouncerQueue.forEach(debouncer => {
    try {
      debouncer.flush();
    } catch (e) {
      setTimeout(() => {
        throw e;
      });
    }
  });
  return didFlush;
};

exports.flushDebouncers = flushDebouncers;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","./mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js","./async.js":"../node_modules/@polymer/polymer/lib/utils/async.js"}],"../node_modules/@polymer/polymer/lib/utils/gestures.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepTargetFind = deepTargetFind;
exports.addListener = addListener;
exports.removeListener = removeListener;
exports.register = register;
exports.setTouchAction = setTouchAction;
exports.prevent = prevent;
exports.resetMouseCanceller = resetMouseCanceller;
exports.remove = exports.add = exports.findOriginalTarget = exports.recognizers = exports.gestures = void 0;

require("./boot.js");

var _async = require("./async.js");

var _debounce = require("./debounce.js");

var _settings = require("./settings.js");

var _wrap = require("./wrap.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * @fileoverview
 *
 * Module for adding listeners to a node for the following normalized
 * cross-platform "gesture" events:
 * - `down` - mouse or touch went down
 * - `up` - mouse or touch went up
 * - `tap` - mouse click or finger tap
 * - `track` - mouse drag or touch move
 *
 * @summary Module for adding cross-platform gesture event listeners.
 */
// detect native touch action support
let HAS_NATIVE_TA = typeof document.head.style.touchAction === 'string';
let GESTURE_KEY = '__polymerGestures';
let HANDLED_OBJ = '__polymerGesturesHandled';
let TOUCH_ACTION = '__polymerGesturesTouchAction'; // radius for tap and track

let TAP_DISTANCE = 25;
let TRACK_DISTANCE = 5; // number of last N track positions to keep

let TRACK_LENGTH = 2; // Disabling "mouse" handlers for 2500ms is enough

let MOUSE_TIMEOUT = 2500;
let MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'click']; // an array of bitmask values for mapping MouseEvent.which to MouseEvent.buttons

let MOUSE_WHICH_TO_BUTTONS = [0, 1, 4, 2];

let MOUSE_HAS_BUTTONS = function () {
  try {
    return new MouseEvent('test', {
      buttons: 1
    }).buttons === 1;
  } catch (e) {
    return false;
  }
}();
/**
 * @param {string} name Possible mouse event name
 * @return {boolean} true if mouse event, false if not
 */


function isMouseEvent(name) {
  return MOUSE_EVENTS.indexOf(name) > -1;
}
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
// check for passive event listeners


let supportsPassive = false;

(function () {
  try {
    let opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
      }

    });
    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch (e) {}
})();
/**
 * Generate settings for event listeners, dependant on `passiveTouchGestures`
 *
 * @param {string} eventName Event name to determine if `{passive}` option is
 *   needed
 * @return {{passive: boolean} | undefined} Options to use for addEventListener
 *   and removeEventListener
 */


function PASSIVE_TOUCH(eventName) {
  if (isMouseEvent(eventName) || eventName === 'touchend') {
    return;
  }

  if (HAS_NATIVE_TA && supportsPassive && _settings.passiveTouchGestures) {
    return {
      passive: true
    };
  } else {
    return;
  }
} // Check for touch-only devices


let IS_TOUCH_ONLY = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/); // keep track of any labels hit by the mouseCanceller

/** @type {!Array<!HTMLLabelElement>} */

const clickedLabels = [];
/** @type {!Object<boolean>} */

const labellable = {
  'button': true,
  'input': true,
  'keygen': true,
  'meter': true,
  'output': true,
  'textarea': true,
  'progress': true,
  'select': true
}; // Defined at https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute

/** @type {!Object<boolean>} */

const canBeDisabled = {
  'button': true,
  'command': true,
  'fieldset': true,
  'input': true,
  'keygen': true,
  'optgroup': true,
  'option': true,
  'select': true,
  'textarea': true
};
/**
 * @param {HTMLElement} el Element to check labelling status
 * @return {boolean} element can have labels
 */

function canBeLabelled(el) {
  return labellable[el.localName] || false;
}
/**
 * @param {HTMLElement} el Element that may be labelled.
 * @return {!Array<!HTMLLabelElement>} Relevant label for `el`
 */


function matchingLabels(el) {
  let labels = Array.prototype.slice.call(
  /** @type {HTMLInputElement} */
  el.labels || []); // IE doesn't have `labels` and Safari doesn't populate `labels`
  // if element is in a shadowroot.
  // In this instance, finding the non-ancestor labels is enough,
  // as the mouseCancellor code will handle ancstor labels

  if (!labels.length) {
    labels = [];
    let root = el.getRootNode(); // if there is an id on `el`, check for all labels with a matching `for` attribute

    if (el.id) {
      let matching = root.querySelectorAll(`label[for = ${el.id}]`);

      for (let i = 0; i < matching.length; i++) {
        labels.push(
        /** @type {!HTMLLabelElement} */
        matching[i]);
      }
    }
  }

  return labels;
} // touch will make synthetic mouse events
// `preventDefault` on touchend will cancel them,
// but this breaks `<input>` focus and link clicks
// disable mouse handlers for MOUSE_TIMEOUT ms after
// a touchend to ignore synthetic mouse events


let mouseCanceller = function (mouseEvent) {
  // Check for sourceCapabilities, used to distinguish synthetic events
  // if mouseEvent did not come from a device that fires touch events,
  // it was made by a real mouse and should be counted
  // http://wicg.github.io/InputDeviceCapabilities/#dom-inputdevicecapabilities-firestouchevents
  let sc = mouseEvent.sourceCapabilities;

  if (sc && !sc.firesTouchEvents) {
    return;
  } // skip synthetic mouse events


  mouseEvent[HANDLED_OBJ] = {
    skip: true
  }; // disable "ghost clicks"

  if (mouseEvent.type === 'click') {
    let clickFromLabel = false;
    let path = getComposedPath(mouseEvent);

    for (let i = 0; i < path.length; i++) {
      if (path[i].nodeType === Node.ELEMENT_NODE) {
        if (path[i].localName === 'label') {
          clickedLabels.push(
          /** @type {!HTMLLabelElement} */
          path[i]);
        } else if (canBeLabelled(
        /** @type {!HTMLElement} */
        path[i])) {
          let ownerLabels = matchingLabels(
          /** @type {!HTMLElement} */
          path[i]); // check if one of the clicked labels is labelling this element

          for (let j = 0; j < ownerLabels.length; j++) {
            clickFromLabel = clickFromLabel || clickedLabels.indexOf(ownerLabels[j]) > -1;
          }
        }
      }

      if (path[i] === POINTERSTATE.mouse.target) {
        return;
      }
    } // if one of the clicked labels was labelling the target element,
    // this is not a ghost click


    if (clickFromLabel) {
      return;
    }

    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
  }
};
/**
 * @param {boolean=} setup True to add, false to remove.
 * @return {void}
 */


function setupTeardownMouseCanceller(setup) {
  let events = IS_TOUCH_ONLY ? ['click'] : MOUSE_EVENTS;

  for (let i = 0, en; i < events.length; i++) {
    en = events[i];

    if (setup) {
      // reset clickLabels array
      clickedLabels.length = 0;
      document.addEventListener(en, mouseCanceller, true);
    } else {
      document.removeEventListener(en, mouseCanceller, true);
    }
  }
}

function ignoreMouse(e) {
  if (!_settings.cancelSyntheticClickEvents) {
    return;
  }

  if (!POINTERSTATE.mouse.mouseIgnoreJob) {
    setupTeardownMouseCanceller(true);
  }

  let unset = function () {
    setupTeardownMouseCanceller();
    POINTERSTATE.mouse.target = null;
    POINTERSTATE.mouse.mouseIgnoreJob = null;
  };

  POINTERSTATE.mouse.target = getComposedPath(e)[0];
  POINTERSTATE.mouse.mouseIgnoreJob = _debounce.Debouncer.debounce(POINTERSTATE.mouse.mouseIgnoreJob, _async.timeOut.after(MOUSE_TIMEOUT), unset);
}
/**
 * @param {MouseEvent} ev event to test for left mouse button down
 * @return {boolean} has left mouse button down
 */


function hasLeftMouseButton(ev) {
  let type = ev.type; // exit early if the event is not a mouse event

  if (!isMouseEvent(type)) {
    return false;
  } // ev.button is not reliable for mousemove (0 is overloaded as both left button and no buttons)
  // instead we use ev.buttons (bitmask of buttons) or fall back to ev.which (deprecated, 0 for no buttons, 1 for left button)


  if (type === 'mousemove') {
    // allow undefined for testing events
    let buttons = ev.buttons === undefined ? 1 : ev.buttons;

    if (ev instanceof window.MouseEvent && !MOUSE_HAS_BUTTONS) {
      buttons = MOUSE_WHICH_TO_BUTTONS[ev.which] || 0;
    } // buttons is a bitmask, check that the left button bit is set (1)


    return Boolean(buttons & 1);
  } else {
    // allow undefined for testing events
    let button = ev.button === undefined ? 0 : ev.button; // ev.button is 0 in mousedown/mouseup/click for left button activation

    return button === 0;
  }
}

function isSyntheticClick(ev) {
  if (ev.type === 'click') {
    // ev.detail is 0 for HTMLElement.click in most browsers
    if (ev.detail === 0) {
      return true;
    } // in the worst case, check that the x/y position of the click is within
    // the bounding box of the target of the event
    // Thanks IE 10 >:(


    let t = _findOriginalTarget(ev); // make sure the target of the event is an element so we can use getBoundingClientRect,
    // if not, just assume it is a synthetic click


    if (!t.nodeType ||
    /** @type {Element} */
    t.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    let bcr =
    /** @type {Element} */
    t.getBoundingClientRect(); // use page x/y to account for scrolling

    let x = ev.pageX,
        y = ev.pageY; // ev is a synthetic click if the position is outside the bounding box of the target

    return !(x >= bcr.left && x <= bcr.right && y >= bcr.top && y <= bcr.bottom);
  }

  return false;
}

let POINTERSTATE = {
  mouse: {
    target: null,
    mouseIgnoreJob: null
  },
  touch: {
    x: 0,
    y: 0,
    id: -1,
    scrollDecided: false
  }
};

function firstTouchAction(ev) {
  let ta = 'auto';
  let path = getComposedPath(ev);

  for (let i = 0, n; i < path.length; i++) {
    n = path[i];

    if (n[TOUCH_ACTION]) {
      ta = n[TOUCH_ACTION];
      break;
    }
  }

  return ta;
}

function trackDocument(stateObj, movefn, upfn) {
  stateObj.movefn = movefn;
  stateObj.upfn = upfn;
  document.addEventListener('mousemove', movefn);
  document.addEventListener('mouseup', upfn);
}

function untrackDocument(stateObj) {
  document.removeEventListener('mousemove', stateObj.movefn);
  document.removeEventListener('mouseup', stateObj.upfn);
  stateObj.movefn = null;
  stateObj.upfn = null;
}

if (_settings.cancelSyntheticClickEvents) {
  // use a document-wide touchend listener to start the ghost-click prevention mechanism
  // Use passive event listeners, if supported, to not affect scrolling performance
  document.addEventListener('touchend', ignoreMouse, supportsPassive ? {
    passive: true
  } : false);
}
/**
 * Returns the composedPath for the given event.
 * @param {Event} event to process
 * @return {!Array<!EventTarget>} Path of the event
 */


const getComposedPath = window.ShadyDOM && window.ShadyDOM.noPatch ? window.ShadyDOM.composedPath : event => event.composedPath && event.composedPath() || [];
/** @type {!Object<string, !GestureRecognizer>} */

const gestures = {};
/** @type {!Array<!GestureRecognizer>} */

exports.gestures = gestures;
const recognizers = [];
/**
 * Finds the element rendered on the screen at the provided coordinates.
 *
 * Similar to `document.elementFromPoint`, but pierces through
 * shadow roots.
 *
 * @param {number} x Horizontal pixel coordinate
 * @param {number} y Vertical pixel coordinate
 * @return {Element} Returns the deepest shadowRoot inclusive element
 * found at the screen position given.
 */

exports.recognizers = recognizers;

function deepTargetFind(x, y) {
  let node = document.elementFromPoint(x, y);
  let next = node; // this code path is only taken when native ShadowDOM is used
  // if there is a shadowroot, it may have a node at x/y
  // if there is not a shadowroot, exit the loop

  while (next && next.shadowRoot && !window.ShadyDOM) {
    // if there is a node at x/y in the shadowroot, look deeper
    let oldNext = next;
    next = next.shadowRoot.elementFromPoint(x, y); // on Safari, elementFromPoint may return the shadowRoot host

    if (oldNext === next) {
      break;
    }

    if (next) {
      node = next;
    }
  }

  return node;
}
/**
 * a cheaper check than ev.composedPath()[0];
 *
 * @private
 * @param {Event|Touch} ev Event.
 * @return {EventTarget} Returns the event target.
 */


function _findOriginalTarget(ev) {
  const path = getComposedPath(
  /** @type {?Event} */
  ev); // It shouldn't be, but sometimes path is empty (window on Safari).

  return path.length > 0 ? path[0] : ev.target;
}
/**
 * @private
 * @param {Event} ev Event.
 * @return {void}
 */


function _handleNative(ev) {
  let handled;
  let type = ev.type;
  let node = ev.currentTarget;
  let gobj = node[GESTURE_KEY];

  if (!gobj) {
    return;
  }

  let gs = gobj[type];

  if (!gs) {
    return;
  }

  if (!ev[HANDLED_OBJ]) {
    ev[HANDLED_OBJ] = {};

    if (type.slice(0, 5) === 'touch') {
      ev =
      /** @type {TouchEvent} */
      ev; // eslint-disable-line no-self-assign

      let t = ev.changedTouches[0];

      if (type === 'touchstart') {
        // only handle the first finger
        if (ev.touches.length === 1) {
          POINTERSTATE.touch.id = t.identifier;
        }
      }

      if (POINTERSTATE.touch.id !== t.identifier) {
        return;
      }

      if (!HAS_NATIVE_TA) {
        if (type === 'touchstart' || type === 'touchmove') {
          _handleTouchAction(ev);
        }
      }
    }
  }

  handled = ev[HANDLED_OBJ]; // used to ignore synthetic mouse events

  if (handled.skip) {
    return;
  } // reset recognizer state


  for (let i = 0, r; i < recognizers.length; i++) {
    r = recognizers[i];

    if (gs[r.name] && !handled[r.name]) {
      if (r.flow && r.flow.start.indexOf(ev.type) > -1 && r.reset) {
        r.reset();
      }
    }
  } // enforce gesture recognizer order


  for (let i = 0, r; i < recognizers.length; i++) {
    r = recognizers[i];

    if (gs[r.name] && !handled[r.name]) {
      handled[r.name] = true;
      r[type](ev);
    }
  }
}
/**
 * @private
 * @param {TouchEvent} ev Event.
 * @return {void}
 */


function _handleTouchAction(ev) {
  let t = ev.changedTouches[0];
  let type = ev.type;

  if (type === 'touchstart') {
    POINTERSTATE.touch.x = t.clientX;
    POINTERSTATE.touch.y = t.clientY;
    POINTERSTATE.touch.scrollDecided = false;
  } else if (type === 'touchmove') {
    if (POINTERSTATE.touch.scrollDecided) {
      return;
    }

    POINTERSTATE.touch.scrollDecided = true;
    let ta = firstTouchAction(ev);
    let shouldPrevent = false;
    let dx = Math.abs(POINTERSTATE.touch.x - t.clientX);
    let dy = Math.abs(POINTERSTATE.touch.y - t.clientY);

    if (!ev.cancelable) {// scrolling is happening
    } else if (ta === 'none') {
      shouldPrevent = true;
    } else if (ta === 'pan-x') {
      shouldPrevent = dy > dx;
    } else if (ta === 'pan-y') {
      shouldPrevent = dx > dy;
    }

    if (shouldPrevent) {
      ev.preventDefault();
    } else {
      prevent('track');
    }
  }
}
/**
 * Adds an event listener to a node for the given gesture type.
 *
 * @param {!EventTarget} node Node to add listener on
 * @param {string} evType Gesture type: `down`, `up`, `track`, or `tap`
 * @param {!function(!Event):void} handler Event listener function to call
 * @return {boolean} Returns true if a gesture event listener was added.
 */


function addListener(node, evType, handler) {
  if (gestures[evType]) {
    _add(node, evType, handler);

    return true;
  }

  return false;
}
/**
 * Removes an event listener from a node for the given gesture type.
 *
 * @param {!EventTarget} node Node to remove listener from
 * @param {string} evType Gesture type: `down`, `up`, `track`, or `tap`
 * @param {!function(!Event):void} handler Event listener function previously passed to
 *  `addListener`.
 * @return {boolean} Returns true if a gesture event listener was removed.
 */


function removeListener(node, evType, handler) {
  if (gestures[evType]) {
    _remove(node, evType, handler);

    return true;
  }

  return false;
}
/**
 * automate the event listeners for the native events
 *
 * @private
 * @param {!EventTarget} node Node on which to add the event.
 * @param {string} evType Event type to add.
 * @param {function(!Event)} handler Event handler function.
 * @return {void}
 */


function _add(node, evType, handler) {
  let recognizer = gestures[evType];
  let deps = recognizer.deps;
  let name = recognizer.name;
  let gobj = node[GESTURE_KEY];

  if (!gobj) {
    node[GESTURE_KEY] = gobj = {};
  }

  for (let i = 0, dep, gd; i < deps.length; i++) {
    dep = deps[i]; // don't add mouse handlers on iOS because they cause gray selection overlays

    if (IS_TOUCH_ONLY && isMouseEvent(dep) && dep !== 'click') {
      continue;
    }

    gd = gobj[dep];

    if (!gd) {
      gobj[dep] = gd = {
        _count: 0
      };
    }

    if (gd._count === 0) {
      node.addEventListener(dep, _handleNative, PASSIVE_TOUCH(dep));
    }

    gd[name] = (gd[name] || 0) + 1;
    gd._count = (gd._count || 0) + 1;
  }

  node.addEventListener(evType, handler);

  if (recognizer.touchAction) {
    setTouchAction(node, recognizer.touchAction);
  }
}
/**
 * automate event listener removal for native events
 *
 * @private
 * @param {!EventTarget} node Node on which to remove the event.
 * @param {string} evType Event type to remove.
 * @param {function(!Event): void} handler Event handler function.
 * @return {void}
 */


function _remove(node, evType, handler) {
  let recognizer = gestures[evType];
  let deps = recognizer.deps;
  let name = recognizer.name;
  let gobj = node[GESTURE_KEY];

  if (gobj) {
    for (let i = 0, dep, gd; i < deps.length; i++) {
      dep = deps[i];
      gd = gobj[dep];

      if (gd && gd[name]) {
        gd[name] = (gd[name] || 1) - 1;
        gd._count = (gd._count || 1) - 1;

        if (gd._count === 0) {
          node.removeEventListener(dep, _handleNative, PASSIVE_TOUCH(dep));
        }
      }
    }
  }

  node.removeEventListener(evType, handler);
}
/**
 * Registers a new gesture event recognizer for adding new custom
 * gesture event types.
 *
 * @param {!GestureRecognizer} recog Gesture recognizer descriptor
 * @return {void}
 */


function register(recog) {
  recognizers.push(recog);

  for (let i = 0; i < recog.emits.length; i++) {
    gestures[recog.emits[i]] = recog;
  }
}
/**
 * @private
 * @param {string} evName Event name.
 * @return {Object} Returns the gesture for the given event name.
 */


function _findRecognizerByEvent(evName) {
  for (let i = 0, r; i < recognizers.length; i++) {
    r = recognizers[i];

    for (let j = 0, n; j < r.emits.length; j++) {
      n = r.emits[j];

      if (n === evName) {
        return r;
      }
    }
  }

  return null;
}
/**
 * Sets scrolling direction on node.
 *
 * This value is checked on first move, thus it should be called prior to
 * adding event listeners.
 *
 * @param {!EventTarget} node Node to set touch action setting on
 * @param {string} value Touch action value
 * @return {void}
 */


function setTouchAction(node, value) {
  if (HAS_NATIVE_TA && node instanceof HTMLElement) {
    // NOTE: add touchAction async so that events can be added in
    // custom element constructors. Otherwise we run afoul of custom
    // elements restriction against settings attributes (style) in the
    // constructor.
    _async.microTask.run(() => {
      node.style.touchAction = value;
    });
  }

  node[TOUCH_ACTION] = value;
}
/**
 * Dispatches an event on the `target` element of `type` with the given
 * `detail`.
 * @private
 * @param {!EventTarget} target The element on which to fire an event.
 * @param {string} type The type of event to fire.
 * @param {!Object=} detail The detail object to populate on the event.
 * @return {void}
 */


function _fire(target, type, detail) {
  let ev = new Event(type, {
    bubbles: true,
    cancelable: true,
    composed: true
  });
  ev.detail = detail;
  (0, _wrap.wrap)(
  /** @type {!Node} */
  target).dispatchEvent(ev); // forward `preventDefault` in a clean way

  if (ev.defaultPrevented) {
    let preventer = detail.preventer || detail.sourceEvent;

    if (preventer && preventer.preventDefault) {
      preventer.preventDefault();
    }
  }
}
/**
 * Prevents the dispatch and default action of the given event name.
 *
 * @param {string} evName Event name.
 * @return {void}
 */


function prevent(evName) {
  let recognizer = _findRecognizerByEvent(evName);

  if (recognizer.info) {
    recognizer.info.prevent = true;
  }
}
/**
 * Reset the 2500ms timeout on processing mouse input after detecting touch input.
 *
 * Touch inputs create synthesized mouse inputs anywhere from 0 to 2000ms after the touch.
 * This method should only be called during testing with simulated touch inputs.
 * Calling this method in production may cause duplicate taps or other Gestures.
 *
 * @return {void}
 */


function resetMouseCanceller() {
  if (POINTERSTATE.mouse.mouseIgnoreJob) {
    POINTERSTATE.mouse.mouseIgnoreJob.flush();
  }
}
/* eslint-disable valid-jsdoc */


register({
  name: 'downup',
  deps: ['mousedown', 'touchstart', 'touchend'],
  flow: {
    start: ['mousedown', 'touchstart'],
    end: ['mouseup', 'touchend']
  },
  emits: ['down', 'up'],
  info: {
    movefn: null,
    upfn: null
  },

  /**
   * @this {GestureRecognizer}
   * @return {void}
   */
  reset: function () {
    untrackDocument(this.info);
  },

  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  mousedown: function (e) {
    if (!hasLeftMouseButton(e)) {
      return;
    }

    let t = _findOriginalTarget(e);

    let self = this;

    let movefn = function movefn(e) {
      if (!hasLeftMouseButton(e)) {
        downupFire('up', t, e);
        untrackDocument(self.info);
      }
    };

    let upfn = function upfn(e) {
      if (hasLeftMouseButton(e)) {
        downupFire('up', t, e);
      }

      untrackDocument(self.info);
    };

    trackDocument(this.info, movefn, upfn);
    downupFire('down', t, e);
  },

  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchstart: function (e) {
    downupFire('down', _findOriginalTarget(e), e.changedTouches[0], e);
  },

  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchend: function (e) {
    downupFire('up', _findOriginalTarget(e), e.changedTouches[0], e);
  }
});
/**
 * @param {string} type
 * @param {EventTarget} target
 * @param {Event|Touch} event
 * @param {Event=} preventer
 * @return {void}
 */

function downupFire(type, target, event, preventer) {
  if (!target) {
    return;
  }

  _fire(target, type, {
    x: event.clientX,
    y: event.clientY,
    sourceEvent: event,
    preventer: preventer,
    prevent: function (e) {
      return prevent(e);
    }
  });
}

register({
  name: 'track',
  touchAction: 'none',
  deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
  flow: {
    start: ['mousedown', 'touchstart'],
    end: ['mouseup', 'touchend']
  },
  emits: ['track'],
  info: {
    x: 0,
    y: 0,
    state: 'start',
    started: false,
    moves: [],

    /** @this {GestureInfo} */
    addMove: function (move) {
      if (this.moves.length > TRACK_LENGTH) {
        this.moves.shift();
      }

      this.moves.push(move);
    },
    movefn: null,
    upfn: null,
    prevent: false
  },

  /**
   * @this {GestureRecognizer}
   * @return {void}
   */
  reset: function () {
    this.info.state = 'start';
    this.info.started = false;
    this.info.moves = [];
    this.info.x = 0;
    this.info.y = 0;
    this.info.prevent = false;
    untrackDocument(this.info);
  },

  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  mousedown: function (e) {
    if (!hasLeftMouseButton(e)) {
      return;
    }

    let t = _findOriginalTarget(e);

    let self = this;

    let movefn = function movefn(e) {
      let x = e.clientX,
          y = e.clientY;

      if (trackHasMovedEnough(self.info, x, y)) {
        // first move is 'start', subsequent moves are 'move', mouseup is 'end'
        self.info.state = self.info.started ? e.type === 'mouseup' ? 'end' : 'track' : 'start';

        if (self.info.state === 'start') {
          // if and only if tracking, always prevent tap
          prevent('tap');
        }

        self.info.addMove({
          x: x,
          y: y
        });

        if (!hasLeftMouseButton(e)) {
          // always fire "end"
          self.info.state = 'end';
          untrackDocument(self.info);
        }

        if (t) {
          trackFire(self.info, t, e);
        }

        self.info.started = true;
      }
    };

    let upfn = function upfn(e) {
      if (self.info.started) {
        movefn(e);
      } // remove the temporary listeners


      untrackDocument(self.info);
    }; // add temporary document listeners as mouse retargets


    trackDocument(this.info, movefn, upfn);
    this.info.x = e.clientX;
    this.info.y = e.clientY;
  },

  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchstart: function (e) {
    let ct = e.changedTouches[0];
    this.info.x = ct.clientX;
    this.info.y = ct.clientY;
  },

  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchmove: function (e) {
    let t = _findOriginalTarget(e);

    let ct = e.changedTouches[0];
    let x = ct.clientX,
        y = ct.clientY;

    if (trackHasMovedEnough(this.info, x, y)) {
      if (this.info.state === 'start') {
        // if and only if tracking, always prevent tap
        prevent('tap');
      }

      this.info.addMove({
        x: x,
        y: y
      });
      trackFire(this.info, t, ct);
      this.info.state = 'track';
      this.info.started = true;
    }
  },

  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchend: function (e) {
    let t = _findOriginalTarget(e);

    let ct = e.changedTouches[0]; // only trackend if track was started and not aborted

    if (this.info.started) {
      // reset started state on up
      this.info.state = 'end';
      this.info.addMove({
        x: ct.clientX,
        y: ct.clientY
      });
      trackFire(this.info, t, ct);
    }
  }
});
/**
 * @param {!GestureInfo} info
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

function trackHasMovedEnough(info, x, y) {
  if (info.prevent) {
    return false;
  }

  if (info.started) {
    return true;
  }

  let dx = Math.abs(info.x - x);
  let dy = Math.abs(info.y - y);
  return dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE;
}
/**
 * @param {!GestureInfo} info
 * @param {?EventTarget} target
 * @param {Touch} touch
 * @return {void}
 */


function trackFire(info, target, touch) {
  if (!target) {
    return;
  }

  let secondlast = info.moves[info.moves.length - 2];
  let lastmove = info.moves[info.moves.length - 1];
  let dx = lastmove.x - info.x;
  let dy = lastmove.y - info.y;
  let ddx,
      ddy = 0;

  if (secondlast) {
    ddx = lastmove.x - secondlast.x;
    ddy = lastmove.y - secondlast.y;
  }

  _fire(target, 'track', {
    state: info.state,
    x: touch.clientX,
    y: touch.clientY,
    dx: dx,
    dy: dy,
    ddx: ddx,
    ddy: ddy,
    sourceEvent: touch,
    hover: function () {
      return deepTargetFind(touch.clientX, touch.clientY);
    }
  });
}

register({
  name: 'tap',
  deps: ['mousedown', 'click', 'touchstart', 'touchend'],
  flow: {
    start: ['mousedown', 'touchstart'],
    end: ['click', 'touchend']
  },
  emits: ['tap'],
  info: {
    x: NaN,
    y: NaN,
    prevent: false
  },

  /**
   * @this {GestureRecognizer}
   * @return {void}
   */
  reset: function () {
    this.info.x = NaN;
    this.info.y = NaN;
    this.info.prevent = false;
  },

  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  mousedown: function (e) {
    if (hasLeftMouseButton(e)) {
      this.info.x = e.clientX;
      this.info.y = e.clientY;
    }
  },

  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  click: function (e) {
    if (hasLeftMouseButton(e)) {
      trackForward(this.info, e);
    }
  },

  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchstart: function (e) {
    const touch = e.changedTouches[0];
    this.info.x = touch.clientX;
    this.info.y = touch.clientY;
  },

  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchend: function (e) {
    trackForward(this.info, e.changedTouches[0], e);
  }
});
/**
 * @param {!GestureInfo} info
 * @param {Event | Touch} e
 * @param {Event=} preventer
 * @return {void}
 */

function trackForward(info, e, preventer) {
  let dx = Math.abs(e.clientX - info.x);
  let dy = Math.abs(e.clientY - info.y); // find original target from `preventer` for TouchEvents, or `e` for MouseEvents

  let t = _findOriginalTarget(preventer || e);

  if (!t || canBeDisabled[
  /** @type {!HTMLElement} */
  t.localName] && t.hasAttribute('disabled')) {
    return;
  } // dx,dy can be NaN if `click` has been simulated and there was no `down` for `start`


  if (isNaN(dx) || isNaN(dy) || dx <= TAP_DISTANCE && dy <= TAP_DISTANCE || isSyntheticClick(e)) {
    // prevent taps from being generated if an event has canceled them
    if (!info.prevent) {
      _fire(t, 'tap', {
        x: e.clientX,
        y: e.clientY,
        sourceEvent: e,
        preventer: preventer
      });
    }
  }
}
/* eslint-enable valid-jsdoc */

/** @deprecated */


const findOriginalTarget = _findOriginalTarget;
/** @deprecated */

exports.findOriginalTarget = findOriginalTarget;
const add = addListener;
/** @deprecated */

exports.add = add;
const remove = removeListener;
exports.remove = remove;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","./async.js":"../node_modules/@polymer/polymer/lib/utils/async.js","./debounce.js":"../node_modules/@polymer/polymer/lib/utils/debounce.js","./settings.js":"../node_modules/@polymer/polymer/lib/utils/settings.js","./wrap.js":"../node_modules/@polymer/polymer/lib/utils/wrap.js"}],"../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureEventListeners = void 0;

require("../utils/boot.js");

var _mixin = require("../utils/mixin.js");

var _gestures = require("../utils/gestures.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Element class mixin that provides API for adding Polymer's cross-platform
 * gesture events to nodes.
 *
 * The API is designed to be compatible with override points implemented
 * in `TemplateStamp` such that declarative event listeners in
 * templates will support gesture events when this mixin is applied along with
 * `TemplateStamp`.
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin that provides API for adding Polymer's
 *   cross-platform gesture events to nodes
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
const GestureEventListeners = (0, _mixin.dedupingMixin)(superClass => {
  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_GestureEventListeners}
   */
  class GestureEventListeners extends superClass {
    /**
     * Add the event listener to the node if it is a gestures event.
     *
     * @param {!EventTarget} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to add
     * @return {void}
     * @override
     */
    _addEventListenerToNode(node, eventName, handler) {
      if (!(0, _gestures.addListener)(node, eventName, handler)) {
        super._addEventListenerToNode(node, eventName, handler);
      }
    }
    /**
     * Remove the event listener to the node if it is a gestures event.
     *
     * @param {!EventTarget} node Node to remove event listener from
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to remove
     * @return {void}
     * @override
     */


    _removeEventListenerFromNode(node, eventName, handler) {
      if (!(0, _gestures.removeListener)(node, eventName, handler)) {
        super._removeEventListenerFromNode(node, eventName, handler);
      }
    }

  }

  return GestureEventListeners;
});
exports.GestureEventListeners = GestureEventListeners;
},{"../utils/boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/mixin.js":"../node_modules/@polymer/polymer/lib/utils/mixin.js","../utils/gestures.js":"../node_modules/@polymer/polymer/lib/utils/gestures.js"}],"../node_modules/@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemePropertyMixin = void 0;

/**
 * @polymerMixin
 */
const ThemePropertyMixin = superClass => class VaadinThemePropertyMixin extends superClass {
  static get properties() {
    return {
      /**
       * Helper property with theme attribute value facilitating propagation
       * in shadow DOM.
       *
       * Enables the component implementation to propagate the `theme`
       * attribute value to the subcomponents in Shadow DOM by binding
       * the subcomponent’s "theme" attribute to the `theme` property of
       * the host.
       *
       * **NOTE:** Extending the mixin only provides the property for binding,
       * and does not make the propagation alone.
       *
       * See [Theme Attribute and Subcomponents](https://github.com/vaadin/vaadin-themable-mixin/wiki/5.-Theme-Attribute-and-Subcomponents).
       * page for more information.
       *
       * @protected
       */
      theme: {
        type: String,
        readOnly: true
      }
    };
  }
  /** @protected */


  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'theme') {
      this._setTheme(newValue);
    }
  }

};

exports.ThemePropertyMixin = ThemePropertyMixin;
},{}],"../node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemableMixin = void 0;

var _domModule = require("@polymer/polymer/lib/elements/dom-module.js");

var _vaadinThemePropertyMixin = require("./vaadin-theme-property-mixin.js");

/**
 * @polymerMixin
 * @mixes ThemePropertyMixin
 */
const ThemableMixin = superClass => class VaadinThemableMixin extends (0, _vaadinThemePropertyMixin.ThemePropertyMixin)(superClass) {
  /** @protected */
  static finalize() {
    super.finalize();
    const template = this.prototype._template;
    const hasOwnTemplate = this.template && this.template.parentElement && this.template.parentElement.id === this.is;

    const inheritedTemplate = Object.getPrototypeOf(this.prototype)._template;

    if (inheritedTemplate && !hasOwnTemplate) {
      // The element doesn't define its own template -> include the theme modules from the inherited template
      Array.from(inheritedTemplate.content.querySelectorAll('style[include]')).forEach(s => {
        this._includeStyle(s.getAttribute('include'), template);
      });
    }

    this._includeMatchingThemes(template);
  }
  /** @private */


  static _includeMatchingThemes(template) {
    const domModule = _domModule.DomModule;
    const modules = domModule.prototype.modules;
    let hasThemes = false;
    const defaultModuleName = this.is + '-default-theme';
    Object.keys(modules).sort((moduleNameA, moduleNameB) => {
      const vaadinA = moduleNameA.indexOf('vaadin-') === 0;
      const vaadinB = moduleNameB.indexOf('vaadin-') === 0;
      const vaadinThemePrefixes = ['lumo-', 'material-'];
      const vaadinThemeA = vaadinThemePrefixes.filter(prefix => moduleNameA.indexOf(prefix) === 0).length > 0;
      const vaadinThemeB = vaadinThemePrefixes.filter(prefix => moduleNameB.indexOf(prefix) === 0).length > 0;

      if (vaadinA !== vaadinB) {
        // Include vaadin core styles first
        return vaadinA ? -1 : 1;
      } else if (vaadinThemeA !== vaadinThemeB) {
        // Include vaadin theme styles after that
        return vaadinThemeA ? -1 : 1;
      } else {
        // Lastly include custom styles so they override all vaadin styles
        return 0;
      }
    }).forEach(moduleName => {
      if (moduleName !== defaultModuleName) {
        const themeFor = modules[moduleName].getAttribute('theme-for');

        if (themeFor) {
          themeFor.split(' ').forEach(themeForToken => {
            if (new RegExp('^' + themeForToken.split('*').join('.*') + '$').test(this.is)) {
              hasThemes = true;

              this._includeStyle(moduleName, template);
            }
          });
        }
      }
    });

    if (!hasThemes && modules[defaultModuleName]) {
      // No theme modules found, include the default module if it exists
      this._includeStyle(defaultModuleName, template);
    }
  }
  /** @private */


  static _includeStyle(moduleName, template) {
    if (template && !template.content.querySelector(`style[include="${moduleName}"]`)) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('include', moduleName);
      template.content.appendChild(styleEl);
    }
  }

};

exports.ThemableMixin = ThemableMixin;
},{"@polymer/polymer/lib/elements/dom-module.js":"../node_modules/@polymer/polymer/lib/elements/dom-module.js","./vaadin-theme-property-mixin.js":"../node_modules/@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin.js"}],"../node_modules/@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlStateMixin = void 0;

/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
// We consider the keyboard to be active if the window has received a keydown
// event since the last mousedown event.
let keyboardActive = false; // Listen for top-level keydown and mousedown events.
// Use capture phase so we detect events even if they're handled.

window.addEventListener('keydown', () => {
  keyboardActive = true;
}, {
  capture: true
});
window.addEventListener('mousedown', () => {
  keyboardActive = false;
}, {
  capture: true
});
/**
 * A private mixin to avoid problems with dynamic properties and Polymer Analyzer.
 * No need to expose these properties in the API docs.
 * @polymerMixin
 * @private
 */

const TabIndexMixin = superClass => class VaadinTabIndexMixin extends superClass {
  static get properties() {
    var properties = {
      /**
       * Internal property needed to listen to `tabindex` attribute changes.
       *
       * For changing the tabindex of this component use the native `tabIndex` property.
       * @private
       */
      tabindex: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
        observer: '_tabindexChanged'
      }
    };

    if (window.ShadyDOM) {
      // ShadyDOM browsers need the `tabIndex` in order to notify when the user changes it programmatically.
      properties['tabIndex'] = properties.tabindex;
    }

    return properties;
  }

};
/**
 * Polymer.IronControlState is not a proper 2.0 class, also, its tabindex
 * implementation fails in the shadow dom, so we have this for vaadin elements.
 * @polymerMixin
 */


const ControlStateMixin = superClass => class VaadinControlStateMixin extends TabIndexMixin(superClass) {
  static get properties() {
    return {
      /**
       * Specify that this control should have input focus when the page loads.
       */
      autofocus: {
        type: Boolean
      },

      /**
       * Stores the previous value of tabindex attribute of the disabled element
       * @private
       */
      _previousTabIndex: {
        type: Number
      },

      /**
       * If true, the user cannot interact with this element.
       */
      disabled: {
        type: Boolean,
        observer: '_disabledChanged',
        reflectToAttribute: true
      },

      /**
       * @private
       */
      _isShiftTabbing: {
        type: Boolean
      }
    };
  }
  /**
   * @protected
   */


  ready() {
    this.addEventListener('focusin', e => {
      if (e.composedPath()[0] === this) {
        // Only focus if the focus is received from somewhere outside
        if (!this.contains(e.relatedTarget)) {
          this._focus();
        }
      } else if (e.composedPath().indexOf(this.focusElement) !== -1 && !this.disabled) {
        this._setFocused(true);
      }
    });
    this.addEventListener('focusout', e => this._setFocused(false)); // In super.ready() other 'focusin' and 'focusout' listeners might be
    // added, so we call it after our own ones to ensure they execute first.
    // Issue to watch out: when incorrect, <vaadin-combo-box> refocuses the
    // input field on iOS after “Done” is pressed.

    super.ready(); // This fixes the bug in Firefox 61 (https://bugzilla.mozilla.org/show_bug.cgi?id=1472887)
    // where focusout event does not go out of shady DOM because composed property in the event is not true

    const ensureEventComposed = e => {
      if (!e.composed) {
        e.target.dispatchEvent(new CustomEvent(e.type, {
          bubbles: true,
          composed: true,
          cancelable: false
        }));
      }
    };

    this.shadowRoot.addEventListener('focusin', ensureEventComposed);
    this.shadowRoot.addEventListener('focusout', ensureEventComposed);
    this.addEventListener('keydown', e => {
      if (!e.defaultPrevented && e.keyCode === 9) {
        if (e.shiftKey) {
          // Flag is checked in _focus event handler.
          this._isShiftTabbing = true;
          HTMLElement.prototype.focus.apply(this);

          this._setFocused(false); // Event handling in IE is asynchronous and the flag is removed asynchronously as well


          setTimeout(() => this._isShiftTabbing = false, 0);
        } else {
          // Workaround for FF63-65 bug that causes the focus to get lost when
          // blurring a slotted component with focusable shadow root content
          // https://bugzilla.mozilla.org/show_bug.cgi?id=1528686
          // TODO: Remove when safe
          const firefox = window.navigator.userAgent.match(/Firefox\/(\d\d\.\d)/);

          if (firefox && parseFloat(firefox[1]) >= 63 && parseFloat(firefox[1]) < 66 && this.parentNode && this.nextSibling) {
            const fakeTarget = document.createElement('input');
            fakeTarget.style.position = 'absolute';
            fakeTarget.style.opacity = '0';
            fakeTarget.tabIndex = this.tabIndex;
            this.parentNode.insertBefore(fakeTarget, this.nextSibling);
            fakeTarget.focus();
            fakeTarget.addEventListener('focusout', () => this.parentNode.removeChild(fakeTarget));
          }
        }
      }
    });

    if (this.autofocus && !this.disabled) {
      window.requestAnimationFrame(() => {
        this._focus();

        this._setFocused(true);

        this.setAttribute('focus-ring', '');
      });
    }
  }
  /**
   * @protected
   */


  disconnectedCallback() {
    super.disconnectedCallback(); // in non-Chrome browsers, blur does not fire on the element when it is disconnected.
    // reproducible in `<vaadin-date-picker>` when closing on `Cancel` or `Today` click.

    if (this.hasAttribute('focused')) {
      this._setFocused(false);
    }
  }
  /**
   * @param {boolean} focused
   * @protected
   */


  _setFocused(focused) {
    if (focused) {
      this.setAttribute('focused', '');
    } else {
      this.removeAttribute('focused');
    } // focus-ring is true when the element was focused from the keyboard.
    // Focus Ring [A11ycasts]: https://youtu.be/ilj2P5-5CjI


    if (focused && keyboardActive) {
      this.setAttribute('focus-ring', '');
    } else {
      this.removeAttribute('focus-ring');
    }
  }
  /**
   * Any element extending this mixin is required to implement this getter.
   * It returns the actual focusable element in the component.
   * @return {Element | null | undefined}
   */


  get focusElement() {
    window.console.warn(`Please implement the 'focusElement' property in <${this.localName}>`);
    return this;
  }
  /**
   * @protected
   */


  _focus() {
    if (!this.focusElement || this._isShiftTabbing) {
      return;
    }

    this.focusElement.focus();

    this._setFocused(true);
  }
  /**
   * Moving the focus from the host element causes firing of the blur event what leads to problems in IE.
   * @private
   */


  focus() {
    if (!this.focusElement || this.disabled) {
      return;
    }

    this.focusElement.focus();

    this._setFocused(true);
  }
  /**
   * Native bluring in the host element does nothing because it does not have the focus.
   * In chrome it works, but not in FF.
   * @private
   */


  blur() {
    if (!this.focusElement) {
      return;
    }

    this.focusElement.blur();

    this._setFocused(false);
  }
  /**
   * @param {boolean} disabled
   * @private
   */


  _disabledChanged(disabled) {
    this.focusElement.disabled = disabled;

    if (disabled) {
      this.blur();
      this._previousTabIndex = this.tabindex;
      this.tabindex = -1;
      this.setAttribute('aria-disabled', 'true');
    } else {
      if (typeof this._previousTabIndex !== 'undefined') {
        this.tabindex = this._previousTabIndex;
      }

      this.removeAttribute('aria-disabled');
    }
  }
  /**
   * @param {number | null | undefined} tabindex
   * @private
   */


  _tabindexChanged(tabindex) {
    if (tabindex !== undefined) {
      this.focusElement.tabIndex = tabindex;
    }

    if (this.disabled && this.tabindex) {
      // If tabindex attribute was changed while checkbox was disabled
      if (this.tabindex !== -1) {
        this._previousTabIndex = this.tabindex;
      }

      this.tabindex = tabindex = undefined;
    }

    if (window.ShadyDOM) {
      this.setProperties({
        tabIndex: tabindex,
        tabindex: tabindex
      });
    }
  }
  /**
   * @protected
   */


  click() {
    if (!this.disabled) {
      super.click();
    }
  }

};

exports.ControlStateMixin = ControlStateMixin;
},{}],"../node_modules/@polymer/polymer/lib/utils/flush.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "enqueueDebouncer", {
  enumerable: true,
  get: function () {
    return _debounce.enqueueDebouncer;
  }
});
exports.flush = void 0;

require("./boot.js");

var _debounce = require("../utils/debounce.js");

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Forces several classes of asynchronously queued tasks to flush:
 * - Debouncers added via `enqueueDebouncer`
 * - ShadyDOM distribution
 *
 * @return {void}
 */
const flush = function () {
  let shadyDOM, debouncers;

  do {
    shadyDOM = window.ShadyDOM && ShadyDOM.flush();

    if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
      window.ShadyCSS.ScopingShim.flush();
    }

    debouncers = (0, _debounce.flushDebouncers)();
  } while (shadyDOM || debouncers);
};

exports.flush = flush;
},{"./boot.js":"../node_modules/@polymer/polymer/lib/utils/boot.js","../utils/debounce.js":"../node_modules/@polymer/polymer/lib/utils/debounce.js"}],"../node_modules/@vaadin/vaadin-element-mixin/vaadin-dir-helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirHelper = void 0;

/**
@license
Copyright (c) 2020 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/

/**
 * Helper that provides a set of functions for RTL.
 */
class DirHelper {
  /**
   * Get the scroll type in the current browser view.
   *
   * @return {string} the scroll type. Possible values are `default|reverse|negative`
   */
  static detectScrollType() {
    const dummy = document.createElement('div');
    dummy.textContent = 'ABCD';
    dummy.dir = 'rtl';
    dummy.style.fontSize = '14px';
    dummy.style.width = '4px';
    dummy.style.height = '1px';
    dummy.style.position = 'absolute';
    dummy.style.top = '-1000px';
    dummy.style.overflow = 'scroll';
    document.body.appendChild(dummy);
    let cachedType = 'reverse';

    if (dummy.scrollLeft > 0) {
      cachedType = 'default';
    } else {
      dummy.scrollLeft = 2;

      if (dummy.scrollLeft < 2) {
        cachedType = 'negative';
      }
    }

    document.body.removeChild(dummy);
    return cachedType;
  }
  /**
   * Get the scrollLeft value of the element relative to the direction
   *
   * @param {string} scrollType type of the scroll detected with `detectScrollType`
   * @param {string} direction current direction of the element
   * @param {Element} element
   * @return {number} the scrollLeft value.
  */


  static getNormalizedScrollLeft(scrollType, direction, element) {
    const {
      scrollLeft
    } = element;

    if (direction !== 'rtl' || !scrollType) {
      return scrollLeft;
    }

    switch (scrollType) {
      case 'negative':
        return element.scrollWidth - element.clientWidth + scrollLeft;

      case 'reverse':
        return element.scrollWidth - element.clientWidth - scrollLeft;
    }

    return scrollLeft;
  }
  /**
   * Set the scrollLeft value of the element relative to the direction
   *
   * @param {string} scrollType type of the scroll detected with `detectScrollType`
   * @param {string} direction current direction of the element
   * @param {Element} element
   * @param {number} scrollLeft the scrollLeft value to be set
   */


  static setNormalizedScrollLeft(scrollType, direction, element, scrollLeft) {
    if (direction !== 'rtl' || !scrollType) {
      element.scrollLeft = scrollLeft;
      return;
    }

    switch (scrollType) {
      case 'negative':
        element.scrollLeft = element.clientWidth - element.scrollWidth + scrollLeft;
        break;

      case 'reverse':
        element.scrollLeft = element.scrollWidth - element.clientWidth - scrollLeft;
        break;

      default:
        element.scrollLeft = scrollLeft;
        break;
    }
  }

}

exports.DirHelper = DirHelper;
},{}],"../node_modules/@vaadin/vaadin-element-mixin/vaadin-dir-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirMixin = void 0;

var _vaadinDirHelper = require("./vaadin-dir-helper.js");

/**
 * Array of Vaadin custom element classes that have been subscribed to the dir changes.
 */
const directionSubscribers = [];

const directionUpdater = function () {
  const documentDir = getDocumentDir();
  directionSubscribers.forEach(element => {
    alignDirs(element, documentDir);
  });
};

let scrollType;
const directionObserver = new MutationObserver(directionUpdater);
directionObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['dir']
});

const alignDirs = function (element, documentDir) {
  if (documentDir) {
    element.setAttribute('dir', documentDir);
  } else {
    element.removeAttribute('dir');
  }
};

const getDocumentDir = function () {
  return document.documentElement.getAttribute('dir');
};
/**
 * @polymerMixin
 */


const DirMixin = superClass => class VaadinDirMixin extends superClass {
  static get properties() {
    return {
      /**
       * @protected
       */
      dir: {
        type: String,
        readOnly: true
      }
    };
  }
  /** @protected */


  static finalize() {
    super.finalize();

    if (!scrollType) {
      scrollType = _vaadinDirHelper.DirHelper.detectScrollType();
    }
  }
  /** @protected */


  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('dir')) {
      this.__subscribe();

      alignDirs(this, getDocumentDir());
    }
  }
  /** @protected */


  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name !== 'dir') {
      return;
    } // New value equals to the document direction and the element is not subscribed to the changes


    const newValueEqlDocDir = newValue === getDocumentDir() && directionSubscribers.indexOf(this) === -1; // Value was emptied and the element is not subscribed to the changes

    const newValueEmptied = !newValue && oldValue && directionSubscribers.indexOf(this) === -1; // New value is different and the old equals to document direction and the element is not subscribed to the changes

    const newDiffValue = newValue !== getDocumentDir() && oldValue === getDocumentDir();

    if (newValueEqlDocDir || newValueEmptied) {
      this.__subscribe();

      alignDirs(this, getDocumentDir());
    } else if (newDiffValue) {
      this.__subscribe(false);
    }
  }
  /** @protected */


  disconnectedCallback() {
    super.disconnectedCallback();

    this.__subscribe(false);

    this.removeAttribute('dir');
  }
  /** @private */


  __subscribe(push = true) {
    if (push) {
      directionSubscribers.indexOf(this) === -1 && directionSubscribers.push(this);
    } else {
      directionSubscribers.indexOf(this) > -1 && directionSubscribers.splice(directionSubscribers.indexOf(this), 1);
    }
  }
  /**
   * @param {Element} element
   * @return {number}
   * @protected
   */


  __getNormalizedScrollLeft(element) {
    return _vaadinDirHelper.DirHelper.getNormalizedScrollLeft(scrollType, this.getAttribute('dir') || 'ltr', element);
  }
  /**
   * @param {Element} element
   * @param {number} scrollLeft
   * @protected
   */


  __setNormalizedScrollLeft(element, scrollLeft) {
    return _vaadinDirHelper.DirHelper.setNormalizedScrollLeft(scrollType, this.getAttribute('dir') || 'ltr', element, scrollLeft);
  }

};

exports.DirMixin = DirMixin;
},{"./vaadin-dir-helper.js":"../node_modules/@vaadin/vaadin-element-mixin/vaadin-dir-helper.js"}],"../node_modules/@vaadin/vaadin-development-mode-detector/vaadin-development-mode-detector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runIfDevelopmentMode = void 0;
const DEV_MODE_CODE_REGEXP = /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;
const FlowClients = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;

function isMinified() {
  function test() {
    /** vaadin-dev-mode:start
    return false;
    vaadin-dev-mode:end **/
    return true;
  }

  return uncommentAndRun(test);
}

function isDevelopmentMode() {
  try {
    if (isForcedDevelopmentMode()) {
      return true;
    }

    if (!isLocalhost()) {
      return false;
    }

    if (FlowClients) {
      return !isFlowProductionMode();
    }

    return !isMinified();
  } catch (e) {
    // Some error in this code, assume production so no further actions will be taken
    return false;
  }
}

function isForcedDevelopmentMode() {
  return localStorage.getItem("vaadin.developmentmode.force");
}

function isLocalhost() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}

function isFlowProductionMode() {
  if (FlowClients) {
    const productionModeApps = Object.keys(FlowClients).map(key => FlowClients[key]).filter(client => client.productionMode);

    if (productionModeApps.length > 0) {
      return true;
    }
  }

  return false;
}

function uncommentAndRun(callback, args) {
  if (typeof callback !== 'function') {
    return;
  }

  const match = DEV_MODE_CODE_REGEXP.exec(callback.toString());

  if (match) {
    try {
      // requires CSP: script-src 'unsafe-eval'
      callback = new Function(match[1]);
    } catch (e) {
      // eat the exception
      console.log('vaadin-development-mode-detector: uncommentAndRun() failed', e);
    }
  }

  return callback(args);
} // A guard against polymer-modulizer removing the window.Vaadin
// initialization above.


window['Vaadin'] = window['Vaadin'] || {};
/**
 * Inspects the source code of the given `callback` function for
 * specially-marked _commented_ code. If such commented code is found in the
 * callback source, uncomments and runs that code instead of the callback
 * itself. Otherwise runs the callback as is.
 *
 * The optional arguments are passed into the callback / uncommented code,
 * the result is returned.
 *
 * See the `isMinified()` function source code in this file for an example.
 *
 */

const runIfDevelopmentMode = function (callback, args) {
  if (window.Vaadin.developmentMode) {
    return uncommentAndRun(callback, args);
  }
};

exports.runIfDevelopmentMode = runIfDevelopmentMode;

if (window.Vaadin.developmentMode === undefined) {
  window.Vaadin.developmentMode = isDevelopmentMode();
}
},{}],"../node_modules/@vaadin/vaadin-usage-statistics/vaadin-usage-statistics-collect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usageStatistics = void 0;

var _vaadinDevelopmentModeDetector = require("@vaadin/vaadin-development-mode-detector/vaadin-development-mode-detector.js");

/* This file is autogenerated from src/vaadin-usage-statistics.tpl.html */

/*

This script gathers usage statistics from the application running in development mode.

Statistics gathering is automatically disabled and excluded from production builds.

For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.

*/

/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
function maybeGatherAndSendStats() {
  /** vaadin-dev-mode:start
  (function () {
  'use strict';
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
  } : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
  };
  var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
   return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
  }();
  var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
  };
  var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);
     this.now = new Date().getTime();
    this.logger = logger;
  }
   createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }
           jQuery.toString = function () {
            return _jQuery.toString();
          };
           return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];
       types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });
       var previousStats = JSON.stringify(storedStats);
       this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);
       var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });
       var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
  }();
  var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);
     this.key = key;
  }
   createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });
       return empty;
    }
  }]);
  return StatisticsStorage;
  }();
  var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);
     this.url = url;
    this.logger = logger;
  }
   createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;
       if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);
       var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
  }();
  var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);
     this.id = id;
  }
   createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
  }();
  var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);
     this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;
     this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }
   createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;
       if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
       if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }
       if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }
       this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);
       // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.0';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
  }();
  try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
  } catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
  }
  }());
   vaadin-dev-mode:end **/
}

const usageStatistics = function () {
  if (typeof _vaadinDevelopmentModeDetector.runIfDevelopmentMode === 'function') {
    return (0, _vaadinDevelopmentModeDetector.runIfDevelopmentMode)(maybeGatherAndSendStats);
  }
};

exports.usageStatistics = usageStatistics;
},{"@vaadin/vaadin-development-mode-detector/vaadin-development-mode-detector.js":"../node_modules/@vaadin/vaadin-development-mode-detector/vaadin-development-mode-detector.js"}],"../node_modules/@vaadin/vaadin-usage-statistics/vaadin-usage-statistics.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vaadinUsageStatisticsCollect = require("./vaadin-usage-statistics-collect.js");

Object.keys(_vaadinUsageStatisticsCollect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vaadinUsageStatisticsCollect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vaadinUsageStatisticsCollect[key];
    }
  });
});
},{"./vaadin-usage-statistics-collect.js":"../node_modules/@vaadin/vaadin-usage-statistics/vaadin-usage-statistics-collect.js"}],"../node_modules/@vaadin/vaadin-element-mixin/vaadin-element-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementMixin = void 0;

var _async = require("@polymer/polymer/lib/utils/async.js");

var _debounce = require("@polymer/polymer/lib/utils/debounce.js");

var _flush = require("@polymer/polymer/lib/utils/flush.js");

var _vaadinDirMixin = require("./vaadin-dir-mixin.js");

var _vaadinUsageStatistics = require("@vaadin/vaadin-usage-statistics/vaadin-usage-statistics.js");

if (!window.Vaadin) {
  window['Vaadin'] = {};
}
/**
 * Array of Vaadin custom element classes that have been finalized.
 */


window['Vaadin'].registrations = window.Vaadin.registrations || []; // Use the hack to prevent polymer-modulizer from converting to exports

window['Vaadin'].developmentModeCallback = window.Vaadin.developmentModeCallback || {};

window['Vaadin'].developmentModeCallback['vaadin-usage-statistics'] = function () {
  if (_vaadinUsageStatistics.usageStatistics) {
    (0, _vaadinUsageStatistics.usageStatistics)();
  }
};

let statsJob;
const registered = new Set();
/**
 * @polymerMixin
 * @mixes DirMixin
 */

const ElementMixin = superClass => class VaadinElementMixin extends (0, _vaadinDirMixin.DirMixin)(superClass) {
  /** @protected */
  static finalize() {
    super.finalize();
    const {
      is
    } = this; // Registers a class prototype for telemetry purposes.

    if (is && !registered.has(is)) {
      window.Vaadin.registrations.push(this);
      registered.add(is);

      if (window.Vaadin.developmentModeCallback) {
        statsJob = _debounce.Debouncer.debounce(statsJob, _async.idlePeriod, () => {
          window.Vaadin.developmentModeCallback['vaadin-usage-statistics']();
        });
        (0, _flush.enqueueDebouncer)(statsJob);
      }
    }
  }

  constructor() {
    super();

    if (document.doctype === null) {
      console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.');
    }
  }

};

exports.ElementMixin = ElementMixin;
},{"@polymer/polymer/lib/utils/async.js":"../node_modules/@polymer/polymer/lib/utils/async.js","@polymer/polymer/lib/utils/debounce.js":"../node_modules/@polymer/polymer/lib/utils/debounce.js","@polymer/polymer/lib/utils/flush.js":"../node_modules/@polymer/polymer/lib/utils/flush.js","./vaadin-dir-mixin.js":"../node_modules/@vaadin/vaadin-element-mixin/vaadin-dir-mixin.js","@vaadin/vaadin-usage-statistics/vaadin-usage-statistics.js":"../node_modules/@vaadin/vaadin-usage-statistics/vaadin-usage-statistics.js"}],"../node_modules/@vaadin/vaadin-button/src/vaadin-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonElement = void 0;

var _polymerElement = require("@polymer/polymer/polymer-element.js");

var _gestureEventListeners = require("@polymer/polymer/lib/mixins/gesture-event-listeners.js");

var _vaadinThemableMixin = require("@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js");

var _vaadinControlStateMixin = require("@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js");

var _vaadinElementMixin = require("@vaadin/vaadin-element-mixin/vaadin-element-mixin.js");

var _htmlTag = require("@polymer/polymer/lib/utils/html-tag.js");

var _gestures = require("@polymer/polymer/lib/utils/gestures.js");

/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/

/**
 * `<vaadin-button>` is a Web Component providing an accessible and customizable button.
 *
 * ```html
 * <vaadin-button>
 * </vaadin-button>
 * ```
 *
 * ```js
 * document.querySelector('vaadin-button').addEventListener('click', () => alert('Hello World!'));
 * ```
 *
 * ### Styling
 *
 * The following shadow DOM parts are exposed for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `label` | The label (text) inside the button
 * `prefix` | A slot for e.g. an icon before the label
 * `suffix` | A slot for e.g. an icon after the label
 *
 *
 * The following attributes are exposed for styling:
 *
 * Attribute | Description
 * --------- | -----------
 * `active` | Set when the button is pressed down, either with mouse, touch or the keyboard.
 * `disabled` | Set when the button is disabled.
 * `focus-ring` | Set when the button is focused using the keyboard.
 * `focused` | Set when the button is focused.
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends PolymerElement
 * @mixes ElementMixin
 * @mixes ControlStateMixin
 * @mixes ThemableMixin
 * @mixes GestureEventListeners
 * @demo demo/index.html
 */
class ButtonElement extends (0, _vaadinElementMixin.ElementMixin)((0, _vaadinControlStateMixin.ControlStateMixin)((0, _vaadinThemableMixin.ThemableMixin)((0, _gestureEventListeners.GestureEventListeners)(_polymerElement.PolymerElement)))) {
  static get template() {
    return (0, _htmlTag.html)`
    <style>
      :host {
        display: inline-block;
        position: relative;
        outline: none;
        white-space: nowrap;
      }

      :host([hidden]) {
        display: none !important;
      }

      /* Ensure the button is always aligned on the baseline */
      .vaadin-button-container::before {
        content: "\\2003";
        display: inline-block;
        width: 0;
      }

      .vaadin-button-container {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%;
        min-height: inherit;
        text-shadow: inherit;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      [part="prefix"],
      [part="suffix"] {
        flex: none;
      }

      [part="label"] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #button {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
      }
    </style>
    <div class="vaadin-button-container">
      <div part="prefix">
        <slot name="prefix"></slot>
      </div>
      <div part="label">
        <slot></slot>
      </div>
      <div part="suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <button id="button" type="button"></button>
`;
  }

  static get is() {
    return 'vaadin-button';
  }

  static get version() {
    return '2.4.0';
  }

  ready() {
    super.ready(); // Leaving default role in the native button, makes navigation announcement
    // being different when using focus navigation (tab) versus using normal
    // navigation (arrows). The first way announces the label on a button
    // since the focus is moved programmatically, and the second on a group.

    this.setAttribute('role', 'button');
    this.$.button.setAttribute('role', 'presentation');

    this._addActiveListeners(); // Fix for https://github.com/vaadin/vaadin-button-flow/issues/120


    window.ShadyDOM && window.ShadyDOM.flush();
  }
  /**
   * @protected
   */


  disconnectedCallback() {
    super.disconnectedCallback(); // `active` state is preserved when the element is disconnected between keydown and keyup events.
    // reproducible in `<vaadin-date-picker>` when closing on `Cancel` or `Today` click.

    if (this.hasAttribute('active')) {
      this.removeAttribute('active');
    }
  }
  /** @private */


  _addActiveListeners() {
    (0, _gestures.addListener)(this, 'down', () => !this.disabled && this.setAttribute('active', ''));
    (0, _gestures.addListener)(this, 'up', () => this.removeAttribute('active'));
    this.addEventListener('keydown', e => !this.disabled && [13, 32].indexOf(e.keyCode) >= 0 && this.setAttribute('active', ''));
    this.addEventListener('keyup', () => this.removeAttribute('active'));
    this.addEventListener('blur', () => this.removeAttribute('active'));
  }
  /**
   * @protected
   * @return {Element}
   */


  get focusElement() {
    return this.$.button;
  }

}

exports.ButtonElement = ButtonElement;
customElements.define(ButtonElement.is, ButtonElement);
},{"@polymer/polymer/polymer-element.js":"../node_modules/@polymer/polymer/polymer-element.js","@polymer/polymer/lib/mixins/gesture-event-listeners.js":"../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js","@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js":"../node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js","@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js":"../node_modules/@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js","@vaadin/vaadin-element-mixin/vaadin-element-mixin.js":"../node_modules/@vaadin/vaadin-element-mixin/vaadin-element-mixin.js","@polymer/polymer/lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js","@polymer/polymer/lib/utils/gestures.js":"../node_modules/@polymer/polymer/lib/utils/gestures.js"}],"../node_modules/@vaadin/vaadin-button/theme/lumo/vaadin-button.js":[function(require,module,exports) {
"use strict";

require("./vaadin-button-styles.js");

require("../../src/vaadin-button.js");
},{"./vaadin-button-styles.js":"../node_modules/@vaadin/vaadin-button/theme/lumo/vaadin-button-styles.js","../../src/vaadin-button.js":"../node_modules/@vaadin/vaadin-button/src/vaadin-button.js"}],"../node_modules/@vaadin/vaadin-button/vaadin-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./theme/lumo/vaadin-button.js");

var _vaadinButton2 = require("./src/vaadin-button.js");

Object.keys(_vaadinButton2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vaadinButton2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vaadinButton2[key];
    }
  });
});
},{"./theme/lumo/vaadin-button.js":"../node_modules/@vaadin/vaadin-button/theme/lumo/vaadin-button.js","./src/vaadin-button.js":"../node_modules/@vaadin/vaadin-button/src/vaadin-button.js"}],"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-email-field-styles.js":[function(require,module,exports) {
"use strict";

var _htmlTag = require("@polymer/polymer/lib/utils/html-tag.js");

const $_documentContainer = (0, _htmlTag.html)`<dom-module id="lumo-email-field" theme-for="vaadin-email-field">
  <template>
    <style>
      :not(*):placeholder-shown, /* to prevent broken styles on IE */
      :host([dir="rtl"]) [part="value"]:placeholder-shown,
      :host([dir="rtl"]) [part="input-field"] ::slotted(input:placeholder-shown) {
        --_lumo-text-field-overflow-mask-image: none;
      }

      :host([dir="rtl"]) [part="value"],
      :host([dir="rtl"]) [part="input-field"] ::slotted(input) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
},{"@polymer/polymer/lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/mixins/required-field.js":[function(require,module,exports) {
"use strict";

require("../color.js");

require("../spacing.js");

require("../style.js");

require("../typography.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="lumo-required-field">
  <template>
    <style>
      [part="label"] {
        align-self: flex-start;
        color: var(--lumo-secondary-text-color);
        font-weight: 500;
        font-size: var(--lumo-font-size-s);
        margin-left: calc(var(--lumo-border-radius-m) / 4);
        transition: color 0.2s;
        line-height: 1;
        padding-bottom: 0.5em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        max-width: 100%;
        box-sizing: border-box;
      }

      :host([has-label])::before {
        margin-top: calc(var(--lumo-font-size-s) * 1.5);
      }

      :host([has-label]) {
        padding-top: var(--lumo-space-m);
      }

      :host([required]) [part="label"] {
        padding-right: 1em;
      }

      [part="label"]::after {
        content: var(--lumo-required-field-indicator, "•");
        transition: opacity 0.2s;
        opacity: 0;
        color: var(--lumo-primary-text-color);
        position: absolute;
        right: 0;
        width: 1em;
        text-align: center;
      }

      :host([required]:not([has-value])) [part="label"]::after {
        opacity: 1;
      }

      :host([invalid]) [part="label"]::after {
        color: var(--lumo-error-text-color);
      }

      [part="error-message"] {
        margin-left: calc(var(--lumo-border-radius-m) / 4);
        font-size: var(--lumo-font-size-xs);
        line-height: var(--lumo-line-height-xs);
        color: var(--lumo-error-text-color);
        will-change: max-height;
        transition: 0.4s max-height;
        max-height: 5em;
      }

      /* Margin that doesn’t reserve space when there’s no error message */
      [part="error-message"]:not(:empty)::before,
      [part="error-message"]:not(:empty)::after {
        content: "";
        display: block;
        height: 0.4em;
      }

      :host(:not([invalid])) [part="error-message"] {
        max-height: 0;
        overflow: hidden;
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="label"] {
        margin-left: 0;
        margin-right: calc(var(--lumo-border-radius-m) / 4);
      }

      :host([required][dir="rtl"]) [part="label"] {
        padding-left: 1em;
        padding-right: 0;
      }

      :host([dir="rtl"]) [part="label"]::after {
        right: auto;
        left: 0;
      }

      :host([dir="rtl"]) [part="error-message"] {
        margin-left: 0;
        margin-right: calc(var(--lumo-border-radius-m) / 4);
      }

    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
},{"../color.js":"../node_modules/@vaadin/vaadin-lumo-styles/color.js","../spacing.js":"../node_modules/@vaadin/vaadin-lumo-styles/spacing.js","../style.js":"../node_modules/@vaadin/vaadin-lumo-styles/style.js","../typography.js":"../node_modules/@vaadin/vaadin-lumo-styles/typography.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/font-icons.js":[function(require,module,exports) {
"use strict";

require("@polymer/polymer/lib/elements/custom-style.js");

require("./version.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
  <style>
    @font-face {
      font-family: 'lumo-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABEcAAsAAAAAIiwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAQwAAAFZAIUuKY21hcAAAAYgAAAD4AAADrsCU8d5nbHlmAAACgAAAC2MAABd4h9To2WhlYWQAAA3kAAAAMAAAADZa/6SsaGhlYQAADhQAAAAdAAAAJAbpA35obXR4AAAONAAAABAAAACspBAAAGxvY2EAAA5EAAAAWAAAAFh55IAsbWF4cAAADpwAAAAfAAAAIAFKAXBuYW1lAAAOvAAAATEAAAIuUUJZCHBvc3QAAA/wAAABKwAAAelm8SzVeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGS+yDiBgZWBgamKaQ8DA0MPhGZ8wGDIyAQUZWBlZsAKAtJcUxgcXjG+0mIO+p/FEMUcxDANKMwIkgMABn8MLQB4nO3SWW6DMABF0UtwCEnIPM/zhLK8LqhfXRybSP14XUYtHV9hGYQwQBNIo3cUIPkhQeM7rib1ekqnXg981XuC1qvy84lzojleh3puxL0hPjGjRU473teloEefAUNGjJkwZcacBUtWrNmwZceeA0dOnLlw5cadB09elPGhGf+j0NTI/65KfXerT6JhqKnpRKtgOpuqaTrtKjPUlqHmhto21I7pL6i6hlqY3q7qGWrfUAeGOjTUkaGODXViqFNDnRnq3FAXhro01JWhrg11Y6hbQ90Z6t5QD4Z6NNSToZ4N9WKoV0O9GerdUB+G+jTUl6GWRvkL24BkEXictVh9bFvVFb/nxvbz+7Rf/N6zHcd2bCfP+Wgc1Z9N0jpNnEL6kbRVS6HA2hQYGh9TGR1CbCqa2rXrWOkQE/sHNJgmtZvoVNZqE1B1DNHxzTQxCehUTYiJTQyENui0qSLezr3PduyQfgmRWOfde8+9551z7rnn/O4jLoJ/bRP0UaKQMLFJjpBAvphLZC3Dk0ok7WBzR2/upJs7Ryw/nfFbln/uuN/apCvwrKLrSvUqRufbm5pn0fs0w4gYxnGVP6qHnO4bWiDQGQgwtS6lm3lB3QoX1M2vwEmuzirF39y+Es2+DJ8d1pkyqBIqoze3D1+Zz4DrFoazxI8dWwMrDlZ2DMqQAR9AROsJU+2cmlTPazTco52F1xTa2a2+K8vvq92dVHmtLoPeQX/AZPRYGthDYOeZjBjKoFsVGulR3lWU95WeCK44qHU7MhWUGUKZDT3oKUcG2GWuh+EDDfUYA/jhAhl0TOsJNYSEu7mQmi3UzfXwZKA4BsVsHLXQYGgRW95uEtpJ1Vfn9XiLriRBlFEqxsDjA09yCNUoQxxwd7KWSTt2y3GTKiflqHRSoWZc3m11Wa/fJdFgXD4sSYfleJBKd8GMz7J8dZn/cGRCcKGDnA2Ge3fKzcvlnTDNthGWLXzX/WaXtUAmRgeLlHSr30r0G9UTXMb0AtmwzOoy73fkSlHZkduw/TYuU9cAD4YutPoxTTsA3797wVr4Z/1NC5zARHr4vtxJjxIfiZMhMkbWk+14BnJZKwqGZwDfswLyxWDSg11rFLJF7Nopxjd1h1/QOT+oezgfu3Yq+Hk+duf5x+40o1GTkaIgikK/IEnC6aYxCUBaZJSN4XTYFjU/YMNIKqJwhDGOCCI8FDXnXmXjtGhGJyShqjAOnBOkW2JG9S7GgYeMWAU5JzhnWmBOaOM+CKEPoqSfFDC2Unq+DLlUgUVUFFLZGJg6jtlojsdsa8kPObPuJdi5dnBdBsLJMGTWDa4t2JvtwuPo9s+Y86suv/W33QG1rAaOAUV+vx4K6f2D04PVKlC7WLSrZzAi45ZV6lIC7WoXqmRyvUqoVwrzUoVsIjeTXWQv+RH5GTlBXiB/In8ln0IbBCAFOajAJrgZYyOHWqOfUe/aHjI12R6OQo1jCgt215l+4f6XPb+0MNou0V+43n2F77tSfRb24d7zitgnKmvYHs69zugaPvBwv6ioXkb2LdL65Atw51uLkXlu1bhMMRcXSPcYoqKIRlh34lQP8/5JbuUFye4vxD6/6MxFF11C0uVLr9Ulgw44tS3pMViNLUExbycFgLIct+QDMibRimx1ydUz8FXZiuOIDBOMVX2nUZc+huNE5XUJ81uiJoiabwqaVF0uacKbau/pl4R2VW0XXlJra6boVrYG646TF5NYzwy4vjENVrDlcNpZPl8DH6XX8XWCx0mvWVZY6KFLrvsY66/zPict5FnxaNUR/juvZCM3TvD60E2W1tZizbXTPDuabcm0nbbzpWKpmA1ayBQ8giedLUM+A0kNjBjQjmuYz7YrgIXYvmF63ZLBwSXrpn9Tb9wwdd/U1H0PMQK3XcO8ul3WT7PyPPdpy0TemKxNRcJNauiXJnnUDpUppQWs4SnUIy0EESGYqJYQLGHxzaGWwVIaS6Y7mQFM8ZjYDQ3axjf61SWjU33JwOZA1pwaG1L9mzf71aHRdX1JHw6Fp0aXhNwbqyeGNg4NbdzGCBxoz4ZXjy4Nu69Zr6sDY6vMrLU5nA1P8JkbdWXJ6ERfMryvNh1JfQ9+T4dIhGvK9w3dxjBBzatsQ/MlOHVIDnYpDz6odAXlQ01t2Pa5Iafd8MMpxAeDKP0C6CjgVLT5osB6icUx01lWjXxzT/GyRF2welEM5Z/7jG3VjQ1SrNn5IbyzOG5dobB3/QHxyZvsXcoz8IoEwS7plCg+zxHQk424q9BfEpkESJbFHQusDBSWFkuBkoPO0kLKwRVYjxGXlHTcTDQMJ/H6TX9afkO7mnraTO1feTnZAXLu4cp7HAXMmNG1yeFk9TgS/NHhZR/4QoBTr/ZB+6hCgyl15Nq1UbN6nE1/ZnP1U2cizCBpvs8cJQZJ4LkYx5N/yZPAUZNQQ0V4f3BQllWrK3YRzl30dOT6RVn2upNur6woSa8CqpdT/aKnBM4o3jNur9d9xqtUT6veBEt9Ca9at+ERzEEhUkR8sa5mQ4aVvJoVeEA8zI4ei5mULXFGyU7z/6TAeYLVcpzSWZY8PYYF5yrTV60sT0+XV141vX++Wf16V2bFeGVPZXxFpkvyeKTWLlzfW0mnKxsY6Y3294/0998SCfX1blm5pbcvFGlq/r07MRAMhYIDiW5JFKWW3vdrEpCsZSJG+om7Zu/PSScZJhNkLbmW5Wsr12pWqW5zKtlwRS4bFOxUw17mCzy6lskCDl1WYOGWDYrADrMA7BDDweWWNd5koiJnR1dz+ytLP2q0SqPB1lnK2ccB7RYe4FSoPks3iB3t4txTSHctb2sy1ivk0pvHuCNm6w1f6wxv3+OCgN78LqdQnUVh7R0oTAp0zOf2rbW770Vu5C2dIyGdTnHo8zSji7dppj0USoVCz+lhRMTh53Teq9VbGfbjuSbAooSdXayY4PYHg374C6f7gl1B/DXuJ4/QXxOBdJFJspFsI3egpoWUUCjlTIFnNYNl+ZyZKmBeYKGHkD1QyDlhaKbKwKcIJqJ4TLJ2OmdY/JWXae4DdGBw8HZ7eXcgFF2zr2SoalDry5iKqoa0Puhe3hPQ2s3elTYM+MI+n3rK0KgL7/La3GeMLt6m7u912vGnvtORiIa0qBmhqVi+XW9XNBmqb8eVgKzIHfGI5bNoG7X0UCzeISmqIcO/nY8FH7U8avX9fx/ST+hx0sezPw9Qy8Mum3GWf2N4Uy/yIYGVBXbJHWIZp7dfTcptdMTr9Qmq7DaiK/ukqCL4kt4RUfS5XPnMtmT22/mQFqF7emSqtrlu8SVElxDRJrZODkpuwe0VfTfjdEp1f7A7v+fozNBXUJ/6WTuK2TtFlpFVZAZ3LcFvUi1Z2p2YT+EMAkGJVStOzLTAPg4IqWIAlzRSjOBkl2zxj3TKycpzT/MnvX3uaSMWM+gU0rkXjohhefVRMaps3/kLMSKv23lT23uxQrkQjyOJleMDsdhAnD6ZGElWZ5MjCXzCE/hkWX+WF4knzGhVOyK2eQZekV3eyo0zL8kuYWCnDCvjjhAkcTPOBDXVdoav3HVcFnQjLvtV9S2p0zA6JegPwMQxt+yFb3ll9zGlq/5dRKb3cEyQYoaNYpharJ7xCB7AWxsLY3jjZXY0XsZj0Wjwc9I6PP/dKABnCZaqHpaZEACxk4ZeLZSKNgZABl+lYQX1sJQOSX3n6r410evcoud5JeAGUXVP9H1tZOKejTq4Ono0z0erro1FrnOpohva1d/hTdtVsQdKN5W9RlT3NjD0nznyKNTgKAMfWNWcyodV0IGLPIHOF0o4JyqufaK4z6WIIzuGh3d8c8cwQg8ER+OVxyrjdm8vNuhts4LoOihGxIMuUdgzwiYN7xhh1+oZnJNuTG7gQZvu4XWZ9GAZZjGEubwePqYhtKDTH+9VQkl17/iGybsnJ+8+sKtyPrcll9ty65Zsdst/9iqpEKh7M5VdBxh3csOdNc6tW3I1uyM1PzOXegSOrLFsFNI2O27M+TF2ApnN9MUv5ud6LjxIvEQnHRzxIu4IsA9MLFkJn2tcZoZ7ON7dXe7ujrc8HrusPKamlqXwd77lQUuLpilau4PUMapueBb7irU4RoUXEYXuVuIGlRGmOp+2lNkaRPVziOqmlaZvaqG4dFgSj0jxEJWrv12IUWntmw+rfQarRE0Aph4ocI6nlUlGqs+u3/+T/ethW62PpHp2eHbZstnh/wOO95yDAHicY2BkYGAA4pmJ6QHx/DZfGbiZXwBFGGpUNzQi6P+vmacy3QJyORiYQKIANoULVXicY2BkYGAO+p8FJF8wAAHzVAZGBlSgDQBW9gNvAAAAeJxjYGBgYH4xNDAAzwQmjwAAAAAATgCaAOgBCgEsAU4BcAGaAcQB7gIaApwC6ASaBLwE1gTyBQ4FKgV6BdAF/gZEBmYGtgcYB5AIGAhSCGoI/glGCb4J2goECjwKggq4CvALUAuWC7x4nGNgZGBg0GZMYRBlAAEmIOYCQgaG/2A+AwAYlAG8AHicbZE9TsMwGIbf9A/RSggEYmHxAgtq+jN2ZGj3Dt3T1GlTOXHkuBW9AyfgEByCgTNwCA7BW/NJlVBtyd/jx+8XKwmAa3whwnFE6Ib1OBq44O6Pm6Qb4Rb5QbiNHh6FO/RD4S6eMRHu4RaaT4halzR3eBVu4Apvwk36d+EW+UO4jXt8Cnfov4W7WOBHuIen6MXsCtvPU1vWc73emcSdxIkW2tW5LdUoHp7kTJfaJV6v1PKg6v167H2mMmcLNbWl18ZYVTm71amPN95Xk8EgEx+ntoDBDgUs+siRspaoMef7rukNEriziXNuwS7Hmoe9wggxv+e55IzJMqQTeNYV00scuNbY8+YxrUfGfcaMZb/CNPQe04bT0lThbEuT0sfYhK6K/23Amf3Lx+H24hcj4GScAAAAeJxtjtlugzAQRbkJUEJIuu/7vqR8lGNPAcWx0YAb5e/LklR96EgenSufGY038PqKvf9rhgGG8BEgxA4ijBBjjAQTTLGLPezjAIc4wjFOcIoznOMCl7jCNW5wizvc4wGPeMIzXvCKN7zjAzN8eonQRWZSSaYmjvug6ase98hFltexMJmmVNmV2WBvdNgZUc+ujAWzXW3UDnu1w43asStHc8GpzAXX/py0jqTQZJTgkcxJLpaCF0lD32xNt+43tAsn29Dft02uDKS2cjGUNgsk26qK2lFthYoU27INPqmiDqg5goe0pqR5qSoqMdek/CUZFywL46rEsiImleqiqoMyt4baXlu/1GLdNFf5zbcNmdr1YUWCZe47o+zUmb/DoStbw3cVsef9ALjjiPQA) format('woff');
      font-weight: normal;
      font-style: normal;
    }

    html {
      --lumo-icons-align-center: "\\ea01";
      --lumo-icons-align-left: "\\ea02";
      --lumo-icons-align-right: "\\ea03";
      --lumo-icons-angle-down: "\\ea04";
      --lumo-icons-angle-left: "\\ea05";
      --lumo-icons-angle-right: "\\ea06";
      --lumo-icons-angle-up: "\\ea07";
      --lumo-icons-arrow-down: "\\ea08";
      --lumo-icons-arrow-left: "\\ea09";
      --lumo-icons-arrow-right: "\\ea0a";
      --lumo-icons-arrow-up: "\\ea0b";
      --lumo-icons-bar-chart: "\\ea0c";
      --lumo-icons-bell: "\\ea0d";
      --lumo-icons-calendar: "\\ea0e";
      --lumo-icons-checkmark: "\\ea0f";
      --lumo-icons-chevron-down: "\\ea10";
      --lumo-icons-chevron-left: "\\ea11";
      --lumo-icons-chevron-right: "\\ea12";
      --lumo-icons-chevron-up: "\\ea13";
      --lumo-icons-clock: "\\ea14";
      --lumo-icons-cog: "\\ea15";
      --lumo-icons-cross: "\\ea16";
      --lumo-icons-download: "\\ea17";
      --lumo-icons-dropdown: "\\ea18";
      --lumo-icons-edit: "\\ea19";
      --lumo-icons-error: "\\ea1a";
      --lumo-icons-eye: "\\ea1b";
      --lumo-icons-eye-disabled: "\\ea1c";
      --lumo-icons-menu: "\\ea1d";
      --lumo-icons-minus: "\\ea1e";
      --lumo-icons-ordered-list: "\\ea1f";
      --lumo-icons-phone: "\\ea20";
      --lumo-icons-photo: "\\ea21";
      --lumo-icons-play: "\\ea22";
      --lumo-icons-plus: "\\ea23";
      --lumo-icons-redo: "\\ea24";
      --lumo-icons-reload: "\\ea25";
      --lumo-icons-search: "\\ea26";
      --lumo-icons-undo: "\\ea27";
      --lumo-icons-unordered-list: "\\ea28";
      --lumo-icons-upload: "\\ea29";
      --lumo-icons-user: "\\ea2a";
    }
  </style>
</custom-style>`;
document.head.appendChild($_documentContainer.content);
/* NOTICE: Generated with 'gulp icons' */

/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

;
},{"@polymer/polymer/lib/elements/custom-style.js":"../node_modules/@polymer/polymer/lib/elements/custom-style.js","./version.js":"../node_modules/@vaadin/vaadin-lumo-styles/version.js"}],"../node_modules/@vaadin/vaadin-lumo-styles/mixins/field-button.js":[function(require,module,exports) {
"use strict";

require("../color.js");

require("../font-icons.js");

require("../sizing.js");

require("../style.js");

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="lumo-field-button">
  <template>
    <style>
      [part\$="button"] {
        flex: none;
        width: 1em;
        height: 1em;
        line-height: 1;
        font-size: var(--lumo-icon-size-m);
        text-align: center;
        color: var(--lumo-contrast-60pct);
        transition: 0.2s color;
        cursor: var(--lumo-clickable-cursor);
      }

      :host(:not([readonly])) [part\$="button"]:hover {
        color: var(--lumo-contrast-90pct);
      }

      :host([disabled]) [part\$="button"],
      :host([readonly]) [part\$="button"] {
        color: var(--lumo-contrast-20pct);
      }

      [part\$="button"]::before {
        font-family: "lumo-icons";
        display: block;
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
},{"../color.js":"../node_modules/@vaadin/vaadin-lumo-styles/color.js","../font-icons.js":"../node_modules/@vaadin/vaadin-lumo-styles/font-icons.js","../sizing.js":"../node_modules/@vaadin/vaadin-lumo-styles/sizing.js","../style.js":"../node_modules/@vaadin/vaadin-lumo-styles/style.js"}],"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-text-field-styles.js":[function(require,module,exports) {
"use strict";

require("@vaadin/vaadin-lumo-styles/color.js");

require("@vaadin/vaadin-lumo-styles/sizing.js");

require("@vaadin/vaadin-lumo-styles/spacing.js");

require("@vaadin/vaadin-lumo-styles/style.js");

require("@vaadin/vaadin-lumo-styles/typography.js");

require("@vaadin/vaadin-lumo-styles/mixins/required-field.js");

require("@vaadin/vaadin-lumo-styles/font-icons.js");

require("@vaadin/vaadin-lumo-styles/mixins/field-button.js");

var _htmlTag = require("@polymer/polymer/lib/utils/html-tag.js");

const $_documentContainer = (0, _htmlTag.html)`<dom-module id="lumo-text-field" theme-for="vaadin-text-field">
  <template>
    <style include="lumo-required-field lumo-field-button">
      :host {
        --lumo-text-field-size: var(--lumo-size-m);
        color: var(--lumo-body-text-color);
        font-size: var(--lumo-font-size-m);
        font-family: var(--lumo-font-family);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
        padding: var(--lumo-space-xs) 0;
      }

      :host::before {
        height: var(--lumo-text-field-size);
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
      }

      :host([focused]:not([readonly])) [part="label"] {
        color: var(--lumo-primary-text-color);
      }

      :host([has-helper]) [part="helper-text"]::before {
        content: "";
        display: block;
        height: 0.4em;
      }

      [part="helper-text"],
      [part="helper-text"] ::slotted(*) {
        display: block;
        color: var(--lumo-secondary-text-color);
        font-size: var(--lumo-font-size-xs);
        line-height: var(--lumo-line-height-xs);
        margin-left: calc(var(--lumo-border-radius-m) / 4);
        transition: color 0.2s;
      }

      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea),
      /* Slotted by vaadin-select-text-field */
      [part="input-field"] ::slotted([part="value"]) {
        cursor: inherit;
        min-height: var(--lumo-text-field-size);
        padding: 0 0.25em;
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
        -webkit-mask-image: var(--_lumo-text-field-overflow-mask-image);
      }

      [part="value"]:focus,
      :host([focused]) [part="input-field"] ::slotted(input),
      :host([focused]) [part="input-field"] ::slotted(textarea) {
        -webkit-mask-image: none;
        mask-image: none;
      }

      /*
        TODO: CSS custom property in \`mask-image\` causes crash in Edge
        see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15415089/
      */
      @-moz-document url-prefix() {
        [part="value"],
        [part="input-field"] ::slotted(input),
        [part="input-field"] ::slotted(textarea),
        [part="input-field"] ::slotted([part="value"]) {
          mask-image: var(--_lumo-text-field-overflow-mask-image);
        }
      }

      [part="value"]::-webkit-input-placeholder {
        color: inherit;
        transition: opacity 0.175s 0.05s;
        opacity: 0.5;
      }

      [part="value"]:-ms-input-placeholder {
        color: inherit;
        opacity: 0.5;
      }

      [part="value"]::-moz-placeholder {
        color: inherit;
        transition: opacity 0.175s 0.05s;
        opacity: 0.5;
      }

      [part="value"]::placeholder {
        color: inherit;
        transition: opacity 0.175s 0.1s;
        opacity: 0.5;
      }

      [part="input-field"] {
        border-radius: var(--lumo-border-radius);
        background-color: var(--lumo-contrast-10pct);
        padding: 0 calc(0.375em + var(--lumo-border-radius) / 4 - 1px);
        font-weight: 500;
        line-height: 1;
        position: relative;
        cursor: text;
        box-sizing: border-box;
      }

      /* Used for hover and activation effects */
      [part="input-field"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: inherit;
        pointer-events: none;
        background-color: var(--lumo-contrast-50pct);
        opacity: 0;
        transition: transform 0.15s, opacity 0.2s;
        transform-origin: 100% 0;
      }

      /* Hover */

      :host(:hover:not([readonly]):not([focused])) [part="label"],
      :host(:hover:not([readonly])) [part="helper-text"],
      :host(:hover:not([readonly])) [part="helper-text"] ::slotted(*) {
        color: var(--lumo-body-text-color);
      }

      :host(:hover:not([readonly]):not([focused])) [part="input-field"]::after {
        opacity: 0.1;
      }

      /* Touch device adjustment */
      @media (pointer: coarse) {
        :host(:hover:not([readonly]):not([focused])) [part="label"] {
          color: var(--lumo-secondary-text-color);
        }

        :host(:hover:not([readonly]):not([focused])) [part="input-field"]::after {
          opacity: 0;
        }

        :host(:active:not([readonly]):not([focused])) [part="input-field"]::after {
          opacity: 0.2;
        }
      }

      /* Trigger when not focusing using the keyboard */
      :host([focused]:not([focus-ring]):not([readonly])) [part="input-field"]::after {
        transform: scaleX(0);
        transition-duration: 0.15s, 1s;
      }

      /* Focus-ring */

      :host([focus-ring]) [part="input-field"] {
        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      /* Read-only and disabled */
      :host([readonly]) [part="value"]::-webkit-input-placeholder,
      :host([disabled]) [part="value"]::-webkit-input-placeholder {
        opacity: 0;
      }

      :host([readonly]) [part="value"]:-ms-input-placeholder,
      :host([disabled]) [part="value"]:-ms-input-placeholder {
        opacity: 0;
      }

      :host([readonly]) [part="value"]::-moz-placeholder,
      :host([disabled]) [part="value"]::-moz-placeholder {
        opacity: 0;
      }

      :host([readonly]) [part="value"]::placeholder,
      :host([disabled]) [part="value"]::placeholder {
        opacity: 0;
      }

      /* Read-only */

      :host([readonly]) [part="input-field"] {
        color: var(--lumo-secondary-text-color);
        background-color: transparent;
        cursor: default;
      }

      :host([readonly]) [part="input-field"]::after {
        background-color: transparent;
        opacity: 1;
        border: 1px dashed var(--lumo-contrast-30pct);
      }

      /* Disabled style */

      :host([disabled]) {
        pointer-events: none;
      }

      :host([disabled]) [part="input-field"] {
        background-color: var(--lumo-contrast-5pct);
      }

      :host([disabled]) [part="label"],
      :host([disabled]) [part="helper-text"],
      :host([disabled]) [part="value"],
      :host([disabled]) [part="input-field"] ::slotted(*) {
        color: var(--lumo-disabled-text-color);
        -webkit-text-fill-color: var(--lumo-disabled-text-color);
      }

      /* Invalid style */

      :host([invalid]) [part="input-field"] {
        background-color: var(--lumo-error-color-10pct);
      }

      :host([invalid]) [part="input-field"]::after {
        background-color: var(--lumo-error-color-50pct);
      }

      :host([invalid][focus-ring]) [part="input-field"] {
        box-shadow: 0 0 0 2px var(--lumo-error-color-50pct);
      }

      :host([input-prevented]) [part="input-field"] {
        color: var(--lumo-error-text-color);
      }

      /* Small theme */

      :host([theme~="small"]) {
        font-size: var(--lumo-font-size-s);
        --lumo-text-field-size: var(--lumo-size-s);
      }

      :host([theme~="small"][has-label]) [part="label"] {
        font-size: var(--lumo-font-size-xs);
      }

      :host([theme~="small"][has-label]) [part="error-message"] {
        font-size: var(--lumo-font-size-xxs);
      }

      /* Text align */

      :host([theme~="align-left"]) [part="value"] {
        text-align: left;
        --_lumo-text-field-overflow-mask-image: none;
      }

      :host([theme~="align-center"]) [part="value"] {
        text-align: center;
        --_lumo-text-field-overflow-mask-image: none;
      }

      :host([theme~="align-right"]) [part="value"] {
        text-align: right;
        --_lumo-text-field-overflow-mask-image: none;
      }

      @-moz-document url-prefix() {
        /* Firefox is smart enough to align overflowing text to right */
        :host([theme~="align-right"]) [part="value"] {
          --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent 0.25em, #000 1.5em);
        }
      }

      @-moz-document url-prefix() {
        /* Firefox is smart enough to align overflowing text to right */
        :host([theme~="align-left"]) [part="value"] {
          --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent 0.25em, #000 1.5em);
        }
      }
      /* helper-text position */

      :host([has-helper][theme~="helper-above-field"]) [part="helper-text"]::before {
        display: none;
      }

      :host([has-helper][theme~="helper-above-field"]) [part="helper-text"]::after {
        content: "";
        display: block;
        height: 0.4em;
      }

      :host([has-helper][theme~="helper-above-field"]) [part="label"] {
        order: 0;
        padding-bottom: 0.4em;
      }

      :host([has-helper][theme~="helper-above-field"]) [part="helper-text"] {
        order: 1;
      }

      :host([has-helper][theme~="helper-above-field"]) [part="input-field"] {
        order: 2;
      }

      :host([has-helper][theme~="helper-above-field"]) [part="error-message"] {
        order: 3;
      }

      /* Slotted content */

      [part="input-field"] ::slotted(:not([part]):not(iron-icon):not(input):not(textarea)) {
        color: var(--lumo-secondary-text-color);
        font-weight: 400;
      }

      /* Slotted icons */

      [part="input-field"] ::slotted(iron-icon) {
        color: var(--lumo-contrast-60pct);
        width: var(--lumo-icon-size-m);
        height: var(--lumo-icon-size-m);
      }

      /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
      [part="input-field"] ::slotted(iron-icon[icon^="vaadin:"]) {
        padding: 0.25em;
        box-sizing: border-box !important;
      }

      [part="clear-button"]::before {
        content: var(--lumo-icons-cross);
      }

      /* RTL specific styles */

      :host([dir="rtl"]) [part="input-field"]::after {
        transform-origin: 0% 0;
      }

      :host([dir="rtl"]) [part="value"],
      :host([dir="rtl"]) [part="input-field"] ::slotted(input),
      :host([dir="rtl"]) [part="input-field"] ::slotted(textarea) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent, #000 1.25em);
      }

      :host([dir="rtl"]) [part="value"]:focus,
      :host([focused][dir="rtl"]) [part="input-field"] ::slotted(input),
      :host([focused][dir="rtl"]) [part="input-field"] ::slotted(textarea) {
        -webkit-mask-image: none;
        mask-image: none;
      }

      @-moz-document url-prefix() {
        :host([dir="rtl"]) [part="value"],
        :host([dir="rtl"]) [part="input-field"] ::slotted(input),
        :host([dir="rtl"]) [part="input-field"] ::slotted(textarea),
        :host([dir="rtl"]) [part="input-field"] ::slotted([part="value"]) {
          mask-image: var(--_lumo-text-field-overflow-mask-image);
        }
      }

      :host([theme~="align-left"][dir="rtl"]) [part="value"] {
        --_lumo-text-field-overflow-mask-image: none;
      }

      :host([theme~="align-center"][dir="rtl"]) [part="value"] {
        --_lumo-text-field-overflow-mask-image: none;
      }

      :host([theme~="align-right"][dir="rtl"]) [part="value"] {
        --_lumo-text-field-overflow-mask-image: none;
      }

      @-moz-document url-prefix() {
        /* Firefox is smart enough to align overflowing text to right */
        :host([theme~="align-right"][dir="rtl"]) [part="value"] {
          --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent 0.25em, #000 1.5em);
        }
      }

      @-moz-document url-prefix() {
        /* Firefox is smart enough to align overflowing text to right */
        :host([theme~="align-left"][dir="rtl"]) [part="value"] {
          --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent 0.25em, #000 1.5em);
        }
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
},{"@vaadin/vaadin-lumo-styles/color.js":"../node_modules/@vaadin/vaadin-lumo-styles/color.js","@vaadin/vaadin-lumo-styles/sizing.js":"../node_modules/@vaadin/vaadin-lumo-styles/sizing.js","@vaadin/vaadin-lumo-styles/spacing.js":"../node_modules/@vaadin/vaadin-lumo-styles/spacing.js","@vaadin/vaadin-lumo-styles/style.js":"../node_modules/@vaadin/vaadin-lumo-styles/style.js","@vaadin/vaadin-lumo-styles/typography.js":"../node_modules/@vaadin/vaadin-lumo-styles/typography.js","@vaadin/vaadin-lumo-styles/mixins/required-field.js":"../node_modules/@vaadin/vaadin-lumo-styles/mixins/required-field.js","@vaadin/vaadin-lumo-styles/font-icons.js":"../node_modules/@vaadin/vaadin-lumo-styles/font-icons.js","@vaadin/vaadin-lumo-styles/mixins/field-button.js":"../node_modules/@vaadin/vaadin-lumo-styles/mixins/field-button.js","@polymer/polymer/lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js"}],"../node_modules/@vaadin/vaadin-text-field/src/vaadin-text-field-mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldMixin = void 0;

var _async = require("@polymer/polymer/lib/utils/async.js");

var _debounce = require("@polymer/polymer/lib/utils/debounce.js");

var _htmlTag = require("@polymer/polymer/lib/utils/html-tag.js");

/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const $_documentContainer = (0, _htmlTag.html)`<dom-module id="vaadin-text-field-shared-styles">
  <template>
    <style>
      :host {
        display: inline-flex;
        outline: none;
      }

      :host::before {
        content: "\\2003";
        width: 0;
        display: inline-block;
        /* Size and position this element on the same vertical position as the input-field element
           to make vertical align for the host element work as expected */
      }

      :host([hidden]) {
        display: none !important;
      }

      .vaadin-text-field-container,
      .vaadin-text-area-container {
        display: flex;
        flex-direction: column;
        min-width: 100%;
        max-width: 100%;
        width: var(--vaadin-text-field-default-width, 12em);
      }

      [part="label"]:empty {
        display: none;
      }

      [part="input-field"] {
        display: flex;
        align-items: center;
        flex: auto;
      }

      .vaadin-text-field-container [part="input-field"] {
        flex-grow: 0;
      }

      /* Reset the native input styles */
      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea) {
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: 0;
        min-width: 0;
        font: inherit;
        font-size: 1em;
        line-height: normal;
        color: inherit;
        background-color: transparent;
        /* Disable default invalid style in Firefox */
        box-shadow: none;
      }

      [part="input-field"] ::slotted(*) {
        flex: none;
      }

      [part="value"],
      [part="input-field"] ::slotted(input),
      [part="input-field"] ::slotted(textarea),
      /* Slotted by vaadin-select-text-field */
      [part="input-field"] ::slotted([part="value"]) {
        flex: auto;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }

      [part="input-field"] ::slotted(textarea) {
        resize: none;
      }

      [part="value"]::-ms-clear,
      [part="input-field"] ::slotted(input)::-ms-clear {
        display: none;
      }

      [part="clear-button"] {
        cursor: default;
      }

      [part="clear-button"]::before {
        content: "✕";
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);
const HOST_PROPS = {
  default: ['list', 'autofocus', 'pattern', 'autocapitalize', 'autocorrect', 'maxlength', 'minlength', 'name', 'placeholder', 'autocomplete', 'title', 'disabled', 'readonly', 'required'],
  accessible: ['invalid']
};
const PROP_TYPE = {
  DEFAULT: 'default',
  ACCESSIBLE: 'accessible'
};
/**
 * @polymerMixin
 */

const TextFieldMixin = subclass => class VaadinTextFieldMixin extends subclass {
  static get properties() {
    return {
      /**
       * Whether the value of the control can be automatically completed by the browser.
       * List of available options at:
       * https://developer.mozilla.org/en/docs/Web/HTML/Element/input#attr-autocomplete
       */
      autocomplete: {
        type: String
      },

      /**
       * This is a property supported by Safari that is used to control whether
       * autocorrection should be enabled when the user is entering/editing the text.
       * Possible values are:
       * on: Enable autocorrection.
       * off: Disable autocorrection.
       * @type {!TextFieldAutoCorrect | undefined}
       */
      autocorrect: {
        type: String
      },

      /**
       * This is a property supported by Safari and Chrome that is used to control whether
       * autocapitalization should be enabled when the user is entering/editing the text.
       * Possible values are:
       * characters: Characters capitalization.
       * words: Words capitalization.
       * sentences: Sentences capitalization.
       * none: No capitalization.
       * @type {!TextFieldAutoCapitalize | undefined}
       */
      autocapitalize: {
        type: String
      },

      /**
       * Specify that the value should be automatically selected when the field gains focus.
       * @type {boolean}
       */
      autoselect: {
        type: Boolean,
        value: false
      },

      /**
       * Set to true to display the clear icon which clears the input.
       * @attr {boolean} clear-button-visible
       * @type {boolean}
       */
      clearButtonVisible: {
        type: Boolean,
        value: false
      },

      /**
       * Error to show when the input value is invalid.
       * @attr {string} error-message
       * @type {string}
       */
      errorMessage: {
        type: String,
        value: '',
        observer: '_errorMessageChanged'
      },

      /**
       * Object with translated strings used for localization. Has
       * the following structure and default values:
       *
       * ```
       * {
       *   // Translation of the clear icon button accessible label
       *   clear: 'Clear'
       * }
       * ```
       * @type {{clear: string}}
       */
      i18n: {
        type: Object,
        value: () => {
          return {
            clear: 'Clear'
          };
        }
      },

      /**
       * String used for the label element.
       * @type {string}
       */
      label: {
        type: String,
        value: '',
        observer: '_labelChanged'
      },

      /**
       * String used for the helper text.
       * @attr {string} helper-text
       * @type {string | null}
       */
      helperText: {
        type: String,
        value: '',
        observer: '_helperTextChanged'
      },

      /**
       * Maximum number of characters (in Unicode code points) that the user can enter.
       */
      maxlength: {
        type: Number
      },

      /**
       * Minimum number of characters (in Unicode code points) that the user can enter.
       */
      minlength: {
        type: Number
      },

      /**
       * The name of the control, which is submitted with the form data.
       */
      name: {
        type: String
      },

      /**
       * A hint to the user of what can be entered in the control.
       */
      placeholder: {
        type: String
      },

      /**
       * This attribute indicates that the user cannot modify the value of the control.
       */
      readonly: {
        type: Boolean,
        reflectToAttribute: true
      },

      /**
       * Specifies that the user must fill in a value.
       */
      required: {
        type: Boolean,
        reflectToAttribute: true
      },

      /**
       * The initial value of the control.
       * It can be used for two-way data binding.
       * @type {string}
       */
      value: {
        type: String,
        value: '',
        observer: '_valueChanged',
        notify: true
      },

      /**
       * This property is set to true when the control value is invalid.
       * @type {boolean}
       */
      invalid: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false
      },

      /**
       * Specifies that the text field has value.
       * @attr {boolean} has-value
       */
      hasValue: {
        type: Boolean,
        reflectToAttribute: true
      },

      /**
       * When set to true, user is prevented from typing a value that
       * conflicts with the given `pattern`.
       * @attr {boolean} prevent-invalid-input
       */
      preventInvalidInput: {
        type: Boolean
      },

      /**
       * A pattern matched against individual characters the user inputs.
       * When set, the field will prevent:
       * - `keyDown` events if the entered key doesn't match `/^_enabledCharPattern$/`
       * - `paste` events if the pasted text doesn't match `/^_enabledCharPattern*$/`
       * - `drop` events if the dropped text doesn't match `/^_enabledCharPattern*$/`
       *
       * For example, to enable entering only numbers and minus signs,
       * `_enabledCharPattern = "[\\d-]"`
       * @protected
       */
      _enabledCharPattern: String,

      /** @private */
      _labelId: String,

      /** @private */
      _helperTextId: String,

      /** @private */
      _errorId: String,

      /** @private */
      _inputId: String,

      /** @private */
      _hasSlottedHelper: Boolean
    };
  }

  static get observers() {
    return ['_stateChanged(disabled, readonly, clearButtonVisible, hasValue)', '_hostPropsChanged(' + HOST_PROPS.default.join(', ') + ')', '_hostAccessiblePropsChanged(' + HOST_PROPS.accessible.join(', ') + ')', '_getActiveErrorId(invalid, errorMessage, _errorId, helperText, _helperTextId, _hasSlottedHelper)', '_getActiveLabelId(label, _labelId, _inputId)', '__observeOffsetHeight(errorMessage, invalid, label, helperText)', '__enabledCharPatternChanged(_enabledCharPattern)'];
  }
  /**
   * @return {HTMLElement | undefined}
   * @protected
   */


  get focusElement() {
    if (!this.shadowRoot) {
      return;
    }

    const slotted = this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);

    if (slotted) {
      return slotted;
    }

    return this.shadowRoot.querySelector('[part="value"]');
  }
  /**
   * @return {HTMLElement | undefined}}
   * @protected
   */


  get inputElement() {
    return this.focusElement;
  }
  /**
   * @return {string}
   * @protected
   */


  get _slottedTagName() {
    return 'input';
  }
  /** @protected */


  _createConstraintsObserver() {
    // This complex observer needs to be added dynamically here (instead of defining it above in the `get observers()`)
    // so that it runs after complex observers of inheriting classes. Otherwise e.g. `_stepOrMinChanged()` observer of
    // vaadin-number-field would run after this and the `min` and `step` properties would not yet be propagated to
    // the `inputElement` when this runs.
    this._createMethodObserver('_constraintsChanged(required, minlength, maxlength, pattern)');
  }
  /** @private */


  _onInput(e) {
    if (this.__preventInput) {
      e.stopImmediatePropagation();
      this.__preventInput = false;
      return;
    }

    if (this.preventInvalidInput) {
      const input = this.inputElement;

      if (input.value.length > 0 && !this.checkValidity()) {
        input.value = this.value || ''; // add input-prevented attribute for 200ms

        this.setAttribute('input-prevented', '');
        this._inputDebouncer = _debounce.Debouncer.debounce(this._inputDebouncer, _async.timeOut.after(200), () => {
          this.removeAttribute('input-prevented');
        });
        return;
      }
    }

    if (!e.__fromClearButton) {
      this.__userInput = true;
    }

    this.value = e.target.value;
    this.__userInput = false;
  } // NOTE(yuriy): Workaround needed for IE11 and Edge for proper displaying
  // of the clear button instead of setting display property for it depending on state.

  /** @private */


  _stateChanged(disabled, readonly, clearButtonVisible, hasValue) {
    if (!disabled && !readonly && clearButtonVisible && hasValue) {
      this.$.clearButton.removeAttribute('hidden');
    } else {
      this.$.clearButton.setAttribute('hidden', true);
    }
  }
  /**
   * @param {!Event} e
   * @protected
   */


  _onChange(e) {
    if (this._valueClearing) {
      return;
    } // In the Shadow DOM, the `change` event is not leaked into the
    // ancestor tree, so we must do this manually.


    const changeEvent = new CustomEvent('change', {
      detail: {
        sourceEvent: e
      },
      bubbles: e.bubbles,
      cancelable: e.cancelable
    });
    this.dispatchEvent(changeEvent);
  }
  /**
   * @param {unknown} newVal
   * @param {unknown} oldVal
   * @protected
   */


  _valueChanged(newVal, oldVal) {
    // setting initial value to empty string, skip validation
    if (newVal === '' && oldVal === undefined) {
      return;
    }

    if (newVal !== '' && newVal != null) {
      this.hasValue = true;
    } else {
      this.hasValue = false;
    }

    if (this.__userInput) {
      return;
    } else if (newVal !== undefined) {
      this.inputElement.value = newVal;
    } else {
      this.value = this.inputElement.value = '';
    }

    if (this.invalid) {
      this.validate();
    }
  }
  /** @private */


  _labelChanged(label) {
    this._setOrToggleAttribute('has-label', !!label, this);
  }
  /** @private */


  _helperTextChanged(helperText) {
    this._setOrToggleAttribute('has-helper', !!helperText, this);
  }
  /** @private */


  _errorMessageChanged(errorMessage) {
    this._setOrToggleAttribute('has-error-message', !!errorMessage, this);
  }
  /** @private */


  _onHelperSlotChange() {
    const slottedNodes = this.shadowRoot.querySelector(`[name="helper"]`).assignedNodes({
      flatten: true
    }); // Only has slotted helper if not a text node
    // Text nodes are added by the helperText prop and not the helper slot
    // The filter is added due to shady DOM triggering this callback on helperText prop change

    this._hasSlottedHelper = slottedNodes.filter(node => node.nodeType !== 3).length;

    if (this._hasSlottedHelper) {
      this.setAttribute('has-helper', 'slotted');
    } else if (this.helperText === '' || this.helperText === null) {
      this.removeAttribute('has-helper');
    }
  }
  /** @private */


  _onSlotChange() {
    const slotted = this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);

    if (this.value) {
      this.inputElement.value = this.value;
      this.validate();
    }

    if (slotted && !this._slottedInput) {
      this._validateSlottedValue(slotted);

      this._addInputListeners(slotted);

      this._addIEListeners(slotted);

      this._slottedInput = slotted;
    } else if (!slotted && this._slottedInput) {
      this._removeInputListeners(this._slottedInput);

      this._removeIEListeners(this._slottedInput);

      this._slottedInput = undefined;
    }

    Object.keys(PROP_TYPE).map(key => PROP_TYPE[key]).forEach(type => this._propagateHostAttributes(HOST_PROPS[type].map(attr => this[attr]), type));
  }
  /** @private */


  _hostPropsChanged(...attributesValues) {
    this._propagateHostAttributes(attributesValues, PROP_TYPE.DEFAULT);
  }
  /** @private */


  _hostAccessiblePropsChanged(...attributesValues) {
    this._propagateHostAttributes(attributesValues, PROP_TYPE.ACCESSIBLE);
  }
  /** @private */


  _validateSlottedValue(slotted) {
    if (slotted.value !== this.value) {
      console.warn('Please define value on the vaadin-text-field component!');
      slotted.value = '';
    }
  }
  /** @private */


  _propagateHostAttributes(attributesValues, type) {
    const input = this.inputElement;
    const attributeNames = HOST_PROPS[type];

    if (type === PROP_TYPE.ACCESSIBLE) {
      attributeNames.forEach((attr, index) => {
        this._setOrToggleAttribute(attr, attributesValues[index], input);

        this._setOrToggleAttribute(`aria-${attr}`, attributesValues[index] ? 'true' : false, input);
      });
    } else {
      attributeNames.forEach((attr, index) => {
        this._setOrToggleAttribute(attr, attributesValues[index], input);
      });
    }
  }
  /** @private */


  _setOrToggleAttribute(name, value, node) {
    if (!name || !node) {
      return;
    }

    if (value) {
      node.setAttribute(name, typeof value === 'boolean' ? '' : value);
    } else {
      node.removeAttribute(name);
    }
  }
  /**
   * @param {boolean | undefined} required
   * @param {number | undefined} minlength
   * @param {number | undefined} maxlength
   * @param {string | undefined} maxlength
   * @protected
   */


  _constraintsChanged(required, minlength, maxlength, pattern) {
    if (!this.invalid) {
      return;
    }

    if (!required && !minlength && !maxlength && !pattern) {
      this.invalid = false;
    } else {
      this.validate();
    }
  }
  /**
   * Returns true if the current input value satisfies all constraints (if any)
   * @return {boolean}
   */


  checkValidity() {
    // Note (Yuriy): `__forceCheckValidity` is used in containing components (i.e. `vaadin-date-picker`) in order
    // to force the checkValidity instead of returning the previous invalid state.
    if (this.required || this.pattern || this.maxlength || this.minlength || this.__forceCheckValidity) {
      return this.inputElement.checkValidity();
    } else {
      return !this.invalid;
    }
  }
  /** @private */


  _addInputListeners(node) {
    node.addEventListener('input', this._boundOnInput);
    node.addEventListener('change', this._boundOnChange);
    node.addEventListener('blur', this._boundOnBlur);
    node.addEventListener('focus', this._boundOnFocus);
    node.addEventListener('paste', this._boundOnPaste);
    node.addEventListener('drop', this._boundOnDrop);
    node.addEventListener('beforeinput', this._boundOnBeforeInput);
  }
  /** @private */


  _removeInputListeners(node) {
    node.removeEventListener('input', this._boundOnInput);
    node.removeEventListener('change', this._boundOnChange);
    node.removeEventListener('blur', this._boundOnBlur);
    node.removeEventListener('focus', this._boundOnFocus);
    node.removeEventListener('paste', this._boundOnPaste);
    node.removeEventListener('drop', this._boundOnDrop);
    node.removeEventListener('beforeinput', this._boundOnBeforeInput);
  }
  /** @protected */


  ready() {
    super.ready();

    this._createConstraintsObserver();

    this._boundOnInput = this._onInput.bind(this);
    this._boundOnChange = this._onChange.bind(this);
    this._boundOnBlur = this._onBlur.bind(this);
    this._boundOnFocus = this._onFocus.bind(this);
    this._boundOnPaste = this._onPaste.bind(this);
    this._boundOnDrop = this._onDrop.bind(this);
    this._boundOnBeforeInput = this._onBeforeInput.bind(this);
    const defaultInput = this.shadowRoot.querySelector('[part="value"]');
    this._slottedInput = this.querySelector(`${this._slottedTagName}[slot="${this._slottedTagName}"]`);

    this._addInputListeners(defaultInput);

    this._addIEListeners(defaultInput);

    if (this._slottedInput) {
      this._addIEListeners(this._slottedInput);

      this._addInputListeners(this._slottedInput);
    }

    this.shadowRoot.querySelector('[name="input"], [name="textarea"]').addEventListener('slotchange', this._onSlotChange.bind(this));

    this._onHelperSlotChange();

    this.shadowRoot.querySelector('[name="helper"]').addEventListener('slotchange', this._onHelperSlotChange.bind(this));

    if (!(window.ShadyCSS && window.ShadyCSS.nativeCss)) {
      this.updateStyles();
    }

    this.$.clearButton.addEventListener('mousedown', () => this._valueClearing = true);
    this.$.clearButton.addEventListener('mouseleave', () => this._valueClearing = false);
    this.$.clearButton.addEventListener('click', this._onClearButtonClick.bind(this));
    this.addEventListener('keydown', this._onKeyDown.bind(this));
    var uniqueId = TextFieldMixin._uniqueId = 1 + TextFieldMixin._uniqueId || 0;
    this._errorId = `${this.constructor.is}-error-${uniqueId}`;
    this._labelId = `${this.constructor.is}-label-${uniqueId}`;
    this._helperTextId = `${this.constructor.is}-helper-${uniqueId}`;
    this._inputId = `${this.constructor.is}-input-${uniqueId}`; // Lumo theme defines a max-height transition for the "error-message"
    // part on invalid state change.

    this.shadowRoot.querySelector('[part="error-message"]').addEventListener('transitionend', () => {
      this.__observeOffsetHeight();
    });
  }
  /**
   * Returns true if `value` is valid.
   * `<iron-form>` uses this to check the validity for all its elements.
   *
   * @return {boolean} True if the value is valid.
   */


  validate() {
    return !(this.invalid = !this.checkValidity());
  }

  clear() {
    this.value = '';
  }
  /** @private */


  _onBlur() {
    this.validate();
  }
  /** @private */


  _onFocus() {
    if (this.autoselect) {
      this.inputElement.select(); // iOS 9 workaround: https://stackoverflow.com/a/7436574

      setTimeout(() => {
        try {
          this.inputElement.setSelectionRange(0, 9999);
        } catch (e) {// The workaround may cause errors on different input types.
          // Needs to be suppressed. See https://github.com/vaadin/flow/issues/6070
        }
      });
    }
  }
  /** @private */


  _onClearButtonClick(e) {
    e.preventDefault(); // NOTE(yuriy): This line won't affect focus on the host. Cannot be properly tested.

    this.inputElement.focus();
    this.clear();
    this._valueClearing = false;

    if (navigator.userAgent.match(/Trident/)) {
      // Disable IE input" event prevention here, we want the input event from
      // below to propagate normally.
      this.__preventInput = false;
    }

    const inputEvent = new Event('input', {
      bubbles: true,
      composed: true
    });
    inputEvent.__fromClearButton = true;
    const changeEvent = new Event('change', {
      bubbles: !this._slottedInput
    });
    changeEvent.__fromClearButton = true;
    this.inputElement.dispatchEvent(inputEvent);
    this.inputElement.dispatchEvent(changeEvent);
  }
  /**
   * @param {!KeyboardEvent} e
   * @protected
   */


  _onKeyDown(e) {
    if (e.keyCode === 27 && this.clearButtonVisible) {
      const dispatchChange = !!this.value;
      this.clear();
      dispatchChange && this.inputElement.dispatchEvent(new Event('change', {
        bubbles: !this._slottedInput
      }));
    }

    if (this._enabledCharPattern && !this.__shouldAcceptKey(e)) {
      e.preventDefault();
    }
  }
  /** @private */


  __shouldAcceptKey(event) {
    return event.metaKey || event.ctrlKey || !event.key // allow typing anything if event.key is not supported
    || event.key.length !== 1 // allow "Backspace", "ArrowLeft" etc.
    || this.__enabledCharRegExp.test(event.key);
  }
  /** @private */


  _onPaste(e) {
    if (this._enabledCharPattern) {
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');

      if (!this.__enabledTextRegExp.test(pastedText)) {
        e.preventDefault();
      }
    }
  }
  /** @private */


  _onDrop(e) {
    if (this._enabledCharPattern) {
      const draggedText = e.dataTransfer.getData('text');

      if (!this.__enabledTextRegExp.test(draggedText)) {
        e.preventDefault();
      }
    }
  }
  /** @private */


  _onBeforeInput(e) {
    // The `beforeinput` event covers all the cases for `_enabledCharPattern`: keyboard, pasting and dropping,
    // but it is still experimental technology so we can't rely on it. It's used here just as an additional check,
    // because it seems to be the only way to detect and prevent specific keys on mobile devices. See issue #429.
    if (this._enabledCharPattern && e.data && !this.__enabledTextRegExp.test(e.data)) {
      e.preventDefault();
    }
  }
  /** @private */


  __enabledCharPatternChanged(_enabledCharPattern) {
    this.__enabledCharRegExp = _enabledCharPattern && new RegExp('^' + _enabledCharPattern + '$');
    this.__enabledTextRegExp = _enabledCharPattern && new RegExp('^' + _enabledCharPattern + '*$');
  }
  /** @private */


  _addIEListeners(node) {
    /* istanbul ignore if */
    if (navigator.userAgent.match(/Trident/)) {
      // IE11 dispatches `input` event in following cases:
      // - focus or blur, when placeholder attribute is set
      // - placeholder attribute value changed
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/101220/
      this._shouldPreventInput = () => {
        this.__preventInput = true;
        requestAnimationFrame(() => {
          this.__preventInput = false;
        });
      };

      node.addEventListener('focusin', this._shouldPreventInput);
      node.addEventListener('focusout', this._shouldPreventInput);

      this._createPropertyObserver('placeholder', this._shouldPreventInput);
    }
  }
  /** @private */


  _removeIEListeners(node) {
    /* istanbul ignore if */
    if (navigator.userAgent.match(/Trident/)) {
      node.removeEventListener('focusin', this._shouldPreventInput);
      node.removeEventListener('focusout', this._shouldPreventInput);
    }
  }
  /** @private */


  _getActiveErrorId(invalid, errorMessage, errorId, helperText, helperTextId, hasSlottedHelper) {
    const ids = [];

    if (helperText || hasSlottedHelper) {
      ids.push(helperTextId);
    }

    if (errorMessage && invalid) {
      ids.push(errorId);
    }

    this._setOrToggleAttribute('aria-describedby', ids.join(' '), this.focusElement);
  }
  /** @private */


  _getActiveLabelId(label, _labelId, _inputId) {
    let ids = _inputId;

    if (label) {
      ids = `${_labelId} ${_inputId}`;
    }

    this.focusElement.setAttribute('aria-labelledby', ids);
  }
  /** @private */


  _getErrorMessageAriaHidden(invalid, errorMessage, errorId) {
    return (!(errorMessage && invalid ? errorId : undefined)).toString();
  }
  /** @private */


  _dispatchIronResizeEventIfNeeded(sizePropertyName, value) {
    const previousSizePropertyName = '__previous' + sizePropertyName;

    if (this[previousSizePropertyName] !== undefined && this[previousSizePropertyName] !== value) {
      this.dispatchEvent(new CustomEvent('iron-resize', {
        bubbles: true
      }));
    }

    this[previousSizePropertyName] = value;
  }
  /** @private */


  __observeOffsetHeight() {
    this.__observeOffsetHeightDebouncer = _debounce.Debouncer.debounce(this.__observeOffsetHeightDebouncer, _async.animationFrame, () => {
      this._dispatchIronResizeEventIfNeeded('Height', this.offsetHeight);
    });
  }
  /**
   * @param {string} prop
   * @param {string} oldVal
   * @param {string} newVal
   * @protected
   */


  attributeChangedCallback(prop, oldVal, newVal) {
    super.attributeChangedCallback(prop, oldVal, newVal); // Needed until Edge has CSS Custom Properties (present in Edge Preview)

    /* istanbul ignore if */

    if (!(window.ShadyCSS && window.ShadyCSS.nativeCss) && /^(focused|focus-ring|invalid|disabled|placeholder|has-value)$/.test(prop)) {
      this.updateStyles();
    } // Safari has an issue with repainting shadow root element styles when a host attribute changes.
    // Need this workaround (toggle any inline css property on and off) until the issue gets fixed.


    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    /* istanbul ignore if */

    if (isSafari && this.root) {
      const WEBKIT_PROPERTY = '-webkit-backface-visibility';
      this.root.querySelectorAll('*').forEach(el => {
        el.style[WEBKIT_PROPERTY] = 'visible';
        el.style[WEBKIT_PROPERTY] = '';
      });
    }
  } // Workaround for https://github.com/Polymer/polymer/issues/5259


  get __data() {
    return this.__dataValue || {};
  }

  set __data(value) {
    this.__dataValue = value;
  }
  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */

  /**
   * Fired when the value is changed by the user: on every typing keystroke,
   * and the value is cleared using the clear button.
   *
   * @event input
   */

  /**
   * Fired when the size of the element changes.
   *
   * @event iron-resize
   */


};

exports.TextFieldMixin = TextFieldMixin;
},{"@polymer/polymer/lib/utils/async.js":"../node_modules/@polymer/polymer/lib/utils/async.js","@polymer/polymer/lib/utils/debounce.js":"../node_modules/@polymer/polymer/lib/utils/debounce.js","@polymer/polymer/lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js"}],"../node_modules/@vaadin/vaadin-text-field/src/vaadin-text-field.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldElement = void 0;

var _polymerElement = require("@polymer/polymer/polymer-element.js");

var _vaadinTextFieldMixin = require("./vaadin-text-field-mixin.js");

var _vaadinControlStateMixin = require("@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js");

var _vaadinThemableMixin = require("@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js");

var _vaadinElementMixin = require("@vaadin/vaadin-element-mixin/vaadin-element-mixin.js");

var _htmlTag = require("@polymer/polymer/lib/utils/html-tag.js");

/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/

/**
 * `<vaadin-text-field>` is a Web Component for text field control in forms.
 *
 * ```html
 * <vaadin-text-field label="First Name">
 * </vaadin-text-field>
 * ```
 *
 * ### Prefixes and suffixes
 *
 * These are child elements of a `<vaadin-text-field>` that are displayed
 * inline with the input, before or after.
 * In order for an element to be considered as a prefix, it must have the slot
 * attribute set to `prefix` (and similarly for `suffix`).
 *
 * ```html
 * <vaadin-text-field label="Email address">
 *   <div slot="prefix">Sent to:</div>
 *   <div slot="suffix">@vaadin.com</div>
 * </vaadin-text-area>
 * ```
 *
 * ### Styling
 *
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|-------------
 * `--vaadin-text-field-default-width` | Set the default width of the input field | `12em`
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `label` | The label element
 * `input-field` | The element that wraps prefix, value and suffix
 * `value` | The text value element inside the `input-field` element
 * `error-message` | The error message element
 *
 * The following state attributes are available for styling:
 *
 * Attribute    | Description | Part name
 * -------------|-------------|------------
 * `disabled` | Set to a disabled text field | :host
 * `has-value` | Set when the element has a value | :host
 * `has-label` | Set when the element has a label | :host
 * `has-helper` | Set when the element has helper text or slot | :host
 * `has-error-message` | Set when the element has an error message | :host
 * `invalid` | Set when the element is invalid | :host
 * `input-prevented` | Temporarily set when invalid input is prevented | :host
 * `focused` | Set when the element is focused | :host
 * `focus-ring` | Set when the element is keyboard focused | :host
 * `readonly` | Set to a readonly text field | :host
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends PolymerElement
 * @mixes TextFieldMixin
 * @mixes ControlStateMixin
 * @mixes ThemableMixin
 * @mixes ElementMixin
 * @demo demo/index.html
 */
class TextFieldElement extends (0, _vaadinElementMixin.ElementMixin)((0, _vaadinTextFieldMixin.TextFieldMixin)((0, _vaadinControlStateMixin.ControlStateMixin)((0, _vaadinThemableMixin.ThemableMixin)(_polymerElement.PolymerElement)))) {
  static get template() {
    return (0, _htmlTag.html)`
    <style include="vaadin-text-field-shared-styles">
      /* polymer-cli linter breaks with empty line */
    </style>

    <div class="vaadin-text-field-container">

      <label part="label" on-click="focus" id="[[_labelId]]">[[label]]</label>

      <div part="input-field" id="[[_inputId]]">

        <slot name="prefix"></slot>

        <slot name="input">
          <input part="value">
        </slot>

        <div part="clear-button" id="clearButton" role="button" aria-label\$="[[i18n.clear]]"></div>
        <slot name="suffix"></slot>

      </div>

      <div part="helper-text" on-click="focus" id="[[_helperTextId]]">
        <slot name="helper">[[helperText]]</slot>
      </div>

      <div part="error-message" id="[[_errorId]]" aria-live="assertive" aria-hidden\$="[[_getErrorMessageAriaHidden(invalid, errorMessage, _errorId)]]">[[errorMessage]]</div>

    </div>
`;
  }

  static get is() {
    return 'vaadin-text-field';
  }

  static get version() {
    return '2.8.1';
  }

  static get properties() {
    return {
      /**
       * Identifies a list of pre-defined options to suggest to the user.
       * The value must be the id of a <datalist> element in the same document.
       */
      list: {
        type: String
      },

      /**
       * A regular expression that the value is checked against.
       * The pattern must match the entire value, not just some subset.
       */
      pattern: {
        type: String
      },

      /**
       * The text usually displayed in a tooltip popup when the mouse is over the field.
       * @type {string}
       */
      title: {
        type: String
      }
    };
  }

}

exports.TextFieldElement = TextFieldElement;
customElements.define(TextFieldElement.is, TextFieldElement);
},{"@polymer/polymer/polymer-element.js":"../node_modules/@polymer/polymer/polymer-element.js","./vaadin-text-field-mixin.js":"../node_modules/@vaadin/vaadin-text-field/src/vaadin-text-field-mixin.js","@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js":"../node_modules/@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js","@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js":"../node_modules/@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js","@vaadin/vaadin-element-mixin/vaadin-element-mixin.js":"../node_modules/@vaadin/vaadin-element-mixin/vaadin-element-mixin.js","@polymer/polymer/lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js"}],"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-text-field.js":[function(require,module,exports) {
"use strict";

require("./vaadin-text-field-styles.js");

require("../../src/vaadin-text-field.js");
},{"./vaadin-text-field-styles.js":"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-text-field-styles.js","../../src/vaadin-text-field.js":"../node_modules/@vaadin/vaadin-text-field/src/vaadin-text-field.js"}],"../node_modules/@vaadin/vaadin-text-field/src/vaadin-email-field.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailFieldElement = void 0;

require("@polymer/polymer/polymer-element.js");

require("@polymer/polymer/lib/elements/custom-style.js");

var _vaadinTextField = require("./vaadin-text-field.js");

var _domModule = require("@polymer/polymer/lib/elements/dom-module.js");

var _htmlTag = require("@polymer/polymer/lib/utils/html-tag.js");

/**
@license
Copyright (c) 2018 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
const $_documentContainer = (0, _htmlTag.html)`<dom-module id="vaadin-email-field-template">
  <template>
    <style>
      :host([dir="rtl"]) [part="input-field"] {
        direction: ltr;
      }

      :host([dir="rtl"]) [part="value"]::placeholder {
        direction: rtl;
        text-align: left;
      }

      :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {
        direction: rtl;
        text-align: left;
      }

      :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,
      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {
        direction: rtl;
        text-align: left;
      }
    </style>
  </template>
  
</dom-module>`;
document.head.appendChild($_documentContainer.content);
let memoizedTemplate;
/**
 * `<vaadin-email-field>` is a Web Component for email field control in forms.
 *
 * ```html
 * <vaadin-email-field label="Email">
 * </vaadin-email-field>
 * ```
 *
 * ### Styling
 *
 * See vaadin-text-field.html for the styling documentation
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends TextFieldElement
 * @demo demo/index.html
 */

class EmailFieldElement extends _vaadinTextField.TextFieldElement {
  static get is() {
    return 'vaadin-email-field';
  }

  static get version() {
    return '2.8.1';
  }

  static get template() {
    if (!memoizedTemplate) {
      // Clone the superclass template
      memoizedTemplate = super.template.cloneNode(true); // Retrieve this element's dom-module template

      const thisTemplate = _domModule.DomModule.import(this.is + '-template', 'template');

      const styles = thisTemplate.content.querySelector('style'); // Add the and styles to the text-field template

      memoizedTemplate.content.appendChild(styles);
    }

    return memoizedTemplate;
  }
  /** @protected */


  ready() {
    super.ready();
    this.inputElement.type = 'email';
    this.inputElement.autocapitalize = 'off';
  }
  /** @protected */


  _createConstraintsObserver() {
    // NOTE: pattern needs to be set before constraints observer is initialized
    this.pattern = this.pattern || '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    super._createConstraintsObserver();
  }

}

exports.EmailFieldElement = EmailFieldElement;
customElements.define(EmailFieldElement.is, EmailFieldElement);
},{"@polymer/polymer/polymer-element.js":"../node_modules/@polymer/polymer/polymer-element.js","@polymer/polymer/lib/elements/custom-style.js":"../node_modules/@polymer/polymer/lib/elements/custom-style.js","./vaadin-text-field.js":"../node_modules/@vaadin/vaadin-text-field/src/vaadin-text-field.js","@polymer/polymer/lib/elements/dom-module.js":"../node_modules/@polymer/polymer/lib/elements/dom-module.js","@polymer/polymer/lib/utils/html-tag.js":"../node_modules/@polymer/polymer/lib/utils/html-tag.js"}],"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-email-field.js":[function(require,module,exports) {
"use strict";

require("./vaadin-email-field-styles.js");

require("./vaadin-text-field.js");

require("../../src/vaadin-email-field.js");
},{"./vaadin-email-field-styles.js":"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-email-field-styles.js","./vaadin-text-field.js":"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-text-field.js","../../src/vaadin-email-field.js":"../node_modules/@vaadin/vaadin-text-field/src/vaadin-email-field.js"}],"../node_modules/@vaadin/vaadin-text-field/vaadin-email-field.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./theme/lumo/vaadin-email-field.js");

var _vaadinEmailField2 = require("./src/vaadin-email-field.js");

Object.keys(_vaadinEmailField2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vaadinEmailField2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vaadinEmailField2[key];
    }
  });
});
},{"./theme/lumo/vaadin-email-field.js":"../node_modules/@vaadin/vaadin-text-field/theme/lumo/vaadin-email-field.js","./src/vaadin-email-field.js":"../node_modules/@vaadin/vaadin-text-field/src/vaadin-email-field.js"}],"components/hello-world.js":[function(require,module,exports) {
"use strict";

var _litElement = require("lit-element");

require("@vaadin/vaadin-button");

require("@vaadin/vaadin-text-field/vaadin-email-field");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    <div>\n    <h1>Hello World Component</h1>\n    <vaadin-button \n      theme=\"primary\"\n    >Test</vaadin-button>\n    <vaadin-email-field\n      error-message=\"Enter a valid email address\"\n    >Hello</vaadin-email-field>\n    <vaadin-text-field>Hello</vaadin-text-field>\n    <h1>Welcome to Parcel Base config for LitElement</h1>\n    <vaadin-button theme=\"primary\"\n      @click=", "\n    >Theme</vaadin-button>\n    </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//import '~/node_modules/@vaadin/vaadin-button';
// need this for v2 of parcel
var HelloWorld = /*#__PURE__*/function (_LitElement) {
  _inherits(HelloWorld, _LitElement);

  var _super = _createSuper(HelloWorld);

  function HelloWorld() {
    _classCallCheck(this, HelloWorld);

    return _super.apply(this, arguments);
  }

  _createClass(HelloWorld, [{
    key: "render",
    value: function render() {
      var _this = this;

      return (0, _litElement.html)(_templateObject(), function () {
        _this.changeTheme();
      });
    }
  }, {
    key: "changeTheme",
    value: function changeTheme() {
      var host = this.shadowRoot.host;
      var documentNode = host.getRootNode();
      var htmlNode = documentNode.querySelector('main');
      var theme = htmlNode.getAttribute("theme");

      if (theme === "dark") {
        console.log("yes the theme is dark");
        htmlNode.setAttribute("theme", "light");
      }

      if (theme === "light") {
        console.log("yes the theme is light");
        htmlNode.setAttribute("theme", "dark");
      }
    }
  }]);

  return HelloWorld;
}(_litElement.LitElement);

customElements.define('hello-world', HelloWorld);
},{"lit-element":"../node_modules/lit-element/lit-element.js","@vaadin/vaadin-button":"../node_modules/@vaadin/vaadin-button/vaadin-button.js","@vaadin/vaadin-text-field/vaadin-email-field":"../node_modules/@vaadin/vaadin-text-field/vaadin-email-field.js"}],"../node_modules/@vaadin/router/dist/vaadin-router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = exports.Resolver = void 0;

function toArray(objectOrArray) {
  objectOrArray = objectOrArray || [];
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}

function log(msg) {
  return `[Vaadin.Router] ${msg}`;
}

function logValue(value) {
  if (typeof value !== 'object') {
    return String(value);
  }

  const stringType = Object.prototype.toString.call(value).match(/ (.*)\]$/)[1];

  if (stringType === 'Object' || stringType === 'Array') {
    return `${stringType} ${JSON.stringify(value)}`;
  } else {
    return stringType;
  }
}

const MODULE = 'module';
const NOMODULE = 'nomodule';
const bundleKeys = [MODULE, NOMODULE];

function ensureBundle(src) {
  if (!src.match(/.+\.[m]?js$/)) {
    throw new Error(log(`Unsupported type for bundle "${src}": .js or .mjs expected.`));
  }
}

function ensureRoute(route) {
  if (!route || !isString(route.path)) {
    throw new Error(log(`Expected route config to be an object with a "path" string property, or an array of such objects`));
  }

  const bundle = route.bundle;
  const stringKeys = ['component', 'redirect', 'bundle'];

  if (!isFunction(route.action) && !Array.isArray(route.children) && !isFunction(route.children) && !isObject(bundle) && !stringKeys.some(key => isString(route[key]))) {
    throw new Error(log(`Expected route config "${route.path}" to include either "${stringKeys.join('", "')}" ` + `or "action" function but none found.`));
  }

  if (bundle) {
    if (isString(bundle)) {
      ensureBundle(bundle);
    } else if (!bundleKeys.some(key => key in bundle)) {
      throw new Error(log('Expected route bundle to include either "' + NOMODULE + '" or "' + MODULE + '" keys, or both'));
    } else {
      bundleKeys.forEach(key => key in bundle && ensureBundle(bundle[key]));
    }
  }

  if (route.redirect) {
    ['bundle', 'component'].forEach(overriddenProp => {
      if (overriddenProp in route) {
        console.warn(log(`Route config "${route.path}" has both "redirect" and "${overriddenProp}" properties, ` + `and "redirect" will always override the latter. Did you mean to only use "${overriddenProp}"?`));
      }
    });
  }
}

function ensureRoutes(routes) {
  toArray(routes).forEach(route => ensureRoute(route));
}

function loadScript(src, key) {
  let script = document.head.querySelector('script[src="' + src + '"][async]');

  if (!script) {
    script = document.createElement('script');
    script.setAttribute('src', src);

    if (key === MODULE) {
      script.setAttribute('type', MODULE);
    } else if (key === NOMODULE) {
      script.setAttribute(NOMODULE, '');
    }

    script.async = true;
  }

  return new Promise((resolve, reject) => {
    script.onreadystatechange = script.onload = e => {
      script.__dynamicImportLoaded = true;
      resolve(e);
    };

    script.onerror = e => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      reject(e);
    };

    if (script.parentNode === null) {
      document.head.appendChild(script);
    } else if (script.__dynamicImportLoaded) {
      resolve();
    }
  });
}

function loadBundle(bundle) {
  if (isString(bundle)) {
    return loadScript(bundle);
  } else {
    return Promise.race(bundleKeys.filter(key => key in bundle).map(key => loadScript(bundle[key], key)));
  }
}

function fireRouterEvent(type, detail) {
  return !window.dispatchEvent(new CustomEvent(`vaadin-router-${type}`, {
    cancelable: type === 'go',
    detail
  }));
}

function isObject(o) {
  // guard against null passing the typeof check
  return typeof o === 'object' && !!o;
}

function isFunction(f) {
  return typeof f === 'function';
}

function isString(s) {
  return typeof s === 'string';
}

function getNotFoundError(context) {
  const error = new Error(log(`Page not found (${context.pathname})`));
  error.context = context;
  error.code = 404;
  return error;
}

const notFoundResult = new class NotFoundResult {}();
/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */

function getAnchorOrigin(anchor) {
  // IE11: on HTTP and HTTPS the default port is not included into
  // window.location.origin, so won't include it here either.
  const port = anchor.port;
  const protocol = anchor.protocol;
  const defaultHttp = protocol === 'http:' && port === '80';
  const defaultHttps = protocol === 'https:' && port === '443';
  const host = defaultHttp || defaultHttps ? anchor.hostname // does not include the port number (e.g. www.example.org)
  : anchor.host; // does include the port number (e.g. www.example.org:80)

  return `${protocol}//${host}`;
} // The list of checks is not complete:
//  - SVG support is missing
//  - the 'rel' attribute is not considered


function vaadinRouterGlobalClickHandler(event) {
  // ignore the click if the default action is prevented
  if (event.defaultPrevented) {
    return;
  } // ignore the click if not with the primary mouse button


  if (event.button !== 0) {
    return;
  } // ignore the click if a modifier key is pressed


  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
    return;
  } // find the <a> element that the click is at (or within)


  let anchor = event.target;
  const path = event.composedPath ? event.composedPath() : event.path || []; // FIXME(web-padawan): `Symbol.iterator` used by webcomponentsjs is broken for arrays
  // example to check: `for...of` loop here throws the "Not yet implemented" error

  for (let i = 0; i < path.length; i++) {
    const target = path[i];

    if (target.nodeName && target.nodeName.toLowerCase() === 'a') {
      anchor = target;
      break;
    }
  }

  while (anchor && anchor.nodeName.toLowerCase() !== 'a') {
    anchor = anchor.parentNode;
  } // ignore the click if not at an <a> element


  if (!anchor || anchor.nodeName.toLowerCase() !== 'a') {
    return;
  } // ignore the click if the <a> element has a non-default target


  if (anchor.target && anchor.target.toLowerCase() !== '_self') {
    return;
  } // ignore the click if the <a> element has the 'download' attribute


  if (anchor.hasAttribute('download')) {
    return;
  } // ignore the click if the <a> element has the 'router-ignore' attribute


  if (anchor.hasAttribute('router-ignore')) {
    return;
  } // ignore the click if the target URL is a fragment on the current page


  if (anchor.pathname === window.location.pathname && anchor.hash !== '') {
    return;
  } // ignore the click if the target is external to the app
  // In IE11 HTMLAnchorElement does not have the `origin` property


  const origin = anchor.origin || getAnchorOrigin(anchor);

  if (origin !== window.location.origin) {
    return;
  } // if none of the above, convert the click into a navigation event


  const {
    pathname,
    search,
    hash
  } = anchor;

  if (fireRouterEvent('go', {
    pathname,
    search,
    hash
  })) {
    event.preventDefault();
  }
}
/**
 * A navigation trigger for Vaadin Router that translated clicks on `<a>` links
 * into Vaadin Router navigation events.
 *
 * Only regular clicks on in-app links are translated (primary mouse button, no
 * modifier keys, the target href is within the app's URL space).
 *
 * @memberOf Router.NavigationTrigger
 * @type {NavigationTrigger}
 */


const CLICK = {
  activate() {
    window.document.addEventListener('click', vaadinRouterGlobalClickHandler);
  },

  inactivate() {
    window.document.removeEventListener('click', vaadinRouterGlobalClickHandler);
  }

}; // PopStateEvent constructor shim

const isIE = /Trident/.test(navigator.userAgent);
/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */

if (isIE && !isFunction(window.PopStateEvent)) {
  window.PopStateEvent = function (inType, params) {
    params = params || {};
    var e = document.createEvent('Event');
    e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
    e.state = params.state || null;
    return e;
  };

  window.PopStateEvent.prototype = window.Event.prototype;
}

function vaadinRouterGlobalPopstateHandler(event) {
  if (event.state === 'vaadin-router-ignore') {
    return;
  }

  const {
    pathname,
    search,
    hash
  } = window.location;
  fireRouterEvent('go', {
    pathname,
    search,
    hash
  });
}
/**
 * A navigation trigger for Vaadin Router that translates popstate events into
 * Vaadin Router navigation events.
 *
 * @memberOf Router.NavigationTrigger
 * @type {NavigationTrigger}
 */


const POPSTATE = {
  activate() {
    window.addEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  },

  inactivate() {
    window.removeEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  }

};
/**
 * Expose `pathToRegexp`.
 */

var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
/**
 * Default configs.
 */

var DEFAULT_DELIMITER = '/';
var DEFAULT_DELIMITERS = './';
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
// "(\\d+)"  => [undefined, undefined, "\d+", undefined]
'(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || DEFAULT_DELIMITER;
  var delimiters = options && options.delimiters || DEFAULT_DELIMITERS;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue;
    }

    var prev = '';
    var next = str[index];
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k];
        path = path.slice(0, k);
      }
    } // Push the current path onto the tokens.


    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var partial = prev !== '' && next !== undefined && next !== prev;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = prev || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Push any remaining characters.


  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (data, options) {
    var path = '';
    var encode = options && options.encode || encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array');
        }

        if (value.length === 0) {
          if (token.optional) continue;
          throw new TypeError('Expected "' + token.name + '" to not be empty');
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token);

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
        }

        path += token.prefix + segment;
        continue;
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix;
        continue;
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'));
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, '\\$1');
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options && options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  if (!keys) return path; // Use a negative lookahead to match only capturing groups.

  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      });
    }
  }

  return path;
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options));
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  options = options || {};
  var strict = options.strict;
  var start = options.start !== false;
  var end = options.end !== false;
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
  var delimiters = options.delimiters || DEFAULT_DELIMITERS;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = start ? '^' : '';
  var isEndDelimited = tokens.length === 0; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
    } else {
      var capture = token.repeat ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*' : token.pattern;
      if (keys) keys.push(token);

      if (token.optional) {
        if (token.partial) {
          route += escapeString(token.prefix) + '(' + capture + ')?';
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?';
    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?';
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')';
  }

  return new RegExp(route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys);
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path, keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path, keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {
  hasOwnProperty
} = Object.prototype;
const cache = new Map(); // see https://github.com/pillarjs/path-to-regexp/issues/148

cache.set('|false', {
  keys: [],
  pattern: /(?:)/
});

function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    return val;
  }
}

function matchPath(routepath, path, exact, parentKeys, parentParams) {
  exact = !!exact;
  const cacheKey = `${routepath}|${exact}`;
  let regexp = cache.get(cacheKey);

  if (!regexp) {
    const keys = [];
    regexp = {
      keys,
      pattern: pathToRegexp_1(routepath, keys, {
        end: exact,
        strict: routepath === ''
      })
    };
    cache.set(cacheKey, regexp);
  }

  const m = regexp.pattern.exec(path);

  if (!m) {
    return null;
  }

  const params = Object.assign({}, parentParams);

  for (let i = 1; i < m.length; i++) {
    const key = regexp.keys[i - 1];
    const prop = key.name;
    const value = m[i];

    if (value !== undefined || !hasOwnProperty.call(params, prop)) {
      if (key.repeat) {
        params[prop] = value ? value.split(key.delimiter).map(decodeParam) : [];
      } else {
        params[prop] = value ? decodeParam(value) : value;
      }
    }
  }

  return {
    path: m[0],
    keys: (parentKeys || []).concat(regexp.keys),
    params
  };
}
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Traverses the routes tree and matches its nodes to the given pathname from
 * the root down to the leaves. Each match consumes a part of the pathname and
 * the matching process continues for as long as there is a matching child
 * route for the remaining part of the pathname.
 *
 * The returned value is a lazily evaluated iterator.
 *
 * The leading "/" in a route path matters only for the root of the routes
 * tree (or if all parent routes are ""). In all other cases a leading "/" in
 * a child route path has no significance.
 *
 * The trailing "/" in a _route path_ matters only for the leaves of the
 * routes tree. A leaf route with a trailing "/" matches only a pathname that
 * also has a trailing "/".
 *
 * The trailing "/" in a route path does not affect matching of child routes
 * in any way.
 *
 * The trailing "/" in a _pathname_ generally does not matter (except for
 * the case of leaf nodes described above).
 *
 * The "" and "/" routes have special treatment:
 *  1. as a single route
 *     the "" and "/" routes match only the "" and "/" pathnames respectively
 *  2. as a parent in the routes tree
 *     the "" route matches any pathname without consuming any part of it
 *     the "/" route matches any absolute pathname consuming its leading "/"
 *  3. as a leaf in the routes tree
 *     the "" and "/" routes match only if the entire pathname is consumed by
 *         the parent routes chain. In this case "" and "/" are equivalent.
 *  4. several directly nested "" or "/" routes
 *     - directly nested "" or "/" routes are 'squashed' (i.e. nesting two
 *       "/" routes does not require a double "/" in the pathname to match)
 *     - if there are only "" in the parent routes chain, no part of the
 *       pathname is consumed, and the leading "/" in the child routes' paths
 *       remains significant
 *
 * Side effect:
 *   - the routes tree { path: '' } matches only the '' pathname
 *   - the routes tree { path: '', children: [ { path: '' } ] } matches any
 *     pathname (for the tree root)
 *
 * Prefix matching can be enabled also by `children: true`.
 */


function matchRoute(route, pathname, ignoreLeadingSlash, parentKeys, parentParams) {
  let match;
  let childMatches;
  let childIndex = 0;
  let routepath = route.path || '';

  if (routepath.charAt(0) === '/') {
    if (ignoreLeadingSlash) {
      routepath = routepath.substr(1);
    }

    ignoreLeadingSlash = true;
  }

  return {
    next(routeToSkip) {
      if (route === routeToSkip) {
        return {
          done: true
        };
      }

      const children = route.__children = route.__children || route.children;

      if (!match) {
        match = matchPath(routepath, pathname, !children, parentKeys, parentParams);

        if (match) {
          return {
            done: false,
            value: {
              route,
              keys: match.keys,
              params: match.params,
              path: match.path
            }
          };
        }
      }

      if (match && children) {
        while (childIndex < children.length) {
          if (!childMatches) {
            const childRoute = children[childIndex];
            childRoute.parent = route;
            let matchedLength = match.path.length;

            if (matchedLength > 0 && pathname.charAt(matchedLength) === '/') {
              matchedLength += 1;
            }

            childMatches = matchRoute(childRoute, pathname.substr(matchedLength), ignoreLeadingSlash, match.keys, match.params);
          }

          const childMatch = childMatches.next(routeToSkip);

          if (!childMatch.done) {
            return {
              done: false,
              value: childMatch.value
            };
          }

          childMatches = null;
          childIndex++;
        }
      }

      return {
        done: true
      };
    }

  };
}
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function resolveRoute(context) {
  if (isFunction(context.route.action)) {
    return context.route.action(context);
  }

  return undefined;
}
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function isChildRoute(parentRoute, childRoute) {
  let route = childRoute;

  while (route) {
    route = route.parent;

    if (route === parentRoute) {
      return true;
    }
  }

  return false;
}

function generateErrorMessage(currentContext) {
  let errorMessage = `Path '${currentContext.pathname}' is not properly resolved due to an error.`;
  const routePath = (currentContext.route || {}).path;

  if (routePath) {
    errorMessage += ` Resolution had failed on route: '${routePath}'`;
  }

  return errorMessage;
}

function updateChainForRoute(context, match) {
  const {
    route,
    path
  } = match;

  if (route && !route.__synthetic) {
    const item = {
      path,
      route
    };

    if (!context.chain) {
      context.chain = [];
    } else {
      // Discard old items
      if (route.parent) {
        let i = context.chain.length;

        while (i-- && context.chain[i].route && context.chain[i].route !== route.parent) {
          context.chain.pop();
        }
      }
    }

    context.chain.push(item);
  }
}
/**
 */


class Resolver {
  constructor(routes, options = {}) {
    if (Object(routes) !== routes) {
      throw new TypeError('Invalid routes');
    }

    this.baseUrl = options.baseUrl || '';
    this.errorHandler = options.errorHandler;
    this.resolveRoute = options.resolveRoute || resolveRoute;
    this.context = Object.assign({
      resolver: this
    }, options.context);
    this.root = Array.isArray(routes) ? {
      path: '',
      __children: routes,
      parent: null,
      __synthetic: true
    } : routes;
    this.root.parent = null;
  }
  /**
   * Returns the current list of routes (as a shallow copy). Adding / removing
   * routes to / from the returned array does not affect the routing config,
   * but modifying the route objects does.
   *
   * @return {!Array<!Router.Route>}
   */


  getRoutes() {
    return [...this.root.__children];
  }
  /**
   * Sets the routing config (replacing the existing one).
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   */


  setRoutes(routes) {
    ensureRoutes(routes);
    const newRoutes = [...toArray(routes)];
    this.root.__children = newRoutes;
  }
  /**
   * Appends one or several routes to the routing config and returns the
   * effective routing config after the operation.
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   * @return {!Array<!Router.Route>}
   * @protected
   */


  addRoutes(routes) {
    ensureRoutes(routes);

    this.root.__children.push(...toArray(routes));

    return this.getRoutes();
  }
  /**
   * Removes all existing routes from the routing config.
   */


  removeRoutes() {
    this.setRoutes([]);
  }
  /**
   * Asynchronously resolves the given pathname, i.e. finds all routes matching
   * the pathname and tries resolving them one after another in the order they
   * are listed in the routes config until the first non-null result.
   *
   * Returns a promise that is fulfilled with the return value of an object that consists of the first
   * route handler result that returns something other than `null` or `undefined` and context used to get this result.
   *
   * If no route handlers return a non-null result, or if no route matches the
   * given pathname the returned promise is rejected with a 'page not found'
   * `Error`.
   *
   * @param {!string|!{pathname: !string}} pathnameOrContext the pathname to
   *    resolve or a context object with a `pathname` property and other
   *    properties to pass to the route resolver functions.
   * @return {!Promise<any>}
   */


  resolve(pathnameOrContext) {
    const context = Object.assign({}, this.context, isString(pathnameOrContext) ? {
      pathname: pathnameOrContext
    } : pathnameOrContext);
    const match = matchRoute(this.root, this.__normalizePathname(context.pathname), this.baseUrl);
    const resolve = this.resolveRoute;
    let matches = null;
    let nextMatches = null;
    let currentContext = context;

    function next(resume, parent = matches.value.route, prevResult) {
      const routeToSkip = prevResult === null && matches.value.route;
      matches = nextMatches || match.next(routeToSkip);
      nextMatches = null;

      if (!resume) {
        if (matches.done || !isChildRoute(parent, matches.value.route)) {
          nextMatches = matches;
          return Promise.resolve(notFoundResult);
        }
      }

      if (matches.done) {
        return Promise.reject(getNotFoundError(context));
      }

      currentContext = Object.assign(currentContext ? {
        chain: currentContext.chain ? currentContext.chain.slice(0) : []
      } : {}, context, matches.value);
      updateChainForRoute(currentContext, matches.value);
      return Promise.resolve(resolve(currentContext)).then(resolution => {
        if (resolution !== null && resolution !== undefined && resolution !== notFoundResult) {
          currentContext.result = resolution.result || resolution;
          return currentContext;
        }

        return next(resume, parent, resolution);
      });
    }

    context.next = next;
    return Promise.resolve().then(() => next(true, this.root)).catch(error => {
      const errorMessage = generateErrorMessage(currentContext);

      if (!error) {
        error = new Error(errorMessage);
      } else {
        console.warn(errorMessage);
      }

      error.context = error.context || currentContext; // DOMException has its own code which is read-only

      if (!(error instanceof DOMException)) {
        error.code = error.code || 500;
      }

      if (this.errorHandler) {
        currentContext.result = this.errorHandler(error);
        return currentContext;
      }

      throw error;
    });
  }
  /**
   * URL constructor polyfill hook. Creates and returns an URL instance.
   */


  static __createUrl(url, base) {
    return new URL(url, base);
  }
  /**
   * If the baseUrl property is set, transforms the baseUrl and returns the full
   * actual `base` string for using in the `new URL(path, base);` and for
   * prepernding the paths with. The returned base ends with a trailing slash.
   *
   * Otherwise, returns empty string.
   */


  get __effectiveBaseUrl() {
    return this.baseUrl ? this.constructor.__createUrl(this.baseUrl, document.baseURI || document.URL).href.replace(/[^\/]*$/, '') : '';
  }
  /**
   * If the baseUrl is set, matches the pathname with the router’s baseUrl,
   * and returns the local pathname with the baseUrl stripped out.
   *
   * If the pathname does not match the baseUrl, returns undefined.
   *
   * If the `baseUrl` is not set, returns the unmodified pathname argument.
   */


  __normalizePathname(pathname) {
    if (!this.baseUrl) {
      // No base URL, no need to transform the pathname.
      return pathname;
    }

    const base = this.__effectiveBaseUrl;

    const normalizedUrl = this.constructor.__createUrl(pathname, base).href;

    if (normalizedUrl.slice(0, base.length) === base) {
      return normalizedUrl.slice(base.length);
    }
  }

}

exports.Resolver = Resolver;
Resolver.pathToRegexp = pathToRegexp_1;
/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {
  pathToRegexp: pathToRegexp$1
} = Resolver;
const cache$1 = new Map();

function cacheRoutes(routesByName, route, routes) {
  const name = route.name || route.component;

  if (name) {
    if (routesByName.has(name)) {
      routesByName.get(name).push(route);
    } else {
      routesByName.set(name, [route]);
    }
  }

  if (Array.isArray(routes)) {
    for (let i = 0; i < routes.length; i++) {
      const childRoute = routes[i];
      childRoute.parent = route;
      cacheRoutes(routesByName, childRoute, childRoute.__children || childRoute.children);
    }
  }
}

function getRouteByName(routesByName, routeName) {
  const routes = routesByName.get(routeName);

  if (routes && routes.length > 1) {
    throw new Error(`Duplicate route with name "${routeName}".` + ` Try seting unique 'name' route properties.`);
  }

  return routes && routes[0];
}

function getRoutePath(route) {
  let path = route.path;
  path = Array.isArray(path) ? path[0] : path;
  return path !== undefined ? path : '';
}

function generateUrls(router, options = {}) {
  if (!(router instanceof Resolver)) {
    throw new TypeError('An instance of Resolver is expected');
  }

  const routesByName = new Map();
  return (routeName, params) => {
    let route = getRouteByName(routesByName, routeName);

    if (!route) {
      routesByName.clear(); // clear cache

      cacheRoutes(routesByName, router.root, router.root.__children);
      route = getRouteByName(routesByName, routeName);

      if (!route) {
        throw new Error(`Route "${routeName}" not found`);
      }
    }

    let regexp = cache$1.get(route.fullPath);

    if (!regexp) {
      let fullPath = getRoutePath(route);
      let rt = route.parent;

      while (rt) {
        const path = getRoutePath(rt);

        if (path) {
          fullPath = path.replace(/\/$/, '') + '/' + fullPath.replace(/^\//, '');
        }

        rt = rt.parent;
      }

      const tokens = pathToRegexp$1.parse(fullPath);
      const toPath = pathToRegexp$1.tokensToFunction(tokens);
      const keys = Object.create(null);

      for (let i = 0; i < tokens.length; i++) {
        if (!isString(tokens[i])) {
          keys[tokens[i].name] = true;
        }
      }

      regexp = {
        toPath,
        keys
      };
      cache$1.set(fullPath, regexp);
      route.fullPath = fullPath;
    }

    let url = regexp.toPath(params, options) || '/';

    if (options.stringifyQueryParams && params) {
      const queryParams = {};
      const keys = Object.keys(params);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!regexp.keys[key]) {
          queryParams[key] = params[key];
        }
      }

      const query = options.stringifyQueryParams(queryParams);

      if (query) {
        url += query.charAt(0) === '?' ? query : `?${query}`;
      }
    }

    return url;
  };
}
/**
 * @typedef NavigationTrigger
 * @type {object}
 * @property {function()} activate
 * @property {function()} inactivate
 */

/** @type {Array<NavigationTrigger>} */


let triggers = [];

function setNavigationTriggers(newTriggers) {
  triggers.forEach(trigger => trigger.inactivate());
  newTriggers.forEach(trigger => trigger.activate());
  triggers = newTriggers;
}

const willAnimate = elem => {
  const name = getComputedStyle(elem).getPropertyValue('animation-name');
  return name && name !== 'none';
};

const waitForAnimation = (elem, cb) => {
  const listener = () => {
    elem.removeEventListener('animationend', listener);
    cb();
  };

  elem.addEventListener('animationend', listener);
};

function animate(elem, className) {
  elem.classList.add(className);
  return new Promise(resolve => {
    if (willAnimate(elem)) {
      const rect = elem.getBoundingClientRect();
      const size = `height: ${rect.bottom - rect.top}px; width: ${rect.right - rect.left}px`;
      elem.setAttribute('style', `position: absolute; ${size}`);
      waitForAnimation(elem, () => {
        elem.classList.remove(className);
        elem.removeAttribute('style');
        resolve();
      });
    } else {
      elem.classList.remove(className);
      resolve();
    }
  });
}

const MAX_REDIRECT_COUNT = 256;

function isResultNotEmpty(result) {
  return result !== null && result !== undefined;
}

function copyContextWithoutNext(context) {
  const copy = Object.assign({}, context);
  delete copy.next;
  return copy;
}

function createLocation({
  pathname = '',
  search = '',
  hash = '',
  chain = [],
  params = {},
  redirectFrom,
  resolver
}, route) {
  const routes = chain.map(item => item.route);
  return {
    baseUrl: resolver && resolver.baseUrl || '',
    pathname,
    search,
    hash,
    routes,
    route: route || routes.length && routes[routes.length - 1] || null,
    params,
    redirectFrom,
    getUrl: (userParams = {}) => getPathnameForRouter(Router.pathToRegexp.compile(getMatchedPath(routes))(Object.assign({}, params, userParams)), resolver)
  };
}

function createRedirect(context, pathname) {
  const params = Object.assign({}, context.params);
  return {
    redirect: {
      pathname,
      from: context.pathname,
      params
    }
  };
}

function renderElement(context, element) {
  element.location = createLocation(context);
  const index = context.chain.map(item => item.route).indexOf(context.route);
  context.chain[index].element = element;
  return element;
}

function runCallbackIfPossible(callback, args, thisArg) {
  if (isFunction(callback)) {
    return callback.apply(thisArg, args);
  }
}

function amend(amendmentFunction, args, element) {
  return amendmentResult => {
    if (amendmentResult && (amendmentResult.cancel || amendmentResult.redirect)) {
      return amendmentResult;
    }

    if (element) {
      return runCallbackIfPossible(element[amendmentFunction], args, element);
    }
  };
}

function processNewChildren(newChildren, route) {
  if (!Array.isArray(newChildren) && !isObject(newChildren)) {
    throw new Error(log(`Incorrect "children" value for the route ${route.path}: expected array or object, but got ${newChildren}`));
  }

  route.__children = [];
  const childRoutes = toArray(newChildren);

  for (let i = 0; i < childRoutes.length; i++) {
    ensureRoute(childRoutes[i]);

    route.__children.push(childRoutes[i]);
  }
}

function removeDomNodes(nodes) {
  if (nodes && nodes.length) {
    const parent = nodes[0].parentNode;

    for (let i = 0; i < nodes.length; i++) {
      parent.removeChild(nodes[i]);
    }
  }
}

function getPathnameForRouter(pathname, router) {
  const base = router.__effectiveBaseUrl;
  return base ? router.constructor.__createUrl(pathname.replace(/^\//, ''), base).pathname : pathname;
}

function getMatchedPath(chain) {
  return chain.map(item => item.path).reduce((a, b) => {
    if (b.length) {
      return a.replace(/\/$/, '') + '/' + b.replace(/^\//, '');
    }

    return a;
  }, '');
}
/**
 * A simple client-side router for single-page applications. It uses
 * express-style middleware and has a first-class support for Web Components and
 * lazy-loading. Works great in Polymer and non-Polymer apps.
 *
 * Use `new Router(outlet, options)` to create a new Router instance.
 *
 * * The `outlet` parameter is a reference to the DOM node to render
 *   the content into.
 *
 * * The `options` parameter is an optional object with options. The following
 *   keys are supported:
 *   * `baseUrl` — the initial value for [
 *     the `baseUrl` property
 *   ](#/classes/Router#property-baseUrl)
 *
 * The Router instance is automatically subscribed to navigation events
 * on `window`.
 *
 * See [Live Examples](#/classes/Router/demos/demo/index.html) for the detailed usage demo and code snippets.
 *
 * See also detailed API docs for the following methods, for the advanced usage:
 *
 * * [setOutlet](#/classes/Router#method-setOutlet) – should be used to configure the outlet.
 * * [setTriggers](#/classes/Router#method-setTriggers) – should be used to configure the navigation events.
 * * [setRoutes](#/classes/Router#method-setRoutes) – should be used to configure the routes.
 *
 * Only `setRoutes` has to be called manually, others are automatically invoked when creating a new instance.
 *
 * @extends Resolver
 * @demo demo/index.html
 * @summary JavaScript class that renders different DOM content depending on
 *    a given path. It can re-render when triggered or automatically on
 *    'popstate' and / or 'click' events.
 */


class Router extends Resolver {
  /**
   * Creates a new Router instance with a given outlet, and
   * automatically subscribes it to navigation events on the `window`.
   * Using a constructor argument or a setter for outlet is equivalent:
   *
   * ```
   * const router = new Router();
   * router.setOutlet(outlet);
   * ```
   * @param {?Node=} outlet
   * @param {?RouterOptions=} options
   */
  constructor(outlet, options) {
    const baseElement = document.head.querySelector('base');
    const baseHref = baseElement && baseElement.getAttribute('href');
    super([], Object.assign({
      // Default options
      baseUrl: baseHref && Resolver.__createUrl(baseHref, document.URL).pathname.replace(/[^\/]*$/, '')
    }, options));

    this.resolveRoute = context => this.__resolveRoute(context);

    const triggers = Router.NavigationTrigger;
    Router.setTriggers.apply(Router, Object.keys(triggers).map(key => triggers[key]));
    /**
     * The base URL for all routes in the router instance. By default,
     * if the base element exists in the `<head>`, vaadin-router
     * takes the `<base href>` attribute value, resolves against current `document.URL`
     * and gets the `pathname` from the result.
     *
     * @public
     * @type {string}
     */

    this.baseUrl;
    /**
     * A promise that is settled after the current render cycle completes. If
     * there is no render cycle in progress the promise is immediately settled
     * with the last render cycle result.
     *
     * @public
     * @type {!Promise<!RouterLocation>}
     */

    this.ready;
    this.ready = Promise.resolve(outlet);
    /**
     * Contains read-only information about the current router location:
     * pathname, active routes, parameters. See the
     * [Location type declaration](#/classes/RouterLocation)
     * for more details.
     *
     * @public
     * @type {!RouterLocation}
     */

    this.location;
    this.location = createLocation({
      resolver: this
    });
    this.__lastStartedRenderId = 0;
    this.__navigationEventHandler = this.__onNavigationEvent.bind(this);
    this.setOutlet(outlet);
    this.subscribe(); // Using WeakMap instead of WeakSet because WeakSet is not supported by IE11

    this.__createdByRouter = new WeakMap();
    this.__addedByRouter = new WeakMap();
  }

  __resolveRoute(context) {
    const route = context.route;
    let callbacks = Promise.resolve();

    if (isFunction(route.children)) {
      callbacks = callbacks.then(() => route.children(copyContextWithoutNext(context))).then(children => {
        // The route.children() callback might have re-written the
        // route.children property instead of returning a value
        if (!isResultNotEmpty(children) && !isFunction(route.children)) {
          children = route.children;
        }

        processNewChildren(children, route);
      });
    }

    const commands = {
      redirect: path => createRedirect(context, path),
      component: component => {
        const element = document.createElement(component);

        this.__createdByRouter.set(element, true);

        return element;
      }
    };
    return callbacks.then(() => {
      if (this.__isLatestRender(context)) {
        return runCallbackIfPossible(route.action, [context, commands], route);
      }
    }).then(result => {
      if (isResultNotEmpty(result)) {
        // Actions like `() => import('my-view.js')` are not expected to
        // end the resolution, despite the result is not empty. Checking
        // the result with a whitelist of values that end the resolution.
        if (result instanceof HTMLElement || result.redirect || result === notFoundResult) {
          return result;
        }
      }

      if (isString(route.redirect)) {
        return commands.redirect(route.redirect);
      }

      if (route.bundle) {
        return loadBundle(route.bundle).then(() => {}, () => {
          throw new Error(log(`Bundle not found: ${route.bundle}. Check if the file name is correct`));
        });
      }
    }).then(result => {
      if (isResultNotEmpty(result)) {
        return result;
      }

      if (isString(route.component)) {
        return commands.component(route.component);
      }
    });
  }
  /**
   * Sets the router outlet (the DOM node where the content for the current
   * route is inserted). Any content pre-existing in the router outlet is
   * removed at the end of each render pass.
   *
   * NOTE: this method is automatically invoked first time when creating a new Router instance.
   *
   * @param {?Node} outlet the DOM node where the content for the current route
   *     is inserted.
   */


  setOutlet(outlet) {
    if (outlet) {
      this.__ensureOutlet(outlet);
    }

    this.__outlet = outlet;
  }
  /**
   * Returns the current router outlet. The initial value is `undefined`.
   *
   * @return {?Node} the current router outlet (or `undefined`)
   */


  getOutlet() {
    return this.__outlet;
  }
  /**
   * Sets the routing config (replacing the existing one) and triggers a
   * navigation event so that the router outlet is refreshed according to the
   * current `window.location` and the new routing config.
   *
   * Each route object may have the following properties, listed here in the processing order:
   * * `path` – the route path (relative to the parent route if any) in the
   * [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   *
   * * `children` – an array of nested routes or a function that provides this
   * array at the render time. The function can be synchronous or asynchronous:
   * in the latter case the render is delayed until the returned promise is
   * resolved. The `children` function is executed every time when this route is
   * being rendered. This allows for dynamic route structures (e.g. backend-defined),
   * but it might have a performance impact as well. In order to avoid calling
   * the function on subsequent renders, you can override the `children` property
   * of the route object and save the calculated array there
   * (via `context.route.children = [ route1, route2, ...];`).
   * Parent routes are fully resolved before resolving the children. Children
   * 'path' values are relative to the parent ones.
   *
   * * `action` – the action that is executed before the route is resolved.
   * The value for this property should be a function, accepting `context`
   * and `commands` parameters described below. If present, this function is
   * always invoked first, disregarding of the other properties' presence.
   * The action can return a result directly or within a `Promise`, which
   * resolves to the result. If the action result is an `HTMLElement` instance,
   * a `commands.component(name)` result, a `commands.redirect(path)` result,
   * or a `context.next()` result, the current route resolution is finished,
   * and other route config properties are ignored.
   * See also **Route Actions** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `redirect` – other route's path to redirect to. Passes all route parameters to the redirect target.
   * The target route should also be defined.
   * See also **Redirects** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `bundle` – string containing the path to `.js` or `.mjs` bundle to load before resolving the route,
   * or the object with "module" and "nomodule" keys referring to different bundles.
   * Each bundle is only loaded once. If "module" and "nomodule" are set, only one bundle is loaded,
   * depending on whether the browser supports ES modules or not.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * Any error, e.g. 404 while loading bundle will cause route resolution to throw.
   * See also **Code Splitting** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `component` – the tag name of the Web Component to resolve the route to.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * If route contains the `component` property (or an action that return a component)
   * and its child route also contains the `component` property, child route's component
   * will be rendered as a light dom child of a parent component.
   *
   * * `name` – the string name of the route to use in the
   * [`router.urlForName(name, params)`](#/classes/Router#method-urlForName)
   * navigation helper method.
   *
   * For any route function (`action`, `children`) defined, the corresponding `route` object is available inside the callback
   * through the `this` reference. If you need to access it, make sure you define the callback as a non-arrow function
   * because arrow functions do not have their own `this` reference.
   *
   * `context` object that is passed to `action` function holds the following properties:
   * * `context.pathname` – string with the pathname being resolved
   *
   * * `context.search` – search query string
   *
   * * `context.hash` – hash string
   *
   * * `context.params` – object with route parameters
   *
   * * `context.route` – object that holds the route that is currently being rendered.
   *
   * * `context.next()` – function for asynchronously getting the next route
   * contents from the resolution chain (if any)
   *
   * `commands` object that is passed to `action` function has
   * the following methods:
   *
   * * `commands.redirect(path)` – function that creates a redirect data
   * for the path specified.
   *
   * * `commands.component(component)` – function that creates a new HTMLElement
   * with current context. Note: the component created by this function is reused if visiting the same path twice in row.
   *
   *
   * @param {!Array<!Route>|!Route} routes a single route or an array of those
   * @param {?boolean} skipRender configure the router but skip rendering the
   *     route corresponding to the current `window.location` values
   *
   * @return {!Promise<!Node>}
   */


  setRoutes(routes, skipRender = false) {
    this.__previousContext = undefined;
    this.__urlForName = undefined;
    super.setRoutes(routes);

    if (!skipRender) {
      this.__onNavigationEvent();
    }

    return this.ready;
  }
  /**
   * Asynchronously resolves the given pathname and renders the resolved route
   * component into the router outlet. If no router outlet is set at the time of
   * calling this method, or at the time when the route resolution is completed,
   * a `TypeError` is thrown.
   *
   * Returns a promise that is fulfilled with the router outlet DOM Node after
   * the route component is created and inserted into the router outlet, or
   * rejected if no route matches the given path.
   *
   * If another render pass is started before the previous one is completed, the
   * result of the previous render pass is ignored.
   *
   * @param {!string|!{pathname: !string, search: ?string, hash: ?string}} pathnameOrContext
   *    the pathname to render or a context object with a `pathname` property,
   *    optional `search` and `hash` properties, and other properties
   *    to pass to the resolver.
   * @param {boolean=} shouldUpdateHistory
   *    update browser history with the rendered location
   * @return {!Promise<!Node>}
   */


  render(pathnameOrContext, shouldUpdateHistory) {
    const renderId = ++this.__lastStartedRenderId;
    const context = Object.assign({
      search: '',
      hash: ''
    }, isString(pathnameOrContext) ? {
      pathname: pathnameOrContext
    } : pathnameOrContext, {
      __renderId: renderId
    }); // Find the first route that resolves to a non-empty result

    this.ready = this.resolve(context) // Process the result of this.resolve() and handle all special commands:
    // (redirect / prevent / component). If the result is a 'component',
    // then go deeper and build the entire chain of nested components matching
    // the pathname. Also call all 'on before' callbacks along the way.
    .then(context => this.__fullyResolveChain(context)).then(context => {
      if (this.__isLatestRender(context)) {
        const previousContext = this.__previousContext; // Check if the render was prevented and make an early return in that case

        if (context === previousContext) {
          // Replace the history with the previous context
          // to make sure the URL stays the same.
          this.__updateBrowserHistory(previousContext, true);

          return this.location;
        }

        this.location = createLocation(context);

        if (shouldUpdateHistory) {
          // Replace only if first render redirects, so that we don’t leave
          // the redirecting record in the history
          this.__updateBrowserHistory(context, renderId === 1);
        }

        fireRouterEvent('location-changed', {
          router: this,
          location: this.location
        }); // Skip detaching/re-attaching there are no render changes

        if (context.__skipAttach) {
          this.__copyUnchangedElements(context, previousContext);

          this.__previousContext = context;
          return this.location;
        }

        this.__addAppearingContent(context, previousContext);

        const animationDone = this.__animateIfNeeded(context);

        this.__runOnAfterEnterCallbacks(context);

        this.__runOnAfterLeaveCallbacks(context, previousContext);

        return animationDone.then(() => {
          if (this.__isLatestRender(context)) {
            // If there is another render pass started after this one,
            // the 'disappearing content' would be removed when the other
            // render pass calls `this.__addAppearingContent()`
            this.__removeDisappearingContent();

            this.__previousContext = context;
            return this.location;
          }
        });
      }
    }).catch(error => {
      if (renderId === this.__lastStartedRenderId) {
        if (shouldUpdateHistory) {
          this.__updateBrowserHistory(context);
        }

        removeDomNodes(this.__outlet && this.__outlet.children);
        this.location = createLocation(Object.assign(context, {
          resolver: this
        }));
        fireRouterEvent('error', Object.assign({
          router: this,
          error
        }, context));
        throw error;
      }
    });
    return this.ready;
  } // `topOfTheChainContextBeforeRedirects` is a context coming from Resolver.resolve().
  // It would contain a 'redirect' route or the first 'component' route that
  // matched the pathname. There might be more child 'component' routes to be
  // resolved and added into the chain. This method would find and add them.
  // `contextBeforeRedirects` is the context containing such a child component
  // route. It's only necessary when this method is called recursively (otherwise
  // it's the same as the 'top of the chain' context).
  //
  // Apart from building the chain of child components, this method would also
  // handle 'redirect' routes, call 'onBefore' callbacks and handle 'prevent'
  // and 'redirect' callback results.


  __fullyResolveChain(topOfTheChainContextBeforeRedirects, contextBeforeRedirects = topOfTheChainContextBeforeRedirects) {
    return this.__findComponentContextAfterAllRedirects(contextBeforeRedirects) // `contextAfterRedirects` is always a context with an `HTMLElement` result
    // In other cases the promise gets rejected and .then() is not called
    .then(contextAfterRedirects => {
      const redirectsHappened = contextAfterRedirects !== contextBeforeRedirects;
      const topOfTheChainContextAfterRedirects = redirectsHappened ? contextAfterRedirects : topOfTheChainContextBeforeRedirects;
      const matchedPath = getPathnameForRouter(getMatchedPath(contextAfterRedirects.chain), contextAfterRedirects.resolver);
      const isFound = matchedPath === contextAfterRedirects.pathname; // Recursive method to try matching more child and sibling routes

      const findNextContextIfAny = (context, parent = context.route, prevResult) => {
        return context.next(undefined, parent, prevResult).then(nextContext => {
          if (nextContext === null || nextContext === notFoundResult) {
            // Next context is not found in children, ...
            if (isFound) {
              // ...but original context is already fully matching - use it
              return context;
            } else if (parent.parent !== null) {
              // ...and there is no full match yet - step up to check siblings
              return findNextContextIfAny(context, parent.parent, nextContext);
            } else {
              return nextContext;
            }
          }

          return nextContext;
        });
      };

      return findNextContextIfAny(contextAfterRedirects).then(nextContext => {
        if (nextContext === null || nextContext === notFoundResult) {
          throw getNotFoundError(topOfTheChainContextAfterRedirects);
        }

        return nextContext && nextContext !== notFoundResult && nextContext !== contextAfterRedirects ? this.__fullyResolveChain(topOfTheChainContextAfterRedirects, nextContext) : this.__amendWithOnBeforeCallbacks(contextAfterRedirects);
      });
    });
  }

  __findComponentContextAfterAllRedirects(context) {
    const result = context.result;

    if (result instanceof HTMLElement) {
      renderElement(context, result);
      return Promise.resolve(context);
    } else if (result.redirect) {
      return this.__redirect(result.redirect, context.__redirectCount, context.__renderId).then(context => this.__findComponentContextAfterAllRedirects(context));
    } else if (result instanceof Error) {
      return Promise.reject(result);
    } else {
      return Promise.reject(new Error(log(`Invalid route resolution result for path "${context.pathname}". ` + `Expected redirect object or HTML element, but got: "${logValue(result)}". ` + `Double check the action return value for the route.`)));
    }
  }

  __amendWithOnBeforeCallbacks(contextWithFullChain) {
    return this.__runOnBeforeCallbacks(contextWithFullChain).then(amendedContext => {
      if (amendedContext === this.__previousContext || amendedContext === contextWithFullChain) {
        return amendedContext;
      }

      return this.__fullyResolveChain(amendedContext);
    });
  }

  __runOnBeforeCallbacks(newContext) {
    const previousContext = this.__previousContext || {};
    const previousChain = previousContext.chain || [];
    const newChain = newContext.chain;
    let callbacks = Promise.resolve();

    const prevent = () => ({
      cancel: true
    });

    const redirect = pathname => createRedirect(newContext, pathname);

    newContext.__divergedChainIndex = 0;
    newContext.__skipAttach = false;

    if (previousChain.length) {
      for (let i = 0; i < Math.min(previousChain.length, newChain.length); i = ++newContext.__divergedChainIndex) {
        if (previousChain[i].route !== newChain[i].route || previousChain[i].path !== newChain[i].path && previousChain[i].element !== newChain[i].element || !this.__isReusableElement(previousChain[i].element, newChain[i].element)) {
          break;
        }
      } // Skip re-attaching and notifications if element and chain do not change


      newContext.__skipAttach = // Same route chain
      newChain.length === previousChain.length && newContext.__divergedChainIndex == newChain.length && // Same element
      this.__isReusableElement(newContext.result, previousContext.result);

      if (newContext.__skipAttach) {
        // execute onBeforeLeave for changed segment element when skipping attach
        for (let i = newChain.length - 1; i >= 0; i--) {
          callbacks = this.__runOnBeforeLeaveCallbacks(callbacks, newContext, {
            prevent
          }, previousChain[i]);
        } // execute onBeforeEnter for changed segment element when skipping attach


        for (let i = 0; i < newChain.length; i++) {
          callbacks = this.__runOnBeforeEnterCallbacks(callbacks, newContext, {
            prevent,
            redirect
          }, newChain[i]);
          previousChain[i].element.location = createLocation(newContext, previousChain[i].route);
        }
      } else {
        // execute onBeforeLeave when NOT skipping attach
        for (let i = previousChain.length - 1; i >= newContext.__divergedChainIndex; i--) {
          callbacks = this.__runOnBeforeLeaveCallbacks(callbacks, newContext, {
            prevent
          }, previousChain[i]);
        }
      }
    } // execute onBeforeEnter when NOT skipping attach


    if (!newContext.__skipAttach) {
      for (let i = 0; i < newChain.length; i++) {
        if (i < newContext.__divergedChainIndex) {
          if (i < previousChain.length && previousChain[i].element) {
            previousChain[i].element.location = createLocation(newContext, previousChain[i].route);
          }
        } else {
          callbacks = this.__runOnBeforeEnterCallbacks(callbacks, newContext, {
            prevent,
            redirect
          }, newChain[i]);

          if (newChain[i].element) {
            newChain[i].element.location = createLocation(newContext, newChain[i].route);
          }
        }
      }
    }

    return callbacks.then(amendmentResult => {
      if (amendmentResult) {
        if (amendmentResult.cancel) {
          this.__previousContext.__renderId = newContext.__renderId;
          return this.__previousContext;
        }

        if (amendmentResult.redirect) {
          return this.__redirect(amendmentResult.redirect, newContext.__redirectCount, newContext.__renderId);
        }
      }

      return newContext;
    });
  }

  __runOnBeforeLeaveCallbacks(callbacks, newContext, commands, chainElement) {
    const location = createLocation(newContext);
    return callbacks.then(result => {
      if (this.__isLatestRender(newContext)) {
        const afterLeaveFunction = amend('onBeforeLeave', [location, commands, this], chainElement.element);
        return afterLeaveFunction(result);
      }
    }).then(result => {
      if (!(result || {}).redirect) {
        return result;
      }
    });
  }

  __runOnBeforeEnterCallbacks(callbacks, newContext, commands, chainElement) {
    const location = createLocation(newContext, chainElement.route);
    return callbacks.then(result => {
      if (this.__isLatestRender(newContext)) {
        const beforeEnterFunction = amend('onBeforeEnter', [location, commands, this], chainElement.element);
        return beforeEnterFunction(result);
      }
    });
  }

  __isReusableElement(element, otherElement) {
    if (element && otherElement) {
      return this.__createdByRouter.get(element) && this.__createdByRouter.get(otherElement) ? element.localName === otherElement.localName : element === otherElement;
    }

    return false;
  }

  __isLatestRender(context) {
    return context.__renderId === this.__lastStartedRenderId;
  }

  __redirect(redirectData, counter, renderId) {
    if (counter > MAX_REDIRECT_COUNT) {
      throw new Error(log(`Too many redirects when rendering ${redirectData.from}`));
    }

    return this.resolve({
      pathname: this.urlForPath(redirectData.pathname, redirectData.params),
      redirectFrom: redirectData.from,
      __redirectCount: (counter || 0) + 1,
      __renderId: renderId
    });
  }

  __ensureOutlet(outlet = this.__outlet) {
    if (!(outlet instanceof Node)) {
      throw new TypeError(log(`Expected router outlet to be a valid DOM Node (but got ${outlet})`));
    }
  }

  __updateBrowserHistory({
    pathname,
    search = '',
    hash = ''
  }, replace) {
    if (window.location.pathname !== pathname || window.location.search !== search || window.location.hash !== hash) {
      const changeState = replace ? 'replaceState' : 'pushState';
      window.history[changeState](null, document.title, pathname + search + hash);
      window.dispatchEvent(new PopStateEvent('popstate', {
        state: 'vaadin-router-ignore'
      }));
    }
  }

  __copyUnchangedElements(context, previousContext) {
    // Find the deepest common parent between the last and the new component
    // chains. Update references for the unchanged elements in the new chain
    let deepestCommonParent = this.__outlet;

    for (let i = 0; i < context.__divergedChainIndex; i++) {
      const unchangedElement = previousContext && previousContext.chain[i].element;

      if (unchangedElement) {
        if (unchangedElement.parentNode === deepestCommonParent) {
          context.chain[i].element = unchangedElement;
          deepestCommonParent = unchangedElement;
        } else {
          break;
        }
      }
    }

    return deepestCommonParent;
  }

  __addAppearingContent(context, previousContext) {
    this.__ensureOutlet(); // If the previous 'entering' animation has not completed yet,
    // stop it and remove that content from the DOM before adding new one.


    this.__removeAppearingContent(); // Copy reusable elements from the previousContext to current


    const deepestCommonParent = this.__copyUnchangedElements(context, previousContext); // Keep two lists of DOM elements:
    //  - those that should be removed once the transition animation is over
    //  - and those that should remain


    this.__appearingContent = [];
    this.__disappearingContent = Array.from(deepestCommonParent.children).filter( // Only remove layout content that was added by router
    e => this.__addedByRouter.get(e) && // Do not remove the result element to avoid flickering
    e !== context.result); // Add new elements (starting after the deepest common parent) to the DOM.
    // That way only the components that are actually different between the two
    // locations are added to the DOM (and those that are common remain in the
    // DOM without first removing and then adding them again).

    let parentElement = deepestCommonParent;

    for (let i = context.__divergedChainIndex; i < context.chain.length; i++) {
      const elementToAdd = context.chain[i].element;

      if (elementToAdd) {
        parentElement.appendChild(elementToAdd);

        this.__addedByRouter.set(elementToAdd, true);

        if (parentElement === deepestCommonParent) {
          this.__appearingContent.push(elementToAdd);
        }

        parentElement = elementToAdd;
      }
    }
  }

  __removeDisappearingContent() {
    if (this.__disappearingContent) {
      removeDomNodes(this.__disappearingContent);
    }

    this.__disappearingContent = null;
    this.__appearingContent = null;
  }

  __removeAppearingContent() {
    if (this.__disappearingContent && this.__appearingContent) {
      removeDomNodes(this.__appearingContent);
      this.__disappearingContent = null;
      this.__appearingContent = null;
    }
  }

  __runOnAfterLeaveCallbacks(currentContext, targetContext) {
    if (!targetContext) {
      return;
    } // REVERSE iteration: from Z to A


    for (let i = targetContext.chain.length - 1; i >= currentContext.__divergedChainIndex; i--) {
      if (!this.__isLatestRender(currentContext)) {
        break;
      }

      const currentComponent = targetContext.chain[i].element;

      if (!currentComponent) {
        continue;
      }

      try {
        const location = createLocation(currentContext);
        runCallbackIfPossible(currentComponent.onAfterLeave, [location, {}, targetContext.resolver], currentComponent);
      } finally {
        if (this.__disappearingContent.indexOf(currentComponent) > -1) {
          removeDomNodes(currentComponent.children);
        }
      }
    }
  }

  __runOnAfterEnterCallbacks(currentContext) {
    // forward iteration: from A to Z
    for (let i = currentContext.__divergedChainIndex; i < currentContext.chain.length; i++) {
      if (!this.__isLatestRender(currentContext)) {
        break;
      }

      const currentComponent = currentContext.chain[i].element || {};
      const location = createLocation(currentContext, currentContext.chain[i].route);
      runCallbackIfPossible(currentComponent.onAfterEnter, [location, {}, currentContext.resolver], currentComponent);
    }
  }

  __animateIfNeeded(context) {
    const from = (this.__disappearingContent || [])[0];
    const to = (this.__appearingContent || [])[0];
    const promises = [];
    const chain = context.chain;
    let config;

    for (let i = chain.length; i > 0; i--) {
      if (chain[i - 1].route.animate) {
        config = chain[i - 1].route.animate;
        break;
      }
    }

    if (from && to && config) {
      const leave = isObject(config) && config.leave || 'leaving';
      const enter = isObject(config) && config.enter || 'entering';
      promises.push(animate(from, leave));
      promises.push(animate(to, enter));
    }

    return Promise.all(promises).then(() => context);
  }
  /**
   * Subscribes this instance to navigation events on the `window`.
   *
   * NOTE: beware of resource leaks. For as long as a router instance is
   * subscribed to navigation events, it won't be garbage collected.
   */


  subscribe() {
    window.addEventListener('vaadin-router-go', this.__navigationEventHandler);
  }
  /**
   * Removes the subscription to navigation events created in the `subscribe()`
   * method.
   */


  unsubscribe() {
    window.removeEventListener('vaadin-router-go', this.__navigationEventHandler);
  }

  __onNavigationEvent(event) {
    const {
      pathname,
      search,
      hash
    } = event ? event.detail : window.location;

    if (isString(this.__normalizePathname(pathname))) {
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      this.render({
        pathname,
        search,
        hash
      }, true);
    }
  }
  /**
   * Configures what triggers Router navigation events:
   *  - `POPSTATE`: popstate events on the current `window`
   *  - `CLICK`: click events on `<a>` links leading to the current page
   *
   * This method is invoked with the pre-configured values when creating a new Router instance.
   * By default, both `POPSTATE` and `CLICK` are enabled. This setup is expected to cover most of the use cases.
   *
   * See the `router-config.js` for the default navigation triggers config. Based on it, you can
   * create the own one and only import the triggers you need, instead of pulling in all the code,
   * e.g. if you want to handle `click` differently.
   *
   * See also **Navigation Triggers** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * @param {...NavigationTrigger} triggers
   */


  static setTriggers(...triggers) {
    setNavigationTriggers(triggers);
  }
  /**
   * Generates a URL for the route with the given name, optionally performing
   * substitution of parameters.
   *
   * The route is searched in all the Router instances subscribed to
   * navigation events.
   *
   * **Note:** For child route names, only array children are considered.
   * It is not possible to generate URLs using a name for routes set with
   * a children function.
   *
   * @function urlForName
   * @param {!string} name the route name or the route’s `component` name.
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */


  urlForName(name, params) {
    if (!this.__urlForName) {
      this.__urlForName = generateUrls(this);
    }

    return getPathnameForRouter(this.__urlForName(name, params), this);
  }
  /**
   * Generates a URL for the given route path, optionally performing
   * substitution of parameters.
   *
   * @param {!string} path string route path declared in [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */


  urlForPath(path, params) {
    return getPathnameForRouter(Router.pathToRegexp.compile(path)(params), this);
  }
  /**
   * Triggers navigation to a new path. Returns a boolean without waiting until
   * the navigation is complete. Returns `true` if at least one `Router`
   * has handled the navigation (was subscribed and had `baseUrl` matching
   * the `path` argument), otherwise returns `false`.
   *
   * @param {!string|!{pathname: !string, search: (string|undefined), hash: (string|undefined)}} path
   *   a new in-app path string, or an URL-like object with `pathname`
   *   string property, and optional `search` and `hash` string properties.
   * @return {boolean}
   */


  static go(path) {
    const {
      pathname,
      search,
      hash
    } = isString(path) ? this.__createUrl(path, 'http://a') // some base to omit origin
    : path;
    return fireRouterEvent('go', {
      pathname,
      search,
      hash
    });
  }

}

exports.Router = Router;
const DEV_MODE_CODE_REGEXP = /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;
const FlowClients = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;

function isMinified() {
  function test() {
    /** vaadin-dev-mode:start
    return false;
    vaadin-dev-mode:end **/
    return true;
  }

  return uncommentAndRun(test);
}

function isDevelopmentMode() {
  try {
    if (isForcedDevelopmentMode()) {
      return true;
    }

    if (!isLocalhost()) {
      return false;
    }

    if (FlowClients) {
      return !isFlowProductionMode();
    }

    return !isMinified();
  } catch (e) {
    // Some error in this code, assume production so no further actions will be taken
    return false;
  }
}

function isForcedDevelopmentMode() {
  return localStorage.getItem("vaadin.developmentmode.force");
}

function isLocalhost() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}

function isFlowProductionMode() {
  if (FlowClients) {
    const productionModeApps = Object.keys(FlowClients).map(key => FlowClients[key]).filter(client => client.productionMode);

    if (productionModeApps.length > 0) {
      return true;
    }
  }

  return false;
}

function uncommentAndRun(callback, args) {
  if (typeof callback !== 'function') {
    return;
  }

  const match = DEV_MODE_CODE_REGEXP.exec(callback.toString());

  if (match) {
    try {
      // requires CSP: script-src 'unsafe-eval'
      callback = new Function(match[1]);
    } catch (e) {
      // eat the exception
      console.log('vaadin-development-mode-detector: uncommentAndRun() failed', e);
    }
  }

  return callback(args);
} // A guard against polymer-modulizer removing the window.Vaadin
// initialization above.


window['Vaadin'] = window['Vaadin'] || {};
/**
 * Inspects the source code of the given `callback` function for
 * specially-marked _commented_ code. If such commented code is found in the
 * callback source, uncomments and runs that code instead of the callback
 * itself. Otherwise runs the callback as is.
 *
 * The optional arguments are passed into the callback / uncommented code,
 * the result is returned.
 *
 * See the `isMinified()` function source code in this file for an example.
 *
 */

const runIfDevelopmentMode = function (callback, args) {
  if (window.Vaadin.developmentMode) {
    return uncommentAndRun(callback, args);
  }
};

if (window.Vaadin.developmentMode === undefined) {
  window.Vaadin.developmentMode = isDevelopmentMode();
}
/* This file is autogenerated from src/vaadin-usage-statistics.tpl.html */


function maybeGatherAndSendStats() {
  /** vaadin-dev-mode:start
  (function () {
  'use strict';
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
  } : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
  };
  var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
   return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
  }();
  var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
  };
  var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);
     this.now = new Date().getTime();
    this.logger = logger;
  }
   createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }
           jQuery.toString = function () {
            return _jQuery.toString();
          };
           return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];
       types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });
       var previousStats = JSON.stringify(storedStats);
       this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);
       var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });
       var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
  }();
  var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);
     this.key = key;
  }
   createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });
       return empty;
    }
  }]);
  return StatisticsStorage;
  }();
  var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);
     this.url = url;
    this.logger = logger;
  }
   createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;
       if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);
       var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
  }();
  var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);
     this.id = id;
  }
   createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
  }();
  var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);
     this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;
     this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }
   createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;
       if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
       if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }
       if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }
       this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);
       // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.0';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
  }();
  try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
  } catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
  }
  }());
   vaadin-dev-mode:end **/
}

const usageStatistics = function () {
  if (typeof runIfDevelopmentMode === 'function') {
    return runIfDevelopmentMode(maybeGatherAndSendStats);
  }
};

window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];
window.Vaadin.registrations.push({
  is: '@vaadin/router',
  version: '1.7.2'
});
usageStatistics();
Router.NavigationTrigger = {
  POPSTATE,
  CLICK
};
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _multipleFiles = _interopRequireDefault(require("./js/multipleFiles.js"));

require("./components/hello-world.js");

var _router = require("@vaadin/router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("Hello Again", _multipleFiles.default);
console.log("development");
//import '@vaadin/vaadin-lumo-styles/all-imports'
// Initalize App Router (Vaadin Router)
window.addEventListener('load', function () {
  initRouter();
});

function initRouter() {
  var router = new _router.Router(document.querySelector('main'));
  router.setRoutes([{
    path: '/',
    component: 'hello-world'
  }]);
}
},{"./js/multipleFiles.js":"js/multipleFiles.js","./components/hello-world.js":"components/hello-world.js","@vaadin/router":"../node_modules/@vaadin/router/dist/vaadin-router.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58472" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map