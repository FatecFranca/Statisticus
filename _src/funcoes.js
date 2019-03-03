//Cria o vetor separando os dados importados ou informados pelo paciente
function processaInput(res) {
    let t = res.replace(/,/g, ".");  //Substitui a "," pelo "."
    let arr=t.split(/;| |\r?\n|\r/); // Expressão regular para filtrar os espaços, ponto e virgulas e quebras de linha
    if (arr[arr.length-1]==""){let r = arr.pop();}
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
/*
function checaDiscretaContinua(arr) {
    let totalNumDiferentes=1;
    let numeros=[];
    numeros.push(arr[0]);
    for (let i=0;i<arr.length;i++){
        let tem=false;
        for(let j=0;j<numeros.length;j++){
            if (arr[i]==numeros[j]){
                tem=true;
            }
        }
        if(!tem){
            numeros.push(a[i]);
            totalNumDiferentes++;
        }
    }
    console.log("Quantidade de elementos diferentes = " + totalNumDiferentes);
    if (totalNumDiferentes>5){
        return 2;
    } else {
        return 1;
    }
}*/

function converteEmNumeros(arr) {
    const newArr = arr.map(x => parseFloat(x));
    console.log(newArr);
    return newArr;
}

function checaSeTemLetras(arr) {
    let temLetras = false;
    for(let i=0;i<arr.length;i++){
        if (isNaN(arr[i])){
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
            let arr = Vetor;

            for(let i=0 ; i< arr.length; i++){
                if(isNaN(arr[i])){
                    tipo = 'Qualitativa';
                    break;
                }
            }

            if(tipo != 'Qualitativa'){
                tipo = verificaQuantitativa(arr);
            }

            if(tipo == 'Continua'){

            } else if (tipo == 'Discreta'){

            } /* else if (){//quantitativa Ordinal

            } else{//qualitativa Nominal

            } */
        }

        function verificaQuantitativa(Vetor){
            let arr = Vetor;
            let arrAux = [];
            let contArr = [];
            let tipoQuantitativa = '';
            let flag = 'S'
            let flag2 = 'S'

            for(let i=0; i<arr.length; i++){
                if(flag == 'S'){
                    flag = 'N';
                    arrAux.push(arr[i]);
                    contArr.push(1);
                } else{
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
                }
            }
            for(let i=0; i<contArr.length; i++){
                if(contArr.length < 6){
                    tipoQuantitativa = 'Discreta';
                }
            }

            if(tipoQuantitativa == ''){
                tipoQuantitativa = 'Continua'
            }
        }

