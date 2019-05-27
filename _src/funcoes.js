let qtdElementosParaSerContinua=7;
let numCasasDecimaisMediaModaMediana = 5;


//Retorna medida separatriz
function retornaMedidaSeparatriz(){
    let res;
    let combo = document.querySelector("#cmb_separatirz");
    if (combo.value=="4"){
        res='Quartil';
    } else if (combo.value=="5"){
        res='Quintil';
    } else if (combo.value=="10"){
        res='Decil';
    } else if(combo.value=="100"){
        res='Percentil';
    } else {
        res='Personalizado';
    }
    return res;
}

function retornaPorcentagemSeparatriz(medidaSeparatriz, valorDaSeparatriz ){
    let valorEmPorcentagem=0;
    switch(medidaSeparatriz){
        case 'Quartil':
            valorEmPorcentagem = valorDaSeparatriz * 25;
            break;
        case 'Quintil':
            valorEmPorcentagem = valorDaSeparatriz * 20;
            break;
        case 'Decil':
            valorEmPorcentagem = valorDaSeparatriz * 10;
            break;
        case 'Percentil':
            valorEmPorcentagem = valorDaSeparatriz;
            break;
        case 'Personalizado':
            valorEmPorcentagem = valorDaSeparatriz;
            break;
    }
    return parseFloat(valorEmPorcentagem);
}

function calculaSeparatriz(varType, valorDaSeparatriz, medidaSeparatriz, totalDeElementos, frequenciaAcumulada, elementos,contagemElementosPorClasse, intervaloDeClasse, elementosIniciais ){
    let valorEmPorcentagem;
    let posicao;

    valorEmPorcentagem = retornaPorcentagemSeparatriz(medidaSeparatriz, valorDaSeparatriz);

    posicao=valorEmPorcentagem*totalDeElementos/100;

    if (varType!="Continua"){
        for(let i=0;i<frequenciaAcumulada.length;i++){
            if (posicao<=frequenciaAcumulada[i]){
                return elementos[i];
                break;
            }
        }
    } else {
        debugger;
        return calcMedianaOuSeparatrizContinua(posicao, frequenciaAcumulada, elementosIniciais, contagemElementosPorClasse, intervaloDeClasse);
    }
}

function calcMedianaOuSeparatrizContinua(posicao, frequenciaAcumulada, elementosIniciais, contagemElementosPorClasse, intervaloDeClasse){
    let posArr = Math.ceil(posicao);
    let limInferiorClasse;
    let indice=0;
    let feAcumuladaAnterior=0
    for (let i=0; i<frequenciaAcumulada.length; i++){
        if (posArr<=frequenciaAcumulada[i]){
            limInferiorClasse=elementosIniciais[i];
            indice=i;
            break;
        }
    }
    if (indice>0){
        feAcumuladaAnterior=frequenciaAcumulada[indice-1];
    }
    return (limInferiorClasse + ((posicao - feAcumuladaAnterior)/contagemElementosPorClasse[indice]) * intervaloDeClasse);
}

function exibeSeparatriz(valor){
    let p= document.body.querySelector("#separatriz");
    let res;
    res = 'Separatriz = ' + valor;

    p.innerHTML = res;
}

//Transfere a opção escolhida (amostra ou população) para a variável de controle
function setaRadioOption(opcao){
    dadosGerais.tipoDePesquisa=parseInt(opcao);
}
//Cria o vetor separando os dados importados ou informados pelo paciente
function processaInput(res) {

    res.trim();
    let u = res.replace(/,/g, ".");  //Substitui a "," pelo "."
    u = u.replace(/[.]+/g,'.'); //Substitui . duplicados
    u = u.replace(/[;]+/g,' ');
    let t = u.replace(/[ ]+/g,' '); //Substitui . duplicados

    let arr=t.split(/;| |\r?\n|\r/); // Expressão regular para filtrar os espaços, ponto e virgulas e quebras de linha

    for (let i=0; i<arr.length;i++){
        if (arr[i]=="" || arr[i]==" ") {
            arr.splice(i,1);
        }
    }

    return arr;
}
function ordenaVetor(vet) {
    for(let posC = 1; posC<vet.length;posC++){
       for(let posA=0; posA<posC;posA++){
           if(vet[posC]<=vet[posA]){
               let temp = vet[posC];
               for (let i=posC;i>posA;i--){
                   vet[i]=vet[i-1];
               }
               vet[posA]=temp;
               break;
           }
       }
    }
    return vet;
}
function converteEmNumeros(arr) {
    const newArr = arr.map(x => parseFloat(x));

    return newArr;
}
function checaSeTemLetras(arr) {
    let temLetras = false;
    for(let i=0;i<arr.length;i++){        if (isNaN(arr[i])){
            temLetras=true;
            break;
        }
    }
    return temLetras;
}

