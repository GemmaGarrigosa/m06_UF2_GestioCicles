class Cicle {
    
    constructor (nom, categoria,numAlumnes, abreviatura, dataCreacio){
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.dataCreacio = dataCreacio;
        this.numEdicions = 0;
        this.moduls =[];
        
    }

    get numEdicions (){
        return this.numEdicions;
    }
    set numEdicions(value){
        this.numEdicions = ++value;
    }

    toString(){
    
    let text = `Nom del cicle: ${this.nom} 
                Categoria: ${this.categoria} 
                Número d'alumnes: ${this.numAlumnes}
                Abreviatura del cicle: ${this.abreviatura}
                Data de creació: ${this.dataCreacio}
                Numero d'edicions ${numEdicions}
                Moduls:
                `;
                this.moduls.forEach(modul => {
                    text += `  - Nom del mòdul: ${modul.nom}
                    Número del mòdul: ${modul.num}
                    Hores del mòdul: ${modul.hores}
                  `;
                });
    
     return text;
    }

    
    
}

class Modul{
    constructor (cicle,modul_nom,modul_num,modul_hores){
        
        this.cicle = cicle;
        this.modul_nom = modul_nom;
        this.modul_num = modul_num;
        this.modul_hores = modul_hores;
    }

    toString(){
        
        let text = `MP${this.modul_num}.${this.modul_nom}(${this.modul_hores}h)`;
        return text;
    }
}


let llistatCicles = [];

function afegirCicle(){
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value; 
    let numEdicions = 0;
    let dataCreacio = new Date();

    let cicle = {nom: nom, categoria: categoria, numAlumnes: numAlumnes, abreviatura: abreviatura, dataCreacio: dataCreacio, moduls: [], numEdicions: numEdicions}
    console.log(cicle);

    if(document.getElementById("editCicle").value === "-1"){
        //Afegim el cicle al llistat
        llistatCicles.push(cicle);
    }else{
        //Editar cicle
        let i = document.getElementById("editCicle").value;
        llistatCicles[i].nom = nom;
        llistatCicles[i].categoria = categoria;
        llistatCicles[i].abreviatura = abreviatura;
        llistatCicles[i].numAlumnes = numAlumnes;
       

    
    }
    
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);
   

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value=-1;
}


function afegirModul(){ //afegeix modul al Cicle 
    let cicle = document.getElementById("modul_cicle").value; 
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = {cicle: cicle, nom: modul_nom, num: modul_num, hores: modul_hores}
    console.log(modul);

    let cicleSeleccionat = llistatCicles[cicle];

    cicleSeleccionat.moduls.push(modul); // afegim el modul
    //Printem la llista
    
    printLlistat(llistatCicles);
    console.log(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}



//Funció per llistar els cicles
function printLlistat (llistat){
    let str="";
    llistat.forEach(function(element, index){
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>

                    <button type="button" onClick="removeCicle(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" onClick="editCicle(${index})" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" onClick="calculHores(${index})" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>


                </div>`;
    });

    document.getElementById("llistat").innerHTML=str;
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i){
    let novaLlista =llistatCicles.splice(i,1);
    printLlistat(novaLlista);
}

//Funció per editar un cicle
function editCicle(i){
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value=i;

    
    
}

//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}

//Funció per calcular les hores del cicle 

function calculHores(i) {
    let total = 0;
    let cicle = llistatCicles[i];

    cicle.moduls.forEach(modul =>{
        total += parseInt(modul.hores);
    });

    alert(`Aquest es el total d'hores del modul: ${total}`);
}