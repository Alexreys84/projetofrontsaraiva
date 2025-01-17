function login(){
    const us = document.querySelector("#nomeusuario")
    const sh = document.querySelector("#senha")

    if(us.value.trim()== ""|| sh.value.trim()==""){
        return alert("Você deve preencher os campos")
        }
        fetch("http://127.0.0.1:4000/api/v1/users/login",{
            method:"POST",
            headers:{
                "accept":"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify({
                nomeusuario:us.value,
                senha:sh.value
            })
        }).then((res)=>res.json())
        .then((result)=>{
            console.log(result);
        })
        .catch((Error)=>console.error(`Erro ao tentar acessar a api ${Error}`))


}
function cadastrarUsuario(){
    const us = document.querySelector("#txtusuario")
    const sh = document.querySelector("#txtsenha")
    const ft = document.querySelector("#txtfotoperfil")
    if(us.value.trim()==""|| sh.value.trim()=="" || ft.value.trim()==""){
        return alert("Preencha todos os campos")
    }
    fetch("http://127.0.0.1:4000/api/v1/users/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:us.value,
            senha:sh.value,
            foto:ft.value
        })
    })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result)
    })
    .catch((Error)=>console.error(`Erro na api ${Error}`))
}


function carregarLivros(){
    const conteudo =document.querySelector(".conteudo")
    fetch("http://127.0.0.1:4001/api/v1/livros/detalhes")
    .then((res)=>res.json())
    .then((dados)=>{
       dados.payload.map((rs)=>{
        let card =`<div class="card" style="width: 18rem;">
        <img src=${rs.foto1} class="card-img-top" alt="...">
        <div class="card-body">
        <h3>${rs.nometitulo}</h3>
    
          <p class="card-text">Autor:${rs.autor}</p>
          <p class="card-text"style="text-decoration:line-through"> De R$ ${rs.precoatual}</p>
          <p class="card-text">R$ ${rs.precodesconto<1 ? rs.precoatual : rs.precodesconto}</p>
          <a class="btn btn-warning" href="detalhes.html?idlivro=${rs.idtitulo}">Saiba mais</a>
        </div>
      </div>`
      conteudo.innerHTML += card
        
       })
    })
    .catch((error)=>console.error(`erro na api ${error}`))
}

function detalhes(){
    let id_url = window.location.search.split('=')
    const conteudo =document.querySelector(".conteudo")
    fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/"+id_url[1])
    .then((res)=>res.json())
    .then((dados)=>{
       dados.payload.map((rs)=>{
        let card =`<div class="card mb-3 col-md-10">
        <div class="row g-0">
        <div class="col-md-4">
          <div id="carouselExample" class="carousel slide">
<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="${rs.foto1}" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="${rs.foto2}" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="${rs.foto3}" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
    <img src="${rs.foto4}" class="d-block w-100" alt="...">
  </div>
</div>  
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
  <span class="carousel-control-prev-icon setas" aria-hidden="true"></span>
  <span class="visually-hidden setas">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
  <span class="carousel-control-next-icon setas " aria-hidden="true"></span>
  <span class="visually-hidden ">Next</span>
</button>

</div>
            <div class="col-md-2 fotos">
            <img src="${rs.foto1}" class="img-fluid rounded-start" alt="...">
            <img src="${rs.foto2}" class="img-fluid rounded-start" alt="...">
            <img src="${rs.foto3}" class="img-fluid rounded-start" alt="...">
            <img src="${rs.foto4}" class="img-fluid rounded-start" alt="...">
          </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title">${rs.nometitulo}</h3>
              <h5 class="card-title">${rs.autor}</h5>
              <p class="card-text">${rs.sinopse}</p>
              <p class="card-text precoatual">R$ ${rs.precodesconto <1 ? rs.precoatual : rs.precodesconto}</p>
             
            </div>
          </div>
        </div>
      </div>`
      conteudo.innerHTML += card
        
       })
    })
    .catch((error)=>console.error(`erro na api ${error}`))
    
}