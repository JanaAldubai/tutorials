/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todo_item";
import { useAutofocus } from "../utils";

export class TodoList extends Component {
    static template = "awesome_owl.todo_list";
    static components = { TodoItem };

    setup() {
        this.nextId = 1;
        this.todos = useState([]);
        useAutofocus("input");
    }

    addTodo(ev) {
        if (ev.keyCode === 13) {
            let description = ev.target.value;
            if (description.trim()) {
                this.todos.push({ id: this.nextId++, description: description, isCompleted: false })
                ev.target.value = "";
            }
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find((elem) => elem.id === id);
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }

    removeTodo(id) {
        const index = this.todos.findIndex((elem) => elem.id === id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        }
    }
}