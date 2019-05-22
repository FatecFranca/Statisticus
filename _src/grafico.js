let zoomX = 3;
let zoomY = 3;
let menorx=0;
let maiorx=0
let menory=0;
let maiory=0;
let graf;
let titulo;
let dados;
let a=0;
let b=0;
let subtitulo;
let tamanhoDosPontos=3;
let larguraDaReta=1;
let dadosPersonalizados=[];

function zoom(eixo,valor){

    if(eixo=='x'){
        zoomX+=valor;
    }else{
        zoomY+=valor;
    }

    graf.options = {
        animation: false,
        scales: {
            responsive: true,
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: titulo,
                },
                type: 'linear',
                position: 'bottom',
                ticks: {
                    min: menorx-zoomX,
                    max: maiorx+zoomX
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: subtitulo,
                },
                type: 'linear',
                position: 'left',
                ticks: {

                    min: menory-zoomY,
                    max: maiory+zoomY
                }
            }]
        }
    };

    graf.data = {
        datasets: [{
            label: 'Pontos Correlacionados',
            data: dados,
            borderColor: '#2196f3',
            backgroundColor: '#2196f3',
            borderWidth: tamanhoDosPontos,
            showLine: false
        }, {
            type: 'line',
            label: `Y = ${a.toFixed(2)}X + ${b.toFixed(2)}`,
            data: [{x:menorx-zoomX-2, y:geraReta(menorx-zoomX-2,a,b)}, {x:maiorx+zoomX+2,y:geraReta(maiorx+zoomX+2,a,b)}],
            borderColor: '#000000',
            borderWidth: larguraDaReta,
            showLine: true,
            fill: false

        },{
            label: `Personalizado`,
            type: 'line',
            data: dadosPersonalizados,
            borderColor: '#FF0033',
            backgroundColor: '#FF0033',
            borderWidth: tamanhoDosPontos,
            showLine: false,


        }]
    }
    graf.update();

}

function geraGrafico(ctx, tipo, Titulo, Dados, menorX, maiorX, menorY, maiorY, A, B, SubTitulo ){
    a=A;
    b=B;
    menorx=menorX;
    menory=menorY;
    maiorx=maiorX;
    maiory=maiorY;
    titulo=Titulo;
    subtitulo=SubTitulo;
    dados=Dados;
    if (tipo=='scatter'){
        tipo = 'line';
        //debugger;
        graf = new Chart(ctx, {
            type: tipo,
            data: {
                datasets: [{
                    label: 'Pontos Correlacionados',
                    data: dados,
                    borderColor: '#2196f3',
                    backgroundColor: '#2196f3',
                    borderWidth: tamanhoDosPontos,
                    showLine: false
                }, {
                    label: `Y = ${a.toFixed(2)}X + ${b.toFixed(2)}`,
                    type: 'line',
                    data: [{x:menorx-zoomX-1, y:geraReta(menorx-zoomX-1,a,b)}, {x:maiorx+zoomX+1,y:geraReta(maiorx+zoomX+1,a,b)}],
                    borderColor: '#000000',
                    borderWidth: larguraDaReta,
                    showLine: true,
                    fill: false

                }, {
                    label: `Personalizado`,
                    data: dadosPersonalizados,
                    borderColor: '#FF0033',
                    backgroundColor: '#FF0033',
                    borderWidth: tamanhoDosPontos,
                    showLine: false,


                }]
            },
            options: {
                scales: {
                    xAxes: [{
                         scaleLabel: {
                            display: true,
                            labelString: titulo,
                        },
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            min: menorX-zoomX,
                            max: maiorX+zoomX
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: subtitulo,
                        },
                        type: 'linear',
                        position: 'left',
                        ticks: {

                            min: menorY-zoomY,
                            max: maiorY+zoomY
                        }
                    }]
                }
            }
        });
    }
}

function geraReta(x, a, b){
    return a*x+b;
}

function moveGrafico(eixo,qtd){
    if (eixo=='x'){
        menorx+=qtd;
        maiorx+=qtd;
    }else{
        menory+=qtd;
        maiory+=qtd;
    }
    zoom("x",0);
    zoom("y",0);
}

function addPonto(xx,yy){
    //graf.data.datasets["2"].data.push({x:xx, y:yy});
    dadosPersonalizados.push({x:xx, y:yy});
    if (xx<menorx){menorx=parseInt(xx);}
    if (yy<menory){menory=parseInt(yy);}
    if (xx>maiorx){maiorx=parseInt(xx);}
    if (yy>maiory){maiory=parseInt(yy);}

    graf.update();
    zoom("x",0);
    zoom("y",0);
}
