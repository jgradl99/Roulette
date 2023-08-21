var coins = 500;				//Startbetrag
var bidAmount = 0;				//Gebot
var colorNumber = 0;			//Farbe nummeriert (rot=1; grün=2; schwarz=3)
var color = "";					//Farbe als String
var number = 0;					//die zufällige Nummer
var colorNumberResult = 0;		//nummerierte Farbe der zufälligen Nummer (rot=1; grün=2; schwarz=3)
var winAmount = 0;				//gewonnener Betrag
var winGreen = 40;				//Multiplikator bei Resultat "Grün"
var winOtherColor = 2.5; 		//Multiplikator bei anderer Farbe (schwarz, rot)
wheelSpinned = false;			//benötigt zur Überprüfung
bidPressed = false;				//benötigt zur Überprüfung

document.getElementById("coinValue").innerHTML = "Coins: " + coins;				//Startmünzen anzeigen						
document.getElementById("startWheel").disabled = true;							//Button startWheel zu beginn nicht auswählbar

function setBid(bid) {															
	bidAmount = bid;															//setzt bidAmount auf das ausgewählte
	document.getElementById("bidAmount").innerHTML = "Bid:" + " " + bidAmount;	//updated den angeklickten Bietpreis
}

function setColor(cNum) {														
	colorNumber = cNum;															//colorNumber auf das ausgewählte setzen
	if (colorNumber == 1) {														//je nach dem, um welche Farbe es sich handelt, wird color gesetzt
		color = "red";
		updateColor("red");	
	}
	else if (colorNumber == 2) {
		color = "green";	
		updateColor("green");
	}
	else {
		color = "black";
		updateColor("black");
	}
}

function updateColor(color) {												
	document.getElementById("color").innerHTML = "Color: " + color;				//übergebene Farbe updaten
}

function bid() {
	bidPressed = true;
	removeButtons();															
	coins -= bidAmount;															//Münzen um gesetzten Betrag verringern
	if (coins < 0) {															//wenn bei diesem Vorgang die Münzen unter/gleich 0 gehen
		endGame();																//endGame() aufgerufen
	}
	else{
		updateCoins(coins);															//Münzanzeige aktualisieren
		document.getElementById("newBid").disabled = true;							//Button "Bid amount!" deaktivieren
		document.getElementById("startWheel").disabled = false;						//Button "Start wheel!" aktivieren
	}
}

function removeButtons() {							
	var x = document.getElementsByClassName("amountButtons");					//Bietbetrag- und Bietfarbe- Buttons werden hier unsichtbar gemacht 
	for (var i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
		
	var y = document.getElementsByClassName("bidButtons");
	for (var i = 0; i < y.length; i++) {
		y[i].style.display = "none";
	}
}

function showButtons() {
	var x = document.getElementsByClassName("amountButtons");					//Bietbetrag- und Bietfarbe- Buttons werden hier wieder sichtbar gemacht
	for (var i = 0; i < x.length; i++) {
		x[i].style.display = "flex";
	}	
	
	var y = document.getElementsByClassName("bidButtons");
	for (var i = 0; i < y.length; i++) {
		y[i].style.display = "flex";
	}
}

function startWheel() {
	if(bidAmount == 0){
		window.alert("You haven't set a bid amount!");							//keine Nummer generiert, wenn Eingabe nicht korrekt -> Bietbetrag fehlt
		resetBid();
	}
	else if(colorNumber == 0){
		window.alert("You haven't set a color!");								//keine Nummer generiert, wenn Eingabe nicht korrekt -> Bietfarbe fehlt
		resetBid();
	}
	else{
		wheelSpinned = true;													//da erfolgreich "gedreht" -> true
		randomNumber()															//zufällige Zahl bekommen
		document.getElementById("startWheel").disabled = true;					//Button "Start wheel!" wird deaktiviert
		if (colorNumber == colorNumberResult) {									//wenn die Nummer der ausgewählten Farbe und die Nummer der generierten Zahl
			if (colorNumber == 2) {												//und die ausgewählte Zahl 2 ist (=grün)
				winAmount = bidAmount * winGreen;								//winAmount(Gewinn) durch Multiplikation von Bietbetrag und Multiplikator
				coins += winAmount;												//Münzen um Gewinn erhöht
				updateCoins(coins);												//Münzen updaten
				document.getElementById("winAmount").innerHTML = "Result:" + " +" + winAmount;	//Ausgabe Höhe des Gewinnes
			}
			else {																//trifft bei allen Farbennummern außer Grün zu (1,3) für schwarz und rot
				winAmount = bidAmount * winOtherColor;							
				coins += winAmount;
				updateCoins(coins);
				document.getElementById("winAmount").innerHTML = "Result:" + " +" + winAmount;	//Ausgabe Höhe des Gewinnes
			}
		}
		else {
			document.getElementById("winAmount").innerHTML = "Result: " + bidAmount * -1;		//zeigt negativen Bietbetrag, da nicht gewonnen
		}
	}
}

function updateCoins(coins) {
	document.getElementById("coinValue").innerHTML = "Coins:" + " " + coins;			//Münzanzeige wird aktualisiert
}

function resetBid() {			
	showButtons();
	if(bidAmount != 0) {								//falls kein Wert hier gesetzt wurde							
		if(wheelSpinned == false) {						//und noch nicht "gedreht wurde"
			if(bidPressed == true){						//benötigt, sonst könnte man über "New bid" und Betrag Münzen dauerhaft bekommen 
				coins += bidAmount;						//gesetzten Münzen zurückerstattet, da nicht gedreht
				updateCoins(coins);
			}
		}
	}
	bidPressed = false;
	wheelSpinned = false;
	bidAmount = 0;																		//zurücksetzten aller Werte nach erfolgreichem "Drehen" oder abbruch
	colorNumber = 0;																	//beim Bieten
	color = "";
	number = "";
	document.getElementById("number").innerHTML = "Number: " + number;					//zurücksetzten auf Ausgangswert aller Ausgaben
	document.getElementById("bidAmount").innerHTML = "Bid: " + bidAmount;
	document.getElementById("color").innerHTML = "Color: " + color;
	document.getElementById("startWheel").disabled = true;								//benötigt, wenn beim Versuch vorher etwas vergessen wurde 
	document.getElementById("newBid").disabled = false;
	document.getElementById("winAmount").innerHTML = "Result: "							
	document.getElementById("number").style.color = 'violet';							//"Number" Schrifftfarbe auf violet (ursprung) gesetzt
}

function endGame() {
	var result = confirm("No coins left!" + "\n" + "Press OK to restart the game!");	//Browser alert Box
	if (result) {																		
		location.reload();																//-> bei OK wird die Seite neu geladen -> wieder vom Start beginnen
	}
}

function randomNumber() {
	number = Math.floor(Math.random() * 37);											//zufällige Zahl von 0-36 generiert
	if (number == 0) {																	//bei 0 Zahl ausgeben; Schrifftfarbe von "number" auf Grün gesetzt 
		document.getElementById("number").style.color = 'green';						
		document.getElementById("number").innerHTML = "Number:" + " " + number;
		colorNumberResult = 2;
	}
	else if (number % 2 == 0){															//gerade Zahlen auf rot gesetzt
		document.getElementById("number").style.color = 'red';
		document.getElementById("number").innerHTML = "Number:" + " " + number;
		colorNumberResult = 1;
	}
	else {																				//alles andere auf schwarz
		document.getElementById("number").style.color = 'black';
		document.getElementById("number").innerHTML = "Number:" + " " + number;
		colorNumberResult = 3;
	}
}		
