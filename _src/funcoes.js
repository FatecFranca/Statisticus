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

function calculaSeparatriz(varType, valorDaSeparatriz, medidaSeparatriz, totalDeElementos, frequenciaAcumulada, elementos ){

    let valorEmPorcentagem;
    let posicao;

    valorEmPorcentagem = retornaPorcentagemSeparatriz(medidaSeparatriz, valorDaSeparatriz);





    if (varType!="Continua"){
        posicao=valorEmPorcentagem*totalDeElementos/100;

        for(let i=0;i<frequenciaAcumulada.length;i++){
            if (posicao<=frequenciaAcumulada[i]){
                return elementos[i];
                break;
            }
        }


    } else {
       /*
       if(varType == 'Continua'){

        //acha qual a Fac do elemento e do anterior
        for(let i = 0; i<frequenciaAcumulada.length; i++){
            if(frequenciaAcumulada[i] >= resPosicao && !achou){
                achou = true;
                posicao =  i;
                if(frequenciaAcumulada[i - 1] > 0){
                    facAnterior = frequenciaAcumulada[i - 1];
                }
                break;
            }
        }
        //Acha o limite inferior
        for(let j = 0; j < elementosIniciais.length; j++){
            if(j = posicao){
                limiteInferior =  elementosIniciais[j];
                break;
            }
        }
        //Acha FI
        for(let x = 0; x < contagemElementosPorClasse.length; x++){
            if(x = posicao){
                fiClasse = contagemElementosPorClasse[x];
                break;
            }
        }

        elemento = limiteInferior + ((resPosicao - facAnterior) / fiClasse * intervaloDeClasse);

       */
    }

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
 /*
            Função para verificar qual o tipo de variável
            Qualitativa Nominal - Tipo = String, Ordenação = ???
            Qualitativa Ordinal - Tipo = String, Ordenação = ???
            Quantitativa Discreta - Tipo = Numérica, Ordenação = crescente
            Quantitativa Continua - Tipo = Numérica, Ordenação = crescente
            (Discreta: Pouca variedade(<= que 6) e muita repetição)
            (Continua: Muita variedade(> 6) e pouca repetição)
        */
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

    if (varType=='Continua'){
        for(let i=0;i<pontoMedio.length;i++){
            let temp=[pontoMedio[i]];
            soma+=pontoMedio[i]*contagem[i];
        }
        res=soma/totalDeElementos;
    }else if (varType=='Qualitativa'){
        res = 'A média não existe!';
    } else {
       for (let i=0;i<arr.length;i++){
           soma+=arr[i];
       }
        res=soma/arr.length;
    }
    return res;
}
function exibeMedia(media){
    let p= document.body.querySelector("#media");
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

function exiveCoeficienteVariacao(cf){
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
function destroiGrafico(){
    let temp = document.querySelector("#divGrafico");
    temp.innerHTML="";
}

function retornaMediana(varType, limitesIniciais, totalDeElementos, frequenciaAcumulada, contagemElementosPorClasse, intervaloDeClasse, arr, qtdElementos, elementos){


    let pos = totalDeElementos/2;
    let posArr = Math.round(pos);
    let limInferiorClasse;
    let indice=0;
    let feAcumuladaAnterior=0
    let mediana;
    if (varType=='Continua'){
        for (let i=0; i<frequenciaAcumulada.length; i++){
            if (posArr<=frequenciaAcumulada[i]){
                limInferiorClasse=frequenciaAcumulada[i];
                indice=i;
                break;
            }
        }
        if (indice>0){
            feAcumuladaAnterior=frequenciaAcumulada[indice-1];
        }
        mediana = limInferiorClasse + ((pos - feAcumuladaAnterior)/contagemElementosPorClasse[indice]) * intervaloDeClasse;
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

function geraGrafico(classes, frequencia, tipo, tituloVariavel, tituloFrequencia){
    var data = new google.visualization.DataTable();

    if (tipo=='Pizza'){
        data.addColumn('string', tituloVariavel);
        data.addColumn('number', tituloFrequencia);
        for (let i=0; i<classes.length;i++){
            data.addRow([classes[i],frequencia[i]]);
        }
        var options = {'title':'',
                       'width':600,
                       'height':400};
        var chart = new google.visualization.PieChart(document.getElementById('divGrafico'));
        chart.draw(data, options);
    } else if(tipo=='Colunas'){
        data.addColumn('number', tituloVariavel);
        data.addColumn('number', tituloFrequencia);
        for (let i=0; i<classes.length;i++){
            data.addRow([classes[i],frequencia[i]]);
        }
        var options = {'title':tituloVariavel,
                       'width':600,
                       'height':400};
        var chart = new google.visualization.ColumnChart(document.getElementById('divGrafico'));
        chart.draw(data, options);
    }
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
