module.exports=(sequelize,DataTypes)=>{
    const TicketMaster = sequelize.define('TicketMaster', {
        module: {
            type: DataTypes.STRING,
            allowNull: true
          },
        condition: {
          type: DataTypes.STRING,
          allowNull: true,
          
        },
        operator: {
          type: DataTypes.STRING,
          allowNull: true,
          
        },
        value: {
          type:DataTypes.STRING,
          allowNull:true
        }
              
      }, {
        sequelize,
        tableName: 'ticket_master',
        timestamps: false,

      });
      return TicketMaster;
    }
    