import {generateID} from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`     
                <h1 class="page-title">Tasks List</h1>
                
                <div class="task-add">
                    <input class="task-add__title" type="text" placeholder="Task title">

                    <textarea class="task-add__description" type="text" placeholder="Task description"></textarea>
                    
                    <button class="task-add__btn-add button" disabled>Add Task</button>
                </div>       
                  
                <div class="tasks">
                    <div class="tasks-clear">
                        <div class="tasks-clear score-text">${this.numberOfTasksToHtml()}</div>
                    
                        <button class="tasks-clear__btn-clear button">Clear Tasks List</button>
                    </div>

                    <div class="tasks__list">
                        ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                    </div>
                </div>            
            `);
        });
    }

    refreshNumberOfTasks() {
        let tasksScoreContainer = document.getElementsByClassName('score-text')[0];
        tasksScoreContainer.innerHTML = this.numberOfTasksToHtml();
    }

    numberOfTasksToHtml() {
        if (this.tasks.length === 0) {
            return '<div>Tasks list is empty</div>';
        } else if (this.tasks.length === 1) {
            return `<div>There is <span class="score-sum">${this.tasks.length}</span> task</div>`;
        } else {
            return `<div>There are <span class="score-sum">${this.tasks.length}</span> tasks</div>`;
        }
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
			addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
            addTaskDescription = document.getElementsByClassName('task-add__description')[0],
            clearTasksListBtn = document.getElementsByClassName('tasks-clear__btn-clear')[0],
			tasksContainer = document.getElementsByClassName('tasks')[0],
			tasksList = document.getElementsByClassName('tasks__list')[0];

		addTaskTitle.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskTitle.value.trim());
        addTaskBtn.addEventListener('click', () => this.addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList));
        clearTasksListBtn.addEventListener('click', () => {
            if (confirm('Are you sure?')) {
                tasksList.innerHTML = '';
                this.tasks = [];
                Tasks.setTasksToLS(this.tasks);
                this.refreshNumberOfTasks();
            }
        });

		tasksContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch(true) {
                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(target.parentNode.parentNode);
                    break;
            }
        });
    }

    addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList) {
		const newTask = {
			id: generateID(),
			title: addTaskTitle.value.trim(),
            description: addTaskDescription.value.trim(),
			status: 'In Progress'
		};

        if (!newTask.description) {
            newTask.description = 'No Description';
        }

        this.tasks.push(newTask);

        Tasks.setTasksToLS(this.tasks);

        this.refreshNumberOfTasks();

		this.clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));
    }

    getTaskHTML(task) {
        return `
            <div class="task" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                    <a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a> 
                    <a class="task__btn-done button">Done</a> 
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn) {
		addTaskTitle.value = '';
        addTaskDescription.value = '';
        addTaskBtn.disabled = true;
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    removeTask(taskContainer) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            Tasks.setTasksToLS(this.tasks);

            taskContainer.remove();

            this.refreshNumberOfTasks();

        }
    }
}

export default AddAndList;