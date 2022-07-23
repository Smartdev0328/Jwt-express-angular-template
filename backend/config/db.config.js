const env = require('./env');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database,env.username,env.password,{
    hots:env.host,
    dialect:env.dialect,
    operatorAliases:false,
    pool:{
        max:env.max,
        min:env.min,
        acquire:env.pool.acquire,
        idle:env.pool.idle
    }
});

const db ={};

db.Sequelize=Sequelize;
db.sequelize= sequelize;

db.user=require('../models/user.model')(sequelize,Sequelize);
db.contact=require('../models/contact.model')(sequelize,Sequelize);

module.exports=db;