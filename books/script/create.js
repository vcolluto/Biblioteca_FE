function createBook(event) {
    event.preventDefault();

    const book={
        title : document.querySelector('#title').value,
        author : document.querySelector('#author').value,
        isbn : document.querySelector('#isbn').value,
        availableCopies: document.querySelector('#availableCopies').value
    };

    
    axios.post('http://localhost:8080/books', book).then((res) => {
        console.log("inserimento ok");
        location.href="./index.html";
     
    }).catch((res) => {
        console.error("errore nell'inserimento",res);
        showValidationErrors(res.response.data.errors);
    })

}

function showValidationErrors(errorList) {
    console.error("errori validazione",errorList);

    resetValidationErrors();
    errorList.forEach(error => {
        document.querySelector("#validation_errors").innerHTML+="<li>"+error.defaultMessage+"</li>";
        document.querySelector(`#${error.field}_err`).innerHTML+="<li>"+error.defaultMessage+"</li>";
    });
}


function resetValidationErrors() {
    document.querySelector("#validation_errors").innerHTML="";
    document.querySelectorAll("[id$=_err]").forEach(element => {    //tutti gli id che finiscono con _err
        element.innerHTML="";
    })

}