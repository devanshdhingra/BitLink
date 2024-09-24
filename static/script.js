document.getElementById('submit').addEventListener('click', function () {
    event.preventDefault();

    var content = document.getElementById('formInput').value;
    console.log(content);
    var data = { "url": content };
    console.log(data);

    fetch('/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
      })
      .then(response => response.json()) 
      .then(data => {
        console.log('Response from server:', data);
        let final = "http://127.0.0.1:3000/"+data.shorten;
        document.getElementById('result').innerHTML= final;
      });


});
