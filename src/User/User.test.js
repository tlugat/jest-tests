const Todo = require("../Todo/Todo");
const TodoItem = require("../TodoItem/TodoItem");
const User = require("./User");

const todo = new Todo({ name: "Todo 1" });

for (let i = 1; i <= 9; i++) {
	const todoItem = new TodoItem({
		name: "TodoItem " + i,
		createdAt: `Tue Apr ${i} 2023 17:11:09 GMT+0200`,
	});
	todo.addItem(todoItem);
}

describe("User can create todo", () => {
	const user = new User({
		email: "robin.sobasto@gmail.com",
		lastName: "Sobasto",
		firstName: "Robin",
		birthDate: "1997-02-09",
		password: "Abcd1234",
	});

	test("User should not have a todo", () => {
		expect(user.todo).toBeFalsy();
	});
});

describe("User can add item to todo", () => {
	const todoIsEmpty = todo.getItems().length === 0;
	const todoItem = new TodoItem({
		name: "Todo 2",
		content: "Non cillum aliqua dolore sit nisi commodo.",
	});

	describe("User is valid", () => {
		const user = new User({
			email: "robin.sobasto@gmail.com",
			lastname: "Sobasto",
			firstname: "Robin",
			birthdate: "1997-02-09",
			password: "Abcd1234",
		});

		test("Lastname should be defined", () => {
			expect(user.getLastname()).toBeTruthy();
		});

		test("Firstname should be defined", () => {
			expect(user.getFirstname()).toBeTruthy();
		});

		test("Email should be valid", () => {
			expect(user.getEmail()).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		});

		test("Password should be valid", () => {
			expect(user.getPassword()).toMatch(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/
			);
		});

		test("Birthdate should be valid", () => {
			expect(user.getBirthdate()).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
		});

		test("User should be at least 13 years old", () => {
			const birthDate = new Date(user.getBirthdate());
			const now = new Date();
			const ageInYears = now.getFullYear() - birthDate.getFullYear();
			if (
				now.getMonth() < birthDate.getMonth() ||
				(now.getMonth() === birthDate.getMonth() &&
					now.getDate() < birthDate.getDate())
			) {
				ageInYears--;
			}
			expect(ageInYears).toBeGreaterThanOrEqual(13);
		});
	});

	test("Todo should not be full", () => {
		expect(todo.getItems().length).toBeLessThan(10);
	});
	test("Content should not be greater than 1000 characters", () => {
		expect(todoItem.getContent().length).toBeLessThanOrEqual(1000);
	});
	!todoIsEmpty &&
		test("Should have wait at least 30min to add new item", () => {
			const date = new Date();
			const todoItems = todo.getItems();
			const lastItemAddedDate = new Date(
				todoItems[todoItems.length - 1].getCreatedAt()
			);
			const diff = (date - lastItemAddedDate) / (1000 * 60);
			expect(diff).toBeGreaterThanOrEqual(30);
		});
	test("Name should be unique", () => {
		const items = todo.getItems();
		const isNameUnique = items.every((item) => item.name !== todoItem.name);
		expect(isNameUnique).toBeTruthy();
	});
});