function verificaTipo(Vetor){
    let tipo = '';
    for(let i=0 ; i< Vetor.length; i++){
        if(isNaN(Vetor[i])){
            tipo = 'Qualitativa';
            break;
        }
    }
    if(tipo != 'Qualitativa'){
        tipo = verificaQuantitativa(Vetor);
    }
    return tipo;
}

function verificaQuantitativa(Vetor){
    let arr = Vetor;
    let arrAux = [];
    let contArr = [];
    let tipoQuantitativa = '';

    let flag2 = 'S'

    arrAux.push(arr[0]);
    contArr.push(1);

    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arrAux.length; j++){
            if(Vetor[i] == arrAux[j]){
                flag2 = 'N';
                contArr[j]+=1;
            }
        }
        if(flag2 == 'S'){
            arrAux.push(Vetor[i]);
            contArr.push(1);
        }
        flag2 = 'S';
    }

    if(contArr.length < qtdElementosParaSerContinua){
        tipoQuantitativa = 'Discreta';
    } else {
        tipoQuantitativa = 'Continua'
    }

    return tipoQuantitativa;
}

function retornaMaior(arr, tipo){
    let res;
    if (tipo=='Qualitativa'){
        res=arr[arr.length-1];
    } else {
        res=arr[0];
        for(let i=1;i<arr.length;i++){
            if (arr[i]>res){
                res=arr[i];
            }
        }

    }
    return res;
}

function retornaMenor(arr, tipo){
    let res;
    if (tipo=='Qualitativa'){
        res=arr[0];
    } else {
        res=arr[0];
        for(let i=1;i<arr.length;i++){
            if (arr[i]<res){
                res=arr[i];
            }
        }
    }
    return res;
}

function calcAmplitude(maior, menor, tipo){
    let res;
    if (tipo!='Qualitativa'){
        res = maior - menor;
    }
    return res
}

function contaElementos(arr){
    elementos=[];
    contVet=[];
    elementos.push(arr[0]);
    contVet.push(1);
    for(let i=1;i<arr.length;i++){
        let existe=false;
        for(let j=0;j<elementos.length;j++){
            if (elementos[j]==arr[i]){
                existe=true;
                contVet[j]++;
            }
        }
        if (!existe){
            elementos.push(arr[i]);
            contVet.push(1);
        }
    }
    return elementos;
}

function quantidadeElementos(arr, total){

    return contVet;
}

function calcFreqPerc(arr, total){
    freqPerc=[];

    for(let i=0;i<arr.length;i++){
        freqPerc.push(arr[i]/total*100);
    }
    return freqPerc;
}

function calcTotalReal(arr){
    let res=0;
    for(let i=0;i<arr.length;i++){
        res+=arr[i];
    }
    return res;
}

function calcFreqAcum(contVet){
    freqAcum=[];
    freqAcum.push(contVet[0]);
    for(let i=1;i<contVet.length;i++){
        freqAcum.push(freqAcum[i-1] + contVet[i]);
    }
    return freqAcum;
}

function calcFreqAcumPerc(freq,qtd){
    freqAcumPerc=[];
    freqAcumPerc.push(freq[0]);
    for(let i=1;i<qtd.length;i++){
        freqAcumPerc.push(freqAcumPerc[i-1] + freq[i]);
    }
    return freqAcumPerc;
}

function calcK(arr){
    return Math.trunc(Math.sqrt(arr.length));
}

function intervaloClasse(amp,k,tam){

    r=[];
    let flag=false;
    amp=Math.round(amp);
    do {
        amp++;
        if ((amp%k)==0){
            flag=true;
            r.push(amp/k);
            r.push(k);
        } else if(amp%(k-1)==0) {
            flag=true;
            r.push(amp/(k-1));
            r.push((k-1));
        } else if(amp%(k+1)==0){
            flag=true;
            r.push(amp/(k+1));
            r.push((k+1));
        }
    } while (!flag);
    return r;
}

