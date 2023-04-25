const { v4: uuidv4 } = require("uuid");

class TodoItem {
	constructor({ name, content = "", createdAt }) {
		this.id = uuidv4();
		this.name = name;
		this.content = content;
		this.createdAt = createdAt || new Date();
	}

	getItems = () => {
		return this.items;
	};

	getName = () => {
		return this.name;
	};

	getContent = () => {
		return this.content;
	};

	getCreatedAt = () => {
		return this.createdAt;
	};
}

module.exports = TodoItem;
