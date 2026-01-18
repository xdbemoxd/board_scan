"use server"

import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/lib/models/User';

export async function GetDataUser(email:string){

    await dbConnect()

    const user = await User.findOne({ email: email }).select('-password -email').lean();

    return user

}