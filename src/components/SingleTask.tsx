import { Circle, Trash, CheckCircle } from 'phosphor-react'
import styles from './SingleTask.module.scss'

interface SingleTaskProps {
    id: string
    description: string
    isCompleted: boolean
    onChangeTask: (id: string) => void
    onDeleteTask: (id: string) => void
}

export function SingleTask({ id, description, isCompleted, onChangeTask, onDeleteTask }:SingleTaskProps) {
    function handleTaskStatusChange() {
        onChangeTask(id)
    }

    function handleDeleteTask() {
        onDeleteTask(id)
    }

    return (
        <div className={styles.task}>
            <div className={styles.taskDescription} onClick={handleTaskStatusChange} >
                {isCompleted === true ? <CheckCircle size={18} weight="fill" className={styles.checkCircle} /> : <Circle size={18} className={styles.circle} />}
                <p className={isCompleted === false ? '' : styles.lineThrough}>{description}</p>
            </div>
            <button className={styles.deleteTask} onClick={handleDeleteTask}>
                <Trash size={14} />
            </button>
        </div>
    )
}