import { ClipboardText, PlusCircle } from 'phosphor-react'
import { SingleTask } from './SingleTask'
import { v4 as uuidv4 } from 'uuid'
import styles from './Tasks.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Task {
    id: string
    description: string
    isCompleted: boolean
}

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskText, setNewTaskText] = useState('')
    const [completedTasks, setCompletedTasks] = useState<Task[]>([])

    function handleCrateNewTask(event: FormEvent) {
        event.preventDefault()

        const task = {
            id: uuidv4(),
            description: newTaskText,
            isCompleted: false
        }

        setTasks([...tasks, task])

        setNewTaskText('')
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value)
    }

    function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Impossível criar uma tarefa vazia!')
    }

    function changeTaskStatus(id: string) { 
        let taskToChange = tasks.filter(task => task.id === id)
        
        if(taskToChange[0] === undefined) {
            taskToChange = completedTasks.filter(task => task.id === id)
            const newCompletedTasks = completedTasks.filter(task => task.id !== id)
            taskToChange[0].isCompleted = false
            setTasks([...tasks, taskToChange[0]])
            setCompletedTasks(newCompletedTasks)
            return
        }

        const uncompletedTasks = tasks.filter(task => task.id !== id)
        taskToChange[0].isCompleted = true
        setCompletedTasks([...completedTasks, taskToChange[0]])
        setTasks(uncompletedTasks)
    }

    function deleteTask(id: string) {
        let taskToChange = tasks.filter(task => task.id === id)
        
        if(taskToChange[0] === undefined) {
            const newCompletedTasks = completedTasks.filter(task => task.id !== id)
            setCompletedTasks(newCompletedTasks)
            return
        }

        const uncompletedTasks = tasks.filter(task => task.id !== id)
        setTasks(uncompletedTasks)
    }

    const isNewTaskEmpty = newTaskText.length === 0

    return (
        <div>
            <form onSubmit={handleCrateNewTask} className={styles.form}>
                <input 
                    required 
                    onChange={handleNewTaskChange} 
                    value={newTaskText} 
                    type="text" 
                    placeholder="Adicione uma nova tarefa" 
                    onInvalid={handleNewTaskInvalid}
                />
                <button type="submit" disabled={isNewTaskEmpty}>
                    Criar
                    <PlusCircle size={16}/>
                </button>
            </form>

            <section className={styles.tasks}>
                <div className={styles.tasksCount}>
                    <div className={styles.created}>
                        <strong>Tarefas criadas</strong>
                        <span>{tasks.length + completedTasks.length}</span>
                    </div>
                    <div className={styles.concluded}>
                        <strong>Concluídas</strong>
                        <span>{completedTasks.length === 0 ? 0 : `${completedTasks.length} de ${tasks.length + completedTasks.length}`}</span>
                    </div>
                </div>

                <div className={styles.tasksList}>
                    <div className={styles.tasksToComplete}>
                        {(tasks.length + completedTasks.length) === 0 
                            ? <div className={styles.tasksListEmpty}>
                                <ClipboardText size={56} />
                                <strong>Você ainda não tem tarefas cadastradas</strong>
                                <p>Crie tarefas e organize seus itens a fazer</p>
                            </div>

                            : tasks.map(task => {
                                return (
                                    <SingleTask 
                                        key={task.id} 
                                        id={task.id} 
                                        description={task.description} 
                                        isCompleted={task.isCompleted}
                                        onChangeTask={changeTaskStatus}
                                        onDeleteTask={deleteTask}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className={styles.completedTasks}>
                        {completedTasks.map(task => {
                            return (
                                <SingleTask 
                                    key={task.id} 
                                    id={task.id} 
                                    description={task.description} 
                                    isCompleted={task.isCompleted} 
                                    onChangeTask={changeTaskStatus}
                                    onDeleteTask={deleteTask}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}