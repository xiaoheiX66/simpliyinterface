"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 同意前后端响应数据
 * @param {*} param0 
 * @returns 
 */
function formData() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$code = _ref.code,
      code = _ref$code === void 0 ? 200 : _ref$code,
      _ref$msg = _ref.msg,
      msg = _ref$msg === void 0 ? 'success' : _ref$msg,
      _ref$data = _toArray(_ref.data);

  if (code === 400 && msg === 'success') {
    msg = 'fail';
  }

  return {
    code: code,
    msg: msg,
    data: data
  };
}

formData.success = function (data) {
  return formData(data);
};

formData.fail = function (data) {
  return formData(data);
};
/**
 * 修改参数的限制
 * @param {Object} data 
 * @param {Array} params 
 */


function formParams(data, params) {
  var newData = {};
  params.forEach(function (key) {
    if (data[key] !== undefined) {
      newData[key] = data[key];
    }
  });
  return newData;
}

var jwt = require('jsonwebtoken');

var privatekey = 'Xiaohei'; //密文
// 有效期expiresIn   60为秒   字符串类型'60'是毫秒

var token = {
  create: function create(data) {
    var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1d';
    var token = jwt.sign(data, privatekey, {
      expiresIn: expiresIn
    });
    return token;
  },
  verify: function verify(token) {
    var result;

    try {
      var data = jwt.verify(token, privatekey);
      result = true;
    } catch (err) {
      result = false;
    }

    return result;
  }
};
module.exports = {
  formData: formData,
  formParams: formParams,
  token: token
};