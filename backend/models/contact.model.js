module.exports=(sequelize,Sequelize)=>{

    const Contact= sequelize.define('contact',{
        name:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        subject:{
            type:Sequelize.STRING
        },
        message:{
            type:Sequelize.TEXT('medium')
        },
        query:{
            type:Sequelize.TEXT('medium')
        }
    });

    return Contact;
}