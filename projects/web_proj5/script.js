document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cvForm');
    const formSteps = Array.from(document.querySelectorAll('.form-step'));
    let currentStep = 0;
    
    // Handle Next button click
    document.querySelectorAll('.next-step').forEach(button => {
      button.addEventListener('click', () => {
        if (validateStep(formSteps[currentStep])) {
          formSteps[currentStep].classList.remove('active');
          currentStep++;
          formSteps[currentStep].classList.add('active');
        }
      });
    });
    
    // Handle Previous button click
    document.querySelectorAll('.prev-step').forEach(button => {
      button.addEventListener('click', () => {
        formSteps[currentStep].classList.remove('active');
        currentStep--;
        formSteps[currentStep].classList.add('active');
      });
    });
    
    // On form submit, generate CV preview
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      generateCV();
    });
  });
  
  // Basic validation: ensure required fields in current step are filled
  function validateStep(stepElement) {
    const inputs = stepElement.querySelectorAll('input, textarea');
    for (let input of inputs) {
      if (!input.value.trim()) {
        alert('Please fill all required fields.');
        return false;
      }
    }
    return true;
  }
  
  // Generate CV preview based on user inputs
  function generateCV() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    
    document.getElementById('cv-name').textContent = name;
    document.getElementById('cv-age').textContent = age;
    document.getElementById('cv-email').textContent = "Email: " + email;
    document.getElementById('cv-phone').textContent = "Phone: " + phone;
    document.getElementById('cv-address').textContent = address;
    document.getElementById('cv-education').textContent = education;
    document.getElementById('cv-experience').textContent = experience;
    document.getElementById('cv-skills').textContent = skills;
    
    // Reveal the CV preview section and scroll into view
    document.getElementById('cv-container').classList.remove('hidden');
    document.getElementById('cv-container').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Print/Download the CV using the browser's print feature
  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });
  