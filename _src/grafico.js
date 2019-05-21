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
                type: 'linear',
                position: 'top',
                ticks: {
                    min: menorx-zoomX,
                    max: maiorx+zoomX
                }
            }],
            yAxes: [{
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
            label: titulo,
            data: dados,
            borderColor: '#2196f3',
            backgroundColor: '#2196f3',
            borderWidth: 10,
            showLine: false
        }, {
            type: 'line',
            label: 'line',
            data: [{x:menorx-zoomX-2, y:geraReta(menorx-zoomX-2,a,b)}, {x:maiorx+zoomX+2,y:geraReta(maiorx+zoomX+2,a,b)}],
            borderColor: '#000000',
            borderWidth: 5,
            showLine: true,
            fill: false

        }]
    }
    graf.update();

}

function geraGrafico(ctx, tipo, Titulo, Dados, menorX, maiorX, menorY, maiorY, A, B ){
    a=A;
    b=B;
    menorx=menorX;
    menory=menorY;
    maiorx=maiorX;
    maiory=maiorY;
    titulo=Titulo;
    dados=Dados;
    if (tipo=='scatter'){
        tipo = 'line';
        //debugger;
        graf = new Chart(ctx, {
            type: tipo,
            data: {
                datasets: [{
                    label: titulo,
                    data: dados,
                    borderColor: '#2196f3',
                    backgroundColor: '#2196f3',
                    borderWidth: 10,
                    showLine: false
                }, {
                    type: 'line',
                    label: 'line',
                    data: [{x:menorx-zoomX-1, y:geraReta(menorx-zoomX-1,a,b)}, {x:maiorx+zoomX+1,y:geraReta(maiorx+zoomX+1,a,b)}],
                    borderColor: '#000000',
                    borderWidth: 5,
                    showLine: true,
                    fill: false

                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'top',
                        ticks: {
                            min: menorX-zoomX,
                            max: maiorX+zoomX
                        }
                    }],
                    yAxes: [{
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
    } else {

    }
}

function geraReta(x, a, b){
    return a*x+b;
}
