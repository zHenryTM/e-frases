function tagsFormatted(tag) {
    tag = tag.toLowerCase()
    tag = tag.trim()
    tag = tag.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    tag = tag.replaceAll(/([.*+?^=!:${}()|\[\]\/\\])/g, "")
    tag = tag.split(" ")  

    console.log(tag)   

    return tag
}                         
module.exports = tagsFormatted