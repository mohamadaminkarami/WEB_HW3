import User from "./User";
import Note from "./Note";

User.hasMany(Note, { as: "Author", foreignKey: "authorId" });
Note.belongsTo(User, { as: "Author", foreignKey: "authorId" });

export { User, Note };
