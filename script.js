const ohtml = document.getElementById('conteudo');
const htmlCelular = `

<div class="grafico"><canvas id="grafico"></canvas></div>

<espacito></espacito><input oninput="atualizarcomslider()" type="range" id="slider" class="slider" min="1970" max="2050" value="2023" step="1">
<br>
<div id="div1" style="margin-bottom: 3px;">
  <input type="number" id="qualano" default="2023" onchange="atualizarcominput()">
</div>

<div id="div1">
  <input type="number" id="menorano" onchange="escolherminimo()" style="margin-right: 7px;">
  <div class="arrow"></div>
  <input type="number" id="maiorano" onchange="escolhermaximo()" style="margin-left: 7px;">
</div>

<br>

<span style="padding: 5px; font-weight: bold;">Equação:</span>
<p id="equacao"></p>

<br>
<span id="dadosmb"></span>
<br>
<br>

<span style="padding: 5px; font-weight: bold;">Dados do <a href="https://plataforma.brasil.mapbiomas.org/cobertura?activeBaseMap=9&layersOpacity=100&activeModule=coverage&activeModuleContent=coverage%3Acoverage_main&activeYear=2023&mapPosition=-15.072124%2C-51.459961%2C4&timelineLimitsRange=1985%2C2023&baseParams[territoryType]=1&baseParams[territory]=10001&baseParams[territories]=10001%3BBrasil%3B1%3BPa%C3%ADs%3B0%3B0%3B0%3B0&baseParams[activeClassTreeOptionValue]=default&baseParams[activeClassTreeNodeIds]=1%2C7%2C8%2C9%2C10%2C11%2C2%2C12%2C13%2C14%2C15%2C16%2C3%2C18%2C19%2C28%2C30%2C31%2C32%2C33%2C34%2C29%2C35%2C36%2C37%2C38%2C20%2C21%2C4%2C22%2C23%2C24%2C25%2C5%2C26%2C27%2C6&baseParams[activeSubmodule]=coverage_main&baseParams[yearRange]=1985-2023">MapBiomas <img src="imagens/MapBiomas.png" style="height: 14px;" alt="" ></a>:</span>
<br><br>
<span id="esquecidisso">
  <span class="vermelho" id="mb1"></span> em <span class="vermelho" id="mb2"></span>
</span>

<br><br><br>
<span id="dadosmb"></span>
<br><br>

<span style="padding: 5px; font-weight: bold;">Porcentagem de erro:</span>
<br>
<p id="pcterro"></p>
<br><br>
<span id="dadosmb" style="width: 85%;"></span>
`;

const htmlPc = `

<div class="divmestra">
<div class ='esquerda'>


<div class="grafico"><canvas id="grafico"></canvas></div>
<espacito></espacito><input oninput="atualizarcomslider()" type="range" id="slider" class="slider" min="1970" max="2050" value="2023" step="1">
<br>
<br>
<div id="div1">
  <input type="number" id="menorano" onchange="escolherminimo()" style="margin-right: 7px;">
  <div class="arrow" style="width: 300px;"></div>
  <input type="number" id="maiorano" onchange="escolhermaximo()" style="margin-left: 7px;">
</div>
<br>
<div id="div1" style="margin-bottom: 3px;">
  <input type="number" id="qualano" default="2023" onchange="atualizarcominput()">
</div>

</div>
<div class="direita">






<br>

<span style="padding: 5px; font-weight: bold;">Equação:</span>
<p id="equacao"></p>

<br>
<span id="dadosmb"></span>
<br>
<br>

<span style="padding: 5px; font-weight: bold;">Dados do <a href="https://plataforma.brasil.mapbiomas.org/cobertura?activeBaseMap=9&layersOpacity=100&activeModule=coverage&activeModuleContent=coverage%3Acoverage_main&activeYear=2023&mapPosition=-15.072124%2C-51.459961%2C4&timelineLimitsRange=1985%2C2023&baseParams[territoryType]=1&baseParams[territory]=10001&baseParams[territories]=10001%3BBrasil%3B1%3BPa%C3%ADs%3B0%3B0%3B0%3B0&baseParams[activeClassTreeOptionValue]=default&baseParams[activeClassTreeNodeIds]=1%2C7%2C8%2C9%2C10%2C11%2C2%2C12%2C13%2C14%2C15%2C16%2C3%2C18%2C19%2C28%2C30%2C31%2C32%2C33%2C34%2C29%2C35%2C36%2C37%2C38%2C20%2C21%2C4%2C22%2C23%2C24%2C25%2C5%2C26%2C27%2C6&baseParams[activeSubmodule]=coverage_main&baseParams[yearRange]=1985-2023">MapBiomas <img src="imagens/MapBiomas.png" style="height: 14px;" alt="" ></a>:</span>
<br><br>
<span id="esquecidisso">
  <span class="vermelho" id="mb1"></span> em <span class="vermelho" id="mb2"></span>
</span>

<br><br><br>
<span id="dadosmb"></span>
<br><br>

<span style="padding: 5px; font-weight: bold;">Porcentagem de erro:</span>
<br>
<p id="pcterro"></p>
<br><br>

  
  </div>

</div>
`;
    
if (window.innerWidth <= 768) {
    ohtml.innerHTML = htmlCelular
} else {

    ohtml.innerHTML = htmlPc
}
function atualizarbody(){
    

        max = document.getElementById("maiorano")
        min = document.getElementById("menorano")
        max.value = 2050
        min.value = 1970

        equacao = document.getElementById('equacao')
        pcterro = document.getElementById('pcterro')
        ctx = document.getElementById('grafico').getContext('2d')
        slider = document.getElementById("slider")
        inputslider = document.getElementById("qualano")

        

        gerardados()
        gerarvaloresgrafico()
        gerargrafico()
        atualizarcomslider()
    }
 
 
        
 window.addEventListener('resize',  atualizarbody)
 window.addEventListener('orientationchange', atualizarbody);





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
    document.getElementById('equacao').innerHTML = `  $$ \\textcolor{4BC0C0}{${valoreq.toFixed(2)}\\text{ ha}} = \\frac{310000}{1 + 2.11 \\times 10^{41}  \\cdot e^{-0.047 \\times \\textcolor{4BC0C0}{${ano}}}} $$`
    renderMathInElement(document.getElementById('equacao'))

   
    var indice = anosoriginais.indexOf(ano)
   
    if(valoresoriginais[indice]){
        document.getElementById('esquecidisso').innerHTML = '<span class="vermelho" id="mb1"></span> em <span class="vermelho" id="mb2"></span>'
        var mb1= document.getElementById('mb1')
        var mb2= document.getElementById('mb2')
        mb2.innerHTML = '<span>'+ano+'</span>'
        mb1.innerHTML = '<span>'+valoresoriginais[indice]+' ha</span>'
     var porcentagem = Math.abs(valoresoriginais[indice] - valoreq)/valoresoriginais[indice]*100
     pcterro.innerHTML = `$$ \\textcolor{009bff}{${porcentagem.toFixed(2)}\\%} = \\frac{|\\textcolor{FF6384}{${valoresoriginais[anosoriginais.indexOf(ano)]}} - \\textcolor{4BC0C0}{${valoreq.toFixed(2)}}|}{\\textcolor{FF6384}{${valoresoriginais[anosoriginais.indexOf(ano)]}} } \\times 100 $$`;
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
