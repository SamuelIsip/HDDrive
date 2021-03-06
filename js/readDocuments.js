import { getCookie } from "./modules/cookies";
import { menu_options_file } from "./options_file";
var userName = localStorage.getItem("userName");
var userID = localStorage.getItem("userID");
if (userName === null || userID === null) {
    userName = getCookie("userName");
    userID = getCookie("userID");
    if (userName !== null || userID !== null) {
        localStorage.setItem("userName", userName);
        localStorage.setItem("userID", userID);
    }
}
if (userName === null || userID === null) {
    window.location.href = encodeURI("./../");
}
export function readDocuments() {
    var div_list = document.getElementsByClassName("table_files")[0];
    $.ajax({
        url: "./../api/readDocs.php",
        type: "GET",
        dataType: "json",
        data: { userNameSession: userName, userIDSession: userID },
        async: true,
        success: (doc) => {
            createList(doc, div_list);
        },
    });
}
function createList(doc, div_list) {
    calculateTotalStorage();
    var count = 0;
    var tbody = document.createElement("tbody");
    //Borramos /. y /..
    doc.docs.shift();
    doc.docs.shift();
    doc.docs.forEach((nameDoc) => {
        //Body
        let tr = document.createElement("tr");
        tr.classList.add(count.toString());
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.classList.add("check_file");
        check.style.display = "none";
        check.setAttribute("name", "check_file");
        tr.appendChild(check);
        let input_name = document.createElement("input");
        input_name.setAttribute("type", "text");
        $(input_name).css({
            "background-color": "transparent",
            border: "none",
        });
        //Añadir datos
        if (nameDoc.isDirFile === "dir") {
            let i1 = document.createElement("i");
            i1.classList.add("fas");
            i1.classList.add("fa-folder");
            i1.addEventListener("mouseenter", () => {
                i1.classList.toggle("fa-folder-open");
            });
            i1.addEventListener("mouseleave", () => {
                i1.classList.toggle("fa-folder-open");
            });
            td1.appendChild(i1);
            td1.addEventListener("click", () => {
                //Añadir ruta a la linea superior
                addLinkHead(nameDoc);
                isDir(getPath() + "/");
            });
        }
        else if (nameDoc.isDirFile === "file") {
            td1.addEventListener("click", () => {
                isFile(getPath() + nameDoc.name);
            });
        }
        input_name.value = nameDoc.name;
        input_name.setAttribute("readonly", "");
        input_name.classList.add("name_file_dir");
        //Favorite icon
        if (nameDoc.isDirFile === "file" && nameDoc.isFavorite === 1) {
            let i = document.createElement("i");
            i.classList.add("fas");
            i.classList.add("fa-star");
            i.style.cssText = "color:#ffff00; font-size:15px";
            td1.appendChild(i);
        }
        td1.appendChild(input_name);
        td1.classList.add("name_file");
        td2.appendChild(document.createTextNode(nameDoc.size));
        td2.classList.add("size_file");
        td3.appendChild(document.createTextNode(nameDoc.modific));
        td3.classList.add("date_file");
        td4.classList.add("options_file");
        td4.classList.add("row" + count);
        let i = document.createElement("i");
        i.classList.add("fas");
        i.classList.add("fa-ellipsis-v");
        td4.appendChild(i);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        count++;
        tbody.appendChild(tr);
    });
    div_list.appendChild(tbody);
    menu_options_file();
}
export function isDir(nameDoc) {
    toggleLoader();
    var div_list = document.getElementsByClassName("table_files")[0];
    deleteFileRecursive();
    $.ajax({
        url: "./../api/readDocs.php",
        type: "GET",
        dataType: "json",
        data: {
            nameDir: nameDoc,
            userNameSession: userName,
            userIDSession: userID,
        },
        async: true,
        success: (doc) => {
            createList(doc, div_list);
        },
    });
    toggleLoader();
}
export function isFile(nameFile) {
    window.location.href = encodeURI("./../api/downloadFile.php?nameFile=" + nameFile);
}
export function getPath() {
    var docs_header = document.getElementsByClassName("docs_header")[0];
    var ul = docs_header.children[0];
    var li_list = ul.children;
    var rutaHeader = "/";
    for (let i = 2; i < li_list.length; i++) {
        rutaHeader =
            rutaHeader + li_list[i].children[0].innerText + "/";
    }
    //ruta = rutaHeader;
    return rutaHeader;
}
export function addLinkHead(nameDoc) {
    var docs_header = document.getElementsByClassName("docs_header")[0];
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.appendChild(document.createTextNode(nameDoc.name));
    a.addEventListener("click", () => {
        isDir(nameDoc.name + "/");
        updateLinkHead(nameDoc.name);
    });
    li.appendChild(a);
    docs_header.childNodes[1].appendChild(li);
}
export function resetLinkHead() {
    var docs_header = document.getElementsByClassName("docs_header")[0].firstElementChild;
    var lis = docs_header.children;
    for (let i = lis.length - 1; i > 1; i--)
        docs_header.children[i].remove();
}
export function updateLinkHead(nameDir) {
    var docs_header = document.getElementsByClassName("docs_header")[0].firstElementChild;
    var lis = docs_header.children;
    for (let i = lis.length - 1; i > 1; i--) {
        if (docs_header.children[i].firstElementChild.innerText ==
            nameDir)
            break;
        docs_header.children[i].remove();
    }
}
export function eventLinkHeadHome() {
    var docs_header = document.getElementsByClassName("docs_header")[0].firstElementChild;
    docs_header.children[0].addEventListener("click", () => {
        // Remove the table, to reload files of index
        deleteFileRecursive();
        readDocuments();
        resetLinkHead();
    });
    docs_header.children[1].addEventListener("click", () => {
        // Remove the table, to reload files of index
        deleteFileRecursive();
        readDocuments();
        resetLinkHead();
    });
}
export function deleteFileRecursive() {
    var div_list = document.getElementsByClassName("table_files")[0];
    if (div_list.hasChildNodes() && div_list.childElementCount > 1)
        div_list.removeChild(div_list.lastChild);
}
export function calculateTotalStorage() {
    $.ajax({
        url: "./../api/getAllStorage.php",
        type: "GET",
        dataType: "json",
        async: true,
        success: (responseText) => {
            var number_size = 0;
            responseText.storage.forEach((t) => {
                let size_string = t.size;
                let position = size_string.search(" ");
                let tipo = size_string.substr(position, size_string.length).trim();
                let number = parseInt(size_string.substr(0, position));
                if (tipo == "bytes") {
                    number_size += number / 1048000;
                }
                else if (tipo == "KB") {
                    number_size += number / 1024;
                }
                else if (tipo == "MB") {
                    number_size += number;
                }
            });
            localStorage.setItem("totalStorage", number_size.toString());
            document.getElementById("storage_number").innerText =
                number_size.toFixed(2) + " MB";
            document.getElementById("storage_bar_fill").style.width =
                (number_size * 100) / 20000 + "%";
        },
    });
}
