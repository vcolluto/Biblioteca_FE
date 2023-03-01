loadCategories();

function createBook(event) {
    event.preventDefault();

    const book={
        title : document.querySelector('#title').value,
        author : document.querySelector('#author').value,
        isbn : document.querySelector('#isbn').value,
        availableCopies: document.querySelector('#availableCopies').value,
        categories: []
    };

    document.querySelectorAll('[id^=category_]').forEach(element => {       //tutti gli id che iniziano per category_
        if(element.checked) {
            const category={
                id: element.value
            };
            book.categories.push(category);
        }
    });
    
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

function loadCategories() {
    axios.get('http://localhost:8080/categories').then((res) => {
        console.log("elenco categorie ok");
        res.data.forEach(category => {
            document.querySelector('#categories').innerHTML+=
            `
                <div class="form-check">
	  				<input type="checkbox" class="form-check-input" 
	  					value="${category.id}" 
	  					id="category_${category.id}">
	  				<label class="form-check-label" 
	  				 for="category_${category.id}">${category.name}</label>
	  			</div>
            `
        });
     
    }).catch((res) => {
        console.error("errore nell'elenco categorie",res);
       
    })
}