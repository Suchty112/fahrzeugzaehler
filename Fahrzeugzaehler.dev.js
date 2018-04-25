// ==UserScript==
// @name         Fahrzeugzähler
// @version      1
// @description  Zählt die Fahrzeuge auf Anfahrt und vor Ort von jedem am Einsatz teilnehmenden Kameraden
// @author       Allure149
// @include      *://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==
/* global $ */

$(function() {
    'use strict';

    const arrIDDivs = ["mission_vehicle_driving", "mission_vehicle_at_mission"];
    const arrIDCars = ["LF 20", "LF 10", "DLK 23", "ELW 1", "RW", "GW-A", "LF 8/6", "LF 20/16", "LF 10/6", "LF 16-TS", "GW-Öl", "GW-L2-Wasser", "GW-Messtechnik", "SW 1000", "SW 2000", "SW 2000-Tr", "SW Kats", "TLF 2000", "TLF 3000", "TLF 8/18", "TLF 8/18", "TLF 16/24-Tr", "TLF 16/25", "TLF 16/45", "TLF 20/40", "TLF 20/40-SL", "TLF 16", "GW-Gefahrgut", "RTW", "NEF", "HLF 20", "RTH", "FuStW", "GW-Höhenrettung", "ELW 2", "leBefKw", "MTW", "TSF-W", "KTW", "GKW", "MTW-TZ", "MzKW", "LKW K 9", "BRmG R", "Anh DLE", "MLW 5", "WLF", "AB-Rüst", "AB-Atemschutz", "AB-Öl", "GruKw", "FüKw", "GefKw", "Dekon-P", "AB-Dekon-P", "KdoW-LNA", "KdoW-Orgl", "FwK", "KTW Typ B", "ELW 1 (SEG)", "GW-San", "Polizeihubschrauber", "AB-Schlauch"];
    let arrNames = [];
    let arrCars = [];
    let intVehicleId = 0;
    let intCountCars = 0;
    let intTemp = 0;
    let strTemp = {};
    let strOutput = "";
    let strProfileLinkText = "";
    let intGetNamePos = -1;
    let intGetCarPos = -1;
    let inttest = "";
    let int1 = 0;
    let int2 = 0;
    let intArrNamesLength = 0;
    let intArrNamesCarLength = 0;
    let intCarsId = {};
    let intCarsCount = 0;

    if($('div[class="btn-group"] > a[id="mission_alliance_share_btn"]').length > 0) return false;

    $.each(arrIDDivs, function(index, value) {
        $('#'+ value +' > tbody > tr > td').each(function() {
            intVehicleId = $(this).children('a').attr('vehicle_type_id');
            if(intVehicleId == "undefined") intVehicleId = null;

            console.log("Durchgaenge = " + intTemp++);
            console.log(strProfileLinkText);
            strProfileLinkText = "";
            strProfileLinkText = $(this).children('small').children('a[href^="/profile/"]').text();
            console.log(strProfileLinkText); //richtig
            if(!strProfileLinkText == 0) {
                intGetNamePos = -1;
                intGetCarPos = -1;

                //if(arrNames.length == 0) intGetNamePos = -1;
                //else intGetNamePos = $.each(arrNames, function(idx1, val1) { if(val1.name == strProfileLinkText) return idx1; });

                console.log(strProfileLinkText); //richtig
                for (var i = 0; i < arrNames.length; i++){
                    if(arrNames[i].name == strProfileLinkText) {
                console.log(strProfileLinkText);
                        intGetNamePos = i;
                        console.log(arrNames[i].name + " > " + strProfileLinkText + " > ID: " + i + " arrNames.length = " + arrNames.length);
                        if(typeof arrNames[1] === 'undefined') {console.log("arrNames[1] = leer")} else {console.log("arrNames[1] = " + arrNames[1].name); };
                        if(typeof arrNames[2] === 'undefined') {console.log("arrNames[2] = leer")} else {console.log("arrNames[2] = " + arrNames[2].name); };
                        if(typeof arrNames[3] === 'undefined') {console.log("arrNames[3] = leer")} else {console.log("arrNames[3] = " + arrNames[3].name); };
                        if(typeof arrNames[4] === 'undefined') {console.log("arrNames[4] = leer")} else {console.log("arrNames[4] = " + arrNames[4].name); };
                        if(typeof arrNames[5] === 'undefined') {console.log("arrNames[5] = leer")} else {console.log("arrNames[5] = " + arrNames[5].name); };
                        break;
                    }
                }
                intGetNamePos = -1;
                if(intGetNamePos > -1) {
                    //if(arrNames[intGetNamePos].cars.length == 0) intGetCarPos = -1;
                    //else intGetCarPos = $.each(arrNames[intGetNamePos].cars, function(idx2, val2) { if(val2.id == intVehicleId) return idx2; });

                    //arrNames[intGetNamePos].cars_total++;

                    for (var j = 0; j < arrNames[intGetNamePos].cars.length; j++){
                        //if(arrNames[intGetNamePos].cars[j].id == intVehicleId) intGetCarPos = j; break;
                    }

                    if(intGetCarPos > -1) {
                        //arrNames[intGetNamePos].cars[intGetCarPos].count++; arrNames[intGetNamePos].cars_total++;
                    } else {
                        //arrNames[intGetNamePos].cars.push({id:intVehicleId, count:1}); arrNames[intGetNamePos].cars_total++;
                    }
                } else {
                    //arrNames.push({name:strProfileLinkText, cars:[{id:intVehicleId, count:1}], cars_total:1});

                    intCarsId.id = 0; //intVehicleId
                    intCarsId.count = 1;
                    arrCars.push(intCarsId);

                    strTemp.name = strProfileLinkText;
                    strTemp.cars = arrCars;
                    strTemp.cars_total = 1;
                    console.log(strProfileLinkText);
                    arrNames.push(strTemp);
                }
            }
        });
    });

    //arrNames.sort(function(a, b) { return a.count < b.count; });

    if(arrNames.length > 0) {
        $.each(arrNames, function(index, value) {
            strTemp = "";
            //$.each(value.cars, function(i, v) {
            //    strTemp += v.count + "x " + arrIDCars[v.id] + ', ';
            //});

            strOutput += "<tr><td style=\"text-align:left; padding: 0 5px;\">" + value.cars_total + "x</td><td style=\"text-align:right; padding: 0 5px;\">" + value.name + "</td><td>" + strTemp + "</td></tr>";
        });
        $('#col_left').append('<div style="margin-top: 20px;"><h4>Anzahl der am Einsatz beteiligten Fahrzeuge pro Spieler:</h4><table>'+ strOutput +'</table><hr style="margin: 0px; width: 300px">'+ arrNames.length +' Spieler beteiligen sich mit '+ intCountCars +' Fahrzeugen</div>');
    }
});
