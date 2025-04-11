// ========== Funciones auxiliares ==========

// Cargar todos los medicamentos
function cargarMedicamentos() {
    fetch('/medicamentos')
        .then(response => response.json())
        .then(medicamentos => {
            const tbody = $('#medicamentos-lista');
            tbody.empty();

            medicamentos.forEach(med => {
                const row = `
                    <tr>
                        <td>${med.nombre}</td>
                        <td>${med.categoria}</td>
                        <td>${med.tipo}</td>
                        <td>${med.componente}</td>
                        <td>
                            <button class="btn btn-info btn-sm detalles" data-id="${med.id_medicamento}"><i class="fa-solid fa-eye"></i></button>
                            <button class="btn btn-success btn-sm agregar-receta" data-id="${med.id_medicamento}"><i class="fa-solid fa-plus"></i></button>
                            <button class="btn btn-warning btn-sm editar-medicamento" data-id="${med.id_medicamento}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn btn-danger btn-sm eliminar-medicamento" data-id="${med.id_medicamento}" data-nombre="${med.nombre}"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>`;
                tbody.append(row);
            });

            paginarTabla(7);
        })
        .catch(error => console.error('Error al cargar medicamentos:', error));
}

// Paginación de la tabla
function paginarTabla(itemsPorPagina) {
    const tbody = $('#medicamentos-lista');
    const filas = tbody.find('tr');
    const paginador = $('#paginador');

    const numPaginas = Math.ceil(filas.length / itemsPorPagina);
    paginador.empty();

    for (let i = 1; i <= numPaginas; i++) {
        paginador.append(`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`);
    }

    paginador.find('li').on('click', function () {
        const pagina = $(this).text();
        const inicio = (pagina - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        filas.hide().slice(inicio, fin).show();
        paginador.find('li').removeClass('active');
        $(this).addClass('active');
    });

    paginador.find('li:first').addClass('active');
    filas.hide().slice(0, itemsPorPagina).show();
}

// Buscar medicamentos
function activarBuscador() {
    $('#buscadorMedicamentos').on('keyup', function () {
        const busqueda = $(this).val().toLowerCase();
        $('#TablaMedicamentos tbody tr').each(function () {
            const encontrado = $(this).text().toLowerCase().includes(busqueda);
            $(this).toggle(encontrado);
        });
    });
}

// Cargar tipos de medicamentos en <select>
function cargarTiposMedicamentos() {
    $.ajax({
        url: '/tipo',
        method: 'GET',
        success: function (tipos) {
            let options = '<option value="">Seleccione un tipo</option>';
            tipos.forEach(tipo => {
                options += `<option value="${tipo.tipo}">${tipo.tipo}</option>`;
            });
            $('#selectTipoMedicamento').html(options);
        },
        error: function () {
            alert('Hubo un error al obtener los tipos de medicamentos');
        }
    });
}

// Cargar datos al editar
function cargarDatosMedicamento(id) {
    $.ajax({
        url: `/medicamentos/${id}`,
        method: 'GET',
        success: function (medicamento) {
            $('#idMedicamento').val(medicamento.id_medicamento);
            $('#nombreMedicamento').val(medicamento.nombre);
            $('#categoriaMedicamento').val(medicamento.categoria);
            $('#selectTipoMedicamento').val(medicamento.tipo);
            $('#componenteMedicamento').val(medicamento.componente);
            $('#usoMedicamento').val(medicamento.uso);
            $('#addMedicamentoModalLabel').text('Editar Medicamento');
            $('#addMedicamentoModal').modal('show');
        },
        error: function () {
            alert('Error al cargar los datos del medicamento');
        }
    });
}

// Eliminar medicamento
function eliminarMedicamento(id) {
    $.ajax({
        url: `/medicamentos/${id}`,
        type: 'DELETE',
        dataType: 'json',
        success: function () {
            alert('Medicamento eliminado exitosamente');
            cargarMedicamentos();
        },
        error: function () {
            alert('Error al eliminar el medicamento');
        }
    });
}

// Limpiar el formulario del modal
function limpiarFormulario() {
    $('#formNuevoMedicamento')[0].reset();
    $('#idMedicamento').val('');
    $('#addMedicamentoModalLabel').text('Agregar Nuevo Medicamento');
}

// Descargar receta en PDF
function descargarPDF() {
    const doc = new window.jspdf.jsPDF();
    doc.text("Receta Médica", 10, 10);

    let recetaText = "Medicamentos en la receta:\n\n";
    $('#medicamentos-receta .medicamento-en-receta').each(function () {
        const nombre = $(this).find('p').clone().find('button').remove().end().text().trim();
        recetaText += nombre ? `${nombre}\n` : '';
    });

    if (recetaText === "Medicamentos en la receta:\n\n") {
        recetaText += "No hay medicamentos agregados a la receta.";
    }

    doc.text(recetaText, 10, 20);
    doc.save("receta.pdf");
}

// ========== Inicio de la aplicación ==========

$(document).ready(function () {
    // Carga inicial
    cargarTiposMedicamentos();
    cargarMedicamentos();
    activarBuscador();

    // Evento de envío del formulario (crear/editar)
    $('#formNuevoMedicamento').off('submit').on('submit', function (e) {
        e.preventDefault();
        const idMedicamento = $('#idMedicamento').val();
        const medicamentoData = {
            nombre: $('#nombreMedicamento').val(),
            categoria: $('#categoriaMedicamento').val(),
            tipo: $('#selectTipoMedicamento').val(),
            componente: $('#componenteMedicamento').val(),
            uso: $('#usoMedicamento').val()
        };
    
        const url = idMedicamento ? `/medicamentos/${idMedicamento}` : '/medicamentos';
        const method = idMedicamento ? 'PUT' : 'POST';
    
        $.ajax({
            url,
            method,
            contentType: 'application/json',
            data: JSON.stringify(medicamentoData),
            success: function () {
                alert(idMedicamento ? 'Medicamento actualizado con éxito' : 'Medicamento agregado con éxito');
                $('#addMedicamentoModal').modal('hide');
                // Añadir estas dos líneas para eliminar el backdrop
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
                limpiarFormulario();
                cargarMedicamentos();
            },
            error: function () {
                alert('Error al guardar el medicamento');
            }
        });
    });

    // Abrir modal vacío para nuevo medicamento
    $('#agregarMedicamentoBtn').on('click', function () {
        limpiarFormulario();
        $('#addMedicamentoModal').modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
    });

    // Ver detalles
    $(document).on('click', '.detalles', function () {
        const id = $(this).data('id');
        $.get(`/medicamentos/${id}`, function (medicamento) {
            const detalles = `
                <strong>ID:</strong> ${medicamento.id_medicamento}<br>
                <strong>Nombre:</strong> ${medicamento.nombre}<br>
                <strong>Categoría:</strong> ${medicamento.categoria}<br>
                <strong>Tipo:</strong> ${medicamento.tipo}<br>
                <strong>Componente:</strong> ${medicamento.componente}<br>
                <strong>Uso:</strong> ${medicamento.uso}
            `;
            $('#detalle-medicamento').html(detalles);
        }).fail(() => {
            $('#detalle-medicamento').html('Error al cargar detalles del medicamento.');
        });
    });

    // Editar medicamento
    $(document).on('click', '.editar-medicamento', function () {
        const id = $(this).data('id');
        cargarDatosMedicamento(id);
    });

    // Eliminar medicamento
    $(document).on('click', '.eliminar-medicamento', function () {
        const id = $(this).data('id');
        const nombre = $(this).data('nombre');
        if (confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) {
            eliminarMedicamento(id);
        }
    });

    // Agregar a receta
    $(document).on('click', '.agregar-receta', function () {
        const id = $(this).data('id');
        $.get(`/medicamentos/${id}`, function (medicamento) {
            const html = `
                <div class="medicamento-en-receta" data-id="${medicamento.id_medicamento}">
                    <p>Código: ${medicamento.id_medicamento} - Nombre: ${medicamento.nombre}
                        <button class="btn btn-danger btn-sm eliminar-receta">Eliminar</button>
                    </p>
                </div>
            `;
            if ($('#medicamentos-receta .medicamento-en-receta').length === 0) {
                $('#medicamentos-receta').html(html);
            } else {
                $('#medicamentos-receta').append(html);
            }
        }).fail(() => {
            alert('Error al agregar el medicamento a la receta.');
        });
    });

    // Eliminar de la receta
    $(document).on('click', '.eliminar-receta', function () {
        $(this).closest('.medicamento-en-receta').remove();
    });

    // Descargar PDF
    $('#descargar-pdf').on('click', function () {
        descargarPDF();
    });

    // Recargar lista al cerrar el modal
    $('#addMedicamentoModal').on('hidden.bs.modal', function () {
        limpiarFormulario();
        cargarMedicamentos();
    });
});

// Manejar cierre de sesión
$('#btnLogout').on('click', function(e) {
    e.preventDefault();
    
    $.ajax({
        url: '/logout',
        method: 'POST',
        success: function() {
            window.location.href = '/'; // Redirige al index.ejs (login)
        },
        error: function(error) {
            //console.error('Error al cerrar sesión:', error);
            alert('Hubo un problema al cerrar la sesión');
        }
    });
});