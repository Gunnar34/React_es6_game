import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";

let inventory = [];

function buyItem() {
	console.log(this.index);
}

function sellItem() {
	console.log(this.index);
}

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s10 offset-s1 center-align">
						<h1>Hello!</h1>
					</div>
				</div>
			</div>
		);
	}
}

render(<App />, window.document.getElementById("app"));

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
		$interval(() => {
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
	expire() {
		if (this.category == "fruit") {
			if (vm.clickCounter >= 10) {
				expire = true;
				vm.clickCounter = 0;
			}
		}
	}
}

class Elec extends Commodity {
	constructor(name, img, category) {
		super(name, img, category);
	}
	setPrice() {
		super.setPrice();
	}
	changePrice() {
		$interval(() => {
			let z = randomNumber(0.1, 0.3);
			this.price += z;
		}, 15000);
	}
}

class Collect extends Commodity {}

function randomNumber(min, max) {
	return (mathNumber = Math.random() * (max - min));
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

const Test = ({ inventory }) =>
	<div className="row">
		{inventory.map((item, i) =>
			<div className="item" key={"item_" + i}>
				<div className="card hoverable col s3">
					<img onClick={buyItem} src={item.img} alt="" />
					<div className="container center-align">
						<h4 className="">
							{item.name}
						</h4>
						<p>
							Price: {item.price}
						</p>
						<p>
							Average price paid: {item.averageDisplay}
						</p>
						<p>
							Amount owned: {item.owned}
						</p>
						<button
							className="btn"
							data={item.index}
							onClick={sellItem}
							name="button"
						>
							Sell
						</button>
					</div>
				</div>
			</div>
		)}
	</div>;

ReactDOM.render(
	<Test inventory={inventory} />,
	document.getElementById("container")
);
