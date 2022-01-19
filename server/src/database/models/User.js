import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../../utils/sequelize";

class User extends Model {
  async isValidPassword(password) {
    return bcrypt.compare(password, this.password);
  }

}

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
  {
    sequelize,
    hooks: {
      async beforeCreate(user) {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

export default User;
