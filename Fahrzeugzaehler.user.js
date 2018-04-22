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
    var arrNames = [];

    var arrIDdivs = ["mission_vehicle_driving", "mission_vehicle_at_mission"];
    var strProfileLinkText = "";
    var strOutput = "";
    var intCountCars = 0;

    $.each(arrIDdivs, function(key, value){
        $('#'+ value +' > tbody > tr > td').each(function(){
            strProfileLinkText = $(this).children('small').children('a[href^="/profile/"]').text();
            if(!strProfileLinkText == 0) {
                for (var i = 0; i < arrNames.length; i++) {
                    if (arrNames[i].name === strProfileLinkText) { arrNames[i].count++; break; }
                }
                if(i === arrNames.length) arrNames.push({name:strProfileLinkText, count:1});
            }
        });
    });

    arrNames.sort(function(a, b) { return a.count < b.count; });

    if(arrNames.length > 0) {
        $.each(arrNames, function(index, value) { strOutput += "<tr><td style=\"text-align:right; padding: 0 5px;\">" + value.count + "x</td><td>" + value.name + "</td></tr>"; intCountCars += value.count; });
        $('#col_left').append('<div style="margin-top: 20px;"><h4>Anzahl der am Einsatz beteiligten Fahrzeuge pro Spieler:</h4><table>'+ strOutput +'</table><hr style="margin: 0px; width: 300px">'+ arrNames.length +' Spieler beteiligen sich mit '+ intCountCars +' Fahrzeugen</div>');
    }
});
