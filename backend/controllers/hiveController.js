const Hive = require("../models/hive");
const User_Hive = require("../models/user_hive");
const { Op } = require("sequelize");


exports.getHives = async( request, response ) => {
    try{
        const { id_user } = request.params;
        const users_hives = await User_Hive.findAll({
            where: { id_user }
        })

        const hiveids=users_hives.map(uh => uh.id_hive);
        if(hiveids.length==0){
            return response.json(hiveids);
        }

        const hives = await Hive.findAll({
            where: { id_hive: {[Op.in]: hiveids} }
        })

        response.json(hives);
    }catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.createHive = async( request, response ) => {
    try{
        const { hive_name, id_owner, count_users } = request.body;
        const newHive = await Hive.create({ hive_name, id_owner, count_users });

        await User_Hive.create({ id_user: newHive.id_owner, id_hive: newHive.id_hive});

        response.json(newHive);
    }catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.invitedToHive = async( request, response ) => {
    try{
        const { id_user, id_hive } = request.body;
        const user_hive=await User_Hive.create({ id_user, id_hive});

        response.json(user_hive);
    }catch(error){
        response.status(500).json({error: error.message})
    }
}