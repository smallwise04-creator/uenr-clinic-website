function getDoctorName(doctorId) {
    const doctors = {
        'dr-opuni': 'Dr. Opuni Randolph',
        'dr-mienzah': 'Dr. Mienzah Paulita',
        'dr-owusu-francis': 'Dr. Owusu Francis',
        'dr-awogbo': 'Dr. Awogbo Bernard',
        'dr-owusu-louis': 'Dr. Owusu Louis',
        'dr-agyei': 'Dr. Agyei Mintah-Afari'
        // ... existing doctors
    };
    return doctors[doctorId] || 'Selected Doctor';
}

// AUTO-SELECT DOCTOR FROM URL OR BUTTON (NEW FEATURE)
function autoSelectDoctor() {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const doctorFromUrl = urlParams.get('doctor');
    
    // Check if came from doctor button click
    const doctorFromButton = sessionStorage.getItem('selectedDoctor');
    
    const selectedDoctor = doctorFromUrl || doctorFromButton;
    
    if (selectedDoctor) {
        const doctorSelect = document.getElementById('doctor');
        doctorSelect.value = selectedDoctor;
        
        // Show success message
        const doctorName = getDoctorName(selectedDoctor);
        showDoctorSelectedMessage(doctorName);
    }
}

// Show "Doctor pre-selected" message
function showDoctorSelectedMessage(doctorName) {
    const message = document.createElement('div');
    message.style.cssText = `
        background: linear-gradient(135deg, var(--soft-green), #45a049);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(76,175,80,0.3);
    `;
    message.innerHTML = `
        <i class="fas fa-user-md" style="margin-right: 0.5rem;"></i>
        <strong>${doctorName} is pre-selected for you!</strong>
        <br><small style="opacity: 0.9;">You can change it anytime</small>
    `;
    
    const form = document.querySelector('.booking-form');
    form.parentNode.insertBefore(message, form);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        message.style.transition = 'all 0.3s ease';
        message.style.opacity = '0';
        message.style.transform = 'translateY(-10px)';
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

// Update doctor buttons to store selection
document.addEventListener('DOMContentLoaded', function() {
    // Auto-select doctor on page load
    autoSelectDoctor();
    
    // Handle doctor button clicks (for future pages)
    document.querySelectorAll('.book-doctor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const doctor = this.getAttribute('data-doctor');
            sessionStorage.setItem('selectedDoctor', doctor);
        });
    });
});