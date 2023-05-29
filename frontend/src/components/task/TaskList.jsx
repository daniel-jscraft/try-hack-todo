import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import StatusFilter from './StatusFilter';
import toast from 'react-hot-toast';
import TaskItem from './TaskItem';
import classes from './TaskList.module.scss';
import Constants from '../../etc/Constants';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [statusFilter, setStatusFilter] = useState(Constants.statusFilterAll);
  const [newTask, setNewTask] = useState('');
  const tasks = useRef({list: []});

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/mytasks');
      tasks.current.list = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setTaskList(tasks.current.list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addNewButtonClick = (task) => {
    setIsAddingNew(!isAddingNew);
  };

  const resetFilters = ()=> {
    setStatusFilter(Constants.statusFilterAll);
    setTaskList(tasks.current.list);
  }

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error('Task is empty');
      return;
    }
    try {
      const { data } = await axios.post('/api/tasks/', {
        title: newTask,
      });
      toast.success('New task added');
      setIsAddingNew(false);
      setNewTask('');
      tasks.current.list = [{ ...data }, ...tasks.current.list];
      resetFilters();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (task) => {
    const {_id} = task;
    try {
      await axios.delete(`/api/tasks/${_id}`);
      tasks.current.list = tasks.current.list.filter((task) => task._id !== _id)
      setTaskList(tasks.current.list)
    } catch (err) {
      console.log(err);
    }
  };

  const onStatusFilterChange = (filter) => {
    if (filter === Constants.statusFilterAll) {
      setTaskList(tasks.current.list);
    }
    if (filter === Constants.statusFilterCompleted) {
      setTaskList(tasks.current.list.filter((task) => task.completed));
    }
    if (filter === Constants.statusFilterUncompleted) {
      setTaskList(tasks.current.list.filter((task) => !task.completed));
    }
    setStatusFilter(filter)
  }

  return (
    <div>
      <div className={classes.topBar}>
        <button
          type="button"
          className={classes.addNew}
          onClick={addNewButtonClick}
        >
          Add New
        </button>
      </div>
      <div className={classes.topBar}>
        <StatusFilter 
          statusFilter={statusFilter}
          onStatusFilterChange = {onStatusFilterChange}
        />
      </div>
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
            autoFocus
          />
          <button type="submit">Add</button>
        </form>
      )}
      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
            ))}
          </tbody>
        </table>
      ) : (
        'No Task Found. Create a new task'
      )}
    </div>
  );
}

export default TaskList;
