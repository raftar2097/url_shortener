window.addEventListener("load",()=>{
    const input = document.querySelector(".input");
    const output = document.querySelector(".output");
    const shorten = document.querySelector("#shorten");
    const copy = document.querySelector("#copy");
    const table = document.querySelector("#showData");
    showData();
    shorten.addEventListener('click',event => {
           console.log(input.value);
           if(input.value){
               fetch("/api/urls",{
                   method:'POST',
                   body:JSON.stringify({
                       longUrl:input.value
                   }),
                   headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                   }
               })
               .then(resp => resp.json())
               .then(data =>{
                   console.log(data);
                   console.log(document.location.origin);
                   output.value = `${document.location.origin}/${data.id}`
                   showData();
               })
           }
    })
    copy.addEventListener('click',event=>{
        if(output.value){
            const val = document.querySelector('.output');
            val.select();
            document.execCommand('copy');
        }
    })
    function showData(){
        fetch('/api/urls')
        .then(response=>response.json())
        .then(data=>{
            data.forEach((val)=>{
                const longUrl = val.longUrl;
                const shortUrl = `${document.location.origin}/${val.id}`;
                const row = document.createElement('tr');
                const column1 = document.createElement('td');
                const column2 = document.createElement('td');
                if(longUrl&&shortUrl){
                    const data1 = document.createTextNode(longUrl);
                    const data2 = document.createTextNode(shortUrl);
                    column1.appendChild(data1);
                    column2.appendChild(data2);
                    row.appendChild(column1);
                    row.appendChild(column2);
                    table.appendChild(row);
                }
            })
        })
    }
})