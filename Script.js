document.addEventListener('DOMContentLoaded', function() {
    const tareasCumplidasPorDia = {
        Lunes: [],
        Martes: [],
        Miércoles: [],
        Jueves: [],
        Viernes: []
    };
    
    const guardarBtn = document.getElementById('guardarBtn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const borrarBtn = document.getElementById('borrarBtn');
    const today = new Date();
    const todayDayOfWeek = today.getDay();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    checkboxes.forEach(checkbox => {
        const dia = checkbox.id.split('-')[0];
        
        if (daysOfWeek.indexOf(dia) < todayDayOfWeek) {
            checkbox.disabled = true;
        }

        checkbox.addEventListener('change', function() {
            if (daysOfWeek.indexOf(dia) <= todayDayOfWeek) {
                if (checkbox.checked) {
                    const tarea = checkbox.id.split('-')[1];
                    tareasCumplidasPorDia[dia].push(tarea);
                } else {
                    const tareaIndex = tareasCumplidasPorDia[dia].indexOf(checkbox.id.split('-')[1]);
                    if (tareaIndex !== -1) {
                        tareasCumplidasPorDia[dia].splice(tareaIndex, 1);
                    }
                }
            } else {
                checkbox.checked = false;
            }
        });
    });

    guardarBtn.addEventListener('click', function() {
        const tareasGuardadasElement = document.getElementById('tareasGuardadas');
        tareasGuardadasElement.innerHTML = '';

        Object.keys(tareasCumplidasPorDia).forEach(dia => {
            const tareasDia = tareasCumplidasPorDia[dia].join(', ');
            if (tareasDia.length > 0) {
                const tareaItem = document.createElement('p');
                tareaItem.textContent = `${dia}: ${tareasDia}`;
                tareasGuardadasElement.appendChild(tareaItem);
            }
        });
    });

    borrarBtn.addEventListener('click', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        Object.keys(tareasCumplidasPorDia).forEach(dia => {
            tareasCumplidasPorDia[dia] = [];
        });
        const tareasGuardadasElement = document.getElementById('tareasGuardadas');
        tareasGuardadasElement.innerHTML = '';
    });

    const mostrarVideoBtn = document.getElementById('mostrarVideoBtn');
    const codigoVideoInput = document.getElementById('CodigoVideo');
    const videoContainer = document.getElementById('video-container');

    mostrarVideoBtn.addEventListener('click', function () {
        const codigoVideo = codigoVideoInput.value;
        if (codigoVideo.trim() === 'Elizabeth') {
            const videoHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/NdmH7K_rM-w?si=PAiCOeOhhFmxHHok&amp;controls=0" title="Pokemon" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
            videoContainer.innerHTML = videoHTML;
        }
    });

    codigoVideoInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            mostrarVideoBtn.click();
        }
    });
});