import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../features/tasks/taskSlice";
import TaskItem from './TaskItem';
import Spinner from './Spinner';
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Cambiar state.task a state.tasks
    const { tasks, isLoading, isError, message } = useSelector(state => state.tasks);

    useEffect(() => {
        if (isError) console.log(message);
        dispatch(getTasks());

        return () => dispatch(reset());
    }, [navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className="content">
            {tasks.length > 0 ? (
                <div className="tasks">
                    {tasks.map(task => <TaskItem key={task._id} task={task} />)}
                </div>
            ) : (
                <div>No tasks available</div>
            )}
        </section>
    );
};

export default TaskList;
