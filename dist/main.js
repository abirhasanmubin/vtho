!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);function r(e){var n,t,r;return regeneratorRuntime.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n={constant:!1,inputs:[],name:"refreshTokenBalance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"},o.next=3,regeneratorRuntime.awrap(connex.thor.account(e).method(n));case 3:return t=o.sent,o.next=6,regeneratorRuntime.awrap(t.call());case 6:return r=o.sent,o.abrupt("return",r);case 8:case"end":return o.stop()}}))}var o=void 0,u="0x4cfdcf5a568590709c1a6347f5adeac7498e134c",c=0;document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("balance");(function(){var e=this;return regeneratorRuntime.async((function(n){for(;;)switch(n.prev=n.next){case 0:r(u).then((function(e){return e.decoded[0]})).then((function(e){c=Number(e)})).then((function(){connex.thor.ticker().next().then((function(){e.refresh()}))})).catch((function(n){setTimeout((function(){e.refresh()}),3e3)}));case 1:case"end":return n.stop()}}))})().then((function(){e.innerHTML=c.toString(),connex.thor.ticker().next().then((function(){o.refresh()}))})).catch((function(e){setTimeout((function(){o.refresh()}),3e3)}))}))}]);