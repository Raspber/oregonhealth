import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const signOut = async () => {
        'use server'

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.signOut()
        return redirect('/')
    }
    const sendForm = async (formData: FormData) => {
        'use server'
    };
    return user ? (
        <div className="flex w-full max-w-5xl h-screen items-center gap-5">
            <div className='bg-white shadow-2xl rounded-md w-full h-1/2 flex flex-col justify-center items-center'>
                <div className='flex w-full justify-end p-6 gap-5'>
                    <p className='text-indigo-500'>Welcome, {user.email}!</p>
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
                            <select id="category" name="category" className='w-full border border-1 border-indigo-500 rounded text-indigo-500 text-center focus:outline-indigo-900 '>
                                <option value="" selected hidden></option>
                                <option value="appointmentType">Appointment Type</option>
                                <option value="patientSymptoms">Patient Symptoms</option>
                                <option value="medicalHistory">Medical History</option>
                                <option value="prescription">Prescription</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="document" className='text-sm  text-indigo-500'>Document</label>
                            <input type="file" id="document" name="file" className='text-xs text-indigo-300 file:border-0 file:mr-2 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100' />
                        </div>
                        <button type='submit' className='bg-indigo-900 w-24 rounded p-2 text-white mt-4'>Submit</button>
                    </form>
                </main>
            </div>
        </div>
    ) : (
        redirect('/?message=You Must Sign In First')
    );

}