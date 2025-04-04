import Roles from '../enums/role.js'

/**
 * Vérifie si un utilisateur a le rôle "admin".
 * @param user L'utilisateur à vérifier.
 * @returns `true` si l'utilisateur est un admin, sinon `false`.
 */
export function isAdmin(user: { role: string }): boolean {
  return user.role === Roles.ADMIN
}
