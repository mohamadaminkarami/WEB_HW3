export default function hasPermission(user, note) {
  return user.isSuperuser || note.authorId === user.userId;
}
