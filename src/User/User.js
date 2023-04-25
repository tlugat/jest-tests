class User {
	constructor({ email, lastName, firstName, birthDate, password }) {
		this.email = email;
		this.lastName = lastName;
		this.firstName = firstName;
		this.birthDate = birthDate;
		this.password = password;
		this.todo = null;
	}

	setTodo = (todoId) => {
		this.setTodo = todoId;
	};
}

module.exports = User;
