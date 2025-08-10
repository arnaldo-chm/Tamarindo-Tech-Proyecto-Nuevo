document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-eliminar').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            if(!confirm('¿Estás seguro de que deseas eliminar este emprendimiento?')) {
                e.preventDefault();
            }
        });
    });
});