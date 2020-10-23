/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/*! namespace exports */
/*! export graphql [provided] [maybe used in src/handler (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in src/handler (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"graphql\": () => /* binding */ graphql\n/* harmony export */ });\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! type-graphql */ \"type-graphql\");\n/* harmony import */ var type_graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(type_graphql__WEBPACK_IMPORTED_MODULE_3__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (undefined && undefined.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\n\n\n\n\nlet User = class User {\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Field)(_type => type_graphql__WEBPACK_IMPORTED_MODULE_3__.ID),\n    __metadata(\"design:type\", String)\n], User.prototype, \"id\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Field)(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"firstName\", void 0);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Field)(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"email\", void 0);\nUser = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.ObjectType)()\n], User);\nlet UserResolver = class UserResolver {\n    constructor() {\n        this.dynamoDb = new aws_sdk__WEBPACK_IMPORTED_MODULE_2__.DynamoDB.DocumentClient();\n    }\n    async getGreeting(firstName) {\n        var _a;\n        const result = await this.dynamoDb.get({\n            TableName: process.env.DYNAMODB_TABLE,\n            Key: { firstName },\n        }).promise();\n        const name = (_a = result.Item.nickname) !== null && _a !== void 0 ? _a : result.Item;\n        return `Hello, ${name}`;\n    }\n    async changeNickname(firstName, nickname) {\n        await this.dynamoDb.update({\n            TableName: process.env.DYNAMODB_TABLE,\n            Key: { firstName },\n            UpdateExpression: 'SET nickname = :nickname',\n            ExpressionAttributeValues: {\n                ':nickname': nickname,\n            },\n        }).promise();\n        return nickname;\n    }\n};\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Query)(_returns => String),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Arg)('firstName')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"getGreeting\", null);\n__decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Mutation)(_returns => String),\n    __param(0, (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Arg)('firstName')),\n    __param(1, (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Arg)('nickname', { nullable: true })),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String, String]),\n    __metadata(\"design:returntype\", Promise)\n], UserResolver.prototype, \"changeNickname\", null);\nUserResolver = __decorate([\n    (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.Resolver)(User)\n], UserResolver);\nconst graphql = async () => {\n    const schema = await (0,type_graphql__WEBPACK_IMPORTED_MODULE_3__.buildSchema)({\n        resolvers: [UserResolver],\n    });\n    const server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__.ApolloServer({\n        schema,\n        context: ({ event, context }) => ({\n            headers: event.headers,\n            functionName: context.functionName,\n            event,\n            context,\n        }),\n    });\n    return server.createHandler();\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaGFuZGxlci50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3doaXRlLWVsZXBoYW50Ly4vc3JjL2hhbmRsZXIudHM/YzQyNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcG9sbG9TZXJ2ZXIgfSBmcm9tICdhcG9sbG8tc2VydmVyLWxhbWJkYSc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHtcbiAgQXJnLFxuICBidWlsZFNjaGVtYSxcbiAgRmllbGQsIElELCBNdXRhdGlvbiwgT2JqZWN0VHlwZSwgUXVlcnksIFJlc29sdmVyLFxufSBmcm9tICd0eXBlLWdyYXBocWwnO1xuXG4vLyBjb25zdCB0eXBlRGVmcyA9IGdxbGBcbi8vICAgdHlwZSBRdWVyeSB7XG4vLyAgICAgZ2V0R3JlZXRpbmcoZmlyc3ROYW1lOiBTdHJpbmchKTogU3RyaW5nXG4vLyAgIH1cblxuLy8gICB0eXBlIE11dGF0aW9uIHtcbi8vICAgICBjaGFuZ2VOaWNrbmFtZShmaXJzdE5hbWU6IFN0cmluZyEsIG5pY2tuYW1lOiBTdHJpbmchKTogU3RyaW5nXG4vLyAgIH1cblxuLy8gICB0eXBlIFVzZXIge1xuLy8gICAgIGlkOiBJRCFcbi8vICAgICBmaXJzdE5hbWU6IFN0cmluZyFcbi8vICAgICBlbWFpbDogU3RyaW5nIVxuLy8gICB9XG4vLyBgO1xuLy8gY29uc3QgcmVzb2x2ZXJzOiBJUmVzb2x2ZXJzID0ge1xuLy8gICBRdWVyeToge1xuLy8gICAgIGdldEdyZWV0aW5nOiAoKSxcbi8vICAgfSxcbi8vIH07XG5AT2JqZWN0VHlwZSgpXG5jbGFzcyBVc2VyIHtcbiAgQEZpZWxkKF90eXBlID0+IElEKVxuICBpZDogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIGZpcnN0TmFtZTogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIGVtYWlsOiBzdHJpbmc7XG59XG5cbkBSZXNvbHZlcihVc2VyKVxuY2xhc3MgVXNlclJlc29sdmVyIHtcbiAgcHJpdmF0ZSBkeW5hbW9EYjogQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xuXG4gIEBRdWVyeShfcmV0dXJucyA9PiBTdHJpbmcpXG4gIGFzeW5jIGdldEdyZWV0aW5nKEBBcmcoJ2ZpcnN0TmFtZScpIGZpcnN0TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5keW5hbW9EYi5nZXQoe1xuICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5EWU5BTU9EQl9UQUJMRSxcbiAgICAgIEtleTogeyBmaXJzdE5hbWUgfSxcbiAgICB9KS5wcm9taXNlKCk7XG4gICAgY29uc3QgbmFtZSA9IHJlc3VsdC5JdGVtLm5pY2tuYW1lID8/IHJlc3VsdC5JdGVtO1xuICAgIHJldHVybiBgSGVsbG8sICR7bmFtZX1gO1xuICB9XG5cbiAgQE11dGF0aW9uKF9yZXR1cm5zID0+IFN0cmluZylcbiAgYXN5bmMgY2hhbmdlTmlja25hbWUoXG4gICAgQEFyZygnZmlyc3ROYW1lJykgZmlyc3ROYW1lOiBzdHJpbmcsXG4gICAgQEFyZygnbmlja25hbWUnLCB7IG51bGxhYmxlOiB0cnVlIH0pIG5pY2tuYW1lOiBzdHJpbmcsXG4gICkge1xuICAgIGF3YWl0IHRoaXMuZHluYW1vRGIudXBkYXRlKHtcbiAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuRFlOQU1PREJfVEFCTEUsXG4gICAgICBLZXk6IHsgZmlyc3ROYW1lIH0sXG4gICAgICBVcGRhdGVFeHByZXNzaW9uOiAnU0VUIG5pY2tuYW1lID0gOm5pY2tuYW1lJyxcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgJzpuaWNrbmFtZSc6IG5pY2tuYW1lLFxuICAgICAgfSxcbiAgICB9KS5wcm9taXNlKCk7XG4gICAgcmV0dXJuIG5pY2tuYW1lO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBncmFwaHFsID0gYXN5bmMgKCk6IFByb21pc2U8UmV0dXJuVHlwZTx0eXBlb2Ygc2VydmVyLmNyZWF0ZUhhbmRsZXI+PiA9PiB7XG4gIGNvbnN0IHNjaGVtYSA9IGF3YWl0IGJ1aWxkU2NoZW1hKHtcbiAgICByZXNvbHZlcnM6IFtVc2VyUmVzb2x2ZXJdLFxuICB9KTtcblxuICBjb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcbiAgICBzY2hlbWEsXG4gICAgY29udGV4dDogKHsgZXZlbnQsIGNvbnRleHQgfSkgPT4gKHtcbiAgICAgIGhlYWRlcnM6IGV2ZW50LmhlYWRlcnMsXG4gICAgICBmdW5jdGlvbk5hbWU6IGNvbnRleHQuZnVuY3Rpb25OYW1lLFxuICAgICAgZXZlbnQsXG4gICAgICBjb250ZXh0LFxuICAgIH0pLFxuICB9KTtcbiAgcmV0dXJuIHNlcnZlci5jcmVhdGVIYW5kbGVyKCk7XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQTJCQTtBQVNBO0FBUEE7QUFEQTs7QUFDQTtBQUdBO0FBREE7O0FBQ0E7QUFHQTtBQURBOztBQUNBO0FBUkE7QUFEQTtBQUNBO0FBWUE7QUFBQTtBQUNBO0FBMkJBO0FBeEJBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeEJBO0FBREE7QUFDQTs7OztBQU9BO0FBR0E7QUFEQTtBQUVBO0FBQ0E7Ozs7QUFXQTtBQTNCQTtBQURBO0FBQ0E7QUE4QkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/handler.ts\n");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("apollo-server-lambda");;

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("reflect-metadata");;

/***/ }),

/***/ "type-graphql":
/*!*******************************!*\
  !*** external "type-graphql" ***!
  \*******************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("type-graphql");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/handler.ts");
/******/ })()

));
