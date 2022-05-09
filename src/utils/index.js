/**
 * 同意前后端响应数据
 * @param {*} param0 
 * @returns 
 */
function formData({code=200,msg='success',data:[]}={}){
    if(code === 400 && msg === 'success')
    {
        msg='fail';
    }
    return {
        code,
        msg,
        data,
    }
}

formData.success = function(data){
    return formData(data)
}

formData.fail = function(data){
    return formData(data)
}

/**
 * 修改参数的限制
 * @param {Object} data 
 * @param {Array} params 
 */
 function formParams(data,params){
    const newData = {}
    params.forEach(key=>{
        if(data[key] !== undefined){
            newData[key] = data[key]
        }
    })
    return newData
}

const jwt = require('jsonwebtoken')
const privatekey = 'Xiaohei';//密文
// 有效期expiresIn   60为秒   字符串类型'60'是毫秒
const token ={
    create(data,expiresIn='1d'){
        const token = jwt.sign(data,privatekey,{expiresIn})
        return token;
    },
    verify(token){
        let result;
       try{
        var data = jwt.verify(token,privatekey)
        result = true;
       }catch(err){
        result = false;
       }
       return result;
    }
}

module.exports = {
    formData,
    formParams,
    token
}