var anosgrafico = []
var valoresgrafico = []
var max = document.getElementById("maiorano")
var min = document.getElementById("menorano")
max.value = 2050
min.value = 1970
var equacao = document.getElementById('equacao')
var pcterro = document.getElementById('pcterro')





function gerardados(){
    max = document.getElementById("maiorano").value
    min = document.getElementById("menorano").value
    let x = parseInt(min)
    let y = parseInt(max)
    anosgrafico = []
    console.log(x+"e"+y)
    
    while(x<=y){
    anosgrafico.push(x)
    x = x+1

    }
    console.log(anosgrafico)
    

}
function gerarvaloresgrafico(){

    valoresgrafico = []; 

    anosgrafico.forEach(function(valor) {
        valoresgrafico.push(310000.000000/(1 +211126966384146673735047964243099624931328.000000 * Math.exp(-0.047789 * valor)))
   
    });

    console.log(valoresgrafico)


}

var grafico
function gerargrafico(){
var ctx = document.getElementById('grafico').getContext('2d');
    
// Criar o gráfico de linhas
grafico = new Chart(ctx, {
    type: 'line', 
    data: {
        labels: anosgrafico,
        datasets: [
            {
                label: 'Dados do MapBiomas', 
                data: anosoriginais.map((ano, index) => ({ x: ano, y: valoresoriginais[index] })), 
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', 
                pointBorderColor: '#fff', 
                pointBorderWidth: 1, 
                pointRadius: 5, 
                pointHoverRadius: 7 
            },
            {
                label: 'Modelo Criado', 
                data: valoresgrafico, 
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1 
            }
        ]
    },
    options: {
        responsive: true,
       
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: Math.min(...anosgrafico),
                max: Math.max(...anosgrafico),
                
            },
            y: {
                beginAtZero: true 
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        xMin: 2023, 
                        xMax: 2023,
                        borderColor: 'rgba(50, 50, 50, 0.7)',
                        borderWidth: 2,
                        label: {
                            content: 'Linha Vertical',
                            enabled: true,
                           
                        }
                    }
                }
            }
        }
    }
}
)
}





function atualizarGrafico() {
    gerardados()
    gerarvaloresgrafico()
    grafico.options.scales.x.min = parseInt(document.getElementById("menorano").value)
    grafico.options.scales.x.max = parseInt(document.getElementById("maiorano").value)

    grafico.data.labels = anosgrafico; 
    grafico.data.datasets[1].data = valoresgrafico; 
    grafico.update(); 

   
  }




function escolhermaximo(){

    max = parseInt(document.getElementById("maiorano").value)
    min = parseInt(document.getElementById("menorano").value)
    let max1 = document.getElementById("maiorano")
    let min1 = document.getElementById("menorano")
    if(!max||max<2023){
        max1.value = 2023
    }
    slider.max = max
    slider.min = min
    atualizarGrafico()
}
function escolherminimo(){
    max = parseInt(document.getElementById("maiorano").value)
    min = parseInt(document.getElementById("menorano").value)
    let max1 = document.getElementById("maiorano")
    let min1 = document.getElementById("menorano")
    if(!min||min>1985){
        min1.value = 1985
    }
    atualizarGrafico()
    slider.max = max
    slider.min = min

}



function atualizarequacao(ano){
    var valoreq = 310000.000000/(1 +211126966384146673735047964243099624931328.000000 * Math.exp(-0.047789 * ano))
    document.getElementById('equacao').innerHTML = `  $$ \\textcolor{4BC0C0}{${valoreq.toFixed(2)}\\text{ha}} = \\frac{310000}{1 + 2.11 \\times 10^{41}  \\cdot e^{-0.047 \\times \\textcolor{4BC0C0}{${ano}}}} $$`
    renderMathInElement(document.getElementById('equacao'))

   
    var indice = anosoriginais.indexOf(ano)
   
    if(valoresoriginais[indice]){
        document.getElementById('esquecidisso').innerHTML = '<span class="vermelho" id="mb1"></span> em <span class="vermelho" id="mb2"></span>'
        var mb1= document.getElementById('mb1')
        var mb2= document.getElementById('mb2')
        mb2.innerHTML = '<span>'+ano+'</span>'
        mb1.innerHTML = '<span>'+valoresoriginais[indice]+'ha</span>'
     var porcentagem = Math.abs(valoresoriginais[indice] - valoreq)/valoresoriginais[indice]*100
     pcterro.innerHTML = `$$ \\textcolor{009bff}{${porcentagem.toFixed(2)}\\%} = \\frac{|\\textcolor{FF6384}{${valoresoriginais[anosoriginais.indexOf(ano)]}} - \\textcolor{4BC0C0}{${valoreq.toFixed(2)}}|}{\\textcolor{FF6384}{${valoresoriginais[anosoriginais.indexOf(ano)]}}} $$`;
     renderMathInElement(document.getElementById('pcterro'));

    }
    else{
        document.getElementById('esquecidisso').innerHTML = '<span class="vermelho" id="mb1"></span> -- <span class="vermelho" id="mb2"></span>'
        pcterro.innerHTML = '--'
    }
}





var slider = document.getElementById("slider")
var inputslider = document.getElementById("qualano")



function atualizarcomslider(){

    slider = document.getElementById("slider")
    inputslider = document.getElementById("qualano")

    inputslider.value = document.getElementById("slider").value
    grafico.options.plugins.annotation.annotations.line1.xMin = parseInt(inputslider.value)
    grafico.options.plugins.annotation.annotations.line1.xMax = parseInt(inputslider.value)
    grafico.update();

    
    atualizarequacao(parseInt(inputslider.value))
}





function atualizarcominput(){

    slider = document.getElementById("slider")
    inputslider = document.getElementById("qualano")
    max = parseInt(document.getElementById("maiorano").value)
    min = parseInt(document.getElementById("menorano").value)
    if(inputslider.value < min){
        inputslider.value = min
    }
    if(inputslider.value > max){
        inputslider.value = max
    }
    slider.value = inputslider.value
    grafico.options.plugins.annotation.annotations.line1.xMin = parseInt(slider.value)
    grafico.options.plugins.annotation.annotations.line1.xMax = parseInt(slider.value)
    grafico.update();

    atualizarequacao(parseInt(slider.value))
}



const valoresoriginais = [
    128427, 138074, 140968, 144212, 148403, 
    152945, 157265, 159600, 162371, 164714, 
    167548, 169683, 174467, 178769, 184578, 
    187935, 190342, 193852, 198333, 202730, 
    205636, 207996, 210519, 213885, 216977, 
    219942, 223457, 227166, 230027, 232178, 
    234750, 238167, 240970, 243456, 245712, 
    248032, 249807, 250407, 255354
  ]
const anosoriginais =[
    1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 
    1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 
    2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
];

gerardados()
gerarvaloresgrafico()
gerargrafico()
atualizarcomslider()
