function createBook(event) {
    axios.post('http://localhost:8080/books', {
        title:document.querySelector('#title').value,
        author:document.querySelector('#author').value,
    }).then((res) => {

        //per gestire errori di valutazione: 
       // res.response.data.errors

    }).catch((res) => {
    })

}