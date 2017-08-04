import React from "react";
import ReactDOM from "react-dom";
import {
	render
} from "react-dom";

let inventory = [];
let balance = 100;
let gameStop = true;
let clickCounter = 0;
let expire = false;

function startGame() {
	console.log('start');
	for (let item of inventory) {
		balance = 100;
		gameStop = false;
		console.log('item');
		item.setPrice();
		item.changePrice();
	};
	setTimeout(function() {
		gameStop = true;
		alert('Game Over!');
	}, 900000);
}

function buyItem(i) {
  console.log('buy', i, gameStop);
	if (!gameStop) {
		let item = inventory[i];
		if (balance >= item.price) {
			balance -= item.price;
			item.owned++;
			averager(i)
		}
		clickCounter++;
	}
}

function sellItem(i) {
  console.log('sell', i, gameStop);
	if (!gameStop) {
		let item = inventory[i];
		if (item.owned > 0) {
			item.owned--;
			balance += item.price;
		}
		clickCounter++;
	}
}

function averager(i) {
	let item = inventory[i];
	item.pricesArray.push(item.price);
	let sum = item.pricesArray.reduce((previous, current) => current += previous);
	item.averageDisplay = sum / item.pricesArray.length;
}

class App extends React.Component {
	render() {
		return (
      <div className="container">
			   <div className="row">
			      <div className="col s10 offset-s1 center-align">
			         <h1> Buy Commodities! </h1>
               <button className = "btn" onClick = {() => startGame()}> start game </button>
            </div>
        </div>
      </div >
		);
	}
}

render( < App / > , window.document.getElementById("app"));

class Commodity {
	constructor(name, img, category) {
		this.price = 0;
		this.name = name;
		this.img = img;
		this.category = category;
		this.pricesArray = [];
		this.averageDisplay = 0;
		this.owned = 0;
	} //constructor end
	setPrice() {
		this.price += randomNumber(0.5, 9.99);
	}
	changePrice() {
		setInterval(() => {
			let x = randomNumber(0, 9);
			if (x >= 5) {
				let z = randomNumber(0.1, 0.9);
				this.price += z;
				if (this.price >= 9.99) {
					this.price -= z;
					this.price -= randomNumber(0.1, 0.9);
				}
			} else {
				let y = randomNumber(0.1, 0.9);
				this.price -= y;
				if (this.price <= 0.5) {
					this.price += y;
					this.price += randomNumber(0.1, 0.9);
				}
			}
			console.log(this.price);
		}, 15000);
	}
} //class end

class Fruit extends Commodity {
	constructor(name, img, category) {
		super(name, img, category);
	}
	setPrice() {
		super.setPrice();
	}
	changePrice() {
		super.changePrice();
	}
};

class Elec extends Commodity {
	constructor(name, img, category) {
		super(name, img, category);
	}
	setPrice() {
		super.setPrice();
	}
	changePrice() {
		setInterval(() => {
			let z = randomNumber(0.1, 0.3);
			this.price += z;
		}, 15000);
	}
};

class Collect extends Commodity {}

function randomNumber(min, max) {
	let mathNumber = Math.random() * (max - min);
	return mathNumber;
}

const fruitArray = [
	["apple", "images/apple.png", "fruit"],
	["orange", "images/orange.png", "fruit"],
	["banana", "images/bananas.png", "fruit"],
	["grapes", "images/grapes.png", "fruit"]
];
const elecArray = [
	["lamp", "images/lamp.png", "Small electronic"],
	["clock", "images/clock.png", "Small electronic"],
	["toaster", "images/toaster.png", "Small electronic"],
	["blue ray player", "images/blu-ray-player.png", "Small electronic"]
];
const collectArray = [
	["comic book", "images/comic-books.png", "collectible"],
	["fancy stuffed animal", "images/stuffed-animal.png", "collectible"],
	["jewelry", "images/jewelry.png", "collectible"],
	["wine", "images/wine.png", "collectible"]
];

for (let commodity of fruitArray) {
	let fruit = new Fruit(...commodity);
	inventory.push(fruit);
}
for (let commodity of elecArray) {
	let elec = new Elec(...commodity);
	inventory.push(elec);
}
for (let commodity of collectArray) {
	let collect = new Collect(...commodity);
	inventory.push(collect);
}
for (var i = 0; i < inventory.length; i++) {
	inventory[i].index = i;
}

setInterval(function(){
  var Test = ({inventory}) =>
    <div className = "row" > {
      inventory.map((item, i) =>
        <div className="item"key = {"item_" + i}>
           <div className="card col s3">
              <img src = {item.img}alt = ""/>
              <div className="container center-align">
                 <h4 className=""> {item.name}</h4>
                 <p>Price: {item.price} </p>
                 <p>Average price paid: {item.averageDisplay}</p>
                 <p>Amount owned: {item.owned}</p>
                 <button className="btn" onClick={() => sellItem(i)} name = "button" >Sell </button>
                 <button className="btn" onClick={() => buyItem(i)} name = "button" >Buy </button>
              </div>
           </div>
        </div>
      )
    }
  </div>;

  ReactDOM.render( <Test inventory = {inventory}/>, document.getElementById("container"));
    ( <Test inventory = {inventory} />, document.getElementById("container") );
}, 500);
