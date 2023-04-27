class User {
	constructor({ email, lastname, firstname, birthdate, password }) {
		this.email = email;
		this.lastname = lastname;
		this.firstname = firstname;
		this.birthdate = birthdate;
		this.password = password;
		this.todo = null;
	}

	setTodo = (todoId) => {
		this.setTodo = todoId;
	};

	getEmail = () => {
		return this.email;
	};
	getFirstname = () => {
		return this.firstname;
	};
	getLastname = () => {
		return this.lastname;
	};
	getBirthdate = () => {
		return this.birthdate;
	};
	getPassword = () => {
		return this.password;
	};
}

module.exports = User;
