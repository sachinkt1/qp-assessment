import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database'; 

class Grocery extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Grocery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Grocery',
  }
);

export default Grocery;
