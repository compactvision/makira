import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(30),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).confirmed(),
    terms: vine.accepted(),
  })
)

createUserValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'Le champ {{ field }} est obligatoire.',
  'email.email': "Format d'email invalide.",
  'email.unique': 'Cet email est déjà utilisé.',
  'password.minLength': 'Le mot de passe doit contenir au moins 8 caractères.',
  'name.minLength': 'Le nom doit contenir au moins 3 caractères.',
  'name.maxLength': 'Le nom ne doit pas dépasser 30 caractères.',
  'password.confirmed': 'Les mots de passe ne correspondent pas.',
  'terms.accepted': 'Vous devez accepter les conditions.',
})
