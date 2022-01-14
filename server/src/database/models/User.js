import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    isSuperuser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize }
);
export default User;
