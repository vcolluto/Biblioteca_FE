
bookList();

function bookList() {
    axios.get('http://localhost:8080/books').then((res) => {
        //codice da eseguire se la richiesta è andata a buon fine
        console.log('richiesta ok', res);
        document.querySelector('#libri_table').innerHTML='';
        res.data.forEach(libro => {
            console.log(libro);
            document.querySelector('#libri_table').innerHTML+= `
            <tr>
                <td>
                    <a href="./detail.html?id=${libro.id}">${libro.id}</a>
                </td>
                <td>${libro.title}</td>
                <td>${libro.author}</td>
                <td>${libro.isbn}</td>    
                <td>
                    <a class="btn btn-primary" onclick="deleteBook(${libro.id})">
                        <i class="fa-solid fa-trash-can"> </i>
                    </a>
                </td>      
                <td>
                    <a class="btn btn-primary" href="./edit.html?id=${libro.id}">
                        <i class="fa-solid fa-pen-to-square"> </i>
                    </a>
                </td>         
            </tr>
            `
        });
    }).catch((res) => {
        //codice da eseguire se la richiesta non è andata a buon fine
        console.error('errore nella richiesta', res);
        alert('Errore durante la richiesta!');
    } )
}


function deleteBook(bookId) {
    const risposta=confirm('Sei sicuro?');

    if (risposta) {
        axios.delete('http://localhost:8080/books/'+bookId).then((res) => {
            //ok => ricarico l'elenco dei libri
            bookList();
        }).catch((res) => {
            console.error('errore nella richiesta', res);
            alert('Errore durante la richiesta!');
        });
    }

}