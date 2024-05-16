
function dataURLToBlob(dataURL) {
    var byteString;
    if (dataURL.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURL.split(',')[1]);
    else
        byteString = unescape(dataURL.split(',')[1]);
    var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

function nameFileRandom(file) {
    return file + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


function stringFilter(kalimat){
    let tanpaSimbol = kalimat.replace(/[^\w\s]/gi, '');
    return tanpaSimbol
}

function filterSpasi(kalimat)
{
    let tanpaSpasiDanKurung = stringFilter(kalimat).replace(/\s|/g, '');
    return tanpaSpasiDanKurung
}

export { dataURLToBlob,nameFileRandom,filterSpasi }