function arredondaTotal(num){
    return Math.round(num);
}

function trocaElementoDoArray(arr,pos1, pos2){
    let temp = arr[pos1];
    arr[pos1]=arr[pos2];
    arr[pos2]=temp;
    return arr;
}

function retornaElementosIniciaisDasClasses(elementos,intervalo,k){
    let res=[];
    for(let i=0;i<k;i++){
        res.push(elementos[0]+(i*intervalo));
    }
    return res;
}

function retornaElementosFinaisDaClasse(elementosIniciais,intervalo,k){
    let res=[];
    for(let i=0;i<k;i++){
        res.push(elementosIniciais[i]+intervalo);
    }
    return res;
}

function contaPorClasse(arr, elementosIniciais, elementosFinais){
    let res=[];
    for (let i=0; i<elementosIniciais.length; i++){
        res.push(0);
    }
    for (let i=0; i< arr.length; i++){
        for(let j=0;j<elementosIniciais.length;j++){
            if (arr[i]>=elementosIniciais[j] && arr[i]<elementosFinais[j]){
                res[j]++;
            }
        }
    }
    return res;
}

function desenhaTabela(arr,varType,varName,varDescription,elementos,contVet,freqPerc,fqA,fqAcP,total,totalPercentagem, k, elementosIniciais, elementosFinais, intervaloDeClasse, elementosPorClasse){

    let div = document.createElement("div");
    if(varType=='Qualitativa'){
        div.setAttribute("id", "tabelaQualitativa");
    } else if (varType=='Discreta'){
        div.setAttribute("id", "tabelaDiscreta");
    }else {
        div.setAttribute("id", "tabelaContinua");
    }
    document.querySelector("#tabela").appendChild(div);

    let table = document.createElement("table");
    div.appendChild(table);

    let trh = document.createElement("tr");
    table.appendChild(trh);

    if(varType=='Qualitativa'){
        trh.innerHTML=`<th>${varName}</th><th>${varDescription}</th><th>Frequencia% (fi%)</th><th>Frequencia <br>Acumulada</th><th>Frequencia <br>Acumulada% (fac%)</th><th></th>`;
        for(let i=0;i<elementos.length;i++){
            let tr=document.createElement("tr");
            tr.innerHTML=`<td>${elementos[i]}</td><td>${contVet[i]}</td><td>${freqPerc[i].toFixed(2)}%</td><td>${fqA[i]}</td><td>${fqAcP[i].toFixed(2)}%</td><td><input type='button' id='sobe${i}' onclick='sobe(${i});' value='Sobe'> <input type='button' id='desce${i}' onclick='desce(${i}, ${elementos.length-1});' value='Desce'></td>`;
            tr.setAttribute("id",`linha${i}`);
            table.appendChild(tr);
        }
    } else if(varType=='Discreta') {
        trh.innerHTML=`<th>${varName}</th><th>${varDescription}</th><th>Frequencia% (fi%)</th><th>Frequencia <br>Acumulada</th><th>Frequencia <br>Acumulada% (fac%)</th>`;
        for(let i=0;i<elementos.length;i++){
            let tr=document.createElement("tr");
            tr.innerHTML=`<td>${elementos[i]}</td><td>${contVet[i]}</td><td>${freqPerc[i].toFixed(2)}%</td><td>${fqA[i]}</td><td>${fqAcP[i].toFixed(2)}%</td>`;
            tr.setAttribute("id",`linha${i}`);
            table.appendChild(tr);
        }
    } else {

         // CRIAR A TABELA CONTINUA
        trh.innerHTML=`<th>Classe</th><th>Intervalo</th><th>${varDescription}</th><th>Frequencia% (fi%)</th><th>Frequencia <br>Acumulada</th><th>Frequencia <br>Acumulada% (fac%)</th>`;
        for(let i=0;i<k;i++){
            let tr=document.createElement("tr");
            tr.innerHTML=`<td>${i+1}</td><td>${elementosIniciais[i]} |--- ${elementosFinais[i]}</td><td>${elementosPorClasse[i]}</td><td>${freqPerc[i].toFixed(2)}%</td><td>${fqA[i]}</td><td>${fqAcP[i].toFixed(2)}%</td>`;
            tr.setAttribute("id",`linha${i}`);
            table.appendChild(tr);
        }
    }
    let tr=document.createElement("tr");
    table.appendChild(tr);

    if (varType!='Continua'){
        tr.innerHTML=`<td>Total</td><td>${total}</td><td>${totalPercentagem}%</td>`;
    } else {
        tr.innerHTML=`<td>Total:</td><td>Tam. Intervalo: ${intervaloDeClasse}</td><td>${total}</td><td>${totalPercentagem}%</td>`;
    }
}

