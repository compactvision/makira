import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1e3)
  const intervals = [
    {
      label: 'an',
      seconds: 31536e3,
    },
    {
      label: 'mois',
      seconds: 2592e3,
    },
    {
      label: 'jour',
      seconds: 86400,
    },
    {
      label: 'heure',
      seconds: 3600,
    },
    {
      label: 'minute',
      seconds: 60,
    },
    {
      label: 'seconde',
      seconds: 1,
    },
  ]
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `il y a ${count} ${interval.label}${count > 1 ? 's' : ''}`
    }
  }
  return 'à l’instant'
}

document.addEventListener('DOMContentLoaded', function () {
  const skillsInput = document.querySelector('#Key_Skills input[name="value"]')
  const skillsCounter = document.getElementById('skillsCounter')

  skillsInput.addEventListener('input', function () {
    const skills = this.value.split(',').filter((skill) => skill.trim() !== '')
    skillsCounter.textContent = `${skills.length} compétences saisies`
  })
})


