import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
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
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});
User.prototype.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
