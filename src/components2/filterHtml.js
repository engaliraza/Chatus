import $ from 'jquery'
function encodeHtml(str){
    return $('<div/>').text(str).html()
}
export {encodeHtml};