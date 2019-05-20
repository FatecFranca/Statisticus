function retornaVarArr(arr, p, f){
    res=[];
    for(let i=p;i<f;i++){
        res.push(arr[i]);
    }
    return res;
}


function retornaQuadrado(arr){
    res=[];
    for(let i=0;i<arr.length;i++){
        res.push(Math.pow(arr[i],2));
    }
    return res;
}

function retornaSoma(arr){
    let res=0;
    for(let i=0;i<arr.length;i++){
        res+=arr[i];
    }
    return res;
}

function retornaMultiplicacao(x,y){
    let res=[];
    for (let i=0;i<x.length;i++){
        res.push(x[i] * y[i]);
    }
    return res;
}

function retornaCorrelacao(n, somaX, somaY, somaX2,  somaY2, somaXvezesY){
    let res=0;
    res = ((n * somaXvezesY)-(somaX*somaY))/Math.sqrt(((n * somaX2) - Math.pow(somaX,2)) *(n*somaY2 - Math.pow(somaY,2)));
    return res;
}

function retornaGrauDeCorrelacao(r, x, y){
    let res=`A correlação existente entre ${x} e ${y} é de <b>${(r*100).toFixed(2)}%</b><br>`;
    if (r<0.3){
        res+= "Existe correlação <b>insignificante</b> entre as variáveis.";
        return res;
    }
    if (r<0.6){
        res+= "Existe correlação <b>fraca</b> entre as variáveis.";
        return res;
    }
    if (r>=0.6){
        res+= "Existe correlação <b>significante</b> entre as variáveis.";
        return res;
    }
}

function retornaTexto(x){
    res="";
    for (i=0;i<x.length-1;i++){
        res+=x[i] + ";"
    }
    res+=x[x.length-1];
    return res;
}


function convertToPoint(xx,yy){
    let res=[];

    for(let i=0;i<xx.length;i++){
        res.push({x:xx[i], y:yy[i]});
    }


    return res;
}
