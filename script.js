let carichi = [];

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

function apriTastierino(index) {
    const carico = carichi[index];
    carico.caricati=parseInt(document.getElementById('carico_input').value)+carico.caricati;
    carico.colli.push(parseInt(document.getElementById('carico_input').value));
    document.getElementById("carico_prova").reset();

    mostraCarichi();
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

function mostraCarichi() {
    const carichiLista = document.getElementById('carichi-lista');
    carichiLista.innerHTML = '';

    carichi.forEach((carico, index) => {
        const li = document.createElement('li');
        li.id = `carico-${index}`;
        li.classList.add('carico');
        li.innerHTML = `<u>Priorità: ${carico.priorita}</u> &nbsp; <b> ${carico.lunghezza} x ${carico.larghezza} </b> &nbsp; Quantità: <b>${carico.quantita}</b> &nbsp; Caricati: <b>${carico.caricati}</b>  &nbsp; Parziale: <b>${calcolaParziale(carico)}</b> &nbsp; Colli: <b>${carico.colli.length}</b>   &nbsp;Onda: ${carico.tipoOnda}&nbsp;&nbsp;&nbsp;&nbsp;`;
        
        const pulsanteCarica = document.createElement('button');
        pulsanteCarica.textContent = 'Carica';
        pulsanteCarica.onclick = () => apriTastierino(index);
        li.appendChild(pulsanteCarica);

        const linkCronologia = document.createElement('a');
        linkCronologia.href = '#';
        linkCronologia.className="linkcron"
        linkCronologia.textContent = 'Cron.';
        linkCronologia.onclick = () => mostraCronologiaColli(index);
        li.appendChild(linkCronologia);

        carichiLista.appendChild(li);
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
