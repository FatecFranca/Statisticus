let a=0;
let b=0;
let minX=-5;
let maxX=5;
let minY=-5;
let maxY=5;
let modificadorDeMovimento = 2;
let opcoes;
let opcoesPizza;
let opcoesColunas;
let grafico;
let graficoPizza;
let graficoColunas;
let ctx;

function iniciaVariaveis(){

    minX=-5;
    maxX=5;
    minY=-5;
    maxY=5;
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
};
    opcoesPizza = {
            type: 'pie',
            data: {
                datasets: [{
                    data:[],
                    backgroundColor: []
                }],
                labels: []
            },
			options: {
				responsive: true
			}
};

    opcoesColunas = {
        type: 'bar',
        data: {
            labels: [' '],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            legend: false,
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
}

function criaGraficoDeColunas(ctx,lbl,ddd){

    iniciaVariaveis();
    let cores=[];
    for(let i=0;i<lbl.length;i++){
        cores.push(geraRGB());
        opcoesColunas.data.datasets[0].label=lbl[i];
    }
    opcoesColunas.type='bar';
    opcoesColunas.data.labels=lbl;
    opcoesColunas.data.datasets[0].data=ddd;


    opcoesColunas.data.datasets[0].backgroundColor=cores;
    opcoesColunas.data.datasets[0].borderColor=cores;
    graficoColunas = new Chart(ctx,opcoesColunas);
    graficoColunas.update();




}

function criaGraficoPizza(ctx,lbl,ddd){
    iniciaVariaveis();
    graficoPizza = new Chart(ctx, opcoesPizza);
    setaTipo('pie');
    let cores=[];
    for(let i=0;i<ddd.length;i++){
        cores.push(geraRGB());
    }
    opcoesPizza.data.datasets[0].data=ddd;
    opcoesPizza.data.datasets[0].backgroundColor=cores;
    opcoesPizza.data.labels=lbl;
    var newDataset = {
            backgroundColor: [],
            data: []
        };
    for (var index = 0; index < lbl.length; ++index) {
        newDataset.data.push(ddd[index]);
        var colorName = lbl[index];
        var newColor = cores[index];
        newDataset.backgroundColor.push(newColor);
    }
    opcoesPizza.data.datasets.push(newDataset);
    opcoesPizza.data.datasets.splice(0, 1);
    graficoPizza.update();
}


function setaModMovimento(valor){
    modificadorDeMovimento = parseFloat(valor.replace(",","."));
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
        backgroundColor: corBorda,
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


function apagaGrafico(nomeCanvas){
    let canvas = document.querySelector(`#${nomeCanvas}`);
    let pai = canvas.parentNode;
    let filho = pai.removeChild(canvas);
    grafico=undefined;
    filho = document.createElement("canvas");
    filho.setAttribute("style","max-height: 300; max-width: 300;");
    filho.setAttribute("id",nomeCanvas);
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


function recalculaReta(){
    opcoes.data.datasets[0].data = geraLinha();
}

function setaAeB(a,b){
    A=a;
    B=b;
}

function moveX(valor){
    minX+=valor*modificadorDeMovimento;
    maxX+=valor*modificadorDeMovimento;
    opcoes.options.scales.xAxes[0].ticks.min = minX;
    opcoes.options.scales.xAxes[0].ticks.max = maxX;
    atualiza();
}

function moveY(valor){

    minY+=valor*modificadorDeMovimento;
    maxY+=valor*modificadorDeMovimento;
    opcoes.options.scales.yAxes[0].ticks.min = minY;
    opcoes.options.scales.yAxes[0].ticks.max = maxY;
    atualiza();
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
        minX = menorx;
        maxX = maiorx;
        minY = menory;
        maxY = maiory;

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
        recalculaReta();
        grafico.update();
    }

}

function geraLinha(){
    let w=0;
    let z=0;
    let mmin=minX -3;
    let mmax=maxX +3;
    w=(A*(mmin)+B);
    z=(A*(mmax)+B);
    let res = [{
        x:mmin,
        y:w
    },{
        x:mmax,
        y:z
    }];
    return res;
}

