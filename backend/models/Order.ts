import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import User from './User'; 
import Grocery from './Grocery'; 

class Order extends Model {
  public id!: number;
  public userId!: number;
  public groceryId!: number;
  public quantity!: number;
  public totalPrice!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groceryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Grocery, { foreignKey: 'groceryId' });

export default Order;
