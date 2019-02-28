//Cria o vetor separando os dados importados ou informados pelo paciente
function processaInput(res) {
    let t = res.replace(/,/g, ".");  //Substitui a "," pelo "."
    let arr=t.split(/;| |\r?\n|\r/); // Expressão regular para filtrar os espaços, ponto e virgulas e quebras de linha
    if (arr[arr.length-1]==""){let r = arr.pop();}
    return arr;
}

function ordenaVetor(arr) {
    for (let i=0; i<arr.length-1;i++){
        indice=i;
        for(let j=i+1;j<arr.length;j++){
            if (parseFloat(arr[j])<parseFloat(arr[indice])){
                indice=j;
            }
        }
        temp = arr[i];
        arr[i]=arr[indice];
        arr[indice]=temp;
    }
    return arr;
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
