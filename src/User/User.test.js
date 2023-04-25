const Todo = require("../Todo/Todo");
const TodoItem = require("../TodoItem/TodoItem");
const User = require("./User");

const todo = new Todo({ name: "Todo 1" });
const todoItem = new TodoItem({
	name: "Todo 1",
	createdAt: "Tue Apr 25 2023 17:11:09 GMT+0200",
});
todo.setItem(todoItem);

test("User is valid", () => {
	const user = new User({
		email: "robin.sobasto@gmail.com",
		lastName: "Sobasto",
		firstName: "Robin",
		birthDate: "1997-02-09",
		password: "Abcd1234",
	});

	const isValid = (user) => {
		return (
			emailIsValid(user.email) &&
			lastNameIsValid(user.lastName) &&
			firstNameIsValid(user.firstName) &&
			birthDateIsValid(user.birthDate) &&
			passwordIsValid(user.password)
		);
	};

	emailIsValid = (email) => {
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
			throw new Error("Email is not valid");
		return true;
	};

	lastNameIsValid = (lastName) => {
		if (!lastName) throw new Error("Last name is not valid");
		return true;
	};

	firstNameIsValid = (firstName) => {
		if (!firstName) throw new Error("First name is not valid");
		return true;
	};

	birthDateIsValid = (birthDate) => {
		if (!birthDate.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))
			throw new Error("Birth date is not valid");

		const actualDate = new Date(birthDate);
		let treizeAnsAvant = new Date();
		treizeAnsAvant.setFullYear(treizeAnsAvant.getFullYear() - 13);

		if (actualDate > treizeAnsAvant) throw new Error("Age is not valid");

		return true;
	};

	passwordIsValid = (password) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
		if (!passwordRegex.test(password)) throw new Error("Password is not valid");

		return true;
	};

	const isUserValid = isValid(user);
	expect(isUserValid).toBeTruthy();
});

test("User can create todo", () => {
	const user = new User({
		email: "robin.sobasto@gmail.com",
		lastName: "Sobasto",
		firstName: "Robin",
		birthDate: "1997-02-09",
		password: "Abcd1234",
	});

	hasTodo = () => {
		if (user.todo) throw new Error("User has already a todo");
		return true;
	};

	const userCanCreateTodo = hasTodo();

	expect(userCanCreateTodo).toBeTruthy();
});

test("User can add item to todo", () => {
	// const user = new User({
	// 	email: "robin.sobasto@gmail.com",
	// 	lastName: "Sobasto",
	// 	firstName: "Robin",
	// 	birthDate: "1997-02-09",
	// 	password: "Abcd1234",
	// });

	const todoItem = new TodoItem({ name: "Todo 2" });

	isTodoNotFull = () => {
		if (todo.getItems().length === 10)
			throw new Error("Todo has too many items (10 max)");
		return true;
	};

	isItemContentValid = (content) => {
		if (content && content.length > 1000)
			throw new Error("Content is too long (1000 characters max.)");
		return true;
	};

	isItemCreatedAtValid = () => {
		const date = new Date();
		const todoItems = todo.getItems();
		const lastItemAddedDate = todoItems[todoItems.length - 1].getCreatedAt();
		const diff = (date - lastItemAddedDate) / (1000 * 60);

		if (diff < 30)
			throw new Error(`Last item is to recent. Wait ${30 - diff} minutes`);
	};

	isItemNameUnique = () => {
		const items = todo.getItems();
		const isNameUnique = items.every((item) => item.name !== todoItem.name);
		if (!isNameUnique) throw new Error("Name is not unique");

		return true;
	};

	isItemValid = () => {
		const todoIsEmpty = todo.getItems().length === 0;
		const isItemDateValid = !todoIsEmpty && isItemCreatedAtValid();
		const isItemNameValid = !todoIsEmpty && isItemNameUnique();

		return (
			isTodoNotFull() &&
			isItemContentValid() &&
			isItemDateValid &&
			isItemNameValid
		);
	};

	const userCanAddTodoItem = isItemValid();

	expect(userCanAddTodoItem).toBeTruthy();
});