function retornaPontoMedio(varType, elementosIniciais, elementosFinais){
    let pontoMedio = [];
    if (varType=='Continua'){
        for (let i=0;i<elementosIniciais.length;i++){

            pontoMedio.push((elementosIniciais[i]+elementosFinais[i])/2);
        }
    }
    return pontoMedio;
}

function retornaMedia(varType, elementos, qtdElementos, pontoMedio, totalDeElementos, arr, contagem){
    let res=0;
    let soma=0;
    let maior = 0
    let menor = 0;

    if (varType=='Continua'){
        for(let i=0;i<pontoMedio.length;i++){
            let temp=[pontoMedio[i]];
            soma+=pontoMedio[i]*contagem[i];
        }
        res=soma/totalDeElementos;
    } else if (varType=='Qualitativa'){
        res = 'A média não existe!';
    } else if (varType=='Uniforme') {
        maior = totalDeElementos;
        menor = elementos;
        res = (parseInt(maior) + parseInt(menor)) /2;
    } else {
       for (let i=0;i<arr.length;i++){
           soma+=arr[i];
       }
        res=soma/arr.length;
    }
    return res;
}

function exibeMedia(media,tipo){
    let p;
    if(tipo=='D'){
        p = document.body.querySelector("#media");
    } else {
        p = document.body.querySelector("#mediaUniforme");
    }

    if (isNaN(media)){
        res=media;
    } else {
        res=`Média = ${media.toFixed(numCasasDecimaisMediaModaMediana)}`;
    }
    p.innerHTML = res;
}

function exibeDesvioPadrao(dp){
    let p= document.body.querySelector("#dp");
    res=`Desvio Padrão = ${dp.toFixed(numCasasDecimaisMediaModaMediana)}`;
    p.innerHTML = res;
}

function retornaCoeficienteVariacao(desvioPadrao, media){
    return (desvioPadrao/media)*100;
}

function exibeCoeficienteVariacao(cf){
    let p= document.body.querySelector("#coeficienteVariacao");
    res=`Coeficiente de Variação = ${cf.toFixed(numCasasDecimaisMediaModaMediana)}%`;
    p.innerHTML = res;
}

function destroiTabela(){
    let temp = document.querySelector("#tabelaQualitativa");
    if (temp==null){
        temp = document.querySelector("#tabelaDiscreta");
        if (temp==null){
            temp = document.querySelector("#tabelaContinua");
        }
    }
    if (temp!=null){
        document.querySelector("#tabela").removeChild(temp);
    }
}


function retornaMediana(varType, limitesIniciais, totalDeElementos, frequenciaAcumulada, contagemElementosPorClasse, intervaloDeClasse, arr, qtdElementos, elementos){
    let pos = 50*totalDeElementos/100;;
    let posArr = Math.round(pos);
    let limInferiorClasse;
    let indice=0;
    let feAcumuladaAnterior=0
    let mediana;
    if (varType=='Continua'){

        mediana = calcMedianaOuSeparatrizContinua(pos, frequenciaAcumulada, limitesIniciais, contagemElementosPorClasse, intervaloDeClasse);
    } else if (varType=='Discreta'){

        if (totalDeElementos%2==0){
            mediana=(arr[posArr] + arr[posArr-1])/2;
        } else {
            mediana=arr[posArr];
        }

    } else {

        let arrTemp=[];
        for (let i=0;i<elementos.length;i++){
            for (let j=0;j<qtdElementos[i];j++){
                arrTemp.push(elementos[i]);
            }
        }


        mediana = arrTemp[posArr-1];
        if (totalDeElementos%2==0){
            if (arrTemp[posArr-1]!=arrTemp[posArr]){
                mediana+=' ' + arrTemp[posArr];
            }
        }
    }

    return mediana;
}

