module.exports = /******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = require('../../ssr-module-cache.js'); // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ var threw = true;
    /******/ try {
      /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      /******/ threw = false;
      /******/
    } finally {
      /******/ if (threw) delete installedModules[moduleId];
      /******/
    } // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = './src/pages/api/graphql.ts')
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './src/helper/scrap.ts':
      /*!*****************************!*\
  !*** ./src/helper/scrap.ts ***!
  \*****************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio */ \"cheerio\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst sanitazeCherElement = ($, e) => {\n  let t = $(e).text();\n  let b = t.split('\\n');\n  b = b.filter(v => v !== '').map(v => {\n    return v.trim();\n  }).filter(v => v !== '').filter(v => v != 'Play');\n  return b;\n};\n\nconst convertToSongStruct = a => {\n  let el = 'verse';\n\n  if (a[0] === 'Reff:') {\n    el = 'reff';\n  }\n\n  let obj = {\n    element: el,\n    content: a[1]\n  };\n  return obj;\n};\n\nconst main = async id => {\n  try {\n    let data = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`https://alkitab.mobi/kidung/kj/${id}`);\n    let htmlData = data.data;\n    let $ = cheerio__WEBPACK_IMPORTED_MODULE_0___default.a.load(htmlData);\n    let a = $('p.paragraphtitle');\n    let cc = a.nextUntil('hr');\n    let title = $('title').text().replace(/KJ\\s([0-9]{1,3}\\s-\\s)/, '');\n    let song = {\n      title: '',\n      lyrics: []\n    };\n    song.title = title;\n    cc.each((_, v) => {\n      $(v).each((_, e) => {\n        let b = sanitazeCherElement($, e);\n\n        if (b.length > 0) {\n          let ss = convertToSongStruct(b);\n          song.lyrics.push(ss);\n        }\n      });\n    });\n    return song;\n  } catch (error) {\n    if (true) {\n      throw error;\n    }\n  }\n\n  return {};\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (main);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyL3NjcmFwLnRzPzRlN2EiXSwibmFtZXMiOlsic2FuaXRhemVDaGVyRWxlbWVudCIsIiQiLCJlIiwidCIsInRleHQiLCJiIiwic3BsaXQiLCJmaWx0ZXIiLCJ2IiwibWFwIiwidHJpbSIsImNvbnZlcnRUb1NvbmdTdHJ1Y3QiLCJhIiwiZWwiLCJvYmoiLCJlbGVtZW50IiwiY29udGVudCIsIm1haW4iLCJpZCIsImRhdGEiLCJheGlvcyIsImdldCIsImh0bWxEYXRhIiwiY2hlZXJpbyIsImxvYWQiLCJjYyIsIm5leHRVbnRpbCIsInRpdGxlIiwicmVwbGFjZSIsInNvbmciLCJseXJpY3MiLCJlYWNoIiwiXyIsImxlbmd0aCIsInNzIiwicHVzaCIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFZQSxNQUFNQSxtQkFBbUIsR0FBRyxDQUMxQkMsQ0FEMEIsRUFFMUJDLENBRjBCLEtBR1I7QUFDbEIsTUFBSUMsQ0FBQyxHQUFHRixDQUFDLENBQUNDLENBQUQsQ0FBRCxDQUFLRSxJQUFMLEVBQVI7QUFFQSxNQUFJQyxDQUFDLEdBQUdGLENBQUMsQ0FBQ0csS0FBRixDQUFRLElBQVIsQ0FBUjtBQUVBRCxHQUFDLEdBQUdBLENBQUMsQ0FDRkUsTUFEQyxDQUNPQyxDQUFELElBQU9BLENBQUMsS0FBSyxFQURuQixFQUVEQyxHQUZDLENBRUlELENBQUQsSUFBdUI7QUFDMUIsV0FBT0EsQ0FBQyxDQUFDRSxJQUFGLEVBQVA7QUFDRCxHQUpDLEVBS0RILE1BTEMsQ0FLT0MsQ0FBRCxJQUFPQSxDQUFDLEtBQUssRUFMbkIsRUFNREQsTUFOQyxDQU1PQyxDQUFELElBQU9BLENBQUMsSUFBSSxNQU5sQixDQUFKO0FBUUEsU0FBT0gsQ0FBUDtBQUNELENBakJEOztBQW1CQSxNQUFNTSxtQkFBbUIsR0FBSUMsQ0FBRCxJQUFtQztBQUM3RCxNQUFJQyxFQUFVLEdBQUcsT0FBakI7O0FBRUEsTUFBSUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxLQUFTLE9BQWIsRUFBc0I7QUFDcEJDLE1BQUUsR0FBRyxNQUFMO0FBQ0Q7O0FBRUQsTUFBSUMsR0FBZ0IsR0FBRztBQUNyQkMsV0FBTyxFQUFFRixFQURZO0FBRXJCRyxXQUFPLEVBQUVKLENBQUMsQ0FBQyxDQUFEO0FBRlcsR0FBdkI7QUFLQSxTQUFPRSxHQUFQO0FBQ0QsQ0FiRDs7QUFlQSxNQUFNRyxJQUFJLEdBQUcsTUFBT0MsRUFBUCxJQUFzQjtBQUNqQyxNQUFJO0FBQ0YsUUFBSUMsSUFBSSxHQUFHLE1BQU1DLDRDQUFLLENBQUNDLEdBQU4sQ0FBVyxrQ0FBaUNILEVBQUcsRUFBL0MsQ0FBakI7QUFDQSxRQUFJSSxRQUFRLEdBQUdILElBQUksQ0FBQ0EsSUFBcEI7QUFFQSxRQUFJbEIsQ0FBQyxHQUFHc0IsOENBQU8sQ0FBQ0MsSUFBUixDQUFhRixRQUFiLENBQVI7QUFDQSxRQUFJVixDQUFDLEdBQUdYLENBQUMsQ0FBQyxrQkFBRCxDQUFUO0FBQ0EsUUFBSXdCLEVBQUUsR0FBR2IsQ0FBQyxDQUFDYyxTQUFGLENBQVksSUFBWixDQUFUO0FBRUEsUUFBSUMsS0FBYSxHQUFHMUIsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUNqQkcsSUFEaUIsR0FFakJ3QixPQUZpQixDQUVULHVCQUZTLEVBRWdCLEVBRmhCLENBQXBCO0FBSUEsUUFBSUMsSUFBVSxHQUFHO0FBQ2ZGLFdBQUssRUFBRSxFQURRO0FBRWZHLFlBQU0sRUFBRTtBQUZPLEtBQWpCO0FBS0FELFFBQUksQ0FBQ0YsS0FBTCxHQUFhQSxLQUFiO0FBRUFGLE1BQUUsQ0FBQ00sSUFBSCxDQUFRLENBQUNDLENBQUQsRUFBSXhCLENBQUosS0FBVTtBQUNoQlAsT0FBQyxDQUFDTyxDQUFELENBQUQsQ0FBS3VCLElBQUwsQ0FBVSxDQUFDQyxDQUFELEVBQUk5QixDQUFKLEtBQVU7QUFDbEIsWUFBSUcsQ0FBQyxHQUFHTCxtQkFBbUIsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLENBQTNCOztBQUVBLFlBQUlHLENBQUMsQ0FBQzRCLE1BQUYsR0FBVyxDQUFmLEVBQWtCO0FBQ2hCLGNBQUlDLEVBQUUsR0FBR3ZCLG1CQUFtQixDQUFDTixDQUFELENBQTVCO0FBQ0F3QixjQUFJLENBQUNDLE1BQUwsQ0FBWUssSUFBWixDQUFpQkQsRUFBakI7QUFDRDtBQUNGLE9BUEQ7QUFRRCxLQVREO0FBV0EsV0FBT0wsSUFBUDtBQUNELEdBL0JELENBK0JFLE9BQU9PLEtBQVAsRUFBYztBQUNkLGNBQTBDO0FBQ3hDLFlBQU1BLEtBQU47QUFDRDtBQUNGOztBQUVELFNBQU8sRUFBUDtBQUNELENBdkNEOztBQXlDZW5CLG1FQUFmIiwiZmlsZSI6Ii4vc3JjL2hlbHBlci9zY3JhcC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuaW50ZXJmYWNlIEx5cmljU3RydWN0IHtcbiAgZWxlbWVudDogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBTb25nIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgbHlyaWNzOiBBcnJheTxMeXJpY1N0cnVjdD47XG59XG5cbmNvbnN0IHNhbml0YXplQ2hlckVsZW1lbnQgPSAoXG4gICQ6IENoZWVyaW9TdGF0aWMsXG4gIGU6IENoZWVyaW9FbGVtZW50XG4pOiBBcnJheTxzdHJpbmc+ID0+IHtcbiAgbGV0IHQgPSAkKGUpLnRleHQoKTtcblxuICBsZXQgYiA9IHQuc3BsaXQoJ1xcbicpO1xuXG4gIGIgPSBiXG4gICAgLmZpbHRlcigodikgPT4gdiAhPT0gJycpXG4gICAgLm1hcCgodjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiB2LnRyaW0oKTtcbiAgICB9KVxuICAgIC5maWx0ZXIoKHYpID0+IHYgIT09ICcnKVxuICAgIC5maWx0ZXIoKHYpID0+IHYgIT0gJ1BsYXknKTtcblxuICByZXR1cm4gYjtcbn07XG5cbmNvbnN0IGNvbnZlcnRUb1NvbmdTdHJ1Y3QgPSAoYTogQXJyYXk8c3RyaW5nPik6IEx5cmljU3RydWN0ID0+IHtcbiAgbGV0IGVsOiBzdHJpbmcgPSAndmVyc2UnO1xuXG4gIGlmIChhWzBdID09PSAnUmVmZjonKSB7XG4gICAgZWwgPSAncmVmZic7XG4gIH1cblxuICBsZXQgb2JqOiBMeXJpY1N0cnVjdCA9IHtcbiAgICBlbGVtZW50OiBlbCxcbiAgICBjb250ZW50OiBhWzFdXG4gIH07XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IG1haW4gPSBhc3luYyAoaWQ6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGxldCBkYXRhID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwczovL2Fsa2l0YWIubW9iaS9raWR1bmcva2ovJHtpZH1gKTtcbiAgICBsZXQgaHRtbERhdGEgPSBkYXRhLmRhdGE7XG5cbiAgICBsZXQgJCA9IGNoZWVyaW8ubG9hZChodG1sRGF0YSk7XG4gICAgbGV0IGEgPSAkKCdwLnBhcmFncmFwaHRpdGxlJyk7XG4gICAgbGV0IGNjID0gYS5uZXh0VW50aWwoJ2hyJyk7XG5cbiAgICBsZXQgdGl0bGU6IHN0cmluZyA9ICQoJ3RpdGxlJylcbiAgICAgIC50ZXh0KClcbiAgICAgIC5yZXBsYWNlKC9LSlxccyhbMC05XXsxLDN9XFxzLVxccykvLCAnJyk7XG5cbiAgICBsZXQgc29uZzogU29uZyA9IHtcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGx5cmljczogW11cbiAgICB9O1xuXG4gICAgc29uZy50aXRsZSA9IHRpdGxlO1xuXG4gICAgY2MuZWFjaCgoXywgdikgPT4ge1xuICAgICAgJCh2KS5lYWNoKChfLCBlKSA9PiB7XG4gICAgICAgIGxldCBiID0gc2FuaXRhemVDaGVyRWxlbWVudCgkLCBlKTtcblxuICAgICAgICBpZiAoYi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IHNzID0gY29udmVydFRvU29uZ1N0cnVjdChiKTtcbiAgICAgICAgICBzb25nLmx5cmljcy5wdXNoKHNzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc29uZztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge307XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYWluO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/helper/scrap.ts\n"
        );

        /***/
      },

    /***/ './src/helper/server.ts':
      /*!******************************!*\
  !*** ./src/helper/server.ts ***!
  \******************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apollo_server_micro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-micro */ "apollo-server-micro");\n/* harmony import */ var apollo_server_micro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_micro__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scrap */ "./src/helper/scrap.ts");\n\n // prettier-ignore\n// The GraphQL schema\n\nconst typeDefs = apollo_server_micro__WEBPACK_IMPORTED_MODULE_0__["gql"]`\n  type Lyric {\n    element: String\n    content: String\n  }\n  type Song {\n\t\ttitle: String\n    lyrics: [Lyric]\n\t}\n  type Query {\n    getSong(id: Int): Song\n  }\n`; // prettier-ignore\n// A map of functions which return data for the schema.\n\nconst resolvers = {\n  Query: {\n    getSong: (__, args, _) => {\n      const {\n        id\n      } = args;\n      let a = Object(_scrap__WEBPACK_IMPORTED_MODULE_1__["default"])(id.toString());\n      return a;\n    }\n  }\n};\nconst server = new apollo_server_micro__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({\n  typeDefs,\n  resolvers,\n  introspection: true,\n  playground: true\n});\n/* harmony default export */ __webpack_exports__["default"] = (server);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyL3NlcnZlci50cz8wNmUwIl0sIm5hbWVzIjpbInR5cGVEZWZzIiwiZ3FsIiwicmVzb2x2ZXJzIiwiUXVlcnkiLCJnZXRTb25nIiwiX18iLCJhcmdzIiwiXyIsImlkIiwiYSIsInNjcmFwIiwidG9TdHJpbmciLCJzZXJ2ZXIiLCJBcG9sbG9TZXJ2ZXIiLCJpbnRyb3NwZWN0aW9uIiwicGxheWdyb3VuZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtDQUdBO0FBQ0E7O0FBQ0EsTUFBTUEsUUFBUSxHQUFHQyx1REFBSTs7Ozs7Ozs7Ozs7O0NBQXJCLEMsQ0FjQTtBQUNBOztBQUNBLE1BQU1DLFNBQVMsR0FBRztBQUNoQkMsT0FBSyxFQUFFO0FBQ0xDLFdBQU8sRUFBRSxDQUFDQyxFQUFELEVBQUtDLElBQUwsRUFBZ0JDLENBQWhCLEtBQXNCO0FBQzdCLFlBQU07QUFBRUM7QUFBRixVQUFTRixJQUFmO0FBQ0EsVUFBSUcsQ0FBQyxHQUFHQyxzREFBSyxDQUFDRixFQUFFLENBQUNHLFFBQUgsRUFBRCxDQUFiO0FBQ0EsYUFBT0YsQ0FBUDtBQUNEO0FBTEk7QUFEUyxDQUFsQjtBQVVBLE1BQU1HLE1BQU0sR0FBRyxJQUFJQyxnRUFBSixDQUFpQjtBQUM5QmIsVUFEOEI7QUFFOUJFLFdBRjhCO0FBRzlCWSxlQUFhLEVBQUUsSUFIZTtBQUk5QkMsWUFBVSxFQUFFO0FBSmtCLENBQWpCLENBQWY7QUFPZUgscUVBQWYiLCJmaWxlIjoiLi9zcmMvaGVscGVyL3NlcnZlci50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwb2xsb1NlcnZlciwgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1taWNybyc7XG5pbXBvcnQgc2NyYXAgZnJvbSAnLi9zY3JhcCc7XG5cbi8vIHByZXR0aWVyLWlnbm9yZVxuLy8gVGhlIEdyYXBoUUwgc2NoZW1hXG5jb25zdCB0eXBlRGVmcyA9IGdxbGBcbiAgdHlwZSBMeXJpYyB7XG4gICAgZWxlbWVudDogU3RyaW5nXG4gICAgY29udGVudDogU3RyaW5nXG4gIH1cbiAgdHlwZSBTb25nIHtcblx0XHR0aXRsZTogU3RyaW5nXG4gICAgbHlyaWNzOiBbTHlyaWNdXG5cdH1cbiAgdHlwZSBRdWVyeSB7XG4gICAgZ2V0U29uZyhpZDogSW50KTogU29uZ1xuICB9XG5gO1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbi8vIEEgbWFwIG9mIGZ1bmN0aW9ucyB3aGljaCByZXR1cm4gZGF0YSBmb3IgdGhlIHNjaGVtYS5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgUXVlcnk6IHtcbiAgICBnZXRTb25nOiAoX18sIGFyZ3M6IGFueSwgXykgPT4ge1xuICAgICAgY29uc3QgeyBpZCB9ID0gYXJncztcbiAgICAgIGxldCBhID0gc2NyYXAoaWQudG9TdHJpbmcoKSk7XG4gICAgICByZXR1cm4gYTtcbiAgICB9LCBcbiAgfSxcbn07XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICB0eXBlRGVmcyxcbiAgcmVzb2x2ZXJzLFxuICBpbnRyb3NwZWN0aW9uOiB0cnVlLFxuICBwbGF5Z3JvdW5kOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/helper/server.ts\n'
        );

        /***/
      },

    /***/ './src/pages/api/graphql.ts':
      /*!**********************************!*\
  !*** ./src/pages/api/graphql.ts ***!
  \**********************************/
      /*! exports provided: config, default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });\n/* harmony import */ var _helper_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/server */ "./src/helper/server.ts");\n\nconst config = {\n  api: {\n    bodyParser: false\n  }\n};\n/* harmony default export */ __webpack_exports__["default"] = (_helper_server__WEBPACK_IMPORTED_MODULE_0__["default"].createHandler({\n  path: \'/api/graphql\'\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYXBpL2dyYXBocWwudHM/YTVjNyJdLCJuYW1lcyI6WyJjb25maWciLCJhcGkiLCJib2R5UGFyc2VyIiwiYXBvbGxvU2VydmVyIiwiY3JlYXRlSGFuZGxlciIsInBhdGgiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sTUFBTUEsTUFBTSxHQUFHO0FBQ3BCQyxLQUFHLEVBQUU7QUFDSEMsY0FBVSxFQUFFO0FBRFQ7QUFEZSxDQUFmO0FBTVFDLHFIQUFZLENBQUNDLGFBQWIsQ0FBMkI7QUFBRUMsTUFBSSxFQUFFO0FBQVIsQ0FBM0IsQ0FBZiIsImZpbGUiOiIuL3NyYy9wYWdlcy9hcGkvZ3JhcGhxbC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcG9sbG9TZXJ2ZXIgZnJvbSAnLi4vLi4vaGVscGVyL3NlcnZlcic7XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGFwaToge1xuICAgIGJvZHlQYXJzZXI6IGZhbHNlXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFwb2xsb1NlcnZlci5jcmVhdGVIYW5kbGVyKHsgcGF0aDogJy9hcGkvZ3JhcGhxbCcgfSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/api/graphql.ts\n'
        );

        /***/
      },

    /***/ 'apollo-server-micro':
      /*!**************************************!*\
  !*** external "apollo-server-micro" ***!
  \**************************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        eval(
          'module.exports = require("apollo-server-micro");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyLW1pY3JvXCI/MjM2ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJhcG9sbG8tc2VydmVyLW1pY3JvLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1taWNyb1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///apollo-server-micro\n'
        );

        /***/
      },

    /***/ axios:
      /*!************************!*\
  !*** external "axios" ***!
  \************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        eval(
          'module.exports = require("axios");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n'
        );

        /***/
      },

    /***/ cheerio:
      /*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        eval(
          'module.exports = require("cheerio");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGVlcmlvXCI/MTRiMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJjaGVlcmlvLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hlZXJpb1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///cheerio\n'
        );

        /***/
      }

    /******/
  }
);
