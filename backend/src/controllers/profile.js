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


export const updateProfile = async (req, res) => {
    const {
        companyName, address, state, city, pinCode, country,
        GST, phoneNo, name
    } = req.body;

    try {
        const userId = req.id; // Assuming `req.id` contains the logged-in user's ID

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                profile: {
                    upsert: {
                        create: {
                            companyName,
                            address,
                            state,
                            city,
                            pinCode: parseInt(pinCode), // Ensure it's stored as an integer
                            country,
                            GST,
                            phoneNo,
                            name,
                        },
                        update: {
                            companyName,
                            address,
                            state,
                            city,
                            pinCode: parseInt(pinCode),
                            country,
                            GST,
                            phoneNo,
                            name
                        }
                    }
                }
            },
            include: { profile: true }
        });

        res.status(200).json({
            success: true,
            updatedUser
        });
    } catch (e) {
        console.error("Error updating profile:", e);
        res.status(500).json({
            success: false,
            error: 'Some error occurred: ' + e.message
        });
    }
};
