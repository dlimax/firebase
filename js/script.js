document.getElementById("cadastrar").addEventListener("click", function(){
  var cliente = {
    nome: document.getElementsByName('nome')[0].value,
    telefone: document.getElementsByName('telefone')[0].value,
    email: document.getElementsByName('email')[0].value
  };
  
  document.getElementsByName('nome')[0].value = "";
  document.getElementsByName('telefone')[0].value = "";
  document.getElementsByName('email')[0].value = "";

  var dbRef = firebase.database().ref().child('clients').push(cliente);      
});  

firebase.database().ref('clients').on('value', function (snapshot) {
  var tBody = document.querySelector("#demo table tbody");
  tBody.innerHTML = "";   

  snapshot.forEach(function (item) {        
    tBody.innerHTML += `<tr>
    <td>${item.val().nome}</td>
    <td>${item.val().telefone}</td>
    <td>${item.val().email}</td>
    <td><button class="btn btn-danger" onclick="removeItem('${item.key}')">X</button></td>
    </tr>`        
  })  
})

function removeItem(key) {
  firebase.database().ref('clients').child(key).remove();
}  