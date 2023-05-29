import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './TaskItem.module.scss';

function TaskItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTaskTitle = async () => {
    const newTitle = prompt("Update the task:", task.title);
    if(newTitle) {
      try {
        setIsLoading(true);
        await axios.put(`/api/tasks/${task._id}`, {
          title: newTitle
        });
        setIsCompleted(!isCompleted);
        toast.success('Task updated successfully');
        task.title = newTitle;
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteTask = async ()=> {
    const confirmation = confirm("Delete this task?")
    if(confirmation) {
      try {
        setIsLoading(true);
        await deleteTask(task)
        toast.success('Task deleted');
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onClick={handleCheckboxClick}>
          <input type="checkbox" defaultChecked={isCompleted} disabled={isLoading} />
        </div>
        <p>{task.title}</p>
      </td>
      <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td>{moment(task.createdAt).format('MMM Do YY')}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={handleUpdateTaskTitle}
        >
          Update
        </button>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={handleDeleteTask}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
