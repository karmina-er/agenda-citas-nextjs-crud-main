function validarCita(cliente, fecha) {
  if (!cliente || !fecha) return false;
  return true;
}

describe('Pruebas del sistema de Citas', () => {
  test('Debe retornar true si se ingresa cliente y fecha', () => {
    expect(validarCita('Karmina', '2026-10-15')).toBe(true);
  });

  test('Debe retornar false si falta el cliente o la fecha', () => {
    expect(validarCita('', '2026-10-15')).toBe(false);
  });
});

// Función lógica para eliminar una cita por su ID
function eliminarCita(citas, id) {
  return citas.filter(cita => cita.id !== id);
}

describe('Pruebas del módulo de Borrar Citas', () => {
  test('Debe eliminar una cita correctamente del arreglo usando su ID', () => {
    // 1. Datos iniciales simulando tu agenda
    const citasIniciales = [
      { id: 1, cliente: 'Edson', fecha: '2025-11-30' },
      { id: 2, cliente: 'María', fecha: '2025-12-01' }
    ];

    // 2. Ejecutamos la función de borrado para el ID 1
    const resultado = eliminarCita(citasIniciales, 1);

    // 3. Verificamos que el arreglo final solo contenga 1 elemento y ya no esté Edson
    expect(resultado).toHaveLength(1);
    expect(resultado).toEqual([
      { id: 2, cliente: 'María', fecha: '2025-12-01' }
    ]);
  });

  test('Debe mantener el arreglo intacto si el ID a borrar no existe', () => {
    const citasIniciales = [
      { id: 1, cliente: 'Edson', fecha: '2025-11-30' }
    ];

    const resultado = eliminarCita(citasIniciales, 99);

    expect(resultado).toHaveLength(1);
    expect(resultado).toEqual(citasIniciales);
  });
});

// Función lógica para actualizar una cita por su ID
function editarCita(citas, id, datosActualizados) {
  return citas.map(cita => 
    cita.id === id ? { ...cita, ...datosActualizados } : cita
  );
}

describe('Pruebas del módulo de Editar Citas', () => {
  test('Debe actualizar los datos de una cita existente correctamente', () => {
    const citasIniciales = [
      { id: 1, cliente: 'Edson', fecha: '2025-11-30', descripcion: 'Consulta' },
      { id: 2, cliente: 'María', fecha: '2025-12-01', descripcion: 'Revisión' }
    ];

    const datosNuevos = { cliente: 'Edson Modificado', descripcion: 'Seguimiento médico' };
    const resultado = editarCita(citasIniciales, 1, datosNuevos);

    // Verificamos que la cita 1 se haya actualizado y la cita 2 permanezca intacta
    expect(resultado[0].cliente).toBe('Edson Modificado');
    expect(resultado[0].descripcion).toBe('Seguimiento médico');
    expect(resultado[1]).toEqual(citasIniciales[1]);
  });

  test('Debe dejar el arreglo intacto si el ID a editar no existe', () => {
    const citasIniciales = [
      { id: 1, cliente: 'Edson', fecha: '2025-11-30' }
    ];

    const resultado = editarCita(citasIniciales, 99, { cliente: 'Desconocido' });
    expect(resultado).toEqual(citasIniciales);
  });
});