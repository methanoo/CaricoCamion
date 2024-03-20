let carichi = [];
meno=false;
canc=false;
 p=0;
function aggiungiCarico() {
    const lunghezza = parseInt(document.getElementById('lunghezza').value);
    const larghezza = parseInt(document.getElementById('larghezza').value);
    const priorita = parseInt(document.getElementById('priorita').value);
    const tipoOnda = document.getElementById('tipo-onda').value;
    const quantita = parseInt(document.getElementById('quantita').value);

    const carico = { lunghezza, larghezza, priorita, tipoOnda, quantita, caricati: 0, colli: [] }; 
    carichi.push(carico);

    mostraCarichi();

}

function mostraCronologiaColli(index) {
    const cronologiaColliContainer = document.getElementById('colli-lista');
    cronologiaColliContainer.innerHTML = '';
    
    const cronologiaColli = carichi[index].colli;
    cronologiaColli.forEach((quantitaCaricata, idx) => {
        const li = document.createElement('li');
        li.textContent = `Carico ${idx + 1}: ${quantitaCaricata}`;
        cronologiaColliContainer.appendChild(li);
    });
}
function svuotacolli(index){
    const cronologiaColliContainer = document.getElementById('colli-lista');
    cronologiaColliContainer.innerHTML = '';
    
    const cronologiaColli = carichi[index].colli;
    cronologiaColli.forEach((quantitaCaricata, idx) => {
        const li = document.createElement('li');
    li.textContent = ` `;
    cronologiaColliContainer.appendChild(li);
    });
}
function ordinaPerLunghezza() {
   
    carichi.sort((a, b) => {
        if(a!=b){
            return a.lunghezza - b.lunghezza;
        }else{
            carichi.sort((a, b) => a.priorita - b.priorita);
            mostraCarichi();
        }
       
    });
    mostraCarichi(); 
}
function apriTastierino(index) {
    const carico = carichi[index];
    
    if (canc) {
        confermaEliminazione(index); 
        canc = false; 
    }  
        if (parseInt(document.getElementById('carico_input').value)!=parseInt(document.getElementById('carico_input').value)){
        } 
        if (meno) {
            carico.caricati = -(parseInt(document.getElementById('carico_input').value)) + carico.caricati;
            document.getElementById("carico_prova").reset();
            meno = false;
            mostraCarichi(parseInt(document.getElementById('carico_input').value));
        }
      if (parseInt(document.getElementById('carico_input').value)==parseInt(document.getElementById('carico_input').value)) {
            carico.caricati = parseInt(document.getElementById('carico_input').value) + carico.caricati;
            carico.colli.push(parseInt(document.getElementById('carico_input').value));
            document.getElementById("carico_prova").reset();
            meno = false;
            mostraCarichi();
        }
      
    }
    
  
    function confermaEliminazione(index) {
        if (confirm("Sei sicuro di voler cancellare questa riga?")) {
            carichi.splice(index, 1); 
            mostraCarichi(); 
        }
    }
   
  

function calcolaParziale(carico) {
    if ((carico.quantita - carico.caricati) < 0) {
        return 0;
    }
    return carico.quantita - carico.caricati;
}

function svuotaCarico() {
    document.getElementById("prova").reset();
}
function aggiornaStileCarico(index) {
    const carico = carichi[index];
    const parziale = calcolaParziale(carico);
   
    const elementoCarico = document.getElementById(`carico-${index}`);
    const pulsanteCarica = elementoCarico.querySelector('button');

   if (parziale >= carico.quantita) {
        pulsanteCarica.style.backgroundColor = 'grey';
     
       
    }else {
      
        pulsanteCarica.style.backgroundColor = 'red'; 
    }
    
}
function menoinputcambia(){
  
    meno = true;
   }


function mostraCarichi() {
    const carichiLista = document.getElementById('carichi-lista');
    carichiLista.innerHTML = '';

    carichi.forEach((carico, index) => {
        
        const li = document.createElement('li');
        li.id = `carico-${index}`;
    
        li.classList.add('carico');
    
        li.innerHTML = ` <u> ${carico.priorita})</u> 
        <b> ${carico.lunghezza} x ${carico.larghezza} </b>
        Qt. <b>${carico.quantita}</b>
        In: <b>${carico.caricati}</b> 
        Rim: <b>${calcolaParziale(carico)}</b> 
        Col: <b>${carico.colli.length}</b>
        ${carico.tipoOnda} `;
      
         
        const linkCronologia = document.createElement('a');
        linkCronologia.href = '#';
        linkCronologia.className="linkcron"
        linkCronologia.textContent = 'Cron.';
        linkCronologia.onclick = () => mostraCronologiaColli(index);
        li.appendChild(linkCronologia);
   
        carichiLista.appendChild(li);
        const pulsanteCarica = document.createElement('button');
        pulsanteCarica.textContent = ' ';
        pulsanteCarica.className="caricatext";
        pulsanteCarica.onclick = () => apriTastierino(index);
   
        li.appendChild(pulsanteCarica);
        

  
        aggiornaStileCarico(index);

        const parziale = calcolaParziale(carico);
        if (parziale <= 0) {
            pulsanteCarica.style.backgroundColor = 'green';
            
        } 
        if (carico.caricati >= carico.quantita * 1.1) {
            pulsanteCarica.style.backgroundColor = 'purple';
           
        } 
     
    });
}

function ordinaPerPriorita() {
   
    carichi.sort((a, b) => a.priorita - b.priorita);
    mostraCarichi();
}

function aggiornaCarichi() {
    mostraCarichi();
   
}


setInterval(aggiornaCarichi, 1000);
