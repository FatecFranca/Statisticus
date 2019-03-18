



//Cria o vetor separando os dados importados ou informados pelo paciente
function processaInput(res) {
    //debugger;
    res.trim();
    let u = res.replace(/,/g, ".");  //Substitui a "," pelo "."
    u = u.replace(/[.]+/g,'.'); //Substitui . duplicados
    u = u.replace(/[;]+/g,' ');
    let t = u.replace(/[ ]+/g,' '); //Substitui . duplicados

    let arr=t.split(/;| |\r?\n|\r/); // Expressão regular para filtrar os espaços, ponto e virgulas e quebras de linha
    if (arr[arr.length-1]==""){let r = arr.pop();}
    if (arr[0]=="" || arr[0]==" "){let r = arr.shift();}
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

    if(contArr.length < 6){
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
    eleVetor=[];
    contVet=[];
    eleVetor.push(arr[0]);
    contVet.push(1);
    for(let i=1;i<arr.length;i++){
        let existe=false;
        for(let j=0;j<eleVetor.length;j++){
            if (eleVetor[j]==arr[i]){
                existe=true;
                contVet[j]++;
            }
        }
        if (!existe){
            eleVetor.push(arr[i]);
            contVet.push(1);
        }
    }
    return eleVetor;
}
function quantidadeElementos(){
    return contVet;
}
function calcFreqPerc(arr){
    freqPerc=[];
    let tot = arr.length;
    for(let i=0;i<contVet.length;i++){
        freqPerc.push(contVet[i]/tot*100);
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
function calcFreqAcumPerc(){
    freqAcumPerc=[];
    freqAcumPerc.push(freqPerc[0]);
    for(let i=1;i<contVet.length;i++){
        freqAcumPerc.push(freqAcumPerc[i-1] + freqPerc[i]);
    }
    return freqAcumPerc;
}
function calcK(arr){
    return Math.round(Math.sqrt(arr.length));
}
function intervaloClasse(amp,k,tam){
    r=[];
    let flag=false;
    let ampOriginal=amp;
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
        if (amp>tam){
            amp=ampOriginal;
            k--
        }
    } while (!flag);
    return r;
}
function arredondaTotal(num){
    return Math.round(num);
}

function desenhaTabela(arr,varType,varName,varDescription,eleVetor,contVet,freqPerc,fqA,fqAcP,total,totalPercentagem){

    //contaElementos(arr);
    //calcFreqPerc(arr);
    //let fqA = calcFreqAcum(contVet);
    //let fqAcP = calcFreqAcumPerc();
    let div = document.createElement("div");
    document.body.appendChild(div);
    let table = document.createElement("table");
    div.appendChild(table);
    let trh = document.createElement("tr");
    table.appendChild(trh);

    trh.innerHTML=`<th>${varName}</th><th>${varDescription}</th><th>Frequencia% (fi%)</th><th>Frequencia Acumulada</th><th>Frequencia Acumulada % (fac%)</th>`;

    let freqAcum=0;
    if(varType!='Continua'){
        for(let i=0;i<eleVetor.length;i++){
            let tr=document.createElement("tr");
            tr.innerHTML=`<td>${eleVetor[i]}</td><td>${contVet[i]}</td><td>${freqPerc[i].toFixed(2)}%</td><td>${fqA[i]}</td><td>${fqAcP[i].toFixed(2)}%</td>`;
            table.appendChild(tr);
        }
    } else {
        // CRIAR A TABELA CONTINUA
    }


    let tr=document.createElement("tr");
    table.appendChild(tr);
    tr.innerHTML=`<td>Total</td><td>${total}</td><td>${totalPercentagem}%</td><td>${fqA[fqA.length-1]}</td><td></td>`;

    if(varType=='Qualitativa'){
        div.setAttribute("id", "tabelaQualitativa");
    } else if (varType=='Discreta'){
        div.setAttribute("id", "tabelaDiscreta");
    }else {
        div.setAttribute("id", "tabelaContinua");
    }
    //dadosTabela = intervaloClasse(arr,dadosTabela);
}
