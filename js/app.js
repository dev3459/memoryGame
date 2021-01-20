//Recovery of all my images with the name btnBox
const btn = document.getElementsByClassName('btnBox');

//Creation of 4 tables, one with a function for the randomly generated
let btnAncien = [];
let arrayGame = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let arrayResultat = generateArrayRandom();
let oldSelection = [];

//Creation of integers for button management
let idBtn = 0;
let nbAffiche = 0;

//Creating the counter for the number of pairs
let compteurPaire = 0;

//Creation of a boolean to know if we can click on a box or if it is calculating
let ready = true;

//Starting initialization
init();

//Function to create my images
function createBtn(src){
	let create = document.createElement('input');
	create.type = "image";
	create.className = "btnBox";
	create.src = src;
	create.id = idBtn;
	document.querySelector('#result').append(create);
	idBtn++;
}

//Initialization function to create as many images as there are in the arrayGame array plus call to the displayArray function
function init(){
	for(let i = 0; i < arrayGame.length; i++){
		createBtn("./img/default.png");
	}

	displayArray();
}

//Function that updates the image sources for each element
function displayArray(){
	for(let i = 0; i < arrayGame.length; i++){
		if(arrayGame[i] === 0){
			btn[i].src = "./img/default.png";
		}else{
			btn[i].src = "./img/" + arrayGame[i] + ".jpg";
		}
	}
}

//Check function which counts how many sound cards returned and if there are 2 cards then this calculates if they are identical or not
function verif(numero){
	if(ready){
		nbAffiche++;
		
		arrayGame[numero] = arrayResultat[numero];
		displayArray();
	
		if(nbAffiche > 1){
			ready = false;

			setTimeout(() => {
				if(arrayGame[numero] !== arrayResultat[oldSelection[0]]){
					arrayGame[numero] = 0;
					arrayGame[oldSelection[0]] = 0;
					btn[btnAncien[0]].disabled = false;
					btn[btnAncien[1]].disabled = false;
				}else{
					compteurPaire += 2;
					document.getElementById('paire').innerHTML = compteurPaire / 2;
					if(compteurPaire === 16){
						new WindowModal("Félicitations !", "Vous avez gagner ... le droit de rejouer ;-P").initElement();
					}
				}
				displayArray();
				ready = true;

				btnAncien = [];
				nbAffiche = 0;
				oldSelection = [numero];
			}, 1000);
		}else{
			oldSelection = [numero];
		}
	}
}

//Function that returns the creation of a random array
function generateArrayRandom(){
	let tab = [];
	let nbImagePosition = [0,0,0,0,0,0,0,0];
	
	for(let i = 0; i < arrayGame.length; i++){
		let fin = false;
		while(!fin){
			let randomImg = Math.floor(Math.random() * 8);
			if(nbImagePosition[randomImg] < 2){
				tab.push(randomImg + 1);
				nbImagePosition[randomImg]++;
				fin = true;
			} 
		}
	}
	
	return tab;
}

//Event when clicking on a button that calls the verif function
for(let i = 0; i < arrayGame.length; i++){
	btn[i].addEventListener('click', ()=>{
		if(btn[i].disabled === false && btnAncien.length < 2){
			verif(parseInt(btn[i].id));
			btn[i].disabled = true;
			btnAncien.push(btn[i].id);				
		}
	});
}

//Event during buttons for modal window
function btnFunction(){
    let btnClose = document.getElementsByTagName('button')[1]
    btnClose.addEventListener('click',function(){
		new WindowModal(null,null).close();
		let create = document.createElement("button");
		create.id = "btnReplay";
		create.innerHTML = "Rejouer";
		create.addEventListener('click', replay);
		document.getElementById('result').append(create);
    });

    let btnAccept = document.getElementsByTagName('button')[0]
    btnAccept.addEventListener('click',function(){
		replay();
		new WindowModal(null,null).close();
    });
}

//Function that allows you to replay
function replay(){
	nbAffiche = 0;
	oldSelection = [];
	for(let i = 0; i < arrayGame.length; i++){
		arrayGame[i] = 0;
		btn[i].disabled = false;
	}
	displayArray();
	arrayResultat = generateArrayRandom();
	compteurPaire = 0;
	document.getElementById('paire').innerHTML = 0;
	btnAncien = [];
	if(document.getElementById('btnReplay')){
		document.getElementById('btnReplay').remove();
	}
}