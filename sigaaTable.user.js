// ==UserScript==
// @name         tableSigaa
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://sigaa.unifei.edu.br/sigaa/portais/discente/discente.jsf
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var table = document.createElement('table');
    var tableParent = document.getElementsByClassName('subFormulario');
    var superiorParent = tableParent[0].parentElement;
    superiorParent.insertBefore(table, tableParent[0].parentElement.children[2]);    
    
    table.style.border = '1px solid black';
    table.style.textAlign = 'center';
    table.style.fontSize = 'xx-small';
    table.style.marginTop = '20px';
    table.style.marginBottom = '20px';
    table.style.background= 'transparent';
    
    let tableContents = {header:[], lefter:[], segunda:[], terca:[], quarta:[], quinta:[], sexta:[], sab:[]};  
    //Montando a parte esquerda
    for(var i =0; i < 15; i++){
        tableContents.lefter.push(table.insertRow(i));
    }
    
    for(var i =0; i < 15; i++){
        let dic = ['07:00', '07:55', '08:50', '10:10', '11:05', '13:30', '14:25',
                   '15:45', '16:40', '17:35', '19:00', '19:50', '21:00', '21:50', '22:40'];
        tableContents.lefter[i].insertCell(0).innerHTML = dic[i];
        tableContents.lefter[i].style.border = '1px solid black';
        tableContents.lefter[i].style.background= 'rgb(177, 200, 243)';
    }
    
    let headerComponent = table.createTHead();
    let headerRow = headerComponent.insertRow(0);    
    for(var i = 0; i < 7; i++){
        tableContents.header.push(headerRow.insertCell(i));
    }
    
    for(var i = 0; i < 7; i++){
        let dic = ['', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        tableContents.header[i].innerHTML = dic[i];       
        tableContents.header[i].style.border = '1px solid black';
        tableContents.header[i].style.background= 'rgb(177, 200, 243)';
    }
    
    //Definindo todos os dias
    for(var i = 0; i < 15; i++){
        tableContents.segunda.push(tableContents.lefter[i].insertCell(1));
        tableContents.segunda[i].style.border = '1px solid black';
        tableContents.segunda[i].style.background = '#EFF3FA';
    }
    
    for(var i = 0; i < 15; i++){
        tableContents.terca.push(tableContents.lefter[i].insertCell(2));
        tableContents.terca[i].style.border = '1px solid black';
        tableContents.terca[i].style.background = '#EFF3FA';
    }    
    
    for(var i = 0; i < 15; i++){
        tableContents.quarta.push(tableContents.lefter[i].insertCell(3));
        tableContents.quarta[i].style.border = '1px solid black';
        tableContents.quarta[i].style.background = '#EFF3FA';
    }
    
    for(var i = 0; i < 15; i++){
        tableContents.quinta.push(tableContents.lefter[i].insertCell(4));
        tableContents.quinta[i].style.border = '1px solid black';
        tableContents.quinta[i].style.background = '#EFF3FA';
    }
    
    for(var i = 0; i < 15; i++){
        tableContents.sexta.push(tableContents.lefter[i].insertCell(5));
        tableContents.sexta[i].style.border = '1px solid black';
        tableContents.sexta[i].style.background = '#EFF3FA';
    }
    
    for(var i = 0; i < 15; i++){
        tableContents.sab.push(tableContents.lefter[i].insertCell(6));
        tableContents.sab[i].style.border = '1px solid black';
        tableContents.sab[i].style.background = '#EFF3FA';
    }
    
    //Pega a tabela da pagina, separa, adiciona
    var tabelaDeHorarios = document.getElementsByTagName('table')[42];
    var linhasTabelaDeHorarios = [];
    
    for(var i = 1; i < tabelaDeHorarios.rows.length; i += 2){
        linhasTabelaDeHorarios.push(tabelaDeHorarios.rows[i]);
    }
    
    for(var i = 0; i < linhasTabelaDeHorarios.length; i++){
        //Sanitizar um pouco as entradas de horário/nome
        let horario = linhasTabelaDeHorarios[i].children[2].innerText;
        let nome = linhasTabelaDeHorarios[i].children[0].innerText;
        let onclick = linhasTabelaDeHorarios[i].children[0].children[0].children[2].onclick;
        
        horario = horario.replace('\n', '');
        
        if(horario.indexOf(' ') != -1)
        horario = horario.substring(0, horario.indexOf(' '));
        
     addNoDia(horario, nome, onclick);   
    }
    
    //Pega uma grade e adiciona no respectivo dia
    function addNoDia(grade, nomeDaMateria, onclick){
        let splitGrade = grade.split('');
        
        let indexMTN;
        let horaDoDia;
        if(splitGrade.indexOf('M') != -1){
            indexMTN = splitGrade.indexOf('M');
            horaDoDia = 'M';
        } else if(splitGrade.indexOf('T') != -1) {
            indexMTN = splitGrade.indexOf('T');
            horaDoDia = 'T';
        } else if(splitGrade.indexOf('N') != -1) {
            indexMTN = splitGrade.indexOf('N');
            horaDoDia = 'N';
        }
        
        let dias = grade.substring(0, indexMTN).split('');
        let horas = grade.substring(indexMTN + 1).split('');
       
        //Traduz o dia pro objeto
        for(var i = 0; i < dias.length; i++){
            let dic = ['','','segunda','terca','quarta','quinta','sexta','sab'];
            dias[i] = dic[parseInt(dias[i])];
        }
        
        //Soma ao tempo no dia
        for(var i = 0; i < horas.length; i++){
            horas[i] = parseInt(horas[i]);
            
            if(horaDoDia == 'T')
                horas[i] += 5;
            
            if(horaDoDia == 'N')
                horas[i] += 10;
        }
        
        console.log(dias);
        console.log(horaDoDia);
        console.log(horas);
        
        for(var i = 0; i < dias.length; i++){
            for(var j = 0; j < horas.length; j++){
                tableContents[dias[i]][horas[j] - 1].innerHTML = '<a href=\'#\'>' + nomeDaMateria + '<\a>';
                tableContents[dias[i]][horas[j] - 1].onclick = onclick;
                tableContents[dias[i]][horas[j] - 1].style.background= '#E6ECF7';
            }
        }
    }
    
    //Depois de adicionado, checar se ficou alguma linha vazia, se ficou, remover
    //console.log(table.rows);    
    for(var i = 1; i < table.rows.length; i++){
        let isPopulada = false;
        let thisRow = table.rows[i];
        for(var j = 1; j < 7; j++)
            if(thisRow.children[j].innerText != "")
                isPopulada = true;

        if(!isPopulada){
            table.deleteRow(i);
            i--;
        }
    }
})();
