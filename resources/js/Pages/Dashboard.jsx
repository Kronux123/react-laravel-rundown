import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
export default function Dashboard({ tasks }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        task: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => {
                reset('task');
            },
        });
    };

    const deleteTask = async(e, id) => {
        e.preventDefault();
        await router.delete(route('tasks.destroy', id));
    };

    const editTask = async(e, id) => {
        e.preventDefault();
        await router.get(route('tasks.edit', id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <input value={data.task} onChange={(e) => setData('task', e.target.value)} type="text" className="rounded p-1" name="" id="" />
                                <button type="submit" className="bg-blue-500 p-1 rounded">submit</button>

                                {errors.task && <div className="text-red-500">{errors.task}</div>}
                            
                            </form>
                        </div>


                        <div className="p-6 text-gray-900 space-y-2 mt-5">
                            {tasks.map((task) => (
                                <ul key={task.id} className="flex justify-between">
                                    <li>{task.task}</li>
                                    <div>
                                        <button onClick={(e) => deleteTask(e, task.id)} className="bg-red-500 p-1 rounded">x</button>
                                        <button onClick={(e) => editTask(e, task.id)} className="bg-orange-500 p-1 rounded">edit</button>
                                    </div>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
