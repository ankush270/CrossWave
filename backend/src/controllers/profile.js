import prisma from '../config/prisma_db.js';
export const getProfile = async (req, res) => {
    try {
        const id = req.id;
        
        const data = await prisma.user.findUnique({
            where: {
                id: id
            },
            include:{
                profile: true
            }
        })

        if(!data){
            return res.status(404).json({
                success: false,
                error: 'Profile not found'
            })
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Some error occurred: ' + error.message
        })
    }
}

export const updateProfile = async (req,res) =>{
    const {companyName, address, GST, phoneNo,name}= req.body;
    try{
        const id= req.id
        const updatedUser = await prisma.user.update({
            where: {id: id,},
            data:{
                profile:{
                    upsert:{
                        create: {
                            companyName,
                            address,
                            GST,
                            phoneNo,
                            name
                        },
                        update:{
                            companyName,
                            address,
                            GST,
                            phoneNo,
                            name
                        }
                    }

                }
            },
            include:{
                profile: true
            }
        })

        res.status(201).json({
            success: true,
            updatedUser
        })
    }catch(e){
        res.status(500).json({
            success: false,
            error: 'Some error occurred: ' + error.message
        })
    }
}