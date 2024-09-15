const EXAMKEY = "SAP2";
const PASSKEY = "passsap2";

// Usage
// zeroPad(1,10);   //=> 01
// zeroPad(1,100);   //=> 001
function zeroPad(nr,base){
    var  len = (String(base).length - String(nr).length)+1;
    return len > 0? new Array(len).join('0')+nr : nr;
}

document.addEventListener('keydown', function (e) {
    if(event.which=="17")
        cntrlIsPressed = true;
});

document.addEventListener('keyup', function (e) {
    cntrlIsPressed = false;
});

var cntrlIsPressed = false;
//document.addEventListener("keydown", keyDownTextField, false);

// 주어진 이름의 쿠키를 반환하는데,
// 조건에 맞는 쿠키가 없다면 undefined를 반환합니다.
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
        ...options
    };
    
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
        }
    }
    
    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
    'max-age': -1
    })
}

function setSequence(seq, vlist) {
    var expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 1);
    expDate = expDate.toUTCString();
    setCookie(EXAMKEY+seq, vlist, {secure: true, 'expires': expDate});
}

function setVlist(question_id, vlist, toggle) {
    var varray = [];
        
    if (vlist != undefined && passwd != undefined) {
        varray = vlist.split(',');
    } else {
        return question_id
    }
    
    var idx = varray.indexOf(question_id);
    if (idx < 0) {
        vlist = vlist + "," + question_id;
        return vlist.split(',').sort().join(",");
    } else if (toggle == true) {
        varray.splice(idx, 1)
        // console.log("varray: " + varray + ", vlist: " + vlist)
        return varray.sort().join(",");
    } else {
        return varray.sort().join(",")
    }
}

function VisitExam(question_id) {
    var seq = 2 // document.getElementById("seq").innerHTML
    var vlist = getCookie(EXAMKEY+seq);
    var varray = []
            
    // console.log("question_id:" + question_id)
    if (vlist != undefined) {
        varray = vlist.split(',');
    }
    // console.log("Clicked QID: " + question_id + " : " + vlist)
    
    if (cntrlIsPressed || seq == "X") {
        let newList = setVlist(question_id, vlist, true);
        setSequence(seq, newList)
    } else {
        let newList = setVlist(question_id, vlist, false);
        if (vlist != newList) {
            setSequence(seq, newList)
        }
    }
    // // Manually set the window location hash for correct scrolling behavior
    // if (document.getElementById("Q"+question_id)) {
    //     // document.getElementById("Q"+question_id).scrollIntoView({ behavior: "smooth" });
    //     document.getElementById("Q"+question_id).scrollIntoView();
    // } else {
    //     console.log("Element with ID 'Q" + question_id + "' not found.");
    // }
}

var passwd = getCookie(PASSKEY);
