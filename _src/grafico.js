function geraGrafico(ctx, tipo, titulo, dados, menorX, maiorX, menorY, maiorY, a, b ){

    //////////////////////////////////////////////////////////////////////////
    //////////// ARRUMAR OS VALORES DE MENOR E MAIOR E FAZELOS RELATIVOS A X e y\\\\\\\\\\\\\\\
    ///////////////////////////////////////////////////////////////////////////

    if (tipo=='scatter'){
        tipo = 'line';
        debugger;




        var graf = new Chart(ctx, {
            type: 'line', //tipo,
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
                    data: [{x:menorX-100, y:geraReta(menorX-100,a,b)}, {x:maiorX+100,y:geraReta(maiorX+100,a,b)}],
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
                        position: 'bottom',
                        ticks: {
                            min: menorX,
                            max: maiorX
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        position: 'left',
                        ticks: {

                            min: geraReta(menorX,a,b),
                            max: geraReta(maiorX,a,b)
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
