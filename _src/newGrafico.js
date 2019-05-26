let minX=-5;
let maxX=5;
let minY=-5;
let maxY=5;
let zoomX=0;
let zoomY=0;
let modificadorDeMovimento = 2;
let opcoes;
let grafico;
let ctx;

function iniciaVariaveis(){
 minX=-5;
 maxX=5;
 minY=-5;
 maxY=5;
 zoomX=0;
 zoomY=0;
 modificadorDeMovimento = 2;
 opcoes = {
            type: 'line',
            data: {
                datasets: []
            },
            options: {
                scales: {
                    xAxes: [{
                         scaleLabel: {
                            display: true,
                            labelString: '',
                        },
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            min: minX,
                            max: maxX
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '',
                        },
                        type: 'linear',
                        position: 'left',
                        ticks: {

                            min: minY,
                            max: maxY
                        }
                    }]
                }
            }
        }
}


function setaModMovimento(valor){
    modificadorDeMovimento = parseFloat(valor);
}

function setaLabelX(nome){
    opcoes.options.scales.xAxes[0].scaleLabel.labelString = nome;
    atualiza();
}
function setaLabelY(nome){
    opcoes.options.scales.yAxes[0].scaleLabel.labelString = nome;
    atualiza();
}

function adicionaDataset(titulo,tipo,dados,corBorda,tamBorda,mostrarLinha,preencher){
    dataSet={
        label: titulo,
        type: tipo,
        data: dados,
        borderColor: corBorda,
        borderWidth: tamBorda,
        showLine: mostrarLinha,
        fill: preencher
    };
    opcoes.data.datasets.push(dataSet);
    if (opcoes.data.datasets.length<2){
        atualiza();
    } else {
        fit();
    }


}

function removeDataset(indice){
    if (opcoes.data.datasets.length>indice){
        let remove = opcoes.data.datasets.splice(indice,1);
    }
    if (opcoes.data.datasets.length<2){
        atualiza();
    } else {
        fit();
    }
}

function removeTodosDatasets(){
    opcoes.data.datasets = [];
    atualiza();
}

function setaTipo(tipo){
    opcoes.type = tipo;
}

function criaGrafico(canvas){
    ctx = document.querySelector(`#${canvas}`);
    grafico = new Chart(ctx, opcoes);
}

function apagaGrafico(){
    let pai = ctx.parentNode;
    let filho = pai.removeChild(ctx);
    grafico.update();
    filho = document.createElement("canvas");
    filho.setAttribute("style","max-height: 300; max-width: 300;");
    filho.setAttribute("id","graficoCorrelacao");
    filho.setAttribute("height","150");
    filho.setAttribute("width","150");
    pai.appendChild(filho);
    iniciaVariaveis();
}

function adicionaPonto(serie,xx,yy){
    if (serie>opcoes.data.datasets.length){serie=0;}
    opcoes.data.datasets[serie].data.push({x:xx,y:yy});
    if (opcoes.data.datasets.length<2){
        atualiza();
    } else {
        fit();
    }
}

function removePonto(serie,xx,yy){
    for(let i=0;i<opcoes.data.datasets[serie].data.length;i++){
        if(opcoes.data.datasets[serie].data[i].x==xx && opcoes.data.datasets[serie].data[i].y == yy){
            let apagar = opcoes.data.datasets[serie].data.splice(i,1);
        }
    }
    if (opcoes.data.datasets.length<2){
        atualiza();
    } else {
        fit();
    }
}

function zoom(eixo, tipo){

    if(eixo=='x'){
        if (tipo=='+'){
            if((maxX-minX)>modificadorDeMovimento){
                minX+=modificadorDeMovimento;
                maxX-=modificadorDeMovimento;
            } else {
                alert ("Nível máximo de zoom atingido!");
            }
        } else {
            minX-=modificadorDeMovimento;
            maxX+=modificadorDeMovimento;
        }
    } else {
        if (tipo=='+'){
            if((maxY-minY)>modificadorDeMovimento){
                minY+=modificadorDeMovimento;
                maxY-=modificadorDeMovimento;
            } else {
                alert ("Nível máximo de zoom atingido!");
            }
        } else {
            minY-=modificadorDeMovimento;
            maxY+=modificadorDeMovimento;
        }
    }
    opcoes.options.scales.xAxes[0].ticks.min = minX;
    opcoes.options.scales.xAxes[0].ticks.max = maxX;
    opcoes.options.scales.yAxes[0].ticks.min = minY;
    opcoes.options.scales.yAxes[0].ticks.max = maxY;
    atualiza();
}



function moveX(valor){

}

function moveY(valor){

}

function fit(){
    //começa em 1 pois o dataset 0 é o da linha
    let n = opcoes.data.datasets.length
    let maiorx;
    let menorx;
    let maiory;
    let menory;
    if (n>1){
        maiorx=opcoes.data.datasets[1].data[0].x;
        menorx=opcoes.data.datasets[1].data[0].x;
        maiory=opcoes.data.datasets[1].data[0].y;
        menory=opcoes.data.datasets[1].data[0].y;
        for(let i=1;i<n;i++){
            for(let j=0;j<opcoes.data.datasets[i].data.length;j++){
                if(maiorx<opcoes.data.datasets[i].data[j].x){
                    maiorx=opcoes.data.datasets[i].data[j].x
                }
                if(maiory<opcoes.data.datasets[i].data[j].y){
                    maiory=opcoes.data.datasets[i].data[j].y
                }
                if(menorx>opcoes.data.datasets[i].data[j].x){
                    menorx=opcoes.data.datasets[i].data[j].x
                }
                if(menory>opcoes.data.datasets[i].data[j].y){
                    menory=opcoes.data.datasets[i].data[j].y
                }
            }
        }
        opcoes.options.scales.xAxes[0].ticks.min = menorx;
        opcoes.options.scales.xAxes[0].ticks.max = maiorx;
        opcoes.options.scales.yAxes[0].ticks.min = menory;
        opcoes.options.scales.yAxes[0].ticks.max = maiory;
        atualiza();


    }

}

function geraRGB(){
    let r = parseInt(Math.random()*255);
    let g = parseInt(Math.random()*255);
    let b = parseInt(Math.random()*255);
    return corRGB(r,g,b,1);
}

function corRGB(r,g,b,a){
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function atualiza(){
    if (grafico!=undefined){
        grafico.data=opcoes.data;
        grafico.options = opcoes.options;
        grafico.update();
    }

}
