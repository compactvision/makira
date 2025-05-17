import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

document.addEventListener('DOMContentLoaded', function() {
    const skillsInput = document.querySelector('#Key_Skills input[name="value"]')
    const skillsCounter = document.getElementById('skillsCounter')
    
    skillsInput.addEventListener('input', function() {
      const skills = this.value.split(',').filter(skill => skill.trim() !== '')
      skillsCounter.textContent = `${skills.length} compétences saisies`
    })
  })