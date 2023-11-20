import { createClient } from '@/utils/supabase/server'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Request({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user }
    } = await supabase.auth.getUser()
    console.log('this is the user:', user?.id)

    const { data: userName, error } = await supabase
        .from('users')
        .select('full_name')
    console.log('this is the users full name:', userName)

    const name = userName?.[0]?.full_name ?? user?.email;

    const signOut = async () => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.signOut()
        return redirect('/')
    }

    const sendForm = async (formData: FormData) => {
        'use server';

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const patient_fullname = formData.get('patient_fullname') as string;
        const category = formData.get('category') as string;
        const file = formData.get('file_url') as File | null; // Adjust based on your actual file input's name attribute

        console.log('File:', file); // Debugging log


        if (file && file instanceof File) {
            const userId = user?.id || null
            const fileName = `${userId}/${randomUUID()}_${file.name}`;
            
            const { error: uploadError } = await supabase
                .storage
                .from('documents')
                .upload(fileName, file);

            if (uploadError) {
                console.error('File Upload Error:', uploadError);
                return { success: false, message: 'File Upload Failed' };
            }
        } else {
            console.log('No file provided or file is not a valid File object');
        }

        console.log(patient_fullname, category, file, user?.id); // Debugging log

        const { error, data } = await supabase
            .from('requests')
            .insert([
                {
                    patient_fullname,
                    category,
                    file_url: file, // This will be null if no file was provided or upload failed
                    user_id: user?.id
                }
            ]);

        if (error) {
            console.error('Database Insertion Error:', error);
            return { success: false, message: 'Failed To Submit Request!' };
        }

        return (
            redirect('/request/success'),
            ({ success: true, message: 'Request Submitted Successfully', data })
        )
    };

    return user ? (
        <div className="flex w-full max-w-5xl h-screen items-center gap-5">
            <div className='bg-white shadow-2xl rounded-md w-full h-1/2 flex flex-col justify-center items-center'>
                <div className='flex w-full justify-end p-6 gap-5 items-center'>
                    <p className='text-indigo-500'>Welcome, {name}!</p>
                    <form action={signOut}>
                        <button className="py-2 px-4 rounded-md bg-indigo-300 hover:bg-indigo-900">
                            Logout
                        </button>
                    </form>
                </div>
                <div className='w-full mb-6 px-12'>
                    <p className='text-3xl font-bold text-indigo-500'>Request A Doctor</p>
                    <p className='text-indigo-500'>Please submit all required information to set appointment</p>
                </div>
                <div className='w-11/12 bg-indigo-100 h-1/6 mx-auto mb-6 flex flex-col justify-center rounded'>
                    <p className='text-indigo-500 font-medium p-2'>Basic Patient Information</p>
                    <p className='text-indigo-500 text-sm px-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <main className='w-full px-12 mx-auto'>
                    <form action={sendForm} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        <div>
                            <label htmlFor="patientNumber" className='text-sm text-indigo-500'>Patient Number</label>
                            <input type="text" id="patientNumber" name="patientNumber" className='border border-indigo-500 rounded w-full text-indigo-500 text-center focus:outline-indigo-900' />
                        </div>
                        <div>
                            <label htmlFor="patientFullName" className='text-sm text-indigo-500'>Patient Full Name</label>
                            <input type="text" id="patientFullName" name="patient_fullname" className='border border-indigo-500 rounded w-full text-indigo-500 text-center focus:outline-indigo-900' />
                        </div>
                        <div>
                            <label htmlFor="category" className='text-sm text-indigo-500'>Category</label>
                            <select id="category" name="category" defaultValue="" className='w-full border border-1 border-indigo-500 rounded text-indigo-500 text-center focus:outline-indigo-900 '>
                                <option value="" hidden></option>
                                <option value="appointment type">Appointment Type</option>
                                <option value="patient symtoms">Patient Symptoms</option>
                                <option value="medical history">Medical History</option>
                                <option value="prescription">Prescription</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="document" className='text-sm  text-indigo-500'>Document</label>
                            <input type="file" id="document" name="file_url" className='text-xs text-indigo-300 file:border-0 file:mr-2 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100' />
                        </div>
                        <button type='submit' className='bg-indigo-900 w-24 rounded p-2 text-white mt-4'>Submit</button>
                    </form>
                    {searchParams?.message && (
                        <p className='mt-4 p-4 bg-foreground/10 text-indigo-500 text-center'>
                            {searchParams.message}
                        </p>
                    )}
                </main>
            </div>
        </div>
    ) : (
        redirect('/?message=You Must Sign In First')
    );

}