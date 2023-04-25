const { v4: uuidv4 } = require("uuid");

class Todo {
	constructor({ name }) {
		this.id = uuidv4();
		this.items = [];
		this.name = name;
		this.createdAt = new Date();
	}

	setItem = (item) => {
		this.items = [...this.items, item];
	};

	getItems = () => {
		return this.items;
	};

	getName = () => {
		return this.name;
	};

	getCreatedAt = () => {
		return this.createdAt;
	};
}

module.exports = Todo;
