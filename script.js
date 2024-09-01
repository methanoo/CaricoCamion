let carichi = [];
meno=false;
canc=false;
ao=false;
counter=0;
menobello=false;
prior=false;
larghezzaacolli=new Array();
nome=new Array();
indice = new Array();


function aggiungiCarico() {
    const nome = document.getElementById('lunghezza').value;
    const larghezza = parseInt(document.getElementById('larghezza').value);
    const priorita = parseInt(document.getElementById('priorita').value);
    const quantita = parseInt(document.getElementById('quantita').value);
    const bancali = parseInt(document.getElementById('bancali').value);

    if(nome!=nome||larghezza!=larghezza||quantita!=quantita||bancali!=bancali){
    }else{
        if(priorita==99){
           prior=true;
        }
        const carico = { nome, larghezza, priorita, quantita, bancali, caricati: 0, colli: [] }; 
        carichi.push(carico);
        mostraCarichi();
    }

   
}

function svuotaCarico(){
if(ao==true){

}else{
    document.getElementById("prova").reset();
}
ao=false;
}

function mostraCronologiaColli(index) {
    const cronologiaColliContainer = document.getElementById('colli-lista');
    cronologiaColliContainer.innerHTML = `<b>Cliente: ${nome[index]}</b>`; 
    const cronologiaColli = carichi[index].colli;

    cronologiaColli.forEach((quantitaCaricata, idx) => {
        const li = document.createElement('li');
        li.textContent = `\n Collo ${idx + 1}: ${quantitaCaricata}`;
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

function apriTastierino(index) {
    indice[index]=0;
    const carico = carichi[index];
if(parseInt(document.getElementById('carico_per').value)==parseInt(document.getElementById('carico_per').value)){
   for(p=0;p<parseInt(document.getElementById('carico_per').value);p++){
    carico.caricati = parseInt(document.getElementById('carico_input').value) + carico.caricati;
    carico.colli.push(parseInt(document.getElementById('carico_input').value));
    meno = false;
   }
  
    mostraCarichi();



   document.getElementById("carico_prova").reset();
}
    if (meno==true) {
        if (confirm("Scarti, Confermi?")) {
            carico.caricati = -(parseInt(document.getElementById('carico_input').value)) + carico.caricati;
            carico.colli.push(-(parseInt(document.getElementById('carico_input').value)));
            document.getElementById("carico_prova").reset();
            meno = false;
            counter=counter+1;
            indice[index]=indice[index]-counter;
        }else{
            indice[index]=indice[index]-counter
        }

    }else{
        indice[index]=indice[index]-counter
    }
    if (canc==true) {
        event.preventDefault();
        confermaEliminazione(index); 
        canc = false; 
    }  
        if (parseInt(document.getElementById('carico_input').value)!=parseInt(document.getElementById('carico_input').value)){
        } 
       
      if (parseInt(document.getElementById('carico_input').value)==parseInt(document.getElementById('carico_input').value)) {
        if(carico.priorita==99){
            alert("we no caricare")
            document.getElementById("carico_prova").reset();
            prior=false;
               }else{
            carico.caricati = parseInt(document.getElementById('carico_input').value) + carico.caricati;
            carico.colli.push(parseInt(document.getElementById('carico_input').value));
            document.getElementById("carico_prova").reset();
            meno = false;
            mostraCarichi();
               }
        }
        
    }
    

  
    function confermaEliminazione(index) {
        event.preventDefault();
        if (confirm("Sei sicuro di voler cancellare questa riga?")) {
            carichi.splice(index, 1); 
            mostraCarichi(); 
        }
    }
   
  function cancellacavolodiriga(){
    event.preventDefault();
    canc=true;
    apriTastierino(index);
  }

function refresh(){
    
if (confirm("Sei sicuro di voler cancellare tutto? (questa azione non è reversibile)")) {
    window.location.reload();
}
}

function calcolaParziale(carico) {
    if ((carico.quantita - carico.caricati) < 0) {
        return 0;
    }
    return carico.quantita - carico.caricati;
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
    event.preventDefault();
   }


function mostraCarichi() {
    const carichiLista = document.getElementById('carichi-lista');
    
    carichiLista.innerHTML = '';

    carichi.forEach((carico, index) => {
 
        const li = document.createElement('li');
        li.id = `carico-${index}`;
    
        li.classList.add('carico');

      if((carico.colli.length+indice[index])!=(carico.colli.length+indice[index])){
  indice[index]=0;
      }

if(carico.priorita!=carico.priorita){
carico.priorita=50;
}
    li.innerHTML = ` <span style = "vertical-align: middle;"><u> ${carico.priorita}</u>)  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
    <b> ${carico.nome} </b>
    &ensp; Imb: <b>${carico.larghezza}</b> 
    &nbsp; Qt. <b>${carico.quantita}</b>
    &nbsp; Caricati: <b style="color:red;"><u>${carico.caricati}</u></b> 
    &ensp; NBanc: <b>${carico.colli.length+indice[index]}/${carico.bancali}</b> 
    &ensp; Rim: <b>${calcolaParziale(carico)}</b> 
    &ensp;</span>`;

    if(carico.priorita<10){
        li.innerHTML = ` <span style = "vertical-align: middle;"><u> ${carico.priorita}</u>) &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
        <b> ${carico.nome} </b>
        &ensp; Imb: <b>${carico.larghezza}</b> 
        &nbsp; Qt. <b>${carico.quantita}</b>
        &nbsp; Caricati: <b style="color:red;"><u>${carico.caricati}</u></b> 
        &ensp; NBanc: <b>${carico.colli.length+indice[index]}/${carico.bancali}</b> 
        &ensp; Rim: <b>${calcolaParziale(carico)}</b> 
        &ensp;</span>`;

        if(carico.caricati>=(carico.quantita)-10){
            li.innerHTML = ` <span style = "vertical-align: middle;"><u> ${carico.priorita}</u>)  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <b> ${carico.nome}</b>
            &ensp; Imb: <b>${carico.larghezza}</b> 
            &nbsp; Qt. <b>${carico.quantita}</b>
            &nbsp; Caricati: <b style="color:green;"><u>${carico.caricati}</u></b> 
            &ensp; NBanc: <b>${carico.colli.length+indice[index]}/${carico.bancali}</b> 
            &ensp; Rim: <b>${calcolaParziale(carico)}</b> 
            &ensp;</span>`;
    } 
    if(carico.caricati >= carico.quantita * 1.1){
        li.innerHTML = ` <span style = "vertical-align: middle;"><u> ${carico.priorita}</u>)  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 
            <b> ${carico.nome}</b>
            &ensp; Imb: <b>${carico.larghezza}</b> 
            &nbsp; Qt. <b>${carico.quantita}</b>
            &nbsp; Caricati: <b style="color:purple;"><u>${carico.caricati}</u></b> 
            &ensp; NBanc: <b>${carico.colli.length+indice[index]}/${carico.bancali}</b> 
            &ensp; Rim: <b>${calcolaParziale(carico)}</b> 
            &ensp;</span>`;
    }
} 
    if(carico.caricati>=(carico.quantita)-10){
        li.innerHTML = ` <span style = "vertical-align: middle;"><u> ${carico.priorita}</u>) &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
        <b> ${carico.nome}</b>
        &ensp; Imb: <b>${carico.larghezza}</b> 
        &nbsp; Qt. <b>${carico.quantita}</b>
        &nbsp; Caricati: <b style="color:green;"><u>${carico.caricati}</u></b> 
        &ensp; NBanc: <b>${carico.colli.length+indice[index]}/${carico.bancali}</b> 
        &ensp; Rim: <b>${calcolaParziale(carico)}</b> 
        &ensp;</span>`;
} 
if(carico.caricati >= carico.quantita * 1.1){
    li.innerHTML = ` <span style = "vertical-align: middle;"><u> ${carico.priorita}</u>)  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
        <b> ${carico.nome}</b>
        &ensp; Imb: <b>${carico.larghezza}</b> 
        &nbsp; Qt. <b>${carico.quantita}</b>
        &nbsp; Caricati: <b style="color:purple;"><u>${carico.caricati}</u></b> 
        &ensp; NBanc: <b>${carico.colli.length+indice[index]}/${carico.bancali}</b> 
        &ensp; Rim: <b>${calcolaParziale(carico)}</b> 
        &ensp;</span>`;
}
bancali[index] = carico.bancali
larghezzaacolli[index] = carico.larghezza;
carichiLista.appendChild(li);
const pulsanteCarica = document.createElement('button');
pulsanteCarica.textContent = ' ';
pulsanteCarica.className="caricatext";
pulsanteCarica.onclick = () => apriTastierino(index);
li.appendChild(pulsanteCarica);
 
        const linkCronologia = document.createElement('a');
        linkCronologia.href = '#';
        linkCronologia.className="linkcron"
        linkCronologia.textContent = 'Cron.';
        linkCronologia.onclick = () => mostraCronologiaColli(index);
        li.appendChild(linkCronologia);

        aggiornaStileCarico(index);

        const parziale = calcolaParziale(carico);
        if (parziale <= 10) {
            pulsanteCarica.style.backgroundColor = 'green';
            
        } 
        if (carico.caricati >= carico.quantita * 1.1) {
            pulsanteCarica.style.backgroundColor = 'purple';
           
        } 
     
    });
}

function ordinaPerPriorita() {
    carichi.sort((a, b) => a.priorita - b.priorita);
    alert(a.priorita)
    mostraCarichi();
}

function aggiornaCarichi() {
    mostraCarichi();
   
}

setInterval(aggiornaCarichi, 1000);

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

function creaReport() {
    const reportContainer = document.getElementById('colli-lista');
    reportContainer.innerHTML = ''; 
    carichi.forEach((carico, index) => {
        const caricoRaggruppato = {};

        carico.colli.forEach((quantitaCaricata) => {
            if (caricoRaggruppato[quantitaCaricata]) {
                caricoRaggruppato[quantitaCaricata]++;
            } else {
                caricoRaggruppato[quantitaCaricata] = 1;
            }
        });

        const li = document.createElement('li');
        li.innerHTML = `
            <b>Cliente ${index + 1}: ${carico.nome}</b><br>
            Imballo: ${carico.larghezza}<br>
            Carico:
        `;

        const ul = document.createElement('ul');
        for (const [caricoTipo, quantita] of Object.entries(caricoRaggruppato)) {
            const subLi = document.createElement('li');
            subLi.textContent = `${quantita} x ${caricoTipo}`;
            ul.appendChild(subLi);
        }

        li.appendChild(ul);
        reportContainer.appendChild(li);
    });
}

function printReport() {
    const originalContent = document.body.innerHTML;
    const reportContent = document.getElementById('colli-lista').innerHTML;

    document.body.innerHTML = `
        <html>
        <head>
            <title>Stampa Report</title>
            <style>
                /* Stili per la stampa */
                @media print {
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .print-only {
                        display: block;
                    }
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <h1>Report di Carico</h1>
            ${reportContent}
            <script>
                window.print();
                window.onafterprint = function() {
                    window.location.reload();
                };
            </script>
        </body>
        </html>
    `;
}
