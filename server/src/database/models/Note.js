import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";

class Note extends Model {}

Note.init(
  {
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
  },
  { sequelize }
);

export default Note;
