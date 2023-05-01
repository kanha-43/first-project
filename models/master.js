module.exports=(sequelize,DataTypes)=>{
const Master = sequelize.define('Master', {
  // Model attributes are defined here
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id: {
    type: DataTypes.BIGINT,
    //allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  default: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: true
  }, 
  raw_title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
    sequelize,
    tableName: 'master',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Master;
}

// `sequelize.define` also returns the model
//console.log(Master === sequelize.models.Master);