function exibeMediana(arr){
    let p= document.body.querySelector("#mediana");
    let res;
    if (isNaN(arr)){
        res = 'Mediana = ' + arr;
    } else {
        res = 'Mediana = ' + arr.toFixed(numCasasDecimaisMediaModaMediana);
    }

    p.innerHTML = res;
}

function exibeModa(arr){
    let p= document.body.querySelector("#moda");
    let res;
    if (arr.length==1){
        res = 'Moda = ';
    } else {
        res ='Modas = ';
    }
    for (let i=0; i<arr.length;i++){
        res += arr[i];
        if (i<(arr.length-2)){
            res += ', ';
        }
        if (i<(arr.length-1) && i>=(arr.length-2)){
            res += ' e ';
        }
    }
    p.innerHTML = res;
}

function retornaModa(elementos, qtdElementos, varType, contagemElementosPorClasse, pontoMedio){
    let res=[];

    let iguais= true;
    let x=qtdElementos[0];
    let maior=qtdElementos[0];
    let tempElementos = [];
    let indice = 0;
    if (varType!='Continua'){
        for(let i=1;i<qtdElementos.length;i++){ //checa se tem a mesma qtd de elementos em todo o vetor
            if (x != qtdElementos[i]){
                iguais = false;
            }
            if (maior<qtdElementos[i]){
                maior = qtdElementos[i];
            }
        }

        for(let i=0;i<qtdElementos.length;i++){ //checa se tem a mesma qtd de elementos em todo o vetor
            if (maior==qtdElementos[i]){
                res.push(elementos[i]);
            }
        }
        if (iguais){
            res=[];
            res.push("Série Amodal");
        }
    } else {
        maior = contagemElementosPorClasse[0];
       for(let i=1;i<contagemElementosPorClasse.length;i++){ //checa se tem a mesma qtd de elementos em todo o vetor
            if (x != contagemElementosPorClasse[i]){
                iguais = false;
            }
            if (maior<contagemElementosPorClasse[i]){
                maior = contagemElementosPorClasse[i];
            }
        }

        for(let i=0;i<contagemElementosPorClasse.length;i++){ //checa se tem a mesma qtd de elementos em todo o vetor
            if (maior==contagemElementosPorClasse[i]){
                res.push(pontoMedio[i]);
            }
        }
        if (iguais){
            res=[];
            res.push("Série Amodal");
        }
    }
    return res;
}


function retornaDesvioPadrao(varType, elementos, qtdElementos, media, totalDeElementos, pontoMedio, tipoDePesquisa, contagemElementosPorClasse){
    let res;
    let soma1=0;
    let soma2=0;

    if (varType=='Discreta'){
        for (let i=0; i<elementos.length;i++){
            soma1+=((elementos[i]-media)*(elementos[i]-media))*qtdElementos[i];
        }
    } else if (varType=='Continua'){
        for (let i=0; i<pontoMedio.length;i++){
            soma1+=((pontoMedio[i]-media)*(pontoMedio[i]-media))*contagemElementosPorClasse[i];
        }
    }
    res=soma1/(totalDeElementos+parseInt(tipoDePesquisa));
    res=Math.sqrt(res);
    return res;
}

function retornaDesvioPadraoUniforme(Variancia){
    let res = 0;

    res = Math.sqrt(Variancia);

    return res;
}

function retornaVariancia(PontoInicial, PontoFinal){
    let res = 0;

    res = (Math.pow(PontoFinal - PontoInicial, 2))/12;

    return res;
}

function retornaProbabilidade(PontoInicial, PontoFinal,IntervaloUniformeInicial, IntervaloUniformeFinal,opcaoUniforme){
    let res = 0;
    let tipo = parseInt(opcaoUniforme);
    let intervalo = 0;

    if(tipo == 1){
        intervalo = PontoFinal - IntervaloUniformeInicial;
        res = 1 / (PontoFinal-PontoInicial) * intervalo;
    } else if (tipo == -1) {
        intervalo = IntervaloUniformeInicial - PontoInicial;
        res = 1 / (PontoFinal-PontoInicial) * intervalo;
    } else {
        intervalo = IntervaloUniformeFinal - IntervaloUniformeInicial;
        res = 1 / (PontoFinal-PontoInicial) * intervalo;
    }
    res = res * 100;
    return res.toFixed(2);
}

