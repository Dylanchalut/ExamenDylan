

function creerCarteRecette(R){
    $("#recette_maquette").append(`
        <div class="border col-5 m-2">
            <h3 class="">${R.nom}</h3>
            <p>Ingrédients :</p>
            <ul class = "custom-list mx-5">
                <li class="">
                    <a href="#">${R.ingredient1}</a>
                </li>
                <li>
                    <a href="#">${R.ingredient2}</a>
                </li>
                <li class = "">
                    <a href="#">${R.ingredient3}</a>
                </li>
                <li class = "">
                    <a href="#">${R.ingredient4}</a>
                </li>
                <li class = "">
                    <a href="#">${R.ingredient5}</a>
                </li>
            </ul>
            <p>Instructions: ${R.instructions}</p>   
            <input type="button" onclick="supprimer(${R.id})" class="btn btn-primary " value="Supprimer">
        </div>
    `)
}


function afficherToutRecette(){
    $('#recette_maquette').text("");
    $.getJSON('https://65859cf1022766bcb8c90097.mockapi.io/Recette')
        .done(function(R){
            R.forEach(function (R){
                creerCarteRecette(R);
            });
        })
        .fail(function (error){
            $('.alert').text(error.status).removeClass('d-none');
        });
}

afficherToutRecette();

function Recette(nom ="", ingredient1 = "", ingredient2 = "", ingredient3 = "", ingredient4 = "", ingredient5 = "",
                 quantite1 = 0, quantite2 = 0, quantite3 = 0, quantite4 = 0, quantite5 = 0, instruction = ""){
    this.nom = nom;
    this.ingredient1 = ingredient1;
    this.ingredient2 = ingredient2;
    this.ingredient3 = ingredient3;
    this.ingredient4 = ingredient4;
    this.ingredient5 = ingredient5;
    this.quantite1 = quantite1;
    this.quantite2 = quantite2;
    this.quantite3 = quantite3;
    this.quantite4 = quantite4;
    this.quantite5 = quantite5;
    this.instructions = instruction;
}

function ajouter(){
    event.preventDefault();
    const recettes = new Recette($("#nom_recette").val(), $("#ingredients").val(), $("#ingredients2").val(), $("#ingredients3").val(), $("#ingredients4").val(),
        $("#ingredients5").val(), $("#quantite1").val(), $("#quantite2").val(), $("#quantite3").val(), $("#quantite4").val(), $("#quantite5").val(), $("#instructions").val(),)

    fetch('https://65859cf1022766bcb8c90097.mockapi.io/Recette', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(recettes)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
        throw new Error ("Erreur"+res.status);
    }).then(recettes => {
        // do something with the new task
        if (!$("#ingredients").val() || !$("#ingredients2").val()) {
            $("#Erreur").removeClass('invisible');
            return;
        } else{
            afficherToutRecette()
            localStorage.setItem('achat',JSON.stringify(recettes));
            $("#Erreur").addClass('invisible');
        }

    }).catch(error => {
        // handle error
        $('.alert').text(error.status).removeClass('d-none');
    })
}

function supprimer(id){
    fetch('https://65859cf1022766bcb8c90097.mockapi.io/Recette/'+id, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
        throw new Error ("Erreur"+res.status);
    }).then(chat => {
        // Do something with deleted task
        afficherToutRecette()
    }).catch(error => {
        // handle error
        $('.alert').text(error.status).removeClass('d-none');
    })
}


