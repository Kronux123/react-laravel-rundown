import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

const TaskEdit = ({task}) => {

    const { data, setData, put, processing, errors } = useForm({
        task: task.task,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tasks.update', task.id));
    };
  return (
      <AuthenticatedLayout
          header={
              <h2 className="text-xl font-semibold leading-tight text-gray-800">
                  Task Edit
              </h2>
          }
      >
          <Head title="Task Edit" />

          <section>
              <div className="p-3">
                  <form onSubmit={submit}>
                      <input
                          value={data.task}
                          onChange={(e) => setData("task", e.target.value)}
                          type="text"
                          className="rounded p-1"
                          name=""
                          id=""
                      />
                      <button type="submit" className="bg-blue-500 p-1 rounded">
                          submit
                      </button>

                      {errors.task && (
                          <div className="text-red-500">{errors.task}</div>
                      )}
                  </form>
              </div>
          </section>
      </AuthenticatedLayout>
  );
}

export default TaskEdit