function retornaTotalBinomial(Evento, sucesso, fracasso, tamanhoAmostra, opcao){
    let porcentagemSucesso = parseInt(sucesso) / 100;
    let porcentagemFracasso = parseInt(fracasso) / 100;
    let acmFatorial = 0;
    let acmTamanhoAmostra;
    let acmEvento;
    let acmDiferencaEvento;
    let res = 0;
    let DiferencaEvento;
    let inicio = 0;
    let final = 0;

    if(Evento != 0){
        if(opcao == 1){
            inicio = parseInt(Evento) + 1;
            final = parseInt(tamanhoAmostra) + 1;

        } else if(opcao == -1){
            final = Evento;
        } else {
            inicio = Evento
            final = parseInt(inicio) + 1;
        }

        for(let i = inicio; i < final; i++){
            acmFatorial = 0;
            acmTamanhoAmostra = 1;
            acmEvento = 1;
            acmDiferencaEvento = 1;
            if(opcao == 0){
                DiferencaEvento = tamanhoAmostra - Evento;
            } else{
                DiferencaEvento = tamanhoAmostra - i;
            }


            for(j = tamanhoAmostra; j > 0; j--){
                acmTamanhoAmostra *= j;
            }

            if(i > 0){
                if (opcao == 0){
                    for(k = Evento; k > 0; k--){
                        acmEvento *= k;
                    }
                } else{
                    for(k = i; k > 0; k--){
                        acmEvento *= k;
                    }
                }
            } else{
                acmEvento = 1;
            }

            if(DiferencaEvento > 0){
                for(l = DiferencaEvento; l > 0; l--){
                    acmDiferencaEvento *= l;
                }
            } else{
                acmDiferencaEvento = 1;
            }

            acmFatorial = acmTamanhoAmostra / (acmEvento * acmDiferencaEvento);

            res +=  acmFatorial * Math.pow(porcentagemSucesso,i) * Math.pow(porcentagemFracasso, tamanhoAmostra - i);
        }
    } else {
        res =  1 * Math.pow(porcentagemSucesso,0) * Math.pow(porcentagemFracasso, tamanhoAmostra - 0);
    }

    res = res * 100;
    return res.toFixed(6);
}

function retornaMediaBinomial(tamanhoAmostra, sucesso){
    let porcentagemSucesso = parseInt(sucesso) / 100;
    let porcentagemFracasso = parseInt(fracasso) / 100;
    let res = 0;

    res = tamanhoAmostra * porcentagemSucesso;
    return res;
}

function retornaDesvioPadraoBinomial(tamanhoAmostra, sucesso, fracasso){
    let porcentagemSucesso = parseInt(sucesso) / 100;
    let porcentagemFracasso = parseInt(fracasso) / 100;
    let res = 0;

    res = Math.sqrt(tamanhoAmostra * porcentagemSucesso * porcentagemFracasso);
    return res;
}

function exibeVariancia(Variancia){
    let p= document.body.querySelector("#varianciaUniforme");
    let res;

    res = 'Variância= ' + Variancia.toFixed(2);

    p.innerHTML = res;
}

function exibeDesvioPadraoUniforme(DesvioPadrao){
    let p= document.body.querySelector("#dpUniforme");
    let res;

    res = 'Desvio Padrao = ' + DesvioPadrao.toFixed(2);

    p.innerHTML = res;
}

function exibeProbabilidade(Probabilidade){
    let p= document.body.querySelector("#probabilidadeUniforme");
    let res;

    res = 'Probalidade = ' + Probabilidade + ' %';

    p.innerHTML = res;
}

function validaValores(Evento, amostra){
    let amostraNum = parseInt(amostra);
    if(Evento > amostraNum){
        return false;
    }
    return true;
}

function exibeTotalBinomail(Total){
    let p= document.body.querySelector("#probalidadeBinomial");
    let res;

    res = 'Probabilidade = ' + Total + '%';

    p.innerHTML = res;
}

function exibeMediaBinomial(Total){
    let p= document.body.querySelector("#mediaBinomial");
    let res;

    res = 'Média = ' + Total;

    p.innerHTML = res;
}

function exibeDesvioPadraoBinomial(Total){
    let p= document.body.querySelector("#desvioPadraoBinomial");
    let res;

    res = 'Desvio Padrão = ' + Total;

    p.innerHTML = res;
}
