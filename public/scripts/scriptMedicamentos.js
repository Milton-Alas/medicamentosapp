$(document).ready(function () {
    // Función para cargar los medicamentos desde el backend
    function cargarMedicamentos() {
        fetch('/medicamentos')
            .then(response => response.json())
            .then(medicamentos => {
                var tbody = $('#medicamentos-lista');
                tbody.empty(); // Vacía el tbody antes de agregar los nuevos datos

                medicamentos.forEach(med => {
                    var row = '<tr>' +
                        '<td>' + med.nombre + '</td>' +
                        '<td>' + med.categoria + '</td>' +
                        '<td>' + med.tipo + '</td>' +
                        '<td>' + med.componente + '</td>' +
                        '<td>' +
                        '<button class="btn btn-info btn-sm botones detalles" data-id="' + med.id_medicamento + '"><i class="fa-solid fa-eye"></i></button>' +
                        '<button class="btn btn-success btn-sm botones agregar-receta" data-id="' + med.id_medicamento + '"><i class="fa-solid fa-plus"></i></button>' +
                        '<button class="btn btn-warning btn-sm botones editar-medicamento" data-id="' + med.id_medicamento + '"><i class="fa-solid fa-pen-to-square"></i></button>' +
                        '<button class="btn btn-danger btn-sm botones eliminar-medicamento" ' +
                        'data-id="' + med.id_medicamento + '" ' +
                        'data-nombre="' + med.nombre + '"> ' +
                        '<i class="fa-solid fa-trash-can"></i>' +
                        '</button>' +
                        '</tr>';
                    tbody.append(row);
                });

                // Después de cargar los medicamentos, paginar la tabla
                paginarTabla(7);
            })
            .catch(error => console.error('Error al cargar medicamentos:', error));
    }

    // Función para paginar la tabla con medicamentos
    function paginarTabla(itemsPorPagina) {
        var tbody = $('#medicamentos-lista');
        var filas = tbody.find('tr');
        var paginador = $('#paginador');

        var numPaginas = Math.ceil(filas.length / itemsPorPagina); // Calcula el número de páginas

        // Crea los botones de paginación
        paginador.empty();
        for (var i = 1; i <= numPaginas; i++) {
            var boton = '<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>';
            paginador.append(boton);
        }

        // Maneja el clic en los botones de paginación
        paginador.find('li').on('click', function () {
            var pagina = $(this).text();
            var inicio = (pagina - 1) * itemsPorPagina;
            var fin = inicio + itemsPorPagina;

            // Muestra solo las filas correspondientes a la página seleccionada y oculta las demás
            filas.hide().slice(inicio, fin).show();
        });

        // Muestra la primera página al cargar el paginador
        paginador.find('li:first').addClass('active');
        filas.hide().slice(0, itemsPorPagina).show();
    }

    // Evento de búsqueda
    $('#buscadorMedicamentos').on('keyup', function () {
        var busqueda = $(this).val().toLowerCase();

        $('#TablaMedicamentos tbody tr').each(function () {
            var encontrado = false;

            $(this).find('td').each(function () {
                var texto = $(this).text().toLowerCase();
                if (texto.includes(busqueda)) {
                    encontrado = true;
                    return false;
                }
            });

            if (encontrado) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Cargar medicamentos al iniciar la página
    cargarMedicamentos();
});

// Evento para ver detalles de un medicamento
$(document).on('click', '.detalles', function () {
    var medicamentoId = $(this).data('id');

    // Realizar una solicitud AJAX para obtener los detalles del medicamento
    $.ajax({
        url: '/medicamentos/' + medicamentoId,  // Ruta en tu servidor para obtener detalles por ID
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var detallesMedicamento = `
        <strong>ID:</strong> ${response.id_medicamento}<br>
        <strong>Nombre:</strong> ${response.nombre}<br>
        <strong>Categoría:</strong> ${response.categoria}<br>
        <strong>Tipo:</strong> ${response.tipo}<br>
        <strong>Componente:</strong> ${response.componente}<br>
        <strong>Uso:</strong> ${response.uso}
    `;
            $('#detalle-medicamento').html(detallesMedicamento);
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener detalles del medicamento:', error);
            $('#detalle-medicamento').html('Error al cargar detalles del medicamento.');
        }
    });
});

// Evento para agregar medicamento a la receta
$(document).on('click', '.agregar-receta', function () {
    var medicamentoId = $(this).data('id');

    // Hacer una solicitud AJAX para obtener los detalles del medicamento
    $.ajax({
        url: '/medicamentos/' + medicamentoId,
        type: 'GET',
        dataType: 'json',
        success: function (medicamento) {
            // Crear el elemento HTML para el medicamento agregado
            var medicamentoAgregado = `
        <div class="medicamento-en-receta" data-id="${medicamento.id_medicamento}">
            <p>Codigo: ${medicamento.id_medicamento} - Nombre: ${medicamento.nombre}
                <button class="btn btn-danger btn-sm eliminar-receta">Eliminar</button></p>
        </div>
    `;

            //para ocultar el mensaje del <p>

            //$('#medicamentos-receta').html(medicamentoAgregado);

            // Agregar el medicamento a la lista de medicamentos en la receta
            // $('#medicamentos-receta').append(medicamentoAgregado);

            // Verificar si es el primer medicamento agregado
            if ($('#medicamentos-receta .medicamento-en-receta').length === 0) {
                // Si es el primero, reemplazar todo el contenido (incluyendo el mensaje)
                $('#medicamentos-receta').html(medicamentoAgregado);
            } else {
                // Si no es el primero, solo agregar al final
                $('#medicamentos-receta').append(medicamentoAgregado);
            }


        },
        error: function (xhr, status, error) {
            console.error('Error al obtener detalles del medicamento:', error);
            alert('Error al agregar el medicamento a la receta.');
        }
    });
});

$(document).on('click', '.eliminar-receta', function () {
    $(this).closest('.medicamento-en-receta').remove();
});

// Descargar receta en PDF
$('#descargar-pdf').click(function () {
    const doc = new window.jspdf.jsPDF();

    doc.text("Receta Médica", 10, 10);

    let recetaText = "Medicamentos en la receta:\n\n";
    $('#medicamentos-receta .medicamento-en-receta').each(function () {
        const nombre = $(this).find('p').clone()
            .find('button')
            .remove()
            .end()
            .text().trim();

        if (nombre !== "") {
            // Intenta decodificar el texto
            let decodedNombre;
            try {
                decodedNombre = decodeURIComponent(escape(nombre));
            } catch (e) {
                // Si falla la decodificación, usa el nombre original
                decodedNombre = nombre;
            }
            recetaText += `${decodedNombre}\n`;
        }
    });

    if (recetaText === "Medicamentos en la receta:\n\n") {
        recetaText += "No hay medicamentos agregados a la receta.";
    }

    doc.text(recetaText, 10, 20);

    doc.save("receta.pdf");
});


//funcion para cargar el tipo de medicamento en la <select>
$(document).ready(function () {
    // Función para cargar tipos de medicamentos
    function cargarTiposMedicamentos() {
        $.ajax({
            url: '/tipo',
            method: 'GET',
            success: function (tipos) {
                let options = '<option value="">Seleccione un tipo</option>';
                tipos.forEach(function (tipo) {
                    options += `<option value="${tipo.tipo}">${tipo.tipo}</option>`;
                });
                $('#selectTipoMedicamento').html(options);
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener tipos de medicamentos:', error);
                alert('Hubo un error al obtener los tipos de medicamentos');
            }
        });
    }

    // Evento click en .agregar-receta para mostrar tipos de medicamentos
    $(document).on('click', '#selectTipoMedicamento', function () {
        cargarTiposMedicamentos();
    });
});


//funcion para guardar los medicamentos
$(document).ready(function () {
    $('#formNuevoMedicamento').on('submit', function (e) {
        e.preventDefault();
        const nombre = $('#nombreMedicamento').val();
        const categoria = $('#categoriaMedicamento').val();
        const tipo = $('#selectTipoMedicamento').val();
        const componente = $('#componenteMedicamento').val();
        const uso = $('#usoMedicamento').val();

        $.ajax({
            url: '/medicamentos',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nombre: nombre,
                categoria: categoria,
                tipo: tipo,
                componente: componente,
                uso: uso
            }),
            success: function (response) {
                console.log('Medicamento agregado exitosamente:', response);
                alert('Medicamento agregado exitosamente');
                // Opcional: limpiar el formulario
                $('#formNuevoMedicamento')[0].reset();
            },
            error: function (xhr, status, error) {
                console.error('Error al agregar el medicamento:', error);
                alert('Hubo un error al agregar el medicamento');
            }
        });
    });
});

//evento para eliminar un medicamento de la db
$(document).on('click', '.eliminar-medicamento', function () {
    var medicamentoId = $(this).data('id');
    var medicamentoNombre = $(this).data('nombre'); // Asegúrate de tener el nombre del medicamento en data-nombre

    if (confirm(`¿Está seguro de que desea eliminar este medicamento? \n ID: ${medicamentoId} \n Nombre: ${medicamentoNombre}`)) {
        eliminarMedicamento(medicamentoId);
        cargarMedicamentos();// Recargar la tabla de medicamentos
    }
});

function eliminarMedicamento(medicamentoId) {

    $.ajax({
        url: '/medicamentos/' + medicamentoId,
        type: 'DELETE',
        dataType: 'json',
        success: function (response) {
            alert('Medicamento eliminado exitosamente');
            // Aquí puedes agregar lógica para remover el medicamento de la interfaz
            $('#medicamento-' + medicamentoId).remove();
        },
        error: function (xhr, status, error) {
            console.error('Error al eliminar el medicamento:', error);
            alert('Hubo un error al eliminar el medicamento');
        }
    });
};

// Evento para abrir el modal de edición
$(document).on('click', '.editar-medicamento', function() {
    const idMedicamento = $(this).data('id');
    cargarDatosMedicamento(idMedicamento);
});

// Función para cargar los datos del medicamento en el modal
function cargarDatosMedicamento(id) {
    $.ajax({
        url: `/medicamentos/${id}`,
        method: 'GET',
        success: function(medicamento) {
            $('#idMedicamento').val(medicamento.id_medicamento);
            $('#nombreMedicamento').val(medicamento.nombre);
            $('#categoriaMedicamento').val(medicamento.categoria);
            $('#selectTipoMedicamento').val(medicamento.tipo);
            $('#componenteMedicamento').val(medicamento.componente);
            $('#usoMedicamento').val(medicamento.uso);
            
            $('#addMedicamentoModalLabel').text('Editar Medicamento');
            $('#addMedicamentoModal').modal('show');
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar los datos del medicamento:', error);
            alert('Error al cargar los datos del medicamento');
        }
    });
}

// Modificar el evento de envío del formulario para manejar tanto la creación como la actualización
$('#formNuevoMedicamento').on('submit', function(e) {
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
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(medicamentoData),
        success: function(response) {
            alert(idMedicamento ? 'Medicamento actualizado con éxito' : 'Medicamento agregado con éxito');
            $('#addMedicamentoModal').modal('hide');
            cargarMedicamentos(); // Recargar la tabla de medicamentos
            limpiarFormulario(); // Limpiar el formulario después de la operación
        },
        error: function(xhr, status, error) {
            console.error('Error al guardar el medicamento:', error);
            alert('Error al guardar el medicamento');
        }
    });
});

// Función para limpiar el formulario
function limpiarFormulario() {
    $('#formNuevoMedicamento')[0].reset();
    $('#idMedicamento').val('');
    $('#addMedicamentoModalLabel').text('Agregar Nuevo Medicamento');
}

// Modificar el evento para abrir el modal de agregar medicamento
$('#agregarMedicamentoBtn').on('click', function() {
    limpiarFormulario();
});

// Modificar la función cargarDatosMedicamento
function cargarDatosMedicamento(id) {
    $.ajax({
        url: `/medicamentos/${id}`,
        method: 'GET',
        success: function(medicamento) {
            $('#idMedicamento').val(medicamento.id_medicamento);
            $('#nombreMedicamento').val(medicamento.nombre);
            $('#categoriaMedicamento').val(medicamento.categoria);
            $('#selectTipoMedicamento').val(medicamento.tipo);
            $('#componenteMedicamento').val(medicamento.componente);
            $('#usoMedicamento').val(medicamento.uso);
            
            $('#addMedicamentoModalLabel').text('Editar Medicamento');
            $('#addMedicamentoModal').modal('show');
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar los datos del medicamento:', error);
            alert('Error al cargar los datos del medicamento');
        }
    });
}